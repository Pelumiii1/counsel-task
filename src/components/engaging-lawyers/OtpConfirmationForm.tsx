import React, { useState, useRef } from 'react'
import { ChevronRight } from 'lucide-react'

interface OtpConfirmationFormProps {
  otp: string[]
  isLoading?: boolean
  serverOtp?: string
  setOtp: (val: string[]) => void
  onVerify: () => void
  onResend?: () => void
}

export function OtpConfirmationForm({
  otp,
  isLoading = false,
  serverOtp,
  setOtp,
  onVerify,
  onResend,
}: OtpConfirmationFormProps) {
  const [error, setError] = useState('')
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (value: string, index: number) => {
    const cleanVal = value.replace(/[^0-9]/g, '').slice(-1)
    const newOtp = [...otp]
    newOtp[index] = cleanVal
    setOtp(newOtp)

    if (cleanVal !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        otpRefs.current[index - 1]?.focus()
      } else {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    }
  }

  const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pastedData = event.clipboardData
      .getData('text')
      .replace(/[^0-9]/g, '')
      .slice(0, 6)
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('')
      setOtp(newOtp)
      otpRefs.current[5]?.focus()
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    const code = otp.join('')
    if (code.length < 6) {
      setError('Please enter a valid 6-digit confirmation code.')
      return
    }
    onVerify()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-[#00726D]" />
          <p className="font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]">
            STEP 1/3
          </p>
        </div>

        {/* Title & Description */}
        <h1 className="mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]">
          OTP Confirmation
        </h1>

        <p className="mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]">
          Use the verification code below to complete your verification.
        </p>

        {/* OTP Inputs Group */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* First 3 Inputs */}
            <div className="flex gap-2 sm:gap-2.5">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={otp[i]}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  onPaste={i === 0 ? handleOtpPaste : undefined}
                  className="h-[58px] w-[46px] sm:h-[66px] sm:w-[52px] rounded-lg border border-[#dedfe3] bg-white text-center font-secondary text-lg sm:text-xl font-medium text-[#242424] outline-none transition focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10"
                />
              ))}
            </div>

            {/* Dot Separator */}
            <span className="text-xl font-bold text-[#080a0f] mx-1 sm:mx-2">
              •
            </span>

            {/* Second 3 Inputs */}
            <div className="flex gap-2 sm:gap-2.5">
              {[3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    otpRefs.current[i] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={otp[i]}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                  className="h-[58px] w-[46px] sm:h-[66px] sm:w-[52px] rounded-lg border border-[#dedfe3] bg-white text-center font-secondary text-lg sm:text-xl font-medium text-[#242424] outline-none transition focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10"
                />
              ))}
            </div>
          </div>

          {/* Caption */}
          <div className="mt-3 flex flex-col items-center gap-2">
            <p className="font-secondary text-[13px] text-[#6b7280] text-center">
              Enter your 6-digit one-time password.
            </p>
            {serverOtp && (
              <button
                type="button"
                onClick={() => {
                  setOtp(serverOtp.split(''))
                  otpRefs.current[5]?.focus()
                }}
                className="px-3 py-1 rounded-full bg-[#E8F5F3] text-[#00726D] text-xs font-semibold hover:bg-[#d5eee9] transition cursor-pointer select-none"
              >
                Auto-fill Code ({serverOtp})
              </button>
            )}
            {onResend && (
              <button
                type="button"
                onClick={onResend}
                className="text-xs text-[#00726D] font-medium hover:underline cursor-pointer select-none mt-1"
              >
                Didn't receive code? Resend OTP
              </button>
            )}
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>

      {/* Verify Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>{isLoading ? 'Verifying OTP...' : 'Verify and Continue'}</span>
          <ChevronRight className="h-4 w-4 stroke-[2]" aria-hidden />
        </button>
      </div>
    </form>
  )
}
