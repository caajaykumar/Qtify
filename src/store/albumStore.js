import { create } from 'zustand'
import { getTopAlbums, getNewAlbums } from '@/services/api/albums'

export const useAlbumStore = create((set, get) => ({
  topAlbums: [],
  newAlbums: [],
  loadingTop: false,
  loadingNew: false,
  errorTop: null,
  errorNew: null,

  async fetchTopAlbums() {
    if (get().loadingTop) return
    set({ loadingTop: true, errorTop: null })
    try {
      const data = await getTopAlbums()
      set({ topAlbums: data, loadingTop: false })
    } catch (e) {
      set({ errorTop: e.message || 'Failed to load top albums', loadingTop: false })
    }
  },

  async fetchNewAlbums() {
    if (get().loadingNew) return
    set({ loadingNew: true, errorNew: null })
    try {
      const data = await getNewAlbums()
      set({ newAlbums: data, loadingNew: false })
    } catch (e) {
      set({ errorNew: e.message || 'Failed to load new albums', loadingNew: false })
    }
  },
}))
