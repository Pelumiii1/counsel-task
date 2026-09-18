import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { RichTextEditor } from '#/components/ui/RichTextEditor'
import { useBanks, useResolveAccount } from '#/hooks/useBanks'
import { useAssistingProfile, useUpdateAssistingProfile } from '#/hooks/useProfile'
import { BankSelectCombobox } from '#/components/BankSelectCombobox'

function formatToDateInput(dateStr?: string) {
  if (!dateStr) return ''
  const trimmed = dateStr.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed
  }
  const parts = trimmed.split(/[/.-]/)
  if (parts.length === 3) {
    if (parts[2].length === 4) {
      // DD/MM/YYYY
      const day = parts[0].padStart(2, '0')
      const month = parts[1].padStart(2, '0')
      const year = parts[2]
      return `${year}-${month}-${day}`
    } else if (parts[0].length === 4) {
      // YYYY/MM/DD
      const year = parts[0]
      const month = parts[1].padStart(2, '0')
      const day = parts[2].padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  }
  const d = new Date(trimmed)
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0]
  }
  return ''
}

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/profile',
)({
  component: AssistingProfilePage,
})

function AssistingProfilePage() {
  // Notification alert toggle
  const [notificationAlerts, setNotificationAlerts] = useState(false)

  // Personal Details
  const [fullName, setFullName] = useState('')
  const [chambers, setChambers] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  // Professional Profile - clean empty defaults (no dummy/auto-selected data)
  const [practiceAreas, setPracticeAreas] = useState<string[]>([])
  const [courtsCovered, setCourtsCovered] = useState<string[]>([])
  const [weeklyAvailability, setWeeklyAvailability] = useState<string[]>([])
  const [yearsOfPractice, setYearsOfPractice] = useState('')
  const [callToBarDate, setCallToBarDate] = useState('')
  const [bio, setBio] = useState('')

  // Paystack Bank Hooks
  const { data: banks = [], isLoading: isBanksLoading } = useBanks()
  const resolveAccountMutation = useResolveAccount()

  // Settlement & Payout Details
  const [bankName, setBankName] = useState('')
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [isAccountVerified, setIsAccountVerified] = useState(false)
  const [verificationError, setVerificationError] = useState('')

  // Profile data & mutations
  const { data: profile } = useAssistingProfile()
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateAssistingProfile()
  const firstName = profile?.fullName?.split(' ')[0] || 'Counsel'

  // Populate from saved user profile when available
  useEffect(() => {
    if (profile) {
      if (profile.fullName) setFullName(profile.fullName)
      if (profile.firm) setChambers(profile.firm)
      if (profile.email) setEmail(profile.email)
      if (profile.phone) setPhoneNumber(profile.phone)
      if (profile.bio) setBio(profile.bio)
      if (profile.callToBarDate) {
        const formatted = formatToDateInput(profile.callToBarDate)
        setCallToBarDate(formatted)
      }
      if (profile.yearsOfPractice) {
        setYearsOfPractice(profile.yearsOfPractice)
      } else if (profile.callToBarDate) {
        const formatted = formatToDateInput(profile.callToBarDate)
        if (formatted) {
          const callYear = new Date(formatted).getFullYear()
          if (!isNaN(callYear)) {
            const calculated = Math.max(0, new Date().getFullYear() - callYear)
            setYearsOfPractice(String(calculated))
          }
        }
      }
      if (profile.bankName) setBankName(profile.bankName)
      if (profile.accountNumber) setAccountNumber(profile.accountNumber)
      if (profile.accountName) {
        setAccountName(profile.accountName)
        setIsAccountVerified(true)
      }
      if (profile.practiceAreas && Array.isArray(profile.practiceAreas) && profile.practiceAreas.length > 0) {
        setPracticeAreas(profile.practiceAreas)
      }
    }
  }, [profile])

  // Sync bank code when bankName changes
  useEffect(() => {
    if (bankName && banks.length > 0) {
      const match = banks.find(
        (b) => b.name.toLowerCase() === bankName.toLowerCase(),
      )
      if (match) {
        setBankCode(match.code)
      }
    }
  }, [bankName, banks])

  // Auto-verify with Paystack when 10-digit account number and bank code exist
  useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      setVerificationError('')
      resolveAccountMutation.mutate(
        { accountNumber, bankCode },
        {
          onSuccess: (res) => {
            if (res.data?.account_name) {
              setAccountName(res.data.account_name)
              setIsAccountVerified(true)
              setVerificationError('')
            }
          },
          onError: (err: any) => {
            setIsAccountVerified(false)
            setVerificationError(
              err.response?.data?.message || 'Could not verify account with Paystack.',
            )
          },
        },
      )
    } else {
      if (accountNumber.length < 10) {
        setIsAccountVerified(false)
        setVerificationError('')
      }
    }
  }, [accountNumber, bankCode])

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
    updateProfile(
      {
        fullName,
        firm: chambers,
        phone: phoneNumber,
        bio,
        callToBarDate,
        yearsOfPractice,
        practiceAreas,
        bankName,
        accountNumber,
        accountName,
        newPassword: newPassword || undefined,
      },
      {
        onSuccess: () => {
          setShowSavedToast(true)
          setTimeout(() => setShowSavedToast(false), 3500)
        },
      },
    )
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
          Welcome {firstName}!
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
                <label className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center justify-between">
                  <span>
                    Call to Bar Date <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  value={callToBarDate}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    const newDate = e.target.value
                    setCallToBarDate(newDate)
                    if (newDate) {
                      const callYear = new Date(newDate).getFullYear()
                      if (!isNaN(callYear)) {
                        const calculated = Math.max(0, new Date().getFullYear() - callYear)
                        setYearsOfPractice(String(calculated))
                      }
                    }
                  }}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs cursor-pointer"
                />
              </div>
            </div>

            {/* Short Bio */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-semibold text-gray-900">
                Short Bio (visible on your profile){' '}
                <span className="text-red-500">*</span>
              </label>

              {/* Rich text editor */}
              <RichTextEditor
                value={bio}
                onChange={setBio}
                placeholder="Write a brief professional summary..."
                minHeight="120px"
              />
            </div>
          </div>

          {/* SECTION 4: Settlement & Payout Account */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-bold text-gray-900">
                Settlement &amp; Payout Account
              </h3>
              <p className="text-xs text-gray-500">
                Bank account where client escrow payments and brief earnings will be disbursed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Bank Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center justify-between w-full">
                  <span>Bank Name</span>
                  {isBanksLoading && (
                    <span className="text-[10px] text-gray-400 font-normal flex items-center gap-1">
                      <Loader2 className="w-2.5 h-2.5 animate-spin" /> Loading banks...
                    </span>
                  )}
                </label>
                <BankSelectCombobox
                  banks={banks}
                  value={bankName}
                  onChange={(name, code) => {
                    setBankName(name)
                    setBankCode(code)
                    setIsAccountVerified(false)
                  }}
                  placeholder="Search and select bank..."
                />
                <span className="text-[11px] text-gray-400 font-normal">
                  In Paystack test mode, choose <strong className="text-[#00726D]">Test Bank</strong> (000) with any 10-digit number.
                </span>
              </div>

              {/* Account Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center justify-between w-full">
                  <span>Account Number</span>
                  {resolveAccountMutation.isPending && (
                    <span className="text-[10px] text-[#00726D] font-medium flex items-center gap-1">
                      <Loader2 className="w-2.5 h-2.5 animate-spin" /> Verifying...
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value.replace(/\D/g, ''))
                  }}
                  placeholder="10-digit NUBAN"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                />
                {verificationError && (
                  <span className="text-[11px] text-rose-500 font-normal flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {verificationError}
                  </span>
                )}
              </div>

              {/* Account Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center justify-between w-full">
                  <span>Account Name</span>
                </label>
                <input
                  type="text"
                  disabled
                  readOnly
                  value={accountName}
                  placeholder="Auto-resolved from bank"
                  className={`w-full h-11 px-4 rounded-xl border text-sm font-normal transition shadow-2xs focus:outline-none cursor-not-allowed ${isAccountVerified
                    ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950 font-medium'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}
                />
                <span className="text-[11px] text-gray-400 font-normal">
                  Auto-resolved from your bank account via Paystack
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 5: Password */}
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
              disabled={isUpdating}
              className="h-11 px-8 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-[0.99] select-none flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
              {isUpdating ? 'Saving Changes...' : 'Save Changes'}
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
