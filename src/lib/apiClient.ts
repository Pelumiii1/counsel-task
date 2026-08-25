import axios from 'axios'
import { getStoredSessionToken } from './authGuard'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
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
