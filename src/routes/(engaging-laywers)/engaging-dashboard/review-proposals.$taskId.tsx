import { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { ArrowLeft, Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '#/components/ui/dialog'
import { useTaskById } from '#/hooks/useTasks'
import { useTaskProposals, type ProposalItem } from '#/hooks/useProposals'
import { RichTextContent } from '#/components/ui/RichTextContent'

const formatYearsOfPractice = (experience?: string): string => {
  if (!experience) return '5 yrs'
  const trimmed = experience.trim()
  const yearMatch = trimmed.match(/\b(19\d\d|20\d\d)\b/)
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10)
    const currentYear = new Date().getFullYear()
    const diff = currentYear - year
    return `${Math.max(1, diff)} yrs`
  }
  const numMatch = trimmed.match(/^(\d+)/)
  if (numMatch) {
    return `${numMatch[1]} yrs`
  }
  return '5 yrs'
}

const formatExperienceSubtitle = (experience?: string): string => {
  if (!experience) return '5 years practice'
  const trimmed = experience.trim()
  const yearMatch = trimmed.match(/\b(19\d\d|20\d\d)\b/)
  if (yearMatch) {
    const year = parseInt(yearMatch[1], 10)
    const currentYear = new Date().getFullYear()
    const diff = currentYear - year
    return `${Math.max(1, diff)} years practice`
  }
  const numMatch = trimmed.match(/^(\d+)\s*(?:years?|yrs?)/i)
  if (numMatch) {
    return `${numMatch[1]} years practice`
  }
  return trimmed
}

export const Route = createFileRoute(
  '/(engaging-laywers)/engaging-dashboard/review-proposals/$taskId',
)({
  component: ReviewProposalsPage,
})

