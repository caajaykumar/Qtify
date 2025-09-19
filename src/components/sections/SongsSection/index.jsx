import { useEffect, useMemo } from 'react'
import GenreTabs from '@/components/common/GenreTabs'
import Carousel from '@/components/common/Carousel'
import Card from '@/components/common/Card'
import { useSongStore } from '@/store/songStore'

export default function SongsSection() {
  const {
    songs,
    loading,
    error,
    genres,
    loadingGenres,
    genresError,
    activeGenre,
    searchQuery,
    fetchSongs,
    fetchGenres,
    setActiveGenre,
  } = useSongStore()

  useEffect(() => {
    if (!songs?.length) fetchSongs()
    if (!genres?.length) fetchGenres()
  }, [])

  const filtered = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase()
    const byGenre = (arr) => {
      if (activeGenre === 'all') return arr
      return arr.filter((s) => {
        const g = s?.genre
        const key = (g?.key || g?.label || g?.name || s?.genreKey || s?.genreName || '').toString().toLowerCase()
        return key === activeGenre.toLowerCase()
      })
    }
    const byQuery = (arr) => {
      if (!q) return arr
      return arr.filter((s) => {
        const title = (s?.title || s?.name || '').toString().toLowerCase()
        const artists = Array.isArray(s?.artists) ? s.artists.join(' ').toLowerCase() : ''
        return title.includes(q) || artists.includes(q)
      })
    }
    const result = byQuery(byGenre(songs))
    console.debug('[SongsSection] filter', { activeGenre, searchQuery, inputCount: songs?.length || 0, outputCount: result.length })
    return result
  }, [songs, activeGenre, searchQuery])

  return (
    <section className="section-container">
      <div className="section-header">
        <h2 className="section-title">Songs</h2>
      </div>

      {loadingGenres && (
        <div className="loading-state"><div className="loading-spinner"></div><span>Loading genres...</span></div>
      )}
      {genresError && (
        <div className="error-state" role="alert">
          <span>{String(genresError)}</span>
          <button className="expand-button" onClick={fetchGenres} style={{ marginLeft: 12 }}>Retry</button>
        </div>
      )}

      {!loadingGenres && !genresError && (
        <div className="mb-4">
          <GenreTabs
            genres={genres?.data || genres}
            value={activeGenre}
            onChange={setActiveGenre}
          />
        </div>
      )}

      {loading && (
        <div className="loading-state"><div className="loading-spinner"></div><span>Loading songs...</span></div>
      )}
      {error && !loading && (
        <div className="error-state" role="alert">
          <span>{String(error)}</span>
          <button className="expand-button" onClick={fetchSongs} style={{ marginLeft: 12 }}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <Carousel>
          {filtered.map((song) => (
            <div key={song.id}>
              <Card item={song} type="song" />
            </div>
          ))}
        </Carousel>
      )}
    </section>
  )
}
