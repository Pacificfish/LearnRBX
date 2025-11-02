import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'

interface CodeEditorProps {
  initialCode: string
  onChange?: (value: string) => void
  readOnly?: boolean
}

export default function CodeEditor({ initialCode, onChange, readOnly = false }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || ''
    setCode(newValue)
    onChange?.(newValue)
  }

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    // Configure Lua-specific settings
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
    })
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height="400px"
        defaultLanguage="lua"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-light"
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
  )
}

