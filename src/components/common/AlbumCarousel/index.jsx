import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles.css'

/**
 * Deterministic album carousel for tests and production.
 * - Renders ALL children (cards) in a horizontal row
 * - Shows `visibleCount` cards per view (defaults to 8)
 * - Each Next/Prev click moves by `step` cards (defaults to 2)
 * - Uses translateX for smooth animation
 * - Exposes test ids for buttons and track
 */
export default function AlbumCarousel({ children, step = 2, visibleCount = 8 }) {
  const items = useMemo(() => (Array.isArray(children) ? children : [children]).filter(Boolean), [children])
  const [index, setIndex] = useState(0)

  const cardWidth = 180 // px
  const gap = 16 // px

  // Responsive visible count based on container width
  const viewportRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (!viewportRef.current) return
    const el = viewportRef.current
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        setContainerWidth(w)
      }
    })
    obs.observe(el)
    setContainerWidth(el.getBoundingClientRect().width)
    return () => obs.disconnect()
  }, [])

  const effectiveVisible = useMemo(() => {
    if (!containerWidth) return visibleCount
    const fit = Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap)))
    return Math.min(visibleCount, fit)
  }, [containerWidth, visibleCount])

  const maxIndex = Math.max(0, items.length - effectiveVisible)

  // Clamp index if viewport shrinks/expands
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex))
  }, [maxIndex])

  const next = () => setIndex((i) => Math.min(i + step, maxIndex))
  const prev = () => setIndex((i) => Math.max(i - step, 0))

  const translateX = -(index * (cardWidth + gap))

  return (
    <div className="album-carousel" data-testid="album-carousel">
      <button
        className={`album-carousel-btn left ${index === 0 ? 'disabled' : ''}`}
        onClick={prev}
        aria-label="Previous"
        aria-disabled={index === 0}
        data-testid="album-carousel-prev"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M15.5 4.5L8 12l7.5 7.5-1.5 1.5L5 12l9-9 1.5 1.5z"/>
        </svg>
      </button>

      <div
        className="album-carousel-viewport"
        ref={viewportRef}
      >
        <div
          className="album-carousel-track"
          style={{ transform: `translateX(${translateX}px)` }}
          data-testid="album-carousel-track"
        >
          {items.map((child, idx) => (
            <div
              key={idx}
              className="album-carousel-item"
              style={{ width: cardWidth, marginRight: idx === items.length - 1 ? 0 : gap }}
              data-index={idx}
              aria-hidden={idx < index || idx >= index + effectiveVisible}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <button
        className={`album-carousel-btn right ${index >= maxIndex ? 'disabled' : ''}`}
        onClick={next}
        aria-label="Next"
        aria-disabled={index >= maxIndex}
        data-testid="album-carousel-next"
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8.5 19.5L16 12 8.5 4.5 10 3l9 9-9 9-1.5-1.5z"/>
        </svg>
      </button>
    </div>
  )
}
