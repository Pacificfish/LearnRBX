import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { createServerSupabaseClient, getUser, hasActiveSubscription } from '@/lib/supabase/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LearnRBX - Master Roblox Scripting',
  description: 'Master Roblox scripting with hands-on lessons and real challenges.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  const hasSubscription = user ? await hasActiveSubscription(user.id) : false;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar user={user} hasActiveSubscription={hasSubscription} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

