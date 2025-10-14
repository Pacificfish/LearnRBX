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
              <h1 className="text-3xl font-bold mb-2">Variables & Printing</h1>
              <p className="text-muted-foreground">
                Learn how to create variables and output text in Lua
              </p>
            </div>

            <Card>
              <CardContent className="p-6 prose prose-sm max-w-none">
                <h2>Introduction to Variables</h2>
                <p>
                  In Lua, you create variables using the <code>local</code> keyword. Variables store
                  data that you can use later in your scripts.
                </p>
                <pre>
                  <code>local playerName = &quot;Alex&quot;</code>
                </pre>

                <h2>Printing Output</h2>
                <p>
                  Use the <code>print()</code> function to display information in the output console.
                  This is helpful for debugging and seeing what your code is doing.
                </p>
                <pre>
                  <code>print(&quot;Hello, world!&quot;)</code>
                </pre>

                <h2>String Concatenation</h2>
                <p>
                  Combine strings using the <code>..</code> operator:
                </p>
                <pre>
                  <code>print(&quot;Welcome, &quot; .. playerName)</code>
                </pre>
              </CardContent>
            </Card>

            <div className="pt-6">
              <Button onClick={handleExport} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export to Roblox Studio
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor + Console + Tests */}
        <div className="w-[60%] flex flex-col">
          <div className="flex-1 overflow-auto p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Code Editor</h3>
              <CodeEditor value={code} onChange={setCode} height="400px" />
              <p className="text-xs text-muted-foreground mt-2">
                Press Cmd/Ctrl + Enter to run your code
              </p>
            </div>

            <div>
              <ConsolePanel output={output} errors={errors} />
            </div>

            <div>
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

