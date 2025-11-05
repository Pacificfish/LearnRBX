import { ReactNode } from 'react'

interface LessonPanelProps {
  title: string
  children: ReactNode
}

export default function LessonPanel({ title, children }: LessonPanelProps) {
  return (
    <div className="card border-2 border-gray-300 dark:border-gray-600 p-4 mb-4 bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white">{title}</h2>
      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white">
        <div className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed space-y-2 font-medium">
          {children}
        </div>
      </div>
    </div>
  )
}

