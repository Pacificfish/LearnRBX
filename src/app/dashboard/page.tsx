'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Trophy, Clock, Star } from 'lucide-react';

export default function DashboardPage() {
  // Mock data - in real app this would come from your store/API
  const stats = {
    lessonsCompleted: 12,
    totalLessons: 45,
    currentStreak: 7,
    totalXP: 1250,
    nextLesson: {
      title: 'Variables & print()',
      track: 'Core Lua',
      module: 'Lua Basics'
    }
  };

  const progress = Math.round((stats.lessonsCompleted / stats.totalLessons) * 100);

  const recentProgress = [
    { title: 'Functions', track: 'Core Lua', completed: true, date: '2024-01-15' },
    { title: 'Loops', track: 'Core Lua', completed: true, date: '2024-01-14' },
    { title: 'Conditionals', track: 'Core Lua', completed: false, date: '2024-01-13' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">LearnRBX</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/learn">
                <Button variant="ghost">Continue Learning</Button>
              </Link>
              <Button variant="outline">Profile</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Learner!
          </h1>
          <p className="text-gray-600">
            Continue your journey to mastering Roblox scripting
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.lessonsCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.currentStreak}
                  </div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.totalXP}
                  </div>
                  <div className="text-sm text-gray-600">Total XP</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {progress}%
                  </div>
                  <div className="text-sm text-gray-600">Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Continue Learning */}
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                Pick up where you left off
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{stats.nextLesson.title}</h3>
                    <span className="text-sm text-blue-600">{stats.nextLesson.track}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {stats.nextLesson.module}
                  </p>
                  <div className="flex items-center gap-2">
                    <Progress value={75} className="flex-1" />
                    <span className="text-sm text-gray-600">75%</span>
                  </div>
                </div>
                
                <Link href="/learn/core-lua/lua-basics/variables-and-print">
                  <Button className="w-full">
                    Continue Lesson
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Progress</CardTitle>
              <CardDescription>
                Your latest learning activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentProgress.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {item.completed ? (
                          <Trophy className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.track}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Learning Path</CardTitle>
            <CardDescription>
              Track your progress through all tracks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Core Lua Track */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-green-600">Core Lua</h3>
                    <p className="text-sm text-gray-600">Free • Master Lua fundamentals</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">8/12 lessons</div>
                    <div className="text-xs text-gray-600">67% complete</div>
                  </div>
                </div>
                <Progress value={67} className="mb-2" />
                <Link href="/learn/core-lua">
                  <Button variant="outline" size="sm">Continue Track</Button>
                </Link>
              </div>

              {/* Roblox Fundamentals Track */}
              <div className="p-4 border rounded-lg opacity-60">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-blue-600">Roblox Fundamentals</h3>
                    <p className="text-sm text-gray-600">Premium • Studio basics</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">0/15 lessons</div>
                    <div className="text-xs text-gray-600">Locked</div>
                  </div>
                </div>
                <Progress value={0} className="mb-2" />
                <Button variant="outline" size="sm" disabled>
                  Upgrade to Unlock
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
