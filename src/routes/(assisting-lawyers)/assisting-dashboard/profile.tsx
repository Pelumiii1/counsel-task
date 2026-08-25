import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  RotateCcw,
  RotateCw,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/profile',
)({
  component: AssistingProfilePage,
})

function AssistingProfilePage() {
  // Notification alert toggle
  const [notificationAlerts, setNotificationAlerts] = useState(true)

  // Personal Details
  const [fullName, setFullName] = useState('Onasanya Habeeb')
  const [chambers, setChambers] = useState('Habeeb and Co.')
  const [email, setEmail] = useState('You@gmail.com')
  const [phoneNumber, setPhoneNumber] = useState('090 837 333 272')

  // Professional Profile
  const [practiceAreas, setPracticeAreas] = useState<string[]>([
    'Property Law',
    'Commercial Litigation',
    'Tenancy & Real Estate',
  ])
  const [courtsCovered, setCourtsCovered] = useState<string[]>([
    'Ikeja High Court',
    'Yaba Magistrate Court',
  ])
  const [weeklyAvailability, setWeeklyAvailability] = useState<string[]>([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
  ])
  const [yearsOfPractice, setYearsOfPractice] = useState('9')
  const [callToBarDate, setCallToBarDate] = useState('02/11/2026')
  const [bio, setBio] = useState(
    'Called to bar in 2018. Focused on property and land dispute matters across Lagos State courts. Based five minutes from Ikeja High Court, available for short-notice hearings most weekdays.',
  )

  // Passwords
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Toast
  const [showSavedToast, setShowSavedToast] = useState(false)

  const togglePracticeArea = (area: string) => {
    setPracticeAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area],
    )
  }

  const toggleCourt = (court: string) => {
    setCourtsCovered((prev) =>
      prev.includes(court) ? prev.filter((c) => c !== court) : [...prev, court],
    )
  }

  const toggleDay = (day: string) => {
    setWeeklyAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    )
  }

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSavedToast(true)
    setTimeout(() => setShowSavedToast(false), 3500)
  }

  const practiceAreaOptions = [
    'Property Law',
    'Commercial Litigation',
    'Criminal Law',
    'Family Law',
    'Tenancy & Real Estate',
    'Corporate & Contracts',
  ]

  const courtOptions = [
    'Ikeja High Court',
    'Lagos High Court',
    'Yaba Magistrate Court',
    'Federal High Court, Lagos',
  ]

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  return (
    <div className="flex flex-col w-full min-h-full pb-20 font-secondary">
      {/* Top Banner Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
          Welcome Oluwarotimi!!
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal">
          What action are you taking today
        </p>
      </section>

      {/* Main Form Section */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
        {/* Title & Subtitle */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-[28px] font-semibold text-gray-900 leading-tight font-primary">
            Edit your profile
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            This is your saved profile as engaging lawyers see it. Update anything and save your changes.
          </p>
        </div>

        {/* Main Card Container */}
        <form
          onSubmit={handleSaveChanges}
          className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-8"
        >
          {/* SECTION 1: Notification Alerts */}
          <div className="border border-gray-200/80 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-gray-900">
                Notification Alerts
              </span>
              <p className="text-xs text-gray-500 font-normal leading-relaxed">
                Receive email notifications whenever a new task is assigned to you. You can turn this option on or off at any time.
              </p>
            </div>

            {/* Toggle switch */}
            <button
              type="button"
              role="switch"
              aria-checked={notificationAlerts}
              onClick={() => setNotificationAlerts(!notificationAlerts)}
              className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer shrink-0 p-0.5 select-none ${notificationAlerts ? 'bg-[#00726D]' : 'bg-gray-200'
                }`}
            >
              <div
                className={`w-5.5 h-5.5 rounded-full bg-white transition-transform shadow-xs ${notificationAlerts ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>

          {/* SECTION 2: Personal Details */}
          <div className="flex flex-col gap-5">
            <h3 className="text-base font-bold text-gray-900">Personal Details</h3>

            {/* Row 1: Full Name & Law Firm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g Onasanya Habeeb"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-[#f9fafb]/50 text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">
                  Law Firm / Chambers (optional) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={chambers}
                  onChange={(e) => setChambers(e.target.value)}
                  placeholder="e.g Habeeb and Co."
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-[#f9fafb]/50 text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                />
              </div>
            </div>

            {/* Row 2: Email Address & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="You@gmail.com"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-[#f9fafb]/50 text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="090 837 333 272"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                />
                <button
                  type="button"
                  className="text-[11px] text-[#00726D] font-medium text-left hover:underline cursor-pointer w-fit mt-0.5 select-none"
                >
                  Add Phone Number
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 3: Professional Profile */}
          <div className="flex flex-col gap-6">
            <h3 className="text-base font-bold text-gray-900">
              Professional Profile
            </h3>

            {/* Practice Areas */}
            <div className="flex flex-col gap-3">
              <label className="text-xs sm:text-sm font-semibold text-gray-900">
                Practice Areas (select all that apply)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {practiceAreaOptions.map((area) => {
                  const isSelected = practiceAreas.includes(area)
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => togglePracticeArea(area)}
                      className={`h-9.5 px-4.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center justify-center select-none ${isSelected
                        ? 'bg-[#041626] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50/60'
                        }`}
                    >
                      {area}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Courts Covered */}
            <div className="flex flex-col gap-3">
              <label className="text-xs sm:text-sm font-semibold text-gray-900">
                Courts / Locations Covered
              </label>
              <div className="flex flex-wrap gap-2.5">
                {courtOptions.map((court) => {
                  const isSelected = courtsCovered.includes(court)
                  return (
                    <button
                      key={court}
                      type="button"
                      onClick={() => toggleCourt(court)}
                      className={`h-9.5 px-4.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center justify-center select-none ${isSelected
                        ? 'bg-[#041626] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50/60'
                        }`}
                    >
                      {court}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Weekly Availability */}
            <div className="flex flex-col gap-3">
              <label className="text-xs sm:text-sm font-semibold text-gray-900">
                Weekly Availability
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => {
                  const isSelected = weeklyAvailability.includes(day)
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`h-9 px-4 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-center select-none ${isSelected
                        ? 'bg-[#E8F5F3] border border-[#86D2CA] text-[#00726D] font-semibold'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50/60'
                        }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Years of Practice & Call to Bar Date (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">
                  Years of Practice <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={yearsOfPractice}
                  onChange={(e) => setYearsOfPractice(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                  placeholder="e.g. 9"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">
                  Call to Bar Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={callToBarDate}
                  onChange={(e) => setCallToBarDate(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>

            {/* Short Bio */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-900">
                Short Bio (visible on your profile){' '}
                <span className="text-red-500">*</span>
              </label>

              {/* Rich text container */}
              <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#00726D] focus-within:ring-2 focus-within:ring-[#00726D]/10 transition shadow-2xs">
                {/* Toolbar */}
                <div className="p-2.5 bg-white border-b border-gray-150 flex items-center gap-1 text-gray-600 select-none">
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <span className="w-[1px] h-4 bg-gray-200 mx-1" />
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  <span className="w-px h-4 bg-gray-200 mx-1" />
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                    title="Insert Link"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>
                  <span className="w-[1px] h-4 bg-gray-200 mx-1" />
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                    title="Undo"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                    title="Redo"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-4 text-xs sm:text-sm text-gray-700 font-normal leading-relaxed focus:outline-none resize-none bg-white"
                  placeholder="Write a brief professional summary..."
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Password */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-gray-900">Password</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full h-11 pl-4 pr-11 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
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

              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full h-11 pl-4 pr-11 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
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
          </div>

          {/* Save Changes Button */}
          <div className="pt-4 flex items-center justify-end">
            <button
              type="submit"
              className="h-11 px-8 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-[0.99] select-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>

      {/* Success Toast */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#041626] text-white px-5 py-3.5 rounded-xl shadow-xl border border-white/10 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4.5 h-4.5 text-[#00a896]" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Profile Updated!</span>
            <span className="text-[11px] text-gray-300">
              Your profile information has been successfully saved.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
