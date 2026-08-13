import { Link } from '@tanstack/react-router'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-white px-6 py-24 text-center md:px-8"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(4, 22, 38, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(4, 22, 38, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        backgroundPosition: 'center top',
      }}
    >
      {/* Subtle radial gradient to fade grid edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,white_95%)]" />

      <div className="relative z-10 flex max-w-xl flex-col items-center">
        {/* Coral/Teal Badge */}
        <div className="flex items-center space-x-3 mb-6 animate-fade-in">
          <span className="h-0.5 w-8 bg-[#328f97]" />
          <span className="text-[11px] font-roboto font-light tracking-[0.25em] text-[#328f97] uppercase">
            Error Code 404
          </span>
          <span className="h-0.5 w-8 bg-[#328f97]" />
        </div>

        {/* Big 404 text */}
        <h1 className="font-primary text-8xl md:text-9xl font-bold text-[#041626] tracking-tight mb-2">
          4
          <span className="italic font-normal text-[#CF6A52] tracking-wide inline-block transform hover:rotate-12 transition-transform duration-300">
            0
          </span>
          4
        </h1>

        {/* Heading */}
        <h2 className="font-primary text-2xl md:text-3xl font-medium text-[#041626] mb-4">
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="font-secondary text-sm md:text-base text-[#242424] max-w-md leading-relaxed mb-10">
          The page you are looking for doesn't exist, has been removed, or is
          temporarily unavailable. Let's get you back on track.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-[#0e6e66] hover:bg-[#0b544e] text-white font-normal text-sm tracking-wide rounded-lg transition-all duration-200 shadow-md shadow-[#0e6e66]/10 hover:shadow-lg hover:shadow-[#0e6e66]/20 cursor-pointer font-secondary"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border border-[#041626]/20 hover:bg-[#041626]/5 text-[#041626] font-normal text-sm tracking-wide rounded-lg transition-all duration-200 cursor-pointer font-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
