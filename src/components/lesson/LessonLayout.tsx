'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { StepStatus } from '@/types/curriculum';

interface Step {
  index: number;
  title: string;
  type: 'read' | 'codeTask' | 'quiz';
  status: StepStatus;
  checkpoint?: boolean;
}

interface LessonLayoutProps {
  title: string;
  steps: Step[];
  currentStepIndex: number;
  onStepSelect: (index: number) => void;
  children: React.ReactNode;
}

export function LessonLayout({ 
  title, 
  steps, 
  currentStepIndex, 
  onStepSelect, 
  children 
}: LessonLayoutProps) {
  const getStepIcon = (status: StepStatus, checkpoint?: boolean) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-gray-400" />;
      case 'unlocked':
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Instructions */}
        <div className="w-1/3 bg-white border-r overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Steps</h2>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <Button
                  key={index}
                  variant={currentStepIndex === index ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left h-auto p-3 ${
                    step.status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => step.status !== 'locked' && onStepSelect(index)}
                  disabled={step.status === 'locked'}
                >
                  <div className="flex items-center gap-3 w-full">
                    {getStepIcon(step.status, step.checkpoint)}
                    <div className="flex-1">
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-gray-500 capitalize">
                        {step.type}
                        {step.checkpoint && (
                          <span className="ml-2 text-orange-600 font-medium">
                            • Checkpoint
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Editor */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        {/* Right Panel - Console & Tests */}
        <div className="w-1/3 bg-white border-l">
          <Tabs defaultValue="console" className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="console">Console</TabsTrigger>
              <TabsTrigger value="tests">Tests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="console" className="h-full p-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-sm">Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black text-green-400 font-mono text-sm p-4 rounded h-full overflow-auto">
                    <div className="text-gray-500">Waiting for code execution...</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tests" className="h-full p-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-sm">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">
                      Run your code to see test results
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
