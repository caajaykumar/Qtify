import axios from 'axios'

const client = axios.create({
  baseURL: 'https://qtify-backend-labs.crio.do',
  timeout: 15000,
})

client.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error?.response?.data?.message || error.message || 'Request failed'
    return Promise.reject(new Error(message))
  }
)

export default client
