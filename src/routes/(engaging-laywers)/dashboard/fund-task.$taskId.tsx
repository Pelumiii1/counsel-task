import { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { Lock, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTaskById } from '#/hooks/useTasks'
import { useTaskProposals, useSelectProposal } from '#/hooks/useProposals'
import { FundTaskSkeleton } from '#/components/engaging-lawyers/FundTaskSkeleton'

interface FundTaskSearch {
  lawyerId?: string
}

export const Route = createFileRoute(
  '/(engaging-laywers)/dashboard/fund-task/$taskId',
)({
  validateSearch: (search: Record<string, unknown>): FundTaskSearch => {
    return {
      lawyerId: search.lawyerId as string | undefined,
    }
  },
  component: FundTaskPage,
})

function FundTaskPage() {
  const { taskId } = Route.useParams()
  const { lawyerId } = Route.useSearch()
  const navigate = useNavigate()

  const { data: task, isLoading: isTaskLoading, isError: isTaskError } = useTaskById(taskId)
  const { data: proposals, isLoading: isProposalsLoading } = useTaskProposals(taskId)
  const selectProposalMutation = useSelectProposal()

  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank'>('card')

  if (isTaskLoading || isProposalsLoading) {
    return <FundTaskSkeleton />
  }

  if (isTaskError || !task) {
    return (
      <div className="flex flex-col items-center justify-center min-h-112.5 p-8 text-center font-secondary bg-[#f9fafb]">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
          <AlertCircle className="w-7 h-7 stroke-2" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1.5 font-primary">
          Task Not Found
        </h2>
        <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
          We couldn't retrieve the details for this task. It may have been deleted or the task ID is invalid.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00726d] text-white text-sm font-medium hover:bg-[#005c58] transition duration-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    )
  }

  // Resolve selected proposal from backend data
  const selectedProposal =
    (proposals || []).find(
      (p) => String(p.id) === String(lawyerId) || String(p.lawyerId) === String(lawyerId),
    ) || (proposals && proposals.length > 0 ? proposals[0] : null)

  // Calculate pricing breakdown
  const rawGrossFee = selectedProposal?.fee
    ? parseFloat(selectedProposal.fee.replace(/[^0-9.]/g, '')) || 0
    : task.budget
      ? parseFloat(task.budget.replace(/[^0-9.]/g, '')) || 0
      : 0

  const grossFee = rawGrossFee
  const platformCharge = grossFee * 0.06
  const vat = grossFee * 0.075
  const netPayout = grossFee - platformCharge - vat

  const formatCurrency = (val: number) => {
    return `₦${Math.round(val).toLocaleString('en-US')}`
  }

  const lawyerFullName = selectedProposal?.name || 'Selected Counsel'
  const lawyerFirstName = selectedProposal?.name ? selectedProposal.name.split(' ')[0] : 'Lawyer'

  const handleFund = async () => {
    if (!task) return

    if (selectedProposal) {
      selectProposalMutation.mutate(selectedProposal.id, {
        onSuccess: () => {
          navigate({ to: '/dashboard' })
        },
      })
    } else {
      toast.error('No proposal selected. Please select a proposal to fund.')
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Navigation & Header */}
      <div className="flex flex-col gap-3 select-none mb-8">
        <Link
          to="/dashboard/review-proposals/$taskId"
          params={{ taskId: String(task.id) }}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-150 hover:text-gray-900 transition duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </Link>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-tight font-primary">
          Fund the task
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-2xl">
          Review fee breakdown and select your payment method to escrow funds for this task.
        </p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left Column: Breakdown Receipt (Take 7 cols out of 12) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-150 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-left">
            <h2 className="text-lg font-bold text-gray-900 font-primary">
              {lawyerFullName}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Selected for: {task.title}
            </p>
          </div>

          <div className="flex flex-col divide-y divide-gray-100 text-sm">
            <div className="py-3.5 flex justify-between items-center text-gray-700">
              <span className="font-normal text-gray-600">Gross Task Fee</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(grossFee)}
              </span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-gray-700">
              <span className="font-normal text-gray-600">
                Platform Service Charge (6.0%)
              </span>
              <span className="font-medium text-[#e05e5e] shrink-0">
                -₦{Math.round(platformCharge).toLocaleString()}
              </span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-gray-700">
              <span className="font-normal text-gray-600">VAT (7.5%)</span>
              <span className="font-medium text-[#e05e5e] shrink-0">
                -₦{Math.round(vat).toLocaleString()}
              </span>
            </div>

            <div className="py-3.5 flex justify-between items-center text-gray-700">
              <span className="font-normal text-gray-600">
                Net Payout to {lawyerFirstName}
              </span>
              <span className="font-semibold text-[#e05e5e] shrink-0">
                {formatCurrency(netPayout)}
              </span>
            </div>

            <div className="py-4 flex justify-between items-center font-bold text-gray-900 text-[15px]">
              <span className="font-bold text-gray-900">Total to Fund Now</span>
              <span className="font-bold text-gray-900">
                {formatCurrency(grossFee)}
              </span>
            </div>
          </div>

          {/* Secure escrow info box */}
          <div className="bg-[#f0faf9]/80 rounded-xl p-4 border border-[#00726d]/10 flex items-start gap-3 text-left">
            <span className="w-5 h-5 bg-[#00726d] rounded-full text-white flex items-center justify-center shrink-0 mt-0.5 select-none">
              <Lock className="w-3 h-3 stroke-[2.5]" />
            </span>
            <p className="text-xs text-[#00726d] font-normal leading-relaxed">
              Funds are held securely in escrow. {lawyerFirstName} won't
              receive payment until you approve the completed task.
            </p>
          </div>
        </div>

        {/* Right Column: Payment Method Selection (Take 5 cols out of 12) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-150 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-left">
            <h2 className="text-lg font-bold text-gray-900 font-primary">
              Payment Method
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Selected for: {task.title}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Debit/Credit Card */}
            <div
              onClick={() => setSelectedMethod('card')}
              className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer transition duration-200 select-none ${selectedMethod === 'card'
                  ? 'border-[#00726d] bg-[#f0faf9]/50 shadow-[0_2px_12px_rgba(0,114,109,0.02)]'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${selectedMethod === 'card'
                    ? 'border-[#00726d]'
                    : 'border-gray-350'
                  }`}
              >
                {selectedMethod === 'card' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00726d]" />
                )}
              </div>
              <span
                className={`text-xs font-semibold ${selectedMethod === 'card'
                    ? 'text-[#00726d]'
                    : 'text-gray-500 font-medium'
                  }`}
              >
                Debit/Credit Card
              </span>
            </div>

            {/* Bank Transfer */}
            <div
              onClick={() => setSelectedMethod('bank')}
              className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer transition duration-200 select-none ${selectedMethod === 'bank'
                  ? 'border-[#00726d] bg-[#f0faf9]/50 shadow-[0_2px_12px_rgba(0,114,109,0.02)]'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${selectedMethod === 'bank'
                    ? 'border-[#00726d]'
                    : 'border-gray-350'
                  }`}
              >
                {selectedMethod === 'bank' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00726d]" />
                )}
              </div>
              <span
                className={`text-xs font-semibold ${selectedMethod === 'bank'
                    ? 'text-[#00726d]'
                    : 'text-gray-500 font-medium'
                  }`}
              >
                Bank Transfer
              </span>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-4 border-t border-gray-100 select-none mt-2">
            <button
              onClick={handleFund}
              disabled={selectProposalMutation.isPending}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-semibold text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer shadow-sm whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed gap-2"
            >
              {selectProposalMutation.isPending && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              <span>Fund {formatCurrency(grossFee)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
