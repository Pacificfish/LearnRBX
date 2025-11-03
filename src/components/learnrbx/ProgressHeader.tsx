import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ProgressHeaderProps {
  courseTitle: string
  progressPct: number
  onPrev?: () => void
  onNext?: () => void
  prevDisabled?: boolean
  nextDisabled?: boolean
  prevLabel?: string
  nextLabel?: string
}

export default function ProgressHeader({
  courseTitle,
  progressPct,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
  prevLabel = 'Previous',
  nextLabel = 'Next',
}: ProgressHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <Link
          to={`/course/${courseTitle.toLowerCase().replace(/\s+/g, '-')}`}
          className="flex items-center space-x-1.5 text-gray-600 hover:text-roblox transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Link>
        <div className="flex items-center space-x-2">
          {onPrev && (
            <button
              onClick={onPrev}
              disabled={prevDisabled}
              className={`flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                prevDisabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'btn-secondary hover:bg-gray-100'
              }`}
              title={prevDisabled ? 'No previous lesson' : 'Previous lesson (Alt+←)'}
            >
              <ArrowLeft size={14} />
              <span>{prevLabel}</span>
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              disabled={nextDisabled}
              className={`flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                nextDisabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'btn-primary shadow-md hover:shadow-lg'
              }`}
              title={nextDisabled ? 'Complete this lesson first' : 'Next lesson (Alt+→)'}
            >
              <span>{nextLabel}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span className="font-medium">Course Progress</span>
          <span>{Math.round(progressPct)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-gradient-to-r from-roblox to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

