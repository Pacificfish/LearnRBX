import { Trash2, Terminal } from 'lucide-react'

interface ConsolePanelProps {
  lines: string[]
  status?: 'idle' | 'running' | 'success' | 'error'
  onClear?: () => void
}

export default function ConsolePanel({ lines, status = 'idle', onClear }: ConsolePanelProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-400'
      case 'error':
        return 'text-red-400'
      case 'running':
        return 'text-yellow-400'
      default:
        return 'text-gray-300'
    }
  }

  return (
    <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-900 dark:bg-gray-950 text-gray-100 font-mono text-xs">
      <div className="flex items-center justify-between px-2 py-1 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800">
        <div className="flex items-center space-x-1.5">
          <Terminal size={12} className={getStatusColor()} />
          <span className="text-gray-300 dark:text-gray-400 font-semibold text-xs">Console</span>
          {status === 'running' && (
            <span className="text-xs text-yellow-400 animate-pulse">Running...</span>
          )}
        </div>
        {lines.length > 0 && onClear && (
          <button
            onClick={onClear}
            className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 dark:hover:text-gray-300 transition-colors text-xs"
            title="Clear console"
            aria-label="Clear console"
          >
            <Trash2 size={10} />
            <span className="text-xs">Clear</span>
          </button>
        )}
      </div>
      <div className="p-2 min-h-[80px] max-h-[200px] overflow-y-auto">
        {lines.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-600 italic text-xs">
            Click "Run" to see output or "Test" to validate
          </div>
        ) : (
          lines.map((line, index) => {
            let textColor = 'text-green-400'
            if (line.startsWith('❌')) {
              textColor = 'text-red-400'
            } else if (line.startsWith('✅')) {
              textColor = 'text-green-400'
            } else if (line.startsWith('🔍')) {
              textColor = 'text-yellow-400'
            } else if (line.startsWith('⚠️') || line.startsWith('💡')) {
              textColor = 'text-yellow-400'
            } else if (line.trim() === '') {
              return <div key={index} className="h-1"></div>
            }

            // Add timestamp for non-empty lines
            const timestamp = new Date().toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })
            const showTimestamp = line.trim() !== '' && !line.startsWith('🔍') && !line.startsWith('✅') && !line.startsWith('❌')

            return (
              <div key={index} className={`mb-0.5 ${textColor} whitespace-pre-wrap text-xs flex items-start`}>
                {showTimestamp && (
                  <span className="text-gray-500 dark:text-gray-600 mr-2 flex-shrink-0 text-[10px]">
                    [{timestamp}]
                  </span>
                )}
                <span className="flex-1">{line}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

