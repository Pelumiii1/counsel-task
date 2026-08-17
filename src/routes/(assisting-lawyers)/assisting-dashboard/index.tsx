import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Search,
  ListFilter,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Send,
  SlidersHorizontal,
} from 'lucide-react'

export const Route = createFileRoute('/(assisting-lawyers)/assisting-dashboard/')({
  component: AssistingDashboardIndex,
})

interface AvailableTask {
  id: string
  title: string
  clientName: string
  clientFirm: string
  category: string
  court: string
  state: string
  deadline: string
  budget: string
  proposalsCount: number
  description: string
  postedTime: string
  verified: boolean
}

const AVAILABLE_TASKS: AvailableTask[] = [
  {
    id: 't-1',
    title: 'Hold Brief — Motion for Injunction Hearing',
    clientName: 'Adeola & Partners LP',
    clientFirm: 'Verified Law Firm',
    category: 'Litigation & Dispute Resolution',
    court: 'Ikeja High Court (Court 4)',
    state: 'Lagos',
    deadline: 'Tomorrow, 9:00 AM',
    budget: '₦40,000',
    proposalsCount: 4,
    description:
      'Looking for an experienced counsel to hold brief and move an unopposed motion for interlocutory injunction in Suit No. ID/4521/2026. Briefing notes and bundle are ready.',
    postedTime: '2 hours ago',
    verified: true,
  },
  {
    id: 't-2',
    title: 'Draft Statement of Defence and Counterclaim',
    clientName: 'Kazeem Lawal & Co.',
    clientFirm: 'Corporate Practice',
    category: 'Commercial Law',
    court: 'Federal High Court, Ikoyi',
    state: 'Lagos / Remote',
    deadline: 'In 3 days',
    budget: '₦120,000',
    proposalsCount: 6,
    description:
      'Need an assisting lawyer to draft a comprehensive Statement of Defence and Counterclaim in a breach of commercial contract matter. All documentary exhibits available.',
    postedTime: '4 hours ago',
    verified: true,
  },
  {
    id: 't-3',
    title: 'Court Appearance — Arraignment & Bail Application',
    clientName: 'Oluwarotimi Chambers',
    clientFirm: 'Criminal Defence Practice',
    category: 'Criminal Law',
    court: 'Yaba Magistrate Court (Court 2)',
    state: 'Lagos',
    deadline: 'Friday, 8:30 AM',
    budget: '₦50,000',
    proposalsCount: 2,
    description:
      'Counsel needed for bail representation and perfection assistance. Charge sheet and affidavit in support of bail prepared.',
    postedTime: '5 hours ago',
    verified: true,
  },
  {
    id: 't-4',
    title: 'Title Search & Due Diligence at Land Registry',
    clientName: 'Prime Crest Legal',
    clientFirm: 'Real Estate Practice',
    category: 'Property Law',
    court: 'Lagos State Lands Bureau, Alausa',
    state: 'Lagos',
    deadline: 'Next Monday',
    budget: '₦65,000',
    proposalsCount: 5,
    description:
      'Conduct official title search, obtain certified CTC of search report, and verify encumbrances at the land registry.',
    postedTime: '1 day ago',
    verified: true,
  },
  {
    id: 't-5',
    title: 'CAC Post-Incorporation Filing & Director Status Update',
    clientName: 'Apex Advisory Partners',
    clientFirm: 'Commercial Counsel',
    category: 'Corporate Practice',
    court: 'CAC Portal / Abuja',
    state: 'Abuja / Remote',
    deadline: 'In 5 days',
    budget: '₦85,000',
    proposalsCount: 3,
    description:
      'Accredited CAC agent needed to assist in filing changes in board of directors and annual returns reconciliation.',
    postedTime: '1 day ago',
    verified: true,
  },
]

