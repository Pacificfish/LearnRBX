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
    <div className="h-full">
      <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Tests
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{tests.filter(t => t.passed).length}/{tests.length} passed</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {tests.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Play className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-gray-500 text-sm">
              No tests yet. Run your code to check!
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 ${
                    test.passed ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <div className="mt-0.5">
                    {test.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <span className="flex-1 text-sm font-medium">{test.message}</span>
                </div>
              ))}
            </div>

            {allPassed && successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Success!</span>
                </div>
                <p className="text-green-700 text-sm">🎉 {successMessage}</p>
              </div>
            )}

            {!allPassed && showHintsButton && (
              <div className="space-y-3">
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
                  <div className="space-y-2">
                    {hints.map((hint, idx) => (
                      <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700 border-l-4 border-l-amber-300">
                        💡 {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        <Button
          onClick={onRun}
          disabled={isRunning}
          className="w-full h-12 text-base font-medium"
          size="lg"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Run Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

