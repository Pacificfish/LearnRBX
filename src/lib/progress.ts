import { supabase } from './supabase';
import { StepStatus, UserProgress, UserStepState } from '@/types/curriculum';

export async function getStepState(
  userId: string,
  lessonId: string,
  stepIndex: number
): Promise<StepStatus> {
  try {
    // Check if this is the first step
    if (stepIndex === 0) {
      return 'unlocked';
    }

    // Check if previous step is passed
    const { data: previousStepState } = await supabase
      .from('step_states')
      .select('passed')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .eq('step_index', stepIndex - 1)
      .single();

    if (previousStepState?.passed) {
      return 'unlocked';
    }

    return 'locked';
  } catch (error) {
    console.error('Error getting step state:', error);
    return 'locked';
  }
}

export async function markStepPassed(
  userId: string,
  lessonId: string,
  stepIndex: number
): Promise<boolean> {
  try {
    // Mark step as passed
    const { error: stepError } = await supabase
      .from('step_states')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        step_index: stepIndex,
        passed: true,
        updated_at: new Date().toISOString()
      });

    if (stepError) {
      console.error('Error marking step passed:', stepError);
      return false;
    }

    // Check if this was the last required step
    const { data: lesson } = await supabase
      .from('lessons')
      .select('step_count')
      .eq('id', lessonId)
      .single();

    if (lesson && stepIndex >= lesson.step_count - 1) {
      // Mark lesson as completed
      const { error: progressError } = await supabase
        .from('progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          completed: true,
          updated_at: new Date().toISOString()
        });

      if (progressError) {
        console.error('Error marking lesson completed:', progressError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error marking step passed:', error);
    return false;
  }
}

export async function getUserProgress(userId: string): Promise<UserProgress[]> {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error getting user progress:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting user progress:', error);
    return [];
  }
}

export async function getLessonGateState(
  userId: string,
  lessonId: string
): Promise<{ canAccess: boolean; reason?: string }> {
  try {
    // Get lesson info
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select(`
        id,
        index_in_module,
        module_id,
        modules!inner(
          id,
          index_in_track,
          track_id,
          tracks!inner(
            id,
            is_premium
          )
        )
      `)
      .eq('id', lessonId)
      .single();

    if (lessonError || !lesson) {
      return { canAccess: false, reason: 'Lesson not found' };
    }

    // Check if track is premium and user has subscription
    if (lesson.modules[0]?.tracks[0]?.is_premium) {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (!subscription) {
        return { canAccess: false, reason: 'Premium subscription required' };
      }
    }

    // Check if previous lesson is completed
    if (lesson.index_in_module > 0) {
      const { data: previousLesson } = await supabase
        .from('lessons')
        .select('id')
        .eq('module_id', lesson.module_id)
        .eq('index_in_module', lesson.index_in_module - 1)
        .single();

      if (previousLesson) {
        const { data: progress } = await supabase
          .from('progress')
          .select('completed')
          .eq('user_id', userId)
          .eq('lesson_id', previousLesson.id)
          .single();

        if (!progress?.completed) {
          return { canAccess: false, reason: 'Complete previous lesson first' };
        }
      }
    }

    return { canAccess: true };
  } catch (error) {
    console.error('Error checking lesson gate state:', error);
    return { canAccess: false, reason: 'Error checking access' };
  }
}

export async function recordModuleTestResult(
  userId: string,
  moduleId: string,
  score: number,
  details: any
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('module_assessments')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        score,
        details,
        submitted_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error recording module test result:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error recording module test result:', error);
    return false;
  }
}
