'use client';

import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';
import { ChallengeEngine, TestResult } from '@/lib/challenge-engine';

interface CodeEditorProps {
  starterCode: string;
  onCodeChange: (code: string) => void;
  onTestsRun: (results: TestResult[]) => void;
  hints: string[];
  tests: any[];
  checkpoint: boolean;
}

export function CodeEditor({
  starterCode,
  onCodeChange,
  onTestsRun,
  hints,
  tests,
  checkpoint
}: CodeEditorProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(-1);
  const editorRef = useRef<any>(null);
  const challengeEngine = useRef<ChallengeEngine>();

  useEffect(() => {
    challengeEngine.current = new ChallengeEngine();
    return () => {
      challengeEngine.current?.destroy();
    };
  }, []);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Configure Lua syntax highlighting
    monaco.languages.register({ id: 'lua' });
    
    monaco.languages.setMonarchTokensProvider('lua', {
      tokenizer: {
        root: [
          [/\b(and|break|do|else|elseif|end|false|for|function|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/, 'keyword'],
          [/[a-zA-Z_$][a-zA-Z0-9_$]*/, 'identifier'],
          [/\d+\.?\d*/, 'number'],
          [/"[^"]*"/, 'string'],
          [/--.*$/, 'comment'],
          [/\[\[[\s\S]*?\]\]/, 'comment']
        ]
      }
    });

    // Set up keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRunCode();
    });
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange(newCode);
  };

  const handleRunCode = async () => {
    if (!challengeEngine.current || isRunning) return;

    setIsRunning(true);
    setOutput('Running code...\n');

    try {
      const results = await challengeEngine.current.runTests(code, tests);
      onTestsRun(results);

      // Simulate output for now (will be replaced with actual Fengari output)
      setOutput('Hello World!\nCode executed successfully.');
      
      // Check if all tests passed
      const allPassed = results.every(result => result.passed);
      if (allPassed && checkpoint) {
        setOutput(prev => prev + '\n\n✅ All tests passed! You can proceed to the next step.');
      } else if (!allPassed) {
        setOutput(prev => prev + '\n\n❌ Some tests failed. Check the test results tab.');
      }
    } catch (error) {
      setOutput(`Error: ${error}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(starterCode);
    setOutput('');
    setCurrentHintIndex(-1);
    onCodeChange(starterCode);
  };

  const handleShowHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="lua"
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            lineNumbers: 'on',
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>

      {/* Controls */}
      <div className="border-t bg-gray-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {hints.length > 0 && (
          <Button
            variant="outline"
            onClick={handleShowHint}
            disabled={currentHintIndex >= hints.length - 1}
            className="text-sm"
          >
            {currentHintIndex < 0 ? 'Show Hint' : 'Next Hint'}
          </Button>
        )}
      </div>

      {/* Hints */}
      {currentHintIndex >= 0 && hints[currentHintIndex] && (
        <div className="border-t bg-blue-50 p-4">
          <div className="text-sm text-blue-800">
            <strong>Hint:</strong> {hints[currentHintIndex]}
          </div>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="border-t bg-black text-green-400 font-mono text-sm p-4 max-h-32 overflow-auto">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}
