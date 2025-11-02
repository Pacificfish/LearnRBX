export interface Lesson {
  id: string
  title: string
  description: string
  content: string
  initialCode: string
  solution?: string
  hints: string[]
  objectives: string[]
}

export interface Course {
  id: string
  title: string
  description: string
  icon: string
  color: string
  lessons: Lesson[]
  estimatedTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

export const courses: Course[] = [
  {
    id: 'lua-basics',
    title: 'Lua Fundamentals',
    description: 'Master the fundamentals of Lua programming language',
    icon: '📚',
    color: 'blue',
    estimatedTime: '12 hours',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'getting-started',
        title: 'Getting Started with Lua',
        description: 'Introduction to Lua programming and your first code',
        content: `# Getting Started with Lua

Welcome to Lua programming! Lua is the scripting language that powers every Roblox game. Whether you're making an obby, a simulator, or an RPG, Lua is what makes everything happen.

## What is Lua?

**Lua** (pronounced "LOO-ah") is a lightweight, fast, and powerful scripting language designed for embedding into applications. Roblox chose Lua because it's:
- **Simple**: Easy to learn, especially for beginners
- **Fast**: Optimized for performance in games
- **Flexible**: Can handle complex game logic
- **Portable**: Works the same across different platforms

In Roblox, Lua scripts control everything: character movement, game mechanics, UI interactions, physics, and more!

## Your First Code

Let's write your very first Lua program:

\`\`\`lua
-- This is a comment! Comments start with --
-- Comments are ignored by the computer - they're for humans to read
print("Hello, World!")
\`\`\`

This simple line does something powerful: it **displays text**. The \`print()\` function takes text (in quotes) and shows it in the Output window.

### Breaking Down the Code

- **\`--\`**: Starts a comment - everything after this on the line is ignored
- **\`print()\`**: A built-in Lua function that displays output
- **\`"Hello, World!"\`**: A string (text) - notice the quotes!
- **Parentheses**: Required for function calls

## Basic Syntax Rules

Lua has some unique syntax rules that make it beginner-friendly:

### 1. No Semicolons Needed

Unlike many languages, Lua doesn't require semicolons at the end of lines:
\`\`\`lua
-- Good!
print("Hello")

-- Also good!
print("Hello");
\`\`\`
Both work, but most Lua programmers skip the semicolon.

### 2. Comments

Comments help you (and others) understand your code:
\`\`\`lua
-- Single line comment

--[[
    Multi-line comment
    Can span multiple lines
    Useful for explaining complex code
--]]
\`\`\`

### 3. Case Sensitive

Lua is case-sensitive, meaning uppercase and lowercase matter:
\`\`\`lua
print("Hello")  -- Works
Print("Hello")   -- Error! 'Print' doesn't exist
PRINT("Hello")   -- Also an error!
\`\`\`

### 4. Strings Need Quotes

Text must be wrapped in quotes:
\`\`\`lua
print("Hello")      -- Correct
print(Hello)        -- Error! Lua thinks Hello is a variable
print('Hello')      -- Also correct - single quotes work too
\`\`\`

## The print() Function

\`print()\` is your best friend for debugging and learning. It displays information in the Output window:
- In Roblox Studio: View → Output
- Shows what your code is doing
- Essential for testing and debugging

### Examples

\`\`\`lua
print("My name is Roblox")
print(42)                    -- Prints numbers too!
print("The answer is: " .. 42)  -- Combining text and numbers
\`\`\`

## Why This Matters

Understanding these basics is crucial because:
- **Every script starts with these concepts**
- **Comments help you remember what your code does**
- **print() lets you see what's happening**
- **Syntax errors are common when learning** - these rules help prevent them

## Common Mistakes to Avoid

1. **Forgetting quotes around text**: \`print(Hello)\` won't work - use \`print("Hello")\`
2. **Missing parentheses**: \`print "Hello"\` won't work - use \`print("Hello")\`
3. **Typos**: \`prnt("Hello")\` won't work - spell \`print\` correctly

## Try It!

Let's print your first message! Try different messages to see how it works.`,
        initialCode: `-- ============================================
-- TASK: Print "Hello, World!" to the console
-- ============================================
--
-- Instructions:
-- Use the print() function to display "Hello, World!"
--
-- Syntax: print("your message here")
--
-- Example: print("Hello, World!")
-- ============================================

-- TODO: Write a print statement that displays "Hello, World!"
-- Hint: Use print("Hello, World!")

`,
        solution: `-- Print "Hello, World!"
-- Use print("your message here")
print("Hello, World!")`,
        hints: [
          'Use the print() function - it\'s a built-in Lua function that displays text',
          'Put your message inside quotes (double or single): print("Hello, World!")',
          'Don\'t forget the parentheses after print - function calls always need ()',
          'The print function expects text (string) in quotes, not a variable name without quotes',
        ],
        objectives: [
          'Write your first line of Lua code',
          'Use the print() function',
          'Understand basic Lua syntax',
        ],
      },
      {
        id: 'variables',
        title: 'Variables and Data Types',
        description: 'Learn how to declare variables and work with different data types in Lua',
        content: `# Variables and Data Types

Variables are **containers that store information**. Think of them like labeled boxes where you can put things and retrieve them later. In Lua, variables are how you store and work with data in your scripts.

## What Are Variables?

A variable is a **named storage location** in your computer's memory. You give it a name (like \`playerName\` or \`health\`) and assign it a value. Later, you can use that name to access or change the value.

### Why Variables Matter

Variables let you:
- **Store information**: Remember values for later use
- **Make code readable**: \`playerHealth\` is clearer than just \`100\`
- **Update values**: Change data as your game runs
- **Reuse values**: Use the same value multiple times without repeating it

## Lua's Dynamic Typing

Unlike some languages, Lua is **dynamically typed**. This means:
- You **don't need to declare the type** when creating a variable
- Lua **automatically figures out** what type of data you're storing
- You can **change the type** of a variable later (though this is usually not recommended)

## Basic Data Types

Lua has several fundamental data types you'll use constantly:

### 1. Numbers

Numbers can be **integers** (whole numbers) or **floats** (decimals):

\`\`\`lua
local wholeNumber = 42           -- Integer
local decimalNumber = 3.14159    -- Float (decimal)
local negative = -10             -- Negative numbers work too
local largeNumber = 1000000      -- Can be very large
\`\`\`

**Key Points**:
- No need to specify if it's an integer or float
- Lua handles both seamlessly
- Use for calculations, scores, health, etc.

### 2. Strings

Strings are **text data** - anything you want to display or store as text:

\`\`\`lua
local name = "Roblox"           -- Double quotes
local greeting = 'Hello'        -- Single quotes work too
local emptyString = ""          -- Empty string (still exists!)
local numberAsString = "123"    -- This is text, not a number!
\`\`\`

**Important Notes**:
- Quotes are **required** - without them, Lua thinks it's a variable name
- \`"123"\` is different from \`123\` (string vs number)
- Can concatenate (join) strings with \`..\`: \`"Hello" .. "World"\` = \`"HelloWorld"\`

### 3. Booleans

Booleans represent **true or false** - perfect for conditions and flags:

\`\`\`lua
local isPlayerAlive = true      -- Player is alive
local isGamePaused = false      -- Game is not paused
local canJump = true             -- Player can jump
\`\`\`

**Use Cases**:
- Track state (is something on/off, alive/dead, etc.)
- Control game logic with if statements
- Remember yes/no decisions

### 4. Nil

Nil means **"no value"** or **"doesn't exist"**:

\`\`\`lua
local emptyVariable = nil       -- Explicitly no value
local unassignedVariable        -- Also nil (if never assigned)
\`\`\`

**Common Uses**:
- Check if something exists: \`if variable == nil then ...\`
- Clear a value: \`variable = nil\`
- Default return when something isn't found

## The \`local\` Keyword - Critical!

**Always use \`local\`** when creating variables. This is one of the most important best practices in Lua!

### Why Local Matters

\`\`\`lua
-- BAD: Global variable (pollutes global scope)
name = "Roblox"

-- GOOD: Local variable (scoped to current block)
local name = "Roblox"
\`\`\`

**Problems with Global Variables**:
1. **Name conflicts**: Another script might use the same name
2. **Performance**: Slower than local variables
3. **Memory**: Can't be garbage collected as easily
4. **Debugging**: Harder to track where values come from

### Local Scope

\`local\` variables exist only in the **scope** where they're created:

\`\`\`lua
local x = 10        -- x exists here

if true then
    local y = 20    -- y only exists in this if block
    print(x)        -- Can access x (outer scope)
    print(y)        -- Can access y (inner scope)
end

print(y)            -- ERROR! y doesn't exist here anymore
\`\`\`

## Variable Naming Best Practices

Good variable names make code readable:

\`\`\`lua
-- GOOD: Clear and descriptive
local playerHealth = 100
local playerName = "Hero"
local isGameActive = true

-- BAD: Unclear what they mean
local h = 100           -- What is h?
local x = "Hero"        -- What is x?
local flag = true       -- Flag for what?
\`\`\`

**Naming Rules**:
- Start with a letter or underscore
- Can contain letters, numbers, and underscores
- Case-sensitive: \`playerName\` ≠ \`playername\`
- Use camelCase for readability: \`playerHealth\` not \`player_health\`

## Assigning and Reassigning

You can change variable values:

\`\`\`lua
local health = 100     -- Initial value
health = 50            -- Change it
health = health - 10    -- Subtract 10
health = 0             -- Set to zero
\`\`\`

**Note**: You don't need \`local\` again when reassigning - only when first creating the variable!

## Common Patterns

\`\`\`lua
-- Store player information
local playerName = "RobloxPlayer"
local playerLevel = 25
local playerCoins = 1500

-- Store game state
local isGameRunning = true
local currentWave = 1

-- Store calculated values
local totalScore = playerLevel * 10 + playerCoins
\`\`\`

## Why Understanding Variables is Crucial

Variables are the foundation of programming:
- **Every script uses them**
- **Game state is stored in variables**
- **Without variables, you can't remember anything**
- **Master them before moving to more complex topics**

Practice creating variables with different types and names to get comfortable!`,
        initialCode: `-- ============================================
-- TASK: Create variables and print them
-- ============================================
--
-- Instructions:
-- 1. Write a line to create a string variable called 'name' with your name
--    Example: local name = "YourName"
-- 2. Write a line to create a number variable called 'number' with any number
--    Example: local number = 42
-- 3. The print statements are already provided below
--
-- Remember:
-- - Strings need quotes: "text"
-- - Numbers don't need quotes: 42
-- - Use 'local' before the variable name
-- ============================================

-- TODO: Write a line to create a string variable called 'name'
-- Format: local name = "your name here"
-- Example: local name = "Roblox"




-- TODO: Write a line to create a number variable called 'number'
-- Format: local number = your_number_here
-- Example: local number = 42




-- These print statements will display your variables (already done for you)
print(name)
print(number)`,
        solution: `-- Create a variable for your name
local name = "YourName"

-- Create a variable for a number
local number = 42

-- Print both variables
print(name)
print(number)`,
        hints: [
          'Use quotes for strings: "text"',
          'Numbers don\'t need quotes: 42',
          'Make sure to add actual values, not just leave them empty!',
        ],
        objectives: [
          'Create a string variable',
          'Create a number variable',
          'Use print() to display values',
        ],
      },
      {
        id: 'functions',
        title: 'Functions',
        description: 'Learn how to create and use functions',
        content: `# Functions

Functions are **reusable blocks of code** that perform specific tasks. Think of them as recipes - you write the recipe once, then use it multiple times with different ingredients (parameters).

## Why Functions Matter

Without functions, you'd repeat the same code over and over. Functions let you:
- **Avoid repetition**: Write once, use many times
- **Organize code**: Break complex problems into smaller pieces
- **Make code readable**: \`healPlayer(player, 50)\` is clearer than 20 lines of healing logic
- **Debug easily**: Fix bugs in one place instead of many

## What is a Function?

A function is a named block of code that:
1. Takes **inputs** (parameters/arguments)
2. Performs **operations**
3. Can **return** a result (optional)

## Creating Functions

The basic syntax is:

\`\`\`lua
function functionName(parameter1, parameter2)
    -- Code here
    -- Do something with parameters
end
\`\`\`

### Your First Function

Let's create a simple greeting function:

\`\`\`lua
function greet(name)
    print("Hello, " .. name .. "!")
end

-- Now use it:
greet("Roblox")      -- Prints: "Hello, Roblox!"
greet("Developer")    -- Prints: "Hello, Developer!"
\`\`\`

**Breaking it down**:
- \`function\`: Keyword that starts function definition
- \`greet\`: The function's name (you choose this)
- \`(name)\`: Parameter list - \`name\` is a variable that holds the input
- \`print(...)\`: The function's body - what it does
- \`end\`: Keyword that ends the function

### Multiple Parameters

Functions can take multiple inputs:

\`\`\`lua
function introduce(name, age)
    print(name .. " is " .. age .. " years old")
end

introduce("Roblox", 18)  -- Prints: "Roblox is 18 years old"
\`\`\`

### No Parameters

Functions don't always need parameters:

\`\`\`lua
function sayHello()
    print("Hello, World!")
end

sayHello()  -- Prints: "Hello, World!"
\`\`\`

## Returning Values

Functions can **return** results using the \`return\` keyword:

\`\`\`lua
function add(a, b)
    local sum = a + b
    return sum
end

local result = add(5, 3)  -- result is now 8
print(result)              -- Prints: 8
\`\`\`

### Why Return is Powerful

Returned values let you use function results:

\`\`\`lua
function calculateDamage(baseDamage, multiplier)
    return baseDamage * multiplier
end

local damage = calculateDamage(10, 2.5)  -- 25 damage
local finalHealth = playerHealth - damage
\`\`\`

### Multiple Returns

Lua functions can return multiple values:

\`\`\`lua
function getPlayerStats(player)
    return player.Level, player.Health, player.Gold
end

local level, health, gold = getPlayerStats(myPlayer)
-- Now you have all three values!
\`\`\`

## Calling Functions

To use a function, you **call** it with parentheses:

\`\`\`lua
-- Define the function
function greet(name)
    print("Hello, " .. name)
end

-- Call the function (use it)
greet("Roblox")     -- Correct - calls the function
greet               -- Wrong - this is the function itself, doesn't execute it
\`\`\`

## Function Scope

Variables inside functions are **local to that function**:

\`\`\`lua
function calculate()
    local x = 10    -- x only exists in this function
    return x * 2
end

print(x)            -- ERROR! x doesn't exist here
\`\`\`

## Common Patterns

### Helper Functions

Small functions that do one thing well:

\`\`\`lua
function clamp(value, min, max)
    if value < min then
        return min
    elseif value > max then
        return max
    else
        return value
    end
end

local health = clamp(playerHealth, 0, 100)  -- Keeps health between 0-100
\`\`\`

### Functions for Game Logic

\`\`\`lua
function dealDamage(character, amount)
    local humanoid = character and character:FindFirstChildOfClass("Humanoid")
    if humanoid then
        humanoid.Health = humanoid.Health - amount
        print("Dealt " .. amount .. " damage!")
    end
end

dealDamage(player.Character, 25)
\`\`\`

## Best Practices

1. **Name functions clearly**: \`healPlayer()\` not \`hp()\`
2. **Keep functions focused**: One function, one job
3. **Use parameters**: Don't hardcode values inside functions
4. **Return values**: When appropriate, return results instead of just printing
5. **Local functions**: Use \`local function\` to avoid global scope pollution

## Why Functions Are Essential

Functions are fundamental to programming:
- **Every game uses them extensively**
- **Makes code maintainable and readable**
- **Foundation for more advanced concepts**
- **Industry standard practice**

Master functions before moving to complex topics!`,
        initialCode: `-- ============================================
-- TASK: Create a function that greets someone
-- ============================================
--
-- Instructions:
-- 1. Complete the greet function to print "Hello, " followed by the name
-- 2. Use string concatenation with .. to join strings
-- 3. Example: print("Hello, " .. name .. "!")
--
-- The function will be called automatically with "Roblox"
-- ============================================

-- TODO: Complete this function to print a greeting
-- It should print: "Hello, " .. name .. "!"
-- Example: If name is "Roblox", it should print "Hello, Roblox!"
function greet(name)
    -- Write your code here
    -- Use: print("Hello, " .. name .. "!")
    
end

-- This calls your function with "Roblox" - test it with Run Code!
greet("Roblox")`,
        solution: `-- Create a function that prints a greeting
function greet(name)
    print("Hello, " .. name .. "!")
end

-- Call the function
greet("Roblox")`,
        hints: [
          'Use .. to concatenate strings',
          'The print() function displays text',
          'Don\'t forget the exclamation mark!',
        ],
        objectives: [
          'Create a function that takes a parameter',
          'Use string concatenation',
          'Call the function with an argument',
        ],
      },
      {
        id: 'tables',
        title: 'Tables and Arrays',
        description: 'Learn how to work with tables - Lua\'s only data structure',
        content: `# Tables and Arrays

**Tables are Lua's only data structure** - and they're incredibly powerful! Think of a table as a container that can hold multiple pieces of information. Unlike many languages that have separate types for arrays, dictionaries, and objects, Lua uses tables for everything.

## What is a Table?

A table is a **collection of key-value pairs**. Each piece of data in a table has:
- A **key**: How you identify/access the data
- A **value**: The actual data stored

Tables can be used as:
- **Arrays**: Ordered lists (keys are numbers: 1, 2, 3...)
- **Dictionaries**: Key-value stores (keys are strings: "name", "level"...)
- **Objects**: Structures that hold related data
- **And much more!**

## Array-Style Tables (Lists)

Arrays are **ordered lists** where items are accessed by their position (index):

\`\`\`lua
-- Create an array (list) of items
local items = {"sword", "shield", "potion"}
\`\`\`

**Important**: Lua arrays start at **index 1**, not 0! This is different from many languages.

### Accessing Array Elements

\`\`\`lua
local items = {"sword", "shield", "potion"}

print(items[1])  -- "sword" (first item)
print(items[2])  -- "shield" (second item)
print(items[3])  -- "potion" (third item)
print(items[4])  -- nil (doesn't exist)
\`\`\`

### Adding Items to Arrays

\`\`\`lua
local items = {}

-- Method 1: Using table.insert()
table.insert(items, "sword")
table.insert(items, "shield")
-- items now contains: {"sword", "shield"}

-- Method 2: Direct assignment
items[1] = "sword"
items[2] = "shield"
-- Same result

-- Method 3: Initialize with values
local weapons = {"sword", "axe", "bow"}
\`\`\`

### Getting Array Length

Use the \`#\` operator to get the number of items:

\`\`\`lua
local items = {"sword", "shield", "potion"}
print(#items)  -- Prints: 3
\`\`\`

## Dictionary-Style Tables (Key-Value Pairs)

Dictionaries store data with **named keys** instead of numeric positions:

\`\`\`lua
-- Create a dictionary-style table
local player = {
    name = "RobloxPlayer",
    level = 10,
    health = 100,
    gold = 500
}
\`\`\`

### Accessing Dictionary Values

\`\`\`lua
-- Method 1: Dot notation (preferred for readability)
print(player.name)      -- "RobloxPlayer"
print(player.level)     -- 10

-- Method 2: Bracket notation (more flexible)
print(player["name"])   -- "RobloxPlayer"
print(player["level"])  -- 10

-- Bracket notation allows variables as keys!
local key = "name"
print(player[key])      -- "RobloxPlayer"
\`\`\`

### Adding/Modifying Dictionary Values

\`\`\`lua
local player = {}

-- Add values
player.name = "Hero"
player.level = 1
player.health = 100

-- Or initialize all at once
local player = {
    name = "Hero",
    level = 1,
    health = 100
}

-- Modify values
player.level = 2         -- Level up!
player.health = player.health - 10  -- Take damage
\`\`\`

## Mixing Arrays and Dictionaries

Tables can be both! This is powerful:

\`\`\`lua
local player = {
    name = "Hero",           -- Dictionary style
    level = 10,                 -- Dictionary style
    inventory = {             -- Nested array!
        "sword",
        "shield",
        "potion"
    },
    stats = {                 -- Nested dictionary!
        health = 100,
        mana = 50,
        strength = 25
    }
}

-- Access nested data
print(player.name)                    -- "Hero"
print(player.inventory[1])            -- "sword"
print(player.stats.health)            -- 100
\`\`\`

## Iterating Over Tables

### Iterating Arrays (ipairs)

Use \`ipairs\` to loop through arrays in order:

\`\`\`lua
local items = {"sword", "shield", "potion"}

for index, value in ipairs(items) do
    print(index .. ": " .. value)
end

-- Output:
-- 1: sword
-- 2: shield
-- 3: potion
\`\`\`

### Iterating Dictionaries (pairs)

Use \`pairs\` to loop through all key-value pairs:

\`\`\`lua
local player = {
    name = "Hero",
    level = 10,
    health = 100
}

for key, value in pairs(player) do
    print(key .. ": " .. tostring(value))
end

-- Output (order may vary):
-- name: Hero
-- level: 10
-- health: 100
\`\`\`

## Common Table Operations

### Removing Items

\`\`\`lua
local items = {"sword", "shield", "potion"}

-- Remove last item
table.remove(items)  -- Removes "potion"

-- Remove specific index
table.remove(items, 1)  -- Removes "sword", shifts remaining items
\`\`\`

### Finding Items

\`\`\`lua
local items = {"sword", "shield", "potion"}

-- Check if table contains a value (simple search)
for i, item in ipairs(items) do
    if item == "sword" then
        print("Found sword at index " .. i)
        break
    end
end
\`\`\`

## Why Tables Are Essential

Tables are used everywhere in Roblox scripting:
- **Player inventories**: Lists of items
- **Game data**: Player stats, game settings
- **Collections**: Groups of parts, enemies, etc.
- **Configuration**: Game settings, item data
- **State management**: Tracking game state

## Best Practices

1. **Use arrays for ordered lists**: When order matters
2. **Use dictionaries for named data**: When you need descriptive keys
3. **Keep tables organized**: Use clear, consistent naming
4. **Initialize properly**: Set up structure before using
5. **Check if keys exist**: Use \`if table[key] then\` before accessing

Master tables - they're the foundation of organizing data in Lua!`,
        initialCode: `-- ============================================
-- TASK: Create an array and add items to it
-- ============================================
--
-- Instructions:
-- 1. The array is already created (local items = {})
-- 2. Add at least 3 items to the array using table.insert()
--    Example: table.insert(items, "sword")
-- 3. Print the first item using items[1]
--
-- Remember:
-- - Use table.insert(table, value) to add items
-- - Access items with items[1], items[2], etc.
-- - Arrays start at index 1 in Lua!
-- ============================================

-- The array is already created
local items = {}

-- TODO: Add 3 items to the array
-- Use: table.insert(items, "itemName")
-- Example: table.insert(items, "sword")
table.insert(items, )
table.insert(items, )
table.insert(items, )

-- TODO: Print the first item
-- Use: print(items[1])
print(`,
        solution: `-- Create an array of items
local items = {}

-- Add some items to the array
table.insert(items, "sword")
table.insert(items, "shield")
table.insert(items, "potion")

-- Print the first item
print(items[1])`,
        hints: [
          'Use table.insert(table, value) to add items',
          'Or use items[1] = "value" directly',
          'Arrays start at index 1 in Lua!',
        ],
        objectives: [
          'Create a table',
          'Add items to a table',
          'Access table values by index',
        ],
      },
      {
        id: 'conditionals',
        title: 'If Statements and Conditions',
        description: 'Control the flow of your code with conditionals',
        content: `# If Statements and Conditions

**Conditionals** let your code make decisions - they're how you tell your program "if this is true, do that, otherwise do something else." Without conditionals, code would run the same way every time, making games impossible!

## What Are Conditionals?

Conditionals check if something is true or false, then execute different code based on the result. They're the foundation of game logic:
- "If player health is low, show warning"
- "If player has enough coins, allow purchase"
- "If enemy is near, start attack"

## Basic If Statement

The simplest conditional checks one condition:

\`\`\`lua
local health = 75

if health > 50 then
    print("You're healthy!")
end
\`\`\`

**Breaking it down**:
- \`if\`: Starts the conditional
- \`health > 50\`: The condition (checking if health is greater than 50)
- \`then\`: Required keyword
- \`print(...)\`: Code that runs if condition is true
- \`end\`: Closes the if statement

### If-Else

Add an \`else\` clause to handle when the condition is false:

\`\`\`lua
local health = 75

if health > 50 then
    print("You're healthy!")
else
    print("You need healing!")
end
\`\`\`

Now the code always prints something - either "healthy" or "need healing".

### If-ElseIf-Else

Chain multiple conditions with \`elseif\`:

\`\`\`lua
local health = 75

if health > 50 then
    print("You're healthy!")
elseif health > 25 then
    print("You're hurt!")
else
    print("You're critical!")
end
\`\`\`

**Important**: Conditions are checked **in order**. Once one is true, the rest are skipped!

## Comparison Operators

These operators compare values and return true/false:

### Equality Checks

\`\`\`lua
local health = 100

-- == (equals) - Checks if values are equal
if health == 100 then
    print("Full health!")
end

-- ~= (not equals) - Checks if values are different
if health ~= 0 then
    print("Still alive!")
end
\`\`\`

**Critical Note**: Use \`==\` for comparison, NOT \`=\`! 
- \`==\`: Compares (returns true/false)
- \`=\`: Assigns (sets a value)

### Comparison Operators

\`\`\`lua
local score = 85

-- < (less than)
if score < 60 then
    print("Failed")
end

-- > (greater than)
if score > 90 then
    print("Excellent!")
end

-- <= (less than or equal)
if score <= 50 then
    print("Needs improvement")
end

-- >= (greater than or equal)
if score >= 80 then
    print("Passing!")
end
\`\`\`

## Logical Operators

Combine multiple conditions:

### AND (both must be true)

\`\`\`lua
local health = 75
local hasPotion = true

if health < 100 and hasPotion then
    print("Use a potion!")
end
\`\`\`

### OR (at least one must be true)

\`\`\`lua
local key1 = true
local key2 = false

if key1 or key2 then
    print("Door unlocked!")
end
\`\`\`

### NOT (opposite)

\`\`\`lua
local isPaused = false

if not isPaused then
    print("Game is running!")
end
\`\`\`

## Real-World Examples

### Health System

\`\`\`lua
local playerHealth = 45

if playerHealth <= 0 then
    print("Player died!")
    -- Trigger respawn
elseif playerHealth < 25 then
    print("Critical health! Find healing!")
elseif playerHealth < 50 then
    print("Low health warning")
else
    print("Health is good")
end
\`\`\`

### Score-Based Rewards

\`\`\`lua
local score = 1250

if score >= 1000 then
    print("Gold medal!")
elseif score >= 500 then
    print("Silver medal!")
elseif score >= 250 then
    print("Bronze medal!")
else
    print("Keep practicing!")
end
\`\`\`

### Access Control

\`\`\`lua
local playerLevel = 15
local requiredLevel = 10
local hasPermission = true

if playerLevel >= requiredLevel and hasPermission then
    print("Access granted!")
else
    print("Access denied!")
end
\`\`\`

## Common Mistakes

1. **Using = instead of ==**: \`if health = 100\` is wrong! Use \`if health == 100\`
2. **Missing then**: Every \`if\` needs \`then\`
3. **Missing end**: Every \`if\` block needs \`end\`
4. **Wrong operator**: \`~=\` not \`!=\` (Lua uses ~= for "not equals")

## Best Practices

1. **Use clear conditions**: \`if playerHealth < 25\` not \`if playerHealth == low\`
2. **Order matters**: Check most specific conditions first
3. **Use elseif for ranges**: Cleaner than multiple if statements
4. **Add comments**: Explain why conditions matter
5. **Handle all cases**: Use \`else\` for unexpected values

## Why Conditionals Are Essential

Conditionals are in every game script:
- **Game state**: Menu, playing, paused
- **Player actions**: Can jump? Can attack?
- **AI logic**: Enemy behavior decisions
- **Game mechanics**: Win/lose conditions
- **UI updates**: Show/hide elements based on state

Master conditionals - they're how games make decisions!`,
        initialCode: `-- ============================================
-- TASK: Write conditional logic based on score
-- ============================================
--
-- Instructions:
-- Write an if-elseif-else statement that prints:
-- - "Great job!" if score >= 90
-- - "Good work!" if score >= 70
-- - "Keep practicing!" otherwise
--
-- Syntax:
-- if condition then
--     -- code here
-- elseif condition then
--     -- code here
-- else
--     -- code here
-- end
-- ============================================

local score = 85

-- TODO: Write the if-elseif-else statement here
-- Check if score >= 90, then >= 70, otherwise print the third message

`,
        solution: `local score = 85

if score >= 90 then
    print("Great job!")
elseif score >= 70 then
    print("Good work!")
else
    print("Keep practicing!")
end`,
        hints: [
          'Use >= (greater than or equal) to check if score is 90 or higher: score >= 90',
          'Chain conditions with elseif: if condition1 then ... elseif condition2 then ... else ... end',
          'The else clause handles all cases that don\'t match previous conditions',
          'Remember: conditions are checked in order, so put the highest threshold first',
        ],
        objectives: [
          'Write an if statement',
          'Use comparison operators',
          'Handle multiple conditions with elseif',
        ],
      },
      {
        id: 'loops',
        title: 'Loops - For and While',
        description: 'Learn how to repeat code with loops',
        content: `# Loops

Loops let you repeat code multiple times.

## For Loops

\`\`\`lua
-- Numeric for loop
for i = 1, 10 do
    print("Number: " .. i)
end

-- Iterating over a table
local items = {"apple", "banana", "orange"}
for i, item in ipairs(items) do
    print(i .. ": " .. item)
end
\`\`\`

## While Loops

\`\`\`lua
local count = 0
while count < 5 do
    count = count + 1
    print("Count: " .. count)
end
\`\`\`

## Break Statement

Use \`break\` to exit a loop early:

\`\`\`lua
for i = 1, 10 do
    if i == 5 then
        break  -- Exit loop when i is 5
    end
    print(i)
end
\`\`\``,
        initialCode: `-- ============================================
-- TASK: Loop through an array and print each item
-- ============================================
--
-- Instructions:
-- 1. Use a for loop with ipairs() to iterate over the numbers array
-- 2. Print each number (or format it nicely)
--
-- Syntax:
-- for index, value in ipairs(table) do
--     print(value)
-- end
--
-- Example:
-- for i, num in ipairs(numbers) do
--     print("Number " .. i .. ": " .. num)
-- end
-- ============================================

local numbers = {10, 20, 30, 40, 50}

-- TODO: Write a for loop using ipairs() to print each number
-- Format: for index, value in ipairs(numbers) do ... end

`,
        solution: `local numbers = {10, 20, 30, 40, 50}

for i, num in ipairs(numbers) do
    print("Number " .. i .. ": " .. num)
end`,
        hints: [
          'Use ipairs() to iterate over arrays',
          'The syntax is: for index, value in ipairs(table) do',
          'Don\'t forget to close with end',
        ],
        objectives: [
          'Use a for loop with ipairs',
          'Iterate over a table',
          'Access both index and value in loop',
        ],
      },
      {
        id: 'string-math-operators',
        title: 'String Operations and Math',
        description: 'Master string manipulation and mathematical operations',
        content: `# String Operations and Math

## String Operations

Strings can be concatenated, formatted, and manipulated!

\`\`\`lua
-- Concatenation
local name = "Roblox"
local greeting = "Hello, " .. name .. "!"  -- "Hello, Roblox!"

-- String length
local text = "Hello"
print(#text)  -- 5

-- String methods
local str = "hello world"
print(string.upper(str))    -- "HELLO WORLD"
print(string.lower(str))    -- "hello world"
print(string.sub(str, 1, 5)) -- "hello" (substring from index 1 to 5)
\`\`\`

## Math Operations

\`\`\`lua
-- Basic operations
local sum = 5 + 3       -- 8
local diff = 10 - 4    -- 6
local prod = 6 * 7     -- 42
local quot = 20 / 4    -- 5
local mod = 10 % 3     -- 1 (modulo/remainder)
local pow = 2 ^ 3      -- 8 (2 to the power of 3)

-- Math library functions
print(math.floor(3.7))  -- 3 (round down)
print(math.ceil(3.2))   -- 4 (round up)
print(math.max(5, 10, 3))  -- 10 (largest)
print(math.min(5, 10, 3))  -- 3 (smallest)
print(math.random(1, 100)) -- Random number between 1 and 100
\`\`\`

## Logical Operators

\`\`\`lua
local a = true
local b = false

print(a and b)  -- false (both must be true)
print(a or b)   -- true (at least one must be true)
print(not a)     -- false (opposite)
\`\`\``,
        initialCode: `-- Create a player name and level
local playerName = "Hero"
local level = 25

-- Create a message that says: "Hero is level 25!"
-- Use string concatenation (..)
local message = 

-- Calculate the player's health (level * 10)
local health = 

-- Print both
print(message)
print("Health: " .. health)`,
        solution: `-- Create a player name and level
local playerName = "Hero"
local level = 25

-- Create a message that says: "Hero is level 25!"
-- Use string concatenation (..)
local message = playerName .. " is level " .. level .. "!"

-- Calculate the player's health (level * 10)
local health = level * 10

-- Print both
print(message)
print("Health: " .. health)`,
        hints: [
          'Use .. to concatenate strings',
          'Numbers are automatically converted to strings when concatenated',
          'Use * for multiplication',
        ],
        objectives: [
          'Concatenate strings using ..',
          'Perform mathematical operations',
          'Combine strings and numbers',
        ],
      },
      {
        id: 'scope-and-error-handling',
        title: 'Variable Scope and Error Handling',
        description: 'Understand scope, and learn to handle errors with pcall',
        content: `# Variable Scope and Error Handling

## Variable Scope

Variables can be \`local\` (limited scope) or \`global\` (accessible everywhere). Always use \`local\` unless you absolutely need global!

\`\`\`lua
-- Local variable (only accessible in this scope)
local x = 10

if true then
    local y = 20  -- Only exists in this if block
    print(x)       -- Can access x (outer scope)
    print(y)       -- 20
end

-- print(y) would error - y doesn't exist here!

-- Global variable (accessible everywhere - avoid!)
globalVar = 100  -- No 'local' keyword
\`\`\`

## Error Handling with pcall

\`pcall\` (protected call) safely runs code that might error:

\`\`\`lua
local success, result = pcall(function()
    local value = someVariableThatMightNotExist
    return value * 2
end)

if success then
    print("Success! Result: " .. result)
else
    print("Error occurred: " .. result)
end
\`\`\`

## Best Practices

- Always use \`local\` for variables
- Use \`pcall\` when accessing things that might not exist
- Check for \`nil\` before using values:
\`\`\`lua
local part = workspace:FindFirstChild("MyPart")
if part then
    print("Found part: " .. part.Name)
else
    warn("Part not found!")
end
\`\`\``,
        initialCode: `-- Try to find a part that might not exist
-- Use pcall to safely check if it exists

local function findPart(name)
    -- Use pcall to safely access workspace
    local success, part = pcall(function()
        return workspace:FindFirstChild(name)
    end)
    
    if success and part then
        print("Found: " .. part.Name)
        return part
    else
        print("Part not found!")
        return nil
    end
end

-- Test it
findPart("MyPart")`,
        solution: `-- Try to find a part that might not exist
-- Use pcall to safely check if it exists

local function findPart(name)
    -- Use pcall to safely access workspace
    local success, part = pcall(function()
        return workspace:FindFirstChild(name)
    end)
    
    if success and part then
        print("Found: " .. part.Name)
        return part
    else
        print("Part not found!")
        return nil
    end
end

-- Test it
findPart("MyPart")`,
        hints: [
          'pcall returns success (boolean) and the result',
          'Check both success AND if the result exists',
          'Always return nil if not found',
        ],
        objectives: [
          'Understand local vs global scope',
          'Use pcall for error handling',
          'Safely check for nil values',
        ],
      },
    ],
  },
  {
    id: 'roblox-intro',
    title: 'Roblox Scripting Essentials',
    description: 'Master the core concepts of Roblox scripting and Studio',
    icon: '🎮',
    color: 'green',
    estimatedTime: '12 hours',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'instances',
        title: 'Understanding Instances',
        description: 'Learn about Instances - the building blocks of Roblox',
        content: `# Understanding Instances

Everything in Roblox is an Instance! Parts, Models, Scripts, GUIs - they're all Instances.

## Creating Instances

\`\`\`lua
local part = Instance.new("Part")
part.Parent = workspace
part.Name = "MyPart"
\`\`\`

## Finding Instances

\`\`\`lua
-- Find by name
local part = workspace:FindFirstChild("MyPart")

-- Find first of type
local script = workspace:FindFirstChildOfClass("Script")
\`\`\``,
        initialCode: `-- ============================================
-- TASK: Create a Part instance and configure it
-- ============================================
--
-- Instructions:
-- 1. The part is already created for you
-- 2. Set part.Parent to workspace (this makes it visible in the game)
-- 3. Set part.Name to "MyPart" (give it a name)
--
-- Example: part.Parent = workspace
-- Example: part.Name = "MyPart"
-- ============================================

-- The part is already created here
local part = Instance.new("Part")

-- TODO: Set the parent to workspace
part.Parent = 

-- TODO: Give the part a name (use "MyPart")
part.Name = `,
        solution: `-- Create a new Part instance
local part = Instance.new("Part")

-- Set its parent to workspace
part.Parent = workspace

-- Give it a name
part.Name = "MyPart"`,
        hints: [
          'Parent determines where the instance exists',
          'Use workspace for parts in the game',
          'Names help you find instances later',
        ],
        objectives: [
          'Create a new Instance',
          'Set the Parent property',
          'Name the instance',
        ],
      },
      {
        id: 'parts',
        title: 'Working with Parts',
        description: 'Create and manipulate parts in your Roblox game',
        content: `# Working with Parts

Parts are the **3D building blocks** of Roblox games. Think of them as the LEGO bricks that you use to construct your world. Every wall, floor, platform, obstacle, or decorative element in your game is typically a Part.

## What is a Part?

A Part is a **BasePart** - the most fundamental 3D object in Roblox. It's a solid 3D shape that exists in the game world. By default, parts are invisible until you set their properties like size, position, and color.

## Creating Your First Part

To create a part, you use \`Instance.new("Part")\`. This creates a new Part instance, but it won't appear in your game until you set its \`Parent\` property to something visible (like \`workspace\`).

### Step-by-Step Breakdown

Let's break down the creation process:

\`\`\`lua
-- Step 1: Create a new Part instance
local part = Instance.new("Part")
-- At this point, the part exists but is invisible!

-- Step 2: Set the parent to workspace (makes it visible in the game)
part.Parent = workspace
-- Now the part appears, but it's at position (0, 0, 0) with default size

-- Step 3: Position the part in 3D space
part.Position = Vector3.new(0, 10, 0)
-- The part moves to 10 studs above the origin

-- Step 4: Set the size (dimensions) of the part
part.Size = Vector3.new(4, 4, 4)
-- Creates a 4x4x4 cube

-- Step 5: Change the color
part.BrickColor = BrickColor.new("Bright blue")
-- Changes the part's color to bright blue

-- Step 6: (Optional) Change the material for visual effects
part.Material = Enum.Material.Neon
-- Makes the part glow! Great for futuristic games
\`\`\`

## Understanding Vector3

**Vector3** is crucial for working with 3D space in Roblox. It represents a point or direction in 3D coordinates.

### The Three Components

- **X (left/right)**: The horizontal position. Positive X goes to the right, negative goes left.
- **Y (up/down)**: The vertical position (height). Positive Y goes up, negative goes down.
- **Z (forward/back)**: The depth position. Positive Z goes forward (toward you), negative goes back.

### Visual Example

Imagine standing at the origin (0, 0, 0) looking forward:
- **Vector3.new(5, 0, 0)**: 5 studs to your right
- **Vector3.new(0, 10, 0)**: 10 studs above you
- **Vector3.new(0, 0, 5)**: 5 studs in front of you
- **Vector3.new(5, 10, 3)**: 5 studs right, 10 studs up, 3 studs forward

### Common Use Cases

- **Position**: Where the part sits in the world
- **Size**: How big the part is (width, height, depth)
- **Velocity**: Direction and speed of movement (if physics is enabled)

## Important Properties

### Position vs CFrame

- **Position**: Just the center point (Vector3)
- **CFrame**: Position + rotation (more advanced, covered later)

For now, use \`Position\` for simple placement.

### Size Explained

Size is also a Vector3:
- **X**: Width (left-right dimension)
- **Y**: Height (vertical dimension)
- **Z**: Depth (forward-back dimension)

\`Vector3.new(5, 2, 10)\` creates a part that's 5 studs wide, 2 studs tall, and 10 studs deep.

### Materials

Different materials give different visual effects:
- **Plastic**: Default, solid appearance
- **Neon**: Glows and emits light
- **Metal**: Shiny, reflective surface
- **Glass**: Transparent with reflections
- **Concrete**: Rough, matte surface

Experiment with different materials to see how they look!`,
        initialCode: `-- ============================================
-- TASK: Create a part and configure its properties
-- ============================================
--
-- Instructions:
-- 1. The part is created and added to workspace
-- 2. Set part.Position to Vector3.new(5, 20, 0)
--    - This places it at x=5, y=20, z=0
-- 3. Set part.Size to Vector3.new(5, 5, 5)
--    - This makes it a 5x5x5 cube
-- 4. Set part.BrickColor to BrickColor.new("Bright red")
--    - This makes it red
--
-- Remember:
-- - Vector3.new(x, y, z) for Position and Size
-- - BrickColor.new("ColorName") for colors
-- ============================================

-- The part is created here
local part = Instance.new("Part")
part.Parent = workspace

-- TODO: Set the part's position to (5, 20, 0)
-- Use: part.Position = Vector3.new(5, 20, 0)
part.Position = 

-- TODO: Set the size to a cube (5x5x5)
-- Use: part.Size = Vector3.new(5, 5, 5)
part.Size = 

-- TODO: Change the color to red
-- Use: part.BrickColor = BrickColor.new("Bright red")
part.BrickColor = `,
        solution: `-- Create a new part
local part = Instance.new("Part")
part.Parent = workspace

-- Set the part's position to (5, 20, 0)
part.Position = Vector3.new(5, 20, 0)

-- Set the size to a cube (5x5x5)
part.Size = Vector3.new(5, 5, 5)

-- Change the color to red
part.BrickColor = BrickColor.new("Bright red")`,
        hints: [
          'Vector3.new takes three numbers: x, y, z',
          'Y is the height/vertical position',
          'Try colors like "Bright red", "Bright blue", "Bright green"',
        ],
        objectives: [
          'Create a new part instance',
          'Set the part\'s position and size',
          'Change the part\'s color',
        ],
      },
      {
        id: 'services',
        title: 'Understanding Services',
        description: 'Learn about Roblox Services and how to access them',
        content: `# Understanding Services

**Services** are the core systems that power Roblox. Think of them as the "operating system" of your game - they manage players, the world, data, and everything else. Understanding services is crucial for professional Roblox development.

## What is a Service?

A Service is a **special type of Instance** that manages a specific aspect of your game. Services are:
- **Always available**: You can access them anytime via \`game:GetService()\`
- **Global**: They exist across your entire game
- **Pre-built**: Roblox creates them automatically
- **Powerful**: They control core game functionality

## Why Services Matter

Services are how you interact with Roblox's built-in systems:
- Can't manage players without the Players service
- Can't place objects in the world without Workspace
- Can't save data without DataStoreService
- Can't communicate between scripts without ReplicatedStorage

## Common Services Explained

### Workspace

**Purpose**: The 3D world where all physical objects exist.

\`\`\`lua
local Workspace = game:GetService("Workspace")

-- Everything in your game world is in Workspace
-- Parts, Models, Terrain - all children of Workspace
local myPart = Workspace:FindFirstChild("MyPart")
\`\`\`

**Key Features**:
- Contains all visible objects
- Handles physics (gravity, collisions)
- Where players interact with the world
- Changes here are visible to all players

### Players

**Purpose**: Manages all players currently in your game.

\`\`\`lua
local Players = game:GetService("Players")

-- Get all players
local allPlayers = Players:GetPlayers()

-- Listen for player joining
Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " joined!")
end)
\`\`\`

**Key Features**:
- \`Players:GetPlayers()\`: Returns a table of all players
- \`Players.LocalPlayer\`: The current player (LocalScript only)
- \`Players.PlayerAdded\`: Event fired when someone joins
- \`Players.PlayerRemoving\`: Event fired when someone leaves

### ReplicatedStorage

**Purpose**: Shared storage accessible by both client AND server.

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Common use: Store RemoteEvents and RemoteFunctions
local myRemote = ReplicatedStorage:WaitForChild("MyRemoteEvent")
\`\`\`

**Key Features**:
- Visible to both server and client scripts
- Perfect for RemoteEvents/RemoteFunctions
- Can store ModuleScripts both sides need
- Changes sync automatically

### ServerStorage

**Purpose**: Storage only accessible by server scripts (not clients).

\`\`\`lua
local ServerStorage = game:GetService("ServerStorage")

-- Store things players shouldn't access directly
local itemTemplates = ServerStorage:FindFirstChild("Items")
\`\`\`

**Use Cases**:
- Item templates to clone
- Server-only data
- Prevents exploiters from accessing sensitive data

### Lighting

**Purpose**: Controls environmental lighting, atmosphere, and visual effects.

\`\`\`lua
local Lighting = game:GetService("Lighting")

-- Change time of day
Lighting.TimeOfDay = "14:00:00"  -- 2 PM

-- Change brightness
Lighting.Brightness = 2

-- Change ambient color
Lighting.Ambient = Color3.fromRGB(100, 100, 100)
\`\`\`

**Key Features**:
- TimeOfDay: Controls sun position (creates day/night cycle)
- Brightness: Overall light level
- Ambient: Global ambient lighting color
- Fog: Atmospheric effects

## Getting Services

**Always use \`game:GetService()\`** to get services:

\`\`\`lua
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
\`\`\`

**Why this method?**
- More reliable than \`game.Players\` (can fail if service hasn't loaded)
- Makes dependencies explicit
- Recommended by Roblox best practices

### Service Naming

Service names are **case-sensitive** and must match exactly:
- ✅ \`game:GetService("Players")\` - Correct
- ❌ \`game:GetService("players")\` - Wrong (lowercase)
- ❌ \`game:GetService("Player")\` - Wrong (singular)

## When to Use Each Service

### Server Scripts
- **Players**: Manage all players
- **Workspace**: Modify game world
- **ServerStorage**: Store server-only data
- **ReplicatedStorage**: Share data with clients
- **DataStoreService**: Save player data

### LocalScripts (Client)
- **Players**: Access LocalPlayer
- **ReplicatedStorage**: Get RemoteEvents to fire to server
- **Lighting**: Read lighting properties (rarely modify)
- **UserInputService**: Handle player input (keyboard, mouse)

## Service Events

Many services have events you can connect to:

\`\`\`lua
local Players = game:GetService("Players")

-- Player joining
Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " joined!")
end)

-- Player leaving
Players.PlayerRemoving:Connect(function(player)
    print(player.Name .. " left!")
end)
\`\`\`

## Best Practices

1. **Get services at the top** of your script
2. **Use GetService()** not direct property access
3. **Store in local variables** for readability
4. **Use WaitForChild()** if service might not exist yet
5. **Understand server vs client** accessibility

## Common Patterns

### Initialize Service at Start

\`\`\`lua
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")

-- Set up game when it starts
Players.PlayerAdded:Connect(function(player)
    -- Player setup code
end)
\`\`\`

### Access Service Properties

\`\`\`lua
local Lighting = game:GetService("Lighting")

-- Change lighting properties
Lighting.Brightness = 3
Lighting.TimeOfDay = "12:00:00"
\`\`\`

Services are the foundation of Roblox scripting - master them!`,
        initialCode: `-- ============================================
-- TASK: Get the Players and Workspace services
-- ============================================
-- 
-- Instructions:
-- 1. Use game:GetService("Players") to get the Players service
-- 2. Use game:GetService("Workspace") to get the Workspace service
-- 3. Assign each to the variables below
--
-- Example pattern: local ServiceName = game:GetService("ServiceName")
-- ============================================

-- TODO: Get the Players service and assign it to Players
local Players = 

-- TODO: Get the Workspace service and assign it to Workspace
local Workspace = 

-- These print statements will display the services once you complete the assignments above
print(Players)
print(Workspace)`,
        solution: `-- Get the Players service
local Players = game:GetService("Players")

-- Get the Workspace service  
local Workspace = game:GetService("Workspace")

-- Print both (you can print services to see they exist)
print(Players)
print(Workspace)`,
        hints: [
          'Use game:GetService("ServiceName")',
          'Service names are capitalized',
          'Use quotes around the service name',
        ],
        objectives: [
          'Get a service using GetService',
          'Understand what services are',
          'Access multiple services',
        ],
      },
      {
        id: 'players',
        title: 'Working with Players',
        description: 'Learn how to interact with players in your game',
        content: `# Working with Players

The Players service gives you access to all players in your game.

## Getting Players

\`\`\`lua
local Players = game:GetService("Players")

-- Get all players
local allPlayers = Players:GetPlayers()

-- Get local player (LocalScript only)
local player = Players.LocalPlayer

-- Player joined event
Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " joined!")
end)
\`\`\`

## Player Properties

- \`player.Name\`: Player's username
- \`player.UserId\`: Unique player ID
- \`player.Character\`: Player's character model`,
        initialCode: `local Players = game:GetService("Players")

-- Listen for when a player joins
Players.PlayerAdded:Connect(function(player)
    -- Print a welcome message with the player's name
    print(_____)
end)`,
        solution: `local Players = game:GetService("Players")

-- Listen for when a player joins
Players.PlayerAdded:Connect(function(player)
    -- Print a welcome message with the player's name
    print("Welcome, " .. player.Name .. "!")
end)`,
        hints: [
          'Players is a service, use game:GetService("Players")',
          'PlayerAdded fires when someone joins',
          'The player parameter has a Name property',
        ],
        objectives: [
          'Get the Players service',
          'Connect to PlayerAdded event',
          'Access player properties',
        ],
      },
      {
        id: 'scripts-vs-localscripts',
        title: 'Scripts vs LocalScripts',
        description: 'Understand the difference between server and client scripts',
        content: `# Scripts vs LocalScripts

Understanding server vs client is crucial for Roblox scripting!

## Script (Server-Side)

- Runs on the **server** only
- Can modify game data
- Accessible to all players
- Location: ServerScriptService or Workspace

\`\`\`lua
-- Server Script
print("This runs on the server")
\`\`\`

## LocalScript (Client-Side)

- Runs on each **player's device**
- Can access LocalPlayer
- Handles UI and local effects
- Location: StarterPlayer, StarterGui, or ScreenGui

\`\`\`lua
-- LocalScript
local Players = game:GetService("Players")
local player = Players.LocalPlayer
print(player.Name .. " is playing")
\`\`\``,
        initialCode: `-- Determine if this is a server or client script
-- (This would be a Script in ServerScriptService)

-- Print a message indicating this runs on the server
print(_____)`,
        solution: `-- Determine if this is a server or client script
-- (This would be a Script in ServerScriptService)

-- Print a message indicating this runs on the server
print("This script runs on the server!")`,
        hints: [
          'Scripts run on server, LocalScripts run on client',
          'You can check with print()',
          'LocalScripts can access LocalPlayer',
        ],
        objectives: [
          'Understand Script vs LocalScript',
          'Know where each type runs',
          'Identify when to use each',
        ],
      },
      {
        id: 'cframe-rotations',
        title: 'CFrame and Rotations',
        description: 'Master CFrame for precise part positioning and rotation',
        content: `# CFrame and Rotations

CFrame (Coordinate Frame) is more powerful than Vector3 - it handles both position AND rotation!

## CFrame Basics

\`\`\`lua
local part = Instance.new("Part")
part.Parent = workspace

-- Position using CFrame
part.CFrame = CFrame.new(0, 10, 0)

-- Position and rotation
part.CFrame = CFrame.new(0, 10, 0) * CFrame.Angles(0, math.rad(45), 0)

-- Look at a point
local target = Vector3.new(10, 0, 10)
part.CFrame = CFrame.lookAt(part.Position, target)
\`\`\`

## CFrame Operations

\`\`\`lua
-- Rotate around an axis
local angle = math.rad(45)  -- Convert degrees to radians
part.CFrame = part.CFrame * CFrame.Angles(0, angle, 0)

-- Move relative to current position
part.CFrame = part.CFrame * CFrame.new(0, 5, 0)  -- Move up 5 studs

-- Get position from CFrame
local position = part.CFrame.Position  -- Returns Vector3
\`\`\`

## Why CFrame?

- Precise rotation control
- Better for moving parts smoothly
- Essential for advanced mechanics`,
        initialCode: `local part = Instance.new("Part")
part.Parent = workspace
part.Size = Vector3.new(2, 2, 2)
part.Anchored = true

-- Set position to (0, 5, 0)
part.CFrame = CFrame.new(0, 5, 0)

-- Rotate 90 degrees around Y axis (use math.rad to convert degrees to radians)
part.CFrame = part.CFrame * CFrame.Angles(0, math.rad(90), 0)

print("Part positioned and rotated!")`,
        solution: `local part = Instance.new("Part")
part.Parent = workspace
part.Size = Vector3.new(2, 2, 2)
part.Anchored = true

-- Set position to (0, 5, 0)
part.CFrame = CFrame.new(0, 5, 0)

-- Rotate 90 degrees around Y axis (use math.rad to convert degrees to radians)
part.CFrame = part.CFrame * CFrame.Angles(0, math.rad(90), 0)

print("Part positioned and rotated!")`,
        hints: [
          'CFrame.new(x, y, z) sets position',
          'CFrame.Angles(x, y, z) uses radians',
          'Use math.rad() to convert degrees to radians',
        ],
        objectives: [
          'Position a part using CFrame',
          'Rotate a part using CFrame.Angles',
          'Understand radians vs degrees',
        ],
      },
      {
        id: 'tweenservice-runservice',
        title: 'TweenService and RunService',
        description: 'Animate parts smoothly and run code every frame',
        content: `# TweenService and RunService

## TweenService - Smooth Animations

TweenService creates smooth animations between values:

\`\`\`lua
local TweenService = game:GetService("TweenService")

local part = workspace.Part
local tweenInfo = TweenInfo.new(
    2,  -- Duration (seconds)
    Enum.EasingStyle.Linear,
    Enum.EasingDirection.InOut
)

-- Tween position
local goal = {Position = Vector3.new(10, 5, 0)}
local tween = TweenService:Create(part, tweenInfo, goal)
tween:Play()

-- Wait for tween to complete
tween.Completed:Wait()
print("Tween finished!")
\`\`\`

## RunService - Frame-by-Frame Code

RunService lets you run code every frame:

\`\`\`lua
local RunService = game:GetService("RunService")

-- Heartbeat runs every frame on server and client
RunService.Heartbeat:Connect(function(deltaTime)
    -- deltaTime is time since last frame
    print("Frame time: " .. deltaTime)
end)

-- RenderStepped (LocalScript only) - runs before rendering
RunService.RenderStepped:Connect(function()
    -- Update UI every frame
end)
\`\`\`

## Wait Patterns

\`\`\`lua
-- wait() - pauses script (deprecated, use task.wait())
task.wait(1)  -- Wait 1 second
task.wait()  -- Wait 1 frame

-- WaitForChild - wait for object to exist
local part = workspace:WaitForChild("MyPart")  -- Waits until part exists
\`\`\``,
        initialCode: `local TweenService = game:GetService("TweenService")
local part = Instance.new("Part")
part.Parent = workspace
part.Size = Vector3.new(4, 4, 4)
part.Position = Vector3.new(0, 5, 0)
part.Anchored = true

-- Create a tween that moves the part from (0, 5, 0) to (10, 5, 0) over 2 seconds
local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut)
local goal = {Position = Vector3.new(10, 5, 0)}
local tween = TweenService:Create(part, tweenInfo, goal)

-- Play the tween
tween:Play()

print("Tween started!")`,
        solution: `local TweenService = game:GetService("TweenService")
local part = Instance.new("Part")
part.Parent = workspace
part.Size = Vector3.new(4, 4, 4)
part.Position = Vector3.new(0, 5, 0)
part.Anchored = true

-- Create a tween that moves the part from (0, 5, 0) to (10, 5, 0) over 2 seconds
local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut)
local goal = {Position = Vector3.new(10, 5, 0)}
local tween = TweenService:Create(part, tweenInfo, goal)

-- Play the tween
tween:Play()

print("Tween started!")`,
        hints: [
          'TweenInfo.new(duration, easingStyle, easingDirection)',
          'goal is a table of properties to animate',
          'Call tween:Play() to start the animation',
        ],
        objectives: [
          'Create a tween using TweenService',
          'Animate a part\'s position',
          'Understand TweenInfo properties',
        ],
      },
    ],
  },
  {
    id: 'events',
    title: 'Events and Communication',
    description: 'Master events, RemoteEvents, and client-server communication',
    icon: '⚡',
    color: 'purple',
    estimatedTime: '14 hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'touched-event',
        title: 'The Touched Event',
        description: 'Respond when a player touches a part',
        content: `# The Touched Event

The Touched event fires when something touches a part. This is useful for triggers, buttons, and interactive objects.

## Example

\`\`\`lua
local part = workspace.Part

part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        print("A player touched the part!")
    end
end)
\`\`\`

## Important Notes

- \`hit\` is the BasePart that touched the part
- Check for Humanoid to identify players
- Touched fires for ALL objects, not just players!`,
        initialCode: `-- Get a part from workspace
local part = workspace.Part

-- Connect to the Touched event
part.Touched:Connect(function(hit)
    -- Check if what touched it is a player
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    
    if humanoid then
        -- Print a message when touched
        print(_____)
    end
end)`,
        solution: `-- Get a part from workspace
local part = workspace.Part

-- Connect to the Touched event
part.Touched:Connect(function(hit)
    -- Check if what touched it is a player
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    
    if humanoid then
        -- Print a message when touched
        print("Player touched the part!")
    end
end)`,
        hints: [
          'The function parameter "hit" is what touched the part',
          'Check for Humanoid to see if it\'s a player',
          'Print a friendly message!',
        ],
        objectives: [
          'Connect to the Touched event',
          'Check if the touching object is a player',
          'Print a message when touched',
        ],
      },
      {
        id: 'remoteevents',
        title: 'RemoteEvents - Client to Server',
        description: 'Learn how to communicate between client and server',
        content: `# RemoteEvents

RemoteEvents allow client and server to communicate. This is essential for multiplayer games!

## Server Side

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:WaitForChild("MyRemoteEvent")

remoteEvent.OnServerEvent:Connect(function(player, data)
    print(player.Name .. " sent: " .. data)
end)
\`\`\`

## Client Side

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:WaitForChild("MyRemoteEvent")

-- Fire the event with data
remoteEvent:FireServer("Hello from client!")
\`\`\``,
        initialCode: `-- CLIENT SIDE (LocalScript)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:WaitForChild("MyRemoteEvent")

-- Fire the event with a message
remoteEvent:FireServer(_____)`,
        solution: `-- CLIENT SIDE (LocalScript)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:WaitForChild("MyRemoteEvent")

-- Fire the event with a message
remoteEvent:FireServer("Hello Server!")`,
        hints: [
          'Use FireServer() from the client',
          'You can pass any data as arguments',
          'The server receives this in OnServerEvent',
        ],
        objectives: [
          'Understand RemoteEvents',
          'Fire an event from client',
          'Send data to server',
        ],
      },
      {
        id: 'remotefunctions',
        title: 'RemoteFunctions - Request/Response',
        description: 'Learn how to get responses from the server',
        content: `# RemoteFunctions

RemoteFunctions allow you to send a request and get a response back (unlike RemoteEvents).

## Server Side

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteFunction = ReplicatedStorage:WaitForChild("MyRemoteFunction")

remoteFunction.OnServerInvoke = function(player, data)
    -- Return a response
    return "Server received: " .. data
end
\`\`\`

## Client Side

\`\`\`lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteFunction = ReplicatedStorage:WaitForChild("MyRemoteFunction")

-- Invoke and get response
local response = remoteFunction:InvokeServer("Hello")
print(response)  -- "Server received: Hello"
\`\`\``,
        initialCode: `-- CLIENT SIDE (LocalScript)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteFunction = ReplicatedStorage:WaitForChild("MyRemoteFunction")

-- Invoke the server and get a response
local response = remoteFunction:InvokeServer(_____)

-- Print the response
print(response)`,
        solution: `-- CLIENT SIDE (LocalScript)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteFunction = ReplicatedStorage:WaitForChild("MyRemoteFunction")

-- Invoke the server and get a response
local response = remoteFunction:InvokeServer("Test Message")

-- Print the response
print(response)`,
        hints: [
          'Use InvokeServer() to call and get response',
          'The server returns a value from OnServerInvoke',
          'InvokeServer waits for the response',
        ],
        objectives: [
          'Understand RemoteFunctions',
          'Invoke server from client',
          'Receive and use server response',
        ],
      },
      {
        id: 'debouncing',
        title: 'Debouncing - Prevent Event Spam',
        description: 'Learn to prevent events from firing too frequently - critical for professional scripting',
        content: `# Debouncing

Debouncing prevents events from firing too frequently. This is **essential** for professional scripting!

## The Problem

Without debouncing, events can fire hundreds of times per second, causing:
- Performance issues
- Unintended behavior
- Spam/exploits

## Simple Debouncing Pattern

\`\`\`lua
local canTrigger = true  -- Debounce flag

part.Touched:Connect(function(hit)
    if not canTrigger then return end  -- Exit if still debouncing
    
    canTrigger = false  -- Set debounce
    
    -- Your code here
    print("Triggered!")
    
    task.wait(1)  -- Wait before allowing again
    canTrigger = true
end)
\`\`\`

## Better: Per-Player Debouncing

\`\`\`lua
local debounceTable = {}  -- Track each player

part.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then return end
    
    local player = game.Players:GetPlayerFromCharacter(character)
    if not player then return end
    
    -- Check if this player is debounced
    if debounceTable[player.UserId] then return end
    debounceTable[player.UserId] = true
    
    -- Your code here
    print(player.Name .. " triggered!")
    
    task.wait(1)  -- Wait
    debounceTable[player.UserId] = nil  -- Allow again
end)
\`\`\`

## Best Practice

Always debounce events that can fire rapidly (Touched, Clicked, etc.)!`,
        initialCode: `-- Create a debounced touched event
-- Only allow one trigger per second per player

local part = Instance.new("Part")
part.Parent = workspace
part.Size = Vector3.new(4, 1, 4)
part.Position = Vector3.new(0, 0.5, 0)
part.Anchored = true

-- Debounce table (tracks each player)
local debounceTable = {}

part.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then return end
    
    local player = game.Players:GetPlayerFromCharacter(character)
    if not player then return end
    
    -- Check debounce
    if debounceTable[player.UserId] then return end
    debounceTable[player.UserId] = true
    
    -- Print message
    print(player.Name .. " touched the part!")
    
    -- Wait then reset debounce
    task.wait(1)
    debounceTable[player.UserId] = nil
end)`,
        solution: `-- Create a debounced touched event
-- Only allow one trigger per second per player

local part = Instance.new("Part")
part.Parent = workspace
part.Size = Vector3.new(4, 1, 4)
part.Position = Vector3.new(0, 0.5, 0)
part.Anchored = true

-- Debounce table (tracks each player)
local debounceTable = {}

part.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    if not humanoid then return end
    
    local player = game.Players:GetPlayerFromCharacter(character)
    if not player then return end
    
    -- Check debounce
    if debounceTable[player.UserId] then return end
    debounceTable[player.UserId] = true
    
    -- Print message
    print(player.Name .. " touched the part!")
    
    -- Wait then reset debounce
    task.wait(1)
    debounceTable[player.UserId] = nil
end)`,
        hints: [
          'Use a table to track debounce state per player',
          'Check debounce BEFORE executing code',
          'Reset debounce after waiting',
        ],
        objectives: [
          'Understand why debouncing is needed',
          'Implement simple debouncing',
          'Create per-player debouncing system',
        ],
      },
      {
        id: 'bindable-events',
        title: 'BindableEvents - Same-Side Communication',
        description: 'Communicate between scripts on the same side (server or client)',
        content: `# BindableEvents

BindableEvents allow scripts on the same side (server-to-server or client-to-client) to communicate.

## Creating and Using

\`\`\`lua
-- Create in ServerScriptService
local bindable = Instance.new("BindableEvent")
bindable.Name = "MyBindableEvent"
bindable.Parent = script.Parent

-- Listen for event
bindable.Event:Connect(function(data)
    print("Received: " .. data)
end)

-- Fire event
bindable:Fire("Hello!")
\`\`\`

Use BindableEvents when both scripts are on the same side!`,
        initialCode: `-- Create a BindableEvent
local bindable = Instance.new(_____)

-- Connect to the event
bindable.Event:Connect(function(data)
    print("Got: " .. data)
end)

-- Fire it
bindable:Fire("Test")`,
        solution: `-- Create a BindableEvent
local bindable = Instance.new("BindableEvent")

-- Connect to the event
bindable.Event:Connect(function(data)
    print("Got: " .. data)
end)

-- Fire it
bindable:Fire("Test")`,
        hints: [
          'Use Instance.new("BindableEvent")',
          'Event property connects listeners',
          'Fire() triggers the event',
        ],
        objectives: [
          'Create a BindableEvent',
          'Connect to BindableEvent',
          'Fire BindableEvent',
        ],
      },
      {
        id: 'userinputservice',
        title: 'UserInputService - Player Input',
        description: 'Handle keyboard, mouse, and touch input for custom controls',
        content: `# UserInputService - Player Input

UserInputService lets you handle player input (keyboard, mouse, touch, gamepad) in LocalScripts. This is essential for custom controls, camera systems, and interactive features.

## Getting UserInputService

\`\`\`lua
local UserInputService = game:GetService("UserInputService")
\`\`\`

## Keyboard Input

Detect when keys are pressed:

\`\`\`lua
local UserInputService = game:GetService("UserInputService")

-- Detect key press
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end  -- UI handled it
    
    if input.KeyCode == Enum.KeyCode.E then
        print("E key pressed!")
    elseif input.KeyCode == Enum.KeyCode.Space then
        print("Space pressed!")
    end
end)

-- Detect key release
UserInputService.InputEnded:Connect(function(input, gameProcessed)
    if input.KeyCode == Enum.KeyCode.E then
        print("E key released!")
    end
end)
\`\`\`

## Mouse Input

Handle mouse clicks and movement:

\`\`\`lua
-- Left mouse click
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if input.UserInputType == Enum.UserInputType.MouseButton1 then
        print("Left mouse clicked!")
    elseif input.UserInputType == Enum.UserInputType.MouseButton2 then
        print("Right mouse clicked!")
    end
end)

-- Mouse movement
UserInputService.InputChanged:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseMovement then
        local mousePosition = input.Position
        -- Handle mouse movement
    end
end)
\`\`\`

## Touch Input (Mobile)

Handle touch input for mobile devices:

\`\`\`lua
UserInputService.TouchTapInWorld:Connect(function(touchPositions, gameProcessed)
    if gameProcessed then return end
    
    local touchPos = touchPositions[1]
    print("Touched at:", touchPos)
end)
\`\`\`

## KeyCode Enum

Common key codes:
- \`Enum.KeyCode.W\`, \`Enum.KeyCode.A\`, \`Enum.KeyCode.S\`, \`Enum.KeyCode.D\` - Movement keys
- \`Enum.KeyCode.Space\` - Spacebar
- \`Enum.KeyCode.E\`, \`Enum.KeyCode.F\` - Action keys
- \`Enum.KeyCode.Return\` - Enter
- \`Enum.KeyCode.Escape\` - ESC

## Practical Example: Custom Movement

\`\`\`lua
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")

local keysPressed = {}

-- Track keys
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    if input.KeyCode then
        keysPressed[input.KeyCode] = true
    end
end)

UserInputService.InputEnded:Connect(function(input)
    if input.KeyCode then
        keysPressed[input.KeyCode] = false
    end
end)

-- Move based on keys
RunService.Heartbeat:Connect(function()
    if keysPressed[Enum.KeyCode.W] then
        -- Move forward
    end
    if keysPressed[Enum.KeyCode.A] then
        -- Move left
    end
end)
\`\`\`

## Best Practices

1. **Always check gameProcessed** - Prevents conflicts with UI
2. **Use LocalScripts only** - UserInputService only works in LocalScripts
3. **Store input state** - Use tables to track multiple keys
4. **Debounce rapid inputs** - Prevent spam clicking

UserInputService is essential for custom controls and interactive features!`,
        initialCode: `-- ============================================
-- TASK: Detect when the E key is pressed
-- ============================================
--
-- Instructions:
-- 1. Get UserInputService
-- 2. Connect to InputBegan event
-- 3. Check if the E key was pressed (Enum.KeyCode.E)
-- 4. Print a message when E is pressed
--
-- Remember:
-- - Check gameProcessed to avoid UI conflicts
-- - Use Enum.KeyCode.E for the E key
-- ============================================

local UserInputService = game:GetService("UserInputService")

-- TODO: Connect to InputBegan and detect E key press
-- Format: UserInputService.InputBegan:Connect(function(input, gameProcessed) ... end)

`,
        solution: `local UserInputService = game:GetService("UserInputService")

UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.E then
        print("E key pressed!")
    end
end)`,
        hints: [
          'Get UserInputService with game:GetService("UserInputService")',
          'InputBegan fires when input starts',
          'Check input.KeyCode == Enum.KeyCode.E',
          'Always check gameProcessed first',
        ],
        objectives: [
          'Get UserInputService',
          'Detect keyboard input',
          'Handle key press events',
        ],
      },
    ],
  },
  {
    id: 'humanoids-characters',
    title: 'Humanoids and Characters',
    description: 'Master working with player characters, animations, and humanoids',
    icon: '🤖',
    color: 'orange',
    estimatedTime: '15 hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'character-basics',
        title: 'Understanding Characters',
        description: 'Learn about player characters and their structure',
        content: `# Understanding Characters

A player's character is a Model containing:
- **Humanoid**: Controls movement, health, animations
- **HumanoidRootPart**: The root part (usually a Torso or UpperTorso)
- **Head**: The player's head
- **Body parts**: Arms, legs, etc.

## Accessing Character

\`\`\`lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer  -- or get from PlayerAdded

-- Wait for character to load
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")
\`\`\``,
        initialCode: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- Wait for the character
local character = player.CharacterAdded:Wait()

-- Get the Humanoid
local humanoid = 

-- Print the humanoid's max health
print(_____)`,
        solution: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- Wait for the character
local character = player.CharacterAdded:Wait()

-- Get the Humanoid
local humanoid = character:WaitForChild("Humanoid")

-- Print the humanoid's max health
print("Max Health: " .. humanoid.MaxHealth)`,
        hints: [
          'Use character:WaitForChild("Humanoid")',
          'Humanoid has a MaxHealth property',
          'Use .. to concatenate strings',
        ],
        objectives: [
          'Access player character',
          'Get the Humanoid object',
          'Access Humanoid properties',
        ],
      },
      {
        id: 'health-system',
        title: 'Health and Damage System',
        description: 'Implement health systems and damage dealing',
        content: `# Health and Damage System

The Humanoid object manages player health.

## Health Properties

\`\`\`lua
local humanoid = character:FindFirstChildOfClass("Humanoid")

-- Set health values
humanoid.MaxHealth = 100
humanoid.Health = 100

-- Listen for health changes
humanoid.HealthChanged:Connect(function(health)
    print("Health: " .. health)
end)

-- Deal damage
humanoid:TakeDamage(25)  -- Reduces health by 25
\`\`\``,
        initialCode: `local Players = game:GetService("Players")
local player = Players:GetPlayers()[1]  -- Get first player
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:FindFirstChildOfClass("Humanoid")

-- Set max health to 150
humanoid.MaxHealth = 

-- Set current health to full
humanoid.Health = `,
        solution: `local Players = game:GetService("Players")
local player = Players:GetPlayers()[1]  -- Get first player
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:FindFirstChildOfClass("Humanoid")

-- Set max health to 150
humanoid.MaxHealth = 150

-- Set current health to full
humanoid.Health = 150`,
        hints: [
          'MaxHealth sets the maximum',
          'Health sets current (must be <= MaxHealth)',
          'Use numbers for health values',
        ],
        objectives: [
          'Set Humanoid health values',
          'Understand MaxHealth vs Health',
          'Manage player health',
        ],
      },
      {
        id: 'animations',
        title: 'Animation System',
        description: 'Play and control character animations',
        content: `# Animation System

Animations make characters move and express themselves!

## Loading Animations

\`\`\`lua
local humanoid = character:WaitForChild("Humanoid")
local animationId = 123456789  -- Roblox animation asset ID

-- Load animation
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://" .. animationId

local animationTrack = humanoid:LoadAnimation(animation)

-- Play animation
animationTrack:Play()
\`\`\``,
        initialCode: `local character = game.Players.LocalPlayer.Character
local humanoid = character:WaitForChild("Humanoid")

-- Create an Animation instance
local animation = Instance.new(_____)

-- Set the animation ID (use any valid Roblox animation ID)
animation.AnimationId = 

-- Load and play the animation
local track = humanoid:LoadAnimation(animation)
track:Play()`,
        solution: `local character = game.Players.LocalPlayer.Character
local humanoid = character:WaitForChild("Humanoid")

-- Create an Animation instance
local animation = Instance.new("Animation")

-- Set the animation ID (use any valid Roblox animation ID)
animation.AnimationId = "rbxassetid://507767968"  -- Example: Wave animation

-- Load and play the animation
local track = humanoid:LoadAnimation(animation)
track:Play()`,
        hints: [
          'Use Instance.new("Animation")',
          'AnimationId format: "rbxassetid://[ID]"',
          'LoadAnimation returns a track you can play',
        ],
        objectives: [
          'Create an Animation instance',
          'Load animation on Humanoid',
          'Play the animation',
        ],
      },
      {
        id: 'pathfinding',
        title: 'PathfindingService - AI Navigation',
        description: 'Create NPCs and AI that can navigate around obstacles automatically',
        content: `# PathfindingService - AI Navigation

PathfindingService allows NPCs and AI to automatically find paths around obstacles. Essential for enemy AI, NPCs, and automated movement systems.

## What is Pathfinding?

Pathfinding calculates the best route from point A to point B, avoiding obstacles like walls, parts, and terrain. This is used for:
- Enemy AI that follows players
- NPCs that patrol areas
- Automated character movement
- Quest guides and helpers

## Basic Pathfinding

\`\`\`lua
local PathfindingService = game:GetService("PathfindingService")

-- Create pathfinding object
local path = PathfindingService:CreatePath()

-- Compute path from start to goal
local start = Vector3.new(0, 5, 0)
local goal = Vector3.new(50, 5, 50)

local success, errorMessage = pcall(function()
    path:ComputeAsync(start, goal)
end)

if success then
    -- Get waypoints (points along the path)
    local waypoints = path:GetWaypoints()
    
    -- Move along the path
    for i, waypoint in ipairs(waypoints) do
        -- Move to each waypoint
        humanoid:MoveTo(waypoint.Position)
        humanoid.MoveToFinished:Wait()
    end
else
    warn("Pathfinding failed:", errorMessage)
end
\`\`\`

## Advanced: Jumping Waypoints

Some waypoints require jumping:

\`\`\`lua
for i, waypoint in ipairs(waypoints) do
    humanoid:MoveTo(waypoint.Position)
    humanoid.MoveToFinished:Wait()
    
    if waypoint.Action == Enum.PathWaypointAction.Jump then
        humanoid.Jump = true
        task.wait(0.5)  -- Wait for jump to complete
    end
end
\`\`\`

## Setting Agent Parameters

Configure pathfinding behavior:

\`\`\`lua
local path = PathfindingService:CreatePath({
    AgentRadius = 2,      -- Size of the agent
    AgentHeight = 5,      -- Height of the agent
    AgentCanJump = true,  -- Can jump over obstacles
    WaypointSpacing = 4,  -- Distance between waypoints
})
\`\`\`

## Real-World Example: Enemy Following Player

\`\`\`lua
local PathfindingService = game:GetService("PathfindingService")
local RunService = game:GetService("RunService")

local function followPlayer(npcHumanoid, targetPlayer)
    if not targetPlayer.Character then return end
    
    local targetPosition = targetPlayer.Character.HumanoidRootPart.Position
    local npcPosition = npcHumanoid.RootPart.Position
    
    local path = PathfindingService:CreatePath()
    local success = pcall(function()
        path:ComputeAsync(npcPosition, targetPosition)
    end)
    
    if success then
        local waypoints = path:GetWaypoints()
        for i, waypoint in ipairs(waypoints) do
            npcHumanoid:MoveTo(waypoint.Position)
            npcHumanoid.MoveToFinished:Wait()
            
            if waypoint.Action == Enum.PathWaypointAction.Jump then
                npcHumanoid.Jump = true
                task.wait(0.3)
            end
        end
    end
end
\`\`\`

## Best Practices

1. **Use pcall** - Pathfinding can fail (unreachable goals, blocked paths)
2. **Check success** - Always verify path was computed
3. **Handle waypoints** - Process each waypoint in order
4. **Update regularly** - Recompute paths if target moves
5. **Set agent size** - Match your character/NPC size

PathfindingService is essential for professional AI systems!`,
        initialCode: `-- ============================================
-- TASK: Create a pathfinding system
-- ============================================
--
-- Instructions:
-- 1. Get PathfindingService
-- 2. Create a path object
-- 3. Compute a path from (0, 5, 0) to (30, 5, 30)
-- 4. Get the waypoints and print how many waypoints there are
--
-- Remember:
-- - Use pcall to handle potential errors
-- - Check if ComputeAsync succeeded
-- - Use GetWaypoints() to get the path points
-- ============================================

local PathfindingService = game:GetService("PathfindingService")

-- TODO: Create path and compute it
local path = PathfindingService:CreatePath()

local success = pcall(function()
    path:ComputeAsync(Vector3.new(0, 5, 0), Vector3.new(30, 5, 30))
end)

if success then
    -- TODO: Get waypoints and print the count
    local waypoints = 
    print("Path has " .. #waypoints .. " waypoints")
else
    print("Pathfinding failed!")
end`,
        solution: `local PathfindingService = game:GetService("PathfindingService")

local path = PathfindingService:CreatePath()

local success = pcall(function()
    path:ComputeAsync(Vector3.new(0, 5, 0), Vector3.new(30, 5, 30))
end)

if success then
    local waypoints = path:GetWaypoints()
    print("Path has " .. #waypoints .. " waypoints")
else
    print("Pathfinding failed!")
end`,
        hints: [
          'Use PathfindingService:CreatePath()',
          'ComputeAsync(start, goal) calculates path',
          'Always use pcall - pathfinding can fail',
          'GetWaypoints() returns array of waypoints',
        ],
        objectives: [
          'Understand PathfindingService',
          'Compute paths between points',
          'Handle waypoints',
        ],
      },
    ],
  },
  {
    id: 'gui-scripting',
    title: 'GUI Scripting',
    description: 'Create and manipulate user interfaces in Roblox',
    icon: '🖥️',
    color: 'yellow',
    estimatedTime: '14 hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'gui-basics',
        title: 'Creating GUIs',
        description: 'Learn how to create and position GUI elements',
        content: `# Creating GUIs

GUIs (Graphical User Interfaces) are what players see and interact with!

## ScreenGui

\`\`\`lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "MyGUI"
screenGui.Parent = playerGui

-- Create Frame (container)
local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 200, 0, 100)  -- Width: 200px, Height: 100px
frame.Position = UDim2.new(0.5, 0, 0.5, 0)  -- Center
frame.BackgroundColor3 = Color3.new(0.2, 0.2, 0.2)
frame.Parent = screenGui
\`\`\``,
        initialCode: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create a ScreenGui
local screenGui = Instance.new(_____)
screenGui.Parent = 

-- Create a Frame
local frame = Instance.new(_____)
frame.Size = UDim2.new(0, 300, 0, 200)
frame.Position = UDim2.new(0.5, -150, 0.5, -100)  -- Center
frame.BackgroundColor3 = Color3.new(0.1, 0.5, 1)  -- Blue
frame.Parent = `,
        solution: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create a ScreenGui
local screenGui = Instance.new("ScreenGui")
screenGui.Parent = playerGui

-- Create a Frame
local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 300, 0, 200)
frame.Position = UDim2.new(0.5, -150, 0.5, -100)  -- Center
frame.BackgroundColor3 = Color3.new(0.1, 0.5, 1)  -- Blue
frame.Parent = screenGui`,
        hints: [
          'Use Instance.new("ScreenGui")',
          'ScreenGui goes in PlayerGui',
          'Frame is a basic GUI container',
        ],
        objectives: [
          'Create a ScreenGui',
          'Create a Frame',
          'Position and style GUI elements',
        ],
      },
      {
        id: 'text-buttons',
        title: 'Text Labels and Buttons',
        description: 'Add text and clickable buttons to your GUI',
        content: `# Text Labels and Buttons

TextLabels display text, TextButtons are clickable!

## TextLabel

\`\`\`lua
local textLabel = Instance.new("TextLabel")
textLabel.Text = "Hello, World!"
textLabel.Size = UDim2.new(0, 200, 0, 50)
textLabel.Position = UDim2.new(0.5, -100, 0.5, -25)
textLabel.TextColor3 = Color3.new(1, 1, 1)  -- White
textLabel.BackgroundColor3 = Color3.new(0, 0, 0)  -- Black
textLabel.Parent = screenGui
\`\`\`

## TextButton

\`\`\`lua
local button = Instance.new("TextButton")
button.Text = "Click Me!"
button.Size = UDim2.new(0, 150, 0, 50)
button.Position = UDim2.new(0.5, -75, 0.5, 0)

button.MouseButton1Click:Connect(function()
    print("Button clicked!")
end)

button.Parent = screenGui
\`\`\``,
        initialCode: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = Instance.new("ScreenGui")
screenGui.Parent = playerGui

-- Create a TextButton
local button = Instance.new(_____)
button.Text = "Click Me!"
button.Size = UDim2.new(0, 200, 0, 50)
button.Position = UDim2.new(0.5, -100, 0.5, 0)

-- Connect click event
button._____:Connect(function()
    print("Clicked!")
end)

button.Parent = screenGui`,
        solution: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = Instance.new("ScreenGui")
screenGui.Parent = playerGui

-- Create a TextButton
local button = Instance.new("TextButton")
button.Text = "Click Me!"
button.Size = UDim2.new(0, 200, 0, 50)
button.Position = UDim2.new(0.5, -100, 0.5, 0)

-- Connect click event
button.MouseButton1Click:Connect(function()
    print("Clicked!")
end)

button.Parent = screenGui`,
        hints: [
          'Use Instance.new("TextButton")',
          'MouseButton1Click is the click event',
          'TextButton is clickable, TextLabel is not',
        ],
        objectives: [
          'Create a TextButton',
          'Handle button clicks',
          'Connect to MouseButton1Click event',
        ],
      },
      {
        id: 'gui-layouts',
        title: 'UI Layouts and Scaling',
        description: 'Create responsive GUIs that work on all screen sizes',
        content: `# UI Layouts and Scaling

UDim2 is used for sizing and positioning GUIs. It uses two scales: relative (0-1) and offset (pixels).

## UDim2 Explained

\`\`\`lua
-- UDim2.new(xScale, xOffset, yScale, yOffset)
UDim2.new(0.5, -100, 0.5, -50)
-- 50% of screen width, minus 100px
-- 50% of screen height, minus 50px

-- Full screen
UDim2.new(1, 0, 1, 0)  -- 100% width, 100% height

-- Fixed pixel size
UDim2.new(0, 200, 0, 100)  -- 200px wide, 100px tall
\`\`\`

## LayoutGuis

Use UIListLayout and UIGridLayout for automatic positioning!

\`\`\`lua
local listLayout = Instance.new("UIListLayout")
listLayout.Padding = UDim.new(0, 10)  -- 10px spacing
listLayout.Parent = frame
\`\`\``,
        initialCode: `local frame = Instance.new("Frame")
frame.Size = UDim2.new(0.8, 0, 0.6, 0)  -- 80% width, 60% height
frame.Position = UDim2.new(0.1, 0, 0.2, 0)  -- 10% from left, 20% from top

-- Create a UIListLayout for automatic spacing
local layout = Instance.new(_____)
layout.Padding = UDim.new(0, 15)
layout.Parent = `,
        solution: `local frame = Instance.new("Frame")
frame.Size = UDim2.new(0.8, 0, 0.6, 0)  -- 80% width, 60% height
frame.Position = UDim2.new(0.1, 0, 0.2, 0)  -- 10% from left, 20% from top

-- Create a UIListLayout for automatic spacing
local layout = Instance.new("UIListLayout")
layout.Padding = UDim.new(0, 15)
layout.Parent = frame`,
        hints: [
          'Use Instance.new("UIListLayout")',
          'Padding uses UDim.new(0, pixels)',
          'Layout automatically positions children',
        ],
        objectives: [
          'Understand UDim2 scaling',
          'Use relative and offset values',
          'Apply UIListLayout for automatic layout',
        ],
      },
      {
        id: 'advanced-gui-elements',
        title: 'Advanced GUI Elements',
        description: 'Master ScrollingFrame, TextBox, ImageLabel, and other advanced UI components',
        content: `# Advanced GUI Elements

Professional games use many GUI elements beyond basic Frames and TextButtons.

## ScrollingFrame

For content that exceeds the visible area:

\`\`\`lua
local scrollingFrame = Instance.new("ScrollingFrame")
scrollingFrame.Size = UDim2.new(0, 300, 0, 200)
scrollingFrame.CanvasSize = UDim2.new(0, 0, 0, 500)  -- Scrollable height
scrollingFrame.ScrollBarThickness = 8
scrollingFrame.BackgroundColor3 = Color3.new(0.1, 0.1, 0.1)
\`\`\`

## TextBox

For user text input:

\`\`\`lua
local textBox = Instance.new("TextBox")
textBox.Size = UDim2.new(0, 200, 0, 30)
textBox.PlaceholderText = "Enter your name..."
textBox.ClearTextOnFocus = false

textBox.FocusLost:Connect(function(enterPressed)
    if enterPressed then
        print("User entered: " .. textBox.Text)
    end
end)
\`\`\`

## ImageLabel and ImageButton

Display images and clickable images:

\`\`\`lua
-- ImageLabel (display only)
local imageLabel = Instance.new("ImageLabel")
imageLabel.Size = UDim2.new(0, 100, 0, 100)
imageLabel.Image = "rbxassetid://123456789"  -- Image asset ID
imageLabel.BackgroundTransparency = 1

-- ImageButton (clickable image)
local imageButton = Instance.new("ImageButton")
imageButton.Size = UDim2.new(0, 100, 0, 100)
imageButton.Image = "rbxassetid://123456789"
imageButton.MouseButton1Click:Connect(function()
    print("Image clicked!")
end)
\`\`\`

## UIStroke and UIGradient

Enhance visual appearance:

\`\`\`lua
-- Add border/outline
local stroke = Instance.new("UIStroke")
stroke.Color = Color3.new(1, 1, 1)
stroke.Thickness = 2
stroke.Parent = frame

-- Add gradient fill
local gradient = Instance.new("UIGradient")
gradient.ColorSequence = ColorSequence.new{
    ColorSequenceKeypoint.new(0, Color3.new(1, 0, 0)),  -- Red
    ColorSequenceKeypoint.new(1, Color3.new(0, 0, 1))   -- Blue
}
gradient.Parent = frame
\`\`\`

## Toggle Buttons

Create on/off switches:

\`\`\`lua
local isToggled = false
local toggleButton = Instance.new("TextButton")

toggleButton.MouseButton1Click:Connect(function()
    isToggled = not isToggled
    if isToggled then
        toggleButton.BackgroundColor3 = Color3.new(0, 1, 0)  -- Green
        toggleButton.Text = "ON"
    else
        toggleButton.BackgroundColor3 = Color3.new(1, 0, 0)  -- Red
        toggleButton.Text = "OFF"
    end
end)
\`\`\`

## Best Practices

- Use ScrollingFrame for long lists
- Validate TextBox input
- Use ImageLabel for backgrounds/icons
- Add UIStroke for better visibility
- Create reusable GUI components

Master these elements for professional-quality interfaces!`,
        initialCode: `-- Create a TextBox for user input
local textBox = Instance.new(_____)
textBox.Size = UDim2.new(0, 250, 0, 35)
textBox.PlaceholderText = "Enter your name..."

-- Connect to FocusLost event
textBox.FocusLost:Connect(function(enterPressed)
    if enterPressed then
        print("Welcome, " .. textBox.Text .. "!")
    end
end)

textBox.Parent = `,
        solution: `-- Create a TextBox for user input
local textBox = Instance.new("TextBox")
textBox.Size = UDim2.new(0, 250, 0, 35)
textBox.PlaceholderText = "Enter your name..."

-- Connect to FocusLost event
textBox.FocusLost:Connect(function(enterPressed)
    if enterPressed then
        print("Welcome, " .. textBox.Text .. "!")
    end
end)

textBox.Parent = workspace:FindFirstChild("ScreenGui")`,
        hints: [
          'Use Instance.new("TextBox")',
          'FocusLost fires when user finishes typing',
          'enterPressed is true if Enter was pressed',
          'Access text with textBox.Text',
        ],
        objectives: [
          'Create a TextBox',
          'Handle text input',
          'Connect to FocusLost event',
        ],
      },
    ],
  },
  {
    id: 'data-persistence',
    title: 'Data Persistence',
    description: 'Save and load player data using DataStores',
    icon: '💾',
    color: 'red',
    estimatedTime: '12 hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'datastore-basics',
        title: 'DataStore Fundamentals',
        description: 'Learn how to save and load player data',
        content: `# DataStore Fundamentals

DataStores allow you to save player data between game sessions.

## Getting DataStore

\`\`\`lua
local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")
\`\`\`

## Saving Data

\`\`\`lua
local success, err = pcall(function()
    playerDataStore:SetAsync(player.UserId, {
        coins = 100,
        level = 1,
        experience = 0
    })
end)

if not success then
    warn("Failed to save:", err)
end
\`\`\`

## Loading Data

\`\`\`lua
local data = playerDataStore:GetAsync(player.UserId)
if data then
    print("Coins: " .. data.coins)
else
    -- First time playing, use defaults
    data = {coins = 0, level = 1}
end
\`\`\``,
        initialCode: `local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")

local player = game.Players:GetPlayers()[1]

-- Save player data using SetAsync
-- Use pcall to handle errors
pcall(function()
    playerDataStore:SetAsync(_____, {
        coins = 500,
        level = 5
    })
end)`,
        solution: `local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")

local player = game.Players:GetPlayers()[1]

-- Save player data using SetAsync
-- Use pcall to handle errors
pcall(function()
    playerDataStore:SetAsync(player.UserId, {
        coins = 500,
        level = 5
    })
end)`,
        hints: [
          'Use player.UserId as the key',
          'Always wrap DataStore calls in pcall',
          'SetAsync saves data to the cloud',
        ],
        objectives: [
          'Get a DataStore',
          'Save data with SetAsync',
          'Use pcall for error handling',
        ],
      },
      {
        id: 'autosave-system',
        title: 'Auto-Save System',
        description: 'Implement automatic data saving at intervals',
        content: `# Auto-Save System

Automatically save player data periodically and on leave.

## Auto-Save on Leave

\`\`\`lua
Players.PlayerRemoving:Connect(function(player)
    local success = pcall(function()
        playerDataStore:SetAsync(player.UserId, playerData[player])
    end)
    
    if not success then
        warn("Failed to save data for " .. player.Name)
    end
end)
\`\`\`

## Periodic Saving

\`\`\`lua
-- Save every 5 minutes
while true do
    task.wait(300)  -- 5 minutes
    
    for _, player in pairs(Players:GetPlayers()) do
        pcall(function()
            playerDataStore:SetAsync(player.UserId, playerData[player])
        end)
    end
end
\`\`\``,
        initialCode: `local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")

-- Listen for when player leaves
Players.PlayerRemoving:Connect(function(player)
    -- Save their data
    pcall(function()
        playerDataStore:SetAsync(_____, {
            coins = 100,
            level = 1
        })
    end)
end)`,
        solution: `local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")

-- Listen for when player leaves
Players.PlayerRemoving:Connect(function(player)
    -- Save their data
    pcall(function()
        playerDataStore:SetAsync(player.UserId, {
            coins = 100,
            level = 1
        })
    end)
end)`,
        hints: [
          'PlayerRemoving fires when player leaves',
          'Always use pcall with DataStore',
          'Use player.UserId as the key',
        ],
        objectives: [
          'Listen for PlayerRemoving event',
          'Save data when player leaves',
          'Implement auto-save system',
        ],
      },
      {
        id: 'data-security',
        title: 'Data Security and Validation',
        description: 'Protect player data from exploits and validate inputs',
        content: `# Data Security and Validation

Always validate and sanitize player data!

## Validation Example

\`\`\`lua
local function validateData(data)
    -- Check data exists
    if not data then return nil end
    
    -- Validate data types
    if typeof(data.coins) ~= "number" then
        data.coins = 0
    end
    
    -- Clamp values to reasonable ranges
    data.coins = math.clamp(data.coins, 0, 999999)
    data.level = math.clamp(data.level, 1, 100)
    
    return data
end

-- Use validated data
local playerData = playerDataStore:GetAsync(player.UserId)
playerData = validateData(playerData) or {coins = 0, level = 1}
\`\`\``,
        initialCode: `local function validateData(data)
    if not data then return nil end
    
    -- Ensure coins is a number and clamp it
    if typeof(data.coins) ~= "number" then
        data.coins = 0
    end
    data.coins = math.clamp(data.coins, 0, _____)  -- Max 100000
    
    return data
end

local playerData = {coins = 999999999, level = 1}
local validated = validateData(playerData)
print("Validated coins:", validated.coins)`,
        solution: `local function validateData(data)
    if not data then return nil end
    
    -- Ensure coins is a number and clamp it
    if typeof(data.coins) ~= "number" then
        data.coins = 0
    end
    data.coins = math.clamp(data.coins, 0, 100000)  -- Max 100000
    
    return data
end

local playerData = {coins = 999999999, level = 1}
local validated = validateData(playerData)
print("Validated coins:", validated.coins)`,
        hints: [
          'math.clamp(value, min, max) limits values',
          'Always validate data from DataStore',
          'Check data types with typeof()',
        ],
        objectives: [
          'Validate DataStore data',
          'Use math.clamp for safety',
          'Protect against exploits',
        ],
      },
    ],
  },
  {
    id: 'game-systems',
    title: 'Game Systems',
    description: 'Build complete game systems: shops, inventories, teams, and more',
    icon: '🎯',
    color: 'indigo',
    estimatedTime: '12 hours',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'inventory-system',
        title: 'Inventory System',
        description: 'Create a complete inventory system for items',
        content: `# Inventory System

Build a system to manage player items and inventory.

## Inventory Structure

\`\`\`lua
local playerInventory = {
    [player.UserId] = {
        items = {"sword", "shield", "potion"},
        gold = 500
    }
}

-- Add item function
local function addItem(player, itemName)
    if not playerInventory[player.UserId] then
        playerInventory[player.UserId] = {items = {}, gold = 0}
    end
    
    table.insert(playerInventory[player.UserId].items, itemName)
end

-- Remove item function
local function removeItem(player, itemName)
    local items = playerInventory[player.UserId].items
    for i, item in ipairs(items) do
        if item == itemName then
            table.remove(items, i)
            return true
        end
    end
    return false
end
\`\`\``,
        initialCode: `local inventory = {}

-- Function to add item to inventory
local function addItem(playerId, itemName)
    if not inventory[playerId] then
        inventory[playerId] = {items = {}}
    end
    
    -- Add the item
    _____
end

-- Test it
addItem(123, "sword")
print(inventory[123].items[1])`,
        solution: `local inventory = {}

-- Function to add item to inventory
local function addItem(playerId, itemName)
    if not inventory[playerId] then
        inventory[playerId] = {items = {}}
    end
    
    -- Add the item
    table.insert(inventory[playerId].items, itemName)
end

-- Test it
addItem(123, "sword")
print(inventory[123].items[1])`,
        hints: [
          'Use table.insert() to add items',
          'Check if inventory[playerId] exists first',
          'Initialize with empty items table if needed',
        ],
        objectives: [
          'Create inventory structure',
          'Add items to inventory',
          'Manage player data in tables',
        ],
      },
      {
        id: 'shop-system',
        title: 'Shop System',
        description: 'Build a shop where players can buy items',
        content: `# Shop System

Create a shop system where players can purchase items.

## Shop Implementation

\`\`\`lua
local shopItems = {
    {name = "Sword", price = 100},
    {name = "Shield", price = 75},
    {name = "Potion", price = 50}
}

local function buyItem(player, itemName)
    -- Find item in shop
    local item = nil
    for _, shopItem in ipairs(shopItems) do
        if shopItem.name == itemName then
            item = shopItem
            break
        end
    end
    
    if not item then
        return false, "Item not found"
    end
    
    -- Check if player has enough money
    local playerData = getPlayerData(player)
    if playerData.coins < item.price then
        return false, "Not enough coins!"
    end
    
    -- Deduct money and add item
    playerData.coins = playerData.coins - item.price
    addItem(player, itemName)
    
    return true, "Purchased!"
end
\`\`\``,
        initialCode: `local shopItems = {
    {name = "Sword", price = 100},
    {name = "Shield", price = 75}
}

local playerCoins = {[123] = 150}  -- Player 123 has 150 coins

local function buyItem(playerId, itemName)
    -- Find the item
    local item = nil
    for _, shopItem in ipairs(shopItems) do
        if shopItem.name == itemName then
            item = shopItem
            break
        end
    end
    
    if not item then
        return false, "Item not found"
    end
    
    -- Check if player has enough coins
    if playerCoins[playerId] < item.price then
        return false, "Not enough coins!"
    end
    
    -- Deduct coins
    playerCoins[playerId] = playerCoins[playerId] - _____
    return true, "Purchased!"
end`,
        solution: `local shopItems = {
    {name = "Sword", price = 100},
    {name = "Shield", price = 75}
}

local playerCoins = {[123] = 150}  -- Player 123 has 150 coins

local function buyItem(playerId, itemName)
    -- Find the item
    local item = nil
    for _, shopItem in ipairs(shopItems) do
        if shopItem.name == itemName then
            item = shopItem
            break
        end
    end
    
    if not item then
        return false, "Item not found"
    end
    
    -- Check if player has enough coins
    if playerCoins[playerId] < item.price then
        return false, "Not enough coins!"
    end
    
    -- Deduct coins
    playerCoins[playerId] = playerCoins[playerId] - item.price
    return true, "Purchased!"
end`,
        hints: [
          'Subtract item.price from player coins',
          'Check balance before subtracting',
          'Return success status',
        ],
        objectives: [
          'Search shop items',
          'Validate player funds',
          'Complete purchase transaction',
        ],
      },
      {
        id: 'team-system',
        title: 'Team System',
        description: 'Implement teams and team-based gameplay',
        content: `# Team System

Create teams for your players.

## Creating Teams

\`\`\`lua
local Teams = game:GetService("Teams")

-- Create teams
local redTeam = Instance.new("Team")
redTeam.Name = "Red Team"
redTeam.TeamColor = BrickColor.new("Bright red")
redTeam.Parent = Teams

local blueTeam = Instance.new("Team")
blueTeam.Name = "Blue Team"
blueTeam.TeamColor = BrickColor.new("Bright blue")
blueTeam.Parent = Teams

-- Assign player to team
Players.PlayerAdded:Connect(function(player)
    task.wait(1)  -- Wait for character to spawn
    player.Team = redTeam  -- or randomly assign
end)
\`\`\``,
        initialCode: `local Teams = game:GetService("Teams")
local Players = game:GetService("Players")

-- Create a team
local team = Instance.new(_____)
team.Name = "Blue Team"
team.TeamColor = BrickColor.new("Bright blue")
team.Parent = 

-- Assign players to the team
Players.PlayerAdded:Connect(function(player)
    player.Team = _____
end)`,
        solution: `local Teams = game:GetService("Teams")
local Players = game:GetService("Players")

-- Create a team
local team = Instance.new("Team")
team.Name = "Blue Team"
team.TeamColor = BrickColor.new("Bright blue")
team.Parent = Teams

-- Assign players to the team
Players.PlayerAdded:Connect(function(player)
    player.Team = team
end)`,
        hints: [
          'Use Instance.new("Team")',
          'TeamColor sets the team color',
          'Assign team to player.Team property',
        ],
        objectives: [
          'Create Team instances',
          'Set team properties',
          'Assign players to teams',
        ],
      },
    ],
  },
  {
    id: 'optimization',
    title: 'Optimization and Best Practices',
    description: 'Learn performance optimization, security, and professional coding practices',
    icon: '⚡',
    color: 'pink',
    estimatedTime: '14 hours',
    difficulty: 'Advanced',
    lessons: [
      {
        id: 'performance',
        title: 'Performance Optimization',
        description: 'Optimize your scripts for better game performance',
        content: `# Performance Optimization

Optimize your code to run smoothly for all players!

## Best Practices

\`\`\`lua
-- BAD: Loops every frame
game:GetService("RunService").Heartbeat:Connect(function()
    for _, player in pairs(Players:GetPlayers()) do
        -- Heavy operations
    end
end)

-- GOOD: Use delays and caching
local function updatePlayers()
    for _, player in pairs(Players:GetPlayers()) do
        -- Process players
    end
end

-- Run every 5 seconds instead of every frame
while true do
    updatePlayers()
    task.wait(5)
end

-- Cache references
local workspace = game:GetService("Workspace")
local players = Players:GetPlayers()  -- Cache, don't call repeatedly
\`\`\``,
        initialCode: `-- Optimize this code
-- Instead of calling GetPlayers() repeatedly, cache it

local Players = game:GetService("Players")

-- BAD: Gets players every time
for i = 1, 10 do
    for _, player in pairs(Players:GetPlayers()) do
        print(player.Name)
    end
end

-- GOOD: Cache the result
local players = _____
for i = 1, 10 do
    for _, player in pairs(_____) do
        print(player.Name)
    end
end`,
        solution: `-- Optimize this code
-- Instead of calling GetPlayers() repeatedly, cache it

local Players = game:GetService("Players")

-- BAD: Gets players every time
for i = 1, 10 do
    for _, player in pairs(Players:GetPlayers()) do
        print(player.Name)
    end
end

-- GOOD: Cache the result
local players = Players:GetPlayers()
for i = 1, 10 do
    for _, player in pairs(players) do
        print(player.Name)
    end
end`,
        hints: [
          'Cache Players:GetPlayers() in a variable',
          'Reuse the cached variable in loops',
          'This avoids repeated service calls',
        ],
        objectives: [
          'Understand performance impact',
          'Cache frequently used data',
          'Optimize loops and iterations',
        ],
      },
      {
        id: 'security',
        title: 'Security and Anti-Exploit',
        description: 'Protect your game from exploits and cheaters',
        content: `# Security and Anti-Exploit

Always validate data from clients - never trust the client!

## Server Authority

\`\`\`lua
-- CLIENT (can be exploited!)
remoteEvent:FireServer("Give me 1000000 coins!")

-- SERVER (secure)
remoteEvent.OnServerEvent:Connect(function(player, amount)
    -- Validate the request
    if typeof(amount) ~= "number" then return end
    if amount < 0 or amount > 100 then return end  -- Reasonable limits
    
    -- Server decides what to do
    addCoins(player, amount)
end)
\`\`\`

## Important Rules

1. **Never trust client data** - Always validate
2. **Server has authority** - Client makes requests, server decides
3. **Validate everything** - Type, range, existence
4. **Use server-side calculations** - Don't let client calculate rewards`,
        initialCode: `-- SERVER SIDE
remoteEvent.OnServerEvent:Connect(function(player, coinsToAdd)
    -- Validate the request
    -- Check if it's a number
    if typeof(coinsToAdd) ~= "number" then
        return  -- Reject invalid data
    end
    
    -- Clamp to reasonable range (0-100)
    coinsToAdd = math.clamp(coinsToAdd, 0, _____)
    
    -- Only then add coins
    addCoins(player, coinsToAdd)
end)`,
        solution: `-- SERVER SIDE
remoteEvent.OnServerEvent:Connect(function(player, coinsToAdd)
    -- Validate the request
    -- Check if it's a number
    if typeof(coinsToAdd) ~= "number" then
        return  -- Reject invalid data
    end
    
    -- Clamp to reasonable range (0-100)
    coinsToAdd = math.clamp(coinsToAdd, 0, 100)
    
    -- Only then add coins
    addCoins(player, coinsToAdd)
end)`,
        hints: [
          'Set reasonable max value (e.g., 100)',
          'Always validate before processing',
          'Server has final authority',
        ],
        objectives: [
          'Validate client input',
          'Use math.clamp for safety',
          'Implement server authority',
        ],
      },
      {
        id: 'code-organization',
        title: 'Code Organization and Modules',
        description: 'Organize your code with ModuleScripts and best practices',
        content: `# Code Organization and Modules

ModuleScripts help organize and reuse code!

## Creating a ModuleScript

\`\`\`lua
-- ModuleScript named "DataManager"
local DataManager = {}

function DataManager.getPlayerData(player)
    -- Get data logic
    return playerData[player]
end

function DataManager.savePlayerData(player, data)
    -- Save logic
end

return DataManager
\`\`\`

## Using ModuleScripts

\`\`\`lua
-- In another script
local DataManager = require(script.Parent.DataManager)

local data = DataManager.getPlayerData(player)
DataManager.savePlayerData(player, newData)
\`\`\`

## Benefits

- Reusable code
- Better organization
- Easier to maintain
- Team collaboration`,
        initialCode: `-- Create a module for math utilities
local MathUtils = {}

function MathUtils.roundToDecimal(number, decimals)
    local multiplier = 10 ^ decimals
    return math.floor(number * multiplier + 0.5) / multiplier
end

function MathUtils.clamp(value, min, max)
    return math.clamp(value, min, max)
end

return _____`,
        solution: `-- Create a module for math utilities
local MathUtils = {}

function MathUtils.roundToDecimal(number, decimals)
    local multiplier = 10 ^ decimals
    return math.floor(number * multiplier + 0.5) / multiplier
end

function MathUtils.clamp(value, min, max)
    return math.clamp(value, min, max)
end

return MathUtils`,
        hints: [
          'Return the module table at the end',
          'Functions go inside the module table',
          'Use require() to load the module',
        ],
        objectives: [
          'Create a ModuleScript',
          'Export functions from module',
          'Understand module organization',
        ],
      },
      {
        id: 'sound-service',
        title: 'SoundService - Audio in Games',
        description: 'Add sound effects and music to enhance your game experience',
        content: `# SoundService - Audio in Games

Sound is crucial for creating immersive game experiences. SoundService and Sound objects let you add music, sound effects, and ambient audio.

## Creating Sounds

\`\`\`lua
-- Create a Sound instance
local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://123456789"  -- Sound asset ID
sound.Volume = 0.5  -- 50% volume (0-1 range)
sound.Looped = false  -- Play once or loop
sound.Parent = workspace  -- Or attach to a part

-- Play the sound
sound:Play()

-- Wait for sound to finish
sound.Ended:Wait()
\`\`\`

## Sound Properties

\`\`\`lua
sound.Volume = 0.7        -- 70% volume (0-1)
sound.Pitch = 1.0         -- Normal pitch (0.5-2.0 range)
sound.Looped = true       -- Repeat sound
sound.TimePosition = 0    -- Start position in seconds
sound.IsPlaying = true    -- Check if currently playing
\`\`\`

## Playing Sounds from Parts

Attach sounds to parts for spatial audio:

\`\`\`lua
local part = workspace.Part
local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://123456789"
sound.Parent = part

-- Play when part is touched
part.Touched:Connect(function(hit)
    sound:Play()
end)
\`\`\`

## Using SoundService for Global Sounds

\`\`\`lua
local SoundService = game:GetService("SoundService")

-- Music that plays for all players
local music = Instance.new("Sound")
music.SoundId = "rbxassetid://123456789"
music.Looped = true
music.Volume = 0.3
music.Parent = SoundService

music:Play()
\`\`\`

## Sound Groups

Organize sounds with SoundGroups:

\`\`\`lua
local soundGroup = Instance.new("SoundGroup")
soundGroup.Name = "Music"
soundGroup.Volume = 0.5
soundGroup.Parent = SoundService

-- Add sounds to group
local music = Instance.new("Sound")
music.SoundId = "rbxassetid://123456789"
music.Parent = soundGroup  -- Inherits volume from group
\`\`\`

## Stopping and Pausing

\`\`\`lua
sound:Stop()     -- Stops and resets to beginning
sound:Pause()   -- Pauses (use Resume() to continue)
sound:Resume()   -- Continues from where paused
\`\`\`

## Best Practices

1. **Use appropriate volume** - Don't deafen players
2. **Loop background music** - Use Looped = true
3. **Spatial audio** - Attach to parts for 3D sound
4. **SoundGroups** - Organize and control volume
5. **Clean up** - Remove sounds when done to save memory

Sound enhances player immersion - use it wisely!`,
        initialCode: `-- ============================================
-- TASK: Create and play a sound
-- ============================================
--
-- Instructions:
-- 1. Create a Sound instance
-- 2. Set the SoundId to "rbxassetid://[any sound ID]"
-- 3. Set Volume to 0.5
-- 4. Set the Parent to workspace
-- 5. Play the sound
--
-- Note: Use any valid Roblox sound asset ID
-- ============================================

-- TODO: Create sound instance
local sound = Instance.new(_____)

-- TODO: Set SoundId, Volume, and Parent
sound.SoundId = 
sound.Volume = 
sound.Parent = 

-- TODO: Play the sound
`,
        solution: `local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://131961136"  -- Example: Epic music
sound.Volume = 0.5
sound.Parent = workspace

sound:Play()`,
        hints: [
          'Use Instance.new("Sound")',
          'SoundId format: "rbxassetid://[ID]"',
          'Volume is between 0 and 1',
          'Call sound:Play() to start',
        ],
        objectives: [
          'Create a Sound instance',
          'Configure sound properties',
          'Play sounds in your game',
        ],
      },
      {
        id: 'workspace-events',
        title: 'Workspace Events and Detection',
        description: 'Detect when instances are added, removed, or changed in the workspace',
        content: `# Workspace Events and Detection

Workspace events let you react when things are added, removed, or changed in your game world. Essential for dynamic game systems.

## ChildAdded and DescendantAdded

Detect when instances are added to workspace:

\`\`\`lua
-- Detect when parts are added to workspace
workspace.ChildAdded:Connect(function(child)
    if child:IsA("BasePart") then
        print("New part added: " .. child.Name)
    end
end)

-- DescendantAdded detects children of children (recursive)
workspace.DescendantAdded:Connect(function(descendant)
    if descendant:IsA("BasePart") then
        print("Part added anywhere in workspace: " .. descendant.Name)
    end
end)
\`\`\`

## ChildRemoved

Detect when instances are removed:

\`\`\`lua
workspace.ChildRemoved:Connect(function(child)
    print("Removed from workspace: " .. child.Name)
end)
\`\`\`

## Changed Event

React when properties change:

\`\`\`lua
local part = workspace.Part

part.Changed:Connect(function(property)
    if property == "Transparency" then
        print("Transparency changed!")
    elseif property == "Size" then
        print("Size changed!")
    end
end)

-- Change it
part.Transparency = 0.5  -- Triggers Changed event
\`\`\`

## AncestryChanged

Detect when parent changes:

\`\`\`lua
local part = Instance.new("Part")

part.AncestryChanged:Connect(function()
    if part.Parent == workspace then
        print("Part moved to workspace!")
    elseif part.Parent == nil then
        print("Part removed from game!")
    end
end)
\`\`\`

## Practical Example: Auto-Detect Collectibles

\`\`\`lua
-- Automatically detect collectible parts
workspace.DescendantAdded:Connect(function(descendant)
    if descendant:IsA("BasePart") and descendant.Name == "Collectible" then
        -- Setup collectible behavior
        descendant.Touched:Connect(function(hit)
            local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
            if humanoid then
                print("Collectible collected!")
                descendant:Destroy()
            end
        end)
    end
end)
\`\`\`

## Best Practices

1. **Use DescendantAdded for recursive detection**
2. **Filter by type** - Use IsA() to check instance types
3. **Clean up connections** - Store connections if needed later
4. **Handle nil cases** - Instances might be removed before you process them

Workspace events are essential for dynamic, reactive game systems!`,
        initialCode: `-- ============================================
-- TASK: Detect when parts are added to workspace
-- ============================================
--
-- Instructions:
-- 1. Connect to workspace.ChildAdded event
-- 2. Check if the child is a BasePart using IsA()
-- 3. Print a message when a part is added
--
-- Example:
-- workspace.ChildAdded:Connect(function(child) ... end)
-- child:IsA("BasePart") checks the type
-- ============================================

-- TODO: Connect to ChildAdded and detect BasePart additions
workspace.ChildAdded:Connect(function(child)
    -- TODO: Check if it's a BasePart and print
    if child:IsA(_____) then
        print("Part added: " .. child.Name)
    end
end)`,
        solution: `workspace.ChildAdded:Connect(function(child)
    if child:IsA("BasePart") then
        print("Part added: " .. child.Name)
    end
end)`,
        hints: [
          'ChildAdded fires when children are added',
          'Use IsA("BasePart") to check type',
          'IsA() is a method, use colon: child:IsA()',
        ],
        objectives: [
          'Use ChildAdded event',
          'Filter instances by type',
          'React to workspace changes',
        ],
      },
    ],
  },
]

export function getCourse(courseId: string): Course | undefined {
  return courses.find((c) => c.id === courseId)
}

export function getLesson(courseId: string, lessonId: string): Lesson | undefined {
  const course = getCourse(courseId)
  return course?.lessons.find((l) => l.id === lessonId)
}
