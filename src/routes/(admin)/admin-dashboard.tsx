import {
  createFileRoute,
  redirect,
  useNavigate,
  Outlet,
  Link,
  useLocation,
} from '@tanstack/react-router'
import { Bell, ChevronsUpDown, LogOut } from 'lucide-react'
import { getAuthPayload, requireAuthGuard, storeSessionToken } from '#/lib/authGuard'
import { NotFound } from '#/components/NotFound'
import LogoWhite from '#/assets/logo-white.png'

export const Route = createFileRoute('/(admin)/admin-dashboard')({
  beforeLoad: () => {
    requireAuthGuard()
  },
  notFoundComponent: NotFound,
  component: AdminDashboardLayout,
})

const NAV_ITEMS = [
  { label: 'Overview', path: '/admin-dashboard' },
  { label: 'Task', path: '/admin-dashboard/tasks' },
  { label: 'Lawyers', path: '/admin-dashboard/lawyers' },
  { label: 'Finance', path: '/admin-dashboard/finance' },
  { label: 'Announcements', path: '/admin-dashboard/announcements' },
  { label: 'Report', path: '/admin-dashboard/report' },
]

function AdminDashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = getAuthPayload()

  const firstName = (auth as any)?.firstName || 'Admin'
  const lastName = (auth as any)?.lastName || 'User'
  const fullName = `${firstName} ${lastName}`.trim()
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  const handleLogout = () => {
    storeSessionToken(null)
    navigate({ to: '/auth/login' })
  }

  const isNavActive = (path: string) => {
    if (path === '/admin-dashboard') {
      return (
        location.pathname === '/admin-dashboard' ||
        location.pathname === '/admin-dashboard/'
      )
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex font-secondary overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-65 h-screen bg-[#031625] text-white flex flex-col justify-between shrink-0 select-none border-r border-[#0d2235]">
        {/* Top Section */}
        <div className="flex flex-col">
          {/* Logo / Org Switcher Header */}
          <Link
            to="/admin-dashboard"
            className="p-4 flex items-center justify-between border-b border-[#0d2235] hover:bg-[#071f32] transition cursor-pointer no-underline"
          >
            <div className="flex items-center gap-3">
              <img
                src={LogoWhite}
                alt="Counsel Task Logo"
                className="h-9 w-auto object-contain select-none"
              />
              <span className="text-[14px] font-normal text-white select-none tracking-wide">
                Counsel Task
              </span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-gray-400" />
          </Link>

          {/* Nav List */}
          <nav className="mt-6 px-3 flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(item.path)
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center w-full h-10 px-3 rounded-lg text-sm font-medium transition duration-100 cursor-pointer text-left no-underline ${active
                    ? 'text-white font-semibold bg-white/10'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Profile Footer */}
        <div className="p-4 border-t border-[#0d2235] flex items-center justify-between hover:bg-[#071f32] transition cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00726d] flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider select-none shadow-xs">
              {initials}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight text-white truncate max-w-30">
                {fullName}
              </span>
              <span className="text-[10px] text-gray-400 font-normal leading-tight">
                Administrator
              </span>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
        </div>
      </aside>

      {/* ── Main Dashboard Content ── */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        {/* Top Header Navbar */}
        <header className="h-16 w-full border-b border-gray-200/70 bg-white px-6 sm:px-10 flex items-center justify-end shrink-0 select-none">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition focus:outline-none cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 stroke-[1.8]" />
            </button>

            <div
              className="w-9 h-9 rounded-full bg-[#00726d]/15 text-[#00726d] border border-[#00726d]/25 flex items-center justify-center font-bold text-xs cursor-pointer select-none"
              aria-label="Admin Profile"
            >
              {initials}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              aria-label="Sign out"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer focus:outline-none"
            >
              <LogOut className="w-4 h-4 stroke-[1.8]" />
            </button>
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="flex-1 w-full overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Top Welcome & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-semibold text-[#00726D] tracking-tight font-primary">
                Welcome back, Admin.
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-[#00726D] font-primary">
                Here's an overview of today's platform activity.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00726D] px-5 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-[#005c58] active:scale-[0.99] cursor-pointer self-start sm:self-auto"
            >
              <span>Export</span>
            </button>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  )
}
