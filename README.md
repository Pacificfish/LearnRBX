# LearnRBX - Master Roblox Scripting

An interactive learning platform similar to Codecademy, but specifically designed for learning Roblox scripting with Lua.

## Features

- 🎓 **Interactive Lessons** - Step-by-step tutorials covering Lua basics and Roblox scripting
- 💻 **Code Editor** - Built-in Monaco Editor with Lua syntax highlighting
- 📊 **Progress Tracking** - Track your progress through courses and lessons
- 🎯 **Learning Objectives** - Clear goals for each lesson
- 💡 **Hints & Solutions** - Get help when you're stuck
- 🎮 **Roblox-Specific** - Learn Roblox API, Parts, Players, Events, and more
- 📱 **Responsive Design** - Works beautifully on desktop and mobile

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **React Router** for navigation
- **Zustand** for state management
- **Supabase** for authentication and database
- **Railway** for deployment
- **Monaco Editor** (VS Code editor) for code editing
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)
- (Optional) Railway account for deployment

### Quick Start with Supabase

**See [SETUP.md](./SETUP.md) for detailed setup instructions.**

1. **Set up Supabase:**
   - Create a project at [supabase.com](https://supabase.com)
   - Run the migration SQL from `supabase/migrations/001_initial_schema.sql`
   - Copy your project URL and anon key

2. **Configure environment variables (optional):**
   ```bash
   cp env.example .env
   ```
   Add your Supabase credentials to `.env` for full features
   
   **Note:** The app works without Supabase credentials for testing the UI!

3. **Install and run:**
   ```bash
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173` and sign up!

### Deploying to Railway

1. Push your code to GitHub
2. Connect to Railway and deploy from GitHub
3. Add environment variables in Railway dashboard
4. Your app will be live automatically!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

### Testing Locally

See [LOCAL_TESTING.md](./LOCAL_TESTING.md) for detailed local testing instructions.

## Project Structure

```
src/
├── components/      # Reusable React components
│   ├── Layout.tsx      # Main layout with navigation
│   └── CodeEditor.tsx  # Monaco-based code editor
├── pages/          # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login page
│   ├── Signup.tsx      # Signup page
│   ├── Dashboard.tsx   # User dashboard
│   ├── Course.tsx      # Course overview
│   └── Lesson.tsx      # Individual lesson page
├── store/          # Zustand state management
│   ├── authStore.ts    # Authentication state
│   └── progressStore.ts # Learning progress tracking
└── data/           # Static data
    └── courses.ts      # Course and lesson definitions
```

## Features in Detail

### Authentication
- **Supabase Auth** for secure user authentication
- User profiles stored in Supabase database
- Protected routes for authenticated users
- Session persistence with automatic token refresh

### Course Structure
- Multiple courses with different difficulty levels
- Organized lessons within each course
- Estimated completion times

### Code Editor
- Monaco Editor with Lua syntax highlighting
- Auto-save of code progress
- Read-only mode for viewing solutions

### Progress Tracking
- **Supabase Database** for persistent progress storage
- Track completion of lessons
- Save code for each lesson
- Course completion percentages
- Visual progress indicators
- Syncs across devices

## Current Courses

1. **Lua Basics** - Fundamentals of Lua programming
   - Variables and Data Types
   - Functions

2. **Introduction to Roblox Scripting** - Learn Roblox-specific scripting
   - Working with Parts
   - Working with Players

3. **Events and Communication** - Advanced scripting concepts
   - The Touched Event

## Future Enhancements

- [x] Backend API integration (Supabase)
- [x] User profiles and authentication
- [ ] User achievements and badges
- [ ] Community features (forums, discussions)
- [ ] More courses and lessons
- [ ] Code validation and testing
- [ ] Dark mode
- [ ] Certificate generation
- [ ] Roblox Studio integration guide
- [ ] Video tutorials
- [ ] Interactive challenges
- [ ] Analytics dashboard

## Contributing

This is a learning project. Feel free to fork, modify, and extend it for your own use!

## License

MIT

