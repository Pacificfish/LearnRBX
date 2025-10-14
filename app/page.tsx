import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Zap, Trophy, Download, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">
              Master Roblox Scripting with{' '}
              <span className="text-primary">Hands-On Lessons</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn Luau through interactive challenges, auto-graded projects, and real-world Roblox game scripts.
              Go from beginner to game creator.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/learn">
                <Button size="lg" className="gap-2">
                  <Code2 className="w-5 h-5" />
                  Start Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="gap-2">
                  Go Pro - $15/mo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why LearnRBX?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete learning platform designed specifically for aspiring Roblox developers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Interactive Lessons</CardTitle>
                <CardDescription>
                  Write real Lua code in our browser editor. Run it, test it, and get instant feedback.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Trophy className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Auto-Graded Challenges</CardTitle>
                <CardDescription>
                  Complete coding challenges with automatic testing. Track your progress with XP, streaks, and badges.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Download className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Export to Roblox Studio</CardTitle>
                <CardDescription>
                  Download starter packs for your projects and bring your learning directly into Roblox Studio.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-muted-foreground">Structured tracks from basics to advanced gameplay scripting</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Core Luau & Roblox Basics</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="text-green-600 font-semibold">FREE</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Variables, functions, tables & loops</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Roblox Explorer & Instance basics</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Events: Touched, MouseButton1Click</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Client vs Server & RemoteEvents</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Premium Tracks</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="text-primary font-semibold">PRO</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                  <span>Gameplay Scripting (Parts, CFrame, Collectibles)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                  <span>UI Scripting (ScreenGuis, TweenService)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                  <span>Mini-Projects with Exportable Starter Packs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                  <span>Build: Coin Collector, Leaderboard, Menu System</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-lg opacity-90">
              Join LearnRBX today. Start with free lessons or unlock everything with Pro.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/learn">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Code2 className="w-5 h-5" />
                  Start Learning Free
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

