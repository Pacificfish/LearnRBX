'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Play, Lightbulb, Loader2 } from 'lucide-react';
import { TestResult } from '@/types/database';

interface TestRunnerPanelProps {
  tests: TestResult[];
  hints: string[];
  failedAttempts: number;
  onRun: () => void;
  isRunning: boolean;
  successMessage?: string;
}

export function TestRunnerPanel({
  tests,
  hints,
  failedAttempts,
  onRun,
  isRunning,
  successMessage,
}: TestRunnerPanelProps) {
  const [showHints, setShowHints] = useState(false);
  const allPassed = tests.length > 0 && tests.every((t) => t.passed);
  const showHintsButton = failedAttempts >= 2 && hints.length > 0;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Tests</CardTitle>
        <Button onClick={onRun} disabled={isRunning} size="sm" className="gap-2">
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Code
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {tests.length === 0 ? (
          <div className="text-sm text-muted-foreground italic">No tests yet. Run your code to check!</div>
        ) : (
          <>
            <div className="space-y-2">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className={`flex items-start gap-2 p-2 rounded text-sm ${
                    test.passed ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-900'
                  }`}
                >
                  {test.passed ? (
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                  )}
                  <span className="flex-1">{test.message}</span>
                </div>
              ))}
            </div>

            {allPassed && successMessage && (
              <div className="bg-green-100 border border-green-300 rounded p-3 text-sm text-green-900">
                🎉 {successMessage}
              </div>
            )}

            {!allPassed && showHintsButton && (
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHints(!showHints)}
                  className="gap-2 w-full"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </Button>
                {showHints && (
                  <div className="mt-3 space-y-2">
                    {hints.map((hint, idx) => (
                      <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                        💡 {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

