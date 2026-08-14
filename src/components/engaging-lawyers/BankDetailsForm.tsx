import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BankDetailsFormProps {
  fullName: string
  onBack: () => void
  onProceed: () => void
}

export function BankDetailsForm({
  fullName,
  onBack,
  onProceed,
}: BankDetailsFormProps) {
  const [bank, setBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState(fullName || 'Habeeb Onasanya')

  // Update account name if fullName prop changes
  useEffect(() => {
    if (fullName) {
      setAccountName(fullName)
    }
  }, [fullName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bank || !accountNumber) return
    onProceed()
  }

  const bankOptions = [
    'Access Bank',
    'Guaranty Trust Bank (GTBank)',
    'Zenith Bank',
    'United Bank for Africa (UBA)',
    'First Bank of Nigeria',
    'Sterling Bank',
    'Stanbic IBTC Bank',
    'Wema Bank',
  ]

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 text-left w-full max-w-xl"
    >
      <div>
        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 bg-[#00726D]" />
          <p className="font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]">
            STEP 3/3
          </p>
        </div>

        {/* Title block */}
        <h1 className="mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f] select-none">
          Submit your Account Details
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal mt-2 select-none">
          Enter your account details to complete your profile setup.
        </p>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-5 mt-4">
        {/* Bank Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-xs sm:text-sm font-bold text-gray-800 font-secondary select-none">
            Bank <span className="text-red-505">*</span>
          </label>
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-normal text-gray-800 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none cursor-pointer"
            required
          >
            <option value="">Select bank</option>
            {bankOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Account Number */}
        <div className="flex flex-col gap-2">
          <label className="text-xs sm:text-sm font-bold text-gray-800 font-secondary select-none">
            Account Number <span className="text-red-505">*</span>
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(
                e.target.value.replace(/[^0-9]/g, '').slice(0, 10),
              )
            }
            placeholder="Enter account number"
            className="w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-normal text-gray-800 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
            required
          />
        </div>

        {/* Account Name */}
        <div className="flex flex-col gap-2">
          <label className="text-xs sm:text-sm font-bold text-gray-800 font-secondary select-none">
            Account Name <span className="text-red-505">*</span>
          </label>
          <input
            type="text"
            value={accountName}
            readOnly
            disabled
            placeholder="Habeeb Onasanya"
            className="w-full h-11 px-4 rounded-lg bg-gray-50 text-xs sm:text-sm font-normal text-gray-500 cursor-not-allowed border border-transparent select-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 mt-8 select-none">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 font-secondary text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          type="submit"
          disabled={!bank || accountNumber.length < 10}
          className={`inline-flex h-11 items-center gap-2 rounded-lg px-6 font-secondary text-xs sm:text-sm font-semibold text-white transition active:scale-[0.98] cursor-pointer ${
            bank && accountNumber.length === 10
              ? 'bg-[#00726d] hover:bg-[#005c58]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <span>Continue</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}
