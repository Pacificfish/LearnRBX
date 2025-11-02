import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { courses } from '../data/courses'
import { ArrowRight, Clock, Code, BookOpen, TrendingUp, CheckCircle, Users, Award, Zap, Target, User } from 'lucide-react'
import Logo from '../components/Logo'

export default function Home() {
  const { user } = useAuthStore()

  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0)
  const totalHours = courses.reduce((sum, course) => {
    const hours = parseInt(course.estimatedTime.split(' ')[0]) || 0
    return sum + hours
  }, 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-8 animate-bounce-slow">
              <Logo size="lg" className="justify-center" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
              <span className="text-gradient">Master Roblox</span>
              <br />
              <span className="text-gray-900">Scripting</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              From zero to professional. Learn <span className="font-semibold text-gray-800">Lua programming</span> and build amazing games in Roblox Studio.
              <br className="hidden md:block" />
              <span className="text-gray-700">Interactive lessons, real-time feedback, and hands-on projects.</span>
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                <Link to="/signup" className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  Start Learning Free →
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-10 py-4">
                  Sign In
                </Link>
              </div>
            )}
            {user && (
              <div className="mb-12">
                <Link to="/dashboard" className="btn-primary text-lg px-10 py-4 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  Continue Learning →
                </Link>
              </div>
            )}
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">{courses.length}+</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">{totalLessons}+</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">{totalHours}+</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">Hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="card text-center group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-roblox/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <Code className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Interactive Code Editor</h3>
            <p className="text-gray-600 leading-relaxed">
              Write and test your Lua code directly in the browser with VS Code-powered syntax highlighting and real-time error checking.
            </p>
          </div>
          <div className="card text-center group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-roblox/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Comprehensive Curriculum</h3>
            <p className="text-gray-600 leading-relaxed">
              Step-by-step tutorials covering everything from Lua basics to advanced Roblox game mechanics and professional patterns.
            </p>
          </div>
          <div className="card text-center group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-roblox/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 mb-6 transform group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Track Your Progress</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your learning journey with detailed progress tracking, saved code, and visual completion indicators.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-gradient">How It Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start your journey to becoming a professional Roblox scripter in just a few simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: User, title: 'Sign Up Free', desc: 'Create your account and get instant access to all courses' },
              { icon: BookOpen, title: 'Choose a Course', desc: 'Pick from beginner to advanced courses tailored for you' },
              { icon: Code, title: 'Practice Coding', desc: 'Write real Lua code with interactive exercises and hints' },
              { icon: Award, title: 'Build Skills', desc: 'Master professional patterns and build real Roblox games' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="card text-center h-full">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-roblox text-white font-bold text-lg mb-4">
                    {idx + 1}
                  </div>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-roblox/10 text-roblox mb-4">
                    <step.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-roblox/30" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose LearnRBX */}
        <div className="mb-24 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-gradient">Why Choose LearnRBX?</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Professional Curriculum', desc: 'Learn industry-standard patterns and best practices used by professional Roblox developers' },
              { icon: Zap, title: 'Interactive Learning', desc: 'Hands-on coding exercises with instant feedback and detailed solutions' },
              { icon: CheckCircle, title: 'Comprehensive Coverage', desc: 'From Lua basics to advanced topics like DataStores, events, and optimization' },
              { icon: Users, title: 'Self-Paced Learning', desc: 'Learn at your own speed with no deadlines or pressure' },
              { icon: Code, title: 'Real-World Projects', desc: 'Build complete systems like shops, inventories, and team mechanics' },
              { icon: Award, title: 'Career Ready', desc: 'Gain the skills needed to work as a professional Roblox game developer' },
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-roblox text-white">
                    <benefit.icon size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-gradient">Start Your Learning Journey</span>
            </h2>
            <p className="text-center text-gray-600 mb-2 text-lg">
              Choose your learning path and start building today
            </p>
            <p className="text-center text-gray-500 text-sm">
              All courses are free and available immediately
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={user ? `/course/${course.id}` : '/signup'}
                className="card group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-roblox/20 hover:-translate-y-1"
              >
                <div className="flex items-start mb-6">
                  <div className="text-5xl mr-4 transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {course.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 group-hover:text-roblox transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                      {course.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock size={16} className="text-roblox" />
                    <span className="font-medium text-xs md:text-sm">{course.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-xs">{course.lessons.length} lessons</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-roblox font-bold group-hover:gap-2 transition-all">
                  {user ? 'Continue Learning' : 'Start Learning'}
                  <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        {!user && (
          <div className="mt-20 mb-12 text-center">
            <div className="bg-gradient-to-r from-roblox to-blue-600 rounded-3xl p-12 md:p-16 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Become a Professional Roblox Scripter?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of developers learning Roblox scripting. Start your journey today - completely free!
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-white text-roblox font-bold text-lg px-10 py-4 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
              >
                Get Started Free →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

