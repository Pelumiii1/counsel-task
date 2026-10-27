import React, { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Upload,
  Info,
  Plus,
} from 'lucide-react'
import { RichTextEditor } from '#/components/ui/RichTextEditor'
import {
  inputClass,
  labelClass,
  requiredMark,
} from '#/components/engaging-lawyers/constants'
import { useCreateTask } from '#/hooks/useTasks'
import { useEngagingProfile } from '#/hooks/useProfile'
import { DEFAULT_PRACTICE_AREAS, COURT_CATEGORIES, DEFAULT_COURTS } from '#/lib/constants'
import { uploadFile } from '#/lib/fileUpload'
import { toast } from 'sonner'

export const Route = createFileRoute('/(engaging-laywers)/engaging-dashboard/post-job')({
  component: PostJobPage,
})

function PostJobPage() {
  const navigate = useNavigate()
  const { data: profile } = useEngagingProfile()
  const firstName = profile?.fullName?.trim().split(' ')[0] || 'Counsel'
  const createTaskMutation = useCreateTask()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [practiceArea, setPracticeArea] = useState('Litigation')
  const [customPracticeArea, setCustomPracticeArea] = useState('')
  const [isCustomArea, setIsCustomArea] = useState(false)
  const [courtLocation, setCourtLocation] = useState('')
  const [customCourtLocation, setCustomCourtLocation] = useState('')
  const [isCustomCourt, setIsCustomCourt] = useState(false)
  const [deadline, setDeadline] = useState('')
  const [proposedFee, setProposedFee] = useState('')
  const [confidentiality, setConfidentiality] = useState<
    'standard' | 'restricted'
  >('standard')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const finalPracticeArea = isCustomArea
      ? customPracticeArea.trim()
      : practiceArea.trim()

    const finalCourtLocation = isCustomCourt
      ? customCourtLocation.trim()
      : courtLocation.trim()

    if (
      !title ||
      !description ||
      !finalPracticeArea ||
      !finalCourtLocation ||
      !deadline ||
      !proposedFee
    ) {
      if (isCustomArea && !customPracticeArea.trim()) {
        setError('Please specify your custom practice area.')
      } else if (isCustomCourt && !customCourtLocation.trim()) {
        setError('Please specify your custom court location.')
      } else {
        setError('Please complete all required fields.')
      }
      return
    }

    if (isNaN(Date.parse(deadline))) {
      setError('Please provide a valid deadline date.')
      return
    }

    const feeAmount = parseFloat(proposedFee.replace(/[^0-9]/g, ''))
    if (
      (finalPracticeArea === 'Real Estate' ||
        finalPracticeArea === 'Property Law') &&
      feeAmount < 30000
    ) {
      setError('Proposed fee is below the minimum limit for Real Estate.')
      return
    }

    let finalAttachmentUrl: string | undefined = undefined

    const submitTask = (attachmentUrlToUse?: string) => {
      createTaskMutation.mutate(
        {
          title,
          description,
          practiceArea: finalPracticeArea,
          courtLocation: finalCourtLocation,
          deadline,
          proposedFee,
          confidentiality,
          attachmentUrl: attachmentUrlToUse,
        },
        {
          onSuccess: () => {
            setIsUploading(false)
            navigate({ to: '/engaging-dashboard' })
          },
          onError: (err: any) => {
            setIsUploading(false)
            setError(err?.message || 'Failed to create task')
          },
        },
      )
    }

    if (uploadedFile) {
      setIsUploading(true)
      const toastId = toast.loading(`Uploading ${uploadedFile.name} to secure storage...`)
      uploadFile(uploadedFile, 'tasks')
        .then((res) => {
          toast.dismiss(toastId)
          toast.success('Document uploaded successfully')
          submitTask(res.url)
        })
        .catch((err) => {
          toast.dismiss(toastId)
          setIsUploading(false)
          setError(err?.message || 'Failed to upload document. Please try again.')
        })
    } else {
      submitTask()
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary">
      {/* Welcome Banner Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight">
          Welcome {firstName}!
        </h1>
        <p className="font-secondary text-[13px] text-gray-500 font-normal">
          What action are you taking today
        </p>
      </section>

      {/* Main post form block */}
      <section className="flex-1 w-full px-6 py-10 sm:px-12">
        <div className="flex flex-col gap-1.5 select-none">
          <h2 className="font-primary text-2xl font-semibold text-black">
            Post a task
          </h2>
          <p className="text-sm text-gray-500 font-normal leading-relaxed">
            Describe what you need. Verified lawyers matching your practice area
            will be able to submit proposals.
          </p>
        </div>

        {/* Large White Form Card */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white border border-gray-150 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 sm:p-8 flex flex-col gap-6"
        >
          {/* Task Title */}
          <label className={labelClass}>
            <span>Task Title {requiredMark}</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g Hold brief - Land Dispute"
              className={inputClass}
            />
          </label>

          {/* Service Description with Custom Editor mock */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-[#080a0f]">
              Service Description {requiredMark}
            </span>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Enter a description..."
              minHeight="128px"
            />
          </div>

          {/* Row 1: Practice Area + Court Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                <span>Practice Area {requiredMark}</span>
                <select
                  value={isCustomArea ? '__CUSTOM__' : practiceArea}
                  onChange={(e) => {
                    if (e.target.value === '__CUSTOM__') {
                      setIsCustomArea(true)
                    } else {
                      setIsCustomArea(false)
                      setPracticeArea(e.target.value)
                    }
                  }}
                  className={inputClass}
                >
                  {DEFAULT_PRACTICE_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                  <option value="__CUSTOM__">Other (Custom Practice Area)...</option>
                </select>
              </label>

              {/* Quick Select Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[11px] text-gray-400 mr-0.5">Quick pick:</span>
                {DEFAULT_PRACTICE_AREAS.map((area) => {
                  const isSelected = !isCustomArea && practiceArea === area
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        setIsCustomArea(false)
                        setPracticeArea(area)
                      }}
                      className={`h-6 px-2 rounded text-[11px] font-medium transition cursor-pointer select-none ${
                        isSelected
                          ? 'bg-[#00726D] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {area}
                    </button>
                  )
                })}
                <button
                  type="button"
                  onClick={() => setIsCustomArea(true)}
                  className={`h-6 px-2 rounded text-[11px] font-medium transition cursor-pointer select-none flex items-center gap-0.5 ${
                    isCustomArea
                      ? 'bg-[#00726D] text-white'
                      : 'bg-gray-100 text-[#00726D] hover:bg-gray-200 border border-dashed border-[#00726D]/30'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>Custom</span>
                </button>
              </div>

              {isCustomArea && (
                <div className="flex flex-col gap-1 mt-1">
                  <input
                    type="text"
                    autoFocus
                    value={customPracticeArea}
                    onChange={(e) => setCustomPracticeArea(e.target.value)}
                    placeholder="Enter custom practice area (e.g. Maritime Law, Tax)"
                    className={inputClass}
                  />
                  <p className="text-[11px] text-gray-500">
                    Specify the practice area for this task.
                  </p>
                </div>
              )}
            </div>

            {/* Court Location */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                <span>Court Location {requiredMark}</span>
                <select
                  value={isCustomCourt ? '__CUSTOM__' : courtLocation}
                  onChange={(e) => {
                    if (e.target.value === '__CUSTOM__') {
                      setIsCustomCourt(true)
                    } else {
                      setIsCustomCourt(false)
                      setCourtLocation(e.target.value)
                    }
                  }}
                  className={inputClass}
                >
                  <option value="">-- Select Court Location --</option>
                  {COURT_CATEGORIES.map((group) => (
                    <optgroup key={group.category} label={group.category}>
                      {group.courts.map((court) => (
                        <option key={court} value={court}>
                          {court}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  <option value="__CUSTOM__">Other (Can't find your court? Add custom)...</option>
                </select>
              </label>

              {/* Quick Select Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[11px] text-gray-400 mr-0.5">Quick pick:</span>
                {[
                  {
                    name: 'Ikeja High Court',
                    value: 'High Court of Lagos State, Ikeja Division',
                  },
                  {
                    name: 'FCT Maitama',
                    value: 'High Court of the FCT, Maitama Judicial Division',
                  },
                  {
                    name: 'FHC Lagos',
                    value: 'Federal High Court, Lagos Division',
                  },
                  {
                    name: 'NICN Lagos',
                    value: 'National Industrial Court, Lagos Division',
                  },
                  {
                    name: 'CA Lagos',
                    value: 'Court of Appeal, Lagos Division',
                  },
                ].map((item) => {
                  const isSelected = !isCustomCourt && courtLocation === item.value
                  return (
                    <button
                      key={item.value}
                      type="button"
                      title={item.value}
                      onClick={() => {
                        setIsCustomCourt(false)
                        setCourtLocation(item.value)
                      }}
                      className={`h-6 px-2 rounded text-[11px] font-medium transition cursor-pointer select-none ${
                        isSelected
                          ? 'bg-[#00726D] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {item.name}
                    </button>
                  )
                })}
                <button
                  type="button"
                  onClick={() => setIsCustomCourt(true)}
                  className={`h-6 px-2 rounded text-[11px] font-medium transition cursor-pointer select-none flex items-center gap-0.5 ${
                    isCustomCourt
                      ? 'bg-[#00726D] text-white'
                      : 'bg-gray-100 text-[#00726D] hover:bg-gray-200 border border-dashed border-[#00726D]/30'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>Custom Court</span>
                </button>
              </div>

              {isCustomCourt && (
                <div className="flex flex-col gap-1 mt-1">
                  <input
                    type="text"
                    list="nigerian-courts-datalist"
                    autoFocus
                    value={customCourtLocation}
                    onChange={(e) => setCustomCourtLocation(e.target.value)}
                    placeholder="Enter custom court (e.g. Magistrate Court 4, Yaba or Customary Court)"
                    className={inputClass}
                  />
                  <datalist id="nigerian-courts-datalist">
                    {DEFAULT_COURTS.map((court) => (
                      <option key={court} value={court} />
                    ))}
                  </datalist>
                  <p className="text-[11px] text-gray-500">
                    Type a custom court name or select from suggestions if not listed.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Deadline + Proposed Fee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className={labelClass}>
              <span>Deadline {requiredMark}</span>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={inputClass}
              />
            </label>

            <div className="flex flex-col gap-2">
              <label className={labelClass}>
                <span>Proposed Fee {requiredMark}</span>
                <input
                  type="text"
                  value={proposedFee}
                  onChange={(e) => setProposedFee(e.target.value)}
                  placeholder="e.g N35000"
                  className={inputClass}
                />
              </label>

              {/* Warning/Alert box */}
              <div className="flex gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3.5 py-2.5 text-xs text-orange-800 items-start select-none leading-relaxed">
                <Info className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <p>
                  The minimum fee for Real Estate tasks is ₦30,000. Proposed
                  fees below this amount cannot be submitted.
                </p>
              </div>
            </div>
          </div>

          {/* Document Upload Area */}
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold text-[#080a0f]">
              Required Documents (optional){' '}
              <span className="text-red-500 font-normal">{requiredMark}</span>
              <span className="ml-1 text-[11px] text-gray-500 font-normal bg-gray-100 px-2 py-0.5 rounded">
                Only upload client instructions. Do not upload confidential
                documents.
              </span>
            </span>
            <div className="border border-dashed border-gray-300 rounded-xl bg-[#f9fafb] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100/50 transition">
              <label className="flex flex-col items-center cursor-pointer w-full">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-xs font-semibold text-gray-600">
                  {uploadedFile
                    ? uploadedFile.name
                    : 'Upload Required Documents'}
                </span>
                <span className="mt-1 text-[11px] text-gray-400 font-normal">
                  Required Upload documents include PDF, Word Documents and
                  Images
                </span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Confidentiality Level selector cards */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-[#080a0f]">
              Confidentiality Level {requiredMark}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Standard */}
              <div
                onClick={() => setConfidentiality('standard')}
                className={`border p-4 rounded-xl cursor-pointer select-none transition-all flex flex-col gap-1 text-left ${
                  confidentiality === 'standard'
                    ? 'border-[#00726d] bg-[#f0faf9]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    confidentiality === 'standard'
                      ? 'text-[#00726d]'
                      : 'text-gray-800'
                  }`}
                >
                  Standard
                </span>
                <span className="text-[11px] text-gray-500 font-normal">
                  Visible to lawyers who apply
                </span>
              </div>

              {/* Restricted */}
              <div
                onClick={() => setConfidentiality('restricted')}
                className={`border p-4 rounded-xl cursor-pointer select-none transition-all flex flex-col gap-1 text-left ${
                  confidentiality === 'restricted'
                    ? 'border-[#00726d] bg-[#f0faf9]'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    confidentiality === 'restricted'
                      ? 'text-[#00726d]'
                      : 'text-gray-800'
                  }`}
                >
                  Restricted
                </span>
                <span className="text-[11px] text-gray-500 font-normal">
                  Details shared only after selection
                </span>
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-secondary text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {/* Form action triggers */}
          <div className="mt-4 flex justify-end gap-3 select-none">
            <button
              type="button"
              onClick={() => alert('Saved to draft!')}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 font-secondary text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] focus:outline-none cursor-pointer"
            >
              Save to draft
            </button>
            <button
              type="submit"
              disabled={createTaskMutation.isPending}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {createTaskMutation.isPending ? 'Posting Task...' : 'Post Task'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
