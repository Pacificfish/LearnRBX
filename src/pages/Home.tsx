import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { courses } from '../data/courses'
import { ArrowRight, Clock } from 'lucide-react'

export default function Home() {
  const { user } = useAuthStore()

  return (
    <div className="hero-gradient min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-block mb-6">
            <span className="text-6xl animate-bounce">🎮</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-gradient">Learn Roblox</span>
            <br />
            <span className="text-gray-900">Scripting</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Master <span className="font-semibold text-gray-800">Lua programming</span> and build amazing games in Roblox Studio. 
            <br className="hidden md:block" />
            Interactive lessons, real-time feedback, and hands-on projects.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/signup" className="btn-primary text-lg px-10 py-4">
                Get Started Free →
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-10 py-4">
                Sign In
              </Link>
            </div>
          )}
          {user && (
            <Link to="/dashboard" className="btn-primary text-lg px-10 py-4 inline-block">
              Go to Dashboard →
            </Link>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="card text-center group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">💻</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Interactive Code Editor</h3>
            <p className="text-gray-600 leading-relaxed">
              Write and test your Lua code directly in the browser with syntax highlighting and error checking.
            </p>
          </div>
          <div className="card text-center group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📚</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Comprehensive Lessons</h3>
            <p className="text-gray-600 leading-relaxed">
              Step-by-step tutorials covering everything from Lua basics to advanced Roblox game mechanics.
            </p>
          </div>
          <div className="card text-center group">
            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📊</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Track Your Progress</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your learning journey with detailed progress tracking and achievements.
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
            <span className="text-gradient">Our Courses</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Choose your learning path and start building today
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={user ? `/course/${course.id}` : '/signup'}
                className="card group cursor-pointer"
              >
                <div className="flex items-start mb-6">
                  <span className="text-5xl mr-4 transform group-hover:scale-110 transition-transform duration-300">{course.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-roblox transition-colors">{course.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={18} className="text-roblox" />
                    <span className="font-medium">{course.estimatedTime}</span>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
                <div className="flex items-center text-roblox font-bold group-hover:gap-2 transition-all">
                  {user ? 'Continue Learning' : 'Start Learning'}
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

