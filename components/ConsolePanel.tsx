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
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Console Output
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-slate-950 text-slate-100 font-mono text-xs h-[200px] overflow-auto p-4">
          {output.length === 0 && errors.length === 0 ? (
            <div className="text-slate-500 italic">Run your code to see output...</div>
          ) : (
            <>
              {output.map((line, idx) => (
                <div key={`out-${idx}`} className="text-green-400">
                  {line}
                </div>
              ))}
              {errors.map((line, idx) => (
                <div key={`err-${idx}`} className="text-red-400">
                  ❌ {line}
                </div>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

