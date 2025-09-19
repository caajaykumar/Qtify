import client from './client'

export async function getGenres() {
  const { data } = await client.get('/genres')
  return data
}
