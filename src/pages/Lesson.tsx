import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourse, getLesson } from '../data/courses'
import { useProgressStore } from '../store/progressStore'
import CodeEditor from '../components/CodeEditor'
import { Check, Lightbulb, ArrowLeft, ArrowRight, Eye, Target, BookOpen, CheckCircle2, Sparkles, Code2 } from 'lucide-react'

// Simple markdown renderer for lesson content
function renderMarkdown(content: string) {
  const lines = content.split('\n')
  const elements: JSX.Element[] = []
  let currentCodeBlock: string[] = []
  let inCodeBlock = false

  lines.forEach((line, index) => {
    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <pre key={`code-${index}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">
            <code>{currentCodeBlock.join('\n')}</code>
          </pre>
        )
        currentCodeBlock = []
        inCodeBlock = false
      } else {
        // Start code block
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line)
      return
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="text-3xl font-bold mb-4 mt-6 text-gray-900">{line.substring(2)}</h1>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-2xl font-bold mb-3 mt-5 text-gray-900">{line.substring(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-xl font-semibold mb-2 mt-4 text-gray-900">{line.substring(4)}</h3>)
    }
    // Bold text
    else if (line.includes('**')) {
      const parts = line.split('**')
      const processed = parts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={i} className="font-semibold text-gray-900">{part}</strong>
        }
        return part
      })
      elements.push(<p key={index} className="mb-4 text-gray-700 leading-relaxed">{processed}</p>)
    }
    // Lists
    else if (line.trim().startsWith('- ')) {
      elements.push(
        <li key={index} className="mb-2 text-gray-700 ml-4">
          {line.trim().substring(2)}
        </li>
      )
    }
    // Empty line
    else if (line.trim() === '') {
      // Skip empty lines
    }
    // Regular paragraph
    else {
      elements.push(<p key={index} className="mb-4 text-gray-700 leading-relaxed">{line}</p>)
    }
  })

  return <div className="space-y-2">{elements}</div>
}

export default function Lesson() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const course = courseId ? getCourse(courseId) : undefined
  const lesson = courseId && lessonId ? getLesson(courseId, lessonId) : undefined
  const { getLessonProgress, updateLessonProgress } = useProgressStore()

  const [code, setCode] = useState(lesson?.initialCode || '')
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const progress = courseId && lessonId ? getLessonProgress(courseId, lessonId) : undefined

  useEffect(() => {
    if (lesson) {
      if (progress?.code) {
        setCode(progress.code)
      } else {
        setCode(lesson.initialCode)
      }
    }
  }, [lesson, progress])

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card text-center">
            <p className="text-xl text-gray-600">Lesson not found</p>
            <Link to="/dashboard" className="btn-primary mt-4 inline-block">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const currentLessonIndex = course.lessons.findIndex((l) => l.id === lessonId)
  const nextLesson = course.lessons[currentLessonIndex + 1]
  const prevLesson = course.lessons[currentLessonIndex - 1]
  const progressPercentage = ((currentLessonIndex + 1) / course.lessons.length) * 100

  const handleCheck = () => {
    // Simple check - in production, you'd have more sophisticated validation
    if (code.trim().length > 0 && code !== lesson?.initialCode && courseId && lessonId) {
      updateLessonProgress(courseId, lessonId, true, code)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)
    }
  }

  const handleNextHint = () => {
    if (hintIndex < lesson.hints.length - 1) {
      setHintIndex(hintIndex + 1)
    }
  }

  const handlePrevHint = () => {
    if (hintIndex > 0) {
      setHintIndex(hintIndex - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium">Course Progress</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-roblox to-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to={`/course/${courseId}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-roblox transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            <span>Back to Course</span>
          </Link>
          <div className="flex items-center space-x-3">
            {prevLesson && (
              <Link
                to={`/course/${courseId}/lesson/${prevLesson.id}`}
                className="flex items-center space-x-2 btn-secondary text-sm px-4 py-2"
              >
                <ArrowLeft size={16} />
                <span>Previous</span>
              </Link>
            )}
            {nextLesson && (
              <Link
                to={`/course/${courseId}/lesson/${nextLesson.id}`}
                className="flex items-center space-x-2 btn-primary text-sm px-4 py-2 shadow-lg hover:shadow-xl"
              >
                <span>Next</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr,1fr] gap-8">
          {/* Left Column - Lesson Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="card border-2 border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <BookOpen className="text-roblox" size={18} />
                      <span className="text-gray-600 font-medium">
                        Lesson {currentLessonIndex + 1} of {course.lessons.length}
                      </span>
                    </div>
                    {progress?.completed && (
                      <span className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <CheckCircle2 size={14} />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900">
                    {lesson.title}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">{lesson.description}</p>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="text-blue-600" size={20} />
                <h2 className="text-xl font-bold text-gray-900">Learning Objectives</h2>
              </div>
              <ul className="space-y-3">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check className="text-white" size={14} />
                      </div>
                    </div>
                    <span className="text-gray-700 leading-relaxed flex-1">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content */}
            <div className="card border-2 border-gray-100">
              <div className="prose prose-lg max-w-none">
                {renderMarkdown(lesson.content)}
              </div>
            </div>

            {/* Hints */}
            {lesson.hints.length > 0 && (
              <div className="card border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="text-yellow-600" size={22} />
                    <h2 className="text-xl font-bold text-gray-900">Hints</h2>
                  </div>
                  {!showHint && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center space-x-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      <Sparkles size={16} />
                      <span>Show Hint</span>
                    </button>
                  )}
                </div>
                {showHint && (
                  <div className="space-y-4">
                    <div className="bg-white border-2 border-yellow-200 rounded-lg p-5 shadow-sm">
                      <p className="text-gray-800 leading-relaxed">{lesson.hints[hintIndex]}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600 font-medium">
                        Hint {hintIndex + 1} of {lesson.hints.length}
                      </div>
                      <div className="flex space-x-2">
                        {hintIndex > 0 && (
                          <button
                            onClick={handlePrevHint}
                            className="px-3 py-1.5 bg-white border border-yellow-300 text-gray-700 rounded-lg hover:bg-yellow-50 transition-colors text-sm font-medium"
                          >
                            Previous
                          </button>
                        )}
                        {hintIndex < lesson.hints.length - 1 && (
                          <button
                            onClick={handleNextHint}
                            className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            Next Hint
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Solution */}
            {lesson.solution && (
              <div className="card border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Solution</h2>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors text-sm"
                  >
                    <Eye size={16} />
                    <span>{showSolution ? 'Hide' : 'Show'} Solution</span>
                  </button>
                </div>
                {showSolution && (
                  <div className="mt-4 rounded-lg overflow-hidden border-2 border-purple-200">
                    <CodeEditor
                      initialCode={lesson.solution}
                      readOnly={true}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Code Editor */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="card border-2 border-roblox/20 shadow-xl bg-white">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-roblox to-blue-600 flex items-center justify-center">
                    <Code2 className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Code Editor</h2>
                </div>
                <button
                  onClick={handleCheck}
                  className="flex items-center space-x-2 btn-primary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Check size={18} />
                  <span>Check Code</span>
                </button>
              </div>

              <div className="rounded-lg overflow-hidden border-2 border-gray-200 mb-4">
                <CodeEditor
                  initialCode={code}
                  onChange={setCode}
                />
              </div>

              {showSuccess && (
                <div className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-4 rounded-lg shadow-lg animate-fade-in border-2 border-green-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={20} />
                    <div>
                      <p className="font-bold">Great job!</p>
                      <p className="text-sm text-green-50">Your code looks good. Marked as complete!</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">💡 Pro Tip</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Copy your code and test it in Roblox Studio to see it in action! This helps you understand how your code works in a real game environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
