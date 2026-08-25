import { Link } from '@tanstack/react-router'
import { useRegistrationStore } from '../../store/useRegistrationStore'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export function AccountStatus() {
  const { fullName, email, firm, bank, accountNumber, resetRegistration } =
    useRegistrationStore()

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
          <div className="w-16 h-16 rounded-full bg-[#E6F1F0] flex items-center justify-center mb-6 text-2xl select-none">
            ⌛
          </div>

          {/* Card Title */}
          <h2 className="font-secondary text-lg sm:text-xl font-medium text-black text-center">
            Your Documents are under review
          </h2>

          {/* Card Description */}
          <p className="mt-3 font-secondary text-[12px] leading-[1.6] text-gray-700 text-center max-w-110">
            An administrator is checking your Call to Bar record, enrolment
            number, and submitted documents for <strong>{fullName || 'your account'}</strong>. You'll be able to post and accept tasks as
            soon as you're approved.
          </p>

          {/* User Details Summary Chip */}
          {email && (
            <div className="mt-5 bg-gray-50 border border-gray-150 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-600">
              <span>Counsel: <strong className="text-gray-900">{fullName}</strong></span>
              {firm && <span>• Firm: <strong className="text-gray-900">{firm}</strong></span>}
              <span>• Email: <strong className="text-gray-900">{email}</strong></span>
              {bank && <span>• Bank: <strong className="text-gray-900">{bank}</strong></span>}
            </div>
          )}

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

          {/* Action Links */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 select-none">
            <Link
              to="/auth/login"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold px-6 shadow-xs transition active:scale-[0.98] cursor-pointer"
            >
              <span>Go to Login</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium px-5 transition active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Dashboard</span>
            </Link>

            <button
              type="button"
              onClick={resetRegistration}
              className="text-xs text-gray-400 hover:text-gray-700 px-3 py-2 transition cursor-pointer"
            >
              Start New Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
