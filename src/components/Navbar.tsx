import React, { useState } from 'react'
import logo from '../assets/logo.png'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('#how-it-works')

  const navLinks = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'For Lawyers', href: '#for-lawyers' },
    { label: 'Marketplace', href: '#marketplace' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Help', href: '#help' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center select-none">
              <img
                src={logo}
                alt="Counsel Task Logo"
                className="h-10 w-auto object-contain"
              />
            </a>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveHash(link.href)}
                className={`relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  activeHash === link.href
                    ? 'text-[#CF6A52]'
                    : 'text-[#242424] hover:text-[#041626]'
                }`}
              >
                {link.label}
                {activeHash === link.href && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#CF6A52] rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Menu Button (Desktop & Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-2.5 text-[#041626] hover:text-[#CF6A52] transition-colors duration-200 focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-transform duration-200"
            >
              {isOpen ? (
                <>
                  <path d="M2 2l14 10" />
                  <path d="M2 12L16 2" />
                </>
              ) : (
                <>
                  <path d="M1 1h12" />
                  <path d="M1 6h16" />
                  <path d="M1 11h8" />
                </>
              )}
            </svg>
            <span className="text-xs font-bold tracking-wider uppercase select-none font-secondary">
              {isOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-fade-in">
          <div className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setIsOpen(false)
                  setActiveHash(link.href)
                }}
                className={`text-base font-semibold tracking-wide py-2 transition-colors duration-200 ${
                  activeHash === link.href ? 'text-[#CF6A52]' : 'text-[#242424]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
