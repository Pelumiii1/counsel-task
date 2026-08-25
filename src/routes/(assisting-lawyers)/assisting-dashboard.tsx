import { useEffect, useRef } from 'react'
import {
  createFileRoute,
  Outlet,
  Link,
  useLocation,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { getAuthPayload, requireAuthGuard, storeSessionToken } from '#/lib/authGuard'
import { Bell, ChevronsUpDown, LogOut } from 'lucide-react'
import { toast } from 'sonner'
import LogoWhite from '#/assets/logo-white.png'
import { useAssistingProfile } from '#/hooks/useProfile'
import { useConversations } from '#/hooks/useMessages'
import { useNotifications } from '#/hooks/useNotifications'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard',
)({
  beforeLoad: () => {
    requireAuthGuard()
  },
  component: AssistingDashboardLayout,
})

function AssistingDashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { data: profile } = useAssistingProfile()

  const handleLogout = () => {
    storeSessionToken(null)
    navigate({ to: '/auth/login' })
  }
  const { data: conversations } = useConversations('assisting')
  const { data: notifications } = useNotifications('assisting')
  const prevUnreadNotifsRef = useRef<number | null>(null)

  const unreadMessagesCount = (conversations || []).reduce((sum, c) => sum + (c.unreadCount || 0), 0)
  const unreadNotificationsCount = (notifications || []).filter((n) => !n.isRead).length
  const hasUnreadNotifications = unreadNotificationsCount > 0 || unreadMessagesCount > 0

  useEffect(() => {
    if (prevUnreadNotifsRef.current !== null && unreadNotificationsCount > prevUnreadNotifsRef.current) {
      const latestNotif = (notifications || []).find((n) => !n.isRead)
      if (latestNotif) {
        toast.info(latestNotif.title, {
          description: latestNotif.content,
        })
      }
    }
    prevUnreadNotifsRef.current = unreadNotificationsCount
  }, [unreadNotificationsCount, notifications])

  const fullName = profile?.fullName?.trim() || 'Funke Akindele'
  const roleName = 'Assisting Lawyer'

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  const initials = getInitials(fullName)

  // Helper check for active menu link styling
  const isActive = (path: string) => {
    return location.pathname === path
  }

  const menuItems = [
    { label: 'Task', path: '/assisting-dashboard' },
    { label: 'Proposals', path: '/assisting-dashboard/proposals' },
    { label: 'Messages', path: '/assisting-dashboard/messages', badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined },
    { label: 'Payments', path: '/assisting-dashboard/payments' },
    { label: 'Notifications', path: '/assisting-dashboard/notifications', badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined, hasDot: unreadNotificationsCount > 0 },
    { label: 'Profile', path: '/assisting-dashboard/profile' },
  ]

  return (
    <div className="min-h-screen bg-[#f9fafb] flex font-secondary overflow-hidden">
      {/* Constant Left Sidebar */}
      <aside className="w-65 h-screen bg-[#031625] text-white flex flex-col justify-between shrink-0 select-none border-r border-[#0d2235]">
        {/* Top Section */}
        <div className="flex flex-col">
          {/* Organization Switcher Header */}
          <div className="p-4 flex items-center justify-between border-b border-[#0d2235] hover:bg-[#071f32] transition cursor-pointer">
            <div className="flex items-center gap-3">
              <img
                src={LogoWhite}
                alt="Counsel Task Logo"
                className="h-9 w-auto object-contain select-none"
              />
              <span className="text-[14px] font-normal font-secondary text-white select-none">
                Counsel Task
              </span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Nav List */}
          <nav className="mt-6 px-3 flex flex-col gap-1.5">
            {menuItems.map((item) => {
              // Exact matches or falls back to active status
              const active =
                item.path === '/assisting-dashboard'
                  ? location.pathname === '/assisting-dashboard' ||
                  location.pathname === '/assisting-dashboard/'
                  : isActive(item.path)

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center justify-between w-full h-10 px-3 rounded-lg text-sm font-medium transition duration-100 cursor-pointer ${active
                      ? 'text-white font-semibold bg-white/10'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 text-[11px] font-bold rounded-full bg-[#00726D] text-white">
                      {item.badge}
                    </span>
                  )}
                  {item.hasDot && !item.badge && (
                    <span className="w-2 h-2 rounded-full bg-[#e05e5e]" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Profile Footer Section */}
        <Link
          to="/assisting-dashboard/profile"
          className="p-4 border-t border-[#0d2235] flex items-center justify-between hover:bg-[#071f32] transition cursor-pointer no-underline text-inherit"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00726d] flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider select-none shadow-xs">
              {initials}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight text-white truncate max-w-30">
                {fullName}
              </span>
              <span className="text-[10px] text-gray-400 font-normal leading-tight">
                {roleName}
              </span>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
        </Link>
      </aside>

      {/* Right Side: Navbar + Viewport Scroll Area */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        {/* Constant Top Header Navbar */}
        <header className="h-17.5 w-full border-b border-gray-100 bg-white px-6 sm:px-12 flex items-center justify-end shrink-0 select-none">
          {/* Right Side: Switcher Pill Button, Notification & Avatar */}
          <div className="flex items-center gap-5 sm:gap-6">
            <Link
              to="/dashboard"
              className="h-9.5 px-4 sm:px-5 rounded-full border border-[#96D2CD] bg-[#E8F5F3] hover:bg-[#D8EFEA] hover:border-[#00726D]/50 text-[#00726D] text-[13px] sm:text-[13.5px] font-medium transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap shadow-2xs no-underline"
            >
              Switch to Engaging Lawyer
            </Link>

            <Link
              to="/assisting-dashboard/notifications"
              className="text-gray-500 hover:text-gray-700 transition relative focus:outline-none cursor-pointer p-1.5 rounded-lg hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell className="w-5.5 h-5.5 stroke-[1.8]" />
              {hasUnreadNotifications && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 ring-2 ring-white" />
                </span>
              )}
            </Link>

            <Link
              to="/assisting-dashboard/profile"
              className="w-10 h-10 rounded-full bg-[#00726d]/10 text-[#00726d] border border-[#00726d]/20 flex items-center justify-center font-bold text-xs cursor-pointer select-none hover:bg-[#00726d]/20 transition"
              aria-label="Profile"
            >
              {initials}
            </Link>

            <button
              onClick={handleLogout}
              title="Sign out"
              aria-label="Sign out"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-200"
            >
              <LogOut className="w-4.5 h-4.5 stroke-[1.8]" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Viewport Area */}
        <div className="flex-1 w-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
