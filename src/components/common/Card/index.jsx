// import Chip from '@mui/material/Chip'
import { memo } from 'react'
import './Card.css'

function Card({ item, type = 'album' }) {
  const title = item?.title || item?.name || 'Untitled'
  const image = item?.image || item?.thumbnail || ''
  const metric = type === 'song' ? item?.likes : item?.follows
  const metricLabel = type === 'song' ? 'Likes' : 'Follows'

  // Derive songs count for albums for tooltip display
  const songsCount = (() => {
    const c = item?.songsCount ?? item?.songCount ?? item?.trackCount ?? (Array.isArray(item?.songs) ? item.songs.length : undefined) ?? (Array.isArray(item?.tracks) ? item.tracks.length : undefined)
    return Number.isFinite(c) ? c : undefined
  })()
  const tooltipText = type === 'album' && songsCount != null ? `${songsCount} ${songsCount === 1 ? 'song' : 'songs'}` : undefined

  return (
    <div
      className="album-card-wrapper"
      data-testid="album-card"
      data-tooltip={tooltipText || undefined}
      aria-label={tooltipText || undefined}
      tabIndex={tooltipText ? 0 : -1}
    >
      <div className="album-card">
        <div className="album-image">
          {image ? (
            <img src={image} alt={title} loading="lazy" />
          ) : (
            <div className="album-image-fallback">No Image</div>
          )}
        </div>
        <div className="album-meta">
          <span className="metric-chip">
            {metric ?? 0} {metricLabel}
          </span>
        </div>
      </div>
      <h3 className="album-title" title={title}>{title}</h3>
    </div>
  )
}

export default memo(Card)
