import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, BookOpen } from 'lucide-react';
import { createServerSupabaseClient, getUser, hasActiveSubscription } from '@/lib/supabase/server';
import { Track, Module } from '@/types/database';

export default async function LearnPage() {
  const supabase = await createServerSupabaseClient();
  const user = await getUser();
  const hasSubscription = user ? await hasActiveSubscription(user.id) : false;

  // Fetch tracks with modules
  const { data: tracks } = await supabase
    .from('tracks')
    .select(`
      *,
      modules:modules(
        *,
        lessons:lessons(*)
      )
    `)
    .order('is_premium', { ascending: true });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Learning Tracks</h1>
          <p className="text-muted-foreground text-lg">
            Choose a track and start your Roblox scripting journey
          </p>
        </div>

        <div className="space-y-6">
          {tracks?.map((track: Track & { modules: (Module & { lessons: any[] })[] }) => {
            const isLocked = track.is_premium && !hasSubscription;
            const totalLessons = track.modules?.reduce((sum, mod) => sum + (mod.lessons?.length || 0), 0) || 0;

            return (
              <Card key={track.id} className={isLocked ? 'opacity-75' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-2xl">{track.title}</CardTitle>
                        {track.is_premium ? (
                          <Badge variant="default">PRO</Badge>
                        ) : (
                          <Badge variant="secondary">FREE</Badge>
                        )}
                      </div>
                      <CardDescription>{track.description}</CardDescription>
                    </div>
                    {isLocked && <Lock className="w-6 h-6 text-muted-foreground" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    {track.modules?.length || 0} modules · {totalLessons} lessons
                  </div>
                  <div className="space-y-3">
                    {track.modules
                      ?.sort((a, b) => a.index_in_track - b.index_in_track)
                      .map((module) => {
                        const firstLesson = module.lessons?.[0];
                        const moduleUrl = firstLesson
                          ? `/learn/${track.slug}/${module.id}/${firstLesson.slug}`
                          : '#';

                        return (
                          <Link
                            key={module.id}
                            href={isLocked ? '/pricing' : moduleUrl}
                            className="block"
                          >
                            <div className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary hover:bg-accent transition-colors">
                              <BookOpen className="w-5 h-5 text-primary" />
                              <div className="flex-1">
                                <div className="font-medium">{module.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {module.lessons?.length || 0} lessons
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {tracks?.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No tracks available yet. Check back soon!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

