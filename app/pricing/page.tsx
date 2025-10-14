import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { createServerSupabaseClient, getUser, hasActiveSubscription } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function PricingPage() {
  const user = await getUser();
  const hasSubscription = user ? await hasActiveSubscription(user.id) : false;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Start free, upgrade anytime to unlock premium tracks and projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">$0</div>
                <div className="text-sm text-muted-foreground">Forever free</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Core Luau & Roblox Basics track</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Interactive code editor & console</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Auto-graded challenges</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Progress tracking & badges</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/learn" className="w-full">
                <Button variant="outline" className="w-full" size="lg">
                  Start Learning Free
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary border-2 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For serious Roblox developers</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">$15</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm font-semibold text-primary mb-2">Everything in Free, plus:</div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <span>
                  <strong>All premium tracks:</strong> Gameplay Scripting, UI Scripting
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <span>
                  <strong>Mini-projects:</strong> Coin Collector, Leaderboard, Menu System
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <span>
                  <strong>Export to Roblox Studio:</strong> Download starter packs
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <span>Priority support & new content first</span>
              </div>
            </CardContent>
            <CardFooter>
              {hasSubscription ? (
                <Button disabled className="w-full" size="lg">
                  Current Plan
                </Button>
              ) : (
                <Button disabled className="w-full" size="lg">
                  Coming Soon - Stripe Setup in Progress
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Cancel anytime. No hidden fees. All prices in USD.</p>
        </div>
      </div>
    </div>
  );
}

