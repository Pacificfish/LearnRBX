'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionGateProps {
  title?: string;
  description?: string;
}

export function SubscriptionGate({
  title = 'Premium Content',
  description = 'Upgrade to LearnRBX Pro to access this lesson and all premium tracks.',
}: SubscriptionGateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-600" />
              <span>Access all premium tracks & projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-600" />
              <span>Download starter packs for Roblox Studio</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-600" />
              <span>Build real gameplay scripts</span>
            </div>
          </div>
          <Link href="/pricing" className="block">
            <Button className="w-full" size="lg">
              View Pricing - Coming Soon
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

