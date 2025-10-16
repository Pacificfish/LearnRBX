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

  // === LIGHTING & ENVIRONMENT SYSTEMS ===
  'lighting-basics': {
    title: 'Lighting & Environment Basics',
    description: 'Master lighting systems, atmosphere, and environmental effects in Roblox',
    sections: [
      {
        title: 'Understanding Lighting Service',
        content: `The Lighting service controls the global lighting and atmosphere of your game world. Proper lighting creates mood, atmosphere, and visual appeal.

**Key Lighting Properties:**
- **Ambient**: Overall brightness of shadows (Color3)
- **Brightness**: Overall brightness multiplier (number)
- **ColorShift_Bottom**: Color tint for bottom of sky (Color3)
- **ColorShift_Top**: Color tint for top of sky (Color3)
- **OutdoorAmbient**: Brightness of outdoor lighting (Color3)
- **ShadowSoftness**: How soft shadows appear (number)

**Lighting Methods:**
- **GetSunDirection()**: Get current sun direction
- **SetSunDirection()**: Set sun direction
- **GetSunAngles()**: Get sun angles
- **SetSunAngles()**: Set sun angles`,
        codeExample: `-- Basic lighting setup

local Lighting = game:GetService("Lighting")

-- Basic lighting configuration
Lighting.Ambient = Color3.fromRGB(100, 100, 100)  -- Soft ambient lighting
Lighting.Brightness = 2  -- Bright overall lighting
Lighting.ColorShift_Bottom = Color3.fromRGB(0, 0, 0)  -- No bottom tint
Lighting.ColorShift_Top = Color3.fromRGB(0, 0, 0)  -- No top tint
Lighting.OutdoorAmbient = Color3.fromRGB(127, 127, 127)  -- Outdoor lighting
Lighting.ShadowSoftness = 0.2  -- Soft shadows

-- Set sun direction for different times of day
Lighting:SetSunDirection(Vector3.new(0, 1, 0))  -- Noon sun

print("Basic lighting setup complete!")
print("Ambient lighting:", Lighting.Ambient)
print("Brightness:", Lighting.Brightness)
print("Shadow softness:", Lighting.ShadowSoftness)`,
        color: 'blue'
      },
      {
        title: 'Dynamic Lighting Systems',
        content: `Create dynamic lighting that changes over time, responds to game events, and creates immersive atmospheres.

**Dynamic Lighting Features:**
- **Time of Day**: Cycle through different lighting conditions
- **Weather Effects**: Rain, fog, storms with lighting changes
- **Event-Based Lighting**: Lighting that responds to game events
- **Smooth Transitions**: Gradual changes between lighting states
- **Performance Optimization**: Efficient lighting updates

**Advanced Lighting Techniques:**
- **Color Temperature**: Warm/cool lighting based on time
- **Atmospheric Perspective**: Distance-based lighting changes
- **Dynamic Shadows**: Shadows that change with lighting`,
        codeExample: `-- Dynamic lighting system

local Lighting = game:GetService("Lighting")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local DynamicLighting = {}
DynamicLighting.__index = DynamicLighting

function DynamicLighting.new()
    local self = setmetatable({}, DynamicLighting)
    self.lighting = Lighting
    self.currentTime = 12  -- 12 PM
    self.timeSpeed = 1  -- Real-time speed
    self.isDay = true
    self.weather = "clear"
    
    -- Lighting presets
    self.presets = {
        dawn = {
            ambient = Color3.fromRGB(150, 100, 50),
            brightness = 1.5,
            outdoorAmbient = Color3.fromRGB(200, 150, 100),
            sunDirection = Vector3.new(0.5, 0.8, 0.3)
        },
        noon = {
            ambient = Color3.fromRGB(100, 100, 100),
            brightness = 2,
            outdoorAmbient = Color3.fromRGB(255, 255, 255),
            sunDirection = Vector3.new(0, 1, 0)
        },
        dusk = {
            ambient = Color3.fromRGB(100, 50, 150),
            brightness = 1.2,
            outdoorAmbient = Color3.fromRGB(150, 100, 200),
            sunDirection = Vector3.new(-0.5, 0.8, 0.3)
        },
        night = {
            ambient = Color3.fromRGB(20, 20, 40),
            brightness = 0.3,
            outdoorAmbient = Color3.fromRGB(50, 50, 100),
            sunDirection = Vector3.new(0, -1, 0)
        }
    }
    
    return self
end

function DynamicLighting:setTime(hour)
    self.currentTime = hour
    self:updateLighting()
    print("Time set to:", hour, "o'clock")
end

function DynamicLighting:setTimeSpeed(speed)
    self.timeSpeed = speed
    print("Time speed set to:", speed)
end

function DynamicLighting:setWeather(weatherType)
    self.weather = weatherType
    self:updateLighting()
    print("Weather changed to:", weatherType)
end

function DynamicLighting:updateLighting()
    local preset
    
    -- Determine lighting preset based on time
    if self.currentTime >= 6 and self.currentTime < 12 then
        preset = self.presets.dawn
        self.isDay = true
    elseif self.currentTime >= 12 and self.currentTime < 18 then
        preset = self.presets.noon
        self.isDay = true
    elseif self.currentTime >= 18 and self.currentTime < 22 then
        preset = self.presets.dusk
        self.isDay = false
    else
        preset = self.presets.night
        self.isDay = false
    end
    
    -- Apply weather modifications
    if self.weather == "rainy" then
        preset.ambient = Color3.fromRGB(preset.ambient.R * 0.7, preset.ambient.G * 0.7, preset.ambient.B * 0.8)
        preset.brightness = preset.brightness * 0.6
    elseif self.weather == "foggy" then
        preset.ambient = Color3.fromRGB(preset.ambient.R * 0.8, preset.ambient.G * 0.8, preset.ambient.B * 0.9)
        preset.brightness = preset.brightness * 0.7
    end
    
    -- Apply lighting with smooth transition
    self:transitionToPreset(preset)
end

function DynamicLighting:transitionToPreset(preset, duration)
    duration = duration or 2
    
    local tweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    -- Tween ambient lighting
    local ambientTween = TweenService:Create(self.lighting, tweenInfo, {
        Ambient = preset.ambient
    })
    
    -- Tween brightness
    local brightnessTween = TweenService:Create(self.lighting, tweenInfo, {
        Brightness = preset.brightness
    })
    
    -- Tween outdoor ambient
    local outdoorTween = TweenService:Create(self.lighting, tweenInfo, {
        OutdoorAmbient = preset.outdoorAmbient
    })
    
    -- Start tweens
    ambientTween:Play()
    brightnessTween:Play()
    outdoorTween:Play()
    
    -- Set sun direction
    self.lighting:SetSunDirection(preset.sunDirection)
end

function DynamicLighting:startTimeCycle()
    local connection
    connection = RunService.Heartbeat:Connect(function(deltaTime)
        self.currentTime = self.currentTime + (deltaTime * self.timeSpeed / 3600)  -- Convert to hours
        
        if self.currentTime >= 24 then
            self.currentTime = 0
        end
        
        self:updateLighting()
    end)
    
    print("Time cycle started")
    return connection
end

function DynamicLighting:createLightingEvent(eventName, duration, lightingChanges)
    duration = duration or 5
    
    print("Lighting event started:", eventName)
    
    -- Store original lighting
    local originalAmbient = self.lighting.Ambient
    local originalBrightness = self.lighting.Brightness
    local originalOutdoor = self.lighting.OutdoorAmbient
    
    -- Apply event lighting
    if lightingChanges.ambient then
        self.lighting.Ambient = lightingChanges.ambient
    end
    if lightingChanges.brightness then
        self.lighting.Brightness = lightingChanges.brightness
    end
    if lightingChanges.outdoorAmbient then
        self.lighting.OutdoorAmbient = lightingChanges.outdoorAmbient
    end
    
    -- Wait for duration
    wait(duration)
    
    -- Restore original lighting
    self.lighting.Ambient = originalAmbient
    self.lighting.Brightness = originalBrightness
    self.lighting.OutdoorAmbient = originalOutdoor
    
    print("Lighting event ended:", eventName)
end

-- Example usage
local dynamicLighting = DynamicLighting.new()

-- Test time changes
dynamicLighting:setTime(6)  -- Dawn
wait(3)
dynamicLighting:setTime(12)  -- Noon
wait(3)
dynamicLighting:setTime(18)  -- Dusk
wait(3)
dynamicLighting:setTime(0)  -- Night

-- Test weather
dynamicLighting:setWeather("rainy")
wait(3)
dynamicLighting:setWeather("foggy")
wait(3)
dynamicLighting:setWeather("clear")

-- Test lighting event
dynamicLighting:createLightingEvent("Flash", 1, {
    brightness = 5,
    ambient = Color3.fromRGB(255, 255, 255)
})

-- Start time cycle
local timeConnection = dynamicLighting:startTimeCycle()`,
        color: 'green'
      },
      {
        title: 'Atmosphere & Sky Effects',
        content: `Create immersive atmospheric effects using the Atmosphere and Sky objects to enhance your game's visual appeal.

**Atmosphere Properties:**
- **Density**: How thick the atmosphere appears (0-1)
- **Offset**: Height offset for atmosphere effect (0-1)
- **Color**: Color of the atmosphere (Color3)
- **Decay**: How atmosphere fades with distance (Color3)
- **Glare**: Brightness of atmospheric glare (0-1)
- **Haze**: Atmospheric haze intensity (0-1)

**Sky Properties:**
- **CelestialBodiesShown**: Show sun/moon in sky
- **MoonAngularSize**: Size of moon in sky
- **MoonSize**: Moon texture size
- **StarCount**: Number of stars visible
- **SunAngularSize**: Size of sun in sky
- **SunSize**: Sun texture size

**Advanced Sky Features:**
- **Dynamic Sky Changes**: Sky that changes with time
- **Weather Integration**: Sky effects for different weather
- **Custom Skyboxes**: Custom sky textures and effects`,
        codeExample: `-- Atmosphere and sky effects system

local Lighting = game:GetService("Lighting")
local TweenService = game:GetService("TweenService")

local AtmosphereSystem = {}
AtmosphereSystem.__index = AtmosphereSystem

function AtmosphereSystem.new()
    local self = setmetatable({}, AtmosphereSystem)
    self.lighting = Lighting
    self.atmosphere = nil
    self.sky = nil
    
    self:setupAtmosphere()
    self:setupSky()
    
    return self
end

function AtmosphereSystem:setupAtmosphere()
    -- Create or get existing atmosphere
    self.atmosphere = self.lighting:FindFirstChild("Atmosphere")
    if not self.atmosphere then
        self.atmosphere = Instance.new("Atmosphere")
        self.atmosphere.Parent = self.lighting
    end
    
    -- Set default atmosphere
    self.atmosphere.Density = 0.3
    self.atmosphere.Offset = 0.25
    self.atmosphere.Color = Color3.fromRGB(199, 199, 199)
    self.atmosphere.Decay = Color3.fromRGB(92, 60, 13)
    self.atmosphere.Glare = 0
    self.atmosphere.Haze = 0
    
    print("Atmosphere setup complete")
end

function AtmosphereSystem:setupSky()
    -- Create or get existing sky
    self.sky = self.lighting:FindFirstChild("Sky")
    if not self.sky then
        self.sky = Instance.new("Sky")
        self.sky.Parent = self.lighting
    end
    
    -- Set default sky
    self.sky.CelestialBodiesShown = true
    self.sky.MoonAngularSize = 11
    self.sky.MoonSize = 11
    self.sky.StarCount = 100
    self.sky.SunAngularSize = 21
    self.sky.SunSize = 21
    
    print("Sky setup complete")
end

function AtmosphereSystem:setAtmospherePreset(presetName)
    local presets = {
        clear = {
            density = 0.1,
            offset = 0.25,
            color = Color3.fromRGB(199, 199, 199),
            decay = Color3.fromRGB(92, 60, 13),
            glare = 0,
            haze = 0
        },
        hazy = {
            density = 0.5,
            offset = 0.3,
            color = Color3.fromRGB(150, 150, 150),
            decay = Color3.fromRGB(100, 80, 50),
            glare = 0.2,
            haze = 0.3
        },
        foggy = {
            density = 0.8,
            offset = 0.1,
            color = Color3.fromRGB(200, 200, 200),
            decay = Color3.fromRGB(150, 150, 150),
            glare = 0.1,
            haze = 0.8
        },
        stormy = {
            density = 0.6,
            offset = 0.2,
            color = Color3.fromRGB(100, 100, 120),
            decay = Color3.fromRGB(50, 50, 70),
            glare = 0.3,
            haze = 0.5
        }
    }
    
    local preset = presets[presetName]
    if preset then
        self:transitionAtmosphere(preset)
        print("Atmosphere preset changed to:", presetName)
    end
end

function AtmosphereSystem:transitionAtmosphere(preset, duration)
    duration = duration or 2
    
    local tweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    local atmosphereTween = TweenService:Create(self.atmosphere, tweenInfo, {
        Density = preset.density,
        Offset = preset.offset,
        Color = preset.color,
        Decay = preset.decay,
        Glare = preset.glare,
        Haze = preset.haze
    })
    
    atmosphereTween:Play()
end

function AtmosphereSystem:setSkyPreset(presetName)
    local presets = {
        day = {
            celestialBodiesShown = true,
            moonAngularSize = 0,
            moonSize = 0,
            starCount = 0,
            sunAngularSize = 21,
            sunSize = 21
        },
        night = {
            celestialBodiesShown = true,
            moonAngularSize = 11,
            moonSize = 11,
            starCount = 100,
            sunAngularSize = 0,
            sunSize = 0
        },
        dusk = {
            celestialBodiesShown = true,
            moonAngularSize = 8,
            moonSize = 8,
            starCount = 50,
            sunAngularSize = 15,
            sunSize = 15
        }
    }
    
    local preset = presets[presetName]
    if preset then
        self:transitionSky(preset)
        print("Sky preset changed to:", presetName)
    end
end

function AtmosphereSystem:transitionSky(preset, duration)
    duration = duration or 2
    
    local tweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    local skyTween = TweenService:Create(self.sky, tweenInfo, {
        CelestialBodiesShown = preset.celestialBodiesShown,
        MoonAngularSize = preset.moonAngularSize,
        MoonSize = preset.moonSize,
        StarCount = preset.starCount,
        SunAngularSize = preset.sunAngularSize,
        SunSize = preset.sunSize
    })
    
    skyTween:Play()
end

function AtmosphereSystem:createWeatherEffect(weatherType, duration)
    duration = duration or 10
    
    print("Weather effect started:", weatherType)
    
    if weatherType == "rain" then
        self:setAtmospherePreset("stormy")
        self:setSkyPreset("dusk")
        
        -- Create rain effect (simplified)
        local rain = Instance.new("Part")
        rain.Name = "RainEffect"
        rain.Size = Vector3.new(1000, 1000, 1000)
        rain.Transparency = 0.8
        rain.Color = Color3.fromRGB(100, 150, 255)
        rain.Material = Enum.Material.ForceField
        rain.Parent = workspace
        
        wait(duration)
        rain:Destroy()
        
    elseif weatherType == "fog" then
        self:setAtmospherePreset("foggy")
        self:setSkyPreset("dusk")
        
        wait(duration)
        
    elseif weatherType == "clear" then
        self:setAtmospherePreset("clear")
        self:setSkyPreset("day")
        
        wait(duration)
    end
    
    print("Weather effect ended:", weatherType)
end

-- Example usage
local atmosphereSystem = AtmosphereSystem.new()

-- Test atmosphere presets
atmosphereSystem:setAtmospherePreset("clear")
wait(3)
atmosphereSystem:setAtmospherePreset("hazy")
wait(3)
atmosphereSystem:setAtmospherePreset("foggy")
wait(3)
atmosphereSystem:setAtmospherePreset("stormy")

-- Test sky presets
atmosphereSystem:setSkyPreset("day")
wait(3)
atmosphereSystem:setSkyPreset("dusk")
wait(3)
atmosphereSystem:setSkyPreset("night")

-- Test weather effects
atmosphereSystem:createWeatherEffect("rain", 5)
wait(6)
atmosphereSystem:createWeatherEffect("fog", 5)
wait(6)
atmosphereSystem:createWeatherEffect("clear", 5)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Lighting & Environment Basics - Comprehensive Learning Example
-- Master lighting systems and environmental effects in Roblox

local Lighting = game:GetService("Lighting")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

print("=== LIGHTING & ENVIRONMENT BASICS DEMO ===")
print("Learning lighting systems and environmental effects...")

-- 1. BASIC LIGHTING SETUP
print("\\n1. DEMONSTRATING BASIC LIGHTING...")

local function setupBasicLighting()
    -- Basic lighting configuration
    Lighting.Ambient = Color3.fromRGB(100, 100, 100)  -- Soft ambient lighting
    Lighting.Brightness = 2  -- Bright overall lighting
    Lighting.ColorShift_Bottom = Color3.fromRGB(0, 0, 0)  -- No bottom tint
    Lighting.ColorShift_Top = Color3.fromRGB(0, 0, 0)  -- No top tint
    Lighting.OutdoorAmbient = Color3.fromRGB(127, 127, 127)  -- Outdoor lighting
    Lighting.ShadowSoftness = 0.2  -- Soft shadows
    
    -- Set sun direction for noon
    Lighting:SetSunDirection(Vector3.new(0, 1, 0))
    
    print("Basic lighting setup complete!")
    print("Ambient lighting:", Lighting.Ambient)
    print("Brightness:", Lighting.Brightness)
    print("Shadow softness:", Lighting.ShadowSoftness)
end

-- 2. DYNAMIC LIGHTING SYSTEM
print("\\n2. DEMONSTRATING DYNAMIC LIGHTING...")

local DynamicLighting = {}
DynamicLighting.__index = DynamicLighting

function DynamicLighting.new()
    local self = setmetatable({}, DynamicLighting)
    self.lighting = Lighting
    self.currentTime = 12  -- 12 PM
    self.timeSpeed = 1  -- Real-time speed
    self.isDay = true
    self.weather = "clear"
    
    -- Lighting presets
    self.presets = {
        dawn = {
            ambient = Color3.fromRGB(150, 100, 50),
            brightness = 1.5,
            outdoorAmbient = Color3.fromRGB(200, 150, 100),
            sunDirection = Vector3.new(0.5, 0.8, 0.3)
        },
        noon = {
            ambient = Color3.fromRGB(100, 100, 100),
            brightness = 2,
            outdoorAmbient = Color3.fromRGB(255, 255, 255),
            sunDirection = Vector3.new(0, 1, 0)
        },
        dusk = {
            ambient = Color3.fromRGB(100, 50, 150),
            brightness = 1.2,
            outdoorAmbient = Color3.fromRGB(150, 100, 200),
            sunDirection = Vector3.new(-0.5, 0.8, 0.3)
        },
        night = {
            ambient = Color3.fromRGB(20, 20, 40),
            brightness = 0.3,
            outdoorAmbient = Color3.fromRGB(50, 50, 100),
            sunDirection = Vector3.new(0, -1, 0)
        }
    }
    
    return self
end

function DynamicLighting:setTime(hour)
    self.currentTime = hour
    self:updateLighting()
    print("Time set to:", hour, "o'clock")
end

function DynamicLighting:setTimeSpeed(speed)
    self.timeSpeed = speed
    print("Time speed set to:", speed)
end

function DynamicLighting:setWeather(weatherType)
    self.weather = weatherType
    self:updateLighting()
    print("Weather changed to:", weatherType)
end

function DynamicLighting:updateLighting()
    local preset
    
    -- Determine lighting preset based on time
    if self.currentTime >= 6 and self.currentTime < 12 then
        preset = self.presets.dawn
        self.isDay = true
    elseif self.currentTime >= 12 and self.currentTime < 18 then
        preset = self.presets.noon
        self.isDay = true
    elseif self.currentTime >= 18 and self.currentTime < 22 then
        preset = self.presets.dusk
        self.isDay = false
    else
        preset = self.presets.night
        self.isDay = false
    end
    
    -- Apply weather modifications
    if self.weather == "rainy" then
        preset.ambient = Color3.fromRGB(preset.ambient.R * 0.7, preset.ambient.G * 0.7, preset.ambient.B * 0.8)
        preset.brightness = preset.brightness * 0.6
    elseif self.weather == "foggy" then
        preset.ambient = Color3.fromRGB(preset.ambient.R * 0.8, preset.ambient.G * 0.8, preset.ambient.B * 0.9)
        preset.brightness = preset.brightness * 0.7
    end
    
    -- Apply lighting with smooth transition
    self:transitionToPreset(preset)
end

function DynamicLighting:transitionToPreset(preset, duration)
    duration = duration or 2
    
    local tweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    -- Tween ambient lighting
    local ambientTween = TweenService:Create(self.lighting, tweenInfo, {
        Ambient = preset.ambient
    })
    
    -- Tween brightness
    local brightnessTween = TweenService:Create(self.lighting, tweenInfo, {
        Brightness = preset.brightness
    })
    
    -- Tween outdoor ambient
    local outdoorTween = TweenService:Create(self.lighting, tweenInfo, {
        OutdoorAmbient = preset.outdoorAmbient
    })
    
    -- Start tweens
    ambientTween:Play()
    brightnessTween:Play()
    outdoorTween:Play()
    
    -- Set sun direction
    self.lighting:SetSunDirection(preset.sunDirection)
end

function DynamicLighting:startTimeCycle()
    local connection
    connection = RunService.Heartbeat:Connect(function(deltaTime)
        self.currentTime = self.currentTime + (deltaTime * self.timeSpeed / 3600)  -- Convert to hours
        
        if self.currentTime >= 24 then
            self.currentTime = 0
        end
        
        self:updateLighting()
    end)
    
    print("Time cycle started")
    return connection
end

function DynamicLighting:createLightingEvent(eventName, duration, lightingChanges)
    duration = duration or 5
    
    print("Lighting event started:", eventName)
    
    -- Store original lighting
    local originalAmbient = self.lighting.Ambient
    local originalBrightness = self.lighting.Brightness
    local originalOutdoor = self.lighting.OutdoorAmbient
    
    -- Apply event lighting
    if lightingChanges.ambient then
        self.lighting.Ambient = lightingChanges.ambient
    end
    if lightingChanges.brightness then
        self.lighting.Brightness = lightingChanges.brightness
    end
    if lightingChanges.outdoorAmbient then
        self.lighting.OutdoorAmbient = lightingChanges.outdoorAmbient
    end
    
    -- Wait for duration
    wait(duration)
    
    -- Restore original lighting
    self.lighting.Ambient = originalAmbient
    self.lighting.Brightness = originalBrightness
    self.lighting.OutdoorAmbient = originalOutdoor
    
    print("Lighting event ended:", eventName)
end

-- 3. ATMOSPHERE & SKY EFFECTS SYSTEM
print("\\n3. DEMONSTRATING ATMOSPHERE & SKY EFFECTS...")

local AtmosphereSystem = {}
AtmosphereSystem.__index = AtmosphereSystem

function AtmosphereSystem.new()
    local self = setmetatable({}, AtmosphereSystem)
    self.lighting = Lighting
    self.atmosphere = nil
    self.sky = nil
    
    self:setupAtmosphere()
    self:setupSky()
    
    return self
end

function AtmosphereSystem:setupAtmosphere()
    -- Create or get existing atmosphere
    self.atmosphere = self.lighting:FindFirstChild("Atmosphere")
    if not self.atmosphere then
        self.atmosphere = Instance.new("Atmosphere")
        self.atmosphere.Parent = self.lighting
    end
    
    -- Set default atmosphere
    self.atmosphere.Density = 0.3
    self.atmosphere.Offset = 0.25
    self.atmosphere.Color = Color3.fromRGB(199, 199, 199)
    self.atmosphere.Decay = Color3.fromRGB(92, 60, 13)
    self.atmosphere.Glare = 0
    self.atmosphere.Haze = 0
    
    print("Atmosphere setup complete")
end

function AtmosphereSystem:setupSky()
    -- Create or get existing sky
    self.sky = self.lighting:FindFirstChild("Sky")
    if not self.sky then
        self.sky = Instance.new("Sky")
        self.sky.Parent = self.lighting
    end
    
    -- Set default sky
    self.sky.CelestialBodiesShown = true
    self.sky.MoonAngularSize = 11
    self.sky.MoonSize = 11
    self.sky.StarCount = 100
    self.sky.SunAngularSize = 21
    self.sky.SunSize = 21
    
    print("Sky setup complete")
end

function AtmosphereSystem:setAtmospherePreset(presetName)
    local presets = {
        clear = {
            density = 0.1,
            offset = 0.25,
            color = Color3.fromRGB(199, 199, 199),
            decay = Color3.fromRGB(92, 60, 13),
            glare = 0,
            haze = 0
        },
        hazy = {
            density = 0.5,
            offset = 0.3,
            color = Color3.fromRGB(150, 150, 150),
            decay = Color3.fromRGB(100, 80, 50),
            glare = 0.2,
            haze = 0.3
        },
        foggy = {
            density = 0.8,
            offset = 0.1,
            color = Color3.fromRGB(200, 200, 200),
            decay = Color3.fromRGB(150, 150, 150),
            glare = 0.1,
            haze = 0.8
        },
        stormy = {
            density = 0.6,
            offset = 0.2,
            color = Color3.fromRGB(100, 100, 120),
            decay = Color3.fromRGB(50, 50, 70),
            glare = 0.3,
            haze = 0.5
        }
    }
    
    local preset = presets[presetName]
    if preset then
        self:transitionAtmosphere(preset)
        print("Atmosphere preset changed to:", presetName)
    end
end

function AtmosphereSystem:transitionAtmosphere(preset, duration)
    duration = duration or 2
    
    local tweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    local atmosphereTween = TweenService:Create(self.atmosphere, tweenInfo, {
        Density = preset.density,
        Offset = preset.offset,
        Color = preset.color,
        Decay = preset.decay,
        Glare = preset.glare,
        Haze = preset.haze
    })
    
    atmosphereTween:Play()
end

function AtmosphereSystem:setSkyPreset(presetName)
    local presets = {
        day = {
            celestialBodiesShown = true,
            moonAngularSize = 0,
            moonSize = 0,
            starCount = 0,
            sunAngularSize = 21,
            sunSize = 21
        },
        night = {
            celestialBodiesShown = true,
            moonAngularSize = 11,
            moonSize = 11,
            starCount = 100,
            sunAngularSize = 0,
            sunSize = 0
        },
        dusk = {
            celestialBodiesShown = true,
            moonAngularSize = 8,
            moonSize = 8,
            starCount = 50,
            sunAngularSize = 15,
            sunSize = 15
        }
    }
    
    local preset = presets[presetName]
    if preset then
        self:transitionSky(preset)
        print("Sky preset changed to:", presetName)
    end
end

function AtmosphereSystem:transitionSky(preset, duration)
    duration = duration or 2
    
    local tweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
    
    local skyTween = TweenService:Create(self.sky, tweenInfo, {
        CelestialBodiesShown = preset.celestialBodiesShown,
        MoonAngularSize = preset.moonAngularSize,
        MoonSize = preset.moonSize,
        StarCount = preset.starCount,
        SunAngularSize = preset.sunAngularSize,
        SunSize = preset.sunSize
    })
    
    skyTween:Play()
end

function AtmosphereSystem:createWeatherEffect(weatherType, duration)
    duration = duration or 10
    
    print("Weather effect started:", weatherType)
    
    if weatherType == "rain" then
        self:setAtmospherePreset("stormy")
        self:setSkyPreset("dusk")
        
        -- Create rain effect (simplified)
        local rain = Instance.new("Part")
        rain.Name = "RainEffect"
        rain.Size = Vector3.new(1000, 1000, 1000)
        rain.Transparency = 0.8
        rain.Color = Color3.fromRGB(100, 150, 255)
        rain.Material = Enum.Material.ForceField
        rain.Parent = workspace
        
        wait(duration)
        rain:Destroy()
        
    elseif weatherType == "fog" then
        self:setAtmospherePreset("foggy")
        self:setSkyPreset("dusk")
        
        wait(duration)
        
    elseif weatherType == "clear" then
        self:setAtmospherePreset("clear")
        self:setSkyPreset("day")
        
        wait(duration)
    end
    
    print("Weather effect ended:", weatherType)
end

-- 4. DEMO THE LIGHTING SYSTEMS
print("\\n4. RUNNING LIGHTING SYSTEM DEMONSTRATIONS...")

-- Setup basic lighting
setupBasicLighting()

-- Create dynamic lighting system
local dynamicLighting = DynamicLighting.new()

-- Create atmosphere system
local atmosphereSystem = AtmosphereSystem.new()

-- Test time changes
wait(1)
print("\\n--- Testing Time Changes ---")
dynamicLighting:setTime(6)  -- Dawn
wait(3)
dynamicLighting:setTime(12)  -- Noon
wait(3)
dynamicLighting:setTime(18)  -- Dusk
wait(3)
dynamicLighting:setTime(0)  -- Night

-- Test weather
wait(1)
print("\\n--- Testing Weather ---")
dynamicLighting:setWeather("rainy")
wait(3)
dynamicLighting:setWeather("foggy")
wait(3)
dynamicLighting:setWeather("clear")

-- Test lighting event
wait(1)
print("\\n--- Testing Lighting Events ---")
dynamicLighting:createLightingEvent("Flash", 1, {
    brightness = 5,
    ambient = Color3.fromRGB(255, 255, 255)
})

-- Test atmosphere presets
wait(1)
print("\\n--- Testing Atmosphere Presets ---")
atmosphereSystem:setAtmospherePreset("clear")
wait(3)
atmosphereSystem:setAtmospherePreset("hazy")
wait(3)
atmosphereSystem:setAtmospherePreset("foggy")
wait(3)
atmosphereSystem:setAtmospherePreset("stormy")

-- Test sky presets
wait(1)
print("\\n--- Testing Sky Presets ---")
atmosphereSystem:setSkyPreset("day")
wait(3)
atmosphereSystem:setSkyPreset("dusk")
wait(3)
atmosphereSystem:setSkyPreset("night")

-- Test weather effects
wait(1)
print("\\n--- Testing Weather Effects ---")
atmosphereSystem:createWeatherEffect("rain", 5)
wait(6)
atmosphereSystem:createWeatherEffect("fog", 5)
wait(6)
atmosphereSystem:createWeatherEffect("clear", 5)

-- Start time cycle
wait(1)
print("\\n--- Starting Time Cycle ---")
local timeConnection = dynamicLighting:startTimeCycle()

print("\\n=== LIGHTING & ENVIRONMENT BASICS DEMO COMPLETE ===")
print("You've learned lighting systems and environmental effects!")`,
    challenge: {
      tests: [
        { description: 'Set lighting properties like Ambient and Brightness', type: 'code_contains', value: 'Ambient' },
        { description: 'Use TweenService to create smooth lighting transitions', type: 'code_contains', value: 'TweenService' },
        { description: 'Create Atmosphere and Sky objects', type: 'code_contains', value: 'Atmosphere' }
      ],
      hints: [
        'Use Lighting.Ambient and Lighting.Brightness to control global lighting',
        'Use TweenService:Create() to animate lighting properties smoothly',
        'Use Instance.new("Atmosphere") and Instance.new("Sky") for environmental effects',
        'Use Lighting:SetSunDirection() to control sun position',
        'Use RunService.Heartbeat to create dynamic lighting cycles'
      ],
      successMessage: 'Excellent! You now understand lighting and environmental systems. These skills are essential for creating immersive game atmospheres!'
    }
  },

  'post-processing-effects': {
    title: 'Post-Processing Effects',
    description: 'Create stunning visual effects using post-processing techniques and advanced lighting',
    sections: [
      {
        title: 'Understanding Post-Processing',
        content: `Post-processing effects enhance your game's visual quality by applying effects after the initial rendering. These effects can dramatically improve the look and feel of your game.

**Post-Processing Effects:**
- **Bloom**: Bright areas glow and bleed into surrounding areas
- **Blur**: Motion blur and depth of field effects
- **Color Correction**: Adjust colors, contrast, and saturation
- **Distortion**: Screen distortion and warping effects
- **Film Grain**: Add film-like texture to the image

**Post-Processing Properties:**
- **Enabled**: Whether the effect is active
- **Intensity**: Strength of the effect (0-1)
- **Size**: Size/scale of the effect
- **Threshold**: Minimum brightness for effect to apply`,
        codeExample: `-- Basic post-processing setup

local Lighting = game:GetService("Lighting")
local TweenService = game:GetService("TweenService")

-- Create Bloom effect
local bloom = Instance.new("BloomEffect")
bloom.Parent = Lighting
bloom.Enabled = true
bloom.Intensity = 0.5
bloom.Size = 24
bloom.Threshold = 0.8

-- Create Blur effect
local blur = Instance.new("BlurEffect")
blur.Parent = Lighting
bloom.Enabled = true
blur.Size = 2

-- Create Color Correction
local colorCorrection = Instance.new("ColorCorrectionEffect")
colorCorrection.Parent = Lighting
colorCorrection.Enabled = true
colorCorrection.Brightness = 0.1
colorCorrection.Contrast = 0.1
colorCorrection.Saturation = 0.1
colorCorrection.TintColor = Color3.fromRGB(255, 255, 255)

print("Post-processing effects setup complete!")`,
        color: 'blue'
      },
      {
        title: 'Advanced Visual Effects',
        content: `Create sophisticated visual effects that respond to game events and create cinematic experiences.

**Advanced Effects:**
- **Screen Shake**: Camera shake effects
- **Flash Effects**: Screen flash for impacts
- **Fade Effects**: Screen fade in/out
- **Distortion Effects**: Screen warping and distortion
- **Particle Integration**: Combine with particle systems

**Effect Management:**
- **Effect Layering**: Multiple effects working together
- **Effect Timing**: Synchronized effect sequences
- **Performance Optimization**: Efficient effect rendering
- **Dynamic Effects**: Effects that change based on game state`,
        codeExample: `-- Advanced visual effects system

local AdvancedEffects = {}
AdvancedEffects.__index = AdvancedEffects

function AdvancedEffects.new()
    local self = setmetatable({}, AdvancedEffects)
    self.lighting = game:GetService("Lighting")
    self.tweenService = game:GetService("TweenService")
    self.runService = game:GetService("RunService")
    
    -- Effect storage
    self.effects = {}
    self.activeEffects = {}
    
    self:setupEffects()
    
    return self
end

function AdvancedEffects:setupEffects()
    -- Create all post-processing effects
    self.effects.bloom = self:createEffect("BloomEffect", {
        intensity = 0.5,
        size = 24,
        threshold = 0.8
    })
    
    self.effects.blur = self:createEffect("BlurEffect", {
        size = 2
    })
    
    self.effects.colorCorrection = self:createEffect("ColorCorrectionEffect", {
        brightness = 0,
        contrast = 0,
        saturation = 0,
        tintColor = Color3.fromRGB(255, 255, 255)
    })
    
    self.effects.distortion = self:createEffect("DistortionEffect", {
        intensity = 0.1
    })
    
    self.effects.filmGrain = self:createEffect("FilmGrainEffect", {
        intensity = 0.1
    })
    
    print("Advanced effects setup complete")
end

function AdvancedEffects:createEffect(effectType, properties)
    local effect = Instance.new(effectType)
    effect.Parent = self.lighting
    effect.Enabled = false
    
    -- Apply properties
    for property, value in pairs(properties) do
        effect[property] = value
    end
    
    return effect
end

function AdvancedEffects:enableEffect(effectName, duration)
    local effect = self.effects[effectName]
    if effect then
        effect.Enabled = true
        self.activeEffects[effectName] = effect
        
        if duration then
            wait(duration)
            effect.Enabled = false
            self.activeEffects[effectName] = nil
        end
        
        print("Effect enabled:", effectName)
    end
end

function AdvancedEffects:disableEffect(effectName)
    local effect = self.effects[effectName]
    if effect then
        effect.Enabled = false
        self.activeEffects[effectName] = nil
        print("Effect disabled:", effectName)
    end
end

function AdvancedEffects:animateEffect(effectName, targetProperties, duration)
    local effect = self.effects[effectName]
    if effect then
        duration = duration or 1
        
        local tweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
        local tween = self.tweenService:Create(effect, tweenInfo, targetProperties)
        
        tween:Play()
        print("Effect animated:", effectName)
    end
end

function AdvancedEffects:createScreenShake(intensity, duration, frequency)
    intensity = intensity or 5
    duration = duration or 1
    frequency = frequency or 10
    
    print("Screen shake started - intensity:", intensity, "duration:", duration)
    
    local camera = workspace.CurrentCamera
    local originalCFrame = camera.CFrame
    local shakeTimer = 0
    
    local connection
    connection = self.runService.Heartbeat:Connect(function(deltaTime)
        shakeTimer = shakeTimer + deltaTime
        
        if shakeTimer >= duration then
            camera.CFrame = originalCFrame
            connection:Disconnect()
            print("Screen shake ended")
            return
        end
        
        local shakeX = (math.random() - 0.5) * intensity
        local shakeY = (math.random() - 0.5) * intensity
        local shakeZ = (math.random() - 0.5) * intensity
        
        local shakeOffset = Vector3.new(shakeX, shakeY, shakeZ)
        camera.CFrame = originalCFrame + shakeOffset
    end)
    
    return connection
end

function AdvancedEffects:createFlashEffect(color, intensity, duration)
    color = color or Color3.fromRGB(255, 255, 255)
    intensity = intensity or 1
    duration = duration or 0.5
    
    print("Flash effect started")
    
    -- Create flash effect using color correction
    self.effects.colorCorrection.Enabled = true
    self.effects.colorCorrection.Brightness = intensity
    self.effects.colorCorrection.TintColor = color
    
    -- Fade out
    self:animateEffect("colorCorrection", {
        Brightness = 0,
        TintColor = Color3.fromRGB(255, 255, 255)
    }, duration)
    
    wait(duration)
    self.effects.colorCorrection.Enabled = false
    
    print("Flash effect ended")
end

function AdvancedEffects:createFadeEffect(fadeType, duration, color)
    fadeType = fadeType or "in"  -- "in" or "out"
    duration = duration or 2
    color = color or Color3.fromRGB(0, 0, 0)
    
    print("Fade effect started:", fadeType)
    
    -- Create fade effect using color correction
    self.effects.colorCorrection.Enabled = true
    
    if fadeType == "in" then
        self.effects.colorCorrection.Brightness = -1
        self.effects.colorCorrection.TintColor = color
        
        self:animateEffect("colorCorrection", {
            Brightness = 0,
            TintColor = Color3.fromRGB(255, 255, 255)
        }, duration)
    else
        self.effects.colorCorrection.Brightness = 0
        self.effects.colorCorrection.TintColor = Color3.fromRGB(255, 255, 255)
        
        self:animateEffect("colorCorrection", {
            Brightness = -1,
            TintColor = color
        }, duration)
    end
    
    wait(duration)
    
    if fadeType == "out" then
        self.effects.colorCorrection.Enabled = false
    end
    
    print("Fade effect ended:", fadeType)
end

function AdvancedEffects:createDistortionEffect(intensity, duration)
    intensity = intensity or 0.5
    duration = duration or 2
    
    print("Distortion effect started")
    
    self.effects.distortion.Enabled = true
    self.effects.distortion.Intensity = intensity
    
    wait(duration)
    
    self:animateEffect("distortion", {
        Intensity = 0
    }, 0.5)
    
    wait(0.5)
    self.effects.distortion.Enabled = false
    
    print("Distortion effect ended")
end

function AdvancedEffects:createCinematicSequence()
    print("Cinematic sequence started")
    
    -- Fade in
    self:createFadeEffect("in", 2)
    
    wait(2)
    
    -- Add bloom and film grain
    self:enableEffect("bloom")
    self:enableEffect("filmGrain")
    
    wait(3)
    
    -- Screen shake
    self:createScreenShake(3, 1, 15)
    
    wait(1)
    
    -- Flash effect
    self:createFlashEffect(Color3.fromRGB(255, 0, 0), 2, 0.3)
    
    wait(1)
    
    -- Distortion
    self:createDistortionEffect(0.8, 2)
    
    wait(2)
    
    -- Fade out
    self:createFadeEffect("out", 2)
    
    print("Cinematic sequence ended")
end

-- Example usage
local advancedEffects = AdvancedEffects.new()

-- Test individual effects
advancedEffects:enableEffect("bloom", 3)
wait(4)
advancedEffects:enableEffect("blur", 3)
wait(4)
advancedEffects:enableEffect("filmGrain", 3)

-- Test screen shake
wait(1)
advancedEffects:createScreenShake(5, 2, 20)

-- Test flash effect
wait(3)
advancedEffects:createFlashEffect(Color3.fromRGB(255, 255, 0), 1.5, 0.5)

-- Test fade effects
wait(2)
advancedEffects:createFadeEffect("out", 2)
wait(2)
advancedEffects:createFadeEffect("in", 2)

-- Test distortion
wait(2)
advancedEffects:createDistortionEffect(0.6, 3)

-- Test cinematic sequence
wait(3)
advancedEffects:createCinematicSequence()`,
        color: 'green'
      },
      {
        title: 'Performance & Optimization',
        content: `Optimize post-processing effects for better performance while maintaining visual quality.

**Performance Considerations:**
- **Effect Layering**: Limit number of active effects
- **Quality Settings**: Adjust effect quality based on device
- **Dynamic Loading**: Enable/disable effects as needed
- **Memory Management**: Clean up unused effects
- **Frame Rate Impact**: Monitor performance impact

**Optimization Techniques:**
- **LOD Effects**: Different quality levels for different distances
- **Conditional Effects**: Only apply effects when needed
- **Effect Pooling**: Reuse effect objects
- **Batch Updates**: Update multiple effects together`,
        codeExample: `-- Performance-optimized effects system

local OptimizedEffects = {}
OptimizedEffects.__index = OptimizedEffects

function OptimizedEffects.new()
    local self = setmetatable({}, OptimizedEffects)
    self.lighting = game:GetService("Lighting")
    self.tweenService = game:GetService("TweenService")
    self.runService = game:GetService("RunService")
    self.userInputService = game:GetService("UserInputService")
    
    -- Performance settings
    self.qualityLevel = "high"  -- "low", "medium", "high"
    self.maxActiveEffects = 3
    self.activeEffects = {}
    self.effectPool = {}
    
    -- Performance monitoring
    self.frameRate = 60
    self.lastFrameTime = tick()
    
    self:setupPerformanceMonitoring()
    self:setupEffectPool()
    
    return self
end

function OptimizedEffects:setupPerformanceMonitoring()
    self.runService.Heartbeat:Connect(function()
        local currentTime = tick()
        local deltaTime = currentTime - self.lastFrameTime
        self.frameRate = 1 / deltaTime
        self.lastFrameTime = currentTime
        
        -- Adjust quality based on performance
        if self.frameRate < 30 then
            self.qualityLevel = "low"
        elseif self.frameRate < 45 then
            self.qualityLevel = "medium"
        else
            self.qualityLevel = "high"
        end
    end)
end

function OptimizedEffects:setupEffectPool()
    -- Create effect pool for reuse
    local effectTypes = {"BloomEffect", "BlurEffect", "ColorCorrectionEffect", "DistortionEffect"}
    
    for _, effectType in ipairs(effectTypes) do
        self.effectPool[effectType] = {}
        
        -- Pre-create some effects
        for i = 1, 2 do
            local effect = Instance.new(effectType)
            effect.Parent = self.lighting
            effect.Enabled = false
            table.insert(self.effectPool[effectType], effect)
        end
    end
end

function OptimizedEffects:getEffect(effectType)
    local pool = self.effectPool[effectType]
    if pool and #pool > 0 then
        return table.remove(pool)
    else
        -- Create new effect if pool is empty
        local effect = Instance.new(effectType)
        effect.Parent = self.lighting
        effect.Enabled = false
        return effect
    end
end

function OptimizedEffects:returnEffect(effect)
    local effectType = effect.ClassName
    local pool = self.effectPool[effectType]
    
    if pool then
        effect.Enabled = false
        table.insert(pool, effect)
    else
        effect:Destroy()
    end
end

function OptimizedEffects:canAddEffect()
    return #self.activeEffects < self.maxActiveEffects
end

function OptimizedEffects:addEffect(effectType, properties, duration)
    if not self:canAddEffect() then
        warn("Maximum active effects reached!")
        return nil
    end
    
    local effect = self:getEffect(effectType)
    
    -- Apply properties based on quality level
    if self.qualityLevel == "low" then
        properties = self:reduceEffectQuality(properties)
    elseif self.qualityLevel == "medium" then
        properties = self:reduceEffectQuality(properties, 0.5)
    end
    
    -- Apply properties
    for property, value in pairs(properties) do
        effect[property] = value
    end
    
    effect.Enabled = true
    table.insert(self.activeEffects, effect)
    
    if duration then
        wait(duration)
        self:removeEffect(effect)
    end
    
    print("Effect added:", effectType, "Quality:", self.qualityLevel)
    return effect
end

function OptimizedEffects:removeEffect(effect)
    for i, activeEffect in ipairs(self.activeEffects) do
        if activeEffect == effect then
            table.remove(self.activeEffects, i)
            self:returnEffect(effect)
            print("Effect removed:", effect.ClassName)
            break
        end
    end
end

function OptimizedEffects:reduceEffectQuality(properties, reduction)
    reduction = reduction or 0.3
    
    local reducedProperties = {}
    for property, value in pairs(properties) do
        if type(value) == "number" then
            reducedProperties[property] = value * (1 - reduction)
        else
            reducedProperties[property] = value
        end
    end
    
    return reducedProperties
end

function OptimizedEffects:clearAllEffects()
    for _, effect in ipairs(self.activeEffects) do
        self:returnEffect(effect)
    end
    self.activeEffects = {}
    print("All effects cleared")
end

function OptimizedEffects:createOptimizedSequence(sequenceData)
    print("Optimized sequence started")
    
    for _, step in ipairs(sequenceData) do
        if self:canAddEffect() then
            self:addEffect(step.effectType, step.properties, step.duration)
        else
            warn("Skipping effect due to performance limits:", step.effectType)
        end
        
        wait(step.delay or 0.5)
    end
    
    print("Optimized sequence ended")
end

function OptimizedEffects:getPerformanceInfo()
    return {
        frameRate = math.floor(self.frameRate),
        qualityLevel = self.qualityLevel,
        activeEffects = #self.activeEffects,
        maxEffects = self.maxActiveEffects
    }
end

-- Example usage
local optimizedEffects = OptimizedEffects.new()

-- Test performance monitoring
wait(1)
local perfInfo = optimizedEffects:getPerformanceInfo()
print("Performance Info:", perfInfo.frameRate, "FPS, Quality:", perfInfo.qualityLevel)

-- Test optimized effects
local sequenceData = {
    {
        effectType = "BloomEffect",
        properties = {Intensity = 0.5, Size = 24, Threshold = 0.8},
        duration = 2,
        delay = 0.5
    },
    {
        effectType = "BlurEffect",
        properties = {Size = 2},
        duration = 2,
        delay = 0.5
    },
    {
        effectType = "ColorCorrectionEffect",
        properties = {Brightness = 0.2, Contrast = 0.1},
        duration = 2,
        delay = 0.5
    }
}

optimizedEffects:createOptimizedSequence(sequenceData)

-- Test performance info again
wait(1)
perfInfo = optimizedEffects:getPerformanceInfo()
print("Final Performance Info:", perfInfo.frameRate, "FPS, Quality:", perfInfo.qualityLevel)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Post-Processing Effects - Comprehensive Learning Example
-- Master post-processing effects and visual enhancement in Roblox

local Lighting = game:GetService("Lighting")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")

print("=== POST-PROCESSING EFFECTS DEMO ===")
print("Learning post-processing effects and visual enhancement...")

-- 1. BASIC POST-PROCESSING SETUP
print("\\n1. DEMONSTRATING BASIC POST-PROCESSING...")

local function setupBasicPostProcessing()
    -- Create Bloom effect
    local bloom = Instance.new("BloomEffect")
    bloom.Parent = Lighting
    bloom.Enabled = true
    bloom.Intensity = 0.5
    bloom.Size = 24
    bloom.Threshold = 0.8
    
    -- Create Blur effect
    local blur = Instance.new("BlurEffect")
    blur.Parent = Lighting
    blur.Enabled = true
    blur.Size = 2
    
    -- Create Color Correction
    local colorCorrection = Instance.new("ColorCorrectionEffect")
    colorCorrection.Parent = Lighting
    colorCorrection.Enabled = true
    colorCorrection.Brightness = 0.1
    colorCorrection.Contrast = 0.1
    colorCorrection.Saturation = 0.1
    colorCorrection.TintColor = Color3.fromRGB(255, 255, 255)
    
    print("Basic post-processing effects setup complete!")
    print("Bloom intensity:", bloom.Intensity)
    print("Blur size:", blur.Size)
    print("Color correction brightness:", colorCorrection.Brightness)
end

-- 2. ADVANCED VISUAL EFFECTS SYSTEM
print("\\n2. DEMONSTRATING ADVANCED VISUAL EFFECTS...")

local AdvancedEffects = {}
AdvancedEffects.__index = AdvancedEffects

function AdvancedEffects.new()
    local self = setmetatable({}, AdvancedEffects)
    self.lighting = Lighting
    self.tweenService = TweenService
    self.runService = RunService
    
    -- Effect storage
    self.effects = {}
    self.activeEffects = {}
    
    self:setupEffects()
    
    return self
end

function AdvancedEffects:setupEffects()
    -- Create all post-processing effects
    self.effects.bloom = self:createEffect("BloomEffect", {
        intensity = 0.5,
        size = 24,
        threshold = 0.8
    })
    
    self.effects.blur = self:createEffect("BlurEffect", {
        size = 2
    })
    
    self.effects.colorCorrection = self:createEffect("ColorCorrectionEffect", {
        brightness = 0,
        contrast = 0,
        saturation = 0,
        tintColor = Color3.fromRGB(255, 255, 255)
    })
    
    self.effects.distortion = self:createEffect("DistortionEffect", {
        intensity = 0.1
    })
    
    self.effects.filmGrain = self:createEffect("FilmGrainEffect", {
        intensity = 0.1
    })
    
    print("Advanced effects setup complete")
end

function AdvancedEffects:createEffect(effectType, properties)
    local effect = Instance.new(effectType)
    effect.Parent = self.lighting
    effect.Enabled = false
    
    -- Apply properties
    for property, value in pairs(properties) do
        effect[property] = value
    end
    
    return effect
end

function AdvancedEffects:enableEffect(effectName, duration)
    local effect = self.effects[effectName]
    if effect then
        effect.Enabled = true
        self.activeEffects[effectName] = effect
        
        if duration then
            wait(duration)
            effect.Enabled = false
            self.activeEffects[effectName] = nil
        end
        
        print("Effect enabled:", effectName)
    end
end

function AdvancedEffects:disableEffect(effectName)
    local effect = self.effects[effectName]
    if effect then
        effect.Enabled = false
        self.activeEffects[effectName] = nil
        print("Effect disabled:", effectName)
    end
end

function AdvancedEffects:animateEffect(effectName, targetProperties, duration)
    local effect = self.effects[effectName]
    if effect then
        duration = duration or 1
        
        local tweenInfo = TweenInfo.new(duration, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
        local tween = self.tweenService:Create(effect, tweenInfo, targetProperties)
        
        tween:Play()
        print("Effect animated:", effectName)
    end
end

function AdvancedEffects:createScreenShake(intensity, duration, frequency)
    intensity = intensity or 5
    duration = duration or 1
    frequency = frequency or 10
    
    print("Screen shake started - intensity:", intensity, "duration:", duration)
    
    local camera = workspace.CurrentCamera
    local originalCFrame = camera.CFrame
    local shakeTimer = 0
    
    local connection
    connection = self.runService.Heartbeat:Connect(function(deltaTime)
        shakeTimer = shakeTimer + deltaTime
        
        if shakeTimer >= duration then
            camera.CFrame = originalCFrame
            connection:Disconnect()
            print("Screen shake ended")
            return
        end
        
        local shakeX = (math.random() - 0.5) * intensity
        local shakeY = (math.random() - 0.5) * intensity
        local shakeZ = (math.random() - 0.5) * intensity
        
        local shakeOffset = Vector3.new(shakeX, shakeY, shakeZ)
        camera.CFrame = originalCFrame + shakeOffset
    end)
    
    return connection
end

function AdvancedEffects:createFlashEffect(color, intensity, duration)
    color = color or Color3.fromRGB(255, 255, 255)
    intensity = intensity or 1
    duration = duration or 0.5
    
    print("Flash effect started")
    
    -- Create flash effect using color correction
    self.effects.colorCorrection.Enabled = true
    self.effects.colorCorrection.Brightness = intensity
    self.effects.colorCorrection.TintColor = color
    
    -- Fade out
    self:animateEffect("colorCorrection", {
        Brightness = 0,
        TintColor = Color3.fromRGB(255, 255, 255)
    }, duration)
    
    wait(duration)
    self.effects.colorCorrection.Enabled = false
    
    print("Flash effect ended")
end

function AdvancedEffects:createFadeEffect(fadeType, duration, color)
    fadeType = fadeType or "in"  -- "in" or "out"
    duration = duration or 2
    color = color or Color3.fromRGB(0, 0, 0)
    
    print("Fade effect started:", fadeType)
    
    -- Create fade effect using color correction
    self.effects.colorCorrection.Enabled = true
    
    if fadeType == "in" then
        self.effects.colorCorrection.Brightness = -1
        self.effects.colorCorrection.TintColor = color
        
        self:animateEffect("colorCorrection", {
            Brightness = 0,
            TintColor = Color3.fromRGB(255, 255, 255)
        }, duration)
    else
        self.effects.colorCorrection.Brightness = 0
        self.effects.colorCorrection.TintColor = Color3.fromRGB(255, 255, 255)
        
        self:animateEffect("colorCorrection", {
            Brightness = -1,
            TintColor = color
        }, duration)
    end
    
    wait(duration)
    
    if fadeType == "out" then
        self.effects.colorCorrection.Enabled = false
    end
    
    print("Fade effect ended:", fadeType)
end

function AdvancedEffects:createDistortionEffect(intensity, duration)
    intensity = intensity or 0.5
    duration = duration or 2
    
    print("Distortion effect started")
    
    self.effects.distortion.Enabled = true
    self.effects.distortion.Intensity = intensity
    
    wait(duration)
    
    self:animateEffect("distortion", {
        Intensity = 0
    }, 0.5)
    
    wait(0.5)
    self.effects.distortion.Enabled = false
    
    print("Distortion effect ended")
end

function AdvancedEffects:createCinematicSequence()
    print("Cinematic sequence started")
    
    -- Fade in
    self:createFadeEffect("in", 2)
    
    wait(2)
    
    -- Add bloom and film grain
    self:enableEffect("bloom")
    self:enableEffect("filmGrain")
    
    wait(3)
    
    -- Screen shake
    self:createScreenShake(3, 1, 15)
    
    wait(1)
    
    -- Flash effect
    self:createFlashEffect(Color3.fromRGB(255, 0, 0), 2, 0.3)
    
    wait(1)
    
    -- Distortion
    self:createDistortionEffect(0.8, 2)
    
    wait(2)
    
    -- Fade out
    self:createFadeEffect("out", 2)
    
    print("Cinematic sequence ended")
end

-- 3. PERFORMANCE-OPTIMIZED EFFECTS SYSTEM
print("\\n3. DEMONSTRATING PERFORMANCE-OPTIMIZED EFFECTS...")

local OptimizedEffects = {}
OptimizedEffects.__index = OptimizedEffects

function OptimizedEffects.new()
    local self = setmetatable({}, OptimizedEffects)
    self.lighting = Lighting
    self.tweenService = TweenService
    self.runService = RunService
    self.userInputService = UserInputService
    
    -- Performance settings
    self.qualityLevel = "high"  -- "low", "medium", "high"
    self.maxActiveEffects = 3
    self.activeEffects = {}
    self.effectPool = {}
    
    -- Performance monitoring
    self.frameRate = 60
    self.lastFrameTime = tick()
    
    self:setupPerformanceMonitoring()
    self:setupEffectPool()
    
    return self
end

function OptimizedEffects:setupPerformanceMonitoring()
    self.runService.Heartbeat:Connect(function()
        local currentTime = tick()
        local deltaTime = currentTime - self.lastFrameTime
        self.frameRate = 1 / deltaTime
        self.lastFrameTime = currentTime
        
        -- Adjust quality based on performance
        if self.frameRate < 30 then
            self.qualityLevel = "low"
        elseif self.frameRate < 45 then
            self.qualityLevel = "medium"
        else
            self.qualityLevel = "high"
        end
    end)
end

function OptimizedEffects:setupEffectPool()
    -- Create effect pool for reuse
    local effectTypes = {"BloomEffect", "BlurEffect", "ColorCorrectionEffect", "DistortionEffect"}
    
    for _, effectType in ipairs(effectTypes) do
        self.effectPool[effectType] = {}
        
        -- Pre-create some effects
        for i = 1, 2 do
            local effect = Instance.new(effectType)
            effect.Parent = self.lighting
            effect.Enabled = false
            table.insert(self.effectPool[effectType], effect)
        end
    end
end

function OptimizedEffects:getEffect(effectType)
    local pool = self.effectPool[effectType]
    if pool and #pool > 0 then
        return table.remove(pool)
    else
        -- Create new effect if pool is empty
        local effect = Instance.new(effectType)
        effect.Parent = self.lighting
        effect.Enabled = false
        return effect
    end
end

function OptimizedEffects:returnEffect(effect)
    local effectType = effect.ClassName
    local pool = self.effectPool[effectType]
    
    if pool then
        effect.Enabled = false
        table.insert(pool, effect)
    else
        effect:Destroy()
    end
end

function OptimizedEffects:canAddEffect()
    return #self.activeEffects < self.maxActiveEffects
end

function OptimizedEffects:addEffect(effectType, properties, duration)
    if not self:canAddEffect() then
        warn("Maximum active effects reached!")
        return nil
    end
    
    local effect = self:getEffect(effectType)
    
    -- Apply properties based on quality level
    if self.qualityLevel == "low" then
        properties = self:reduceEffectQuality(properties)
    elseif self.qualityLevel == "medium" then
        properties = self:reduceEffectQuality(properties, 0.5)
    end
    
    -- Apply properties
    for property, value in pairs(properties) do
        effect[property] = value
    end
    
    effect.Enabled = true
    table.insert(self.activeEffects, effect)
    
    if duration then
        wait(duration)
        self:removeEffect(effect)
    end
    
    print("Effect added:", effectType, "Quality:", self.qualityLevel)
    return effect
end

function OptimizedEffects:removeEffect(effect)
    for i, activeEffect in ipairs(self.activeEffects) do
        if activeEffect == effect then
            table.remove(self.activeEffects, i)
            self:returnEffect(effect)
            print("Effect removed:", effect.ClassName)
            break
        end
    end
end

function OptimizedEffects:reduceEffectQuality(properties, reduction)
    reduction = reduction or 0.3
    
    local reducedProperties = {}
    for property, value in pairs(properties) do
        if type(value) == "number" then
            reducedProperties[property] = value * (1 - reduction)
        else
            reducedProperties[property] = value
        end
    end
    
    return reducedProperties
end

function OptimizedEffects:clearAllEffects()
    for _, effect in ipairs(self.activeEffects) do
        self:returnEffect(effect)
    end
    self.activeEffects = {}
    print("All effects cleared")
end

function OptimizedEffects:getPerformanceInfo()
    return {
        frameRate = math.floor(self.frameRate),
        qualityLevel = self.qualityLevel,
        activeEffects = #self.activeEffects,
        maxEffects = self.maxActiveEffects
    }
end

-- 4. DEMO THE POST-PROCESSING SYSTEMS
print("\\n4. RUNNING POST-PROCESSING SYSTEM DEMONSTRATIONS...")

-- Setup basic post-processing
setupBasicPostProcessing()

-- Create advanced effects system
local advancedEffects = AdvancedEffects.new()

-- Create optimized effects system
local optimizedEffects = OptimizedEffects.new()

-- Test individual effects
wait(1)
print("\\n--- Testing Individual Effects ---")
advancedEffects:enableEffect("bloom", 3)
wait(4)
advancedEffects:enableEffect("blur", 3)
wait(4)
advancedEffects:enableEffect("filmGrain", 3)

-- Test screen shake
wait(1)
print("\\n--- Testing Screen Shake ---")
advancedEffects:createScreenShake(5, 2, 20)

-- Test flash effect
wait(3)
print("\\n--- Testing Flash Effect ---")
advancedEffects:createFlashEffect(Color3.fromRGB(255, 255, 0), 1.5, 0.5)

-- Test fade effects
wait(2)
print("\\n--- Testing Fade Effects ---")
advancedEffects:createFadeEffect("out", 2)
wait(2)
advancedEffects:createFadeEffect("in", 2)

-- Test distortion
wait(2)
print("\\n--- Testing Distortion ---")
advancedEffects:createDistortionEffect(0.6, 3)

-- Test performance monitoring
wait(1)
print("\\n--- Testing Performance Monitoring ---")
local perfInfo = optimizedEffects:getPerformanceInfo()
print("Performance Info:", perfInfo.frameRate, "FPS, Quality:", perfInfo.qualityLevel)

-- Test optimized effects
wait(1)
print("\\n--- Testing Optimized Effects ---")
local sequenceData = {
    {
        effectType = "BloomEffect",
        properties = {Intensity = 0.5, Size = 24, Threshold = 0.8},
        duration = 2,
        delay = 0.5
    },
    {
        effectType = "BlurEffect",
        properties = {Size = 2},
        duration = 2,
        delay = 0.5
    },
    {
        effectType = "ColorCorrectionEffect",
        properties = {Brightness = 0.2, Contrast = 0.1},
        duration = 2,
        delay = 0.5
    }
}

for _, step in ipairs(sequenceData) do
    if optimizedEffects:canAddEffect() then
        optimizedEffects:addEffect(step.effectType, step.properties, step.duration)
    else
        warn("Skipping effect due to performance limits:", step.effectType)
    end
    
    wait(step.delay or 0.5)
end

-- Test cinematic sequence
wait(3)
print("\\n--- Testing Cinematic Sequence ---")
advancedEffects:createCinematicSequence()

-- Final performance info
wait(1)
perfInfo = optimizedEffects:getPerformanceInfo()
print("Final Performance Info:", perfInfo.frameRate, "FPS, Quality:", perfInfo.qualityLevel)

print("\\n=== POST-PROCESSING EFFECTS DEMO COMPLETE ===")
print("You've learned post-processing effects and visual enhancement!")`,
    challenge: {
      tests: [
        { description: 'Create post-processing effects like BloomEffect', type: 'code_contains', value: 'BloomEffect' },
        { description: 'Use TweenService to animate effect properties', type: 'code_contains', value: 'TweenService' },
        { description: 'Enable and disable effects dynamically', type: 'code_contains', value: 'Enabled' }
      ],
      hints: [
        'Use Instance.new("BloomEffect") to create bloom effects',
        'Use TweenService:Create() to animate effect properties smoothly',
        'Use effect.Enabled = true/false to control effect visibility',
        'Use effect.Intensity, effect.Size, etc. to control effect strength',
        'Monitor performance when using multiple effects simultaneously'
      ],
      successMessage: 'Outstanding! You now understand post-processing effects and visual enhancement. These skills are essential for creating cinematic and polished game experiences!'
    }
  },

  // === TOOL & WEAPON SYSTEMS ===
  'tool-basics': {
    title: 'Tool Basics & Creation',
    description: 'Master tool creation, equipping, and basic tool mechanics in Roblox',
    sections: [
      {
        title: 'Understanding Tools',
        content: `Tools are objects that players can equip and use in Roblox. They're essential for creating interactive gameplay elements like weapons, building tools, and utilities.

**Tool Properties:**
- **RequiresHandle**: Whether the tool needs a handle part
- **CanBeDropped**: Whether players can drop the tool
- **Enabled**: Whether the tool is currently active
- **Grip**: How the tool is held (Right, Left, etc.)
- **GripForward**: Forward direction of grip
- **GripPos**: Position of grip relative to handle
- **GripRight**: Right direction of grip
- **GripUp**: Up direction of grip

**Tool Events:**
- **Activated**: Fired when tool is used
- **Deactivated**: Fired when tool is stopped
- **Equipped**: Fired when tool is equipped
- **Unequipped**: Fired when tool is unequipped`,
        codeExample: `-- Basic tool creation and setup

local Tool = Instance.new("Tool")
Tool.Name = "Basic Tool"
Tool.RequiresHandle = true
Tool.CanBeDropped = true
Tool.Enabled = true
Tool.Grip = Enum.R15Grip.Right
Tool.Parent = game.StarterPack

-- Create handle
local Handle = Instance.new("Part")
Handle.Name = "Handle"
Handle.Size = Vector3.new(1, 4, 0.2)
Handle.Material = Enum.Material.Wood
Handle.Color = Color3.fromRGB(139, 69, 19)
Handle.Parent = Tool

-- Tool events
Tool.Activated:Connect(function()
    print("Tool activated!")
end)

Tool.Deactivated:Connect(function()
    print("Tool deactivated!")
end)

Tool.Equipped:Connect(function()
    print("Tool equipped!")
end)

Tool.Unequipped:Connect(function()
    print("Tool unequipped!")
end)

print("Basic tool created!")`,
        color: 'blue'
      },
      {
        title: 'Advanced Tool Mechanics',
        content: `Create sophisticated tools with custom behaviors, animations, and interactions.

**Advanced Tool Features:**
- **Custom Animations**: Tool-specific animations
- **Cooldown Systems**: Prevent spam usage
- **Resource Management**: Ammo, durability, etc.
- **Multi-Stage Tools**: Tools with multiple modes
- **Tool Combinations**: Multiple tools working together

**Tool Interaction Systems:**
- **Raycasting**: Detect what the tool hits
- **Damage Systems**: Apply damage to targets
- **Effect Systems**: Visual and audio effects
- **State Management**: Track tool states and modes`,
        codeExample: `-- Advanced tool system

local AdvancedTool = {}
AdvancedTool.__index = AdvancedTool

function AdvancedTool.new(toolName, toolData)
    local self = setmetatable({}, AdvancedTool)
    self.tool = Instance.new("Tool")
    self.tool.Name = toolName
    self.tool.RequiresHandle = true
    self.tool.CanBeDropped = true
    self.tool.Enabled = true
    self.tool.Parent = game.StarterPack
    
    -- Tool data
    self.data = toolData or {}
    self.cooldown = self.data.cooldown or 1
    self.ammo = self.data.ammo or 10
    self.maxAmmo = self.data.maxAmmo or 10
    self.durability = self.data.durability or 100
    self.maxDurability = self.data.maxDurability or 100
    
    -- State
    self.isOnCooldown = false
    self.currentMode = 1
    self.modes = self.data.modes or {"primary"}
    
    self:createHandle()
    self:setupEvents()
    
    return self
end

function AdvancedTool:createHandle()
    local handle = Instance.new("Part")
    handle.Name = "Handle"
    handle.Size = Vector3.new(1, 4, 0.2)
    handle.Material = Enum.Material.Metal
    handle.Color = Color3.fromRGB(100, 100, 100)
    handle.Parent = self.tool
    
    -- Add selection box
    local selectionBox = Instance.new("SelectionBox")
    selectionBox.Adornee = handle
    selectionBox.Color3 = Color3.fromRGB(0, 255, 0)
    selectionBox.Transparency = 0.5
    selectionBox.Parent = handle
end

function AdvancedTool:setupEvents()
    self.tool.Activated:Connect(function()
        self:onActivated()
    end)
    
    self.tool.Equipped:Connect(function()
        self:onEquipped()
    end)
    
    self.tool.Unequipped:Connect(function()
        self:onUnequipped()
    end)
end

function AdvancedTool:onActivated()
    if self.isOnCooldown or self.ammo <= 0 or self.durability <= 0 then
        return
    end
    
    self:startCooldown()
    self:useAmmo()
    self:reduceDurability()
    
    local mode = self.modes[self.currentMode]
    if mode == "primary" then
        self:primaryAction()
    elseif mode == "secondary" then
        self:secondaryAction()
    elseif mode == "tertiary" then
        self:tertiaryAction()
    end
    
    print("Tool used! Ammo:", self.ammo, "Durability:", self.durability)
end

function AdvancedTool:onEquipped()
    print("Tool equipped!")
    self:updateToolState()
end

function AdvancedTool:onUnequipped()
    print("Tool unequipped!")
end

function AdvancedTool:startCooldown()
    self.isOnCooldown = true
    self.tool.Enabled = false
    
    wait(self.cooldown)
    
    self.isOnCooldown = false
    self.tool.Enabled = true
end

function AdvancedTool:useAmmo()
    if self.ammo > 0 then
        self.ammo = self.ammo - 1
    end
end

function AdvancedTool:reduceDurability()
    if self.durability > 0 then
        self.durability = self.durability - 1
    end
end

function AdvancedTool:reload()
    self.ammo = self.maxAmmo
    print("Tool reloaded!")
end

function AdvancedTool:repair()
    self.durability = self.maxDurability
    print("Tool repaired!")
end

function AdvancedTool:switchMode()
    self.currentMode = self.currentMode + 1
    if self.currentMode > #self.modes then
        self.currentMode = 1
    end
    
    local mode = self.modes[self.currentMode]
    print("Mode switched to:", mode)
end

function AdvancedTool:primaryAction()
    print("Primary action executed!")
    -- Implement primary action
end

function AdvancedTool:secondaryAction()
    print("Secondary action executed!")
    -- Implement secondary action
end

function AdvancedTool:tertiaryAction()
    print("Tertiary action executed!")
    -- Implement tertiary action
end

function AdvancedTool:updateToolState()
    -- Update tool appearance based on state
    local handle = self.tool:FindFirstChild("Handle")
    if handle then
        if self.ammo <= 0 then
            handle.Color = Color3.fromRGB(255, 0, 0)  -- Red when out of ammo
        elseif self.durability <= 20 then
            handle.Color = Color3.fromRGB(255, 165, 0)  -- Orange when low durability
        else
            handle.Color = Color3.fromRGB(100, 100, 100)  -- Normal color
        end
    end
end

-- Example usage
local toolData = {
    cooldown = 0.5,
    ammo = 15,
    maxAmmo = 15,
    durability = 100,
    maxDurability = 100,
    modes = {"primary", "secondary", "tertiary"}
}

local advancedTool = AdvancedTool.new("Advanced Tool", toolData)`,
        color: 'green'
      },
      {
        title: 'Weapon Systems',
        content: `Create comprehensive weapon systems with damage, effects, and combat mechanics.

**Weapon System Features:**
- **Damage Calculation**: Different damage types and amounts
- **Range Systems**: Melee vs ranged weapons
- **Accuracy Systems**: Hit chance and spread
- **Critical Hits**: Chance for extra damage
- **Status Effects**: Poison, burn, freeze, etc.
- **Weapon Modifications**: Attachments and upgrades

**Combat Integration:**
- **Hit Detection**: Raycasting and collision detection
- **Damage Application**: Apply damage to targets
- **Effect Systems**: Visual and audio feedback
- **Combat Logging**: Track combat events`,
        codeExample: `-- Comprehensive weapon system

local WeaponSystem = {}
WeaponSystem.__index = WeaponSystem

function WeaponSystem.new(weaponName, weaponData)
    local self = setmetatable({}, WeaponSystem)
    self.tool = Instance.new("Tool")
    self.tool.Name = weaponName
    self.tool.RequiresHandle = true
    self.tool.CanBeDropped = true
    self.tool.Enabled = true
    self.tool.Parent = game.StarterPack
    
    -- Weapon data
    self.data = weaponData or {}
    self.damage = self.data.damage or 25
    self.range = self.data.range or 100
    self.accuracy = self.data.accuracy or 0.9
    self.criticalChance = self.data.criticalChance or 0.1
    self.criticalMultiplier = self.data.criticalMultiplier or 2
    self.fireRate = self.data.fireRate or 1
    self.ammo = self.data.ammo or 30
    self.maxAmmo = self.data.maxAmmo or 30
    self.reloadTime = self.data.reloadTime or 2
    
    -- State
    self.isReloading = false
    self.lastFireTime = 0
    
    self:createWeaponModel()
    self:setupEvents()
    
    return self
end

function WeaponSystem:createWeaponModel()
    local handle = Instance.new("Part")
    handle.Name = "Handle"
    handle.Size = Vector3.new(0.5, 1, 3)
    handle.Material = Enum.Material.Metal
    handle.Color = Color3.fromRGB(50, 50, 50)
    handle.Parent = self.tool
    
    -- Add muzzle flash effect
    local muzzleFlash = Instance.new("Part")
    muzzleFlash.Name = "MuzzleFlash"
    muzzleFlash.Size = Vector3.new(0.2, 0.2, 0.2)
    muzzleFlash.Material = Enum.Material.Neon
    muzzleFlash.Color = Color3.fromRGB(255, 255, 0)
    muzzleFlash.Transparency = 1
    muzzleFlash.CFrame = handle.CFrame * CFrame.new(0, 0, 2)
    muzzleFlash.Parent = handle
    
    -- Add sound
    local sound = Instance.new("Sound")
    sound.Name = "FireSound"
    sound.SoundId = "rbxasset://sounds/electronicpingshort.wav"
    sound.Volume = 0.5
    sound.Parent = handle
end

function WeaponSystem:setupEvents()
    self.tool.Activated:Connect(function()
        self:fire()
    end)
    
    self.tool.Equipped:Connect(function()
        self:onEquipped()
    end)
    
    self.tool.Unequipped:Connect(function()
        self:onUnequipped()
    end)
end

function WeaponSystem:fire()
    if self.isReloading or self.ammo <= 0 then
        return
    end
    
    local currentTime = tick()
    if currentTime - self.lastFireTime < self.fireRate then
        return
    end
    
    self.lastFireTime = currentTime
    self.ammo = self.ammo - 1
    
    -- Create muzzle flash
    self:createMuzzleFlash()
    
    -- Play sound
    local handle = self.tool:FindFirstChild("Handle")
    local sound = handle:FindFirstChild("FireSound")
    if sound then
        sound:Play()
    end
    
    -- Raycast for hit detection
    self:performRaycast()
    
    print("Weapon fired! Ammo remaining:", self.ammo)
    
    -- Auto-reload if out of ammo
    if self.ammo <= 0 then
        self:reload()
    end
end

function WeaponSystem:performRaycast()
    local handle = self.tool:FindFirstChild("Handle")
    if not handle then return end
    
    local character = self.tool.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    local camera = workspace.CurrentCamera
    local mouse = game.Players.LocalPlayer:GetMouse()
    
    -- Calculate ray direction
    local rayOrigin = handle.Position
    local rayDirection = (mouse.Hit.Position - rayOrigin).Unit * self.range
    
    -- Add accuracy spread
    local spread = (1 - self.accuracy) * 0.1
    rayDirection = rayDirection + Vector3.new(
        (math.random() - 0.5) * spread,
        (math.random() - 0.5) * spread,
        (math.random() - 0.5) * spread
    )
    
    -- Perform raycast
    local raycastParams = RaycastParams.new()
    raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
    raycastParams.FilterDescendantsInstances = {character}
    
    local raycastResult = workspace:Raycast(rayOrigin, rayDirection, raycastParams)
    
    if raycastResult then
        self:handleHit(raycastResult)
    else
        print("Shot missed!")
    end
end

function WeaponSystem:handleHit(raycastResult)
    local hit = raycastResult.Instance
    local hitPosition = raycastResult.Position
    
    print("Hit:", hit.Name, "at position:", hitPosition)
    
    -- Check if hit a character
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    
    if humanoid then
        -- Calculate damage
        local damage = self:calculateDamage()
        
        -- Apply damage
        humanoid:TakeDamage(damage)
        
        print("Dealt", damage, "damage to", character.Name)
        
        -- Create hit effect
        self:createHitEffect(hitPosition)
    else
        -- Hit environment
        self:createImpactEffect(hitPosition)
    end
end

function WeaponSystem:calculateDamage()
    local baseDamage = self.damage
    
    -- Check for critical hit
    if math.random() < self.criticalChance then
        baseDamage = baseDamage * self.criticalMultiplier
        print("Critical hit!")
    end
    
    return baseDamage
end

function WeaponSystem:createMuzzleFlash()
    local handle = self.tool:FindFirstChild("Handle")
    local muzzleFlash = handle:FindFirstChild("MuzzleFlash")
    
    if muzzleFlash then
        muzzleFlash.Transparency = 0
        
        -- Fade out
        local tween = game:GetService("TweenService"):Create(muzzleFlash,
            TweenInfo.new(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
            {Transparency = 1}
        )
        tween:Play()
    end
end

function WeaponSystem:createHitEffect(position)
    local effect = Instance.new("Part")
    effect.Size = Vector3.new(0.5, 0.5, 0.5)
    effect.Material = Enum.Material.Neon
    effect.Color = Color3.fromRGB(255, 0, 0)
    effect.CFrame = CFrame.new(position)
    effect.Anchored = true
    effect.Parent = workspace
    
    -- Fade out and destroy
    local tween = game:GetService("TweenService"):Create(effect,
        TweenInfo.new(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {Transparency = 1, Size = Vector3.new(2, 2, 2)}
    )
    tween:Play()
    
    tween.Completed:Connect(function()
        effect:Destroy()
    end)
end

function WeaponSystem:createImpactEffect(position)
    local effect = Instance.new("Part")
    effect.Size = Vector3.new(0.3, 0.3, 0.3)
    effect.Material = Enum.Material.Neon
    effect.Color = Color3.fromRGB(255, 255, 0)
    effect.CFrame = CFrame.new(position)
    effect.Anchored = true
    effect.Parent = workspace
    
    -- Fade out and destroy
    local tween = game:GetService("TweenService"):Create(effect,
        TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {Transparency = 1}
    )
    tween:Play()
    
    tween.Completed:Connect(function()
        effect:Destroy()
    end)
end

function WeaponSystem:reload()
    if self.isReloading or self.ammo >= self.maxAmmo then
        return
    end
    
    self.isReloading = true
    self.tool.Enabled = false
    
    print("Reloading...")
    
    wait(self.reloadTime)
    
    self.ammo = self.maxAmmo
    self.isReloading = false
    self.tool.Enabled = true
    
    print("Reload complete!")
end

function WeaponSystem:onEquipped()
    print("Weapon equipped!")
end

function WeaponSystem:onUnequipped()
    print("Weapon unequipped!")
end

-- Example usage
local weaponData = {
    damage = 35,
    range = 150,
    accuracy = 0.85,
    criticalChance = 0.15,
    criticalMultiplier = 2.5,
    fireRate = 0.8,
    ammo = 25,
    maxAmmo = 25,
    reloadTime = 2.5
}

local weapon = WeaponSystem.new("Assault Rifle", weaponData)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Tool Basics & Creation - Comprehensive Learning Example
-- Master tool creation and weapon systems in Roblox

print("=== TOOL BASICS & CREATION DEMO ===")
print("Learning tool creation and weapon systems...")

-- 1. BASIC TOOL CREATION
print("\\n1. DEMONSTRATING BASIC TOOL CREATION...")

local function createBasicTool()
    local Tool = Instance.new("Tool")
    Tool.Name = "Basic Tool"
    Tool.RequiresHandle = true
    Tool.CanBeDropped = true
    Tool.Enabled = true
    Tool.Grip = Enum.R15Grip.Right
    Tool.Parent = game.StarterPack
    
    -- Create handle
    local Handle = Instance.new("Part")
    Handle.Name = "Handle"
    Handle.Size = Vector3.new(1, 4, 0.2)
    Handle.Material = Enum.Material.Wood
    Handle.Color = Color3.fromRGB(139, 69, 19)
    Handle.Parent = Tool
    
    -- Tool events
    Tool.Activated:Connect(function()
        print("Tool activated!")
    end)
    
    Tool.Deactivated:Connect(function()
        print("Tool deactivated!")
    end)
    
    Tool.Equipped:Connect(function()
        print("Tool equipped!")
    end)
    
    Tool.Unequipped:Connect(function()
        print("Tool unequipped!")
    end)
    
    print("Basic tool created!")
    return Tool
end

-- 2. ADVANCED TOOL SYSTEM
print("\\n2. DEMONSTRATING ADVANCED TOOL SYSTEM...")

local AdvancedTool = {}
AdvancedTool.__index = AdvancedTool

function AdvancedTool.new(toolName, toolData)
    local self = setmetatable({}, AdvancedTool)
    self.tool = Instance.new("Tool")
    self.tool.Name = toolName
    self.tool.RequiresHandle = true
    self.tool.CanBeDropped = true
    self.tool.Enabled = true
    self.tool.Parent = game.StarterPack
    
    -- Tool data
    self.data = toolData or {}
    self.cooldown = self.data.cooldown or 1
    self.ammo = self.data.ammo or 10
    self.maxAmmo = self.data.maxAmmo or 10
    self.durability = self.data.durability or 100
    self.maxDurability = self.data.maxDurability or 100
    
    -- State
    self.isOnCooldown = false
    self.currentMode = 1
    self.modes = self.data.modes or {"primary"}
    
    self:createHandle()
    self:setupEvents()
    
    return self
end

function AdvancedTool:createHandle()
    local handle = Instance.new("Part")
    handle.Name = "Handle"
    handle.Size = Vector3.new(1, 4, 0.2)
    handle.Material = Enum.Material.Metal
    handle.Color = Color3.fromRGB(100, 100, 100)
    handle.Parent = self.tool
    
    -- Add selection box
    local selectionBox = Instance.new("SelectionBox")
    selectionBox.Adornee = handle
    selectionBox.Color3 = Color3.fromRGB(0, 255, 0)
    selectionBox.Transparency = 0.5
    selectionBox.Parent = handle
end

function AdvancedTool:setupEvents()
    self.tool.Activated:Connect(function()
        self:onActivated()
    end)
    
    self.tool.Equipped:Connect(function()
        self:onEquipped()
    end)
    
    self.tool.Unequipped:Connect(function()
        self:onUnequipped()
    end)
end

function AdvancedTool:onActivated()
    if self.isOnCooldown or self.ammo <= 0 or self.durability <= 0 then
        return
    end
    
    self:startCooldown()
    self:useAmmo()
    self:reduceDurability()
    
    local mode = self.modes[self.currentMode]
    if mode == "primary" then
        self:primaryAction()
    elseif mode == "secondary" then
        self:secondaryAction()
    elseif mode == "tertiary" then
        self:tertiaryAction()
    end
    
    print("Tool used! Ammo:", self.ammo, "Durability:", self.durability)
end

function AdvancedTool:onEquipped()
    print("Tool equipped!")
    self:updateToolState()
end

function AdvancedTool:onUnequipped()
    print("Tool unequipped!")
end

function AdvancedTool:startCooldown()
    self.isOnCooldown = true
    self.tool.Enabled = false
    
    wait(self.cooldown)
    
    self.isOnCooldown = false
    self.tool.Enabled = true
end

function AdvancedTool:useAmmo()
    if self.ammo > 0 then
        self.ammo = self.ammo - 1
    end
end

function AdvancedTool:reduceDurability()
    if self.durability > 0 then
        self.durability = self.durability - 1
    end
end

function AdvancedTool:reload()
    self.ammo = self.maxAmmo
    print("Tool reloaded!")
end

function AdvancedTool:repair()
    self.durability = self.maxDurability
    print("Tool repaired!")
end

function AdvancedTool:switchMode()
    self.currentMode = self.currentMode + 1
    if self.currentMode > #self.modes then
        self.currentMode = 1
    end
    
    local mode = self.modes[self.currentMode]
    print("Mode switched to:", mode)
end

function AdvancedTool:primaryAction()
    print("Primary action executed!")
    -- Implement primary action
end

function AdvancedTool:secondaryAction()
    print("Secondary action executed!")
    -- Implement secondary action
end

function AdvancedTool:tertiaryAction()
    print("Tertiary action executed!")
    -- Implement tertiary action
end

function AdvancedTool:updateToolState()
    -- Update tool appearance based on state
    local handle = self.tool:FindFirstChild("Handle")
    if handle then
        if self.ammo <= 0 then
            handle.Color = Color3.fromRGB(255, 0, 0)  -- Red when out of ammo
        elseif self.durability <= 20 then
            handle.Color = Color3.fromRGB(255, 165, 0)  -- Orange when low durability
        else
            handle.Color = Color3.fromRGB(100, 100, 100)  -- Normal color
        end
    end
end

-- 3. WEAPON SYSTEM
print("\\n3. DEMONSTRATING WEAPON SYSTEM...")

local WeaponSystem = {}
WeaponSystem.__index = WeaponSystem

function WeaponSystem.new(weaponName, weaponData)
    local self = setmetatable({}, WeaponSystem)
    self.tool = Instance.new("Tool")
    self.tool.Name = weaponName
    self.tool.RequiresHandle = true
    self.tool.CanBeDropped = true
    self.tool.Enabled = true
    self.tool.Parent = game.StarterPack
    
    -- Weapon data
    self.data = weaponData or {}
    self.damage = self.data.damage or 25
    self.range = self.data.range or 100
    self.accuracy = self.data.accuracy or 0.9
    self.criticalChance = self.data.criticalChance or 0.1
    self.criticalMultiplier = self.data.criticalMultiplier or 2
    self.fireRate = self.data.fireRate or 1
    self.ammo = self.data.ammo or 30
    self.maxAmmo = self.data.maxAmmo or 30
    self.reloadTime = self.data.reloadTime or 2
    
    -- State
    self.isReloading = false
    self.lastFireTime = 0
    
    self:createWeaponModel()
    self:setupEvents()
    
    return self
end

function WeaponSystem:createWeaponModel()
    local handle = Instance.new("Part")
    handle.Name = "Handle"
    handle.Size = Vector3.new(0.5, 1, 3)
    handle.Material = Enum.Material.Metal
    handle.Color = Color3.fromRGB(50, 50, 50)
    handle.Parent = self.tool
    
    -- Add muzzle flash effect
    local muzzleFlash = Instance.new("Part")
    muzzleFlash.Name = "MuzzleFlash"
    muzzleFlash.Size = Vector3.new(0.2, 0.2, 0.2)
    muzzleFlash.Material = Enum.Material.Neon
    muzzleFlash.Color = Color3.fromRGB(255, 255, 0)
    muzzleFlash.Transparency = 1
    muzzleFlash.CFrame = handle.CFrame * CFrame.new(0, 0, 2)
    muzzleFlash.Parent = handle
    
    -- Add sound
    local sound = Instance.new("Sound")
    sound.Name = "FireSound"
    sound.SoundId = "rbxasset://sounds/electronicpingshort.wav"
    sound.Volume = 0.5
    sound.Parent = handle
end

function WeaponSystem:setupEvents()
    self.tool.Activated:Connect(function()
        self:fire()
    end)
    
    self.tool.Equipped:Connect(function()
        self:onEquipped()
    end)
    
    self.tool.Unequipped:Connect(function()
        self:onUnequipped()
    end)
end

function WeaponSystem:fire()
    if self.isReloading or self.ammo <= 0 then
        return
    end
    
    local currentTime = tick()
    if currentTime - self.lastFireTime < self.fireRate then
        return
    end
    
    self.lastFireTime = currentTime
    self.ammo = self.ammo - 1
    
    -- Create muzzle flash
    self:createMuzzleFlash()
    
    -- Play sound
    local handle = self.tool:FindFirstChild("Handle")
    local sound = handle:FindFirstChild("FireSound")
    if sound then
        sound:Play()
    end
    
    -- Raycast for hit detection
    self:performRaycast()
    
    print("Weapon fired! Ammo remaining:", self.ammo)
    
    -- Auto-reload if out of ammo
    if self.ammo <= 0 then
        self:reload()
    end
end

function WeaponSystem:performRaycast()
    local handle = self.tool:FindFirstChild("Handle")
    if not handle then return end
    
    local character = self.tool.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    local camera = workspace.CurrentCamera
    local mouse = game.Players.LocalPlayer:GetMouse()
    
    -- Calculate ray direction
    local rayOrigin = handle.Position
    local rayDirection = (mouse.Hit.Position - rayOrigin).Unit * self.range
    
    -- Add accuracy spread
    local spread = (1 - self.accuracy) * 0.1
    rayDirection = rayDirection + Vector3.new(
        (math.random() - 0.5) * spread,
        (math.random() - 0.5) * spread,
        (math.random() - 0.5) * spread
    )
    
    -- Perform raycast
    local raycastParams = RaycastParams.new()
    raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
    raycastParams.FilterDescendantsInstances = {character}
    
    local raycastResult = workspace:Raycast(rayOrigin, rayDirection, raycastParams)
    
    if raycastResult then
        self:handleHit(raycastResult)
    else
        print("Shot missed!")
    end
end

function WeaponSystem:handleHit(raycastResult)
    local hit = raycastResult.Instance
    local hitPosition = raycastResult.Position
    
    print("Hit:", hit.Name, "at position:", hitPosition)
    
    -- Check if hit a character
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    
    if humanoid then
        -- Calculate damage
        local damage = self:calculateDamage()
        
        -- Apply damage
        humanoid:TakeDamage(damage)
        
        print("Dealt", damage, "damage to", character.Name)
        
        -- Create hit effect
        self:createHitEffect(hitPosition)
    else
        -- Hit environment
        self:createImpactEffect(hitPosition)
    end
end

function WeaponSystem:calculateDamage()
    local baseDamage = self.damage
    
    -- Check for critical hit
    if math.random() < self.criticalChance then
        baseDamage = baseDamage * self.criticalMultiplier
        print("Critical hit!")
    end
    
    return baseDamage
end

function WeaponSystem:createMuzzleFlash()
    local handle = self.tool:FindFirstChild("Handle")
    local muzzleFlash = handle:FindFirstChild("MuzzleFlash")
    
    if muzzleFlash then
        muzzleFlash.Transparency = 0
        
        -- Fade out
        local tween = game:GetService("TweenService"):Create(muzzleFlash,
            TweenInfo.new(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
            {Transparency = 1}
        )
        tween:Play()
    end
end

function WeaponSystem:createHitEffect(position)
    local effect = Instance.new("Part")
    effect.Size = Vector3.new(0.5, 0.5, 0.5)
    effect.Material = Enum.Material.Neon
    effect.Color = Color3.fromRGB(255, 0, 0)
    effect.CFrame = CFrame.new(position)
    effect.Anchored = true
    effect.Parent = workspace
    
    -- Fade out and destroy
    local tween = game:GetService("TweenService"):Create(effect,
        TweenInfo.new(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {Transparency = 1, Size = Vector3.new(2, 2, 2)}
    )
    tween:Play()
    
    tween.Completed:Connect(function()
        effect:Destroy()
    end)
end

function WeaponSystem:createImpactEffect(position)
    local effect = Instance.new("Part")
    effect.Size = Vector3.new(0.3, 0.3, 0.3)
    effect.Material = Enum.Material.Neon
    effect.Color = Color3.fromRGB(255, 255, 0)
    effect.CFrame = CFrame.new(position)
    effect.Anchored = true
    effect.Parent = workspace
    
    -- Fade out and destroy
    local tween = game:GetService("TweenService"):Create(effect,
        TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {Transparency = 1}
    )
    tween:Play()
    
    tween.Completed:Connect(function()
        effect:Destroy()
    end)
end

function WeaponSystem:reload()
    if self.isReloading or self.ammo >= self.maxAmmo then
        return
    end
    
    self.isReloading = true
    self.tool.Enabled = false
    
    print("Reloading...")
    
    wait(self.reloadTime)
    
    self.ammo = self.maxAmmo
    self.isReloading = false
    self.tool.Enabled = true
    
    print("Reload complete!")
end

function WeaponSystem:onEquipped()
    print("Weapon equipped!")
end

function WeaponSystem:onUnequipped()
    print("Weapon unequipped!")
end

-- 4. DEMO THE TOOL SYSTEMS
print("\\n4. RUNNING TOOL SYSTEM DEMONSTRATIONS...")

-- Create basic tool
local basicTool = createBasicTool()

-- Create advanced tool
local toolData = {
    cooldown = 0.5,
    ammo = 15,
    maxAmmo = 15,
    durability = 100,
    maxDurability = 100,
    modes = {"primary", "secondary", "tertiary"}
}

local advancedTool = AdvancedTool.new("Advanced Tool", toolData)

-- Create weapon
local weaponData = {
    damage = 35,
    range = 150,
    accuracy = 0.85,
    criticalChance = 0.15,
    criticalMultiplier = 2.5,
    fireRate = 0.8,
    ammo = 25,
    maxAmmo = 25,
    reloadTime = 2.5
}

local weapon = WeaponSystem.new("Assault Rifle", weaponData)

print("\\n=== TOOL BASICS & CREATION DEMO COMPLETE ===")
print("You've learned tool creation and weapon systems!")`,
    challenge: {
      tests: [
        { description: 'Create a Tool with a Handle part', type: 'code_contains', value: 'Tool' },
        { description: 'Connect to tool events like Activated', type: 'code_contains', value: 'Activated' },
        { description: 'Use raycasting for hit detection', type: 'code_contains', value: 'Raycast' }
      ],
      hints: [
        'Use Instance.new("Tool") to create tools',
        'Connect to tool.Activated, tool.Equipped, etc. for tool events',
        'Use workspace:Raycast() for hit detection in weapons',
        'Use tool.Enabled to control tool availability',
        'Use tool.RequiresHandle = true for tools that need handles'
      ],
      successMessage: 'Excellent! You now understand tool creation and weapon systems. These skills are essential for creating interactive gameplay elements!'
    }
  },

  // === PLAYER MANAGEMENT ===
  'player-data-systems': {
    title: 'Player Data & Leaderboards',
    description: 'Master player data management, leaderboards, and progression systems',
    sections: [
      {
        title: 'Player Data Management',
        content: `Player data systems are essential for tracking player progress, statistics, and achievements in your Roblox game.

**Core Player Data Concepts:**
- **DataStoreService**: Persistent data storage across sessions
- **Player Data Structure**: Organized data hierarchy
- **Data Validation**: Ensuring data integrity and security
- **Data Backup**: Protecting against data loss
- **Data Migration**: Updating data structures over time

**Player Data Types:**
- **Statistics**: Kills, deaths, wins, losses, playtime
- **Currency**: Coins, gems, tokens, experience points
- **Inventory**: Items, tools, cosmetics, collectibles
- **Progress**: Levels, achievements, unlocks, milestones
- **Settings**: Preferences, keybinds, display options

**Data Security Best Practices:**
- **Server-Side Validation**: Never trust client data
- **Rate Limiting**: Prevent data spam and exploits
- **Data Encryption**: Protect sensitive information
- **Backup Systems**: Multiple data storage locations`,
        codeExample: `-- Comprehensive player data management system

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local PlayerDataManager = {}
PlayerDataManager.__index = PlayerDataManager

-- Data store configuration
local DATA_STORE_NAME = "PlayerData_v2"
local BACKUP_STORE_NAME = "PlayerData_Backup_v2"
local AUTO_SAVE_INTERVAL = 30 -- seconds

-- Default player data structure
local DEFAULT_DATA = {
    stats = {
        level = 1,
        experience = 0,
        coins = 100,
        gems = 0,
        kills = 0,
        deaths = 0,
        wins = 0,
        losses = 0,
        playtime = 0,
        joinDate = os.time()
    },
    inventory = {
        tools = {},
        cosmetics = {},
        collectibles = {}
    },
    progress = {
        achievements = {},
        unlocks = {},
        milestones = {}
    },
    settings = {
        musicVolume = 0.5,
        sfxVolume = 0.5,
        graphicsQuality = "Medium",
        keybinds = {}
    }
}

function PlayerDataManager.new()
    local self = setmetatable({}, PlayerDataManager)
    
    -- Data stores
    self.dataStore = DataStoreService:GetDataStore(DATA_STORE_NAME)
    self.backupStore = DataStoreService:GetDataStore(BACKUP_STORE_NAME)
    
    -- Player data cache
    self.playerData = {}
    self.autoSaveConnections = {}
    
    -- Setup player events
    self:setupPlayerEvents()
    
    return self
end

function PlayerDataManager:setupPlayerEvents()
    Players.PlayerAdded:Connect(function(player)
        self:loadPlayerData(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:savePlayerData(player)
        self:cleanupPlayerData(player)
    end)
    
    -- Auto-save system
    RunService.Heartbeat:Connect(function()
        for player, _ in pairs(self.playerData) do
            if player.Parent then
                local data = self.playerData[player]
                if data and data.needsSave then
                    self:savePlayerData(player)
                end
            end
        end
    end)
end

function PlayerDataManager:loadPlayerData(player)
    local success, data = pcall(function()
        return self.dataStore:GetAsync(player.UserId)
    end)
    
    if success and data then
        -- Validate and merge with default data
        self.playerData[player] = self:validateData(data)
        print("Loaded data for", player.Name)
    else
        -- Create new player data
        self.playerData[player] = self:deepCopy(DEFAULT_DATA)
        print("Created new data for", player.Name)
    end
    
    -- Mark for save to ensure data is stored
    self.playerData[player].needsSave = true
    
    -- Setup auto-save
    self:setupAutoSave(player)
    
    -- Fire data loaded event
    self:fireDataLoaded(player)
end

function PlayerDataManager:savePlayerData(player)
    local data = self.playerData[player]
    if not data then return end
    
    -- Remove temporary data
    local saveData = self:deepCopy(data)
    saveData.needsSave = nil
    
    local success = pcall(function()
        self.dataStore:SetAsync(player.UserId, saveData)
    end)
    
    if success then
        print("Saved data for", player.Name)
        data.needsSave = false
        
        -- Backup data
        self:backupPlayerData(player, saveData)
    else
        warn("Failed to save data for", player.Name)
    end
end

function PlayerDataManager:backupPlayerData(player, data)
    pcall(function()
        self.backupStore:SetAsync(player.UserId, data)
    end)
end

function PlayerDataManager:validateData(data)
    local validatedData = self:deepCopy(DEFAULT_DATA)
    
    -- Validate stats
    if data.stats then
        for key, value in pairs(data.stats) do
            if validatedData.stats[key] ~= nil then
                if type(value) == type(validatedData.stats[key]) then
                    validatedData.stats[key] = value
                end
            end
        end
    end
    
    -- Validate inventory
    if data.inventory then
        for category, items in pairs(data.inventory) do
            if validatedData.inventory[category] then
                validatedData.inventory[category] = items
            end
        end
    end
    
    -- Validate progress
    if data.progress then
        for category, items in pairs(data.progress) do
            if validatedData.progress[category] then
                validatedData.progress[category] = items
            end
        end
    end
    
    -- Validate settings
    if data.settings then
        for key, value in pairs(data.settings) do
            if validatedData.settings[key] ~= nil then
                if type(value) == type(validatedData.settings[key]) then
                    validatedData.settings[key] = value
                end
            end
        end
    end
    
    return validatedData
end

function PlayerDataManager:getPlayerData(player)
    return self.playerData[player]
end

function PlayerDataManager:updateStat(player, statName, value)
    local data = self.playerData[player]
    if not data then return false end
    
    if data.stats[statName] ~= nil then
        data.stats[statName] = value
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:addStat(player, statName, amount)
    local data = self.playerData[player]
    if not data then return false end
    
    if data.stats[statName] ~= nil then
        data.stats[statName] = data.stats[statName] + amount
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:addItem(player, category, itemId, itemData)
    local data = self.playerData[player]
    if not data then return false end
    
    if data.inventory[category] then
        data.inventory[category][itemId] = itemData
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:removeItem(player, category, itemId)
    local data = self.playerData[player]
    if not data then return false end
    
    if data.inventory[category] and data.inventory[category][itemId] then
        data.inventory[category][itemId] = nil
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:unlockAchievement(player, achievementId)
    local data = self.playerData[player]
    if not data then return false end
    
    if not data.progress.achievements[achievementId] then
        data.progress.achievements[achievementId] = {
            unlocked = true,
            unlockedAt = os.time()
        }
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:setupAutoSave(player)
    local connection = RunService.Heartbeat:Connect(function()
        local data = self.playerData[player]
        if data and data.needsSave then
            self:savePlayerData(player)
        end
    end)
    
    self.autoSaveConnections[player] = connection
end

function PlayerDataManager:cleanupPlayerData(player)
    if self.autoSaveConnections[player] then
        self.autoSaveConnections[player]:Disconnect()
        self.autoSaveConnections[player] = nil
    end
    
    self.playerData[player] = nil
end

function PlayerDataManager:fireDataLoaded(player)
    -- Fire custom event for other systems
    local bindableEvent = Instance.new("BindableEvent")
    bindableEvent.Name = "PlayerDataLoaded"
    bindableEvent.Parent = player
    
    bindableEvent:Fire(self.playerData[player])
end

function PlayerDataManager:deepCopy(original)
    local copy = {}
    for key, value in pairs(original) do
        if type(value) == "table" then
            copy[key] = self:deepCopy(value)
        else
            copy[key] = value
        end
    end
    return copy
end

-- Example usage
local dataManager = PlayerDataManager.new()

-- Update player stats
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for data to load
    
    -- Add some coins
    dataManager:addStat(player, "coins", 50)
    
    -- Add a tool to inventory
    dataManager:addItem(player, "tools", "sword_001", {
        name = "Iron Sword",
        damage = 25,
        durability = 100
    })
    
    -- Unlock an achievement
    dataManager:unlockAchievement(player, "first_join")
    
    print("Updated data for", player.Name)
end)`,
        color: 'blue'
      },
      {
        title: 'Leaderboard Systems',
        content: `Create dynamic leaderboards that display player rankings and statistics in real-time.

**Leaderboard Types:**
- **Global Leaderboards**: All-time rankings across all players
- **Seasonal Leaderboards**: Time-limited competitions
- **Category Leaderboards**: Specific stat rankings (kills, coins, etc.)
- **Group Leaderboards**: Rankings within specific groups
- **Local Leaderboards**: Friends or nearby players

**Leaderboard Features:**
- **Real-time Updates**: Live ranking changes
- **Multiple Categories**: Different ranking systems
- **Reward Systems**: Prizes for top players
- **Anti-Cheat**: Validation and security measures
- **Performance Optimization**: Efficient data handling

**Leaderboard UI Components:**
- **Ranking Display**: Position, name, value
- **Player Avatars**: Visual representation
- **Progress Bars**: Visual progress indicators
- **Reward Icons**: Achievement and prize displays`,
        codeExample: `-- Advanced leaderboard system

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local LeaderboardManager = {}
LeaderboardManager.__index = LeaderboardManager

-- Leaderboard configuration
local LEADERBOARD_STORE_NAME = "LeaderboardData_v1"
local UPDATE_INTERVAL = 60 -- seconds
local MAX_LEADERBOARD_SIZE = 100

-- Leaderboard categories
local LEADERBOARD_CATEGORIES = {
    "coins",
    "kills", 
    "wins",
    "level",
    "playtime"
}

function LeaderboardManager.new()
    local self = setmetatable({}, LeaderboardManager)
    
    -- Data store
    self.dataStore = DataStoreService:GetDataStore(LEADERBOARD_STORE_NAME)
    
    -- Leaderboard data
    self.leaderboards = {}
    self.playerData = {}
    
    -- Update connections
    self.updateConnections = {}
    
    -- Initialize leaderboards
    self:initializeLeaderboards()
    
    -- Setup update system
    self:setupUpdateSystem()
    
    return self
end

function LeaderboardManager:initializeLeaderboards()
    for _, category in ipairs(LEADERBOARD_CATEGORIES) do
        self.leaderboards[category] = {}
        self:loadLeaderboard(category)
    end
end

function LeaderboardManager:loadLeaderboard(category)
    local success, data = pcall(function()
        return self.dataStore:GetAsync(category)
    end)
    
    if success and data then
        self.leaderboards[category] = data
        print("Loaded leaderboard for", category)
    else
        self.leaderboards[category] = {}
        print("Created new leaderboard for", category)
    end
end

function LeaderboardManager:saveLeaderboard(category)
    local success = pcall(function()
        self.dataStore:SetAsync(category, self.leaderboards[category])
    end)
    
    if success then
        print("Saved leaderboard for", category)
    else
        warn("Failed to save leaderboard for", category)
    end
end

function LeaderboardManager:updatePlayerScore(player, category, score)
    if not self.leaderboards[category] then
        return false
    end
    
    local userId = player.UserId
    local playerName = player.Name
    
    -- Update player data
    self.playerData[userId] = self.playerData[userId] or {}
    self.playerData[userId][category] = score
    self.playerData[userId].name = playerName
    
    -- Update leaderboard
    local leaderboard = self.leaderboards[category]
    local found = false
    
    for i, entry in ipairs(leaderboard) do
        if entry.userId == userId then
            entry.score = score
            entry.name = playerName
            entry.updatedAt = os.time()
            found = true
            break
        end
    end
    
    if not found then
        table.insert(leaderboard, {
            userId = userId,
            name = playerName,
            score = score,
            updatedAt = os.time()
        })
    end
    
    -- Sort leaderboard
    table.sort(leaderboard, function(a, b)
        return a.score > b.score
    end)
    
    -- Trim to max size
    if #leaderboard > MAX_LEADERBOARD_SIZE then
        for i = MAX_LEADERBOARD_SIZE + 1, #leaderboard do
            leaderboard[i] = nil
        end
    end
    
    -- Save leaderboard
    self:saveLeaderboard(category)
    
    -- Fire update event
    self:fireLeaderboardUpdate(category)
    
    return true
end

function LeaderboardManager:getLeaderboard(category, limit)
    local leaderboard = self.leaderboards[category] or {}
    limit = limit or 10
    
    local result = {}
    for i = 1, math.min(limit, #leaderboard) do
        table.insert(result, leaderboard[i])
    end
    
    return result
end

function LeaderboardManager:getPlayerRank(player, category)
    local leaderboard = self.leaderboards[category] or {}
    local userId = player.UserId
    
    for i, entry in ipairs(leaderboard) do
        if entry.userId == userId then
            return i
        end
    end
    
    return nil
end

function LeaderboardManager:getPlayerScore(player, category)
    local leaderboard = self.leaderboards[category] or {}
    local userId = player.UserId
    
    for _, entry in ipairs(leaderboard) do
        if entry.userId == userId then
            return entry.score
        end
    end
    
    return 0
end

function LeaderboardManager:setupUpdateSystem()
    -- Update leaderboards periodically
    for _, category in ipairs(LEADERBOARD_CATEGORIES) do
        local connection = RunService.Heartbeat:Connect(function()
            -- Update every UPDATE_INTERVAL seconds
            if tick() % UPDATE_INTERVAL < 1 then
                self:updateLeaderboardFromPlayers(category)
            end
        end)
        
        self.updateConnections[category] = connection
    end
end

function LeaderboardManager:updateLeaderboardFromPlayers(category)
    for _, player in ipairs(Players:GetPlayers()) do
        -- Get player data from your data manager
        local playerData = self:getPlayerDataFromManager(player)
        if playerData and playerData.stats[category] then
            self:updatePlayerScore(player, category, playerData.stats[category])
        end
    end
end

function LeaderboardManager:getPlayerDataFromManager(player)
    -- This would connect to your PlayerDataManager
    -- For now, return mock data
    return {
        stats = {
            coins = math.random(1000, 10000),
            kills = math.random(0, 500),
            wins = math.random(0, 100),
            level = math.random(1, 50),
            playtime = math.random(3600, 86400)
        }
    }
end

function LeaderboardManager:fireLeaderboardUpdate(category)
    -- Create remote event for client updates
    local remoteEvent = ReplicatedStorage:FindFirstChild("LeaderboardUpdate")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "LeaderboardUpdate"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    local leaderboard = self:getLeaderboard(category, 10)
    remoteEvent:FireAllClients(category, leaderboard)
end

function LeaderboardManager:getTopPlayers(category, count)
    return self:getLeaderboard(category, count)
end

function LeaderboardManager:getPlayerSurroundings(player, category, range)
    local leaderboard = self.leaderboards[category] or {}
    local userId = player.UserId
    local playerIndex = nil
    
    -- Find player position
    for i, entry in ipairs(leaderboard) do
        if entry.userId == userId then
            playerIndex = i
            break
        end
    end
    
    if not playerIndex then
        return {}
    end
    
    -- Get surrounding players
    local startIndex = math.max(1, playerIndex - range)
    local endIndex = math.min(#leaderboard, playerIndex + range)
    
    local result = {}
    for i = startIndex, endIndex do
        table.insert(result, leaderboard[i])
    end
    
    return result
end

-- Example usage
local leaderboardManager = LeaderboardManager.new()

-- Update player scores
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player data to load
    
    -- Update various leaderboards
    leaderboardManager:updatePlayerScore(player, "coins", 1000)
    leaderboardManager:updatePlayerScore(player, "kills", 5)
    leaderboardManager:updatePlayerScore(player, "wins", 1)
    leaderboardManager:updatePlayerScore(player, "level", 2)
    leaderboardManager:updatePlayerScore(player, "playtime", 3600)
    
    print("Updated leaderboards for", player.Name)
end)

-- Get leaderboard data
local function displayLeaderboard(category)
    local topPlayers = leaderboardManager:getTopPlayers(category, 5)
    print("Top 5 players for", category, ":")
    
    for i, player in ipairs(topPlayers) do
        print(i .. ". " .. player.name .. " - " .. player.score)
    end
end

-- Display leaderboards
displayLeaderboard("coins")
displayLeaderboard("kills")`,
        color: 'green'
      },
      {
        title: 'Group & Team Management',
        content: `Implement group systems, team management, and player organization features.

**Group Management Features:**
- **Group Creation**: Allow players to create and join groups
- **Group Permissions**: Role-based access control
- **Group Activities**: Shared goals and challenges
- **Group Chat**: Communication systems
- **Group Rewards**: Shared benefits and bonuses

**Team Management Systems:**
- **Team Formation**: Automatic or manual team creation
- **Team Balancing**: Fair team distribution
- **Team Objectives**: Shared goals and missions
- **Team Communication**: Coordination tools
- **Team Statistics**: Performance tracking

**Player Organization:**
- **Friend Systems**: Social connections
- **Guild Systems**: Long-term player groups
- **Clan Systems**: Competitive player groups
- **Mentor Systems**: Player guidance and teaching`,
        codeExample: `-- Comprehensive group and team management system

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local GroupManager = {}
GroupManager.__index = GroupManager

-- Group configuration
local MAX_GROUP_SIZE = 10
local MAX_TEAM_SIZE = 4
local GROUP_CREATION_COST = 100

-- Group roles
local GROUP_ROLES = {
    OWNER = "Owner",
    ADMIN = "Admin", 
    MODERATOR = "Moderator",
    MEMBER = "Member"
}

-- Group permissions
local GROUP_PERMISSIONS = {
    [GROUP_ROLES.OWNER] = {
        kick = true,
        promote = true,
        demote = true,
        disband = true,
        invite = true,
        editSettings = true
    },
    [GROUP_ROLES.ADMIN] = {
        kick = true,
        promote = true,
        demote = true,
        invite = true,
        editSettings = false
    },
    [GROUP_ROLES.MODERATOR] = {
        kick = true,
        invite = true,
        editSettings = false
    },
    [GROUP_ROLES.MEMBER] = {
        kick = false,
        invite = false,
        editSettings = false
    }
}

function GroupManager.new()
    local self = setmetatable({}, GroupManager)
    
    -- Group data
    self.groups = {}
    self.playerGroups = {}
    self.teamAssignments = {}
    
    -- Group ID counter
    self.nextGroupId = 1
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function GroupManager:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function GroupManager:initializePlayer(player)
    self.playerGroups[player.UserId] = nil
    self.teamAssignments[player.UserId] = nil
end

function GroupManager:cleanupPlayer(player)
    local groupId = self.playerGroups[player.UserId]
    if groupId then
        self:removePlayerFromGroup(player, groupId)
    end
end

function GroupManager:createGroup(player, groupName, description)
    -- Check if player is already in a group
    if self.playerGroups[player.UserId] then
        return false, "Player is already in a group"
    end
    
    -- Check if player has enough coins (example)
    local playerData = self:getPlayerData(player)
    if playerData and playerData.stats.coins < GROUP_CREATION_COST then
        return false, "Not enough coins to create group"
    end
    
    -- Create group
    local groupId = self.nextGroupId
    self.nextGroupId = self.nextGroupId + 1
    
    local group = {
        id = groupId,
        name = groupName,
        description = description,
        owner = player.UserId,
        members = {
            [player.UserId] = {
                userId = player.UserId,
                name = player.Name,
                role = GROUP_ROLES.OWNER,
                joinedAt = os.time()
            }
        },
        settings = {
            maxSize = MAX_GROUP_SIZE,
            isPublic = true,
            allowInvites = true,
            requireApproval = false
        },
        stats = {
            totalMembers = 1,
            totalActivity = 0,
            level = 1,
            experience = 0
        },
        createdAt = os.time()
    }
    
    self.groups[groupId] = group
    self.playerGroups[player.UserId] = groupId
    
    -- Deduct creation cost
    if playerData then
        playerData.stats.coins = playerData.stats.coins - GROUP_CREATION_COST
    end
    
    -- Fire group created event
    self:fireGroupEvent("GroupCreated", groupId, player)
    
    return true, "Group created successfully"
end

function GroupManager:joinGroup(player, groupId)
    -- Check if player is already in a group
    if self.playerGroups[player.UserId] then
        return false, "Player is already in a group"
    end
    
    local group = self.groups[groupId]
    if not group then
        return false, "Group not found"
    end
    
    -- Check if group is full
    if group.stats.totalMembers >= group.settings.maxSize then
        return false, "Group is full"
    end
    
    -- Add player to group
    group.members[player.UserId] = {
        userId = player.UserId,
        name = player.Name,
        role = GROUP_ROLES.MEMBER,
        joinedAt = os.time()
    }
    
    group.stats.totalMembers = group.stats.totalMembers + 1
    self.playerGroups[player.UserId] = groupId
    
    -- Fire group joined event
    self:fireGroupEvent("PlayerJoined", groupId, player)
    
    return true, "Joined group successfully"
end

function GroupManager:leaveGroup(player, groupId)
    local group = self.groups[groupId]
    if not group then
        return false, "Group not found"
    end
    
    local member = group.members[player.UserId]
    if not member then
        return false, "Player is not in this group"
    end
    
    -- Check if player is the owner
    if member.role == GROUP_ROLES.OWNER then
        return false, "Owner cannot leave group. Transfer ownership or disband group."
    end
    
    -- Remove player from group
    group.members[player.UserId] = nil
    group.stats.totalMembers = group.stats.totalMembers - 1
    self.playerGroups[player.UserId] = nil
    
    -- Fire group left event
    self:fireGroupEvent("PlayerLeft", groupId, player)
    
    -- Check if group is empty
    if group.stats.totalMembers == 0 then
        self:disbandGroup(groupId)
    end
    
    return true, "Left group successfully"
end

function GroupManager:kickPlayer(kicker, targetPlayer, groupId)
    local group = self.groups[groupId]
    if not group then
        return false, "Group not found"
    end
    
    local kickerMember = group.members[kicker.UserId]
    local targetMember = group.members[targetPlayer.UserId]
    
    if not kickerMember or not targetMember then
        return false, "Player not in group"
    end
    
    -- Check permissions
    if not self:hasPermission(kickerMember.role, "kick") then
        return false, "Insufficient permissions"
    end
    
    -- Check if target is owner
    if targetMember.role == GROUP_ROLES.OWNER then
        return false, "Cannot kick group owner"
    end
    
    -- Check if kicker is trying to kick someone with higher or equal role
    if not self:canModifyRole(kickerMember.role, targetMember.role) then
        return false, "Cannot kick player with higher or equal role"
    end
    
    -- Remove target from group
    group.members[targetPlayer.UserId] = nil
    group.stats.totalMembers = group.stats.totalMembers - 1
    self.playerGroups[targetPlayer.UserId] = nil
    
    -- Fire group kicked event
    self:fireGroupEvent("PlayerKicked", groupId, targetPlayer, kicker)
    
    return true, "Player kicked successfully"
end

function GroupManager:promotePlayer(promoter, targetPlayer, groupId, newRole)
    local group = self.groups[groupId]
    if not group then
        return false, "Group not found"
    end
    
    local promoterMember = group.members[promoter.UserId]
    local targetMember = group.members[targetPlayer.UserId]
    
    if not promoterMember or not targetMember then
        return false, "Player not in group"
    end
    
    -- Check permissions
    if not self:hasPermission(promoterMember.role, "promote") then
        return false, "Insufficient permissions"
    end
    
    -- Check if promoter can modify target's role
    if not self:canModifyRole(promoterMember.role, targetMember.role) then
        return false, "Cannot promote player with higher or equal role"
    end
    
    -- Update target's role
    targetMember.role = newRole
    
    -- Fire group promoted event
    self:fireGroupEvent("PlayerPromoted", groupId, targetPlayer, promoter, newRole)
    
    return true, "Player promoted successfully"
end

function GroupManager:disbandGroup(groupId)
    local group = self.groups[groupId]
    if not group then
        return false, "Group not found"
    end
    
    -- Remove all players from group
    for userId, _ in pairs(group.members) do
        self.playerGroups[userId] = nil
    end
    
    -- Remove group
    self.groups[groupId] = nil
    
    -- Fire group disbanded event
    self:fireGroupEvent("GroupDisbanded", groupId)
    
    return true, "Group disbanded successfully"
end

function GroupManager:hasPermission(role, permission)
    local permissions = GROUP_PERMISSIONS[role]
    return permissions and permissions[permission] or false
end

function GroupManager:canModifyRole(modifierRole, targetRole)
    local roleHierarchy = {
        [GROUP_ROLES.OWNER] = 4,
        [GROUP_ROLES.ADMIN] = 3,
        [GROUP_ROLES.MODERATOR] = 2,
        [GROUP_ROLES.MEMBER] = 1
    }
    
    return roleHierarchy[modifierRole] > roleHierarchy[targetRole]
end

function GroupManager:getPlayerGroup(player)
    local groupId = self.playerGroups[player.UserId]
    if groupId then
        return self.groups[groupId]
    end
    return nil
end

function GroupManager:getGroupMembers(groupId)
    local group = self.groups[groupId]
    if not group then
        return {}
    end
    
    local members = {}
    for _, member in pairs(group.members) do
        table.insert(members, member)
    end
    
    return members
end

function GroupManager:createTeam(players, teamName)
    local teamId = "team_" .. os.time() .. "_" .. math.random(1000, 9999)
    
    local team = {
        id = teamId,
        name = teamName or "Team " .. teamId,
        members = {},
        leader = players[1].UserId,
        createdAt = os.time(),
        stats = {
            wins = 0,
            losses = 0,
            totalGames = 0
        }
    }
    
    -- Add players to team
    for _, player in ipairs(players) do
        team.members[player.UserId] = {
            userId = player.UserId,
            name = player.Name,
            role = player.UserId == team.leader and "Leader" or "Member"
        }
        
        self.teamAssignments[player.UserId] = teamId
    end
    
    -- Fire team created event
    self:fireTeamEvent("TeamCreated", teamId, players)
    
    return team
end

function GroupManager:disbandTeam(teamId)
    -- Remove all players from team
    for userId, _ in pairs(self.teamAssignments) do
        if self.teamAssignments[userId] == teamId then
            self.teamAssignments[userId] = nil
        end
    end
    
    -- Fire team disbanded event
    self:fireTeamEvent("TeamDisbanded", teamId)
end

function GroupManager:getPlayerTeam(player)
    local teamId = self.teamAssignments[player.UserId]
    return teamId
end

function GroupManager:fireGroupEvent(eventName, groupId, player, extraData)
    local remoteEvent = ReplicatedStorage:FindFirstChild("GroupEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "GroupEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    local eventData = {
        event = eventName,
        groupId = groupId,
        player = player and {
            userId = player.UserId,
            name = player.Name
        } or nil,
        extraData = extraData,
        timestamp = os.time()
    }
    
    remoteEvent:FireAllClients(eventData)
end

function GroupManager:fireTeamEvent(eventName, teamId, players, extraData)
    local remoteEvent = ReplicatedStorage:FindFirstChild("TeamEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "TeamEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    local eventData = {
        event = eventName,
        teamId = teamId,
        players = players and {
            {userId = p.UserId, name = p.Name} for _, p in ipairs(players)
        } or nil,
        extraData = extraData,
        timestamp = os.time()
    }
    
    remoteEvent:FireAllClients(eventData)
end

function GroupManager:getPlayerData(player)
    -- This would connect to your PlayerDataManager
    -- For now, return mock data
    return {
        stats = {
            coins = 1000,
            level = 5
        }
    }
end

-- Example usage
local groupManager = GroupManager.new()

-- Create a group
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    -- Create a group
    local success, message = groupManager:createGroup(player, "Test Group", "A test group for learning")
    if success then
        print("Group created:", message)
    else
        print("Failed to create group:", message)
    end
end)

-- Join a group
local function joinGroup(player, groupId)
    local success, message = groupManager:joinGroup(player, groupId)
    if success then
        print("Joined group:", message)
    else
        print("Failed to join group:", message)
    end
end

-- Create a team
local function createTeam(players)
    local team = groupManager:createTeam(players, "Dream Team")
    print("Created team:", team.name, "with", #players, "players")
    return team
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Player Data & Leaderboards - Comprehensive Learning Example
-- Master player data management and leaderboard systems

print("=== PLAYER DATA & LEADERBOARDS DEMO ===")
print("Learning player data management and leaderboard systems...")

-- 1. PLAYER DATA MANAGEMENT
print("\\n1. DEMONSTRATING PLAYER DATA MANAGEMENT...")

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local PlayerDataManager = {}
PlayerDataManager.__index = PlayerDataManager

-- Default player data structure
local DEFAULT_DATA = {
    stats = {
        level = 1,
        experience = 0,
        coins = 100,
        gems = 0,
        kills = 0,
        deaths = 0,
        wins = 0,
        losses = 0,
        playtime = 0,
        joinDate = os.time()
    },
    inventory = {
        tools = {},
        cosmetics = {},
        collectibles = {}
    },
    progress = {
        achievements = {},
        unlocks = {},
        milestones = {}
    },
    settings = {
        musicVolume = 0.5,
        sfxVolume = 0.5,
        graphicsQuality = "Medium",
        keybinds = {}
    }
}

function PlayerDataManager.new()
    local self = setmetatable({}, PlayerDataManager)
    
    -- Data stores
    self.dataStore = DataStoreService:GetDataStore("PlayerData_v2")
    self.backupStore = DataStoreService:GetDataStore("PlayerData_Backup_v2")
    
    -- Player data cache
    self.playerData = {}
    self.autoSaveConnections = {}
    
    -- Setup player events
    self:setupPlayerEvents()
    
    return self
end

function PlayerDataManager:setupPlayerEvents()
    Players.PlayerAdded:Connect(function(player)
        self:loadPlayerData(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:savePlayerData(player)
        self:cleanupPlayerData(player)
    end)
end

function PlayerDataManager:loadPlayerData(player)
    local success, data = pcall(function()
        return self.dataStore:GetAsync(player.UserId)
    end)
    
    if success and data then
        -- Validate and merge with default data
        self.playerData[player] = self:validateData(data)
        print("Loaded data for", player.Name)
    else
        -- Create new player data
        self.playerData[player] = self:deepCopy(DEFAULT_DATA)
        print("Created new data for", player.Name)
    end
    
    -- Mark for save to ensure data is stored
    self.playerData[player].needsSave = true
    
    -- Fire data loaded event
    self:fireDataLoaded(player)
end

function PlayerDataManager:savePlayerData(player)
    local data = self.playerData[player]
    if not data then return end
    
    -- Remove temporary data
    local saveData = self:deepCopy(data)
    saveData.needsSave = nil
    
    local success = pcall(function()
        self.dataStore:SetAsync(player.UserId, saveData)
    end)
    
    if success then
        print("Saved data for", player.Name)
        data.needsSave = false
        
        -- Backup data
        self:backupPlayerData(player, saveData)
    else
        warn("Failed to save data for", player.Name)
    end
end

function PlayerDataManager:backupPlayerData(player, data)
    pcall(function()
        self.backupStore:SetAsync(player.UserId, data)
    end)
end

function PlayerDataManager:validateData(data)
    local validatedData = self:deepCopy(DEFAULT_DATA)
    
    -- Validate stats
    if data.stats then
        for key, value in pairs(data.stats) do
            if validatedData.stats[key] ~= nil then
                if type(value) == type(validatedData.stats[key]) then
                    validatedData.stats[key] = value
                end
            end
        end
    end
    
    -- Validate inventory
    if data.inventory then
        for category, items in pairs(data.inventory) do
            if validatedData.inventory[category] then
                validatedData.inventory[category] = items
            end
        end
    end
    
    -- Validate progress
    if data.progress then
        for category, items in pairs(data.progress) do
            if validatedData.progress[category] then
                validatedData.progress[category] = items
            end
        end
    end
    
    -- Validate settings
    if data.settings then
        for key, value in pairs(data.settings) do
            if validatedData.settings[key] ~= nil then
                if type(value) == type(validatedData.settings[key]) then
                    validatedData.settings[key] = value
                end
            end
        end
    end
    
    return validatedData
end

function PlayerDataManager:getPlayerData(player)
    return self.playerData[player]
end

function PlayerDataManager:updateStat(player, statName, value)
    local data = self.playerData[player]
    if not data then return false end
    
    if data.stats[statName] ~= nil then
        data.stats[statName] = value
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:addStat(player, statName, amount)
    local data = self.playerData[player]
    if not data then return false end
    
    if data.stats[statName] ~= nil then
        data.stats[statName] = data.stats[statName] + amount
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:addItem(player, category, itemId, itemData)
    local data = self.playerData[player]
    if not data then return false end
    
    if data.inventory[category] then
        data.inventory[category][itemId] = itemData
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:removeItem(player, category, itemId)
    local data = self.playerData[player]
    if not data then return false end
    
    if data.inventory[category] and data.inventory[category][itemId] then
        data.inventory[category][itemId] = nil
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:unlockAchievement(player, achievementId)
    local data = self.playerData[player]
    if not data then return false end
    
    if not data.progress.achievements[achievementId] then
        data.progress.achievements[achievementId] = {
            unlocked = true,
            unlockedAt = os.time()
        }
        data.needsSave = true
        return true
    end
    
    return false
end

function PlayerDataManager:fireDataLoaded(player)
    -- Fire custom event for other systems
    local bindableEvent = Instance.new("BindableEvent")
    bindableEvent.Name = "PlayerDataLoaded"
    bindableEvent.Parent = player
    
    bindableEvent:Fire(self.playerData[player])
end

function PlayerDataManager:deepCopy(original)
    local copy = {}
    for key, value in pairs(original) do
        if type(value) == "table" then
            copy[key] = self:deepCopy(value)
        else
            copy[key] = value
        end
    end
    return copy
end

-- 2. LEADERBOARD SYSTEM
print("\\n2. DEMONSTRATING LEADERBOARD SYSTEM...")

local LeaderboardManager = {}
LeaderboardManager.__index = LeaderboardManager

-- Leaderboard categories
local LEADERBOARD_CATEGORIES = {
    "coins",
    "kills", 
    "wins",
    "level",
    "playtime"
}

function LeaderboardManager.new()
    local self = setmetatable({}, LeaderboardManager)
    
    -- Data store
    self.dataStore = DataStoreService:GetDataStore("LeaderboardData_v1")
    
    -- Leaderboard data
    self.leaderboards = {}
    self.playerData = {}
    
    -- Initialize leaderboards
    self:initializeLeaderboards()
    
    return self
end

function LeaderboardManager:initializeLeaderboards()
    for _, category in ipairs(LEADERBOARD_CATEGORIES) do
        self.leaderboards[category] = {}
        self:loadLeaderboard(category)
    end
end

function LeaderboardManager:loadLeaderboard(category)
    local success, data = pcall(function()
        return self.dataStore:GetAsync(category)
    end)
    
    if success and data then
        self.leaderboards[category] = data
        print("Loaded leaderboard for", category)
    else
        self.leaderboards[category] = {}
        print("Created new leaderboard for", category)
    end
end

function LeaderboardManager:saveLeaderboard(category)
    local success = pcall(function()
        self.dataStore:SetAsync(category, self.leaderboards[category])
    end)
    
    if success then
        print("Saved leaderboard for", category)
    else
        warn("Failed to save leaderboard for", category)
    end
end

function LeaderboardManager:updatePlayerScore(player, category, score)
    if not self.leaderboards[category] then
        return false
    end
    
    local userId = player.UserId
    local playerName = player.Name
    
    -- Update player data
    self.playerData[userId] = self.playerData[userId] or {}
    self.playerData[userId][category] = score
    self.playerData[userId].name = playerName
    
    -- Update leaderboard
    local leaderboard = self.leaderboards[category]
    local found = false
    
    for i, entry in ipairs(leaderboard) do
        if entry.userId == userId then
            entry.score = score
            entry.name = playerName
            entry.updatedAt = os.time()
            found = true
            break
        end
    end
    
    if not found then
        table.insert(leaderboard, {
            userId = userId,
            name = playerName,
            score = score,
            updatedAt = os.time()
        })
    end
    
    -- Sort leaderboard
    table.sort(leaderboard, function(a, b)
        return a.score > b.score
    end)
    
    -- Save leaderboard
    self:saveLeaderboard(category)
    
    return true
end

function LeaderboardManager:getLeaderboard(category, limit)
    local leaderboard = self.leaderboards[category] or {}
    limit = limit or 10
    
    local result = {}
    for i = 1, math.min(limit, #leaderboard) do
        table.insert(result, leaderboard[i])
    end
    
    return result
end

function LeaderboardManager:getPlayerRank(player, category)
    local leaderboard = self.leaderboards[category] or {}
    local userId = player.UserId
    
    for i, entry in ipairs(leaderboard) do
        if entry.userId == userId then
            return i
        end
    end
    
    return nil
end

function LeaderboardManager:getPlayerScore(player, category)
    local leaderboard = self.leaderboards[category] or {}
    local userId = player.UserId
    
    for _, entry in ipairs(leaderboard) do
        if entry.userId == userId then
            return entry.score
        end
    end
    
    return 0
end

-- 3. GROUP & TEAM MANAGEMENT
print("\\n3. DEMONSTRATING GROUP & TEAM MANAGEMENT...")

local GroupManager = {}
GroupManager.__index = GroupManager

-- Group roles
local GROUP_ROLES = {
    OWNER = "Owner",
    ADMIN = "Admin", 
    MODERATOR = "Moderator",
    MEMBER = "Member"
}

function GroupManager.new()
    local self = setmetatable({}, GroupManager)
    
    -- Group data
    self.groups = {}
    self.playerGroups = {}
    self.teamAssignments = {}
    
    -- Group ID counter
    self.nextGroupId = 1
    
    return self
end

function GroupManager:createGroup(player, groupName, description)
    -- Check if player is already in a group
    if self.playerGroups[player.UserId] then
        return false, "Player is already in a group"
    end
    
    -- Create group
    local groupId = self.nextGroupId
    self.nextGroupId = self.nextGroupId + 1
    
    local group = {
        id = groupId,
        name = groupName,
        description = description,
        owner = player.UserId,
        members = {
            [player.UserId] = {
                userId = player.UserId,
                name = player.Name,
                role = GROUP_ROLES.OWNER,
                joinedAt = os.time()
            }
        },
        settings = {
            maxSize = 10,
            isPublic = true,
            allowInvites = true,
            requireApproval = false
        },
        stats = {
            totalMembers = 1,
            totalActivity = 0,
            level = 1,
            experience = 0
        },
        createdAt = os.time()
    }
    
    self.groups[groupId] = group
    self.playerGroups[player.UserId] = groupId
    
    return true, "Group created successfully"
end

function GroupManager:joinGroup(player, groupId)
    -- Check if player is already in a group
    if self.playerGroups[player.UserId] then
        return false, "Player is already in a group"
    end
    
    local group = self.groups[groupId]
    if not group then
        return false, "Group not found"
    end
    
    -- Check if group is full
    if group.stats.totalMembers >= group.settings.maxSize then
        return false, "Group is full"
    end
    
    -- Add player to group
    group.members[player.UserId] = {
        userId = player.UserId,
        name = player.Name,
        role = GROUP_ROLES.MEMBER,
        joinedAt = os.time()
    }
    
    group.stats.totalMembers = group.stats.totalMembers + 1
    self.playerGroups[player.UserId] = groupId
    
    return true, "Joined group successfully"
end

function GroupManager:getPlayerGroup(player)
    local groupId = self.playerGroups[player.UserId]
    if groupId then
        return self.groups[groupId]
    end
    return nil
end

function GroupManager:createTeam(players, teamName)
    local teamId = "team_" .. os.time() .. "_" .. math.random(1000, 9999)
    
    local team = {
        id = teamId,
        name = teamName or "Team " .. teamId,
        members = {},
        leader = players[1].UserId,
        createdAt = os.time(),
        stats = {
            wins = 0,
            losses = 0,
            totalGames = 0
        }
    }
    
    -- Add players to team
    for _, player in ipairs(players) do
        team.members[player.UserId] = {
            userId = player.UserId,
            name = player.Name,
            role = player.UserId == team.leader and "Leader" or "Member"
        }
        
        self.teamAssignments[player.UserId] = teamId
    end
    
    return team
end

function GroupManager:getPlayerTeam(player)
    local teamId = self.teamAssignments[player.UserId]
    return teamId
end

-- 4. DEMO THE SYSTEMS
print("\\n4. RUNNING SYSTEM DEMONSTRATIONS...")

-- Create managers
local dataManager = PlayerDataManager.new()
local leaderboardManager = LeaderboardManager.new()
local groupManager = GroupManager.new()

-- Simulate player data operations
local function simulatePlayerData()
    print("\\n--- Simulating Player Data Operations ---")
    
    -- Create mock player
    local mockPlayer = {UserId = 12345, Name = "TestPlayer"}
    
    -- Load player data
    dataManager:loadPlayerData(mockPlayer)
    
    -- Update stats
    dataManager:addStat(mockPlayer, "coins", 500)
    dataManager:addStat(mockPlayer, "kills", 10)
    dataManager:addStat(mockPlayer, "wins", 3)
    dataManager:addStat(mockPlayer, "level", 5)
    dataManager:addStat(mockPlayer, "playtime", 7200)
    
    -- Add items
    dataManager:addItem(mockPlayer, "tools", "sword_001", {
        name = "Iron Sword",
        damage = 25,
        durability = 100
    })
    
    -- Unlock achievement
    dataManager:unlockAchievement(mockPlayer, "first_win")
    
    print("Player data operations completed!")
end

-- Simulate leaderboard operations
local function simulateLeaderboard()
    print("\\n--- Simulating Leaderboard Operations ---")
    
    -- Create mock players
    local mockPlayers = {
        {UserId = 11111, Name = "Player1"},
        {UserId = 22222, Name = "Player2"},
        {UserId = 33333, Name = "Player3"},
        {UserId = 44444, Name = "Player4"},
        {UserId = 55555, Name = "Player5"}
    }
    
    -- Update leaderboards
    for i, player in ipairs(mockPlayers) do
        leaderboardManager:updatePlayerScore(player, "coins", math.random(1000, 10000))
        leaderboardManager:updatePlayerScore(player, "kills", math.random(0, 100))
        leaderboardManager:updatePlayerScore(player, "wins", math.random(0, 50))
        leaderboardManager:updatePlayerScore(player, "level", math.random(1, 25))
        leaderboardManager:updatePlayerScore(player, "playtime", math.random(3600, 86400))
    end
    
    -- Display leaderboards
    for _, category in ipairs(LEADERBOARD_CATEGORIES) do
        local topPlayers = leaderboardManager:getLeaderboard(category, 3)
        print("\\nTop 3 players for", category, ":")
        
        for i, player in ipairs(topPlayers) do
            print(i .. ". " .. player.name .. " - " .. player.score)
        end
    end
    
    print("\\nLeaderboard operations completed!")
end

-- Simulate group operations
local function simulateGroup()
    print("\\n--- Simulating Group Operations ---")
    
    -- Create mock players
    local mockPlayers = {
        {UserId = 11111, Name = "GroupOwner"},
        {UserId = 22222, Name = "GroupMember1"},
        {UserId = 33333, Name = "GroupMember2"},
        {UserId = 44444, Name = "GroupMember3"}
    }
    
    -- Create group
    local success, message = groupManager:createGroup(mockPlayers[1], "Test Group", "A test group for learning")
    if success then
        print("Group created:", message)
        
        -- Join group
        for i = 2, #mockPlayers do
            local joinSuccess, joinMessage = groupManager:joinGroup(mockPlayers[i], 1)
            if joinSuccess then
                print("Player joined:", joinMessage)
            end
        end
        
        -- Create team
        local team = groupManager:createTeam(mockPlayers, "Dream Team")
        print("Created team:", team.name, "with", #mockPlayers, "players")
        
        -- Display group info
        local group = groupManager:getPlayerGroup(mockPlayers[1])
        if group then
            print("Group name:", group.name)
            print("Group members:", group.stats.totalMembers)
            print("Group created:", os.date("%Y-%m-%d %H:%M:%S", group.createdAt))
        end
    else
        print("Failed to create group:", message)
    end
    
    print("\\nGroup operations completed!")
end

-- Run simulations
simulatePlayerData()
simulateLeaderboard()
simulateGroup()

print("\\n=== PLAYER DATA & LEADERBOARDS DEMO COMPLETE ===")
print("You've learned player data management and leaderboard systems!")`,
    challenge: {
      tests: [
        { description: 'Use DataStoreService to save and load player data', type: 'code_contains', value: 'DataStoreService' },
        { description: 'Create leaderboard system with player rankings', type: 'code_contains', value: 'leaderboard' },
        { description: 'Implement group management with roles and permissions', type: 'code_contains', value: 'group' }
      ],
      hints: [
        'Use DataStoreService:GetDataStore() to create data stores',
        'Use dataStore:GetAsync() and dataStore:SetAsync() for data operations',
        'Create leaderboard arrays and sort them by score',
        'Use pcall() to handle data store errors safely',
        'Implement role-based permissions for group management'
      ],
      successMessage: 'Excellent! You now understand player data management and leaderboard systems. These skills are essential for creating engaging multiplayer experiences!'
    }
  },

  // === GAME MECHANICS ===
  'health-damage-systems': {
    title: 'Health & Damage Systems',
    description: 'Master health management, damage calculation, and combat mechanics',
    sections: [
      {
        title: 'Health System Fundamentals',
        content: `Health systems are the foundation of most game mechanics, controlling player survival and combat interactions.

**Core Health Concepts:**
- **Health Points (HP)**: Current health value
- **Maximum Health**: Upper limit of health
- **Health Regeneration**: Automatic health recovery
- **Health Bars**: Visual representation of health
- **Health States**: Alive, dead, critical, etc.

**Health System Features:**
- **Damage Types**: Physical, magical, environmental, etc.
- **Damage Resistance**: Protection against specific damage types
- **Health Modifiers**: Temporary health boosts or reductions
- **Health Events**: OnHealthChanged, OnDied, OnRespawned
- **Health Persistence**: Saving health state across sessions

**Advanced Health Mechanics:**
- **Shield Systems**: Temporary health protection
- **Armor Systems**: Damage reduction mechanics
- **Status Effects**: Poison, regeneration, etc.
- **Health Zones**: Areas that affect health over time`,
        codeExample: `-- Comprehensive health and damage system

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local HealthSystem = {}
HealthSystem.__index = HealthSystem

-- Health configuration
local DEFAULT_MAX_HEALTH = 100
local HEALTH_REGEN_RATE = 1 -- health per second
local HEALTH_REGEN_DELAY = 5 -- seconds after damage before regen starts
local SHIELD_DURATION = 10 -- seconds

-- Damage types
local DAMAGE_TYPES = {
    PHYSICAL = "Physical",
    MAGICAL = "Magical",
    FIRE = "Fire",
    ICE = "Ice",
    POISON = "Poison",
    ENVIRONMENTAL = "Environmental"
}

function HealthSystem.new()
    local self = setmetatable({}, HealthSystem)
    
    -- Player health data
    self.playerHealth = {}
    self.playerShields = {}
    self.playerArmor = {}
    self.playerStatusEffects = {}
    
    -- Health events
    self.healthEvents = {}
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function HealthSystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function HealthSystem:initializePlayer(player)
    local character = player.CharacterAdded:Wait()
    local humanoid = character:WaitForChild("Humanoid")
    
    -- Initialize health data
    self.playerHealth[player.UserId] = {
        maxHealth = DEFAULT_MAX_HEALTH,
        currentHealth = DEFAULT_MAX_HEALTH,
        lastDamageTime = 0,
        isDead = false,
        respawnTime = 0
    }
    
    -- Initialize shield data
    self.playerShields[player.UserId] = {
        currentShield = 0,
        maxShield = 0,
        shieldEndTime = 0
    }
    
    -- Initialize armor data
    self.playerArmor[player.UserId] = {
        physicalResistance = 0,
        magicalResistance = 0,
        fireResistance = 0,
        iceResistance = 0,
        poisonResistance = 0
    }
    
    -- Initialize status effects
    self.playerStatusEffects[player.UserId] = {}
    
    -- Set humanoid health
    humanoid.MaxHealth = DEFAULT_MAX_HEALTH
    humanoid.Health = DEFAULT_MAX_HEALTH
    
    -- Connect humanoid events
    humanoid.Died:Connect(function()
        self:onPlayerDied(player)
    end)
    
    humanoid.HealthChanged:Connect(function(health)
        self:onHealthChanged(player, health)
    end)
    
    -- Start health regeneration
    self:startHealthRegeneration(player)
    
    print("Initialized health system for", player.Name)
end

function HealthSystem:cleanupPlayer(player)
    self.playerHealth[player.UserId] = nil
    self.playerShields[player.UserId] = nil
    self.playerArmor[player.UserId] = nil
    self.playerStatusEffects[player.UserId] = nil
end

function HealthSystem:dealDamage(player, damage, damageType, source)
    local healthData = self.playerHealth[player.UserId]
    local shieldData = self.playerShields[player.UserId]
    local armorData = self.playerArmor[player.UserId]
    
    if not healthData or healthData.isDead then
        return false
    end
    
    -- Calculate damage resistance
    local resistance = self:getDamageResistance(player, damageType)
    local finalDamage = damage * (1 - resistance)
    
    -- Apply shield first
    if shieldData.currentShield > 0 then
        local shieldDamage = math.min(finalDamage, shieldData.currentShield)
        shieldData.currentShield = shieldData.currentShield - shieldDamage
        finalDamage = finalDamage - shieldDamage
        
        print("Shield absorbed", shieldDamage, "damage for", player.Name)
    end
    
    -- Apply remaining damage to health
    if finalDamage > 0 then
        healthData.currentHealth = math.max(0, healthData.currentHealth - finalDamage)
        healthData.lastDamageTime = tick()
        
        -- Update humanoid health
        local character = player.Character
        if character then
            local humanoid = character:FindFirstChild("Humanoid")
            if humanoid then
                humanoid.Health = healthData.currentHealth
            end
        end
        
        -- Fire damage event
        self:fireDamageEvent(player, finalDamage, damageType, source)
        
        print("Dealt", finalDamage, damageType, "damage to", player.Name)
    end
    
    return true
end

function HealthSystem:healPlayer(player, healAmount, source)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData or healthData.isDead then
        return false
    end
    
    local oldHealth = healthData.currentHealth
    healthData.currentHealth = math.min(healthData.maxHealth, healthData.currentHealth + healAmount)
    
    -- Update humanoid health
    local character = player.Character
    if character then
        local humanoid = character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid.Health = healthData.currentHealth
        end
    end
    
    -- Fire heal event
    self:fireHealEvent(player, healAmount, source)
    
    print("Healed", player.Name, "for", healAmount, "health")
    
    return true
end

function HealthSystem:setMaxHealth(player, newMaxHealth)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData then
        return false
    end
    
    local oldMaxHealth = healthData.maxHealth
    healthData.maxHealth = newMaxHealth
    
    -- Adjust current health proportionally
    local healthRatio = healthData.currentHealth / oldMaxHealth
    healthData.currentHealth = newMaxHealth * healthRatio
    
    -- Update humanoid
    local character = player.Character
    if character then
        local humanoid = character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid.MaxHealth = newMaxHealth
            humanoid.Health = healthData.currentHealth
        end
    end
    
    print("Set max health for", player.Name, "to", newMaxHealth)
    
    return true
end

function HealthSystem:addShield(player, shieldAmount, duration)
    local shieldData = self.playerShields[player.UserId]
    
    if not shieldData then
        return false
    end
    
    shieldData.currentShield = shieldData.currentShield + shieldAmount
    shieldData.maxShield = math.max(shieldData.maxShield, shieldData.currentShield)
    shieldData.shieldEndTime = tick() + duration
    
    -- Start shield countdown
    self:startShieldCountdown(player)
    
    print("Added", shieldAmount, "shield to", player.Name, "for", duration, "seconds")
    
    return true
end

function HealthSystem:setArmor(player, armorType, resistance)
    local armorData = self.playerArmor[player.UserId]
    
    if not armorData then
        return false
    end
    
    if armorType == "physical" then
        armorData.physicalResistance = resistance
    elseif armorType == "magical" then
        armorData.magicalResistance = resistance
    elseif armorType == "fire" then
        armorData.fireResistance = resistance
    elseif armorType == "ice" then
        armorData.iceResistance = resistance
    elseif armorType == "poison" then
        armorData.poisonResistance = resistance
    end
    
    print("Set", armorType, "resistance for", player.Name, "to", resistance)
    
    return true
end

function HealthSystem:addStatusEffect(player, effectName, duration, effectData)
    local statusEffects = self.playerStatusEffects[player.UserId]
    
    if not statusEffects then
        return false
    end
    
    statusEffects[effectName] = {
        startTime = tick(),
        duration = duration,
        data = effectData or {}
    }
    
    -- Start status effect
    self:startStatusEffect(player, effectName)
    
    print("Added status effect", effectName, "to", player.Name, "for", duration, "seconds")
    
    return true
end

function HealthSystem:removeStatusEffect(player, effectName)
    local statusEffects = self.playerStatusEffects[player.UserId]
    
    if not statusEffects or not statusEffects[effectName] then
        return false
    end
    
    statusEffects[effectName] = nil
    
    print("Removed status effect", effectName, "from", player.Name)
    
    return true
end

function HealthSystem:getDamageResistance(player, damageType)
    local armorData = self.playerArmor[player.UserId]
    
    if not armorData then
        return 0
    end
    
    if damageType == DAMAGE_TYPES.PHYSICAL then
        return armorData.physicalResistance
    elseif damageType == DAMAGE_TYPES.MAGICAL then
        return armorData.magicalResistance
    elseif damageType == DAMAGE_TYPES.FIRE then
        return armorData.fireResistance
    elseif damageType == DAMAGE_TYPES.ICE then
        return armorData.iceResistance
    elseif damageType == DAMAGE_TYPES.POISON then
        return armorData.poisonResistance
    end
    
    return 0
end

function HealthSystem:startHealthRegeneration(player)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData then
        return
    end
    
    local connection = RunService.Heartbeat:Connect(function()
        if healthData.isDead then
            connection:Disconnect()
            return
        end
        
        -- Check if enough time has passed since last damage
        if tick() - healthData.lastDamageTime >= HEALTH_REGEN_DELAY then
            if healthData.currentHealth < healthData.maxHealth then
                local regenAmount = HEALTH_REGEN_RATE * (1/60) -- Per frame
                healthData.currentHealth = math.min(healthData.maxHealth, healthData.currentHealth + regenAmount)
                
                -- Update humanoid health
                local character = player.Character
                if character then
                    local humanoid = character:FindFirstChild("Humanoid")
                    if humanoid then
                        humanoid.Health = healthData.currentHealth
                    end
                end
            end
        end
    end)
end

function HealthSystem:startShieldCountdown(player)
    local shieldData = self.playerShields[player.UserId]
    
    if not shieldData then
        return
    end
    
    local connection = RunService.Heartbeat:Connect(function()
        if tick() >= shieldData.shieldEndTime then
            shieldData.currentShield = 0
            connection:Disconnect()
            print("Shield expired for", player.Name)
        end
    end)
end

function HealthSystem:startStatusEffect(player, effectName)
    local statusEffects = self.playerStatusEffects[player.UserId]
    local effect = statusEffects[effectName]
    
    if not effect then
        return
    end
    
    local connection = RunService.Heartbeat:Connect(function()
        if tick() >= effect.startTime + effect.duration then
            self:removeStatusEffect(player, effectName)
            connection:Disconnect()
            return
        end
        
        -- Apply status effect
        if effectName == "poison" then
            self:dealDamage(player, effect.data.damage or 1, DAMAGE_TYPES.POISON, "Poison")
        elseif effectName == "regeneration" then
            self:healPlayer(player, effect.data.healAmount or 1, "Regeneration")
        end
    end)
end

function HealthSystem:onPlayerDied(player)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData then
        return
    end
    
    healthData.isDead = true
    healthData.respawnTime = tick() + 5 -- 5 second respawn delay
    
    -- Fire death event
    self:fireDeathEvent(player)
    
    print(player.Name, "died")
end

function HealthSystem:onHealthChanged(player, health)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData then
        return
    end
    
    healthData.currentHealth = health
    
    -- Fire health changed event
    self:fireHealthChangedEvent(player, health)
end

function HealthSystem:fireDamageEvent(player, damage, damageType, source)
    local remoteEvent = ReplicatedStorage:FindFirstChild("HealthEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "HealthEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "Damage",
        damage = damage,
        damageType = damageType,
        source = source,
        timestamp = tick()
    })
end

function HealthSystem:fireHealEvent(player, healAmount, source)
    local remoteEvent = ReplicatedStorage:FindFirstChild("HealthEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "HealthEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "Heal",
        healAmount = healAmount,
        source = source,
        timestamp = tick()
    })
end

function HealthSystem:fireDeathEvent(player)
    local remoteEvent = ReplicatedStorage:FindFirstChild("HealthEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "HealthEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "Death",
        timestamp = tick()
    })
end

function HealthSystem:fireHealthChangedEvent(player, health)
    local remoteEvent = ReplicatedStorage:FindFirstChild("HealthEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "HealthEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "HealthChanged",
        health = health,
        timestamp = tick()
    })
end

-- Example usage
local healthSystem = HealthSystem.new()

-- Test damage and healing
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for character to load
    
    -- Deal some damage
    healthSystem:dealDamage(player, 25, DAMAGE_TYPES.PHYSICAL, "Test Damage")
    
    -- Add shield
    healthSystem:addShield(player, 50, 10)
    
    -- Set armor
    healthSystem:setArmor(player, "physical", 0.5) -- 50% physical resistance
    
    -- Add status effect
    healthSystem:addStatusEffect(player, "poison", 5, {damage = 2})
    
    -- Heal player
    healthSystem:healPlayer(player, 30, "Test Heal")
    
    print("Applied health system tests to", player.Name)
end)`,
        color: 'blue'
      },
      {
        title: 'Experience & Leveling Systems',
        content: `Create comprehensive experience and leveling systems that drive player progression and engagement.

**Experience System Components:**
- **Experience Points (XP)**: Currency for leveling up
- **Level Requirements**: XP needed for each level
- **Experience Sources**: Combat, quests, exploration, etc.
- **Experience Multipliers**: Bonuses for different activities
- **Experience Sharing**: Group experience distribution

**Leveling System Features:**
- **Level Progression**: Linear, exponential, or custom curves
- **Level Rewards**: Unlocks, stat increases, new abilities
- **Prestige Systems**: Advanced progression beyond max level
- **Skill Trees**: Branching progression paths
- **Class Systems**: Different progression paths for different roles

**Progression Mechanics:**
- **Stat Increases**: Health, damage, speed, etc.
- **Ability Unlocks**: New skills and powers
- **Item Unlocks**: Access to better equipment
- **Area Unlocks**: New zones and content
- **Achievement Systems**: Milestone rewards`,
        codeExample: `-- Advanced experience and leveling system

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local DataStoreService = game:GetService("DataStoreService")

local ExperienceSystem = {}
ExperienceSystem.__index = ExperienceSystem

-- Experience configuration
local BASE_EXPERIENCE_REQUIRED = 100
local EXPERIENCE_MULTIPLIER = 1.5
local MAX_LEVEL = 100
local PRESTIGE_LEVELS = 10

-- Experience sources
local EXPERIENCE_SOURCES = {
    KILL = "Kill",
    QUEST = "Quest",
    EXPLORATION = "Exploration",
    CRAFTING = "Crafting",
    SOCIAL = "Social",
    ACHIEVEMENT = "Achievement"
}

-- Experience multipliers
local EXPERIENCE_MULTIPLIERS = {
    [EXPERIENCE_SOURCES.KILL] = 1.0,
    [EXPERIENCE_SOURCES.QUEST] = 1.5,
    [EXPERIENCE_SOURCES.EXPLORATION] = 0.8,
    [EXPERIENCE_SOURCES.CRAFTING] = 1.2,
    [EXPERIENCE_SOURCES.SOCIAL] = 0.5,
    [EXPERIENCE_SOURCES.ACHIEVEMENT] = 2.0
}

function ExperienceSystem.new()
    local self = setmetatable({}, ExperienceSystem)
    
    -- Player experience data
    self.playerExperience = {}
    self.playerLevels = {}
    self.playerStats = {}
    self.playerSkills = {}
    
    -- Data store
    self.dataStore = DataStoreService:GetDataStore("PlayerExperience_v1")
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function ExperienceSystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:savePlayerData(player)
        self:cleanupPlayer(player)
    end)
end

function ExperienceSystem:initializePlayer(player)
    -- Load player data
    local success, data = pcall(function()
        return self.dataStore:GetAsync(player.UserId)
    end)
    
    if success and data then
        self.playerExperience[player.UserId] = data.experience or 0
        self.playerLevels[player.UserId] = data.level or 1
        self.playerStats[player.UserId] = data.stats or self:getDefaultStats()
        self.playerSkills[player.UserId] = data.skills or {}
    else
        self.playerExperience[player.UserId] = 0
        self.playerLevels[player.UserId] = 1
        self.playerStats[player.UserId] = self:getDefaultStats()
        self.playerSkills[player.UserId] = {}
    end
    
    -- Apply level bonuses
    self:applyLevelBonuses(player)
    
    print("Initialized experience system for", player.Name, "Level:", self.playerLevels[player.UserId])
end

function ExperienceSystem:cleanupPlayer(player)
    self.playerExperience[player.UserId] = nil
    self.playerLevels[player.UserId] = nil
    self.playerStats[player.UserId] = nil
    self.playerSkills[player.UserId] = nil
end

function ExperienceSystem:addExperience(player, amount, source)
    local currentExp = self.playerExperience[player.UserId]
    local currentLevel = self.playerLevels[player.UserId]
    
    if not currentExp or not currentLevel then
        return false
    end
    
    -- Apply experience multiplier
    local multiplier = EXPERIENCE_MULTIPLIERS[source] or 1.0
    local finalAmount = amount * multiplier
    
    -- Add experience
    self.playerExperience[player.UserId] = currentExp + finalAmount
    
    -- Check for level up
    local newLevel = self:calculateLevel(self.playerExperience[player.UserId])
    if newLevel > currentLevel then
        self:levelUp(player, newLevel)
    end
    
    -- Fire experience event
    self:fireExperienceEvent(player, finalAmount, source)
    
    print("Added", finalAmount, "experience to", player.Name, "from", source)
    
    return true
end

function ExperienceSystem:levelUp(player, newLevel)
    local oldLevel = self.playerLevels[player.UserId]
    self.playerLevels[player.UserId] = newLevel
    
    -- Apply level bonuses
    self:applyLevelBonuses(player)
    
    -- Unlock new skills
    self:unlockSkills(player, newLevel)
    
    -- Fire level up event
    self:fireLevelUpEvent(player, oldLevel, newLevel)
    
    print(player.Name, "leveled up from", oldLevel, "to", newLevel)
end

function ExperienceSystem:calculateLevel(experience)
    local level = 1
    local expRequired = BASE_EXPERIENCE_REQUIRED
    
    while experience >= expRequired and level < MAX_LEVEL do
        experience = experience - expRequired
        level = level + 1
        expRequired = expRequired * EXPERIENCE_MULTIPLIER
    end
    
    return level
end

function ExperienceSystem:getExperienceRequired(level)
    if level <= 1 then
        return 0
    end
    
    local totalExp = 0
    local expRequired = BASE_EXPERIENCE_REQUIRED
    
    for i = 2, level do
        totalExp = totalExp + expRequired
        expRequired = expRequired * EXPERIENCE_MULTIPLIER
    end
    
    return totalExp
end

function ExperienceSystem:getExperienceToNextLevel(player)
    local currentLevel = self.playerLevels[player.UserId]
    local currentExp = self.playerExperience[player.UserId]
    
    if not currentLevel or not currentExp then
        return 0
    end
    
    local expForCurrentLevel = self:getExperienceRequired(currentLevel)
    local expForNextLevel = self:getExperienceRequired(currentLevel + 1)
    
    return expForNextLevel - currentExp
end

function ExperienceSystem:applyLevelBonuses(player)
    local level = self.playerLevels[player.UserId]
    local stats = self.playerStats[player.UserId]
    
    if not level or not stats then
        return
    end
    
    -- Calculate stat bonuses
    local healthBonus = level * 10
    local damageBonus = level * 5
    local speedBonus = level * 0.5
    local defenseBonus = level * 3
    
    -- Apply bonuses
    stats.health = stats.baseHealth + healthBonus
    stats.damage = stats.baseDamage + damageBonus
    stats.speed = stats.baseSpeed + speedBonus
    stats.defense = stats.baseDefense + defenseBonus
    
    -- Update player's actual stats
    self:updatePlayerStats(player)
end

function ExperienceSystem:unlockSkills(player, level)
    local skills = self.playerSkills[player.UserId]
    
    if not skills then
        return
    end
    
    -- Define skill unlocks by level
    local skillUnlocks = {
        [5] = "DoubleJump",
        [10] = "Dash",
        [15] = "Shield",
        [20] = "Fireball",
        [25] = "Heal",
        [30] = "Teleport",
        [35] = "Invisibility",
        [40] = "Lightning",
        [45] = "IceWall",
        [50] = "Summon"
    }
    
    for unlockLevel, skillName in pairs(skillUnlocks) do
        if level >= unlockLevel and not skills[skillName] then
            skills[skillName] = {
                unlocked = true,
                level = unlockLevel,
                unlockedAt = tick()
            }
            
            print("Unlocked skill", skillName, "for", player.Name, "at level", level)
        end
    end
end

function ExperienceSystem:updatePlayerStats(player)
    local stats = self.playerStats[player.UserId]
    
    if not stats then
        return
    end
    
    -- Update humanoid stats
    local character = player.Character
    if character then
        local humanoid = character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid.MaxHealth = stats.health
            humanoid.WalkSpeed = stats.speed
        end
    end
    
    -- Fire stats update event
    self:fireStatsUpdateEvent(player, stats)
end

function ExperienceSystem:getDefaultStats()
    return {
        baseHealth = 100,
        baseDamage = 10,
        baseSpeed = 16,
        baseDefense = 0,
        health = 100,
        damage = 10,
        speed = 16,
        defense = 0
    }
end

function ExperienceSystem:savePlayerData(player)
    local data = {
        experience = self.playerExperience[player.UserId],
        level = self.playerLevels[player.UserId],
        stats = self.playerStats[player.UserId],
        skills = self.playerSkills[player.UserId]
    }
    
    local success = pcall(function()
        self.dataStore:SetAsync(player.UserId, data)
    end)
    
    if success then
        print("Saved experience data for", player.Name)
    else
        warn("Failed to save experience data for", player.Name)
    end
end

function ExperienceSystem:fireExperienceEvent(player, amount, source)
    local remoteEvent = ReplicatedStorage:FindFirstChild("ExperienceEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "ExperienceEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "ExperienceGained",
        amount = amount,
        source = source,
        totalExperience = self.playerExperience[player.UserId],
        level = self.playerLevels[player.UserId],
        timestamp = tick()
    })
end

function ExperienceSystem:fireLevelUpEvent(player, oldLevel, newLevel)
    local remoteEvent = ReplicatedStorage:FindFirstChild("ExperienceEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "ExperienceEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "LevelUp",
        oldLevel = oldLevel,
        newLevel = newLevel,
        totalExperience = self.playerExperience[player.UserId],
        timestamp = tick()
    })
end

function ExperienceSystem:fireStatsUpdateEvent(player, stats)
    local remoteEvent = ReplicatedStorage:FindFirstChild("ExperienceEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "ExperienceEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "StatsUpdate",
        stats = stats,
        timestamp = tick()
    })
end

-- Example usage
local experienceSystem = ExperienceSystem.new()

-- Test experience system
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    -- Add experience from different sources
    experienceSystem:addExperience(player, 50, EXPERIENCE_SOURCES.KILL)
    experienceSystem:addExperience(player, 100, EXPERIENCE_SOURCES.QUEST)
    experienceSystem:addExperience(player, 25, EXPERIENCE_SOURCES.EXPLORATION)
    experienceSystem:addExperience(player, 75, EXPERIENCE_SOURCES.CRAFTING)
    
    print("Applied experience system tests to", player.Name)
end)`,
        color: 'green'
      },
      {
        title: 'Inventory & Item Systems',
        content: `Create comprehensive inventory and item management systems for player equipment and collectibles.

**Inventory System Features:**
- **Item Storage**: Organized item containers
- **Item Categories**: Weapons, armor, consumables, materials
- **Item Rarity**: Common, uncommon, rare, epic, legendary
- **Item Stacking**: Stackable items with quantity limits
- **Item Sorting**: Automatic and manual organization
- **Item Filtering**: Search and filter capabilities

**Item System Components:**
- **Item Properties**: Stats, effects, descriptions
- **Item Durability**: Wear and tear mechanics
- **Item Enchantments**: Magical enhancements
- **Item Sets**: Bonus effects for matching items
- **Item Trading**: Player-to-player item exchange
- **Item Crafting**: Creation and modification systems

**Advanced Inventory Features:**
- **Bank Storage**: Extended storage systems
- **Item Locking**: Prevent accidental deletion
- **Item Favoriting**: Quick access to important items
- **Item History**: Track item acquisition and usage
- **Item Comparison**: Compare item stats and effects`,
        codeExample: `-- Comprehensive inventory and item system

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local DataStoreService = game:GetService("DataStoreService")

local InventorySystem = {}
InventorySystem.__index = InventorySystem

-- Inventory configuration
local MAX_INVENTORY_SLOTS = 50
local MAX_BANK_SLOTS = 100
local MAX_STACK_SIZE = 99

-- Item rarities
local ITEM_RARITIES = {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    EPIC = "Epic",
    LEGENDARY = "Legendary"
}

-- Item categories
local ITEM_CATEGORIES = {
    WEAPON = "Weapon",
    ARMOR = "Armor",
    CONSUMABLE = "Consumable",
    MATERIAL = "Material",
    TOOL = "Tool",
    MISC = "Misc"
}

-- Item rarity colors
local RARITY_COLORS = {
    [ITEM_RARITIES.COMMON] = Color3.fromRGB(255, 255, 255),
    [ITEM_RARITIES.UNCOMMON] = Color3.fromRGB(0, 255, 0),
    [ITEM_RARITIES.RARE] = Color3.fromRGB(0, 0, 255),
    [ITEM_RARITIES.EPIC] = Color3.fromRGB(128, 0, 128),
    [ITEM_RARITIES.LEGENDARY] = Color3.fromRGB(255, 165, 0)
}

function InventorySystem.new()
    local self = setmetatable({}, InventorySystem)
    
    -- Player inventory data
    self.playerInventories = {}
    self.playerBanks = {}
    self.playerEquipment = {}
    
    -- Data store
    self.dataStore = DataStoreService:GetDataStore("PlayerInventory_v1")
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function InventorySystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:savePlayerData(player)
        self:cleanupPlayer(player)
    end)
end

function InventorySystem:initializePlayer(player)
    -- Load player data
    local success, data = pcall(function()
        return self.dataStore:GetAsync(player.UserId)
    end)
    
    if success and data then
        self.playerInventories[player.UserId] = data.inventory or {}
        self.playerBanks[player.UserId] = data.bank or {}
        self.playerEquipment[player.UserId] = data.equipment or {}
    else
        self.playerInventories[player.UserId] = {}
        self.playerBanks[player.UserId] = {}
        self.playerEquipment[player.UserId] = {}
    end
    
    print("Initialized inventory system for", player.Name)
end

function InventorySystem:cleanupPlayer(player)
    self.playerInventories[player.UserId] = nil
    self.playerBanks[player.UserId] = nil
    self.playerEquipment[player.UserId] = nil
end

function InventorySystem:addItem(player, itemId, quantity, source)
    local inventory = self.playerInventories[player.UserId]
    
    if not inventory then
        return false
    end
    
    -- Get item data
    local itemData = self:getItemData(itemId)
    if not itemData then
        return false
    end
    
    -- Check if item is stackable
    if itemData.stackable then
        -- Find existing stack
        for slot, item in pairs(inventory) do
            if item.id == itemId and item.quantity < MAX_STACK_SIZE then
                local addAmount = math.min(quantity, MAX_STACK_SIZE - item.quantity)
                item.quantity = item.quantity + addAmount
                quantity = quantity - addAmount
                
                if quantity <= 0 then
                    break
                end
            end
        end
    end
    
    -- Add remaining items to new slots
    while quantity > 0 do
        local emptySlot = self:findEmptySlot(inventory)
        if not emptySlot then
            -- Inventory full
            break
        end
        
        local addAmount = math.min(quantity, itemData.stackable and MAX_STACK_SIZE or 1)
        inventory[emptySlot] = {
            id = itemId,
            quantity = addAmount,
            acquiredAt = tick(),
            source = source or "Unknown"
        }
        
        quantity = quantity - addAmount
    end
    
    -- Fire item added event
    self:fireItemEvent(player, "ItemAdded", itemId, quantity, source)
    
    print("Added", quantity, "of", itemId, "to", player.Name, "inventory")
    
    return true
end

function InventorySystem:removeItem(player, itemId, quantity)
    local inventory = self.playerInventories[player.UserId]
    
    if not inventory then
        return false
    end
    
    local removedAmount = 0
    
    -- Remove items from inventory
    for slot, item in pairs(inventory) do
        if item.id == itemId and removedAmount < quantity then
            local removeAmount = math.min(quantity - removedAmount, item.quantity)
            item.quantity = item.quantity - removeAmount
            removedAmount = removedAmount + removeAmount
            
            if item.quantity <= 0 then
                inventory[slot] = nil
            end
        end
    end
    
    -- Fire item removed event
    self:fireItemEvent(player, "ItemRemoved", itemId, removedAmount)
    
    print("Removed", removedAmount, "of", itemId, "from", player.Name, "inventory")
    
    return removedAmount > 0
end

function InventorySystem:equipItem(player, itemId, slot)
    local inventory = self.playerInventories[player.UserId]
    local equipment = self.playerEquipment[player.UserId]
    
    if not inventory or not equipment then
        return false
    end
    
    -- Find item in inventory
    local item = self:findItemInInventory(inventory, itemId)
    if not item then
        return false
    end
    
    -- Get item data
    local itemData = self:getItemData(itemId)
    if not itemData or not itemData.equippable then
        return false
    end
    
    -- Check if slot is valid for this item
    if not self:isValidEquipmentSlot(itemData.category, slot) then
        return false
    end
    
    -- Unequip current item in slot
    if equipment[slot] then
        self:unequipItem(player, slot)
    end
    
    -- Equip new item
    equipment[slot] = {
        id = itemId,
        equippedAt = tick()
    }
    
    -- Remove item from inventory
    self:removeItem(player, itemId, 1)
    
    -- Apply item effects
    self:applyItemEffects(player, itemData)
    
    -- Fire item equipped event
    self:fireItemEvent(player, "ItemEquipped", itemId, slot)
    
    print("Equipped", itemId, "to", slot, "for", player.Name)
    
    return true
end

function InventorySystem:unequipItem(player, slot)
    local inventory = self.playerInventories[player.UserId]
    local equipment = self.playerEquipment[player.UserId]
    
    if not inventory or not equipment then
        return false
    end
    
    local equippedItem = equipment[slot]
    if not equippedItem then
        return false
    end
    
    -- Get item data
    local itemData = self:getItemData(equippedItem.id)
    if itemData then
        -- Remove item effects
        self:removeItemEffects(player, itemData)
    end
    
    -- Add item back to inventory
    self:addItem(player, equippedItem.id, 1, "Unequipped")
    
    -- Remove from equipment
    equipment[slot] = nil
    
    -- Fire item unequipped event
    self:fireItemEvent(player, "ItemUnequipped", equippedItem.id, slot)
    
    print("Unequipped", equippedItem.id, "from", slot, "for", player.Name)
    
    return true
end

function InventorySystem:findEmptySlot(inventory)
    for i = 1, MAX_INVENTORY_SLOTS do
        if not inventory[i] then
            return i
        end
    end
    return nil
end

function InventorySystem:findItemInInventory(inventory, itemId)
    for slot, item in pairs(inventory) do
        if item.id == itemId then
            return item
        end
    end
    return nil
end

function InventorySystem:isValidEquipmentSlot(category, slot)
    local validSlots = {
        [ITEM_CATEGORIES.WEAPON] = {"MainHand", "OffHand"},
        [ITEM_CATEGORIES.ARMOR] = {"Helmet", "Chestplate", "Leggings", "Boots"},
        [ITEM_CATEGORIES.TOOL] = {"Tool"}
    }
    
    return validSlots[category] and table.find(validSlots[category], slot) ~= nil
end

function InventorySystem:applyItemEffects(player, itemData)
    if not itemData.effects then
        return
    end
    
    -- Apply stat bonuses
    if itemData.effects.stats then
        for stat, bonus in pairs(itemData.effects.stats) do
            -- Apply stat bonus to player
            print("Applied", stat, "bonus of", bonus, "to", player.Name)
        end
    end
    
    -- Apply special effects
    if itemData.effects.special then
        for effect, data in pairs(itemData.effects.special) do
            -- Apply special effect
            print("Applied special effect", effect, "to", player.Name)
        end
    end
end

function InventorySystem:removeItemEffects(player, itemData)
    if not itemData.effects then
        return
    end
    
    -- Remove stat bonuses
    if itemData.effects.stats then
        for stat, bonus in pairs(itemData.effects.stats) do
            -- Remove stat bonus from player
            print("Removed", stat, "bonus of", bonus, "from", player.Name)
        end
    end
    
    -- Remove special effects
    if itemData.effects.special then
        for effect, data in pairs(itemData.effects.special) do
            -- Remove special effect
            print("Removed special effect", effect, "from", player.Name)
        end
    end
end

function InventorySystem:getItemData(itemId)
    -- This would typically load from a database or configuration file
    -- For now, return mock data
    local itemDatabase = {
        ["sword_iron"] = {
            id = "sword_iron",
            name = "Iron Sword",
            description = "A sturdy iron sword",
            category = ITEM_CATEGORIES.WEAPON,
            rarity = ITEM_RARITIES.COMMON,
            stackable = false,
            equippable = true,
            effects = {
                stats = {
                    damage = 15,
                    speed = -1
                }
            }
        },
        ["potion_health"] = {
            id = "potion_health",
            name = "Health Potion",
            description = "Restores 50 health",
            category = ITEM_CATEGORIES.CONSUMABLE,
            rarity = ITEM_RARITIES.COMMON,
            stackable = true,
            equippable = false,
            effects = {
                special = {
                    heal = 50
                }
            }
        },
        ["armor_leather"] = {
            id = "armor_leather",
            name = "Leather Armor",
            description = "Basic leather protection",
            category = ITEM_CATEGORIES.ARMOR,
            rarity = ITEM_RARITIES.COMMON,
            stackable = false,
            equippable = true,
            effects = {
                stats = {
                    defense = 5
                }
            }
        }
    }
    
    return itemDatabase[itemId]
end

function InventorySystem:savePlayerData(player)
    local data = {
        inventory = self.playerInventories[player.UserId],
        bank = self.playerBanks[player.UserId],
        equipment = self.playerEquipment[player.UserId]
    }
    
    local success = pcall(function()
        self.dataStore:SetAsync(player.UserId, data)
    end)
    
    if success then
        print("Saved inventory data for", player.Name)
    else
        warn("Failed to save inventory data for", player.Name)
    end
end

function InventorySystem:fireItemEvent(player, event, itemId, data)
    local remoteEvent = ReplicatedStorage:FindFirstChild("InventoryEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "InventoryEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = event,
        itemId = itemId,
        data = data,
        timestamp = tick()
    })
end

-- Example usage
local inventorySystem = InventorySystem.new()

-- Test inventory system
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    -- Add some items
    inventorySystem:addItem(player, "sword_iron", 1, "Starting Equipment")
    inventorySystem:addItem(player, "potion_health", 5, "Starting Equipment")
    inventorySystem:addItem(player, "armor_leather", 1, "Starting Equipment")
    
    -- Equip items
    inventorySystem:equipItem(player, "sword_iron", "MainHand")
    inventorySystem:equipItem(player, "armor_leather", "Chestplate")
    
    print("Applied inventory system tests to", player.Name)
end)`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Health & Damage Systems - Comprehensive Learning Example
-- Master health management, damage calculation, and combat mechanics

print("=== HEALTH & DAMAGE SYSTEMS DEMO ===")
print("Learning health management and combat mechanics...")

-- 1. HEALTH SYSTEM FUNDAMENTALS
print("\\n1. DEMONSTRATING HEALTH SYSTEM FUNDAMENTALS...")

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local HealthSystem = {}
HealthSystem.__index = HealthSystem

-- Health configuration
local DEFAULT_MAX_HEALTH = 100
local HEALTH_REGEN_RATE = 1 -- health per second
local HEALTH_REGEN_DELAY = 5 -- seconds after damage before regen starts
local SHIELD_DURATION = 10 -- seconds

-- Damage types
local DAMAGE_TYPES = {
    PHYSICAL = "Physical",
    MAGICAL = "Magical",
    FIRE = "Fire",
    ICE = "Ice",
    POISON = "Poison",
    ENVIRONMENTAL = "Environmental"
}

function HealthSystem.new()
    local self = setmetatable({}, HealthSystem)
    
    -- Player health data
    self.playerHealth = {}
    self.playerShields = {}
    self.playerArmor = {}
    self.playerStatusEffects = {}
    
    -- Health events
    self.healthEvents = {}
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function HealthSystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function HealthSystem:initializePlayer(player)
    local character = player.CharacterAdded:Wait()
    local humanoid = character:WaitForChild("Humanoid")
    
    -- Initialize health data
    self.playerHealth[player.UserId] = {
        maxHealth = DEFAULT_MAX_HEALTH,
        currentHealth = DEFAULT_MAX_HEALTH,
        lastDamageTime = 0,
        isDead = false,
        respawnTime = 0
    }
    
    -- Initialize shield data
    self.playerShields[player.UserId] = {
        currentShield = 0,
        maxShield = 0,
        shieldEndTime = 0
    }
    
    -- Initialize armor data
    self.playerArmor[player.UserId] = {
        physicalResistance = 0,
        magicalResistance = 0,
        fireResistance = 0,
        iceResistance = 0,
        poisonResistance = 0
    }
    
    -- Initialize status effects
    self.playerStatusEffects[player.UserId] = {}
    
    -- Set humanoid health
    humanoid.MaxHealth = DEFAULT_MAX_HEALTH
    humanoid.Health = DEFAULT_MAX_HEALTH
    
    -- Connect humanoid events
    humanoid.Died:Connect(function()
        self:onPlayerDied(player)
    end)
    
    humanoid.HealthChanged:Connect(function(health)
        self:onHealthChanged(player, health)
    end)
    
    -- Start health regeneration
    self:startHealthRegeneration(player)
    
    print("Initialized health system for", player.Name)
end

function HealthSystem:cleanupPlayer(player)
    self.playerHealth[player.UserId] = nil
    self.playerShields[player.UserId] = nil
    self.playerArmor[player.UserId] = nil
    self.playerStatusEffects[player.UserId] = nil
end

function HealthSystem:dealDamage(player, damage, damageType, source)
    local healthData = self.playerHealth[player.UserId]
    local shieldData = self.playerShields[player.UserId]
    local armorData = self.playerArmor[player.UserId]
    
    if not healthData or healthData.isDead then
        return false
    end
    
    -- Calculate damage resistance
    local resistance = self:getDamageResistance(player, damageType)
    local finalDamage = damage * (1 - resistance)
    
    -- Apply shield first
    if shieldData.currentShield > 0 then
        local shieldDamage = math.min(finalDamage, shieldData.currentShield)
        shieldData.currentShield = shieldData.currentShield - shieldDamage
        finalDamage = finalDamage - shieldDamage
        
        print("Shield absorbed", shieldDamage, "damage for", player.Name)
    end
    
    -- Apply remaining damage to health
    if finalDamage > 0 then
        healthData.currentHealth = math.max(0, healthData.currentHealth - finalDamage)
        healthData.lastDamageTime = tick()
        
        -- Update humanoid health
        local character = player.Character
        if character then
            local humanoid = character:FindFirstChild("Humanoid")
            if humanoid then
                humanoid.Health = healthData.currentHealth
            end
        end
        
        -- Fire damage event
        self:fireDamageEvent(player, finalDamage, damageType, source)
        
        print("Dealt", finalDamage, damageType, "damage to", player.Name)
    end
    
    return true
end

function HealthSystem:healPlayer(player, healAmount, source)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData or healthData.isDead then
        return false
    end
    
    local oldHealth = healthData.currentHealth
    healthData.currentHealth = math.min(healthData.maxHealth, healthData.currentHealth + healAmount)
    
    -- Update humanoid health
    local character = player.Character
    if character then
        local humanoid = character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid.Health = healthData.currentHealth
        end
    end
    
    -- Fire heal event
    self:fireHealEvent(player, healAmount, source)
    
    print("Healed", player.Name, "for", healAmount, "health")
    
    return true
end

function HealthSystem:setMaxHealth(player, newMaxHealth)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData then
        return false
    end
    
    local oldMaxHealth = healthData.maxHealth
    healthData.maxHealth = newMaxHealth
    
    -- Adjust current health proportionally
    local healthRatio = healthData.currentHealth / oldMaxHealth
    healthData.currentHealth = newMaxHealth * healthRatio
    
    -- Update humanoid
    local character = player.Character
    if character then
        local humanoid = character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid.MaxHealth = newMaxHealth
            humanoid.Health = healthData.currentHealth
        end
    end
    
    print("Set max health for", player.Name, "to", newMaxHealth)
    
    return true
end

function HealthSystem:addShield(player, shieldAmount, duration)
    local shieldData = self.playerShields[player.UserId]
    
    if not shieldData then
        return false
    end
    
    shieldData.currentShield = shieldData.currentShield + shieldAmount
    shieldData.maxShield = math.max(shieldData.maxShield, shieldData.currentShield)
    shieldData.shieldEndTime = tick() + duration
    
    -- Start shield countdown
    self:startShieldCountdown(player)
    
    print("Added", shieldAmount, "shield to", player.Name, "for", duration, "seconds")
    
    return true
end

function HealthSystem:setArmor(player, armorType, resistance)
    local armorData = self.playerArmor[player.UserId]
    
    if not armorData then
        return false
    end
    
    if armorType == "physical" then
        armorData.physicalResistance = resistance
    elseif armorType == "magical" then
        armorData.magicalResistance = resistance
    elseif armorType == "fire" then
        armorData.fireResistance = resistance
    elseif armorType == "ice" then
        armorData.iceResistance = resistance
    elseif armorType == "poison" then
        armorData.poisonResistance = resistance
    end
    
    print("Set", armorType, "resistance for", player.Name, "to", resistance)
    
    return true
end

function HealthSystem:addStatusEffect(player, effectName, duration, effectData)
    local statusEffects = self.playerStatusEffects[player.UserId]
    
    if not statusEffects then
        return false
    end
    
    statusEffects[effectName] = {
        startTime = tick(),
        duration = duration,
        data = effectData or {}
    }
    
    -- Start status effect
    self:startStatusEffect(player, effectName)
    
    print("Added status effect", effectName, "to", player.Name, "for", duration, "seconds")
    
    return true
end

function HealthSystem:removeStatusEffect(player, effectName)
    local statusEffects = self.playerStatusEffects[player.UserId]
    
    if not statusEffects or not statusEffects[effectName] then
        return false
    end
    
    statusEffects[effectName] = nil
    
    print("Removed status effect", effectName, "from", player.Name)
    
    return true
end

function HealthSystem:getDamageResistance(player, damageType)
    local armorData = self.playerArmor[player.UserId]
    
    if not armorData then
        return 0
    end
    
    if damageType == DAMAGE_TYPES.PHYSICAL then
        return armorData.physicalResistance
    elseif damageType == DAMAGE_TYPES.MAGICAL then
        return armorData.magicalResistance
    elseif damageType == DAMAGE_TYPES.FIRE then
        return armorData.fireResistance
    elseif damageType == DAMAGE_TYPES.ICE then
        return armorData.iceResistance
    elseif damageType == DAMAGE_TYPES.POISON then
        return armorData.poisonResistance
    end
    
    return 0
end

function HealthSystem:startHealthRegeneration(player)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData then
        return
    end
    
    local connection = RunService.Heartbeat:Connect(function()
        if healthData.isDead then
            connection:Disconnect()
            return
        end
        
        -- Check if enough time has passed since last damage
        if tick() - healthData.lastDamageTime >= HEALTH_REGEN_DELAY then
            if healthData.currentHealth < healthData.maxHealth then
                local regenAmount = HEALTH_REGEN_RATE * (1/60) -- Per frame
                healthData.currentHealth = math.min(healthData.maxHealth, healthData.currentHealth + regenAmount)
                
                -- Update humanoid health
                local character = player.Character
                if character then
                    local humanoid = character:FindFirstChild("Humanoid")
                    if humanoid then
                        humanoid.Health = healthData.currentHealth
                    end
                end
            end
        end
    end)
end

function HealthSystem:startShieldCountdown(player)
    local shieldData = self.playerShields[player.UserId]
    
    if not shieldData then
        return
    end
    
    local connection = RunService.Heartbeat:Connect(function()
        if tick() >= shieldData.shieldEndTime then
            shieldData.currentShield = 0
            connection:Disconnect()
            print("Shield expired for", player.Name)
        end
    end)
end

function HealthSystem:startStatusEffect(player, effectName)
    local statusEffects = self.playerStatusEffects[player.UserId]
    local effect = statusEffects[effectName]
    
    if not effect then
        return
    end
    
    local connection = RunService.Heartbeat:Connect(function()
        if tick() >= effect.startTime + effect.duration then
            self:removeStatusEffect(player, effectName)
            connection:Disconnect()
            return
        end
        
        -- Apply status effect
        if effectName == "poison" then
            self:dealDamage(player, effect.data.damage or 1, DAMAGE_TYPES.POISON, "Poison")
        elseif effectName == "regeneration" then
            self:healPlayer(player, effect.data.healAmount or 1, "Regeneration")
        end
    end)
end

function HealthSystem:onPlayerDied(player)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData then
        return
    end
    
    healthData.isDead = true
    healthData.respawnTime = tick() + 5 -- 5 second respawn delay
    
    -- Fire death event
    self:fireDeathEvent(player)
    
    print(player.Name, "died")
end

function HealthSystem:onHealthChanged(player, health)
    local healthData = self.playerHealth[player.UserId]
    
    if not healthData then
        return
    end
    
    healthData.currentHealth = health
    
    -- Fire health changed event
    self:fireHealthChangedEvent(player, health)
end

function HealthSystem:fireDamageEvent(player, damage, damageType, source)
    local remoteEvent = ReplicatedStorage:FindFirstChild("HealthEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "HealthEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "Damage",
        damage = damage,
        damageType = damageType,
        source = source,
        timestamp = tick()
    })
end

function HealthSystem:fireHealEvent(player, healAmount, source)
    local remoteEvent = ReplicatedStorage:FindFirstChild("HealthEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "HealthEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "Heal",
        healAmount = healAmount,
        source = source,
        timestamp = tick()
    })
end

function HealthSystem:fireDeathEvent(player)
    local remoteEvent = ReplicatedStorage:FindFirstChild("HealthEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "HealthEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "Death",
        timestamp = tick()
    })
end

function HealthSystem:fireHealthChangedEvent(player, health)
    local remoteEvent = ReplicatedStorage:FindFirstChild("HealthEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "HealthEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "HealthChanged",
        health = health,
        timestamp = tick()
    })
end

-- 2. EXPERIENCE & LEVELING SYSTEM
print("\\n2. DEMONSTRATING EXPERIENCE & LEVELING SYSTEM...")

local ExperienceSystem = {}
ExperienceSystem.__index = ExperienceSystem

-- Experience configuration
local BASE_EXPERIENCE_REQUIRED = 100
local EXPERIENCE_MULTIPLIER = 1.5
local MAX_LEVEL = 100
local PRESTIGE_LEVELS = 10

-- Experience sources
local EXPERIENCE_SOURCES = {
    KILL = "Kill",
    QUEST = "Quest",
    EXPLORATION = "Exploration",
    CRAFTING = "Crafting",
    SOCIAL = "Social",
    ACHIEVEMENT = "Achievement"
}

-- Experience multipliers
local EXPERIENCE_MULTIPLIERS = {
    [EXPERIENCE_SOURCES.KILL] = 1.0,
    [EXPERIENCE_SOURCES.QUEST] = 1.5,
    [EXPERIENCE_SOURCES.EXPLORATION] = 0.8,
    [EXPERIENCE_SOURCES.CRAFTING] = 1.2,
    [EXPERIENCE_SOURCES.SOCIAL] = 0.5,
    [EXPERIENCE_SOURCES.ACHIEVEMENT] = 2.0
}

function ExperienceSystem.new()
    local self = setmetatable({}, ExperienceSystem)
    
    -- Player experience data
    self.playerExperience = {}
    self.playerLevels = {}
    self.playerStats = {}
    self.playerSkills = {}
    
    -- Data store
    self.dataStore = DataStoreService:GetDataStore("PlayerExperience_v1")
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function ExperienceSystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:savePlayerData(player)
        self:cleanupPlayer(player)
    end)
end

function ExperienceSystem:initializePlayer(player)
    -- Load player data
    local success, data = pcall(function()
        return self.dataStore:GetAsync(player.UserId)
    end)
    
    if success and data then
        self.playerExperience[player.UserId] = data.experience or 0
        self.playerLevels[player.UserId] = data.level or 1
        self.playerStats[player.UserId] = data.stats or self:getDefaultStats()
        self.playerSkills[player.UserId] = data.skills or {}
    else
        self.playerExperience[player.UserId] = 0
        self.playerLevels[player.UserId] = 1
        self.playerStats[player.UserId] = self:getDefaultStats()
        self.playerSkills[player.UserId] = {}
    end
    
    -- Apply level bonuses
    self:applyLevelBonuses(player)
    
    print("Initialized experience system for", player.Name, "Level:", self.playerLevels[player.UserId])
end

function ExperienceSystem:cleanupPlayer(player)
    self.playerExperience[player.UserId] = nil
    self.playerLevels[player.UserId] = nil
    self.playerStats[player.UserId] = nil
    self.playerSkills[player.UserId] = nil
end

function ExperienceSystem:addExperience(player, amount, source)
    local currentExp = self.playerExperience[player.UserId]
    local currentLevel = self.playerLevels[player.UserId]
    
    if not currentExp or not currentLevel then
        return false
    end
    
    -- Apply experience multiplier
    local multiplier = EXPERIENCE_MULTIPLIERS[source] or 1.0
    local finalAmount = amount * multiplier
    
    -- Add experience
    self.playerExperience[player.UserId] = currentExp + finalAmount
    
    -- Check for level up
    local newLevel = self:calculateLevel(self.playerExperience[player.UserId])
    if newLevel > currentLevel then
        self:levelUp(player, newLevel)
    end
    
    -- Fire experience event
    self:fireExperienceEvent(player, finalAmount, source)
    
    print("Added", finalAmount, "experience to", player.Name, "from", source)
    
    return true
end

function ExperienceSystem:levelUp(player, newLevel)
    local oldLevel = self.playerLevels[player.UserId]
    self.playerLevels[player.UserId] = newLevel
    
    -- Apply level bonuses
    self:applyLevelBonuses(player)
    
    -- Unlock new skills
    self:unlockSkills(player, newLevel)
    
    -- Fire level up event
    self:fireLevelUpEvent(player, oldLevel, newLevel)
    
    print(player.Name, "leveled up from", oldLevel, "to", newLevel)
end

function ExperienceSystem:calculateLevel(experience)
    local level = 1
    local expRequired = BASE_EXPERIENCE_REQUIRED
    
    while experience >= expRequired and level < MAX_LEVEL do
        experience = experience - expRequired
        level = level + 1
        expRequired = expRequired * EXPERIENCE_MULTIPLIER
    end
    
    return level
end

function ExperienceSystem:getExperienceRequired(level)
    if level <= 1 then
        return 0
    end
    
    local totalExp = 0
    local expRequired = BASE_EXPERIENCE_REQUIRED
    
    for i = 2, level do
        totalExp = totalExp + expRequired
        expRequired = expRequired * EXPERIENCE_MULTIPLIER
    end
    
    return totalExp
end

function ExperienceSystem:getExperienceToNextLevel(player)
    local currentLevel = self.playerLevels[player.UserId]
    local currentExp = self.playerExperience[player.UserId]
    
    if not currentLevel or not currentExp then
        return 0
    end
    
    local expForCurrentLevel = self:getExperienceRequired(currentLevel)
    local expForNextLevel = self:getExperienceRequired(currentLevel + 1)
    
    return expForNextLevel - currentExp
end

function ExperienceSystem:applyLevelBonuses(player)
    local level = self.playerLevels[player.UserId]
    local stats = self.playerStats[player.UserId]
    
    if not level or not stats then
        return
    end
    
    -- Calculate stat bonuses
    local healthBonus = level * 10
    local damageBonus = level * 5
    local speedBonus = level * 0.5
    local defenseBonus = level * 3
    
    -- Apply bonuses
    stats.health = stats.baseHealth + healthBonus
    stats.damage = stats.baseDamage + damageBonus
    stats.speed = stats.baseSpeed + speedBonus
    stats.defense = stats.baseDefense + defenseBonus
    
    -- Update player's actual stats
    self:updatePlayerStats(player)
end

function ExperienceSystem:unlockSkills(player, level)
    local skills = self.playerSkills[player.UserId]
    
    if not skills then
        return
    end
    
    -- Define skill unlocks by level
    local skillUnlocks = {
        [5] = "DoubleJump",
        [10] = "Dash",
        [15] = "Shield",
        [20] = "Fireball",
        [25] = "Heal",
        [30] = "Teleport",
        [35] = "Invisibility",
        [40] = "Lightning",
        [45] = "IceWall",
        [50] = "Summon"
    }
    
    for unlockLevel, skillName in pairs(skillUnlocks) do
        if level >= unlockLevel and not skills[skillName] then
            skills[skillName] = {
                unlocked = true,
                level = unlockLevel,
                unlockedAt = tick()
            }
            
            print("Unlocked skill", skillName, "for", player.Name, "at level", level)
        end
    end
end

function ExperienceSystem:updatePlayerStats(player)
    local stats = self.playerStats[player.UserId]
    
    if not stats then
        return
    end
    
    -- Update humanoid stats
    local character = player.Character
    if character then
        local humanoid = character:FindFirstChild("Humanoid")
        if humanoid then
            humanoid.MaxHealth = stats.health
            humanoid.WalkSpeed = stats.speed
        end
    end
    
    -- Fire stats update event
    self:fireStatsUpdateEvent(player, stats)
end

function ExperienceSystem:getDefaultStats()
    return {
        baseHealth = 100,
        baseDamage = 10,
        baseSpeed = 16,
        baseDefense = 0,
        health = 100,
        damage = 10,
        speed = 16,
        defense = 0
    }
end

function ExperienceSystem:savePlayerData(player)
    local data = {
        experience = self.playerExperience[player.UserId],
        level = self.playerLevels[player.UserId],
        stats = self.playerStats[player.UserId],
        skills = self.playerSkills[player.UserId]
    }
    
    local success = pcall(function()
        self.dataStore:SetAsync(player.UserId, data)
    end)
    
    if success then
        print("Saved experience data for", player.Name)
    else
        warn("Failed to save experience data for", player.Name)
    end
end

function ExperienceSystem:fireExperienceEvent(player, amount, source)
    local remoteEvent = ReplicatedStorage:FindFirstChild("ExperienceEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "ExperienceEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "ExperienceGained",
        amount = amount,
        source = source,
        totalExperience = self.playerExperience[player.UserId],
        level = self.playerLevels[player.UserId],
        timestamp = tick()
    })
end

function ExperienceSystem:fireLevelUpEvent(player, oldLevel, newLevel)
    local remoteEvent = ReplicatedStorage:FindFirstChild("ExperienceEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "ExperienceEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "LevelUp",
        oldLevel = oldLevel,
        newLevel = newLevel,
        totalExperience = self.playerExperience[player.UserId],
        timestamp = tick()
    })
end

function ExperienceSystem:fireStatsUpdateEvent(player, stats)
    local remoteEvent = ReplicatedStorage:FindFirstChild("ExperienceEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "ExperienceEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "StatsUpdate",
        stats = stats,
        timestamp = tick()
    })
end

-- 3. INVENTORY & ITEM SYSTEM
print("\\n3. DEMONSTRATING INVENTORY & ITEM SYSTEM...")

local InventorySystem = {}
InventorySystem.__index = InventorySystem

-- Inventory configuration
local MAX_INVENTORY_SLOTS = 50
local MAX_BANK_SLOTS = 100
local MAX_STACK_SIZE = 99

-- Item rarities
local ITEM_RARITIES = {
    COMMON = "Common",
    UNCOMMON = "Uncommon",
    RARE = "Rare",
    EPIC = "Epic",
    LEGENDARY = "Legendary"
}

-- Item categories
local ITEM_CATEGORIES = {
    WEAPON = "Weapon",
    ARMOR = "Armor",
    CONSUMABLE = "Consumable",
    MATERIAL = "Material",
    TOOL = "Tool",
    MISC = "Misc"
}

-- Item rarity colors
local RARITY_COLORS = {
    [ITEM_RARITIES.COMMON] = Color3.fromRGB(255, 255, 255),
    [ITEM_RARITIES.UNCOMMON] = Color3.fromRGB(0, 255, 0),
    [ITEM_RARITIES.RARE] = Color3.fromRGB(0, 0, 255),
    [ITEM_RARITIES.EPIC] = Color3.fromRGB(128, 0, 128),
    [ITEM_RARITIES.LEGENDARY] = Color3.fromRGB(255, 165, 0)
}

function InventorySystem.new()
    local self = setmetatable({}, InventorySystem)
    
    -- Player inventory data
    self.playerInventories = {}
    self.playerBanks = {}
    self.playerEquipment = {}
    
    -- Data store
    self.dataStore = DataStoreService:GetDataStore("PlayerInventory_v1")
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function InventorySystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:savePlayerData(player)
        self:cleanupPlayer(player)
    end)
end

function InventorySystem:initializePlayer(player)
    -- Load player data
    local success, data = pcall(function()
        return self.dataStore:GetAsync(player.UserId)
    end)
    
    if success and data then
        self.playerInventories[player.UserId] = data.inventory or {}
        self.playerBanks[player.UserId] = data.bank or {}
        self.playerEquipment[player.UserId] = data.equipment or {}
    else
        self.playerInventories[player.UserId] = {}
        self.playerBanks[player.UserId] = {}
        self.playerEquipment[player.UserId] = {}
    end
    
    print("Initialized inventory system for", player.Name)
end

function InventorySystem:cleanupPlayer(player)
    self.playerInventories[player.UserId] = nil
    self.playerBanks[player.UserId] = nil
    self.playerEquipment[player.UserId] = nil
end

function InventorySystem:addItem(player, itemId, quantity, source)
    local inventory = self.playerInventories[player.UserId]
    
    if not inventory then
        return false
    end
    
    -- Get item data
    local itemData = self:getItemData(itemId)
    if not itemData then
        return false
    end
    
    -- Check if item is stackable
    if itemData.stackable then
        -- Find existing stack
        for slot, item in pairs(inventory) do
            if item.id == itemId and item.quantity < MAX_STACK_SIZE then
                local addAmount = math.min(quantity, MAX_STACK_SIZE - item.quantity)
                item.quantity = item.quantity + addAmount
                quantity = quantity - addAmount
                
                if quantity <= 0 then
                    break
                end
            end
        end
    end
    
    -- Add remaining items to new slots
    while quantity > 0 do
        local emptySlot = self:findEmptySlot(inventory)
        if not emptySlot then
            -- Inventory full
            break
        end
        
        local addAmount = math.min(quantity, itemData.stackable and MAX_STACK_SIZE or 1)
        inventory[emptySlot] = {
            id = itemId,
            quantity = addAmount,
            acquiredAt = tick(),
            source = source or "Unknown"
        }
        
        quantity = quantity - addAmount
    end
    
    -- Fire item added event
    self:fireItemEvent(player, "ItemAdded", itemId, quantity, source)
    
    print("Added", quantity, "of", itemId, "to", player.Name, "inventory")
    
    return true
end

function InventorySystem:removeItem(player, itemId, quantity)
    local inventory = self.playerInventories[player.UserId]
    
    if not inventory then
        return false
    end
    
    local removedAmount = 0
    
    -- Remove items from inventory
    for slot, item in pairs(inventory) do
        if item.id == itemId and removedAmount < quantity then
            local removeAmount = math.min(quantity - removedAmount, item.quantity)
            item.quantity = item.quantity - removeAmount
            removedAmount = removedAmount + removeAmount
            
            if item.quantity <= 0 then
                inventory[slot] = nil
            end
        end
    end
    
    -- Fire item removed event
    self:fireItemEvent(player, "ItemRemoved", itemId, removedAmount)
    
    print("Removed", removedAmount, "of", itemId, "from", player.Name, "inventory")
    
    return removedAmount > 0
end

function InventorySystem:equipItem(player, itemId, slot)
    local inventory = self.playerInventories[player.UserId]
    local equipment = self.playerEquipment[player.UserId]
    
    if not inventory or not equipment then
        return false
    end
    
    -- Find item in inventory
    local item = self:findItemInInventory(inventory, itemId)
    if not item then
        return false
    end
    
    -- Get item data
    local itemData = self:getItemData(itemId)
    if not itemData or not itemData.equippable then
        return false
    end
    
    -- Check if slot is valid for this item
    if not self:isValidEquipmentSlot(itemData.category, slot) then
        return false
    end
    
    -- Unequip current item in slot
    if equipment[slot] then
        self:unequipItem(player, slot)
    end
    
    -- Equip new item
    equipment[slot] = {
        id = itemId,
        equippedAt = tick()
    }
    
    -- Remove item from inventory
    self:removeItem(player, itemId, 1)
    
    -- Apply item effects
    self:applyItemEffects(player, itemData)
    
    -- Fire item equipped event
    self:fireItemEvent(player, "ItemEquipped", itemId, slot)
    
    print("Equipped", itemId, "to", slot, "for", player.Name)
    
    return true
end

function InventorySystem:unequipItem(player, slot)
    local inventory = self.playerInventories[player.UserId]
    local equipment = self.playerEquipment[player.UserId]
    
    if not inventory or not equipment then
        return false
    end
    
    local equippedItem = equipment[slot]
    if not equippedItem then
        return false
    end
    
    -- Get item data
    local itemData = self:getItemData(equippedItem.id)
    if itemData then
        -- Remove item effects
        self:removeItemEffects(player, itemData)
    end
    
    -- Add item back to inventory
    self:addItem(player, equippedItem.id, 1, "Unequipped")
    
    -- Remove from equipment
    equipment[slot] = nil
    
    -- Fire item unequipped event
    self:fireItemEvent(player, "ItemUnequipped", equippedItem.id, slot)
    
    print("Unequipped", equippedItem.id, "from", slot, "for", player.Name)
    
    return true
end

function InventorySystem:findEmptySlot(inventory)
    for i = 1, MAX_INVENTORY_SLOTS do
        if not inventory[i] then
            return i
        end
    end
    return nil
end

function InventorySystem:findItemInInventory(inventory, itemId)
    for slot, item in pairs(inventory) do
        if item.id == itemId then
            return item
        end
    end
    return nil
end

function InventorySystem:isValidEquipmentSlot(category, slot)
    local validSlots = {
        [ITEM_CATEGORIES.WEAPON] = {"MainHand", "OffHand"},
        [ITEM_CATEGORIES.ARMOR] = {"Helmet", "Chestplate", "Leggings", "Boots"},
        [ITEM_CATEGORIES.TOOL] = {"Tool"}
    }
    
    return validSlots[category] and table.find(validSlots[category], slot) ~= nil
end

function InventorySystem:applyItemEffects(player, itemData)
    if not itemData.effects then
        return
    end
    
    -- Apply stat bonuses
    if itemData.effects.stats then
        for stat, bonus in pairs(itemData.effects.stats) do
            -- Apply stat bonus to player
            print("Applied", stat, "bonus of", bonus, "to", player.Name)
        end
    end
    
    -- Apply special effects
    if itemData.effects.special then
        for effect, data in pairs(itemData.effects.special) do
            -- Apply special effect
            print("Applied special effect", effect, "to", player.Name)
        end
    end
end

function InventorySystem:removeItemEffects(player, itemData)
    if not itemData.effects then
        return
    end
    
    -- Remove stat bonuses
    if itemData.effects.stats then
        for stat, bonus in pairs(itemData.effects.stats) do
            -- Remove stat bonus from player
            print("Removed", stat, "bonus of", bonus, "from", player.Name)
        end
    end
    
    -- Remove special effects
    if itemData.effects.special then
        for effect, data in pairs(itemData.effects.special) do
            -- Remove special effect
            print("Removed special effect", effect, "from", player.Name)
        end
    end
end

function InventorySystem:getItemData(itemId)
    -- This would typically load from a database or configuration file
    -- For now, return mock data
    local itemDatabase = {
        ["sword_iron"] = {
            id = "sword_iron",
            name = "Iron Sword",
            description = "A sturdy iron sword",
            category = ITEM_CATEGORIES.WEAPON,
            rarity = ITEM_RARITIES.COMMON,
            stackable = false,
            equippable = true,
            effects = {
                stats = {
                    damage = 15,
                    speed = -1
                }
            }
        },
        ["potion_health"] = {
            id = "potion_health",
            name = "Health Potion",
            description = "Restores 50 health",
            category = ITEM_CATEGORIES.CONSUMABLE,
            rarity = ITEM_RARITIES.COMMON,
            stackable = true,
            equippable = false,
            effects = {
                special = {
                    heal = 50
                }
            }
        },
        ["armor_leather"] = {
            id = "armor_leather",
            name = "Leather Armor",
            description = "Basic leather protection",
            category = ITEM_CATEGORIES.ARMOR,
            rarity = ITEM_RARITIES.COMMON,
            stackable = false,
            equippable = true,
            effects = {
                stats = {
                    defense = 5
                }
            }
        }
    }
    
    return itemDatabase[itemId]
end

function InventorySystem:savePlayerData(player)
    local data = {
        inventory = self.playerInventories[player.UserId],
        bank = self.playerBanks[player.UserId],
        equipment = self.playerEquipment[player.UserId]
    }
    
    local success = pcall(function()
        self.dataStore:SetAsync(player.UserId, data)
    end)
    
    if success then
        print("Saved inventory data for", player.Name)
    else
        warn("Failed to save inventory data for", player.Name)
    end
end

function InventorySystem:fireItemEvent(player, event, itemId, data)
    local remoteEvent = ReplicatedStorage:FindFirstChild("InventoryEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "InventoryEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = event,
        itemId = itemId,
        data = data,
        timestamp = tick()
    })
end

-- 4. DEMO THE SYSTEMS
print("\\n4. RUNNING SYSTEM DEMONSTRATIONS...")

-- Create systems
local healthSystem = HealthSystem.new()
local experienceSystem = ExperienceSystem.new()
local inventorySystem = InventorySystem.new()

-- Test systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    -- Test health system
    healthSystem:dealDamage(player, 25, DAMAGE_TYPES.PHYSICAL, "Test Damage")
    healthSystem:addShield(player, 50, 10)
    healthSystem:setArmor(player, "physical", 0.5)
    healthSystem:addStatusEffect(player, "poison", 5, {damage = 2})
    healthSystem:healPlayer(player, 30, "Test Heal")
    
    -- Test experience system
    experienceSystem:addExperience(player, 50, EXPERIENCE_SOURCES.KILL)
    experienceSystem:addExperience(player, 100, EXPERIENCE_SOURCES.QUEST)
    experienceSystem:addExperience(player, 25, EXPERIENCE_SOURCES.EXPLORATION)
    experienceSystem:addExperience(player, 75, EXPERIENCE_SOURCES.CRAFTING)
    
    -- Test inventory system
    inventorySystem:addItem(player, "sword_iron", 1, "Starting Equipment")
    inventorySystem:addItem(player, "potion_health", 5, "Starting Equipment")
    inventorySystem:addItem(player, "armor_leather", 1, "Starting Equipment")
    inventorySystem:equipItem(player, "sword_iron", "MainHand")
    inventorySystem:equipItem(player, "armor_leather", "Chestplate")
    
    print("Applied all system tests to", player.Name)
end)

print("\\n=== HEALTH & DAMAGE SYSTEMS DEMO COMPLETE ===")
print("You've learned health management, experience systems, and inventory management!")`,
    challenge: {
      tests: [
        { description: 'Create health system with damage and healing', type: 'code_contains', value: 'dealDamage' },
        { description: 'Implement experience and leveling system', type: 'code_contains', value: 'addExperience' },
        { description: 'Build inventory system with items and equipment', type: 'code_contains', value: 'addItem' }
      ],
      hints: [
        'Use humanoid.Health and humanoid.MaxHealth for health management',
        'Create experience curves with exponential growth for leveling',
        'Use tables to store inventory items with quantities and properties',
        'Implement item effects that modify player stats when equipped',
        'Use DataStoreService to persist player progression data'
      ],
      successMessage: 'Excellent! You now understand health systems, experience progression, and inventory management. These skills are essential for creating engaging RPG mechanics!'
    }
  },

  // === MULTIPLAYER SYSTEMS ===
  'player-spawning-systems': {
    title: 'Player Spawning & Team Management',
    description: 'Master player spawning, team systems, and multiplayer coordination',
    sections: [
      {
        title: 'Player Spawning Systems',
        content: `Player spawning systems control how players enter and exit your game, ensuring smooth multiplayer experiences.

**Core Spawning Concepts:**
- **Spawn Points**: Designated locations for player entry
- **Spawn Protection**: Temporary invincibility after spawning
- **Spawn Animation**: Visual effects during player creation
- **Spawn Validation**: Security checks before allowing entry
- **Spawn Queuing**: Managing multiple players spawning simultaneously

**Advanced Spawning Features:**
- **Dynamic Spawn Points**: Spawn locations that change based on game state
- **Team-Based Spawning**: Different spawn points for different teams
- **Spawn Cooldowns**: Preventing rapid respawning
- **Spawn Zones**: Areas that trigger spawning events
- **Custom Spawn Logic**: Complex spawning rules and conditions`,
        codeExample: `-- Advanced player spawning system

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local SpawnSystem = {}
SpawnSystem.__index = SpawnSystem

-- Spawn configuration
local SPAWN_PROTECTION_DURATION = 3 -- seconds
local SPAWN_COOLDOWN = 2 -- seconds
local MAX_SPAWN_ATTEMPTS = 3

-- Spawn states
local SPAWN_STATES = {
    IDLE = "Idle",
    SPAWNING = "Spawning",
    PROTECTED = "Protected",
    ACTIVE = "Active"
}

function SpawnSystem.new()
    local self = setmetatable({}, SpawnSystem)
    
    -- Spawn data
    self.spawnPoints = {}
    self.playerStates = {}
    self.spawnCooldowns = {}
    self.spawnProtection = {}
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function SpawnSystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function SpawnSystem:initializePlayer(player)
    self.playerStates[player.UserId] = SPAWN_STATES.IDLE
    self.spawnCooldowns[player.UserId] = 0
    self.spawnProtection[player.UserId] = false
    
    -- Wait for character
    player.CharacterAdded:Connect(function(character)
        self:onCharacterAdded(player, character)
    end)
    
    print("Initialized spawn system for", player.Name)
end

function SpawnSystem:cleanupPlayer(player)
    self.playerStates[player.UserId] = nil
    self.spawnCooldowns[player.UserId] = nil
    self.spawnProtection[player.UserId] = nil
end

function SpawnSystem:onCharacterAdded(player, character)
    local humanoid = character:WaitForChild("Humanoid")
    
    -- Set spawn state
    self.playerStates[player.UserId] = SPAWN_STATES.SPAWNING
    
    -- Find best spawn point
    local spawnPoint = self:findBestSpawnPoint(player)
    if spawnPoint then
        self:spawnPlayerAtPoint(player, character, spawnPoint)
    else
        self:spawnPlayerAtDefault(player, character)
    end
    
    -- Apply spawn protection
    self:applySpawnProtection(player, character)
    
    -- Fire spawn event
    self:fireSpawnEvent(player, character)
    
    print("Spawned", player.Name, "at spawn point")
end

function SpawnSystem:findBestSpawnPoint(player)
    local bestPoint = nil
    local bestScore = -1
    
    for _, spawnPoint in pairs(self.spawnPoints) do
        if spawnPoint.enabled then
            local score = self:calculateSpawnScore(player, spawnPoint)
            if score > bestScore then
                bestScore = score
                bestPoint = spawnPoint
            end
        end
    end
    
    return bestPoint
end

function SpawnSystem:calculateSpawnScore(player, spawnPoint)
    local score = 0
    
    -- Base score
    score = score + spawnPoint.priority
    
    -- Team-based scoring
    if spawnPoint.team and player.Team == spawnPoint.team then
        score = score + 100
    end
    
    -- Distance from other players
    local nearbyPlayers = self:countNearbyPlayers(spawnPoint.position, 50)
    score = score - (nearbyPlayers * 10)
    
    -- Spawn point capacity
    if spawnPoint.capacity then
        local currentPlayers = self:countPlayersAtSpawn(spawnPoint)
        if currentPlayers < spawnPoint.capacity then
            score = score + 50
        else
            score = score - 1000 -- Don't use full spawn points
        end
    end
    
    return score
end

function SpawnSystem:spawnPlayerAtPoint(player, character, spawnPoint)
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    -- Set position
    character:SetPrimaryPartCFrame(CFrame.new(spawnPoint.position))
    
    -- Apply spawn effects
    self:applySpawnEffects(character, spawnPoint)
    
    -- Update spawn point usage
    self:updateSpawnPointUsage(spawnPoint, player)
    
    print("Spawned", player.Name, "at", spawnPoint.name)
end

function SpawnSystem:spawnPlayerAtDefault(player, character)
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    -- Use default spawn location
    character:SetPrimaryPartCFrame(CFrame.new(0, 10, 0))
    
    print("Spawned", player.Name, "at default location")
end

function SpawnSystem:applySpawnProtection(player, character)
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    -- Enable spawn protection
    self.spawnProtection[player.UserId] = true
    self.playerStates[player.UserId] = SPAWN_STATES.PROTECTED
    
    -- Make player invincible
    humanoid.MaxHealth = math.huge
    humanoid.Health = math.huge
    
    -- Add visual effect
    self:addSpawnProtectionEffect(character)
    
    -- Remove protection after duration
    wait(SPAWN_PROTECTION_DURATION)
    
    if character.Parent then
        self:removeSpawnProtection(player, character)
    end
end

function SpawnSystem:removeSpawnProtection(player, character)
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    -- Disable spawn protection
    self.spawnProtection[player.UserId] = false
    self.playerStates[player.UserId] = SPAWN_STATES.ACTIVE
    
    -- Restore normal health
    humanoid.MaxHealth = 100
    humanoid.Health = 100
    
    -- Remove visual effect
    self:removeSpawnProtectionEffect(character)
    
    print("Removed spawn protection for", player.Name)
end

function SpawnSystem:addSpawnProtectionEffect(character)
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    -- Create protection effect
    local protectionEffect = Instance.new("SelectionBox")
    protectionEffect.Adornee = character
    protectionEffect.Color3 = Color3.fromRGB(0, 255, 0)
    protectionEffect.LineThickness = 0.2
    protectionEffect.Transparency = 0.5
    protectionEffect.Name = "SpawnProtection"
    protectionEffect.Parent = character
    
    -- Animate effect
    local tween = TweenService:Create(protectionEffect, 
        TweenInfo.new(0.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true),
        {Transparency = 0.8}
    )
    tween:Play()
end

function SpawnSystem:removeSpawnProtectionEffect(character)
    local protectionEffect = character:FindFirstChild("SpawnProtection")
    if protectionEffect then
        protectionEffect:Destroy()
    end
end

function SpawnSystem:applySpawnEffects(character, spawnPoint)
    if spawnPoint.effects then
        for _, effect in pairs(spawnPoint.effects) do
            self:createSpawnEffect(character, effect)
        end
    end
end

function SpawnSystem:createSpawnEffect(character, effectData)
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    if effectData.type == "particle" then
        local attachment = Instance.new("Attachment")
        attachment.Parent = humanoidRootPart
        
        local particles = Instance.new("ParticleEmitter")
        particles.Parent = attachment
        particles.Texture = effectData.texture or "rbxasset://textures/particles/sparkles_main.dds"
        particles.Lifetime = NumberRange.new(effectData.lifetime or 1)
        particles.Rate = effectData.rate or 50
        particles.SpreadAngle = Vector2.new(effectData.spread or 45, effectData.spread or 45)
        particles.Speed = NumberRange.new(effectData.speed or 5)
        particles.Color = ColorSequence.new(effectData.color or Color3.fromRGB(255, 255, 255))
        
        -- Clean up after duration
        game:GetService("Debris"):AddItem(attachment, effectData.duration or 2)
    end
end

function SpawnSystem:addSpawnPoint(name, position, options)
    local spawnPoint = {
        name = name,
        position = position,
        enabled = options.enabled or true,
        priority = options.priority or 50,
        team = options.team,
        capacity = options.capacity,
        effects = options.effects or {},
        currentPlayers = 0
    }
    
    self.spawnPoints[name] = spawnPoint
    
    print("Added spawn point:", name, "at", position)
end

function SpawnSystem:removeSpawnPoint(name)
    self.spawnPoints[name] = nil
    print("Removed spawn point:", name)
end

function SpawnSystem:enableSpawnPoint(name, enabled)
    if self.spawnPoints[name] then
        self.spawnPoints[name].enabled = enabled
        print("Spawn point", name, "enabled:", enabled)
    end
end

function SpawnSystem:countNearbyPlayers(position, radius)
    local count = 0
    
    for _, player in pairs(Players:GetPlayers()) do
        if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
            local distance = (player.Character.HumanoidRootPart.Position - position).Magnitude
            if distance <= radius then
                count = count + 1
            end
        end
    end
    
    return count
end

function SpawnSystem:countPlayersAtSpawn(spawnPoint)
    return spawnPoint.currentPlayers or 0
end

function SpawnSystem:updateSpawnPointUsage(spawnPoint, player)
    if spawnPoint.capacity then
        spawnPoint.currentPlayers = spawnPoint.currentPlayers + 1
        
        -- Decrease count when player leaves
        player.CharacterRemoving:Connect(function()
            spawnPoint.currentPlayers = math.max(0, spawnPoint.currentPlayers - 1)
        end)
    end
end

function SpawnSystem:fireSpawnEvent(player, character)
    local remoteEvent = ReplicatedStorage:FindFirstChild("SpawnEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "SpawnEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "PlayerSpawned",
        player = player,
        character = character,
        timestamp = tick()
    })
end

-- Example usage
local spawnSystem = SpawnSystem.new()

-- Add spawn points
spawnSystem:addSpawnPoint("Team1Spawn", Vector3.new(0, 5, 0), {
    enabled = true,
    priority = 100,
    team = game.Teams.Team1,
    capacity = 5,
    effects = {
        {type = "particle", texture = "rbxasset://textures/particles/fire_main.dds", color = Color3.fromRGB(255, 0, 0)}
    }
})

spawnSystem:addSpawnPoint("Team2Spawn", Vector3.new(50, 5, 0), {
    enabled = true,
    priority = 100,
    team = game.Teams.Team2,
    capacity = 5,
    effects = {
        {type = "particle", texture = "rbxasset://textures/particles/fire_main.dds", color = Color3.fromRGB(0, 0, 255)}
    }
})

print("Spawn system initialized with", #spawnSystem.spawnPoints, "spawn points")`,
        color: 'blue'
      },
      {
        title: 'Team Management Systems',
        content: `Create comprehensive team management systems for competitive and cooperative gameplay.

**Team System Features:**
- **Team Creation**: Dynamic team formation and management
- **Team Balancing**: Automatic team size and skill balancing
- **Team Colors**: Visual identification and customization
- **Team Chat**: Communication within teams
- **Team Objectives**: Shared goals and missions
- **Team Statistics**: Performance tracking and analytics

**Advanced Team Mechanics:**
- **Team Switching**: Rules and cooldowns for changing teams
- **Team Leaders**: Special permissions and responsibilities
- **Team Events**: Notifications and celebrations
- **Team Persistence**: Saving team data across sessions
- **Team Matchmaking**: Skill-based team formation`,
        codeExample: `-- Comprehensive team management system

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Teams = game:GetService("Teams")

local TeamManager = {}
TeamManager.__index = TeamManager

-- Team configuration
local MAX_TEAM_SIZE = 8
local MIN_TEAM_SIZE = 1
local TEAM_SWITCH_COOLDOWN = 30 -- seconds
local AUTO_BALANCE_THRESHOLD = 2 -- players difference

-- Team colors
local TEAM_COLORS = {
    Color3.fromRGB(255, 0, 0),    -- Red
    Color3.fromRGB(0, 0, 255),    -- Blue
    Color3.fromRGB(0, 255, 0),    -- Green
    Color3.fromRGB(255, 255, 0),  -- Yellow
    Color3.fromRGB(255, 0, 255),  -- Magenta
    Color3.fromRGB(0, 255, 255),  -- Cyan
    Color3.fromRGB(255, 128, 0),  -- Orange
    Color3.fromRGB(128, 0, 255)   -- Purple
}

function TeamManager.new()
    local self = setmetatable({}, TeamManager)
    
    -- Team data
    self.teams = {}
    self.teamLeaders = {}
    self.teamSwitchCooldowns = {}
    self.teamStatistics = {}
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function TeamManager:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function TeamManager:initializePlayer(player)
    self.teamSwitchCooldowns[player.UserId] = 0
    
    -- Auto-assign to team if needed
    if not player.Team then
        self:autoAssignTeam(player)
    end
    
    print("Initialized team management for", player.Name)
end

function TeamManager:cleanupPlayer(player)
    self.teamSwitchCooldowns[player.UserId] = nil
    
    -- Update team statistics
    if player.Team then
        self:updateTeamStatistics(player.Team, "player_left")
    end
end

function TeamManager:createTeam(name, color, options)
    local team = Instance.new("Team")
    team.Name = name
    team.TeamColor = color or self:getNextAvailableColor()
    team.AutoAssignable = options.autoAssignable or true
    team.Parent = Teams
    
    -- Initialize team data
    self.teams[team] = {
        name = name,
        color = team.TeamColor,
        leader = nil,
        members = {},
        statistics = {
            wins = 0,
            losses = 0,
            totalGames = 0,
            totalKills = 0,
            totalDeaths = 0,
            totalScore = 0
        },
        settings = {
            maxSize = options.maxSize or MAX_TEAM_SIZE,
            minSize = options.minSize or MIN_TEAM_SIZE,
            allowSwitching = options.allowSwitching or true,
            private = options.private or false
        }
    }
    
    -- Initialize team statistics
    self.teamStatistics[team] = self.teams[team].statistics
    
    print("Created team:", name, "with color", team.TeamColor)
    
    return team
end

function TeamManager:removeTeam(team)
    if self.teams[team] then
        -- Move all players to neutral team
        for _, player in pairs(team:GetPlayers()) do
            player.Team = nil
        end
        
        -- Clean up team data
        self.teams[team] = nil
        self.teamStatistics[team] = nil
        
        -- Destroy team
        team:Destroy()
        
        print("Removed team:", team.Name)
    end
end

function TeamManager:addPlayerToTeam(player, team)
    if not self.teams[team] then
        return false, "Team does not exist"
    end
    
    local teamData = self.teams[team]
    
    -- Check team capacity
    if #team:GetPlayers() >= teamData.settings.maxSize then
        return false, "Team is full"
    end
    
    -- Check if player is already on a team
    if player.Team then
        local success, message = self:removePlayerFromTeam(player)
        if not success then
            return false, message
        end
    end
    
    -- Add player to team
    player.Team = team
    teamData.members[player.UserId] = {
        player = player,
        joinedAt = tick(),
        role = "Member"
    }
    
    -- Set team leader if first player
    if #team:GetPlayers() == 1 then
        self:setTeamLeader(team, player)
    end
    
    -- Update team statistics
    self:updateTeamStatistics(team, "player_joined")
    
    -- Fire team event
    self:fireTeamEvent("PlayerJoinedTeam", team, player)
    
    print("Added", player.Name, "to team", team.Name)
    
    return true, "Successfully joined team"
end

function TeamManager:removePlayerFromTeam(player)
    if not player.Team then
        return false, "Player is not on a team"
    end
    
    local team = player.Team
    local teamData = self.teams[team]
    
    if not teamData then
        return false, "Team data not found"
    end
    
    -- Remove player from team data
    teamData.members[player.UserId] = nil
    
    -- Remove team leader if they're leaving
    if self.teamLeaders[team] == player then
        self:removeTeamLeader(team)
    end
    
    -- Remove player from team
    player.Team = nil
    
    -- Update team statistics
    self:updateTeamStatistics(team, "player_left")
    
    -- Fire team event
    self:fireTeamEvent("PlayerLeftTeam", team, player)
    
    print("Removed", player.Name, "from team", team.Name)
    
    return true, "Successfully left team"
end

function TeamManager:setTeamLeader(team, player)
    if not self.teams[team] then
        return false
    end
    
    local teamData = self.teams[team]
    
    -- Check if player is on the team
    if not teamData.members[player.UserId] then
        return false
    end
    
    -- Remove previous leader
    if self.teamLeaders[team] then
        local previousLeader = self.teamLeaders[team]
        if teamData.members[previousLeader.UserId] then
            teamData.members[previousLeader.UserId].role = "Member"
        end
    end
    
    -- Set new leader
    self.teamLeaders[team] = player
    teamData.members[player.UserId].role = "Leader"
    teamData.leader = player
    
    -- Fire team event
    self:fireTeamEvent("TeamLeaderChanged", team, player)
    
    print("Set", player.Name, "as leader of team", team.Name)
    
    return true
end

function TeamManager:removeTeamLeader(team)
    if not self.teams[team] then
        return false
    end
    
    local teamData = self.teams[team]
    local previousLeader = self.teamLeaders[team]
    
    if previousLeader and teamData.members[previousLeader.UserId] then
        teamData.members[previousLeader.UserId].role = "Member"
    end
    
    self.teamLeaders[team] = nil
    teamData.leader = nil
    
    -- Assign new leader if team has members
    local players = team:GetPlayers()
    if #players > 0 then
        self:setTeamLeader(team, players[1])
    end
    
    print("Removed team leader from", team.Name)
    
    return true
end

function TeamManager:switchPlayerTeam(player, newTeam)
    if not self.teams[newTeam] then
        return false, "Team does not exist"
    end
    
    local teamData = self.teams[newTeam]
    
    -- Check if switching is allowed
    if not teamData.settings.allowSwitching then
        return false, "Team switching is not allowed"
    end
    
    -- Check cooldown
    if tick() - self.teamSwitchCooldowns[player.UserId] < TEAM_SWITCH_COOLDOWN then
        local remainingTime = TEAM_SWITCH_COOLDOWN - (tick() - self.teamSwitchCooldowns[player.UserId])
        return false, "Team switch cooldown: " .. math.ceil(remainingTime) .. " seconds"
    end
    
    -- Add player to new team
    local success, message = self:addPlayerToTeam(player, newTeam)
    if success then
        self.teamSwitchCooldowns[player.UserId] = tick()
        return true, "Successfully switched teams"
    else
        return false, message
    end
end

function TeamManager:autoAssignTeam(player)
    local bestTeam = self:findBestTeamForPlayer(player)
    if bestTeam then
        self:addPlayerToTeam(player, bestTeam)
    end
end

function TeamManager:findBestTeamForPlayer(player)
    local bestTeam = nil
    local bestScore = math.huge
    
    for team, teamData in pairs(self.teams) do
        if teamData.settings.autoAssignable and not teamData.settings.private then
            local playerCount = #team:GetPlayers()
            local capacity = teamData.settings.maxSize
            
            if playerCount < capacity then
                local score = playerCount -- Prefer teams with fewer players
                if score < bestScore then
                    bestScore = score
                    bestTeam = team
                end
            end
        end
    end
    
    return bestTeam
end

function TeamManager:balanceTeams()
    local allPlayers = {}
    local teamCounts = {}
    
    -- Count players in each team
    for team, teamData in pairs(self.teams) do
        local count = #team:GetPlayers()
        teamCounts[team] = count
        
        -- Add players to list
        for _, player in pairs(team:GetPlayers()) do
            table.insert(allPlayers, player)
        end
    end
    
    -- Check if balancing is needed
    local maxCount = 0
    local minCount = math.huge
    
    for _, count in pairs(teamCounts) do
        maxCount = math.max(maxCount, count)
        minCount = math.min(minCount, count)
    end
    
    if maxCount - minCount > AUTO_BALANCE_THRESHOLD then
        self:performTeamBalancing(allPlayers, teamCounts)
    end
end

function TeamManager:performTeamBalancing(players, teamCounts)
    -- Sort teams by player count
    local sortedTeams = {}
    for team, count in pairs(teamCounts) do
        table.insert(sortedTeams, {team = team, count = count})
    end
    
    table.sort(sortedTeams, function(a, b)
        return a.count < b.count
    end)
    
    -- Redistribute players
    local targetCount = math.floor(#players / #sortedTeams)
    local extraPlayers = #players % #sortedTeams
    
    for i, teamData in ipairs(sortedTeams) do
        local team = teamData.team
        local currentCount = #team:GetPlayers()
        local target = targetCount + (i <= extraPlayers and 1 or 0)
        
        if currentCount > target then
            -- Move excess players to other teams
            local excess = currentCount - target
            local playersToMove = {}
            
            for _, player in pairs(team:GetPlayers()) do
                table.insert(playersToMove, player)
                if #playersToMove >= excess then
                    break
                end
            end
            
            for _, player in ipairs(playersToMove) do
                self:removePlayerFromTeam(player)
                self:autoAssignTeam(player)
            end
        end
    end
    
    print("Performed team balancing")
end

function TeamManager:updateTeamStatistics(team, event)
    if not self.teamStatistics[team] then
        return
    end
    
    local stats = self.teamStatistics[team]
    
    if event == "player_joined" then
        -- Update team size statistics
    elseif event == "player_left" then
        -- Update team size statistics
    elseif event == "game_won" then
        stats.wins = stats.wins + 1
        stats.totalGames = stats.totalGames + 1
    elseif event == "game_lost" then
        stats.losses = stats.losses + 1
        stats.totalGames = stats.totalGames + 1
    elseif event == "kill" then
        stats.totalKills = stats.totalKills + 1
    elseif event == "death" then
        stats.totalDeaths = stats.totalDeaths + 1
    end
end

function TeamManager:getNextAvailableColor()
    local usedColors = {}
    
    for team, teamData in pairs(self.teams) do
        usedColors[teamData.color] = true
    end
    
    for _, color in ipairs(TEAM_COLORS) do
        if not usedColors[color] then
            return color
        end
    end
    
    -- If all colors are used, return a random one
    return TEAM_COLORS[math.random(1, #TEAM_COLORS)]
end

function TeamManager:fireTeamEvent(eventName, team, player)
    local remoteEvent = ReplicatedStorage:FindFirstChild("TeamEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "TeamEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireAllClients({
        event = eventName,
        team = team,
        player = player,
        timestamp = tick()
    })
end

-- Example usage
local teamManager = TeamManager.new()

-- Create teams
local redTeam = teamManager:createTeam("Red Team", Color3.fromRGB(255, 0, 0), {
    maxSize = 4,
    autoAssignable = true
})

local blueTeam = teamManager:createTeam("Blue Team", Color3.fromRGB(0, 0, 255), {
    maxSize = 4,
    autoAssignable = true
})

print("Team management system initialized with", #teamManager.teams, "teams")`,
        color: 'green'
      },
      {
        title: 'Matchmaking & Game Modes',
        content: `Implement sophisticated matchmaking systems and game mode management for competitive gameplay.

**Matchmaking Features:**
- **Skill-Based Matching**: Pair players of similar skill levels
- **Queue Systems**: Manage player waiting lists
- **Match Creation**: Automatically form balanced matches
- **Match Validation**: Ensure fair and valid matches
- **Match Statistics**: Track performance and outcomes

**Game Mode Management:**
- **Mode Selection**: Choose from available game modes
- **Mode Configuration**: Customize rules and settings
- **Mode Rotation**: Automatic switching between modes
- **Mode Statistics**: Track mode popularity and performance
- **Mode Events**: Special events and tournaments`,
        codeExample: `-- Advanced matchmaking and game mode system

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local MatchmakingSystem = {}
MatchmakingSystem.__index = MatchmakingSystem

-- Matchmaking configuration
local QUEUE_TIMEOUT = 300 -- seconds
local MIN_PLAYERS_PER_MATCH = 2
local MAX_PLAYERS_PER_MATCH = 16
local SKILL_RANGE = 200 -- MMR difference for matching

-- Game modes
local GAME_MODES = {
    DEATHMATCH = {
        name = "Deathmatch",
        minPlayers = 2,
        maxPlayers = 8,
        duration = 300, -- 5 minutes
        description = "Eliminate opponents to score points"
    },
    TEAM_DEATHMATCH = {
        name = "Team Deathmatch",
        minPlayers = 4,
        maxPlayers = 16,
        duration = 600, -- 10 minutes
        description = "Team-based elimination match"
    },
    CAPTURE_THE_FLAG = {
        name = "Capture the Flag",
        minPlayers = 4,
        maxPlayers = 16,
        duration = 900, -- 15 minutes
        description = "Capture enemy flags to win"
    },
    KING_OF_THE_HILL = {
        name = "King of the Hill",
        minPlayers = 4,
        maxPlayers = 12,
        duration = 600, -- 10 minutes
        description = "Control the hill to earn points"
    }
}

function MatchmakingSystem.new()
    local self = setmetatable({}, MatchmakingSystem)
    
    -- Matchmaking data
    self.queues = {}
    self.activeMatches = {}
    self.playerMMR = {}
    self.matchHistory = {}
    
    -- Game mode data
    self.currentGameMode = GAME_MODES.DEATHMATCH
    self.gameModeRotation = {}
    self.modeStatistics = {}
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function MatchmakingSystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function MatchmakingSystem:initializePlayer(player)
    -- Initialize MMR
    self.playerMMR[player.UserId] = 1000 -- Starting MMR
    
    print("Initialized matchmaking for", player.Name, "MMR:", self.playerMMR[player.UserId])
end

function MatchmakingSystem:cleanupPlayer(player)
    -- Remove from all queues
    self:removePlayerFromQueues(player)
    
    -- Clean up MMR data
    self.playerMMR[player.UserId] = nil
end

function MatchmakingSystem:addPlayerToQueue(player, gameMode)
    if not GAME_MODES[gameMode] then
        return false, "Invalid game mode"
    end
    
    -- Remove player from other queues
    self:removePlayerFromQueues(player)
    
    -- Add to queue
    local queueData = {
        player = player,
        gameMode = gameMode,
        joinTime = tick(),
        mmr = self.playerMMR[player.UserId] or 1000
    }
    
    if not self.queues[gameMode] then
        self.queues[gameMode] = {}
    end
    
    table.insert(self.queues[gameMode], queueData)
    
    -- Fire queue event
    self:fireQueueEvent("PlayerJoinedQueue", player, gameMode)
    
    -- Try to create match
    self:tryCreateMatch(gameMode)
    
    print("Added", player.Name, "to", gameMode, "queue")
    
    return true, "Successfully joined queue"
end

function MatchmakingSystem:removePlayerFromQueues(player)
    for gameMode, queue in pairs(self.queues) do
        for i, queueData in ipairs(queue) do
            if queueData.player == player then
                table.remove(queue, i)
                self:fireQueueEvent("PlayerLeftQueue", player, gameMode)
                print("Removed", player.Name, "from", gameMode, "queue")
                break
            end
        end
    end
end

function MatchmakingSystem:tryCreateMatch(gameMode)
    local queue = self.queues[gameMode]
    if not queue or #queue < GAME_MODES[gameMode].minPlayers then
        return false
    end
    
    -- Sort queue by MMR
    table.sort(queue, function(a, b)
        return a.mmr < b.mmr
    end)
    
    -- Find players within skill range
    local matchPlayers = {}
    local baseMMR = queue[1].mmr
    
    for _, queueData in ipairs(queue) do
        if #matchPlayers >= GAME_MODES[gameMode].maxPlayers then
            break
        end
        
        if math.abs(queueData.mmr - baseMMR) <= SKILL_RANGE then
            table.insert(matchPlayers, queueData)
        end
    end
    
    -- Check if we have enough players
    if #matchPlayers >= GAME_MODES[gameMode].minPlayers then
        self:createMatch(gameMode, matchPlayers)
        return true
    end
    
    return false
end

function MatchmakingSystem:createMatch(gameMode, players)
    local matchId = "match_" .. tick() .. "_" .. math.random(1000, 9999)
    
    local match = {
        id = matchId,
        gameMode = gameMode,
        players = {},
        teams = {},
        startTime = tick(),
        endTime = nil,
        status = "Starting",
        settings = GAME_MODES[gameMode]
    }
    
    -- Add players to match
    for _, queueData in ipairs(players) do
        table.insert(match.players, queueData.player)
        
        -- Remove from queue
        self:removePlayerFromQueues(queueData.player)
    end
    
    -- Create teams if needed
    if gameMode == "TEAM_DEATHMATCH" or gameMode == "CAPTURE_THE_FLAG" then
        self:createTeamsForMatch(match)
    end
    
    -- Store active match
    self.activeMatches[matchId] = match
    
    -- Fire match created event
    self:fireMatchEvent("MatchCreated", match)
    
    -- Start match
    self:startMatch(match)
    
    print("Created match", matchId, "with", #match.players, "players")
end

function MatchmakingSystem:createTeamsForMatch(match)
    local players = match.players
    local teamCount = 2
    
    -- Shuffle players
    for i = #players, 2, -1 do
        local j = math.random(i)
        players[i], players[j] = players[j], players[i]
    end
    
    -- Distribute players to teams
    for i, player in ipairs(players) do
        local teamIndex = ((i - 1) % teamCount) + 1
        
        if not match.teams[teamIndex] then
            match.teams[teamIndex] = {
                name = "Team " .. teamIndex,
                players = {},
                score = 0
            }
        end
        
        table.insert(match.teams[teamIndex].players, player)
    end
    
    print("Created", teamCount, "teams for match", match.id)
end

function MatchmakingSystem:startMatch(match)
    match.status = "Active"
    
    -- Fire match started event
    self:fireMatchEvent("MatchStarted", match)
    
    -- Set match timer
    spawn(function()
        wait(match.settings.duration)
        self:endMatch(match)
    end)
    
    print("Started match", match.id)
end

function MatchmakingSystem:endMatch(match)
    match.status = "Ended"
    match.endTime = tick()
    
    -- Calculate results
    local results = self:calculateMatchResults(match)
    
    -- Update player MMR
    self:updatePlayerMMR(match, results)
    
    -- Store match history
    self:storeMatchHistory(match, results)
    
    -- Fire match ended event
    self:fireMatchEvent("MatchEnded", match, results)
    
    -- Clean up match
    self.activeMatches[match.id] = nil
    
    print("Ended match", match.id)
end

function MatchmakingSystem:calculateMatchResults(match)
    local results = {
        winners = {},
        losers = {},
        scores = {},
        duration = match.endTime - match.startTime
    }
    
    if match.teams and #match.teams > 0 then
        -- Team-based match
        local winningTeam = nil
        local highestScore = -1
        
        for _, team in pairs(match.teams) do
            if team.score > highestScore then
                highestScore = team.score
                winningTeam = team
            end
        end
        
        for _, team in pairs(match.teams) do
            if team == winningTeam then
                for _, player in ipairs(team.players) do
                    table.insert(results.winners, player)
                end
            else
                for _, player in ipairs(team.players) do
                    table.insert(results.losers, player)
                end
            end
        end
    else
        -- Free-for-all match
        -- This would need to be implemented based on game mode
        results.winners = match.players
    end
    
    return results
end

function MatchmakingSystem:updatePlayerMMR(match, results)
    for _, player in ipairs(results.winners) do
        self.playerMMR[player.UserId] = (self.playerMMR[player.UserId] or 1000) + 25
    end
    
    for _, player in ipairs(results.losers) do
        self.playerMMR[player.UserId] = math.max(0, (self.playerMMR[player.UserId] or 1000) - 25)
    end
end

function MatchmakingSystem:storeMatchHistory(match, results)
    local historyEntry = {
        matchId = match.id,
        gameMode = match.gameMode,
        players = match.players,
        results = results,
        startTime = match.startTime,
        endTime = match.endTime,
        duration = results.duration
    }
    
    table.insert(self.matchHistory, historyEntry)
    
    -- Keep only last 100 matches
    if #self.matchHistory > 100 then
        table.remove(self.matchHistory, 1)
    end
end

function MatchmakingSystem:setGameMode(gameMode)
    if GAME_MODES[gameMode] then
        self.currentGameMode = GAME_MODES[gameMode]
        self:fireGameModeEvent("GameModeChanged", gameMode)
        print("Changed game mode to", gameMode)
    end
end

function MatchmakingSystem:getPlayerMMR(player)
    return self.playerMMR[player.UserId] or 1000
end

function MatchmakingSystem:getQueueStatus(gameMode)
    local queue = self.queues[gameMode]
    if not queue then
        return 0
    end
    
    return #queue
end

function MatchmakingSystem:fireQueueEvent(eventName, player, gameMode)
    local remoteEvent = ReplicatedStorage:FindFirstChild("QueueEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "QueueEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = eventName,
        gameMode = gameMode,
        queueSize = self:getQueueStatus(gameMode),
        timestamp = tick()
    })
end

function MatchmakingSystem:fireMatchEvent(eventName, match, results)
    local remoteEvent = ReplicatedStorage:FindFirstChild("MatchEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "MatchEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireAllClients({
        event = eventName,
        match = match,
        results = results,
        timestamp = tick()
    })
end

function MatchmakingSystem:fireGameModeEvent(eventName, gameMode)
    local remoteEvent = ReplicatedStorage:FindFirstChild("GameModeEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "GameModeEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireAllClients({
        event = eventName,
        gameMode = gameMode,
        timestamp = tick()
    })
end

-- Example usage
local matchmakingSystem = MatchmakingSystem.new()

-- Test matchmaking
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    -- Add player to deathmatch queue
    matchmakingSystem:addPlayerToQueue(player, "DEATHMATCH")
    
    print("Added", player.Name, "to matchmaking queue")
end)

print("Matchmaking system initialized with", #GAME_MODES, "game modes")`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Player Spawning & Team Management - Comprehensive Learning Example
-- Master player spawning, team systems, and multiplayer coordination

print("=== PLAYER SPAWNING & TEAM MANAGEMENT DEMO ===")
print("Learning player spawning and team management systems...")

-- 1. PLAYER SPAWNING SYSTEMS
print("\\n1. DEMONSTRATING PLAYER SPAWNING SYSTEMS...")

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local SpawnSystem = {}
SpawnSystem.__index = SpawnSystem

-- Spawn configuration
local SPAWN_PROTECTION_DURATION = 3 -- seconds
local SPAWN_COOLDOWN = 2 -- seconds
local MAX_SPAWN_ATTEMPTS = 3

-- Spawn states
local SPAWN_STATES = {
    IDLE = "Idle",
    SPAWNING = "Spawning",
    PROTECTED = "Protected",
    ACTIVE = "Active"
}

function SpawnSystem.new()
    local self = setmetatable({}, SpawnSystem)
    
    -- Spawn data
    self.spawnPoints = {}
    self.playerStates = {}
    self.spawnCooldowns = {}
    self.spawnProtection = {}
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function SpawnSystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function SpawnSystem:initializePlayer(player)
    self.playerStates[player.UserId] = SPAWN_STATES.IDLE
    self.spawnCooldowns[player.UserId] = 0
    self.spawnProtection[player.UserId] = false
    
    -- Wait for character
    player.CharacterAdded:Connect(function(character)
        self:onCharacterAdded(player, character)
    end)
    
    print("Initialized spawn system for", player.Name)
end

function SpawnSystem:cleanupPlayer(player)
    self.playerStates[player.UserId] = nil
    self.spawnCooldowns[player.UserId] = nil
    self.spawnProtection[player.UserId] = nil
end

function SpawnSystem:onCharacterAdded(player, character)
    local humanoid = character:WaitForChild("Humanoid")
    
    -- Set spawn state
    self.playerStates[player.UserId] = SPAWN_STATES.SPAWNING
    
    -- Find best spawn point
    local spawnPoint = self:findBestSpawnPoint(player)
    if spawnPoint then
        self:spawnPlayerAtPoint(player, character, spawnPoint)
    else
        self:spawnPlayerAtDefault(player, character)
    end
    
    -- Apply spawn protection
    self:applySpawnProtection(player, character)
    
    -- Fire spawn event
    self:fireSpawnEvent(player, character)
    
    print("Spawned", player.Name, "at spawn point")
end

function SpawnSystem:findBestSpawnPoint(player)
    local bestPoint = nil
    local bestScore = -1
    
    for _, spawnPoint in pairs(self.spawnPoints) do
        if spawnPoint.enabled then
            local score = self:calculateSpawnScore(player, spawnPoint)
            if score > bestScore then
                bestScore = score
                bestPoint = spawnPoint
            end
        end
    end
    
    return bestPoint
end

function SpawnSystem:calculateSpawnScore(player, spawnPoint)
    local score = 0
    
    -- Base score
    score = score + spawnPoint.priority
    
    -- Team-based scoring
    if spawnPoint.team and player.Team == spawnPoint.team then
        score = score + 100
    end
    
    -- Distance from other players
    local nearbyPlayers = self:countNearbyPlayers(spawnPoint.position, 50)
    score = score - (nearbyPlayers * 10)
    
    -- Spawn point capacity
    if spawnPoint.capacity then
        local currentPlayers = self:countPlayersAtSpawn(spawnPoint)
        if currentPlayers < spawnPoint.capacity then
            score = score + 50
        else
            score = score - 1000 -- Don't use full spawn points
        end
    end
    
    return score
end

function SpawnSystem:spawnPlayerAtPoint(player, character, spawnPoint)
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    -- Set position
    character:SetPrimaryPartCFrame(CFrame.new(spawnPoint.position))
    
    -- Apply spawn effects
    self:applySpawnEffects(character, spawnPoint)
    
    -- Update spawn point usage
    self:updateSpawnPointUsage(spawnPoint, player)
    
    print("Spawned", player.Name, "at", spawnPoint.name)
end

function SpawnSystem:spawnPlayerAtDefault(player, character)
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    -- Use default spawn location
    character:SetPrimaryPartCFrame(CFrame.new(0, 10, 0))
    
    print("Spawned", player.Name, "at default location")
end

function SpawnSystem:applySpawnProtection(player, character)
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    -- Enable spawn protection
    self.spawnProtection[player.UserId] = true
    self.playerStates[player.UserId] = SPAWN_STATES.PROTECTED
    
    -- Make player invincible
    humanoid.MaxHealth = math.huge
    humanoid.Health = math.huge
    
    -- Add visual effect
    self:addSpawnProtectionEffect(character)
    
    -- Remove protection after duration
    wait(SPAWN_PROTECTION_DURATION)
    
    if character.Parent then
        self:removeSpawnProtection(player, character)
    end
end

function SpawnSystem:removeSpawnProtection(player, character)
    local humanoid = character:FindFirstChild("Humanoid")
    if not humanoid then return end
    
    -- Disable spawn protection
    self.spawnProtection[player.UserId] = false
    self.playerStates[player.UserId] = SPAWN_STATES.ACTIVE
    
    -- Restore normal health
    humanoid.MaxHealth = 100
    humanoid.Health = 100
    
    -- Remove visual effect
    self:removeSpawnProtectionEffect(character)
    
    print("Removed spawn protection for", player.Name)
end

function SpawnSystem:addSpawnProtectionEffect(character)
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    -- Create protection effect
    local protectionEffect = Instance.new("SelectionBox")
    protectionEffect.Adornee = character
    protectionEffect.Color3 = Color3.fromRGB(0, 255, 0)
    protectionEffect.LineThickness = 0.2
    protectionEffect.Transparency = 0.5
    protectionEffect.Name = "SpawnProtection"
    protectionEffect.Parent = character
    
    -- Animate effect
    local tween = TweenService:Create(protectionEffect, 
        TweenInfo.new(0.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true),
        {Transparency = 0.8}
    )
    tween:Play()
end

function SpawnSystem:removeSpawnProtectionEffect(character)
    local protectionEffect = character:FindFirstChild("SpawnProtection")
    if protectionEffect then
        protectionEffect:Destroy()
    end
end

function SpawnSystem:applySpawnEffects(character, spawnPoint)
    if spawnPoint.effects then
        for _, effect in pairs(spawnPoint.effects) do
            self:createSpawnEffect(character, effect)
        end
    end
end

function SpawnSystem:createSpawnEffect(character, effectData)
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    if effectData.type == "particle" then
        local attachment = Instance.new("Attachment")
        attachment.Parent = humanoidRootPart
        
        local particles = Instance.new("ParticleEmitter")
        particles.Parent = attachment
        particles.Texture = effectData.texture or "rbxasset://textures/particles/sparkles_main.dds"
        particles.Lifetime = NumberRange.new(effectData.lifetime or 1)
        particles.Rate = effectData.rate or 50
        particles.SpreadAngle = Vector2.new(effectData.spread or 45, effectData.spread or 45)
        particles.Speed = NumberRange.new(effectData.speed or 5)
        particles.Color = ColorSequence.new(effectData.color or Color3.fromRGB(255, 255, 255))
        
        -- Clean up after duration
        game:GetService("Debris"):AddItem(attachment, effectData.duration or 2)
    end
end

function SpawnSystem:addSpawnPoint(name, position, options)
    local spawnPoint = {
        name = name,
        position = position,
        enabled = options.enabled or true,
        priority = options.priority or 50,
        team = options.team,
        capacity = options.capacity,
        effects = options.effects or {},
        currentPlayers = 0
    }
    
    self.spawnPoints[name] = spawnPoint
    
    print("Added spawn point:", name, "at", position)
end

function SpawnSystem:removeSpawnPoint(name)
    self.spawnPoints[name] = nil
    print("Removed spawn point:", name)
end

function SpawnSystem:enableSpawnPoint(name, enabled)
    if self.spawnPoints[name] then
        self.spawnPoints[name].enabled = enabled
        print("Spawn point", name, "enabled:", enabled)
    end
end

function SpawnSystem:countNearbyPlayers(position, radius)
    local count = 0
    
    for _, player in pairs(Players:GetPlayers()) do
        if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
            local distance = (player.Character.HumanoidRootPart.Position - position).Magnitude
            if distance <= radius then
                count = count + 1
            end
        end
    end
    
    return count
end

function SpawnSystem:countPlayersAtSpawn(spawnPoint)
    return spawnPoint.currentPlayers or 0
end

function SpawnSystem:updateSpawnPointUsage(spawnPoint, player)
    if spawnPoint.capacity then
        spawnPoint.currentPlayers = spawnPoint.currentPlayers + 1
        
        -- Decrease count when player leaves
        player.CharacterRemoving:Connect(function()
            spawnPoint.currentPlayers = math.max(0, spawnPoint.currentPlayers - 1)
        end)
    end
end

function SpawnSystem:fireSpawnEvent(player, character)
    local remoteEvent = ReplicatedStorage:FindFirstChild("SpawnEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "SpawnEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = "PlayerSpawned",
        player = player,
        character = character,
        timestamp = tick()
    })
end

-- 2. TEAM MANAGEMENT SYSTEMS
print("\\n2. DEMONSTRATING TEAM MANAGEMENT SYSTEMS...")

local TeamManager = {}
TeamManager.__index = TeamManager

-- Team configuration
local MAX_TEAM_SIZE = 8
local MIN_TEAM_SIZE = 1
local TEAM_SWITCH_COOLDOWN = 30 -- seconds
local AUTO_BALANCE_THRESHOLD = 2 -- players difference

-- Team colors
local TEAM_COLORS = {
    Color3.fromRGB(255, 0, 0),    -- Red
    Color3.fromRGB(0, 0, 255),    -- Blue
    Color3.fromRGB(0, 255, 0),    -- Green
    Color3.fromRGB(255, 255, 0),  -- Yellow
    Color3.fromRGB(255, 0, 255),  -- Magenta
    Color3.fromRGB(0, 255, 255),  -- Cyan
    Color3.fromRGB(255, 128, 0),  -- Orange
    Color3.fromRGB(128, 0, 255)   -- Purple
}

function TeamManager.new()
    local self = setmetatable({}, TeamManager)
    
    -- Team data
    self.teams = {}
    self.teamLeaders = {}
    self.teamSwitchCooldowns = {}
    self.teamStatistics = {}
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function TeamManager:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function TeamManager:initializePlayer(player)
    self.teamSwitchCooldowns[player.UserId] = 0
    
    -- Auto-assign to team if needed
    if not player.Team then
        self:autoAssignTeam(player)
    end
    
    print("Initialized team management for", player.Name)
end

function TeamManager:cleanupPlayer(player)
    self.teamSwitchCooldowns[player.UserId] = nil
    
    -- Update team statistics
    if player.Team then
        self:updateTeamStatistics(player.Team, "player_left")
    end
end

function TeamManager:createTeam(name, color, options)
    local team = Instance.new("Team")
    team.Name = name
    team.TeamColor = color or self:getNextAvailableColor()
    team.AutoAssignable = options.autoAssignable or true
    team.Parent = Teams
    
    -- Initialize team data
    self.teams[team] = {
        name = name,
        color = team.TeamColor,
        leader = nil,
        members = {},
        statistics = {
            wins = 0,
            losses = 0,
            totalGames = 0,
            totalKills = 0,
            totalDeaths = 0,
            totalScore = 0
        },
        settings = {
            maxSize = options.maxSize or MAX_TEAM_SIZE,
            minSize = options.minSize or MIN_TEAM_SIZE,
            allowSwitching = options.allowSwitching or true,
            private = options.private or false
        }
    }
    
    -- Initialize team statistics
    self.teamStatistics[team] = self.teams[team].statistics
    
    print("Created team:", name, "with color", team.TeamColor)
    
    return team
end

function TeamManager:removeTeam(team)
    if self.teams[team] then
        -- Move all players to neutral team
        for _, player in pairs(team:GetPlayers()) do
            player.Team = nil
        end
        
        -- Clean up team data
        self.teams[team] = nil
        self.teamStatistics[team] = nil
        
        -- Destroy team
        team:Destroy()
        
        print("Removed team:", team.Name)
    end
end

function TeamManager:addPlayerToTeam(player, team)
    if not self.teams[team] then
        return false, "Team does not exist"
    end
    
    local teamData = self.teams[team]
    
    -- Check team capacity
    if #team:GetPlayers() >= teamData.settings.maxSize then
        return false, "Team is full"
    end
    
    -- Check if player is already on a team
    if player.Team then
        local success, message = self:removePlayerFromTeam(player)
        if not success then
            return false, message
        end
    end
    
    -- Add player to team
    player.Team = team
    teamData.members[player.UserId] = {
        player = player,
        joinedAt = tick(),
        role = "Member"
    }
    
    -- Set team leader if first player
    if #team:GetPlayers() == 1 then
        self:setTeamLeader(team, player)
    end
    
    -- Update team statistics
    self:updateTeamStatistics(team, "player_joined")
    
    -- Fire team event
    self:fireTeamEvent("PlayerJoinedTeam", team, player)
    
    print("Added", player.Name, "to team", team.Name)
    
    return true, "Successfully joined team"
end

function TeamManager:removePlayerFromTeam(player)
    if not player.Team then
        return false, "Player is not on a team"
    end
    
    local team = player.Team
    local teamData = self.teams[team]
    
    if not teamData then
        return false, "Team data not found"
    end
    
    -- Remove player from team data
    teamData.members[player.UserId] = nil
    
    -- Remove team leader if they're leaving
    if self.teamLeaders[team] == player then
        self:removeTeamLeader(team)
    end
    
    -- Remove player from team
    player.Team = nil
    
    -- Update team statistics
    self:updateTeamStatistics(team, "player_left")
    
    -- Fire team event
    self:fireTeamEvent("PlayerLeftTeam", team, player)
    
    print("Removed", player.Name, "from team", team.Name)
    
    return true, "Successfully left team"
end

function TeamManager:setTeamLeader(team, player)
    if not self.teams[team] then
        return false
    end
    
    local teamData = self.teams[team]
    
    -- Check if player is on the team
    if not teamData.members[player.UserId] then
        return false
    end
    
    -- Remove previous leader
    if self.teamLeaders[team] then
        local previousLeader = self.teamLeaders[team]
        if teamData.members[previousLeader.UserId] then
            teamData.members[previousLeader.UserId].role = "Member"
        end
    end
    
    -- Set new leader
    self.teamLeaders[team] = player
    teamData.members[player.UserId].role = "Leader"
    teamData.leader = player
    
    -- Fire team event
    self:fireTeamEvent("TeamLeaderChanged", team, player)
    
    print("Set", player.Name, "as leader of team", team.Name)
    
    return true
end

function TeamManager:removeTeamLeader(team)
    if not self.teams[team] then
        return false
    end
    
    local teamData = self.teams[team]
    local previousLeader = self.teamLeaders[team]
    
    if previousLeader and teamData.members[previousLeader.UserId] then
        teamData.members[previousLeader.UserId].role = "Member"
    end
    
    self.teamLeaders[team] = nil
    teamData.leader = nil
    
    -- Assign new leader if team has members
    local players = team:GetPlayers()
    if #players > 0 then
        self:setTeamLeader(team, players[1])
    end
    
    print("Removed team leader from", team.Name)
    
    return true
end

function TeamManager:switchPlayerTeam(player, newTeam)
    if not self.teams[newTeam] then
        return false, "Team does not exist"
    end
    
    local teamData = self.teams[newTeam]
    
    -- Check if switching is allowed
    if not teamData.settings.allowSwitching then
        return false, "Team switching is not allowed"
    end
    
    -- Check cooldown
    if tick() - self.teamSwitchCooldowns[player.UserId] < TEAM_SWITCH_COOLDOWN then
        local remainingTime = TEAM_SWITCH_COOLDOWN - (tick() - self.teamSwitchCooldowns[player.UserId])
        return false, "Team switch cooldown: " .. math.ceil(remainingTime) .. " seconds"
    end
    
    -- Add player to new team
    local success, message = self:addPlayerToTeam(player, newTeam)
    if success then
        self.teamSwitchCooldowns[player.UserId] = tick()
        return true, "Successfully switched teams"
    else
        return false, message
    end
end

function TeamManager:autoAssignTeam(player)
    local bestTeam = self:findBestTeamForPlayer(player)
    if bestTeam then
        self:addPlayerToTeam(player, bestTeam)
    end
end

function TeamManager:findBestTeamForPlayer(player)
    local bestTeam = nil
    local bestScore = math.huge
    
    for team, teamData in pairs(self.teams) do
        if teamData.settings.autoAssignable and not teamData.settings.private then
            local playerCount = #team:GetPlayers()
            local capacity = teamData.settings.maxSize
            
            if playerCount < capacity then
                local score = playerCount -- Prefer teams with fewer players
                if score < bestScore then
                    bestScore = score
                    bestTeam = team
                end
            end
        end
    end
    
    return bestTeam
end

function TeamManager:balanceTeams()
    local allPlayers = {}
    local teamCounts = {}
    
    -- Count players in each team
    for team, teamData in pairs(self.teams) do
        local count = #team:GetPlayers()
        teamCounts[team] = count
        
        -- Add players to list
        for _, player in pairs(team:GetPlayers()) do
            table.insert(allPlayers, player)
        end
    end
    
    -- Check if balancing is needed
    local maxCount = 0
    local minCount = math.huge
    
    for _, count in pairs(teamCounts) do
        maxCount = math.max(maxCount, count)
        minCount = math.min(minCount, count)
    end
    
    if maxCount - minCount > AUTO_BALANCE_THRESHOLD then
        self:performTeamBalancing(allPlayers, teamCounts)
    end
end

function TeamManager:performTeamBalancing(players, teamCounts)
    -- Sort teams by player count
    local sortedTeams = {}
    for team, count in pairs(teamCounts) do
        table.insert(sortedTeams, {team = team, count = count})
    end
    
    table.sort(sortedTeams, function(a, b)
        return a.count < b.count
    end)
    
    -- Redistribute players
    local targetCount = math.floor(#players / #sortedTeams)
    local extraPlayers = #players % #sortedTeams
    
    for i, teamData in ipairs(sortedTeams) do
        local team = teamData.team
        local currentCount = #team:GetPlayers()
        local target = targetCount + (i <= extraPlayers and 1 or 0)
        
        if currentCount > target then
            -- Move excess players to other teams
            local excess = currentCount - target
            local playersToMove = {}
            
            for _, player in pairs(team:GetPlayers()) do
                table.insert(playersToMove, player)
                if #playersToMove >= excess then
                    break
                end
            end
            
            for _, player in ipairs(playersToMove) do
                self:removePlayerFromTeam(player)
                self:autoAssignTeam(player)
            end
        end
    end
    
    print("Performed team balancing")
end

function TeamManager:updateTeamStatistics(team, event)
    if not self.teamStatistics[team] then
        return
    end
    
    local stats = self.teamStatistics[team]
    
    if event == "player_joined" then
        -- Update team size statistics
    elseif event == "player_left" then
        -- Update team size statistics
    elseif event == "game_won" then
        stats.wins = stats.wins + 1
        stats.totalGames = stats.totalGames + 1
    elseif event == "game_lost" then
        stats.losses = stats.losses + 1
        stats.totalGames = stats.totalGames + 1
    elseif event == "kill" then
        stats.totalKills = stats.totalKills + 1
    elseif event == "death" then
        stats.totalDeaths = stats.totalDeaths + 1
    end
end

function TeamManager:getNextAvailableColor()
    local usedColors = {}
    
    for team, teamData in pairs(self.teams) do
        usedColors[teamData.color] = true
    end
    
    for _, color in ipairs(TEAM_COLORS) do
        if not usedColors[color] then
            return color
        end
    end
    
    -- If all colors are used, return a random one
    return TEAM_COLORS[math.random(1, #TEAM_COLORS)]
end

function TeamManager:fireTeamEvent(eventName, team, player)
    local remoteEvent = ReplicatedStorage:FindFirstChild("TeamEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "TeamEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireAllClients({
        event = eventName,
        team = team,
        player = player,
        timestamp = tick()
    })
end

-- 3. MATCHMAKING & GAME MODES
print("\\n3. DEMONSTRATING MATCHMAKING & GAME MODES...")

local MatchmakingSystem = {}
MatchmakingSystem.__index = MatchmakingSystem

-- Matchmaking configuration
local QUEUE_TIMEOUT = 300 -- seconds
local MIN_PLAYERS_PER_MATCH = 2
local MAX_PLAYERS_PER_MATCH = 16
local SKILL_RANGE = 200 -- MMR difference for matching

-- Game modes
local GAME_MODES = {
    DEATHMATCH = {
        name = "Deathmatch",
        minPlayers = 2,
        maxPlayers = 8,
        duration = 300, -- 5 minutes
        description = "Eliminate opponents to score points"
    },
    TEAM_DEATHMATCH = {
        name = "Team Deathmatch",
        minPlayers = 4,
        maxPlayers = 16,
        duration = 600, -- 10 minutes
        description = "Team-based elimination match"
    },
    CAPTURE_THE_FLAG = {
        name = "Capture the Flag",
        minPlayers = 4,
        maxPlayers = 16,
        duration = 900, -- 15 minutes
        description = "Capture enemy flags to win"
    },
    KING_OF_THE_HILL = {
        name = "King of the Hill",
        minPlayers = 4,
        maxPlayers = 12,
        duration = 600, -- 10 minutes
        description = "Control the hill to earn points"
    }
}

function MatchmakingSystem.new()
    local self = setmetatable({}, MatchmakingSystem)
    
    -- Matchmaking data
    self.queues = {}
    self.activeMatches = {}
    self.playerMMR = {}
    self.matchHistory = {}
    
    -- Game mode data
    self.currentGameMode = GAME_MODES.DEATHMATCH
    self.gameModeRotation = {}
    self.modeStatistics = {}
    
    -- Setup events
    self:setupEvents()
    
    return self
end

function MatchmakingSystem:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function MatchmakingSystem:initializePlayer(player)
    -- Initialize MMR
    self.playerMMR[player.UserId] = 1000 -- Starting MMR
    
    print("Initialized matchmaking for", player.Name, "MMR:", self.playerMMR[player.UserId])
end

function MatchmakingSystem:cleanupPlayer(player)
    -- Remove from all queues
    self:removePlayerFromQueues(player)
    
    -- Clean up MMR data
    self.playerMMR[player.UserId] = nil
end

function MatchmakingSystem:addPlayerToQueue(player, gameMode)
    if not GAME_MODES[gameMode] then
        return false, "Invalid game mode"
    end
    
    -- Remove player from other queues
    self:removePlayerFromQueues(player)
    
    -- Add to queue
    local queueData = {
        player = player,
        gameMode = gameMode,
        joinTime = tick(),
        mmr = self.playerMMR[player.UserId] or 1000
    }
    
    if not self.queues[gameMode] then
        self.queues[gameMode] = {}
    end
    
    table.insert(self.queues[gameMode], queueData)
    
    -- Fire queue event
    self:fireQueueEvent("PlayerJoinedQueue", player, gameMode)
    
    -- Try to create match
    self:tryCreateMatch(gameMode)
    
    print("Added", player.Name, "to", gameMode, "queue")
    
    return true, "Successfully joined queue"
end

function MatchmakingSystem:removePlayerFromQueues(player)
    for gameMode, queue in pairs(self.queues) do
        for i, queueData in ipairs(queue) do
            if queueData.player == player then
                table.remove(queue, i)
                self:fireQueueEvent("PlayerLeftQueue", player, gameMode)
                print("Removed", player.Name, "from", gameMode, "queue")
                break
            end
        end
    end
end

function MatchmakingSystem:tryCreateMatch(gameMode)
    local queue = self.queues[gameMode]
    if not queue or #queue < GAME_MODES[gameMode].minPlayers then
        return false
    end
    
    -- Sort queue by MMR
    table.sort(queue, function(a, b)
        return a.mmr < b.mmr
    end)
    
    -- Find players within skill range
    local matchPlayers = {}
    local baseMMR = queue[1].mmr
    
    for _, queueData in ipairs(queue) do
        if #matchPlayers >= GAME_MODES[gameMode].maxPlayers then
            break
        end
        
        if math.abs(queueData.mmr - baseMMR) <= SKILL_RANGE then
            table.insert(matchPlayers, queueData)
        end
    end
    
    -- Check if we have enough players
    if #matchPlayers >= GAME_MODES[gameMode].minPlayers then
        self:createMatch(gameMode, matchPlayers)
        return true
    end
    
    return false
end

function MatchmakingSystem:createMatch(gameMode, players)
    local matchId = "match_" .. tick() .. "_" .. math.random(1000, 9999)
    
    local match = {
        id = matchId,
        gameMode = gameMode,
        players = {},
        teams = {},
        startTime = tick(),
        endTime = nil,
        status = "Starting",
        settings = GAME_MODES[gameMode]
    }
    
    -- Add players to match
    for _, queueData in ipairs(players) do
        table.insert(match.players, queueData.player)
        
        -- Remove from queue
        self:removePlayerFromQueues(queueData.player)
    end
    
    -- Create teams if needed
    if gameMode == "TEAM_DEATHMATCH" or gameMode == "CAPTURE_THE_FLAG" then
        self:createTeamsForMatch(match)
    end
    
    -- Store active match
    self.activeMatches[matchId] = match
    
    -- Fire match created event
    self:fireMatchEvent("MatchCreated", match)
    
    -- Start match
    self:startMatch(match)
    
    print("Created match", matchId, "with", #match.players, "players")
end

function MatchmakingSystem:createTeamsForMatch(match)
    local players = match.players
    local teamCount = 2
    
    -- Shuffle players
    for i = #players, 2, -1 do
        local j = math.random(i)
        players[i], players[j] = players[j], players[i]
    end
    
    -- Distribute players to teams
    for i, player in ipairs(players) do
        local teamIndex = ((i - 1) % teamCount) + 1
        
        if not match.teams[teamIndex] then
            match.teams[teamIndex] = {
                name = "Team " .. teamIndex,
                players = {},
                score = 0
            }
        end
        
        table.insert(match.teams[teamIndex].players, player)
    end
    
    print("Created", teamCount, "teams for match", match.id)
end

function MatchmakingSystem:startMatch(match)
    match.status = "Active"
    
    -- Fire match started event
    self:fireMatchEvent("MatchStarted", match)
    
    -- Set match timer
    spawn(function()
        wait(match.settings.duration)
        self:endMatch(match)
    end)
    
    print("Started match", match.id)
end

function MatchmakingSystem:endMatch(match)
    match.status = "Ended"
    match.endTime = tick()
    
    -- Calculate results
    local results = self:calculateMatchResults(match)
    
    -- Update player MMR
    self:updatePlayerMMR(match, results)
    
    -- Store match history
    self:storeMatchHistory(match, results)
    
    -- Fire match ended event
    self:fireMatchEvent("MatchEnded", match, results)
    
    -- Clean up match
    self.activeMatches[match.id] = nil
    
    print("Ended match", match.id)
end

function MatchmakingSystem:calculateMatchResults(match)
    local results = {
        winners = {},
        losers = {},
        scores = {},
        duration = match.endTime - match.startTime
    }
    
    if match.teams and #match.teams > 0 then
        -- Team-based match
        local winningTeam = nil
        local highestScore = -1
        
        for _, team in pairs(match.teams) do
            if team.score > highestScore then
                highestScore = team.score
                winningTeam = team
            end
        end
        
        for _, team in pairs(match.teams) do
            if team == winningTeam then
                for _, player in ipairs(team.players) do
                    table.insert(results.winners, player)
                end
            else
                for _, player in ipairs(team.players) do
                    table.insert(results.losers, player)
                end
            end
        end
    else
        -- Free-for-all match
        -- This would need to be implemented based on game mode
        results.winners = match.players
    end
    
    return results
end

function MatchmakingSystem:updatePlayerMMR(match, results)
    for _, player in ipairs(results.winners) do
        self.playerMMR[player.UserId] = (self.playerMMR[player.UserId] or 1000) + 25
    end
    
    for _, player in ipairs(results.losers) do
        self.playerMMR[player.UserId] = math.max(0, (self.playerMMR[player.UserId] or 1000) - 25)
    end
end

function MatchmakingSystem:storeMatchHistory(match, results)
    local historyEntry = {
        matchId = match.id,
        gameMode = match.gameMode,
        players = match.players,
        results = results,
        startTime = match.startTime,
        endTime = match.endTime,
        duration = results.duration
    }
    
    table.insert(self.matchHistory, historyEntry)
    
    -- Keep only last 100 matches
    if #self.matchHistory > 100 then
        table.remove(self.matchHistory, 1)
    end
end

function MatchmakingSystem:setGameMode(gameMode)
    if GAME_MODES[gameMode] then
        self.currentGameMode = GAME_MODES[gameMode]
        self:fireGameModeEvent("GameModeChanged", gameMode)
        print("Changed game mode to", gameMode)
    end
end

function MatchmakingSystem:getPlayerMMR(player)
    return self.playerMMR[player.UserId] or 1000
end

function MatchmakingSystem:getQueueStatus(gameMode)
    local queue = self.queues[gameMode]
    if not queue then
        return 0
    end
    
    return #queue
end

function MatchmakingSystem:fireQueueEvent(eventName, player, gameMode)
    local remoteEvent = ReplicatedStorage:FindFirstChild("QueueEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "QueueEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireClient(player, {
        event = eventName,
        gameMode = gameMode,
        queueSize = self:getQueueStatus(gameMode),
        timestamp = tick()
    })
end

function MatchmakingSystem:fireMatchEvent(eventName, match, results)
    local remoteEvent = ReplicatedStorage:FindFirstChild("MatchEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "MatchEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireAllClients({
        event = eventName,
        match = match,
        results = results,
        timestamp = tick()
    })
end

function MatchmakingSystem:fireGameModeEvent(eventName, gameMode)
    local remoteEvent = ReplicatedStorage:FindFirstChild("GameModeEvent")
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = "GameModeEvent"
        remoteEvent.Parent = ReplicatedStorage
    end
    
    remoteEvent:FireAllClients({
        event = eventName,
        gameMode = gameMode,
        timestamp = tick()
    })
end

-- 4. DEMO THE SYSTEMS
print("\\n4. RUNNING SYSTEM DEMONSTRATIONS...")

-- Create systems
local spawnSystem = SpawnSystem.new()
local teamManager = TeamManager.new()
local matchmakingSystem = MatchmakingSystem.new()

-- Add spawn points
spawnSystem:addSpawnPoint("Team1Spawn", Vector3.new(0, 5, 0), {
    enabled = true,
    priority = 100,
    team = nil,
    capacity = 5,
    effects = {
        {type = "particle", texture = "rbxasset://textures/particles/fire_main.dds", color = Color3.fromRGB(255, 0, 0)}
    }
})

spawnSystem:addSpawnPoint("Team2Spawn", Vector3.new(50, 5, 0), {
    enabled = true,
    priority = 100,
    team = nil,
    capacity = 5,
    effects = {
        {type = "particle", texture = "rbxasset://textures/particles/fire_main.dds", color = Color3.fromRGB(0, 0, 255)}
    }
})

-- Create teams
local redTeam = teamManager:createTeam("Red Team", Color3.fromRGB(255, 0, 0), {
    maxSize = 4,
    autoAssignable = true
})

local blueTeam = teamManager:createTeam("Blue Team", Color3.fromRGB(0, 0, 255), {
    maxSize = 4,
    autoAssignable = true
})

-- Test systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    -- Add player to deathmatch queue
    matchmakingSystem:addPlayerToQueue(player, "DEATHMATCH")
    
    print("Applied all system tests to", player.Name)
end)

print("\\n=== PLAYER SPAWNING & TEAM MANAGEMENT DEMO COMPLETE ===")
print("You've learned player spawning, team management, and matchmaking systems!")`,
    challenge: {
      tests: [
        { description: 'Create spawn system with protection and effects', type: 'code_contains', value: 'spawnPlayerAtPoint' },
        { description: 'Implement team management with leaders and balancing', type: 'code_contains', value: 'addPlayerToTeam' },
        { description: 'Build matchmaking system with queues and MMR', type: 'code_contains', value: 'addPlayerToQueue' }
      ],
      hints: [
        'Use character:SetPrimaryPartCFrame() to position players at spawn points',
        'Use Teams service to create and manage team objects',
        'Implement MMR (Matchmaking Rating) for skill-based matching',
        'Use RemoteEvents to communicate spawn and team events to clients',
        'Create spawn protection with temporary invincibility and visual effects'
      ],
      successMessage: 'Excellent! You now understand player spawning, team management, and matchmaking systems. These skills are essential for creating competitive multiplayer experiences!'
    }
  },

  // === MODULESCRIPT & CODE ORGANIZATION ===
  'modulescript-architecture': {
    title: 'ModuleScript Architecture & Code Organization',
    description: 'Master ModuleScript design patterns and code organization for scalable projects',
    sections: [
      {
        title: 'ModuleScript Fundamentals',
        content: `ModuleScripts are the foundation of organized, reusable code in Roblox. They allow you to create libraries, share code between scripts, and build maintainable projects.

**Core ModuleScript Concepts:**
- **Module Structure**: How to organize and structure your modules
- **Return Values**: What to return and how to expose functionality
- **Require System**: How the require() function works
- **Module Loading**: Understanding when and how modules are loaded
- **Module Lifecycle**: Creation, caching, and destruction

**ModuleScript Best Practices:**
- **Single Responsibility**: Each module should have one clear purpose
- **Clear Interfaces**: Expose only what's necessary through return values
- **Error Handling**: Proper error handling and validation
- **Documentation**: Clear comments and documentation
- **Performance**: Efficient module design and caching`,
        codeExample: `-- Advanced ModuleScript architecture example

--[[
    PlayerDataManager Module
    Manages player data with caching, validation, and persistence
]]

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local RunService = game:GetService("RunService")

local PlayerDataManager = {}
PlayerDataManager.__index = PlayerDataManager

-- Module configuration
local CONFIG = {
    DATASTORE_NAME = "PlayerData_v1",
    CACHE_DURATION = 300, -- 5 minutes
    AUTO_SAVE_INTERVAL = 60, -- 1 minute
    MAX_RETRIES = 3,
    RETRY_DELAY = 1
}

-- Data templates
local DEFAULT_DATA = {
    level = 1,
    experience = 0,
    coins = 100,
    inventory = {},
    settings = {
        musicVolume = 0.5,
        sfxVolume = 0.7,
        graphics = "Medium"
    },
    statistics = {
        playTime = 0,
        gamesPlayed = 0,
        highScore = 0
    }
}

-- Private variables
local playerDataCache = {}
local dataStore = DataStoreService:GetDataStore(CONFIG.DATASTORE_NAME)
local autoSaveConnections = {}

-- Private helper functions
local function validateData(data)
    if not data or type(data) ~= "table" then
        return false, "Invalid data type"
    end
    
    -- Validate required fields
    for key, defaultValue in pairs(DEFAULT_DATA) do
        if data[key] == nil then
            data[key] = defaultValue
        end
    end
    
    return true, "Data validated"
end

local function deepCopy(original)
    local copy = {}
    for key, value in pairs(original) do
        if type(value) == "table" then
            copy[key] = deepCopy(value)
        else
            copy[key] = value
        end
    end
    return copy
end

local function logError(player, operation, error)
    warn(string.format("[PlayerDataManager] Error for %s during %s: %s", 
        player.Name, operation, tostring(error)))
end

-- Public interface
function PlayerDataManager.new()
    local self = setmetatable({}, PlayerDataManager)
    
    -- Initialize module
    self:setupEvents()
    
    return self
end

function PlayerDataManager:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function PlayerDataManager:initializePlayer(player)
    -- Load player data
    local success, data = self:loadPlayerData(player)
    
    if success then
        playerDataCache[player.UserId] = {
            data = data,
            lastAccessed = tick(),
            isDirty = false
        }
        
        -- Start auto-save
        self:startAutoSave(player)
        
        print(string.format("Initialized data for %s", player.Name))
    else
        warn(string.format("Failed to initialize data for %s", player.Name))
    end
end

function PlayerDataManager:cleanupPlayer(player)
    -- Save data before cleanup
    self:savePlayerData(player)
    
    -- Clean up cache
    playerDataCache[player.UserId] = nil
    
    -- Stop auto-save
    self:stopAutoSave(player)
    
    print(string.format("Cleaned up data for %s", player.Name))
end

function PlayerDataManager:loadPlayerData(player)
    local retries = 0
    
    while retries < CONFIG.MAX_RETRIES do
        local success, result = pcall(function()
            return dataStore:GetAsync(player.UserId)
        end)
        
        if success then
            if result then
                local isValid, message = validateData(result)
                if isValid then
                    return true, result
                else
                    logError(player, "validation", message)
                    return true, deepCopy(DEFAULT_DATA)
                end
            else
                -- No existing data, return default
                return true, deepCopy(DEFAULT_DATA)
            end
        else
            retries = retries + 1
            logError(player, "load", result)
            
            if retries < CONFIG.MAX_RETRIES then
                wait(CONFIG.RETRY_DELAY * retries)
            end
        end
    end
    
    -- All retries failed, return default data
    return false, deepCopy(DEFAULT_DATA)
end

function PlayerDataManager:savePlayerData(player)
    local cacheEntry = playerDataCache[player.UserId]
    if not cacheEntry or not cacheEntry.isDirty then
        return true -- Nothing to save
    end
    
    local retries = 0
    
    while retries < CONFIG.MAX_RETRIES do
        local success, result = pcall(function()
            dataStore:SetAsync(player.UserId, cacheEntry.data)
        end)
        
        if success then
            cacheEntry.isDirty = false
            cacheEntry.lastAccessed = tick()
            return true
        else
            retries = retries + 1
            logError(player, "save", result)
            
            if retries < CONFIG.MAX_RETRIES then
                wait(CONFIG.RETRY_DELAY * retries)
            end
        end
    end
    
    return false
end

function PlayerDataManager:getPlayerData(player, key)
    local cacheEntry = playerDataCache[player.UserId]
    if not cacheEntry then
        return nil
    end
    
    cacheEntry.lastAccessed = tick()
    
    if key then
        return cacheEntry.data[key]
    else
        return deepCopy(cacheEntry.data)
    end
end

function PlayerDataManager:setPlayerData(player, key, value)
    local cacheEntry = playerDataCache[player.UserId]
    if not cacheEntry then
        return false
    end
    
    -- Validate the change
    if key == "level" and (type(value) ~= "number" or value < 1) then
        return false, "Invalid level value"
    elseif key == "coins" and (type(value) ~= "number" or value < 0) then
        return false, "Invalid coins value"
    end
    
    -- Update data
    cacheEntry.data[key] = value
    cacheEntry.isDirty = true
    cacheEntry.lastAccessed = tick()
    
    return true
end

function PlayerDataManager:incrementPlayerData(player, key, amount)
    local currentValue = self:getPlayerData(player, key)
    if currentValue == nil then
        return false, "Key not found"
    end
    
    if type(currentValue) ~= "number" then
        return false, "Cannot increment non-numeric value"
    end
    
    return self:setPlayerData(player, key, currentValue + (amount or 1))
end

function PlayerDataManager:startAutoSave(player)
    if autoSaveConnections[player.UserId] then
        return -- Already running
    end
    
    autoSaveConnections[player.UserId] = RunService.Heartbeat:Connect(function()
        local cacheEntry = playerDataCache[player.UserId]
        if cacheEntry and cacheEntry.isDirty then
            if tick() - cacheEntry.lastAccessed > CONFIG.AUTO_SAVE_INTERVAL then
                self:savePlayerData(player)
            end
        end
    end)
end

function PlayerDataManager:stopAutoSave(player)
    local connection = autoSaveConnections[player.UserId]
    if connection then
        connection:Disconnect()
        autoSaveConnections[player.UserId] = nil
    end
end

function PlayerDataManager:getAllPlayerData()
    local allData = {}
    for userId, cacheEntry in pairs(playerDataCache) do
        local player = Players:GetPlayerByUserId(userId)
        if player then
            allData[player.Name] = deepCopy(cacheEntry.data)
        end
    end
    return allData
end

function PlayerDataManager:clearCache()
    playerDataCache = {}
    print("Player data cache cleared")
end

-- Return the module
return PlayerDataManager`,
        color: 'blue'
      },
      {
        title: 'Code Organization Patterns',
        content: `Organize your code using proven patterns and architectures for maintainable, scalable projects.

**Organization Patterns:**
- **MVC Pattern**: Model-View-Controller separation
- **Service Layer**: Business logic separation
- **Repository Pattern**: Data access abstraction
- **Factory Pattern**: Object creation management
- **Observer Pattern**: Event-driven communication
- **Singleton Pattern**: Single instance management

**Project Structure:**
- **Folder Organization**: Logical grouping of related code
- **Naming Conventions**: Consistent naming across the project
- **Dependency Management**: Clear dependency relationships
- **Interface Design**: Clean APIs between modules
- **Error Handling**: Consistent error handling strategies`,
        codeExample: `-- Code organization patterns example

--[[
    Game Architecture Example
    Demonstrates MVC pattern, service layer, and repository pattern
]]

-- === MODELS (Data Layer) ===
local PlayerModel = {}
PlayerModel.__index = PlayerModel

function PlayerModel.new(playerData)
    local self = setmetatable({}, PlayerModel)
    
    self.id = playerData.id
    self.name = playerData.name
    self.level = playerData.level or 1
    self.experience = playerData.experience or 0
    self.coins = playerData.coins or 100
    self.inventory = playerData.inventory or {}
    self.settings = playerData.settings or {}
    
    return self
end

function PlayerModel:addExperience(amount)
    self.experience = self.experience + amount
    
    -- Check for level up
    local requiredExp = self.level * 100
    if self.experience >= requiredExp then
        self:levelUp()
    end
end

function PlayerModel:levelUp()
    self.level = self.level + 1
    self.experience = 0
    self.coins = self.coins + 50 -- Level up bonus
end

function PlayerModel:addCoins(amount)
    self.coins = self.coins + amount
end

function PlayerModel:spendCoins(amount)
    if self.coins >= amount then
        self.coins = self.coins - amount
        return true
    end
    return false
end

function PlayerModel:addItem(itemId, quantity)
    if self.inventory[itemId] then
        self.inventory[itemId] = self.inventory[itemId] + quantity
    else
        self.inventory[itemId] = quantity
    end
end

function PlayerModel:removeItem(itemId, quantity)
    if self.inventory[itemId] and self.inventory[itemId] >= quantity then
        self.inventory[itemId] = self.inventory[itemId] - quantity
        if self.inventory[itemId] <= 0 then
            self.inventory[itemId] = nil
        end
        return true
    end
    return false
end

function PlayerModel:toTable()
    return {
        id = self.id,
        name = self.name,
        level = self.level,
        experience = self.experience,
        coins = self.coins,
        inventory = self.inventory,
        settings = self.settings
    }
end

-- === REPOSITORIES (Data Access Layer) ===
local PlayerRepository = {}
PlayerRepository.__index = PlayerRepository

function PlayerRepository.new()
    local self = setmetatable({}, PlayerRepository)
    
    self.dataStore = game:GetService("DataStoreService"):GetDataStore("Players_v1")
    self.cache = {}
    
    return self
end

function PlayerRepository:findById(playerId)
    -- Check cache first
    if self.cache[playerId] then
        return self.cache[playerId]
    end
    
    -- Load from data store
    local success, data = pcall(function()
        return self.dataStore:GetAsync(playerId)
    end)
    
    if success and data then
        local player = PlayerModel.new(data)
        self.cache[playerId] = player
        return player
    end
    
    return nil
end

function PlayerRepository:save(player)
    local success, result = pcall(function()
        self.dataStore:SetAsync(player.id, player:toTable())
    end)
    
    if success then
        self.cache[player.id] = player
        return true
    else
        warn("Failed to save player data:", result)
        return false
    end
end

function PlayerRepository:delete(playerId)
    local success, result = pcall(function()
        self.dataStore:RemoveAsync(playerId)
    end)
    
    if success then
        self.cache[playerId] = nil
        return true
    else
        warn("Failed to delete player data:", result)
        return false
    end
end

-- === SERVICES (Business Logic Layer) ===
local PlayerService = {}
PlayerService.__index = PlayerService

function PlayerService.new()
    local self = setmetatable({}, PlayerService)
    
    self.repository = PlayerRepository.new()
    self.players = {}
    
    return self
end

function PlayerService:createPlayer(playerId, playerName)
    local playerData = {
        id = playerId,
        name = playerName,
        level = 1,
        experience = 0,
        coins = 100,
        inventory = {},
        settings = {}
    }
    
    local player = PlayerModel.new(playerData)
    self.players[playerId] = player
    
    -- Save to repository
    self.repository:save(player)
    
    return player
end

function PlayerService:getPlayer(playerId)
    if self.players[playerId] then
        return self.players[playerId]
    end
    
    local player = self.repository:findById(playerId)
    if player then
        self.players[playerId] = player
    end
    
    return player
end

function PlayerService:addExperience(playerId, amount)
    local player = self:getPlayer(playerId)
    if not player then
        return false, "Player not found"
    end
    
    local oldLevel = player.level
    player:addExperience(amount)
    
    -- Save changes
    self.repository:save(player)
    
    -- Fire level up event if applicable
    if player.level > oldLevel then
        self:fireLevelUpEvent(player)
    end
    
    return true
end

function PlayerService:purchaseItem(playerId, itemId, cost, quantity)
    local player = self:getPlayer(playerId)
    if not player then
        return false, "Player not found"
    end
    
    if not player:spendCoins(cost) then
        return false, "Insufficient coins"
    end
    
    player:addItem(itemId, quantity or 1)
    
    -- Save changes
    self.repository:save(player)
    
    return true
end

function PlayerService:fireLevelUpEvent(player)
    -- This would typically fire a RemoteEvent or use a proper event system
    print(string.format("%s leveled up to level %d!", player.name, player.level))
end

-- === CONTROLLERS (Application Logic Layer) ===
local PlayerController = {}
PlayerController.__index = PlayerController

function PlayerController.new()
    local self = setmetatable({}, PlayerController)
    
    self.service = PlayerService.new()
    self.players = game:GetService("Players")
    
    self:setupEvents()
    
    return self
end

function PlayerController:setupEvents()
    self.players.PlayerAdded:Connect(function(player)
        self:onPlayerAdded(player)
    end)
    
    self.players.PlayerRemoving:Connect(function(player)
        self:onPlayerRemoving(player)
    end)
end

function PlayerController:onPlayerAdded(player)
    -- Try to load existing player or create new one
    local existingPlayer = self.service:getPlayer(player.UserId)
    
    if not existingPlayer then
        existingPlayer = self.service:createPlayer(player.UserId, player.Name)
        print(string.format("Created new player: %s", player.Name))
    else
        print(string.format("Loaded existing player: %s", player.Name))
    end
    
    -- Send player data to client
    self:sendPlayerDataToClient(player, existingPlayer)
end

function PlayerController:onPlayerRemoving(player)
    local playerData = self.service:getPlayer(player.UserId)
    if playerData then
        self.service.repository:save(playerData)
        print(string.format("Saved data for: %s", player.Name))
    end
end

function PlayerController:sendPlayerDataToClient(player, playerData)
    -- This would typically use a RemoteEvent
    print(string.format("Sending data to %s: Level %d, %d coins", 
        player.Name, playerData.level, playerData.coins))
end

function PlayerController:handleExperienceGain(playerId, amount)
    local success, message = self.service:addExperience(playerId, amount)
    if success then
        local player = self.players:GetPlayerByUserId(playerId)
        if player then
            self:sendPlayerDataToClient(player, self.service:getPlayer(playerId))
        end
    else
        warn("Failed to add experience:", message)
    end
end

function PlayerController:handleItemPurchase(playerId, itemId, cost, quantity)
    local success, message = self.service:purchaseItem(playerId, itemId, cost, quantity)
    if success then
        local player = self.players:GetPlayerByUserId(playerId)
        if player then
            self:sendPlayerDataToClient(player, self.service:getPlayer(playerId))
        end
    else
        warn("Failed to purchase item:", message)
    end
end

-- === FACTORY (Object Creation) ===
local GameFactory = {}
GameFactory.__index = GameFactory

function GameFactory.new()
    local self = setmetatable({}, GameFactory)
    return self
end

function GameFactory:createPlayerController()
    return PlayerController.new()
end

function GameFactory:createPlayerService()
    return PlayerService.new()
end

function GameFactory:createPlayerRepository()
    return PlayerRepository.new()
end

-- === SINGLETON (Global Access) ===
local GameManager = {}
GameManager.__index = GameManager

local instance = nil

function GameManager.getInstance()
    if not instance then
        instance = GameManager.new()
    end
    return instance
end

function GameManager.new()
    local self = setmetatable({}, GameManager)
    
    self.factory = GameFactory.new()
    self.playerController = self.factory:createPlayerController()
    
    return self
end

function GameManager:getPlayerController()
    return self.playerController
end

-- Initialize the game
local gameManager = GameManager.getInstance()

print("Game architecture initialized with MVC pattern")`,
        color: 'green'
      },
      {
        title: 'Version Control & Code Libraries',
        content: `Implement version control and code library systems for collaborative development and code reuse.

**Version Control Concepts:**
- **Module Versioning**: Track versions of your modules
- **Backward Compatibility**: Maintain compatibility with older versions
- **Migration Systems**: Handle data structure changes
- **Rollback Mechanisms**: Revert to previous versions if needed
- **Change Logging**: Track what changed between versions

**Code Library Management:**
- **Library Organization**: Structure reusable code libraries
- **Dependency Management**: Handle module dependencies
- **Documentation Systems**: Auto-generate documentation
- **Testing Frameworks**: Unit testing for modules
- **Code Quality**: Linting and style checking`,
        codeExample: `-- Version control and code library system

--[[
    Version Control System for Modules
    Handles versioning, migration, and compatibility
]]

local VersionControl = {}
VersionControl.__index = VersionControl

-- Version configuration
local VERSION_CONFIG = {
    CURRENT_VERSION = "1.2.0",
    SUPPORTED_VERSIONS = {"1.0.0", "1.1.0", "1.2.0"},
    MIGRATION_SCRIPTS = {
        ["1.0.0"] = "1.1.0",
        ["1.1.0"] = "1.2.0"
    }
}

-- Version history
local VERSION_HISTORY = {
    ["1.0.0"] = {
        date = "2024-01-01",
        changes = {
            "Initial release",
            "Basic player data system",
            "Simple inventory management"
        },
        breakingChanges = {}
    },
    ["1.1.0"] = {
        date = "2024-02-01",
        changes = {
            "Added experience system",
            "Improved inventory with categories",
            "Added player settings"
        },
        breakingChanges = {
            "inventory structure changed from array to object"
        }
    },
    ["1.2.0"] = {
        date = "2024-03-01",
        changes = {
            "Added achievement system",
            "Improved data validation",
            "Added auto-save functionality"
        },
        breakingChanges = {
            "playerData.settings structure updated"
        }
    }
}

function VersionControl.new()
    local self = setmetatable({}, VersionControl)
    
    self.currentVersion = VERSION_CONFIG.CURRENT_VERSION
    self.supportedVersions = VERSION_CONFIG.SUPPORTED_VERSIONS
    self.migrationScripts = VERSION_CONFIG.MIGRATION_SCRIPTS
    
    return self
end

function VersionControl:getCurrentVersion()
    return self.currentVersion
end

function VersionControl:isVersionSupported(version)
    for _, supportedVersion in ipairs(self.supportedVersions) do
        if supportedVersion == version then
            return true
        end
    end
    return false
end

function VersionControl:compareVersions(version1, version2)
    local v1Parts = self:parseVersion(version1)
    local v2Parts = self:parseVersion(version2)
    
    for i = 1, 3 do
        if v1Parts[i] > v2Parts[i] then
            return 1
        elseif v1Parts[i] < v2Parts[i] then
            return -1
        end
    end
    
    return 0
end

function VersionControl:parseVersion(version)
    local parts = {}
    for part in string.gmatch(version, "%d+") do
        table.insert(parts, tonumber(part))
    end
    return parts
end

function VersionControl:migrateData(data, fromVersion, toVersion)
    if not self:isVersionSupported(fromVersion) then
        return false, "Source version not supported"
    end
    
    if not self:isVersionSupported(toVersion) then
        return false, "Target version not supported"
    end
    
    local currentVersion = fromVersion
    local migratedData = self:deepCopy(data)
    
    -- Apply migrations step by step
    while currentVersion ~= toVersion do
        local nextVersion = self.migrationScripts[currentVersion]
        if not nextVersion then
            return false, "No migration path found"
        end
        
        local success, result = self:applyMigration(migratedData, currentVersion, nextVersion)
        if not success then
            return false, result
        end
        
        currentVersion = nextVersion
    end
    
    return true, migratedData
end

function VersionControl:applyMigration(data, fromVersion, toVersion)
    local migrationKey = fromVersion .. "_to_" .. toVersion
    
    if migrationKey == "1.0.0_to_1.1.0" then
        return self:migrate_1_0_0_to_1_1_0(data)
    elseif migrationKey == "1.1.0_to_1.2.0" then
        return self:migrate_1_1_0_to_1_2_0(data)
    else
        return false, "Migration not implemented"
    end
end

function VersionControl:migrate_1_0_0_to_1_1_0(data)
    -- Convert inventory from array to object
    if data.inventory and type(data.inventory) == "table" then
        local newInventory = {}
        for i, item in ipairs(data.inventory) do
            if type(item) == "string" then
                newInventory[item] = 1
            elseif type(item) == "table" then
                newInventory[item.id] = item.quantity or 1
            end
        end
        data.inventory = newInventory
    end
    
    -- Add experience system
    data.experience = data.experience or 0
    
    -- Add settings
    data.settings = data.settings or {
        musicVolume = 0.5,
        sfxVolume = 0.7
    }
    
    return true, data
end

function VersionControl:migrate_1_1_0_to_1_2_0(data)
    -- Update settings structure
    if data.settings then
        data.settings.graphics = data.settings.graphics or "Medium"
        data.settings.language = data.settings.language or "English"
    end
    
    -- Add achievement system
    data.achievements = data.achievements or {}
    
    -- Add statistics
    data.statistics = data.statistics or {
        playTime = 0,
        gamesPlayed = 0,
        highScore = 0
    }
    
    return true, data
end

function VersionControl:deepCopy(original)
    local copy = {}
    for key, value in pairs(original) do
        if type(value) == "table" then
            copy[key] = self:deepCopy(value)
        else
            copy[key] = value
        end
    end
    return copy
end

function VersionControl:getVersionHistory(version)
    return VERSION_HISTORY[version]
end

function VersionControl:getAllVersions()
    local versions = {}
    for version, _ in pairs(VERSION_HISTORY) do
        table.insert(versions, version)
    end
    table.sort(versions, function(a, b)
        return self:compareVersions(a, b) < 0
    end)
    return versions
end

-- === CODE LIBRARY SYSTEM ===
local CodeLibrary = {}
CodeLibrary.__index = CodeLibrary

function CodeLibrary.new()
    local self = setmetatable({}, CodeLibrary)
    
    self.libraries = {}
    self.dependencies = {}
    
    return self
end

function CodeLibrary:registerLibrary(name, version, module, dependencies)
    self.libraries[name] = {
        version = version,
        module = module,
        dependencies = dependencies or {},
        registeredAt = tick()
    }
    
    -- Build dependency graph
    self:buildDependencyGraph()
    
    print(string.format("Registered library: %s v%s", name, version))
end

function CodeLibrary:getLibrary(name, version)
    local library = self.libraries[name]
    if not library then
        return nil, "Library not found"
    end
    
    if version and library.version ~= version then
        return nil, "Version mismatch"
    end
    
    return library.module
end

function CodeLibrary:buildDependencyGraph()
    self.dependencies = {}
    
    for name, library in pairs(self.libraries) do
        self.dependencies[name] = library.dependencies
    end
end

function CodeLibrary:resolveDependencies(libraryName)
    local resolved = {}
    local visited = {}
    
    local function visit(name)
        if visited[name] then
            return -- Already visited
        end
        
        visited[name] = true
        
        local dependencies = self.dependencies[name] or {}
        for _, dep in ipairs(dependencies) do
            visit(dep)
        end
        
        table.insert(resolved, name)
    end
    
    visit(libraryName)
    return resolved
end

function CodeLibrary:validateDependencies(libraryName)
    local dependencies = self.dependencies[libraryName] or {}
    
    for _, dep in ipairs(dependencies) do
        if not self.libraries[dep] then
            return false, string.format("Missing dependency: %s", dep)
        end
    end
    
    return true
end

function CodeLibrary:getLibraryInfo(name)
    local library = self.libraries[name]
    if not library then
        return nil
    end
    
    return {
        name = name,
        version = library.version,
        dependencies = library.dependencies,
        registeredAt = library.registeredAt,
        dependencyCount = #library.dependencies
    }
end

function CodeLibrary:listLibraries()
    local list = {}
    for name, library in pairs(self.libraries) do
        table.insert(list, {
            name = name,
            version = library.version,
            dependencies = library.dependencies
        })
    end
    return list
end

-- === TESTING FRAMEWORK ===
local TestFramework = {}
TestFramework.__index = TestFramework

function TestFramework.new()
    local self = setmetatable({}, TestFramework)
    
    self.tests = {}
    self.results = {}
    
    return self
end

function TestFramework:addTest(name, testFunction)
    self.tests[name] = testFunction
end

function TestFramework:runTest(name)
    local testFunction = self.tests[name]
    if not testFunction then
        return false, "Test not found"
    end
    
    local success, result = pcall(testFunction)
    
    self.results[name] = {
        success = success,
        result = result,
        timestamp = tick()
    }
    
    return success, result
end

function TestFramework:runAllTests()
    local passed = 0
    local failed = 0
    
    for name, _ in pairs(self.tests) do
        local success, result = self:runTest(name)
        if success then
            passed = passed + 1
            print(string.format("✓ %s passed", name))
        else
            failed = failed + 1
            print(string.format("✗ %s failed: %s", name, tostring(result)))
        end
    end
    
    print(string.format("Tests completed: %d passed, %d failed", passed, failed))
    return passed, failed
end

function TestFramework:getTestResults()
    return self.results
end

-- Example usage
local versionControl = VersionControl.new()
local codeLibrary = CodeLibrary.new()
local testFramework = TestFramework.new()

-- Test version control
testFramework:addTest("version_support", function()
    assert(versionControl:isVersionSupported("1.2.0"), "Current version should be supported")
    assert(not versionControl:isVersionSupported("0.9.0"), "Old version should not be supported")
    return true
end)

testFramework:addTest("version_comparison", function()
    assert(versionControl:compareVersions("1.2.0", "1.1.0") > 0, "1.2.0 should be greater than 1.1.0")
    assert(versionControl:compareVersions("1.1.0", "1.2.0") < 0, "1.1.0 should be less than 1.2.0")
    return true
end)

-- Run tests
testFramework:runAllTests()

print("Version control and code library system initialized")`,
        color: 'purple'
      }
    ],
    defaultCode: `-- ModuleScript Architecture & Code Organization - Comprehensive Learning Example
-- Master ModuleScript design patterns and code organization for scalable projects

print("=== MODULESCRIPT ARCHITECTURE & CODE ORGANIZATION DEMO ===")
print("Learning ModuleScript design patterns and code organization...")

-- 1. MODULESCRIPT FUNDAMENTALS
print("\\n1. DEMONSTRATING MODULESCRIPT FUNDAMENTALS...")

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local RunService = game:GetService("RunService")

local PlayerDataManager = {}
PlayerDataManager.__index = PlayerDataManager

-- Module configuration
local CONFIG = {
    DATASTORE_NAME = "PlayerData_v1",
    CACHE_DURATION = 300, -- 5 minutes
    AUTO_SAVE_INTERVAL = 60, -- 1 minute
    MAX_RETRIES = 3,
    RETRY_DELAY = 1
}

-- Data templates
local DEFAULT_DATA = {
    level = 1,
    experience = 0,
    coins = 100,
    inventory = {},
    settings = {
        musicVolume = 0.5,
        sfxVolume = 0.7,
        graphics = "Medium"
    },
    statistics = {
        playTime = 0,
        gamesPlayed = 0,
        highScore = 0
    }
}

-- Private variables
local playerDataCache = {}
local dataStore = DataStoreService:GetDataStore(CONFIG.DATASTORE_NAME)
local autoSaveConnections = {}

-- Private helper functions
local function validateData(data)
    if not data or type(data) ~= "table" then
        return false, "Invalid data type"
    end
    
    -- Validate required fields
    for key, defaultValue in pairs(DEFAULT_DATA) do
        if data[key] == nil then
            data[key] = defaultValue
        end
    end
    
    return true, "Data validated"
end

local function deepCopy(original)
    local copy = {}
    for key, value in pairs(original) do
        if type(value) == "table" then
            copy[key] = deepCopy(value)
        else
            copy[key] = value
        end
    end
    return copy
end

local function logError(player, operation, error)
    warn(string.format("[PlayerDataManager] Error for %s during %s: %s", 
        player.Name, operation, tostring(error)))
end

-- Public interface
function PlayerDataManager.new()
    local self = setmetatable({}, PlayerDataManager)
    
    -- Initialize module
    self:setupEvents()
    
    return self
end

function PlayerDataManager:setupEvents()
    Players.PlayerAdded:Connect(function(player)
        self:initializePlayer(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:cleanupPlayer(player)
    end)
end

function PlayerDataManager:initializePlayer(player)
    -- Load player data
    local success, data = self:loadPlayerData(player)
    
    if success then
        playerDataCache[player.UserId] = {
            data = data,
            lastAccessed = tick(),
            isDirty = false
        }
        
        -- Start auto-save
        self:startAutoSave(player)
        
        print(string.format("Initialized data for %s", player.Name))
    else
        warn(string.format("Failed to initialize data for %s", player.Name))
    end
end

function PlayerDataManager:cleanupPlayer(player)
    -- Save data before cleanup
    self:savePlayerData(player)
    
    -- Clean up cache
    playerDataCache[player.UserId] = nil
    
    -- Stop auto-save
    self:stopAutoSave(player)
    
    print(string.format("Cleaned up data for %s", player.Name))
end

function PlayerDataManager:loadPlayerData(player)
    local retries = 0
    
    while retries < CONFIG.MAX_RETRIES do
        local success, result = pcall(function()
            return dataStore:GetAsync(player.UserId)
        end)
        
        if success then
            if result then
                local isValid, message = validateData(result)
                if isValid then
                    return true, result
                else
                    logError(player, "validation", message)
                    return true, deepCopy(DEFAULT_DATA)
                end
            else
                -- No existing data, return default
                return true, deepCopy(DEFAULT_DATA)
            end
        else
            retries = retries + 1
            logError(player, "load", result)
            
            if retries < CONFIG.MAX_RETRIES then
                wait(CONFIG.RETRY_DELAY * retries)
            end
        end
    end
    
    -- All retries failed, return default data
    return false, deepCopy(DEFAULT_DATA)
end

function PlayerDataManager:savePlayerData(player)
    local cacheEntry = playerDataCache[player.UserId]
    if not cacheEntry or not cacheEntry.isDirty then
        return true -- Nothing to save
    end
    
    local retries = 0
    
    while retries < CONFIG.MAX_RETRIES do
        local success, result = pcall(function()
            dataStore:SetAsync(player.UserId, cacheEntry.data)
        end)
        
        if success then
            cacheEntry.isDirty = false
            cacheEntry.lastAccessed = tick()
            return true
        else
            retries = retries + 1
            logError(player, "save", result)
            
            if retries < CONFIG.MAX_RETRIES then
                wait(CONFIG.RETRY_DELAY * retries)
            end
        end
    end
    
    return false
end

function PlayerDataManager:getPlayerData(player, key)
    local cacheEntry = playerDataCache[player.UserId]
    if not cacheEntry then
        return nil
    end
    
    cacheEntry.lastAccessed = tick()
    
    if key then
        return cacheEntry.data[key]
    else
        return deepCopy(cacheEntry.data)
    end
end

function PlayerDataManager:setPlayerData(player, key, value)
    local cacheEntry = playerDataCache[player.UserId]
    if not cacheEntry then
        return false
    end
    
    -- Validate the change
    if key == "level" and (type(value) ~= "number" or value < 1) then
        return false, "Invalid level value"
    elseif key == "coins" and (type(value) ~= "number" or value < 0) then
        return false, "Invalid coins value"
    end
    
    -- Update data
    cacheEntry.data[key] = value
    cacheEntry.isDirty = true
    cacheEntry.lastAccessed = tick()
    
    return true
end

function PlayerDataManager:incrementPlayerData(player, key, amount)
    local currentValue = self:getPlayerData(player, key)
    if currentValue == nil then
        return false, "Key not found"
    end
    
    if type(currentValue) ~= "number" then
        return false, "Cannot increment non-numeric value"
    end
    
    return self:setPlayerData(player, key, currentValue + (amount or 1))
end

function PlayerDataManager:startAutoSave(player)
    if autoSaveConnections[player.UserId] then
        return -- Already running
    end
    
    autoSaveConnections[player.UserId] = RunService.Heartbeat:Connect(function()
        local cacheEntry = playerDataCache[player.UserId]
        if cacheEntry and cacheEntry.isDirty then
            if tick() - cacheEntry.lastAccessed > CONFIG.AUTO_SAVE_INTERVAL then
                self:savePlayerData(player)
            end
        end
    end)
end

function PlayerDataManager:stopAutoSave(player)
    local connection = autoSaveConnections[player.UserId]
    if connection then
        connection:Disconnect()
        autoSaveConnections[player.UserId] = nil
    end
end

function PlayerDataManager:getAllPlayerData()
    local allData = {}
    for userId, cacheEntry in pairs(playerDataCache) do
        local player = Players:GetPlayerByUserId(userId)
        if player then
            allData[player.Name] = deepCopy(cacheEntry.data)
        end
    end
    return allData
end

function PlayerDataManager:clearCache()
    playerDataCache = {}
    print("Player data cache cleared")
end

-- 2. CODE ORGANIZATION PATTERNS
print("\\n2. DEMONSTRATING CODE ORGANIZATION PATTERNS...")

-- === MODELS (Data Layer) ===
local PlayerModel = {}
PlayerModel.__index = PlayerModel

function PlayerModel.new(playerData)
    local self = setmetatable({}, PlayerModel)
    
    self.id = playerData.id
    self.name = playerData.name
    self.level = playerData.level or 1
    self.experience = playerData.experience or 0
    self.coins = playerData.coins or 100
    self.inventory = playerData.inventory or {}
    self.settings = playerData.settings or {}
    
    return self
end

function PlayerModel:addExperience(amount)
    self.experience = self.experience + amount
    
    -- Check for level up
    local requiredExp = self.level * 100
    if self.experience >= requiredExp then
        self:levelUp()
    end
end

function PlayerModel:levelUp()
    self.level = self.level + 1
    self.experience = 0
    self.coins = self.coins + 50 -- Level up bonus
end

function PlayerModel:addCoins(amount)
    self.coins = self.coins + amount
end

function PlayerModel:spendCoins(amount)
    if self.coins >= amount then
        self.coins = self.coins - amount
        return true
    end
    return false
end

function PlayerModel:addItem(itemId, quantity)
    if self.inventory[itemId] then
        self.inventory[itemId] = self.inventory[itemId] + quantity
    else
        self.inventory[itemId] = quantity
    end
end

function PlayerModel:removeItem(itemId, quantity)
    if self.inventory[itemId] and self.inventory[itemId] >= quantity then
        self.inventory[itemId] = self.inventory[itemId] - quantity
        if self.inventory[itemId] <= 0 then
            self.inventory[itemId] = nil
        end
        return true
    end
    return false
end

function PlayerModel:toTable()
    return {
        id = self.id,
        name = self.name,
        level = self.level,
        experience = self.experience,
        coins = self.coins,
        inventory = self.inventory,
        settings = self.settings
    }
end

-- === REPOSITORIES (Data Access Layer) ===
local PlayerRepository = {}
PlayerRepository.__index = PlayerRepository

function PlayerRepository.new()
    local self = setmetatable({}, PlayerRepository)
    
    self.dataStore = game:GetService("DataStoreService"):GetDataStore("Players_v1")
    self.cache = {}
    
    return self
end

function PlayerRepository:findById(playerId)
    -- Check cache first
    if self.cache[playerId] then
        return self.cache[playerId]
    end
    
    -- Load from data store
    local success, data = pcall(function()
        return self.dataStore:GetAsync(playerId)
    end)
    
    if success and data then
        local player = PlayerModel.new(data)
        self.cache[playerId] = player
        return player
    end
    
    return nil
end

function PlayerRepository:save(player)
    local success, result = pcall(function()
        self.dataStore:SetAsync(player.id, player:toTable())
    end)
    
    if success then
        self.cache[player.id] = player
        return true
    else
        warn("Failed to save player data:", result)
        return false
    end
end

function PlayerRepository:delete(playerId)
    local success, result = pcall(function()
        self.dataStore:RemoveAsync(playerId)
    end)
    
    if success then
        self.cache[playerId] = nil
        return true
    else
        warn("Failed to delete player data:", result)
        return false
    end
end

-- === SERVICES (Business Logic Layer) ===
local PlayerService = {}
PlayerService.__index = PlayerService

function PlayerService.new()
    local self = setmetatable({}, PlayerService)
    
    self.repository = PlayerRepository.new()
    self.players = {}
    
    return self
end

function PlayerService:createPlayer(playerId, playerName)
    local playerData = {
        id = playerId,
        name = playerName,
        level = 1,
        experience = 0,
        coins = 100,
        inventory = {},
        settings = {}
    }
    
    local player = PlayerModel.new(playerData)
    self.players[playerId] = player
    
    -- Save to repository
    self.repository:save(player)
    
    return player
end

function PlayerService:getPlayer(playerId)
    if self.players[playerId] then
        return self.players[playerId]
    end
    
    local player = self.repository:findById(playerId)
    if player then
        self.players[playerId] = player
    end
    
    return player
end

function PlayerService:addExperience(playerId, amount)
    local player = self:getPlayer(playerId)
    if not player then
        return false, "Player not found"
    end
    
    local oldLevel = player.level
    player:addExperience(amount)
    
    -- Save changes
    self.repository:save(player)
    
    -- Fire level up event if applicable
    if player.level > oldLevel then
        self:fireLevelUpEvent(player)
    end
    
    return true
end

function PlayerService:purchaseItem(playerId, itemId, cost, quantity)
    local player = self:getPlayer(playerId)
    if not player then
        return false, "Player not found"
    end
    
    if not player:spendCoins(cost) then
        return false, "Insufficient coins"
    end
    
    player:addItem(itemId, quantity or 1)
    
    -- Save changes
    self.repository:save(player)
    
    return true
end

function PlayerService:fireLevelUpEvent(player)
    -- This would typically fire a RemoteEvent or use a proper event system
    print(string.format("%s leveled up to level %d!", player.name, player.level))
end

-- === CONTROLLERS (Application Logic Layer) ===
local PlayerController = {}
PlayerController.__index = PlayerController

function PlayerController.new()
    local self = setmetatable({}, PlayerController)
    
    self.service = PlayerService.new()
    self.players = game:GetService("Players")
    
    self:setupEvents()
    
    return self
end

function PlayerController:setupEvents()
    self.players.PlayerAdded:Connect(function(player)
        self:onPlayerAdded(player)
    end)
    
    self.players.PlayerRemoving:Connect(function(player)
        self:onPlayerRemoving(player)
    end)
end

function PlayerController:onPlayerAdded(player)
    -- Try to load existing player or create new one
    local existingPlayer = self.service:getPlayer(player.UserId)
    
    if not existingPlayer then
        existingPlayer = self.service:createPlayer(player.UserId, player.Name)
        print(string.format("Created new player: %s", player.Name))
    else
        print(string.format("Loaded existing player: %s", player.Name))
    end
    
    -- Send player data to client
    self:sendPlayerDataToClient(player, existingPlayer)
end

function PlayerController:onPlayerRemoving(player)
    local playerData = self.service:getPlayer(player.UserId)
    if playerData then
        self.service.repository:save(playerData)
        print(string.format("Saved data for: %s", player.Name))
    end
end

function PlayerController:sendPlayerDataToClient(player, playerData)
    -- This would typically use a RemoteEvent
    print(string.format("Sending data to %s: Level %d, %d coins", 
        player.Name, playerData.level, playerData.coins))
end

function PlayerController:handleExperienceGain(playerId, amount)
    local success, message = self.service:addExperience(playerId, amount)
    if success then
        local player = self.players:GetPlayerByUserId(playerId)
        if player then
            self:sendPlayerDataToClient(player, self.service:getPlayer(playerId))
        end
    else
        warn("Failed to add experience:", message)
    end
end

function PlayerController:handleItemPurchase(playerId, itemId, cost, quantity)
    local success, message = self.service:purchaseItem(playerId, itemId, cost, quantity)
    if success then
        local player = self.players:GetPlayerByUserId(playerId)
        if player then
            self:sendPlayerDataToClient(player, self.service:getPlayer(playerId))
        end
    else
        warn("Failed to purchase item:", message)
    end
end

-- === FACTORY (Object Creation) ===
local GameFactory = {}
GameFactory.__index = GameFactory

function GameFactory.new()
    local self = setmetatable({}, GameFactory)
    return self
end

function GameFactory:createPlayerController()
    return PlayerController.new()
end

function GameFactory:createPlayerService()
    return PlayerService.new()
end

function GameFactory:createPlayerRepository()
    return PlayerRepository.new()
end

-- === SINGLETON (Global Access) ===
local GameManager = {}
GameManager.__index = GameManager

local instance = nil

function GameManager.getInstance()
    if not instance then
        instance = GameManager.new()
    end
    return instance
end

function GameManager.new()
    local self = setmetatable({}, GameManager)
    
    self.factory = GameFactory.new()
    self.playerController = self.factory:createPlayerController()
    
    return self
end

function GameManager:getPlayerController()
    return self.playerController
end

-- 3. VERSION CONTROL & CODE LIBRARIES
print("\\n3. DEMONSTRATING VERSION CONTROL & CODE LIBRARIES...")

local VersionControl = {}
VersionControl.__index = VersionControl

-- Version configuration
local VERSION_CONFIG = {
    CURRENT_VERSION = "1.2.0",
    SUPPORTED_VERSIONS = {"1.0.0", "1.1.0", "1.2.0"},
    MIGRATION_SCRIPTS = {
        ["1.0.0"] = "1.1.0",
        ["1.1.0"] = "1.2.0"
    }
}

-- Version history
local VERSION_HISTORY = {
    ["1.0.0"] = {
        date = "2024-01-01",
        changes = {
            "Initial release",
            "Basic player data system",
            "Simple inventory management"
        },
        breakingChanges = {}
    },
    ["1.1.0"] = {
        date = "2024-02-01",
        changes = {
            "Added experience system",
            "Improved inventory with categories",
            "Added player settings"
        },
        breakingChanges = {
            "inventory structure changed from array to object"
        }
    },
    ["1.2.0"] = {
        date = "2024-03-01",
        changes = {
            "Added achievement system",
            "Improved data validation",
            "Added auto-save functionality"
        },
        breakingChanges = {
            "playerData.settings structure updated"
        }
    }
}

function VersionControl.new()
    local self = setmetatable({}, VersionControl)
    
    self.currentVersion = VERSION_CONFIG.CURRENT_VERSION
    self.supportedVersions = VERSION_CONFIG.SUPPORTED_VERSIONS
    self.migrationScripts = VERSION_CONFIG.MIGRATION_SCRIPTS
    
    return self
end

function VersionControl:getCurrentVersion()
    return self.currentVersion
end

function VersionControl:isVersionSupported(version)
    for _, supportedVersion in ipairs(self.supportedVersions) do
        if supportedVersion == version then
            return true
        end
    end
    return false
end

function VersionControl:compareVersions(version1, version2)
    local v1Parts = self:parseVersion(version1)
    local v2Parts = self:parseVersion(version2)
    
    for i = 1, 3 do
        if v1Parts[i] > v2Parts[i] then
            return 1
        elseif v1Parts[i] < v2Parts[i] then
            return -1
        end
    end
    
    return 0
end

function VersionControl:parseVersion(version)
    local parts = {}
    for part in string.gmatch(version, "%d+") do
        table.insert(parts, tonumber(part))
    end
    return parts
end

function VersionControl:migrateData(data, fromVersion, toVersion)
    if not self:isVersionSupported(fromVersion) then
        return false, "Source version not supported"
    end
    
    if not self:isVersionSupported(toVersion) then
        return false, "Target version not supported"
    end
    
    local currentVersion = fromVersion
    local migratedData = self:deepCopy(data)
    
    -- Apply migrations step by step
    while currentVersion ~= toVersion do
        local nextVersion = self.migrationScripts[currentVersion]
        if not nextVersion then
            return false, "No migration path found"
        end
        
        local success, result = self:applyMigration(migratedData, currentVersion, nextVersion)
        if not success then
            return false, result
        end
        
        currentVersion = nextVersion
    end
    
    return true, migratedData
end

function VersionControl:applyMigration(data, fromVersion, toVersion)
    local migrationKey = fromVersion .. "_to_" .. toVersion
    
    if migrationKey == "1.0.0_to_1.1.0" then
        return self:migrate_1_0_0_to_1_1_0(data)
    elseif migrationKey == "1.1.0_to_1_2_0" then
        return self:migrate_1_1_0_to_1_2_0(data)
    else
        return false, "Migration not implemented"
    end
end

function VersionControl:migrate_1_0_0_to_1_1_0(data)
    -- Convert inventory from array to object
    if data.inventory and type(data.inventory) == "table" then
        local newInventory = {}
        for i, item in ipairs(data.inventory) do
            if type(item) == "string" then
                newInventory[item] = 1
            elseif type(item) == "table" then
                newInventory[item.id] = item.quantity or 1
            end
        end
        data.inventory = newInventory
    end
    
    -- Add experience system
    data.experience = data.experience or 0
    
    -- Add settings
    data.settings = data.settings or {
        musicVolume = 0.5,
        sfxVolume = 0.7
    }
    
    return true, data
end

function VersionControl:migrate_1_1_0_to_1_2_0(data)
    -- Update settings structure
    if data.settings then
        data.settings.graphics = data.settings.graphics or "Medium"
        data.settings.language = data.settings.language or "English"
    end
    
    -- Add achievement system
    data.achievements = data.achievements or {}
    
    -- Add statistics
    data.statistics = data.statistics or {
        playTime = 0,
        gamesPlayed = 0,
        highScore = 0
    }
    
    return true, data
end

function VersionControl:deepCopy(original)
    local copy = {}
    for key, value in pairs(original) do
        if type(value) == "table" then
            copy[key] = self:deepCopy(value)
        else
            copy[key] = value
        end
    end
    return copy
end

function VersionControl:getVersionHistory(version)
    return VERSION_HISTORY[version]
end

function VersionControl:getAllVersions()
    local versions = {}
    for version, _ in pairs(VERSION_HISTORY) do
        table.insert(versions, version)
    end
    table.sort(versions, function(a, b)
        return self:compareVersions(a, b) < 0
    end)
    return versions
end

-- === CODE LIBRARY SYSTEM ===
local CodeLibrary = {}
CodeLibrary.__index = CodeLibrary

function CodeLibrary.new()
    local self = setmetatable({}, CodeLibrary)
    
    self.libraries = {}
    self.dependencies = {}
    
    return self
end

function CodeLibrary:registerLibrary(name, version, module, dependencies)
    self.libraries[name] = {
        version = version,
        module = module,
        dependencies = dependencies or {},
        registeredAt = tick()
    }
    
    -- Build dependency graph
    self:buildDependencyGraph()
    
    print(string.format("Registered library: %s v%s", name, version))
end

function CodeLibrary:getLibrary(name, version)
    local library = self.libraries[name]
    if not library then
        return nil, "Library not found"
    end
    
    if version and library.version ~= version then
        return nil, "Version mismatch"
    end
    
    return library.module
end

function CodeLibrary:buildDependencyGraph()
    self.dependencies = {}
    
    for name, library in pairs(self.libraries) do
        self.dependencies[name] = library.dependencies
    end
end

function CodeLibrary:resolveDependencies(libraryName)
    local resolved = {}
    local visited = {}
    
    local function visit(name)
        if visited[name] then
            return -- Already visited
        end
        
        visited[name] = true
        
        local dependencies = self.dependencies[name] or {}
        for _, dep in ipairs(dependencies) do
            visit(dep)
        end
        
        table.insert(resolved, name)
    end
    
    visit(libraryName)
    return resolved
end

function CodeLibrary:validateDependencies(libraryName)
    local dependencies = self.dependencies[libraryName] or {}
    
    for _, dep in ipairs(dependencies) do
        if not self.libraries[dep] then
            return false, string.format("Missing dependency: %s", dep)
        end
    end
    
    return true
end

function CodeLibrary:getLibraryInfo(name)
    local library = self.libraries[name]
    if not library then
        return nil
    end
    
    return {
        name = name,
        version = library.version,
        dependencies = library.dependencies,
        registeredAt = library.registeredAt,
        dependencyCount = #library.dependencies
    }
end

function CodeLibrary:listLibraries()
    local list = {}
    for name, library in pairs(self.libraries) do
        table.insert(list, {
            name = name,
            version = library.version,
            dependencies = library.dependencies
        })
    end
    return list
end

-- === TESTING FRAMEWORK ===
local TestFramework = {}
TestFramework.__index = TestFramework

function TestFramework.new()
    local self = setmetatable({}, TestFramework)
    
    self.tests = {}
    self.results = {}
    
    return self
end

function TestFramework:addTest(name, testFunction)
    self.tests[name] = testFunction
end

function TestFramework:runTest(name)
    local testFunction = self.tests[name]
    if not testFunction then
        return false, "Test not found"
    end
    
    local success, result = pcall(testFunction)
    
    self.results[name] = {
        success = success,
        result = result,
        timestamp = tick()
    }
    
    return success, result
end

function TestFramework:runAllTests()
    local passed = 0
    local failed = 0
    
    for name, _ in pairs(self.tests) do
        local success, result = self:runTest(name)
        if success then
            passed = passed + 1
            print(string.format("✓ %s passed", name))
        else
            failed = failed + 1
            print(string.format("✗ %s failed: %s", name, tostring(result)))
        end
    end
    
    print(string.format("Tests completed: %d passed, %d failed", passed, failed))
    return passed, failed
end

function TestFramework:getTestResults()
    return self.results
end

-- 4. DEMO THE SYSTEMS
print("\\n4. RUNNING SYSTEM DEMONSTRATIONS...")

-- Create systems
local playerDataManager = PlayerDataManager.new()
local gameManager = GameManager.getInstance()
local versionControl = VersionControl.new()
local codeLibrary = CodeLibrary.new()
local testFramework = TestFramework.new()

-- Test version control
testFramework:addTest("version_support", function()
    assert(versionControl:isVersionSupported("1.2.0"), "Current version should be supported")
    assert(not versionControl:isVersionSupported("0.9.0"), "Old version should not be supported")
    return true
end)

testFramework:addTest("version_comparison", function()
    assert(versionControl:compareVersions("1.2.0", "1.1.0") > 0, "1.2.0 should be greater than 1.1.0")
    assert(versionControl:compareVersions("1.1.0", "1.2.0") < 0, "1.1.0 should be less than 1.2.0")
    return true
end)

-- Test data migration
testFramework:addTest("data_migration", function()
    local oldData = {
        level = 5,
        coins = 1000,
        inventory = {"sword", "potion", "shield"}
    }
    
    local success, migratedData = versionControl:migrateData(oldData, "1.0.0", "1.2.0")
    assert(success, "Migration should succeed")
    assert(migratedData.experience == 0, "Experience should be added")
    assert(migratedData.inventory.sword == 1, "Inventory should be converted to object")
    assert(migratedData.settings.graphics == "Medium", "Settings should be added")
    
    return true
end)

-- Register libraries
codeLibrary:registerLibrary("PlayerDataManager", "1.0.0", playerDataManager, {})
codeLibrary:registerLibrary("VersionControl", "1.0.0", versionControl, {})
codeLibrary:registerLibrary("TestFramework", "1.0.0", testFramework, {})

-- Run tests
testFramework:runAllTests()

-- Test library system
local playerController = gameManager:getPlayerController()
print("Player controller created through factory pattern")

-- Test players
Players.PlayerAdded:Connect(function(player)
    wait(1) -- Wait for player to load
    
    -- Test experience gain
    playerController:handleExperienceGain(player.UserId, 50)
    
    -- Test item purchase
    playerController:handleItemPurchase(player.UserId, "sword", 100, 1)
    
    print("Applied ModuleScript architecture tests to", player.Name)
end)

print("\\n=== MODULESCRIPT ARCHITECTURE & CODE ORGANIZATION DEMO COMPLETE ===")
print("You've learned ModuleScript design patterns, code organization, and version control!")`,
    challenge: {
      tests: [
        { description: 'Create ModuleScript with proper structure and interface', type: 'code_contains', value: 'PlayerDataManager.new' },
        { description: 'Implement MVC pattern with models, services, and controllers', type: 'code_contains', value: 'PlayerController.new' },
        { description: 'Build version control system with migration support', type: 'code_contains', value: 'migrateData' }
      ],
      hints: [
        'Use setmetatable() to create object-oriented modules with proper inheritance',
        'Separate concerns using MVC pattern: Models for data, Services for business logic, Controllers for application logic',
        'Implement version control with migration scripts to handle data structure changes',
        'Use factory pattern for object creation and singleton pattern for global access',
        'Create proper error handling and validation in your modules'
      ],
      successMessage: 'Excellent! You now understand ModuleScript architecture, code organization patterns, and version control systems. These skills are essential for building maintainable, scalable Roblox projects!'
    }
  },

  // === ADVANCED NETWORKING ===
  'advanced-networking-systems': {
    title: 'Advanced Networking & Replication',
    description: 'Master advanced networking concepts, replication, and bandwidth optimization',
    sections: [
      {
        title: 'Replication & Bandwidth Optimization',
        content: `Advanced networking systems control how data flows between server and clients, ensuring smooth multiplayer experiences while minimizing bandwidth usage.

**Replication Concepts:**
- **Property Replication**: Automatic synchronization of object properties
- **Event Replication**: Broadcasting events to specific clients or all clients
- **Custom Replication**: Manual control over what gets replicated
- **Replication Filters**: Controlling which clients receive specific data
- **Bandwidth Optimization**: Reducing network traffic through smart replication

**Advanced Networking Features:**
- **Lag Compensation**: Handling network latency in real-time games
- **Prediction Systems**: Client-side prediction for responsive gameplay
- **Interpolation**: Smooth movement between network updates
- **Compression**: Reducing data size for network transmission
- **Rate Limiting**: Controlling update frequency to prevent spam`,
        codeExample: `-- Advanced networking and replication system

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local AdvancedNetworking = {}
AdvancedNetworking.__index = AdvancedNetworking

-- Networking configuration
local NETWORK_CONFIG = {
    UPDATE_RATE = 1/30, -- 30 FPS
    MAX_BANDWIDTH = 1024 * 1024, -- 1MB per second
    COMPRESSION_THRESHOLD = 100, -- Compress data larger than 100 bytes
    PREDICTION_ENABLED = true,
    INTERPOLATION_ENABLED = true
}

-- Replication types
local REPLICATION_TYPES = {
    ALL = "All",
    OWNER = "Owner",
    FILTERED = "Filtered",
    CUSTOM = "Custom"
}

function AdvancedNetworking.new()
    local self = setmetatable({}, AdvancedNetworking)
    
    -- Networking data
    self.replicationQueue = {}
    self.bandwidthUsage = {}
    self.predictionData = {}
    self.interpolationData = {}
    
    -- Remote events and functions
    self.remoteEvents = {}
    self.remoteFunctions = {}
    
    -- Setup networking
    self:setupNetworking()
    
    return self
end

function AdvancedNetworking:setupNetworking()
    -- Create remote events
    self:createRemoteEvent("ReplicationEvent")
    self:createRemoteEvent("PredictionEvent")
    self:createRemoteEvent("BandwidthEvent")
    
    -- Create remote functions
    self:createRemoteFunction("RequestData")
    self:createRemoteFunction("ValidateAction")
    
    -- Setup bandwidth monitoring
    self:setupBandwidthMonitoring()
    
    print("Advanced networking system initialized")
end

function AdvancedNetworking:createRemoteEvent(name)
    local remoteEvent = ReplicatedStorage:FindFirstChild(name)
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = name
        remoteEvent.Parent = ReplicatedStorage
    end
    
    self.remoteEvents[name] = remoteEvent
    return remoteEvent
end

function AdvancedNetworking:createRemoteFunction(name)
    local remoteFunction = ReplicatedStorage:FindFirstChild(name)
    if not remoteFunction then
        remoteFunction = Instance.new("RemoteFunction")
        remoteFunction.Name = name
        remoteFunction.Parent = ReplicatedStorage
    end
    
    self.remoteFunctions[name] = remoteFunction
    return remoteFunction
end

function AdvancedNetworking:replicateData(data, replicationType, targetPlayers)
    local replicationData = {
        data = data,
        type = replicationType,
        timestamp = tick(),
        compressed = false
    }
    
    -- Compress data if needed
    if self:shouldCompress(data) then
        replicationData.data = self:compressData(data)
        replicationData.compressed = true
    end
    
    -- Add to replication queue
    table.insert(self.replicationQueue, replicationData)
    
    -- Send to appropriate clients
    if replicationType == REPLICATION_TYPES.ALL then
        self:sendToAllClients(replicationData)
    elseif replicationType == REPLICATION_TYPES.OWNER then
        self:sendToOwner(replicationData, data.owner)
    elseif replicationType == REPLICATION_TYPES.FILTERED then
        self:sendToFilteredClients(replicationData, targetPlayers)
    end
    
    -- Update bandwidth usage
    self:updateBandwidthUsage(replicationData)
end

function AdvancedNetworking:sendToAllClients(replicationData)
    local remoteEvent = self.remoteEvents["ReplicationEvent"]
    if remoteEvent then
        remoteEvent:FireAllClients(replicationData)
    end
end

function AdvancedNetworking:sendToOwner(replicationData, owner)
    local remoteEvent = self.remoteEvents["ReplicationEvent"]
    if remoteEvent and owner then
        remoteEvent:FireClient(owner, replicationData)
    end
end

function AdvancedNetworking:sendToFilteredClients(replicationData, targetPlayers)
    local remoteEvent = self.remoteEvents["ReplicationEvent"]
    if remoteEvent and targetPlayers then
        for _, player in ipairs(targetPlayers) do
            remoteEvent:FireClient(player, replicationData)
        end
    end
end

function AdvancedNetworking:shouldCompress(data)
    local dataSize = self:calculateDataSize(data)
    return dataSize > NETWORK_CONFIG.COMPRESSION_THRESHOLD
end

function AdvancedNetworking:calculateDataSize(data)
    -- Simple size calculation (in real implementation, use proper serialization)
    local serialized = tostring(data)
    return #serialized
end

function AdvancedNetworking:compressData(data)
    -- Simple compression (in real implementation, use proper compression)
    local serialized = tostring(data)
    return "COMPRESSED:" .. serialized
end

function AdvancedNetworking:decompressData(compressedData)
    -- Simple decompression (in real implementation, use proper decompression)
    if string.sub(compressedData, 1, 11) == "COMPRESSED:" then
        return string.sub(compressedData, 12)
    end
    return compressedData
end

function AdvancedNetworking:updateBandwidthUsage(replicationData)
    local dataSize = self:calculateDataSize(replicationData.data)
    local currentTime = tick()
    
    if not self.bandwidthUsage[currentTime] then
        self.bandwidthUsage[currentTime] = 0
    end
    
    self.bandwidthUsage[currentTime] = self.bandwidthUsage[currentTime] + dataSize
end

function AdvancedNetworking:setupBandwidthMonitoring()
    RunService.Heartbeat:Connect(function()
        self:monitorBandwidth()
    end)
end

function AdvancedNetworking:monitorBandwidth()
    local currentTime = tick()
    local totalBandwidth = 0
    
    -- Calculate total bandwidth usage
    for time, usage in pairs(self.bandwidthUsage) do
        if currentTime - time <= 1 then -- Last second
            totalBandwidth = totalBandwidth + usage
        else
            self.bandwidthUsage[time] = nil -- Clean up old data
        end
    end
    
    -- Check if bandwidth limit exceeded
    if totalBandwidth > NETWORK_CONFIG.MAX_BANDWIDTH then
        self:handleBandwidthLimitExceeded(totalBandwidth)
    end
end

function AdvancedNetworking:handleBandwidthLimitExceeded(currentUsage)
    warn(string.format("Bandwidth limit exceeded: %d bytes/sec (limit: %d)", 
        currentUsage, NETWORK_CONFIG.MAX_BANDWIDTH))
    
    -- Implement bandwidth throttling
    self:throttleBandwidth()
end

function AdvancedNetworking:throttleBandwidth()
    -- Reduce update rate temporarily
    NETWORK_CONFIG.UPDATE_RATE = NETWORK_CONFIG.UPDATE_RATE * 1.5
    
    -- Notify clients about bandwidth issues
    local remoteEvent = self.remoteEvents["BandwidthEvent"]
    if remoteEvent then
        remoteEvent:FireAllClients({
            type = "BandwidthThrottle",
            newUpdateRate = NETWORK_CONFIG.UPDATE_RATE
        })
    end
end

function AdvancedNetworking:enablePrediction(player, object)
    if not NETWORK_CONFIG.PREDICTION_ENABLED then
        return
    end
    
    self.predictionData[player.UserId] = {
        object = object,
        lastPosition = object.Position,
        lastVelocity = object.Velocity,
        predictedPosition = object.Position,
        predictionTime = tick()
    }
    
    print("Enabled prediction for", player.Name)
end

function AdvancedNetworking:updatePrediction(player, newPosition, newVelocity)
    local predictionData = self.predictionData[player.UserId]
    if not predictionData then
        return
    end
    
    local currentTime = tick()
    local deltaTime = currentTime - predictionData.predictionTime
    
    -- Predict future position
    local predictedPosition = newPosition + (newVelocity * deltaTime)
    
    predictionData.lastPosition = newPosition
    predictionData.lastVelocity = newVelocity
    predictionData.predictedPosition = predictedPosition
    predictionData.predictionTime = currentTime
    
    -- Send prediction to client
    local remoteEvent = self.remoteEvents["PredictionEvent"]
    if remoteEvent then
        remoteEvent:FireClient(player, {
            predictedPosition = predictedPosition,
            deltaTime = deltaTime
        })
    end
end

function AdvancedNetworking:enableInterpolation(player, object)
    if not NETWORK_CONFIG.INTERPOLATION_ENABLED then
        return
    end
    
    self.interpolationData[player.UserId] = {
        object = object,
        targetPosition = object.Position,
        currentPosition = object.Position,
        interpolationSpeed = 10,
        isInterpolating = false
    }
    
    print("Enabled interpolation for", player.Name)
end

function AdvancedNetworking:updateInterpolation(player, targetPosition)
    local interpolationData = self.interpolationData[player.UserId]
    if not interpolationData then
        return
    end
    
    interpolationData.targetPosition = targetPosition
    interpolationData.isInterpolating = true
    
    -- Smooth interpolation
    local tween = TweenService:Create(
        interpolationData.object,
        TweenInfo.new(1/interpolationData.interpolationSpeed, Enum.EasingStyle.Linear),
        {Position = targetPosition}
    )
    
    tween:Play()
    
    tween.Completed:Connect(function()
        interpolationData.isInterpolating = false
    end)
end

function AdvancedNetworking:validateClientAction(player, action, data)
    local remoteFunction = self.remoteFunctions["ValidateAction"]
    if not remoteFunction then
        return false
    end
    
    local success, result = pcall(function()
        return remoteFunction:InvokeClient(player, action, data)
    end)
    
    if success then
        return result
    else
        warn("Failed to validate client action:", result)
        return false
    end
end

function AdvancedNetworking:requestDataFromClient(player, dataType)
    local remoteFunction = self.remoteFunctions["RequestData"]
    if not remoteFunction then
        return nil
    end
    
    local success, result = pcall(function()
        return remoteFunction:InvokeClient(player, dataType)
    end)
    
    if success then
        return result
    else
        warn("Failed to request data from client:", result)
        return nil
    end
end

function AdvancedNetworking:setupLagCompensation()
    -- Implement lag compensation for real-time games
    local function compensateForLag(player, action, timestamp)
        local playerPing = player:GetNetworkPing() * 1000 -- Convert to milliseconds
        local compensationTime = timestamp - (playerPing / 1000)
        
        -- Rewind game state to compensation time
        self:rewindGameState(compensationTime)
        
        -- Process action
        local result = self:processAction(action)
        
        -- Restore game state
        self:restoreGameState()
        
        return result
    end
    
    return compensateForLag
end

function AdvancedNetworking:rewindGameState(timestamp)
    -- Implement game state rewinding
    print("Rewinding game state to", timestamp)
end

function AdvancedNetworking:restoreGameState()
    -- Implement game state restoration
    print("Restoring game state")
end

function AdvancedNetworking:processAction(action)
    -- Process the action
    print("Processing action:", action)
    return true
end

function AdvancedNetworking:getNetworkStatistics()
    local stats = {
        totalBandwidth = 0,
        averageBandwidth = 0,
        activeConnections = #Players:GetPlayers(),
        replicationQueueSize = #self.replicationQueue,
        predictionEnabled = NETWORK_CONFIG.PREDICTION_ENABLED,
        interpolationEnabled = NETWORK_CONFIG.INTERPOLATION_ENABLED
    }
    
    -- Calculate bandwidth statistics
    for _, usage in pairs(self.bandwidthUsage) do
        stats.totalBandwidth = stats.totalBandwidth + usage
    end
    
    local bandwidthCount = 0
    for _ in pairs(self.bandwidthUsage) do
        bandwidthCount = bandwidthCount + 1
    end
    
    if bandwidthCount > 0 then
        stats.averageBandwidth = stats.totalBandwidth / bandwidthCount
    end
    
    return stats
end

-- Example usage
local advancedNetworking = AdvancedNetworking.new()

-- Test networking systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    -- Enable prediction and interpolation
    if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
        advancedNetworking:enablePrediction(player, player.Character.HumanoidRootPart)
        advancedNetworking:enableInterpolation(player, player.Character.HumanoidRootPart)
    end
    
    -- Test data replication
    local testData = {
        playerId = player.UserId,
        position = Vector3.new(0, 10, 0),
        health = 100,
        timestamp = tick()
    }
    
    advancedNetworking:replicateData(testData, REPLICATION_TYPES.ALL)
    
    print("Applied advanced networking tests to", player.Name)
end)

print("Advanced networking system initialized with replication, prediction, and interpolation")`,
        color: 'blue'
      }
    ],
    defaultCode: `-- Advanced Networking & Replication - Comprehensive Learning Example
-- Master advanced networking concepts, replication, and bandwidth optimization

print("=== ADVANCED NETWORKING & REPLICATION DEMO ===")
print("Learning advanced networking concepts and replication systems...")

-- 1. REPLICATION & BANDWIDTH OPTIMIZATION
print("\\n1. DEMONSTRATING REPLICATION & BANDWIDTH OPTIMIZATION...")

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local AdvancedNetworking = {}
AdvancedNetworking.__index = AdvancedNetworking

-- Networking configuration
local NETWORK_CONFIG = {
    UPDATE_RATE = 1/30, -- 30 FPS
    MAX_BANDWIDTH = 1024 * 1024, -- 1MB per second
    COMPRESSION_THRESHOLD = 100, -- Compress data larger than 100 bytes
    PREDICTION_ENABLED = true,
    INTERPOLATION_ENABLED = true
}

-- Replication types
local REPLICATION_TYPES = {
    ALL = "All",
    OWNER = "Owner",
    FILTERED = "Filtered",
    CUSTOM = "Custom"
}

function AdvancedNetworking.new()
    local self = setmetatable({}, AdvancedNetworking)
    
    -- Networking data
    self.replicationQueue = {}
    self.bandwidthUsage = {}
    self.predictionData = {}
    self.interpolationData = {}
    
    -- Remote events and functions
    self.remoteEvents = {}
    self.remoteFunctions = {}
    
    -- Setup networking
    self:setupNetworking()
    
    return self
end

function AdvancedNetworking:setupNetworking()
    -- Create remote events
    self:createRemoteEvent("ReplicationEvent")
    self:createRemoteEvent("PredictionEvent")
    self:createRemoteEvent("BandwidthEvent")
    
    -- Create remote functions
    self:createRemoteFunction("RequestData")
    self:createRemoteFunction("ValidateAction")
    
    -- Setup bandwidth monitoring
    self:setupBandwidthMonitoring()
    
    print("Advanced networking system initialized")
end

function AdvancedNetworking:createRemoteEvent(name)
    local remoteEvent = ReplicatedStorage:FindFirstChild(name)
    if not remoteEvent then
        remoteEvent = Instance.new("RemoteEvent")
        remoteEvent.Name = name
        remoteEvent.Parent = ReplicatedStorage
    end
    
    self.remoteEvents[name] = remoteEvent
    return remoteEvent
end

function AdvancedNetworking:createRemoteFunction(name)
    local remoteFunction = ReplicatedStorage:FindFirstChild(name)
    if not remoteFunction then
        remoteFunction = Instance.new("RemoteFunction")
        remoteFunction.Name = name
        remoteFunction.Parent = ReplicatedStorage
    end
    
    self.remoteFunctions[name] = remoteFunction
    return remoteFunction
end

function AdvancedNetworking:replicateData(data, replicationType, targetPlayers)
    local replicationData = {
        data = data,
        type = replicationType,
        timestamp = tick(),
        compressed = false
    }
    
    -- Compress data if needed
    if self:shouldCompress(data) then
        replicationData.data = self:compressData(data)
        replicationData.compressed = true
    end
    
    -- Add to replication queue
    table.insert(self.replicationQueue, replicationData)
    
    -- Send to appropriate clients
    if replicationType == REPLICATION_TYPES.ALL then
        self:sendToAllClients(replicationData)
    elseif replicationType == REPLICATION_TYPES.OWNER then
        self:sendToOwner(replicationData, data.owner)
    elseif replicationType == REPLICATION_TYPES.FILTERED then
        self:sendToFilteredClients(replicationData, targetPlayers)
    end
    
    -- Update bandwidth usage
    self:updateBandwidthUsage(replicationData)
end

function AdvancedNetworking:sendToAllClients(replicationData)
    local remoteEvent = self.remoteEvents["ReplicationEvent"]
    if remoteEvent then
        remoteEvent:FireAllClients(replicationData)
    end
end

function AdvancedNetworking:sendToOwner(replicationData, owner)
    local remoteEvent = self.remoteEvents["ReplicationEvent"]
    if remoteEvent and owner then
        remoteEvent:FireClient(owner, replicationData)
    end
end

function AdvancedNetworking:sendToFilteredClients(replicationData, targetPlayers)
    local remoteEvent = self.remoteEvents["ReplicationEvent"]
    if remoteEvent and targetPlayers then
        for _, player in ipairs(targetPlayers) do
            remoteEvent:FireClient(player, replicationData)
        end
    end
end

function AdvancedNetworking:shouldCompress(data)
    local dataSize = self:calculateDataSize(data)
    return dataSize > NETWORK_CONFIG.COMPRESSION_THRESHOLD
end

function AdvancedNetworking:calculateDataSize(data)
    -- Simple size calculation (in real implementation, use proper serialization)
    local serialized = tostring(data)
    return #serialized
end

function AdvancedNetworking:compressData(data)
    -- Simple compression (in real implementation, use proper compression)
    local serialized = tostring(data)
    return "COMPRESSED:" .. serialized
end

function AdvancedNetworking:decompressData(compressedData)
    -- Simple decompression (in real implementation, use proper decompression)
    if string.sub(compressedData, 1, 11) == "COMPRESSED:" then
        return string.sub(compressedData, 12)
    end
    return compressedData
end

function AdvancedNetworking:updateBandwidthUsage(replicationData)
    local dataSize = self:calculateDataSize(replicationData.data)
    local currentTime = tick()
    
    if not self.bandwidthUsage[currentTime] then
        self.bandwidthUsage[currentTime] = 0
    end
    
    self.bandwidthUsage[currentTime] = self.bandwidthUsage[currentTime] + dataSize
end

function AdvancedNetworking:setupBandwidthMonitoring()
    RunService.Heartbeat:Connect(function()
        self:monitorBandwidth()
    end)
end

function AdvancedNetworking:monitorBandwidth()
    local currentTime = tick()
    local totalBandwidth = 0
    
    -- Calculate total bandwidth usage
    for time, usage in pairs(self.bandwidthUsage) do
        if currentTime - time <= 1 then -- Last second
            totalBandwidth = totalBandwidth + usage
        else
            self.bandwidthUsage[time] = nil -- Clean up old data
        end
    end
    
    -- Check if bandwidth limit exceeded
    if totalBandwidth > NETWORK_CONFIG.MAX_BANDWIDTH then
        self:handleBandwidthLimitExceeded(totalBandwidth)
    end
end

function AdvancedNetworking:handleBandwidthLimitExceeded(currentUsage)
    warn(string.format("Bandwidth limit exceeded: %d bytes/sec (limit: %d)", 
        currentUsage, NETWORK_CONFIG.MAX_BANDWIDTH))
    
    -- Implement bandwidth throttling
    self:throttleBandwidth()
end

function AdvancedNetworking:throttleBandwidth()
    -- Reduce update rate temporarily
    NETWORK_CONFIG.UPDATE_RATE = NETWORK_CONFIG.UPDATE_RATE * 1.5
    
    -- Notify clients about bandwidth issues
    local remoteEvent = self.remoteEvents["BandwidthEvent"]
    if remoteEvent then
        remoteEvent:FireAllClients({
            type = "BandwidthThrottle",
            newUpdateRate = NETWORK_CONFIG.UPDATE_RATE
        })
    end
end

function AdvancedNetworking:enablePrediction(player, object)
    if not NETWORK_CONFIG.PREDICTION_ENABLED then
        return
    end
    
    self.predictionData[player.UserId] = {
        object = object,
        lastPosition = object.Position,
        lastVelocity = object.Velocity,
        predictedPosition = object.Position,
        predictionTime = tick()
    }
    
    print("Enabled prediction for", player.Name)
end

function AdvancedNetworking:updatePrediction(player, newPosition, newVelocity)
    local predictionData = self.predictionData[player.UserId]
    if not predictionData then
        return
    end
    
    local currentTime = tick()
    local deltaTime = currentTime - predictionData.predictionTime
    
    -- Predict future position
    local predictedPosition = newPosition + (newVelocity * deltaTime)
    
    predictionData.lastPosition = newPosition
    predictionData.lastVelocity = newVelocity
    predictionData.predictedPosition = predictedPosition
    predictionData.predictionTime = currentTime
    
    -- Send prediction to client
    local remoteEvent = self.remoteEvents["PredictionEvent"]
    if remoteEvent then
        remoteEvent:FireClient(player, {
            predictedPosition = predictedPosition,
            deltaTime = deltaTime
        })
    end
end

function AdvancedNetworking:enableInterpolation(player, object)
    if not NETWORK_CONFIG.INTERPOLATION_ENABLED then
        return
    end
    
    self.interpolationData[player.UserId] = {
        object = object,
        targetPosition = object.Position,
        currentPosition = object.Position,
        interpolationSpeed = 10,
        isInterpolating = false
    }
    
    print("Enabled interpolation for", player.Name)
end

function AdvancedNetworking:updateInterpolation(player, targetPosition)
    local interpolationData = self.interpolationData[player.UserId]
    if not interpolationData then
        return
    end
    
    interpolationData.targetPosition = targetPosition
    interpolationData.isInterpolating = true
    
    -- Smooth interpolation
    local tween = TweenService:Create(
        interpolationData.object,
        TweenInfo.new(1/interpolationData.interpolationSpeed, Enum.EasingStyle.Linear),
        {Position = targetPosition}
    )
    
    tween:Play()
    
    tween.Completed:Connect(function()
        interpolationData.isInterpolating = false
    end)
end

function AdvancedNetworking:validateClientAction(player, action, data)
    local remoteFunction = self.remoteFunctions["ValidateAction"]
    if not remoteFunction then
        return false
    end
    
    local success, result = pcall(function()
        return remoteFunction:InvokeClient(player, action, data)
    end)
    
    if success then
        return result
    else
        warn("Failed to validate client action:", result)
        return false
    end
end

function AdvancedNetworking:requestDataFromClient(player, dataType)
    local remoteFunction = self.remoteFunctions["RequestData"]
    if not remoteFunction then
        return nil
    end
    
    local success, result = pcall(function()
        return remoteFunction:InvokeClient(player, dataType)
    end)
    
    if success then
        return result
    else
        warn("Failed to request data from client:", result)
        return nil
    end
end

function AdvancedNetworking:setupLagCompensation()
    -- Implement lag compensation for real-time games
    local function compensateForLag(player, action, timestamp)
        local playerPing = player:GetNetworkPing() * 1000 -- Convert to milliseconds
        local compensationTime = timestamp - (playerPing / 1000)
        
        -- Rewind game state to compensation time
        self:rewindGameState(compensationTime)
        
        -- Process action
        local result = self:processAction(action)
        
        -- Restore game state
        self:restoreGameState()
        
        return result
    end
    
    return compensateForLag
end

function AdvancedNetworking:rewindGameState(timestamp)
    -- Implement game state rewinding
    print("Rewinding game state to", timestamp)
end

function AdvancedNetworking:restoreGameState()
    -- Implement game state restoration
    print("Restoring game state")
end

function AdvancedNetworking:processAction(action)
    -- Process the action
    print("Processing action:", action)
    return true
end

function AdvancedNetworking:getNetworkStatistics()
    local stats = {
        totalBandwidth = 0,
        averageBandwidth = 0,
        activeConnections = #Players:GetPlayers(),
        replicationQueueSize = #self.replicationQueue,
        predictionEnabled = NETWORK_CONFIG.PREDICTION_ENABLED,
        interpolationEnabled = NETWORK_CONFIG.INTERPOLATION_ENABLED
    }
    
    -- Calculate bandwidth statistics
    for _, usage in pairs(self.bandwidthUsage) do
        stats.totalBandwidth = stats.totalBandwidth + usage
    end
    
    local bandwidthCount = 0
    for _ in pairs(self.bandwidthUsage) do
        bandwidthCount = bandwidthCount + 1
    end
    
    if bandwidthCount > 0 then
        stats.averageBandwidth = stats.totalBandwidth / bandwidthCount
    end
    
    return stats
end

-- 2. DEMO THE SYSTEMS
print("\\n2. RUNNING SYSTEM DEMONSTRATIONS...")

-- Create systems
local advancedNetworking = AdvancedNetworking.new()

-- Test networking systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    -- Enable prediction and interpolation
    if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
        advancedNetworking:enablePrediction(player, player.Character.HumanoidRootPart)
        advancedNetworking:enableInterpolation(player, player.Character.HumanoidRootPart)
    end
    
    -- Test data replication
    local testData = {
        playerId = player.UserId,
        position = Vector3.new(0, 10, 0),
        health = 100,
        timestamp = tick()
    }
    
    advancedNetworking:replicateData(testData, REPLICATION_TYPES.ALL)
    
    print("Applied advanced networking tests to", player.Name)
end)

print("\\n=== ADVANCED NETWORKING & REPLICATION DEMO COMPLETE ===")
print("You've learned advanced networking concepts, replication, and bandwidth optimization!")`,
    challenge: {
      tests: [
        { description: 'Create advanced networking system with replication', type: 'code_contains', value: 'replicateData' },
        { description: 'Implement bandwidth monitoring and optimization', type: 'code_contains', value: 'monitorBandwidth' },
        { description: 'Build prediction and interpolation systems', type: 'code_contains', value: 'enablePrediction' }
      ],
      hints: [
        'Use RemoteEvents and RemoteFunctions for client-server communication',
        'Implement bandwidth monitoring to prevent network overload',
        'Use prediction for responsive gameplay and interpolation for smooth movement',
        'Compress large data before sending over the network',
        'Implement lag compensation for real-time multiplayer games'
      ],
      successMessage: 'Excellent! You now understand advanced networking concepts, replication systems, and bandwidth optimization. These skills are essential for creating smooth multiplayer experiences!'
    }
  },

  // === PERFORMANCE & OPTIMIZATION ===
  'performance-optimization-advanced': {
    title: 'Advanced Performance Optimization',
    description: 'Master performance optimization techniques for smooth, efficient Roblox games',
    sections: [
      {
        title: 'Script Profiling & Memory Management',
        content: `Advanced performance optimization ensures your Roblox games run smoothly on all devices, from mobile phones to high-end PCs.

**Performance Monitoring:**
- **Script Profiling**: Identify performance bottlenecks in your code
- **Memory Management**: Efficient memory usage and garbage collection
- **Frame Rate Optimization**: Maintaining consistent 60 FPS
- **Network Optimization**: Reducing bandwidth usage and latency
- **Rendering Optimization**: Efficient use of graphics resources

**Optimization Techniques:**
- **Object Pooling**: Reusing objects instead of creating new ones
- **LOD Systems**: Level of Detail for distant objects
- **Culling**: Not rendering objects outside the camera view
- **Batch Operations**: Grouping similar operations together
- **Async Processing**: Moving heavy operations off the main thread`,
        codeExample: `-- Advanced performance optimization system

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local Debris = game:GetService("Debris")
local TweenService = game:GetService("TweenService")
local MemoryStoreService = game:GetService("MemoryStoreService")

local PerformanceOptimizer = {}
PerformanceOptimizer.__index = PerformanceOptimizer

-- Performance configuration
local PERFORMANCE_CONFIG = {
    TARGET_FPS = 60,
    MAX_MEMORY_MB = 100,
    PROFILE_INTERVAL = 5, -- seconds
    OPTIMIZATION_THRESHOLD = 0.8, -- 80% of target performance
    CLEANUP_INTERVAL = 30 -- seconds
}

-- Performance metrics
local performanceMetrics = {
    frameTime = 0,
    memoryUsage = 0,
    networkLatency = 0,
    activeObjects = 0,
    lastOptimization = 0
}

function PerformanceOptimizer.new()
    local self = setmetatable({}, PerformanceOptimizer)
    
    -- Optimization systems
    self.objectPool = {}
    self.lodSystem = {}
    self.cullingSystem = {}
    self.batchOperations = {}
    self.asyncQueue = {}
    
    -- Performance monitoring
    self.profiler = {}
    self.memoryMonitor = {}
    self.frameRateMonitor = {}
    
    -- Setup optimization
    self:setupOptimization()
    
    return self
end

function PerformanceOptimizer:setupOptimization()
    -- Setup performance monitoring
    self:setupProfiling()
    self:setupMemoryMonitoring()
    self:setupFrameRateMonitoring()
    
    -- Setup optimization systems
    self:setupObjectPooling()
    self:setupLODSystem()
    self:setupCullingSystem()
    self:setupBatchOperations()
    self:setupAsyncProcessing()
    
    print("Advanced performance optimization system initialized")
end

function PerformanceOptimizer:setupProfiling()
    self.profiler = {
        startTime = 0,
        endTime = 0,
        totalTime = 0,
        callCount = 0,
        averageTime = 0
    }
    
    -- Profile script execution
    local originalSpawn = spawn
    spawn = function(func, ...)
        local startTime = tick()
        local result = originalSpawn(func, ...)
        local endTime = tick()
        
        self:recordProfileData(endTime - startTime)
        return result
    end
end

function PerformanceOptimizer:recordProfileData(executionTime)
    self.profiler.totalTime = self.profiler.totalTime + executionTime
    self.profiler.callCount = self.profiler.callCount + 1
    self.profiler.averageTime = self.profiler.totalTime / self.profiler.callCount
    
    -- Check if optimization is needed
    if self.profiler.averageTime > (1/PERFORMANCE_CONFIG.TARGET_FPS) * PERFORMANCE_CONFIG.OPTIMIZATION_THRESHOLD then
        self:triggerOptimization()
    end
end

function PerformanceOptimizer:setupMemoryMonitoring()
    self.memoryMonitor = {
        currentUsage = 0,
        peakUsage = 0,
        garbageCollectionCount = 0,
        lastCleanup = 0
    }
    
    -- Monitor memory usage
    RunService.Heartbeat:Connect(function()
        self:monitorMemoryUsage()
    end)
end

function PerformanceOptimizer:monitorMemoryUsage()
    local currentMemory = collectgarbage("count")
    self.memoryMonitor.currentUsage = currentMemory
    
    if currentMemory > self.memoryMonitor.peakUsage then
        self.memoryMonitor.peakUsage = currentMemory
    end
    
    -- Trigger garbage collection if memory usage is high
    if currentMemory > PERFORMANCE_CONFIG.MAX_MEMORY_MB then
        self:triggerGarbageCollection()
    end
end

function PerformanceOptimizer:triggerGarbageCollection()
    collectgarbage("collect")
    self.memoryMonitor.garbageCollectionCount = self.memoryMonitor.garbageCollectionCount + 1
    self.memoryMonitor.lastCleanup = tick()
    
    print("Garbage collection triggered - Memory usage:", collectgarbage("count"), "MB")
end

function PerformanceOptimizer:setupFrameRateMonitoring()
    self.frameRateMonitor = {
        frameCount = 0,
        lastFrameTime = 0,
        currentFPS = 0,
        averageFPS = 0,
        frameTimeHistory = {}
    }
    
    -- Monitor frame rate
    RunService.Heartbeat:Connect(function()
        self:monitorFrameRate()
    end)
end

function PerformanceOptimizer:monitorFrameRate()
    local currentTime = tick()
    local deltaTime = currentTime - self.frameRateMonitor.lastFrameTime
    
    self.frameRateMonitor.frameCount = self.frameRateMonitor.frameCount + 1
    self.frameRateMonitor.currentFPS = 1 / deltaTime
    
    -- Store frame time history
    table.insert(self.frameRateMonitor.frameTimeHistory, deltaTime)
    if #self.frameRateMonitor.frameTimeHistory > 60 then
        table.remove(self.frameRateMonitor.frameTimeHistory, 1)
    end
    
    -- Calculate average FPS
    local totalFrameTime = 0
    for _, frameTime in ipairs(self.frameRateMonitor.frameTimeHistory) do
        totalFrameTime = totalFrameTime + frameTime
    end
    self.frameRateMonitor.averageFPS = #self.frameRateMonitor.frameTimeHistory / totalFrameTime
    
    self.frameRateMonitor.lastFrameTime = currentTime
    
    -- Check if frame rate is below target
    if self.frameRateMonitor.averageFPS < PERFORMANCE_CONFIG.TARGET_FPS * PERFORMANCE_CONFIG.OPTIMIZATION_THRESHOLD then
        self:triggerFrameRateOptimization()
    end
end

function PerformanceOptimizer:triggerFrameRateOptimization()
    print("Frame rate optimization triggered - Current FPS:", self.frameRateMonitor.averageFPS)
    
    -- Reduce quality settings
    self:reduceQualitySettings()
    
    -- Optimize rendering
    self:optimizeRendering()
    
    -- Clean up unused objects
    self:cleanupUnusedObjects()
end

function PerformanceOptimizer:setupObjectPooling()
    self.objectPool = {
        bullets = {},
        particles = {},
        effects = {},
        maxPoolSize = 100
    }
    
    -- Pre-populate object pools
    self:populateObjectPools()
end

function PerformanceOptimizer:populateObjectPools()
    -- Create bullet pool
    for i = 1, 50 do
        local bullet = Instance.new("Part")
        bullet.Name = "PooledBullet"
        bullet.Size = Vector3.new(0.2, 0.2, 2)
        bullet.Material = Enum.Material.Neon
        bullet.Color = Color3.fromRGB(255, 255, 0)
        bullet.Anchored = true
        bullet.CanCollide = false
        bullet.Parent = nil -- Don't parent until needed
        
        table.insert(self.objectPool.bullets, bullet)
    end
    
    print("Object pools populated with", #self.objectPool.bullets, "bullets")
end

function PerformanceOptimizer:getPooledObject(objectType)
    local pool = self.objectPool[objectType]
    if not pool or #pool == 0 then
        return nil
    end
    
    local object = table.remove(pool)
    return object
end

function PerformanceOptimizer:returnPooledObject(objectType, object)
    local pool = self.objectPool[objectType]
    if not pool then
        return
    end
    
    if #pool < self.objectPool.maxPoolSize then
        -- Reset object properties
        object.Parent = nil
        object.Position = Vector3.new(0, 0, 0)
        object.Rotation = Vector3.new(0, 0, 0)
        
        table.insert(pool, object)
    else
        object:Destroy()
    end
end

function PerformanceOptimizer:setupLODSystem()
    self.lodSystem = {
        levels = {
            {distance = 100, quality = "High"},
            {distance = 200, quality = "Medium"},
            {distance = 500, quality = "Low"}
        },
        objects = {}
    }
end

function PerformanceOptimizer:registerLODObject(object, lodLevels)
    self.lodSystem.objects[object] = {
        levels = lodLevels,
        currentLevel = 1,
        lastUpdate = 0
    }
end

function PerformanceOptimizer:updateLODSystem(cameraPosition)
    local currentTime = tick()
    
    for object, lodData in pairs(self.lodSystem.objects) do
        if currentTime - lodData.lastUpdate > 0.1 then -- Update every 100ms
            local distance = (object.Position - cameraPosition).Magnitude
            local newLevel = self:calculateLODLevel(distance)
            
            if newLevel ~= lodData.currentLevel then
                self:applyLODLevel(object, newLevel, lodData.levels)
                lodData.currentLevel = newLevel
            end
            
            lodData.lastUpdate = currentTime
        end
    end
end

function PerformanceOptimizer:calculateLODLevel(distance)
    for i, level in ipairs(self.lodSystem.levels) do
        if distance <= level.distance then
            return i
        end
    end
    return #self.lodSystem.levels
end

function PerformanceOptimizer:applyLODLevel(object, level, lodLevels)
    if lodLevels[level] then
        local lodConfig = lodLevels[level]
        
        -- Apply LOD settings
        if lodConfig.transparency then
            object.Transparency = lodConfig.transparency
        end
        
        if lodConfig.size then
            object.Size = lodConfig.size
        end
        
        if lodConfig.material then
            object.Material = lodConfig.material
        end
    end
end

function PerformanceOptimizer:setupCullingSystem()
    self.cullingSystem = {
        camera = nil,
        cullDistance = 1000,
        culledObjects = {},
        lastCullUpdate = 0
    }
end

function PerformanceOptimizer:updateCullingSystem()
    local currentTime = tick()
    
    if currentTime - self.cullingSystem.lastCullUpdate > 0.5 then -- Update every 500ms
        if self.cullingSystem.camera then
            self:performCulling()
        end
        self.cullingSystem.lastCullUpdate = currentTime
    end
end

function PerformanceOptimizer:performCulling()
    local cameraPosition = self.cullingSystem.camera.CFrame.Position
    
    for object, _ in pairs(self.culledObjects) do
        local distance = (object.Position - cameraPosition).Magnitude
        
        if distance > self.cullingSystem.cullDistance then
            if object.Parent then
                object.Parent = nil
                print("Culled object:", object.Name, "at distance:", distance)
            end
        else
            if not object.Parent then
                object.Parent = workspace
                print("Unculled object:", object.Name, "at distance:", distance)
            end
        end
    end
end

function PerformanceOptimizer:setupBatchOperations()
    self.batchOperations = {
        queue = {},
        maxBatchSize = 100,
        batchInterval = 0.1 -- 100ms
    }
    
    -- Process batches
    RunService.Heartbeat:Connect(function()
        self:processBatchOperations()
    end)
end

function PerformanceOptimizer:addBatchOperation(operation, data)
    table.insert(self.batchOperations.queue, {
        operation = operation,
        data = data,
        timestamp = tick()
    })
end

function PerformanceOptimizer:processBatchOperations()
    if #self.batchOperations.queue == 0 then
        return
    end
    
    local batchSize = math.min(#self.batchOperations.queue, self.batchOperations.maxBatchSize)
    local batch = {}
    
    for i = 1, batchSize do
        table.insert(batch, table.remove(self.batchOperations.queue, 1))
    end
    
    -- Process batch
    self:executeBatch(batch)
end

function PerformanceOptimizer:executeBatch(batch)
    local startTime = tick()
    
    for _, operation in ipairs(batch) do
        if operation.operation == "createPart" then
            self:createPartBatch(operation.data)
        elseif operation.operation == "updatePosition" then
            self:updatePositionBatch(operation.data)
        elseif operation.operation == "destroyObject" then
            self:destroyObjectBatch(operation.data)
        end
    end
    
    local endTime = tick()
    print("Processed batch of", #batch, "operations in", (endTime - startTime) * 1000, "ms")
end

function PerformanceOptimizer:createPartBatch(data)
    for _, partData in ipairs(data) do
        local part = Instance.new("Part")
        part.Name = partData.name or "BatchPart"
        part.Size = partData.size or Vector3.new(4, 4, 4)
        part.Position = partData.position or Vector3.new(0, 0, 0)
        part.Color = partData.color or Color3.fromRGB(255, 255, 255)
        part.Parent = workspace
    end
end

function PerformanceOptimizer:updatePositionBatch(data)
    for _, updateData in ipairs(data) do
        if updateData.object and updateData.object.Parent then
            updateData.object.Position = updateData.position
        end
    end
end

function PerformanceOptimizer:destroyObjectBatch(data)
    for _, object in ipairs(data) do
        if object and object.Parent then
            object:Destroy()
        end
    end
end

function PerformanceOptimizer:setupAsyncProcessing()
    self.asyncQueue = {
        tasks = {},
        maxConcurrentTasks = 5,
        activeTasks = 0
    }
    
    -- Process async tasks
    RunService.Heartbeat:Connect(function()
        self:processAsyncTasks()
    end)
end

function PerformanceOptimizer:addAsyncTask(task, priority)
    table.insert(self.asyncQueue.tasks, {
        task = task,
        priority = priority or 1,
        timestamp = tick()
    })
    
    -- Sort by priority
    table.sort(self.asyncQueue.tasks, function(a, b)
        return a.priority > b.priority
    end)
end

function PerformanceOptimizer:processAsyncTasks()
    if self.asyncQueue.activeTasks >= self.asyncQueue.maxConcurrentTasks then
        return
    end
    
    if #self.asyncQueue.tasks == 0 then
        return
    end
    
    local task = table.remove(self.asyncQueue.tasks, 1)
    self.asyncQueue.activeTasks = self.asyncQueue.activeTasks + 1
    
    -- Execute task asynchronously
    spawn(function()
        local success, result = pcall(task.task)
        self.asyncQueue.activeTasks = self.asyncQueue.activeTasks - 1
        
        if not success then
            warn("Async task failed:", result)
        end
    end)
end

function PerformanceOptimizer:triggerOptimization()
    print("Performance optimization triggered")
    
    -- Reduce quality settings
    self:reduceQualitySettings()
    
    -- Optimize memory usage
    self:optimizeMemoryUsage()
    
    -- Clean up unused objects
    self:cleanupUnusedObjects()
    
    performanceMetrics.lastOptimization = tick()
end

function PerformanceOptimizer:reduceQualitySettings()
    -- Reduce lighting quality
    game.Lighting.GlobalShadows = false
    game.Lighting.ShadowSoftness = 0.2
    
    -- Reduce particle effects
    for _, effect in pairs(workspace:GetDescendants()) do
        if effect:IsA("ParticleEmitter") then
            effect.Enabled = false
        end
    end
    
    print("Quality settings reduced for performance")
end

function PerformanceOptimizer:optimizeMemoryUsage()
    -- Clear unused textures
    for _, texture in pairs(workspace:GetDescendants()) do
        if texture:IsA("Texture") and not texture.Parent.Parent then
            texture:Destroy()
        end
    end
    
    -- Optimize scripts
    for _, script in pairs(workspace:GetDescendants()) do
        if script:IsA("Script") and script.Parent == nil then
            script:Destroy()
        end
    end
    
    print("Memory usage optimized")
end

function PerformanceOptimizer:cleanupUnusedObjects()
    local cleanupCount = 0
    
    for _, object in pairs(workspace:GetDescendants()) do
        if object:IsA("Part") and not object.Parent.Parent then
            if (object.Position - Vector3.new(0, 0, 0)).Magnitude > 1000 then
                object:Destroy()
                cleanupCount = cleanupCount + 1
            end
        end
    end
    
    print("Cleaned up", cleanupCount, "unused objects")
end

function PerformanceOptimizer:getPerformanceMetrics()
    return {
        frameRate = self.frameRateMonitor.averageFPS,
        memoryUsage = self.memoryMonitor.currentUsage,
        memoryPeak = self.memoryMonitor.peakUsage,
        garbageCollections = self.memoryMonitor.garbageCollectionCount,
        averageExecutionTime = self.profiler.averageTime,
        activeObjects = self:countActiveObjects(),
        optimizationCount = performanceMetrics.lastOptimization
    }
end

function PerformanceOptimizer:countActiveObjects()
    local count = 0
    for _ in pairs(workspace:GetDescendants()) do
        count = count + 1
    end
    return count
end

-- Example usage
local performanceOptimizer = PerformanceOptimizer.new()

-- Test performance systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
        -- Setup LOD system for player
        local lodLevels = {
            {transparency = 0, size = Vector3.new(4, 4, 4), material = Enum.Material.Plastic},
            {transparency = 0.2, size = Vector3.new(3, 3, 3), material = Enum.Material.Plastic},
            {transparency = 0.5, size = Vector3.new(2, 2, 2), material = Enum.Material.Plastic}
        }
        
        performanceOptimizer:registerLODObject(player.Character.HumanoidRootPart, lodLevels)
        
        -- Add to culling system
        performanceOptimizer.cullingSystem.culledObjects[player.Character.HumanoidRootPart] = true
    end
    
    -- Test batch operations
    for i = 1, 10 do
        performanceOptimizer:addBatchOperation("createPart", {
            {name = "TestPart" .. i, position = Vector3.new(i * 10, 0, 0)}
        })
    end
    
    -- Test async tasks
    performanceOptimizer:addAsyncTask(function()
        wait(1)
        print("Async task completed for", player.Name)
    end, 2)
    
    print("Applied performance optimization tests to", player.Name)
end)

-- Monitor performance
RunService.Heartbeat:Connect(function()
    local metrics = performanceOptimizer:getPerformanceMetrics()
    
    if tick() % 10 < 0.1 then -- Print every 10 seconds
        print("Performance Metrics:")
        print("  FPS:", string.format("%.1f", metrics.frameRate))
        print("  Memory:", string.format("%.1f", metrics.memoryUsage), "MB")
        print("  Active Objects:", metrics.activeObjects)
    end
end)

print("Advanced performance optimization system initialized with profiling, memory management, and optimization systems")`,
        color: 'green'
      }
    ],
    defaultCode: `-- Advanced Performance Optimization - Comprehensive Learning Example
-- Master performance optimization techniques for smooth, efficient Roblox games

print("=== ADVANCED PERFORMANCE OPTIMIZATION DEMO ===")
print("Learning performance optimization techniques and systems...")

-- 1. SCRIPT PROFILING & MEMORY MANAGEMENT
print("\\n1. DEMONSTRATING SCRIPT PROFILING & MEMORY MANAGEMENT...")

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local Debris = game:GetService("Debris")
local TweenService = game:GetService("TweenService")
local MemoryStoreService = game:GetService("MemoryStoreService")

local PerformanceOptimizer = {}
PerformanceOptimizer.__index = PerformanceOptimizer

-- Performance configuration
local PERFORMANCE_CONFIG = {
    TARGET_FPS = 60,
    MAX_MEMORY_MB = 100,
    PROFILE_INTERVAL = 5, -- seconds
    OPTIMIZATION_THRESHOLD = 0.8, -- 80% of target performance
    CLEANUP_INTERVAL = 30 -- seconds
}

-- Performance metrics
local performanceMetrics = {
    frameTime = 0,
    memoryUsage = 0,
    networkLatency = 0,
    activeObjects = 0,
    lastOptimization = 0
}

function PerformanceOptimizer.new()
    local self = setmetatable({}, PerformanceOptimizer)
    
    -- Optimization systems
    self.objectPool = {}
    self.lodSystem = {}
    self.cullingSystem = {}
    self.batchOperations = {}
    self.asyncQueue = {}
    
    -- Performance monitoring
    self.profiler = {}
    self.memoryMonitor = {}
    self.frameRateMonitor = {}
    
    -- Setup optimization
    self:setupOptimization()
    
    return self
end

function PerformanceOptimizer:setupOptimization()
    -- Setup performance monitoring
    self:setupProfiling()
    self:setupMemoryMonitoring()
    self:setupFrameRateMonitoring()
    
    -- Setup optimization systems
    self:setupObjectPooling()
    self:setupLODSystem()
    self:setupCullingSystem()
    self:setupBatchOperations()
    self:setupAsyncProcessing()
    
    print("Advanced performance optimization system initialized")
end

function PerformanceOptimizer:setupProfiling()
    self.profiler = {
        startTime = 0,
        endTime = 0,
        totalTime = 0,
        callCount = 0,
        averageTime = 0
    }
    
    -- Profile script execution
    local originalSpawn = spawn
    spawn = function(func, ...)
        local startTime = tick()
        local result = originalSpawn(func, ...)
        local endTime = tick()
        
        self:recordProfileData(endTime - startTime)
        return result
    end
end

function PerformanceOptimizer:recordProfileData(executionTime)
    self.profiler.totalTime = self.profiler.totalTime + executionTime
    self.profiler.callCount = self.profiler.callCount + 1
    self.profiler.averageTime = self.profiler.totalTime / self.profiler.callCount
    
    -- Check if optimization is needed
    if self.profiler.averageTime > (1/PERFORMANCE_CONFIG.TARGET_FPS) * PERFORMANCE_CONFIG.OPTIMIZATION_THRESHOLD then
        self:triggerOptimization()
    end
end

function PerformanceOptimizer:setupMemoryMonitoring()
    self.memoryMonitor = {
        currentUsage = 0,
        peakUsage = 0,
        garbageCollectionCount = 0,
        lastCleanup = 0
    }
    
    -- Monitor memory usage
    RunService.Heartbeat:Connect(function()
        self:monitorMemoryUsage()
    end)
end

function PerformanceOptimizer:monitorMemoryUsage()
    local currentMemory = collectgarbage("count")
    self.memoryMonitor.currentUsage = currentMemory
    
    if currentMemory > self.memoryMonitor.peakUsage then
        self.memoryMonitor.peakUsage = currentMemory
    end
    
    -- Trigger garbage collection if memory usage is high
    if currentMemory > PERFORMANCE_CONFIG.MAX_MEMORY_MB then
        self:triggerGarbageCollection()
    end
end

function PerformanceOptimizer:triggerGarbageCollection()
    collectgarbage("collect")
    self.memoryMonitor.garbageCollectionCount = self.memoryMonitor.garbageCollectionCount + 1
    self.memoryMonitor.lastCleanup = tick()
    
    print("Garbage collection triggered - Memory usage:", collectgarbage("count"), "MB")
end

function PerformanceOptimizer:setupFrameRateMonitoring()
    self.frameRateMonitor = {
        frameCount = 0,
        lastFrameTime = 0,
        currentFPS = 0,
        averageFPS = 0,
        frameTimeHistory = {}
    }
    
    -- Monitor frame rate
    RunService.Heartbeat:Connect(function()
        self:monitorFrameRate()
    end)
end

function PerformanceOptimizer:monitorFrameRate()
    local currentTime = tick()
    local deltaTime = currentTime - self.frameRateMonitor.lastFrameTime
    
    self.frameRateMonitor.frameCount = self.frameRateMonitor.frameCount + 1
    self.frameRateMonitor.currentFPS = 1 / deltaTime
    
    -- Store frame time history
    table.insert(self.frameRateMonitor.frameTimeHistory, deltaTime)
    if #self.frameRateMonitor.frameTimeHistory > 60 then
        table.remove(self.frameRateMonitor.frameTimeHistory, 1)
    end
    
    -- Calculate average FPS
    local totalFrameTime = 0
    for _, frameTime in ipairs(self.frameRateMonitor.frameTimeHistory) do
        totalFrameTime = totalFrameTime + frameTime
    end
    self.frameRateMonitor.averageFPS = #self.frameRateMonitor.frameTimeHistory / totalFrameTime
    
    self.frameRateMonitor.lastFrameTime = currentTime
    
    -- Check if frame rate is below target
    if self.frameRateMonitor.averageFPS < PERFORMANCE_CONFIG.TARGET_FPS * PERFORMANCE_CONFIG.OPTIMIZATION_THRESHOLD then
        self:triggerFrameRateOptimization()
    end
end

function PerformanceOptimizer:triggerFrameRateOptimization()
    print("Frame rate optimization triggered - Current FPS:", self.frameRateMonitor.averageFPS)
    
    -- Reduce quality settings
    self:reduceQualitySettings()
    
    -- Optimize rendering
    self:optimizeRendering()
    
    -- Clean up unused objects
    self:cleanupUnusedObjects()
end

function PerformanceOptimizer:setupObjectPooling()
    self.objectPool = {
        bullets = {},
        particles = {},
        effects = {},
        maxPoolSize = 100
    }
    
    -- Pre-populate object pools
    self:populateObjectPools()
end

function PerformanceOptimizer:populateObjectPools()
    -- Create bullet pool
    for i = 1, 50 do
        local bullet = Instance.new("Part")
        bullet.Name = "PooledBullet"
        bullet.Size = Vector3.new(0.2, 0.2, 2)
        bullet.Material = Enum.Material.Neon
        bullet.Color = Color3.fromRGB(255, 255, 0)
        bullet.Anchored = true
        bullet.CanCollide = false
        bullet.Parent = nil -- Don't parent until needed
        
        table.insert(self.objectPool.bullets, bullet)
    end
    
    print("Object pools populated with", #self.objectPool.bullets, "bullets")
end

function PerformanceOptimizer:getPooledObject(objectType)
    local pool = self.objectPool[objectType]
    if not pool or #pool == 0 then
        return nil
    end
    
    local object = table.remove(pool)
    return object
end

function PerformanceOptimizer:returnPooledObject(objectType, object)
    local pool = self.objectPool[objectType]
    if not pool then
        return
    end
    
    if #pool < self.objectPool.maxPoolSize then
        -- Reset object properties
        object.Parent = nil
        object.Position = Vector3.new(0, 0, 0)
        object.Rotation = Vector3.new(0, 0, 0)
        
        table.insert(pool, object)
    else
        object:Destroy()
    end
end

function PerformanceOptimizer:setupLODSystem()
    self.lodSystem = {
        levels = {
            {distance = 100, quality = "High"},
            {distance = 200, quality = "Medium"},
            {distance = 500, quality = "Low"}
        },
        objects = {}
    }
end

function PerformanceOptimizer:registerLODObject(object, lodLevels)
    self.lodSystem.objects[object] = {
        levels = lodLevels,
        currentLevel = 1,
        lastUpdate = 0
    }
end

function PerformanceOptimizer:updateLODSystem(cameraPosition)
    local currentTime = tick()
    
    for object, lodData in pairs(self.lodSystem.objects) do
        if currentTime - lodData.lastUpdate > 0.1 then -- Update every 100ms
            local distance = (object.Position - cameraPosition).Magnitude
            local newLevel = self:calculateLODLevel(distance)
            
            if newLevel ~= lodData.currentLevel then
                self:applyLODLevel(object, newLevel, lodData.levels)
                lodData.currentLevel = newLevel
            end
            
            lodData.lastUpdate = currentTime
        end
    end
end

function PerformanceOptimizer:calculateLODLevel(distance)
    for i, level in ipairs(self.lodSystem.levels) do
        if distance <= level.distance then
            return i
        end
    end
    return #self.lodSystem.levels
end

function PerformanceOptimizer:applyLODLevel(object, level, lodLevels)
    if lodLevels[level] then
        local lodConfig = lodLevels[level]
        
        -- Apply LOD settings
        if lodConfig.transparency then
            object.Transparency = lodConfig.transparency
        end
        
        if lodConfig.size then
            object.Size = lodConfig.size
        end
        
        if lodConfig.material then
            object.Material = lodConfig.material
        end
    end
end

function PerformanceOptimizer:setupCullingSystem()
    self.cullingSystem = {
        camera = nil,
        cullDistance = 1000,
        culledObjects = {},
        lastCullUpdate = 0
    }
end

function PerformanceOptimizer:updateCullingSystem()
    local currentTime = tick()
    
    if currentTime - self.cullingSystem.lastCullUpdate > 0.5 then -- Update every 500ms
        if self.cullingSystem.camera then
            self:performCulling()
        end
        self.cullingSystem.lastCullUpdate = currentTime
    end
end

function PerformanceOptimizer:performCulling()
    local cameraPosition = self.cullingSystem.camera.CFrame.Position
    
    for object, _ in pairs(self.culledObjects) do
        local distance = (object.Position - cameraPosition).Magnitude
        
        if distance > self.cullingSystem.cullDistance then
            if object.Parent then
                object.Parent = nil
                print("Culled object:", object.Name, "at distance:", distance)
            end
        else
            if not object.Parent then
                object.Parent = workspace
                print("Unculled object:", object.Name, "at distance:", distance)
            end
        end
    end
end

function PerformanceOptimizer:setupBatchOperations()
    self.batchOperations = {
        queue = {},
        maxBatchSize = 100,
        batchInterval = 0.1 -- 100ms
    }
    
    -- Process batches
    RunService.Heartbeat:Connect(function()
        self:processBatchOperations()
    end)
end

function PerformanceOptimizer:addBatchOperation(operation, data)
    table.insert(self.batchOperations.queue, {
        operation = operation,
        data = data,
        timestamp = tick()
    })
end

function PerformanceOptimizer:processBatchOperations()
    if #self.batchOperations.queue == 0 then
        return
    end
    
    local batchSize = math.min(#self.batchOperations.queue, self.batchOperations.maxBatchSize)
    local batch = {}
    
    for i = 1, batchSize do
        table.insert(batch, table.remove(self.batchOperations.queue, 1))
    end
    
    -- Process batch
    self:executeBatch(batch)
end

function PerformanceOptimizer:executeBatch(batch)
    local startTime = tick()
    
    for _, operation in ipairs(batch) do
        if operation.operation == "createPart" then
            self:createPartBatch(operation.data)
        elseif operation.operation == "updatePosition" then
            self:updatePositionBatch(operation.data)
        elseif operation.operation == "destroyObject" then
            self:destroyObjectBatch(operation.data)
        end
    end
    
    local endTime = tick()
    print("Processed batch of", #batch, "operations in", (endTime - startTime) * 1000, "ms")
end

function PerformanceOptimizer:createPartBatch(data)
    for _, partData in ipairs(data) do
        local part = Instance.new("Part")
        part.Name = partData.name or "BatchPart"
        part.Size = partData.size or Vector3.new(4, 4, 4)
        part.Position = partData.position or Vector3.new(0, 0, 0)
        part.Color = partData.color or Color3.fromRGB(255, 255, 255)
        part.Parent = workspace
    end
end

function PerformanceOptimizer:updatePositionBatch(data)
    for _, updateData in ipairs(data) do
        if updateData.object and updateData.object.Parent then
            updateData.object.Position = updateData.position
        end
    end
end

function PerformanceOptimizer:destroyObjectBatch(data)
    for _, object in ipairs(data) do
        if object and object.Parent then
            object:Destroy()
        end
    end
end

function PerformanceOptimizer:setupAsyncProcessing()
    self.asyncQueue = {
        tasks = {},
        maxConcurrentTasks = 5,
        activeTasks = 0
    }
    
    -- Process async tasks
    RunService.Heartbeat:Connect(function()
        self:processAsyncTasks()
    end)
end

function PerformanceOptimizer:addAsyncTask(task, priority)
    table.insert(self.asyncQueue.tasks, {
        task = task,
        priority = priority or 1,
        timestamp = tick()
    })
    
    -- Sort by priority
    table.sort(self.asyncQueue.tasks, function(a, b)
        return a.priority > b.priority
    end)
end

function PerformanceOptimizer:processAsyncTasks()
    if self.asyncQueue.activeTasks >= self.asyncQueue.maxConcurrentTasks then
        return
    end
    
    if #self.asyncQueue.tasks == 0 then
        return
    end
    
    local task = table.remove(self.asyncQueue.tasks, 1)
    self.asyncQueue.activeTasks = self.asyncQueue.activeTasks + 1
    
    -- Execute task asynchronously
    spawn(function()
        local success, result = pcall(task.task)
        self.asyncQueue.activeTasks = self.asyncQueue.activeTasks - 1
        
        if not success then
            warn("Async task failed:", result)
        end
    end)
end

function PerformanceOptimizer:triggerOptimization()
    print("Performance optimization triggered")
    
    -- Reduce quality settings
    self:reduceQualitySettings()
    
    -- Optimize memory usage
    self:optimizeMemoryUsage()
    
    -- Clean up unused objects
    self:cleanupUnusedObjects()
    
    performanceMetrics.lastOptimization = tick()
end

function PerformanceOptimizer:reduceQualitySettings()
    -- Reduce lighting quality
    game.Lighting.GlobalShadows = false
    game.Lighting.ShadowSoftness = 0.2
    
    -- Reduce particle effects
    for _, effect in pairs(workspace:GetDescendants()) do
        if effect:IsA("ParticleEmitter") then
            effect.Enabled = false
        end
    end
    
    print("Quality settings reduced for performance")
end

function PerformanceOptimizer:optimizeMemoryUsage()
    -- Clear unused textures
    for _, texture in pairs(workspace:GetDescendants()) do
        if texture:IsA("Texture") and not texture.Parent.Parent then
            texture:Destroy()
        end
    end
    
    -- Optimize scripts
    for _, script in pairs(workspace:GetDescendants()) do
        if script:IsA("Script") and script.Parent == nil then
            script:Destroy()
        end
    end
    
    print("Memory usage optimized")
end

function PerformanceOptimizer:cleanupUnusedObjects()
    local cleanupCount = 0
    
    for _, object in pairs(workspace:GetDescendants()) do
        if object:IsA("Part") and not object.Parent.Parent then
            if (object.Position - Vector3.new(0, 0, 0)).Magnitude > 1000 then
                object:Destroy()
                cleanupCount = cleanupCount + 1
            end
        end
    end
    
    print("Cleaned up", cleanupCount, "unused objects")
end

function PerformanceOptimizer:getPerformanceMetrics()
    return {
        frameRate = self.frameRateMonitor.averageFPS,
        memoryUsage = self.memoryMonitor.currentUsage,
        memoryPeak = self.memoryMonitor.peakUsage,
        garbageCollections = self.memoryMonitor.garbageCollectionCount,
        averageExecutionTime = self.profiler.averageTime,
        activeObjects = self:countActiveObjects(),
        optimizationCount = performanceMetrics.lastOptimization
    }
end

function PerformanceOptimizer:countActiveObjects()
    local count = 0
    for _ in pairs(workspace:GetDescendants()) do
        count = count + 1
    end
    return count
end

-- 2. DEMO THE SYSTEMS
print("\\n2. RUNNING SYSTEM DEMONSTRATIONS...")

-- Create systems
local performanceOptimizer = PerformanceOptimizer.new()

-- Test performance systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
        -- Setup LOD system for player
        local lodLevels = {
            {transparency = 0, size = Vector3.new(4, 4, 4), material = Enum.Material.Plastic},
            {transparency = 0.2, size = Vector3.new(3, 3, 3), material = Enum.Material.Plastic},
            {transparency = 0.5, size = Vector3.new(2, 2, 2), material = Enum.Material.Plastic}
        }
        
        performanceOptimizer:registerLODObject(player.Character.HumanoidRootPart, lodLevels)
        
        -- Add to culling system
        performanceOptimizer.cullingSystem.culledObjects[player.Character.HumanoidRootPart] = true
    end
    
    -- Test batch operations
    for i = 1, 10 do
        performanceOptimizer:addBatchOperation("createPart", {
            {name = "TestPart" .. i, position = Vector3.new(i * 10, 0, 0)}
        })
    end
    
    -- Test async tasks
    performanceOptimizer:addAsyncTask(function()
        wait(1)
        print("Async task completed for", player.Name)
    end, 2)
    
    print("Applied performance optimization tests to", player.Name)
end)

-- Monitor performance
RunService.Heartbeat:Connect(function()
    local metrics = performanceOptimizer:getPerformanceMetrics()
    
    if tick() % 10 < 0.1 then -- Print every 10 seconds
        print("Performance Metrics:")
        print("  FPS:", string.format("%.1f", metrics.frameRate))
        print("  Memory:", string.format("%.1f", metrics.memoryUsage), "MB")
        print("  Active Objects:", metrics.activeObjects)
    end
end)

print("\\n=== ADVANCED PERFORMANCE OPTIMIZATION DEMO COMPLETE ===")
print("You've learned performance optimization techniques, memory management, and optimization systems!")`,
    challenge: {
      tests: [
        { description: 'Create performance optimization system with profiling', type: 'code_contains', value: 'setupProfiling' },
        { description: 'Implement memory monitoring and garbage collection', type: 'code_contains', value: 'monitorMemoryUsage' },
        { description: 'Build object pooling and LOD systems', type: 'code_contains', value: 'setupObjectPooling' }
      ],
      hints: [
        'Use collectgarbage() to manage memory and prevent memory leaks',
        'Implement object pooling to reuse objects instead of creating new ones',
        'Use LOD (Level of Detail) systems to reduce rendering load for distant objects',
        'Monitor frame rate and automatically reduce quality when performance drops',
        'Use batch operations to group similar operations together for better performance'
      ],
      successMessage: 'Excellent! You now understand advanced performance optimization techniques, memory management, and optimization systems. These skills are essential for creating smooth, efficient Roblox games!'
    }
  },

  // === ADVANCED GUI SYSTEMS ===
  'advanced-gui-systems': {
    title: 'Advanced GUI Systems & Custom Components',
    description: 'Create sophisticated user interfaces with custom components and responsive design',
    sections: [
      {
        title: 'Custom GUI Components & Responsive Design',
        content: `Advanced GUI systems enable you to create sophisticated, responsive user interfaces that adapt to different screen sizes and provide excellent user experiences.

**Custom Component Architecture:**
- **Component-Based Design**: Reusable GUI components for consistent UI
- **Responsive Layouts**: Adapting to different screen sizes and orientations
- **Theme Systems**: Consistent styling across your application
- **Animation Systems**: Smooth transitions and micro-interactions
- **Accessibility Features**: Making UI accessible to all users

**Advanced GUI Techniques:**
- **Dynamic Layouts**: Automatic positioning and sizing
- **Custom Controls**: Building specialized input components
- **Data Binding**: Connecting UI elements to data sources
- **Event Systems**: Advanced event handling and propagation
- **Performance Optimization**: Efficient GUI rendering and updates`,
        codeExample: `-- Advanced GUI systems and custom components

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local TextService = game:GetService("TextService")

local AdvancedGUI = {}
AdvancedGUI.__index = AdvancedGUI

-- GUI configuration
local GUI_CONFIG = {
    THEME = {
        PRIMARY_COLOR = Color3.fromRGB(0, 120, 215),
        SECONDARY_COLOR = Color3.fromRGB(107, 107, 107),
        SUCCESS_COLOR = Color3.fromRGB(16, 124, 16),
        WARNING_COLOR = Color3.fromRGB(255, 185, 0),
        ERROR_COLOR = Color3.fromRGB(232, 17, 35),
        BACKGROUND_COLOR = Color3.fromRGB(30, 30, 30),
        SURFACE_COLOR = Color3.fromRGB(40, 40, 40),
        TEXT_COLOR = Color3.fromRGB(255, 255, 255),
        BORDER_COLOR = Color3.fromRGB(60, 60, 60)
    },
    ANIMATION = {
        DURATION = 0.3,
        EASING_STYLE = Enum.EasingStyle.Quart,
        EASING_DIRECTION = Enum.EasingDirection.Out
    },
    RESPONSIVE = {
        BREAKPOINTS = {
            MOBILE = 480,
            TABLET = 768,
            DESKTOP = 1024
        }
    }
}

function AdvancedGUI.new()
    local self = setmetatable({}, AdvancedGUI)
    
    -- GUI systems
    self.components = {}
    self.themes = {}
    self.animations = {}
    self.responsive = {}
    self.accessibility = {}
    
    -- Setup systems
    self:setupThemeSystem()
    self:setupAnimationSystem()
    self:setupResponsiveSystem()
    self:setupAccessibilitySystem()
    
    return self
end

function AdvancedGUI:setupThemeSystem()
    self.themes = {
        current = "dark",
        themes = {
            dark = GUI_CONFIG.THEME,
            light = {
                PRIMARY_COLOR = Color3.fromRGB(0, 120, 215),
                SECONDARY_COLOR = Color3.fromRGB(107, 107, 107),
                SUCCESS_COLOR = Color3.fromRGB(16, 124, 16),
                WARNING_COLOR = Color3.fromRGB(255, 185, 0),
                ERROR_COLOR = Color3.fromRGB(232, 17, 35),
                BACKGROUND_COLOR = Color3.fromRGB(255, 255, 255),
                SURFACE_COLOR = Color3.fromRGB(245, 245, 245),
                TEXT_COLOR = Color3.fromRGB(0, 0, 0),
                BORDER_COLOR = Color3.fromRGB(200, 200, 200)
            }
        }
    }
    
    print("Theme system initialized")
end

function AdvancedGUI:setupAnimationSystem()
    self.animations = {
        activeTweens = {},
        tweenQueue = {},
        maxConcurrentTweens = 10
    }
    
    print("Animation system initialized")
end

function AdvancedGUI:setupResponsiveSystem()
    self.responsive = {
        currentBreakpoint = "desktop",
        screenSize = Vector2.new(1920, 1080),
        orientation = "landscape"
    }
    
    -- Monitor screen size changes
    UserInputService:GetPropertyChangedSignal("ViewportSize"):Connect(function()
        self:updateResponsiveLayout()
    end)
    
    print("Responsive system initialized")
end

function AdvancedGUI:setupAccessibilitySystem()
    self.accessibility = {
        highContrast = false,
        largeText = false,
        screenReader = false,
        keyboardNavigation = true
    }
    
    print("Accessibility system initialized")
end

function AdvancedGUI:createCustomButton(config)
    local button = Instance.new("TextButton")
    button.Name = config.name or "CustomButton"
    button.Size = config.size or UDim2.new(0, 120, 0, 40)
    button.Position = config.position or UDim2.new(0, 0, 0, 0)
    button.BackgroundColor3 = self:getThemeColor("PRIMARY_COLOR")
    button.TextColor3 = self:getThemeColor("TEXT_COLOR")
    button.Text = config.text or "Button"
    button.Font = Enum.Font.Gotham
    button.TextSize = 14
    button.BorderSizePixel = 0
    button.AutoButtonColor = false
    
    -- Add rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 8)
    corner.Parent = button
    
    -- Add hover effects
    self:addHoverEffects(button)
    
    -- Add click animation
    self:addClickAnimation(button)
    
    -- Add accessibility features
    self:addAccessibilityFeatures(button)
    
    return button
end

function AdvancedGUI:createCustomInput(config)
    local inputFrame = Instance.new("Frame")
    inputFrame.Name = config.name or "CustomInput"
    inputFrame.Size = config.size or UDim2.new(0, 200, 0, 40)
    inputFrame.Position = config.position or UDim2.new(0, 0, 0, 0)
    inputFrame.BackgroundColor3 = self:getThemeColor("SURFACE_COLOR")
    inputFrame.BorderSizePixel = 0
    
    -- Add rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 8)
    corner.Parent = inputFrame
    
    -- Add border
    local border = Instance.new("UIStroke")
    border.Color = self:getThemeColor("BORDER_COLOR")
    border.Thickness = 1
    border.Parent = inputFrame
    
    -- Add text input
    local textBox = Instance.new("TextBox")
    textBox.Name = "TextBox"
    textBox.Size = UDim2.new(1, -16, 1, -16)
    textBox.Position = UDim2.new(0, 8, 0, 8)
    textBox.BackgroundTransparency = 1
    textBox.Text = config.placeholder or ""
    textBox.PlaceholderText = config.placeholder or "Enter text..."
    textBox.TextColor3 = self:getThemeColor("TEXT_COLOR")
    textBox.PlaceholderColor3 = self:getThemeColor("SECONDARY_COLOR")
    textBox.Font = Enum.Font.Gotham
    textBox.TextSize = 14
    textBox.TextXAlignment = Enum.TextXAlignment.Left
    textBox.Parent = inputFrame
    
    -- Add focus effects
    self:addFocusEffects(inputFrame, textBox)
    
    return inputFrame
end

function AdvancedGUI:createCustomCard(config)
    local card = Instance.new("Frame")
    card.Name = config.name or "CustomCard"
    card.Size = config.size or UDim2.new(0, 300, 0, 200)
    card.Position = config.position or UDim2.new(0, 0, 0, 0)
    card.BackgroundColor3 = self:getThemeColor("SURFACE_COLOR")
    card.BorderSizePixel = 0
    
    -- Add rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = card
    
    -- Add shadow effect
    local shadow = Instance.new("ImageLabel")
    shadow.Name = "Shadow"
    shadow.Size = UDim2.new(1, 4, 1, 4)
    shadow.Position = UDim2.new(0, -2, 0, -2)
    shadow.BackgroundTransparency = 1
    shadow.Image = "rbxasset://textures/ui/GuiImagePlaceholder.png"
    shadow.ImageColor3 = Color3.new(0, 0, 0)
    shadow.ImageTransparency = 0.5
    shadow.ZIndex = card.ZIndex - 1
    shadow.Parent = card.Parent
    
    -- Add content
    if config.title then
        local title = Instance.new("TextLabel")
        title.Name = "Title"
        title.Size = UDim2.new(1, -16, 0, 24)
        title.Position = UDim2.new(0, 8, 0, 8)
        title.BackgroundTransparency = 1
        title.Text = config.title
        title.TextColor3 = self:getThemeColor("TEXT_COLOR")
        title.Font = Enum.Font.GothamBold
        title.TextSize = 16
        title.TextXAlignment = Enum.TextXAlignment.Left
        title.Parent = card
    end
    
    if config.content then
        local content = Instance.new("TextLabel")
        content.Name = "Content"
        content.Size = UDim2.new(1, -16, 1, -40)
        content.Position = UDim2.new(0, 8, 0, 32)
        content.BackgroundTransparency = 1
        content.Text = config.content
        content.TextColor3 = self:getThemeColor("SECONDARY_COLOR")
        content.Font = Enum.Font.Gotham
        content.TextSize = 14
        content.TextXAlignment = Enum.TextXAlignment.Left
        content.TextYAlignment = Enum.TextYAlignment.Top
        content.TextWrapped = true
        content.Parent = card
    end
    
    -- Add hover effects
    self:addHoverEffects(card)
    
    return card
end

function AdvancedGUI:createCustomModal(config)
    local modal = Instance.new("Frame")
    modal.Name = config.name or "CustomModal"
    modal.Size = UDim2.new(1, 0, 1, 0)
    modal.Position = UDim2.new(0, 0, 0, 0)
    modal.BackgroundColor3 = Color3.new(0, 0, 0)
    modal.BackgroundTransparency = 0.5
    modal.BorderSizePixel = 0
    modal.ZIndex = 1000
    
    -- Add modal content
    local content = Instance.new("Frame")
    content.Name = "Content"
    content.Size = config.size or UDim2.new(0, 400, 0, 300)
    content.Position = UDim2.new(0.5, -200, 0.5, -150)
    content.BackgroundColor3 = self:getThemeColor("SURFACE_COLOR")
    content.BorderSizePixel = 0
    content.Parent = modal
    
    -- Add rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = content
    
    -- Add close button
    local closeButton = Instance.new("TextButton")
    closeButton.Name = "CloseButton"
    closeButton.Size = UDim2.new(0, 24, 0, 24)
    closeButton.Position = UDim2.new(1, -32, 0, 8)
    closeButton.BackgroundColor3 = self:getThemeColor("ERROR_COLOR")
    closeButton.TextColor3 = self:getThemeColor("TEXT_COLOR")
    closeButton.Text = "×"
    closeButton.Font = Enum.Font.GothamBold
    closeButton.TextSize = 18
    closeButton.BorderSizePixel = 0
    closeButton.Parent = content
    
    -- Add close button corner
    local closeCorner = Instance.new("UICorner")
    closeCorner.CornerRadius = UDim.new(0, 12)
    closeCorner.Parent = closeButton
    
    -- Add modal content
    if config.title then
        local title = Instance.new("TextLabel")
        title.Name = "Title"
        title.Size = UDim2.new(1, -48, 0, 32)
        title.Position = UDim2.new(0, 16, 0, 16)
        title.BackgroundTransparency = 1
        title.Text = config.title
        title.TextColor3 = self:getThemeColor("TEXT_COLOR")
        title.Font = Enum.Font.GothamBold
        title.TextSize = 18
        title.TextXAlignment = Enum.TextXAlignment.Left
        title.Parent = content
    end
    
    -- Add close functionality
    closeButton.MouseButton1Click:Connect(function()
        self:closeModal(modal)
    end)
    
    -- Add escape key functionality
    local connection
    connection = UserInputService.InputBegan:Connect(function(input)
        if input.KeyCode == Enum.KeyCode.Escape then
            self:closeModal(modal)
            connection:Disconnect()
        end
    end)
    
    -- Add entrance animation
    self:animateModalEntrance(modal)
    
    return modal
end

function AdvancedGUI:addHoverEffects(element)
    local originalColor = element.BackgroundColor3
    local hoverColor = self:lightenColor(originalColor, 0.1)
    
    element.MouseEnter:Connect(function()
        self:animateColor(element, "BackgroundColor3", hoverColor)
    end)
    
    element.MouseLeave:Connect(function()
        self:animateColor(element, "BackgroundColor3", originalColor)
    end)
end

function AdvancedGUI:addClickAnimation(element)
    element.MouseButton1Down:Connect(function()
        self:animateScale(element, 0.95)
    end)
    
    element.MouseButton1Up:Connect(function()
        self:animateScale(element, 1)
    end)
end

function AdvancedGUI:addFocusEffects(frame, textBox)
    local originalBorderColor = frame:FindFirstChild("UIStroke").Color
    
    textBox.Focused:Connect(function()
        self:animateColor(frame:FindFirstChild("UIStroke"), "Color", self:getThemeColor("PRIMARY_COLOR"))
    end)
    
    textBox.FocusLost:Connect(function()
        self:animateColor(frame:FindFirstChild("UIStroke"), "Color", originalBorderColor)
    end)
end

function AdvancedGUI:addAccessibilityFeatures(element)
    -- Add keyboard navigation
    if self.accessibility.keyboardNavigation then
        element:SetAttribute("TabOrder", 0)
    end
    
    -- Add screen reader support
    if self.accessibility.screenReader then
        element:SetAttribute("ScreenReaderText", element.Text or element.Name)
    end
    
    -- Add high contrast support
    if self.accessibility.highContrast then
        element.BackgroundColor3 = self:getHighContrastColor(element.BackgroundColor3)
        element.TextColor3 = self:getHighContrastColor(element.TextColor3)
    end
end

function AdvancedGUI:animateColor(element, property, targetColor)
    local tween = TweenService:Create(
        element,
        TweenInfo.new(
            GUI_CONFIG.ANIMATION.DURATION,
            GUI_CONFIG.ANIMATION.EASING_STYLE,
            GUI_CONFIG.ANIMATION.EASING_DIRECTION
        ),
        {[property] = targetColor}
    )
    
    tween:Play()
    return tween
end

function AdvancedGUI:animateScale(element, targetScale)
    local tween = TweenService:Create(
        element,
        TweenInfo.new(
            GUI_CONFIG.ANIMATION.DURATION * 0.5,
            GUI_CONFIG.ANIMATION.EASING_STYLE,
            GUI_CONFIG.ANIMATION.EASING_DIRECTION
        ),
        {Size = UDim2.new(element.Size.X.Scale * targetScale, element.Size.X.Offset * targetScale, element.Size.Y.Scale * targetScale, element.Size.Y.Offset * targetScale)}
    )
    
    tween:Play()
    return tween
end

function AdvancedGUI:animateModalEntrance(modal)
    modal.BackgroundTransparency = 1
    local content = modal:FindFirstChild("Content")
    content.Size = UDim2.new(0, 0, 0, 0)
    content.Position = UDim2.new(0.5, 0, 0.5, 0)
    
    -- Animate background
    local backgroundTween = TweenService:Create(
        modal,
        TweenInfo.new(GUI_CONFIG.ANIMATION.DURATION, GUI_CONFIG.ANIMATION.EASING_STYLE, GUI_CONFIG.ANIMATION.EASING_DIRECTION),
        {BackgroundTransparency = 0.5}
    )
    
    -- Animate content
    local contentTween = TweenService:Create(
        content,
        TweenInfo.new(GUI_CONFIG.ANIMATION.DURATION, GUI_CONFIG.ANIMATION.EASING_STYLE, GUI_CONFIG.ANIMATION.EASING_DIRECTION),
        {
            Size = UDim2.new(0, 400, 0, 300),
            Position = UDim2.new(0.5, -200, 0.5, -150)
        }
    )
    
    backgroundTween:Play()
    contentTween:Play()
end

function AdvancedGUI:closeModal(modal)
    local content = modal:FindFirstChild("Content")
    
    -- Animate exit
    local backgroundTween = TweenService:Create(
        modal,
        TweenInfo.new(GUI_CONFIG.ANIMATION.DURATION, GUI_CONFIG.ANIMATION.EASING_STYLE, GUI_CONFIG.ANIMATION.EASING_DIRECTION),
        {BackgroundTransparency = 1}
    )
    
    local contentTween = TweenService:Create(
        content,
        TweenInfo.new(GUI_CONFIG.ANIMATION.DURATION, GUI_CONFIG.ANIMATION.EASING_STYLE, GUI_CONFIG.ANIMATION.EASING_DIRECTION),
        {
            Size = UDim2.new(0, 0, 0, 0),
            Position = UDim2.new(0.5, 0, 0.5, 0)
        }
    )
    
    backgroundTween:Play()
    contentTween:Play()
    
    contentTween.Completed:Connect(function()
        modal:Destroy()
    end)
end

function AdvancedGUI:updateResponsiveLayout()
    local viewportSize = UserInputService.ViewportSize
    self.responsive.screenSize = viewportSize
    
    -- Determine breakpoint
    local breakpoint = "desktop"
    if viewportSize.X <= GUI_CONFIG.RESPONSIVE.BREAKPOINTS.MOBILE then
        breakpoint = "mobile"
    elseif viewportSize.X <= GUI_CONFIG.RESPONSIVE.BREAKPOINTS.TABLET then
        breakpoint = "tablet"
    end
    
    self.responsive.currentBreakpoint = breakpoint
    
    -- Update orientation
    local orientation = viewportSize.X > viewportSize.Y and "landscape" or "portrait"
    self.responsive.orientation = orientation
    
    -- Update all components
    self:updateAllComponents()
    
    print("Responsive layout updated:", breakpoint, orientation)
end

function AdvancedGUI:updateAllComponents()
    for _, component in pairs(self.components) do
        if component.UpdateLayout then
            component:UpdateLayout(self.responsive.currentBreakpoint, self.responsive.orientation)
        end
    end
end

function AdvancedGUI:getThemeColor(colorName)
    return self.themes.themes[self.themes.current][colorName]
end

function AdvancedGUI:setTheme(themeName)
    if self.themes.themes[themeName] then
        self.themes.current = themeName
        self:updateAllComponents()
        print("Theme changed to:", themeName)
    end
end

function AdvancedGUI:lightenColor(color, amount)
    local r, g, b = color.R, color.G, color.B
    return Color3.new(math.min(1, r + amount), math.min(1, g + amount), math.min(1, b + amount))
end

function AdvancedGUI:getHighContrastColor(color)
    local brightness = (color.R + color.G + color.B) / 3
    return brightness > 0.5 and Color3.new(0, 0, 0) or Color3.new(1, 1, 1)
end

function AdvancedGUI:createResponsiveGrid(config)
    local grid = Instance.new("Frame")
    grid.Name = config.name or "ResponsiveGrid"
    grid.Size = config.size or UDim2.new(1, 0, 1, 0)
    grid.Position = config.position or UDim2.new(0, 0, 0, 0)
    grid.BackgroundTransparency = 1
    grid.BorderSizePixel = 0
    
    -- Add grid layout
    local gridLayout = Instance.new("UIGridLayout")
    gridLayout.CellSize = config.cellSize or UDim2.new(0, 200, 0, 150)
    gridLayout.CellPadding = config.cellPadding or UDim2.new(0, 10, 0, 10)
    gridLayout.SortOrder = Enum.SortOrder.LayoutOrder
    gridLayout.Parent = grid
    
    -- Store reference for responsive updates
    grid.UpdateLayout = function(breakpoint, orientation)
        if breakpoint == "mobile" then
            gridLayout.CellSize = UDim2.new(1, -20, 0, 100)
            gridLayout.CellPadding = UDim2.new(0, 5, 0, 5)
        elseif breakpoint == "tablet" then
            gridLayout.CellSize = UDim2.new(0, 150, 0, 120)
            gridLayout.CellPadding = UDim2.new(0, 8, 0, 8)
        else
            gridLayout.CellSize = config.cellSize or UDim2.new(0, 200, 0, 150)
            gridLayout.CellPadding = config.cellPadding or UDim2.new(0, 10, 0, 10)
        end
    end
    
    -- Register component
    table.insert(self.components, grid)
    
    return grid
end

-- Example usage
local advancedGUI = AdvancedGUI.new()

-- Test GUI systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Create test screen GUI
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "AdvancedGUITest"
    screenGui.Parent = playerGui
    
    -- Create custom button
    local button = advancedGUI:createCustomButton({
        name = "TestButton",
        text = "Click Me!",
        size = UDim2.new(0, 120, 0, 40),
        position = UDim2.new(0, 20, 0, 20)
    })
    button.Parent = screenGui
    
    -- Create custom input
    local input = advancedGUI:createCustomInput({
        name = "TestInput",
        placeholder = "Enter your name...",
        size = UDim2.new(0, 200, 0, 40),
        position = UDim2.new(0, 20, 0, 80)
    })
    input.Parent = screenGui
    
    -- Create custom card
    local card = advancedGUI:createCustomCard({
        name = "TestCard",
        title = "Welcome!",
        content = "This is a custom card component with advanced styling and animations.",
        size = UDim2.new(0, 300, 0, 150),
        position = UDim2.new(0, 20, 0, 140)
    })
    card.Parent = screenGui
    
    -- Create responsive grid
    local grid = advancedGUI:createResponsiveGrid({
        name = "TestGrid",
        size = UDim2.new(0, 400, 0, 300),
        position = UDim2.new(0, 340, 0, 20),
        cellSize = UDim2.new(0, 120, 0, 80),
        cellPadding = UDim2.new(0, 10, 0, 10)
    })
    grid.Parent = screenGui
    
    -- Add grid items
    for i = 1, 6 do
        local item = advancedGUI:createCustomCard({
            name = "GridItem" .. i,
            title = "Item " .. i,
            content = "Grid item " .. i,
            size = UDim2.new(1, 0, 1, 0)
        })
        item.Parent = grid
    end
    
    -- Test modal
    button.MouseButton1Click:Connect(function()
        local modal = advancedGUI:createCustomModal({
            name = "TestModal",
            title = "Test Modal",
            size = UDim2.new(0, 400, 0, 300)
        })
        modal.Parent = screenGui
    end)
    
    print("Applied advanced GUI tests to", player.Name)
end)

print("Advanced GUI system initialized with custom components, responsive design, and accessibility features")`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Advanced GUI Systems & Custom Components - Comprehensive Learning Example
-- Create sophisticated user interfaces with custom components and responsive design

print("=== ADVANCED GUI SYSTEMS & CUSTOM COMPONENTS DEMO ===")
print("Learning advanced GUI systems and custom component architecture...")

-- 1. CUSTOM GUI COMPONENTS & RESPONSIVE DESIGN
print("\\n1. DEMONSTRATING CUSTOM GUI COMPONENTS & RESPONSIVE DESIGN...")

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local TextService = game:GetService("TextService")

local AdvancedGUI = {}
AdvancedGUI.__index = AdvancedGUI

-- GUI configuration
local GUI_CONFIG = {
    THEME = {
        PRIMARY_COLOR = Color3.fromRGB(0, 120, 215),
        SECONDARY_COLOR = Color3.fromRGB(107, 107, 107),
        SUCCESS_COLOR = Color3.fromRGB(16, 124, 16),
        WARNING_COLOR = Color3.fromRGB(255, 185, 0),
        ERROR_COLOR = Color3.fromRGB(232, 17, 35),
        BACKGROUND_COLOR = Color3.fromRGB(30, 30, 30),
        SURFACE_COLOR = Color3.fromRGB(40, 40, 40),
        TEXT_COLOR = Color3.fromRGB(255, 255, 255),
        BORDER_COLOR = Color3.fromRGB(60, 60, 60)
    },
    ANIMATION = {
        DURATION = 0.3,
        EASING_STYLE = Enum.EasingStyle.Quart,
        EASING_DIRECTION = Enum.EasingDirection.Out
    },
    RESPONSIVE = {
        BREAKPOINTS = {
            MOBILE = 480,
            TABLET = 768,
            DESKTOP = 1024
        }
    }
}

function AdvancedGUI.new()
    local self = setmetatable({}, AdvancedGUI)
    
    -- GUI systems
    self.components = {}
    self.themes = {}
    self.animations = {}
    self.responsive = {}
    self.accessibility = {}
    
    -- Setup systems
    self:setupThemeSystem()
    self:setupAnimationSystem()
    self:setupResponsiveSystem()
    self:setupAccessibilitySystem()
    
    return self
end

function AdvancedGUI:setupThemeSystem()
    self.themes = {
        current = "dark",
        themes = {
            dark = GUI_CONFIG.THEME,
            light = {
                PRIMARY_COLOR = Color3.fromRGB(0, 120, 215),
                SECONDARY_COLOR = Color3.fromRGB(107, 107, 107),
                SUCCESS_COLOR = Color3.fromRGB(16, 124, 16),
                WARNING_COLOR = Color3.fromRGB(255, 185, 0),
                ERROR_COLOR = Color3.fromRGB(232, 17, 35),
                BACKGROUND_COLOR = Color3.fromRGB(255, 255, 255),
                SURFACE_COLOR = Color3.fromRGB(245, 245, 245),
                TEXT_COLOR = Color3.fromRGB(0, 0, 0),
                BORDER_COLOR = Color3.fromRGB(200, 200, 200)
            }
        }
    }
    
    print("Theme system initialized")
end

function AdvancedGUI:setupAnimationSystem()
    self.animations = {
        activeTweens = {},
        tweenQueue = {},
        maxConcurrentTweens = 10
    }
    
    print("Animation system initialized")
end

function AdvancedGUI:setupResponsiveSystem()
    self.responsive = {
        currentBreakpoint = "desktop",
        screenSize = Vector2.new(1920, 1080),
        orientation = "landscape"
    }
    
    -- Monitor screen size changes
    UserInputService:GetPropertyChangedSignal("ViewportSize"):Connect(function()
        self:updateResponsiveLayout()
    end)
    
    print("Responsive system initialized")
end

function AdvancedGUI:setupAccessibilitySystem()
    self.accessibility = {
        highContrast = false,
        largeText = false,
        screenReader = false,
        keyboardNavigation = true
    }
    
    print("Accessibility system initialized")
end

function AdvancedGUI:createCustomButton(config)
    local button = Instance.new("TextButton")
    button.Name = config.name or "CustomButton"
    button.Size = config.size or UDim2.new(0, 120, 0, 40)
    button.Position = config.position or UDim2.new(0, 0, 0, 0)
    button.BackgroundColor3 = self:getThemeColor("PRIMARY_COLOR")
    button.TextColor3 = self:getThemeColor("TEXT_COLOR")
    button.Text = config.text or "Button"
    button.Font = Enum.Font.Gotham
    button.TextSize = 14
    button.BorderSizePixel = 0
    button.AutoButtonColor = false
    
    -- Add rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 8)
    corner.Parent = button
    
    -- Add hover effects
    self:addHoverEffects(button)
    
    -- Add click animation
    self:addClickAnimation(button)
    
    -- Add accessibility features
    self:addAccessibilityFeatures(button)
    
    return button
end

function AdvancedGUI:createCustomInput(config)
    local inputFrame = Instance.new("Frame")
    inputFrame.Name = config.name or "CustomInput"
    inputFrame.Size = config.size or UDim2.new(0, 200, 0, 40)
    inputFrame.Position = config.position or UDim2.new(0, 0, 0, 0)
    inputFrame.BackgroundColor3 = self:getThemeColor("SURFACE_COLOR")
    inputFrame.BorderSizePixel = 0
    
    -- Add rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 8)
    corner.Parent = inputFrame
    
    -- Add border
    local border = Instance.new("UIStroke")
    border.Color = self:getThemeColor("BORDER_COLOR")
    border.Thickness = 1
    border.Parent = inputFrame
    
    -- Add text input
    local textBox = Instance.new("TextBox")
    textBox.Name = "TextBox"
    textBox.Size = UDim2.new(1, -16, 1, -16)
    textBox.Position = UDim2.new(0, 8, 0, 8)
    textBox.BackgroundTransparency = 1
    textBox.Text = config.placeholder or ""
    textBox.PlaceholderText = config.placeholder or "Enter text..."
    textBox.TextColor3 = self:getThemeColor("TEXT_COLOR")
    textBox.PlaceholderColor3 = self:getThemeColor("SECONDARY_COLOR")
    textBox.Font = Enum.Font.Gotham
    textBox.TextSize = 14
    textBox.TextXAlignment = Enum.TextXAlignment.Left
    textBox.Parent = inputFrame
    
    -- Add focus effects
    self:addFocusEffects(inputFrame, textBox)
    
    return inputFrame
end

function AdvancedGUI:createCustomCard(config)
    local card = Instance.new("Frame")
    card.Name = config.name or "CustomCard"
    card.Size = config.size or UDim2.new(0, 300, 0, 200)
    card.Position = config.position or UDim2.new(0, 0, 0, 0)
    card.BackgroundColor3 = self:getThemeColor("SURFACE_COLOR")
    card.BorderSizePixel = 0
    
    -- Add rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = card
    
    -- Add shadow effect
    local shadow = Instance.new("ImageLabel")
    shadow.Name = "Shadow"
    shadow.Size = UDim2.new(1, 4, 1, 4)
    shadow.Position = UDim2.new(0, -2, 0, -2)
    shadow.BackgroundTransparency = 1
    shadow.Image = "rbxasset://textures/ui/GuiImagePlaceholder.png"
    shadow.ImageColor3 = Color3.new(0, 0, 0)
    shadow.ImageTransparency = 0.5
    shadow.ZIndex = card.ZIndex - 1
    shadow.Parent = card.Parent
    
    -- Add content
    if config.title then
        local title = Instance.new("TextLabel")
        title.Name = "Title"
        title.Size = UDim2.new(1, -16, 0, 24)
        title.Position = UDim2.new(0, 8, 0, 8)
        title.BackgroundTransparency = 1
        title.Text = config.title
        title.TextColor3 = self:getThemeColor("TEXT_COLOR")
        title.Font = Enum.Font.GothamBold
        title.TextSize = 16
        title.TextXAlignment = Enum.TextXAlignment.Left
        title.Parent = card
    end
    
    if config.content then
        local content = Instance.new("TextLabel")
        content.Name = "Content"
        content.Size = UDim2.new(1, -16, 1, -40)
        content.Position = UDim2.new(0, 8, 0, 32)
        content.BackgroundTransparency = 1
        content.Text = config.content
        content.TextColor3 = self:getThemeColor("SECONDARY_COLOR")
        content.Font = Enum.Font.Gotham
        content.TextSize = 14
        content.TextXAlignment = Enum.TextXAlignment.Left
        content.TextYAlignment = Enum.TextYAlignment.Top
        content.TextWrapped = true
        content.Parent = card
    end
    
    -- Add hover effects
    self:addHoverEffects(card)
    
    return card
end

function AdvancedGUI:createCustomModal(config)
    local modal = Instance.new("Frame")
    modal.Name = config.name or "CustomModal"
    modal.Size = UDim2.new(1, 0, 1, 0)
    modal.Position = UDim2.new(0, 0, 0, 0)
    modal.BackgroundColor3 = Color3.new(0, 0, 0)
    modal.BackgroundTransparency = 0.5
    modal.BorderSizePixel = 0
    modal.ZIndex = 1000
    
    -- Add modal content
    local content = Instance.new("Frame")
    content.Name = "Content"
    content.Size = config.size or UDim2.new(0, 400, 0, 300)
    content.Position = UDim2.new(0.5, -200, 0.5, -150)
    content.BackgroundColor3 = self:getThemeColor("SURFACE_COLOR")
    content.BorderSizePixel = 0
    content.Parent = modal
    
    -- Add rounded corners
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = content
    
    -- Add close button
    local closeButton = Instance.new("TextButton")
    closeButton.Name = "CloseButton"
    closeButton.Size = UDim2.new(0, 24, 0, 24)
    closeButton.Position = UDim2.new(1, -32, 0, 8)
    closeButton.BackgroundColor3 = self:getThemeColor("ERROR_COLOR")
    closeButton.TextColor3 = self:getThemeColor("TEXT_COLOR")
    closeButton.Text = "×"
    closeButton.Font = Enum.Font.GothamBold
    closeButton.TextSize = 18
    closeButton.BorderSizePixel = 0
    closeButton.Parent = content
    
    -- Add close button corner
    local closeCorner = Instance.new("UICorner")
    closeCorner.CornerRadius = UDim.new(0, 12)
    closeCorner.Parent = closeButton
    
    -- Add modal content
    if config.title then
        local title = Instance.new("TextLabel")
        title.Name = "Title"
        title.Size = UDim2.new(1, -48, 0, 32)
        title.Position = UDim2.new(0, 16, 0, 16)
        title.BackgroundTransparency = 1
        title.Text = config.title
        title.TextColor3 = self:getThemeColor("TEXT_COLOR")
        title.Font = Enum.Font.GothamBold
        title.TextSize = 18
        title.TextXAlignment = Enum.TextXAlignment.Left
        title.Parent = content
    end
    
    -- Add close functionality
    closeButton.MouseButton1Click:Connect(function()
        self:closeModal(modal)
    end)
    
    -- Add escape key functionality
    local connection
    connection = UserInputService.InputBegan:Connect(function(input)
        if input.KeyCode == Enum.KeyCode.Escape then
            self:closeModal(modal)
            connection:Disconnect()
        end
    end)
    
    -- Add entrance animation
    self:animateModalEntrance(modal)
    
    return modal
end

function AdvancedGUI:addHoverEffects(element)
    local originalColor = element.BackgroundColor3
    local hoverColor = self:lightenColor(originalColor, 0.1)
    
    element.MouseEnter:Connect(function()
        self:animateColor(element, "BackgroundColor3", hoverColor)
    end)
    
    element.MouseLeave:Connect(function()
        self:animateColor(element, "BackgroundColor3", originalColor)
    end)
end

function AdvancedGUI:addClickAnimation(element)
    element.MouseButton1Down:Connect(function()
        self:animateScale(element, 0.95)
    end)
    
    element.MouseButton1Up:Connect(function()
        self:animateScale(element, 1)
    end)
end

function AdvancedGUI:addFocusEffects(frame, textBox)
    local originalBorderColor = frame:FindFirstChild("UIStroke").Color
    
    textBox.Focused:Connect(function()
        self:animateColor(frame:FindFirstChild("UIStroke"), "Color", self:getThemeColor("PRIMARY_COLOR"))
    end)
    
    textBox.FocusLost:Connect(function()
        self:animateColor(frame:FindFirstChild("UIStroke"), "Color", originalBorderColor)
    end)
end

function AdvancedGUI:addAccessibilityFeatures(element)
    -- Add keyboard navigation
    if self.accessibility.keyboardNavigation then
        element:SetAttribute("TabOrder", 0)
    end
    
    -- Add screen reader support
    if self.accessibility.screenReader then
        element:SetAttribute("ScreenReaderText", element.Text or element.Name)
    end
    
    -- Add high contrast support
    if self.accessibility.highContrast then
        element.BackgroundColor3 = self:getHighContrastColor(element.BackgroundColor3)
        element.TextColor3 = self:getHighContrastColor(element.TextColor3)
    end
end

function AdvancedGUI:animateColor(element, property, targetColor)
    local tween = TweenService:Create(
        element,
        TweenInfo.new(
            GUI_CONFIG.ANIMATION.DURATION,
            GUI_CONFIG.ANIMATION.EASING_STYLE,
            GUI_CONFIG.ANIMATION.EASING_DIRECTION
        ),
        {[property] = targetColor}
    )
    
    tween:Play()
    return tween
end

function AdvancedGUI:animateScale(element, targetScale)
    local tween = TweenService:Create(
        element,
        TweenInfo.new(
            GUI_CONFIG.ANIMATION.DURATION * 0.5,
            GUI_CONFIG.ANIMATION.EASING_STYLE,
            GUI_CONFIG.ANIMATION.EASING_DIRECTION
        ),
        {Size = UDim2.new(element.Size.X.Scale * targetScale, element.Size.X.Offset * targetScale, element.Size.Y.Scale * targetScale, element.Size.Y.Offset * targetScale)}
    )
    
    tween:Play()
    return tween
end

function AdvancedGUI:animateModalEntrance(modal)
    modal.BackgroundTransparency = 1
    local content = modal:FindFirstChild("Content")
    content.Size = UDim2.new(0, 0, 0, 0)
    content.Position = UDim2.new(0.5, 0, 0.5, 0)
    
    -- Animate background
    local backgroundTween = TweenService:Create(
        modal,
        TweenInfo.new(GUI_CONFIG.ANIMATION.DURATION, GUI_CONFIG.ANIMATION.EASING_STYLE, GUI_CONFIG.ANIMATION.EASING_DIRECTION),
        {BackgroundTransparency = 0.5}
    )
    
    -- Animate content
    local contentTween = TweenService:Create(
        content,
        TweenInfo.new(GUI_CONFIG.ANIMATION.DURATION, GUI_CONFIG.ANIMATION.EASING_STYLE, GUI_CONFIG.ANIMATION.EASING_DIRECTION),
        {
            Size = UDim2.new(0, 400, 0, 300),
            Position = UDim2.new(0.5, -200, 0.5, -150)
        }
    )
    
    backgroundTween:Play()
    contentTween:Play()
end

function AdvancedGUI:closeModal(modal)
    local content = modal:FindFirstChild("Content")
    
    -- Animate exit
    local backgroundTween = TweenService:Create(
        modal,
        TweenInfo.new(GUI_CONFIG.ANIMATION.DURATION, GUI_CONFIG.ANIMATION.EASING_STYLE, GUI_CONFIG.ANIMATION.EASING_DIRECTION),
        {BackgroundTransparency = 1}
    )
    
    local contentTween = TweenService:Create(
        content,
        TweenInfo.new(GUI_CONFIG.ANIMATION.DURATION, GUI_CONFIG.ANIMATION.EASING_STYLE, GUI_CONFIG.ANIMATION.EASING_DIRECTION),
        {
            Size = UDim2.new(0, 0, 0, 0),
            Position = UDim2.new(0.5, 0, 0.5, 0)
        }
    )
    
    backgroundTween:Play()
    contentTween:Play()
    
    contentTween.Completed:Connect(function()
        modal:Destroy()
    end)
end

function AdvancedGUI:updateResponsiveLayout()
    local viewportSize = UserInputService.ViewportSize
    self.responsive.screenSize = viewportSize
    
    -- Determine breakpoint
    local breakpoint = "desktop"
    if viewportSize.X <= GUI_CONFIG.RESPONSIVE.BREAKPOINTS.MOBILE then
        breakpoint = "mobile"
    elseif viewportSize.X <= GUI_CONFIG.RESPONSIVE.BREAKPOINTS.TABLET then
        breakpoint = "tablet"
    end
    
    self.responsive.currentBreakpoint = breakpoint
    
    -- Update orientation
    local orientation = viewportSize.X > viewportSize.Y and "landscape" or "portrait"
    self.responsive.orientation = orientation
    
    -- Update all components
    self:updateAllComponents()
    
    print("Responsive layout updated:", breakpoint, orientation)
end

function AdvancedGUI:updateAllComponents()
    for _, component in pairs(self.components) do
        if component.UpdateLayout then
            component:UpdateLayout(self.responsive.currentBreakpoint, self.responsive.orientation)
        end
    end
end

function AdvancedGUI:getThemeColor(colorName)
    return self.themes.themes[self.themes.current][colorName]
end

function AdvancedGUI:setTheme(themeName)
    if self.themes.themes[themeName] then
        self.themes.current = themeName
        self:updateAllComponents()
        print("Theme changed to:", themeName)
    end
end

function AdvancedGUI:lightenColor(color, amount)
    local r, g, b = color.R, color.G, color.B
    return Color3.new(math.min(1, r + amount), math.min(1, g + amount), math.min(1, b + amount))
end

function AdvancedGUI:getHighContrastColor(color)
    local brightness = (color.R + color.G + color.B) / 3
    return brightness > 0.5 and Color3.new(0, 0, 0) or Color3.new(1, 1, 1)
end

function AdvancedGUI:createResponsiveGrid(config)
    local grid = Instance.new("Frame")
    grid.Name = config.name or "ResponsiveGrid"
    grid.Size = config.size or UDim2.new(1, 0, 1, 0)
    grid.Position = config.position or UDim2.new(0, 0, 0, 0)
    grid.BackgroundTransparency = 1
    grid.BorderSizePixel = 0
    
    -- Add grid layout
    local gridLayout = Instance.new("UIGridLayout")
    gridLayout.CellSize = config.cellSize or UDim2.new(0, 200, 0, 150)
    gridLayout.CellPadding = config.cellPadding or UDim2.new(0, 10, 0, 10)
    gridLayout.SortOrder = Enum.SortOrder.LayoutOrder
    gridLayout.Parent = grid
    
    -- Store reference for responsive updates
    grid.UpdateLayout = function(breakpoint, orientation)
        if breakpoint == "mobile" then
            gridLayout.CellSize = UDim2.new(1, -20, 0, 100)
            gridLayout.CellPadding = UDim2.new(0, 5, 0, 5)
        elseif breakpoint == "tablet" then
            gridLayout.CellSize = UDim2.new(0, 150, 0, 120)
            gridLayout.CellPadding = UDim2.new(0, 8, 0, 8)
        else
            gridLayout.CellSize = config.cellSize or UDim2.new(0, 200, 0, 150)
            gridLayout.CellPadding = config.cellPadding or UDim2.new(0, 10, 0, 10)
        end
    end
    
    -- Register component
    table.insert(self.components, grid)
    
    return grid
end

-- 2. DEMO THE SYSTEMS
print("\\n2. RUNNING SYSTEM DEMONSTRATIONS...")

-- Create systems
local advancedGUI = AdvancedGUI.new()

-- Test GUI systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Create test screen GUI
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "AdvancedGUITest"
    screenGui.Parent = playerGui
    
    -- Create custom button
    local button = advancedGUI:createCustomButton({
        name = "TestButton",
        text = "Click Me!",
        size = UDim2.new(0, 120, 0, 40),
        position = UDim2.new(0, 20, 0, 20)
    })
    button.Parent = screenGui
    
    -- Create custom input
    local input = advancedGUI:createCustomInput({
        name = "TestInput",
        placeholder = "Enter your name...",
        size = UDim2.new(0, 200, 0, 40),
        position = UDim2.new(0, 20, 0, 80)
    })
    input.Parent = screenGui
    
    -- Create custom card
    local card = advancedGUI:createCustomCard({
        name = "TestCard",
        title = "Welcome!",
        content = "This is a custom card component with advanced styling and animations.",
        size = UDim2.new(0, 300, 0, 150),
        position = UDim2.new(0, 20, 0, 140)
    })
    card.Parent = screenGui
    
    -- Create responsive grid
    local grid = advancedGUI:createResponsiveGrid({
        name = "TestGrid",
        size = UDim2.new(0, 400, 0, 300),
        position = UDim2.new(0, 340, 0, 20),
        cellSize = UDim2.new(0, 120, 0, 80),
        cellPadding = UDim2.new(0, 10, 0, 10)
    })
    grid.Parent = screenGui
    
    -- Add grid items
    for i = 1, 6 do
        local item = advancedGUI:createCustomCard({
            name = "GridItem" .. i,
            title = "Item " .. i,
            content = "Grid item " .. i,
            size = UDim2.new(1, 0, 1, 0)
        })
        item.Parent = grid
    end
    
    -- Test modal
    button.MouseButton1Click:Connect(function()
        local modal = advancedGUI:createCustomModal({
            name = "TestModal",
            title = "Test Modal",
            size = UDim2.new(0, 400, 0, 300)
        })
        modal.Parent = screenGui
    end)
    
    print("Applied advanced GUI tests to", player.Name)
end)

print("\\n=== ADVANCED GUI SYSTEMS & CUSTOM COMPONENTS DEMO COMPLETE ===")
print("You've learned advanced GUI systems, custom components, and responsive design!")`,
    challenge: {
      tests: [
        { description: 'Create advanced GUI system with custom components', type: 'code_contains', value: 'createCustomButton' },
        { description: 'Implement responsive design and theme system', type: 'code_contains', value: 'setupResponsiveSystem' },
        { description: 'Build accessibility features and animations', type: 'code_contains', value: 'addAccessibilityFeatures' }
      ],
      hints: [
        'Use TweenService for smooth animations and transitions',
        'Implement responsive design with breakpoints for different screen sizes',
        'Create reusable components with consistent styling and behavior',
        'Add accessibility features like keyboard navigation and screen reader support',
        'Use theme systems for consistent colors and styling across your application'
      ],
      successMessage: 'Excellent! You now understand advanced GUI systems, custom components, responsive design, and accessibility features. These skills are essential for creating professional, user-friendly interfaces!'
    }
  },

  // === MOBILE DEVELOPMENT ===
  'mobile-development-optimization': {
    title: 'Mobile Development & Cross-Platform Optimization',
    description: 'Optimize your Roblox games for mobile devices and cross-platform compatibility',
    sections: [
      {
        title: 'Mobile UI & Touch Controls',
        content: `Mobile development requires special considerations for touch interfaces, performance optimization, and cross-platform compatibility to ensure your Roblox games work seamlessly across all devices.

**Mobile-Specific Challenges:**
- **Touch Controls**: Designing intuitive touch interfaces for mobile devices
- **Screen Sizes**: Adapting UI for various mobile screen sizes and orientations
- **Performance**: Optimizing for lower-end mobile devices
- **Battery Life**: Minimizing battery drain through efficient code
- **Network Conditions**: Handling poor network connectivity on mobile

**Cross-Platform Considerations:**
- **Input Methods**: Supporting both touch and keyboard/mouse inputs
- **UI Scaling**: Responsive design for different screen resolutions
- **Performance Scaling**: Automatic quality adjustment based on device capabilities
- **Platform-Specific Features**: Utilizing platform-specific capabilities when available
- **Testing**: Comprehensive testing across different devices and platforms`,
        codeExample: `-- Mobile development and cross-platform optimization

local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local GuiService = game:GetService("GuiService")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local MobileOptimizer = {}
MobileOptimizer.__index = MobileOptimizer

-- Mobile configuration
local MOBILE_CONFIG = {
    TOUCH_SENSITIVITY = 1.0,
    MIN_TOUCH_SIZE = 44, -- Minimum touch target size in pixels
    PERFORMANCE_LEVELS = {
        LOW = 1,
        MEDIUM = 2,
        HIGH = 3
    },
    SCREEN_SIZES = {
        MOBILE = {width = 480, height = 854},
        TABLET = {width = 768, height = 1024},
        DESKTOP = {width = 1920, height = 1080}
    }
}

function MobileOptimizer.new()
    local self = setmetatable({}, MobileOptimizer)
    
    -- Mobile systems
    self.touchControls = {}
    self.performanceManager = {}
    self.uiScaler = {}
    self.inputHandler = {}
    self.deviceInfo = {}
    
    -- Setup systems
    self:setupDeviceDetection()
    self:setupTouchControls()
    self:setupPerformanceManager()
    self:setupUIScaler()
    self:setupInputHandler()
    
    return self
end

function MobileOptimizer:setupDeviceDetection()
    self.deviceInfo = {
        platform = UserInputService:GetPlatform(),
        isMobile = UserInputService.TouchEnabled,
        isTablet = false,
        screenSize = GuiService:GetGuiInset(),
        performanceLevel = MOBILE_CONFIG.PERFORMANCE_LEVELS.MEDIUM
    }
    
    -- Detect tablet
    local viewportSize = UserInputService.ViewportSize
    if viewportSize.X > 600 and viewportSize.Y > 600 then
        self.deviceInfo.isTablet = true
    end
    
    -- Determine performance level based on device
    self:determinePerformanceLevel()
    
    print("Device detected:", self.deviceInfo.platform, "Mobile:", self.deviceInfo.isMobile, "Tablet:", self.deviceInfo.isTablet)
end

function MobileOptimizer:determinePerformanceLevel()
    local viewportSize = UserInputService.ViewportSize
    local screenArea = viewportSize.X * viewportSize.Y
    
    if screenArea < 500000 then -- Low-end mobile
        self.deviceInfo.performanceLevel = MOBILE_CONFIG.PERFORMANCE_LEVELS.LOW
    elseif screenArea < 1000000 then -- Mid-range mobile/tablet
        self.deviceInfo.performanceLevel = MOBILE_CONFIG.PERFORMANCE_LEVELS.MEDIUM
    else -- High-end device
        self.deviceInfo.performanceLevel = MOBILE_CONFIG.PERFORMANCE_LEVELS.HIGH
    end
    
    print("Performance level determined:", self.deviceInfo.performanceLevel)
end

function MobileOptimizer:setupTouchControls()
    self.touchControls = {
        activeTouches = {},
        touchTargets = {},
        gestureRecognizers = {}
    }
    
    -- Setup touch input handling
    UserInputService.TouchStarted:Connect(function(touch, gameProcessed)
        if not gameProcessed then
            self:handleTouchStarted(touch)
        end
    end)
    
    UserInputService.TouchMoved:Connect(function(touch, gameProcessed)
        if not gameProcessed then
            self:handleTouchMoved(touch)
        end
    end)
    
    UserInputService.TouchEnded:Connect(function(touch, gameProcessed)
        if not gameProcessed then
            self:handleTouchEnded(touch)
        end
    end)
    
    print("Touch controls initialized")
end

function MobileOptimizer:handleTouchStarted(touch)
    self.touchControls.activeTouches[touch] = {
        startPosition = touch.Position,
        startTime = tick(),
        target = self:findTouchTarget(touch.Position)
    }
    
    -- Handle touch target
    local touchData = self.touchControls.activeTouches[touch]
    if touchData.target then
        self:activateTouchTarget(touchData.target, touch)
    end
    
    print("Touch started at:", touch.Position)
end

function MobileOptimizer:handleTouchMoved(touch)
    local touchData = self.touchControls.activeTouches[touch]
    if not touchData then return end
    
    -- Update touch position
    touchData.currentPosition = touch.Position
    touchData.distance = (touch.Position - touchData.startPosition).Magnitude
    
    -- Handle drag gestures
    if touchData.distance > 10 then -- Minimum drag distance
        self:handleDragGesture(touch, touchData)
    end
end

function MobileOptimizer:handleTouchEnded(touch)
    local touchData = self.touchControls.activeTouches[touch]
    if not touchData then return end
    
    local touchDuration = tick() - touchData.startTime
    local touchDistance = touchData.distance or 0
    
    -- Determine gesture type
    if touchDistance < 10 and touchDuration < 0.5 then
        self:handleTapGesture(touch, touchData)
    elseif touchDistance > 50 then
        self:handleSwipeGesture(touch, touchData)
    end
    
    -- Clean up touch data
    self.touchControls.activeTouches[touch] = nil
    
    print("Touch ended after:", touchDuration, "seconds, distance:", touchDistance)
end

function MobileOptimizer:findTouchTarget(position)
    for _, target in pairs(self.touchControls.touchTargets) do
        if target.guiObject and target.guiObject.Parent then
            local absolutePosition = target.guiObject.AbsolutePosition
            local absoluteSize = target.guiObject.AbsoluteSize
            
            if position.X >= absolutePosition.X and position.X <= absolutePosition.X + absoluteSize.X and
               position.Y >= absolutePosition.Y and position.Y <= absolutePosition.Y + absoluteSize.Y then
                return target
            end
        end
    end
    return nil
end

function MobileOptimizer:registerTouchTarget(guiObject, callback, options)
    local target = {
        guiObject = guiObject,
        callback = callback,
        options = options or {},
        minSize = options and options.minSize or MOBILE_CONFIG.MIN_TOUCH_SIZE
    }
    
    -- Ensure minimum touch target size
    self:ensureMinimumTouchSize(guiObject, target.minSize)
    
    table.insert(self.touchControls.touchTargets, target)
    
    print("Touch target registered:", guiObject.Name)
    return target
end

function MobileOptimizer:ensureMinimumTouchSize(guiObject, minSize)
    local currentSize = guiObject.AbsoluteSize
    
    if currentSize.X < minSize or currentSize.Y < minSize then
        local scaleFactor = math.max(minSize / currentSize.X, minSize / currentSize.Y)
        guiObject.Size = UDim2.new(
            guiObject.Size.X.Scale * scaleFactor,
            guiObject.Size.X.Offset * scaleFactor,
            guiObject.Size.Y.Scale * scaleFactor,
            guiObject.Size.Y.Offset * scaleFactor
        )
    end
end

function MobileOptimizer:activateTouchTarget(target, touch)
    if target.callback then
        target.callback(touch, target)
    end
    
    -- Add visual feedback
    self:addTouchFeedback(target.guiObject)
end

function MobileOptimizer:addTouchFeedback(guiObject)
    -- Add touch feedback animation
    local originalSize = guiObject.Size
    local feedbackSize = UDim2.new(
        originalSize.X.Scale * 0.95,
        originalSize.X.Offset * 0.95,
        originalSize.Y.Scale * 0.95,
        originalSize.Y.Offset * 0.95
    )
    
    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {Size = feedbackSize}
    )
    
    tween:Play()
    
    tween.Completed:Connect(function()
        local returnTween = TweenService:Create(
            guiObject,
            TweenInfo.new(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
            {Size = originalSize}
        )
        returnTween:Play()
    end)
end

function MobileOptimizer:handleTapGesture(touch, touchData)
    print("Tap gesture detected")
    
    -- Handle tap on touch target
    if touchData.target then
        self:activateTouchTarget(touchData.target, touch)
    end
end

function MobileOptimizer:handleSwipeGesture(touch, touchData)
    local direction = (touch.Position - touchData.startPosition).Unit
    local distance = touchData.distance
    
    print("Swipe gesture detected:", direction, "distance:", distance)
    
    -- Determine swipe direction
    local swipeDirection = "unknown"
    if math.abs(direction.X) > math.abs(direction.Y) then
        swipeDirection = direction.X > 0 and "right" or "left"
    else
        swipeDirection = direction.Y > 0 and "down" or "up"
    end
    
    -- Handle swipe gesture
    self:processSwipeGesture(swipeDirection, distance, touch)
end

function MobileOptimizer:handleDragGesture(touch, touchData)
    -- Handle drag operations
    if touchData.target and touchData.target.options.draggable then
        self:handleDragOperation(touch, touchData)
    end
end

function MobileOptimizer:processSwipeGesture(direction, distance, touch)
    -- Process swipe gestures (e.g., navigation, menu switching)
    print("Processing swipe:", direction, "distance:", distance)
end

function MobileOptimizer:handleDragOperation(touch, touchData)
    -- Handle drag operations
    print("Drag operation:", touch.Position)
end

function MobileOptimizer:setupPerformanceManager()
    self.performanceManager = {
        currentLevel = self.deviceInfo.performanceLevel,
        qualitySettings = {},
        frameRateTarget = 30,
        memoryLimit = 50 -- MB
    }
    
    -- Setup quality settings based on performance level
    self:setupQualitySettings()
    
    -- Monitor performance
    self:setupPerformanceMonitoring()
    
    print("Performance manager initialized")
end

function MobileOptimizer:setupQualitySettings()
    local level = self.deviceInfo.performanceLevel
    
    if level == MOBILE_CONFIG.PERFORMANCE_LEVELS.LOW then
        self.performanceManager.qualitySettings = {
            graphicsQuality = 1,
            shadowQuality = 0,
            textureQuality = 1,
            particleQuality = 1,
            maxParticles = 50,
            frameRateTarget = 30
        }
    elseif level == MOBILE_CONFIG.PERFORMANCE_LEVELS.MEDIUM then
        self.performanceManager.qualitySettings = {
            graphicsQuality = 2,
            shadowQuality = 1,
            textureQuality = 2,
            particleQuality = 2,
            maxParticles = 100,
            frameRateTarget = 45
        }
    else -- HIGH
        self.performanceManager.qualitySettings = {
            graphicsQuality = 3,
            shadowQuality = 2,
            textureQuality = 3,
            particleQuality = 3,
            maxParticles = 200,
            frameRateTarget = 60
        }
    end
    
    -- Apply quality settings
    self:applyQualitySettings()
end

function MobileOptimizer:applyQualitySettings()
    local settings = self.performanceManager.qualitySettings
    
    -- Apply lighting settings
    game.Lighting.GlobalShadows = settings.shadowQuality > 0
    game.Lighting.ShadowSoftness = settings.shadowQuality * 0.5
    
    -- Apply graphics settings
    game.Lighting.Brightness = settings.graphicsQuality * 0.5
    
    print("Quality settings applied:", settings.graphicsQuality, "level")
end

function MobileOptimizer:setupPerformanceMonitoring()
    local lastFrameTime = tick()
    local frameCount = 0
    local frameRate = 0
    
    RunService.Heartbeat:Connect(function()
        local currentTime = tick()
        local deltaTime = currentTime - lastFrameTime
        
        frameCount = frameCount + 1
        frameRate = 1 / deltaTime
        
        -- Check if performance is below target
        if frameRate < self.performanceManager.frameRateTarget * 0.8 then
            self:handlePerformanceDrop()
        end
        
        lastFrameTime = currentTime
    end)
end

function MobileOptimizer:handlePerformanceDrop()
    print("Performance drop detected, adjusting quality...")
    
    -- Reduce quality settings
    if self.deviceInfo.performanceLevel > MOBILE_CONFIG.PERFORMANCE_LEVELS.LOW then
        self.deviceInfo.performanceLevel = self.deviceInfo.performanceLevel - 1
        self:setupQualitySettings()
    end
end

function MobileOptimizer:setupUIScaler()
    self.uiScaler = {
        baseResolution = Vector2.new(1920, 1080),
        currentResolution = UserInputService.ViewportSize,
        scaleFactor = 1
    }
    
    -- Calculate scale factor
    self:calculateScaleFactor()
    
    -- Monitor resolution changes
    UserInputService:GetPropertyChangedSignal("ViewportSize"):Connect(function()
        self:updateUIScale()
    end)
    
    print("UI scaler initialized")
end

function MobileOptimizer:calculateScaleFactor()
    local currentRes = UserInputService.ViewportSize
    local baseRes = self.uiScaler.baseResolution
    
    -- Calculate scale factor based on smaller dimension
    local scaleX = currentRes.X / baseRes.X
    local scaleY = currentRes.Y / baseRes.Y
    self.uiScaler.scaleFactor = math.min(scaleX, scaleY)
    
    print("UI scale factor:", self.uiScaler.scaleFactor)
end

function MobileOptimizer:updateUIScale()
    self.uiScaler.currentResolution = UserInputService.ViewportSize
    self:calculateScaleFactor()
    
    -- Update all UI elements
    self:updateAllUIElements()
end

function MobileOptimizer:updateAllUIElements()
    -- Update UI elements based on new scale factor
    for _, player in pairs(Players:GetPlayers()) do
        local playerGui = player:FindFirstChild("PlayerGui")
        if playerGui then
            self:scalePlayerGUI(playerGui)
        end
    end
end

function MobileOptimizer:scalePlayerGUI(playerGui)
    -- Scale GUI elements for mobile
    for _, gui in pairs(playerGui:GetChildren()) do
        if gui:IsA("ScreenGui") then
            self:scaleScreenGUI(gui)
        end
    end
end

function MobileOptimizer:scaleScreenGUI(screenGui)
    -- Scale screen GUI elements
    for _, element in pairs(screenGui:GetChildren()) do
        if element:IsA("GuiObject") then
            self:scaleGUIElement(element)
        end
    end
end

function MobileOptimizer:scaleGUIElement(element)
    -- Scale individual GUI elements
    local scaleFactor = self.uiScaler.scaleFactor
    
    -- Adjust size and position
    element.Size = UDim2.new(
        element.Size.X.Scale,
        element.Size.X.Offset * scaleFactor,
        element.Size.Y.Scale,
        element.Size.Y.Offset * scaleFactor
    )
    
    element.Position = UDim2.new(
        element.Position.X.Scale,
        element.Position.X.Offset * scaleFactor,
        element.Position.Y.Scale,
        element.Position.Y.Offset * scaleFactor
    )
    
    -- Adjust text size
    if element:IsA("TextLabel") or element:IsA("TextButton") or element:IsA("TextBox") then
        element.TextSize = element.TextSize * scaleFactor
    end
end

function MobileOptimizer:setupInputHandler()
    self.inputHandler = {
        virtualJoystick = nil,
        virtualButtons = {},
        inputMode = "auto"
    }
    
    -- Setup virtual controls for mobile
    if self.deviceInfo.isMobile then
        self:setupVirtualControls()
    end
    
    print("Input handler initialized")
end

function MobileOptimizer:setupVirtualControls()
    -- Create virtual joystick for movement
    self:createVirtualJoystick()
    
    -- Create virtual buttons for actions
    self:createVirtualButtons()
end

function MobileOptimizer:createVirtualJoystick()
    -- Create virtual joystick for mobile movement
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "VirtualJoystick"
    screenGui.Parent = Players.LocalPlayer:WaitForChild("PlayerGui")
    
    local joystickFrame = Instance.new("Frame")
    joystickFrame.Name = "JoystickFrame"
    joystickFrame.Size = UDim2.new(0, 120, 0, 120)
    joystickFrame.Position = UDim2.new(0, 20, 1, -140)
    joystickFrame.BackgroundColor3 = Color3.new(0, 0, 0)
    joystickFrame.BackgroundTransparency = 0.5
    joystickFrame.BorderSizePixel = 0
    joystickFrame.Parent = screenGui
    
    local joystickCorner = Instance.new("UICorner")
    joystickCorner.CornerRadius = UDim.new(0, 60)
    joystickCorner.Parent = joystickFrame
    
    local joystickKnob = Instance.new("Frame")
    joystickKnob.Name = "JoystickKnob"
    joystickKnob.Size = UDim2.new(0, 60, 0, 60)
    joystickKnob.Position = UDim2.new(0.5, -30, 0.5, -30)
    joystickKnob.BackgroundColor3 = Color3.new(1, 1, 1)
    joystickKnob.BackgroundTransparency = 0.3
    joystickKnob.BorderSizePixel = 0
    joystickKnob.Parent = joystickFrame
    
    local knobCorner = Instance.new("UICorner")
    knobCorner.CornerRadius = UDim.new(0, 30)
    knobCorner.Parent = joystickKnob
    
    self.inputHandler.virtualJoystick = {
        frame = joystickFrame,
        knob = joystickKnob,
        isActive = false,
        centerPosition = Vector2.new(60, 60)
    }
    
    print("Virtual joystick created")
end

function MobileOptimizer:createVirtualButtons()
    -- Create virtual buttons for mobile actions
    local screenGui = Players.LocalPlayer:WaitForChild("PlayerGui"):FindFirstChild("VirtualJoystick")
    if not screenGui then return end
    
    local buttonFrame = Instance.new("Frame")
    buttonFrame.Name = "VirtualButtons"
    buttonFrame.Size = UDim2.new(0, 200, 0, 100)
    buttonFrame.Position = UDim2.new(1, -220, 1, -110)
    buttonFrame.BackgroundTransparency = 1
    buttonFrame.Parent = screenGui
    
    -- Create jump button
    local jumpButton = Instance.new("TextButton")
    jumpButton.Name = "JumpButton"
    jumpButton.Size = UDim2.new(0, 80, 0, 80)
    jumpButton.Position = UDim2.new(0, 0, 0, 0)
    jumpButton.BackgroundColor3 = Color3.new(0, 1, 0)
    jumpButton.BackgroundTransparency = 0.3
    jumpButton.Text = "JUMP"
    jumpButton.TextColor3 = Color3.new(1, 1, 1)
    jumpButton.Font = Enum.Font.GothamBold
    jumpButton.TextSize = 16
    jumpButton.BorderSizePixel = 0
    jumpButton.Parent = buttonFrame
    
    local jumpCorner = Instance.new("UICorner")
    jumpCorner.CornerRadius = UDim.new(0, 40)
    jumpCorner.Parent = jumpButton
    
    -- Create action button
    local actionButton = Instance.new("TextButton")
    actionButton.Name = "ActionButton"
    actionButton.Size = UDim2.new(0, 80, 0, 80)
    actionButton.Position = UDim2.new(0, 100, 0, 0)
    actionButton.BackgroundColor3 = Color3.new(1, 0, 0)
    actionButton.BackgroundTransparency = 0.3
    actionButton.Text = "ACTION"
    actionButton.TextColor3 = Color3.new(1, 1, 1)
    actionButton.Font = Enum.Font.GothamBold
    actionButton.TextSize = 16
    actionButton.BorderSizePixel = 0
    actionButton.Parent = buttonFrame
    
    local actionCorner = Instance.new("UICorner")
    actionCorner.CornerRadius = UDim.new(0, 40)
    actionCorner.Parent = actionButton
    
    -- Register touch targets
    self:registerTouchTarget(jumpButton, function(touch, target)
        print("Jump button pressed")
        -- Handle jump action
    end)
    
    self:registerTouchTarget(actionButton, function(touch, target)
        print("Action button pressed")
        -- Handle action
    end)
    
    print("Virtual buttons created")
end

function MobileOptimizer:getDeviceInfo()
    return self.deviceInfo
end

function MobileOptimizer:getPerformanceLevel()
    return self.deviceInfo.performanceLevel
end

function MobileOptimizer:isMobile()
    return self.deviceInfo.isMobile
end

function MobileOptimizer:isTablet()
    return self.deviceInfo.isTablet
end

function MobileOptimizer:getScaleFactor()
    return self.uiScaler.scaleFactor
end

-- Example usage
local mobileOptimizer = MobileOptimizer.new()

-- Test mobile systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Create test mobile UI
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "MobileTestUI"
    screenGui.Parent = playerGui
    
    -- Create mobile-optimized button
    local testButton = Instance.new("TextButton")
    testButton.Name = "TestButton"
    testButton.Size = UDim2.new(0, 100, 0, 50)
    testButton.Position = UDim2.new(0.5, -50, 0.5, -25)
    testButton.BackgroundColor3 = Color3.new(0, 0.5, 1)
    testButton.Text = "Test"
    testButton.TextColor3 = Color3.new(1, 1, 1)
    testButton.Font = Enum.Font.Gotham
    testButton.TextSize = 18
    testButton.BorderSizePixel = 0
    testButton.Parent = screenGui
    
    local buttonCorner = Instance.new("UICorner")
    buttonCorner.CornerRadius = UDim.new(0, 8)
    buttonCorner.Parent = testButton
    
    -- Register touch target
    mobileOptimizer:registerTouchTarget(testButton, function(touch, target)
        print("Test button pressed on mobile!")
    end)
    
    -- Test button click
    testButton.MouseButton1Click:Connect(function()
        print("Test button clicked!")
    end)
    
    print("Applied mobile optimization tests to", player.Name)
    print("Device info:", mobileOptimizer:getDeviceInfo())
end)

print("Mobile development and cross-platform optimization system initialized")`,
        color: 'orange'
      }
    ],
    defaultCode: `-- Mobile Development & Cross-Platform Optimization - Comprehensive Learning Example
-- Optimize your Roblox games for mobile devices and cross-platform compatibility

print("=== MOBILE DEVELOPMENT & CROSS-PLATFORM OPTIMIZATION DEMO ===")
print("Learning mobile development and cross-platform optimization...")

-- 1. MOBILE UI & TOUCH CONTROLS
print("\\n1. DEMONSTRATING MOBILE UI & TOUCH CONTROLS...")

local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local GuiService = game:GetService("GuiService")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local MobileOptimizer = {}
MobileOptimizer.__index = MobileOptimizer

-- Mobile configuration
local MOBILE_CONFIG = {
    TOUCH_SENSITIVITY = 1.0,
    MIN_TOUCH_SIZE = 44, -- Minimum touch target size in pixels
    PERFORMANCE_LEVELS = {
        LOW = 1,
        MEDIUM = 2,
        HIGH = 3
    },
    SCREEN_SIZES = {
        MOBILE = {width = 480, height = 854},
        TABLET = {width = 768, height = 1024},
        DESKTOP = {width = 1920, height = 1080}
    }
}

function MobileOptimizer.new()
    local self = setmetatable({}, MobileOptimizer)
    
    -- Mobile systems
    self.touchControls = {}
    self.performanceManager = {}
    self.uiScaler = {}
    self.inputHandler = {}
    self.deviceInfo = {}
    
    -- Setup systems
    self:setupDeviceDetection()
    self:setupTouchControls()
    self:setupPerformanceManager()
    self:setupUIScaler()
    self:setupInputHandler()
    
    return self
end

function MobileOptimizer:setupDeviceDetection()
    self.deviceInfo = {
        platform = UserInputService:GetPlatform(),
        isMobile = UserInputService.TouchEnabled,
        isTablet = false,
        screenSize = GuiService:GetGuiInset(),
        performanceLevel = MOBILE_CONFIG.PERFORMANCE_LEVELS.MEDIUM
    }
    
    -- Detect tablet
    local viewportSize = UserInputService.ViewportSize
    if viewportSize.X > 600 and viewportSize.Y > 600 then
        self.deviceInfo.isTablet = true
    end
    
    -- Determine performance level based on device
    self:determinePerformanceLevel()
    
    print("Device detected:", self.deviceInfo.platform, "Mobile:", self.deviceInfo.isMobile, "Tablet:", self.deviceInfo.isTablet)
end

function MobileOptimizer:determinePerformanceLevel()
    local viewportSize = UserInputService.ViewportSize
    local screenArea = viewportSize.X * viewportSize.Y
    
    if screenArea < 500000 then -- Low-end mobile
        self.deviceInfo.performanceLevel = MOBILE_CONFIG.PERFORMANCE_LEVELS.LOW
    elseif screenArea < 1000000 then -- Mid-range mobile/tablet
        self.deviceInfo.performanceLevel = MOBILE_CONFIG.PERFORMANCE_LEVELS.MEDIUM
    else -- High-end device
        self.deviceInfo.performanceLevel = MOBILE_CONFIG.PERFORMANCE_LEVELS.HIGH
    end
    
    print("Performance level determined:", self.deviceInfo.performanceLevel)
end

function MobileOptimizer:setupTouchControls()
    self.touchControls = {
        activeTouches = {},
        touchTargets = {},
        gestureRecognizers = {}
    }
    
    -- Setup touch input handling
    UserInputService.TouchStarted:Connect(function(touch, gameProcessed)
        if not gameProcessed then
            self:handleTouchStarted(touch)
        end
    end)
    
    UserInputService.TouchMoved:Connect(function(touch, gameProcessed)
        if not gameProcessed then
            self:handleTouchMoved(touch)
        end
    end)
    
    UserInputService.TouchEnded:Connect(function(touch, gameProcessed)
        if not gameProcessed then
            self:handleTouchEnded(touch)
        end
    end)
    
    print("Touch controls initialized")
end

function MobileOptimizer:handleTouchStarted(touch)
    self.touchControls.activeTouches[touch] = {
        startPosition = touch.Position,
        startTime = tick(),
        target = self:findTouchTarget(touch.Position)
    }
    
    -- Handle touch target
    local touchData = self.touchControls.activeTouches[touch]
    if touchData.target then
        self:activateTouchTarget(touchData.target, touch)
    end
    
    print("Touch started at:", touch.Position)
end

function MobileOptimizer:handleTouchMoved(touch)
    local touchData = self.touchControls.activeTouches[touch]
    if not touchData then return end
    
    -- Update touch position
    touchData.currentPosition = touch.Position
    touchData.distance = (touch.Position - touchData.startPosition).Magnitude
    
    -- Handle drag gestures
    if touchData.distance > 10 then -- Minimum drag distance
        self:handleDragGesture(touch, touchData)
    end
end

function MobileOptimizer:handleTouchEnded(touch)
    local touchData = self.touchControls.activeTouches[touch]
    if not touchData then return end
    
    local touchDuration = tick() - touchData.startTime
    local touchDistance = touchData.distance or 0
    
    -- Determine gesture type
    if touchDistance < 10 and touchDuration < 0.5 then
        self:handleTapGesture(touch, touchData)
    elseif touchDistance > 50 then
        self:handleSwipeGesture(touch, touchData)
    end
    
    -- Clean up touch data
    self.touchControls.activeTouches[touch] = nil
    
    print("Touch ended after:", touchDuration, "seconds, distance:", touchDistance)
end

function MobileOptimizer:findTouchTarget(position)
    for _, target in pairs(self.touchControls.touchTargets) do
        if target.guiObject and target.guiObject.Parent then
            local absolutePosition = target.guiObject.AbsolutePosition
            local absoluteSize = target.guiObject.AbsoluteSize
            
            if position.X >= absolutePosition.X and position.X <= absolutePosition.X + absoluteSize.X and
               position.Y >= absolutePosition.Y and position.Y <= absolutePosition.Y + absoluteSize.Y then
                return target
            end
        end
    end
    return nil
end

function MobileOptimizer:registerTouchTarget(guiObject, callback, options)
    local target = {
        guiObject = guiObject,
        callback = callback,
        options = options or {},
        minSize = options and options.minSize or MOBILE_CONFIG.MIN_TOUCH_SIZE
    }
    
    -- Ensure minimum touch target size
    self:ensureMinimumTouchSize(guiObject, target.minSize)
    
    table.insert(self.touchControls.touchTargets, target)
    
    print("Touch target registered:", guiObject.Name)
    return target
end

function MobileOptimizer:ensureMinimumTouchSize(guiObject, minSize)
    local currentSize = guiObject.AbsoluteSize
    
    if currentSize.X < minSize or currentSize.Y < minSize then
        local scaleFactor = math.max(minSize / currentSize.X, minSize / currentSize.Y)
        guiObject.Size = UDim2.new(
            guiObject.Size.X.Scale * scaleFactor,
            guiObject.Size.X.Offset * scaleFactor,
            guiObject.Size.Y.Scale * scaleFactor,
            guiObject.Size.Y.Offset * scaleFactor
        )
    end
end

function MobileOptimizer:activateTouchTarget(target, touch)
    if target.callback then
        target.callback(touch, target)
    end
    
    -- Add visual feedback
    self:addTouchFeedback(target.guiObject)
end

function MobileOptimizer:addTouchFeedback(guiObject)
    -- Add touch feedback animation
    local originalSize = guiObject.Size
    local feedbackSize = UDim2.new(
        originalSize.X.Scale * 0.95,
        originalSize.X.Offset * 0.95,
        originalSize.Y.Scale * 0.95,
        originalSize.Y.Offset * 0.95
    )
    
    local tween = TweenService:Create(
        guiObject,
        TweenInfo.new(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        {Size = feedbackSize}
    )
    
    tween:Play()
    
    tween.Completed:Connect(function()
        local returnTween = TweenService:Create(
            guiObject,
            TweenInfo.new(0.1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
            {Size = originalSize}
        )
        returnTween:Play()
    end)
end

function MobileOptimizer:handleTapGesture(touch, touchData)
    print("Tap gesture detected")
    
    -- Handle tap on touch target
    if touchData.target then
        self:activateTouchTarget(touchData.target, touch)
    end
end

function MobileOptimizer:handleSwipeGesture(touch, touchData)
    local direction = (touch.Position - touchData.startPosition).Unit
    local distance = touchData.distance
    
    print("Swipe gesture detected:", direction, "distance:", distance)
    
    -- Determine swipe direction
    local swipeDirection = "unknown"
    if math.abs(direction.X) > math.abs(direction.Y) then
        swipeDirection = direction.X > 0 and "right" or "left"
    else
        swipeDirection = direction.Y > 0 and "down" or "up"
    end
    
    -- Handle swipe gesture
    self:processSwipeGesture(swipeDirection, distance, touch)
end

function MobileOptimizer:handleDragGesture(touch, touchData)
    -- Handle drag operations
    if touchData.target and touchData.target.options.draggable then
        self:handleDragOperation(touch, touchData)
    end
end

function MobileOptimizer:processSwipeGesture(direction, distance, touch)
    -- Process swipe gestures (e.g., navigation, menu switching)
    print("Processing swipe:", direction, "distance:", distance)
end

function MobileOptimizer:handleDragOperation(touch, touchData)
    -- Handle drag operations
    print("Drag operation:", touch.Position)
end

function MobileOptimizer:setupPerformanceManager()
    self.performanceManager = {
        currentLevel = self.deviceInfo.performanceLevel,
        qualitySettings = {},
        frameRateTarget = 30,
        memoryLimit = 50 -- MB
    }
    
    -- Setup quality settings based on performance level
    self:setupQualitySettings()
    
    -- Monitor performance
    self:setupPerformanceMonitoring()
    
    print("Performance manager initialized")
end

function MobileOptimizer:setupQualitySettings()
    local level = self.deviceInfo.performanceLevel
    
    if level == MOBILE_CONFIG.PERFORMANCE_LEVELS.LOW then
        self.performanceManager.qualitySettings = {
            graphicsQuality = 1,
            shadowQuality = 0,
            textureQuality = 1,
            particleQuality = 1,
            maxParticles = 50,
            frameRateTarget = 30
        }
    elseif level == MOBILE_CONFIG.PERFORMANCE_LEVELS.MEDIUM then
        self.performanceManager.qualitySettings = {
            graphicsQuality = 2,
            shadowQuality = 1,
            textureQuality = 2,
            particleQuality = 2,
            maxParticles = 100,
            frameRateTarget = 45
        }
    else -- HIGH
        self.performanceManager.qualitySettings = {
            graphicsQuality = 3,
            shadowQuality = 2,
            textureQuality = 3,
            particleQuality = 3,
            maxParticles = 200,
            frameRateTarget = 60
        }
    end
    
    -- Apply quality settings
    self:applyQualitySettings()
end

function MobileOptimizer:applyQualitySettings()
    local settings = self.performanceManager.qualitySettings
    
    -- Apply lighting settings
    game.Lighting.GlobalShadows = settings.shadowQuality > 0
    game.Lighting.ShadowSoftness = settings.shadowQuality * 0.5
    
    -- Apply graphics settings
    game.Lighting.Brightness = settings.graphicsQuality * 0.5
    
    print("Quality settings applied:", settings.graphicsQuality, "level")
end

function MobileOptimizer:setupPerformanceMonitoring()
    local lastFrameTime = tick()
    local frameCount = 0
    local frameRate = 0
    
    RunService.Heartbeat:Connect(function()
        local currentTime = tick()
        local deltaTime = currentTime - lastFrameTime
        
        frameCount = frameCount + 1
        frameRate = 1 / deltaTime
        
        -- Check if performance is below target
        if frameRate < self.performanceManager.frameRateTarget * 0.8 then
            self:handlePerformanceDrop()
        end
        
        lastFrameTime = currentTime
    end)
end

function MobileOptimizer:handlePerformanceDrop()
    print("Performance drop detected, adjusting quality...")
    
    -- Reduce quality settings
    if self.deviceInfo.performanceLevel > MOBILE_CONFIG.PERFORMANCE_LEVELS.LOW then
        self.deviceInfo.performanceLevel = self.deviceInfo.performanceLevel - 1
        self:setupQualitySettings()
    end
end

function MobileOptimizer:setupUIScaler()
    self.uiScaler = {
        baseResolution = Vector2.new(1920, 1080),
        currentResolution = UserInputService.ViewportSize,
        scaleFactor = 1
    }
    
    -- Calculate scale factor
    self:calculateScaleFactor()
    
    -- Monitor resolution changes
    UserInputService:GetPropertyChangedSignal("ViewportSize"):Connect(function()
        self:updateUIScale()
    end)
    
    print("UI scaler initialized")
end

function MobileOptimizer:calculateScaleFactor()
    local currentRes = UserInputService.ViewportSize
    local baseRes = self.uiScaler.baseResolution
    
    -- Calculate scale factor based on smaller dimension
    local scaleX = currentRes.X / baseRes.X
    local scaleY = currentRes.Y / baseRes.Y
    self.uiScaler.scaleFactor = math.min(scaleX, scaleY)
    
    print("UI scale factor:", self.uiScaler.scaleFactor)
end

function MobileOptimizer:updateUIScale()
    self.uiScaler.currentResolution = UserInputService.ViewportSize
    self:calculateScaleFactor()
    
    -- Update all UI elements
    self:updateAllUIElements()
end

function MobileOptimizer:updateAllUIElements()
    -- Update UI elements based on new scale factor
    for _, player in pairs(Players:GetPlayers()) do
        local playerGui = player:FindFirstChild("PlayerGui")
        if playerGui then
            self:scalePlayerGUI(playerGui)
        end
    end
end

function MobileOptimizer:scalePlayerGUI(playerGui)
    -- Scale GUI elements for mobile
    for _, gui in pairs(playerGui:GetChildren()) do
        if gui:IsA("ScreenGui") then
            self:scaleScreenGUI(gui)
        end
    end
end

function MobileOptimizer:scaleScreenGUI(screenGui)
    -- Scale screen GUI elements
    for _, element in pairs(screenGui:GetChildren()) do
        if element:IsA("GuiObject") then
            self:scaleGUIElement(element)
        end
    end
end

function MobileOptimizer:scaleGUIElement(element)
    -- Scale individual GUI elements
    local scaleFactor = self.uiScaler.scaleFactor
    
    -- Adjust size and position
    element.Size = UDim2.new(
        element.Size.X.Scale,
        element.Size.X.Offset * scaleFactor,
        element.Size.Y.Scale,
        element.Size.Y.Offset * scaleFactor
    )
    
    element.Position = UDim2.new(
        element.Position.X.Scale,
        element.Position.X.Offset * scaleFactor,
        element.Position.Y.Scale,
        element.Position.Y.Offset * scaleFactor
    )
    
    -- Adjust text size
    if element:IsA("TextLabel") or element:IsA("TextButton") or element:IsA("TextBox") then
        element.TextSize = element.TextSize * scaleFactor
    end
end

function MobileOptimizer:setupInputHandler()
    self.inputHandler = {
        virtualJoystick = nil,
        virtualButtons = {},
        inputMode = "auto"
    }
    
    -- Setup virtual controls for mobile
    if self.deviceInfo.isMobile then
        self:setupVirtualControls()
    end
    
    print("Input handler initialized")
end

function MobileOptimizer:setupVirtualControls()
    -- Create virtual joystick for movement
    self:createVirtualJoystick()
    
    -- Create virtual buttons for actions
    self:createVirtualButtons()
end

function MobileOptimizer:createVirtualJoystick()
    -- Create virtual joystick for mobile movement
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "VirtualJoystick"
    screenGui.Parent = Players.LocalPlayer:WaitForChild("PlayerGui")
    
    local joystickFrame = Instance.new("Frame")
    joystickFrame.Name = "JoystickFrame"
    joystickFrame.Size = UDim2.new(0, 120, 0, 120)
    joystickFrame.Position = UDim2.new(0, 20, 1, -140)
    joystickFrame.BackgroundColor3 = Color3.new(0, 0, 0)
    joystickFrame.BackgroundTransparency = 0.5
    joystickFrame.BorderSizePixel = 0
    joystickFrame.Parent = screenGui
    
    local joystickCorner = Instance.new("UICorner")
    joystickCorner.CornerRadius = UDim.new(0, 60)
    joystickCorner.Parent = joystickFrame
    
    local joystickKnob = Instance.new("Frame")
    joystickKnob.Name = "JoystickKnob"
    joystickKnob.Size = UDim2.new(0, 60, 0, 60)
    joystickKnob.Position = UDim2.new(0.5, -30, 0.5, -30)
    joystickKnob.BackgroundColor3 = Color3.new(1, 1, 1)
    joystickKnob.BackgroundTransparency = 0.3
    joystickKnob.BorderSizePixel = 0
    joystickKnob.Parent = joystickFrame
    
    local knobCorner = Instance.new("UICorner")
    knobCorner.CornerRadius = UDim.new(0, 30)
    knobCorner.Parent = joystickKnob
    
    self.inputHandler.virtualJoystick = {
        frame = joystickFrame,
        knob = joystickKnob,
        isActive = false,
        centerPosition = Vector2.new(60, 60)
    }
    
    print("Virtual joystick created")
end

function MobileOptimizer:createVirtualButtons()
    -- Create virtual buttons for mobile actions
    local screenGui = Players.LocalPlayer:WaitForChild("PlayerGui"):FindFirstChild("VirtualJoystick")
    if not screenGui then return end
    
    local buttonFrame = Instance.new("Frame")
    buttonFrame.Name = "VirtualButtons"
    buttonFrame.Size = UDim2.new(0, 200, 0, 100)
    buttonFrame.Position = UDim2.new(1, -220, 1, -110)
    buttonFrame.BackgroundTransparency = 1
    buttonFrame.Parent = screenGui
    
    -- Create jump button
    local jumpButton = Instance.new("TextButton")
    jumpButton.Name = "JumpButton"
    jumpButton.Size = UDim2.new(0, 80, 0, 80)
    jumpButton.Position = UDim2.new(0, 0, 0, 0)
    jumpButton.BackgroundColor3 = Color3.new(0, 1, 0)
    jumpButton.BackgroundTransparency = 0.3
    jumpButton.Text = "JUMP"
    jumpButton.TextColor3 = Color3.new(1, 1, 1)
    jumpButton.Font = Enum.Font.GothamBold
    jumpButton.TextSize = 16
    jumpButton.BorderSizePixel = 0
    jumpButton.Parent = buttonFrame
    
    local jumpCorner = Instance.new("UICorner")
    jumpCorner.CornerRadius = UDim.new(0, 40)
    jumpCorner.Parent = jumpButton
    
    -- Create action button
    local actionButton = Instance.new("TextButton")
    actionButton.Name = "ActionButton"
    actionButton.Size = UDim2.new(0, 80, 0, 80)
    actionButton.Position = UDim2.new(0, 100, 0, 0)
    actionButton.BackgroundColor3 = Color3.new(1, 0, 0)
    actionButton.BackgroundTransparency = 0.3
    actionButton.Text = "ACTION"
    actionButton.TextColor3 = Color3.new(1, 1, 1)
    actionButton.Font = Enum.Font.GothamBold
    actionButton.TextSize = 16
    actionButton.BorderSizePixel = 0
    actionButton.Parent = buttonFrame
    
    local actionCorner = Instance.new("UICorner")
    actionCorner.CornerRadius = UDim.new(0, 40)
    actionCorner.Parent = actionButton
    
    -- Register touch targets
    self:registerTouchTarget(jumpButton, function(touch, target)
        print("Jump button pressed")
        -- Handle jump action
    end)
    
    self:registerTouchTarget(actionButton, function(touch, target)
        print("Action button pressed")
        -- Handle action
    end)
    
    print("Virtual buttons created")
end

function MobileOptimizer:getDeviceInfo()
    return self.deviceInfo
end

function MobileOptimizer:getPerformanceLevel()
    return self.deviceInfo.performanceLevel
end

function MobileOptimizer:isMobile()
    return self.deviceInfo.isMobile
end

function MobileOptimizer:isTablet()
    return self.deviceInfo.isTablet
end

function MobileOptimizer:getScaleFactor()
    return self.uiScaler.scaleFactor
end

-- 2. DEMO THE SYSTEMS
print("\\n2. RUNNING SYSTEM DEMONSTRATIONS...")

-- Create systems
local mobileOptimizer = MobileOptimizer.new()

-- Test mobile systems
Players.PlayerAdded:Connect(function(player)
    wait(2) -- Wait for player to load
    
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Create test mobile UI
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "MobileTestUI"
    screenGui.Parent = playerGui
    
    -- Create mobile-optimized button
    local testButton = Instance.new("TextButton")
    testButton.Name = "TestButton"
    testButton.Size = UDim2.new(0, 100, 0, 50)
    testButton.Position = UDim2.new(0.5, -50, 0.5, -25)
    testButton.BackgroundColor3 = Color3.new(0, 0.5, 1)
    testButton.Text = "Test"
    testButton.TextColor3 = Color3.new(1, 1, 1)
    testButton.Font = Enum.Font.Gotham
    testButton.TextSize = 18
    testButton.BorderSizePixel = 0
    testButton.Parent = screenGui
    
    local buttonCorner = Instance.new("UICorner")
    buttonCorner.CornerRadius = UDim.new(0, 8)
    buttonCorner.Parent = testButton
    
    -- Register touch target
    mobileOptimizer:registerTouchTarget(testButton, function(touch, target)
        print("Test button pressed on mobile!")
    end)
    
    -- Test button click
    testButton.MouseButton1Click:Connect(function()
        print("Test button clicked!")
    end)
    
    print("Applied mobile optimization tests to", player.Name)
    print("Device info:", mobileOptimizer:getDeviceInfo())
end)

print("\\n=== MOBILE DEVELOPMENT & CROSS-PLATFORM OPTIMIZATION DEMO COMPLETE ===")
print("You've learned mobile development, touch controls, and cross-platform optimization!")`,
    challenge: {
      tests: [
        { description: 'Create mobile optimization system with device detection', type: 'code_contains', value: 'setupDeviceDetection' },
        { description: 'Implement touch controls and gesture recognition', type: 'code_contains', value: 'setupTouchControls' },
        { description: 'Build performance management and UI scaling', type: 'code_contains', value: 'setupPerformanceManager' }
      ],
      hints: [
        'Use UserInputService to detect touch input and device capabilities',
        'Implement minimum touch target sizes for better mobile usability',
        'Create responsive UI that scales appropriately for different screen sizes',
        'Monitor performance and automatically adjust quality settings for mobile devices',
        'Use virtual controls like joysticks and buttons for mobile gameplay'
      ],
      successMessage: 'Excellent! You now understand mobile development, touch controls, performance optimization, and cross-platform compatibility. These skills are essential for creating games that work seamlessly across all devices!'
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
