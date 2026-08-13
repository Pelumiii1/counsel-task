export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative w-full bg-[#041626] text-white py-20 md:py-28 overflow-hidden border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col space-y-6 mb-16">
          {/* Kicker Badge */}
          <div className="flex items-center space-x-3">
            <span className="h-[1.5px] w-8 bg-[#CF6A52]" />
            <span className="text-[12px] font-roboto font-light tracking-[0.25em] text-[#CF6A52] uppercase">
              Pricing and Charges
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-primary text-3xl sm:text-4xl md:text-[44px] font-medium leading-[1.2] tracking-tight">
            Clear before you fund a task, not after.
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-white/70 font-secondary font-light max-w-xl">
            The full breakdown shows on every task before payment — gross fee,
            service charge, VAT, and net payout.
          </p>
        </div>

        {/* 3-Column Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-lg overflow-hidden bg-white/[0.01]">
          {/* Column 1: Gross Task Fee */}
          <div className="p-8 md:p-10 flex flex-col space-y-6 border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-[10px] font-bold tracking-wider text-white/40 uppercase font-secondary">
              Gross Task Fee
            </span>
            <span className="font-primary text-3xl md:text-4xl font-semibold text-white tracking-wide">
              ₦100,000
            </span>
          </div>

          {/* Column 2: Platform Charge + VAT */}
          <div className="p-8 md:p-10 flex flex-col space-y-6 border-b md:border-b-0 md:border-r border-white/10">
            <span className="text-[10px] font-bold tracking-wider text-white/40 uppercase font-secondary">
              Platform Charge + VAT
            </span>
            <div className="flex items-baseline">
              <span className="font-primary text-3xl md:text-4xl font-semibold text-[#CF6A52] tracking-wide">
                -₦13,500
              </span>
              <span className="text-xs font-semibold text-[#CF6A52] ml-2.5 font-secondary">
                13.5%
              </span>
            </div>
          </div>

          {/* Column 3: Net Payout */}
          <div className="p-8 md:p-10 flex flex-col space-y-6 bg-[#00726D]/12">
            <span className="text-[10px] font-bold tracking-wider text-white/40 uppercase font-secondary">
              Net Payout
            </span>
            <span className="font-primary text-3xl md:text-4xl font-semibold text-[#328f97] tracking-wide">
              ₦86,500
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
