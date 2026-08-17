import {
  createFileRoute,
  Outlet,
  Link,
  useLocation,
} from '@tanstack/react-router'
import { Bell, ChevronsUpDown } from 'lucide-react'
import LogoWhite from '#/assets/logo-white.png'

export const Route = createFileRoute('/(assisting-lawyers)/assisting-dashboard')({
  component: AssistingDashboardLayout,
})

function AssistingDashboardLayout() {
  const location = useLocation()

  // Helper check for active menu link styling
  const isActive = (path: string) => {
    return location.pathname === path
  }

  const menuItems = [
    { label: 'Browse Task', path: '/assisting-dashboard' },
    { label: 'My Proposals', path: '/assisting-dashboard/proposals' },
    { label: 'Messages', path: '/assisting-dashboard/messages' },
    { label: 'Notifications', path: '/assisting-dashboard/notifications' },
    { label: 'Payments', path: '/assisting-dashboard/payments' },
    { label: 'My Profile', path: '/assisting-dashboard/profile' },
  ]

  return (
    <div className="min-h-screen bg-[#f9fafb] flex font-secondary overflow-hidden">
      {/* Assisting Lawyer Left Sidebar */}
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
              const active =
                item.path === '/assisting-dashboard'
                  ? location.pathname === '/assisting-dashboard' ||
                    location.pathname === '/assisting-dashboard/'
                  : isActive(item.path)

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center w-full h-10 px-3 rounded-lg text-sm font-medium transition duration-100 cursor-pointer ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
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
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center text-xs font-bold text-white uppercase overflow-hidden ring-1 ring-white/10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80&h=80"
                alt="Funke Akindele"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight text-white">
                Funke Akindele
              </span>
              <span className="text-[10px] text-gray-400 font-normal leading-tight">
                Assisting Lawyer
              </span>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-400" />
        </Link>
      </aside>

      {/* Right Side: Navbar + Viewport Scroll Area */}
      <div className="flex-1 h-screen flex flex-col overflow-hidden">
        {/* Top Header Navbar */}
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
              className="text-gray-500 hover:text-gray-700 transition relative focus:outline-none cursor-pointer p-1"
              aria-label="Notifications"
            >
              <Bell className="w-5.5 h-5.5 stroke-[1.8]" />
            </Link>

            <Link
              to="/assisting-dashboard/profile"
              className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden cursor-pointer block shrink-0"
              aria-label="My Profile"
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
