import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search, SlidersHorizontal, Check, Loader2, Lock } from 'lucide-react'
import { useMyTasks, type TaskItem } from '#/hooks/useTasks'

export const Route = createFileRoute('/(engaging-laywers)/engaging-dashboard/payments')({
  component: PaymentsPage,
})

interface PaymentRow {
  id: string
  taskId: string | number
  taskTitle: string
  category: string
  lawyer: string
  amount: string
  rawAmount: number
  date: string
  timestamp: number
  status: 'Awaiting' | 'Paid'
  taskStatus: string
}

function PaymentsPage() {
  const { data: serverTasks, isLoading } = useMyTasks()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([])
  const [selectedPaymentForModal, setSelectedPaymentForModal] = useState<PaymentRow | null>(null)

  const tasks: TaskItem[] = serverTasks || []

  // Only display tasks that have been funded (i.e. not Open)
  const fundedTasks: PaymentRow[] = tasks
    .filter((t) => t.status !== 'Open')
    .map((t): PaymentRow => {
      const isPaid = t.status === 'Completed'
      const cleanBudget = (t.budget || '0').replace(/[^0-9.]/g, '')
      const raw = parseFloat(cleanBudget) || 50000

      let formattedDate = 'Recently'
      let timestamp = 0

      const paymentDate = t.paidAt || t.updatedAt
      if (paymentDate) {
        try {
          const d = new Date(paymentDate)
          timestamp = d.getTime()
          formattedDate = d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        } catch (_) {}
      } else if (t.status === 'In Progress') {
        const d = new Date()
        timestamp = d.getTime()
        formattedDate = d.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      } else if (t.createdAt) {
        try {
          const d = new Date(t.createdAt)
          timestamp = d.getTime()
          formattedDate = d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        } catch (_) {}
      }

      return {
        id: String(t.id),
        taskId: t.id,
        taskTitle: t.title,
        category: t.category || t.practiceArea || 'General Legal Practice',
        lawyer: t.workers || 'Assisting Counsel',
        amount: t.budget || `₦${Math.round(raw).toLocaleString()}`,
        rawAmount: raw,
        date: formattedDate,
        timestamp,
        status: isPaid ? 'Paid' : 'Awaiting',
        taskStatus: t.status,
      }
    })
    // Sort in descending order (newest payment / activity first)
    .sort((a, b) => b.timestamp - a.timestamp)

  // Apply search and status filters
  const filteredPayments = fundedTasks.filter((p) => {
    const matchesSearch =
      p.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lawyer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || p.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredPayments.map((t) => t.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectRow = (id: string | number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id))
    }
  }

  const getStatusBadge = (status: PaymentRow['status']) => {
    switch (status) {
      case 'Awaiting':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-[#FDF0EC] text-[#D07054] select-none">
            Awaiting
          </span>
        )
      case 'Paid':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-[#DDF4EC] text-[#00726D] select-none">
            Paid
          </span>
        )
    }
  }

  // Calculate fee breakdown for modals
  const calculateBreakdown = (rawAmount: number) => {
    const serviceCharge = Math.round(rawAmount * 0.06)
    const vat = Math.round(rawAmount * 0.075)
    const netPayout = rawAmount - serviceCharge - vat
    return {
      gross: `₦${Math.round(rawAmount).toLocaleString()}`,
      serviceCharge: `-₦${serviceCharge.toLocaleString()}`,
      vat: `-₦${vat.toLocaleString()}`,
      netPayout: `₦${Math.round(netPayout).toLocaleString()}`,
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-10 sm:px-12 gap-6 text-left">
      {/* Header Description block */}
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-2xl sm:text-[28px] font-bold text-black font-primary">
          Payment history
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Every task you've funded, with its escrow status and payment breakdown.
        </p>
      </div>

      {/* Search and Filters toolbar row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search task or lawyer"
            className="w-full h-[38px] pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
          />
        </div>

        {/* Filter button with dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 font-secondary text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer select-none"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Status{statusFilter !== 'All' ? `: ${statusFilter}` : ''}</span>
          </button>

          {showStatusDropdown && (
            <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-36 rounded-lg bg-white border border-gray-150 shadow-lg py-1 z-20">
              {['All', 'Awaiting', 'Paid'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setStatusFilter(opt)
                    setShowStatusDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer"
                >
                  <span>{opt}</span>
                  {statusFilter === opt && <Check className="w-3.5 h-3.5 text-[#00726D]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table Card container */}
      <div className="w-full bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-gray-400 select-none">
                <th className="px-6 py-4 text-left w-12">
                  <input
                    type="checkbox"
                    checked={
                      filteredPayments.length > 0 &&
                      selectedIds.length === filteredPayments.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-[#00726d] focus:ring-[#00726d] cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-left">Task</th>
                <th className="px-6 py-4 text-left">Assisting Lawyer</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-6 h-6 animate-spin text-[#00726D]" />
                      <span className="text-xs">Loading payment records...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => {
                  const isChecked = selectedIds.includes(payment.id)
                  return (
                    <tr
                      key={payment.id}
                      onClick={() => setSelectedPaymentForModal(payment)}
                      className="hover:bg-gray-50/70 transition text-sm font-normal text-[#242424] cursor-pointer"
                    >
                      {/* Checkbox cell */}
                      <td
                        className="px-6 py-4.5 text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleSelectRow(payment.id, e.target.checked)
                          }
                          className="rounded border-gray-300 text-[#00726d] focus:ring-[#00726d] cursor-pointer"
                        />
                      </td>

                      {/* Task Info cell */}
                      <td className="px-6 py-4.5 text-left">
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-semibold text-gray-900 leading-snug">
                            {payment.taskTitle}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            {payment.category}
                          </span>
                        </div>
                      </td>

                      {/* Lawyer cell */}
                      <td className="px-6 py-4.5 text-left font-medium text-gray-700">
                        {payment.lawyer}
                      </td>

                      {/* Amount cell */}
                      <td className="px-6 py-4.5 text-left font-semibold text-gray-900">
                        {payment.amount}
                      </td>

                      {/* Date cell */}
                      <td className="px-6 py-4.5 text-left text-gray-500 font-normal">
                        {payment.date}
                      </td>

                      {/* Status badge cell */}
                      <td className="px-6 py-4.5 text-left">
                        {getStatusBadge(payment.status)}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-medium text-gray-600">No payment records yet</span>
                      <span className="text-xs text-gray-400">
                        When you select and fund lawyer proposals, your escrow payments will appear here.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 select-none">
        <span className="text-xs sm:text-sm text-gray-400 font-semibold">
          {selectedIds.length} of {filteredPayments.length} row(s) selected.
        </span>

        <div className="flex items-center gap-2">
          <button className="h-[38px] px-4 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition cursor-pointer select-none">
            Previous
          </button>
          <button className="h-[38px] px-4 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition cursor-pointer select-none">
            Next
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL POPUP (Awaiting Task Completion OR Paid Breakdown)                  */}
      {/* ========================================================================= */}
      {selectedPaymentForModal && (
        <div
          onClick={() => setSelectedPaymentForModal(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl p-8 sm:p-10 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 border border-gray-150 text-left"
          >
            {/* Modal Header */}
            <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
              <h3 className="text-xl sm:text-2xl font-medium text-gray-900 leading-tight font-primary">
                {selectedPaymentForModal.status === 'Paid'
                  ? 'Payment Released'
                  : 'Funds Held in Escrow'}
              </h3>
              <span className="text-xs sm:text-sm text-gray-600 font-normal">
                {selectedPaymentForModal.taskTitle}
              </span>
            </div>

            {/* ================= CASE 1: PAID BREAKDOWN MODAL ================= */}
            {selectedPaymentForModal.status === 'Paid' ? (
              <div className="flex flex-col gap-6">
                {/* Financial Breakdown Rows */}
                {(() => {
                  const breakdown = calculateBreakdown(
                    selectedPaymentForModal.rawAmount,
                  )
                  return (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-normal">Gross Task Fee Funded</span>
                        <span className="font-semibold text-gray-900">
                          {breakdown.gross}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-normal">
                          Platform Service Charge (6.0%)
                        </span>
                        <span className="font-medium text-[#D07054]">
                          {breakdown.serviceCharge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-normal">VAT (7.5%)</span>
                        <span className="font-medium text-[#D07054]">
                          {breakdown.vat}
                        </span>
                      </div>

                      <div className="border-t border-gray-150 pt-3 flex items-center justify-between text-sm">
                        <span className="font-bold text-gray-900">
                          Net Payout to {selectedPaymentForModal.lawyer}
                        </span>
                        <span className="font-bold text-gray-900">
                          {breakdown.netPayout}
                        </span>
                      </div>
                    </div>
                  )
                })()}

                {/* Bottom Confirmation Card with Checkmark */}
                <div className="border border-gray-150 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#E5F3F1] flex items-center justify-center shadow-xs select-none">
                    <Check className="w-7 h-7 stroke-[2.5] text-[#00726D]" />
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mt-1">
                    Task Completed & Paid
                  </h4>

                  <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal max-w-md">
                    You approved the completed work for this task. Escrow funds were successfully released to {selectedPaymentForModal.lawyer}.
                  </p>
                </div>

                {/* Bottom Right Close Button */}
                <div className="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentForModal(null)}
                    className="h-10 px-8 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs select-none active:scale-[0.99]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* ================= CASE 2: AWAITING CONFIRMATION MODAL ================= */
              <div className="flex flex-col gap-6">
                {/* Center Content */}
                <div className="flex flex-col items-center text-center gap-3 pt-2">
                  <div className="w-20 h-20 rounded-full bg-[#E5F3F1] flex items-center justify-center shadow-xs select-none">
                    <span className="text-3xl" role="img" aria-label="Hourglass">
                      ⏳
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                    Awaiting Completion from {selectedPaymentForModal.lawyer}
                  </h4>

                  <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal max-w-lg">
                    Your deposit of {selectedPaymentForModal.amount} is held securely in escrow. {selectedPaymentForModal.lawyer} won't receive payment until you review and approve the completed task.
                  </p>
                </div>

                {/* Stepper Progress Indicator */}
                <div className="w-full py-4 flex items-center justify-between select-none">
                  {/* Step 1: Escrow Funded */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#00726D]" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-900 whitespace-nowrap">
                      Escrow Funded
                    </span>
                  </div>

                  <div className="h-[1.5px] flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

                  {/* Step 2: In Progress */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#D07054]" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-900 whitespace-nowrap">
                      In Progress
                    </span>
                  </div>

                  <div className="h-[1.5px] flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

                  {/* Step 3: Review & Approve */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-white" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">
                      Review & Approve
                    </span>
                  </div>

                  <div className="h-[1.5px] flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

                  {/* Step 4: Funds Released */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-white" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">
                      Paid
                    </span>
                  </div>
                </div>

                {/* Escrow Guarantee Box */}
                <div className="bg-[#f0faf9]/80 rounded-xl p-4 border border-[#00726d]/10 flex items-start gap-3 text-left">
                  <span className="w-5 h-5 bg-[#00726d] rounded-full text-white flex items-center justify-center shrink-0 mt-0.5 select-none">
                    <Lock className="w-3 h-3 stroke-[2.5]" />
                  </span>
                  <p className="text-xs text-[#00726d] font-normal leading-relaxed">
                    Escrow Protection: Funds remain safely in escrow until you verify the task deliverables.
                  </p>
                </div>

                {/* Bottom Right Close Button */}
                <div className="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentForModal(null)}
                    className="h-10 px-8 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs select-none active:scale-[0.99]"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
