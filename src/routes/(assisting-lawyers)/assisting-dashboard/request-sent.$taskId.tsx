import { createFileRoute, Link } from '@tanstack/react-router'
import { useTaskById } from '#/hooks/useTasks'
import { useMyProposals } from '#/hooks/useProposals'
import { formatCurrency } from '#/lib/formatters'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/request-sent/$taskId',
)({
  component: RequestSentPage,
})

function RequestSentPage() {
  const { taskId } = Route.useParams()
  const { data: serverTask } = useTaskById(taskId)
  const { data: myProposals } = useMyProposals()

  // Find matching proposal for this task
  const matchingProposal = (myProposals || []).find(
    (p) => String(p.taskId) === String(taskId),
  )

  const clientName =
    matchingProposal?.clientName ||
    serverTask?.postedBy ||
    'Onasanya Habeeb'
  const clientFirstName = clientName.split(' ')[0] || 'Client'

  const taskTitle =
    serverTask?.title ||
    matchingProposal?.taskTitle ||
    'Hold Brief - Land Dispute'

  const courtLocation =
    serverTask?.court ||
    serverTask?.courtLocation ||
    'Ikeja High Court'

  const rawFee =
    matchingProposal?.fee ||
    (serverTask?.budget ? formatCurrency(serverTask.budget) : '₦35,000')

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Header */}
      <div className="flex flex-col gap-1 select-none mb-6 text-left">
        <h1 className="text-2xl sm:text-[28px] font-medium text-gray-900 leading-tight font-primary">
          Request sent
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Your evidence and request for completion confirmation have been sent to{' '}
          {clientName}.
        </p>
      </div>

      {/* Task Summary Card */}
      <div className="w-full bg-white border border-gray-150 rounded-xl p-5 sm:px-6 sm:py-5 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] mb-8">
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-semibold text-gray-900 font-secondary">
            {taskTitle}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 font-normal mt-0.5">
            {courtLocation} • {clientName}
          </span>
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="text-base sm:text-lg font-bold text-[#00726D] font-secondary">
            {rawFee}
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 tracking-wider uppercase mt-0.5">
            TASK FEE
          </span>
        </div>
      </div>

      {/* Center Status Card */}
      <div className="w-full max-w-2xl mx-auto bg-white border border-gray-150 rounded-3xl p-8 sm:p-12 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col items-center text-center">
        {/* Hourglass Badge */}
        <div className="w-16 h-16 rounded-full bg-[#E5F3F1] flex items-center justify-center text-2xl shadow-xs select-none">
          <span role="img" aria-label="Hourglass">
            ⏳
          </span>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl sm:text-[22px] font-bold text-gray-900 font-primary mt-5">
          Confirmation request sent
        </h2>
        <p className="text-xs sm:text-[13.5px] text-gray-600 font-normal leading-relaxed max-w-md mt-2">
          {clientFirstName} will review your evidence and confirm the task is
          complete. Once confirmed, your payout is released automatically — no
          further action needed from you.
        </p>

        {/* Stepper Progress Bar */}
        <div className="w-full max-w-md my-8 flex items-center justify-between select-none">
          {/* Step 1: Task Accepted */}
          <div className="flex flex-col items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#00726D]" />
            <span className="text-[11px] sm:text-xs font-medium text-gray-900 whitespace-nowrap text-center">
              Task
              <br />
              Accepted
            </span>
          </div>

          <div className="h-0.5 flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

          {/* Step 2: Evidence Submitted */}
          <div className="flex flex-col items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#00726D]" />
            <span className="text-[11px] sm:text-xs font-medium text-gray-900 whitespace-nowrap text-center">
              Evidence
              <br />
              Submitted
            </span>
          </div>

          <div className="h-0.5 flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

          {/* Step 3: Awaiting Confirmation */}
          <div className="flex flex-col items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#D07054]" />
            <span className="text-[11px] sm:text-xs font-medium text-gray-900 whitespace-nowrap text-center">
              Awaiting
              <br />
              Confirmation
            </span>
          </div>

          <div className="h-0.5 flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

          {/* Step 4: Paid */}
          <div className="flex flex-col items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-white" />
            <span className="text-[11px] sm:text-xs font-medium text-gray-400 whitespace-nowrap text-center">
              Paid
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Link
            to="/assisting-dashboard"
            className="h-11 px-5 sm:px-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-center select-none shadow-2xs no-underline"
          >
            Back to Browse Task
          </Link>
          <Link
            to="/assisting-dashboard/payments"
            className="h-11 px-5 sm:px-6 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-medium transition cursor-pointer active:scale-[0.98] flex items-center justify-center select-none shadow-xs no-underline"
          >
            View In Payments
          </Link>
        </div>
      </div>
    </div>
  )
}
