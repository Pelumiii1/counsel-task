import { redirect } from '@tanstack/react-router'

/**
 * JWT payload decoder and session token manager.
 * Migrated to use `sessionToken` across localStorage, sessionStorage, and document cookies.
 */

export interface JwtPayload {
  sub: string
  role: string
  exp?: number
  iat?: number
  firstName?: string
  lastName?: string
  email?: string
  fullName?: string
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : null
}

export function setCookie(name: string, value: string, days = 7): void {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

export function removeCookie(name: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`
}

export function getStoredSessionToken(): string | null {
  if (typeof window === 'undefined') return null
  return (
    localStorage.getItem('sessionToken') ||
    sessionStorage.getItem('sessionToken') ||
    localStorage.getItem('counsel_session_token') ||
    localStorage.getItem('counsel_auth_token') ||
    getCookie('sessionToken') ||
    getCookie('counsel_auth_token') ||
    null
  )
}

export function storeSessionToken(token: string | null): void {
  if (typeof window === 'undefined') return
  if (token) {
    localStorage.setItem('sessionToken', token)
    sessionStorage.setItem('sessionToken', token)
    localStorage.setItem('counsel_session_token', token)
    localStorage.setItem('counsel_auth_token', token)
    setCookie('sessionToken', token, 7)
    setCookie('counsel_auth_token', token, 7)
  } else {
    localStorage.removeItem('sessionToken')
    sessionStorage.removeItem('sessionToken')
    localStorage.removeItem('counsel_session_token')
    localStorage.removeItem('counsel_auth_token')
    removeCookie('sessionToken')
    removeCookie('counsel_auth_token')
  }
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded) as JwtPayload
  } catch {
    return null
  }
}

export function isExpired(payload: JwtPayload): boolean {
  if (!payload.exp) return false
  const expSeconds = payload.exp > 1e11 ? payload.exp / 1000 : payload.exp
  return Date.now() / 1000 > expSeconds
}

/**
 * Returns the current user's JWT payload, or null if there is no valid/non-expired token.
 */
export function getAuthPayload(): JwtPayload | null {
  if (typeof window === 'undefined') return null
  const token = getStoredSessionToken()
  if (!token) return null
  const payload = decodeToken(token)
  if (!payload || isExpired(payload)) {
    storeSessionToken(null)
    return null
  }
  return payload
}

/**
 * Auth guard validator for TanStack Router `beforeLoad`.
 * Safe against SSR kicks: only executes redirect on client side when window is defined.
 */
export function requireAuthGuard() {
  if (typeof window === 'undefined') {
    return
  }
  const auth = getAuthPayload()
  if (!auth) {
    throw redirect({ to: '/auth/login' })
  }
  return auth
}

/**
 * Guest guard for Login / Register pages (redirects if already logged in).
 */
export function requireGuestGuard() {
  if (typeof window === 'undefined') {
    return
  }
  const auth = getAuthPayload()
  if (auth) {
    throw redirect({ to: dashboardPathForRole(auth.role) })
  }
}

/**
 * Returns the dashboard path for a given role.
 */
export function dashboardPathForRole(role?: string): string {
  switch (role) {
    case 'ROLE_ADMIN':
      return '/admin-dashboard'
    case 'ROLE_ASSISTING_LAWYER':
      return '/assisting-dashboard'
    default:
      return '/engaging-dashboard'
  }
}
