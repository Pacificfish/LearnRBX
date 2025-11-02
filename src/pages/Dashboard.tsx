import { Link } from 'react-router-dom'
import { courses } from '../data/courses'
import { useProgressStore } from '../store/progressStore'
import { Clock } from 'lucide-react'

export default function Dashboard() {
  const { getCourseCompletion } = useProgressStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Learning Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const completion = getCourseCompletion(course.id)
          const completedLessons = course.lessons.length
          
          return (
            <div key={course.id} className="card">
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-3">{course.icon}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-roblox h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completion}%` }}
                  />
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

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  {completedLessons} {completedLessons === 1 ? 'lesson' : 'lessons'}
                </p>
              </div>

              <Link
                to={`/course/${course.id}`}
                className="btn-primary w-full text-center block"
              >
                {completion > 0 ? 'Continue Learning' : 'Start Course'}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

