export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Register',
      desc: 'Create an account as an engaging or assisting lawyer.',
    },
    {
      number: 2,
      title: 'Verify',
      desc: 'Submit credentials for admin review.',
    },
    {
      number: 3,
      title: 'Post / Apply',
      desc: 'Post a task or apply to an open one',
    },
    {
      number: 4,
      title: 'Complete',
      desc: 'Carry out the task, tracked on-platform.',
    },
    {
      number: 5,
      title: 'Confirm',
      desc: 'Engaging lawyer confirms completion.',
    },
    {
      number: 6,
      title: 'Get Paid',
      desc: 'Escrow releases to the assisting lawyer.',
      highlighted: true,
    },
  ]

  return (
    <section
      id="how-it-works"
      className="w-full bg-[#F4F0E8] py-20 md:py-28 border-t border-gray-200/40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col space-y-5 mb-16">
          {/* Kicker Badge */}
          <div className="flex items-center space-x-3">
            <span className="h-[1.5px] w-8 bg-[#00726D]" />
            <span className="text-[12px] font-roboto font-light tracking-[0.25em] text-[#00726D] uppercase">
              How It Works
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-primary text-3xl sm:text-4xl md:text-[40px] font-medium leading-[1.2] text-[#041626] tracking-tight">
            Six steps, start to finish.
          </h2>
        </div>

        {/* Stepper Timeline */}
        <div className="relative w-full">
          {/* Horizontal Connection Line (Desktop only) */}
          <div className="absolute top-5 left-6 right-6 hidden h-px bg-gray-300/60 md:block" />

          {/* Vertical Connection Line (Mobile only) */}
          <div className="absolute left-5 top-6 bottom-6 w-px bg-gray-300/60 md:hidden" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-6 md:gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-row md:flex-col items-start md:items-stretch space-x-6 md:space-x-0 md:space-y-6"
              >
                {/* Stepper Circle */}
                <div className="shrink-0 relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold select-none transition-transform duration-300 hover:scale-105">
                  {step.highlighted ? (
                    <div className="absolute inset-0 rounded-full bg-[#00726D]" />
                  ) : (
                    <div className="absolute inset-0 rounded-full bg-white border border-gray-300/70" />
                  )}
                  <span
                    className={`relative z-10 ${
                      step.highlighted ? 'text-white' : 'text-[#00726D]'
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step Content */}
                <div className="space-y-2 md:pt-1">
                  <h3 className="font-semibold text-sm text-[#041626] tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#242424]/80 leading-relaxed font-secondary font-light max-w-xs md:max-w-none">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
