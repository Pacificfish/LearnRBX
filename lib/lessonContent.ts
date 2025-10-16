// Lesson content configuration for different lessons
export interface LessonContent {
  title: string;
  description: string;
  sections: {
    title: string;
    content: string;
    codeExample: string;
    color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  }[];
  defaultCode: string;
  challenge: {
    tests: Array<{
      description: string;
      type: string;
      value?: any;
    }>;
    hints: string[];
    successMessage: string;
  };
}

export const lessonContentMap: Record<string, LessonContent> = {
  'variables-and-printing': {
    title: 'Variables & Roblox Output',
    description: 'Learn how to create variables and use Roblox Studio\'s Output window for debugging',
    sections: [
      {
        title: 'Local Variables in Luau',
        content: 'In Luau (Roblox\'s scripting language), always use `local` to declare variables. This creates variables with local scope, which is more efficient and follows Roblox best practices. Local variables are faster to access and help prevent naming conflicts.',
        codeExample: 'local playerName = "Alex"\nlocal playerLevel = 5\nlocal isAlive = true',
        color: 'blue'
      },
      {
        title: 'Roblox Studio Output Window',
        content: 'The `print()` function displays information in Roblox Studio\'s Output window. This is crucial for debugging scripts, monitoring game state, and understanding code execution flow. Always use print statements during development.',
        codeExample: 'print("Player spawned: " .. playerName)\nprint("Current level:", playerLevel)',
        color: 'green'
      },
      {
        title: 'String Concatenation & Data Types',
        content: 'Use `..` to concatenate strings. Luau automatically converts numbers to strings when concatenating. You can also use commas in print() to display multiple values with automatic spacing.',
        codeExample: 'print("Player: " .. playerName .. " | Level: " .. playerLevel)\nprint("Health:", 100, "Coins:", 250)',
        color: 'purple'
      }
    ],
    defaultCode: `-- Roblox Scripting: Variables and Output
-- Always use 'local' for variable declarations in Luau

local playerName = "Alex"
local playerLevel = 5
local playerHealth = 100
local playerCoins = 250

-- Print individual values
print("Player Name:", playerName)
print("Player Level:", playerLevel)

-- String concatenation
print("Welcome, " .. playerName .. "!")
print("Level " .. playerLevel .. " player with " .. playerHealth .. " health")

-- Multiple values in one print
print("Status:", playerName, "Level:", playerLevel, "Health:", playerHealth)`,
    challenge: {
      tests: [
        { description: 'Create a local variable called playerName', type: 'variable_exists', value: 'playerName' },
        { description: 'Print a welcome message using string concatenation', type: 'output_contains', value: 'Welcome' }
      ],
      hints: ['Always use `local` to declare variables in Luau', 'Use `..` to concatenate strings together', 'You can print multiple values with commas: print("Name:", name, "Level:", level)'],
      successMessage: 'Perfect! You understand Luau variables and output debugging.'
    }
  },

  'tables-and-loops': {
    title: 'Tables & Loops for Game Data',
    description: 'Learn about Luau tables and loops for managing game data like player inventories and object lists',
    sections: [
      {
        title: 'Tables in Luau',
        content: 'Tables in Luau are the only data structure that can hold multiple values. They can act as arrays (indexed by numbers) or dictionaries (indexed by keys). In Roblox, tables are used for player inventories, leaderboards, and managing game objects.',
        codeExample: 'local inventory = {"Sword", "Shield", "Potion"}\nlocal playerData = {name = "Alex", level = 5, coins = 100}',
        color: 'blue'
      },
      {
        title: 'Accessing Table Elements',
        content: 'Access array elements by index (starting from 1 in Luau) or dictionary elements by key. Use `#tableName` to get the length of an array table.',
        codeExample: 'print(inventory[1]) -- Prints "Sword"\nprint(playerData.name) -- Prints "Alex"\nprint("Inventory size:", #inventory)',
        color: 'green'
      },
      {
        title: 'For Loops and Iteration',
        content: 'Use numeric for loops for arrays and generic for loops for dictionaries. The `ipairs()` function is preferred for arrays as it\'s more efficient and handles nil values better.',
        codeExample: `-- Numeric for loop (arrays)
for i = 1, #inventory do
    print("Item " .. i .. ": " .. inventory[i])
end

-- Generic for loop (dictionaries)
for key, value in pairs(playerData) do
    print(key .. ": " .. tostring(value))
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Luau Tables and Loops
-- Create an inventory array
local inventory = {"Sword", "Shield", "Potion"}

-- Create player data dictionary
local playerData = {
    name = "Alex",
    level = 5,
    coins = 100,
    isAlive = true
}

-- Print inventory using numeric for loop
print("=== INVENTORY ===")
for i = 1, #inventory do
    print("Item " .. i .. ": " .. inventory[i])
end

-- Print player data using generic for loop
print("\\n=== PLAYER DATA ===")
for key, value in pairs(playerData) do
    print(key .. ": " .. tostring(value))
end

-- Add new item to inventory
table.insert(inventory, "Bow")
print("\\nAdded Bow! New inventory size:", #inventory)`,
    challenge: {
      tests: [
        { description: 'Create a table with at least 3 items', type: 'table_length', value: 3 },
        { description: 'Use a for loop to iterate through the table', type: 'code_contains', value: 'for' }
      ],
      hints: ['Use {} to create tables', 'Use #tableName to get array length', 'Use for i = 1, #table do for arrays', 'Use for key, value in pairs(table) do for dictionaries'],
      successMessage: 'Excellent! You can now work with Luau tables and loops effectively.'
    }
  },

  'functions-and-scope': {
    title: 'Functions for Game Logic',
    description: 'Learn how to create functions for organizing your Roblox game scripts and reusable code',
    sections: [
      {
        title: 'Creating Functions in Luau',
        content: 'Functions in Luau help organize code into reusable blocks. Always use `local` when declaring functions to follow Roblox best practices. Functions are essential for game mechanics like spawning, damage calculation, and event handling.',
        codeExample: `local function spawnPlayer(playerName)
    print("Spawning player: " .. playerName)
end`,
        color: 'blue'
      },
      {
        title: 'Function Parameters and Scope',
        content: 'Functions can accept parameters and have their own local scope. Parameters are local to the function. Use descriptive parameter names and consider default values for optional parameters.',
        codeExample: `local function calculateDamage(weaponPower, playerLevel, multiplier)
    multiplier = multiplier or 1  -- Default value
    local damage = weaponPower * playerLevel * multiplier
    return damage
end`,
        color: 'green'
      },
      {
        title: 'Return Values and Multiple Returns',
        content: 'Functions can return single or multiple values. Luau supports multiple return values, which is useful for returning both success status and data. Always handle return values properly.',
        codeExample: `local function getPlayerStats(player)
    local health = 100
    local level = 5
    local coins = 250
    return health, level, coins  -- Multiple returns
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Luau Functions and Scope
-- Local function declaration (recommended)
local function spawnPlayer(playerName)
    print("Spawning player: " .. playerName)
    return "Player spawned successfully!"
end

-- Function with multiple parameters and default values
local function calculateDamage(weaponPower, playerLevel, multiplier)
    multiplier = multiplier or 1  -- Default multiplier is 1
    local damage = weaponPower * playerLevel * multiplier
    return damage
end

-- Function with multiple return values
local function getPlayerStats(playerName)
    local health = 100
    local level = 5
    local coins = 250
    return health, level, coins
end

-- Use the functions
local result = spawnPlayer("Alex")
print(result)

local damage = calculateDamage(10, 5, 1.5)  -- 10 * 5 * 1.5 = 75
print("Damage dealt: " .. damage)

-- Handle multiple return values
local health, level, coins = getPlayerStats("Alex")
print("Health:", health, "Level:", level, "Coins:", coins)`,
    challenge: {
      tests: [
        { description: 'Create a local function with parameters', type: 'code_contains', value: 'local function' },
        { description: 'Use return statement in function', type: 'code_contains', value: 'return' }
      ],
      hints: ['Use `local function` for better performance', 'Functions can accept multiple parameters', 'Use `return` to send values back', 'Handle multiple return values with multiple variables'],
      successMessage: 'Excellent! You understand Luau functions and scope management.'
    }
  },

  'explorer-and-instances': {
    title: 'Roblox Explorer & Instances',
    description: 'Learn about Roblox Studio\'s Explorer window and how to work with Instances in your scripts',
    sections: [
      {
        title: 'Understanding the Explorer',
        content: 'The Explorer window in Roblox Studio shows the hierarchy of all objects in your game. Every object is an Instance - the building blocks of Roblox games.',
        codeExample: 'local part = Instance.new("Part")',
        color: 'blue'
      },
      {
        title: 'Creating Instances with Code',
        content: 'You can create new game objects using Instance.new(). This is how you spawn parts, create UI elements, or add new objects to your game dynamically.',
        codeExample: `local part = Instance.new("Part")
part.Name = "MyPart"
part.Parent = workspace`,
        color: 'green'
      },
      {
        title: 'Instance Properties',
        content: 'Every Instance has properties like Position, Size, Color, and Material. You can modify these to customize how your game objects look and behave.',
        codeExample: `part.Position = Vector3.new(0, 10, 0)
part.Size = Vector3.new(4, 4, 4)
part.Color = Color3.fromRGB(255, 0, 0)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Create a new part
local part = Instance.new("Part")
part.Name = "MyPart"
part.Parent = workspace

-- Set part properties
part.Position = Vector3.new(0, 10, 0)
part.Size = Vector3.new(4, 4, 4)
part.Color = Color3.fromRGB(255, 0, 0)
part.Material = Enum.Material.Neon

print("Created a red neon part at position (0, 10, 0)")`,
    challenge: {
      tests: [
        { description: 'Create a new Instance', type: 'code_contains', value: 'Instance.new' },
        { description: 'Set the Instance parent', type: 'code_contains', value: 'Parent' }
      ],
      hints: ['Use Instance.new("Part") to create parts', 'Set the Parent property to add to workspace', 'Modify properties like Position and Color'],
      successMessage: 'Great! You can now create and customize Instances in Roblox.'
    }
  },

  'events-touched-click': {
    title: 'Roblox Events: Touched & Clicked',
    description: 'Learn how to handle user interactions and object collisions using Roblox events',
    sections: [
      {
        title: 'Understanding Events',
        content: 'Events in Roblox are how your scripts respond to things that happen in the game - like when a player touches something, clicks a button, or when time passes.',
        codeExample: 'part.Touched:Connect(function(hit)',
        color: 'blue'
      },
      {
        title: 'Touched Event',
        content: 'The Touched event fires when something touches a BasePart. This is perfect for creating teleporters, damage zones, or collectible items.',
        codeExample: `part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        print("Player touched the part!")
    end
end)`,
        color: 'green'
      },
      {
        title: 'MouseButton1Click Event',
        content: 'The MouseButton1Click event fires when a player clicks on a GUI element or a part with ClickDetector. Perfect for buttons and interactive objects.',
        codeExample: `button.MouseButton1Click:Connect(function()
    print("Button was clicked!")
end)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Create a part that responds to being touched
local part = Instance.new("Part")
part.Name = "TouchPart"
part.Parent = workspace
part.Position = Vector3.new(0, 5, 0)
part.Size = Vector3.new(4, 4, 4)
part.Color = Color3.fromRGB(0, 255, 0)

-- Handle the Touched event
part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        print("A player touched the green part!")
    end
end)

print("Touch part created! Walk into it to trigger the event.")`,
    challenge: {
      tests: [
        { description: 'Use the Touched event', type: 'code_contains', value: 'Touched' },
        { description: 'Connect a function to the event', type: 'code_contains', value: 'Connect' }
      ],
      hints: ['Use part.Touched:Connect() for touch events', 'Check if hit.Parent has a Humanoid', 'Events make your game interactive'],
      successMessage: 'Excellent! You can now handle player interactions with events.'
    }
  },

  'client-server-remotes': {
    title: 'Client vs Server Scripts & RemoteEvents',
    description: 'Learn the difference between client and server scripts and how to communicate between them',
    sections: [
      {
        title: 'Client vs Server Scripts',
        content: 'In Roblox, scripts run in different environments. ServerScripts run on the server and handle game logic, while LocalScripts run on each player\'s device for UI and local effects.',
        codeExample: '-- ServerScript: Runs on server\n-- LocalScript: Runs on client',
        color: 'blue'
      },
      {
        title: 'RemoteEvents for Communication',
        content: 'RemoteEvents allow client and server scripts to communicate. Clients can fire events to the server, and the server can fire events back to clients.',
        codeExample: `-- Server: Create RemoteEvent
local remoteEvent = Instance.new("RemoteEvent")
remoteEvent.Name = "PlayerDataRequest"
remoteEvent.Parent = game.ReplicatedStorage`,
        color: 'green'
      },
      {
        title: 'FireClient and FireServer',
        content: 'Use FireServer() to send data from client to server, and FireClient() to send data from server to specific clients. This is how you sync game state.',
        codeExample: `-- Client fires to server
remoteEvent:FireServer(playerData)

-- Server fires to client
remoteEvent:FireClient(player, serverData)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- This simulates client-server communication
-- In a real game, this would be split between ServerScript and LocalScript

-- Simulate server-side code
print("=== SERVER SIDE ===")
local playerData = {
    name = "Alex",
    level = 5,
    coins = 100
}

-- Simulate client-side code  
print("=== CLIENT SIDE ===")
print("Player data received:")
print("Name: " .. playerData.name)
print("Level: " .. playerData.level)
print("Coins: " .. playerData.coins)

-- Simulate sending data back to server
print("Sending updated data to server...")`,
    challenge: {
      tests: [
        { description: 'Understand client-server concepts', type: 'code_contains', value: 'SERVER' },
        { description: 'Handle player data', type: 'code_contains', value: 'playerData' }
      ],
      hints: ['ServerScripts run on the server', 'LocalScripts run on each client', 'Use RemoteEvents to communicate between them'],
      successMessage: 'Perfect! You understand client-server architecture in Roblox.'
    }
  },

  'cframe-basics': {
    title: 'Roblox CFrame Positioning',
    description: 'Learn how to position and rotate parts using CFrames in Roblox Studio',
    sections: [
      {
        title: 'Understanding CFrames',
        content: 'CFrame (Coordinate Frame) is Roblox\'s data type for representing position and rotation in 3D space. Unlike Position (Vector3), CFrame includes both position and rotation information. It\'s essential for precise part placement, animations, and building complex structures.',
        codeExample: 'local part = Instance.new("Part")\npart.CFrame = CFrame.new(0, 10, 0)  -- Position only\npart.CFrame = CFrame.new(0, 10, 0) * CFrame.Angles(0, math.rad(45), 0)  -- Position + Rotation',
        color: 'blue'
      },
      {
        title: 'CFrame.new() for Positioning',
        content: 'Use CFrame.new(x, y, z) to create a CFrame with only position. The coordinates are in studs (Roblox\'s unit of measurement). Always set the Parent after setting the CFrame for better performance.',
        codeExample: `-- Position a part at coordinates (5, 10, -3)
local part = Instance.new("Part")
part.Size = Vector3.new(4, 4, 4)  -- Set size first
part.CFrame = CFrame.new(5, 10, -3)  -- Then position
part.Parent = workspace  -- Parent last for performance`,
        color: 'green'
      },
      {
        title: 'CFrame.Angles() for Rotation',
        content: 'Use CFrame.Angles(rx, ry, rz) to create rotation CFrames. Angles are in radians, so use math.rad() to convert degrees. Multiply position and rotation CFrames to combine them.',
        codeExample: `-- Create a rotated part (45 degrees around Y-axis)
local part = Instance.new("Part")
local position = CFrame.new(0, 5, 0)
local rotation = CFrame.Angles(0, math.rad(45), 0)
part.CFrame = position * rotation  -- Combine position and rotation
part.Parent = workspace`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Roblox CFrame Positioning and Rotation
-- Best practice: Set properties before parenting for performance

-- Create a ground part (position only)
local groundPart = Instance.new("Part")
groundPart.Name = "GroundPart"
groundPart.Size = Vector3.new(10, 1, 10)
groundPart.CFrame = CFrame.new(0, 0, 0)  -- Position at origin
groundPart.Parent = workspace

-- Create a floating part (position only)
local floatingPart = Instance.new("Part")
floatingPart.Name = "FloatingPart"
floatingPart.Size = Vector3.new(2, 2, 2)
floatingPart.CFrame = CFrame.new(0, 10, 0)  -- 10 studs up
floatingPart.Parent = workspace

-- Create a rotated part (position + rotation)
local rotatedPart = Instance.new("Part")
rotatedPart.Name = "RotatedPart"
rotatedPart.Size = Vector3.new(4, 1, 1)
-- Combine position and rotation using multiplication
rotatedPart.CFrame = CFrame.new(5, 5, 0) * CFrame.Angles(0, math.rad(45), 0)
rotatedPart.Parent = workspace

-- Create a complex rotated part (multiple rotations)
local complexPart = Instance.new("Part")
complexPart.Name = "ComplexPart"
complexPart.Size = Vector3.new(2, 2, 2)
-- Rotate 30 degrees on X-axis and 60 degrees on Y-axis
complexPart.CFrame = CFrame.new(-5, 5, 0) * CFrame.Angles(math.rad(30), math.rad(60), 0)
complexPart.Parent = workspace

print("Created 4 parts demonstrating CFrame positioning and rotation!")`,
    challenge: {
      tests: [
        { description: 'Create a part with CFrame positioning', type: 'code_contains', value: 'CFrame.new' },
        { description: 'Use CFrame.Angles for rotation', type: 'code_contains', value: 'CFrame.Angles' }
      ],
      hints: ['Use CFrame.new(x, y, z) for positioning', 'Use CFrame.Angles(rx, ry, rz) for rotation', 'Multiply CFrames to combine position and rotation', 'Use math.rad() to convert degrees to radians'],
      successMessage: 'Excellent! You can now position and rotate parts using CFrames effectively.'
    }
  },

  'color-and-material': {
    title: 'Roblox Part Colors & Materials',
    description: 'Learn how to customize the appearance of parts with colors and materials',
    sections: [
      {
        title: 'Setting Part Colors',
        content: 'Use the Color property to change how parts look. You can use Color3.fromRGB() to create specific colors or use predefined colors for your game objects.',
        codeExample: 'part.Color = Color3.fromRGB(255, 0, 0) -- Red\npart.Color = Color3.fromRGB(0, 255, 0) -- Green',
        color: 'blue'
      },
      {
        title: 'Part Materials',
        content: 'Materials change how light interacts with parts. Use different materials like Metal, Neon, or Glass to create various visual effects in your game.',
        codeExample: `part.Material = Enum.Material.Metal
part.Material = Enum.Material.Neon
part.Material = Enum.Material.Glass`,
        color: 'green'
      },
      {
        title: 'Combining Colors and Materials',
        content: 'Combine colors and materials to create stunning visual effects. Neon materials glow, metal reflects light, and glass is transparent - perfect for different game elements.',
        codeExample: `-- Create a glowing red part
part.Color = Color3.fromRGB(255, 0, 0)
part.Material = Enum.Material.Neon

-- Create a metallic blue part
part.Color = Color3.fromRGB(0, 100, 255)
part.Material = Enum.Material.Metal`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Create parts with different colors and materials
local redPart = Instance.new("Part")
redPart.Name = "RedNeonPart"
redPart.Size = Vector3.new(2, 2, 2)
redPart.Position = Vector3.new(0, 5, 0)
redPart.Color = Color3.fromRGB(255, 0, 0)
redPart.Material = Enum.Material.Neon
redPart.Parent = workspace

local bluePart = Instance.new("Part")
bluePart.Name = "BlueMetalPart"
bluePart.Size = Vector3.new(2, 2, 2)
bluePart.Position = Vector3.new(5, 5, 0)
bluePart.Color = Color3.fromRGB(0, 100, 255)
bluePart.Material = Enum.Material.Metal
bluePart.Parent = workspace

local greenPart = Instance.new("Part")
greenPart.Name = "GreenGlassPart"
greenPart.Size = Vector3.new(2, 2, 2)
greenPart.Position = Vector3.new(-5, 5, 0)
greenPart.Color = Color3.fromRGB(0, 255, 0)
greenPart.Material = Enum.Material.Glass
greenPart.Parent = workspace

print("Created colorful parts with different materials!")`,
    challenge: {
      tests: [
        { description: 'Set part color using Color3.fromRGB', type: 'code_contains', value: 'Color3.fromRGB' },
        { description: 'Set part material using Enum.Material', type: 'code_contains', value: 'Enum.Material' }
      ],
      hints: ['Use Color3.fromRGB(red, green, blue) for colors', 'Use Enum.Material.MaterialName for materials', 'Combine colors and materials for visual effects'],
      successMessage: 'Great! You can now customize part appearance with colors and materials.'
    }
  },

  'buttons-and-labels': {
    title: 'Roblox GUI Buttons & Labels',
    description: 'Learn how to create interactive user interface elements for your Roblox games',
    sections: [
      {
        title: 'Creating GUI Elements',
        content: 'GUI (Graphical User Interface) elements like buttons and labels are created using ScreenGui and placed in the StarterGui. They appear on the player\'s screen.',
        codeExample: `local screenGui = Instance.new("ScreenGui")
local button = Instance.new("TextButton")
button.Parent = screenGui`,
        color: 'blue'
      },
      {
        title: 'Button Properties',
        content: 'TextButtons can display text, have different sizes, and respond to clicks. They\'re perfect for menus, settings, and interactive elements in your game.',
        codeExample: `button.Text = "Click Me!"
button.Size = UDim2.new(0, 200, 0, 50)
button.Position = UDim2.new(0.5, -100, 0.5, -25)`,
        color: 'green'
      },
      {
        title: 'Button Click Events',
        content: 'Use MouseButton1Click to make buttons interactive. This is how you create menus, teleporters, and other clickable elements in your game.',
        codeExample: `button.MouseButton1Click:Connect(function()
    print("Button was clicked!")
end)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Create a simple GUI with button and label
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "MyGUI"
screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

-- Create a label
local label = Instance.new("TextLabel")
label.Name = "TitleLabel"
label.Text = "Welcome to My Game!"
label.Size = UDim2.new(0, 300, 0, 50)
label.Position = UDim2.new(0.5, -150, 0.2, 0)
label.BackgroundColor3 = Color3.fromRGB(100, 100, 100)
label.TextColor3 = Color3.fromRGB(255, 255, 255)
label.Parent = screenGui

-- Create a button
local button = Instance.new("TextButton")
button.Name = "ClickButton"
button.Text = "Click Me!"
button.Size = UDim2.new(0, 200, 0, 50)
button.Position = UDim2.new(0.5, -100, 0.5, -25)
button.BackgroundColor3 = Color3.fromRGB(0, 150, 0)
button.TextColor3 = Color3.fromRGB(255, 255, 255)
button.Parent = screenGui

-- Handle button click
button.MouseButton1Click:Connect(function()
    print("Button was clicked!")
    label.Text = "Button clicked! Great job!"
end)

print("GUI created! Click the button to see it work.")`,
    challenge: {
      tests: [
        { description: 'Create a ScreenGui', type: 'code_contains', value: 'ScreenGui' },
        { description: 'Handle button click events', type: 'code_contains', value: 'MouseButton1Click' }
      ],
      hints: ['Use ScreenGui for the main GUI container', 'Use TextButton for clickable elements', 'Use MouseButton1Click:Connect() for click events'],
      successMessage: 'Excellent! You can now create interactive GUI elements.'
    }
  },

  'tweenservice-intro': {
    title: 'Roblox TweenService Animations',
    description: 'Learn how to create smooth animations using TweenService in Roblox',
    sections: [
      {
        title: 'Understanding TweenService',
        content: 'TweenService creates smooth animations by interpolating between values over time. It\'s perfect for moving parts, changing colors, and creating polished UI animations.',
        codeExample: 'local TweenService = game:GetService("TweenService")',
        color: 'blue'
      },
      {
        title: 'Creating TweenInfo',
        content: 'TweenInfo defines how the animation behaves - duration, easing style, and how many times it repeats. This controls the feel and timing of your animations.',
        codeExample: `local tweenInfo = TweenInfo.new(
    2, -- Duration in seconds
    Enum.EasingStyle.Quad,
    Enum.EasingDirection.Out
)`,
        color: 'green'
      },
      {
        title: 'Animating Properties',
        content: 'Use TweenService:Create() to animate any property like Position, Size, Color, or Transparency. This brings your game objects to life with smooth motion.',
        codeExample: `local tween = TweenService:Create(part, tweenInfo, {
    Position = Vector3.new(10, 5, 0),
    Color = Color3.fromRGB(255, 0, 0)
})
tween:Play()`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Create an animated part using TweenService
local TweenService = game:GetService("TweenService")

-- Create a part to animate
local part = Instance.new("Part")
part.Name = "AnimatedPart"
part.Size = Vector3.new(2, 2, 2)
part.Position = Vector3.new(0, 5, 0)
part.Color = Color3.fromRGB(0, 255, 0)
part.Parent = workspace

-- Create tween info for smooth animation
local tweenInfo = TweenInfo.new(
    3, -- Duration: 3 seconds
    Enum.EasingStyle.Quad,
    Enum.EasingDirection.InOut,
    0, -- Repeat count (0 = play once)
    false, -- Reverse
    0 -- Delay
)

-- Create the tween
local tween = TweenService:Create(part, tweenInfo, {
    Position = Vector3.new(20, 10, 0),
    Color = Color3.fromRGB(255, 0, 0),
    Size = Vector3.new(4, 4, 4)
})

-- Play the animation
tween:Play()

print("Animation started! Watch the part move and change color.")`,
    challenge: {
      tests: [
        { description: 'Use TweenService for animations', type: 'code_contains', value: 'TweenService' },
        { description: 'Create TweenInfo for animation properties', type: 'code_contains', value: 'TweenInfo.new' }
      ],
      hints: ['Get TweenService with game:GetService("TweenService")', 'Use TweenInfo.new() to define animation properties', 'Use TweenService:Create() to make the tween'],
      successMessage: 'Amazing! You can now create smooth animations with TweenService.'
    }
  },

  // === BEGINNER TRACK EXPANSION ===
  'conditionals-and-logic': {
    title: 'Conditionals & Game Logic',
    description: 'Learn how to make decisions in your Roblox scripts using if statements and boolean logic',
    sections: [
      {
        title: 'If Statements in Roblox',
        content: 'Use if statements to make decisions in your game. Check player health, scores, or game states to create dynamic gameplay.',
        codeExample: 'if playerHealth > 50 then\n    print("Player is healthy!")\nend',
        color: 'blue'
      },
      {
        title: 'Boolean Logic for Game Rules',
        content: 'Combine conditions with AND (and), OR (or), and NOT (not) to create complex game rules and logic systems.',
        codeExample: `if playerLevel >= 10 and playerCoins >= 100 then
    print("Player can upgrade!")
end`,
        color: 'green'
      },
      {
        title: 'Elseif and Else Statements',
        content: 'Use elseif and else to handle multiple conditions. Perfect for creating different outcomes based on player actions.',
        codeExample: `if playerScore >= 1000 then
    print("Excellent!")
elseif playerScore >= 500 then
    print("Good job!")
else
    print("Keep trying!")
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Game logic using conditionals
local playerHealth = 75
local playerLevel = 8
local playerCoins = 150
local hasWeapon = true

print("=== Player Status Check ===")

-- Check player health
if playerHealth > 50 then
    print("Health: Good (" .. playerHealth .. "%)")
else
    print("Health: Low (" .. playerHealth .. "%)")
end

-- Check if player can upgrade
if playerLevel >= 10 and playerCoins >= 100 then
    print("You can upgrade your character!")
elseif playerLevel >= 5 and playerCoins >= 50 then
    print("You're getting close to an upgrade!")
else
    print("Keep playing to unlock upgrades!")
end

-- Check weapon status
if hasWeapon then
    print("Weapon: Equipped")
else
    print("Weapon: Not equipped")
end`,
    challenge: {
      tests: [
        { description: 'Use if statements for game logic', type: 'code_contains', value: 'if' },
        { description: 'Use boolean logic with and/or', type: 'code_contains', value: 'and' }
      ],
      hints: ['Use if statements to check conditions', 'Use and/or to combine conditions', 'Use elseif for multiple conditions'],
      successMessage: 'Great! You can now create smart game logic with conditionals.'
    }
  },

  'math-and-operators': {
    title: 'Math & Operators in Roblox',
    description: 'Master mathematical operations and operators for game calculations, scoring, and physics',
    sections: [
      {
        title: 'Basic Math Operations',
        content: 'Use +, -, *, / for addition, subtraction, multiplication, and division. Essential for calculating scores, health, and game mechanics.',
        codeExample: 'local score = 100 + 50 * 2  -- 200\nlocal health = 100 - 25     -- 75',
        color: 'blue'
      },
      {
        title: 'Math Library Functions',
        content: 'Use math.random(), math.floor(), math.ceil(), and math.abs() for advanced calculations, random numbers, and rounding.',
        codeExample: `local randomNumber = math.random(1, 10)
local roundedDown = math.floor(3.7)  -- 3
local roundedUp = math.ceil(3.2)     -- 4`,
        color: 'green'
      },
      {
        title: 'Comparison Operators',
        content: 'Use ==, ~=, <, >, <=, >= to compare values. Perfect for checking scores, distances, and game conditions.',
        codeExample: `local playerScore = 150
local highScore = 200

if playerScore > highScore then
    print("New high score!")
elseif playerScore == highScore then
    print("Tied the high score!")
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Math operations and calculations
local playerScore = 0
local enemyHealth = 100
local distance = 15.7

print("=== Math Operations Demo ===")

-- Basic calculations
playerScore = 50 + 25 * 2
print("Player Score: " .. playerScore)

-- Random number generation
local randomDamage = math.random(10, 20)
enemyHealth = enemyHealth - randomDamage
print("Enemy took " .. randomDamage .. " damage!")
print("Enemy Health: " .. enemyHealth)

-- Rounding and absolute values
local roundedDistance = math.floor(distance)
local absoluteDistance = math.abs(-distance)
print("Distance: " .. distance)
print("Rounded Distance: " .. roundedDistance)
print("Absolute Distance: " .. absoluteDistance)

-- Comparison operations
if playerScore >= 100 then
    print("Great score!")
elseif playerScore >= 50 then
    print("Good score!")
else
    print("Keep trying!")
end`,
    challenge: {
      tests: [
        { description: 'Use math operations for calculations', type: 'code_contains', value: 'math.' },
        { description: 'Use comparison operators', type: 'code_contains', value: '>=' }
      ],
      hints: ['Use +, -, *, / for basic math', 'Use math.random() for random numbers', 'Use ==, ~=, <, > for comparisons'],
      successMessage: 'Excellent! You can now perform calculations and comparisons in Roblox.'
    }
  },

  'string-manipulation': {
    title: 'String Manipulation & Text',
    description: 'Learn how to work with text, format messages, and create dynamic strings for your Roblox games',
    sections: [
      {
        title: 'String Concatenation',
        content: 'Combine strings using the .. operator to create dynamic messages, player names, and formatted text in your game.',
        codeExample: 'local playerName = "Alex"\nlocal message = "Welcome, " .. playerName .. "!"',
        color: 'blue'
      },
      {
        title: 'String Methods',
        content: 'Use string.upper(), string.lower(), string.len(), and string.sub() to manipulate text for usernames, formatting, and validation.',
        codeExample: `local username = "Player123"
local upperName = string.upper(username)  -- "PLAYER123"
local nameLength = string.len(username)   -- 8`,
        color: 'green'
      },
      {
        title: 'String Formatting',
        content: 'Use string.format() to create formatted text with numbers, decimals, and placeholders for professional-looking messages.',
        codeExample: `local score = 1234
local formattedScore = string.format("Score: %d", score)
local health = 75.5
local formattedHealth = string.format("Health: %.1f%%", health)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- String manipulation and formatting
local playerName = "AlexTheGamer"
local playerScore = 1234
local playerHealth = 87.5

print("=== String Manipulation Demo ===")

-- Basic string concatenation
local welcomeMessage = "Welcome, " .. playerName .. "!"
print(welcomeMessage)

-- String methods
local upperName = string.upper(playerName)
local lowerName = string.lower(playerName)
local nameLength = string.len(playerName)
print("Original: " .. playerName)
print("Uppercase: " .. upperName)
print("Lowercase: " .. lowerName)
print("Length: " .. nameLength .. " characters")

-- String formatting
local scoreMessage = string.format("Score: %d points", playerScore)
local healthMessage = string.format("Health: %.1f%%", playerHealth)
print(scoreMessage)
print(healthMessage)

-- String substring
local shortName = string.sub(playerName, 1, 4)
print("Short name: " .. shortName)

-- Dynamic message creation
local statusMessage = string.format("%s has %d points and %.1f%% health", 
    playerName, playerScore, playerHealth)
print("Status: " .. statusMessage)`,
    challenge: {
      tests: [
        { description: 'Use string concatenation with ..', type: 'code_contains', value: '..' },
        { description: 'Use string methods like upper/lower', type: 'code_contains', value: 'string.' }
      ],
      hints: ['Use .. to combine strings', 'Use string.upper() and string.lower() for case changes', 'Use string.format() for formatted text'],
      successMessage: 'Perfect! You can now manipulate and format text in Roblox.'
    }
  },

  // === ADVANCED TRACK EXPANSION ===
  'advanced-cframes': {
    title: 'Advanced CFrame Techniques',
    description: 'Master advanced CFrame operations for complex 3D positioning, rotations, and transformations',
    sections: [
      {
        title: 'CFrame Multiplication',
        content: 'Multiply CFrames to combine transformations. This is essential for creating complex rotations and positioning relative to other objects.',
        codeExample: `local baseCFrame = CFrame.new(0, 0, 0)
local rotation = CFrame.Angles(0, math.rad(45), 0)
local finalCFrame = baseCFrame * rotation`,
        color: 'blue'
      },
      {
        title: 'CFrame LookAt and ToWorldSpace',
        content: 'Use LookAt to make objects face specific directions and ToWorldSpace for coordinate transformations between different reference frames.',
        codeExample: `local part = Instance.new("Part")
part.CFrame = CFrame.lookAt(Vector3.new(0, 0, 0), Vector3.new(10, 0, 0))`,
        color: 'green'
      },
      {
        title: 'CFrame Interpolation',
        content: 'Use CFrame:Lerp() to smoothly interpolate between two CFrames, perfect for creating smooth camera movements and object transitions.',
        codeExample: `local startCFrame = CFrame.new(0, 0, 0)
local endCFrame = CFrame.new(10, 5, 0)
local interpolated = startCFrame:Lerp(endCFrame, 0.5)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced CFrame operations
local part1 = Instance.new("Part")
part1.Name = "AdvancedPart1"
part1.Size = Vector3.new(2, 2, 2)
part1.Parent = workspace

-- CFrame multiplication for complex transformations
local basePosition = CFrame.new(0, 5, 0)
local rotationX = CFrame.Angles(math.rad(30), 0, 0)
local rotationY = CFrame.Angles(0, math.rad(45), 0)
local finalCFrame = basePosition * rotationX * rotationY
part1.CFrame = finalCFrame

-- LookAt for directional positioning
local part2 = Instance.new("Part")
part2.Name = "AdvancedPart2"
part2.Size = Vector3.new(1, 1, 4)
part2.Parent = workspace
part2.CFrame = CFrame.lookAt(Vector3.new(5, 5, 0), Vector3.new(0, 5, 0))

-- CFrame interpolation
local part3 = Instance.new("Part")
part3.Name = "AdvancedPart3"
part3.Size = Vector3.new(2, 2, 2)
part3.Parent = workspace

local startPos = CFrame.new(-5, 5, 0)
local endPos = CFrame.new(5, 10, 0)

-- Interpolate to middle position
local middlePos = startPos:Lerp(endPos, 0.5)
part3.CFrame = middlePos

print("Created advanced CFrame examples!")
print("Part 1: Complex rotation")
print("Part 2: LookAt positioning")
print("Part 3: Interpolated position")`,
    challenge: {
      tests: [
        { description: 'Use CFrame multiplication', type: 'code_contains', value: 'CFrame.new' },
        { description: 'Use CFrame.Lerp for interpolation', type: 'code_contains', value: 'Lerp' }
      ],
      hints: ['Multiply CFrames with * to combine transformations', 'Use CFrame.lookAt() for directional positioning', 'Use :Lerp() to interpolate between CFrames'],
      successMessage: 'Outstanding! You can now use advanced CFrame techniques.'
    }
  },

  'physics-and-constraints': {
    title: 'Physics & Constraints',
    description: 'Learn how to create realistic physics interactions and constraints between parts in Roblox',
    sections: [
      {
        title: 'BodyMovers and Physics',
        content: 'Use BodyVelocity, BodyPosition, and BodyAngularVelocity to create custom physics behaviors and controlled movement.',
        codeExample: `local bodyVelocity = Instance.new("BodyVelocity")
bodyVelocity.MaxForce = Vector3.new(4000, 4000, 4000)
bodyVelocity.Velocity = Vector3.new(0, 50, 0)`,
        color: 'blue'
      },
      {
        title: 'Constraints and Joints',
        content: 'Use WeldConstraints, HingeConstraints, and BallSocketConstraints to connect parts and create mechanical systems.',
        codeExample: `local weldConstraint = Instance.new("WeldConstraint")
weldConstraint.Part0 = part1
weldConstraint.Part1 = part2`,
        color: 'green'
      },
      {
        title: 'Force and Impulse',
        content: 'Apply forces and impulses to parts to create realistic physics interactions, explosions, and dynamic movement.',
        codeExample: `local bodyPosition = Instance.new("BodyPosition")
bodyPosition.MaxForce = Vector3.new(4000, 4000, 4000)
bodyPosition.Position = Vector3.new(0, 20, 0)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Physics and constraints demonstration
local part1 = Instance.new("Part")
part1.Name = "PhysicsPart1"
part1.Size = Vector3.new(2, 2, 2)
part1.Position = Vector3.new(0, 10, 0)
part1.Parent = workspace

local part2 = Instance.new("Part")
part2.Name = "PhysicsPart2"
part2.Size = Vector3.new(2, 2, 2)
part2.Position = Vector3.new(3, 10, 0)
part2.Parent = workspace

-- Create a weld constraint to connect parts
local weldConstraint = Instance.new("WeldConstraint")
weldConstraint.Part0 = part1
weldConstraint.Part1 = part2
weldConstraint.Parent = part1

-- Add BodyVelocity for movement
local bodyVelocity = Instance.new("BodyVelocity")
bodyVelocity.MaxForce = Vector3.new(4000, 4000, 4000)
bodyVelocity.Velocity = Vector3.new(10, 0, 0)
bodyVelocity.Parent = part1

-- Create a floating part with BodyPosition
local floatingPart = Instance.new("Part")
floatingPart.Name = "FloatingPart"
floatingPart.Size = Vector3.new(1, 1, 1)
floatingPart.Position = Vector3.new(0, 15, 0)
floatingPart.Parent = workspace

local bodyPosition = Instance.new("BodyPosition")
bodyPosition.MaxForce = Vector3.new(4000, 4000, 4000)
bodyPosition.Position = Vector3.new(0, 15, 0)
bodyPosition.D = 1000 -- Damping
bodyPosition.P = 3000 -- Power
bodyPosition.Parent = floatingPart

print("Created physics examples!")
print("Part 1 & 2: Welded together with velocity")
print("Floating Part: Position constraint")`,
    challenge: {
      tests: [
        { description: 'Use BodyVelocity for movement', type: 'code_contains', value: 'BodyVelocity' },
        { description: 'Create constraints between parts', type: 'code_contains', value: 'WeldConstraint' }
      ],
      hints: ['Use BodyVelocity for controlled movement', 'Use WeldConstraint to connect parts', 'Use BodyPosition for floating effects'],
      successMessage: 'Fantastic! You can now create realistic physics in Roblox.'
    }
  },

  'datastores-and-persistence': {
    title: 'DataStores & Data Persistence',
    description: 'Learn how to save and load player data using Roblox DataStores for persistent game progress',
    sections: [
      {
        title: 'Understanding DataStores',
        content: 'DataStores allow you to save player data between game sessions. Essential for saving progress, coins, levels, and achievements.',
        codeExample: 'local DataStoreService = game:GetService("DataStoreService")\nlocal playerDataStore = DataStoreService:GetDataStore("PlayerData")',
        color: 'blue'
      },
      {
        title: 'Saving Player Data',
        content: 'Use SetAsync() to save player data. Always wrap in pcall() to handle errors gracefully and prevent data loss.',
        codeExample: `local success, errorMessage = pcall(function()
    playerDataStore:SetAsync(player.UserId, playerData)
end)`,
        color: 'green'
      },
      {
        title: 'Loading Player Data',
        content: 'Use GetAsync() to load player data when they join. Provide default values for new players who don\'t have saved data yet.',
        codeExample: `local success, data = pcall(function()
    return playerDataStore:GetAsync(player.UserId)
end)

if success and data then
    -- Load existing data
else
    -- Use default data for new player
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- DataStore simulation (in real game, this would use actual DataStoreService)
print("=== DataStore Simulation ===")

-- Simulate player data
local playerData = {
    level = 5,
    coins = 250,
    experience = 1200,
    achievements = {"First Steps", "Coin Collector"},
    lastPlayed = "2024-01-15"
}

-- Simulate saving data
print("Saving player data...")
print("Level: " .. playerData.level)
print("Coins: " .. playerData.coins)
print("Experience: " .. playerData.experience)
print("Achievements: " .. table.concat(playerData.achievements, ", "))

-- Simulate loading data
print("\\nLoading player data...")
local loadedData = playerData -- In real game, this would come from DataStore

if loadedData then
    print("Welcome back! Your progress:")
    print("Level: " .. loadedData.level)
    print("Coins: " .. loadedData.coins)
    print("Experience: " .. loadedData.experience)
else
    print("Welcome new player! Starting with default data.")
    local defaultData = {
        level = 1,
        coins = 0,
        experience = 0,
        achievements = {}
    }
    print("Default Level: " .. defaultData.level)
end

-- Simulate data update
print("\\nUpdating player progress...")
playerData.coins = playerData.coins + 50
playerData.experience = playerData.experience + 100
print("New Coins: " .. playerData.coins)
print("New Experience: " .. playerData.experience)`,
    challenge: {
      tests: [
        { description: 'Handle player data structure', type: 'code_contains', value: 'playerData' },
        { description: 'Use pcall for error handling', type: 'code_contains', value: 'pcall' }
      ],
      hints: ['Use DataStoreService:GetDataStore() to get a DataStore', 'Always use pcall() when saving/loading data', 'Provide default data for new players'],
      successMessage: 'Excellent! You can now save and load player data.'
    }
  },

  // === UI TRACK EXPANSION ===
  'advanced-gui-layout': {
    title: 'Advanced GUI Layout & Design',
    description: 'Master advanced GUI techniques including responsive design, layouts, and professional UI creation',
    sections: [
      {
        title: 'UDim2 and Responsive Design',
        content: 'Use UDim2 for responsive GUI elements that scale properly on different screen sizes. Essential for professional UI design.',
        codeExample: `local frame = Instance.new("Frame")
frame.Size = UDim2.new(0.8, 0, 0.6, 0)  -- 80% width, 60% height
frame.Position = UDim2.new(0.1, 0, 0.2, 0)  -- 10% from left, 20% from top`,
        color: 'blue'
      },
      {
        title: 'Layout Objects',
        content: 'Use UIListLayout, UIGridLayout, and UIPadding to automatically arrange GUI elements without manual positioning.',
        codeExample: `local listLayout = Instance.new("UIListLayout")
listLayout.SortOrder = Enum.SortOrder.LayoutOrder
listLayout.Padding = UDim.new(0, 5)
listLayout.Parent = frame`,
        color: 'green'
      },
      {
        title: 'GUI Styling and Themes',
        content: 'Create consistent visual themes using Color3, transparency, corner radius, and stroke effects for professional-looking interfaces.',
        codeExample: `local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 8)
corner.Parent = button

local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(100, 100, 100)
stroke.Thickness = 2
stroke.Parent = button`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced GUI layout and design
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "AdvancedGUI"
screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

-- Main container frame
local mainFrame = Instance.new("Frame")
mainFrame.Name = "MainFrame"
mainFrame.Size = UDim2.new(0.6, 0, 0.7, 0)  -- 60% width, 70% height
mainFrame.Position = UDim2.new(0.2, 0, 0.15, 0)  -- Centered
mainFrame.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
mainFrame.Parent = screenGui

-- Add corner radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = mainFrame

-- Add stroke
local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(100, 100, 100)
stroke.Thickness = 2
stroke.Parent = mainFrame

-- Add padding
local padding = Instance.new("UIPadding")
padding.PaddingLeft = UDim.new(0, 20)
padding.PaddingRight = UDim.new(0, 20)
padding.PaddingTop = UDim.new(0, 20)
padding.PaddingBottom = UDim.new(0, 20)
padding.Parent = mainFrame

-- Create list layout for automatic arrangement
local listLayout = Instance.new("UIListLayout")
listLayout.SortOrder = Enum.SortOrder.LayoutOrder
listLayout.Padding = UDim.new(0, 10)
listLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center
listLayout.Parent = mainFrame

-- Title label
local titleLabel = Instance.new("TextLabel")
titleLabel.Name = "TitleLabel"
titleLabel.Text = "Advanced GUI Demo"
titleLabel.Size = UDim2.new(1, 0, 0, 40)
titleLabel.BackgroundTransparency = 1
titleLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
titleLabel.TextScaled = true
titleLabel.Font = Enum.Font.GothamBold
titleLabel.Parent = mainFrame

-- Button 1
local button1 = Instance.new("TextButton")
button1.Name = "Button1"
button1.Text = "Responsive Button 1"
button1.Size = UDim2.new(0.8, 0, 0, 50)
button1.BackgroundColor3 = Color3.fromRGB(0, 150, 0)
button1.TextColor3 = Color3.fromRGB(255, 255, 255)
button1.Font = Enum.Font.Gotham
button1.TextScaled = true
button1.Parent = mainFrame

-- Button 2
local button2 = Instance.new("TextButton")
button2.Name = "Button2"
button2.Text = "Responsive Button 2"
button2.Size = UDim2.new(0.8, 0, 0, 50)
button2.BackgroundColor3 = Color3.fromRGB(150, 0, 0)
button2.TextColor3 = Color3.fromRGB(255, 255, 255)
button2.Font = Enum.Font.Gotham
button2.TextScaled = true
button2.Parent = mainFrame

-- Add corners to buttons
local button1Corner = Instance.new("UICorner")
button1Corner.CornerRadius = UDim.new(0, 8)
button1Corner.Parent = button1

local button2Corner = Instance.new("UICorner")
button2Corner.CornerRadius = UDim.new(0, 8)
button2Corner.Parent = button2

print("Created advanced responsive GUI!")`,
    challenge: {
      tests: [
        { description: 'Use UDim2 for responsive sizing', type: 'code_contains', value: 'UDim2.new' },
        { description: 'Use layout objects for automatic arrangement', type: 'code_contains', value: 'UIListLayout' }
      ],
      hints: ['Use UDim2.new() for responsive sizing', 'Use UIListLayout for automatic arrangement', 'Use UICorner and UIStroke for styling'],
      successMessage: 'Amazing! You can now create professional responsive GUIs.'
    }
  },

  'gui-animations': {
    title: 'GUI Animations & Effects',
    description: 'Create smooth animations and visual effects for your Roblox user interfaces',
    sections: [
      {
        title: 'Tweening GUI Properties',
        content: 'Animate GUI properties like Position, Size, BackgroundColor3, and TextColor3 to create smooth transitions and effects.',
        codeExample: `local tweenInfo = TweenInfo.new(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
local tween = TweenService:Create(button, tweenInfo, {
    Size = UDim2.new(0.9, 0, 0, 60)
})`,
        color: 'blue'
      },
      {
        title: 'Hover Effects and Interactions',
        content: 'Create interactive hover effects, button press animations, and smooth transitions that respond to user input.',
        codeExample: `button.MouseEnter:Connect(function()
    local hoverTween = TweenService:Create(button, tweenInfo, {
        BackgroundColor3 = Color3.fromRGB(100, 200, 100)
    })
    hoverTween:Play()
end)`,
        color: 'green'
      },
      {
        title: 'Page Transitions and Navigation',
        content: 'Create smooth page transitions, fade effects, and navigation animations for professional menu systems.',
        codeExample: `-- Fade out current page
local fadeOut = TweenService:Create(currentPage, tweenInfo, {
    BackgroundTransparency = 1
})
fadeOut:Play()`,
        color: 'purple'
      }
    ],
    defaultCode: `-- GUI animations and effects
local TweenService = game:GetService("TweenService")
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "AnimatedGUI"
screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

-- Main frame
local mainFrame = Instance.new("Frame")
mainFrame.Name = "MainFrame"
mainFrame.Size = UDim2.new(0.4, 0, 0.6, 0)
mainFrame.Position = UDim2.new(0.3, 0, 0.2, 0)
mainFrame.BackgroundColor3 = Color3.fromRGB(60, 60, 60)
mainFrame.Parent = screenGui

-- Add corner
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 10)
corner.Parent = mainFrame

-- Animated button
local animatedButton = Instance.new("TextButton")
animatedButton.Name = "AnimatedButton"
animatedButton.Text = "Click Me!"
animatedButton.Size = UDim2.new(0.8, 0, 0, 50)
animatedButton.Position = UDim2.new(0.1, 0, 0.3, 0)
animatedButton.BackgroundColor3 = Color3.fromRGB(0, 150, 0)
animatedButton.TextColor3 = Color3.fromRGB(255, 255, 255)
animatedButton.Font = Enum.Font.Gotham
animatedButton.TextScaled = true
animatedButton.Parent = mainFrame

-- Add button corner
local buttonCorner = Instance.new("UICorner")
buttonCorner.CornerRadius = UDim.new(0, 8)
buttonCorner.Parent = animatedButton

-- Tween info for animations
local tweenInfo = TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)

-- Hover effect
animatedButton.MouseEnter:Connect(function()
    local hoverTween = TweenService:Create(animatedButton, tweenInfo, {
        BackgroundColor3 = Color3.fromRGB(0, 200, 0),
        Size = UDim2.new(0.85, 0, 0, 55)
    })
    hoverTween:Play()
end)

-- Leave effect
animatedButton.MouseLeave:Connect(function()
    local leaveTween = TweenService:Create(animatedButton, tweenInfo, {
        BackgroundColor3 = Color3.fromRGB(0, 150, 0),
        Size = UDim2.new(0.8, 0, 0, 50)
    })
    leaveTween:Play()
end)

-- Click effect
animatedButton.MouseButton1Click:Connect(function()
    -- Scale down on click
    local clickTween = TweenService:Create(animatedButton, TweenInfo.new(0.1), {
        Size = UDim2.new(0.75, 0, 0, 45)
    })
    clickTween:Play()
    
    -- Scale back up
    clickTween.Completed:Connect(function()
        local scaleBack = TweenService:Create(animatedButton, tweenInfo, {
            Size = UDim2.new(0.8, 0, 0, 50)
        })
        scaleBack:Play()
    end)
    
    print("Button clicked with animation!")
end)

-- Auto-rotate frame animation
local rotateTween = TweenService:Create(mainFrame, TweenInfo.new(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1), {
    Rotation = 360
})
rotateTween:Play()

print("Created animated GUI with hover effects and rotation!")`,
    challenge: {
      tests: [
        { description: 'Animate GUI properties with TweenService', type: 'code_contains', value: 'TweenService:Create' },
        { description: 'Create hover effects for buttons', type: 'code_contains', value: 'MouseEnter' }
      ],
      hints: ['Use TweenService:Create() to animate GUI properties', 'Use MouseEnter/MouseLeave for hover effects', 'Use TweenInfo.new() to control animation timing'],
      successMessage: 'Fantastic! You can now create smooth GUI animations and effects.'
    }
  },

  // === COMPREHENSIVE ADVANCED LESSONS ===
  'roblox-services-deep-dive': {
    title: 'Roblox Services Deep Dive',
    description: 'Master Roblox\'s built-in services and understand their roles in game development',
    sections: [
      {
        title: 'Understanding Roblox Services',
        content: 'Services are singleton objects that provide core functionality to your game. They\'re accessed via game:GetService() and are essential for most game features. Each service has a specific purpose and API.',
        codeExample: `local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")`,
        color: 'blue'
      },
      {
        title: 'Core Services Explained',
        content: 'Players manages player connections, ReplicatedStorage shares data between client/server, RunService handles game loops, and TweenService creates animations. Understanding these is crucial for any Roblox developer.',
        codeExample: `-- Players service for player management
local Players = game:GetService("Players")
Players.PlayerAdded:Connect(function(player)
    print(player.Name .. " joined the game!")
end)

-- RunService for game loops
local RunService = game:GetService("RunService")
RunService.Heartbeat:Connect(function(deltaTime)
    -- Code that runs every frame
end)`,
        color: 'green'
      },
      {
        title: 'Advanced Service Usage',
        content: 'Services can be used together to create complex systems. For example, combining RunService with TweenService for smooth animations, or using Players with ReplicatedStorage for data synchronization.',
        codeExample: `-- Advanced service combination
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local function smoothRotate(part, targetRotation)
    local tween = TweenService:Create(part, TweenInfo.new(1), {
        CFrame = part.CFrame * CFrame.Angles(0, targetRotation, 0)
    })
    tween:Play()
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Roblox Services Deep Dive
-- Understanding and using core Roblox services

-- Get essential services
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Debris = game:GetService("Debris")

print("=== ROBLOX SERVICES DEMO ===")

-- Players service - manage player connections
Players.PlayerAdded:Connect(function(player)
    print("Player joined: " .. player.Name)
    print("Player ID: " .. player.UserId)
end)

-- ReplicatedStorage - share data between client and server
local sharedData = Instance.new("Folder")
sharedData.Name = "SharedData"
sharedData.Parent = ReplicatedStorage

-- Create a shared value
local playerCount = Instance.new("IntValue")
playerCount.Name = "PlayerCount"
playerCount.Value = #Players:GetPlayers()
playerCount.Parent = sharedData

-- RunService - game loops and timing
local connection
connection = RunService.Heartbeat:Connect(function(deltaTime)
    -- Update player count every frame
    playerCount.Value = #Players:GetPlayers()
    
    -- Disconnect after 5 seconds
    if tick() > 5 then
        connection:Disconnect()
        print("Heartbeat connection disconnected")
    end
end)

-- TweenService - smooth animations
local part = Instance.new("Part")
part.Size = Vector3.new(2, 2, 2)
part.Position = Vector3.new(0, 10, 0)
part.Parent = workspace

local tween = TweenService:Create(part, TweenInfo.new(2, Enum.EasingStyle.Bounce), {
    Position = Vector3.new(10, 10, 0),
    Color = Color3.fromRGB(255, 0, 0)
})
tween:Play()

-- Debris service - automatic cleanup
local tempPart = Instance.new("Part")
tempPart.Size = Vector3.new(1, 1, 1)
tempPart.Position = Vector3.new(0, 20, 0)
tempPart.Parent = workspace

-- Auto-destroy after 3 seconds
Debris:AddItem(tempPart, 3)

print("Services demo complete!")`,
    challenge: {
      tests: [
        { description: 'Use game:GetService() to get a service', type: 'code_contains', value: 'game:GetService' },
        { description: 'Connect to a service event', type: 'code_contains', value: 'Connect' }
      ],
      hints: ['Use game:GetService("ServiceName") to get services', 'Services provide events you can connect to', 'Each service has specific functionality for your game'],
      successMessage: 'Excellent! You understand Roblox services and their importance.'
    }
  },

  'advanced-events-and-signals': {
    title: 'Advanced Events & Signals',
    description: 'Master Roblox\'s event system, custom signals, and advanced event handling patterns',
    sections: [
      {
        title: 'Understanding Roblox Events',
        content: 'Events in Roblox are signals that fire when something happens. They use the observer pattern - objects can connect to events to be notified when they fire. Events are the backbone of interactive games.',
        codeExample: `-- Built-in events
part.Touched:Connect(function(hit)
    print("Part was touched by: " .. hit.Name)
end)

-- Custom events
local customEvent = Instance.new("BindableEvent")
customEvent.Event:Connect(function(data)
    print("Custom event fired with data: " .. tostring(data))
end)`,
        color: 'blue'
      },
      {
        title: 'Event Connection Management',
        content: 'Always store event connections and disconnect them when no longer needed to prevent memory leaks. Use RBXScriptConnection objects to manage connections properly.',
        codeExample: `-- Proper connection management
local connection = part.Touched:Connect(function(hit)
    print("Touched: " .. hit.Name)
end)

-- Later, disconnect when done
connection:Disconnect()

-- Or use a table to manage multiple connections
local connections = {}
connections[1] = part.Touched:Connect(function() end)
connections[2] = anotherEvent:Connect(function() end)

-- Disconnect all at once
for _, connection in pairs(connections) do
    connection:Disconnect()
end`,
        color: 'green'
      },
      {
        title: 'Custom Signals and BindableEvents',
        content: 'Create your own events using BindableEvents and BindableFunctions. BindableEvents are one-way (fire and forget), while BindableFunctions are two-way (request and response).',
        codeExample: `-- Custom signal system
local signal = Instance.new("BindableEvent")
signal.Name = "PlayerLevelUp"

-- Connect to the signal
signal.Event:Connect(function(player, newLevel)
    print(player.Name .. " leveled up to " .. newLevel)
end)

-- Fire the signal
signal:Fire(game.Players.LocalPlayer, 10)

-- BindableFunction for request/response
local function = Instance.new("BindableFunction")
function.OnInvoke = function(input)
    return "Response: " .. input
end

local result = function:Invoke("Hello")
print(result)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced Events and Signals
-- Comprehensive event handling in Roblox

-- Create test parts for events
local part1 = Instance.new("Part")
part1.Name = "EventPart1"
part1.Size = Vector3.new(4, 4, 4)
part1.Position = Vector3.new(0, 5, 0)
part1.Parent = workspace

local part2 = Instance.new("Part")
part2.Name = "EventPart2"
part2.Size = Vector3.new(2, 2, 2)
part2.Position = Vector3.new(0, 10, 0)
part2.Parent = workspace

print("=== ADVANCED EVENTS DEMO ===")

-- 1. Built-in Events with proper connection management
local connections = {}

-- Touched event
connections.touched = part1.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    if humanoid then
        print("Player touched part1: " .. hit.Parent.Name)
    end
end)

-- Changed event (monitors property changes)
connections.changed = part2:GetPropertyChangedSignal("Position"):Connect(function()
    print("Part2 position changed to: " .. tostring(part2.Position))
end)

-- 2. Custom BindableEvent
local levelUpEvent = Instance.new("BindableEvent")
levelUpEvent.Name = "PlayerLevelUp"
levelUpEvent.Parent = workspace

-- Connect to custom event
levelUpEvent.Event:Connect(function(playerName, oldLevel, newLevel)
    print("🎉 " .. playerName .. " leveled up from " .. oldLevel .. " to " .. newLevel)
end)

-- Fire custom event
levelUpEvent:Fire("Alex", 5, 6)

-- 3. BindableFunction for request/response
local dataService = Instance.new("BindableFunction")
dataService.Name = "DataService"
dataService.Parent = workspace

-- Handle function calls
dataService.OnInvoke = function(requestType, data)
    if requestType == "getPlayerData" then
        return {
            name = data,
            level = 10,
            coins = 500
        }
    elseif requestType == "calculateDamage" then
        return data * 2  -- Double damage
    else
        return "Unknown request"
    end
end

-- Use the function
local playerData = dataService:Invoke("getPlayerData", "Alex")
print("Player data:", playerData.name, "Level:", playerData.level)

local damage = dataService:Invoke("calculateDamage", 50)
print("Calculated damage:", damage)

-- 4. Event cleanup demonstration
print("\\nCleaning up connections...")
for name, connection in pairs(connections) do
    connection:Disconnect()
    print("Disconnected: " .. name)
end

print("Events demo complete!")`,
    challenge: {
      tests: [
        { description: 'Create a custom BindableEvent', type: 'code_contains', value: 'BindableEvent' },
        { description: 'Use proper connection management', type: 'code_contains', value: 'Disconnect' }
      ],
      hints: ['Use BindableEvent for custom signals', 'Always store connections and disconnect them', 'Use BindableFunction for request/response patterns'],
      successMessage: 'Outstanding! You understand advanced event handling in Roblox.'
    }
  },

  'memory-management-optimization': {
    title: 'Memory Management & Optimization',
    description: 'Learn advanced memory management, garbage collection, and performance optimization techniques',
    sections: [
      {
        title: 'Understanding Memory in Roblox',
        content: 'Roblox uses automatic garbage collection, but you can optimize memory usage. Avoid creating objects unnecessarily, use object pooling for frequently created/destroyed objects, and be mindful of memory leaks.',
        codeExample: `-- Bad: Creating objects in loops
for i = 1, 1000 do
    local part = Instance.new("Part")  -- Creates 1000 parts!
    part.Parent = workspace
end

-- Good: Object pooling
local partPool = {}
local function getPart()
    local part = table.remove(partPool) or Instance.new("Part")
    return part
end`,
        color: 'blue'
      },
      {
        title: 'Garbage Collection and Cleanup',
        content: 'Roblox automatically cleans up unused objects, but you can help by setting references to nil, disconnecting events, and using Debris service for temporary objects. Monitor memory usage with game:GetService("Stats").',
        codeExample: `-- Proper cleanup
local part = Instance.new("Part")
local connection = part.Touched:Connect(function() end)

-- When done with the part
connection:Disconnect()
part:Destroy()
part = nil  -- Remove reference

-- Using Debris for automatic cleanup
local Debris = game:GetService("Debris")
local tempPart = Instance.new("Part")
Debris:AddItem(tempPart, 5)  -- Auto-destroy after 5 seconds`,
        color: 'green'
      },
      {
        title: 'Performance Optimization Techniques',
        content: 'Optimize your code by avoiding expensive operations in loops, using local variables, caching frequently accessed objects, and minimizing property changes. Profile your code to find bottlenecks.',
        codeExample: `-- Performance optimization examples
local Players = game:GetService("Players")
local players = Players:GetPlayers()  -- Cache the result

-- Avoid repeated service calls
local RunService = game:GetService("RunService")
local connection = RunService.Heartbeat:Connect(function()
    -- Use cached players instead of Players:GetPlayers() every frame
    for _, player in ipairs(players) do
        -- Process player
    end
end)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Memory Management and Optimization
-- Advanced techniques for efficient Roblox scripting

local RunService = game:GetService("RunService")
local Debris = game:GetService("Debris")
local Stats = game:GetService("Stats")

print("=== MEMORY MANAGEMENT DEMO ===")

-- 1. Object Pooling System
local partPool = {}
local activeParts = {}

local function createPart()
    local part = table.remove(partPool)
    if not part then
        part = Instance.new("Part")
        part.Size = Vector3.new(2, 2, 2)
    end
    part.Parent = workspace
    table.insert(activeParts, part)
    return part
end

local function destroyPart(part)
    part.Parent = nil
    table.insert(partPool, part)
    for i, activePart in ipairs(activeParts) do
        if activePart == part then
            table.remove(activeParts, i)
            break
        end
    end
end

-- 2. Memory Monitoring
local function printMemoryStats()
    local memoryStats = Stats:GetTotalMemoryUsageMb()
    print("Total Memory Usage: " .. memoryStats .. " MB")
    print("Active Parts: " .. #activeParts)
    print("Pooled Parts: " .. #partPool)
end

-- 3. Efficient Event Management
local connections = {}
local function addConnection(connection)
    table.insert(connections, connection)
end

local function cleanupConnections()
    for _, connection in ipairs(connections) do
        connection:Disconnect()
    end
    connections = {}
end

-- 4. Performance Test
print("\\nCreating 10 parts using object pooling...")
for i = 1, 10 do
    local part = createPart()
    part.Position = Vector3.new(i * 3, 5, 0)
    part.Color = Color3.fromRGB(math.random(255), math.random(255), math.random(255))
end

printMemoryStats()

-- 5. Automatic Cleanup with Debris
print("\\nCreating temporary parts with Debris...")
for i = 1, 5 do
    local tempPart = Instance.new("Part")
    tempPart.Size = Vector3.new(1, 1, 1)
    tempPart.Position = Vector3.new(i * 2, 15, 0)
    tempPart.Parent = workspace
    Debris:AddItem(tempPart, 3)  -- Auto-destroy after 3 seconds
end

-- 6. Memory-efficient loop
local frameCount = 0
local connection = RunService.Heartbeat:Connect(function()
    frameCount = frameCount + 1
    
    -- Only print every 60 frames (about 1 second)
    if frameCount % 60 == 0 then
        print("Frame: " .. frameCount)
        printMemoryStats()
    end
    
    -- Stop after 5 seconds
    if frameCount > 300 then
        connection:Disconnect()
        print("\\nDemo complete - cleaning up...")
        cleanupConnections()
        
        -- Return parts to pool
        for _, part in ipairs(activeParts) do
            destroyPart(part)
        end
        
        print("Final memory stats:")
        printMemoryStats()
    end
end)

print("Memory management demo started!")`,
    challenge: {
      tests: [
        { description: 'Use object pooling for efficient memory usage', type: 'code_contains', value: 'table.remove' },
        { description: 'Implement proper cleanup with Disconnect', type: 'code_contains', value: 'Disconnect' }
      ],
      hints: ['Use object pooling to reuse objects instead of creating new ones', 'Always disconnect events to prevent memory leaks', 'Use Debris service for automatic cleanup', 'Monitor memory usage with Stats service'],
      successMessage: 'Excellent! You understand memory management and optimization in Roblox.'
    }
  },

  'advanced-datastores-persistence': {
    title: 'Advanced DataStores & Persistence',
    description: 'Master DataStores, data validation, error handling, and advanced persistence patterns',
    sections: [
      {
        title: 'DataStore Fundamentals',
        content: 'DataStores allow you to save data between game sessions. They have strict limitations: 4MB per key, rate limits, and eventual consistency. Always use pcall() for error handling and implement retry logic.',
        codeExample: `local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")

-- Always use pcall for DataStore operations
local success, result = pcall(function()
    return playerDataStore:GetAsync(player.UserId)
end)

if success then
    -- Handle successful data retrieval
else
    -- Handle error
    warn("DataStore error: " .. tostring(result))
end`,
        color: 'blue'
      },
      {
        title: 'Data Validation and Security',
        content: 'Always validate data from DataStores before using it. Players can modify client-side data, so server-side validation is crucial. Use data templates and validate all incoming data.',
        codeExample: `-- Data validation template
local DEFAULT_PLAYER_DATA = {
    level = 1,
    coins = 0,
    experience = 0,
    lastPlayed = 0
}

local function validatePlayerData(data)
    if type(data) ~= "table" then return DEFAULT_PLAYER_DATA end
    
    return {
        level = math.max(1, math.min(100, tonumber(data.level) or 1)),
        coins = math.max(0, tonumber(data.coins) or 0),
        experience = math.max(0, tonumber(data.experience) or 0),
        lastPlayed = tonumber(data.lastPlayed) or 0
    }
end`,
        color: 'green'
      },
      {
        title: 'Advanced Persistence Patterns',
        content: 'Implement data versioning, backup systems, and conflict resolution. Use OrderedDataStores for leaderboards, and consider data compression for large datasets. Always have fallback data.',
        codeExample: `-- Advanced persistence with versioning
local function savePlayerData(player, data)
    local saveData = {
        version = 1,
        data = data,
        timestamp = os.time(),
        playerId = player.UserId
    }
    
    local success, error = pcall(function()
        playerDataStore:SetAsync(player.UserId, saveData)
    end)
    
    if not success then
        -- Retry logic
        wait(1)
        pcall(function()
            playerDataStore:SetAsync(player.UserId, saveData)
        end)
    end
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced DataStores and Persistence
-- Comprehensive data management system

-- Note: This is a simulation since we can't use real DataStores in this environment
print("=== ADVANCED DATASTORES DEMO ===")

-- 1. Data Validation System
local DEFAULT_PLAYER_DATA = {
    version = 1,
    level = 1,
    coins = 0,
    experience = 0,
    achievements = {},
    lastPlayed = 0,
    playTime = 0
}

local function validatePlayerData(data)
    if type(data) ~= "table" then 
        print("Invalid data type, using defaults")
        return DEFAULT_PLAYER_DATA 
    end
    
    -- Validate and sanitize each field
    local validatedData = {
        version = math.max(1, tonumber(data.version) or 1),
        level = math.max(1, math.min(100, tonumber(data.level) or 1)),
        coins = math.max(0, tonumber(data.coins) or 0),
        experience = math.max(0, tonumber(data.experience) or 0),
        achievements = type(data.achievements) == "table" and data.achievements or {},
        lastPlayed = tonumber(data.lastPlayed) or 0,
        playTime = math.max(0, tonumber(data.playTime) or 0)
    }
    
    print("Data validated successfully")
    return validatedData
end

-- 2. Simulated DataStore Operations
local function simulateDataStoreGet(playerId)
    -- Simulate network delay and potential failure
    local success = math.random() > 0.1  -- 90% success rate
    
    if success then
        -- Simulate existing player data
        local existingData = {
            version = 1,
            level = 5,
            coins = 250,
            experience = 1200,
            achievements = {"First Steps", "Coin Collector"},
            lastPlayed = os.time() - 86400, -- 1 day ago
            playTime = 3600 -- 1 hour
        }
        return true, existingData
    else
        return false, "DataStore service unavailable"
    end
end

local function simulateDataStoreSet(playerId, data)
    local success = math.random() > 0.05  -- 95% success rate
    
    if success then
        print("Data saved successfully for player " .. playerId)
        return true, nil
    else
        return false, "Save failed - rate limit exceeded"
    end
end

-- 3. Advanced Save System with Retry Logic
local function savePlayerData(playerId, data)
    local maxRetries = 3
    local retryDelay = 1
    
    for attempt = 1, maxRetries do
        local success, error = simulateDataStoreSet(playerId, data)
        
        if success then
            return true
        else
            print("Save attempt " .. attempt .. " failed: " .. tostring(error))
            if attempt < maxRetries then
                wait(retryDelay)
                retryDelay = retryDelay * 2  -- Exponential backoff
            end
        end
    end
    
    print("Failed to save after " .. maxRetries .. " attempts")
    return false
end

-- 4. Data Versioning and Migration
local function migratePlayerData(data)
    if data.version < 1 then
        -- Migrate from version 0 to 1
        data.version = 1
        data.playTime = data.playTime or 0
        print("Migrated data from version 0 to 1")
    end
    
    return data
end

-- 5. Complete Data Management Demo
local playerId = 12345

print("\\nLoading player data...")
local success, rawData = simulateDataStoreGet(playerId)

if success then
    print("Raw data loaded:", rawData.level, "level,", rawData.coins, "coins")
    
    -- Validate and migrate data
    local validatedData = validatePlayerData(rawData)
    validatedData = migratePlayerData(validatedData)
    
    -- Update data
    validatedData.level = validatedData.level + 1
    validatedData.coins = validatedData.coins + 100
    validatedData.lastPlayed = os.time()
    
    print("Updated data:", validatedData.level, "level,", validatedData.coins, "coins")
    
    -- Save updated data
    local saveSuccess = savePlayerData(playerId, validatedData)
    if saveSuccess then
        print("Player data saved successfully!")
    end
else
    print("Failed to load data:", rawData)
    print("Using default data for new player")
    local newPlayerData = DEFAULT_PLAYER_DATA
    newPlayerData.lastPlayed = os.time()
    savePlayerData(playerId, newPlayerData)
end

-- 6. Data Compression Example (for large datasets)
local function compressData(data)
    -- Simple compression simulation
    local compressed = {
        l = data.level,
        c = data.coins,
        e = data.experience,
        a = data.achievements,
        lp = data.lastPlayed,
        pt = data.playTime
    }
    return compressed
end

local function decompressData(compressed)
    return {
        level = compressed.l,
        coins = compressed.c,
        experience = compressed.e,
        achievements = compressed.a,
        lastPlayed = compressed.lp,
        playTime = compressed.pt
    }
end

print("\\nDataStores demo complete!")`,
    challenge: {
      tests: [
        { description: 'Implement data validation for DataStore data', type: 'code_contains', value: 'validatePlayerData' },
        { description: 'Use pcall for error handling with DataStores', type: 'code_contains', value: 'pcall' }
      ],
      hints: ['Always validate data from DataStores before using it', 'Use pcall() to handle DataStore errors gracefully', 'Implement retry logic for failed operations', 'Use data versioning for future compatibility'],
      successMessage: 'Outstanding! You understand advanced DataStore management and persistence.'
    }
  },

  'networking-architecture-patterns': {
    title: 'Networking Architecture & Patterns',
    description: 'Master client-server architecture, networking patterns, and advanced communication systems',
    sections: [
      {
        title: 'Client-Server Architecture Fundamentals',
        content: 'Roblox uses a client-server model where the server is authoritative. Clients send requests to the server, which validates and processes them. Understanding this architecture is crucial for secure, multiplayer games.',
        codeExample: `-- Server Script (authoritative)
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Create RemoteEvent for client communication
local remoteEvent = Instance.new("RemoteEvent")
remoteEvent.Name = "PlayerAction"
remoteEvent.Parent = ReplicatedStorage

-- Server handles the request
remoteEvent.OnServerEvent:Connect(function(player, action, data)
    -- Validate the request
    if validatePlayerAction(player, action, data) then
        processPlayerAction(player, action, data)
    end
end)`,
        color: 'blue'
      },
      {
        title: 'RemoteEvents vs RemoteFunctions',
        content: 'Use RemoteEvents for one-way communication (fire and forget) and RemoteFunctions for request-response patterns. RemoteEvents are more efficient for frequent updates, while RemoteFunctions are better for data requests.',
        codeExample: `-- RemoteEvent for frequent updates
local updateEvent = Instance.new("RemoteEvent")
updateEvent.Name = "PlayerUpdate"
updateEvent.Parent = ReplicatedStorage

-- Fire to all clients
updateEvent:FireAllClients(playerData)

-- RemoteFunction for data requests
local dataFunction = Instance.new("RemoteFunction")
dataFunction.Name = "GetPlayerData"
dataFunction.Parent = ReplicatedStorage

-- Handle requests
dataFunction.OnServerInvoke = function(player, requestType)
    return getPlayerData(player, requestType)
end`,
        color: 'green'
      },
      {
        title: 'Advanced Networking Patterns',
        content: 'Implement request queuing, rate limiting, and anti-cheat measures. Use replication filtering, validate all client inputs, and implement proper error handling for network operations.',
        codeExample: `-- Advanced networking with rate limiting
local requestCounts = {}
local RATE_LIMIT = 10  -- Max 10 requests per second

local function checkRateLimit(player)
    local currentTime = tick()
    local playerId = player.UserId
    
    if not requestCounts[playerId] then
        requestCounts[playerId] = {count = 0, resetTime = currentTime + 1}
    end
    
    local data = requestCounts[playerId]
    if currentTime > data.resetTime then
        data.count = 0
        data.resetTime = currentTime + 1
    end
    
    data.count = data.count + 1
    return data.count <= RATE_LIMIT
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Networking Architecture and Patterns
-- Comprehensive client-server communication system

print("=== NETWORKING ARCHITECTURE DEMO ===")

-- 1. Simulated RemoteEvent System
local function createRemoteEvent(name)
    local event = {
        name = name,
        connections = {},
        fire = function(self, ...)
            local args = {...}
            for _, connection in ipairs(self.connections) do
                connection(args)
            end
        end,
        connect = function(self, callback)
            table.insert(self.connections, callback)
            return {
                Disconnect = function()
                    for i, conn in ipairs(self.connections) do
                        if conn == callback then
                            table.remove(self.connections, i)
                            break
                        end
                    end
                end
            }
        end
    }
    return event
end

-- 2. Simulated RemoteFunction System
local function createRemoteFunction(name)
    local func = {
        name = name,
        handler = nil,
        invoke = function(self, ...)
            if self.handler then
                return self.handler(...)
            else
                return nil, "No handler set"
            end
        end,
        setHandler = function(self, handler)
            self.handler = handler
        end
    }
    return func
end

-- 3. Rate Limiting System
local requestCounts = {}
local RATE_LIMIT = 5  -- Max 5 requests per second

local function checkRateLimit(playerId)
    local currentTime = tick()
    
    if not requestCounts[playerId] then
        requestCounts[playerId] = {count = 0, resetTime = currentTime + 1}
    end
    
    local data = requestCounts[playerId]
    if currentTime > data.resetTime then
        data.count = 0
        data.resetTime = currentTime + 1
    end
    
    data.count = data.count + 1
    return data.count <= RATE_LIMIT
end

-- 4. Server-Side Event Handling
local playerActionEvent = createRemoteEvent("PlayerAction")
local getDataFunction = createRemoteFunction("GetPlayerData")

-- Simulate player data
local playerData = {
    [1] = {name = "Player1", level = 10, coins = 500},
    [2] = {name = "Player2", level = 5, coins = 250}
}

-- Handle player actions with validation
playerActionEvent:connect(function(args)
    local playerId, action, data = args[1], args[2], args[3]
    
    print("\\nReceived action from player " .. playerId .. ": " .. action)
    
    -- Rate limiting check
    if not checkRateLimit(playerId) then
        print("Rate limit exceeded for player " .. playerId)
        return
    end
    
    -- Validate action
    if action == "spendCoins" then
        local amount = tonumber(data.amount)
        if amount and amount > 0 and playerData[playerId] and playerData[playerId].coins >= amount then
            playerData[playerId].coins = playerData[playerId].coins - amount
            print("Player " .. playerId .. " spent " .. amount .. " coins")
            
            -- Notify all clients of the update
            playerActionEvent:fire("coinUpdate", {playerId = playerId, newAmount = playerData[playerId].coins})
        else
            print("Invalid coin spending request from player " .. playerId)
        end
    elseif action == "levelUp" then
        if playerData[playerId] then
            playerData[playerId].level = playerData[playerId].level + 1
            print("Player " .. playerId .. " leveled up to " .. playerData[playerId].level)
            
            -- Notify all clients
            playerActionEvent:fire("levelUpdate", {playerId = playerId, newLevel = playerData[playerId].level})
        end
    end
end)

-- Handle data requests
getDataFunction:setHandler(function(playerId, requestType)
    print("\\nData request from player " .. playerId .. ": " .. requestType)
    
    if not checkRateLimit(playerId) then
        return nil, "Rate limit exceeded"
    end
    
    if requestType == "playerStats" then
        return playerData[playerId] or {name = "Unknown", level = 1, coins = 0}
    elseif requestType == "leaderboard" then
        local leaderboard = {}
        for id, data in pairs(playerData) do
            table.insert(leaderboard, {id = id, name = data.name, level = data.level})
        end
        table.sort(leaderboard, function(a, b) return a.level > b.level end)
        return leaderboard
    else
        return nil, "Unknown request type"
    end
end)

-- 5. Simulate Client Requests
print("\\nSimulating client requests...")

-- Player 1 actions
playerActionEvent:fire(1, "spendCoins", {amount = 100})
playerActionEvent:fire(1, "levelUp", {})

-- Player 2 actions
playerActionEvent:fire(2, "spendCoins", {amount = 50})

-- Data requests
local stats = getDataFunction:invoke(1, "playerStats")
print("Player 1 stats:", stats.name, "Level:", stats.level, "Coins:", stats.coins)

local leaderboard = getDataFunction:invoke(2, "leaderboard")
print("\\nLeaderboard:")
for i, player in ipairs(leaderboard) do
    print(i .. ". " .. player.name .. " - Level " .. player.level)
end

-- 6. Anti-Cheat Simulation
local function validatePlayerAction(playerId, action, data)
    -- Basic validation
    if not playerData[playerId] then
        return false, "Player not found"
    end
    
    if action == "spendCoins" then
        local amount = tonumber(data.amount)
        if not amount or amount <= 0 then
            return false, "Invalid amount"
        end
        if amount > playerData[playerId].coins then
            return false, "Insufficient coins"
        end
    end
    
    return true
end

print("\\nNetworking architecture demo complete!")`,
    challenge: {
      tests: [
        { description: 'Implement rate limiting for network requests', type: 'code_contains', value: 'checkRateLimit' },
        { description: 'Use RemoteEvents for client-server communication', type: 'code_contains', value: 'RemoteEvent' }
      ],
      hints: ['Always validate client requests on the server', 'Implement rate limiting to prevent spam', 'Use RemoteEvents for one-way communication', 'Use RemoteFunctions for request-response patterns'],
      successMessage: 'Excellent! You understand advanced networking architecture in Roblox.'
    }
  },

  // === INTERMEDIATE LUAU CONCEPTS ===
  'error-handling-debugging': {
    title: 'Error Handling & Debugging',
    description: 'Master error handling, debugging techniques, and code troubleshooting in Roblox',
    sections: [
      {
        title: 'Understanding Errors and Warnings',
        content: `Errors and warnings are your friends when learning to code. They tell you exactly what's wrong and how to fix it.

**Types of Errors:**
- **Syntax Errors**: Mistakes in code structure (missing brackets, typos)
- **Runtime Errors**: Problems that happen when code runs (dividing by zero, accessing nil values)
- **Logic Errors**: Code runs but doesn't do what you intended

**Common Roblox Errors:**
- "Attempt to index a nil value" - trying to use something that doesn't exist
- "Expected 'end' to close 'if'" - missing end statements
- "Bad argument" - wrong type of data passed to a function`,
        codeExample: `-- Common error examples and how to fix them

-- 1. Nil value error
local player = game.Players:FindFirstChild("NonExistentPlayer")
-- This will cause an error because player is nil
-- print(player.Name) -- ERROR!

-- Safe way to check:
if player then
    print(player.Name)
else
    print("Player not found!")
end

-- 2. Using pcall for error handling
local success, result = pcall(function()
    local part = workspace.NonExistentPart
    return part.Size -- This might cause an error
end)

if success then
    print("Success:", result)
else
    print("Error occurred:", result)
end`,
        color: 'blue'
      },
      {
        title: 'Debugging Techniques',
        content: `Debugging is the process of finding and fixing errors in your code. Good debugging skills are essential for any programmer.

**Debugging Strategies:**
1. **Read Error Messages**: They tell you exactly what's wrong
2. **Use Print Statements**: Add print() to see what values your variables have
3. **Check the Output Window**: Roblox shows errors and print statements here
4. **Test Small Parts**: Break your code into smaller pieces to test
5. **Use the Developer Console**: Press F9 in Roblox Studio

**Best Practices:**
- Always test your code frequently
- Use meaningful variable names
- Comment your code to explain what it does
- Start simple and add complexity gradually`,
        codeExample: `-- Debugging example: Finding why a script isn't working

local function calculatePlayerLevel(experience)
    print("Debug: Starting calculation with experience =", experience)
    
    if not experience then
        print("Debug: Experience is nil!")
        return 0
    end
    
    if experience < 0 then
        print("Debug: Experience is negative:", experience)
        return 0
    end
    
    local level = math.floor(experience / 100) + 1
    print("Debug: Calculated level =", level)
    
    return level
end

-- Test the function
local testExperience = 250
local playerLevel = calculatePlayerLevel(testExperience)
print("Final result: Player level is", playerLevel)`,
        color: 'green'
      },
      {
        title: 'Advanced Error Handling',
        content: `Professional scripts use advanced error handling to make them robust and reliable.

**Error Handling Patterns:**
- **pcall()**: Safely call functions that might error
- **xpcall()**: More advanced error handling with custom error handlers
- **assert()**: Check conditions and throw errors if they fail
- **warn()**: Show warnings without stopping the script

**When to Use Each:**
- **pcall()**: For risky operations like accessing remote services
- **assert()**: For checking that required conditions are met
- **warn()**: For non-critical issues that should be noted
- **error()**: For serious problems that should stop execution`,
        codeExample: `-- Advanced error handling patterns

local function safeGetPlayerData(player)
    -- Use pcall to safely access player data
    local success, data = pcall(function()
        -- This might fail if player is nil or doesn't have the data
        return {
            level = player.leaderstats.Level.Value,
            coins = player.leaderstats.Coins.Value,
            experience = player.leaderstats.Experience.Value
        }
    end)
    
    if not success then
        warn("Failed to get player data for", player and player.Name or "unknown player")
        return nil
    end
    
    return data
end

local function validatePlayerInput(input)
    -- Use assert to check required conditions
    assert(type(input) == "string", "Input must be a string")
    assert(#input > 0, "Input cannot be empty")
    assert(#input <= 100, "Input too long (max 100 characters)")
    
    return input
end

-- Example usage
local player = game.Players.LocalPlayer
local playerData = safeGetPlayerData(player)

if playerData then
    print("Player level:", playerData.level)
else
    print("Could not get player data")
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Error Handling & Debugging - Comprehensive Learning Example
-- Learn to identify, handle, and prevent errors in your Roblox scripts

print("=== ERROR HANDLING & DEBUGGING DEMO ===")
print("Learning to write robust, error-free code...")

-- 1. COMMON ERROR TYPES AND SOLUTIONS
print("\\n1. DEMONSTRATING COMMON ERRORS...")

-- Error 1: Nil value access
local function demonstrateNilError()
    print("\\n--- Nil Value Error Example ---")
    local player = game.Players:FindFirstChild("NonExistentPlayer")
    
    -- This would cause an error:
    -- print(player.Name) -- ERROR: Attempt to index a nil value
    
    -- Safe way to handle:
    if player then
        print("Player found:", player.Name)
    else
        print("Player not found - this is expected!")
    end
end

-- Error 2: Type errors
local function demonstrateTypeError()
    print("\\n--- Type Error Example ---")
    local number = "not a number"
    
    -- This would cause an error:
    -- local result = number + 5 -- ERROR: attempt to perform arithmetic on a string
    
    -- Safe way to handle:
    if type(number) == "number" then
        local result = number + 5
        print("Result:", result)
    else
        print("Cannot add 5 to a string!")
    end
end

-- Error 3: Division by zero
local function demonstrateDivisionError()
    print("\\n--- Division by Zero Example ---")
    local divisor = 0
    
    -- This would cause an error:
    -- local result = 10 / divisor -- ERROR: attempt to divide by zero
    
    -- Safe way to handle:
    if divisor ~= 0 then
        local result = 10 / divisor
        print("Result:", result)
    else
        print("Cannot divide by zero!")
    end
end

-- 2. USING PCALL FOR ERROR HANDLING
print("\\n2. DEMONSTRATING PCALL ERROR HANDLING...")

local function riskyOperation(data)
    print("Attempting risky operation with data:", data)
    
    local success, result = pcall(function()
        -- This operation might fail
        if type(data) ~= "table" then
            error("Data must be a table")
        end
        
        if not data.value then
            error("Data must have a 'value' property")
        end
        
        return data.value * 2
    end)
    
    if success then
        print("Operation successful! Result:", result)
        return result
    else
        print("Operation failed! Error:", result)
        return nil
    end
end

-- Test the risky operation
local testData1 = {value = 5}
local testData2 = "not a table"
local testData3 = {}

print("\\nTesting with valid data:")
riskyOperation(testData1)

print("\\nTesting with invalid data:")
riskyOperation(testData2)

print("\\nTesting with incomplete data:")
riskyOperation(testData3)

-- 3. DEBUGGING TECHNIQUES
print("\\n3. DEMONSTRATING DEBUGGING TECHNIQUES...")

local function debugPlayerStats(player)
    print("\\n--- Debugging Player Stats ---")
    
    -- Step 1: Check if player exists
    print("Debug: Checking if player exists...")
    if not player then
        print("Debug: Player is nil!")
        return
    end
    print("Debug: Player exists:", player.Name)
    
    -- Step 2: Check if player has leaderstats
    print("Debug: Checking for leaderstats...")
    local leaderstats = player:FindFirstChild("leaderstats")
    if not leaderstats then
        print("Debug: No leaderstats found!")
        return
    end
    print("Debug: Leaderstats found")
    
    -- Step 3: Check individual stats
    print("Debug: Checking individual stats...")
    local stats = {"Level", "Coins", "Experience"}
    
    for _, statName in ipairs(stats) do
        local stat = leaderstats:FindFirstChild(statName)
        if stat and stat:IsA("IntValue") then
            print("Debug: " .. statName .. " =", stat.Value)
        else
            print("Debug: " .. statName .. " not found or wrong type!")
        end
    end
end

-- 4. ADVANCED ERROR HANDLING PATTERNS
print("\\n4. DEMONSTRATING ADVANCED ERROR HANDLING...")

local ErrorHandler = {}
ErrorHandler.__index = ErrorHandler

function ErrorHandler.new()
    local self = setmetatable({}, ErrorHandler)
    self.errorCount = 0
    self.lastError = nil
    return self
end

function ErrorHandler:safeExecute(func, ...)
    local success, result = pcall(func, ...)
    
    if not success then
        self.errorCount = self.errorCount + 1
        self.lastError = result
        warn("Error #" .. self.errorCount .. ":", result)
        return nil
    end
    
    return result
end

function ErrorHandler:getErrorStats()
    return {
        count = self.errorCount,
        lastError = self.lastError
    }
end

-- Create error handler
local errorHandler = ErrorHandler.new()

-- Test functions that might error
local function mightError(shouldError)
    if shouldError then
        error("This is a test error!")
    end
    return "Success!"
end

-- Test the error handler
print("\\nTesting error handler...")
local result1 = errorHandler:safeExecute(mightError, false)
print("Result 1:", result1)

local result2 = errorHandler:safeExecute(mightError, true)
print("Result 2:", result2)

local stats = errorHandler:getErrorStats()
print("Error stats:", stats.count, "errors, last error:", stats.lastError)

-- 5. ASSERTION AND VALIDATION
print("\\n5. DEMONSTRATING ASSERTIONS AND VALIDATION...")

local function validateInput(input)
    -- Use assertions to validate input
    assert(input ~= nil, "Input cannot be nil")
    assert(type(input) == "string", "Input must be a string")
    assert(#input > 0, "Input cannot be empty")
    assert(#input <= 50, "Input too long (max 50 characters)")
    
    -- Additional validation
    if string.find(input, "[^%w%s]") then
        warn("Input contains special characters")
    end
    
    return input:lower():gsub("^%l", string.upper) -- Capitalize first letter
end

-- Test validation
print("\\nTesting input validation...")
local validInputs = {"hello", "world", "test123"}
local invalidInputs = {nil, 123, "", "a" .. string.rep("b", 100)}

for _, input in ipairs(validInputs) do
    local success, result = pcall(validateInput, input)
    if success then
        print("Valid input processed:", result)
    else
        print("Validation failed:", result)
    end
end

for _, input in ipairs(invalidInputs) do
    local success, result = pcall(validateInput, input)
    if success then
        print("Invalid input processed:", result)
    else
        print("Validation correctly rejected:", result)
    end
end

-- 6. RUN ALL DEMONSTRATIONS
demonstrateNilError()
demonstrateTypeError()
demonstrateDivisionError()

print("\\n=== ERROR HANDLING DEMO COMPLETE ===")
print("You've learned essential error handling and debugging techniques!")`,
    challenge: {
      tests: [
        { description: 'Use pcall to handle potential errors', type: 'code_contains', value: 'pcall' },
        { description: 'Add debug print statements', type: 'code_contains', value: 'print' },
        { description: 'Check for nil values before using them', type: 'code_contains', value: 'if.*then' }
      ],
      hints: [
        'Use pcall() to safely execute code that might error',
        'Add print() statements to debug your code',
        'Always check if values exist before using them',
        'Read error messages carefully - they tell you what\'s wrong',
        'Use the Output window in Roblox Studio to see errors and prints'
      ],
      successMessage: 'Excellent! You now understand error handling and debugging. These skills are essential for writing robust Roblox scripts!'
    }
  },

  'advanced-data-structures': {
    title: 'Advanced Data Structures',
    description: 'Master complex data structures, algorithms, and data organization for Roblox games',
    sections: [
      {
        title: 'Understanding Data Structures',
        content: `Data structures are ways of organizing and storing data in your programs. Choosing the right data structure makes your code faster and easier to understand.

**Common Data Structures:**
- **Arrays**: Ordered lists of items (use ipairs to iterate)
- **Dictionaries**: Key-value pairs (use pairs to iterate)
- **Stacks**: Last-in, first-out (LIFO) structure
- **Queues**: First-in, first-out (FIFO) structure
- **Trees**: Hierarchical data organization
- **Graphs**: Connected data with relationships

**When to Use Each:**
- **Arrays**: When order matters and you need fast access by index
- **Dictionaries**: When you need fast lookup by key
- **Stacks**: For undo operations, function calls, or depth-first search
- **Queues**: For processing items in order, breadth-first search`,
        codeExample: `-- Data structure examples

-- 1. Array (List) - ordered collection
local players = {"Alice", "Bob", "Charlie"}
print("Players:", table.concat(players, ", "))

-- 2. Dictionary (Table) - key-value pairs
local playerScores = {
    Alice = 100,
    Bob = 85,
    Charlie = 92
}

for name, score in pairs(playerScores) do
    print(name .. " has " .. score .. " points")
end

-- 3. Stack implementation
local Stack = {}
Stack.__index = Stack

function Stack.new()
    return setmetatable({items = {}}, Stack)
end

function Stack:push(item)
    table.insert(self.items, item)
end

function Stack:pop()
    if #self.items == 0 then
        return nil
    end
    return table.remove(self.items)
end

function Stack:peek()
    return self.items[#self.items]
end

-- 4. Queue implementation
local Queue = {}
Queue.__index = Queue

function Queue.new()
    return setmetatable({items = {}}, Queue)
end

function Queue:enqueue(item)
    table.insert(self.items, item)
end

function Queue:dequeue()
    if #self.items == 0 then
        return nil
    end
    return table.remove(self.items, 1)
end`,
        color: 'blue'
      },
      {
        title: 'Advanced Table Operations',
        content: `Lua tables are incredibly powerful and flexible. Mastering table operations is key to writing efficient Roblox scripts.

**Table Functions:**
- **table.insert()**: Add items to tables
- **table.remove()**: Remove items from tables
- **table.concat()**: Join table elements into a string
- **table.sort()**: Sort table elements
- **table.find()**: Find the index of a value
- **table.clear()**: Remove all elements (Roblox extension)

**Performance Tips:**
- Use table.insert() at the end for O(1) performance
- Use table.remove() from the end for O(1) performance
- Avoid table.remove() from the middle - it's O(n)
- Use table.clear() instead of creating new tables`,
        codeExample: `-- Advanced table operations

-- 1. Table manipulation
local items = {"sword", "shield", "potion"}

-- Add items
table.insert(items, "bow")
table.insert(items, 2, "armor") -- Insert at specific position

print("Items:", table.concat(items, ", "))

-- Remove items
local removed = table.remove(items, 3) -- Remove from position 3
print("Removed:", removed)
print("Remaining:", table.concat(items, ", "))

-- 2. Sorting
local scores = {85, 92, 78, 96, 88}
table.sort(scores) -- Sort ascending
print("Sorted scores:", table.concat(scores, ", "))

-- Sort descending
table.sort(scores, function(a, b) return a > b end)
print("Descending:", table.concat(scores, ", "))

-- 3. Finding elements
local fruits = {"apple", "banana", "orange", "grape"}
local index = table.find(fruits, "orange")
print("Orange is at index:", index)

-- 4. Table copying and merging
local function copyTable(original)
    local copy = {}
    for key, value in pairs(original) do
        if type(value) == "table" then
            copy[key] = copyTable(value) -- Deep copy
        else
            copy[key] = value
        end
    end
    return copy
end

local original = {name = "Player", stats = {level = 10, health = 100}}
local copy = copyTable(original)
print("Original:", original.name, original.stats.level)
print("Copy:", copy.name, copy.stats.level)`,
        color: 'green'
      },
      {
        title: 'Complex Data Organization',
        content: `Real games need complex data organization. Learn to structure data for player progress, game state, and inventory systems.

**Data Organization Patterns:**
- **Player Data**: Organize player stats, inventory, and progress
- **Game State**: Track game-wide information and settings
- **Inventory Systems**: Manage items with properties and quantities
- **Quest Systems**: Track objectives and completion status
- **Configuration Data**: Store game settings and constants

**Best Practices:**
- Use consistent naming conventions
- Group related data together
- Use nested tables for complex relationships
- Validate data when loading from DataStores
- Use default values for missing data`,
        codeExample: `-- Complex data organization example

-- 1. Player data structure
local PlayerData = {
    profile = {
        name = "PlayerName",
        level = 1,
        experience = 0,
        coins = 100
    },
    stats = {
        health = 100,
        maxHealth = 100,
        damage = 10,
        speed = 16
    },
    inventory = {
        items = {},
        maxSlots = 20
    },
    quests = {
        active = {},
        completed = {},
        available = {}
    },
    settings = {
        musicVolume = 0.5,
        sfxVolume = 0.7,
        graphics = "medium"
    }
}

-- 2. Inventory management
local InventoryManager = {}
InventoryManager.__index = InventoryManager

function InventoryManager.new(maxSlots)
    local self = setmetatable({}, InventoryManager)
    self.items = {}
    self.maxSlots = maxSlots or 20
    return self
end

function InventoryManager:addItem(itemId, quantity)
    quantity = quantity or 1
    
    -- Check if item already exists
    for slot, item in pairs(self.items) do
        if item.id == itemId then
            item.quantity = item.quantity + quantity
            return true
        end
    end
    
    -- Find empty slot
    for i = 1, self.maxSlots do
        if not self.items[i] then
            self.items[i] = {
                id = itemId,
                quantity = quantity,
                addedTime = tick()
            }
            return true
        end
    end
    
    return false -- Inventory full
end

function InventoryManager:removeItem(itemId, quantity)
    quantity = quantity or 1
    
    for slot, item in pairs(self.items) do
        if item.id == itemId then
            if item.quantity > quantity then
                item.quantity = item.quantity - quantity
            else
                self.items[slot] = nil
            end
            return true
        end
    end
    
    return false -- Item not found
end

-- 3. Quest system
local QuestSystem = {}
QuestSystem.__index = QuestSystem

function QuestSystem.new()
    local self = setmetatable({}, QuestSystem)
    self.quests = {
        {
            id = "tutorial_1",
            title = "First Steps",
            description = "Learn the basics",
            objectives = {
                {id = "walk_10_steps", description = "Walk 10 steps", completed = false},
                {id = "jump_5_times", description = "Jump 5 times", completed = false}
            },
            rewards = {coins = 50, experience = 100},
            completed = false
        }
    }
    return self
end

function QuestSystem:completeObjective(questId, objectiveId)
    for _, quest in ipairs(self.quests) do
        if quest.id == questId then
            for _, objective in ipairs(quest.objectives) do
                if objective.id == objectiveId then
                    objective.completed = true
                    
                    -- Check if quest is complete
                    local allComplete = true
                    for _, obj in ipairs(quest.objectives) do
                        if not obj.completed then
                            allComplete = false
                            break
                        end
                    end
                    
                    if allComplete then
                        quest.completed = true
                        print("Quest completed:", quest.title)
                    end
                    
                    return true
                end
            end
        end
    end
    return false
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced Data Structures - Comprehensive Learning Example
-- Master complex data organization for professional Roblox games

print("=== ADVANCED DATA STRUCTURES DEMO ===")
print("Learning to organize data efficiently...")

-- 1. STACK DATA STRUCTURE
print("\\n1. DEMONSTRATING STACK (LIFO - Last In, First Out)...")

local Stack = {}
Stack.__index = Stack

function Stack.new()
    return setmetatable({items = {}}, Stack)
end

function Stack:push(item)
    table.insert(self.items, item)
    print("Pushed:", item)
end

function Stack:pop()
    if #self.items == 0 then
        print("Stack is empty!")
        return nil
    end
    local item = table.remove(self.items)
    print("Popped:", item)
    return item
end

function Stack:peek()
    if #self.items == 0 then
        return nil
    end
    return self.items[#self.items]
end

function Stack:size()
    return #self.items
end

-- Demo stack operations
local undoStack = Stack.new()
undoStack:push("Create Part")
undoStack:push("Move Part")
undoStack:push("Resize Part")

print("Stack size:", undoStack:size())
print("Top item:", undoStack:peek())

undoStack:pop() -- Undo last action
undoStack:pop() -- Undo second action

-- 2. QUEUE DATA STRUCTURE
print("\\n2. DEMONSTRATING QUEUE (FIFO - First In, First Out)...")

local Queue = {}
Queue.__index = Queue

function Queue.new()
    return setmetatable({items = {}}, Queue)
end

function Queue:enqueue(item)
    table.insert(self.items, item)
    print("Enqueued:", item)
end

function Queue:dequeue()
    if #self.items == 0 then
        print("Queue is empty!")
        return nil
    end
    local item = table.remove(self.items, 1)
    print("Dequeued:", item)
    return item
end

function Queue:front()
    if #self.items == 0 then
        return nil
    end
    return self.items[1]
end

function Queue:size()
    return #self.items
end

-- Demo queue operations
local taskQueue = Queue.new()
taskQueue:enqueue("Load Player Data")
taskQueue:enqueue("Initialize UI")
taskQueue:enqueue("Start Game Loop")

print("Queue size:", taskQueue:size())
print("Next task:", taskQueue:front())

taskQueue:dequeue() -- Process first task
taskQueue:dequeue() -- Process second task

-- 3. PRIORITY QUEUE
print("\\n3. DEMONSTRATING PRIORITY QUEUE...")

local PriorityQueue = {}
PriorityQueue.__index = PriorityQueue

function PriorityQueue.new()
    return setmetatable({items = {}}, PriorityQueue)
end

function PriorityQueue:enqueue(item, priority)
    priority = priority or 0
    table.insert(self.items, {item = item, priority = priority})
    
    -- Sort by priority (higher priority first)
    table.sort(self.items, function(a, b)
        return a.priority > b.priority
    end)
    
    print("Enqueued:", item, "with priority:", priority)
end

function PriorityQueue:dequeue()
    if #self.items == 0 then
        print("Priority queue is empty!")
        return nil
    end
    local item = table.remove(self.items, 1)
    print("Dequeued:", item.item, "priority:", item.priority)
    return item.item
end

-- Demo priority queue
local eventQueue = PriorityQueue.new()
eventQueue:enqueue("Player joined", 1)
eventQueue:enqueue("Critical error", 10)
eventQueue:enqueue("Player left", 1)
eventQueue:enqueue("System shutdown", 5)

-- Process events in priority order
while eventQueue:size() > 0 do
    eventQueue:dequeue()
end

-- 4. HASH TABLE / DICTIONARY WITH COLLISION HANDLING
print("\\n4. DEMONSTRATING ADVANCED HASH TABLE...")

local HashTable = {}
HashTable.__index = HashTable

function HashTable.new(size)
    size = size or 10
    return setmetatable({
        buckets = {},
        size = size,
        count = 0
    }, HashTable)
end

function HashTable:hash(key)
    local hash = 0
    for i = 1, #key do
        hash = hash + string.byte(key, i)
    end
    return (hash % self.size) + 1
end

function HashTable:set(key, value)
    local bucketIndex = self:hash(key)
    
    if not self.buckets[bucketIndex] then
        self.buckets[bucketIndex] = {}
    end
    
    -- Check if key already exists
    for i, pair in ipairs(self.buckets[bucketIndex]) do
        if pair.key == key then
            pair.value = value
            return
        end
    end
    
    -- Add new key-value pair
    table.insert(self.buckets[bucketIndex], {key = key, value = value})
    self.count = self.count + 1
    print("Set:", key, "=", value)
end

function HashTable:get(key)
    local bucketIndex = self:hash(key)
    
    if not self.buckets[bucketIndex] then
        return nil
    end
    
    for _, pair in ipairs(self.buckets[bucketIndex]) do
        if pair.key == key then
            return pair.value
        end
    end
    
    return nil
end

-- Demo hash table
local playerCache = HashTable.new(5)
playerCache:set("Player1", {level = 10, coins = 100})
playerCache:set("Player2", {level = 5, coins = 50})
playerCache:set("Player3", {level = 15, coins = 200})

print("Player1 data:", playerCache:get("Player1"))
print("Player2 data:", playerCache:get("Player2"))

-- 5. TREE DATA STRUCTURE
print("\\n5. DEMONSTRATING TREE DATA STRUCTURE...")

local TreeNode = {}
TreeNode.__index = TreeNode

function TreeNode.new(value)
    return setmetatable({
        value = value,
        children = {},
        parent = nil
    }, TreeNode)
end

function TreeNode:addChild(child)
    child.parent = self
    table.insert(self.children, child)
end

function TreeNode:removeChild(child)
    for i, c in ipairs(self.children) do
        if c == child then
            table.remove(self.children, i)
            child.parent = nil
            break
        end
    end
end

function TreeNode:find(value)
    if self.value == value then
        return self
    end
    
    for _, child in ipairs(self.children) do
        local found = child:find(value)
        if found then
            return found
        end
    end
    
    return nil
end

function TreeNode:printTree(level)
    level = level or 0
    local indent = string.rep("  ", level)
    print(indent .. self.value)
    
    for _, child in ipairs(self.children) do
        child:printTree(level + 1)
    end
end

-- Demo tree structure
local root = TreeNode.new("Game World")
local level1 = TreeNode.new("Level 1")
local level2 = TreeNode.new("Level 2")
local boss1 = TreeNode.new("Boss 1")
local boss2 = TreeNode.new("Boss 2")

root:addChild(level1)
root:addChild(level2)
level1:addChild(boss1)
level2:addChild(boss2)

print("\\nGame world structure:")
root:printTree()

-- 6. GRAPH DATA STRUCTURE
print("\\n6. DEMONSTRATING GRAPH DATA STRUCTURE...")

local Graph = {}
Graph.__index = Graph

function Graph.new()
    return setmetatable({
        vertices = {},
        edges = {}
    }, Graph)
end

function Graph:addVertex(vertex)
    if not self.vertices[vertex] then
        self.vertices[vertex] = true
        self.edges[vertex] = {}
        print("Added vertex:", vertex)
    end
end

function Graph:addEdge(from, to, weight)
    weight = weight or 1
    self:addVertex(from)
    self:addVertex(to)
    
    self.edges[from][to] = weight
    print("Added edge:", from, "->", to, "weight:", weight)
end

function Graph:getNeighbors(vertex)
    return self.edges[vertex] or {}
end

function Graph:printGraph()
    for vertex, _ in pairs(self.vertices) do
        local neighbors = self:getNeighbors(vertex)
        local neighborList = {}
        for neighbor, weight in pairs(neighbors) do
            table.insert(neighborList, neighbor .. "(" .. weight .. ")")
        end
        print(vertex .. " -> " .. table.concat(neighborList, ", "))
    end
end

-- Demo graph
local gameMap = Graph.new()
gameMap:addEdge("Spawn", "Town", 1)
gameMap:addEdge("Town", "Forest", 2)
gameMap:addEdge("Town", "Cave", 3)
gameMap:addEdge("Forest", "Boss Area", 5)
gameMap:addEdge("Cave", "Boss Area", 4)

print("\\nGame map connections:")
gameMap:printGraph()

-- 7. PERFORMANCE COMPARISON
print("\\n7. PERFORMANCE COMPARISON...")

local function benchmarkTableOperations()
    local startTime = tick()
    
    -- Test array operations
    local array = {}
    for i = 1, 1000 do
        table.insert(array, i)
    end
    
    for i = 1, 1000 do
        table.remove(array, 1) -- Slow operation
    end
    
    local arrayTime = tick() - startTime
    
    -- Test dictionary operations
    startTime = tick()
    local dict = {}
    for i = 1, 1000 do
        dict[i] = i
    end
    
    for i = 1, 1000 do
        dict[i] = nil
    end
    
    local dictTime = tick() - startTime
    
    print("Array operations (1000 insert/remove from front):", arrayTime * 1000, "ms")
    print("Dictionary operations (1000 set/unset):", dictTime * 1000, "ms")
    print("Dictionary is", math.floor(arrayTime / dictTime), "times faster!")
end

benchmarkTableOperations()

print("\\n=== ADVANCED DATA STRUCTURES DEMO COMPLETE ===")
print("You've learned essential data structures for complex Roblox games!")`,
    challenge: {
      tests: [
        { description: 'Implement a stack data structure', type: 'code_contains', value: 'Stack' },
        { description: 'Use table operations like insert and remove', type: 'code_contains', value: 'table.insert' },
        { description: 'Create a dictionary with key-value pairs', type: 'code_contains', value: 'pairs' }
      ],
      hints: [
        'Use table.insert() and table.remove() for stack operations',
        'Use pairs() to iterate through dictionaries',
        'Consider the performance implications of different operations',
        'Use nested tables for complex data relationships',
        'Validate data when loading from external sources'
      ],
      successMessage: 'Outstanding! You now understand advanced data structures and can organize complex data efficiently in your Roblox games!'
    }
  },

  // === HUMANOID & CHARACTER SYSTEMS ===
  'humanoid-character-basics': {
    title: 'Humanoid & Character Basics',
    description: 'Master character control, humanoid properties, and basic character systems in Roblox',
    sections: [
      {
        title: 'Understanding Humanoids',
        content: `The Humanoid object is the heart of character control in Roblox. It handles movement, health, animations, and character behavior.

**Key Humanoid Properties:**
- **WalkSpeed**: How fast the character moves (default: 16)
- **JumpPower**: How high the character can jump (default: 50)
- **Health**: Current health points (default: 100)
- **MaxHealth**: Maximum health points (default: 100)
- **HipHeight**: How high the character floats above ground
- **AutoRotate**: Whether character automatically faces movement direction

**Important Humanoid Methods:**
- **MoveTo()**: Move character to a specific position
- **Jump()**: Make character jump
- **TakeDamage()**: Apply damage to character
- **ChangeState()**: Change character state (climbing, sitting, etc.)`,
        codeExample: `-- Basic humanoid manipulation

local Players = game:GetService("Players")
local player = Players.LocalPlayer

-- Wait for character to load
player.CharacterAdded:Connect(function(character)
    local humanoid = character:WaitForChild("Humanoid")
    
    -- Modify humanoid properties
    humanoid.WalkSpeed = 32  -- Double speed
    humanoid.JumpPower = 100 -- Double jump power
    humanoid.MaxHealth = 200 -- Double health
    humanoid.Health = 200    -- Set current health
    
    -- Make character move to a position
    humanoid:MoveTo(Vector3.new(0, 5, 0))
    
    -- Make character jump
    humanoid.Jump = true
    
    print("Character setup complete!")
    print("Walk Speed:", humanoid.WalkSpeed)
    print("Jump Power:", humanoid.JumpPower)
    print("Health:", humanoid.Health, "/", humanoid.MaxHealth)
end)`,
        color: 'blue'
      },
      {
        title: 'Character Health & Damage',
        content: `Health systems are essential for most games. Learn to create robust health and damage systems.

**Health Management:**
- **Health Property**: Current health value
- **MaxHealth Property**: Maximum possible health
- **HealthChanged Event**: Fires when health changes
- **Died Event**: Fires when character dies
- **TakeDamage() Method**: Apply damage to character

**Damage Types:**
- **Direct Damage**: Immediate health reduction
- **Damage Over Time**: Gradual health reduction
- **Healing**: Health restoration
- **Shield/Armor**: Damage reduction systems`,
        codeExample: `-- Advanced health and damage system

local Players = game:GetService("Players")
local player = Players.LocalPlayer

local HealthSystem = {}
HealthSystem.__index = HealthSystem

function HealthSystem.new(character)
    local self = setmetatable({}, HealthSystem)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.maxHealth = 100
    self.armor = 0  -- Damage reduction
    self.regeneration = 0  -- Health per second
    self.regenerationTimer = 0
    
    -- Set up health
    self.humanoid.MaxHealth = self.maxHealth
    self.humanoid.Health = self.maxHealth
    
    -- Connect events
    self.humanoid.HealthChanged:Connect(function(health)
        self:onHealthChanged(health)
    end)
    
    self.humanoid.Died:Connect(function()
        self:onDied()
    end)
    
    return self
end

function HealthSystem:takeDamage(amount, damageType)
    damageType = damageType or "normal"
    
    -- Apply armor reduction
    local actualDamage = amount * (1 - self.armor)
    
    -- Apply damage
    self.humanoid:TakeDamage(actualDamage)
    
    print("Took", actualDamage, "damage of type:", damageType)
end

function HealthSystem:heal(amount)
    local newHealth = math.min(self.humanoid.Health + amount, self.maxHealth)
    self.humanoid.Health = newHealth
    print("Healed for", amount, "health")
end

function HealthSystem:setArmor(armorValue)
    self.armor = math.clamp(armorValue, 0, 0.9)  -- Max 90% reduction
    print("Armor set to:", self.armor * 100, "%")
end

function HealthSystem:setRegeneration(regenerationRate)
    self.regeneration = regenerationRate
    print("Regeneration set to:", regenerationRate, "health/second")
end

function HealthSystem:onHealthChanged(health)
    print("Health changed to:", health)
    
    -- Low health warning
    if health < self.maxHealth * 0.25 then
        print("WARNING: Low health!")
    end
end

function HealthSystem:onDied()
    print("Character died!")
    -- Handle death logic here
end

function HealthSystem:update(deltaTime)
    -- Handle regeneration
    if self.regeneration > 0 and self.humanoid.Health < self.maxHealth then
        self.regenerationTimer = self.regenerationTimer + deltaTime
        if self.regenerationTimer >= 1 then
            self:heal(self.regeneration)
            self.regenerationTimer = 0
        end
    end
end

-- Example usage
player.CharacterAdded:Connect(function(character)
    local healthSystem = HealthSystem.new(character)
    
    -- Test the system
    wait(2)
    healthSystem:takeDamage(25, "fire")
    
    wait(2)
    healthSystem:setArmor(0.5)  -- 50% damage reduction
    healthSystem:takeDamage(40, "normal")
    
    wait(2)
    healthSystem:heal(30)
    
    wait(2)
    healthSystem:setRegeneration(5)  -- 5 health per second
end)`,
        color: 'green'
      },
      {
        title: 'Character States & Movement',
        content: `Characters can be in different states and have various movement capabilities. Understanding these is crucial for game mechanics.

**Character States:**
- **RunningState**: Character is running
- **JumpingState**: Character is jumping
- **FallingState**: Character is falling
- **ClimbingState**: Character is climbing
- **SittingState**: Character is sitting
- **PlatformStandingState**: Character is on a platform

**Movement Control:**
- **MoveTo()**: Move to specific position
- **Jump()**: Make character jump
- **ChangeState()**: Change character state
- **PlatformStand**: Enable/disable platform standing`,
        codeExample: `-- Character state and movement system

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local CharacterController = {}
CharacterController.__index = CharacterController

function CharacterController.new(character)
    local self = setmetatable({}, CharacterController)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.rootPart = character:WaitForChild("HumanoidRootPart")
    self.currentState = "idle"
    self.movementSpeed = 16
    self.jumpPower = 50
    
    -- Connect to state changes
    self.humanoid.StateChanged:Connect(function(oldState, newState)
        self:onStateChanged(oldState, newState)
    end)
    
    return self
end

function CharacterController:onStateChanged(oldState, newState)
    print("State changed from", oldState, "to", newState)
    self.currentState = newState.Name
    
    -- Handle different states
    if newState == Enum.HumanoidStateType.Running then
        self:onRunning()
    elseif newState == Enum.HumanoidStateType.Jumping then
        self:onJumping()
    elseif newState == Enum.HumanoidStateType.Falling then
        self:onFalling()
    elseif newState == Enum.HumanoidStateType.Climbing then
        self:onClimbing()
    end
end

function CharacterController:onRunning()
    print("Character is running!")
    -- Increase movement speed while running
    self.humanoid.WalkSpeed = self.movementSpeed * 1.5
end

function CharacterController:onJumping()
    print("Character is jumping!")
    -- Increase jump power
    self.humanoid.JumpPower = self.jumpPower * 1.2
end

function CharacterController:onFalling()
    print("Character is falling!")
    -- Reduce movement speed while falling
    self.humanoid.WalkSpeed = self.movementSpeed * 0.5
end

function CharacterController:onClimbing()
    print("Character is climbing!")
    -- Special climbing behavior
    self.humanoid.WalkSpeed = self.movementSpeed * 0.8
end

function CharacterController:moveTo(position)
    self.humanoid:MoveTo(position)
    print("Moving to:", position)
end

function CharacterController:jump()
    self.humanoid.Jump = true
    print("Jumping!")
end

function CharacterController:setMovementSpeed(speed)
    self.movementSpeed = speed
    self.humanoid.WalkSpeed = speed
    print("Movement speed set to:", speed)
end

function CharacterController:setJumpPower(power)
    self.jumpPower = power
    self.humanoid.JumpPower = power
    print("Jump power set to:", power)
end

function CharacterController:enablePlatformStanding(enabled)
    self.humanoid.PlatformStand = enabled
    print("Platform standing:", enabled and "enabled" or "disabled")
end

-- Example usage
local player = Players.LocalPlayer
player.CharacterAdded:Connect(function(character)
    local controller = CharacterController.new(character)
    
    -- Test movement
    wait(2)
    controller:moveTo(Vector3.new(10, 0, 0))
    
    wait(2)
    controller:jump()
    
    wait(2)
    controller:setMovementSpeed(32)
    
    wait(2)
    controller:setJumpPower(100)
    
    wait(2)
    controller:enablePlatformStanding(true)
end)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Humanoid & Character Basics - Comprehensive Learning Example
-- Master character control and humanoid systems in Roblox

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

print("=== HUMANOID & CHARACTER BASICS DEMO ===")
print("Learning character control and humanoid systems...")

-- 1. BASIC HUMANOID MANIPULATION
print("\\n1. DEMONSTRATING BASIC HUMANOID PROPERTIES...")

local function setupBasicHumanoid(character)
    local humanoid = character:WaitForChild("Humanoid")
    
    -- Modify basic properties
    humanoid.WalkSpeed = 24  -- Faster movement
    humanoid.JumpPower = 75  -- Higher jumps
    humanoid.MaxHealth = 150 -- More health
    humanoid.Health = 150    -- Set current health
    humanoid.HipHeight = 2   -- Float higher
    
    print("Basic humanoid setup complete!")
    print("Walk Speed:", humanoid.WalkSpeed)
    print("Jump Power:", humanoid.JumpPower)
    print("Health:", humanoid.Health, "/", humanoid.MaxHealth)
    print("Hip Height:", humanoid.HipHeight)
end

-- 2. ADVANCED HEALTH SYSTEM
print("\\n2. DEMONSTRATING ADVANCED HEALTH SYSTEM...")

local AdvancedHealthSystem = {}
AdvancedHealthSystem.__index = AdvancedHealthSystem

function AdvancedHealthSystem.new(character)
    local self = setmetatable({}, AdvancedHealthSystem)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.maxHealth = 200
    self.armor = 0
    self.regeneration = 0
    self.regenerationTimer = 0
    self.damageOverTime = {}
    
    -- Set up health
    self.humanoid.MaxHealth = self.maxHealth
    self.humanoid.Health = self.maxHealth
    
    -- Connect events
    self.humanoid.HealthChanged:Connect(function(health)
        self:onHealthChanged(health)
    end)
    
    self.humanoid.Died:Connect(function()
        self:onDied()
    end)
    
    return self
end

function AdvancedHealthSystem:takeDamage(amount, damageType, source)
    damageType = damageType or "normal"
    source = source or "unknown"
    
    -- Apply armor reduction
    local actualDamage = amount * (1 - self.armor)
    
    -- Apply damage
    self.humanoid:TakeDamage(actualDamage)
    
    print("Took", actualDamage, "damage of type:", damageType, "from:", source)
    
    -- Create damage indicator
    self:createDamageIndicator(actualDamage, damageType)
end

function AdvancedHealthSystem:heal(amount, source)
    source = source or "unknown"
    local newHealth = math.min(self.humanoid.Health + amount, self.maxHealth)
    local actualHealing = newHealth - self.humanoid.Health
    self.humanoid.Health = newHealth
    
    if actualHealing > 0 then
        print("Healed for", actualHealing, "health from:", source)
        self:createHealIndicator(actualHealing)
    end
end

function AdvancedHealthSystem:setArmor(armorValue)
    self.armor = math.clamp(armorValue, 0, 0.95)  -- Max 95% reduction
    print("Armor set to:", math.floor(self.armor * 100), "% damage reduction")
end

function AdvancedHealthSystem:setRegeneration(regenerationRate)
    self.regeneration = regenerationRate
    print("Regeneration set to:", regenerationRate, "health/second")
end

function AdvancedHealthSystem:addDamageOverTime(damage, duration, interval, damageType)
    local dot = {
        damage = damage,
        duration = duration,
        interval = interval or 1,
        damageType = damageType or "dot",
        startTime = tick(),
        lastTick = 0
    }
    
    table.insert(self.damageOverTime, dot)
    print("Added damage over time:", damage, "every", interval, "seconds for", duration, "seconds")
end

function AdvancedHealthSystem:createDamageIndicator(damage, damageType)
    -- Create a simple damage indicator
    local billboardGui = Instance.new("BillboardGui")
    billboardGui.Size = UDim2.new(0, 100, 0, 50)
    billboardGui.StudsOffset = Vector3.new(0, 3, 0)
    billboardGui.Parent = self.character.Head
    
    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.BackgroundTransparency = 1
    label.Text = "-" .. math.floor(damage)
    label.TextColor3 = Color3.fromRGB(255, 0, 0)
    label.TextScaled = true
    label.Font = Enum.Font.GothamBold
    label.Parent = billboardGui
    
    -- Animate the indicator
    local tween = game:GetService("TweenService"):Create(label,
        TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {TextTransparency = 1, Position = UDim2.new(0, 0, -1, 0)}
    )
    tween:Play()
    
    tween.Completed:Connect(function()
        billboardGui:Destroy()
    end)
end

function AdvancedHealthSystem:createHealIndicator(healing)
    local billboardGui = Instance.new("BillboardGui")
    billboardGui.Size = UDim2.new(0, 100, 0, 50)
    billboardGui.StudsOffset = Vector3.new(0, 3, 0)
    billboardGui.Parent = self.character.Head
    
    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.BackgroundTransparency = 1
    label.Text = "+" .. math.floor(healing)
    label.TextColor3 = Color3.fromRGB(0, 255, 0)
    label.TextScaled = true
    label.Font = Enum.Font.GothamBold
    label.Parent = billboardGui
    
    local tween = game:GetService("TweenService"):Create(label,
        TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {TextTransparency = 1, Position = UDim2.new(0, 0, -1, 0)}
    )
    tween:Play()
    
    tween.Completed:Connect(function()
        billboardGui:Destroy()
    end)
end

function AdvancedHealthSystem:onHealthChanged(health)
    local healthPercent = (health / self.maxHealth) * 100
    print("Health:", math.floor(health), "(", math.floor(healthPercent), "%)")
    
    -- Health warnings
    if healthPercent <= 25 then
        print("CRITICAL: Low health!")
    elseif healthPercent <= 50 then
        print("WARNING: Health below 50%")
    end
end

function AdvancedHealthSystem:onDied()
    print("Character died!")
    -- Clear all damage over time effects
    self.damageOverTime = {}
end

function AdvancedHealthSystem:update(deltaTime)
    -- Handle regeneration
    if self.regeneration > 0 and self.humanoid.Health < self.maxHealth then
        self.regenerationTimer = self.regenerationTimer + deltaTime
        if self.regenerationTimer >= 1 then
            self:heal(self.regeneration, "regeneration")
            self.regenerationTimer = 0
        end
    end
    
    -- Handle damage over time
    local currentTime = tick()
    for i = #self.damageOverTime, 1, -1 do
        local dot = self.damageOverTime[i]
        local elapsed = currentTime - dot.startTime
        
        if elapsed >= dot.duration then
            table.remove(self.damageOverTime, i)
        else
            if currentTime - dot.lastTick >= dot.interval then
                self:takeDamage(dot.damage, dot.damageType, "damage over time")
                dot.lastTick = currentTime
            end
        end
    end
end

-- 3. CHARACTER STATE MANAGEMENT
print("\\n3. DEMONSTRATING CHARACTER STATE MANAGEMENT...")

local CharacterStateManager = {}
CharacterStateManager.__index = CharacterStateManager

function CharacterStateManager.new(character)
    local self = setmetatable({}, CharacterStateManager)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.rootPart = character:WaitForChild("HumanoidRootPart")
    self.currentState = "idle"
    self.stateHistory = {}
    self.movementSpeed = 16
    self.jumpPower = 50
    
    -- Connect to state changes
    self.humanoid.StateChanged:Connect(function(oldState, newState)
        self:onStateChanged(oldState, newState)
    end)
    
    return self
end

function CharacterStateManager:onStateChanged(oldState, newState)
    local stateName = newState.Name
    print("State changed from", oldState.Name, "to", stateName)
    
    -- Record state change
    table.insert(self.stateHistory, {
        from = oldState.Name,
        to = stateName,
        time = tick()
    })
    
    self.currentState = stateName
    
    -- Handle state-specific logic
    if stateName == "Running" then
        self:onRunning()
    elseif stateName == "Jumping" then
        self:onJumping()
    elseif stateName == "Falling" then
        self:onFalling()
    elseif stateName == "Climbing" then
        self:onClimbing()
    elseif stateName == "Sitting" then
        self:onSitting()
    elseif stateName == "PlatformStanding" then
        self:onPlatformStanding()
    end
end

function CharacterStateManager:onRunning()
    print("Character is running - increasing speed!")
    self.humanoid.WalkSpeed = self.movementSpeed * 1.5
end

function CharacterStateManager:onJumping()
    print("Character is jumping - boosting jump power!")
    self.humanoid.JumpPower = self.jumpPower * 1.3
end

function CharacterStateManager:onFalling()
    print("Character is falling - reducing control!")
    self.humanoid.WalkSpeed = self.movementSpeed * 0.3
end

function CharacterStateManager:onClimbing()
    print("Character is climbing - special movement!")
    self.humanoid.WalkSpeed = self.movementSpeed * 0.8
end

function CharacterStateManager:onSitting()
    print("Character is sitting - movement disabled!")
    self.humanoid.WalkSpeed = 0
end

function CharacterStateManager:onPlatformStanding()
    print("Character is platform standing!")
    -- Platform standing behavior
end

function CharacterStateManager:moveTo(position)
    self.humanoid:MoveTo(position)
    print("Moving to:", position)
end

function CharacterStateManager:jump()
    self.humanoid.Jump = true
    print("Jumping!")
end

function CharacterStateManager:setMovementSpeed(speed)
    self.movementSpeed = speed
    if self.currentState ~= "Sitting" then
        self.humanoid.WalkSpeed = speed
    end
    print("Movement speed set to:", speed)
end

function CharacterStateManager:setJumpPower(power)
    self.jumpPower = power
    self.humanoid.JumpPower = power
    print("Jump power set to:", power)
end

function CharacterStateManager:enablePlatformStanding(enabled)
    self.humanoid.PlatformStand = enabled
    print("Platform standing:", enabled and "enabled" or "disabled")
end

function CharacterStateManager:getStateHistory()
    return self.stateHistory
end

-- 4. DEMO THE SYSTEMS
print("\\n4. RUNNING CHARACTER SYSTEM DEMONSTRATIONS...")

local player = Players.LocalPlayer
player.CharacterAdded:Connect(function(character)
    -- Setup basic humanoid
    setupBasicHumanoid(character)
    
    -- Create advanced health system
    local healthSystem = AdvancedHealthSystem.new(character)
    
    -- Create state manager
    local stateManager = CharacterStateManager.new(character)
    
    -- Test health system
    wait(2)
    print("\\n--- Testing Health System ---")
    healthSystem:takeDamage(30, "fire", "fireball")
    
    wait(2)
    healthSystem:setArmor(0.6)  -- 60% damage reduction
    healthSystem:takeDamage(50, "normal", "sword")
    
    wait(2)
    healthSystem:heal(25, "potion")
    
    wait(2)
    healthSystem:setRegeneration(3)  -- 3 health per second
    healthSystem:addDamageOverTime(5, 10, 2, "poison")  -- 5 damage every 2 seconds for 10 seconds
    
    -- Test movement system
    wait(2)
    print("\\n--- Testing Movement System ---")
    stateManager:moveTo(Vector3.new(10, 0, 0))
    
    wait(2)
    stateManager:jump()
    
    wait(2)
    stateManager:setMovementSpeed(32)
    
    wait(2)
    stateManager:setJumpPower(100)
    
    wait(2)
    stateManager:enablePlatformStanding(true)
    
    -- Update systems
    local connection
    connection = RunService.Heartbeat:Connect(function(deltaTime)
        healthSystem:update(deltaTime)
    end)
    
    -- Clean up on character removal
    character.AncestryChanged:Connect(function()
        if not character.Parent then
            connection:Disconnect()
        end
    end)
end)

print("\\n=== HUMANOID & CHARACTER BASICS DEMO COMPLETE ===")
print("You've learned essential character control and humanoid systems!")`,
    challenge: {
      tests: [
        { description: 'Modify humanoid properties like WalkSpeed and JumpPower', type: 'code_contains', value: 'WalkSpeed' },
        { description: 'Use TakeDamage method to apply damage', type: 'code_contains', value: 'TakeDamage' },
        { description: 'Connect to humanoid state changes', type: 'code_contains', value: 'StateChanged' }
      ],
      hints: [
        'Use humanoid.WalkSpeed and humanoid.JumpPower to control movement',
        'Use humanoid:TakeDamage() to apply damage to characters',
        'Connect to humanoid.StateChanged to detect state changes',
        'Use humanoid:MoveTo() to move characters to specific positions',
        'Use humanoid.Jump = true to make characters jump'
      ],
      successMessage: 'Excellent! You now understand humanoid and character systems. These are essential for creating engaging character-based games!'
    }
  },

  'character-animation-systems': {
    title: 'Character Animation Systems',
    description: 'Master character animations, animation objects, and dynamic animation systems',
    sections: [
      {
        title: 'Animation Objects & Animator',
        content: `Animations bring characters to life in Roblox. Understanding how to create and control animations is crucial for game development.

**Animation System Components:**
- **Animation Object**: Contains animation data
- **Animator**: Controls animation playback
- **AnimationTrack**: Individual animation instance
- **AnimationPriority**: Controls which animations play

**Animation Properties:**
- **AnimationId**: The asset ID of the animation
- **Priority**: Animation priority (Idle, Movement, Action, Core)
- **Length**: Duration of the animation
- **IsLoaded**: Whether animation is ready to play

**Animation Methods:**
- **LoadAnimation()**: Load an animation onto the animator
- **Play()**: Start playing an animation
- **Stop()**: Stop the animation
- **AdjustSpeed()**: Change playback speed`,
        codeExample: `-- Basic animation system

local Players = game:GetService("Players")
local AnimationService = game:GetService("AnimationService")

local AnimationController = {}
AnimationController.__index = AnimationController

function AnimationController.new(character)
    local self = setmetatable({}, AnimationController)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.animator = self.humanoid:WaitForChild("Animator")
    self.animations = {}
    self.currentAnimations = {}
    
    return self
end

function AnimationController:loadAnimation(name, animationId, priority)
    priority = priority or Enum.AnimationPriority.Idle
    
    -- Create animation object
    local animation = Instance.new("Animation")
    animation.AnimationId = animationId
    
    -- Load animation onto animator
    local animationTrack = self.animator:LoadAnimation(animation)
    animationTrack.Priority = priority
    
    -- Store animation
    self.animations[name] = animationTrack
    
    print("Loaded animation:", name)
    return animationTrack
end

function AnimationController:playAnimation(name, fadeTime, weight, speed)
    fadeTime = fadeTime or 0.2
    weight = weight or 1
    speed = speed or 1
    
    local animationTrack = self.animations[name]
    if animationTrack then
        -- Stop current animation of same priority
        self:stopAnimationByPriority(animationTrack.Priority)
        
        -- Play new animation
        animationTrack:Play(fadeTime, weight, speed)
        self.currentAnimations[animationTrack.Priority] = animationTrack
        
        print("Playing animation:", name)
    else
        warn("Animation not found:", name)
    end
end

function AnimationController:stopAnimation(name, fadeTime)
    fadeTime = fadeTime or 0.2
    
    local animationTrack = self.animations[name]
    if animationTrack then
        animationTrack:Stop(fadeTime)
        self.currentAnimations[animationTrack.Priority] = nil
        print("Stopped animation:", name)
    end
end

function AnimationController:stopAnimationByPriority(priority)
    local currentAnimation = self.currentAnimations[priority]
    if currentAnimation then
        currentAnimation:Stop(0.2)
        self.currentAnimations[priority] = nil
    end
end

function AnimationController:adjustAnimationSpeed(name, speed)
    local animationTrack = self.animations[name]
    if animationTrack then
        animationTrack:AdjustSpeed(speed)
        print("Adjusted speed for", name, "to", speed)
    end
end

-- Example usage
local player = Players.LocalPlayer
player.CharacterAdded:Connect(function(character)
    local animController = AnimationController.new(character)
    
    -- Load some basic animations (you'll need actual animation IDs)
    -- animController:loadAnimation("idle", "rbxassetid://123456789", Enum.AnimationPriority.Idle)
    -- animController:loadAnimation("walk", "rbxassetid://987654321", Enum.AnimationPriority.Movement)
    -- animController:loadAnimation("jump", "rbxassetid://456789123", Enum.AnimationPriority.Action)
    
    -- Play animations
    -- animController:playAnimation("idle")
    
    -- wait(3)
    -- animController:playAnimation("walk")
    
    -- wait(3)
    -- animController:playAnimation("jump")
end)`,
        color: 'blue'
      },
      {
        title: 'Dynamic Animation Systems',
        content: `Advanced games need dynamic animation systems that respond to game state and player actions.

**Dynamic Animation Features:**
- **State-Based Animations**: Different animations for different states
- **Blend Animations**: Smooth transitions between animations
- **Animation Events**: Trigger actions during animations
- **Custom Animation Sequences**: Complex animation chains
- **Animation Layers**: Multiple animations playing simultaneously

**Animation Events:**
- **KeyframeReached**: Fires when animation reaches specific keyframes
- **Stopped**: Fires when animation stops
- **DidLoop**: Fires when animation loops`,
        codeExample: `-- Advanced dynamic animation system

local DynamicAnimationSystem = {}
DynamicAnimationSystem.__index = DynamicAnimationSystem

function DynamicAnimationSystem.new(character)
    local self = setmetatable({}, DynamicAnimationSystem)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.animator = self.humanoid:WaitForChild("Animator")
    self.animations = {}
    self.animationStates = {}
    self.animationEvents = {}
    self.currentState = "idle"
    
    -- Set up state-based animations
    self:setupAnimationStates()
    
    return self
end

function DynamicAnimationSystem:setupAnimationStates()
    self.animationStates = {
        idle = {
            animation = nil,  -- Will be loaded
            priority = Enum.AnimationPriority.Idle,
            looped = true,
            fadeTime = 0.3
        },
        walking = {
            animation = nil,
            priority = Enum.AnimationPriority.Movement,
            looped = true,
            fadeTime = 0.2
        },
        running = {
            animation = nil,
            priority = Enum.AnimationPriority.Movement,
            looped = true,
            fadeTime = 0.1
        },
        jumping = {
            animation = nil,
            priority = Enum.AnimationPriority.Action,
            looped = false,
            fadeTime = 0.1
        },
        falling = {
            animation = nil,
            priority = Enum.AnimationPriority.Action,
            looped = true,
            fadeTime = 0.2
        },
        attacking = {
            animation = nil,
            priority = Enum.AnimationPriority.Action,
            looped = false,
            fadeTime = 0.1
        }
    }
end

function DynamicAnimationSystem:loadStateAnimation(stateName, animationId)
    local state = self.animationStates[stateName]
    if state then
        local animation = Instance.new("Animation")
        animation.AnimationId = animationId
        
        local animationTrack = self.animator:LoadAnimation(animation)
        animationTrack.Priority = state.priority
        animationTrack.Looped = state.looped
        
        state.animation = animationTrack
        self.animations[stateName] = animationTrack
        
        -- Set up animation events
        self:setupAnimationEvents(animationTrack, stateName)
        
        print("Loaded state animation:", stateName)
    end
end

function DynamicAnimationSystem:setupAnimationEvents(animationTrack, stateName)
    -- Keyframe reached event
    animationTrack.KeyframeReached:Connect(function(keyframeName)
        self:onKeyframeReached(stateName, keyframeName)
    end)
    
    -- Animation stopped event
    animationTrack.Stopped:Connect(function()
        self:onAnimationStopped(stateName)
    end)
    
    -- Animation looped event
    animationTrack.DidLoop:Connect(function()
        self:onAnimationLooped(stateName)
    end)
end

function DynamicAnimationSystem:onKeyframeReached(stateName, keyframeName)
    print("Keyframe reached:", keyframeName, "in", stateName)
    
    -- Trigger custom events
    if self.animationEvents[stateName] and self.animationEvents[stateName][keyframeName] then
        self.animationEvents[stateName][keyframeName]()
    end
end

function DynamicAnimationSystem:onAnimationStopped(stateName)
    print("Animation stopped:", stateName)
    
    -- Handle animation completion
    if stateName == "attacking" then
        self:setState("idle")
    elseif stateName == "jumping" then
        self:setState("falling")
    end
end

function DynamicAnimationSystem:onAnimationLooped(stateName)
    print("Animation looped:", stateName)
end

function DynamicAnimationSystem:setState(newState)
    if self.currentState == newState then
        return
    end
    
    local oldState = self.currentState
    self.currentState = newState
    
    print("Animation state changed from", oldState, "to", newState)
    
    -- Play new state animation
    self:playStateAnimation(newState)
end

function DynamicAnimationSystem:playStateAnimation(stateName)
    local state = self.animationStates[stateName]
    if state and state.animation then
        -- Stop current animation of same priority
        self:stopAnimationByPriority(state.priority)
        
        -- Play new animation
        state.animation:Play(state.fadeTime)
        
        print("Playing state animation:", stateName)
    end
end

function DynamicAnimationSystem:stopAnimationByPriority(priority)
    for stateName, state in pairs(self.animationStates) do
        if state.animation and state.priority == priority then
            state.animation:Stop(0.1)
        end
    end
end

function DynamicAnimationSystem:addAnimationEvent(stateName, keyframeName, callback)
    if not self.animationEvents[stateName] then
        self.animationEvents[stateName] = {}
    end
    
    self.animationEvents[stateName][keyframeName] = callback
    print("Added animation event:", stateName, "->", keyframeName)
end

function DynamicAnimationSystem:blendAnimations(animation1, animation2, blendWeight, fadeTime)
    fadeTime = fadeTime or 0.5
    blendWeight = blendWeight or 0.5
    
    if self.animations[animation1] and self.animations[animation2] then
        self.animations[animation1]:Play(fadeTime, 1 - blendWeight)
        self.animations[animation2]:Play(fadeTime, blendWeight)
        
        print("Blending animations:", animation1, "and", animation2, "weight:", blendWeight)
    end
end

-- Example usage
local player = Players.LocalPlayer
player.CharacterAdded:Connect(function(character)
    local animSystem = DynamicAnimationSystem.new(character)
    
    -- Load state animations (you'll need actual animation IDs)
    -- animSystem:loadStateAnimation("idle", "rbxassetid://123456789")
    -- animSystem:loadStateAnimation("walking", "rbxassetid://987654321")
    -- animSystem:loadStateAnimation("running", "rbxassetid://456789123")
    -- animSystem:loadStateAnimation("jumping", "rbxassetid://789123456")
    -- animSystem:loadStateAnimation("attacking", "rbxassetid://321654987")
    
    -- Add animation events
    -- animSystem:addAnimationEvent("attacking", "hit", function()
    --     print("Attack hit!")
    -- end)
    
    -- Test state changes
    -- animSystem:setState("idle")
    
    -- wait(2)
    -- animSystem:setState("walking")
    
    -- wait(2)
    -- animSystem:setState("running")
    
    -- wait(2)
    -- animSystem:setState("jumping")
end)`,
        color: 'green'
      },
      {
        title: 'Character Customization',
        content: `Character customization allows players to personalize their avatars with accessories, clothing, and body modifications.

**Character Customization Components:**
- **Accessories**: Hats, hair, face accessories
- **Clothing**: Shirts, pants, t-shirts
- **Body Colors**: Skin, head, torso, left/right arm/leg colors
- **Body Scales**: Height, width, head size, etc.
- **Facial Features**: Face ID, head shape

**Customization Methods:**
- **SetAccessories()**: Apply accessories to character
- **SetClothing()**: Apply clothing items
- **SetBodyColors()**: Change body part colors
- **SetBodyScales()**: Modify body proportions`,
        codeExample: `-- Character customization system

local CharacterCustomizer = {}
CharacterCustomizer.__index = CharacterCustomizer

function CharacterCustomizer.new(character)
    local self = setmetatable({}, CharacterCustomizer)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.bodyColors = {}
    self.bodyScales = {}
    self.accessories = {}
    self.clothing = {}
    
    return self
end

function CharacterCustomizer:setBodyColor(bodyPart, color)
    self.bodyColors[bodyPart] = color
    self.humanoid[bodyPart .. "Color"] = color
    print("Set", bodyPart, "color to:", color)
end

function CharacterCustomizer:setAllBodyColors(colors)
    local bodyParts = {"Head", "Torso", "LeftArm", "RightArm", "LeftLeg", "RightLeg"}
    
    for _, part in ipairs(bodyParts) do
        if colors[part] then
            self:setBodyColor(part, colors[part])
        end
    end
end

function CharacterCustomizer:setBodyScale(scaleType, value)
    self.bodyScales[scaleType] = value
    self.humanoid[scaleType] = value
    print("Set", scaleType, "to:", value)
end

function CharacterCustomizer:setAllBodyScales(scales)
    local scaleTypes = {
        "HeadScale", "BodyWidthScale", "BodyHeightScale", "BodyDepthScale",
        "BodyProportionScale", "BodyTypeScale"
    }
    
    for _, scaleType in ipairs(scaleTypes) do
        if scales[scaleType] then
            self:setBodyScale(scaleType, scales[scaleType])
        end
    end
end

function CharacterCustomizer:addAccessory(accessoryId, attachmentPoint)
    attachmentPoint = attachmentPoint or "HatAttachment"
    
    local accessory = game:GetService("InsertService"):LoadAsset(accessoryId)
    if accessory then
        local accessoryObject = accessory:GetChildren()[1]
        if accessoryObject and accessoryObject:IsA("Accessory") then
            accessoryObject.Parent = self.character
            self.accessories[accessoryObject.Name] = accessoryObject
            print("Added accessory:", accessoryObject.Name)
        end
    end
end

function CharacterCustomizer:removeAccessory(accessoryName)
    local accessory = self.accessories[accessoryName]
    if accessory then
        accessory:Destroy()
        self.accessories[accessoryName] = nil
        print("Removed accessory:", accessoryName)
    end
end

function CharacterCustomizer:setClothing(clothingType, clothingId)
    clothingType = clothingType:lower()
    
    if clothingType == "shirt" then
        self.humanoid:SetShirt(clothingId)
    elseif clothingType == "pants" then
        self.humanoid:SetPants(clothingId)
    elseif clothingType == "tshirt" then
        self.humanoid:SetTShirt(clothingId)
    end
    
    self.clothing[clothingType] = clothingId
    print("Set", clothingType, "to:", clothingId)
end

function CharacterCustomizer:applyPreset(presetName)
    if presetName == "robot" then
        self:setAllBodyColors({
            Head = Color3.fromRGB(200, 200, 200),
            Torso = Color3.fromRGB(150, 150, 150),
            LeftArm = Color3.fromRGB(200, 200, 200),
            RightArm = Color3.fromRGB(200, 200, 200),
            LeftLeg = Color3.fromRGB(200, 200, 200),
            RightLeg = Color3.fromRGB(200, 200, 200)
        })
        
        self:setAllBodyScales({
            HeadScale = 1.2,
            BodyWidthScale = 1.1,
            BodyHeightScale = 1.1
        })
        
    elseif presetName == "giant" then
        self:setAllBodyScales({
            HeadScale = 1.5,
            BodyWidthScale = 1.3,
            BodyHeightScale = 1.4,
            BodyDepthScale = 1.2
        })
        
    elseif presetName == "tiny" then
        self:setAllBodyScales({
            HeadScale = 0.8,
            BodyWidthScale = 0.7,
            BodyHeightScale = 0.6,
            BodyDepthScale = 0.8
        })
    end
    
    print("Applied preset:", presetName)
end

function CharacterCustomizer:randomizeAppearance()
    -- Random body colors
    local colors = {
        Color3.fromRGB(255, 220, 177),  -- Light skin
        Color3.fromRGB(241, 194, 125),  -- Medium skin
        Color3.fromRGB(198, 134, 66),   -- Dark skin
        Color3.fromRGB(141, 85, 36),    -- Very dark skin
        Color3.fromRGB(255, 255, 255),  -- White
        Color3.fromRGB(0, 0, 0)         -- Black
    }
    
    local bodyParts = {"Head", "Torso", "LeftArm", "RightArm", "LeftLeg", "RightLeg"}
    for _, part in ipairs(bodyParts) do
        self:setBodyColor(part, colors[math.random(1, #colors)])
    end
    
    -- Random body scales
    self:setAllBodyScales({
        HeadScale = math.random(80, 120) / 100,
        BodyWidthScale = math.random(80, 120) / 100,
        BodyHeightScale = math.random(80, 120) / 100,
        BodyDepthScale = math.random(80, 120) / 100
    })
    
    print("Randomized character appearance!")
end

-- Example usage
local player = Players.LocalPlayer
player.CharacterAdded:Connect(function(character)
    local customizer = CharacterCustomizer.new(character)
    
    -- Test customization
    wait(1)
    customizer:setBodyColor("Head", Color3.fromRGB(255, 0, 0))
    
    wait(1)
    customizer:setBodyScale("HeadScale", 1.5)
    
    wait(1)
    customizer:applyPreset("giant")
    
    wait(2)
    customizer:randomizeAppearance()
end)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Character Animation Systems - Comprehensive Learning Example
-- Master character animations and customization in Roblox

local Players = game:GetService("Players")
local AnimationService = game:GetService("AnimationService")
local InsertService = game:GetService("InsertService")

print("=== CHARACTER ANIMATION SYSTEMS DEMO ===")
print("Learning character animations and customization...")

-- 1. BASIC ANIMATION SYSTEM
print("\\n1. DEMONSTRATING BASIC ANIMATION SYSTEM...")

local BasicAnimationController = {}
BasicAnimationController.__index = BasicAnimationController

function BasicAnimationController.new(character)
    local self = setmetatable({}, BasicAnimationController)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.animator = self.humanoid:WaitForChild("Animator")
    self.animations = {}
    self.currentAnimations = {}
    
    return self
end

function BasicAnimationController:loadAnimation(name, animationId, priority)
    priority = priority or Enum.AnimationPriority.Idle
    
    -- Create animation object
    local animation = Instance.new("Animation")
    animation.AnimationId = animationId
    
    -- Load animation onto animator
    local animationTrack = self.animator:LoadAnimation(animation)
    animationTrack.Priority = priority
    
    -- Store animation
    self.animations[name] = animationTrack
    
    print("Loaded animation:", name, "with priority:", priority.Name)
    return animationTrack
end

function BasicAnimationController:playAnimation(name, fadeTime, weight, speed)
    fadeTime = fadeTime or 0.2
    weight = weight or 1
    speed = speed or 1
    
    local animationTrack = self.animations[name]
    if animationTrack then
        -- Stop current animation of same priority
        self:stopAnimationByPriority(animationTrack.Priority)
        
        -- Play new animation
        animationTrack:Play(fadeTime, weight, speed)
        self.currentAnimations[animationTrack.Priority] = animationTrack
        
        print("Playing animation:", name)
    else
        warn("Animation not found:", name)
    end
end

function BasicAnimationController:stopAnimation(name, fadeTime)
    fadeTime = fadeTime or 0.2
    
    local animationTrack = self.animations[name]
    if animationTrack then
        animationTrack:Stop(fadeTime)
        self.currentAnimations[animationTrack.Priority] = nil
        print("Stopped animation:", name)
    end
end

function BasicAnimationController:stopAnimationByPriority(priority)
    local currentAnimation = self.currentAnimations[priority]
    if currentAnimation then
        currentAnimation:Stop(0.2)
        self.currentAnimations[priority] = nil
    end
end

function BasicAnimationController:adjustAnimationSpeed(name, speed)
    local animationTrack = self.animations[name]
    if animationTrack then
        animationTrack:AdjustSpeed(speed)
        print("Adjusted speed for", name, "to", speed)
    end
end

-- 2. DYNAMIC ANIMATION SYSTEM
print("\\n2. DEMONSTRATING DYNAMIC ANIMATION SYSTEM...")

local DynamicAnimationSystem = {}
DynamicAnimationSystem.__index = DynamicAnimationSystem

function DynamicAnimationSystem.new(character)
    local self = setmetatable({}, DynamicAnimationSystem)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.animator = self.humanoid:WaitForChild("Animator")
    self.animations = {}
    self.animationStates = {}
    self.animationEvents = {}
    self.currentState = "idle"
    
    -- Set up state-based animations
    self:setupAnimationStates()
    
    return self
end

function DynamicAnimationSystem:setupAnimationStates()
    self.animationStates = {
        idle = {
            animation = nil,
            priority = Enum.AnimationPriority.Idle,
            looped = true,
            fadeTime = 0.3
        },
        walking = {
            animation = nil,
            priority = Enum.AnimationPriority.Movement,
            looped = true,
            fadeTime = 0.2
        },
        running = {
            animation = nil,
            priority = Enum.AnimationPriority.Movement,
            looped = true,
            fadeTime = 0.1
        },
        jumping = {
            animation = nil,
            priority = Enum.AnimationPriority.Action,
            looped = false,
            fadeTime = 0.1
        },
        falling = {
            animation = nil,
            priority = Enum.AnimationPriority.Action,
            looped = true,
            fadeTime = 0.2
        },
        attacking = {
            animation = nil,
            priority = Enum.AnimationPriority.Action,
            looped = false,
            fadeTime = 0.1
        }
    }
end

function DynamicAnimationSystem:loadStateAnimation(stateName, animationId)
    local state = self.animationStates[stateName]
    if state then
        local animation = Instance.new("Animation")
        animation.AnimationId = animationId
        
        local animationTrack = self.animator:LoadAnimation(animation)
        animationTrack.Priority = state.priority
        animationTrack.Looped = state.looped
        
        state.animation = animationTrack
        self.animations[stateName] = animationTrack
        
        -- Set up animation events
        self:setupAnimationEvents(animationTrack, stateName)
        
        print("Loaded state animation:", stateName)
    end
end

function DynamicAnimationSystem:setupAnimationEvents(animationTrack, stateName)
    -- Keyframe reached event
    animationTrack.KeyframeReached:Connect(function(keyframeName)
        self:onKeyframeReached(stateName, keyframeName)
    end)
    
    -- Animation stopped event
    animationTrack.Stopped:Connect(function()
        self:onAnimationStopped(stateName)
    end)
    
    -- Animation looped event
    animationTrack.DidLoop:Connect(function()
        self:onAnimationLooped(stateName)
    end)
end

function DynamicAnimationSystem:onKeyframeReached(stateName, keyframeName)
    print("Keyframe reached:", keyframeName, "in", stateName)
    
    -- Trigger custom events
    if self.animationEvents[stateName] and self.animationEvents[stateName][keyframeName] then
        self.animationEvents[stateName][keyframeName]()
    end
end

function DynamicAnimationSystem:onAnimationStopped(stateName)
    print("Animation stopped:", stateName)
    
    -- Handle animation completion
    if stateName == "attacking" then
        self:setState("idle")
    elseif stateName == "jumping" then
        self:setState("falling")
    end
end

function DynamicAnimationSystem:onAnimationLooped(stateName)
    print("Animation looped:", stateName)
end

function DynamicAnimationSystem:setState(newState)
    if self.currentState == newState then
        return
    end
    
    local oldState = self.currentState
    self.currentState = newState
    
    print("Animation state changed from", oldState, "to", newState)
    
    -- Play new state animation
    self:playStateAnimation(newState)
end

function DynamicAnimationSystem:playStateAnimation(stateName)
    local state = self.animationStates[stateName]
    if state and state.animation then
        -- Stop current animation of same priority
        self:stopAnimationByPriority(state.priority)
        
        -- Play new animation
        state.animation:Play(state.fadeTime)
        
        print("Playing state animation:", stateName)
    end
end

function DynamicAnimationSystem:stopAnimationByPriority(priority)
    for stateName, state in pairs(self.animationStates) do
        if state.animation and state.priority == priority then
            state.animation:Stop(0.1)
        end
    end
end

function DynamicAnimationSystem:addAnimationEvent(stateName, keyframeName, callback)
    if not self.animationEvents[stateName] then
        self.animationEvents[stateName] = {}
    end
    
    self.animationEvents[stateName][keyframeName] = callback
    print("Added animation event:", stateName, "->", keyframeName)
end

function DynamicAnimationSystem:blendAnimations(animation1, animation2, blendWeight, fadeTime)
    fadeTime = fadeTime or 0.5
    blendWeight = blendWeight or 0.5
    
    if self.animations[animation1] and self.animations[animation2] then
        self.animations[animation1]:Play(fadeTime, 1 - blendWeight)
        self.animations[animation2]:Play(fadeTime, blendWeight)
        
        print("Blending animations:", animation1, "and", animation2, "weight:", blendWeight)
    end
end

-- 3. CHARACTER CUSTOMIZATION SYSTEM
print("\\n3. DEMONSTRATING CHARACTER CUSTOMIZATION...")

local CharacterCustomizer = {}
CharacterCustomizer.__index = CharacterCustomizer

function CharacterCustomizer.new(character)
    local self = setmetatable({}, CharacterCustomizer)
    self.character = character
    self.humanoid = character:WaitForChild("Humanoid")
    self.bodyColors = {}
    self.bodyScales = {}
    self.accessories = {}
    self.clothing = {}
    
    return self
end

function CharacterCustomizer:setBodyColor(bodyPart, color)
    self.bodyColors[bodyPart] = color
    self.humanoid[bodyPart .. "Color"] = color
    print("Set", bodyPart, "color to:", color)
end

function CharacterCustomizer:setAllBodyColors(colors)
    local bodyParts = {"Head", "Torso", "LeftArm", "RightArm", "LeftLeg", "RightLeg"}
    
    for _, part in ipairs(bodyParts) do
        if colors[part] then
            self:setBodyColor(part, colors[part])
        end
    end
end

function CharacterCustomizer:setBodyScale(scaleType, value)
    self.bodyScales[scaleType] = value
    self.humanoid[scaleType] = value
    print("Set", scaleType, "to:", value)
end

function CharacterCustomizer:setAllBodyScales(scales)
    local scaleTypes = {
        "HeadScale", "BodyWidthScale", "BodyHeightScale", "BodyDepthScale",
        "BodyProportionScale", "BodyTypeScale"
    }
    
    for _, scaleType in ipairs(scaleTypes) do
        if scales[scaleType] then
            self:setBodyScale(scaleType, scales[scaleType])
        end
    end
end

function CharacterCustomizer:addAccessory(accessoryId, attachmentPoint)
    attachmentPoint = attachmentPoint or "HatAttachment"
    
    local success, accessory = pcall(function()
        return InsertService:LoadAsset(accessoryId)
    end)
    
    if success and accessory then
        local accessoryObject = accessory:GetChildren()[1]
        if accessoryObject and accessoryObject:IsA("Accessory") then
            accessoryObject.Parent = self.character
            self.accessories[accessoryObject.Name] = accessoryObject
            print("Added accessory:", accessoryObject.Name)
        end
    else
        warn("Failed to load accessory:", accessoryId)
    end
end

function CharacterCustomizer:removeAccessory(accessoryName)
    local accessory = self.accessories[accessoryName]
    if accessory then
        accessory:Destroy()
        self.accessories[accessoryName] = nil
        print("Removed accessory:", accessoryName)
    end
end

function CharacterCustomizer:setClothing(clothingType, clothingId)
    clothingType = clothingType:lower()
    
    if clothingType == "shirt" then
        self.humanoid:SetShirt(clothingId)
    elseif clothingType == "pants" then
        self.humanoid:SetPants(clothingId)
    elseif clothingType == "tshirt" then
        self.humanoid:SetTShirt(clothingId)
    end
    
    self.clothing[clothingType] = clothingId
    print("Set", clothingType, "to:", clothingId)
end

function CharacterCustomizer:applyPreset(presetName)
    if presetName == "robot" then
        self:setAllBodyColors({
            Head = Color3.fromRGB(200, 200, 200),
            Torso = Color3.fromRGB(150, 150, 150),
            LeftArm = Color3.fromRGB(200, 200, 200),
            RightArm = Color3.fromRGB(200, 200, 200),
            LeftLeg = Color3.fromRGB(200, 200, 200),
            RightLeg = Color3.fromRGB(200, 200, 200)
        })
        
        self:setAllBodyScales({
            HeadScale = 1.2,
            BodyWidthScale = 1.1,
            BodyHeightScale = 1.1
        })
        
    elseif presetName == "giant" then
        self:setAllBodyScales({
            HeadScale = 1.5,
            BodyWidthScale = 1.3,
            BodyHeightScale = 1.4,
            BodyDepthScale = 1.2
        })
        
    elseif presetName == "tiny" then
        self:setAllBodyScales({
            HeadScale = 0.8,
            BodyWidthScale = 0.7,
            BodyHeightScale = 0.6,
            BodyDepthScale = 0.8
        })
    end
    
    print("Applied preset:", presetName)
end

function CharacterCustomizer:randomizeAppearance()
    -- Random body colors
    local colors = {
        Color3.fromRGB(255, 220, 177),  -- Light skin
        Color3.fromRGB(241, 194, 125),  -- Medium skin
        Color3.fromRGB(198, 134, 66),   -- Dark skin
        Color3.fromRGB(141, 85, 36),    -- Very dark skin
        Color3.fromRGB(255, 255, 255),  -- White
        Color3.fromRGB(0, 0, 0)         -- Black
    }
    
    local bodyParts = {"Head", "Torso", "LeftArm", "RightArm", "LeftLeg", "RightLeg"}
    for _, part in ipairs(bodyParts) do
        self:setBodyColor(part, colors[math.random(1, #colors)])
    end
    
    -- Random body scales
    self:setAllBodyScales({
        HeadScale = math.random(80, 120) / 100,
        BodyWidthScale = math.random(80, 120) / 100,
        BodyHeightScale = math.random(80, 120) / 100,
        BodyDepthScale = math.random(80, 120) / 100
    })
    
    print("Randomized character appearance!")
end

-- 4. DEMO THE SYSTEMS
print("\\n4. RUNNING ANIMATION AND CUSTOMIZATION DEMONSTRATIONS...")

local player = Players.LocalPlayer
player.CharacterAdded:Connect(function(character)
    -- Create animation controller
    local animController = BasicAnimationController.new(character)
    
    -- Create dynamic animation system
    local animSystem = DynamicAnimationSystem.new(character)
    
    -- Create customizer
    local customizer = CharacterCustomizer.new(character)
    
    -- Test basic customization
    wait(1)
    print("\\n--- Testing Character Customization ---")
    customizer:setBodyColor("Head", Color3.fromRGB(255, 0, 0))
    
    wait(1)
    customizer:setBodyScale("HeadScale", 1.5)
    
    wait(1)
    customizer:applyPreset("giant")
    
    wait(2)
    customizer:randomizeAppearance()
    
    -- Test animation events
    wait(1)
    print("\\n--- Testing Animation Events ---")
    -- animSystem:addAnimationEvent("attacking", "hit", function()
    --     print("Attack hit!")
    -- end)
    
    -- Test state changes
    wait(1)
    print("\\n--- Testing Animation States ---")
    -- animSystem:setState("idle")
    
    -- wait(2)
    -- animSystem:setState("walking")
    
    -- wait(2)
    -- animSystem:setState("running")
    
    -- wait(2)
    -- animSystem:setState("jumping")
    
    print("\\nAnimation and customization systems ready!")
    print("Note: Actual animations require valid animation IDs")
end)

print("\\n=== CHARACTER ANIMATION SYSTEMS DEMO COMPLETE ===")
print("You've learned character animations and customization systems!")`,
    challenge: {
      tests: [
        { description: 'Load an animation using LoadAnimation', type: 'code_contains', value: 'LoadAnimation' },
        { description: 'Play an animation with Play method', type: 'code_contains', value: 'Play' },
        { description: 'Set character body colors', type: 'code_contains', value: 'Color' }
      ],
      hints: [
        'Use animator:LoadAnimation() to load animations onto characters',
        'Use animationTrack:Play() to start playing animations',
        'Use humanoid.HeadColor, humanoid.TorsoColor, etc. to set body colors',
        'Use humanoid.HeadScale, humanoid.BodyWidthScale, etc. to modify body proportions',
        'Connect to animation events like KeyframeReached and Stopped'
      ],
      successMessage: 'Outstanding! You now understand character animation and customization systems. These are essential for creating engaging character-based games!'
    }
  },

  // === CAMERA & VIEWPORT SYSTEMS ===
  'camera-basics': {
    title: 'Camera Basics & Control',
    description: 'Master camera manipulation, positioning, and basic camera systems in Roblox',
    sections: [
      {
        title: 'Understanding Camera Properties',
        content: `The Camera object controls what players see in Roblox. Understanding camera properties is essential for creating engaging gameplay experiences.

**Key Camera Properties:**
- **CFrame**: Position and rotation of the camera
- **FieldOfView**: How wide the camera's view is (default: 70)
- **CameraType**: How the camera behaves (Scriptable, Fixed, etc.)
- **CameraSubject**: What the camera follows (usually the character)
- **Focus**: Where the camera looks (CFrame)

**Camera Methods:**
- **SetCFrame()**: Set camera position and rotation
- **LookAt()**: Make camera look at a specific point
- **Interpolate()**: Smoothly move camera between positions`,
        codeExample: `-- Basic camera manipulation

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local camera = workspace.CurrentCamera

-- Basic camera setup
camera.CameraType = Enum.CameraType.Scriptable
camera.FieldOfView = 80

-- Set camera position
camera.CFrame = CFrame.new(0, 10, 0) * CFrame.Angles(math.rad(-30), 0, 0)

-- Make camera look at origin
camera:SetCFrame(CFrame.lookAt(Vector3.new(0, 10, 10), Vector3.new(0, 0, 0)))

print("Camera setup complete!")
print("Camera position:", camera.CFrame.Position)
print("Field of view:", camera.FieldOfView)`,
        color: 'blue'
      },
      {
        title: 'Camera Movement & Smooth Transitions',
        content: `Smooth camera movements create professional-looking games. Learn to create cinematic camera effects and smooth transitions.

**Camera Movement Techniques:**
- **Tweening**: Smooth interpolation between positions
- **Lerping**: Linear interpolation for smooth movement
- **Orbiting**: Circular camera movement around a target
- **Following**: Camera that follows a moving object

**Advanced Camera Features:**
- **Camera Shake**: Add screen shake effects
- **Zoom Effects**: Dynamic field of view changes
- **Camera Constraints**: Limit camera movement areas`,
        codeExample: `-- Advanced camera movement system

local CameraController = {}
CameraController.__index = CameraController

function CameraController.new()
    local self = setmetatable({}, CameraController)
    self.camera = workspace.CurrentCamera
    self.targetPosition = Vector3.new(0, 0, 0)
    self.targetLookAt = Vector3.new(0, 0, 0)
    self.smoothness = 0.1
    self.shakeIntensity = 0
    self.shakeDuration = 0
    self.shakeTimer = 0
    
    return self
end

function CameraController:setTarget(position, lookAt)
    self.targetPosition = position
    self.targetLookAt = lookAt or position
end

function CameraController:smoothMoveTo(position, lookAt, duration)
    duration = duration or 2
    
    local startCFrame = self.camera.CFrame
    local endCFrame = CFrame.lookAt(position, lookAt or position)
    
    local tween = TweenService:Create(self.camera,
        TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {CFrame = endCFrame}
    )
    
    tween:Play()
    print("Smooth camera movement started")
end

function CameraController:orbit(target, radius, height, speed)
    speed = speed or 1
    local angle = 0
    
    local connection
    connection = RunService.Heartbeat:Connect(function(deltaTime)
        angle = angle + speed * deltaTime
        
        local x = target.X + math.cos(angle) * radius
        local z = target.Z + math.sin(angle) * radius
        local y = target.Y + height
        
        local position = Vector3.new(x, y, z)
        self.camera.CFrame = CFrame.lookAt(position, target)
    end)
    
    return connection
end

function CameraController:addShake(intensity, duration)
    self.shakeIntensity = intensity
    self.shakeDuration = duration
    self.shakeTimer = 0
    print("Camera shake added:", intensity, "for", duration, "seconds")
end

function CameraController:update(deltaTime)
    -- Handle camera shake
    if self.shakeTimer < self.shakeDuration then
        self.shakeTimer = self.shakeTimer + deltaTime
        
        local shakeX = (math.random() - 0.5) * self.shakeIntensity
        local shakeY = (math.random() - 0.5) * self.shakeIntensity
        local shakeZ = (math.random() - 0.5) * self.shakeIntensity
        
        local shakeOffset = Vector3.new(shakeX, shakeY, shakeZ)
        local currentCFrame = self.camera.CFrame
        self.camera.CFrame = currentCFrame + shakeOffset
    end
    
    -- Smooth camera following
    if self.targetPosition then
        local currentPosition = self.camera.CFrame.Position
        local newPosition = currentPosition:Lerp(self.targetPosition, self.smoothness)
        
        if self.targetLookAt then
            self.camera.CFrame = CFrame.lookAt(newPosition, self.targetLookAt)
        end
    end
end

-- Example usage
local cameraController = CameraController.new()

-- Test smooth movement
cameraController:smoothMoveTo(Vector3.new(0, 20, 20), Vector3.new(0, 0, 0), 3)

wait(4)

-- Test orbiting
local orbitConnection = cameraController:orbit(Vector3.new(0, 0, 0), 15, 10, 2)

wait(5)
orbitConnection:Disconnect()

-- Test camera shake
cameraController:addShake(2, 3)

-- Update camera in heartbeat
RunService.Heartbeat:Connect(function(deltaTime)
    cameraController:update(deltaTime)
end)`,
        color: 'green'
      },
      {
        title: 'Custom Camera Modes',
        content: `Different games need different camera behaviors. Learn to create custom camera modes for various gameplay scenarios.

**Camera Mode Types:**
- **First Person**: Camera inside the character's head
- **Third Person**: Camera behind the character
- **Top Down**: Camera looking down from above
- **Cinematic**: Camera for cutscenes and cinematics
- **Free Cam**: Player-controlled camera movement

**Camera Mode Features:**
- **Mouse Look**: Camera rotation with mouse input
- **Camera Collision**: Prevent camera from going through walls
- **Camera Smoothing**: Reduce camera jitter and stuttering`,
        codeExample: `-- Custom camera modes system

local CameraModes = {}
CameraModes.__index = CameraModes

function CameraModes.new()
    local self = setmetatable({}, CameraModes)
    self.camera = workspace.CurrentCamera
    self.currentMode = "third_person"
    self.modes = {}
    self.mouseSensitivity = 0.002
    self.cameraOffset = Vector3.new(0, 2, 8)
    self.cameraCollision = true
    
    self:setupModes()
    return self
end

function CameraModes:setupModes()
    self.modes = {
        first_person = {
            offset = Vector3.new(0, 1.5, 0),
            collision = false,
            mouseLook = true
        },
        third_person = {
            offset = Vector3.new(0, 2, 8),
            collision = true,
            mouseLook = false
        },
        top_down = {
            offset = Vector3.new(0, 20, 0),
            collision = false,
            mouseLook = false
        },
        cinematic = {
            offset = Vector3.new(0, 5, 15),
            collision = false,
            mouseLook = false
        }
    }
end

function CameraModes:setMode(modeName)
    if self.modes[modeName] then
        self.currentMode = modeName
        print("Camera mode changed to:", modeName)
    end
end

function CameraModes:updateCamera(character)
    if not character then return end
    
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    local mode = self.modes[self.currentMode]
    local targetPosition = humanoidRootPart.Position + mode.offset
    
    -- Handle camera collision
    if mode.collision then
        targetPosition = self:handleCameraCollision(humanoidRootPart.Position, targetPosition)
    end
    
    -- Set camera position
    if self.currentMode == "first_person" then
        self.camera.CFrame = CFrame.new(targetPosition, humanoidRootPart.Position + humanoidRootPart.CFrame.LookVector * 10)
    else
        self.camera.CFrame = CFrame.lookAt(targetPosition, humanoidRootPart.Position)
    end
end

function CameraModes:handleCameraCollision(characterPosition, cameraPosition)
    local direction = (cameraPosition - characterPosition).Unit
    local distance = (cameraPosition - characterPosition).Magnitude
    
    local raycastParams = RaycastParams.new()
    raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
    raycastParams.FilterDescendantsInstances = {workspace.CurrentCamera}
    
    local raycastResult = workspace:Raycast(characterPosition, direction * distance, raycastParams)
    
    if raycastResult then
        return raycastResult.Position - direction * 2
    end
    
    return cameraPosition
end

function CameraModes:enableMouseLook(enabled)
    local mode = self.modes[self.currentMode]
    mode.mouseLook = enabled
    print("Mouse look:", enabled and "enabled" or "disabled")
end

function CameraModes:setMouseSensitivity(sensitivity)
    self.mouseSensitivity = sensitivity
    print("Mouse sensitivity set to:", sensitivity)
end

-- Example usage
local cameraModes = CameraModes.new()

-- Test different camera modes
cameraModes:setMode("third_person")

wait(2)
cameraModes:setMode("first_person")

wait(2)
cameraModes:setMode("top_down")

wait(2)
cameraModes:setMode("cinematic")

-- Update camera
local player = Players.LocalPlayer
player.CharacterAdded:Connect(function(character)
    RunService.Heartbeat:Connect(function()
        cameraModes:updateCamera(character)
    end)
end)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Camera Basics & Control - Comprehensive Learning Example
-- Master camera manipulation and control systems in Roblox

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")

print("=== CAMERA BASICS & CONTROL DEMO ===")
print("Learning camera manipulation and control systems...")

-- 1. BASIC CAMERA MANIPULATION
print("\\n1. DEMONSTRATING BASIC CAMERA PROPERTIES...")

local function setupBasicCamera()
    local camera = workspace.CurrentCamera
    
    -- Basic camera setup
    camera.CameraType = Enum.CameraType.Scriptable
    camera.FieldOfView = 80
    
    -- Set camera position
    camera.CFrame = CFrame.new(0, 10, 0) * CFrame.Angles(math.rad(-30), 0, 0)
    
    print("Basic camera setup complete!")
    print("Camera position:", camera.CFrame.Position)
    print("Field of view:", camera.FieldOfView)
    print("Camera type:", camera.CameraType.Name)
end

-- 2. ADVANCED CAMERA MOVEMENT SYSTEM
print("\\n2. DEMONSTRATING ADVANCED CAMERA MOVEMENT...")

local AdvancedCameraController = {}
AdvancedCameraController.__index = AdvancedCameraController

function AdvancedCameraController.new()
    local self = setmetatable({}, AdvancedCameraController)
    self.camera = workspace.CurrentCamera
    self.targetPosition = Vector3.new(0, 0, 0)
    self.targetLookAt = Vector3.new(0, 0, 0)
    self.smoothness = 0.1
    self.shakeIntensity = 0
    self.shakeDuration = 0
    self.shakeTimer = 0
    self.orbitTarget = nil
    self.orbitRadius = 10
    self.orbitHeight = 5
    self.orbitSpeed = 1
    self.orbitAngle = 0
    self.orbitConnection = nil
    
    return self
end

function AdvancedCameraController:setTarget(position, lookAt)
    self.targetPosition = position
    self.targetLookAt = lookAt or position
    print("Camera target set to:", position)
end

function AdvancedCameraController:smoothMoveTo(position, lookAt, duration)
    duration = duration or 2
    
    local startCFrame = self.camera.CFrame
    local endCFrame = CFrame.lookAt(position, lookAt or position)
    
    local tween = TweenService:Create(self.camera,
        TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {CFrame = endCFrame}
    )
    
    tween:Play()
    print("Smooth camera movement to:", position, "over", duration, "seconds")
end

function AdvancedCameraController:orbit(target, radius, height, speed)
    speed = speed or 1
    self.orbitTarget = target
    self.orbitRadius = radius
    self.orbitHeight = height
    self.orbitSpeed = speed
    self.orbitAngle = 0
    
    if self.orbitConnection then
        self.orbitConnection:Disconnect()
    end
    
    self.orbitConnection = RunService.Heartbeat:Connect(function(deltaTime)
        self.orbitAngle = self.orbitAngle + speed * deltaTime
        
        local x = target.X + math.cos(self.orbitAngle) * radius
        local z = target.Z + math.sin(self.orbitAngle) * radius
        local y = target.Y + height
        
        local position = Vector3.new(x, y, z)
        self.camera.CFrame = CFrame.lookAt(position, target)
    end)
    
    print("Camera orbiting started around:", target, "radius:", radius)
    return self.orbitConnection
end

function AdvancedCameraController:stopOrbit()
    if self.orbitConnection then
        self.orbitConnection:Disconnect()
        self.orbitConnection = nil
        print("Camera orbiting stopped")
    end
end

function AdvancedCameraController:addShake(intensity, duration)
    self.shakeIntensity = intensity
    self.shakeDuration = duration
    self.shakeTimer = 0
    print("Camera shake added - intensity:", intensity, "duration:", duration)
end

function AdvancedCameraController:zoom(fov, duration)
    duration = duration or 1
    
    local tween = TweenService:Create(self.camera,
        TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {FieldOfView = fov}
    )
    
    tween:Play()
    print("Camera zoom to FOV:", fov)
end

function AdvancedCameraController:update(deltaTime)
    -- Handle camera shake
    if self.shakeTimer < self.shakeDuration then
        self.shakeTimer = self.shakeTimer + deltaTime
        
        local shakeX = (math.random() - 0.5) * self.shakeIntensity
        local shakeY = (math.random() - 0.5) * self.shakeIntensity
        local shakeZ = (math.random() - 0.5) * self.shakeIntensity
        
        local shakeOffset = Vector3.new(shakeX, shakeY, shakeZ)
        local currentCFrame = self.camera.CFrame
        self.camera.CFrame = currentCFrame + shakeOffset
    end
    
    -- Smooth camera following (only if not orbiting)
    if self.targetPosition and not self.orbitConnection then
        local currentPosition = self.camera.CFrame.Position
        local newPosition = currentPosition:Lerp(self.targetPosition, self.smoothness)
        
        if self.targetLookAt then
            self.camera.CFrame = CFrame.lookAt(newPosition, self.targetLookAt)
        end
    end
end

-- 3. CUSTOM CAMERA MODES SYSTEM
print("\\n3. DEMONSTRATING CUSTOM CAMERA MODES...")

local CustomCameraModes = {}
CustomCameraModes.__index = CustomCameraModes

function CustomCameraModes.new()
    local self = setmetatable({}, CustomCameraModes)
    self.camera = workspace.CurrentCamera
    self.currentMode = "third_person"
    self.modes = {}
    self.mouseSensitivity = 0.002
    self.cameraOffset = Vector3.new(0, 2, 8)
    self.cameraCollision = true
    self.mouseLookEnabled = false
    
    self:setupModes()
    return self
end

function CustomCameraModes:setupModes()
    self.modes = {
        first_person = {
            offset = Vector3.new(0, 1.5, 0),
            collision = false,
            mouseLook = true,
            fov = 70
        },
        third_person = {
            offset = Vector3.new(0, 2, 8),
            collision = true,
            mouseLook = false,
            fov = 80
        },
        top_down = {
            offset = Vector3.new(0, 20, 0),
            collision = false,
            mouseLook = false,
            fov = 60
        },
        cinematic = {
            offset = Vector3.new(0, 5, 15),
            collision = false,
            mouseLook = false,
            fov = 50
        },
        free_cam = {
            offset = Vector3.new(0, 0, 0),
            collision = false,
            mouseLook = true,
            fov = 90
        }
    }
end

function CustomCameraModes:setMode(modeName)
    if self.modes[modeName] then
        self.currentMode = modeName
        local mode = self.modes[modeName]
        
        -- Set camera properties for this mode
        self.camera.FieldOfView = mode.fov
        self.mouseLookEnabled = mode.mouseLook
        
        print("Camera mode changed to:", modeName)
        print("FOV:", mode.fov, "Mouse Look:", mode.mouseLook)
    end
end

function CustomCameraModes:updateCamera(character)
    if not character then return end
    
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    local mode = self.modes[self.currentMode]
    local targetPosition = humanoidRootPart.Position + mode.offset
    
    -- Handle camera collision
    if mode.collision then
        targetPosition = self:handleCameraCollision(humanoidRootPart.Position, targetPosition)
    end
    
    -- Set camera position based on mode
    if self.currentMode == "first_person" then
        self.camera.CFrame = CFrame.new(targetPosition, humanoidRootPart.Position + humanoidRootPart.CFrame.LookVector * 10)
    elseif self.currentMode == "top_down" then
        self.camera.CFrame = CFrame.new(targetPosition, humanoidRootPart.Position)
    else
        self.camera.CFrame = CFrame.lookAt(targetPosition, humanoidRootPart.Position)
    end
end

function CustomCameraModes:handleCameraCollision(characterPosition, cameraPosition)
    local direction = (cameraPosition - characterPosition).Unit
    local distance = (cameraPosition - characterPosition).Magnitude
    
    local raycastParams = RaycastParams.new()
    raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
    raycastParams.FilterDescendantsInstances = {workspace.CurrentCamera}
    
    local raycastResult = workspace:Raycast(characterPosition, direction * distance, raycastParams)
    
    if raycastResult then
        return raycastResult.Position - direction * 2
    end
    
    return cameraPosition
end

function CustomCameraModes:enableMouseLook(enabled)
    self.mouseLookEnabled = enabled
    print("Mouse look:", enabled and "enabled" or "disabled")
end

function CustomCameraModes:setMouseSensitivity(sensitivity)
    self.mouseSensitivity = sensitivity
    print("Mouse sensitivity set to:", sensitivity)
end

-- 4. DEMO THE CAMERA SYSTEMS
print("\\n4. RUNNING CAMERA SYSTEM DEMONSTRATIONS...")

-- Setup basic camera
setupBasicCamera()

-- Create advanced camera controller
local cameraController = AdvancedCameraController.new()

-- Create custom camera modes
local cameraModes = CustomCameraModes.new()

-- Test camera movements
wait(1)
print("\\n--- Testing Camera Movements ---")
cameraController:smoothMoveTo(Vector3.new(0, 20, 20), Vector3.new(0, 0, 0), 3)

wait(4)
cameraController:zoom(50, 2)

wait(3)
cameraController:zoom(80, 2)

wait(3)
cameraController:addShake(3, 2)

wait(3)
print("\\n--- Testing Camera Orbiting ---")
local orbitConnection = cameraController:orbit(Vector3.new(0, 0, 0), 15, 10, 2)

wait(5)
cameraController:stopOrbit()

wait(1)
print("\\n--- Testing Camera Modes ---")
cameraModes:setMode("third_person")

wait(2)
cameraModes:setMode("first_person")

wait(2)
cameraModes:setMode("top_down")

wait(2)
cameraModes:setMode("cinematic")

wait(2)
cameraModes:setMode("free_cam")

-- Update camera systems
local player = Players.LocalPlayer
player.CharacterAdded:Connect(function(character)
    RunService.Heartbeat:Connect(function(deltaTime)
        cameraController:update(deltaTime)
        cameraModes:updateCamera(character)
    end)
end)

print("\\n=== CAMERA BASICS & CONTROL DEMO COMPLETE ===")
print("You've learned camera manipulation and control systems!")`,
    challenge: {
      tests: [
        { description: 'Set camera CFrame to control position and rotation', type: 'code_contains', value: 'CFrame' },
        { description: 'Use TweenService to create smooth camera movements', type: 'code_contains', value: 'TweenService' },
        { description: 'Change camera FieldOfView for zoom effects', type: 'code_contains', value: 'FieldOfView' }
      ],
      hints: [
        'Use camera.CFrame to set camera position and rotation',
        'Use TweenService:Create() to animate camera properties smoothly',
        'Use camera.FieldOfView to control zoom level',
        'Use CFrame.lookAt() to make camera look at specific points',
        'Use RunService.Heartbeat to update camera continuously'
      ],
      successMessage: 'Excellent! You now understand camera control and manipulation. These skills are essential for creating engaging gameplay experiences!'
    }
  },

  'viewport-frames': {
    title: 'Viewport Frames & 3D UI',
    description: 'Create 3D objects in 2D UI using ViewportFrames for immersive interfaces',
    sections: [
      {
        title: 'Understanding ViewportFrames',
        content: `ViewportFrames allow you to render 3D objects directly in 2D GUI, creating immersive UI elements and previews.

**ViewportFrame Properties:**
- **CurrentCamera**: Camera that renders the 3D scene
- **LightDirection**: Direction of lighting in the viewport
- **LightColor**: Color of the lighting
- **Ambient**: Ambient lighting color
- **Size**: Size of the viewport in pixels

**ViewportFrame Methods:**
- **SetViewport()**: Set what 3D objects to render
- **GetViewport()**: Get current viewport contents
- **SetCamera()**: Set the camera for the viewport`,
        codeExample: `-- Basic ViewportFrame setup

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ViewportFrame
local viewportFrame = Instance.new("ViewportFrame")
viewportFrame.Size = UDim2.new(0, 300, 0, 200)
viewportFrame.Position = UDim2.new(0.5, -150, 0.5, -100)
viewportFrame.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
viewportFrame.BorderSizePixel = 2
viewportFrame.BorderColor3 = Color3.fromRGB(255, 255, 255)
viewportFrame.Parent = playerGui

-- Create camera for viewport
local camera = Instance.new("Camera")
camera.Parent = viewportFrame
viewportFrame.CurrentCamera = camera

-- Create a 3D object to display
local part = Instance.new("Part")
part.Size = Vector3.new(4, 4, 4)
part.Material = Enum.Material.Neon
part.Color = Color3.fromRGB(0, 255, 255)
part.Parent = viewportFrame

-- Position camera
camera.CFrame = CFrame.new(0, 0, 10) * CFrame.Angles(0, 0, 0)

-- Set lighting
viewportFrame.LightDirection = Vector3.new(-1, -1, -1)
viewportFrame.LightColor = Color3.fromRGB(255, 255, 255)
viewportFrame.Ambient = Color3.fromRGB(50, 50, 50)

print("ViewportFrame created with 3D object!")`,
        color: 'blue'
      },
      {
        title: 'Interactive 3D UI Elements',
        content: `Create interactive 3D UI elements that respond to user input and provide rich visual feedback.

**Interactive Features:**
- **Mouse Interaction**: Detect mouse clicks on 3D objects
- **Hover Effects**: Visual feedback when hovering over objects
- **3D Animations**: Animate 3D objects in the viewport
- **Dynamic Content**: Change 3D content based on game state

**Advanced Viewport Techniques:**
- **Multiple Objects**: Display multiple 3D objects
- **Camera Controls**: Allow users to control the viewport camera
- **Lighting Effects**: Dynamic lighting and shadows
- **Particle Effects**: Add particle systems to viewports`,
        codeExample: `-- Interactive 3D UI system

local InteractiveViewport = {}
InteractiveViewport.__index = InteractiveViewport

function InteractiveViewport.new(parent, size, position)
    local self = setmetatable({}, InteractiveViewport)
    
    -- Create ViewportFrame
    self.viewportFrame = Instance.new("ViewportFrame")
    self.viewportFrame.Size = size or UDim2.new(0, 400, 0, 300)
    self.viewportFrame.Position = position or UDim2.new(0, 0, 0, 0)
    self.viewportFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
    self.viewportFrame.BorderSizePixel = 0
    self.viewportFrame.Parent = parent
    
    -- Create camera
    self.camera = Instance.new("Camera")
    self.camera.Parent = self.viewportFrame
    self.viewportFrame.CurrentCamera = self.camera
    
    -- Setup lighting
    self.viewportFrame.LightDirection = Vector3.new(-1, -1, -1)
    self.viewportFrame.LightColor = Color3.fromRGB(255, 255, 255)
    self.viewportFrame.Ambient = Color3.fromRGB(100, 100, 100)
    
    -- Object storage
    self.objects = {}
    self.selectedObject = nil
    
    return self
end

function InteractiveViewport:addObject(name, object)
    object.Parent = self.viewportFrame
    self.objects[name] = object
    print("Added object to viewport:", name)
end

function InteractiveViewport:removeObject(name)
    local object = self.objects[name]
    if object then
        object:Destroy()
        self.objects[name] = nil
        print("Removed object from viewport:", name)
    end
end

function InteractiveViewport:setCameraPosition(position, lookAt)
    if lookAt then
        self.camera.CFrame = CFrame.lookAt(position, lookAt)
    else
        self.camera.CFrame = CFrame.new(position)
    end
end

function InteractiveViewport:animateObject(name, targetCFrame, duration)
    local object = self.objects[name]
    if object then
        duration = duration or 1
        
        local tween = TweenService:Create(object,
            TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
            {CFrame = targetCFrame}
        )
        
        tween:Play()
        print("Animating object:", name)
    end
end

function InteractiveViewport:rotateObject(name, rotation, duration)
    local object = self.objects[name]
    if object then
        duration = duration or 1
        
        local targetCFrame = object.CFrame * CFrame.Angles(rotation.X, rotation.Y, rotation.Z)
        self:animateObject(name, targetCFrame, duration)
    end
end

function InteractiveViewport:setObjectColor(name, color)
    local object = self.objects[name]
    if object then
        object.Color = color
        print("Set object color:", name, "to", color)
    end
end

function InteractiveViewport:createPreviewObject(objectType, properties)
    properties = properties or {}
    
    local object
    if objectType == "part" then
        object = Instance.new("Part")
        object.Size = properties.size or Vector3.new(2, 2, 2)
        object.Material = properties.material or Enum.Material.Plastic
        object.Color = properties.color or Color3.fromRGB(100, 100, 100)
    elseif objectType == "model" then
        object = Instance.new("Model")
        -- Add basic model structure
        local part = Instance.new("Part")
        part.Size = Vector3.new(2, 2, 2)
        part.Material = Enum.Material.Neon
        part.Color = Color3.fromRGB(0, 255, 255)
        part.Parent = object
    end
    
    return object
end

-- Example usage
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create interactive viewport
local viewport = InteractiveViewport.new(playerGui, 
    UDim2.new(0, 400, 0, 300), 
    UDim2.new(0.5, -200, 0.5, -150)
)

-- Add some objects
local cube = viewport:createPreviewObject("part", {
    size = Vector3.new(3, 3, 3),
    color = Color3.fromRGB(255, 0, 0),
    material = Enum.Material.Neon
})
viewport:addObject("cube", cube)

local sphere = Instance.new("Part")
sphere.Shape = Enum.PartType.Ball
sphere.Size = Vector3.new(2, 2, 2)
sphere.Color = Color3.fromRGB(0, 255, 0)
sphere.Material = Enum.Material.Neon
viewport:addObject("sphere", sphere)

-- Position objects
cube.CFrame = CFrame.new(-3, 0, 0)
sphere.CFrame = CFrame.new(3, 0, 0)

-- Set camera position
viewport:setCameraPosition(Vector3.new(0, 5, 10), Vector3.new(0, 0, 0))

-- Animate objects
wait(1)
viewport:rotateObject("cube", Vector3.new(0, math.rad(180), 0), 2)

wait(2)
viewport:animateObject("sphere", CFrame.new(3, 2, 0), 1)

wait(2)
viewport:setObjectColor("cube", Color3.fromRGB(0, 0, 255))`,
        color: 'green'
      },
      {
        title: 'Advanced Viewport Applications',
        content: `ViewportFrames have many advanced applications in game development, from inventory previews to character customization.

**Advanced Applications:**
- **Inventory Previews**: Show 3D models of items
- **Character Customization**: Preview character changes
- **Map Previews**: Display 3D maps and environments
- **Achievement Displays**: Show 3D rewards and trophies
- **Mini Games**: Create 3D mini-games within UI

**Performance Considerations:**
- **Object Limits**: Limit number of objects in viewport
- **LOD Systems**: Use different detail levels
- **Culling**: Hide objects outside camera view
- **Optimization**: Use efficient rendering techniques`,
        codeExample: `-- Advanced ViewportFrame applications

local AdvancedViewport = {}
AdvancedViewport.__index = AdvancedViewport

function AdvancedViewport.new(parent, size, position)
    local self = setmetatable({}, AdvancedViewport)
    
    -- Create main ViewportFrame
    self.viewportFrame = Instance.new("ViewportFrame")
    self.viewportFrame.Size = size or UDim2.new(0, 500, 0, 400)
    self.viewportFrame.Position = position or UDim2.new(0, 0, 0, 0)
    self.viewportFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
    self.viewportFrame.BorderSizePixel = 0
    self.viewportFrame.Parent = parent
    
    -- Create camera
    self.camera = Instance.new("Camera")
    self.camera.Parent = self.viewportFrame
    self.viewportFrame.CurrentCamera = self.camera
    
    -- Advanced lighting setup
    self.viewportFrame.LightDirection = Vector3.new(-1, -1, -1)
    self.viewportFrame.LightColor = Color3.fromRGB(255, 255, 255)
    self.viewportFrame.Ambient = Color3.fromRGB(80, 80, 80)
    
    -- Object management
    self.objects = {}
    self.objectCount = 0
    self.maxObjects = 50
    
    return self
end

function AdvancedViewport:createInventoryPreview(itemData)
    local model = Instance.new("Model")
    
    -- Create item based on data
    if itemData.type == "weapon" then
        local handle = Instance.new("Part")
        handle.Size = Vector3.new(0.5, 3, 0.5)
        handle.Material = Enum.Material.Wood
        handle.Color = Color3.fromRGB(139, 69, 19)
        handle.Parent = model
        
        local blade = Instance.new("Part")
        blade.Size = Vector3.new(0.2, 2, 0.1)
        blade.Material = Enum.Material.Metal
        blade.Color = Color3.fromRGB(192, 192, 192)
        blade.CFrame = handle.CFrame * CFrame.new(0, 2.5, 0)
        blade.Parent = model
        
    elseif itemData.type == "armor" then
        local armor = Instance.new("Part")
        armor.Size = Vector3.new(2, 3, 1)
        armor.Material = Enum.Material.Metal
        armor.Color = itemData.color or Color3.fromRGB(100, 100, 100)
        armor.Parent = model
        
    elseif itemData.type == "potion" then
        local bottle = Instance.new("Part")
        bottle.Size = Vector3.new(1, 2, 1)
        bottle.Shape = Enum.PartType.Cylinder
        bottle.Material = Enum.Material.Glass
        bottle.Color = itemData.color or Color3.fromRGB(255, 0, 255)
        bottle.Parent = model
        
        local liquid = Instance.new("Part")
        liquid.Size = Vector3.new(0.8, 1.5, 0.8)
        liquid.Shape = Enum.PartType.Cylinder
        liquid.Material = Enum.Material.ForceField
        liquid.Color = itemData.liquidColor or Color3.fromRGB(0, 255, 0)
        liquid.CFrame = bottle.CFrame * CFrame.new(0, -0.25, 0)
        liquid.Parent = model
    end
    
    return model
end

function AdvancedViewport:createCharacterPreview(characterData)
    local model = Instance.new("Model")
    
    -- Create basic character structure
    local head = Instance.new("Part")
    head.Name = "Head"
    head.Size = Vector3.new(2, 1, 1)
    head.Shape = Enum.PartType.Ball
    head.Color = characterData.skinColor or Color3.fromRGB(255, 220, 177)
    head.Parent = model
    
    local torso = Instance.new("Part")
    torso.Name = "Torso"
    torso.Size = Vector3.new(2, 2, 1)
    torso.Color = characterData.torsoColor or Color3.fromRGB(255, 220, 177)
    torso.CFrame = head.CFrame * CFrame.new(0, -1.5, 0)
    torso.Parent = model
    
    -- Add clothing if specified
    if characterData.shirt then
        local shirt = Instance.new("Part")
        shirt.Size = Vector3.new(2.1, 2.1, 1.1)
        shirt.Color = characterData.shirtColor or Color3.fromRGB(0, 0, 255)
        shirt.CFrame = torso.CFrame
        shirt.Material = Enum.Material.Fabric
        shirt.Parent = model
    end
    
    return model
end

function AdvancedViewport:addObject(name, object)
    if self.objectCount >= self.maxObjects then
        warn("Viewport object limit reached!")
        return false
    end
    
    object.Parent = self.viewportFrame
    self.objects[name] = object
    self.objectCount = self.objectCount + 1
    
    print("Added object to viewport:", name, "Total objects:", self.objectCount)
    return true
end

function AdvancedViewport:removeObject(name)
    local object = self.objects[name]
    if object then
        object:Destroy()
        self.objects[name] = nil
        self.objectCount = self.objectCount - 1
        print("Removed object from viewport:", name, "Total objects:", self.objectCount)
    end
end

function AdvancedViewport:setCameraMode(mode, target)
    if mode == "orbit" then
        self:orbitCamera(target or Vector3.new(0, 0, 0))
    elseif mode == "fixed" then
        self.camera.CFrame = CFrame.new(0, 5, 10) * CFrame.Angles(0, 0, 0)
    elseif mode == "follow" then
        self:followTarget(target)
    end
end

function AdvancedViewport:orbitCamera(target)
    local radius = 10
    local height = 5
    local angle = 0
    local speed = 1
    
    local connection
    connection = game:GetService("RunService").Heartbeat:Connect(function(deltaTime)
        angle = angle + speed * deltaTime
        
        local x = target.X + math.cos(angle) * radius
        local z = target.Z + math.sin(angle) * radius
        local y = target.Y + height
        
        local position = Vector3.new(x, y, z)
        self.camera.CFrame = CFrame.lookAt(position, target)
    end)
    
    return connection
end

function AdvancedViewport:followTarget(target)
    if target then
        local connection
        connection = game:GetService("RunService").Heartbeat:Connect(function()
            local position = target.Position + Vector3.new(0, 5, 10)
            self.camera.CFrame = CFrame.lookAt(position, target.Position)
        end)
        
        return connection
    end
end

-- Example usage
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create advanced viewport
local viewport = AdvancedViewport.new(playerGui, 
    UDim2.new(0, 500, 0, 400), 
    UDim2.new(0.5, -250, 0.5, -200)
)

-- Create inventory preview
local swordData = {
    type = "weapon",
    name = "Iron Sword",
    damage = 25
}
local swordPreview = viewport:createInventoryPreview(swordData)
viewport:addObject("sword", swordPreview)

-- Create character preview
local characterData = {
    skinColor = Color3.fromRGB(255, 220, 177),
    shirt = true,
    shirtColor = Color3.fromRGB(0, 100, 200)
}
local characterPreview = viewport:createCharacterPreview(characterData)
characterPreview:SetPrimaryPartCFrame(CFrame.new(0, 0, 0))
viewport:addObject("character", characterPreview)

-- Set camera to orbit mode
viewport:setCameraMode("orbit", Vector3.new(0, 0, 0))`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Viewport Frames & 3D UI - Comprehensive Learning Example
-- Master ViewportFrames and 3D UI elements in Roblox

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")

print("=== VIEWPORT FRAMES & 3D UI DEMO ===")
print("Learning ViewportFrames and 3D UI systems...")

-- 1. BASIC VIEWPORTFRAME SETUP
print("\\n1. DEMONSTRATING BASIC VIEWPORTFRAME...")

local function createBasicViewport(parent)
    local viewportFrame = Instance.new("ViewportFrame")
    viewportFrame.Size = UDim2.new(0, 300, 0, 200)
    viewportFrame.Position = UDim2.new(0.5, -150, 0.3, -100)
    viewportFrame.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
    viewportFrame.BorderSizePixel = 2
    viewportFrame.BorderColor3 = Color3.fromRGB(255, 255, 255)
    viewportFrame.Parent = parent
    
    -- Create camera
    local camera = Instance.new("Camera")
    camera.Parent = viewportFrame
    viewportFrame.CurrentCamera = camera
    
    -- Create 3D object
    local part = Instance.new("Part")
    part.Size = Vector3.new(4, 4, 4)
    part.Material = Enum.Material.Neon
    part.Color = Color3.fromRGB(0, 255, 255)
    part.Parent = viewportFrame
    
    -- Position camera
    camera.CFrame = CFrame.new(0, 0, 10) * CFrame.Angles(0, 0, 0)
    
    -- Setup lighting
    viewportFrame.LightDirection = Vector3.new(-1, -1, -1)
    viewportFrame.LightColor = Color3.fromRGB(255, 255, 255)
    viewportFrame.Ambient = Color3.fromRGB(50, 50, 50)
    
    print("Basic ViewportFrame created!")
    return viewportFrame, camera, part
end

-- 2. INTERACTIVE 3D UI SYSTEM
print("\\n2. DEMONSTRATING INTERACTIVE 3D UI...")

local InteractiveViewport = {}
InteractiveViewport.__index = InteractiveViewport

function InteractiveViewport.new(parent, size, position)
    local self = setmetatable({}, InteractiveViewport)
    
    -- Create ViewportFrame
    self.viewportFrame = Instance.new("ViewportFrame")
    self.viewportFrame.Size = size or UDim2.new(0, 400, 0, 300)
    self.viewportFrame.Position = position or UDim2.new(0, 0, 0, 0)
    self.viewportFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
    self.viewportFrame.BorderSizePixel = 0
    self.viewportFrame.Parent = parent
    
    -- Create camera
    self.camera = Instance.new("Camera")
    self.camera.Parent = self.viewportFrame
    self.viewportFrame.CurrentCamera = self.camera
    
    -- Setup lighting
    self.viewportFrame.LightDirection = Vector3.new(-1, -1, -1)
    self.viewportFrame.LightColor = Color3.fromRGB(255, 255, 255)
    self.viewportFrame.Ambient = Color3.fromRGB(100, 100, 100)
    
    -- Object storage
    self.objects = {}
    self.selectedObject = nil
    
    return self
end

function InteractiveViewport:addObject(name, object)
    object.Parent = self.viewportFrame
    self.objects[name] = object
    print("Added object to viewport:", name)
end

function InteractiveViewport:removeObject(name)
    local object = self.objects[name]
    if object then
        object:Destroy()
        self.objects[name] = nil
        print("Removed object from viewport:", name)
    end
end

function InteractiveViewport:setCameraPosition(position, lookAt)
    if lookAt then
        self.camera.CFrame = CFrame.lookAt(position, lookAt)
    else
        self.camera.CFrame = CFrame.new(position)
    end
end

function InteractiveViewport:animateObject(name, targetCFrame, duration)
    local object = self.objects[name]
    if object then
        duration = duration or 1
        
        local tween = TweenService:Create(object,
            TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
            {CFrame = targetCFrame}
        )
        
        tween:Play()
        print("Animating object:", name)
    end
end

function InteractiveViewport:rotateObject(name, rotation, duration)
    local object = self.objects[name]
    if object then
        duration = duration or 1
        
        local targetCFrame = object.CFrame * CFrame.Angles(rotation.X, rotation.Y, rotation.Z)
        self:animateObject(name, targetCFrame, duration)
    end
end

function InteractiveViewport:setObjectColor(name, color)
    local object = self.objects[name]
    if object then
        object.Color = color
        print("Set object color:", name, "to", color)
    end
end

function InteractiveViewport:createPreviewObject(objectType, properties)
    properties = properties or {}
    
    local object
    if objectType == "part" then
        object = Instance.new("Part")
        object.Size = properties.size or Vector3.new(2, 2, 2)
        object.Material = properties.material or Enum.Material.Plastic
        object.Color = properties.color or Color3.fromRGB(100, 100, 100)
    elseif objectType == "model" then
        object = Instance.new("Model")
        -- Add basic model structure
        local part = Instance.new("Part")
        part.Size = Vector3.new(2, 2, 2)
        part.Material = Enum.Material.Neon
        part.Color = Color3.fromRGB(0, 255, 255)
        part.Parent = object
    end
    
    return object
end

-- 3. ADVANCED VIEWPORT APPLICATIONS
print("\\n3. DEMONSTRATING ADVANCED VIEWPORT APPLICATIONS...")

local AdvancedViewport = {}
AdvancedViewport.__index = AdvancedViewport

function AdvancedViewport.new(parent, size, position)
    local self = setmetatable({}, AdvancedViewport)
    
    -- Create main ViewportFrame
    self.viewportFrame = Instance.new("ViewportFrame")
    self.viewportFrame.Size = size or UDim2.new(0, 500, 0, 400)
    self.viewportFrame.Position = position or UDim2.new(0, 0, 0, 0)
    self.viewportFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
    self.viewportFrame.BorderSizePixel = 0
    self.viewportFrame.Parent = parent
    
    -- Create camera
    self.camera = Instance.new("Camera")
    self.camera.Parent = self.viewportFrame
    self.viewportFrame.CurrentCamera = self.camera
    
    -- Advanced lighting setup
    self.viewportFrame.LightDirection = Vector3.new(-1, -1, -1)
    self.viewportFrame.LightColor = Color3.fromRGB(255, 255, 255)
    self.viewportFrame.Ambient = Color3.fromRGB(80, 80, 80)
    
    -- Object management
    self.objects = {}
    self.objectCount = 0
    self.maxObjects = 50
    
    return self
end

function AdvancedViewport:createInventoryPreview(itemData)
    local model = Instance.new("Model")
    
    -- Create item based on data
    if itemData.type == "weapon" then
        local handle = Instance.new("Part")
        handle.Size = Vector3.new(0.5, 3, 0.5)
        handle.Material = Enum.Material.Wood
        handle.Color = Color3.fromRGB(139, 69, 19)
        handle.Parent = model
        
        local blade = Instance.new("Part")
        blade.Size = Vector3.new(0.2, 2, 0.1)
        blade.Material = Enum.Material.Metal
        blade.Color = Color3.fromRGB(192, 192, 192)
        blade.CFrame = handle.CFrame * CFrame.new(0, 2.5, 0)
        blade.Parent = model
        
    elseif itemData.type == "armor" then
        local armor = Instance.new("Part")
        armor.Size = Vector3.new(2, 3, 1)
        armor.Material = Enum.Material.Metal
        armor.Color = itemData.color or Color3.fromRGB(100, 100, 100)
        armor.Parent = model
        
    elseif itemData.type == "potion" then
        local bottle = Instance.new("Part")
        bottle.Size = Vector3.new(1, 2, 1)
        bottle.Shape = Enum.PartType.Cylinder
        bottle.Material = Enum.Material.Glass
        bottle.Color = itemData.color or Color3.fromRGB(255, 0, 255)
        bottle.Parent = model
        
        local liquid = Instance.new("Part")
        liquid.Size = Vector3.new(0.8, 1.5, 0.8)
        liquid.Shape = Enum.PartType.Cylinder
        liquid.Material = Enum.Material.ForceField
        liquid.Color = itemData.liquidColor or Color3.fromRGB(0, 255, 0)
        liquid.CFrame = bottle.CFrame * CFrame.new(0, -0.25, 0)
        liquid.Parent = model
    end
    
    return model
end

function AdvancedViewport:createCharacterPreview(characterData)
    local model = Instance.new("Model")
    
    -- Create basic character structure
    local head = Instance.new("Part")
    head.Name = "Head"
    head.Size = Vector3.new(2, 1, 1)
    head.Shape = Enum.PartType.Ball
    head.Color = characterData.skinColor or Color3.fromRGB(255, 220, 177)
    head.Parent = model
    
    local torso = Instance.new("Part")
    torso.Name = "Torso"
    torso.Size = Vector3.new(2, 2, 1)
    torso.Color = characterData.torsoColor or Color3.fromRGB(255, 220, 177)
    torso.CFrame = head.CFrame * CFrame.new(0, -1.5, 0)
    torso.Parent = model
    
    -- Add clothing if specified
    if characterData.shirt then
        local shirt = Instance.new("Part")
        shirt.Size = Vector3.new(2.1, 2.1, 1.1)
        shirt.Color = characterData.shirtColor or Color3.fromRGB(0, 0, 255)
        shirt.CFrame = torso.CFrame
        shirt.Material = Enum.Material.Fabric
        shirt.Parent = model
    end
    
    return model
end

function AdvancedViewport:addObject(name, object)
    if self.objectCount >= self.maxObjects then
        warn("Viewport object limit reached!")
        return false
    end
    
    object.Parent = self.viewportFrame
    self.objects[name] = object
    self.objectCount = self.objectCount + 1
    
    print("Added object to viewport:", name, "Total objects:", self.objectCount)
    return true
end

function AdvancedViewport:removeObject(name)
    local object = self.objects[name]
    if object then
        object:Destroy()
        self.objects[name] = nil
        self.objectCount = self.objectCount - 1
        print("Removed object from viewport:", name, "Total objects:", self.objectCount)
    end
end

function AdvancedViewport:setCameraMode(mode, target)
    if mode == "orbit" then
        self:orbitCamera(target or Vector3.new(0, 0, 0))
    elseif mode == "fixed" then
        self.camera.CFrame = CFrame.new(0, 5, 10) * CFrame.Angles(0, 0, 0)
    elseif mode == "follow" then
        self:followTarget(target)
    end
end

function AdvancedViewport:orbitCamera(target)
    local radius = 10
    local height = 5
    local angle = 0
    local speed = 1
    
    local connection
    connection = RunService.Heartbeat:Connect(function(deltaTime)
        angle = angle + speed * deltaTime
        
        local x = target.X + math.cos(angle) * radius
        local z = target.Z + math.sin(angle) * radius
        local y = target.Y + height
        
        local position = Vector3.new(x, y, z)
        self.camera.CFrame = CFrame.lookAt(position, target)
    end)
    
    return connection
end

function AdvancedViewport:followTarget(target)
    if target then
        local connection
        connection = RunService.Heartbeat:Connect(function()
            local position = target.Position + Vector3.new(0, 5, 10)
            self.camera.CFrame = CFrame.lookAt(position, target.Position)
        end)
        
        return connection
    end
end

-- 4. DEMO THE VIEWPORT SYSTEMS
print("\\n4. RUNNING VIEWPORT SYSTEM DEMONSTRATIONS...")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create basic viewport
local basicViewport, basicCamera, basicPart = createBasicViewport(playerGui)

-- Create interactive viewport
local interactiveViewport = InteractiveViewport.new(playerGui, 
    UDim2.new(0, 400, 0, 300), 
    UDim2.new(0.5, -200, 0.7, -150)
)

-- Add objects to interactive viewport
local cube = interactiveViewport:createPreviewObject("part", {
    size = Vector3.new(3, 3, 3),
    color = Color3.fromRGB(255, 0, 0),
    material = Enum.Material.Neon
})
interactiveViewport:addObject("cube", cube)

local sphere = Instance.new("Part")
sphere.Shape = Enum.PartType.Ball
sphere.Size = Vector3.new(2, 2, 2)
sphere.Color = Color3.fromRGB(0, 255, 0)
sphere.Material = Enum.Material.Neon
interactiveViewport:addObject("sphere", sphere)

-- Position objects
cube.CFrame = CFrame.new(-3, 0, 0)
sphere.CFrame = CFrame.new(3, 0, 0)

-- Set camera position
interactiveViewport:setCameraPosition(Vector3.new(0, 5, 10), Vector3.new(0, 0, 0))

-- Create advanced viewport
local advancedViewport = AdvancedViewport.new(playerGui, 
    UDim2.new(0, 500, 0, 400), 
    UDim2.new(0, 0, 0, 0)
)

-- Create inventory preview
local swordData = {
    type = "weapon",
    name = "Iron Sword",
    damage = 25
}
local swordPreview = advancedViewport:createInventoryPreview(swordData)
advancedViewport:addObject("sword", swordPreview)

-- Create character preview
local characterData = {
    skinColor = Color3.fromRGB(255, 220, 177),
    shirt = true,
    shirtColor = Color3.fromRGB(0, 100, 200)
}
local characterPreview = advancedViewport:createCharacterPreview(characterData)
characterPreview:SetPrimaryPartCFrame(CFrame.new(0, 0, 0))
advancedViewport:addObject("character", characterPreview)

-- Set camera to orbit mode
advancedViewport:setCameraMode("orbit", Vector3.new(0, 0, 0))

-- Animate objects in interactive viewport
wait(1)
print("\\n--- Testing Object Animations ---")
interactiveViewport:rotateObject("cube", Vector3.new(0, math.rad(180), 0), 2)

wait(2)
interactiveViewport:animateObject("sphere", CFrame.new(3, 2, 0), 1)

wait(2)
interactiveViewport:setObjectColor("cube", Color3.fromRGB(0, 0, 255))

print("\\n=== VIEWPORT FRAMES & 3D UI DEMO COMPLETE ===")
print("You've learned ViewportFrames and 3D UI systems!")`,
    challenge: {
      tests: [
        { description: 'Create a ViewportFrame with a camera', type: 'code_contains', value: 'ViewportFrame' },
        { description: 'Add 3D objects to the viewport', type: 'code_contains', value: 'Parent' },
        { description: 'Set up lighting for the viewport', type: 'code_contains', value: 'LightDirection' }
      ],
      hints: [
        'Use Instance.new("ViewportFrame") to create viewport frames',
        'Create a Camera object and set it as the viewport\'s CurrentCamera',
        'Use viewportFrame.LightDirection and viewportFrame.LightColor for lighting',
        'Add 3D objects to the viewport by setting their Parent to the viewport',
        'Use TweenService to animate objects within viewports'
      ],
      successMessage: 'Outstanding! You now understand ViewportFrames and 3D UI systems. These are powerful tools for creating immersive interfaces!'
    }
  },

  // === ADVANCED GAME MECHANICS LESSONS ===
  'ai-and-pathfinding': {
    title: 'AI & Pathfinding Systems',
    description: 'Create intelligent NPCs, enemy AI, and pathfinding systems for dynamic gameplay',
    sections: [
      {
        title: 'Basic AI Concepts',
        content: `Artificial Intelligence (AI) in games makes NPCs behave intelligently. Good AI creates engaging and challenging gameplay.

**AI Components:**
- **State Machines**: Different behaviors for different situations
- **Decision Making**: Choosing actions based on game state
- **Movement**: How NPCs move around the world
- **Combat**: How NPCs fight and defend themselves
- **Reaction**: How NPCs respond to player actions

**Common AI Patterns:**
- **Idle State**: NPC waits and looks around
- **Patrol State**: NPC moves along a predefined path
- **Chase State**: NPC follows the player
- **Attack State**: NPC fights the player
- **Flee State**: NPC runs away from danger`,
        codeExample: `-- Basic AI state machine example

local AIState = {
    IDLE = "idle",
    PATROL = "patrol", 
    CHASE = "chase",
    ATTACK = "attack",
    FLEE = "flee"
}

local NPC = {}
NPC.__index = NPC

function NPC.new(character)
    local self = setmetatable({}, NPC)
    self.character = character
    self.humanoid = character:FindFirstChild("Humanoid")
    self.currentState = AIState.IDLE
    self.target = nil
    self.patrolPoints = {}
    self.currentPatrolIndex = 1
    self.health = 100
    self.maxHealth = 100
    return self
end

function NPC:update()
    if self.currentState == AIState.IDLE then
        self:idleBehavior()
    elseif self.currentState == AIState.PATROL then
        self:patrolBehavior()
    elseif self.currentState == AIState.CHASE then
        self:chaseBehavior()
    elseif self.currentState == AIState.ATTACK then
        self:attackBehavior()
    elseif self.currentState == AIState.FLEE then
        self:fleeBehavior()
    end
end

function NPC:idleBehavior()
    -- Look for players nearby
    local players = game.Players:GetPlayers()
    for _, player in ipairs(players) do
        if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
            local distance = (self.character.HumanoidRootPart.Position - player.Character.HumanoidRootPart.Position).Magnitude
            if distance < 50 then
                self.target = player
                self.currentState = AIState.CHASE
                return
            end
        end
    end
    
    -- If no players found, start patrolling
    if #self.patrolPoints > 0 then
        self.currentState = AIState.PATROL
    end
end

function NPC:patrolBehavior()
    if #self.patrolPoints == 0 then
        self.currentState = AIState.IDLE
        return
    end
    
    local targetPoint = self.patrolPoints[self.currentPatrolIndex]
    local distance = (self.character.HumanoidRootPart.Position - targetPoint).Magnitude
    
    if distance < 5 then
        -- Reached patrol point, move to next
        self.currentPatrolIndex = self.currentPatrolIndex + 1
        if self.currentPatrolIndex > #self.patrolPoints then
            self.currentPatrolIndex = 1
        end
    else
        -- Move towards patrol point
        self.humanoid:MoveTo(targetPoint)
    end
end`,
        color: 'blue'
      },
      {
        title: 'Pathfinding with PathfindingService',
        content: `Roblox's PathfindingService helps NPCs navigate around obstacles intelligently. It's essential for creating realistic movement.

**PathfindingService Features:**
- **FindPathAsync()**: Calculates a path from point A to point B
- **Waypoint System**: Breaks paths into manageable waypoints
- **Obstacle Avoidance**: Automatically avoids walls and obstacles
- **Dynamic Updates**: Can recalculate paths when obstacles change

**Pathfinding Process:**
1. Call PathfindingService:FindPathAsync() with start and end positions
2. Get the waypoints from the returned path
3. Move the NPC through each waypoint in sequence
4. Handle pathfinding failures gracefully

**Best Practices:**
- Cache paths when possible to improve performance
- Set reasonable timeout values for pathfinding
- Handle cases where no path is found
- Update paths when the target moves significantly`,
        codeExample: `-- Advanced pathfinding example

local PathfindingService = game:GetService("PathfindingService")
local RunService = game:GetService("RunService")

local PathfindingAI = {}
PathfindingAI.__index = PathfindingAI

function PathfindingAI.new(character)
    local self = setmetatable({}, PathfindingAI)
    self.character = character
    self.humanoid = character:FindFirstChild("Humanoid")
    self.currentPath = nil
    self.waypoints = {}
    self.currentWaypointIndex = 1
    self.targetPosition = nil
    self.pathfindingTimeout = 5 -- seconds
    return self
end

function PathfindingAI:findPathTo(targetPosition)
    self.targetPosition = targetPosition
    
    -- Create pathfinding parameters
    local pathfindingParams = PathfindingService:CreatePath({
        AgentRadius = 2,
        AgentHeight = 5,
        AgentCanJump = true,
        WaypointSpacing = 4
    })
    
    -- Calculate path
    local success, errorMessage = pcall(function()
        self.currentPath = pathfindingParams:ComputeAsync(
            self.character.HumanoidRootPart.Position,
            targetPosition
        )
    end)
    
    if success and self.currentPath then
        self.waypoints = self.currentPath:GetWaypoints()
        self.currentWaypointIndex = 1
        print("Path found with", #self.waypoints, "waypoints")
        return true
    else
        warn("Pathfinding failed:", errorMessage)
        return false
    end
end

function PathfindingAI:followPath()
    if #self.waypoints == 0 then
        return false
    end
    
    local currentWaypoint = self.waypoints[self.currentWaypointIndex]
    local distance = (self.character.HumanoidRootPart.Position - currentWaypoint.Position).Magnitude
    
    if distance < 3 then
        -- Reached waypoint, move to next
        self.currentWaypointIndex = self.currentWaypointIndex + 1
        
        if self.currentWaypointIndex > #self.waypoints then
            -- Reached end of path
            print("Reached destination!")
            return false
        end
    else
        -- Move towards current waypoint
        if currentWaypoint.Action == Enum.PathWaypointAction.Jump then
            self.humanoid.Jump = true
        end
        
        self.humanoid:MoveTo(currentWaypoint.Position)
    end
    
    return true
end

function PathfindingAI:update()
    if self.targetPosition then
        local distanceToTarget = (self.character.HumanoidRootPart.Position - self.targetPosition).Magnitude
        
        if distanceToTarget > 10 then
            -- Target is far, recalculate path
            self:findPathTo(self.targetPosition)
        end
        
        if #self.waypoints > 0 then
            local stillFollowing = self:followPath()
            if not stillFollowing then
                self.targetPosition = nil
            end
        end
    end
end

-- Example usage
local npc = workspace:FindFirstChild("NPC")
if npc then
    local pathfindingAI = PathfindingAI.new(npc)
    
    -- Find path to a target position
    local targetPosition = Vector3.new(100, 0, 100)
    pathfindingAI:findPathTo(targetPosition)
    
    -- Update AI every frame
    local connection
    connection = RunService.Heartbeat:Connect(function()
        pathfindingAI:update()
    end)
end`,
        color: 'green'
      },
      {
        title: 'Advanced AI Behaviors',
        content: `Professional games use complex AI behaviors that make NPCs feel alive and intelligent.

**Advanced AI Features:**
- **Group Behavior**: NPCs work together as teams
- **Dynamic Decision Making**: AI adapts based on game state
- **Emotional States**: NPCs have moods and personalities
- **Learning**: AI improves over time
- **Communication**: NPCs share information with each other

**Behavior Trees:**
Behavior trees are a powerful way to organize complex AI logic. They use a tree structure where each node represents a behavior or decision.

**AI Communication:**
- **Shared Knowledge**: NPCs share information about player location
- **Coordination**: NPCs coordinate attacks and movements
- **Alerts**: NPCs warn each other about threats
- **Roles**: Different NPCs have different responsibilities`,
        codeExample: `-- Advanced AI behavior system

local BehaviorTree = {}
BehaviorTree.__index = BehaviorTree

-- Behavior tree node types
local NodeType = {
    SEQUENCE = "sequence",    -- Run children in order, fail if any child fails
    SELECTOR = "selector",    -- Run children until one succeeds
    PARALLEL = "parallel",    -- Run all children simultaneously
    CONDITION = "condition",  -- Check a condition
    ACTION = "action"         -- Execute an action
}

local BehaviorNode = {}
BehaviorNode.__index = BehaviorNode

function BehaviorNode.new(nodeType, name, func)
    local self = setmetatable({}, BehaviorNode)
    self.type = nodeType
    self.name = name
    self.func = func
    self.children = {}
    self.status = "ready" -- ready, running, success, failure
    return self
end

function BehaviorNode:addChild(child)
    table.insert(self.children, child)
end

function BehaviorNode:execute(ai)
    if self.type == NodeType.CONDITION then
        local result = self.func(ai)
        self.status = result and "success" or "failure"
        return self.status
        
    elseif self.type == NodeType.ACTION then
        local result = self.func(ai)
        self.status = result and "success" or "failure"
        return self.status
        
    elseif self.type == NodeType.SEQUENCE then
        for _, child in ipairs(self.children) do
            local childStatus = child:execute(ai)
            if childStatus == "failure" then
                self.status = "failure"
                return "failure"
            elseif childStatus == "running" then
                self.status = "running"
                return "running"
            end
        end
        self.status = "success"
        return "success"
        
    elseif self.type == NodeType.SELECTOR then
        for _, child in ipairs(self.children) do
            local childStatus = child:execute(ai)
            if childStatus == "success" then
                self.status = "success"
                return "success"
            elseif childStatus == "running" then
                self.status = "running"
                return "running"
            end
        end
        self.status = "failure"
        return "failure"
    end
    
    return "failure"
end

-- AI Communication System
local AIController = {}
AIController.__index = AIController

function AIController.new()
    local self = setmetatable({}, AIController)
    self.npcs = {}
    self.sharedKnowledge = {
        playerLocation = nil,
        lastPlayerSeen = 0,
        alertLevel = 0,
        activeThreats = {}
    }
    return self
end

function AIController:addNPC(npc)
    table.insert(self.npcs, npc)
    npc.controller = self
end

function AIController:updateSharedKnowledge(key, value)
    self.sharedKnowledge[key] = value
    self.sharedKnowledge.lastUpdate = tick()
    
    -- Notify all NPCs of the update
    for _, npc in ipairs(self.npcs) do
        if npc.onKnowledgeUpdate then
            npc:onKnowledgeUpdate(key, value)
        end
    end
end

function AIController:getSharedKnowledge(key)
    return self.sharedKnowledge[key]
end

-- Advanced NPC with behavior tree
local AdvancedNPC = {}
AdvancedNPC.__index = AdvancedNPC

function AdvancedNPC.new(character)
    local self = setmetatable({}, AdvancedNPC)
    self.character = character
    self.humanoid = character:FindFirstChild("Humanoid")
    self.health = 100
    self.maxHealth = 100
    self.alertLevel = 0
    self.lastPlayerSeen = 0
    self.behaviorTree = self:createBehaviorTree()
    return self
end

function AdvancedNPC:createBehaviorTree()
    -- Create behavior tree
    local root = BehaviorNode.new(NodeType.SELECTOR, "root")
    
    -- Combat behavior
    local combatSequence = BehaviorNode.new(NodeType.SEQUENCE, "combat")
    local canSeePlayer = BehaviorNode.new(NodeType.CONDITION, "canSeePlayer", function(ai)
        return ai:canSeePlayer()
    end)
    local attackPlayer = BehaviorNode.new(NodeType.ACTION, "attackPlayer", function(ai)
        return ai:attackPlayer()
    end)
    
    combatSequence:addChild(canSeePlayer)
    combatSequence:addChild(attackPlayer)
    
    -- Patrol behavior
    local patrolSequence = BehaviorNode.new(NodeType.SEQUENCE, "patrol")
    local shouldPatrol = BehaviorNode.new(NodeType.CONDITION, "shouldPatrol", function(ai)
        return ai.alertLevel == 0
    end)
    local doPatrol = BehaviorNode.new(NodeType.ACTION, "doPatrol", function(ai)
        return ai:patrol()
    end)
    
    patrolSequence:addChild(shouldPatrol)
    patrolSequence:addChild(doPatrol)
    
    -- Alert behavior
    local alertSequence = BehaviorNode.new(NodeType.SEQUENCE, "alert")
    local isAlerted = BehaviorNode.new(NodeType.CONDITION, "isAlerted", function(ai)
        return ai.alertLevel > 0
    end)
    local searchForPlayer = BehaviorNode.new(NodeType.ACTION, "searchForPlayer", function(ai)
        return ai:searchForPlayer()
    end)
    
    alertSequence:addChild(isAlerted)
    alertSequence:addChild(searchForPlayer)
    
    -- Add behaviors to root
    root:addChild(combatSequence)
    root:addChild(alertSequence)
    root:addChild(patrolSequence)
    
    return root
end

function AdvancedNPC:canSeePlayer()
    local players = game.Players:GetPlayers()
    for _, player in ipairs(players) do
        if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
            local distance = (self.character.HumanoidRootPart.Position - player.Character.HumanoidRootPart.Position).Magnitude
            if distance < 30 then
                self.lastPlayerSeen = tick()
                if self.controller then
                    self.controller:updateSharedKnowledge("playerLocation", player.Character.HumanoidRootPart.Position)
                end
                return true
            end
        end
    end
    return false
end

function AdvancedNPC:attackPlayer()
    print("NPC is attacking player!")
    -- Implement attack logic here
    return true
end

function AdvancedNPC:patrol()
    print("NPC is patrolling...")
    -- Implement patrol logic here
    return true
end

function AdvancedNPC:searchForPlayer()
    print("NPC is searching for player...")
    -- Implement search logic here
    return true
end

function AdvancedNPC:update()
    self.behaviorTree:execute(self)
end

function AdvancedNPC:onKnowledgeUpdate(key, value)
    if key == "playerLocation" then
        self.alertLevel = 1
        print("NPC received player location update!")
    end
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- AI & Pathfinding Systems - Comprehensive Learning Example
-- Create intelligent NPCs and pathfinding systems for dynamic gameplay

local PathfindingService = game:GetService("PathfindingService")
local RunService = game:GetService("RunService")

print("=== AI & PATHFINDING SYSTEMS DEMO ===")
print("Learning to create intelligent NPCs...")

-- 1. BASIC AI STATE MACHINE
print("\\n1. DEMONSTRATING BASIC AI STATE MACHINE...")

local AIState = {
    IDLE = "idle",
    PATROL = "patrol",
    CHASE = "chase", 
    ATTACK = "attack",
    FLEE = "flee"
}

local BasicAI = {}
BasicAI.__index = BasicAI

function BasicAI.new(character)
    local self = setmetatable({}, BasicAI)
    self.character = character
    self.humanoid = character:FindFirstChild("Humanoid")
    self.currentState = AIState.IDLE
    self.target = nil
    self.patrolPoints = {
        Vector3.new(0, 0, 0),
        Vector3.new(20, 0, 0),
        Vector3.new(20, 0, 20),
        Vector3.new(0, 0, 20)
    }
    self.currentPatrolIndex = 1
    self.health = 100
    self.maxHealth = 100
    self.lastStateChange = tick()
    return self
end

function BasicAI:update()
    local currentTime = tick()
    
    -- State timeout (prevent getting stuck)
    if currentTime - self.lastStateChange > 10 then
        self:changeState(AIState.IDLE)
    end
    
    if self.currentState == AIState.IDLE then
        self:idleBehavior()
    elseif self.currentState == AIState.PATROL then
        self:patrolBehavior()
    elseif self.currentState == AIState.CHASE then
        self:chaseBehavior()
    elseif self.currentState == AIState.ATTACK then
        self:attackBehavior()
    elseif self.currentState == AIState.FLEE then
        self:fleeBehavior()
    end
end

function BasicAI:changeState(newState)
    if self.currentState ~= newState then
        print("AI state changed from", self.currentState, "to", newState)
        self.currentState = newState
        self.lastStateChange = tick()
    end
end

function BasicAI:idleBehavior()
    -- Look for players nearby
    local players = game.Players:GetPlayers()
    for _, player in ipairs(players) do
        if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
            local distance = (self.character.HumanoidRootPart.Position - player.Character.HumanoidRootPart.Position).Magnitude
            if distance < 50 then
                self.target = player
                self:changeState(AIState.CHASE)
                return
            end
        end
    end
    
    -- If no players found, start patrolling
    if #self.patrolPoints > 0 then
        self:changeState(AIState.PATROL)
    end
end

function BasicAI:patrolBehavior()
    if #self.patrolPoints == 0 then
        self:changeState(AIState.IDLE)
        return
    end
    
    local targetPoint = self.patrolPoints[self.currentPatrolIndex]
    local distance = (self.character.HumanoidRootPart.Position - targetPoint).Magnitude
    
    if distance < 5 then
        -- Reached patrol point, move to next
        self.currentPatrolIndex = self.currentPatrolIndex + 1
        if self.currentPatrolIndex > #self.patrolPoints then
            self.currentPatrolIndex = 1
        end
    else
        -- Move towards patrol point
        self.humanoid:MoveTo(targetPoint)
    end
end

function BasicAI:chaseBehavior()
    if not self.target or not self.target.Character or not self.target.Character:FindFirstChild("HumanoidRootPart") then
        self.target = nil
        self:changeState(AIState.IDLE)
        return
    end
    
    local distance = (self.character.HumanoidRootPart.Position - self.target.Character.HumanoidRootPart.Position).Magnitude
    
    if distance > 100 then
        -- Target too far, stop chasing
        self.target = nil
        self:changeState(AIState.IDLE)
    elseif distance < 10 then
        -- Close enough to attack
        self:changeState(AIState.ATTACK)
    else
        -- Continue chasing
        self.humanoid:MoveTo(self.target.Character.HumanoidRootPart.Position)
    end
end

function BasicAI:attackBehavior()
    if not self.target or not self.target.Character then
        self:changeState(AIState.IDLE)
        return
    end
    
    local distance = (self.character.HumanoidRootPart.Position - self.target.Character.HumanoidRootPart.Position).Magnitude
    
    if distance > 15 then
        -- Target moved away, chase again
        self:changeState(AIState.CHASE)
    else
        -- Attack the target
        print("AI is attacking target!")
        -- Implement attack logic here
    end
end

function BasicAI:fleeBehavior()
    -- Simple flee behavior - move away from target
    if self.target and self.target.Character and self.target.Character:FindFirstChild("HumanoidRootPart") then
        local direction = (self.character.HumanoidRootPart.Position - self.target.Character.HumanoidRootPart.Position).Unit
        local fleePosition = self.character.HumanoidRootPart.Position + direction * 50
        self.humanoid:MoveTo(fleePosition)
    end
    
    -- Check if we should stop fleeing
    if self.health > self.maxHealth * 0.5 then
        self:changeState(AIState.IDLE)
    end
end

-- 2. ADVANCED PATHFINDING AI
print("\\n2. DEMONSTRATING ADVANCED PATHFINDING...")

local PathfindingAI = {}
PathfindingAI.__index = PathfindingAI

function PathfindingAI.new(character)
    local self = setmetatable({}, PathfindingAI)
    self.character = character
    self.humanoid = character:FindFirstChild("Humanoid")
    self.currentPath = nil
    self.waypoints = {}
    self.currentWaypointIndex = 1
    self.targetPosition = nil
    self.pathfindingTimeout = 5
    self.lastPathUpdate = 0
    return self
end

function PathfindingAI:findPathTo(targetPosition)
    self.targetPosition = targetPosition
    
    -- Create pathfinding parameters
    local pathfindingParams = PathfindingService:CreatePath({
        AgentRadius = 2,
        AgentHeight = 5,
        AgentCanJump = true,
        WaypointSpacing = 4
    })
    
    -- Calculate path
    local success, errorMessage = pcall(function()
        self.currentPath = pathfindingParams:ComputeAsync(
            self.character.HumanoidRootPart.Position,
            targetPosition
        )
    end)
    
    if success and self.currentPath then
        self.waypoints = self.currentPath:GetWaypoints()
        self.currentWaypointIndex = 1
        self.lastPathUpdate = tick()
        print("Path found with", #self.waypoints, "waypoints")
        return true
    else
        warn("Pathfinding failed:", errorMessage)
        return false
    end
end

function PathfindingAI:followPath()
    if #self.waypoints == 0 then
        return false
    end
    
    local currentWaypoint = self.waypoints[self.currentWaypointIndex]
    local distance = (self.character.HumanoidRootPart.Position - currentWaypoint.Position).Magnitude
    
    if distance < 3 then
        -- Reached waypoint, move to next
        self.currentWaypointIndex = self.currentWaypointIndex + 1
        
        if self.currentWaypointIndex > #self.waypoints then
            -- Reached end of path
            print("Reached destination!")
            return false
        end
    else
        -- Move towards current waypoint
        if currentWaypoint.Action == Enum.PathWaypointAction.Jump then
            self.humanoid.Jump = true
        end
        
        self.humanoid:MoveTo(currentWaypoint.Position)
    end
    
    return true
end

function PathfindingAI:update()
    if self.targetPosition then
        local distanceToTarget = (self.character.HumanoidRootPart.Position - self.targetPosition).Magnitude
        
        -- Recalculate path if target is far or path is old
        if distanceToTarget > 10 or tick() - self.lastPathUpdate > self.pathfindingTimeout then
            self:findPathTo(self.targetPosition)
        end
        
        if #self.waypoints > 0 then
            local stillFollowing = self:followPath()
            if not stillFollowing then
                self.targetPosition = nil
            end
        end
    end
end

-- 3. BEHAVIOR TREE SYSTEM
print("\\n3. DEMONSTRATING BEHAVIOR TREE SYSTEM...")

local BehaviorTree = {}
BehaviorTree.__index = BehaviorTree

local NodeType = {
    SEQUENCE = "sequence",
    SELECTOR = "selector", 
    PARALLEL = "parallel",
    CONDITION = "condition",
    ACTION = "action"
}

local BehaviorNode = {}
BehaviorNode.__index = BehaviorNode

function BehaviorNode.new(nodeType, name, func)
    local self = setmetatable({}, BehaviorNode)
    self.type = nodeType
    self.name = name
    self.func = func
    self.children = {}
    self.status = "ready"
    return self
end

function BehaviorNode:addChild(child)
    table.insert(self.children, child)
end

function BehaviorNode:execute(ai)
    if self.type == NodeType.CONDITION then
        local result = self.func(ai)
        self.status = result and "success" or "failure"
        return self.status
        
    elseif self.type == NodeType.ACTION then
        local result = self.func(ai)
        self.status = result and "success" or "failure"
        return self.status
        
    elseif self.type == NodeType.SEQUENCE then
        for _, child in ipairs(self.children) do
            local childStatus = child:execute(ai)
            if childStatus == "failure" then
                self.status = "failure"
                return "failure"
            elseif childStatus == "running" then
                self.status = "running"
                return "running"
            end
        end
        self.status = "success"
        return "success"
        
    elseif self.type == NodeType.SELECTOR then
        for _, child in ipairs(self.children) do
            local childStatus = child:execute(ai)
            if childStatus == "success" then
                self.status = "success"
                return "success"
            elseif childStatus == "running" then
                self.status = "running"
                return "running"
            end
        end
        self.status = "failure"
        return "failure"
    end
    
    return "failure"
end

-- 4. AI COMMUNICATION SYSTEM
print("\\n4. DEMONSTRATING AI COMMUNICATION...")

local AIController = {}
AIController.__index = AIController

function AIController.new()
    local self = setmetatable({}, AIController)
    self.npcs = {}
    self.sharedKnowledge = {
        playerLocation = nil,
        lastPlayerSeen = 0,
        alertLevel = 0,
        activeThreats = {}
    }
    return self
end

function AIController:addNPC(npc)
    table.insert(self.npcs, npc)
    npc.controller = self
end

function AIController:updateSharedKnowledge(key, value)
    self.sharedKnowledge[key] = value
    self.sharedKnowledge.lastUpdate = tick()
    
    -- Notify all NPCs of the update
    for _, npc in ipairs(self.npcs) do
        if npc.onKnowledgeUpdate then
            npc:onKnowledgeUpdate(key, value)
        end
    end
end

function AIController:getSharedKnowledge(key)
    return self.sharedKnowledge[key]
end

-- 5. ADVANCED NPC WITH BEHAVIOR TREE
print("\\n5. DEMONSTRATING ADVANCED NPC...")

local AdvancedNPC = {}
AdvancedNPC.__index = AdvancedNPC

function AdvancedNPC.new(character)
    local self = setmetatable({}, AdvancedNPC)
    self.character = character
    self.humanoid = character:FindFirstChild("Humanoid")
    self.health = 100
    self.maxHealth = 100
    self.alertLevel = 0
    self.lastPlayerSeen = 0
    self.behaviorTree = self:createBehaviorTree()
    return self
end

function AdvancedNPC:createBehaviorTree()
    local root = BehaviorNode.new(NodeType.SELECTOR, "root")
    
    -- Combat behavior
    local combatSequence = BehaviorNode.new(NodeType.SEQUENCE, "combat")
    local canSeePlayer = BehaviorNode.new(NodeType.CONDITION, "canSeePlayer", function(ai)
        return ai:canSeePlayer()
    end)
    local attackPlayer = BehaviorNode.new(NodeType.ACTION, "attackPlayer", function(ai)
        return ai:attackPlayer()
    end)
    
    combatSequence:addChild(canSeePlayer)
    combatSequence:addChild(attackPlayer)
    
    -- Patrol behavior
    local patrolSequence = BehaviorNode.new(NodeType.SEQUENCE, "patrol")
    local shouldPatrol = BehaviorNode.new(NodeType.CONDITION, "shouldPatrol", function(ai)
        return ai.alertLevel == 0
    end)
    local doPatrol = BehaviorNode.new(NodeType.ACTION, "doPatrol", function(ai)
        return ai:patrol()
    end)
    
    patrolSequence:addChild(shouldPatrol)
    patrolSequence:addChild(doPatrol)
    
    -- Add behaviors to root
    root:addChild(combatSequence)
    root:addChild(patrolSequence)
    
    return root
end

function AdvancedNPC:canSeePlayer()
    local players = game.Players:GetPlayers()
    for _, player in ipairs(players) do
        if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
            local distance = (self.character.HumanoidRootPart.Position - player.Character.HumanoidRootPart.Position).Magnitude
            if distance < 30 then
                self.lastPlayerSeen = tick()
                if self.controller then
                    self.controller:updateSharedKnowledge("playerLocation", player.Character.HumanoidRootPart.Position)
                end
                return true
            end
        end
    end
    return false
end

function AdvancedNPC:attackPlayer()
    print("Advanced NPC is attacking player!")
    return true
end

function AdvancedNPC:patrol()
    print("Advanced NPC is patrolling...")
    return true
end

function AdvancedNPC:update()
    self.behaviorTree:execute(self)
end

function AdvancedNPC:onKnowledgeUpdate(key, value)
    if key == "playerLocation" then
        self.alertLevel = 1
        print("Advanced NPC received player location update!")
    end
end

-- 6. DEMO THE AI SYSTEMS
print("\\n6. RUNNING AI DEMONSTRATIONS...")

-- Create AI controller
local aiController = AIController.new()

-- Create demo NPCs (if they exist in workspace)
local npc1 = workspace:FindFirstChild("NPC1")
local npc2 = workspace:FindFirstChild("NPC2")

if npc1 then
    local basicAI = BasicAI.new(npc1)
    local pathfindingAI = PathfindingAI.new(npc1)
    local advancedNPC = AdvancedNPC.new(npc1)
    
    aiController:addNPC(advancedNPC)
    
    print("Created AI systems for NPC1")
    
    -- Demo pathfinding
    pathfindingAI:findPathTo(Vector3.new(100, 0, 100))
    
    -- Update AI systems
    local connection
    connection = RunService.Heartbeat:Connect(function()
        basicAI:update()
        pathfindingAI:update()
        advancedNPC:update()
    end)
end

if npc2 then
    local advancedNPC2 = AdvancedNPC.new(npc2)
    aiController:addNPC(advancedNPC2)
    print("Created AI systems for NPC2")
end

print("\\n=== AI & PATHFINDING DEMO COMPLETE ===")
print("You've learned to create intelligent NPCs and pathfinding systems!")`,
    challenge: {
      tests: [
        { description: 'Create an AI state machine', type: 'code_contains', value: 'AIState' },
        { description: 'Use PathfindingService for navigation', type: 'code_contains', value: 'PathfindingService' },
        { description: 'Implement behavior tree nodes', type: 'code_contains', value: 'BehaviorNode' }
      ],
      hints: [
        'Use state machines to organize AI behaviors',
        'Use PathfindingService:CreatePath() for intelligent navigation',
        'Implement behavior trees for complex AI decision making',
        'Use shared knowledge systems for AI communication',
        'Consider performance when updating AI systems'
      ],
      successMessage: 'Outstanding! You now understand AI and pathfinding systems. You can create intelligent NPCs that enhance gameplay!'
    }
  },

  // === ADVANCED GAME MECHANICS LESSONS ===
  'advanced-tweening-systems': {
    title: 'Advanced Tweening Systems',
    description: 'Master complex animation systems, tween chaining, and advanced TweenService techniques for professional Roblox games',
    sections: [
      {
        title: 'Understanding Tween Chaining and Sequences',
        content: `Tween chaining is a powerful technique that allows you to create complex, multi-step animations by connecting multiple tweens together. Instead of running animations simultaneously, chaining ensures that each animation waits for the previous one to complete before starting.

**Why Use Tween Chaining?**
- **Sequential Control**: Ensures animations happen in the exact order you want
- **Smooth Transitions**: No jarring overlaps or conflicts between animations
- **Professional Feel**: Creates polished, cinematic effects
- **Complex Behaviors**: Enables sophisticated animation sequences

**How It Works:**
The TweenInfo.Completed event fires when a tween finishes, allowing you to trigger the next animation in your sequence. This creates a chain reaction where each animation leads to the next.`,
        codeExample: `-- Basic tween chaining example
local TweenService = game:GetService("TweenService")

-- Create a part to animate
local part = Instance.new("Part")
part.Size = Vector3.new(2, 2, 2)
part.Position = Vector3.new(0, 5, 0)
part.Parent = workspace

-- Define tween information
local tweenInfo = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)

-- Step 1: Move the part to a new position
local moveTween = TweenService:Create(part, tweenInfo, {
    Position = Vector3.new(10, 5, 0)
})

-- Step 2: When movement completes, scale up the part
moveTween.Completed:Connect(function()
    local scaleTween = TweenService:Create(part, tweenInfo, {
        Size = Vector3.new(4, 4, 4)
    })
    scaleTween:Play()
    
    -- Step 3: When scaling completes, change color
    scaleTween.Completed:Connect(function()
        local colorTween = TweenService:Create(part, tweenInfo, {
            Color = Color3.fromRGB(255, 0, 0)
        })
        colorTween:Play()
    end)
end)

-- Start the animation chain
moveTween:Play()`,
        color: 'blue'
      },
      {
        title: 'Mastering Custom Easing Functions',
        content: `Easing functions control how animations accelerate and decelerate, creating different visual effects and feelings. Roblox provides many built-in easing styles, each with unique characteristics.

**Understanding Easing Parameters:**
- **Duration**: How long the animation takes (in seconds)
- **EasingStyle**: The mathematical curve of the animation
- **EasingDirection**: How the easing is applied (In, Out, InOut)

**Popular Easing Styles:**
- **Linear**: Constant speed, no acceleration
- **Quad/Cubic/Quart/Quint**: Increasingly dramatic acceleration curves
- **Bounce**: Creates a bouncing effect at the end
- **Elastic**: Creates a rubber band-like effect
- **Back**: Overshoots the target then settles back

**When to Use Each:**
- **Quad/Out**: Natural feeling for UI elements
- **Bounce**: Playful, game-like interactions
- **Elastic**: Attention-grabbing effects
- **Back**: Smooth, polished transitions`,
        codeExample: `-- Comprehensive easing demonstration
local TweenService = game:GetService("TweenService")

-- Create multiple parts to demonstrate different easing styles
local easingStyles = {
    {Enum.EasingStyle.Linear, "Linear - Constant Speed"},
    {Enum.EasingStyle.Quad, "Quad - Smooth Acceleration"},
    {Enum.EasingStyle.Bounce, "Bounce - Playful Bounce Effect"},
    {Enum.EasingStyle.Elastic, "Elastic - Rubber Band Effect"},
    {Enum.EasingStyle.Back, "Back - Overshoot and Settle"}
}

for i, styleData in ipairs(easingStyles) do
    local style, description = styleData[1], styleData[2]
    
    local part = Instance.new("Part")
    part.Size = Vector3.new(1, 1, 1)
    part.Position = Vector3.new(i * 3, 5, 0)
    part.Color = Color3.fromRGB(100 + i * 30, 100, 255)
    part.Parent = workspace
    
    -- Create tween with specific easing style
    local tweenInfo = TweenInfo.new(2, style, Enum.EasingDirection.Out)
    local tween = TweenService:Create(part, tweenInfo, {
        Position = Vector3.new(i * 3, 15, 0),
        Size = Vector3.new(2, 2, 2)
    })
    
    -- Add a label to show the easing type
    local billboardGui = Instance.new("BillboardGui")
    billboardGui.Size = UDim2.new(0, 200, 0, 50)
    billboardGui.Parent = part
    
    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.BackgroundTransparency = 1
    label.Text = description
    label.TextColor3 = Color3.fromRGB(255, 255, 255)
    label.TextScaled = true
    label.Parent = billboardGui
    
    -- Start the animation with a delay
    wait(i * 0.2)
    tween:Play()
end`,
        color: 'green'
      },
      {
        title: 'Professional Animation State Management',
        content: `Animation state management is crucial for creating smooth, conflict-free animations in complex games. Without proper state management, animations can overlap, conflict, or create jarring transitions.

**Why State Management Matters:**
- **Prevents Conflicts**: Ensures only one animation plays at a time
- **Smooth Transitions**: Allows for seamless switching between animation states
- **Performance**: Avoids unnecessary animation calculations
- **User Experience**: Creates predictable, polished interactions

**State Management Patterns:**
1. **Boolean States**: Simple on/off states for basic animations
2. **State Machines**: Complex systems with multiple states and transitions
3. **Animation Queues**: Systems that queue animations for sequential playback
4. **Priority Systems**: Animations with different priority levels

**Best Practices:**
- Always stop previous animations before starting new ones
- Use consistent naming conventions for states
- Implement cleanup functions to prevent memory leaks
- Consider animation priorities for complex systems`,
        codeExample: `-- Advanced animation state management system
local TweenService = game:GetService("TweenService")

-- Create a comprehensive state management system
local AnimationManager = {}
AnimationManager.__index = AnimationManager

function AnimationManager.new(object)
    local self = setmetatable({}, AnimationManager)
    self.object = object
    self.currentState = "idle"
    self.activeTweens = {}
    self.stateTransitions = {
        idle = {"walking", "jumping", "spinning"},
        walking = {"idle", "jumping", "spinning"},
        jumping = {"idle", "walking"},
        spinning = {"idle", "walking"}
    }
    return self
end

function AnimationManager:setState(newState)
    -- Validate state transition
    local validTransitions = self.stateTransitions[self.currentState]
    local isValidTransition = false
    
    for _, validState in ipairs(validTransitions) do
        if validState == newState then
            isValidTransition = true
            break
        end
    end
    
    if not isValidTransition then
        warn("Invalid state transition from " .. self.currentState .. " to " .. newState)
        return false
    end
    
    -- Stop all current animations
    self:stopAllAnimations()
    
    -- Set new state
    self.currentState = newState
    print("Animation state changed to: " .. newState)
    
    -- Start new animation based on state
    self:playStateAnimation(newState)
    return true
end

function AnimationManager:stopAllAnimations()
    for _, tween in pairs(self.activeTweens) do
        tween:Cancel()
    end
    self.activeTweens = {}
end

function AnimationManager:playStateAnimation(state)
    local tweenInfo = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    if state == "idle" then
        -- Gentle breathing animation
        local breatheTween = TweenService:Create(self.object, tweenInfo, {
            Size = self.object.Size * 1.1
        })
        breatheTween.Completed:Connect(function()
            local breatheBack = TweenService:Create(self.object, tweenInfo, {
                Size = self.object.Size / 1.1
            })
            breatheBack.Completed:Connect(function()
                if self.currentState == "idle" then
                    self:playStateAnimation("idle") -- Loop idle animation
                end
            end)
            breatheBack:Play()
        end)
        breatheTween:Play()
        self.activeTweens.breathe = breatheTween
        
    elseif state == "walking" then
        -- Walking animation with position and rotation
        local walkTween = TweenService:Create(self.object, tweenInfo, {
            Position = self.object.Position + Vector3.new(5, 0, 0),
            CFrame = self.object.CFrame * CFrame.Angles(0, math.rad(45), 0)
        })
        walkTween:Play()
        self.activeTweens.walk = walkTween
        
    elseif state == "jumping" then
        -- Jumping animation with arc
        local jumpUp = TweenService:Create(self.object, tweenInfo, {
            Position = self.object.Position + Vector3.new(0, 10, 0)
        })
        jumpUp.Completed:Connect(function()
            local jumpDown = TweenService:Create(self.object, tweenInfo, {
                Position = self.object.Position - Vector3.new(0, 10, 0)
            })
            jumpDown.Completed:Connect(function()
                self:setState("idle") -- Return to idle after jump
            end)
            jumpDown:Play()
        end)
        jumpUp:Play()
        self.activeTweens.jump = jumpUp
        
    elseif state == "spinning" then
        -- Continuous spinning animation
        local spinTween = TweenService:Create(self.object, tweenInfo, {
            CFrame = self.object.CFrame * CFrame.Angles(0, math.rad(360), 0)
        })
        spinTween.Completed:Connect(function()
            if self.currentState == "spinning" then
                self:playStateAnimation("spinning") -- Continue spinning
            end
        end)
        spinTween:Play()
        self.activeTweens.spin = spinTween
    end
end

-- Demo the animation state management system
local demoPart = Instance.new("Part")
demoPart.Size = Vector3.new(2, 2, 2)
demoPart.Position = Vector3.new(0, 5, 0)
demoPart.Color = Color3.fromRGB(0, 255, 0)
demoPart.Parent = workspace

local animManager = AnimationManager.new(demoPart)

-- Start with idle state
animManager:setState("idle")

-- Demo state transitions after delays
wait(3)
animManager:setState("walking")

wait(3)
animManager:setState("jumping")

wait(3)
animManager:setState("spinning")

wait(3)
animManager:setState("idle")`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced Tweening Systems - Comprehensive Learning Example
-- This code demonstrates professional animation techniques used in real Roblox games

local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")

print("=== ADVANCED TWEENING SYSTEMS DEMO ===")
print("Learning professional animation techniques...")

-- Create a demonstration environment
local function createDemoPart(name, position, color, size)
    local part = Instance.new("Part")
    part.Name = name
    part.Size = size or Vector3.new(2, 2, 2)
    part.Position = position
    part.Color = color
    part.Material = Enum.Material.Neon
    part.Parent = workspace
    
    -- Add a label to identify the part
    local billboardGui = Instance.new("BillboardGui")
    billboardGui.Size = UDim2.new(0, 200, 0, 50)
    billboardGui.Parent = part
    
    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.BackgroundTransparency = 1
    label.Text = name
    label.TextColor3 = Color3.fromRGB(255, 255, 255)
    label.TextScaled = true
    label.Font = Enum.Font.GothamBold
    label.Parent = billboardGui
    
    return part
end

-- Create demonstration parts
local chainingPart = createDemoPart("Chaining Demo", Vector3.new(0, 5, 0), Color3.fromRGB(255, 100, 100))
local easingPart = createDemoPart("Easing Demo", Vector3.new(0, 5, 5), Color3.fromRGB(100, 255, 100))
local statePart = createDemoPart("State Demo", Vector3.new(0, 5, 10), Color3.fromRGB(100, 100, 255))

-- 1. ADVANCED TWEEN CHAINING SYSTEM
print("\\n1. DEMONSTRATING TWEEN CHAINING...")
print("Chaining allows animations to happen in sequence, creating complex behaviors.")

local function createAdvancedChainedAnimation(part, startPos, endPos)
    print("Creating chained animation sequence...")
    
    -- Define different tween info for each step
    local moveInfo = TweenInfo.new(1.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    local scaleInfo = TweenInfo.new(0.8, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out)
    local colorInfo = TweenInfo.new(1, Enum.EasingStyle.Elastic, Enum.EasingDirection.InOut)
    local rotateInfo = TweenInfo.new(2, Enum.EasingStyle.Back, Enum.EasingDirection.InOut)
    
    -- Step 1: Move to target position
    local moveTween = TweenService:Create(part, moveInfo, {
        Position = endPos
    })
    
    -- Step 2: Scale up when movement completes
    moveTween.Completed:Connect(function()
        print("Movement completed, starting scale animation...")
        local scaleTween = TweenService:Create(part, scaleInfo, {
            Size = Vector3.new(4, 4, 4)
        })
        scaleTween:Play()
        
        -- Step 3: Change color when scaling completes
        scaleTween.Completed:Connect(function()
            print("Scaling completed, starting color animation...")
            local colorTween = TweenService:Create(part, colorInfo, {
                Color = Color3.fromRGB(255, 255, 0)
            })
            colorTween:Play()
            
            -- Step 4: Rotate when color change completes
            colorTween.Completed:Connect(function()
                print("Color change completed, starting rotation...")
                local rotateTween = TweenService:Create(part, rotateInfo, {
                    CFrame = part.CFrame * CFrame.Angles(0, math.rad(360), 0)
                })
                rotateTween:Play()
                
                -- Step 5: Final scale back when rotation completes
                rotateTween.Completed:Connect(function()
                    print("Rotation completed, finalizing animation...")
                    local finalScale = TweenService:Create(part, scaleInfo, {
                        Size = Vector3.new(2, 2, 2)
                    })
                    finalScale:Play()
                    
                    finalScale.Completed:Connect(function()
                        print("Chained animation sequence completed!")
                    end)
                end)
            end)
        end)
    end)
    
    moveTween:Play()
end

-- 2. COMPREHENSIVE EASING DEMONSTRATION
print("\\n2. DEMONSTRATING EASING FUNCTIONS...")
print("Different easing styles create different visual effects and feelings.")

local function demonstrateEasingStyles(part)
    local easingStyles = {
        {Enum.EasingStyle.Linear, "Linear", "Constant speed, mechanical feel"},
        {Enum.EasingStyle.Quad, "Quad", "Smooth acceleration, natural feel"},
        {Enum.EasingStyle.Cubic, "Cubic", "More dramatic acceleration"},
        {Enum.EasingStyle.Quart, "Quart", "Strong acceleration curve"},
        {Enum.EasingStyle.Quint, "Quint", "Very strong acceleration"},
        {Enum.EasingStyle.Bounce, "Bounce", "Playful bouncing effect"},
        {Enum.EasingStyle.Elastic, "Elastic", "Rubber band-like overshoot"},
        {Enum.EasingStyle.Back, "Back", "Overshoots then settles back"}
    }
    
    local currentStyle = 1
    
    local function animateWithCurrentStyle()
        if currentStyle > #easingStyles then
            print("Easing demonstration complete!")
            return
        end
        
        local style, name, description = easingStyles[currentStyle][1], easingStyles[currentStyle][2], easingStyles[currentStyle][3]
        print("Animating with " .. name .. " easing: " .. description)
        
        -- Create tween with current easing style
        local tweenInfo = TweenInfo.new(2, style, Enum.EasingDirection.Out)
        local tween = TweenService:Create(part, tweenInfo, {
            Position = Vector3.new(10, 5, 5),
            Size = Vector3.new(3, 3, 3),
            Color = Color3.fromRGB(math.random(100, 255), math.random(100, 255), math.random(100, 255))
        })
        
        tween.Completed:Connect(function()
            -- Move back to start position
            local returnTween = TweenService:Create(part, tweenInfo, {
                Position = Vector3.new(0, 5, 5),
                Size = Vector3.new(2, 2, 2)
            })
            returnTween:Play()
            
            returnTween.Completed:Connect(function()
                currentStyle = currentStyle + 1
                wait(0.5) -- Brief pause between animations
                animateWithCurrentStyle()
            end)
        end)
        
        tween:Play()
    end
    
    animateWithCurrentStyle()
end

-- 3. PROFESSIONAL ANIMATION STATE MANAGEMENT
print("\\n3. DEMONSTRATING STATE MANAGEMENT...")
print("State management prevents animation conflicts and creates smooth transitions.")

-- Create a professional animation state manager
local AnimationStateManager = {}
AnimationStateManager.__index = AnimationStateManager

function AnimationStateManager.new(object)
    local self = setmetatable({}, AnimationStateManager)
    self.object = object
    self.currentState = "idle"
    self.activeTweens = {}
    self.stateHistory = {}
    
    -- Define valid state transitions
    self.validTransitions = {
        idle = {"walking", "jumping", "spinning", "pulsing"},
        walking = {"idle", "jumping", "spinning"},
        jumping = {"idle", "walking"},
        spinning = {"idle", "walking"},
        pulsing = {"idle", "walking"}
    }
    
    return self
end

function AnimationStateManager:setState(newState)
    -- Validate state transition
    local validStates = self.validTransitions[self.currentState]
    local isValid = false
    
    for _, validState in ipairs(validStates) do
        if validState == newState then
            isValid = true
            break
        end
    end
    
    if not isValid then
        warn("Invalid transition from " .. self.currentState .. " to " .. newState)
        return false
    end
    
    -- Record state change
    table.insert(self.stateHistory, {
        from = self.currentState,
        to = newState,
        time = tick()
    })
    
    -- Stop all current animations
    self:stopAllAnimations()
    
    -- Update state
    self.currentState = newState
    print("State changed to: " .. newState)
    
    -- Start new animation
    self:playStateAnimation(newState)
    return true
end

function AnimationStateManager:stopAllAnimations()
    for name, tween in pairs(self.activeTweens) do
        tween:Cancel()
        print("Stopped animation: " .. name)
    end
    self.activeTweens = {}
end

function AnimationStateManager:playStateAnimation(state)
    local baseInfo = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    if state == "idle" then
        print("Playing idle animation...")
        -- Gentle breathing effect
        local breatheTween = TweenService:Create(self.object, baseInfo, {
            Size = self.object.Size * 1.05
        })
        breatheTween.Completed:Connect(function()
            local breatheBack = TweenService:Create(self.object, baseInfo, {
                Size = self.object.Size / 1.05
            })
            breatheBack.Completed:Connect(function()
                if self.currentState == "idle" then
                    self:playStateAnimation("idle") -- Loop
                end
            end)
            breatheBack:Play()
        end)
        breatheTween:Play()
        self.activeTweens.breathe = breatheTween
        
    elseif state == "walking" then
        print("Playing walking animation...")
        local walkTween = TweenService:Create(self.object, baseInfo, {
            Position = self.object.Position + Vector3.new(5, 0, 0),
            CFrame = self.object.CFrame * CFrame.Angles(0, math.rad(30), 0)
        })
        walkTween:Play()
        self.activeTweens.walk = walkTween
        
    elseif state == "jumping" then
        print("Playing jumping animation...")
        local jumpUp = TweenService:Create(self.object, baseInfo, {
            Position = self.object.Position + Vector3.new(0, 8, 0)
        })
        jumpUp.Completed:Connect(function()
            local jumpDown = TweenService:Create(self.object, baseInfo, {
                Position = self.object.Position - Vector3.new(0, 8, 0)
            })
            jumpDown.Completed:Connect(function()
                self:setState("idle") -- Return to idle
            end)
            jumpDown:Play()
        end)
        jumpUp:Play()
        self.activeTweens.jump = jumpUp
        
    elseif state == "spinning" then
        print("Playing spinning animation...")
        local spinTween = TweenService:Create(self.object, baseInfo, {
            CFrame = self.object.CFrame * CFrame.Angles(0, math.rad(360), 0)
        })
        spinTween.Completed:Connect(function()
            if self.currentState == "spinning" then
                self:playStateAnimation("spinning") -- Continue spinning
            end
        end)
        spinTween:Play()
        self.activeTweens.spin = spinTween
        
    elseif state == "pulsing" then
        print("Playing pulsing animation...")
        local pulseTween = TweenService:Create(self.object, baseInfo, {
            Size = self.object.Size * 1.5,
            Color = Color3.fromRGB(255, 255, 0)
        })
        pulseTween.Completed:Connect(function()
            local pulseBack = TweenService:Create(self.object, baseInfo, {
                Size = self.object.Size / 1.5,
                Color = Color3.fromRGB(100, 100, 255)
            })
            pulseBack.Completed:Connect(function()
                if self.currentState == "pulsing" then
                    self:playStateAnimation("pulsing") -- Continue pulsing
                end
            end)
            pulseBack:Play()
        end)
        pulseTween:Play()
        self.activeTweens.pulse = pulseTween
    end
end

-- Create state manager for the state demo part
local stateManager = AnimationStateManager.new(statePart)

-- 4. RUN THE DEMONSTRATIONS
print("\\n=== STARTING DEMONSTRATIONS ===")

-- Start chaining demonstration
createAdvancedChainedAnimation(chainingPart, chainingPart.Position, Vector3.new(10, 5, 0))

wait(2)

-- Start easing demonstration
demonstrateEasingStyles(easingPart)

wait(1)

-- Start state management demonstration
stateManager:setState("idle")

-- Demo state transitions
wait(3)
stateManager:setState("walking")

wait(3)
stateManager:setState("jumping")

wait(3)
stateManager:setState("spinning")

wait(3)
stateManager:setState("pulsing")

wait(3)
stateManager:setState("idle")

print("\\n=== ALL DEMONSTRATIONS COMPLETE ===")
print("You've learned advanced tweening techniques used in professional Roblox games!")`,
    challenge: {
      tests: [
        { description: 'Create a tween with custom easing style', type: 'code_contains', value: 'EasingStyle' },
        { description: 'Use TweenInfo.Completed to chain animations', type: 'code_contains', value: 'Completed' },
        { description: 'Implement animation state management', type: 'code_contains', value: 'setState' },
        { description: 'Use TweenService:Create() for animations', type: 'code_contains', value: 'TweenService:Create' }
      ],
      hints: [
        'Use TweenInfo.Completed:Connect() to chain tweens together',
        'Experiment with different EasingStyle values (Bounce, Elastic, Back)',
        'Manage animation states to prevent conflicts between animations',
        'Use TweenInfo.new(duration, easingStyle, easingDirection) for custom timing',
        'Always stop previous animations before starting new ones',
        'Consider using object-oriented patterns for complex animation systems'
      ],
      successMessage: 'Outstanding! You now understand advanced tweening systems and can create complex, professional animation sequences used in real Roblox games. You\'ve mastered tween chaining, custom easing functions, and animation state management!'
    }
  },

  'physics-simulation-advanced': {
    title: 'Advanced Physics Simulation',
    description: 'Master Roblox physics, constraints, and realistic game mechanics',
    sections: [
      {
        title: 'Physics Properties and Materials',
        content: 'Control object physics using Material, Density, Friction, and Elasticity properties. Different materials behave differently in Roblox physics simulation.',
        codeExample: `part.Material = Enum.Material.Wood
part.CustomPhysicalProperties = PhysicalProperties.new(0.7, 0.3, 0.5, 1, 1)  -- Density, Friction, Elasticity, FrictionWeight, ElasticityWeight`,
        color: 'blue'
      },
      {
        title: 'Advanced Constraints',
        content: 'Use HingeConstraints, BallSocketConstraints, and other constraint types to create realistic mechanical systems, joints, and connected objects.',
        codeExample: `local hinge = Instance.new("HingeConstraint")
hinge.Attachment0 = part1.HingeAttachment
hinge.Attachment1 = part2.HingeAttachment
hinge.Parent = part1`,
        color: 'green'
      },
      {
        title: 'Force and Impulse Systems',
        content: 'Apply forces using BodyVelocity, BodyAngularVelocity, and other body movers to create realistic physics interactions and dynamic systems.',
        codeExample: `local bodyVelocity = Instance.new("BodyVelocity")
bodyVelocity.MaxForce = Vector3.new(4000, 4000, 4000)
bodyVelocity.Velocity = Vector3.new(0, 50, 0)
bodyVelocity.Parent = part`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced Physics Simulation
-- Realistic physics systems and constraints

local TweenService = game:GetService("TweenService")

print("=== ADVANCED PHYSICS DEMO ===")

-- 1. Create physics demonstration parts
local function createPhysicsPart(name, position, material, size)
    local part = Instance.new("Part")
    part.Name = name
    part.Size = size or Vector3.new(2, 2, 2)
    part.Position = position
    part.Material = material
    part.Parent = workspace
    
    -- Add custom physical properties
    if material == Enum.Material.Wood then
        part.CustomPhysicalProperties = PhysicalProperties.new(0.7, 0.3, 0.5, 1, 1)
    elseif material == Enum.Material.Metal then
        part.CustomPhysicalProperties = PhysicalProperties.new(7.8, 0.2, 0.1, 1, 1)
    elseif material == Enum.Material.Rubber then
        part.CustomPhysicalProperties = PhysicalProperties.new(0.9, 0.8, 0.9, 1, 1)
    end
    
    return part
end

-- Create different material parts
local woodPart = createPhysicsPart("WoodPart", Vector3.new(0, 10, 0), Enum.Material.Wood)
local metalPart = createPhysicsPart("MetalPart", Vector3.new(3, 10, 0), Enum.Material.Metal)
local rubberPart = createPhysicsPart("RubberPart", Vector3.new(-3, 10, 0), Enum.Material.Rubber)

-- 2. Advanced Constraint System
local function createHingeConstraint(part1, part2, position)
    -- Create attachments
    local attachment1 = Instance.new("HingeAttachment")
    attachment1.Parent = part1
    attachment1.CFrame = CFrame.new(position)
    
    local attachment2 = Instance.new("HingeAttachment")
    attachment2.Parent = part2
    attachment2.CFrame = CFrame.new(position)
    
    -- Create constraint
    local hinge = Instance.new("HingeConstraint")
    hinge.Attachment0 = attachment1
    hinge.Attachment1 = attachment2
    hinge.LimitsEnabled = true
    hinge.LowerAngle = -45
    hinge.UpperAngle = 45
    hinge.Parent = part1
    
    return hinge
end

-- Create connected parts
local basePart = createPhysicsPart("BasePart", Vector3.new(0, 5, 0), Enum.Material.Metal, Vector3.new(4, 1, 4))
local swingPart = createPhysicsPart("SwingPart", Vector3.new(0, 8, 0), Enum.Material.Wood, Vector3.new(1, 4, 1))

-- Create hinge constraint between them
local hinge = createHingeConstraint(basePart, swingPart, Vector3.new(0, 6, 0))

-- 3. Force and Impulse System
local function applyImpulse(part, force)
    local bodyVelocity = Instance.new("BodyVelocity")
    bodyVelocity.MaxForce = Vector3.new(4000, 4000, 4000)
    bodyVelocity.Velocity = force
    bodyVelocity.Parent = part
    
    -- Remove after 0.1 seconds
    game:GetService("Debris"):AddItem(bodyVelocity, 0.1)
end

local function applyAngularImpulse(part, torque)
    local bodyAngularVelocity = Instance.new("BodyAngularVelocity")
    bodyAngularVelocity.MaxTorque = Vector3.new(4000, 4000, 4000)
    bodyAngularVelocity.AngularVelocity = torque
    bodyAngularVelocity.Parent = part
    
    -- Remove after 0.1 seconds
    game:GetService("Debris"):AddItem(bodyAngularVelocity, 0.1)
end

-- 4. Physics Interaction Demo
local function createPhysicsDemo()
    -- Create a ball that will interact with our parts
    local ball = createPhysicsPart("PhysicsBall", Vector3.new(0, 15, 0), Enum.Material.Rubber, Vector3.new(1, 1, 1))
    ball.Shape = Enum.PartType.Ball
    
    -- Apply initial impulse to the ball
    applyImpulse(ball, Vector3.new(0, -20, 0))
    
    -- Add some spin
    applyAngularImpulse(ball, Vector3.new(0, 0, 10))
    
    return ball
end

-- 5. Advanced Physics Properties Demo
local function createMaterialComparison()
    local materials = {
        {Enum.Material.Wood, "Wood", Vector3.new(0, 12, 0)},
        {Enum.Material.Metal, "Metal", Vector3.new(3, 12, 0)},
        {Enum.Material.Rubber, "Rubber", Vector3.new(-3, 12, 0)},
        {Enum.Material.Plastic, "Plastic", Vector3.new(6, 12, 0)},
        {Enum.Material.Glass, "Glass", Vector3.new(-6, 12, 0)}
    }
    
    for _, materialData in ipairs(materials) do
        local material, name, position = materialData[1], materialData[2], materialData[3]
        local part = createPhysicsPart(name .. "Demo", position, material, Vector3.new(1, 1, 1))
        
        -- Apply different forces based on material
        if material == Enum.Material.Rubber then
            applyImpulse(part, Vector3.new(0, -15, 0))
        elseif material == Enum.Material.Metal then
            applyImpulse(part, Vector3.new(0, -25, 0))
        else
            applyImpulse(part, Vector3.new(0, -20, 0))
        end
    end
end

-- 6. Run the physics demos
print("\\nCreating physics ball demo...")
createPhysicsDemo()

wait(1)

print("\\nCreating material comparison demo...")
createMaterialComparison()

-- 7. Interactive physics system
local function createInteractivePhysics()
    local interactivePart = createPhysicsPart("InteractivePart", Vector3.new(0, 20, 0), Enum.Material.Metal, Vector3.new(3, 3, 3))
    
    -- Make it respond to touches
    interactivePart.Touched:Connect(function(hit)
        local humanoid = hit.Parent:FindFirstChild("Humanoid")
        if humanoid then
            -- Apply force away from the player
            local direction = (interactivePart.Position - hit.Position).Unit
            applyImpulse(interactivePart, direction * 30)
            applyAngularImpulse(interactivePart, Vector3.new(
                math.random(-10, 10),
                math.random(-10, 10),
                math.random(-10, 10)
            ))
        end
    end)
    
    return interactivePart
end

print("\\nCreating interactive physics system...")
createInteractivePhysics()

print("\\nAdvanced physics simulation demo complete!")`,
    challenge: {
      tests: [
        { description: 'Set custom physical properties for a part', type: 'code_contains', value: 'CustomPhysicalProperties' },
        { description: 'Create a constraint between two parts', type: 'code_contains', value: 'Constraint' }
      ],
      hints: ['Use PhysicalProperties.new() to set custom physics', 'Create attachments before creating constraints', 'Use BodyVelocity for applying forces'],
      successMessage: 'Excellent! You understand advanced physics simulation in Roblox.'
    }
  },

  // === DATA MANAGEMENT & SECURITY LESSONS ===
  'data-encryption-security': {
    title: 'Data Encryption & Security',
    description: 'Implement secure data handling, encryption, and anti-cheat measures for Roblox games',
    sections: [
      {
        title: 'Data Validation and Sanitization',
        content: 'Always validate and sanitize data from clients before processing. Never trust client-side data - implement server-side validation for all user inputs and game actions.',
        codeExample: `local function validatePlayerData(data)
    if type(data) ~= "table" then return false end
    
    -- Validate each field
    if not tonumber(data.level) or data.level < 1 or data.level > 100 then
        return false
    end
    
    if not tonumber(data.coins) or data.coins < 0 then
        return false
    end
    
    return true
end`,
        color: 'blue'
      },
      {
        title: 'Anti-Cheat Measures',
        content: 'Implement server-side validation, rate limiting, and consistency checks to prevent cheating. Monitor for impossible actions and suspicious patterns.',
        codeExample: `local function validatePlayerAction(player, action, data)
    -- Rate limiting
    if not checkRateLimit(player) then
        return false, "Rate limit exceeded"
    end
    
    -- Validate action is possible
    if action == "spendCoins" then
        local playerData = getPlayerData(player)
        if data.amount > playerData.coins then
            return false, "Insufficient coins"
        end
    end
    
    return true
end`,
        color: 'green'
      },
      {
        title: 'Data Integrity and Backup',
        content: 'Implement data versioning, backup systems, and integrity checks. Use checksums and validation to ensure data hasn\'t been tampered with.',
        codeExample: `local function createDataChecksum(data)
    local dataString = game:GetService("HttpService"):JSONEncode(data)
    return game:GetService("HashService"):GenerateGUID(false)
end

local function validateDataIntegrity(data, checksum)
    local currentChecksum = createDataChecksum(data)
    return currentChecksum == checksum
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Data Encryption & Security
-- Comprehensive security measures for Roblox games

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

print("=== DATA SECURITY DEMO ===")

-- 1. Data Validation System
local function validatePlayerData(data)
    if type(data) ~= "table" then 
        print("Invalid data type")
        return false 
    end
    
    -- Validate level
    local level = tonumber(data.level)
    if not level or level < 1 or level > 100 then
        print("Invalid level:", data.level)
        return false
    end
    
    -- Validate coins
    local coins = tonumber(data.coins)
    if not coins or coins < 0 or coins > 999999 then
        print("Invalid coins:", data.coins)
        return false
    end
    
    -- Validate experience
    local experience = tonumber(data.experience)
    if not experience or experience < 0 then
        print("Invalid experience:", data.experience)
        return false
    end
    
    print("Data validation passed")
    return true
end

-- 2. Anti-Cheat Rate Limiting
local playerRequestCounts = {}
local RATE_LIMIT = 10  -- Max 10 requests per second
local RATE_WINDOW = 1   -- 1 second window

local function checkRateLimit(player)
    local playerId = player.UserId
    local currentTime = tick()
    
    if not playerRequestCounts[playerId] then
        playerRequestCounts[playerId] = {count = 0, resetTime = currentTime + RATE_WINDOW}
    end
    
    local data = playerRequestCounts[playerId]
    if currentTime > data.resetTime then
        data.count = 0
        data.resetTime = currentTime + RATE_WINDOW
    end
    
    data.count = data.count + 1
    return data.count <= RATE_LIMIT
end

-- 3. Action Validation System
local function validatePlayerAction(player, action, data)
    print("\\nValidating action:", action, "from player:", player.Name)
    
    -- Rate limiting check
    if not checkRateLimit(player) then
        print("Rate limit exceeded for", player.Name)
        return false, "Rate limit exceeded"
    end
    
    -- Simulate player data
    local playerData = {
        level = 10,
        coins = 500,
        experience = 1200
    }
    
    -- Validate specific actions
    if action == "spendCoins" then
        local amount = tonumber(data.amount)
        if not amount or amount <= 0 then
            print("Invalid coin amount:", data.amount)
            return false, "Invalid amount"
        end
        
        if amount > playerData.coins then
            print("Insufficient coins. Player has:", playerData.coins, "Requested:", amount)
            return false, "Insufficient coins"
        end
        
        -- Check for suspicious amounts
        if amount > 1000 then
            print("Suspicious large transaction:", amount)
            return false, "Transaction too large"
        end
        
    elseif action == "levelUp" then
        -- Check if level up is actually possible
        if playerData.experience < (playerData.level * 100) then
            print("Insufficient experience for level up")
            return false, "Insufficient experience"
        end
        
    elseif action == "teleport" then
        local position = data.position
        if not position or type(position) ~= "table" then
            return false, "Invalid position"
        end
        
        -- Check for impossible teleportation distances
        local currentPos = Vector3.new(0, 0, 0)  -- Simulated current position
        local targetPos = Vector3.new(position.x, position.y, position.z)
        local distance = (currentPos - targetPos).Magnitude
        
        if distance > 1000 then
            print("Suspicious teleportation distance:", distance)
            return false, "Teleportation distance too far"
        end
    end
    
    print("Action validation passed")
    return true
end

-- 4. Data Integrity System
local function createDataChecksum(data)
    -- Simple checksum simulation (in real implementation, use proper hashing)
    local dataString = tostring(data.level) .. tostring(data.coins) .. tostring(data.experience)
    local checksum = 0
    
    for i = 1, #dataString do
        checksum = checksum + string.byte(dataString, i)
    end
    
    return checksum
end

local function validateDataIntegrity(data, expectedChecksum)
    local currentChecksum = createDataChecksum(data)
    local isValid = currentChecksum == expectedChecksum
    
    if not isValid then
        print("Data integrity check failed!")
        print("Expected checksum:", expectedChecksum)
        print("Current checksum:", currentChecksum)
    else
        print("Data integrity check passed")
    end
    
    return isValid
end

-- 5. Secure Data Storage Simulation
local function secureSavePlayerData(player, data)
    print("\\nSecurely saving data for player:", player.Name)
    
    -- Validate data
    if not validatePlayerData(data) then
        return false, "Data validation failed"
    end
    
    -- Create checksum
    local checksum = createDataChecksum(data)
    
    -- Add security metadata
    local secureData = {
        version = 1,
        playerId = player.UserId,
        timestamp = os.time(),
        data = data,
        checksum = checksum
    }
    
    print("Data saved securely with checksum:", checksum)
    return true, secureData
end

local function secureLoadPlayerData(player, secureData)
    print("\\nSecurely loading data for player:", player.Name)
    
    -- Validate data structure
    if not secureData or not secureData.data or not secureData.checksum then
        print("Invalid secure data structure")
        return false, nil
    end
    
    -- Check data integrity
    if not validateDataIntegrity(secureData.data, secureData.checksum) then
        print("Data integrity check failed")
        return false, nil
    end
    
    -- Validate player ID matches
    if secureData.playerId ~= player.UserId then
        print("Player ID mismatch")
        return false, nil
    end
    
    print("Data loaded securely")
    return true, secureData.data
end

-- 6. Demo the security systems
local mockPlayer = {Name = "TestPlayer", UserId = 12345}

-- Test data validation
print("\\n=== Testing Data Validation ===")
local validData = {level = 10, coins = 500, experience = 1200}
local invalidData = {level = 150, coins = -100, experience = "invalid"}

validatePlayerData(validData)
validatePlayerData(invalidData)

-- Test action validation
print("\\n=== Testing Action Validation ===")
validatePlayerAction(mockPlayer, "spendCoins", {amount = 100})
validatePlayerAction(mockPlayer, "spendCoins", {amount = 1000})  -- Should fail
validatePlayerAction(mockPlayer, "teleport", {position = {x = 100, y = 0, z = 100}})

-- Test secure data operations
print("\\n=== Testing Secure Data Operations ===")
local success, secureData = secureSavePlayerData(mockPlayer, validData)
if success then
    local loadSuccess, loadedData = secureLoadPlayerData(mockPlayer, secureData)
    if loadSuccess then
        print("Secure data operations successful!")
    end
end

-- Test data tampering detection
print("\\n=== Testing Data Tampering Detection ===")
if secureData then
    -- Tamper with the data
    secureData.data.coins = 999999
    local tamperSuccess, _ = secureLoadPlayerData(mockPlayer, secureData)
    if not tamperSuccess then
        print("Data tampering successfully detected!")
    end
end

print("\\nData security demo complete!")`,
    challenge: {
      tests: [
        { description: 'Implement data validation for user input', type: 'code_contains', value: 'validatePlayerData' },
        { description: 'Use rate limiting to prevent spam', type: 'code_contains', value: 'checkRateLimit' }
      ],
      hints: ['Always validate data from clients on the server', 'Implement rate limiting to prevent abuse', 'Use checksums to detect data tampering', 'Never trust client-side data'],
      successMessage: 'Excellent! You understand data security and anti-cheat measures.'
    }
  },

  'performance-optimization-advanced': {
    title: 'Advanced Performance Optimization',
    description: 'Master performance optimization techniques, profiling, and efficient game development',
    sections: [
      {
        title: 'Code Profiling and Bottleneck Detection',
        content: 'Use Roblox\'s built-in profiling tools to identify performance bottlenecks. Monitor memory usage, frame rate, and script execution time to optimize your code.',
        codeExample: `local Stats = game:GetService("Stats")
local memoryUsage = Stats:GetTotalMemoryUsageMb()
local frameRate = 1 / game:GetService("RunService").Heartbeat:Wait()`,
        color: 'blue'
      },
      {
        title: 'Efficient Data Structures',
        content: 'Choose the right data structures for your use case. Use arrays for indexed data, dictionaries for key-value pairs, and avoid nested loops when possible.',
        codeExample: `-- Efficient: Use dictionary for O(1) lookups
local playerData = {}
playerData[player.UserId] = {level = 10, coins = 500}

-- Inefficient: Linear search through array
for _, data in ipairs(playerArray) do
    if data.playerId == targetId then
        -- Found player
    end
end`,
        color: 'green'
      },
      {
        title: 'Memory Management and Garbage Collection',
        content: 'Implement proper memory management to prevent memory leaks. Use object pooling, disconnect events, and avoid creating objects in loops.',
        codeExample: `-- Object pooling for frequently created objects
local partPool = {}
local function getPart()
    return table.remove(partPool) or Instance.new("Part")
end

local function returnPart(part)
    part.Parent = nil
    table.insert(partPool, part)
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced Performance Optimization
-- Comprehensive performance monitoring and optimization

local RunService = game:GetService("RunService")
local Stats = game:GetService("Stats")
local Debris = game:GetService("Debris")

print("=== PERFORMANCE OPTIMIZATION DEMO ===")

-- 1. Performance Monitoring System
local function getPerformanceStats()
    local memoryUsage = Stats:GetTotalMemoryUsageMb()
    local frameRate = 1 / RunService.Heartbeat:Wait()
    
    return {
        memory = memoryUsage,
        frameRate = frameRate,
        timestamp = tick()
    }
end

local function logPerformanceStats()
    local stats = getPerformanceStats()
    print(string.format("Memory: %.2f MB | FPS: %.1f", stats.memory, stats.frameRate))
    return stats
end

-- 2. Object Pooling System
local partPool = {}
local activeParts = {}

local function createOptimizedPart()
    local part = table.remove(partPool)
    if not part then
        part = Instance.new("Part")
        part.Size = Vector3.new(2, 2, 2)
    end
    
    part.Parent = workspace
    table.insert(activeParts, part)
    return part
end

local function destroyOptimizedPart(part)
    part.Parent = nil
    table.insert(partPool, part)
    
    for i, activePart in ipairs(activeParts) do
        if activePart == part then
            table.remove(activeParts, i)
            break
        end
    end
end

-- 3. Efficient Data Structure Examples
local function demonstrateDataStructures()
    print("\\n=== Data Structure Performance ===")
    
    -- Efficient: Dictionary for O(1) lookups
    local playerData = {}
    local startTime = tick()
    
    -- Populate dictionary
    for i = 1, 1000 do
        playerData[i] = {level = math.random(1, 100), coins = math.random(0, 1000)}
    end
    
    -- Fast lookup
    local lookupTime = tick()
    local player = playerData[500]
    local lookupDuration = tick() - lookupTime
    
    print("Dictionary lookup time:", lookupDuration * 1000, "ms")
    
    -- Inefficient: Array for O(n) lookups
    local playerArray = {}
    for i = 1, 1000 do
        table.insert(playerArray, {id = i, level = math.random(1, 100), coins = math.random(0, 1000)})
    end
    
    -- Slow lookup
    lookupTime = tick()
    for _, data in ipairs(playerArray) do
        if data.id == 500 then
            break
        end
    end
    lookupDuration = tick() - lookupTime
    
    print("Array lookup time:", lookupDuration * 1000, "ms")
end

-- 4. Memory Management Demo
local function demonstrateMemoryManagement()
    print("\\n=== Memory Management ===")
    
    local initialMemory = Stats:GetTotalMemoryUsageMb()
    print("Initial memory usage:", initialMemory, "MB")
    
    -- Bad: Creating objects in loop
    local badParts = {}
    for i = 1, 100 do
        local part = Instance.new("Part")
        part.Size = Vector3.new(1, 1, 1)
        part.Position = Vector3.new(i, 0, 0)
        part.Parent = workspace
        table.insert(badParts, part)
    end
    
    local badMemory = Stats:GetTotalMemoryUsageMb()
    print("Memory after creating 100 parts:", badMemory, "MB")
    
    -- Clean up bad parts
    for _, part in ipairs(badParts) do
        part:Destroy()
    end
    
    -- Good: Using object pooling
    for i = 1, 100 do
        local part = createOptimizedPart()
        part.Position = Vector3.new(i, 5, 0)
    end
    
    local goodMemory = Stats:GetTotalMemoryUsageMb()
    print("Memory after using object pooling:", goodMemory, "MB")
    
    -- Clean up pooled parts
    for _, part in ipairs(activeParts) do
        destroyOptimizedPart(part)
    end
    
    local finalMemory = Stats:GetTotalMemoryUsageMb()
    print("Final memory usage:", finalMemory, "MB")
end

-- 5. Event Management Optimization
local connections = {}

local function addOptimizedConnection(connection)
    table.insert(connections, connection)
end

local function cleanupConnections()
    for _, connection in ipairs(connections) do
        connection:Disconnect()
    end
    connections = {}
end

-- 6. Performance Testing Framework
local function runPerformanceTest(testName, testFunction, iterations)
    print("\\n=== Performance Test:", testName, "===")
    
    local startTime = tick()
    local startMemory = Stats:GetTotalMemoryUsageMb()
    
    for i = 1, iterations do
        testFunction()
    end
    
    local endTime = tick()
    local endMemory = Stats:GetTotalMemoryUsageMb()
    
    local duration = endTime - startTime
    local memoryDelta = endMemory - startMemory
    
    print(string.format("Duration: %.3f seconds", duration))
    print(string.format("Memory delta: %.2f MB", memoryDelta))
    print(string.format("Average per iteration: %.3f ms", (duration / iterations) * 1000))
end

-- 7. Run Performance Tests
demonstrateDataStructures()
demonstrateMemoryManagement()

-- Performance test: Object creation
runPerformanceTest("Object Creation", function()
    local part = createOptimizedPart()
    destroyOptimizedPart(part)
end, 1000)

-- Performance test: Math operations
runPerformanceTest("Math Operations", function()
    local result = 0
    for i = 1, 1000 do
        result = result + math.sin(i) * math.cos(i)
    end
end, 100)

-- 8. Memory Leak Detection
local function detectMemoryLeaks()
    print("\\n=== Memory Leak Detection ===")
    
    local initialMemory = Stats:GetTotalMemoryUsageMb()
    
    -- Simulate potential memory leak
    local leakyConnections = {}
    for i = 1, 50 do
        local connection = RunService.Heartbeat:Connect(function()
            -- Do nothing - this is a leak
        end)
        table.insert(leakyConnections, connection)
    end
    
    wait(1)
    local leakyMemory = Stats:GetTotalMemoryUsageMb()
    
    -- Clean up connections
    for _, connection in ipairs(leakyConnections) do
        connection:Disconnect()
    end
    
    wait(1)
    local cleanedMemory = Stats:GetTotalMemoryUsageMb()
    
    print("Initial memory:", initialMemory, "MB")
    print("After creating connections:", leakyMemory, "MB")
    print("After cleaning up:", cleanedMemory, "MB")
    print("Memory leak detected:", leakyMemory > initialMemory + 1)
end

detectMemoryLeaks()

-- 9. Final cleanup
cleanupConnections()

print("\\nPerformance optimization demo complete!")`,
    challenge: {
      tests: [
        { description: 'Use object pooling for efficient memory usage', type: 'code_contains', value: 'table.remove' },
        { description: 'Monitor performance with Stats service', type: 'code_contains', value: 'Stats:GetTotalMemoryUsageMb' }
      ],
      hints: ['Use object pooling to reuse objects instead of creating new ones', 'Monitor memory usage with Stats service', 'Use dictionaries for O(1) lookups', 'Always disconnect events to prevent memory leaks'],
      successMessage: 'Outstanding! You understand advanced performance optimization techniques.'
    }
  }
};

export function getLessonContent(lessonSlug: string): LessonContent {
  return lessonContentMap[lessonSlug] || lessonContentMap['variables-and-printing'];
}
