import { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import type * as Monaco from 'monaco-editor'
import { Play, Check, Copy, RotateCcw, Lightbulb } from 'lucide-react'
import ConsolePanel from './ConsolePanel'
import HintToggle from './HintToggle'
import { useToast } from '../../hooks/useToast'
import ToastContainer from './Toast'

export interface RunResult {
  output: string[]
  success: boolean
}

export interface TestResult {
  passed: boolean
  messages: { type: 'pass' | 'fail' | 'info'; text: string }[]
  objectives: { label: string; done: boolean }[]
  actualOutput?: string[]
  expectedOutput?: string[]
}

interface TodoRange {
  startLine: number
  endLine: number
}

interface CodePlaygroundProps {
  initialCode: string
  todoRanges?: TodoRange[]
  hints?: string[]
  onRun?: (code: string) => Promise<RunResult>
  onTest?: (code: string) => Promise<TestResult>
  onCodeChange?: (code: string) => void
  readOnly?: boolean
  storageKey: string
}

export default function CodePlayground({
  initialCode,
  todoRanges = [],
  hints = [],
  onRun,
  onTest,
  onCodeChange,
  readOnly = false,
  storageKey,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [consoleLines, setConsoleLines] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle')
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<typeof Monaco | null>(null)
  const { toasts, showToast, removeToast } = useToast()

  // Load saved code from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem(`lesson-code-${storageKey}`)
    if (savedCode) {
      setCode(savedCode)
    } else {
      setCode(initialCode)
    }
  }, [initialCode, storageKey])

  // Save code to localStorage on change
  useEffect(() => {
    if (code !== initialCode) {
      localStorage.setItem(`lesson-code-${storageKey}`, code)
    }
    onCodeChange?.(code)
  }, [code, initialCode, onCodeChange, storageKey])

  // Setup Monaco decorations for TODO highlighting
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current || todoRanges.length === 0) return

    const decorations = todoRanges.map((range) => ({
      range: new monacoRef.current!.Range(range.startLine, 1, range.endLine, 1),
      options: {
        isWholeLine: true,
        className: 'bg-yellow-100 dark:bg-yellow-900/20',
        glyphMarginClassName: 'bg-yellow-300 dark:bg-yellow-700',
        marginClassName: 'bg-yellow-200 dark:bg-yellow-800',
      },
    })) as any

    editorRef.current.deltaDecorations([], decorations)
  }, [todoRanges])

  const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monaco: typeof Monaco) => {
    editorRef.current = editorInstance
    monacoRef.current = monaco

    // Configure editor
    editorInstance.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      lineNumbers: 'on',
      renderWhitespace: 'selection',
      tabSize: 2,
      readOnly,
    })

    // Keyboard shortcuts
    editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun()
    })
    editorInstance.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      handleTest()
    })
  }

  const handleRun = async () => {
    if (!onRun) return

    setStatus('running')
    setConsoleLines(['🔍 Running code...', ''])

    try {
      const result = await onRun(code)
      setConsoleLines(result.output)
      setStatus(result.success ? 'success' : 'error')
    } catch (error) {
      setConsoleLines([`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`])
      setStatus('error')
    } finally {
      setStatus('idle')
    }
  }

  const handleTest = async () => {
    if (!onTest) return

    setStatus('running')
    setConsoleLines(['🔍 Running tests...', ''])

    try {
      const result = await onTest(code)

      // Format messages for console
      const output: string[] = []
      result.messages.forEach((msg) => {
        if (msg.type === 'pass') {
          output.push(`✅ ${msg.text}`)
        } else if (msg.type === 'fail') {
          output.push(`❌ ${msg.text}`)
        } else {
          output.push(`ℹ️  ${msg.text}`)
        }
      })

      if (result.actualOutput) {
        output.push('')
        if (result.actualOutput.length > 0) {
          output.push('🧪 Your Output:')
          result.actualOutput.forEach((line) => output.push(`   • ${line}`))
        } else {
          output.push('🧪 Your Output: (no output)')
        }
      }

      if (result.expectedOutput) {
        output.push('')
        if (result.expectedOutput.length > 0) {
          output.push('🎯 Expected Output:')
          result.expectedOutput.forEach((line) => output.push(`   • ${line}`))
        } else {
          output.push('🎯 Expected Output: (no output required)')
        }
      }

      setConsoleLines(output)
      setStatus(result.passed ? 'success' : 'error')

      // Show toast notification
      if (result.passed) {
        showToast('Nice! You printed the player\'s name.', 'success')
      } else {
        const failMessage = result.messages.find(m => m.type === 'fail')?.text || 'Test failed. Check the console for details.'
        showToast(failMessage, 'error')
      }
    } catch (error) {
      setConsoleLines([`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`])
      setStatus('error')
    } finally {
      setStatus('idle')
    }
  }

  const handleReset = () => {
    if (confirm('Reset code to initial template? This will discard your changes.')) {
      setCode(initialCode)
      localStorage.removeItem(`lesson-code-${storageKey}`)
      setConsoleLines([])
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    showToast('Code copied to clipboard!', 'info', 2000)
  }

  return (
    <div className="space-y-3">
      <div className="card border-2 border-gray-300 dark:border-gray-600 shadow-lg bg-white dark:bg-gray-800 p-4">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-1.5">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-roblox to-blue-600 flex items-center justify-center">
              <Play className="text-white" size={14} />
            </div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Code Editor</h2>
          </div>
          <div className="flex items-center space-x-1.5">
            {hints.length > 0 && (
              <button
                className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                title="Show hints"
              >
                <Lightbulb size={14} />
              </button>
            )}
            <button
              onClick={handleCopy}
              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              title="Copy code"
            >
              <Copy size={14} />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              title="Reset code"
            >
              <RotateCcw size={14} />
            </button>
            {onRun && (
              <button
                onClick={handleRun}
                disabled={status === 'running'}
                className="flex items-center space-x-1 px-2.5 py-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded font-medium transition-colors text-xs shadow-sm"
                title="Run code (Ctrl/Cmd+Enter)"
              >
                <Play size={12} />
                <span>{status === 'running' ? 'Running' : 'Run'}</span>
              </button>
            )}
            {onTest && (
              <button
                onClick={handleTest}
                disabled={status === 'running'}
                className="flex items-center space-x-1 btn-primary text-xs px-2.5 py-1 shadow-md hover:shadow-lg"
                title="Test code (Shift+Enter)"
              >
                <Check size={14} />
                <span>Test</span>
              </button>
            )}
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 mb-2">
          <Editor
            height="300px"
            defaultLanguage="lua"
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            theme="vs"
            options={{
              readOnly,
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              lineNumbers: 'on',
              renderWhitespace: 'selection',
              tabSize: 2,
            }}
          />
        </div>

        <ConsolePanel
          lines={consoleLines}
          status={status}
          onClear={() => {
            setConsoleLines([])
            setStatus('idle')
          }}
        />

        {hints.length > 0 && (
          <div className="mt-2">
            <HintToggle hints={hints} />
          </div>
        )}
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'success' && 'Test passed'}
        {status === 'error' && 'Test failed'}
      </div>
    </div>
  )
}

