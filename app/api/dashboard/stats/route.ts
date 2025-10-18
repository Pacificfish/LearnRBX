import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user progress
    const { data: progress } = await supabase
      .from('progress')
      .select('*, lessons:lesson_id(*)')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    // Get chat sessions
    const { data: chatSessions } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(5);

    // Get subscription status
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status, created_at')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    // Calculate stats
    const completedLessons = progress?.filter((p) => p.completed).length || 0;
    const totalAttempts = progress?.reduce((sum, p) => sum + p.attempts, 0) || 0;
    const totalChatSessions = chatSessions?.length || 0;
    const totalMessages = progress?.reduce((sum, p) => sum + (p.attempts || 0), 0) || 0;

    // Calculate streak
    const progressDates = progress?.map((p) => new Date(p.updated_at)) || [];
    const streak = calculateStreak(progressDates);

    // Get recent activity
    const recentActivity = [];
    
    // Add recent lesson completions
    const recentLessons = progress?.slice(0, 3).map(p => ({
      type: 'lesson',
      title: p.lessons?.title || 'Unknown Lesson',
      completed: p.completed,
      timestamp: p.updated_at,
      xp: p.completed ? 10 : 0
    })) || [];

    // Add recent chat sessions
    const recentChats = chatSessions?.slice(0, 2).map(session => ({
      type: 'chat',
      title: session.title,
      timestamp: session.updated_at,
      xp: 0
    })) || [];

    recentActivity.push(...recentLessons, ...recentChats);
    recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Get track progress
    const { data: tracks } = await supabase
      .from('tracks')
      .select(`
        *,
        modules:tracks_modules(
          *,
          lessons:modules_lessons(*)
        )
      `)
      .order('index_in_curriculum');

    const trackProgress = tracks?.map(track => {
      const trackLessons = track.modules?.flatMap((module: any) => module.lessons || []) || [];
      const completedTrackLessons = progress?.filter(p => 
        p.completed && trackLessons.some((lesson: any) => lesson.id === p.lesson_id)
      ).length || 0;
      
      return {
        id: track.id,
        title: track.title,
        description: track.description,
        totalLessons: trackLessons.length,
        completedLessons: completedTrackLessons,
        progress: trackLessons.length > 0 ? (completedTrackLessons / trackLessons.length) * 100 : 0
      };
    }) || [];

    const stats = {
      completedLessons,
      totalAttempts,
      totalChatSessions,
      totalMessages,
      streak,
      xp: completedLessons * 10,
      isPro: !!subscription,
      recentActivity: recentActivity.slice(0, 5),
      trackProgress
    };

    return NextResponse.json({ stats });

  } catch (error) {
    console.error('Dashboard stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function calculateStreak(progressDates: Date[]): number {
  if (progressDates.length === 0) return 0;

  const sortedDates = progressDates
    .map((d) => new Date(d).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);

  let streak = 1;
  const today = new Date().setHours(0, 0, 0, 0);
  
  // Check if most recent activity was today or yesterday
  const mostRecent = sortedDates[0];
  const dayDiff = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24));
  
  if (dayDiff > 1) return 0; // Streak broken
  
  // Count consecutive days
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24);
    if (diff <= 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
