import { memo } from 'react'

function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src="/images/logo.png" alt="QTify logo" className="w-7 h-7" />
      <span className="text-white text-xl font-semibold select-none">Qtify</span>
    </div>
  )
}

export default memo(Logo)
