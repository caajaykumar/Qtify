import Navbar from '@/components/common/Navbar/index.jsx'
import Section from '@/components/common/Section'
import Hero from '@/components/common/Hero'
import { useEffect } from 'react'
import { useAlbumStore } from '@/store/albumStore'
import SongsSection from '@/components/sections/SongsSection'
import FAQSection from '@/components/sections/FAQSection'
import PlayerBar from '@/components/sections/PlayerBar'

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
      {/* Hero banner */}
      <Hero />
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
        {/* FAQs */}
        <div className="pt-4">
          <FAQSection />
        </div>
        {/* Player Bar */}
        <div className="pt-2">
        <PlayerBar
  title="Song name"
  subtitle="Album name"
  artwork="/images/album.png"
  duration={218}
  initialProgress={38}
  audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
/>
        </div>
      </main>
    </div>
  )
}
