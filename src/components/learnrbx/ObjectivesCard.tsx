import { CheckCircle2, Circle } from 'lucide-react'

interface Objective {
  label: string
  done: boolean
}

interface ObjectivesCardProps {
  items: Objective[]
  title?: string
}

export default function ObjectivesCard({ items, title = 'Learning Objectives' }: ObjectivesCardProps) {
  return (
    <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-gray-300 dark:border-gray-600 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-800 p-4 mb-4">
      <div className="flex items-center space-x-1.5 mb-2">
        <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
          <CheckCircle2 className="text-white" size={10} />
        </div>
        <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <div className="flex-shrink-0 mt-0.5">
              {item.done ? (
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={14} />
              ) : (
                <Circle className="text-gray-400 dark:text-gray-500" size={14} />
              )}
            </div>
            <span
              className={`text-xs leading-relaxed flex-1 ${
                item.done
                  ? 'text-gray-600 dark:text-gray-300 line-through'
                  : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

