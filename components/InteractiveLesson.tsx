'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CodeEditor } from '@/components/CodeEditor';
import { ConsolePanel } from '@/components/ConsolePanel';
import { CheckCircle, Play, Lightbulb, BookOpen, Code } from 'lucide-react';
import { LessonStep } from '@/lib/lessonContent';

interface InteractiveLessonProps {
  steps: LessonStep[];
  onStepComplete: (stepId: string) => void;
  onLessonComplete: () => void;
}

export function InteractiveLesson({ steps, onStepComplete, onLessonComplete }: InteractiveLessonProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const allStepsCompleted = completedSteps.size === steps.length;

  useEffect(() => {
    if (currentStep?.starterCode) {
      setCode(currentStep.starterCode);
    }
  }, [currentStep]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput([]);
    setErrors([]);

    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simple output simulation based on code content
      if (code.includes('print(')) {
        const printMatches = code.match(/print\(["']([^"']+)["']\)/g);
        if (printMatches) {
          printMatches.forEach(match => {
            const content = match.match(/print\(["']([^"']+)["']\)/)?.[1];
            if (content) {
              setOutput(prev => [...prev, content]);
            }
          });
        }
      }
      
      // Check if step is completed
      if (currentStep && isStepCompleted(currentStep, code, output)) {
        setCompletedSteps(prev => {
          const newSet = new Set(prev);
          newSet.add(currentStep.id);
          return newSet;
        });
        onStepComplete(currentStep.id);
        
        // Auto-advance to next step after a short delay
        setTimeout(() => {
          if (!isLastStep) {
            setCurrentStepIndex(prev => prev + 1);
            setShowHint(false);
          } else {
            onLessonComplete();
          }
        }, 1500);
      }
    } catch (error) {
      setErrors([`Error: ${error}`]);
    } finally {
      setIsRunning(false);
    }
  };

  const isStepCompleted = (step: LessonStep, userCode: string, userOutput: string[]): boolean => {
    if (!step.testType) return false;

    switch (step.testType) {
      case 'output_contains':
        return userOutput.some(line => line.includes(step.expectedOutput || ''));
      case 'has_variable':
        return userCode.includes(step.expectedVariable || '');
      case 'has_if_statement':
        return userCode.includes('if ') && userCode.includes(' then');
      case 'has_else_clause':
        return userCode.includes('else');
      case 'has_while_loop':
        return userCode.includes('while ') && userCode.includes(' do');
      case 'has_function':
        return userCode.includes(`function ${step.expectedFunction || ''}`);
      case 'has_return_statement':
        return userCode.includes('return ');
      case 'has_event_connection':
        return userCode.includes(step.expectedEvent || '');
      case 'has_instance_creation':
        return userCode.includes('Instance.new(');
      case 'has_click_detector':
        return userCode.includes('ClickDetector');
      case 'has_data_store':
        return userCode.includes(step.expectedService || '');
      case 'has_load_function':
        return userCode.includes(step.expectedFunction || '');
      case 'has_level_up_logic':
        return userCode.includes(step.expectedCondition || '');
      case 'has_leaderstats':
        return userCode.includes('leaderstats');
      case 'has_table':
        return userCode.includes(step.expectedTable || '');
      case 'has_color_change':
        return userCode.includes(step.expectedColor || '');
      case 'has_server_handler':
        return userCode.includes(step.expectedHandler || '');
      case 'has_remote_event':
        return userCode.includes(step.expectedEvent || '');
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
      setShowHint(false);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setShowHint(false);
    }
  };

  const getStepIcon = (step: LessonStep) => {
    switch (step.type) {
      case 'explanation':
        return <BookOpen className="w-4 h-4" />;
      case 'code_exercise':
        return <Code className="w-4 h-4" />;
      case 'quiz':
        return <Lightbulb className="w-4 h-4" />;
      case 'hint':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStepColor = (step: LessonStep, index: number) => {
    if (completedSteps.has(step.id)) return 'bg-green-100 border-green-300';
    if (index === currentStepIndex) return 'bg-blue-100 border-blue-300';
    return 'bg-gray-100 border-gray-300';
  };

  if (!currentStep) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>No lesson steps available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center space-x-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStepColor(step, index)}`}
          >
            {completedSteps.has(step.id) ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              getStepIcon(step)
            )}
            <span className="text-sm font-medium">
              Step {index + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Current Step */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getStepIcon(currentStep)}
            <span>
              Step {currentStepIndex + 1}: {currentStep.type === 'explanation' ? 'Explanation' : 'Code Exercise'}
            </span>
            {completedSteps.has(currentStep.id) && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Completed
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step Content */}
          {currentStep.type === 'explanation' && (
            <div className="prose max-w-none">
              <p className="text-gray-700">{currentStep.content}</p>
            </div>
          )}

          {currentStep.type === 'code_exercise' && (
            <div className="space-y-4">
              <div className="prose max-w-none">
                <p className="text-gray-700 font-medium">{currentStep.instruction}</p>
              </div>

              {/* Code Editor */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Your Code:</label>
                <CodeEditor
                  value={code}
                  onChange={setCode}
                  height="200px"
                />
              </div>

              {/* Run Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={runCode}
                    disabled={isRunning || !code.trim()}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <Play className="w-4 h-4" />
                    <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                  </Button>

                  {currentStep.hint && (
                    <Button
                      variant="outline"
                      onClick={() => setShowHint(!showHint)}
                      className="flex items-center space-x-2"
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>Hint</span>
                    </Button>
                  )}
                </div>

                {/* Step Completion Status */}
                {currentStep.testType && (
                  <div className="flex items-center space-x-2">
                    {completedSteps.has(currentStep.id) ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Step Complete!</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Circle className="w-5 h-5" />
                        <span className="text-sm">Complete this step to continue</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Hint */}
              {showHint && currentStep.hint && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <p className="text-yellow-800">{currentStep.hint}</p>
                  </div>
                </div>
              )}

              {/* Expected Output */}
              {currentStep.expectedOutput && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Expected Output:</h4>
                  <code className="text-blue-800">{currentStep.expectedOutput}</code>
                </div>
              )}

              {/* Console Output */}
              {(output.length > 0 || errors.length > 0) && (
                <ConsolePanel
                  output={output}
                  errors={errors}
                />
              )}
            </div>
          )}

          {/* Step Progress Indicator */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${completedSteps.has(currentStep.id) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStepIndex + 1} of {steps.length}
                </span>
                {completedSteps.has(currentStep.id) && (
                  <span className="text-xs text-green-600 font-medium">✓ Completed</span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </Button>

                {!isLastStep && (
                  <Button
                    size="sm"
                    onClick={nextStep}
                    disabled={!completedSteps.has(currentStep.id)}
                    className={completedSteps.has(currentStep.id) ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    {completedSteps.has(currentStep.id) ? 'Next Step ✓' : 'Complete Step First'}
                  </Button>
                )}

                {isLastStep && allStepsCompleted && (
                  <Button 
                    onClick={onLessonComplete} 
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Complete Lesson ✓
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
