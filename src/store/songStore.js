import { create } from 'zustand'
import { getSongs } from '@/services/api/songs'
import { getGenres } from '@/services/api/genres'

export const useSongStore = create((set, get) => ({
  songs: [],
  loading: false,
  error: null,
  genres: [],
  loadingGenres: false,
  genresError: null,
  activeGenre: 'all',
  searchQuery: '',

  async fetchSongs() {
    if (get().loading) return
    set({ loading: true, error: null })
    try {
      const data = await getSongs()
      set({ songs: data, loading: false })
    } catch (e) {
      set({ error: e.message || 'Failed to load songs', loading: false })
    }
  },

  async fetchGenres() {
    if (get().loadingGenres) return
    set({ loadingGenres: true, genresError: null })
    try {
      const data = await getGenres()
      set({ genres: data?.data || data || [], loadingGenres: false })
    } catch (e) {
      set({ genresError: e.message || 'Failed to load genres', loadingGenres: false })
    }
  },

  setActiveGenre(key) {
    set({ activeGenre: key })
  },

  setSearchQuery(q) {
    set({ searchQuery: q })
  },
}))
