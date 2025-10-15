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

  // === ADVANCED GAME MECHANICS LESSONS ===
  'advanced-tweening-systems': {
    title: 'Advanced Tweening Systems',
    description: 'Master complex animation systems, tween chaining, and advanced TweenService techniques',
    sections: [
      {
        title: 'Tween Chaining and Sequences',
        content: 'Create complex animation sequences by chaining multiple tweens together. Use TweenInfo.Completed events to trigger subsequent animations, creating smooth, professional transitions.',
        codeExample: `local tween1 = TweenService:Create(part, tweenInfo, {Position = Vector3.new(10, 0, 0)})
tween1.Completed:Connect(function()
    local tween2 = TweenService:Create(part, tweenInfo, {Size = Vector3.new(5, 5, 5)})
    tween2:Play()
end)
tween1:Play()`,
        color: 'blue'
      },
      {
        title: 'Custom Easing Functions',
        content: 'Create custom easing curves using TweenInfo with different EasingStyle and EasingDirection combinations. Master bounce, elastic, and back easing for dynamic animations.',
        codeExample: `local bounceInfo = TweenInfo.new(1, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out)
local elasticInfo = TweenInfo.new(1.5, Enum.EasingStyle.Elastic, Enum.EasingDirection.InOut)`,
        color: 'green'
      },
      {
        title: 'Animation State Management',
        content: 'Implement proper animation state management to prevent conflicts, handle interruptions, and create smooth transitions between different animation states.',
        codeExample: `local animationStates = {
    idle = true,
    walking = false,
    jumping = false
}

local function setAnimationState(newState)
    -- Stop all current animations
    for state, _ in pairs(animationStates) do
        animationStates[state] = false
    end
    animationStates[newState] = true
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced Tweening Systems
-- Complex animation sequences and state management

local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")

-- Create animated parts
local part1 = Instance.new("Part")
part1.Name = "AnimatedPart1"
part1.Size = Vector3.new(2, 2, 2)
part1.Position = Vector3.new(0, 5, 0)
part1.Color = Color3.fromRGB(255, 100, 100)
part1.Parent = workspace

local part2 = Instance.new("Part")
part2.Name = "AnimatedPart2"
part2.Size = Vector3.new(2, 2, 2)
part2.Position = Vector3.new(0, 5, 5)
part2.Color = Color3.fromRGB(100, 255, 100)
part2.Parent = workspace

print("=== ADVANCED TWEENING DEMO ===")

-- 1. Tween Chaining System
local function createChainedAnimation(part, startPos, endPos)
    local tweenInfo1 = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    local tweenInfo2 = TweenInfo.new(0.5, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out)
    
    -- First tween: move to position
    local moveTween = TweenService:Create(part, tweenInfo1, {
        Position = endPos
    })
    
    -- Second tween: scale up (chained)
    moveTween.Completed:Connect(function()
        local scaleTween = TweenService:Create(part, tweenInfo2, {
            Size = Vector3.new(4, 4, 4)
        })
        scaleTween:Play()
        
        -- Third tween: scale back down
        scaleTween.Completed:Connect(function()
            local scaleBackTween = TweenService:Create(part, tweenInfo2, {
                Size = Vector3.new(2, 2, 2)
            })
            scaleBackTween:Play()
        end)
    end)
    
    moveTween:Play()
end

-- 2. Custom Easing Functions
local function createCustomEasing(part, targetPos)
    local easingStyles = {
        Enum.EasingStyle.Linear,
        Enum.EasingStyle.Quad,
        Enum.EasingStyle.Cubic,
        Enum.EasingStyle.Quart,
        Enum.EasingStyle.Quint,
        Enum.EasingStyle.Bounce,
        Enum.EasingStyle.Elastic,
        Enum.EasingStyle.Back
    }
    
    local randomStyle = easingStyles[math.random(1, #easingStyles)]
    local tweenInfo = TweenInfo.new(2, randomStyle, Enum.EasingDirection.InOut)
    
    local tween = TweenService:Create(part, tweenInfo, {
        Position = targetPos,
        Color = Color3.fromRGB(math.random(255), math.random(255), math.random(255))
    })
    
    tween:Play()
    return tween
end

-- 3. Animation State Management
local animationStates = {
    idle = true,
    moving = false,
    scaling = false,
    rotating = false
}

local activeTweens = {}

local function setAnimationState(newState)
    -- Stop all current animations
    for _, tween in pairs(activeTweens) do
        tween:Cancel()
    end
    activeTweens = {}
    
    -- Reset state
    for state, _ in pairs(animationStates) do
        animationStates[state] = false
    end
    animationStates[newState] = true
    
    print("Animation state changed to:", newState)
end

-- 4. Complex Animation Sequence
local function runComplexSequence(part)
    setAnimationState("moving")
    
    -- Phase 1: Move to random position
    local targetPos = Vector3.new(
        math.random(-20, 20),
        math.random(5, 15),
        math.random(-20, 20)
    )
    
    local moveTween = TweenService:Create(part, 
        TweenInfo.new(2, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut), 
        {Position = targetPos}
    )
    
    moveTween.Completed:Connect(function()
        setAnimationState("scaling")
        
        -- Phase 2: Scale animation
        local scaleUp = TweenService:Create(part,
            TweenInfo.new(0.5, Enum.EasingStyle.Back, Enum.EasingDirection.Out),
            {Size = Vector3.new(5, 5, 5)}
        )
        
        scaleUp.Completed:Connect(function()
            local scaleDown = TweenService:Create(part,
                TweenInfo.new(0.5, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out),
                {Size = Vector3.new(2, 2, 2)}
            )
            
            scaleDown.Completed:Connect(function()
                setAnimationState("rotating")
                
                -- Phase 3: Rotation
                local rotateTween = TweenService:Create(part,
                    TweenInfo.new(1, Enum.EasingStyle.Elastic, Enum.EasingDirection.InOut),
                    {CFrame = part.CFrame * CFrame.Angles(0, math.rad(360), 0)}
                )
                
                rotateTween.Completed:Connect(function()
                    setAnimationState("idle")
                    print("Complex animation sequence completed!")
                end)
                
                activeTweens.rotate = rotateTween
                rotateTween:Play()
            end)
            
            activeTweens.scaleDown = scaleDown
            scaleDown:Play()
        end)
        
        activeTweens.scaleUp = scaleUp
        scaleUp:Play()
    end)
    
    activeTweens.move = moveTween
    moveTween:Play()
end

-- 5. Demo the animations
print("\\nStarting chained animation for part1...")
createChainedAnimation(part1, part1.Position, Vector3.new(10, 5, 0))

wait(1)

print("\\nStarting custom easing for part2...")
createCustomEasing(part2, Vector3.new(-10, 5, 5))

wait(2)

print("\\nStarting complex sequence for part1...")
runComplexSequence(part1)

print("\\nAdvanced tweening demo complete!")`,
    challenge: {
      tests: [
        { description: 'Create a tween with custom easing style', type: 'code_contains', value: 'EasingStyle' },
        { description: 'Use TweenInfo.Completed to chain animations', type: 'code_contains', value: 'Completed' }
      ],
      hints: ['Use TweenInfo.Completed:Connect() to chain tweens', 'Experiment with different EasingStyle values', 'Manage animation states to prevent conflicts'],
      successMessage: 'Outstanding! You can now create complex, professional animation systems.'
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
