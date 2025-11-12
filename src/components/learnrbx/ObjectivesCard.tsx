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
    <div className="space-y-2">
      <div className="flex items-center space-x-1.5">
        <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-sm">
          <CheckCircle2 className="text-white" size={10} />
        </div>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
      </div>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-2 bg-white/80 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-sm">
            <div className="flex-shrink-0 mt-0.5">
              {item.done ? (
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={16} />
              ) : (
                <Circle className="text-gray-300 dark:text-gray-500" size={16} />
              )}
            </div>
            <span
              className={`text-sm leading-relaxed flex-1 ${
                item.done
                  ? 'text-gray-600 dark:text-gray-300 line-through'
                  : 'text-gray-900 dark:text-gray-100 font-medium'
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

