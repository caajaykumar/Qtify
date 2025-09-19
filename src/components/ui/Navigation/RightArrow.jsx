export default function RightArrow({ className = '' }) {
  return (
    <svg
      className={`w-9 h-9 text-black/70 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-white/90 transition ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="11.5" fill="currentColor" fillOpacity="0" />
      <path d="M9 6L15 12L9 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
