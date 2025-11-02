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
    title: 'Lua Basics',
    description: 'Master the fundamentals of Lua programming',
    icon: '📚',
    color: 'blue',
    estimatedTime: '2 hours',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'variables',
        title: 'Variables and Data Types',
        description: 'Learn how to declare variables and work with different data types in Lua',
        content: `
# Variables and Data Types

In Lua, variables are used to store data. You don't need to declare the type - Lua figures it out automatically!

## Basic Variable Types

- **Numbers**: Integers and decimals (e.g., 5, 3.14)
- **Strings**: Text enclosed in quotes (e.g., "Hello", 'World')
- **Booleans**: true or false
- **Nil**: Represents "no value"

## Example

\`\`\`lua
local name = "Roblox"
local age = 10
local isActive = true
\`\`\`

Try creating some variables below!
        `,
        initialCode: `-- Create a variable for your name
local name = 

-- Create a variable for a number
local number = 

-- Print both variables
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
        content: `
# Functions

Functions are reusable blocks of code that perform specific tasks.

## Creating Functions

\`\`\`lua
function greet(name)
    print("Hello, " .. name .. "!")
end
\`\`\`

## Calling Functions

\`\`\`lua
greet("Roblox")
-- Output: Hello, Roblox!
\`\`\`
        `,
        initialCode: `-- Create a function that prints a greeting
function greet(name)
    -- Your code here
end

-- Call the function
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
    ],
  },
  {
    id: 'roblox-intro',
    title: 'Introduction to Roblox Scripting',
    description: 'Learn the basics of scripting in Roblox Studio',
    icon: '🎮',
    color: 'green',
    estimatedTime: '3 hours',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'parts',
        title: 'Working with Parts',
        description: 'Create and manipulate parts in your Roblox game',
        content: `
# Working with Parts

Parts are the building blocks of Roblox games. Let's learn how to create and manipulate them!

## The Workspace

The Workspace is where all parts in your game live. You can access it with \`game.Workspace\`.

## Creating Parts

\`\`\`lua
local part = Instance.new("Part")
part.Parent = workspace
part.Position = Vector3.new(0, 10, 0)
\`\`\`
        `,
        initialCode: `-- Create a new part
local part = Instance.new("Part")
part.Parent = workspace

-- Set the part's position
-- Use Vector3.new(x, y, z)
part.Position = 

-- Change the part's color (use BrickColor.new("ColorName"))
part.BrickColor = `,
        solution: `-- Create a new part
local part = Instance.new("Part")
part.Parent = workspace

-- Set the part's position
-- Use Vector3.new(x, y, z)
part.Position = Vector3.new(0, 10, 0)

-- Change the part's color (use BrickColor.new("ColorName"))
part.BrickColor = BrickColor.new("Bright blue")`,
        hints: [
          'Vector3.new takes three numbers: x, y, z',
          'Y is the height/vertical position',
          'Try colors like "Bright blue", "Bright red", "Bright green"',
        ],
        objectives: [
          'Create a new part instance',
          'Set the part\'s position',
          'Change the part\'s color',
        ],
      },
      {
        id: 'players',
        title: 'Working with Players',
        description: 'Learn how to interact with players in your game',
        content: `
# Working with Players

The Players service gives you access to all players in your game.

## Getting Players

\`\`\`lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer  -- In LocalScript
-- or
local players = Players:GetPlayers()  -- Get all players
\`\`\`
        `,
        initialCode: `-- Get the Players service
local Players = game:GetService("Players")

-- Get the local player (in LocalScript)
local player = Players.LocalPlayer

-- Print the player's name
print(`,
        solution: `-- Get the Players service
local Players = game:GetService("Players")

-- Get the local player (in LocalScript)
local player = Players.LocalPlayer

-- Print the player's name
print(player.Name)`,
        hints: [
          'Players is a service, use game:GetService("Players")',
          'Players.LocalPlayer gives you the current player',
          'Every player has a Name property',
        ],
        objectives: [
          'Get the Players service',
          'Access the local player',
          'Print the player\'s name',
        ],
      },
    ],
  },
  {
    id: 'events',
    title: 'Events and Communication',
    description: 'Learn how to handle events and communicate between scripts',
    icon: '⚡',
    color: 'purple',
    estimatedTime: '4 hours',
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 'touched-event',
        title: 'The Touched Event',
        description: 'Respond when a player touches a part',
        content: `
# The Touched Event

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
        `,
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

