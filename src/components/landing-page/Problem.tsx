export function Problem() {
  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left Column (60% width on desktop) */}
          <div className="md:col-span-7 flex flex-col space-y-6">
            {/* Kicker Badge */}
            <div className="flex items-center space-x-3">
              <span className="h-[1.5px] w-8 bg-[#00726D]" />
              <span className="text-[14px] font-roboto font-light tracking-[0.25em] text-[#00726D] uppercase">
                The Problem
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-primary text-3xl sm:text-4xl md:text-[40px] font-medium text-[#041626] leading-[1.2] tracking-tight">
              Finding a trusted colleague on short notice shouldn't mean calling
              around.
            </h2>

            {/* Description Paragraphs */}
            <div className="text-sm sm:text-base text-[#242424] leading-relaxed font-secondary font-normal">
              <p>
                A hearing in a court you can't reach. A filing due while you're
                in another matter. A client who needs urgent support and no one
                you know is free.
              </p>
              <p>
                Most lawyers solve this informally — a phone call, a WhatsApp
                message, an unspoken favour. Documents and payment are handled
                outside any secure system, with no verification of who's
                actually on the other end.
              </p>
              <p>
                CounselTask brings this onto one platform, built exclusively for
                verified Nigerian legal practitioners.
              </p>
            </div>
          </div>

          {/* Right Column (40% width on desktop) */}
          <div className="md:col-span-5 w-full">
            {/* Quote Card */}
            <div className="rounded border border-gray-200/60 bg-white p-8 shadow-sm flex flex-col space-y-5">
              {/* Quote mark (Double quotes) */}
              <span className="font-serif text-[#041626] text-5xl font-bold leading-none select-none h-4">
                “
              </span>

              {/* Quote Text */}
              <p className="text-[#242424] italic text-sm sm:text-base leading-relaxed font-secondary font-normal">
                I needed someone to hold brief in Ikeja by 9am and had no way to
                confirm the lawyer I found online was even called to bar.
              </p>

              {/* Author / Subtitle */}
              <div className="flex items-center space-x-3 pt-2">
                <span className="h-[1.5px] w-6 bg-[#00726D]" />
                <span className="text-[12px] font-roboto font-light tracking-[0.18em] text-[#00726D] uppercase">
                  A familiar story, every practice
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
