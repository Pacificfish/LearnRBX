import { useParams, Link } from 'react-router-dom'
import { getCourse } from '../data/courses'
import { useProgressStore } from '../store/progressStore'
import { CheckCircle, Circle, ArrowRight } from 'lucide-react'

export default function Course() {
  const { courseId } = useParams<{ courseId: string }>()
  const course = courseId ? getCourse(courseId) : undefined
  const { getLessonProgress, getCourseCompletion } = useProgressStore()

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Course not found</p>
      </div>
    )
  }

  const completion = getCourseCompletion(course.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link to="/dashboard" className="text-roblox hover:text-roblox-dark mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <div className="flex items-start mb-4">
          <span className="text-5xl mr-4">{course.icon}</span>
          <div>
            <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{course.estimatedTime}</span>
              <span className={`px-2 py-1 rounded ${
                course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {course.difficulty}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Course Progress</span>
            <span>{completion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-roblox h-3 rounded-full transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Lessons</h2>
        {course.lessons.map((lesson, index) => {
          const progress = getLessonProgress(course.id, lesson.id)
          const isCompleted = progress?.completed || false
          
          // Check if previous lesson is completed (or if this is the first lesson)
          const prevLesson = index > 0 ? course.lessons[index - 1] : null
          const prevLessonProgress = prevLesson ? getLessonProgress(course.id, prevLesson.id) : null
          const isLocked = index > 0 && !prevLessonProgress?.completed

          if (isLocked) {
            return (
              <div
                key={lesson.id}
                className="card opacity-60 cursor-not-allowed flex items-center justify-between border-2 border-gray-200"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <Circle className="text-gray-300" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-500">
                        Lesson {index + 1}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Locked
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-500">{lesson.title}</h3>
                    <p className="text-gray-500 text-sm">{lesson.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Complete Lesson {index} to unlock
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-gray-300" size={20} />
              </div>
            )
          }

          return (
            <Link
              key={lesson.id}
              to={`/course/${course.id}/lesson/${lesson.id}`}
              className="card hover:shadow-lg transition-shadow duration-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-300" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-500">
                      Lesson {index + 1}
                    </span>
                    {isCompleted && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Completed
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm">{lesson.description}</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400" size={20} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

