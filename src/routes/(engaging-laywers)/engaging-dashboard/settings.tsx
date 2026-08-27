import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Eye, EyeOff } from 'lucide-react'
import { useEngagingProfile, useUpdateEngagingProfile } from '#/hooks/useProfile'

export const Route = createFileRoute('/(engaging-laywers)/engaging-dashboard/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const { data: profile } = useEngagingProfile()
  const { mutate: updateProfile, isPending } = useUpdateEngagingProfile()

  const [fullName, setFullName] = useState('')
  const [lawFirm, setLawFirm] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || '')
      setLawFirm(profile.firm || '')
      setEmail(profile.email || '')
      setPhone(profile.phone || '')
    }
  }, [profile])

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    if (password && password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    updateProfile(
      {
        fullName,
        firm: lawFirm,
        phone,
        newPassword: password ? password : undefined,
      },
      {
        onSuccess: () => {
          setPassword('')
          setConfirmPassword('')
        },
      },
    )
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-10 sm:px-12 gap-6 text-left">
      {/* Header */}
      <div className="flex items-center justify-between w-full select-none mb-2">
        <h1 className="text-2xl sm:text-[28px] font-bold text-black font-primary">
          Your profile
        </h1>
      </div>

      {/* Main card */}
      <form
        onSubmit={handleSaveChanges}
        className="w-full mx-auto max-w-5xl bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col items-start gap-2.5">
            <label className="text-xs sm:text-[13px] font-bold text-gray-800 font-secondary select-none">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              disabled
              placeholder="e.g Onasanya Habeeb"
              className="w-full h-11 px-4 rounded-lg bg-[#F4F4F4] border border-transparent text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:bg-white focus:border-gray-200 focus:outline-none"
              required
            />
          </div>

          {/* Law Firm */}
          <div className="flex flex-col items-start gap-2.5">
            <label className="text-xs sm:text-[13px] font-bold text-gray-800 font-secondary select-none">
              Law Firm / Chambers (optional){' '}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lawFirm}
              disabled
              placeholder="e.g Habeeb and Co."
              className="w-full h-11 px-4 rounded-lg bg-[#F4F4F4] border border-transparent text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:bg-white focus:border-gray-200 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col items-start gap-2.5">
            <label className="text-xs sm:text-[13px] font-bold text-gray-800 font-secondary select-none">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              disabled
              placeholder="You@gmail.com"
              className="w-full h-11 px-4 rounded-lg bg-gray-50 border border-transparent text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:bg-white focus:border-gray-200 focus:outline-none"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col items-start gap-2.5">
            <label className="text-xs sm:text-[13px] font-bold text-gray-800 font-secondary select-none">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="w-full flex flex-col gap-2">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="090 837 333 272"
                className="w-full h-11 px-4 rounded-lg bg-white border border-gray-205 text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
                required
              />
              <button
                type="button"
                className="self-start text-[11px] sm:text-xs font-semibold text-[#00726d] underline cursor-pointer select-none italic"
              >
                Add Phone Number
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col items-start gap-2.5">
            <label className="text-xs sm:text-[13px] font-bold text-gray-800 font-secondary select-none">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full h-11 pl-4 pr-11 rounded-lg bg-white border border-gray-205 text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col items-start gap-2.5">
            <label className="text-xs sm:text-[13px] font-bold text-gray-800 font-secondary select-none">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full h-11 pl-4 pr-11 rounded-lg bg-white border border-gray-205 text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end select-none mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#00726d] hover:bg-[#005c58] text-white px-8 font-secondary text-sm font-semibold transition active:scale-[0.98] cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
