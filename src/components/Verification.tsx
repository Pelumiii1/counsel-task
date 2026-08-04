export function Verification() {
  const steps = [
    {
      number: '01',
      title: 'Call to Bar',
      description: 'Date and record of call confirmed against enrolment.',
    },
    {
      number: '02',
      title: 'Enrolment Details',
      description: 'Supreme Court enrolment number and standing.',
    },
    {
      number: '03',
      title: 'Practising Status',
      description: 'Current practising fee receipt for the year.',
    },
    {
      number: '04',
      title: 'Identification',
      description: 'Government ID and supporting credentials.',
    },
  ]

  return (
    <section className="relative w-full bg-[#041626] text-white py-20 md:py-28 overflow-hidden">
      {/* Decorative Blur Ellipse at Bottom Right */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '910px',
          height: '738px',
          bottom: '-350px',
          right: '-300px',
          backgroundColor: '#10383E',
          filter: 'blur(120px)',
          opacity: 0.85,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        {/* Header Content */}
        <div className="max-w-3xl flex flex-col space-y-6 mb-16">
          {/* Kicker Badge */}
          <div className="flex items-center space-x-3">
            <span className="h-[1.5px] w-8 bg-[#CF6A52]" />
            <span className="text-[12px] font-roboto font-light tracking-[0.25em] text-[#CF6A52] uppercase">
              Verification First
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-primary text-3xl sm:text-4xl md:text-[44px] font-medium leading-[1.2] tracking-tight">
            No unverified account can post, apply, or open a document.
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-white/70 font-secondary font-light max-w-xl">
            Every lawyer completes professional verification before touching the
            marketplace.
          </p>
        </div>

        {/* 4-Column Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 border border-white/10 rounded-lg overflow-hidden bg-[#042942]">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`p-8 md:p-10 flex flex-col space-y-6 ${
                idx < 3
                  ? 'border-b md:border-b-0 md:border-r border-[#AAAAAA4D]'
                  : ''
              }`}
            >
              {/* Number */}
              <span className="text-sm font-semibold tracking-wider text-white/40 font-secondary">
                {step.number}
              </span>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="font-primary text-lg font-medium text-white tracking-wide">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-secondary font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
