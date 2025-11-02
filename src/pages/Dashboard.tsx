import { Link } from 'react-router-dom'
import { courses } from '../data/courses'
import { useProgressStore } from '../store/progressStore'
import { Clock } from 'lucide-react'

export default function Dashboard() {
  const { getCourseCompletion, getEstimatedTimeRemaining } = useProgressStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-gradient">My Learning</span>
            <br />
            <span className="text-gray-900">Dashboard</span>
          </h1>
          <p className="text-xl text-gray-600">Continue your journey to mastering Roblox scripting</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const completion = getCourseCompletion(course.id)
            const totalLessons = course.lessons.length
            const timeRemaining = getEstimatedTimeRemaining(course.id)
            
            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="card group cursor-pointer"
              >
                <div className="flex items-start mb-6">
                  <span className="text-5xl mr-4 transform group-hover:scale-110 transition-transform duration-300">{course.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-roblox transition-colors">{course.title}</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">{course.description}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="font-semibold text-gray-700">Progress</span>
                    <span className="font-bold text-roblox text-lg">{completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-roblox to-primary-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={18} className="text-roblox" />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {timeRemaining || course.estimatedTime}
                        {timeRemaining && completion > 0 && <span className="text-gray-400 ml-1">remaining</span>}
                      </span>
                      {timeRemaining && completion > 0 && (
                        <span className="text-xs text-gray-400">{course.estimatedTime} total</span>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-gray-900">{totalLessons}</span> {totalLessons === 1 ? 'lesson' : 'lessons'} available
                  </p>
                </div>

                <div className="btn-primary w-full text-center">
                  {completion > 0 ? 'Continue Learning →' : 'Start Course →'}
                </div>
              </Link>
          )
        })}
        </div>
      </div>
    </div>
  )
}

