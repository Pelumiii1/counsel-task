import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Search,
  SlidersHorizontal,
  Eye,
  X,
  Check,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { apiClient } from '#/lib/apiClient'

export const Route = createFileRoute('/(admin)/admin-dashboard/finance')({
  component: AdminFinancePage,
})

type FinanceTab = 'transactions' | 'payouts' | 'settings'

interface TransactionItem {
  id: string
  task: string
  engagingLawyer: string
  assistingLawyer: string
  amount: string
  platformFee: string
  lawyerEarnings: string
  date: string
  status: 'Completed' | 'Pending' | string
  reference?: string
}

interface PayoutItem {
  id: string
  rawId?: number
  lawyer: string
  task: string
  amount: string
  status: 'Paid' | 'Pending' | 'Processing' | 'Failed' | string
  requested: string
  paidOn: string
  bankName?: string
  accountNumber?: string
  accountName?: string
  reference?: string
}

interface FinanceSettings {
  platformFeePercentage: number
  vatPercentage: number
  currency: string
  lastUpdated: string
}

function PayoutStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Paid: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
    Pending: 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    Processing: 'bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]',
    Failed: 'bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
        styles[status] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {status}
    </span>
  )
}

function AdminFinancePage() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<FinanceTab>('transactions')

  // ── 1. Transactions Queries ──
  const { data: transactions = [], isFetching: isFetchingTrx } = useQuery<TransactionItem[]>({
    queryKey: ['admin', 'finance', 'transactions'],
    queryFn: async () => {
      const res = await apiClient.get<TransactionItem[]>('/admin/finance/transactions')
      return res.data
    },
  })

  // Transactions filters & selection
  const [trxSearch, setTrxSearch] = useState('')
  const [trxStatusFilter, setTrxStatusFilter] = useState('All')
  const [selectedTrx, setSelectedTrx] = useState<TransactionItem | null>(null)

  // ── 2. Payouts Queries & Mutations ──
  const { data: payouts = [], isFetching: isFetchingPayouts } = useQuery<PayoutItem[]>({
    queryKey: ['admin', 'finance', 'payouts'],
    queryFn: async () => {
      const res = await apiClient.get<PayoutItem[]>('/admin/finance/payouts')
      return res.data
    },
  })

  const [payoutSearch, setPayoutSearch] = useState('')
  const [payoutStatusFilter, setPayoutStatusFilter] = useState('All')
  const [selectedPayout, setSelectedPayout] = useState<PayoutItem | null>(null)

  const payoutStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string | number; status: string }) => {
      const res = await apiClient.patch(`/admin/finance/payouts/${id}/status`, { status })
      return res.data
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Payout status updated successfully')
      queryClient.invalidateQueries({ queryKey: ['admin', 'finance', 'payouts'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'overview'] })
      setSelectedPayout(null)
    },
    onError: () => {
      toast.error('Failed to update payout status')
    },
  })

  // ── 3. Platform Settings Queries & Mutations ──
  const { data: settings } = useQuery<FinanceSettings>({
    queryKey: ['admin', 'finance', 'settings'],
    queryFn: async () => {
      const res = await apiClient.get<FinanceSettings>('/admin/finance/settings')
      return res.data
    },
  })

  const [platformFee, setPlatformFee] = useState<string>('10')
  const [vat, setVat] = useState<string>('7.5')
  const [currency] = useState('NGN (₦)')

  // Sync settings when loaded
  useMemo(() => {
    if (settings) {
      setPlatformFee(String(settings.platformFeePercentage))
      setVat(String(settings.vatPercentage))
    }
  }, [settings])

  const settingsMutation = useMutation({
    mutationFn: async (payload: { platformFeePercentage: number; vatPercentage: number; currency: string }) => {
      const res = await apiClient.put<FinanceSettings>('/admin/finance/settings', payload)
      return res.data
    },
    onSuccess: () => {
      toast.success('Platform settings updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['admin', 'finance', 'settings'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'finance', 'transactions'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'overview'] })
    },
    onError: () => {
      toast.error('Failed to update platform settings')
    },
  })

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch =
        item.id?.toLowerCase().includes(trxSearch.toLowerCase()) ||
        item.task?.toLowerCase().includes(trxSearch.toLowerCase()) ||
        item.engagingLawyer?.toLowerCase().includes(trxSearch.toLowerCase()) ||
        item.assistingLawyer?.toLowerCase().includes(trxSearch.toLowerCase())

      const matchesStatus =
        trxStatusFilter === 'All' || item.status === trxStatusFilter

      return matchesSearch && matchesStatus
    })
  }, [transactions, trxSearch, trxStatusFilter])

  const filteredPayouts = useMemo(() => {
    return payouts.filter((item) => {
      const matchesSearch =
        item.id?.toLowerCase().includes(payoutSearch.toLowerCase()) ||
        item.lawyer?.toLowerCase().includes(payoutSearch.toLowerCase()) ||
        item.task?.toLowerCase().includes(payoutSearch.toLowerCase())

      const matchesStatus =
        payoutStatusFilter === 'All' || item.status === payoutStatusFilter

      return matchesSearch && matchesStatus
    })
  }, [payouts, payoutSearch, payoutStatusFilter])

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    settingsMutation.mutate({
      platformFeePercentage: parseFloat(platformFee) || 10,
      vatPercentage: parseFloat(vat) || 7.5,
      currency: currency,
    })
  }

  return (
    <div className="space-y-6">
      {/* ── Section Title ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-medium text-[#101828] tracking-tight">
            Finance
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#475467]">
            Monitor all financial activities across the platform.
          </p>
        </div>

        {(isFetchingTrx || isFetchingPayouts) && (
          <div className="flex items-center gap-2 text-xs text-[#00726D] bg-[#E8F7F5] px-3 py-1.5 rounded-lg w-fit">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Syncing financial records...</span>
          </div>
        )}
      </div>

      {/* ── Segmented Navigation Pills ── */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveTab('transactions')}
          className={`h-11 px-7 rounded-full text-xs sm:text-sm font-medium transition duration-150 cursor-pointer ${
            activeTab === 'transactions'
              ? 'bg-[#031625] text-white shadow-xs'
              : 'bg-[#E8ECEF] text-gray-700 hover:bg-[#dfe4e8]'
          }`}
        >
          Transactions
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('payouts')}
          className={`h-11 px-7 rounded-full text-xs sm:text-sm font-medium transition duration-150 cursor-pointer ${
            activeTab === 'payouts'
              ? 'bg-[#031625] text-white shadow-xs'
              : 'bg-[#E8ECEF] text-gray-700 hover:bg-[#dfe4e8]'
          }`}
        >
          Payouts
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`h-11 px-7 rounded-full text-xs sm:text-sm font-medium transition duration-150 cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#031625] text-white shadow-xs'
              : 'bg-[#E8ECEF] text-gray-700 hover:bg-[#dfe4e8]'
          }`}
        >
          Platform Settings
        </button>
      </div>

      {/* ── 1. Transactions Tab View ── */}
      {activeTab === 'transactions' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={trxSearch}
                onChange={(e) => setTrxSearch(e.target.value)}
                placeholder="Search Transactions"
                className="w-full h-10 pl-9.5 pr-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
              />
              {trxSearch && (
                <button
                  onClick={() => setTrxSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={trxStatusFilter}
                onChange={(e) => setTrxStatusFilter(e.target.value)}
                className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
              >
                <option value="All">Status: All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Transactions Table Card */}
          <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                    <th className="py-4 px-6">Transaction ID</th>
                    <th className="py-4 px-6">Task</th>
                    <th className="py-4 px-6">Engaging Lawyer</th>
                    <th className="py-4 px-6">Assisting Lawyer</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Platform Fee</th>
                    <th className="py-4 px-6">Lawyer Earnings</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-gray-400">
                        No transactions found in the database.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((trx) => (
                      <tr
                        key={trx.id}
                        className="hover:bg-gray-50/70 transition"
                      >
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {trx.id}
                        </td>
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {trx.task}
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {trx.engagingLawyer}
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {trx.assistingLawyer}
                        </td>
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {trx.amount}
                        </td>
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {trx.platformFee}
                        </td>
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {trx.lawyerEarnings}
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {trx.date}
                        </td>
                        <td className="py-4 px-6">
                          <button
                            type="button"
                            onClick={() => setSelectedTrx(trx)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer shadow-2xs"
                          >
                            <span>View</span>
                            <Eye className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 text-xs sm:text-sm text-gray-500">
              <span>0 of {filteredTransactions.length} row(s) selected.</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Payouts Tab View ── */}
      {activeTab === 'payouts' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={payoutSearch}
                onChange={(e) => setPayoutSearch(e.target.value)}
                placeholder="Search Payouts"
                className="w-full h-10 pl-9.5 pr-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
              />
              {payoutSearch && (
                <button
                  onClick={() => setPayoutSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={payoutStatusFilter}
                onChange={(e) => setPayoutStatusFilter(e.target.value)}
                className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
              >
                <option value="All">Status: All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Failed">Failed</option>
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Payouts Table Card */}
          <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                    <th className="py-4 px-6">Payout ID</th>
                    <th className="py-4 px-6">Lawyer</th>
                    <th className="py-4 px-6">Task</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Requested</th>
                    <th className="py-4 px-6">Paid On</th>
                    <th className="py-4 px-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
                  {filteredPayouts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-400">
                        No payout requests found in the database.
                      </td>
                    </tr>
                  ) : (
                    filteredPayouts.map((payout) => (
                      <tr
                        key={payout.id}
                        className="hover:bg-gray-50/70 transition"
                      >
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {payout.id}
                        </td>
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {payout.lawyer}
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {payout.task}
                        </td>
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {payout.amount}
                        </td>
                        <td className="py-4 px-6">
                          <PayoutStatusBadge status={payout.status} />
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {payout.requested}
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {payout.paidOn}
                        </td>
                        <td className="py-4 px-6">
                          <button
                            type="button"
                            onClick={() => setSelectedPayout(payout)}
                            className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer shadow-2xs"
                          >
                            <span>View</span>
                            <Eye className="w-3.5 h-3.5 text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 text-xs sm:text-sm text-gray-500">
              <span>0 of {filteredPayouts.length} row(s) selected.</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Platform Settings Tab View ── */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <form
            onSubmit={handleSaveSettings}
            className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-xs max-w-4xl space-y-6"
          >
            <div className="border-b border-gray-100 pb-5">
              <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
                Platform Financial Configuration
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] mt-1">
                Configure commission rates, standard fees, and platform payout defaults.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Platform Fee */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-medium text-[#344054]">
                  Platform Commission Fee (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(e.target.value)}
                  placeholder="10"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] shadow-2xs transition"
                />
                <span className="text-[11px] text-[#667085]">
                  Deducted automatically from assisting lawyer earnings upon task completion.
                </span>
              </div>

              {/* VAT */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-medium text-[#344054]">
                  Standard Value Added Tax (VAT %)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={vat}
                  onChange={(e) => setVat(e.target.value)}
                  placeholder="7.5"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] shadow-2xs transition"
                />
                <span className="text-[11px] text-[#667085]">
                  Applicable statutory tax rate for platform services.
                </span>
              </div>

              {/* Currency */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-medium text-[#344054]">
                  Default Currency
                </label>
                <input
                  type="text"
                  disabled
                  value={currency}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 cursor-not-allowed shadow-2xs"
                />
              </div>

              {/* Last Updated */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-medium text-[#344054]">
                  Last Configuration Sync
                </label>
                <input
                  type="text"
                  disabled
                  value={settings?.lastUpdated || '25 Aug 2026'}
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 cursor-not-allowed shadow-2xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setPlatformFee('10')
                  setVat('7.5')
                }}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
              >
                Reset to Defaults
              </button>
              <button
                type="submit"
                disabled={settingsMutation.isPending}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-medium shadow-xs transition cursor-pointer active:scale-[0.99] disabled:opacity-50"
              >
                {settingsMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Transaction Details Modal ── */}
      {selectedTrx && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-8 max-w-xl w-full shadow-2xl border border-gray-100/80 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Top Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#101828] tracking-tight">
                  Transaction Details
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] font-normal mt-0.5">
                  Reference: {selectedTrx.reference || selectedTrx.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTrx(null)}
                className="text-gray-400 hover:text-gray-600 transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2-column Grid */}
            <div className="mt-8 grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div>
                <span className="text-xs text-[#667085] block mb-1">Transaction ID</span>
                <span className="text-sm font-semibold text-[#101828] block">
                  {selectedTrx.id}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Task Title</span>
                <span className="text-sm font-medium text-[#101828] block truncate">
                  {selectedTrx.task}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Engaging Lawyer</span>
                <span className="text-sm font-normal text-[#101828] block">
                  {selectedTrx.engagingLawyer}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Assisting Lawyer</span>
                <span className="text-sm font-normal text-[#101828] block">
                  {selectedTrx.assistingLawyer}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Total Budget</span>
                <span className="text-sm font-bold text-[#101828] block">
                  {selectedTrx.amount}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Platform Commission</span>
                <span className="text-sm font-medium text-[#00726D] block">
                  {selectedTrx.platformFee}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Lawyer Earnings (Net)</span>
                <span className="text-sm font-bold text-[#101828] block">
                  {selectedTrx.lawyerEarnings}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Payment Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#E8F7F5] text-[#00726D]">
                  {selectedTrx.status || 'Completed'}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Transaction Date</span>
                <span className="text-sm font-normal text-[#101828] block">
                  {selectedTrx.date}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedTrx(null)}
                className="inline-flex items-center justify-center rounded-xl bg-[#00726D] px-8 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-[#005c58] active:scale-[0.99] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Payout Details Modal ── */}
      {selectedPayout && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-8 max-w-xl w-full shadow-2xl border border-gray-100/80 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Top Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-[#101828] tracking-tight">
                  Payout Details
                </h3>
                <p className="text-xs sm:text-sm text-[#475467] font-normal mt-0.5">
                  Payout Request #{selectedPayout.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                className="text-gray-400 hover:text-gray-600 transition p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2-column Grid */}
            <div className="mt-8 grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div>
                <span className="text-xs text-[#667085] block mb-1">Beneficiary Lawyer</span>
                <span className="text-sm font-semibold text-[#101828] block">
                  {selectedPayout.lawyer}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Payout Amount</span>
                <span className="text-base font-bold text-[#00726D] block">
                  {selectedPayout.amount}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Task Associated</span>
                <span className="text-sm font-medium text-[#101828] block truncate">
                  {selectedPayout.task}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Payout Status</span>
                <PayoutStatusBadge status={selectedPayout.status} />
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Bank Name</span>
                <span className="text-sm font-normal text-[#101828] block">
                  {selectedPayout.bankName || 'Guaranty Trust Bank'}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Account Number</span>
                <span className="text-sm font-mono font-medium text-[#101828] block">
                  {selectedPayout.accountNumber || '0123456789'}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Requested On</span>
                <span className="text-sm font-normal text-[#101828] block">
                  {selectedPayout.requested}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Paid Date</span>
                <span className="text-sm font-normal text-[#101828] block">
                  {selectedPayout.paidOn}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              {selectedPayout.status !== 'Paid' && (
                <button
                  type="button"
                  disabled={payoutStatusMutation.isPending}
                  onClick={() =>
                    payoutStatusMutation.mutate({
                      id: selectedPayout.rawId || selectedPayout.id,
                      status: 'Paid',
                    })
                  }
                  className="inline-flex items-center justify-center rounded-xl bg-[#00726D] px-6 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-[#005c58] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                >
                  {payoutStatusMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Approve & Mark Paid'
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedPayout(null)}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
