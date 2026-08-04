import allTaskImg from '../assets/landingpage/all-task.png'

export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-white py-16 md:py-24"
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,white_90%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8 flex flex-col items-center text-center">
        {/* Kicker Badge */}
        <div className="flex items-center space-x-3 mb-6 animate-fade-in">
          <span className="h-0.5 w-8 bg-[#328f97]" />
          <span className="text-[10px] font-roboto font-light tracking-[0.25em] text-[#328f97] uppercase">
            Verified | Lawyer Only Marketplace
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-2xl font-primary text-3xl sm:text-5xl md:text-6xl font-medium text-[#041626] leading-[1.15] mb-6">
          <span className="italic font-normal text-[#CF6A52] tracking-wide mr-2">
            CounselTask
          </span>
          connects verified colleagues through trusted legal support.
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-sm sm:text-base md:text-lg text-[#242424] font-normal leading-relaxed font-secondary mb-8">
          Post a task — holding brief, court appearance, drafting, research —
          and get matched with a verified Nigerian lawyer. Or find assignments
          and get paid securely.
        </p>

        {/* CTA Button */}
        <button className="px-8 py-4 bg-[#0e6e66] hover:bg-[#0b544e] text-white font-normal text-sm tracking-wide rounded-lg transition-all duration-200 shadow-md shadow-[#0e6e66]/10 hover:shadow-lg hover:shadow-[#0e6e66]/20 cursor-pointer mb-16 font-secondary">
          Click to get started
        </button>

        {/* Mock Dashboard Image */}
        <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl shadow-[#041626]/12 border border-gray-200/50 hover:shadow-3xl transition-all duration-300">
          <img
            src={allTaskImg}
            alt="Counsel Task Dashboard Preview"
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>
    </section>
  )
}
