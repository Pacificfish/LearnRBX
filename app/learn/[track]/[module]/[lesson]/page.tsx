'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { CodeEditor } from '@/components/CodeEditor';
import { ConsolePanel } from '@/components/ConsolePanel';
import { TestRunnerPanel } from '@/components/TestRunnerPanel';
import { LessonNav } from '@/components/LessonNav';
import { SubscriptionGate } from '@/components/SubscriptionGate';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { runAllTests, executeCode } from '@/lib/challengeEngine';
import { Challenge, TestResult } from '@/types/database';
import { getLessonContent } from '@/lib/lessonContent';
import { createClient } from '@/lib/supabase/client';

// This would normally fetch from DB + read MDX
// For now, using placeholder
export default function LessonPage() {
  const params = useParams();
  const [lessonContent, setLessonContent] = useState<any>(null);
  const [code, setCode] = useState('');
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [tests, setTests] = useState<TestResult[]>([]);
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [navigation, setNavigation] = useState<{
    prevLesson?: { url: string; title: string };
    nextLesson?: { url: string; title: string };
  }>({});

  // Function to fetch navigation data
  const fetchNavigation = useCallback(async () => {
    try {
      const supabase = createClient();
      const trackSlug = params.track as string;
      const moduleId = params.module as string;
      const lessonSlug = params.lesson as string;

      // Get all lessons in the same module, sorted by index
      const { data: moduleLessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', moduleId)
        .order('index_in_module');

      if (!moduleLessons) return;

      const currentIndex = moduleLessons.findIndex(lesson => lesson.slug === lessonSlug);
      
      const nav: {
        prevLesson?: { url: string; title: string };
        nextLesson?: { url: string; title: string };
      } = {};

      // Previous lesson
      if (currentIndex > 0) {
        const prevLesson = moduleLessons[currentIndex - 1];
        nav.prevLesson = {
          url: `/learn/${trackSlug}/${moduleId}/${prevLesson.slug}`,
          title: prevLesson.title
        };
      }

      // Next lesson
      if (currentIndex < moduleLessons.length - 1) {
        const nextLesson = moduleLessons[currentIndex + 1];
        nav.nextLesson = {
          url: `/learn/${trackSlug}/${moduleId}/${nextLesson.slug}`,
          title: nextLesson.title
        };
      }

      setNavigation(nav);
    } catch (error) {
      console.error('Error fetching navigation:', error);
    }
  }, [params.track, params.module, params.lesson]);

  useEffect(() => {
    // Load lesson content based on the lesson slug
    async function loadLesson() {
      try {
        const lessonSlug = params.lesson as string;
        const content = getLessonContent(lessonSlug);
        
        setLessonContent(content);
        setCode(content.defaultCode);
        
        // Create challenge from lesson content
        const sampleChallenge: Challenge = {
          starterCode: content.defaultCode,
          tests: content.challenge.tests.map((test: any, index: number) => ({
            id: index.toString(),
            type: 'static',
            assert: test.type,
            value: test.value,
            description: test.description,
          })),
          hints: content.challenge.hints,
          successMessage: content.challenge.successMessage,
        };

        setChallenge(sampleChallenge);
        
        // Fetch navigation data
        await fetchNavigation();
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load lesson:', error);
        setIsLoading(false);
      }
    }

    loadLesson();
  }, [params, fetchNavigation]);

  // Auto-save code
  useEffect(() => {
    if (!code) return;
    const timer = setTimeout(() => {
      // Save to localStorage
      localStorage.setItem(`lesson-${params.lesson}`, code);
      // TODO: Save to API
    }, 2000);

    return () => clearTimeout(timer);
  }, [code, params.lesson]);

  const handleRun = useCallback(async () => {
    if (!challenge) return;

    setIsRunning(true);
    setOutput([]);
    setErrors([]);

    try {
      // First execute the code to show actual output
      const codeExecution = await executeCode(code);
      setOutput(codeExecution.output);
      setErrors(codeExecution.errors);

      // Then run tests for validation
      const results = await runAllTests(code, challenge);
      setTests(results.results);

      if (!results.allPassed) {
        setAttempts((prev) => prev + 1);
      }
    } catch (error: any) {
      setErrors([error.message]);
    } finally {
      setIsRunning(false);
    }
  }, [code, challenge]);

  // Listen for keyboard shortcut
  useEffect(() => {
    function handleEditorRun() {
      handleRun();
    }

    window.addEventListener('editorRun', handleEditorRun);
    return () => window.removeEventListener('editorRun', handleEditorRun);
  }, [handleRun]);

  async function handleExport() {
    try {
      const response = await fetch(`/api/export/${params.lesson}`, {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${params.lesson}-starter.zip`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isPremium && !hasAccess) {
    return <SubscriptionGate />;
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Lesson Content */}
        <div className="w-[40%] border-r overflow-auto">
          <div className="p-6 space-y-6">
            {lessonContent && (
              <>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{lessonContent.title}</h1>
                  <p className="text-muted-foreground">
                    {lessonContent.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {lessonContent.sections.map((section: any, index: number) => {
                    const colorClasses: Record<string, string> = {
                      blue: 'border-l-blue-500 bg-gradient-to-r from-blue-50 to-white',
                      green: 'border-l-green-500 bg-gradient-to-r from-green-50 to-white',
                      purple: 'border-l-purple-500 bg-gradient-to-r from-purple-50 to-white',
                      orange: 'border-l-orange-500 bg-gradient-to-r from-orange-50 to-white',
                      red: 'border-l-red-500 bg-gradient-to-r from-red-50 to-white',
                    };
                    
                    const bgColors: Record<string, string> = {
                      blue: 'bg-blue-500',
                      green: 'bg-green-500',
                      purple: 'bg-purple-500',
                      orange: 'bg-orange-500',
                      red: 'bg-red-500',
                    };

                    const sectionColor = section.color || 'blue';
                    const colorClass = colorClasses[sectionColor] || colorClasses.blue;
                    const bgColor = bgColors[sectionColor] || bgColors.blue;

                    return (
                      <Card key={index} className={`border-l-4 ${colorClass}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center`}>
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                          </div>
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {section.content}
                          </p>
                          <div className="bg-gray-900 rounded-lg p-4 border">
                            <code className="text-green-400 font-mono text-sm whitespace-pre-wrap">{section.codeExample}</code>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}

            <div className="pt-6">
              <Button onClick={handleExport} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export to Roblox Studio
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor + Console + Tests */}
        <div className="w-[60%] flex flex-col bg-gray-50">
          <div className="flex-1 overflow-auto p-6 space-y-6">
            {/* Code Editor Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Code Editor
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Lua</span>
                    <span>•</span>
                    <span>Monaco</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <CodeEditor value={code} onChange={setCode} height="350px" />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Cmd/Ctrl + Enter</kbd> to run your code
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Auto-save enabled</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Console Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <ConsolePanel output={output} errors={errors} />
            </div>

            {/* Tests Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              {challenge && (
                <TestRunnerPanel
                  tests={tests}
                  hints={challenge.hints}
                  failedAttempts={attempts}
                  onRun={handleRun}
                  isRunning={isRunning}
                  successMessage={tests.every((t) => t.passed) ? challenge.successMessage : undefined}
                />
              )}
            </div>
          </div>

          <div className="border-t p-6">
            <LessonNav
              prevLesson={navigation.prevLesson}
              nextLesson={navigation.nextLesson}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

