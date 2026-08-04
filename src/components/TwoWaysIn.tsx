export function TwoWaysIn() {
  const engagingList = [
    'Post tasks with practice area, court location, deadline, and fee',
    'Review proposals and select the right colleague',
    'Share case documents in a secure, access-limited space',
    'Track progress through to completion',
  ]

  const assistingList = [
    'Browse tasks or receive alerts matching your practice area',
    'Submit proposals with your fee and availability',
    'Complete assigned work with evidence of completion',
    'Receive secure payment once confirmed',
  ]

  return (
    <section
      id="for-lawyers"
      className="w-full bg-white py-20 md:py-28 border-t border-gray-100"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header */}
        <div className="max-w-3xl flex flex-col space-y-5 mb-16">
          {/* Kicker Badge */}
          <div className="flex items-center space-x-3">
            <span className="h-[1.5px] w-8 bg-[#00726D]" />
            <span className="text-[12px] font-roboto font-light tracking-[0.25em] text-[#00726D] uppercase">
              Two Ways In
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-primary text-3xl sm:text-4xl md:text-[40px] font-medium leading-[1.2] text-[#041626] tracking-tight">
            Choose the path that fits your task.
          </h2>
        </div>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card: Engaging Lawyers */}
          <div className="rounded-lg border border-gray-200/60 bg-white p-8 md:p-10 shadow-sm flex flex-col space-y-6">
            <div>
              {/* Badge */}
              <span className="inline-block bg-[#E5F2F0] text-[#00726D] font-bold text-[10px] px-3 py-1.5 rounded uppercase tracking-wider font-secondary mb-6">
                For Engaging Lawyers
              </span>

              {/* Title & Desc */}
              <h3 className="font-primary text-2xl sm:text-3xl font-medium text-[#041626] tracking-wide mb-4">
                Post the task. Choose who helps.
              </h3>
              <p className="text-sm text-[#242424]/80 leading-relaxed font-secondary font-light">
                Need support with a case or a court date? Describe the task and
                review qualified colleagues.
              </p>
            </div>

            {/* Checklist */}
            <ul className="space-y-4 pt-4">
              {engagingList.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-sm text-[#242424] font-secondary font-light"
                >
                  <svg
                    className="h-5 w-5 shrink-0 text-[#CF6A52] pt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card: Assisting Lawyers */}
          <div className="rounded-lg bg-[#041626] p-8 md:p-10 shadow-md flex flex-col space-y-6 text-white">
            <div>
              {/* Badge */}
              <span className="inline-block bg-white/5 text-[#CF6A52] border border-[#CF6A52]/20 font-bold text-[10px] px-3 py-1.5 rounded uppercase tracking-wider font-secondary mb-6">
                For Assisting Lawyers
              </span>

              {/* Title & Desc */}
              <h3 className="font-primary text-2xl sm:text-3xl font-medium text-white tracking-wide mb-4">
                Find assignments. Get paid.
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-secondary font-light">
                Verified and ready to work? Find tasks that match your practice
                and availability.
              </p>
            </div>

            {/* Checklist */}
            <ul className="space-y-4 pt-4">
              {assistingList.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-sm text-white/90 font-secondary font-light"
                >
                  <svg
                    className="h-5 w-5 shrink-0 text-[#00726D] pt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
