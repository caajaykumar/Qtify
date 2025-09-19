import { useState, useMemo, memo } from 'react'
import Card from '@/components/common/Card'
import Carousel from '@/components/common/Carousel'
import AlbumCarousel from '@/components/common/AlbumCarousel'

import './section.css'
import CardSkeleton from '@/components/common/Skeletons/CardSkeleton'

function Section({
  title,
  items = [],
  loading = false,
  error = null,
  type = 'album',
  initialLimit = 6,
  onRetry,
}) {
  const [expanded, setExpanded] = useState(false)

  const visibleItems = useMemo(() => {
    if (expanded) return items
    return items.slice(0, initialLimit)
  }, [items, expanded, initialLimit])

  // stable id for aria-labelledby
  const headingId = `section-title-${String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const cardsTestId = `section-${String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-cards`
  const carouselTestId = `section-${String(title).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-carousel`

  return (
    <section className="section-container" aria-labelledby={headingId} role="region">
      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title" id={headingId}>{title}</h2>
        {items.length > initialLimit && (
          <button
            className="expand-button"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Collapse' : 'Show All'}
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="cards-grid">
          {Array.from({ length: Math.max(4, initialLimit / 2) }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="error-state" role="alert">
          <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{String(error)}</span>
          {onRetry && (
            <button className="expand-button" onClick={onRetry} style={{ marginLeft: 12 }}>
              Retry
            </button>
          )}
        </div>
      )}

      {/* Cards Grid or Carousel */}
      {!loading && !error && (
        expanded ? (
          <div className="cards-grid" data-testid={cardsTestId}>
            {visibleItems.map((item) => (
              <Card key={item.id} item={item} type={type} />
            ))}
          </div>
        ) : type === 'album' ? (
          <div data-testid={carouselTestId}>
            <AlbumCarousel step={1} visibleCount={8}>
              {items.map((item) => (
                <Card key={item.id} item={item} type={type} />
              ))}
            </AlbumCarousel>
          </div>
        ) : (
          <Carousel>
            {visibleItems.map((item) => (
              <div key={item.id}>
                <Card item={item} type={type} />
              </div>
            ))}
          </Carousel>
        )
      )}
    </section>
  )
}

export default memo(Section)
