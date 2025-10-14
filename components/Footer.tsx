import Link from 'next/link';
import { Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold mb-3">
              <Code2 className="w-5 h-5 text-primary" />
              LearnRBX
            </div>
            <p className="text-sm text-muted-foreground">
              Master Roblox scripting with hands-on lessons and real challenges.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground">
                  All Tracks
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/auth" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@learnrbx.com" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          © 2025 LearnRBX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

