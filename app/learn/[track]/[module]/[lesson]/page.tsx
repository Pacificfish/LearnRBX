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
import { runAllTests } from '@/lib/challengeEngine';
import { Challenge, TestResult } from '@/types/database';

// This would normally fetch from DB + read MDX
// For now, using placeholder
export default function LessonPage() {
  const params = useParams();
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

  useEffect(() => {
    // Fetch lesson data and challenge
    async function loadLesson() {
      try {
        // In production, this would fetch from API
        // For now, load a sample challenge
        const sampleChallenge: Challenge = {
          starterCode: '-- Write your code here\nlocal message = "Hello, Roblox!"\nprint(message)',
          tests: [
            {
              id: 'has-variable',
              type: 'static',
              assert: 'identifier_exists',
              value: 'message',
              description: 'Define a variable called "message"',
            },
            {
              id: 'has-print',
              type: 'runtime',
              assert: 'no_errors',
              description: 'Code runs without errors',
            },
          ],
          hints: [
            'Use the "local" keyword to create a variable',
            'Use print() to output text to the console',
          ],
          successMessage: 'Great job! You created your first Lua variable and printed it!',
        };

        setChallenge(sampleChallenge);
        setCode(sampleChallenge.starterCode);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load lesson:', error);
        setIsLoading(false);
      }
    }

    loadLesson();
  }, [params]);

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
      const results = await runAllTests(code, challenge);
      setTests(results.results);
      
      if (results.allPassed) {
        setOutput(['✅ All tests passed!', results.output]);
      } else {
        setErrors(['Some tests failed. Check the test panel for details.']);
      }

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
            <div>
              <h1 className="text-3xl font-bold mb-2">Variables & Roblox Output</h1>
              <p className="text-muted-foreground">
                Learn how to create variables and use Roblox Studio's Output window for debugging
              </p>
            </div>

            <div className="space-y-6">
              {/* Introduction Section */}
              <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Variables in Roblox Scripts</h2>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    In Roblox scripting with Luau, you create variables using the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600">local</code> keyword. 
                    Variables store data like player names, scores, and game states that you can use throughout your Roblox game.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 border">
                    <code className="text-green-400 font-mono text-sm">local playerName = &quot;Alex&quot;</code>
                  </div>
                </CardContent>
              </Card>

              {/* Printing Section */}
              <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Roblox Studio Output Window</h2>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Use the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-green-600">print()</code> function to display information in Roblox Studio's Output window.
                    This is essential for debugging your Roblox scripts and understanding what your code is doing.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 border">
                    <code className="text-green-400 font-mono text-sm">print(&quot;Player joined the game!&quot;)</code>
                  </div>
                </CardContent>
              </Card>

              {/* String Concatenation Section */}
              <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">String Concatenation for Game Messages</h2>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Combine strings using the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-purple-600">..</code> operator to create dynamic messages for your Roblox game:
                  </p>
                  <div className="bg-gray-900 rounded-lg p-4 border">
                    <code className="text-green-400 font-mono text-sm">print(&quot;Welcome to the game, &quot; .. playerName .. &quot;!&quot;)</code>
                  </div>
                </CardContent>
              </Card>
            </div>

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
              nextLesson={{
                url: '/learn/core-luau/basics/tables-and-loops',
                title: 'Tables & Loops',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

