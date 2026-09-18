import { useAssistingProfile } from '#/hooks/useProfile'
import { useMyProposals } from '#/hooks/useProposals'
import { formatCurrency } from '#/lib/formatters'
import { createFileRoute } from '@tanstack/react-router'
import {
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/proposals',
)({
  component: MyProposalsPage,
})

interface Proposal {
  id: string
  taskId: string
  taskTitle: string
  practiceArea: string
  client: string
  feeQuoted: string
  dateSent: string
  status: 'Awaiting response' | 'Declined' | 'Selected'
  note: string
  declineReason?: string
}

function MyProposalsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [selectedProposalForModal, setSelectedProposalForModal] =
    useState<Proposal | null>(null)
  const { data: serverProposals } = useMyProposals()
  const { data: profile } = useAssistingProfile()
  const firstName = profile?.fullName?.trim().split(' ')[0] || 'Counsel'

  const proposalsList: Proposal[] =
    serverProposals && serverProposals.length > 0
      ? serverProposals.map((p) => ({
        id: String(p.id),
        taskId: String(p.taskId),
        taskTitle: p.taskTitle || 'Legal Brief',
        practiceArea: p.practiceArea || 'Property Law',
        client: p.clientName || 'Engaging Counsel',
        feeQuoted: formatCurrency(p.fee),
        dateSent: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : 'Recent',
        status: (p.status as any) || 'Awaiting response',
        note: p.quote || 'Proposal submitted for this matter.',
      }))
      : []

  const filteredProposals = proposalsList.filter((p) => {
    const matchesSearch =
      p.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.practiceArea.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'All' || p.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Proposal['status']) => {
    switch (status) {
      case 'Awaiting response':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-[#EFEFEF] text-gray-700 select-none">
            Awaiting response
          </span>
        )
      case 'Declined':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-[#FDE8E8] text-[#E05252] select-none">
            Declined
          </span>
        )
      case 'Selected':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-[#DDF4EC] text-[#00726D] select-none">
            Selected
          </span>
        )
    }
  }

  const handleRowClick = (proposal: Proposal) => {
    setSelectedProposalForModal(proposal)
  }

  return (
    <div className="flex flex-col w-full min-h-full pb-20 font-secondary">
      {/* Top Banner Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
          Welcome {firstName}!
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal">
          What action are you taking today
        </p>
      </section>

      {/* Main Content Section */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
        {/* Title & Subtitle */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-[28px] font-semibold text-gray-900 leading-tight font-primary">
            All proposals sent
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-normal">
            Every proposal you've submitted, with its current status. Click a row for the full detail
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
              <div className="absolute top-12 left-0 z-30 bg-white border border-gray-150 rounded-xl shadow-lg p-1.5 min-w-42.5 flex flex-col gap-1 text-xs">
                {['All', 'Awaiting response', 'Selected', 'Declined'].map((s) => (
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

        {/* Proposals Data Table */}
        <div className="w-full bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.015)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-150 text-xs font-semibold text-gray-600 bg-gray-50/50">
                  <th className="py-4 px-6 font-semibold">Task</th>
                  <th className="py-4 px-6 font-semibold">Client</th>
                  <th className="py-4 px-6 font-semibold">Fee Quoted</th>
                  <th className="py-4 px-6 font-semibold">Date Sent</th>
                  <th className="py-4 px-6 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleRowClick(item)}
                      className="hover:bg-gray-50/70 transition cursor-pointer"
                    >
                      {/* Task Column */}
                      <td className="py-4.5 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">
                            {item.taskTitle}
                          </span>
                          <span className="text-[11px] text-gray-500 font-normal mt-0.5">
                            {item.practiceArea}
                          </span>
                        </div>
                      </td>

                      {/* Client Column */}
                      <td className="py-4.5 px-6 text-gray-700 font-normal">
                        {item.client}
                      </td>

                      {/* Fee Quoted Column */}
                      <td className="py-4.5 px-6 font-medium text-[#00726D] font-primary">
                        {item.feeQuoted}
                      </td>

                      {/* Date Sent Column */}
                      <td className="py-4.5 px-6 text-gray-500 font-normal">
                        {item.dateSent}
                      </td>

                      {/* Status Column */}
                      <td className="py-4.5 px-6">
                        {getStatusBadge(item.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 px-6 text-center text-gray-500">
                      No proposals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Selected Proposal Detail Modal */}
      {selectedProposalForModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl p-8 border border-gray-150 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-gray-900 leading-tight font-primary">
                  {selectedProposalForModal.taskTitle}
                </h3>
                <span className="text-xs text-gray-500 font-normal">
                  {selectedProposalForModal.practiceArea} • Client: {selectedProposalForModal.client}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProposalForModal(null)}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-y border-gray-100 py-3">
                <span className="text-xs font-semibold text-gray-500">
                  Fee Quoted
                </span>
                <span className="text-base font-bold text-[#00726D] font-primary">
                  {selectedProposalForModal.feeQuoted}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-gray-500">
                  Your Cover Note
                </span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-150">
                  "{selectedProposalForModal.note}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-gray-500">Status</span>
                <div>{getStatusBadge(selectedProposalForModal.status)}</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedProposalForModal(null)}
                className="h-10 px-6 rounded-xl bg-[#00726D] text-white text-xs sm:text-sm font-semibold hover:bg-[#005c58] transition cursor-pointer shadow-xs"
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
