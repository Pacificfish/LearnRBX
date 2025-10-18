'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CodeEditor } from '@/components/CodeEditor';
import { ConsolePanel } from '@/components/ConsolePanel';
import { 
  CheckCircle, 
  Play, 
  Lightbulb, 
  BookOpen, 
  Code, 
  Circle,
  ArrowRight,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { LessonStep } from '@/lib/lessonContent';

interface CodecademyLessonProps {
  steps: LessonStep[];
  onStepComplete: (stepId: string) => void;
  onLessonComplete: () => void;
}

export function CodecademyLesson({ steps, onStepComplete, onLessonComplete }: CodecademyLessonProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const allStepsCompleted = completedSteps.size === steps.length;

  // Initialize code with starter code when step changes
  useEffect(() => {
    if (currentStep?.starterCode !== undefined) {
      setCode(currentStep.starterCode || '');
    }
    setOutput([]);
    setErrors([]);
    setShowHint(false);
    setShowSolution(false);
  }, [currentStepIndex, currentStep]);

  // Auto-validate code as user types (with debounce)
  useEffect(() => {
    if (!currentStep?.testType || !code.trim()) return;

    const timeoutId = setTimeout(() => {
      setIsValidating(true);
      const isValid = isStepCompleted(currentStep, code, output);
      if (isValid && !completedSteps.has(currentStep.id)) {
        setCompletedSteps(prev => {
          const newSet = new Set(prev);
          newSet.add(currentStep.id);
          return newSet;
        });
        onStepComplete(currentStep.id);
        
        // Auto-advance after a short delay
        setTimeout(() => {
          if (!isLastStep) {
            nextStep();
          }
        }, 1500);
      }
      setIsValidating(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [code, currentStep, output, completedSteps, isLastStep, onStepComplete]);

  const runCode = async () => {
    if (!code.trim()) return;

    setIsRunning(true);
    setOutput([]);
    setErrors([]);

    try {
      // Simulate code execution
      const lines = code.split('\n');
      const newOutput: string[] = [];
      const newErrors: string[] = [];

      for (const line of lines) {
        if (line.trim().startsWith('print(')) {
          // Extract text from print statements
          const match = line.match(/print\s*\(\s*["']([^"']*)["']\s*\)/);
          if (match) {
            newOutput.push(match[1]);
          } else {
            newOutput.push('Printed output');
          }
        } else if (line.trim() && !line.trim().startsWith('--')) {
          // Simulate other code execution
          newOutput.push(`Executed: ${line.trim()}`);
        }
      }

      setOutput(newOutput);
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
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const resetCode = () => {
    setCode(currentStep?.starterCode || '');
    setOutput([]);
    setErrors([]);
  };

  const showSolutionCode = () => {
    if (currentStep?.solution) {
      setCode(currentStep.solution);
      setShowSolution(true);
    }
  };

  const isStepComplete = completedSteps.has(currentStep.id);

  return (
    <div className="h-full flex">
      {/* Left Panel - Instructions (Codecademy style) */}
      <div className="w-1/2 border-r border-gray-200 bg-white">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Interactive Lesson</h2>
                  <p className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="flex items-center space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index < currentStepIndex 
                        ? 'bg-green-500' 
                        : index === currentStepIndex 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {currentStep.type === 'explanation' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Explanation</h3>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{currentStep.content}</p>
                </div>
              </div>
            )}

            {currentStep.type === 'code_exercise' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Code Exercise</h3>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{currentStep.instruction}</p>
                </div>

                {currentStep.expectedOutput && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Expected Output:</h4>
                    <code className="text-sm bg-white border border-gray-200 rounded px-2 py-1">
                      {currentStep.expectedOutput}
                    </code>
                  </div>
                )}

                {/* Hint */}
                {currentStep.hint && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Hint</h4>
                        <p className="text-sm text-yellow-700 mt-1">{currentStep.hint}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Solution */}
                {currentStep.solution && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <h4 className="text-sm font-medium text-blue-800">Solution</h4>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={showSolutionCode}
                        className="text-blue-600 border-blue-300 hover:bg-blue-100"
                      >
                        {showSolution ? 'Hide' : 'Show'} Solution
                      </Button>
                    </div>
                    {showSolution && (
                      <div className="mt-3">
                        <pre className="text-sm bg-white border border-blue-200 rounded p-3 overflow-x-auto">
                          <code>{currentStep.solution}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="flex items-center space-x-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center space-x-2">
                {currentStep.type === 'code_exercise' && (
                  <>
                    <Button
                      variant="outline"
                      onClick={resetCode}
                      className="flex items-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset</span>
                    </Button>
                    
                    {isStepComplete && !isLastStep && (
                      <Button
                        onClick={nextStep}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                      >
                        <span>Next Step</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </>
                )}

                {isLastStep && allStepsCompleted && (
                  <Button 
                    onClick={onLessonComplete} 
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Lesson</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor (Codecademy style) */}
      <div className="w-1/2 bg-gray-900 flex flex-col">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <Code className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Code Editor</h3>
                  <p className="text-xs text-gray-400">Lua • Monaco</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isValidating && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span className="text-xs">Validating...</span>
                  </div>
                )}
                
                {isStepComplete && (
                  <div className="flex items-center space-x-1 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">Step Complete!</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 p-4">
            <CodeEditor
              value={code}
              onChange={setCode}
              height="100%"
            />
          </div>

          {/* Run Button */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={runCode}
                  disabled={isRunning || !code.trim()}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </Button>
                
                <span className="text-xs text-gray-400">Press Cmd/Ctrl + Enter to run</span>
              </div>
              
              {currentStep.type === 'code_exercise' && (
                <div className="text-xs text-gray-400">
                  {isStepComplete ? '✓ Ready for next step' : 'Complete this step to continue'}
                </div>
              )}
            </div>
          </div>

          {/* Console Output */}
          {(output.length > 0 || errors.length > 0) && (
            <div className="border-t border-gray-700">
              <ConsolePanel
                output={output}
                errors={errors}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
