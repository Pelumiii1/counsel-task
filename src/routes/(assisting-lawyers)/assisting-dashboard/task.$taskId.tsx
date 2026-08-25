import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle2, Send, X } from 'lucide-react'
import { useTaskById } from '#/hooks/useTasks'
import { useCreateProposal, useMyProposals } from '#/hooks/useProposals'
import { formatCurrency } from '#/lib/formatters'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/task/$taskId',
)({
  component: TaskDetailPage,
})

function TaskDetailPage() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const { data: serverTask, isLoading } = useTaskById(taskId)
  const { data: myProposals } = useMyProposals()
  const { mutate: createProposal } = useCreateProposal(taskId)

  const hasAppliedFromApi = (myProposals || []).some(
    (p) => String(p.taskId) === String(taskId),
  )

  const task = {
    id: serverTask?.id?.toString() || taskId,
    title: serverTask?.title || 'Loading task...',
    postedBy: serverTask?.postedBy || 'CounselTask Member',
    practiceArea: serverTask?.practiceArea || serverTask?.category || 'General Practice',
    court: serverTask?.court || serverTask?.courtLocation || 'Remote',
    deadline: serverTask?.deadline || 'Flexible',
    proposedFee: formatCurrency(serverTask?.budget),
    description: serverTask?.description || '',
    confidentiality:
      serverTask?.confidentiality === 'restricted'
        ? 'Restricted — Details shared only after selection.'
        : 'Standard — visible to lawyers who apply.',
    tags: ['Matches your practice'],
  }

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [proposalBid, setProposalBid] = useState('')
  const [proposalCover, setProposalCover] = useState('')
  const [hasAppliedLocal, setHasAppliedLocal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const hasApplied = hasAppliedLocal || hasAppliedFromApi

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault()
    createProposal(
      {
        quotedFee: proposalBid,
        experienceText: proposalCover,
        isAvailable: true,
      },
      {
        onSuccess: () => {
          setIsApplyModalOpen(false)
          setHasAppliedLocal(true)
          setShowSuccessToast(true)
          setTimeout(() => setShowSuccessToast(false), 4000)
        },
      },
    )
  }

  return (
    <div className="flex flex-col w-full min-h-full pb-20 font-secondary">
      {/* Top Welcome Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
          Welcome Oluwarotimi!!
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal">
          What action are you taking today
        </p>
      </section>

      {/* Main Task Detail Content */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
        {/* Back Link & Title Header */}
        <div className="flex flex-col gap-2">
          <Link
            to="/assisting-dashboard"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition text-sm cursor-pointer w-fit p-1 -ml-1 select-none"
            aria-label="Back to browse tasks"
          >
            <ArrowLeft className="w-5 h-5 stroke-[1.8]" />
          </Link>

          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-[28px] font-medium text-gray-900 leading-tight font-primary">
              {task.title}
            </h2>
            <span className="text-xs sm:text-sm text-gray-500 font-normal mt-1">
              Posted by {task.postedBy}
            </span>
          </div>
        </div>

        {/* Task Details Card Container */}
        <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-7 w-full max-w-4xl mx-auto">
          {/* Row 1: Practice Area & Court Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Practice Area</span>
              <span className="text-sm text-gray-700 mt-1 font-normal">
                {task.practiceArea}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Court Location</span>
              <span className="text-sm text-gray-700 mt-1 font-normal">
                {task.court}
              </span>
            </div>
          </div>

          {/* Row 2: Deadline & Proposed Fee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Deadline</span>
              <span className="text-sm text-gray-700 mt-1 font-normal">
                {task.deadline}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">Proposed Fee</span>
              <span className="text-sm sm:text-base font-semibold text-[#00726D] mt-1 font-primary">
                {task.proposedFee}
              </span>
            </div>
          </div>

          {/* Row 3: Task Description */}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">Task Description</span>
            <p className="text-sm text-gray-700 mt-1.5 leading-relaxed font-normal">
              {task.description}
            </p>
          </div>

          {/* Row 4: Confidentiality Level */}
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">
              Confidentiality Level
            </span>
            <p className="text-sm text-gray-700 mt-1 font-normal">
              {task.confidentiality}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#f0f2f4] text-gray-600 text-[11px] px-3.5 py-1 rounded-full font-medium select-none"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={() => navigate({ to: '/assisting-dashboard' })}
              className="h-10 px-5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium transition cursor-pointer shadow-2xs select-none"
            >
              Back to Browse
            </button>

            {hasApplied ? (
              <span className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-green-50 text-green-700 border border-green-200 text-xs sm:text-sm font-semibold select-none">
                <CheckCircle2 className="w-4 h-4" />
                Applied
              </span>
            ) : (
              <Link
                to="/assisting-dashboard/apply/$taskId"
                params={{ taskId: task.id }}
                className="h-10 px-6 rounded-lg bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-[0.99] select-none inline-flex items-center justify-center no-underline"
              >
                Apply
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Submit Proposal Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-150 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#00726D] uppercase tracking-wider">
                  Apply for Task
                </span>
                <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                <span className="text-xs text-gray-500">
                  {task.court} • Client budget: {task.proposedFee}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
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
                  placeholder="e.g. ₦35,000"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-sm focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Proposal Cover Note to {task.postedBy}
                </label>
                <textarea
                  rows={4}
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
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00726D] text-white text-xs font-semibold hover:bg-[#005c58] transition cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
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
            <span className="text-xs font-semibold">Application Sent!</span>
            <span className="text-[11px] text-gray-300">
              {task.postedBy} will review your application and respond.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
