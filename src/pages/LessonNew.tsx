import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
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
import { Play, Check } from 'lucide-react'

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
          <pre key={`code-${index}`} className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono border border-gray-700 dark:border-gray-600">
            <code className="text-gray-100">{currentCodeBlock.join('\n')}</code>
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
      elements.push(<h1 key={index} className="text-xl font-bold mb-2 mt-3 text-gray-900 dark:text-white">{line.substring(2)}</h1>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-lg font-bold mb-1.5 mt-2.5 text-gray-900 dark:text-white">{line.substring(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-base font-semibold mb-1 mt-2 text-gray-900 dark:text-white">{line.substring(4)}</h3>)
    } else if (line.includes('**')) {
      const parts = line.split('**')
      const processed = parts.map((part, i) => {
        if (i % 2 === 1) {
          return <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part}</strong>
        }
        return <span key={i} className="text-gray-900 dark:text-gray-100">{part}</span>
      })
      elements.push(<p key={index} className="mb-2 text-sm text-gray-900 dark:text-gray-100 leading-relaxed font-medium">{processed}</p>)
    } else if (line.trim().startsWith('- ')) {
      elements.push(
        <li key={index} className="mb-1 text-sm text-gray-900 dark:text-gray-100 ml-3 font-medium">
          {line.trim().substring(2)}
        </li>
      )
    } else if (line.trim() !== '') {
      elements.push(<p key={index} className="mb-2 text-sm text-gray-900 dark:text-gray-100 leading-relaxed font-medium">{line}</p>)
    }
  })

  return <div className="space-y-2">{elements}</div>
}

function extractLessonMeta(initialCode?: string) {
  if (!initialCode) {
    return {
      sanitizedCode: '',
      instructionLines: [] as string[],
      headerLineCount: 0,
    }
  }

  const lines = initialCode.split('\n')
  const headerLines: string[] = []
  let startIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    const isTodoLine = trimmed.startsWith('-- TODO') || trimmed.startsWith('--TODO')
    const isCodeLine = trimmed.length > 0 && !trimmed.startsWith('--')

    if (isTodoLine || isCodeLine) {
      startIndex = i
      break
    }
    headerLines.push(lines[i])
  }

  const sanitizedCode = lines.slice(startIndex).join('\n') || initialCode

  const instructionLines = headerLines
    .map((line) => line.replace(/^--\s?/, '').trim())
    .filter((line) => line.length > 0 && !/^=+$/.test(line))

  return {
    sanitizedCode,
    instructionLines,
    headerLineCount: startIndex,
  }
}

