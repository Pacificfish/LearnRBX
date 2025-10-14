import { NextResponse } from 'next/server';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get('lesson_id');

    const supabase = await createServerSupabaseClient();

    if (lessonId) {
      // Get progress for specific lesson
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned
        throw error;
      }

      return NextResponse.json({ progress: data });
    } else {
      // Get all progress for user
      const { data, error } = await supabase
        .from('progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      return NextResponse.json({ progress: data });
    }
  } catch (error: any) {
    console.error('Progress GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { lesson_id, completed, score, last_code } = body;

    if (!lesson_id) {
      return NextResponse.json({ error: 'lesson_id required' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Get existing progress
    const { data: existing } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('lesson_id', lesson_id)
      .single();

    const attempts = existing ? existing.attempts + 1 : 1;

    // Upsert progress
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        user_id: user.id,
        lesson_id,
        completed: completed ?? existing?.completed ?? false,
        score: score ?? existing?.score ?? 0,
        attempts,
        last_code: last_code ?? existing?.last_code,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ progress: data });
  } catch (error: any) {
    console.error('Progress POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

