export function CallToAction() {
  return (
    <section className="w-full bg-[#F4F0E8] py-24 md:py-32 border-t border-gray-200/40">
      <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col items-center text-center">
        {/* Kicker Badge */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="h-[1.5px] w-8 bg-[#00726D]" />
          <span className="text-[12px] font-roboto font-light tracking-[0.25em] text-[#00726D] uppercase">
            Ready When You Are
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-primary text-3xl sm:text-4xl md:text-[42px] font-medium leading-tight text-[#041626] tracking-tight max-w-3xl mb-10">
          Join a marketplace where every lawyer on it has been verified.
        </h2>

        {/* Get Started Button */}
        <button className="px-8 py-3.5 bg-[#00726D] hover:bg-[#005c58] text-white font-secondary font-medium text-xs tracking-wider uppercase rounded transition-all duration-200 cursor-pointer shadow-sm shadow-[#00726D]/10">
          Get Started
        </button>
      </div>
    </section>
  )
}
