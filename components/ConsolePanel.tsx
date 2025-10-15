'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal } from 'lucide-react';

interface ConsolePanelProps {
  output: string[];
  errors: string[];
}

export function ConsolePanel({ output, errors }: ConsolePanelProps) {
  return (
    <div className="h-full">
      <div className="px-4 py-3 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Console Output
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>Ready</span>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 text-slate-100 font-mono text-sm h-[200px] overflow-auto p-4 rounded-b-lg">
        {output.length === 0 && errors.length === 0 ? (
          <div className="text-slate-500 italic flex items-center gap-2">
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
            Run your code to see output...
          </div>
        ) : (
          <>
            {output.map((line, idx) => (
              <div key={`out-${idx}`} className="text-green-400 flex items-start gap-2">
                <span className="text-slate-500 text-xs mt-0.5">{idx + 1}</span>
                <span>{line}</span>
              </div>
            ))}
            {errors.map((line, idx) => (
              <div key={`err-${idx}`} className="text-red-400 flex items-start gap-2">
                <span className="text-slate-500 text-xs mt-0.5">{output.length + idx + 1}</span>
                <span>❌ {line}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

