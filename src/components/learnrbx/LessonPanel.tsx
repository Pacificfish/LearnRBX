import { ReactNode } from 'react'

interface LessonPanelProps {
  title: string
  children: ReactNode
}

export default function LessonPanel({ title, children }: LessonPanelProps) {
  return (
    <div className="card border-2 border-gray-100 dark:border-gray-700 p-4">
      <h2 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
          {children}
        </div>
      </div>
    </div>
  )
}

