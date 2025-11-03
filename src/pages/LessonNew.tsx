import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCourse, getLesson } from '../data/courses'
import { useProgressStore } from '../store/progressStore'
import { useGamificationStore } from '../store/gamificationStore'
import ProgressHeader from '../components/learnrbx/ProgressHeader'
import ObjectivesCard from '../components/learnrbx/ObjectivesCard'
import LessonPanel from '../components/learnrbx/LessonPanel'
import CodePlayground, { RunResult, TestResult } from '../components/learnrbx/CodePlayground'
import GamificationBar from '../components/learnrbx/GamificationBar'
import CompletionCelebration from '../components/learnrbx/CompletionCelebration'
import { validatePlayersLesson, validateSimplePrint } from '../utils/lessonValidation'
import { mockRunLua } from '../utils/codeExecution'

// Simple markdown renderer
function renderMarkdown(content: string) {
  const lines = content.split('\n')
  const elements: JSX.Element[] = []
  let currentCodeBlock: string[] = []
  let inCodeBlock = false

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono">
            <code>{currentCodeBlock.join('\n')}</code>
          </pre>
        )
        currentCodeBlock = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line)
      return
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="text-xl font-bold mb-2 mt-3 text-gray-900 dark:text-gray-100">{line.substring(2)}</h1>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-lg font-bold mb-1.5 mt-2.5 text-gray-900 dark:text-gray-100">{line.substring(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-base font-semibold mb-1 mt-2 text-gray-900 dark:text-gray-100">{line.substring(4)}</h3>)
    } else if (line.includes('**')) {
      const parts = line.split('**')
      const processed = parts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={i} className="font-semibold text-gray-900 dark:text-gray-100">{part}</strong>
        }
        return part
      })
      elements.push(<p key={index} className="mb-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{processed}</p>)
    } else if (line.trim().startsWith('- ')) {
      elements.push(
        <li key={index} className="mb-1 text-sm text-gray-700 dark:text-gray-300 ml-3">
          {line.trim().substring(2)}
        </li>
      )
    } else if (line.trim() !== '') {
      elements.push(<p key={index} className="mb-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>)
    }
  })

  return <div className="space-y-2">{elements}</div>
}

export default function LessonNew() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const navigate = useNavigate()
  const course = courseId ? getCourse(courseId) : undefined
  const lesson = courseId && lessonId ? getLesson(courseId, lessonId) : undefined
  const { getLessonProgress, updateLessonProgress } = useProgressStore()
  const { grantXP, incrementStreak } = useGamificationStore()

  const [code, setCode] = useState(lesson?.initialCode || '')
  const [objectives, setObjectives] = useState<{ label: string; done: boolean }[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const initializedRef = useRef(false)

  const progress = courseId && lessonId ? getLessonProgress(courseId, lessonId) : undefined

  // Initialize objectives from lesson
  useEffect(() => {
    if (lesson) {
      const initialObjectives = lesson.objectives.map((obj) => ({
        label: obj,
        done: false,
      }))
      setObjectives(initialObjectives)
    }
  }, [lesson])

  // Load code from progress
  useEffect(() => {
    if (lesson && !initializedRef.current) {
      if (progress?.code) {
        setCode(progress.code)
      } else {
        setCode(lesson.initialCode)
      }
      initializedRef.current = true
    }
  }, [lesson, progress])

  // Reset on lesson change
  useEffect(() => {
    initializedRef.current = false
    setShowCelebration(false)
  }, [lessonId])

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400">Lesson not found</p>
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
  const prevLessonProgress = prevLesson && courseId ? getLessonProgress(courseId, prevLesson.id) : null
  const isLocked = currentLessonIndex > 0 && !prevLessonProgress?.completed
  const progressPercentage = ((currentLessonIndex + 1) / course.lessons.length) * 100

  // If lesson is locked
  if (isLocked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Lesson Locked</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              You need to complete the previous lesson before accessing this one.
            </p>
            {prevLesson && (
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">Complete this lesson first:</p>
                <Link
                  to={`/course/${courseId}/lesson/${prevLesson.id}`}
                  className="btn-primary inline-block"
                >
                  Go to Lesson {currentLessonIndex}: {prevLesson.title}
                </Link>
              </div>
            )}
            <Link to={`/course/${courseId}`} className="btn-secondary inline-block">
              ← Back to Course
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Handle Run
  const handleRun = async (codeToRun: string): Promise<RunResult> => {
    return mockRunLua(codeToRun)
  }

  // Handle Test
  const handleTest = async (codeToTest: string): Promise<TestResult> => {
    let result: TestResult

    // Use lesson-specific validation if available
    if (lessonId === 'players' || lesson.title.toLowerCase().includes('player')) {
      result = validatePlayersLesson(codeToTest)
    } else if (lessonId === 'getting-started') {
      result = validateSimplePrint(codeToTest, 'Hello, World!')
    } else {
      // Generic validation
      const hasCode = codeToTest.trim().length > 0 && codeToTest.trim() !== lesson.initialCode.trim()
      result = {
        passed: hasCode,
        messages: hasCode
          ? [{ type: 'pass', text: 'Code looks good!' }]
          : [{ type: 'fail', text: 'Please write some code before testing.' }],
        objectives: lesson.objectives.map((obj) => ({ label: obj, done: hasCode })),
      }
    }

    // Update objectives
    setObjectives(result.objectives)

    // If passed, update progress and grant rewards
    if (result.passed && courseId && lessonId) {
      updateLessonProgress(courseId, lessonId, true, codeToTest)
      grantXP(10)
      incrementStreak()

      // Check if all objectives are done
      const allDone = result.objectives.every((obj) => obj.done)
      if (allDone) {
        setShowCelebration(true)
      }
    }

    return result
  }

  // Navigation handlers
  const handlePrev = () => {
    if (prevLesson) {
      navigate(`/course/${courseId}/lesson/${prevLesson.id}`)
    }
  }

  const handleNext = () => {
    if (nextLesson && progress?.completed) {
      navigate(`/course/${courseId}/lesson/${nextLesson.id}`)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (e.key === 'ArrowLeft' && prevLesson) {
          handlePrev()
        } else if (e.key === 'ArrowRight' && nextLesson && progress?.completed) {
          handleNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevLesson, nextLesson, progress])

  // Find TODO ranges for highlighting
  const todoRanges: { startLine: number; endLine: number }[] = []
  if (lesson.initialCode) {
    const lines = lesson.initialCode.split('\n')
    lines.forEach((line, index) => {
      if (line.includes('TODO') || line.includes('_____')) {
        todoRanges.push({ startLine: index + 1, endLine: index + 1 })
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ProgressHeader
          courseTitle={course.title}
          progressPct={progressPercentage}
          onPrev={handlePrev}
          onNext={handleNext}
          prevDisabled={!prevLesson}
          nextDisabled={!nextLesson || !progress?.completed}
          prevLabel="Previous"
          nextLabel="Next"
        />

        <GamificationBar />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <ObjectivesCard items={objectives} />
            <LessonPanel title={lesson.title}>
              {renderMarkdown(lesson.content)}
            </LessonPanel>
          </div>

          {/* Right Column */}
          <div>
            <CodePlayground
              initialCode={code}
              todoRanges={todoRanges}
              hints={lesson.hints}
              onRun={handleRun}
              onTest={handleTest}
              onCodeChange={setCode}
            />
          </div>
        </div>
      </div>

      <CompletionCelebration
        open={showCelebration}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  )
}

