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
        title: 'Variables in Roblox Scripts',
        content: 'In Roblox scripting with Luau, you create variables using the `local` keyword. Variables store data like player names, scores, and game states that you can use throughout your Roblox scripts.',
        codeExample: 'local playerName = "Alex"',
        color: 'blue'
      },
      {
        title: 'Roblox Studio Output Window',
        content: 'Use the `print()` function to display information in Roblox Studio\'s Output window. This is essential for debugging your Roblox scripts and understanding what your code is doing.',
        codeExample: 'print("Hello, Roblox!")',
        color: 'green'
      },
      {
        title: 'String Concatenation for Game Messages',
        content: 'Combine strings using the `..` operator to create dynamic messages for your Roblox game:',
        codeExample: 'print("Welcome to the game, " .. playerName .. "!")',
        color: 'purple'
      }
    ],
    defaultCode: `-- Write your Roblox script here
local playerName = "Alex"
print("Hello, " .. playerName .. "!")
print("Welcome to Roblox scripting!")`,
    challenge: {
      tests: [
        { description: 'Create a variable called playerName', type: 'variable_exists', value: 'playerName' },
        { description: 'Print a welcome message', type: 'output_contains', value: 'Hello' }
      ],
      hints: ['Use the local keyword to create variables', 'Use print() to display text in Roblox Studio Output window'],
      successMessage: 'Great! You can now create variables and use Roblox Studio Output for debugging.'
    }
  },

  'tables-and-loops': {
    title: 'Tables & Loops for Game Data',
    description: 'Learn about Lua tables and loops for managing game data like player inventories and object lists',
    sections: [
      {
        title: 'Tables in Roblox Games',
        content: 'Tables in Luau are like arrays or objects that can store multiple values. In Roblox, you use tables for player inventories, leaderboards, and managing game objects.',
        codeExample: 'local inventory = {"Sword", "Shield", "Potion"}',
        color: 'blue'
      },
      {
        title: 'Accessing Table Elements',
        content: 'You can access table elements by their index (starting from 1 in Lua) or by key. This is how you manage player data in Roblox.',
        codeExample: 'print(inventory[1]) -- Prints "Sword"',
        color: 'green'
      },
      {
        title: 'For Loops for Game Logic',
        content: 'Use for loops to iterate through tables and perform actions on each element. Perfect for updating all players or processing inventory items.',
        codeExample: `for i = 1, #inventory do
    print("Item " .. i .. ": " .. inventory[i])
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Create a player inventory table
local inventory = {"Sword", "Shield", "Potion"}

-- Print each item in the inventory
for i = 1, #inventory do
    print("Item " .. i .. ": " .. inventory[i])
end

-- Add a new item
table.insert(inventory, "Bow")
print("Added Bow to inventory!")`,
    challenge: {
      tests: [
        { description: 'Create a table with 3 items', type: 'table_length', value: 3 },
        { description: 'Use a for loop to iterate through the table', type: 'code_contains', value: 'for' }
      ],
      hints: ['Tables use curly braces {}', 'Use for loops to iterate through game objects', 'Use #tableName to get table length'],
      successMessage: 'Excellent! Tables and loops are essential for managing game data in Roblox.'
    }
  },

  'functions-and-scope': {
    title: 'Functions for Game Logic',
    description: 'Learn how to create functions for organizing your Roblox game scripts and reusable code',
    sections: [
      {
        title: 'Creating Functions in Roblox',
        content: 'Functions help organize your Roblox scripts into reusable blocks of code. They\'re perfect for game mechanics like spawning players, calculating damage, or handling events.',
        codeExample: `function spawnPlayer(playerName)
    print("Spawning player: " .. playerName)
end`,
        color: 'blue'
      },
      {
        title: 'Function Parameters',
        content: 'Functions can accept parameters to make them flexible. In Roblox, you might pass player objects, positions, or game data to your functions.',
        codeExample: `function calculateDamage(weapon, playerLevel)
    local damage = weapon.power * playerLevel
    return damage
end`,
        color: 'green'
      },
      {
        title: 'Return Values',
        content: 'Functions can return values back to the code that called them. This is useful for calculations, checks, or getting data from your game logic.',
        codeExample: `function getPlayerHealth(player)
    return player.health
end`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Create a function to spawn a player
function spawnPlayer(playerName)
    print("Spawning player: " .. playerName)
    return "Player spawned successfully!"
end

-- Create a function to calculate damage
function calculateDamage(weapon, playerLevel)
    local damage = weapon * playerLevel
    return damage
end

-- Use the functions
local result = spawnPlayer("Alex")
print(result)

local damage = calculateDamage(10, 5)
print("Damage dealt: " .. damage)`,
    challenge: {
      tests: [
        { description: 'Create a function called spawnPlayer', type: 'function_exists', value: 'spawnPlayer' },
        { description: 'Function should accept a parameter', type: 'code_contains', value: 'function' }
      ],
      hints: ['Use function keyword', 'Functions help organize game logic', 'Add parameters in parentheses'],
      successMessage: 'Perfect! Functions help organize your Roblox game scripts.'
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
        content: 'CFrame (Coordinate Frame) is how Roblox represents position and rotation in 3D space. It\'s essential for moving parts, creating animations, and building complex structures.',
        codeExample: 'local part = Instance.new("Part")\npart.CFrame = CFrame.new(0, 10, 0)',
        color: 'blue'
      },
      {
        title: 'Positioning Parts',
        content: 'Use CFrame.new() to set exact positions. The three numbers represent X, Y, and Z coordinates in the world space.',
        codeExample: `-- Position a part at coordinates (5, 10, -3)
local part = Instance.new("Part")
part.CFrame = CFrame.new(5, 10, -3)
part.Parent = workspace`,
        color: 'green'
      },
      {
        title: 'Rotating Parts',
        content: 'CFrames can also handle rotation. Use CFrame.Angles() to rotate parts around different axes for building structures and creating dynamic objects.',
        codeExample: `-- Create a rotated part
local part = Instance.new("Part")
part.CFrame = CFrame.new(0, 5, 0) * CFrame.Angles(0, math.rad(45), 0)
part.Parent = workspace`,
        color: 'purple'
      }
    ],
    defaultCode: `-- Create and position parts using CFrames
local part1 = Instance.new("Part")
part1.Name = "GroundPart"
part1.Size = Vector3.new(10, 1, 10)
part1.CFrame = CFrame.new(0, 0, 0)
part1.Parent = workspace

-- Create a floating part
local part2 = Instance.new("Part")
part2.Name = "FloatingPart"
part2.Size = Vector3.new(2, 2, 2)
part2.CFrame = CFrame.new(0, 10, 0)
part2.Parent = workspace

-- Create a rotated part
local part3 = Instance.new("Part")
part3.Name = "RotatedPart"
part3.Size = Vector3.new(4, 1, 1)
part3.CFrame = CFrame.new(5, 5, 0) * CFrame.Angles(0, math.rad(45), 0)
part3.Parent = workspace

print("Created 3 parts with different CFrame positions and rotations!")`,
    challenge: {
      tests: [
        { description: 'Create a part with CFrame positioning', type: 'code_contains', value: 'CFrame.new' },
        { description: 'Use CFrame.Angles for rotation', type: 'code_contains', value: 'CFrame.Angles' }
      ],
      hints: ['Use CFrame.new(x, y, z) for positioning', 'Use CFrame.Angles() for rotation', 'CFrames are essential for 3D positioning in Roblox'],
      successMessage: 'Excellent! You can now position and rotate parts using CFrames.'
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
  }
};

export function getLessonContent(lessonSlug: string): LessonContent {
  return lessonContentMap[lessonSlug] || lessonContentMap['variables-and-printing'];
}
