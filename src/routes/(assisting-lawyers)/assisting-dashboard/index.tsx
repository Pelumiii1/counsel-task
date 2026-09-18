import { useState, useEffect } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  CheckCircle2,
  Send,
  X,
  Briefcase,
  SearchX,
  Bell,
  SlidersHorizontal,
  Loader2,
  RotateCw,
} from 'lucide-react'
import { RichTextEditor } from '#/components/ui/RichTextEditor'
import { useTasks } from '#/hooks/useTasks'
import { useCreateProposal, useMyProposals } from '#/hooks/useProposals'
import { useAssistingProfile } from '#/hooks/useProfile'
import { useRegistrationStore } from '#/store/useRegistrationStore'
import { formatCurrency } from '#/lib/formatters'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/',
)({
  component: AssistingDashboardIndex,
})

interface AvailableTask {
  id: string
  title: string
  postedBy: string
  court: string
  deadline: string
  practiceArea: string
  fee: string
  description: string
  tags: string[]
}

const BROWSE_TASKS: AvailableTask[] = []

function AssistingDashboardIndex() {
  const navigate = useNavigate()
  // Check if assisting lawyer has completed profile (defaults to true for browse view, or toggled)
  const [isProfileFilled, setIsProfileFilled] = useState<boolean>(true)

  // Filter toolbar state
  const [activeFilter, setActiveFilter] = useState<string>('Matching My Practice')

  // Profile Form States (for onboarding mode)
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

  // Selected Task Modal state
  const [selectedTask, setSelectedTask] = useState<AvailableTask | null>(null)
  const [proposalBid, setProposalBid] = useState('')
  const [proposalCover, setProposalCover] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const { data: profile } = useAssistingProfile()
  const firstName = profile?.fullName?.trim().split(' ')[0] || 'Counsel'

  const regFullName = useRegistrationStore((state) => state.fullName)
  const {
    data: serverTasks,
    isLoading: isTasksLoading,
    isFetching: isTasksFetching,
    refetch: refetchTasks,
  } = useTasks()
  const { data: myProposals } = useMyProposals()
  const { mutate: createProposal } = useCreateProposal(selectedTask ? selectedTask.id : '')

  const lawyerFullName = profile?.fullName?.trim() || regFullName?.trim() || 'Funke Akindele'
  const initials = lawyerFullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'FA'

  const appliedTaskIds = (myProposals || []).map((p) => String(p.taskId))

  // Check localStorage status if set
  useEffect(() => {
    const storedStatus = localStorage.getItem('counsel_assisting_profile_filled')
    if (storedStatus === 'false') {
      setIsProfileFilled(false)
    } else {
      setIsProfileFilled(true)
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

  // const handleResetProfile = () => {
  //   localStorage.setItem('counsel_assisting_profile_filled', 'false')
  //   setIsProfileFilled(false)
  // }

  // const handleOpenTask = (task: AvailableTask) => {
  //   setSelectedTask(task)
  //   setProposalBid(task.fee)
  //   setProposalCover('')
  // }

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTask) return

    createProposal(
      {
        quotedFee: proposalBid,
        experienceText: proposalCover,
        isAvailable: true,
      },
      {
        onSuccess: () => {
          setSelectedTask(null)
          setShowSuccessToast(true)
          setTimeout(() => setShowSuccessToast(false), 4000)
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

  const filterButtons = [
    'Matching My Practice',
    'Practice Area',
    'Court Location',
    'Deadline',
    'Budget',
  ]

  const allAvailableTasks: AvailableTask[] =
    serverTasks && serverTasks.length > 0
      ? serverTasks
        .filter((t) => {
          if (profile?.email && t.postedByEmail && t.postedByEmail.toLowerCase() === profile.email.toLowerCase()) {
            return false
          }
          if (profile?.fullName && t.postedBy && t.postedBy.toLowerCase() === profile.fullName.toLowerCase()) {
            return false
          }
          return true
        })
        .map((t) => ({
          id: t.id.toString(),
          title: t.title,
          postedBy: t.postedBy || 'CounselTask Member',
          court: t.court || t.courtLocation || 'Remote',
          deadline: t.deadline,
          practiceArea: t.practiceArea || t.category || 'General Practice',
          fee: formatCurrency(t.budget),
          description: t.description || '',
          tags: ['Matches your practice'],
        }))
      : BROWSE_TASKS

  const filteredTasks = allAvailableTasks.filter((task) => {
    if (activeFilter === 'Matching My Practice') return true
    if (activeFilter === 'Practice Area') return task.practiceArea === 'Property Law'
    if (activeFilter === 'Court Location') return task.court.includes('Ikeja')
    return true
  })

  return (
    <div className="flex flex-col w-full min-h-full pb-20 font-secondary">
      {/* Welcome Banner Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Welcome {firstName}!
          </h1>
          <p className="text-xs sm:text-[13px] text-gray-500 font-normal">
            What action are you taking today
          </p>

          {/* Inline switcher to test both views */}
          {/* <div className="mt-2 flex items-center gap-3 text-[11px]">
            <button
              onClick={handleSaveProfile}
              className={`transition cursor-pointer font-medium ${isProfileFilled
                ? 'text-[#00726D] font-bold underline'
                : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              Browse Available Tasks UI
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleResetProfile}
              className={`transition cursor-pointer font-medium ${!isProfileFilled
                ? 'text-[#00726D] font-bold underline'
                : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              Build Your Profile (Onboarding UI)
            </button>
          </div> */}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. BROWSE AVAILABLE TASKS VIEW (Matching Attached Design)                 */}
      {/* ========================================================================= */}
      {isProfileFilled ? (
        <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
          {/* Title and description */}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl sm:text-[28px] font-semibold text-[#041626] tracking-tight">
              Browse available tasks
            </h2>
            <p className="text-xs sm:text-[13.5px] text-gray-500 font-normal max-w-3xl">
              Filtered to match your practice areas and locations. Turn on alerts to get
              notified the moment a new one is posted.
            </p>
          </div>

          {/* Filter Pills Toolbar */}
          <div className="w-full bg-white border border-gray-150 rounded-2xl p-3.5 sm:p-4 shadow-[0_2px_15px_rgba(0,0,0,0.015)] flex items-center gap-2.5 overflow-x-auto">
            {filterButtons.map((btn) => {
              const isActive = activeFilter === btn
              return (
                <button
                  key={btn}
                  type="button"
                  onClick={() => setActiveFilter(btn)}
                  className={`h-9 px-4.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap select-none ${isActive
                    ? 'bg-[#041626] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50/60'
                    }`}
                >
                  {btn}
                </button>
              )
            })}
          </div>

          {/* Task Cards List or Empty State */}
          {isTasksLoading ? (
            <div className="w-full bg-white border border-gray-150 rounded-2xl p-12 sm:p-16 shadow-[0_2px_15px_rgba(0,0,0,0.015)] flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-8 h-8 text-[#00726D] animate-spin" />
              <p className="text-sm font-medium text-gray-800">Loading available tasks...</p>
              <span className="text-xs text-gray-400">Fetching the latest court appearances and legal tasks</span>
            </div>
          ) : filteredTasks.length > 0 ? (
            <div className="flex flex-col gap-5">
              {filteredTasks.map((task) => {
                const isApplied = appliedTaskIds.includes(task.id)

                return (
                  <div
                    key={task.id}
                    onClick={() =>
                      navigate({
                        to: '/assisting-dashboard/task/$taskId',
                        params: { taskId: task.id },
                      })
                    }
                    className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-7 shadow-[0_2px_15px_rgba(0,0,0,0.015)] hover:border-gray-300 transition-all flex flex-col justify-between gap-4 cursor-pointer"
                  >
                    {/* Top Row: Title & Fee */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="flex flex-col">
                        <h3 className="text-xl sm:text-[18px] font-medium text-black leading-tight font-primary">
                          {task.title}
                        </h3>
                        <div className="text-xs sm:text-[13px] text-black font-normal mt-1 flex items-center gap-1.5 flex-wrap">
                          <span>{task.court}</span>
                          <span>•</span>
                          <span>{task.deadline}</span>
                          <span>•</span>
                          <span>{task.practiceArea}</span>
                        </div>
                      </div>

                      {/* Fee Tag */}
                      <div className="flex flex-col sm:items-end shrink-0">
                        <span className="text-2xl sm:text-[20px] font-medium text-[#00726D] leading-tight font-primary">
                          {task.fee}
                        </span>
                        <span className="text-[11px] text-gray-400 font-normal mt-0.5">
                          Quoted Fee
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-[13.5px] text-black leading-relaxed font-normal">
                      {task.description}
                    </p>

                    {/* Footer Row: Tags & View Task Action */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#f0f2f4] text-gray-600 text-[11px] px-3.5 py-1 rounded-full font-medium select-none"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <div className="flex items-center justify-end">
                        {isApplied ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Proposal Submitted
                          </span>
                        ) : (
                          <Link
                            to="/assisting-dashboard/task/$taskId"
                            params={{ taskId: task.id }}
                            onClick={(e) => e.stopPropagation()}
                            className="h-9.5 px-5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-800 text-xs font-medium shadow-2xs transition cursor-pointer select-none active:scale-[0.98] inline-flex items-center justify-center no-underline"
                          >
                            View Task
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="w-full bg-white border border-gray-150 rounded-2xl p-10 sm:p-14 shadow-[0_2px_15px_rgba(0,0,0,0.015)] flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-[#E6F1F0] flex items-center justify-center mb-5 text-[#00726D] shadow-xs select-none">
                {activeFilter === 'Matching My Practice' ? (
                  <Briefcase className="w-8 h-8 text-[#00726D] stroke-[1.75]" />
                ) : (
                  <SearchX className="w-8 h-8 text-[#00726D] stroke-[1.75]" />
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 font-primary">
                {activeFilter === 'Matching My Practice'
                  ? 'No available tasks right now'
                  : `No tasks found for "${activeFilter}"`}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mt-2 leading-relaxed font-normal">
                {activeFilter === 'Matching My Practice'
                  ? 'There are currently no open briefs or court appearances available. Engaging lawyers post new tasks regularly — check back shortly or make sure your practice alerts are active.'
                  : 'There are currently no tasks matching the selected filter. Try resetting your filter to view all available briefs.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6 select-none">
                {activeFilter !== 'Matching My Practice' && (
                  <button
                    type="button"
                    onClick={() => setActiveFilter('Matching My Practice')}
                    className="h-10 px-5 rounded-xl bg-[#041626] hover:bg-[#08223a] text-white text-xs sm:text-sm font-medium transition cursor-pointer shadow-xs active:scale-[0.98] inline-flex items-center gap-2"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => refetchTasks()}
                  disabled={isTasksFetching}
                  className="h-10 px-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-medium transition cursor-pointer shadow-2xs active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <RotateCw
                    className={`w-3.5 h-3.5 text-gray-500 ${isTasksFetching ? 'animate-spin' : ''}`}
                  />
                  <span>{isTasksFetching ? 'Refreshing...' : 'Refresh Tasks'}</span>
                </button>

                <Link
                  to="/assisting-dashboard/profile"
                  className="h-10 px-5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-medium transition cursor-pointer shadow-2xs active:scale-[0.98] inline-flex items-center gap-2 no-underline"
                >
                  <Bell className="w-3.5 h-3.5 text-gray-500" />
                  <span>Update Practice Areas</span>
                </Link>
              </div>
            </div>
          )}
        </section>
      ) : (
        /* ========================================================================= */
        /* 2. UNFILLED PROFILE ONBOARDING VIEW                                       */
        /* ========================================================================= */
        <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
              Build your profile
            </h2>
            <p className="text-xs sm:text-[13.5px] text-gray-500 font-normal max-w-3xl">
              Tell other lawyers your practice areas, experience, and the courts you cover so
              they can find and hire you for tasks.
            </p>
          </div>

          <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.015)] flex flex-col gap-8">
            {/* Section A: Practice Areas */}
            <div className="flex flex-col gap-3">
              <span className="text-xs sm:text-sm font-bold text-gray-900">
                Practice Area <span className="text-red-500">*</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {practiceAreaOptions.map((area) => {
                  const isSelected = practiceAreas.includes(area)
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => togglePracticeArea(area)}
                      className={`h-9 px-4 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 select-none ${isSelected
                        ? 'bg-[#041626] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{area}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Section B: Courts Covered */}
            <div className="flex flex-col gap-3">
              <span className="text-xs sm:text-sm font-bold text-gray-900">
                Courts Covered <span className="text-red-500">*</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {courtOptions.map((court) => {
                  const isSelected = courtsCovered.includes(court)
                  return (
                    <button
                      key={court}
                      type="button"
                      onClick={() => toggleCourt(court)}
                      className={`h-9 px-4 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 select-none ${isSelected
                        ? 'bg-[#041626] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{court}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Section C: Weekly Availability */}
            <div className="flex flex-col gap-3">
              <span className="text-xs sm:text-sm font-bold text-gray-900">
                Weekly Availability <span className="text-red-500">*</span>
              </span>
              <div className="flex flex-wrap gap-2.5">
                {daysOfWeek.map((day) => {
                  const isSelected = weeklyAvailability.includes(day)
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`h-9 px-4 rounded-full text-xs font-medium transition cursor-pointer flex items-center gap-1.5 select-none ${isSelected
                        ? 'bg-[#041626] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{day}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Section D: Years of Practice & Call to Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-gray-900">
                  Years of Practice <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={yearsOfPractice}
                  onChange={(e) => setYearsOfPractice(e.target.value)}
                  placeholder="e.g. 9"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs sm:text-sm font-bold text-gray-900">
                  Date of Call to Bar <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={callToBarDate}
                  onChange={(e) => setCallToBarDate(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
                />
              </div>
            </div>

            {/* Section E: Bio / Summary */}
            <div className="flex flex-col gap-2">
              <label className="text-xs sm:text-sm font-bold text-gray-900">
                Bio / Summary <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={bio}
                onChange={setBio}
                placeholder="Write a brief professional summary..."
                minHeight="120px"
              />
            </div>

            {/* Section F: Profile Preview Card */}
            <div className="bg-[#EBF5F4] border border-[#D5EBE8] rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
              <span className="text-[11px] font-bold text-[#00726D] tracking-widest uppercase">
                Profile Preview
              </span>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00726D] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0 select-none">
                  {initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-gray-900 leading-tight">
                    {lawyerFullName}
                  </span>
                  <span className="text-xs text-gray-600 mt-0.5">
                    {practiceAreas.slice(0, 2).join(', ') || 'General Practice'} •{' '}
                    {yearsOfPractice || '8'} years practice •{' '}
                    {courtsCovered[0]?.replace(' High Court', '') || 'Ikeja'}, Lagos
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
      )}

      {/* View Task / Submit Proposal Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-150 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#00726D] uppercase tracking-wider">
                  Task Brief
                </span>
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedTask.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{selectedTask.court}</span>
                  <span>•</span>
                  <span>{selectedTask.deadline}</span>
                  <span>•</span>
                  <span className="font-bold text-[#00726D]">{selectedTask.fee}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProposal} className="p-6 flex flex-col gap-4">
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-150">
                <span className="text-[11px] font-semibold text-gray-500 uppercase block mb-1">
                  Brief Overview
                </span>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Your Proposed Fee (₦)
                </label>
                <input
                  type="text"
                  required
                  value={proposalBid}
                  onChange={(e) => setProposalBid(e.target.value)}
                  placeholder="e.g. ₦35,000"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-sm focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Proposal Cover Note to {selectedTask.postedBy}
                </label>
                <textarea
                  rows={3}
                  required
                  value={proposalCover}
                  onChange={(e) => setProposalCover(e.target.value)}
                  placeholder="State your availability, experience with this court/brief, and how you will handle it..."
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00726D] text-white text-xs font-semibold hover:bg-[#005c58] transition cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Proposal</span>
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
              The engaging lawyer will review your proposal and respond.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