function ReviewProposalsPage() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const { data: task, isLoading: isTaskLoading } = useTaskById(taskId)
  const { data: serverProposals, isLoading: isProposalsLoading } = useTaskProposals(taskId)

  const proposals = serverProposals || []
  const [selectedProposalId, setSelectedProposalId] = useState<string | number | null>(null)
  const [activeProfileLawyer, setActiveProfileLawyer] = useState<ProposalItem | null>(null)

  const handleFundTask = () => {
    if (!task || !selectedProposalId) return

    navigate({
      to: '/engaging-dashboard/fund-task/$taskId',
      params: { taskId: String(task.id) },
      search: {
        lawyerId: String(selectedProposalId),
      },
    })
  }

  if (isTaskLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-100 font-secondary">
        <div className="w-8 h-8 border-3 border-[#00726d] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-gray-500 text-sm">Loading task...</p>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="p-12 text-center font-secondary">
        <p className="text-gray-500">Task not found or unavailable.</p>
        <Link
          to="/engaging-dashboard"
          className="mt-4 inline-flex items-center gap-2 text-[#00726d] font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    )
  }

  console.log("task proposals", proposals)

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Navigation & Header */}
      <div className="flex flex-col gap-3 select-none mb-6">
        <Link
          to="/engaging-dashboard"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-150 hover:text-gray-900 transition duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </Link>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-tight font-primary">
          Review proposals
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-2xl">
          {proposals.length} verified {proposals.length === 1 ? 'lawyer has' : 'lawyers have'} applied. Compare their fee,
          experience, and availability before selecting one.
        </p>
      </div>

      {/* Task Summary Card */}
      <div className="w-full bg-white border border-gray-150 rounded-xl p-5 mb-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
            {task.title}
          </h2>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 font-normal">
            <span>{task.court || task.courtLocation}</span>
            <span className="text-gray-300">•</span>
            <span>{task.deadline}</span>
            <span className="text-gray-300">•</span>
            <span>{task.category || task.practiceArea}</span>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-0.5 sm:text-right shrink-0">
          <span className="text-lg sm:text-xl font-bold text-[#00726d] font-primary">
            {task.budget}
          </span>
          <span className="text-[14px] tracking-wider text-[#595959] font-normal uppercase">
            Proposed Fee
          </span>
        </div>
      </div>

      {/* Lawyers Proposals List */}
      {isProposalsLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-150 mb-8">
          <div className="w-8 h-8 border-3 border-[#00726d] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm text-gray-500">Loading proposals from assisting lawyers...</p>
        </div>
      ) : proposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-gray-250 mb-8 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-gray-800 mb-1">No proposals yet</h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md">
            Assisting lawyers have not submitted proposals for this task yet. As soon as applications are received, they will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 mb-8">
          {proposals.map((lawyer) => {
            const isSelected = selectedProposalId === lawyer.id
            return (
              <div
                key={lawyer.id}
                className={`w-full bg-white rounded-xl border p-5 transition-all duration-350 flex flex-col md:flex-row justify-between items-start gap-5 ${isSelected
                  ? 'border-[#00726d] ring-1 ring-[#00726d]/20 shadow-[0_6px_25px_rgba(0,114,109,0.04)] bg-[#00726d]/0.5'
                  : 'border-gray-150 hover:border-gray-300 hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)]'
                  }`}
              >
                {/* Left Side: Avatar & Details */}
                <div className="flex items-start gap-4 flex-1">
                  {/* Initials Avatar */}
                  <div className="w-11 h-11 rounded-full bg-[#005e5a] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 select-none font-secondary">
                    {lawyer.initials || 'LA'}
                  </div>

                  {/* Details Column */}
                  <div className="flex flex-col items-start">
                    <h3 className="text-base font-bold text-gray-900 leading-tight font-primary">
                      {lawyer.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-normal mt-1 leading-normal">
                      {lawyer.practiceArea} • {formatExperienceSubtitle(lawyer.experience)} •{' '}
                      {lawyer.location}
                    </p>

                    {/* Rating Stars Row */}
                    <div className="flex items-center gap-1 mt-2.5 select-none">
                      <span className="text-[#00726d] text-sm flex items-center tracking-wider">
                        ★★★★★
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium ml-1.5">
                        {lawyer.rating ? lawyer.rating.toFixed(1) : '5.0'} ({lawyer.tasksCount || 0} tasks)
                      </span>
                    </div>

                    {/* Pitch Quote */}
                    {lawyer.quote && (
                      <div className="text-xs text-gray-600 font-normal leading-relaxed mt-3.5 bg-gray-50/50 p-3 rounded-lg border border-gray-100 max-w-xl">
                        <RichTextContent content={lawyer.quote} />
                      </div>
                    )}

                    {/* Badges Pill Row */}
                    {lawyer.badges && lawyer.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {lawyer.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex text-[10px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-150/40"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-5 w-full lg:w-fit">
                      <button
                        onClick={() => setActiveProfileLawyer(lawyer)}
                        className="flex-1 inline-flex h-9 items-center justify-center rounded-lg border border-[#E4E4E7] px-3 lg:px-4 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                      >
                        View Profile
                      </button>
                      {isSelected ? (
                        <button className="flex-1 inline-flex h-9 items-center justify-center rounded-lg bg-[#00726d] px-3 text-xs font-semibold text-white transition hover:bg-[#005c58] cursor-pointer whitespace-nowrap">
                          Selected
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedProposalId(lawyer.id)}
                          className="flex-1 inline-flex h-9 items-center justify-center rounded-lg border-[0.5px] border-[#00726D] px-3 text-xs font-semibold text-[#00726D] transition hover:bg-[#00726d]/5 cursor-pointer whitespace-nowrap"
                        >
                          Select
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: Quote Fee & Actions for larger screens */}
                <div className="hidden md:flex flex-col items-end justify-between self-stretch shrink-0 text-right min-h-35">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[20px] font-medium text-[#00726D] leading-tight font-primary">
                      {lawyer.fee}
                    </span>
                    <span className="text-[12px] text-black font-normal uppercase tracking-wider font-secondary">
                      Quoted Fee
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Bottom Sticky-like Action Footer */}
      {proposals.length > 0 && (
        <div className="flex justify-end pt-4 border-t border-gray-100 select-none">
          <button
            onClick={handleFundTask}
            disabled={!selectedProposalId}
            className={`inline-flex h-11 items-center justify-center rounded-lg px-6 font-secondary text-sm font-semibold text-white transition shadow-sm ${
              selectedProposalId
                ? 'bg-[#00726d] hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed opacity-60'
            }`}
          >
            Fund This Task
          </button>
        </div>
      )}

      {/* Profile Detail Dialog Modal */}
      <Dialog
        open={!!activeProfileLawyer}
        onOpenChange={(open) => {
          if (!open) setActiveProfileLawyer(null)
        }}
      >
        {activeProfileLawyer && (
          <DialogContent
            showCloseButton={false}
            className="sm:max-w-xl bg-white rounded-3xl border-0 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-6"
          >
            {/* Header info */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#005e5a] text-white flex items-center justify-center font-bold text-sm shrink-0 select-none font-secondary">
                {activeProfileLawyer.initials || 'LA'}
              </div>
              <div className="flex flex-col items-start text-left">
                <DialogTitle className="text-[18px] font-medium text-black leading-tight font-primary">
                  {activeProfileLawyer.name}
                </DialogTitle>
                <DialogDescription className="text-sm text-black font-normal mt-0.5 leading-normal font-secondary">
                  {activeProfileLawyer.practiceArea} •{' '}
                  {formatExperienceSubtitle(activeProfileLawyer.experience)} •{' '}
                  {activeProfileLawyer.location}
                </DialogDescription>
              </div>
            </div>

            {/* Quick stats grid boxes */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#eef8f8] rounded-xl py-4 px-3 flex flex-col items-center justify-center gap-1 select-none">
                <span className="text-xl sm:text-2xl font-bold text-[#00726d] leading-none font-primary">
                  {activeProfileLawyer.rating ? activeProfileLawyer.rating.toFixed(1) : '5.0'}
                </span>
                <span className="text-[10px] sm:text-xs font-normal text-[#00726d]/80 uppercase tracking-wider font-secondary">
                  Rating
                </span>
              </div>

              <div className="bg-[#eef8f8] rounded-xl py-4 px-3 flex flex-col items-center justify-center gap-1 select-none">
                <span className="text-xl sm:text-2xl font-bold text-[#00726d] leading-none font-primary">
                  {activeProfileLawyer.tasksCount || 0}
                </span>
                <span className="text-[10px] sm:text-xs font-normal text-[#00726d]/80 uppercase tracking-wider font-secondary">
                  Task Done
                </span>
              </div>

              <div className="bg-[#eef8f8] rounded-xl py-4 px-3 flex flex-col items-center justify-center gap-1 select-none font-secondary">
                <span className="text-xl sm:text-[20px] font-bold text-[#00726d] leading-none font-primary">
                  {formatYearsOfPractice(activeProfileLawyer.experience)}
                </span>
                <span className="text-[10px] sm:text-xs font-normal text-[#00726d]/80 uppercase tracking-wider font-secondary">
                  Practice
                </span>
              </div>
            </div>

            {/* About text segment */}
            <div className="flex flex-col items-start gap-2.5 text-left">
              <h4 className="text-xs font-bold text-[#595959] tracking-wider uppercase select-none font-roboto">
                About
              </h4>
              <div className="text-sm text-[#595959] leading-relaxed font-normal">
                <RichTextContent
                  content={activeProfileLawyer.about}
                  fallback="Verified legal practitioner on CounselTask."
                />
              </div>
            </div>

            {/* Modal footer closing trigger */}
            <div className="flex justify-end mt-2 select-none">
              <button
                onClick={() => setActiveProfileLawyer(null)}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-semibold text-white transition hover:bg-[#005c58] active:scale-[0.98] cursor-pointer"
              >
                Close
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
