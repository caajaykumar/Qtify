const base =
  'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  dark: 'bg-[#121212] text-white hover:bg-black active:bg-black/90',
  primary: 'bg-[#34C94B] text-black hover:bg-[#2db340] active:bg-[#279b37]',
  secondary:
    'bg-transparent text-white border border-white/30 hover:border-white/60 active:border-white',
}

export default function UIButton({ children, className = '', variant = 'dark', ...rest }) {
  const variantClass = variants[variant] || variants.dark
  return (
    <button
      className={`${base} ${variantClass} px-4 py-2 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
