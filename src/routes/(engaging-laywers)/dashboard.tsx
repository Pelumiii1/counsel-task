import { useState } from 'react'
import {
  createFileRoute,
  Outlet,
  Link,
  useLocation,
} from '@tanstack/react-router'
import { Bell, ChevronsUpDown } from 'lucide-react'
import LogoWhite from '#/assets/logo-white.png'

export const Route = createFileRoute('/(engaging-laywers)/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const location = useLocation()
  const [role, setRole] = useState<'engaging' | 'assisting'>('engaging')

  // Helper check for active menu link styling
  const isActive = (path: string) => {
    return location.pathname === path
  }

  const menuItems = [
    { label: 'Task', path: '/dashboard' },
    { label: 'Messages', path: '/dashboard/messages' },
    { label: 'Payments', path: '/dashboard/payments' },
    { label: 'Notification', path: '/dashboard/notifications' },
    { label: 'Ratings', path: '/dashboard/ratings' },
    { label: 'Account Settings', path: '/dashboard/settings' },
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
              <div className="flex flex-col">
                <span className="text-[14px] font-normal font-secondary text-white select-none leading-tight">
                  Counsel Task
                </span>
                <span className="text-[10px] text-[#00a896] capitalize font-medium">
                  {role === 'engaging' ? 'Engaging Lawyer' : 'Assisting Lawyer'}
                </span>
              </div>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Nav List */}
          <nav className="mt-6 px-3 flex flex-col gap-1.5">
            {menuItems.map((item) => {
              // Exact matches or falls back to active status
              const active =
                item.path === '/dashboard'
                  ? location.pathname === '/dashboard' ||
                    location.pathname === '/dashboard/' ||
                    location.pathname === '/dashboard/post-job'
                  : isActive(item.path)

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center w-full h-10 px-3 rounded-lg text-sm font-medium transition duration-100 cursor-pointer ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-gray-400 hover:bg-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Profile Footer Section */}
        <div className="p-4 border-t border-[#0d2235] flex items-center justify-between hover:bg-[#071f32] transition cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ef4444]/90 flex items-center justify-center text-xs font-bold text-white uppercase overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=80&h=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight text-white">
                shadcn
              </span>
              <span className="text-[10px] text-gray-400 font-normal leading-tight">
                m@example.com
              </span>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
        </div>
      </aside>

      {/* Right Side: Navbar + Viewport Scroll Area */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        {/* Constant Top Header Navbar */}
        <header className="h-17.5 w-full border-b border-gray-100 bg-white px-6 sm:px-12 flex items-center justify-end shrink-0 select-none">
          {/* Right Side: Switcher Pill Button, Notification & Avatar */}
          <div className="flex items-center gap-5 sm:gap-6">
            <button
              type="button"
              onClick={() =>
                setRole((prev) => (prev === 'engaging' ? 'assisting' : 'engaging'))
              }
              className="h-9.5 px-4 sm:px-5 rounded-full border border-[#96D2CD] bg-[#E8F5F3] hover:bg-[#D8EFEA] hover:border-[#00726D]/50 text-[#00726D] text-[13px] sm:text-[13.5px] font-medium transition-all duration-200 cursor-pointer flex items-center justify-center whitespace-nowrap shadow-2xs"
            >
              {role === 'engaging'
                ? 'Switch to Assisting Lawyer'
                : 'Switch to Engaging Lawyer'}
            </button>

            <Link
              to="/dashboard/notifications"
              className="text-gray-500 hover:text-gray-700 transition relative focus:outline-none cursor-pointer p-1"
              aria-label="Notifications"
            >
              <Bell className="w-5.5 h-5.5 stroke-[1.8]" />
            </Link>

            <Link
              to="/dashboard/settings"
              className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden cursor-pointer block shrink-0"
              aria-label="Account Settings"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120"
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </Link>
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
