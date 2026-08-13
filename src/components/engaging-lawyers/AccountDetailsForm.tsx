import React, { useState } from 'react'
import { ChevronRight, Eye, EyeOff } from 'lucide-react'
import { inputClass, labelClass, requiredMark } from './constants'

interface AccountDetailsFormProps {
  values: {
    fullName: string
    firm: string
    email: string
    phone: string
    password: string
    confirmPassword: string
  }
  onChange: (
    key:
      'fullName' | 'firm' | 'email' | 'phone' | 'password' | 'confirmPassword',
    val: string,
  ) => void
  onProceed: () => void
}

export function AccountDetailsForm({
  values,
  onChange,
  onProceed,
}: AccountDetailsFormProps) {
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { fullName, firm, email, phone, password, confirmPassword } = values

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (
      !fullName ||
      !firm ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setError('Please complete all required fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords must match.')
      return
    }

    onProceed()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 bg-[#00726D]" />
          <p className="font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]">
            STEP 1/2
          </p>
        </div>

        {/* Title & Description */}
        <h1 className="mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]">
          Account Details
        </h1>

        <p className="mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]">
          Start with your basic details. You'll submit your professional
          credentials for verification next.
        </p>

        {/* Inputs Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <label className={labelClass}>
            <span>Full Name {requiredMark}</span>
            <input
              type="text"
              value={fullName}
              onChange={(event) => onChange('fullName', event.target.value)}
              placeholder="e.g Onasanya Habeeb"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            <span>Law Firm / Chambers {requiredMark}</span>
            <input
              type="text"
              value={firm}
              onChange={(event) => onChange('firm', event.target.value)}
              placeholder="e.g Habeeb and Co."
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            <span>Email Address {requiredMark}</span>
            <input
              type="email"
              value={email}
              onChange={(event) => onChange('email', event.target.value)}
              placeholder="You@gmail.com"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            <span>Phone Number {requiredMark}</span>
            <input
              type="text"
              value={phone}
              onChange={(event) => onChange('phone', event.target.value)}
              placeholder="090 837 333 272"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            <span>Password {requiredMark}</span>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => onChange('password', event.target.value)}
                placeholder="Create a password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </label>

          <label className={labelClass}>
            <span>Confirm Password {requiredMark}</span>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(event) =>
                  onChange('confirmPassword', event.target.value)
                }
                placeholder="Re-enter your password"
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none cursor-pointer"
                aria-label={
                  showConfirmPassword ? 'Hide password' : 'Show password'
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </label>
        </div>

        {error ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>

      {/* Continue Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer"
        >
          <span>Continue</span>
          <ChevronRight className="h-4 w-4 stroke-2" aria-hidden />
        </button>
      </div>
    </form>
  )
}
