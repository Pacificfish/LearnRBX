import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourse, getLesson } from '../data/courses'
import { useProgressStore } from '../store/progressStore'
import CodeEditor from '../components/CodeEditor'
import { Check, Lightbulb, ArrowLeft, ArrowRight, Eye, Target, BookOpen, CheckCircle2, Sparkles, Code2, Terminal, Play, Trash2 } from 'lucide-react'

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
            elements.push(<h1 key={index} className="text-xl font-bold mb-2 mt-3 text-gray-900">{line.substring(2)}</h1>)
          } else if (line.startsWith('## ')) {
            elements.push(<h2 key={index} className="text-lg font-bold mb-1.5 mt-2.5 text-gray-900">{line.substring(3)}</h2>)
          } else if (line.startsWith('### ')) {
            elements.push(<h3 key={index} className="text-base font-semibold mb-1 mt-2 text-gray-900">{line.substring(4)}</h3>)
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
            elements.push(<p key={index} className="mb-2 text-sm text-gray-700 leading-relaxed">{processed}</p>)
          }
          // Lists
          else if (line.trim().startsWith('- ')) {
            elements.push(
              <li key={index} className="mb-1 text-sm text-gray-700 ml-3">
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
            elements.push(<p key={index} className="mb-2 text-sm text-gray-700 leading-relaxed">{line}</p>)
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
  // Load saved panel width or default to 50%
  const [leftPanelWidth, setLeftPanelWidth] = useState(() => {
    const saved = localStorage.getItem('lessonPanelWidth')
    return saved ? parseFloat(saved) : 50
  })
  const [isResizing, setIsResizing] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

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

  // Save panel width to localStorage
  useEffect(() => {
    localStorage.setItem('lessonPanelWidth', leftPanelWidth.toString())
  }, [leftPanelWidth])

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
  const prevLessonNav = course.lessons[currentLessonIndex - 1]
  
  // Check if lesson is locked (previous lesson not completed)
  const prevLessonProgress = prevLessonNav && courseId ? getLessonProgress(courseId, prevLessonNav.id) : null
  const isLocked = currentLessonIndex > 0 && !prevLessonProgress?.completed
  
  const progressPercentage = ((currentLessonIndex + 1) / course.lessons.length) * 100

  // If lesson is locked, show locked message
  if (isLocked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Lesson Locked</h1>
            <p className="text-xl text-gray-600 mb-6">
              You need to complete the previous lesson before accessing this one.
            </p>
            {prevLessonNav && (
              <div className="mb-6">
                <p className="text-gray-700 mb-2">Complete this lesson first:</p>
                <Link
                  to={`/course/${courseId}/lesson/${prevLessonNav.id}`}
                  className="btn-primary inline-block"
                >
                  Go to Lesson {currentLessonIndex}: {prevLessonNav.title}
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

  const handleCheck = () => {
    if (!courseId || !lessonId || !lesson) {
      setConsoleOutput(['❌ Error: Unable to validate code'])
      return
    }

    const trimmedCode = code.trim()
    const results: string[] = []

    // Check 1: Has the code been modified?
    if (trimmedCode === lesson.initialCode || trimmedCode.length === 0) {
      setConsoleOutput([
        '❌ Test Failed',
        '',
        'Please write some code before checking.',
        'The code editor still contains the starting template.'
      ])
      return
    }

    results.push('🔍 Running tests...')
    results.push('')

    let passed = true
    let issues: string[] = []

    // Check 2: Compare with solution if available
    if (lesson.solution) {
      // Normalize solution and user code for comparison (remove comments, whitespace)
      const normalizeCode = (code: string) => {
        return code
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0 && !line.startsWith('--'))
          .join('\n')
          .replace(/\s+/g, ' ')
          .toLowerCase()
      }

      const normalizedSolution = normalizeCode(lesson.solution)

      // Check each line for incomplete assignments
      const lines = trimmedCode.split('\n')
      for (const line of lines) {
        const trimmedLine = line.trim()
        // Check if line has assignment but no value (ends with = or = followed by only whitespace)
        if (trimmedLine.match(/local\s+\w+\s*=\s*$/) || trimmedLine.match(/^\s*\w+\s*=\s*$/)) {
          passed = false
          issues.push('❌ Found incomplete assignments. Make sure to assign values to variables.')
          break
        }
      }

      // Check for obviously wrong or invalid assignments (like "sdf", random text, undefined)
      const invalidAssignments = trimmedCode.match(/local\s+\w+\s*=\s*(sdf|undefined|null|NaN|asdf|test|placeholder|TODO|FIXME|xxx|abc)/i) ||
                                trimmedCode.match(/^\s*\w+\s*=\s*(sdf|undefined|null|NaN|asdf|test|placeholder|TODO|FIXME|xxx|abc)/i)
      if (invalidAssignments) {
        passed = false
        issues.push('❌ Invalid assignment detected. Make sure to use correct values, not placeholders or test values.')
      }

      // Check each line more carefully for incomplete statements
      for (const line of lines) {
        const trimmedLine = line.trim()
        // Check if assignment operator exists but no valid value follows
        // Valid values: game, Instance, Vector3, BrickColor, print, function, numbers, strings
        if (trimmedLine.includes('=') && trimmedLine.match(/=\s*$/) && !trimmedLine.match(/=\s*(game|Instance|Vector3|BrickColor|print|function|\w+\(|\d+|["'])/)) {
          passed = false
          if (!issues.some(i => i.includes('incomplete'))) {
            issues.push('❌ Incomplete statement detected. Check for missing values after assignment operator (=).')
          }
          break
        }
      }

      // Extract required patterns from solution dynamically
      const requiredPatterns: { pattern: RegExp; name: string; required: boolean }[] = []
      
      // Check for GetService pattern
      if (normalizedSolution.includes('getservice')) {
        requiredPatterns.push({
          pattern: /game:\s*GetService\s*\(\s*["']Players["']\s*\)/i,
          name: 'Get Players service using game:GetService("Players")',
          required: true
        })
        requiredPatterns.push({
          pattern: /game:\s*GetService\s*\(\s*["']Workspace["']\s*\)/i,
          name: 'Get Workspace service using game:GetService("Workspace")',
          required: true
        })
      }

      // Check for Instance.new pattern
      if (normalizedSolution.includes('instance.new')) {
        requiredPatterns.push({
          pattern: /Instance\.new\s*\(\s*["']Part["']\s*\)/i,
          name: 'Create Part using Instance.new("Part")',
          required: true
        })
      }

      // Check for part properties
      if (normalizedSolution.includes('part.parent')) {
        requiredPatterns.push({
          pattern: /part\.Parent\s*=\s*workspace/i,
          name: 'Set part.Parent to workspace',
          required: true
        })
      }

      if (normalizedSolution.includes('part.position') || normalizedSolution.includes('vector3.new')) {
        requiredPatterns.push({
          pattern: /part\.Position\s*=\s*Vector3\.new/i,
          name: 'Set part.Position using Vector3.new',
          required: true
        })
      }

      if (normalizedSolution.includes('part.size')) {
        requiredPatterns.push({
          pattern: /part\.Size\s*=\s*Vector3\.new/i,
          name: 'Set part.Size using Vector3.new',
          required: true
        })
      }

      if (normalizedSolution.includes('part.brickcolor')) {
        requiredPatterns.push({
          pattern: /part\.BrickColor\s*=\s*BrickColor\.new/i,
          name: 'Set part.BrickColor using BrickColor.new',
          required: true
        })
      }

      // Check for print statements if in solution
      if (normalizedSolution.includes('print')) {
        requiredPatterns.push({
          pattern: /print\s*\(/i,
          name: 'Use print() function',
          required: false
        })
      }

      // Check for functions if in solution
      if (normalizedSolution.includes('function')) {
        requiredPatterns.push({
          pattern: /function\s+\w+\s*\(/i,
          name: 'Define a function',
          required: true
        })
      }

      // Validate all required patterns
      const missingPatterns: string[] = []
      requiredPatterns.forEach(({ pattern, name, required }) => {
        if (required && !pattern.test(trimmedCode)) {
          missingPatterns.push(name)
          passed = false
        }
      })

      if (missingPatterns.length > 0) {
        issues.push(`❌ Missing required elements:`)
        missingPatterns.forEach(pattern => issues.push(`   • ${pattern}`))
      }

      // Check for common syntax issues
      const openParens = (trimmedCode.match(/\(/g) || []).length
      const closeParens = (trimmedCode.match(/\)/g) || []).length
      if (openParens !== closeParens) {
        passed = false
        issues.push('❌ Mismatched parentheses. Check your opening and closing parentheses.')
      }

      const openQuotes = (trimmedCode.match(/"/g) || []).length
      if (openQuotes % 2 !== 0) {
        passed = false
        issues.push('❌ Mismatched quotes. Make sure all strings are properly closed.')
      }

      // Only pass if no issues and all required patterns are found
      // If there are any issues or missing patterns, definitely fail
      if (issues.length > 0 || missingPatterns.length > 0) {
        passed = false
      }
      
      // Double-check: if no required patterns were found at all, fail
      if (requiredPatterns.length > 0 && requiredPatterns.filter(p => p.required).length > 0) {
        const requiredCount = requiredPatterns.filter(p => p.required).length
        const foundCount = requiredPatterns.filter(p => p.required && p.pattern.test(trimmedCode)).length
        if (foundCount < requiredCount) {
          passed = false
        }
      }
    } else {
      // No solution provided - just check if code is meaningful
      const hasContent = trimmedCode.length > 20 && (
        trimmedCode.includes('=') || 
        trimmedCode.includes('print') || 
        trimmedCode.includes('function')
      )
      
      if (!hasContent) {
        passed = false
        issues.push('⚠️  Make sure your code contains meaningful statements')
      } else {
        passed = true
      }
    }

    // Display results
    if (passed) {
      results.push('✅ All Tests Passed!')
      results.push('')
      results.push('Great job! Your code looks correct.')
      if (lesson.solution) {
        results.push('Your implementation matches the expected solution.')
      }
      
      // Mark as complete
      updateLessonProgress(courseId, lessonId, true, code)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)
    } else {
      results.push('❌ Tests Failed')
      results.push('')
      if (issues.length > 0) {
        results.push('Issues found:')
        issues.forEach(issue => results.push(issue))
      } else {
        results.push('Your code doesn\'t match the expected solution.')
        results.push('Check the hints or solution if you\'re stuck!')
      }
      results.push('')
      results.push('💡 Tip: Review the lesson content and try again.')
    }

    setConsoleOutput(results)
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

  // Simple Lua code executor that captures print() statements
  const executeCode = () => {
    setIsRunning(true)
    setConsoleOutput([])
    
    try {
      const output: string[] = []
      const variables: Record<string, string | number> = {}
      
      // First pass: extract variable assignments
      const varAssignRegex = /local\s+(\w+)\s*=\s*([^;\n]+)/g
      let varMatch
      while ((varMatch = varAssignRegex.exec(code)) !== null) {
        const varName = varMatch[1]
        let varValue = varMatch[2].trim()
        
        // Remove quotes if it's a string
        if ((varValue.startsWith('"') && varValue.endsWith('"')) || 
            (varValue.startsWith("'") && varValue.endsWith("'"))) {
          variables[varName] = varValue.slice(1, -1)
        } else if (!isNaN(Number(varValue))) {
          variables[varName] = Number(varValue)
        } else {
          variables[varName] = varValue
        }
      }
      
      // Second pass: find and evaluate print statements
      const printRegex = /print\s*\(\s*([^)]+)\s*\)/g
      let printMatch
      
      while ((printMatch = printRegex.exec(code)) !== null) {
        const printArg = printMatch[1].trim()
        let result = ''
        
        // Handle string literals
        if ((printArg.startsWith('"') && printArg.endsWith('"')) || 
            (printArg.startsWith("'") && printArg.endsWith("'"))) {
          result = printArg.slice(1, -1)
        }
        // Handle concatenation with ..
        else if (printArg.includes('..')) {
          const parts = printArg.split('..').map(p => p.trim())
          result = ''
          for (const part of parts) {
            // Check if it's a variable
            if (variables[part]) {
              result += String(variables[part])
            } else if ((part.startsWith('"') && part.endsWith('"')) || 
                       (part.startsWith("'") && part.endsWith("'"))) {
              result += part.slice(1, -1)
            } else if (!isNaN(Number(part))) {
              result += String(Number(part))
            } else {
              result += part
            }
          }
        }
        // Handle single variable
        else if (variables[printArg]) {
          result = String(variables[printArg])
        }
        // Handle numbers
        else if (!isNaN(Number(printArg))) {
          result = String(Number(printArg))
        }
        // Handle string with variables (simple cases like "Hello " .. name)
        else {
          // Try to find variable references in the argument
          const varRefRegex = /(\w+)/g
          const varRefs = printArg.match(varRefRegex) || []
          result = printArg
          for (const varRef of varRefs) {
            if (variables[varRef]) {
              result = result.replace(varRef, String(variables[varRef]))
            }
          }
          // Clean up any remaining quotes
          result = result.replace(/["']/g, '').trim()
        }
        
        if (result) {
          output.push(result)
        }
      }
      
      // If no output found but code exists, show a message
      if (output.length === 0 && code.trim().length > 0) {
        output.push('(No output - add print() statements to see output here)')
      }
      
      setConsoleOutput(output)
    } catch (error) {
      setConsoleOutput([`Error: ${error instanceof Error ? error.message : 'Unknown error'}`])
    } finally {
      setIsRunning(false)
    }
  }

  const clearConsole = () => {
    setConsoleOutput([])
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const container = document.querySelector('.lesson-container')
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      // Limit between 20% and 80%
      const clampedWidth = Math.max(20, Math.min(80, newLeftWidth))
      setLeftPanelWidth(clampedWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span className="font-medium">Course Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-roblox to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to={`/course/${courseId}`}
            className="flex items-center space-x-1.5 text-gray-600 hover:text-roblox transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
          <div className="flex items-center space-x-2">
            {prevLessonNav && (
              <Link
                to={`/course/${courseId}/lesson/${prevLessonNav.id}`}
                className="flex items-center space-x-1.5 btn-secondary text-xs px-3 py-1.5"
              >
                <ArrowLeft size={14} />
                <span>Prev</span>
              </Link>
            )}
            {nextLesson && (
              progress?.completed ? (
                <Link
                  to={`/course/${courseId}/lesson/${nextLesson.id}`}
                  className="flex items-center space-x-1.5 btn-primary text-xs px-3 py-1.5 shadow-md hover:shadow-lg"
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </Link>
              ) : (
                <div className="relative group">
                  <button
                    disabled
                    className="flex items-center space-x-1.5 bg-gray-300 text-gray-500 cursor-not-allowed text-xs px-3 py-1.5 rounded-lg"
                  >
                    <span>Next</span>
                    <ArrowRight size={14} />
                  </button>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-2.5 shadow-lg whitespace-nowrap">
                      Complete this lesson to continue
                      <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="lesson-container flex gap-0" style={{ height: 'calc(100vh - 140px)' }}>
          {/* Left Column - Lesson Content */}
          <div 
            className="space-y-3 overflow-y-auto overflow-x-hidden pr-3" 
            style={{ width: `${leftPanelWidth}%`, minWidth: '280px', height: 'calc(100vh - 140px)' }}
          >
            {/* Header */}
            <div className="card border-2 border-gray-100 p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1.5 text-xs">
                      <BookOpen className="text-roblox" size={14} />
                      <span className="text-gray-600 font-medium">
                        Lesson {currentLessonIndex + 1} of {course.lessons.length}
                      </span>
                    </div>
                    {progress?.completed && (
                      <span className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <CheckCircle2 size={12} />
                        <span>Done</span>
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-extrabold mb-1.5 text-gray-900">
                    {lesson.title}
                  </h1>
                  <p className="text-sm text-gray-600 leading-relaxed">{lesson.description}</p>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 p-3">
              <div className="flex items-center space-x-1.5 mb-2">
                <Target className="text-blue-600" size={16} />
                <h2 className="text-sm font-bold text-gray-900">Objectives</h2>
              </div>
              <ul className="space-y-1.5">
                {lesson.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check className="text-white" size={10} />
                      </div>
                    </div>
                    <span className="text-xs text-gray-700 leading-relaxed flex-1">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content */}
            <div className="card border-2 border-gray-100 p-4">
              <div className="prose prose-sm max-w-none">
                {renderMarkdown(lesson.content)}
              </div>
            </div>

            {/* Hints */}
            {lesson.hints.length > 0 && (
              <div className="card border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-amber-50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <Lightbulb className="text-yellow-600" size={16} />
                    <h2 className="text-sm font-bold text-gray-900">Hints</h2>
                  </div>
                  {!showHint && (
                    <button
                      onClick={() => setShowHint(true)}
                      className="flex items-center space-x-1 px-2.5 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-medium transition-colors text-xs"
                    >
                      <Sparkles size={12} />
                      <span>Show</span>
                    </button>
                  )}
                </div>
                {showHint && (
                  <div className="space-y-2">
                    <div className="bg-white border-2 border-yellow-200 rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-gray-800 leading-relaxed">{lesson.hints[hintIndex]}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600 font-medium">
                        {hintIndex + 1} / {lesson.hints.length}
                      </div>
                      <div className="flex space-x-1.5">
                        {hintIndex > 0 && (
                          <button
                            onClick={handlePrevHint}
                            className="px-2 py-1 bg-white border border-yellow-300 text-gray-700 rounded hover:bg-yellow-50 transition-colors text-xs font-medium"
                          >
                            Prev
                          </button>
                        )}
                        {hintIndex < lesson.hints.length - 1 && (
                          <button
                            onClick={handleNextHint}
                            className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-colors text-xs font-medium"
                          >
                            Next
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
              <div className="card border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-3">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm font-bold text-gray-900">Solution</h2>
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded font-medium transition-colors text-xs"
                  >
                    <Eye size={12} />
                    <span>{showSolution ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                {showSolution && (
                  <div className="mt-2 rounded-lg overflow-hidden border-2 border-purple-200">
                    <CodeEditor
                      initialCode={lesson.solution}
                      readOnly={true}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Resize Handle */}
          <div
            onMouseDown={handleMouseDown}
            className={`flex-shrink-0 w-2 bg-gray-200 hover:bg-roblox/50 cursor-col-resize transition-colors group ${
              isResizing ? 'bg-roblox' : ''
            }`}
            style={{ minWidth: '8px', position: 'relative' }}
            title="Drag to resize panels"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className={`w-0.5 h-16 bg-gray-400 rounded transition-colors ${
                isResizing ? 'bg-roblox' : 'group-hover:bg-roblox'
              }`}></div>
            </div>
            {/* Invisible wider hit area for easier grabbing */}
            <div className="absolute inset-y-0 left-0 right-0 -ml-2 -mr-2"></div>
          </div>

          {/* Right Column - Code Editor */}
          <div 
            className="overflow-y-auto overflow-x-hidden pl-3 pb-4" 
            style={{ width: `${100 - leftPanelWidth}%`, minWidth: '280px', maxWidth: '80%', height: 'calc(100vh - 140px)' }}
          >
            <div className="card border-2 border-roblox/20 shadow-lg bg-white p-3">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
                <div className="flex items-center space-x-1.5">
                  <div className="w-7 h-7 rounded bg-gradient-to-br from-roblox to-blue-600 flex items-center justify-center">
                    <Code2 className="text-white" size={14} />
                  </div>
                  <h2 className="text-sm font-bold text-gray-900">Code Editor</h2>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={executeCode}
                    disabled={isRunning}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded font-medium transition-colors text-xs shadow-sm"
                  >
                    <Play size={12} />
                    <span>{isRunning ? 'Running' : 'Run'}</span>
                  </button>
                  <button
                    onClick={handleCheck}
                    className="flex items-center space-x-1 btn-primary text-xs px-2.5 py-1 shadow-md hover:shadow-lg"
                  >
                    <Check size={14} />
                    <span>Test</span>
                  </button>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border-2 border-gray-200 mb-2">
                <div className="bg-blue-50 border-b border-blue-200 px-2.5 py-1.5">
                  <div className="flex items-start space-x-1.5">
                    <Target className="text-blue-600 flex-shrink-0 mt-0.5" size={12} />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 mb-0.5">📝 Your Task</p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Complete the code. Look for <code className="bg-blue-100 px-0.5 rounded text-xs">TODO</code> comments. Click "Test" when done!
                      </p>
                    </div>
                  </div>
                </div>
                <CodeEditor
                  initialCode={code}
                  onChange={setCode}
                />
              </div>

              {showSuccess && (
                <div className="mb-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-lg shadow-md animate-fade-in border-2 border-green-300">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 size={14} />
                    <div>
                      <p className="font-bold text-xs">Great job!</p>
                      <p className="text-xs text-green-50">Marked as complete!</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Console Output */}
              <div className="mt-2 border-2 border-gray-300 rounded-lg bg-gray-900 text-gray-100 font-mono text-xs">
                <div className="flex items-center justify-between px-2 py-1 bg-gray-800 border-b border-gray-700">
                  <div className="flex items-center space-x-1.5">
                    <Terminal size={12} className="text-green-400" />
                    <span className="text-gray-300 font-semibold text-xs">Console</span>
                  </div>
                  {consoleOutput.length > 0 && (
                    <button
                      onClick={clearConsole}
                      className="flex items-center space-x-1 text-gray-400 hover:text-gray-200 transition-colors text-xs"
                      title="Clear console"
                    >
                      <Trash2 size={10} />
                      <span className="text-xs">Clear</span>
                    </button>
                  )}
                </div>
                <div className="p-2 min-h-[80px] max-h-[200px] overflow-y-auto">
                  {consoleOutput.length === 0 ? (
                    <div className="text-gray-500 italic text-xs">
                      Click "Run" to see output or "Test" to validate
                    </div>
                  ) : (
                    consoleOutput.map((line, index) => {
                      // Style different types of messages
                      let textColor = 'text-green-400' // Default: green for output
                      if (line.startsWith('❌')) {
                        textColor = 'text-red-400'
                      } else if (line.startsWith('✅')) {
                        textColor = 'text-green-400'
                      } else if (line.startsWith('🔍')) {
                        textColor = 'text-yellow-400'
                      } else if (line.startsWith('⚠️') || line.startsWith('💡')) {
                        textColor = 'text-yellow-400'
                      } else if (line.startsWith('✓')) {
                        textColor = 'text-green-400'
                      } else if (line.trim() === '') {
                        return <div key={index} className="h-1"></div>
                      }
                      
                      return (
                        <div key={index} className={`mb-0.5 ${textColor} whitespace-pre-wrap text-xs`}>
                          {line}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-2 mt-2">
                <div className="flex items-start space-x-1.5">
                  <Lightbulb className="text-blue-600 flex-shrink-0 mt-0.5" size={12} />
                  <div>
                    <p className="text-xs font-semibold text-gray-900 mb-0.5">💡 Pro Tip</p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Use <code className="bg-blue-100 px-0.5 rounded text-xs">print()</code> to see output, or test in Roblox Studio!
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
