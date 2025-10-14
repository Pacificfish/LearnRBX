'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Code2, BookOpen, LayoutDashboard, CreditCard } from 'lucide-react';

interface NavbarProps {
  user?: { id: string; email?: string } | null;
  hasActiveSubscription?: boolean;
}

export function Navbar({ user, hasActiveSubscription }: NavbarProps) {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Code2 className="w-6 h-6 text-primary" />
              LearnRBX
            </Link>
            {user && (
              <div className="hidden md:flex items-center gap-1">
                <Link href="/learn">
                  <Button variant={pathname?.startsWith('/learn') ? 'default' : 'ghost'} size="sm" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    Learn
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant={pathname === '/dashboard' ? 'default' : 'ghost'} size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                {!hasActiveSubscription && (
                  <Link href="/pricing">
                    <Button variant="outline" size="sm" className="gap-2">
                      <CreditCard className="w-4 h-4" />
                      Go Pro
                    </Button>
                  </Link>
                )}
                <div className="text-sm text-muted-foreground">{user.email}</div>
                <form action="/auth/signout" method="post">
                  <Button type="submit" variant="ghost" size="sm">
                    Sign Out
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/pricing">
                  <Button variant="ghost" size="sm">
                    Pricing
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button size="sm">Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

