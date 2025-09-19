import Navbar from '@/components/common/Navbar/index.jsx'
import Section from '@/components/common/Section'
import { useEffect } from 'react'
import { useAlbumStore } from '@/store/albumStore'
import SongsSection from '@/components/sections/SongsSection'

export default function Home() {
  const {
    topAlbums,
    newAlbums,
    loadingTop,
    loadingNew,
    errorTop,
    errorNew,
    fetchTopAlbums,
    fetchNewAlbums,
  } = useAlbumStore()

  useEffect(() => {
    if (!topAlbums?.length) fetchTopAlbums()
    if (!newAlbums?.length) fetchNewAlbums()
  }, [])

  return (
    <div className="min-h-screen bg-[#121212] text-white ">
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        <Section
          title="Top Albums"
          items={topAlbums}
          loading={loadingTop}
          error={errorTop}
          type="album"
          initialLimit={8}
          onRetry={fetchTopAlbums}
        />

        <Section
          title="New Albums"
          items={newAlbums}
          loading={loadingNew}
          error={errorNew}
          type="album"
          initialLimit={8}
          onRetry={fetchNewAlbums}
        />

        {/* Songs section (always carousel with genre tabs) */}
        <SongsSection />
      </main>
    </div>
  )
}
