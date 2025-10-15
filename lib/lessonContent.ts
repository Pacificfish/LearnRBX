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
  }
};

export function getLessonContent(lessonSlug: string): LessonContent {
  return lessonContentMap[lessonSlug] || lessonContentMap['variables-and-printing'];
}
