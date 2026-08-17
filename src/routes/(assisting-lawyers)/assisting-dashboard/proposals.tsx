import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2, Clock, FileText, MessageSquare, AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/(assisting-lawyers)/assisting-dashboard/proposals')({
  component: MyProposalsPage,
})

interface Proposal {
  id: string
  taskTitle: string
  clientName: string
  court: string
  proposedFee: string
  submittedDate: string
  status: 'Under Review' | 'Accepted' | 'Completed' | 'Declined'
}

const MY_PROPOSALS: Proposal[] = [
  {
    id: 'p-1',
    taskTitle: 'Hold Brief — Motion for Injunction Hearing',
    clientName: 'Adeola & Partners LP',
    court: 'Ikeja High Court',
    proposedFee: '₦40,000',
    submittedDate: 'Today, 10:15 AM',
    status: 'Under Review',
  },
  {
    id: 'p-2',
    taskTitle: 'Draft Statement of Defence',
    clientName: 'Kazeem Lawal & Co.',
    court: 'Federal High Court, Ikoyi',
    proposedFee: '₦120,000',
    submittedDate: 'Yesterday',
    status: 'Accepted',
  },
  {
    id: 'p-3',
    taskTitle: 'Court Appearance — Bail Hearing',
    clientName: 'Oluwarotimi Chambers',
    court: 'Yaba Magistrate Court',
    proposedFee: '₦45,000',
    submittedDate: '3 days ago',
    status: 'Completed',
  },
]

function MyProposalsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Under Review' | 'Accepted' | 'Completed'>('All')

  const filteredProposals = MY_PROPOSALS.filter((p) => {
    if (activeTab === 'All') return true
    return p.status === activeTab
  })

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Declined':
        return 'bg-rose-50 text-rose-700 border-rose-200'
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full pb-16">
      {/* Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight">
          My Proposals
        </h1>
        <p className="font-secondary text-[13px] text-gray-500 font-normal">
          Track the status of all briefs and task proposals you have submitted.
        </p>
      </section>

      {/* Content */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
          {(['All', 'Under Review', 'Accepted', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#00726D] text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Proposals List */}
        <div className="flex flex-col gap-3">
          {filteredProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white border border-gray-150 rounded-2xl p-5 shadow-2xs hover:border-[#00726D]/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E8F5F3] text-[#00726D] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm sm:text-base font-semibold text-gray-900">
                    {proposal.taskTitle}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Engaging Lawyer: <strong className="text-gray-700">{proposal.clientName}</strong></span>
                    <span>•</span>
                    <span>{proposal.court}</span>
                  </div>
                  <span className="text-[11px] text-gray-400 mt-1">Submitted {proposal.submittedDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                <div className="flex flex-col sm:text-right">
                  <span className="text-[11px] text-gray-400">Proposed Fee</span>
                  <span className="text-sm font-bold text-[#00726D]">{proposal.proposedFee}</span>
                </div>

                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                    proposal.status,
                  )}`}
                >
                  {proposal.status}
                </span>

                {proposal.status === 'Accepted' && (
                  <Link
                    to="/assisting-dashboard/messages"
                    className="inline-flex items-center gap-1 text-xs font-medium text-white bg-[#00726D] hover:bg-[#005c58] px-3.5 py-1.5 rounded-lg transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Open Chat
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
