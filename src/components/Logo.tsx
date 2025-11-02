interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Main gradient */}
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A2FF" />
              <stop offset="50%" stopColor="#0066CC" />
              <stop offset="100%" stopColor="#0051B8" />
            </linearGradient>
            
            {/* Shine gradient */}
            <linearGradient id="logoShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          
          {/* Main block shape (3D isometric style) */}
          {/* Base shadow */}
          <rect
            x="20"
            y="75"
            width="60"
            height="15"
            rx="4"
            fill="rgba(0,51,184,0.2)"
          />
          
          {/* Main block */}
          <path
            d="M 15 25 L 50 15 L 85 25 L 50 95 Z"
            fill="url(#logoGradient)"
          />
          
          {/* Top face highlight */}
          <path
            d="M 15 25 L 50 15 L 85 25 L 50 50 Z"
            fill="url(#logoShine)"
            opacity="0.6"
          />
          
          {/* Code brackets - left */}
          <path
            d="M 30 45 L 25 50 L 30 55 M 30 50 L 25 50"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.95"
          />
          
          {/* Code brackets - right */}
          <path
            d="M 70 45 L 75 50 L 70 55 M 70 50 L 75 50"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.95"
          />
          
          {/* Code line in middle */}
          <line
            x1="43"
            y1="50"
            x2="57"
            y2="50"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.95"
          />
          
          {/* Highlight accent */}
          <ellipse
            cx="50"
            cy="35"
            rx="15"
            ry="8"
            fill="rgba(255,255,255,0.15)"
          />
        </svg>
      </div>
      
      {showText && (
        <span
          className={`font-extrabold bg-gradient-to-r from-[#00A2FF] via-[#0051B8] to-[#00A2FF] bg-clip-text text-transparent ${textSizes[size]} tracking-tight`}
        >
          LearnRBX
        </span>
      )}
    </div>
  )
}

