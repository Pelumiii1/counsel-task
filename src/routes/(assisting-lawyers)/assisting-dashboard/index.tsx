import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Send,
  SlidersHorizontal,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  RotateCcw,
  RotateCw,
  Sparkles,
} from 'lucide-react'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/',
)({
  component: AssistingDashboardIndex,
})

interface AvailableTask {
  id: string
  title: string
  clientName: string
  clientFirm: string
  category: string
  court: string
  state: string
  deadline: string
  budget: string
  proposalsCount: number
  description: string
  postedTime: string
  verified: boolean
}

const AVAILABLE_TASKS: AvailableTask[] = [
  {
    id: 't-1',
    title: 'Hold Brief — Motion for Injunction Hearing',
    clientName: 'Adeola & Partners LP',
    clientFirm: 'Verified Law Firm',
    category: 'Litigation & Dispute Resolution',
    court: 'Ikeja High Court (Court 4)',
    state: 'Lagos',
    deadline: 'Tomorrow, 9:00 AM',
    budget: '₦40,000',
    proposalsCount: 4,
    description:
      'Looking for an experienced counsel to hold brief and move an unopposed motion for interlocutory injunction in Suit No. ID/4521/2026. Briefing notes and bundle are ready.',
    postedTime: '2 hours ago',
    verified: true,
  },
  {
    id: 't-2',
    title: 'Draft Statement of Defence and Counterclaim',
    clientName: 'Kazeem Lawal & Co.',
    clientFirm: 'Corporate Practice',
    category: 'Commercial Law',
    court: 'Federal High Court, Ikoyi',
    state: 'Lagos / Remote',
    deadline: 'In 3 days',
    budget: '₦120,000',
    proposalsCount: 6,
    description:
      'Need an assisting lawyer to draft a comprehensive Statement of Defence and Counterclaim in a breach of commercial contract matter. All documentary exhibits available.',
    postedTime: '4 hours ago',
    verified: true,
  },
  {
    id: 't-3',
    title: 'Court Appearance — Arraignment & Bail Application',
    clientName: 'Oluwarotimi Chambers',
    clientFirm: 'Criminal Defence Practice',
    category: 'Criminal Law',
    court: 'Yaba Magistrate Court (Court 2)',
    state: 'Lagos',
    deadline: 'Friday, 8:30 AM',
    budget: '₦50,000',
    proposalsCount: 2,
    description:
      'Counsel needed for bail representation and perfection assistance. Charge sheet and affidavit in support of bail prepared.',
    postedTime: '5 hours ago',
    verified: true,
  },
  {
    id: 't-4',
    title: 'Title Search & Due Diligence at Land Registry',
    clientName: 'Prime Crest Legal',
    clientFirm: 'Real Estate Practice',
    category: 'Property Law',
    court: 'Lagos State Lands Bureau, Alausa',
    state: 'Lagos',
    deadline: 'Next Monday',
    budget: '₦65,000',
    proposalsCount: 5,
    description:
      'Conduct official title search, obtain certified CTC of search report, and verify encumbrances at the land registry.',
    postedTime: '1 day ago',
    verified: true,
  },
  {
    id: 't-5',
    title: 'CAC Post-Incorporation Filing & Director Status Update',
    clientName: 'Apex Advisory Partners',
    clientFirm: 'Commercial Counsel',
    category: 'Corporate Practice',
    court: 'CAC Portal / Abuja',
    state: 'Abuja / Remote',
    deadline: 'In 5 days',
    budget: '₦85,000',
    proposalsCount: 3,
    description:
      'Accredited CAC agent needed to assist in filing changes in board of directors and annual returns reconciliation.',
    postedTime: '1 day ago',
    verified: true,
  },
]

