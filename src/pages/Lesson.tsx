import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCourse, getLesson } from '../data/courses'
import { useProgressStore } from '../store/progressStore'
import CodeEditor from '../components/CodeEditor'
import { Check, Lightbulb, ArrowLeft, ArrowRight, Eye } from 'lucide-react'

export default function Lesson() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const navigate = useNavigate()
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Lesson not found</p>
      </div>
    )
  }

  const currentLessonIndex = course.lessons.findIndex((l) => l.id === lessonId)
  const nextLesson = course.lessons[currentLessonIndex + 1]
  const prevLesson = course.lessons[currentLessonIndex - 1]

  const handleCheck = () => {
    // Simple check - in production, you'd have more sophisticated validation
    if (code.trim().length > 0 && code !== lesson.initialCode) {
      updateLessonProgress(courseId, lessonId, true, code)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to={`/course/${courseId}`}
          className="flex items-center space-x-1 text-roblox hover:text-roblox-dark"
        >
          <ArrowLeft size={18} />
          <span>Back to Course</span>
        </Link>
        <div className="flex items-center space-x-2">
          {prevLesson && (
            <Link
              to={`/course/${courseId}/lesson/${prevLesson.id}`}
              className="flex items-center space-x-1 btn-secondary"
            >
              <ArrowLeft size={18} />
              <span>Previous</span>
            </Link>
          )}
          {nextLesson && (
            <Link
              to={`/course/${courseId}/lesson/${nextLesson.id}`}
              className="flex items-center space-x-1 btn-primary"
            >
              <span>Next</span>
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Lesson Content */}
        <div>
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span>Lesson {currentLessonIndex + 1} of {course.lessons.length}</span>
              {progress?.completed && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  ✓ Completed
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
            <p className="text-gray-600 mb-6">{lesson.description}</p>
          </div>

          {/* Objectives */}
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
            <ul className="space-y-2">
              {lesson.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="text-green-500 flex-shrink-0 mt-1" size={18} />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="card mb-6">
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700">{lesson.content}</div>
            </div>
          </div>

          {/* Hints */}
          {lesson.hints.length > 0 && (
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <Lightbulb className="text-yellow-500" size={20} />
                  <span>Hints</span>
                </h2>
                {!showHint && (
                  <button
                    onClick={() => setShowHint(true)}
                    className="btn-secondary text-sm"
                  >
                    Show Hint
                  </button>
                )}
              </div>
              {showHint && (
                <div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                    <p className="text-gray-700">{lesson.hints[hintIndex]}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Hint {hintIndex + 1} of {lesson.hints.length}
                    </div>
                    <div className="flex space-x-2">
                      {hintIndex > 0 && (
                        <button onClick={handlePrevHint} className="btn-secondary text-sm">
                          Previous
                        </button>
                      )}
                      {hintIndex < lesson.hints.length - 1 && (
                        <button onClick={handleNextHint} className="btn-primary text-sm">
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
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Solution</h2>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center space-x-1 btn-secondary text-sm"
                >
                  <Eye size={16} />
                  <span>{showSolution ? 'Hide' : 'Show'} Solution</span>
                </button>
              </div>
              {showSolution && (
                <CodeEditor
                  initialCode={lesson.solution}
                  readOnly={true}
                />
              )}
            </div>
          )}
        </div>

        {/* Right Column - Code Editor */}
        <div>
          <div className="card sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Code Editor</h2>
              <button
                onClick={handleCheck}
                className="flex items-center space-x-1 btn-primary"
              >
                <Check size={18} />
                <span>Check Code</span>
              </button>
            </div>
            <CodeEditor
              initialCode={code}
              onChange={setCode}
            />
            {showSuccess && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                ✓ Great job! Your code looks good. Marked as complete!
              </div>
            )}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Copy your code and test it in Roblox Studio to see it in action!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

