'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, BookOpen, ChevronDown, ChevronRight, Play } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Track, Module } from '@/types/database';

export default function LearnPage() {
  const [tracks, setTracks] = useState<(Track & { modules: (Module & { lessons: any[] })[] })[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      
      // Fetch user and subscription status
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();
        setHasSubscription(!!subscription);
      }

      // Fetch tracks with modules
      const { data: tracksData } = await supabase
        .from('tracks')
        .select(`
          *,
          modules:modules(
            *,
            lessons:lessons(*)
          )
        `)
        .order('is_premium', { ascending: true });

      setTracks(tracksData || []);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Learning Tracks</h1>
            <p className="text-muted-foreground text-lg">
              Choose a track and start your Roblox scripting journey
            </p>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading tracks...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                        const isExpanded = expandedModules.has(module.id);
                        const sortedLessons = module.lessons?.sort((a, b) => a.index_in_module - b.index_in_module) || [];

                        return (
                          <div key={module.id} className="border rounded-lg">
                            {/* Module Header */}
                            <div className="flex items-center gap-3 p-3">
                              <button
                                onClick={() => toggleModule(module.id)}
                                className="flex items-center gap-2 flex-1 text-left hover:bg-accent rounded-md p-1 -m-1 transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                )}
                                <BookOpen className="w-5 h-5 text-primary" />
                                <div className="flex-1">
                                  <div className="font-medium">{module.title}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {module.lessons?.length || 0} lessons
                                  </div>
                                </div>
                              </button>
                              <Link
                                href={isLocked ? '/pricing' : moduleUrl}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                              >
                                <Play className="w-3 h-3" />
                                Start
                              </Link>
                            </div>

                            {/* Expanded Lessons List */}
                            {isExpanded && (
                              <div className="border-t bg-muted/30">
                                <div className="p-3 space-y-2">
                                  {sortedLessons.map((lesson, index) => (
                                    <Link
                                      key={lesson.id}
                                      href={isLocked ? '/pricing' : `/learn/${track.slug}/${module.id}/${lesson.slug}`}
                                      className="flex items-center gap-3 p-2 rounded-md hover:bg-background transition-colors group"
                                    >
                                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                                        {index + 1}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-sm group-hover:text-primary transition-colors">
                                          {lesson.title}
                                        </div>
                                        {lesson.description && (
                                          <div className="text-xs text-muted-foreground line-clamp-1">
                                            {lesson.description}
                                          </div>
                                        )}
                                      </div>
                                      {isLocked && (
                                        <Lock className="w-4 h-4 text-muted-foreground" />
                                      )}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
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