function AssistingDashboardIndex() {
  // Check if assisting lawyer has completed profile
  const [isProfileFilled, setIsProfileFilled] = useState<boolean>(false)

  // Profile Form States
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
  const [yearsOfPractice, setYearsOfPractice] = useState<string>('9')
  const [callToBarDate, setCallToBarDate] = useState<string>('02/11/2026')
  const [bio, setBio] = useState<string>(
    'Called to bar in 2018. Focused on property and land dispute matters across Lagos State courts. Based five minutes from Ikeja High Court, available for short-notice hearings most weekdays.',
  )

  // Browse Feed States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [appliedTasks, setAppliedTasks] = useState<string[]>([])
  const [applyingTask, setApplyingTask] = useState<AvailableTask | null>(null)
  const [proposalBid, setProposalBid] = useState('')
  const [proposalCover, setProposalCover] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  // Load profile status from localStorage
  useEffect(() => {
    const storedStatus = localStorage.getItem('counsel_assisting_profile_filled')
    if (storedStatus === 'true') {
      setIsProfileFilled(true)
    } else {
      setIsProfileFilled(false)
    }
  }, [])

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

  const handleSaveProfile = () => {
    localStorage.setItem('counsel_assisting_profile_filled', 'true')
    setIsProfileFilled(true)
  }

  const handleResetProfile = () => {
    localStorage.setItem('counsel_assisting_profile_filled', 'false')
    setIsProfileFilled(false)
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

  const categories = [
    'All',
    'Litigation',
    'Commercial Law',
    'Criminal Law',
    'Property Law',
    'Corporate Practice',
  ]

  const filteredTasks = AVAILABLE_TASKS.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      task.category.toLowerCase().includes(selectedCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  const handleApplyClick = (task: AvailableTask) => {
    setApplyingTask(task)
    setProposalBid(task.budget)
    setProposalCover('')
  }

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applyingTask) return

    setAppliedTasks((prev) => [...prev, applyingTask.id])
    setApplyingTask(null)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 4000)
  }

  return (
    <div className="flex flex-col w-full min-h-full pb-16">
      {/* Top Welcome Banner */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
        <div className="flex flex-col gap-1">
          <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-[#00726D] leading-tight">
            Welcome Oluwarotimi!!
          </h1>
          <p className="font-secondary text-[13px] text-gray-500 font-normal">
            What action are you taking today
          </p>

          {/* Tester controls to easily test both states */}
          <div className="mt-2 flex items-center gap-3 text-[11px]">
            <button
              onClick={handleResetProfile}
              className={`transition cursor-pointer font-medium ${
                !isProfileFilled
                  ? 'text-[#00726D] font-bold underline'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Test Unfilled Profile (Build Profile UI)
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleSaveProfile}
              className={`transition cursor-pointer font-medium ${
                isProfileFilled
                  ? 'text-[#00726D] font-bold underline'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Test Completed Profile (Browse Tasks UI)
            </button>
          </div>
        </div>

        {isProfileFilled && (
          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200/80 rounded-xl px-4 py-2 flex flex-col shadow-2xs">
              <span className="text-[11px] text-gray-400 font-medium uppercase">
                Active Briefs
              </span>
              <span className="text-base font-bold text-gray-900">
                14 Available
              </span>
            </div>
            <div className="bg-white border border-gray-200/80 rounded-xl px-4 py-2 flex flex-col shadow-2xs">
              <span className="text-[11px] text-gray-400 font-medium uppercase">
                My Proposals
              </span>
              <span className="text-base font-bold text-[#00726D]">
                {appliedTasks.length} Submitted
              </span>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 1. UNFILLED PROFILE ONBOARDING VIEW (Exact UI from user design)           */}
      {/* ========================================================================= */}
      {!isProfileFilled ? (
        <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
              Build your profile
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal max-w-2xl">
              This is what engaging lawyers see when reviewing your proposals.
              The more complete it is, the better your matches.
            </p>
          </div>

          {/* Main Form Container Card */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-8 max-w-4xl">
            {/* Section A: Practice Areas */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-gray-900">
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
                      className={`h-9.5 px-4.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center justify-center select-none ${
                        isSelected
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

            {/* Section B: Courts / Locations Covered */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-gray-900">
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
                      className={`h-9.5 px-4.5 rounded-full text-xs font-medium transition cursor-pointer flex items-center justify-center select-none ${
                        isSelected
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

            {/* Section C: Weekly Availability */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-gray-900">
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
                      className={`h-9 px-4 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-center select-none ${
                        isSelected
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

            {/* Section D: Years of Practice & Call to Bar Date (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">
                  Years of Practice <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={yearsOfPractice}
                  onChange={(e) => setYearsOfPractice(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-[#242424] focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                  placeholder="e.g. 9"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-900">
                  Call to Bar Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={callToBarDate}
                  onChange={(e) => setCallToBarDate(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-[#242424] focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>

            {/* Section E: Short Bio (with Rich Text formatting toolbar) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-900">
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
                  <span className="w-[1px] h-4 bg-gray-200 mx-1" />
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

            {/* Section F: Profile Preview Card */}
            <div className="bg-[#EBF5F4] border border-[#D5EBE8] rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
              <span className="text-[11px] font-bold text-[#00726D] tracking-widest uppercase">
                Profile Preview
              </span>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00726D] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0 select-none">
                  FA
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-gray-900 leading-tight">
                    Funke Adeyemi
                  </span>
                  <span className="text-xs text-gray-600 mt-0.5">
                    {practiceAreas.slice(0, 2).join(', ') || 'General Practice'} •{' '}
                    {yearsOfPractice || '8'} years practice •{' '}
                    {courtsCovered[0]?.replace(' High Court', '') || 'Lagos'}, Nigeria
                  </span>
                </div>
              </div>
            </div>

            {/* Section G: Action Buttons Footer */}
            <div className="pt-2 flex items-center justify-end gap-3.5">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="h-11 px-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-2xs"
              >
                Save to draft
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="h-11 px-7 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-[0.99]"
              >
                Save &amp; Browse Tasks
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* ========================================================================= */
        /* 2. COMPLETED PROFILE VIEW: ACTIVE BROWSE TASKS FEED                      */
        /* ========================================================================= */
        <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
          {/* Search & Categories Bar */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none">
                  <Search className="w-4.5 h-4.5" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brief by court, practice area, or keyword..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                />
              </div>

              {/* Filter buttons */}
              <div className="flex items-center gap-2">
                <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  <span>Jurisdiction: Lagos</span>
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer shadow-2xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                  <span>Filter Budget</span>
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#00726D] text-white shadow-xs'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Task Cards List */}
          <div className="flex flex-col gap-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const hasApplied = appliedTasks.includes(task.id)

                return (
                  <div
                    key={task.id}
                    className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-[#00726D]/30 transition-all flex flex-col gap-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                            {task.category}
                          </span>
                          <span className="text-[11px] text-gray-400 font-normal">
                            Posted {task.postedTime}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-1">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <span className="font-medium text-gray-700">
                            {task.clientName}
                          </span>
                          <span>•</span>
                          <span>{task.clientFirm}</span>
                        </div>
                      </div>

                      {/* Budget & Apply Action */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                        <div className="flex flex-col sm:text-right">
                          <span className="text-[11px] text-gray-400 font-medium">
                            Task Fee
                          </span>
                          <span className="text-lg font-bold text-[#00726D]">
                            {task.budget}
                          </span>
                        </div>

                        {hasApplied ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Proposal Sent
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApplyClick(task)}
                            className="h-9 px-4 rounded-lg bg-[#00726D] text-white text-xs font-medium hover:bg-[#005c58] transition active:scale-[0.98] cursor-pointer shadow-2xs"
                          >
                            Submit Proposal
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {task.description}
                    </p>

                    {/* Task Meta Footer */}
                    <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          <span>{task.court}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{task.deadline}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>
                          {task.proposalsCount} lawyers submitted proposals
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="bg-white border border-gray-150 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
                <Briefcase className="w-10 h-10 text-gray-300" />
                <h3 className="text-base font-semibold text-gray-800">
                  No briefs found
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
                  No active tasks match your selected filter. Try adjusting your
                  search or category.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Submit Proposal Modal */}
      {applyingTask && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-150 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#00726D] uppercase tracking-wider">
                  Submit Proposal
                </span>
                <h3 className="text-base font-bold text-gray-900">
                  {applyingTask.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {applyingTask.court} • Client budget: {applyingTask.budget}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setApplyingTask(null)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendProposal} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Your Proposed Fee (₦)
                </label>
                <input
                  type="text"
                  required
                  value={proposalBid}
                  onChange={(e) => setProposalBid(e.target.value)}
                  placeholder="e.g. ₦40,000"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-sm focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Cover Note / Strategy for the Engaging Lawyer
                </label>
                <textarea
                  rows={4}
                  required
                  value={proposalCover}
                  onChange={(e) => setProposalCover(e.target.value)}
                  placeholder="Introduce your relevant experience in this court/matter, availability for the date, and any specific notes..."
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setApplyingTask(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00726D] text-white text-xs font-semibold hover:bg-[#005c58] transition cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#041626] text-white px-5 py-3.5 rounded-xl shadow-xl border border-white/10 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4.5 h-4.5 text-[#00a896]" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Proposal Submitted!</span>
            <span className="text-[11px] text-gray-300">
              The engaging lawyer will review your application and respond shortly.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