function AssistingDashboardIndex() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [appliedTasks, setAppliedTasks] = useState<string[]>([])
  const [applyingTask, setApplyingTask] = useState<AvailableTask | null>(null)
  const [proposalBid, setProposalBid] = useState('')
  const [proposalCover, setProposalCover] = useState('')
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  const categories = [
    'All',
    'Litigation',
    'Commercial Law',
    'Criminal Law',
    'Property Law',
    'Corporate Practice',
  ]

  const filteredTasks = AVAILABLE_TASKS.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      task.category.toLowerCase().includes(selectedCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  const handleApplyClick = (task: AvailableTask) => {
    setApplyingTask(task)
    setProposalBid(task.budget)
    setProposalCover('')
  }

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applyingTask) return

    setAppliedTasks((prev) => [...prev, applyingTask.id])
    setApplyingTask(null)
    setShowSuccessToast(true)
    setTimeout(() => setShowSuccessToast(false), 4000)
  }

  return (
    <div className="flex flex-col w-full min-h-full pb-16">
      {/* Welcome Banner Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight">
              Welcome back, Funke!
            </h1>
            <span className="inline-flex items-center gap-1 bg-[#E8F5F3] text-[#00726D] text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#96D2CD]">
              <CheckCircle2 className="w-3 h-3" />
              Verified Assisting Counsel
            </span>
          </div>
          <p className="font-secondary text-[13px] text-gray-500 font-normal">
            Browse verified briefs and available tasks from engaging law firms across Nigeria.
          </p>
        </div>

        {/* Quick Stats pill badges */}
        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200/80 rounded-xl px-4 py-2 flex flex-col shadow-2xs">
            <span className="text-[11px] text-gray-400 font-medium uppercase">Active Briefs</span>
            <span className="text-base font-bold text-gray-900">14 Available</span>
          </div>
          <div className="bg-white border border-gray-200/80 rounded-xl px-4 py-2 flex flex-col shadow-2xs">
            <span className="text-[11px] text-gray-400 font-medium uppercase">My Proposals</span>
            <span className="text-base font-bold text-[#00726D]">{appliedTasks.length} Submitted</span>
          </div>
        </div>
      </section>

      {/* Main Browse Task Feed */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
        {/* Search & Categories Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brief by court, practice area, or keyword..."
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                <span>Jurisdiction: Lagos</span>
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer shadow-2xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
                <span>Filter Budget</span>
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#00726D] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Task Cards List */}
        <div className="flex flex-col gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => {
              const hasApplied = appliedTasks.includes(task.id)

              return (
                <div
                  key={task.id}
                  className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:border-[#00726D]/30 transition-all flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                          {task.category}
                        </span>
                        <span className="text-[11px] text-gray-400 font-normal">
                          Posted {task.postedTime}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mt-1">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span className="font-medium text-gray-700">{task.clientName}</span>
                        <span>•</span>
                        <span>{task.clientFirm}</span>
                      </div>
                    </div>

                    {/* Budget & Apply Action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="flex flex-col sm:text-right">
                        <span className="text-[11px] text-gray-400 font-medium">Task Fee</span>
                        <span className="text-lg font-bold text-[#00726D]">{task.budget}</span>
                      </div>

                      {hasApplied ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3.5 py-1.5 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Proposal Sent
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApplyClick(task)}
                          className="h-9 px-4 rounded-lg bg-[#00726D] text-white text-xs font-medium hover:bg-[#005c58] transition active:scale-[0.98] cursor-pointer shadow-2xs"
                        >
                          Submit Proposal
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {task.description}
                  </p>

                  {/* Task Meta Footer */}
                  <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{task.court}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{task.deadline}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{task.proposalsCount} lawyers submitted proposals</span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="bg-white border border-gray-150 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
              <Briefcase className="w-10 h-10 text-gray-300" />
              <h3 className="text-base font-semibold text-gray-800">No briefs found</h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm">
                No active tasks match your selected filter. Try adjusting your search or category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Proposal Modal */}
      {applyingTask && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-150 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-[#00726D] uppercase tracking-wider">
                  Submit Proposal
                </span>
                <h3 className="text-base font-bold text-gray-900">
                  {applyingTask.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {applyingTask.court} • Client budget: {applyingTask.budget}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setApplyingTask(null)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendProposal} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Your Proposed Fee (₦)
                </label>
                <input
                  type="text"
                  required
                  value={proposalBid}
                  onChange={(e) => setProposalBid(e.target.value)}
                  placeholder="e.g. ₦40,000"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 text-sm focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Cover Note / Strategy for the Engaging Lawyer
                </label>
                <textarea
                  rows={4}
                  required
                  value={proposalCover}
                  onChange={(e) => setProposalCover(e.target.value)}
                  placeholder="Introduce your relevant experience in this court/matter, availability for the date, and any specific notes..."
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setApplyingTask(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00726D] text-white text-xs font-semibold hover:bg-[#005c58] transition cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#041626] text-white px-5 py-3.5 rounded-xl shadow-xl border border-white/10 flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4.5 h-4.5 text-[#00a896]" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">Proposal Submitted!</span>
            <span className="text-[11px] text-gray-300">
              The engaging lawyer will review your application and respond shortly.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
