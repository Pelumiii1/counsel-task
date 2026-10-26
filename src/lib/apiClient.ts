import axios from 'axios'
import { getStoredSessionToken } from './authGuard'

function getNormalizedApiUrl(): string {
  let url = (import.meta.env.VITE_API_URL as string | undefined)?.trim() || 'https://api.counseltask.com/api'
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }
  // Ensure the /api suffix is present since all endpoints are mapped under /api
  if (!url.endsWith('/api') && !url.includes('/api/')) {
    url = url.replace(/\/+$/, '') + '/api'
  }
  return url.replace(/\/+$/, '')
}

export const apiClient = axios.create({
  baseURL: getNormalizedApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach session token if present
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getStoredSessionToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})
