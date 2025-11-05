// Lesson-specific validation functions

export interface ValidationResult {
  passed: boolean
  messages: { type: 'pass' | 'fail' | 'info'; text: string }[]
  objectives: { label: string; done: boolean }[]
}

/**
 * Validates the "Working with Players" lesson
 * Checks for Players.PlayerAdded:Connect and print with player.Name
 */
export function validatePlayersLesson(code: string): ValidationResult {
  const messages: { type: 'pass' | 'fail' | 'info'; text: string }[] = []
  const objectives = [
    { label: 'Get the Players service', done: false },
    { label: 'Connect to PlayerAdded event', done: false },
    { label: 'Access player properties', done: false },
  ]

  let passed = true

  // Check for Players service
  const hasPlayersService = /game\s*:\s*GetService\s*\(\s*["']Players["']\s*\)/i.test(code) ||
                           /Players\s*=\s*game\s*:\s*GetService/i.test(code)
  
  if (hasPlayersService) {
    objectives[0].done = true
    messages.push({ type: 'pass', text: 'Players service accessed correctly' })
  } else {
    passed = false
    messages.push({ type: 'fail', text: 'Need to get Players service using game:GetService("Players")' })
  }

  // Check for PlayerAdded listener
  const hasListener = /Players\.PlayerAdded\s*:\s*Connect\s*\(\s*function\s*\(\s*player\s*\)/m.test(code) ||
                    /Players\.PlayerAdded\s*:\s*Connect\s*\(\s*function\s*\([^)]*player/m.test(code)
  
  if (hasListener) {
    objectives[1].done = true
    messages.push({ type: 'pass', text: 'PlayerAdded event connected correctly' })
  } else {
    passed = false
    messages.push({ type: 'fail', text: 'Need to connect to Players.PlayerAdded:Connect(function(player)' })
  }

  // Check for print with player.Name - allow spaces/quotes
  const printsName = /print\s*\(\s*[^)]*player\s*\.\s*Name[^)]*\)/m.test(code) ||
                     /print\s*\(\s*[^)]*player\s*\.\s*name[^)]*\)/i.test(code)
  
  if (printsName) {
    objectives[2].done = true
    messages.push({ type: 'pass', text: 'Player name accessed and printed correctly' })
  } else {
    passed = false
    messages.push({ type: 'fail', text: 'Make sure your print uses player.Name.' })
  }

  if (passed) {
    messages.unshift({ type: 'info', text: 'All tests passed! Great job!' })
  } else {
    messages.unshift({ type: 'info', text: 'Some checks failed. Review the feedback above.' })
  }

  return {
    passed,
    messages,
    objectives,
  }
}

/**
 * Generic validation for simple print statements
 */
export function validateSimplePrint(code: string, expectedText: string): ValidationResult {
  const normalizedCode = code.toLowerCase()
  const normalizedExpected = expectedText.toLowerCase()

  const hasPrint = normalizedCode.includes('print(')
  const hasExpectedText = normalizedCode.includes(normalizedExpected)

  const passed = hasPrint && hasExpectedText

  return {
    passed,
    messages: passed
      ? [{ type: 'pass', text: '✓ Print statement is correct!' }]
      : [{ type: 'fail', text: '✗ Make sure to use print() with the correct text' }],
    objectives: [{ label: 'Use print() function', done: passed }],
  }
}

