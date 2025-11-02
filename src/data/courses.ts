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
    estimatedTime: '6 hours',
    difficulty: 'Beginner',
    lessons: [
      {
        id: 'getting-started',
        title: 'Getting Started with Lua',
        description: 'Introduction to Lua programming and your first code',
        content: `# Getting Started with Lua

Welcome to Lua programming! Lua is the programming language used by Roblox.

## What is Lua?

Lua is a lightweight, powerful scripting language perfect for game development. In Roblox, Lua is used to control everything in your game!

## Your First Code

\`\`\`lua
-- This is a comment! Comments start with --
print("Hello, World!")
\`\`\`

## Basic Syntax

- Lines end automatically (no semicolons needed!)
- Use \`--\` for comments
- \`print()\` displays text in the output

## Try It!

Let's print your first message!`,
        initialCode: `-- Print "Hello, World!"
-- Use print("your message here")

`,
        solution: `-- Print "Hello, World!"
-- Use print("your message here")
print("Hello, World!")`,
        hints: [
          'Use print() function',
          'Put your message in quotes: "Hello, World!"',
          'Don\'t forget the parentheses!',
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

In Lua, variables are used to store data. You don't need to declare the type - Lua figures it out automatically!

## Basic Variable Types

- **Numbers**: Integers and decimals (e.g., 5, 3.14)
- **Strings**: Text enclosed in quotes (e.g., "Hello", 'World')
- **Booleans**: true or false
- **Nil**: Represents "no value"

## The \`local\` Keyword

Always use \`local\` to keep variables from leaking into the global scope!

\`\`\`lua
local name = "Roblox"
local age = 10
local isActive = true
\`\`\``,
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
        content: `# Functions

Functions are reusable blocks of code that perform specific tasks.

## Creating Functions

\`\`\`lua
function greet(name)
    print("Hello, " .. name .. "!")
end
\`\`\`

## Returning Values

\`\`\`lua
function add(a, b)
    return a + b
end

local result = add(5, 3)  -- result is 8
\`\`\``,
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
      {
        id: 'tables',
        title: 'Tables and Arrays',
        description: 'Learn how to work with tables - Lua\'s only data structure',
        content: `# Tables and Arrays

Tables are Lua's only data structure - they can be used as arrays, dictionaries, objects, and more!

## Creating Tables

\`\`\`lua
-- Array-style table
local items = {"sword", "shield", "potion"}

-- Dictionary-style table
local player = {
    name = "RobloxPlayer",
    level = 10,
    health = 100
}

-- Accessing values
print(items[1])  -- "sword"
print(player.name)  -- "RobloxPlayer"
\`\`\``,
        initialCode: `-- Create an array of items
local items = {}

-- Add some items to the array
-- Use table.insert() or items[index] = value

-- Print the first item
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

Conditionals let your code make decisions based on conditions.

## Basic If Statement

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

## Comparison Operators

- \`==\` equals
- \`~=\` not equals
- \`<\` less than
- \`>\` greater than
- \`<=\` less than or equal
- \`>=\` greater than or equal`,
        initialCode: `local score = 85

-- Write an if statement that prints:
-- "Great job!" if score >= 90
-- "Good work!" if score >= 70
-- "Keep practicing!" otherwise
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
          'Use >= for "greater than or equal"',
          'Use elseif for multiple conditions',
          'The else catches everything else',
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
\`\`\``,
        initialCode: `local numbers = {10, 20, 30, 40, 50}

-- Use a for loop to print each number
-- Use ipairs() to iterate over the table
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
    ],
  },
  {
    id: 'roblox-intro',
    title: 'Roblox Scripting Essentials',
    description: 'Master the core concepts of Roblox scripting and Studio',
    icon: '🎮',
    color: 'green',
    estimatedTime: '8 hours',
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
        initialCode: `-- Create a new Part instance
local part = Instance.new("Part")

-- Set its parent to workspace
part.Parent = 

-- Give it a name
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

Parts are the 3D building blocks of Roblox games.

## Creating and Positioning Parts

\`\`\`lua
local part = Instance.new("Part")
part.Parent = workspace
part.Position = Vector3.new(0, 10, 0)
part.Size = Vector3.new(4, 4, 4)
part.BrickColor = BrickColor.new("Bright blue")
part.Material = Enum.Material.Neon
\`\`\`

## Vector3

Vector3 represents 3D coordinates: (x, y, z)
- X: left/right
- Y: up/down (height)
- Z: forward/back`,
        initialCode: `-- Create a new part
local part = Instance.new("Part")
part.Parent = workspace

-- Set the part's position to (5, 20, 0)
part.Position = 

-- Set the size to a cube (5x5x5)
part.Size = 

-- Change the color to red
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

Services are the core systems in Roblox. Everything important is a service!

## Common Services

- **Workspace**: Contains all physical objects
- **Players**: Manages all players in the game
- **ReplicatedStorage**: Data shared between client and server
- **Lighting**: Controls lighting and environment
- **StarterPlayer**: Player starting items

## Getting Services

\`\`\`lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")
\`\`\``,
        initialCode: `-- Get the Players service
local Players = 

-- Get the Workspace service  
local Workspace = 

-- Print both (you can print services to see they exist)
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
    ],
  },
  {
    id: 'events',
    title: 'Events and Communication',
    description: 'Master events, RemoteEvents, and client-server communication',
    icon: '⚡',
    color: 'purple',
    estimatedTime: '10 hours',
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
    ],
  },
  {
    id: 'humanoids-characters',
    title: 'Humanoids and Characters',
    description: 'Master working with player characters, animations, and humanoids',
    icon: '🤖',
    color: 'orange',
    estimatedTime: '8 hours',
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
local humanoid = character:FindFirstChild("Humanoid")

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
local character = player.Character
local humanoid = character:FindFirstChild("Humanoid")

-- Set max health to 150
humanoid.MaxHealth = 

-- Set current health to full
humanoid.Health = `,
        solution: `local Players = game:GetService("Players")
local player = Players:GetPlayers()[1]  -- Get first player
local character = player.Character
local humanoid = character:FindFirstChild("Humanoid")

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
    ],
  },
  {
    id: 'gui-scripting',
    title: 'GUI Scripting',
    description: 'Create and manipulate user interfaces in Roblox',
    icon: '🖥️',
    color: 'yellow',
    estimatedTime: '10 hours',
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
    ],
  },
  {
    id: 'data-persistence',
    title: 'Data Persistence',
    description: 'Save and load player data using DataStores',
    icon: '💾',
    color: 'red',
    estimatedTime: '8 hours',
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
    wait(300)  -- 5 minutes
    
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
    wait(1)  -- Wait for character to spawn
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
    estimatedTime: '10 hours',
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
    wait(5)
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
