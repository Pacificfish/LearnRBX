import { useState } from 'react'
import { Lightbulb, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

interface HintToggleProps {
  hints: string[]
}

export default function HintToggle({ hints }: HintToggleProps) {
  const [showHints, setShowHints] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)

  if (hints.length === 0) return null

  return (
    <div className="card border-2 border-yellow-100 dark:border-yellow-900 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1.5">
          <Lightbulb className="text-yellow-600 dark:text-yellow-400" size={16} />
          <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">Hints</h2>
        </div>
        <button
          onClick={() => setShowHints(!showHints)}
          className="flex items-center space-x-1 px-2.5 py-1 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white rounded font-medium transition-colors text-xs shadow-sm"
          aria-expanded={showHints}
          aria-label={showHints ? 'Hide hints' : 'Show hints'}
        >
          <Sparkles size={12} />
          <span>{showHints ? 'Hide' : 'Show'}</span>
          {showHints ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>
      {showHints && (
        <div className="space-y-2">
          <div className="bg-white dark:bg-gray-800 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-3 shadow-sm">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">
              Hint {currentHintIndex + 1} of {hints.length}
            </div>
            <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
              {hints[currentHintIndex]}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {currentHintIndex + 1} / {hints.length}
            </div>
            <div className="flex space-x-1.5">
              {currentHintIndex > 0 && (
                <button
                  onClick={() => setCurrentHintIndex(currentHintIndex - 1)}
                  className="px-2 py-1 bg-white dark:bg-gray-800 border border-yellow-300 dark:border-yellow-700 text-gray-700 dark:text-gray-300 rounded hover:bg-yellow-50 dark:hover:bg-gray-700 transition-colors text-xs font-medium"
                >
                  Prev
                </button>
              )}
              {currentHintIndex < hints.length - 1 && (
                <button
                  onClick={() => setCurrentHintIndex(currentHintIndex + 1)}
                  className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white rounded transition-colors text-xs font-medium"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

