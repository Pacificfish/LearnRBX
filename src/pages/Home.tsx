import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { courses } from '../data/courses'
import { ArrowRight, Clock, TrendingUp } from 'lucide-react'

export default function Home() {
  const { user } = useAuthStore()

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Learn Roblox Scripting
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master Lua programming and build amazing games in Roblox Studio. 
            Interactive lessons, real-time feedback, and hands-on projects.
          </p>
          {!user && (
            <div className="flex justify-center space-x-4">
              <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                Sign In
              </Link>
            </div>
          )}
          {user && (
            <Link to="/dashboard" className="btn-primary text-lg px-8 py-3 inline-block">
              Go to Dashboard
            </Link>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-2">Interactive Code Editor</h3>
            <p className="text-gray-600">
              Write and test your Lua code directly in the browser with syntax highlighting and error checking.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Comprehensive Lessons</h3>
            <p className="text-gray-600">
              Step-by-step tutorials covering everything from Lua basics to advanced Roblox game mechanics.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
            <p className="text-gray-600">
              Monitor your learning journey with detailed progress tracking and achievements.
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={user ? `/course/${course.id}` : '/signup'}
                className="card hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start mb-4">
                  <span className="text-4xl mr-3">{course.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{course.estimatedTime}</span>
                  </div>
                  <span className={`px-2 py-1 rounded ${
                    course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
                <div className="flex items-center text-roblox font-medium">
                  {user ? 'Continue Learning' : 'Start Learning'}
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

