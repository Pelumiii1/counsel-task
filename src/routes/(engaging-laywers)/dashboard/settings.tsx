import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/(engaging-laywers)/dashboard/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const [fullName, setFullName] = useState('Onasanya Habeeb')
  const [lawFirm, setLawFirm] = useState('Habeeb and Co.')
  const [email, setEmail] = useState('You@gmail.com')
  const [phone, setPhone] = useState('090 837 333 272')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    // Perform mock save
    toast.success('Profile changes saved successfully!')
    setPassword('')
    setConfirmPassword('')
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
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g Onasanya Habeeb"
              className="w-full h-11 px-4 rounded-lg bg-[#F4F4F4] border border-transparent text-xs sm:text-sm font-normal text-gray-800 placeholder-[#F4F4F4] focus:bg-white focus:border-gray-200 focus:outline-none"
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
              onChange={(e) => setLawFirm(e.target.value)}
              placeholder="e.g Habeeb and Co."
              className="w-full h-11 px-4 rounded-lg bg-[#F4F4F4] border border-transparent text-xs sm:text-sm font-normal text-gray-800 placeholder-[#F4F4F4] focus:bg-white focus:border-gray-200 focus:outline-none"
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
              onChange={(e) => setEmail(e.target.value)}
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full h-11 px-4 rounded-lg bg-white border border-gray-205 text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col items-start gap-2.5">
            <label className="text-xs sm:text-[13px] font-bold text-gray-800 font-secondary select-none">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full h-11 px-4 rounded-lg bg-white border border-gray-205 text-xs sm:text-sm font-normal text-gray-800 placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end select-none mt-4">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#00726d] hover:bg-[#005c58] text-white px-8 font-secondary text-sm font-semibold transition active:scale-[0.98] cursor-pointer shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
