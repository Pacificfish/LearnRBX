import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const lessonId = searchParams.get('lessonId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    if (lessonId) {
      // Get specific lesson progress
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      if (error && error.code !== 'PGRST116') {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ progress: data || null });
    } else {
      // Get all user progress
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ progress: data || [] });
    }
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, lessonId, stepIndex, code } = body;

    if (!userId || !lessonId || stepIndex === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Mark step as passed using the database function
    const { data, error } = await supabase.rpc('mark_step_passed', {
      p_user_id: userId,
      p_lesson_id: lessonId,
      p_step_index: stepIndex
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update progress with last code
    const { error: progressError } = await supabase
      .from('progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        last_code: code,
        updated_at: new Date().toISOString()
      });

    if (progressError) {
      console.error('Error updating progress:', progressError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking step passed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
