import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ProgressBar';
import { Badge } from '@/components/ui/badge';
import { createServerSupabaseClient, getUser } from '@/lib/supabase/server';
import { calculateXP, calculateStreak, getBadges } from '@/lib/utils';
import { Flame, Zap, Trophy, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/auth');
  }

  const supabase = await createServerSupabaseClient();

  // Fetch user progress
  const { data: progress } = await supabase
    .from('progress')
    .select('*, lessons:lesson_id(*)')
    .eq('user_id', user.id);

  const completedLessons = progress?.filter((p) => p.completed).length || 0;
  const totalAttempts = progress?.reduce((sum, p) => sum + p.attempts, 0) || 0;
  const xp = calculateXP(completedLessons);

  // Calculate streak
  const progressDates = progress?.map((p) => new Date(p.updated_at)) || [];
  const streak = calculateStreak(progressDates);

  // Get badges
  const badges = getBadges({ completedLessons, streak, xp });
  const earnedBadges = badges.filter((b) => b.earned);

  // Get last active lesson
  const lastProgress = progress?.[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Track your learning progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>XP Earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div className="text-3xl font-bold">{xp}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Day Streak</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <div className="text-3xl font-bold">{streak}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-500" />
                <div className="text-3xl font-bold">{completedLessons}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-500" />
                <div className="text-3xl font-bold">{totalAttempts}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Your completion status across all tracks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar current={completedLessons} total={50} label="Overall Progress" />
            {lastProgress && (
              <div className="pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-3">Continue where you left off:</div>
                <Link href="/learn">
                  <Button>Resume Learning</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>
              Earned {earnedBadges.length} of {badges.length} badges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border text-center ${
                    badge.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-slate-50 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <div className="font-semibold text-sm mb-1">{badge.name}</div>
                  <div className="text-xs text-muted-foreground">{badge.description}</div>
                  {badge.earned && (
                    <Badge variant="secondary" className="mt-2">
                      Earned
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

