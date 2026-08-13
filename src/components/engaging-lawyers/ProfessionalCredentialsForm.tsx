import React, { useState, useRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { inputClass, labelClass, requiredMark } from './constants'

interface FileUploadInputProps {
  label: string
  file: File | null
  onChange: (file: File | null) => void
  placeholder?: string
  required?: boolean
}

function FileUploadInput({
  label,
  file,
  onChange,
  placeholder = 'No file chosen',
  required = false,
}: FileUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col gap-2 font-secondary text-sm font-semibold text-[#080a0f] w-full">
      <span>
        {label} {required && requiredMark}
      </span>
      <div className="flex items-center justify-between h-12.5 w-full rounded-lg border border-[#dedfe3] bg-white px-4">
        <span
          className={`text-sm ${
            file ? 'text-[#242424]' : 'text-[#9ca3af]'
          } truncate pr-4 font-normal`}
        >
          {file ? file.name : placeholder}
        </span>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dedfe3] bg-[#f9fafb] px-3 text-xs font-medium text-[#4b5563] transition hover:bg-gray-50 active:scale-[0.98] cursor-pointer shrink-0"
        >
          <svg
            className="w-3.5 h-3.5 text-[#6b7280]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload Document
        </button>
      </div>
    </div>
  )
}

interface ProfessionalCredentialsFormProps {
  values: {
    callToBarDate: string
    enrolmentNumber: string
  }
  onChange: (key: 'callToBarDate' | 'enrolmentNumber', val: string) => void
  practisingFeeReceipt: File | null
  setPractisingFeeReceipt: (file: File | null) => void
  governmentId: File | null
  setGovernmentId: (file: File | null) => void
  supportingCredentials: File | null
  setSupportingCredentials: (file: File | null) => void
  onBack: () => void
  onProceed: () => void
}

export function ProfessionalCredentialsForm({
  values,
  onChange,
  practisingFeeReceipt,
  setPractisingFeeReceipt,
  governmentId,
  setGovernmentId,
  supportingCredentials,
  setSupportingCredentials,
  onBack,
  onProceed,
}: ProfessionalCredentialsFormProps) {
  const [error, setError] = useState('')

  const { callToBarDate, enrolmentNumber } = values

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (
      !callToBarDate ||
      !enrolmentNumber ||
      !practisingFeeReceipt ||
      !governmentId
    ) {
      setError('Please complete all required fields.')
      return
    }

    onProceed()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-8 bg-[#00726D]" />
          <p className="font-secondary text-[12px] font-bold uppercase tracking-[0.2em] text-[#00726D]">
            STEP 2/2
          </p>
        </div>

        {/* Title & Description */}
        <h1 className="mt-5 font-primary text-3xl sm:text-[36px] font-medium leading-tight text-[#080a0f]">
          Submit your credentials
        </h1>

        <p className="mt-4 font-secondary text-[15px] font-normal leading-[1.6] text-[#6b7280]">
          Verification confirms you're a practising Nigerian lawyer before you
          can post a task or message another member.
        </p>

        {/* Info Alert Box */}
        <div className="mt-6 flex gap-3 rounded-lg border border-[#D0ECE8] bg-[#F0FAF9] px-4 py-3.5 text-xs sm:text-sm text-[#00726D] items-start">
          <svg
            className="w-5 h-5 text-[#00726D] shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <p className="font-secondary leading-normal">
            Verification confirms you're a practising Nigerian lawyer. This is
            required before you can post a task or message another member.
          </p>
        </div>

        {/* Form Inputs Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <label className={labelClass}>
            <span>Call to Bar Date {requiredMark}</span>
            <input
              type="text"
              value={callToBarDate}
              onChange={(event) =>
                onChange('callToBarDate', event.target.value)
              }
              placeholder="dd/mm/yyyy"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            <span>Supreme Court Enrolment Number {requiredMark}</span>
            <input
              type="text"
              value={enrolmentNumber}
              onChange={(event) =>
                onChange('enrolmentNumber', event.target.value)
              }
              placeholder="e.g SCN/2014/8999"
              className={inputClass}
            />
          </label>
        </div>

        {/* Custom File Uploads list */}
        <div className="mt-5 flex flex-col gap-5">
          <FileUploadInput
            label="Current Practising Fee Receipt (this year)"
            file={practisingFeeReceipt}
            onChange={setPractisingFeeReceipt}
            required
          />

          <FileUploadInput
            label="Government-Issued Identification"
            file={governmentId}
            onChange={setGovernmentId}
            required
          />

          <FileUploadInput
            label="Supporting Credentials (optional)"
            file={supportingCredentials}
            onChange={setSupportingCredentials}
          />
        </div>

        {error ? (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 font-secondary text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
        >
          <ChevronRight className="h-4 w-4 stroke-2 rotate-180" aria-hidden />
          <span>Previous</span>
        </button>
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
