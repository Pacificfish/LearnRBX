import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// POST - Update user progress
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, completed, attempts = 1 } = await request.json();

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
    }

    // Check if progress already exists
    const { data: existingProgress } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId)
      .single();

    if (existingProgress) {
      // Update existing progress
      const { data: progress, error } = await supabase
        .from('progress')
        .update({
          completed: completed || existingProgress.completed,
          attempts: existingProgress.attempts + (attempts || 1),
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProgress.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating progress:', error);
        return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
      }

      return NextResponse.json({ progress });
    } else {
      // Create new progress
      const { data: progress, error } = await supabase
        .from('progress')
        .insert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: completed || false,
          attempts: attempts || 1
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating progress:', error);
        return NextResponse.json({ error: 'Failed to create progress' }, { status: 500 });
      }

      return NextResponse.json({ progress });
    }

  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET - Get user progress
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get('lessonId');

    if (lessonId) {
      // Get specific lesson progress
      const { data: progress, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching progress:', error);
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
      }

      return NextResponse.json({ progress });
    } else {
      // Get all user progress
      const { data: progress, error } = await supabase
        .from('progress')
        .select('*, lessons:lesson_id(*)')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching progress:', error);
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
      }

      return NextResponse.json({ progress });
    }

  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}