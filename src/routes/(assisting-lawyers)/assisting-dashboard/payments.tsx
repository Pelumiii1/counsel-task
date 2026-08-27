import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search, SlidersHorizontal, Check, Loader2, Wallet } from 'lucide-react'
import { useMyProposals } from '#/hooks/useProposals'
import { useAssistingProfile } from '#/hooks/useProfile'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/payments',
)({
  component: AssistingPaymentsPage,
})

interface PaymentRow {
  id: string
  taskTitle: string
  practiceArea: string
  client: string
  amount: string
  date: string
  status: 'Awaiting' | 'Paid'
  rawAmount: number
}

function AssistingPaymentsPage() {
  const { data: profile } = useAssistingProfile()
  const { data: proposals, isLoading } = useMyProposals()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedPaymentForModal, setSelectedPaymentForModal] =
    useState<PaymentRow | null>(null)

  const firstName = profile?.fullName?.split(' ')[0] || 'Counsel'

  // Map proposals that have been funded or completed to payment rows
  const paymentRows: PaymentRow[] = (proposals || [])
    .filter((p) => p.status === 'Selected' || p.taskStatus === 'In Progress' || p.taskStatus === 'Completed')
    .map((p) => {
      const isPaid = p.taskStatus === 'Completed'
      const raw = p.rawAmount || (p.fee ? parseFloat(p.fee.replace(/[^0-9.]/g, '')) || 35000 : 35000)
      return {
        id: String(p.id),
        taskTitle: p.taskTitle || 'Legal Representation Brief',
        practiceArea: p.practiceArea || 'Property Law',
        client: p.clientName || 'Engaging Counsel',
        amount: p.fee || `₦${raw.toLocaleString()}`,
        date: p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently',
        status: isPaid ? 'Paid' : 'Awaiting',
        rawAmount: raw,
      }
    })

  const filteredPayments = paymentRows.filter((p) => {
    const matchesSearch =
      p.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.practiceArea.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || p.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  // Calculate fee breakdown for Paid modal
  const calculateBreakdown = (rawAmount: number) => {
    const serviceCharge = Math.round(rawAmount * 0.06)
    const vat = Math.round(rawAmount * 0.075)
    const netPayout = rawAmount - serviceCharge - vat
    return {
      gross: `₦${rawAmount.toLocaleString()}`,
      serviceCharge: `-₦${serviceCharge.toLocaleString()}`,
      vat: `-₦${vat.toLocaleString()}`,
      netPayout: `₦${netPayout.toLocaleString()}`,
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full pb-20 font-secondary bg-[#f9fafb]">
      {/* Top Banner Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
          Welcome {firstName}!
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal">
          Track escrow deposits and completed payouts for briefs you have executed.
        </p>
      </section>

      {/* Main Content Section */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6 text-left">
        {/* Title & Subtitle */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-[28px] font-semibold text-gray-900 leading-tight font-primary">
            All your work &amp; payments
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Every task you've executed, with its escrow status and net lawyer payout.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search task"
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-normal text-gray-900 placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="h-10 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-medium flex items-center gap-2 transition cursor-pointer shadow-2xs select-none"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
              <span>Status{statusFilter !== 'All' ? `: ${statusFilter}` : ''}</span>
            </button>

            {showStatusDropdown && (
              <div className="absolute top-12 left-0 z-30 bg-white border border-gray-150 rounded-xl shadow-lg p-1.5 min-w-37.5 flex flex-col gap-1 text-xs">
                {['All', 'Awaiting', 'Paid'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStatusFilter(s)
                      setShowStatusDropdown(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition cursor-pointer ${statusFilter === s
                      ? 'bg-[#E5F3F1] text-[#00726D] font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Payments Data Table */}
        <div className="w-full bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.015)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-150 text-xs font-semibold text-gray-600 bg-gray-50/50">
                  <th className="py-4 px-6 font-semibold">Task</th>
                  <th className="py-4 px-6 font-semibold">Client</th>
                  <th className="py-4 px-6 font-semibold">Amount</th>
                  <th className="py-4 px-6 font-semibold">Date</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#00726D]" />
                        <span className="text-xs">Loading payments...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredPayments.length > 0 ? (
                  filteredPayments.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedPaymentForModal(item)}
                      className="hover:bg-gray-50/70 transition cursor-pointer"
                    >
                      {/* Task Column */}
                      <td className="py-4.5 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {item.taskTitle}
                          </span>
                          <span className="text-xs text-gray-400 font-normal mt-0.5">
                            {item.practiceArea}
                          </span>
                        </div>
                      </td>

                      {/* Client Column */}
                      <td className="py-4.5 px-6 text-gray-700 font-normal">
                        {item.client}
                      </td>

                      {/* Amount Column */}
                      <td className="py-4.5 px-6 font-medium text-gray-900">
                        {item.amount}
                      </td>

                      {/* Date Column */}
                      <td className="py-4.5 px-6 text-gray-700 font-normal">
                        {item.date}
                      </td>

                      {/* Status Column */}
                      <td className="py-4.5 px-6">
                        {getStatusBadge(item.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400 text-sm">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Wallet className="w-8 h-8 text-gray-300 stroke-[1.5]" />
                        <span className="font-medium text-gray-600">No payment records yet</span>
                        <span className="text-xs text-gray-400">
                          When your proposals are selected and funded by clients, your escrow payments will appear here.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Pagination Footer */}
        <div className="flex items-center justify-between pt-1 select-none text-xs sm:text-sm">
          <span className="text-gray-500 font-normal">
            {filteredPayments.length} record(s) found.
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium transition cursor-pointer shadow-2xs"
            >
              Previous
            </button>
            <button
              type="button"
              className="h-9 px-4 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-medium transition cursor-pointer shadow-2xs"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL POPUP (Awaiting Confirmation OR Paid Breakdown)                     */}
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
                  ? 'Paid'
                  : 'Awaiting Confirmation'}
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
                        <span className="text-gray-700 font-normal">Gross Task Fee</span>
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
                          Net Payout to {firstName}
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
                    <Check className="w-7 h-7 stroke-[2.5] text-black" />
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mt-1">
                    {calculateBreakdown(selectedPaymentForModal.rawAmount).netPayout} was paid to you
                  </h4>

                  <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal max-w-md">
                    {selectedPaymentForModal.client} confirmed the task is complete. Funds were released from escrow to your account.
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
                {/* Center Hourglass & Content */}
                <div className="flex flex-col items-center text-center gap-3 pt-2">
                  <div className="w-20 h-20 rounded-full bg-[#E5F3F1] flex items-center justify-center shadow-xs select-none">
                    <span className="text-3xl" role="img" aria-label="Hourglass">
                      ⏳
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                    Waiting on {selectedPaymentForModal.client}
                  </h4>

                  <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal max-w-lg">
                    Your evidence of completion has been sent. Once{' '}
                    {selectedPaymentForModal.client} confirms the task is complete,
                    your payout is released automatically.
                  </p>
                </div>

                {/* Stepper Progress Indicator */}
                <div className="w-full py-4 flex items-center justify-between select-none">
                  {/* Step 1: Task Accepted */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#00726D]" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-900 whitespace-nowrap">
                      Task Accepted
                    </span>
                  </div>

                  <div className="h-[1.5px] flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

                  {/* Step 2: Evidence Submitted */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#D07054]" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-900 whitespace-nowrap">
                      Evidence Submitted
                    </span>
                  </div>

                  <div className="h-[1.5px] flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

                  {/* Step 3: Awaiting Confirmation */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-white" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">
                      Awaiting Confirmation
                    </span>
                  </div>

                  <div className="h-[1.5px] flex-1 bg-gray-200 mx-2 sm:mx-3 -mt-6" />

                  {/* Step 4: Paid */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-white" />
                    <span className="text-[11px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">
                      Paid
                    </span>
                  </div>
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
