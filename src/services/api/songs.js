import client from './client'

export async function getSongs() {
  const { data } = await client.get('/songs')
  return data
}