export default function LessonNew() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const navigate = useNavigate()
  const course = courseId ? getCourse(courseId) : undefined
  const lesson = courseId && lessonId ? getLesson(courseId, lessonId) : undefined
  const { getLessonProgress, updateLessonProgress } = useProgressStore()
  const { grantXP, incrementStreak } = useGamificationStore()

  const { sanitizedCode, instructionLines, headerLineCount } = useMemo(
    () => extractLessonMeta(lesson?.initialCode),
    [lesson?.initialCode]
  )

  const [code, setCode] = useState(sanitizedCode)
  const [objectives, setObjectives] = useState<{ label: string; done: boolean }[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle')
  const initializedRef = useRef(false)

  const progress = courseId && lessonId ? getLessonProgress(courseId, lessonId) : undefined

  const sanitizeUserCode = useCallback(
    (rawCode: string | null | undefined) => {
      if (!rawCode) return sanitizedCode
      if (headerLineCount <= 0) return rawCode
      const lines = rawCode.split('\n')
      if (lines.length <= headerLineCount) return rawCode
      return lines.slice(headerLineCount).join('\n')
    },
    [headerLineCount, sanitizedCode]
  )

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
    if (!lesson || !courseId || !lessonId || initializedRef.current) return

    const localKey = `lesson-code-${courseId}-${lessonId}`
    const localSaved = localStorage.getItem(localKey)

    if (localSaved !== null) {
      const cleaned = sanitizeUserCode(localSaved)
      setCode(cleaned)
      if (cleaned !== localSaved) {
        try {
          localStorage.setItem(localKey, cleaned)
        } catch (error) {
          console.warn('Unable to update stored lesson code', error)
        }
      }
    } else if (progress?.code) {
      const cleaned = sanitizeUserCode(progress.code)
      setCode(cleaned)
      try {
        localStorage.setItem(localKey, cleaned)
      } catch (error) {
        console.warn('Unable to sync progress code to local storage', error)
      }
    } else {
      setCode(sanitizedCode)
    }
    initializedRef.current = true
  }, [lesson, progress, courseId, lessonId, sanitizedCode, sanitizeUserCode])

  // Reset on lesson change
  useEffect(() => {
    initializedRef.current = false
    setShowCelebration(false)
    setCode(sanitizedCode)
  }, [lessonId, sanitizedCode])

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
    setStatus('running')
    const result = await mockRunLua(codeToRun)
    setStatus(result.success ? 'success' : 'error')
    setTimeout(() => setStatus('idle'), 1000)
    return result
  }

  // Handle Test
  const handleTest = async (codeToTest: string): Promise<TestResult> => {
    setStatus('running')
    let result: TestResult

    // Prevent submission of untouched template
    const cleanedUserCode = sanitizeUserCode(codeToTest)
    const sanitizedInitial = sanitizedCode.replace(/\s+/g, '')
    const sanitizedUser = cleanedUserCode.replace(/\s+/g, '')
    if (sanitizedInitial === sanitizedUser) {
      result = {
        passed: false,
        messages: [
          { type: 'fail', text: 'Please complete the TODOs before testing. The code still matches the starter template.' },
        ],
        objectives: lesson.objectives.map((obj) => ({ label: obj, done: false })),
      }
      setStatus('error')
      setTimeout(() => setStatus('idle'), 1000)
      setObjectives(result.objectives)
      return result
    }

    // Use lesson-specific validation if available
    if (lessonId === 'players' || lesson.title.toLowerCase().includes('player')) {
      result = validatePlayersLesson(cleanedUserCode)
    } else if (lessonId === 'getting-started') {
      result = validateSimplePrint(cleanedUserCode, 'Hello, World!')
    } else {
      // Generic validation
      const hasCode = cleanedUserCode.trim().length > 0 && cleanedUserCode.trim() !== sanitizedCode.trim()
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
      updateLessonProgress(courseId, lessonId, true, cleanedUserCode)
      grantXP(10)
      incrementStreak()

      // Check if all objectives are done
      const allDone = result.objectives.every((obj) => obj.done)
      if (allDone) {
        setShowCelebration(true)
      }
      setStatus('success')
    } else {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 1000)

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
  const todoRanges: { startLine: number; endLine: number }[] = useMemo(() => {
    const ranges: { startLine: number; endLine: number }[] = []
    if (sanitizedCode) {
      const lines = sanitizedCode.split('\n')
      lines.forEach((line, index) => {
        if (line.includes('TODO') || line.includes('_____')) {
          ranges.push({ startLine: index + 1, endLine: index + 1 })
        }
      })
    }
    return ranges
  }, [sanitizedCode])

  const desktopPanelHeight = 'lg:max-h-[calc(100vh-220px)]'

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Sticky header on mobile */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{lesson.title}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleRun(code)}
                disabled={status === 'running'}
                className="flex items-center space-x-1 px-2 py-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded text-xs"
              >
                <Play size={12} />
                <span>Run</span>
              </button>
              <button
                onClick={() => handleTest(code)}
                disabled={status === 'running'}
                className="flex items-center space-x-1 px-2 py-1 btn-primary text-xs"
              >
                <Check size={12} />
                <span>Test</span>
              </button>
            </div>
          </div>
        </div>
      </div>
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
          courseId={courseId}
        />

        <GamificationBar />

        <div className="grid lg:grid-cols-2 gap-6 items-start lg:gap-6">
          {/* Left Column */}
          <div className={`space-y-4 pr-1 ${desktopPanelHeight} lg:overflow-y-auto lg:pr-4`}>
            <div className="space-y-4">
              <LessonPanel title={lesson.title}>
                {renderMarkdown(lesson.content)}
              </LessonPanel>
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 shadow-sm space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    What you need to do
                  </h3>
                  {instructionLines.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-800 dark:text-gray-200">
                      {instructionLines.map((line, index) => (
                        <li key={index}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <ObjectivesCard items={objectives} title="Lesson Objectives" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={`space-y-3 ${desktopPanelHeight} lg:overflow-y-auto`}>
            <CodePlayground
              initialCode={code}
              todoRanges={todoRanges}
              hints={lesson.hints}
              onRun={handleRun}
              onTest={handleTest}
              onCodeChange={setCode}
              storageKey={`${courseId || 'course'}-${lessonId}`}
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

