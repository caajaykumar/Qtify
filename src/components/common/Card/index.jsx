// import Chip from '@mui/material/Chip'
import { memo } from 'react'
import './Card.css'

function Card({ item, type = 'album' }) {
  const title = item?.title || item?.name || 'Untitled'
  const image = item?.image || item?.thumbnail || ''
  const metric = type === 'song' ? item?.likes : item?.follows
  const metricLabel = type === 'song' ? 'Likes' : 'Follows'

  return (
    <div className="album-card-wrapper">
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
