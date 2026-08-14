import { useState, useEffect } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import CheckIcon from '#/assets/icons/check-icon.png'

export const Route = createFileRoute(
  '/(engaging-laywers)/dashboard/your-rating/$taskId',
)({
  component: YourRatingPage,
})

interface Task {
  id: string
  title: string
  category: string
  court: string
  deadline: string
  budget: string
  workers: string
  status: 'Open' | 'In Progress' | 'Awaiting review' | 'Completed'
  rating?: number
  feedback?: string
}

function YourRatingPage() {
  const { taskId } = Route.useParams()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('counsel_tasks')
    if (stored) {
      const tasks: Task[] = JSON.parse(stored)
      const foundTask = tasks.find((t) => t.id === taskId)
      if (foundTask) {
        setTask(foundTask)
      }
    }
  }, [taskId])

  if (!task) {
    return (
      <div className="p-8 text-center font-secondary">
        <p className="text-gray-505">Loading rating details...</p>
        <Link
          to="/dashboard"
          className="mt-4 inline-flex items-center gap-2 text-[#00726d] font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    )
  }

  const lawyerName = task.workers || 'Chiamaka Bello'
  const ratingValue = task.rating !== undefined ? task.rating : 5
  const feedbackValue =
    task.feedback ||
    'Quick turnaround and very clear drafting. Would work with her again'

  // Calculate dynamic Net Payout: budget * 0.865
  const budgetNum = parseFloat(task.budget.replace(/[^0-9.]/g, '')) || 0
  const netPayout = budgetNum * 0.865
  const netPayoutFormatted = `₦${Math.round(netPayout).toLocaleString()}`

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Header */}
      <div className="flex flex-col gap-3 select-none mb-8 text-left">
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-150 hover:text-gray-900 transition duration-205 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2]" />
        </Link>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-tight font-primary">
          Your Rating
        </h1>
      </div>

      {/* Rating View Card */}
      <div className="w-full max-w-xl mx-auto bg-white border border-gray-155 rounded-2xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col items-center gap-6">
        {/* Check Circle Badge */}
        <div className="w-12 h-12 rounded-full bg-[#E6F1F0] flex items-center justify-center select-none">
          <img src={CheckIcon} alt="Check" className="w-6 h-6 object-contain" />
        </div>

        {/* Task Completed Headers */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h2 className="text-lg font-bold text-gray-900 font-primary">
            {task.title} — completed
          </h2>
          <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-sm">
            Payment was released to {lawyerName}. Here's the rating you gave.
          </p>
        </div>

        {/* Payment Released Banner */}
        <div className="w-full bg-[#f0faf9] border border-[#00726d]/10 rounded-xl p-4 flex items-center justify-between font-medium text-xs sm:text-sm select-none">
          <span className="text-[#00726d] font-semibold">
            Released to {lawyerName}
          </span>
          <span className="text-[#00726d] font-bold">{netPayoutFormatted}</span>
        </div>

        {/* Your Rating Stars (Read-only) */}
        <div className="flex flex-col items-center gap-2 select-none w-full mt-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Your Rating
          </span>
          <div className="flex items-center gap-1.5 text-2xl mt-1 text-[#00726d]">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= ratingValue ? 'opacity-100' : 'opacity-25'}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Your Feedback Text Display */}
        <div className="flex flex-col items-start gap-2.5 w-full text-left pt-4 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider select-none font-secondary">
            Your Feedback
          </span>
          <p className="text-xs sm:text-[13px] text-gray-700 font-normal leading-relaxed">
            {feedbackValue}
          </p>
        </div>
      </div>
    </div>
  )
}
