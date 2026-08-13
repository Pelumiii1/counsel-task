import React, { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Upload,
  Info,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  RotateCcw,
  RotateCw,
} from 'lucide-react'
import {
  inputClass,
  labelClass,
  requiredMark,
} from '#/components/engaging-lawyers/constants'

export const Route = createFileRoute('/(engaging-laywers)/dashboard/post-job')({
  component: PostJobPage,
})

function PostJobPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [practiceArea, setPracticeArea] = useState('Property Law')
  const [courtLocation, setCourtLocation] = useState('')
  const [deadline, setDeadline] = useState('')
  const [proposedFee, setProposedFee] = useState('')
  const [confidentiality, setConfidentiality] = useState<
    'standard' | 'restricted'
  >('standard')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (
      !title ||
      !description ||
      !practiceArea ||
      !courtLocation ||
      !deadline ||
      !proposedFee
    ) {
      setError('Please complete all required fields.')
      return
    }

    const feeAmount = parseFloat(proposedFee.replace(/[^0-9]/g, ''))
    if (practiceArea === 'Property Law' && feeAmount < 30000) {
      setError('Proposed fee is below the minimum limit for Property Law.')
      return
    }

    const stored = localStorage.getItem('counsel_tasks')
    const currentTasks = stored ? JSON.parse(stored) : []
    const newTask = {
      id: Date.now().toString(),
      title,
      category: practiceArea,
      court: courtLocation,
      deadline,
      budget: proposedFee.startsWith('₦') ? proposedFee : `₦${proposedFee}`,
      workers: '0 Proposals',
      status: 'Open',
    }
    const nextTasks = [...currentTasks, newTask]
    localStorage.setItem('counsel_tasks', JSON.stringify(nextTasks))

    navigate({ to: '/dashboard' })
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary">
      {/* Welcome Banner Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight">
          Welcome Oluwarotimi!!
        </h1>
        <p className="font-secondary text-[13px] text-gray-500 font-normal">
          What action are you taking today
        </p>
      </section>

      {/* Main post form block */}
      <section className="flex-1 w-full max-w-4xl mx-auto px-6 py-10 sm:px-12">
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
            <div className="w-full rounded-lg border border-[#dedfe3] bg-white overflow-hidden focus-within:border-[#00726D]/50 focus-within:ring-2 focus-within:ring-[#00726D]/10">
              {/* Mock editor actions bar */}
              <div className="h-10 border-b border-[#dedfe3] bg-[#f9fafb] px-3 flex items-center gap-4 text-gray-500 select-none">
                <button
                  type="button"
                  className="p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-gray-200" />
                <button
                  type="button"
                  className="p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-gray-200" />
                <button
                  type="button"
                  className="p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer"
                >
                  {/* Clean SVG reload replacement since rotate-left/right isn't simple */}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89"
                    />
                  </svg>
                </button>
                <div className="w-px h-5 bg-gray-200" />
                <button
                  type="button"
                  className="p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 hover:text-black hover:bg-gray-200/50 rounded transition cursor-pointer"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Textarea body */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description..."
                className="w-full h-32 px-4 py-3 text-sm font-normal text-[#242424] placeholder-gray-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Row 1: Practice Area + Court Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className={labelClass}>
              <span>Practice Area {requiredMark}</span>
              <input
                type="text"
                value={practiceArea}
                onChange={(e) => setPracticeArea(e.target.value)}
                placeholder="Property Law"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              <span>Court Location {requiredMark}</span>
              <input
                type="text"
                value={courtLocation}
                onChange={(e) => setCourtLocation(e.target.value)}
                placeholder="e.g ikeja high court"
                className={inputClass}
              />
            </label>
          </div>

          {/* Row 2: Deadline + Proposed Fee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className={labelClass}>
              <span>Deadline {requiredMark}</span>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="dd/mm/yyyy"
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
                  The minimum fee for Property Law tasks is ₦30,000. Proposed
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
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none cursor-pointer"
            >
              Post Task
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
