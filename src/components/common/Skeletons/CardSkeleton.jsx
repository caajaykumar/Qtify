export default function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white/5 rounded-lg overflow-hidden" style={{ height: 260 }}>
      <div className="bg-white/10" style={{ height: '70%' }} />
      <div className="p-3 space-y-2" style={{ height: '30%' }}>
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  )
}
