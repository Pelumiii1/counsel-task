import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ChevronRight, Eye, EyeOff } from 'lucide-react'
import logoNew from '../../../../assets/logo-new.png'
import Seal from '../../../../assets/engaging-lawyers/counseltask-verification-seal 3.png'
import {
  inputClass,
  labelClass,
  requiredMark,
} from '#/components/engaging-lawyers/constants'

export const Route = createFileRoute('/(engaging-laywers)/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please complete all required fields.')
      return
    }

    navigate({ to: '/dashboard' })
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] text-[#242424] grid grid-cols-1 lg:grid-cols-2">
      {/* Left side: Premium Verification Seal Panel */}
      <section className="relative hidden lg:flex h-screen items-center justify-center bg-linear-to-b from-[#011422] to-[#042137] overflow-hidden">
        <img src={Seal} alt="Engaging Lawyer seal" />
      </section>

      {/* Right side: Onboarding Form Panel */}
      <section className="flex min-h-screen w-full flex-col bg-white px-6 py-10 sm:px-16 lg:px-20 xl:px-28 justify-between">
        {/* Top Logo Container */}
        <div className="flex justify-end w-full mb-12 lg:mb-0">
          <img
            src={logoNew}
            alt="CounselTask"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-160 mx-auto my-auto rise-in">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
              {/* Step indicator */}
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#00726D]" />
                <p className="font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]">
                  WELCOME BACK
                </p>
              </div>

              {/* Title & Description */}
              <h1 className="mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]">
                Sign In
              </h1>

              <p className="mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]">
                We'll notify you by email once a decision is made. This usually
                takes 1—2 business days.
              </p>

              {/* Inputs Group */}
              <div className="mt-8 flex flex-col gap-5">
                <label className={labelClass}>
                  <span>Email Address {requiredMark}</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="You@gmail.com"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span>Password {requiredMark}</span>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Create a password"
                      className={`${inputClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none cursor-pointer"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
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

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer"
              >
                <span>Sign In</span>
                <ChevronRight className="h-4 w-4 stroke-2" aria-hidden />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
