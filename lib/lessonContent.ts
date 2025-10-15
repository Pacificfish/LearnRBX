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
  }
};

export function getLessonContent(lessonSlug: string): LessonContent {
  return lessonContentMap[lessonSlug] || lessonContentMap['variables-and-printing'];
}
