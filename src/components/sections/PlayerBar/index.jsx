import React, { useEffect, useMemo, useRef, useState } from 'react'
import './player.css'

export default function PlayerBar({
  title = 'Song name',
  subtitle = 'Album name',
  artwork = '/images/logo.png',
  duration = 218, // 3:38 in seconds
  initialProgress = 38,
  audioSrc = '', // optional: when provided, use real audio element
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(initialProgress)
  const [total, setTotal] = useState(duration)
  const audioRef = useRef(null)

  // If audioSrc is provided, wire up real audio; else simulate progress
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      const audio = audioRef.current

      const onLoaded = () => {
        if (!Number.isFinite(audio.duration)) return
        setTotal(Math.floor(audio.duration))
      }
      const onTime = () => setProgress(Math.floor(audio.currentTime))
      const onEnd = () => setIsPlaying(false)

      audio.addEventListener('loadedmetadata', onLoaded)
      audio.addEventListener('timeupdate', onTime)
      audio.addEventListener('ended', onEnd)
      return () => {
        audio.removeEventListener('loadedmetadata', onLoaded)
        audio.removeEventListener('timeupdate', onTime)
        audio.removeEventListener('ended', onEnd)
      }
    }
  }, [audioSrc])

  useEffect(() => {
    if (!audioSrc) {
      if (!isPlaying) return
      const id = setInterval(() => {
        setProgress((p) => {
          const next = p + 1
          return next >= total ? total : next
        })
      }, 1000)
      return () => clearInterval(id)
    }
  }, [isPlaying, audioSrc, total])

  const pct = useMemo(() => (total ? (progress / total) * 100 : 0), [progress, total])

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const r = Math.floor(s % 60)
    return `${m}:${r.toString().padStart(2, '0')}`
  }

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev
      if (audioSrc && audioRef.current) {
        const audio = audioRef.current
        if (next) {
          // Align currentTime with progress when resuming
          if (Math.abs(audio.currentTime - progress) > 1) {
            audio.currentTime = progress
          }
          audio.play().catch(() => {})
        } else {
          audio.pause()
        }
      }
      return next
    })
  }

  const handleSeek = (e) => {
    const track = e.currentTarget
    const rect = track.getBoundingClientRect()
    const x = e.clientX - rect.left
    const ratio = Math.min(Math.max(x / rect.width, 0), 1)
    const newTime = Math.floor(ratio * total)
    setProgress(newTime)
    if (audioSrc && audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <section className="player-section">
      <div className="player-container">
        {audioSrc ? <audio ref={audioRef} src={audioSrc} preload="metadata" /> : null}
        <div className="player-left">
          <div className="artwork">
            <img src={artwork} alt={title} />
          </div>
          <div className="meta">
            <div className="title">{title}</div>
            <div className="subtitle">{subtitle}</div>
          </div>
        </div>

        <div className="player-center">
          <button
            className="play-btn"
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#111">
                <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                <rect x="14" y="5" width="4" height="14" rx="1"></rect>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#111">
                <path d="M8 5l12 7-12 7V5z"></path>
              </svg>
            )}
          </button>

          <div className="track-row">
            <span className="time t-start">{fmt(progress)}</span>
            <div className="track" onClick={handleSeek} role="slider" aria-valuemin={0} aria-valuemax={total} aria-valuenow={progress} aria-label="Seek">
              <div className="progress" style={{ width: `${pct}%` }} />
            </div>
            <span className="time t-end">{fmt(total)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
