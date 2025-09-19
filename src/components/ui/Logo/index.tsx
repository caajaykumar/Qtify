import { memo } from 'react'

type LogoProps = {
  className?: string
}

function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7 text-white"
        aria-hidden
      >
        <path d="M9 3v10.55A4 4 0 1 0 11 17V7h8V3H9z" />
      </svg>
      <span className="text-white text-xl font-semibold select-none">QTify</span>
    </div>
  )
}

export default memo(Logo)
