import { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { ArrowLeft, Loader2 } from 'lucide-react'
import CheckIcon from '#/assets/icons/check-icon.png'
import { useTaskById, useApproveTaskCompletion } from '#/hooks/useTasks'
import { useTaskProposals } from '#/hooks/useProposals'

export const Route = createFileRoute(
  '/(engaging-laywers)/engaging-dashboard/submit-rating/$taskId',
)({
  component: SubmitRatingPage,
})

function SubmitRatingPage() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState<number>(5)
  const [feedback, setFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { data: serverTask, isLoading: isTaskLoading } = useTaskById(taskId)
  const { data: proposals } = useTaskProposals(taskId)
  const selectedProposal = proposals?.find((p) => p.status === 'Selected') || proposals?.[0]
  const { mutate: approveTask, isPending: isApproving } = useApproveTaskCompletion(taskId)

  const lawyerName =
    selectedProposal?.name ||
    serverTask?.workers ||
    'Chiamaka Bello'

  const handleRatingSubmit = () => {
    approveTask(undefined, {
      onSuccess: () => {
        let tasksList: any[] = []
        const stored = localStorage.getItem('counsel_tasks')
        if (stored) {
          try {
            tasksList = JSON.parse(stored)
          } catch (e) {
            // ignore
          }
        }
        const existingIdx = tasksList.findIndex((t: any) => String(t.id) === String(taskId))
        const taskData = {
          id: String(taskId),
          title: serverTask?.title || `Task #${taskId}`,
          workers: lawyerName,
          budget: serverTask?.budget || '₦0',
          status: 'Completed',
          rating,
          feedback,
          category: serverTask?.category || serverTask?.practiceArea || 'General',
          court: serverTask?.court || serverTask?.courtLocation || 'High Court',
          deadline: serverTask?.deadline || 'Completed',
          ratedAt: new Date().toISOString(),
        }
        if (existingIdx >= 0) {
          tasksList[existingIdx] = { ...tasksList[existingIdx], ...taskData }
        } else {
          tasksList.push(taskData)
        }
        localStorage.setItem('counsel_tasks', JSON.stringify(tasksList))
        setIsSubmitted(true)
      },
    })
  }

  if (isTaskLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 min-h-[50vh] font-secondary">
        <Loader2 className="w-8 h-8 text-[#00726d] animate-spin mb-3" />
        <p className="text-gray-500 text-sm">Loading task...</p>
      </div>
    )
  }

  if (!serverTask) {
    return (
      <div className="p-8 text-center font-secondary">
        <p className="text-gray-500">Task details not found.</p>
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

  const budgetNum = parseFloat(serverTask.budget.replace(/[^0-9.]/g, '')) || 0
  const netPayout = budgetNum * 0.865
  const netPayoutFormatted = `₦${Math.round(netPayout).toLocaleString()}`

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Header */}
      <div className="flex flex-col gap-3 select-none mb-6 text-left">
        <Link
          to="/engaging-dashboard/review-work/$taskId"
          params={{ taskId }}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-150 hover:text-gray-900 transition duration-205 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </Link>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-tight font-primary">
          Submit Your Rating
        </h1>
      </div>

      {/* Stepper */}
      <div className="w-full mx-auto max-w-3xl flex items-center justify-between select-none mb-10 mt-2 px-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#00726d] flex items-center justify-center text-white" />
          <span className="text-[11px] sm:text-[14px] font-normal text-black">
            Task Funded
          </span>
        </div>

        <div className="w-9.25 h-0.5 bg-[#AAAAAA80] mx-2" />

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#00726d] flex items-center justify-center text-white" />
          <span className="text-[11px] sm:text-[14px] font-normal text-black">
            Work In Progress
          </span>
        </div>

        <div className="w-9.25  h-0.5 bg-[#AAAAAA80] mx-2" />

        {/* Step 3: Active step */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center p-0.5">
            <div className="w-5 h-5 rounded-full bg-[#00726d]" />
          </div>
          <span className="text-[11px] sm:text-[14px] font-normal text-black">
            Submitted for Review
          </span>
        </div>

        <div className="w-9.25 h-0.5 bg-[#AAAAAA80] mx-2" />

        {/* Step 4 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#CF6A52] flex items-center justify-center text-white" />
          <span className="text-[11px] sm:text-[14px] font-normal text-black">
            Approved & Rated
          </span>
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-xl mx-auto bg-white border border-gray-155 rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col items-center gap-6">
        {isSubmitted ? (
          /* Rating Submitted Success View */
          <>
            {/* Check Circle Badge */}
            <div className="w-12 h-12 rounded-full bg-[#E6F1F0] flex items-center justify-center select-none">
              <img
                src={CheckIcon}
                alt="Check"
                className="w-6 h-6 object-contain"
              />
            </div>

            <div className="flex flex-col items-center gap-1.5 text-center">
              <h2 className="text-lg font-bold text-gray-900 font-primary">
                Rating submitted
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-xs">
                Thanks — your rating for {lawyerName} is now visible on their
                profile.
              </p>
            </div>

            {/* Back to Task Button */}
            <button
              onClick={() => navigate({ to: '/engaging-dashboard' })}
              className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-semibold text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer shadow-sm mt-2 select-none"
            >
              Back to Task
            </button>
          </>
        ) : (
          /* Submit Rating Form View */
          <>
            {/* Check Circle Badge */}
            <div className="w-12 h-12 rounded-full bg-[#E6F1F0] flex items-center justify-center select-none">
              <img
                src={CheckIcon}
                alt="Check"
                className="w-6 h-6 object-contain"
              />
            </div>

            <div className="flex flex-col items-center gap-1.5 text-center">
              <h2 className="text-lg font-bold text-gray-900 font-primary">
                Task completed
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-sm">
                Payment has been released to {lawyerName}. Rate the work to help
                other lawyers on CounselTask.
              </p>
            </div>

            {/* Info callout row */}
            <div className="w-full bg-[#f0faf9] border border-[#00726d]/10 rounded-xl p-4 flex items-center justify-between font-medium text-xs sm:text-sm select-none">
              <span className="text-[#00726d] font-semibold">
                Released to {lawyerName}
              </span>
              <span className="text-[#00726d] font-bold">
                {netPayoutFormatted}
              </span>
            </div>

            {/* Rating Stars section */}
            <div className="flex flex-col items-center gap-2 select-none w-full mt-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Rate this Task
              </span>
              <div className="flex items-center gap-1.5 text-2xl mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition transform active:scale-95 text-[#00726d] ${
                      star <= rating ? 'opacity-100' : 'opacity-25'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback area */}
            <div className="flex flex-col items-start gap-2.5 w-full text-left">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none font-secondary">
                Feedback (optional, visible on their profile)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="How was your experience working with them on this task"
                className="w-full h-28 p-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none resize-none font-secondary"
              />
            </div>

            {/* Submit button */}
            <button
              type="button"
              disabled={isApproving}
              onClick={handleRatingSubmit}
              className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#00726d] px-8 font-secondary text-sm font-semibold text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer shadow-sm mt-2 select-none disabled:opacity-50"
            >
              {isApproving && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Submit Rating</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
