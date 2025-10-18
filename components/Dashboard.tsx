'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, 
  Zap, 
  Trophy, 
  BookOpen, 
  MessageSquare, 
  Target, 
  TrendingUp,
  Clock,
  Star,
  Crown,
  ChevronRight,
  Calendar,
  Activity
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  completedLessons: number;
  totalAttempts: number;
  totalChatSessions: number;
  totalMessages: number;
  streak: number;
  xp: number;
  isPro: boolean;
  recentActivity: Array<{
    type: 'lesson' | 'chat';
    title: string;
    completed?: boolean;
    timestamp: string;
    xp: number;
  }>;
  trackProgress: Array<{
    id: string;
    title: string;
    description: string;
    totalLessons: number;
    completedLessons: number;
    progress: number;
  }>;
}

interface DashboardProps {
  initialStats?: DashboardStats;
}

export default function Dashboard({ initialStats }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(initialStats || null);
  const [isLoading, setIsLoading] = useState(!initialStats);

  useEffect(() => {
    if (!initialStats) {
      fetchStats();
    }
  }, [initialStats]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Failed to load dashboard</h1>
          <Button onClick={fetchStats}>Retry</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type: string, completed?: boolean) => {
    if (type === 'lesson') {
      return completed ? (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-green-600" />
        </div>
      ) : (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-blue-600" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-purple-600" />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground text-lg">Track your learning progress and achievements</p>
          </div>
          {stats.isPro && (
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
              <Crown className="w-4 h-4 mr-1" />
              Pro Member
            </Badge>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader className="pb-2">
              <CardDescription className="text-yellow-700">XP Earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div className="text-3xl font-bold text-yellow-800">{stats.xp}</div>
              </div>
              <p className="text-xs text-yellow-600 mt-1">Keep learning to earn more!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardHeader className="pb-2">
              <CardDescription className="text-orange-700">Day Streak</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <div className="text-3xl font-bold text-orange-800">{stats.streak}</div>
              </div>
              <p className="text-xs text-orange-600 mt-1">Don&apos;t break the chain!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="pb-2">
              <CardDescription className="text-green-700">Lessons Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-500" />
                <div className="text-3xl font-bold text-green-800">{stats.completedLessons}</div>
              </div>
              <p className="text-xs text-green-600 mt-1">Great progress!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardDescription className="text-blue-700">AI Chats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <div className="text-3xl font-bold text-blue-800">{stats.totalChatSessions}</div>
              </div>
              <p className="text-xs text-blue-600 mt-1">Keep asking questions!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your progress across all learning tracks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.trackProgress.map((track) => (
                  <div key={track.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {track.completedLessons} of {track.totalLessons} lessons completed
                        </p>
                      </div>
                      <Badge variant="outline">
                        {Math.round(track.progress)}%
                      </Badge>
                    </div>
                    <Progress value={track.progress} className="h-2" />
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <Link href="/learn">
                    <Button className="w-full">
                      Continue Learning
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentActivity.length > 0 ? (
                    stats.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        {getActivityIcon(activity.type, activity.completed)}
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {activity.type === 'lesson' ? 'Lesson' : 'Chat'}: {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                        {activity.xp > 0 && (
                          <div className="flex items-center gap-1 text-yellow-600">
                            <Star className="w-4 h-4" />
                            <span className="text-sm font-medium">+{activity.xp} XP</span>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No recent activity</p>
                      <p className="text-sm">Start learning to see your progress here!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/learn">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Button>
                </Link>
                <Link href="/chatbot">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask AI Assistant
                  </Button>
                </Link>
                {!stats.isPro && (
                  <Link href="/pricing">
                    <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">First Steps</p>
                      <p className="text-xs text-muted-foreground">Complete your first lesson</p>
                    </div>
                    {stats.completedLessons >= 1 && (
                      <Badge variant="secondary" className="ml-auto">Earned</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-orange-50">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Flame className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">On Fire</p>
                      <p className="text-xs text-muted-foreground">3-day streak</p>
                    </div>
                    {stats.streak >= 3 && (
                      <Badge variant="secondary" className="ml-auto">Earned</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Dedicated Learner</p>
                      <p className="text-xs text-muted-foreground">Complete 10 lessons</p>
                    </div>
                    {stats.completedLessons >= 10 && (
                      <Badge variant="secondary" className="ml-auto">Earned</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">💡 Learning Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">Practice Daily</p>
                  <p className="text-blue-600">Even 15 minutes a day helps build your skills!</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-800">Ask Questions</p>
                  <p className="text-green-600">Use the AI assistant when you get stuck.</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="font-medium text-purple-800">Build Projects</p>
                  <p className="text-purple-600">Apply what you learn in real Roblox games.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
