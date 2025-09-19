import client from './client'

export async function getTopAlbums() {
  const { data } = await client.get('/albums/top')
  return data
}

export async function getNewAlbums() {
  const { data } = await client.get('/albums/new')
  return data
}
