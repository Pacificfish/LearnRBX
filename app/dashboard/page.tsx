import { redirect } from 'next/navigation';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';
import Dashboard from '@/components/Dashboard';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/auth');
  }

  const supabase = await createServerSupabaseClient();

  // Fetch initial dashboard data
  const { data: progress } = await supabase
    .from('progress')
    .select('*, lessons:lesson_id(*)')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  const { data: chatSessions } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(5);

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status, created_at')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

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

  // Calculate initial stats
  const completedLessons = progress?.filter((p) => p.completed).length || 0;
  const totalAttempts = progress?.reduce((sum, p) => sum + p.attempts, 0) || 0;
  const totalChatSessions = chatSessions?.length || 0;

  // Calculate streak
  const progressDates = progress?.map((p) => new Date(p.updated_at)) || [];
  const streak = calculateStreak(progressDates);

  // Get recent activity
  const recentActivity = [];
  
  const recentLessons = progress?.slice(0, 3).map(p => ({
    type: 'lesson' as const,
    title: p.lessons?.title || 'Unknown Lesson',
    completed: p.completed,
    timestamp: p.updated_at,
    xp: p.completed ? 10 : 0
  })) || [];

  const recentChats = chatSessions?.slice(0, 2).map(session => ({
    type: 'chat' as const,
    title: session.title,
    timestamp: session.updated_at,
    xp: 0
  })) || [];

  recentActivity.push(...recentLessons, ...recentChats);
  recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Get track progress
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

  const initialStats = {
    completedLessons,
    totalAttempts,
    totalChatSessions,
    totalMessages: totalAttempts,
    streak,
    xp: completedLessons * 10,
    isPro: !!subscription,
    recentActivity: recentActivity.slice(0, 5),
    trackProgress
  };

  return <Dashboard initialStats={initialStats} />;
}

function calculateStreak(progressDates: Date[]): number {
  if (progressDates.length === 0) return 0;

  const sortedDates = progressDates
    .map((d) => new Date(d).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);

  let streak = 1;
  const today = new Date().setHours(0, 0, 0, 0);
  
  const mostRecent = sortedDates[0];
  const dayDiff = Math.floor((today - mostRecent) / (1000 * 60 * 60 * 24));
  
  if (dayDiff > 1) return 0;
  
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

