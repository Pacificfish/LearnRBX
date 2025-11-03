// Mock Lua code execution for console output

export interface RunResult {
  output: string[]
  success: boolean
}

/**
 * Simple mock execution that captures print() statements
 */
export function mockRunLua(code: string): RunResult {
  const output: string[] = []
  const variables: Record<string, string | number> = {}

  try {
    // Extract variable assignments
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

    // Find and evaluate print statements
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
          const trimmedPart = part.replace(/["']/g, '')
          if (variables[trimmedPart] !== undefined) {
            result += String(variables[trimmedPart])
          } else if ((part.startsWith('"') && part.endsWith('"')) ||
                     (part.startsWith("'") && part.endsWith("'"))) {
            result += part.slice(1, -1)
          } else if (!isNaN(Number(part))) {
            result += String(Number(part))
          } else {
            // Try to extract variable name from the part
            const varNameMatch = part.match(/(\w+)/)
            if (varNameMatch && variables[varNameMatch[1]]) {
              result += String(variables[varNameMatch[1]])
            } else {
              result += part.replace(/["']/g, '')
            }
          }
        }
      }
      // Handle property access (e.g., player.Name)
      else if (printArg.includes('.')) {
        const parts = printArg.split('.')
        const varName = parts[0].trim()
        if (variables[varName]) {
          // For now, just show the variable value
          result = String(variables[varName])
        } else {
          result = printArg
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
      // Handle string with variables (simple cases)
      else {
        result = printArg.replace(/["']/g, '').trim()
      }

      if (result) {
        output.push(result)
      }
    }

    // If no output found but code exists, show a message
    if (output.length === 0 && code.trim().length > 0) {
      output.push('(No output - add print() statements to see output here)')
    }

    return {
      output,
      success: true,
    }
  } catch (error) {
    return {
      output: [`Error: ${error instanceof Error ? error.message : 'Unknown error'}`],
      success: false,
    }
  }
}

