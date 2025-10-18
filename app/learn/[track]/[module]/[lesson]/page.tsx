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
  const [taskCompleted, setTaskCompleted] = useState(false);

  // Function to fetch navigation data
  const fetchNavigation = useCallback(async () => {
    try {
      const supabase = createClient();
      const trackSlug = params.track as string;
      const moduleId = params.module as string;
      const lessonSlug = params.lesson as string;

      // Get module information to check if we should hide the editor
      const { data: moduleInfo } = await supabase
        .from('modules')
        .select('title')
        .eq('id', moduleId)
        .single();

      // Hide editor for Roblox Studio Fundamentals module
      if (moduleInfo?.title === 'Roblox Studio Fundamentals') {
        setShouldHideEditor(true);
      }

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
        
        // Use learning task if available, otherwise use default code
        const starterCode = content.learningTask?.starterCode || content.defaultCode || '';
        setCode(starterCode);
        
        // Create challenge from learning task or fallback to challenge
        const challengeSource = content.learningTask || content.challenge;
        const sampleChallenge: Challenge = {
          starterCode: starterCode,
          tests: challengeSource.tests.map((test: any, index: number) => ({
            id: index.toString(),
            type: 'static',
            assert: test.type,
            value: test.value,
            description: test.description,
          })),
          hints: challengeSource.hints,
          successMessage: challengeSource.successMessage,
        };

        setChallenge(sampleChallenge);
        
        // For Roblox Studio Fundamentals module, always allow progression
        if (shouldHideEditor) {
          setTaskCompleted(true);
        }
        
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

      // Run tests for validation (but don't display them)
      const results = await runAllTests(code, challenge);
      setTests(results.results);

      // Update task completion status based on test results
      // For Roblox Studio Fundamentals module, always allow progression
      setTaskCompleted(shouldHideEditor || results.allPassed);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      // Track progress
      if (lessonContent?.lessonId) {
        try {
          await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lessonId: lessonContent.lessonId,
              completed: results.allPassed,
              attempts: newAttempts
            })
          });
        } catch (error) {
          console.error('Failed to track progress:', error);
        }
      }
    } catch (error: any) {
      setErrors([error.message]);
      // For Roblox Studio Fundamentals module, always allow progression even with errors
      setTaskCompleted(shouldHideEditor);
    } finally {
      setIsRunning(false);
    }
  }, [code, challenge, attempts, lessonContent?.lessonId, shouldHideEditor]);

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

  // Check if we should hide the code editor and console for Roblox Studio Fundamentals module
  const [shouldHideEditor, setShouldHideEditor] = useState(false);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Lesson Content */}
        <div className={`${shouldHideEditor ? 'w-full' : 'w-[40%]'} ${shouldHideEditor ? '' : 'border-r border-slate-200'} overflow-auto bg-white/80 backdrop-blur-sm`}>
          <div className="p-8 space-y-8">
            {lessonContent && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">📚</span>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {lessonContent.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-slate-600 font-medium">Interactive Lesson</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      {lessonContent.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
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
                      <div key={index} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" 
                             style={{background: `linear-gradient(135deg, ${sectionColor === 'blue' ? '#3b82f6, #1d4ed8' : sectionColor === 'green' ? '#10b981, #059669' : sectionColor === 'purple' ? '#8b5cf6, #7c3aed' : sectionColor === 'orange' ? '#f97316, #ea580c' : '#ef4444, #dc2626'})`}}></div>
                        <Card className={`relative bg-gradient-to-br ${colorClass} backdrop-blur-sm border-2 border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                          <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-6">
                              <div className={`w-14 h-14 bg-gradient-to-br ${bgColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <span className="text-white font-bold text-xl">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                                  {section.title}
                                </h3>
                                <div className="flex items-center gap-2 mb-4">
                                  <span className="text-2xl">{sectionColor === 'blue' ? '🔵' : sectionColor === 'green' ? '🟢' : sectionColor === 'purple' ? '🟣' : sectionColor === 'orange' ? '🟠' : '🔴'}</span>
                                  <span className="text-sm font-medium text-slate-600 bg-white/60 px-3 py-1 rounded-full">
                                    Section {index + 1}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="prose prose-slate max-w-none">
                              <div className="text-slate-700 leading-relaxed text-base whitespace-pre-line">
                                {section.content}
                              </div>
                            </div>
                            
                            {section.codeExample && (
                              <div className="mt-6 relative">
                                <div className="absolute top-3 left-4 flex items-center gap-2">
                                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                  <span className="text-xs text-slate-500 ml-2 font-mono">Lua</span>
                                </div>
                                <div className="bg-slate-900 rounded-xl p-6 pt-12 overflow-x-auto shadow-2xl border border-slate-700">
                                  <pre className="text-sm text-slate-100 leading-relaxed">
                                    <code className="font-mono">{section.codeExample}</code>
                                  </pre>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>

                {/* Learning Task Section */}
                {lessonContent.learningTask && (
                  <div className="mt-12 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <Card className="relative bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm border-2 border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-2xl">🎯</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-3xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                              {lessonContent.learningTask.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-2xl">🚀</span>
                              <span className="text-sm font-medium text-emerald-700 bg-emerald-100/80 px-4 py-2 rounded-full">
                                Your Turn to Code!
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="prose prose-slate max-w-none mb-6">
                          <div className="text-slate-700 leading-relaxed text-lg mb-6">
                            {lessonContent.learningTask.description}
                          </div>
                          
                          <div className="bg-white/80 rounded-xl p-6 border border-emerald-200/50">
                            <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                              <span className="text-2xl">📋</span>
                              Instructions
                            </h4>
                            <ol className="space-y-3">
                              {lessonContent.learningTask.instructions.map((instruction: string, index: number) => (
                                <li key={index} className="flex items-start gap-3 text-slate-700">
                                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                  </span>
                                  <span className="leading-relaxed">{instruction}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>

                        {taskCompleted && (
                          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-300 rounded-xl p-6 mb-6">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-3xl">🎉</span>
                              <h4 className="text-xl font-bold text-emerald-800">Task Completed!</h4>
                            </div>
                            <p className="text-emerald-700 leading-relaxed">
                              {lessonContent.learningTask.successMessage}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
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

        {/* Right Panel: Editor + Console + Tests - Only show for non-core-luau tracks */}
        {!shouldHideEditor && (
        <div className="w-[60%] flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="flex-1 overflow-auto p-8 space-y-8">
            {/* Code Editor Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200/50 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <span className="text-2xl">💻</span>
                        Code Editor
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 bg-white/60 px-4 py-2 rounded-full border border-slate-200">
                      <span className="font-mono font-semibold">Lua</span>
                      <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                      <span>Monaco</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="relative">
                    <CodeEditor value={code} onChange={setCode} height="400px" />
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="font-medium">💡</span>
                      <span>Press</span>
                      <kbd className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono shadow-sm">Cmd/Ctrl + Enter</kbd>
                      <span>to run your code</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Auto-save enabled</span>
                    </div>
                  </div>
                  
                  {/* Run Code Button */}
                  <div className="mt-6 flex justify-center">
                    <Button 
                      onClick={handleRun} 
                      disabled={isRunning}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      {isRunning ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Running...
                        </>
                      ) : (
                        <>
                          <span className="text-lg mr-2">▶️</span>
                          Run Code
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Console Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                <ConsolePanel output={output} errors={errors} />
              </div>
            </div>

          </div>
        </div>
        )}
        
        {/* Navigation - Always visible at bottom */}
        <div className="border-t border-slate-200/50 bg-gradient-to-r from-slate-50/80 to-white/80 backdrop-blur-sm p-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl blur-xl"></div>
            <div className="relative">
              <LessonNav
                prevLesson={navigation.prevLesson}
                nextLesson={navigation.nextLesson}
                taskCompleted={taskCompleted}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

