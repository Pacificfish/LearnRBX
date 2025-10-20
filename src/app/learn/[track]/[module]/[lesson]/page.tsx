'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LessonLayout } from '@/components/lesson/LessonLayout';
import { CodeEditor } from '@/components/lesson/CodeEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestResult } from '@/lib/challenge-engine';
import { StepStatus } from '@/types/curriculum';

interface Step {
  index: number;
  title: string;
  type: 'read' | 'codeTask' | 'quiz';
  status: StepStatus;
  checkpoint?: boolean;
  content?: any;
}

export default function LessonPage() {
  const params = useParams();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load lesson data
    loadLessonData();
  }, [params]);

  const loadLessonData = async () => {
    setIsLoading(true);
    try {
      // This would normally fetch from your API
      // For now, we'll use mock data
      const mockSteps: Step[] = [
        {
          index: 0,
          title: 'Welcome to Lua',
          type: 'read',
          status: 'unlocked',
          content: {
            mdx: `## Variables & print()
            
In Lua, use \`local\` to declare variables and \`print()\` to show output.

\`\`\`lua
local name = "LearnRBX"
print("Hello from " .. name)
\`\`\`

The \`..\` operator concatenates strings together.`
          }
        },
        {
          index: 1,
          title: 'Declare and print',
          type: 'codeTask',
          status: 'unlocked',
          checkpoint: true,
          content: {
            starterCode: `-- Declare a variable named msg and print it
-- your code here`,
            tests: [
              { type: 'static', assert: 'identifier_exists', value: 'msg', description: 'Defines local variable `msg`' },
              { type: 'runtime', assert: 'output_contains', value: 'Hello', description: 'Output includes \'Hello\'' }
            ],
            hints: [
              'Use `local msg = "Hello"`',
              'Call `print(msg)`'
            ]
          }
        },
        {
          index: 2,
          title: 'Quick Check',
          type: 'quiz',
          status: 'locked',
          content: {
            questions: [
              {
                type: 'mc',
                prompt: 'How do you concatenate strings in Lua?',
                choices: ['+', '..', '&'],
                answerIndex: 1,
                explanation: '`..` concatenates strings in Lua.'
              }
            ]
          }
        },
        {
          index: 3,
          title: 'Recap',
          type: 'read',
          status: 'locked',
          content: {
            mdx: `## Great work! 

You've learned how to:
- Declare variables with \`local\`
- Use \`print()\` to display output
- Concatenate strings with \`..\``
          }
        }
      ];

      setSteps(mockSteps);
      setCurrentStep(mockSteps[0]);
    } catch (error) {
      console.error('Error loading lesson:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepSelect = (index: number) => {
    setCurrentStepIndex(index);
    setCurrentStep(steps[index]);
  };

  const handleCodeChange = (code: string) => {
    // Save code to local storage or state
    console.log('Code changed:', code);
  };

  const handleTestsRun = (results: TestResult[]) => {
    console.log('Test results:', results);
    
    // Check if all tests passed and this is a checkpoint
    const allPassed = results.every(result => result.passed);
    if (allPassed && currentStep?.checkpoint) {
      // Mark step as passed and unlock next step
      setSteps(prev => prev.map((step, index) => {
        if (index === currentStepIndex) {
          return { ...step, status: 'passed' };
        }
        if (index === currentStepIndex + 1) {
          return { ...step, status: 'unlocked' };
        }
        return step;
      }));
    }
  };

  const renderStepContent = () => {
    if (!currentStep) return null;

    switch (currentStep.type) {
      case 'read':
        return (
          <div className="p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: currentStep.content?.mdx?.replace(/\n/g, '<br/>') || '' 
              }} />
            </div>
            <div className="mt-6">
              <Button 
                onClick={() => handleStepSelect(currentStepIndex + 1)}
                disabled={steps[currentStepIndex + 1]?.status === 'locked'}
              >
                Next Step
              </Button>
            </div>
          </div>
        );

      case 'codeTask':
        return (
          <CodeEditor
            starterCode={currentStep.content?.starterCode || ''}
            onCodeChange={handleCodeChange}
            onTestsRun={handleTestsRun}
            hints={currentStep.content?.hints || []}
            tests={currentStep.content?.tests || []}
            checkpoint={currentStep.checkpoint || false}
          />
        );

      case 'quiz':
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentStep.content?.questions?.map((question: any, index: number) => (
                    <div key={index}>
                      <p className="font-medium mb-2">{question.prompt}</p>
                      <div className="space-y-2">
                        {question.choices.map((choice: string, choiceIndex: number) => (
                          <Button
                            key={choiceIndex}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            {choice}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Unknown step type</div>;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <LessonLayout
      title={`${params.track} - ${params.module} - ${params.lesson}`}
      steps={steps}
      currentStepIndex={currentStepIndex}
      onStepSelect={handleStepSelect}
    >
      {renderStepContent()}
    </LessonLayout>
  );
}
