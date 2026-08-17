import { createFileRoute } from '@tanstack/react-router'
import { Wallet, ArrowDownLeft, ShieldCheck, CheckCircle2, Building } from 'lucide-react'

export const Route = createFileRoute('/(assisting-lawyers)/assisting-dashboard/payments')({
  component: AssistingPaymentsPage,
})

const TRANSACTIONS = [
  {
    id: 'tx-1',
    task: 'Hold Brief — Bail Hearing (Yaba Magistrate Court)',
    client: 'Oluwarotimi Chambers',
    amount: '₦45,000',
    date: '14 Aug 2026',
    status: 'Released to Bank',
  },
  {
    id: 'tx-2',
    task: 'Draft Statement of Defence (Federal High Court)',
    client: 'Kazeem Lawal & Co.',
    amount: '₦120,000',
    date: '12 Aug 2026',
    status: 'In Escrow',
  },
]

function AssistingPaymentsPage() {
  return (
    <div className="flex flex-col w-full min-h-full pb-16">
      {/* Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight">
          Payments & Escrow Earnings
        </h1>
        <p className="font-secondary text-[13px] text-gray-500 font-normal">
          Track completed brief earnings, active escrow guarantees, and withdrawal bank accounts.
        </p>
      </section>

      {/* Main Content */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
        {/* Balances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Available Balance */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-2xs flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Available for Withdrawal
              </span>
              <Wallet className="w-5 h-5 text-[#00726D]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">₦45,000.00</span>
              <span className="text-xs text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Direct Bank Transfer Ready
              </span>
            </div>
            <button
              type="button"
              className="h-10 w-full rounded-xl bg-[#00726D] text-white text-xs font-semibold hover:bg-[#005c58] transition cursor-pointer shadow-2xs"
            >
              Withdraw to Bank
            </button>
          </div>

          {/* Card 2: Escrow Locked */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-2xs flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Locked in Escrow
              </span>
              <ShieldCheck className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">₦120,000.00</span>
              <span className="text-xs text-gray-500 mt-1">1 active milestone in progress</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-[11px] text-amber-800">
              Released upon engaging lawyer sign-off.
            </div>
          </div>

          {/* Card 3: Payout Account */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-2xs flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Settlement Account
              </span>
              <Building className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-900">Guaranty Trust Bank</span>
              <span className="text-xs text-gray-500 mt-0.5">0123456789 • Funke Akindele</span>
            </div>
            <button
              type="button"
              className="h-10 w-full rounded-xl border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 transition cursor-pointer"
            >
              Update Bank Details
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ArrowDownLeft className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{tx.task}</span>
                    <span className="text-xs text-gray-400">Client: {tx.client} • {tx.date}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="text-sm font-bold text-gray-900">{tx.amount}</span>
                  <span
                    className={`text-xs font-medium ${
                      tx.status === 'Released to Bank' ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
