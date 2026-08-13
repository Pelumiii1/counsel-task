export function AccountStatus() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 bg-[#00726D]" />
          <p className="font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]">
            VERIFICATION
          </p>
        </div>

        {/* Title & Description */}
        <h1 className="mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]">
          Your account status
        </h1>

        <p className="mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]">
          We'll notify you by email once a decision is made. This usually takes
          1—2 business days.
        </p>

        {/* Outer review status card */}
        <div className="mt-10 p-6 sm:p-10 border border-gray-100 bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] flex flex-col items-center">
          {/* Centered Circle Icon */}
          <div className="w-16 h-16 rounded-full bg-[#E6F1F0] flex items-center justify-center mb-6">
            ⌛
          </div>

          {/* Card Title */}
          <h2 className="font-secondary text-lg sm:text-xl font-medium text-black text-center">
            Your Documents are under review
          </h2>

          {/* Card Description */}
          <p className="mt-3 font-secondary text-[12px] leading-[1.6] text-black text-center max-w-110">
            An administrator is checking your Call to Bar record, enrolment
            number, and submitted documents. You'll be able to post a task as
            soon as you're approved.
          </p>

          {/* Horizontal Stepper Progress */}
          <div className="mt-12 w-full max-w-125 px-2 relative">
            <div className="absolute top-1.25 left-[12%] right-[12%] -z-10 flex justify-between gap-4">
              <div className="flex-1 border-t border-dashed border-[#00726D]" />
              <div className="flex-1 border-t border-dashed border-[#00726D]" />
              <div className="flex-1 border-t border-dashed border-gray-200" />
            </div>

            {/* Nodes Container */}
            <div className="flex justify-between items-start">
              {/* Step 1 */}
              <div className="flex flex-col items-center w-20 sm:w-24">
                <div className="size-3 rounded-full bg-[#00726D]" />
                <span className="mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight">
                  Account Created
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center w-20 sm:w-24">
                <div className="size-3 rounded-full bg-[#00726D]" />
                <span className="mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight">
                  Document Submitted
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center w-20 sm:w-24">
                <div className="size-3 rounded-full bg-[#CF6A52]" />
                <span className="mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight">
                  Under Review
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center w-20 sm:w-24">
                <div className="size-3 rounded-full border-2 border-gray-300 bg-white" />
                <span className="mt-3 font-secondary text-[10px] sm:text-[11px] font-normal text-black text-center leading-tight">
                  Approved
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
