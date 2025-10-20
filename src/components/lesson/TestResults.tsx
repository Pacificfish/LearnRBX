'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { TestResult } from '@/lib/challenge-engine';

interface TestResultsProps {
  results: TestResult[];
  isRunning?: boolean;
}

export function TestResults({ results, isRunning = false }: TestResultsProps) {
  if (isRunning) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Running Tests...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Executing your code...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">
            Run your code to see test results
          </div>
        </CardContent>
      </Card>
    );
  }

  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  const allPassed = passedCount === totalCount;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Test Results</CardTitle>
          <div className={`text-sm font-medium ${
            allPassed ? 'text-green-600' : 'text-red-600'
          }`}>
            {passedCount}/{totalCount} passed
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {results.map((result, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                result.passed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {result.passed ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${
                  result.passed ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.description || `${result.assert}(${result.value})`}
                </div>
                {result.error && (
                  <div className="text-xs text-red-600 mt-1">
                    Error: {result.error}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {allPassed && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="text-green-800 font-medium">
                🎉 All tests passed! Great job!
              </div>
            </div>
          </div>
        )}

        {!allPassed && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-yellow-800">
                <div className="font-medium">Keep trying!</div>
                <div className="text-sm mt-1">
                  Check the failed tests above and try to fix the issues.
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
