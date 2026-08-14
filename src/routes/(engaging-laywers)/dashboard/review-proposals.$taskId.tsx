import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '#/components/ui/dialog'

export const Route = createFileRoute(
  '/(engaging-laywers)/dashboard/review-proposals/$taskId',
)({
  component: ReviewProposalsPage,
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
}

interface Lawyer {
  id: string
  name: string
  initials: string
  practiceArea: string
  experience: string
  location: string
  rating: number
  tasksCount: number
  quote: string
  badges: string[]
  fee: string
  about: string
}

const LAWYERS: Lawyer[] = [
  {
    id: 'FA',
    name: 'Funke Adeyemi',
    initials: 'FA',
    practiceArea: 'Property Law',
    experience: '8 years practice',
    location: 'Ikeja, Lagos',
    rating: 4.9,
    tasksCount: 32,
    quote:
      "I'm based five minutes from Ikeja High Court and available all morning tomorrow. I've handled 14 land dispute matters this year.",
    badges: ['Available Tomorrow', '12 Property Law Tasks'],
    fee: '₦35,000',
    about:
      'Called to bar in 2018. Focused on property and land dispute matters across Lagos State courts. Based five minutes from Ikeja High Court, available for short-notice hearings most weekdays.',
  },
  {
    id: 'TO',
    name: 'Tunde Okafor',
    initials: 'TO',
    practiceArea: 'Property Law',
    experience: '5 years practice',
    location: 'Yaba, Lagos',
    rating: 4.9,
    tasksCount: 32,
    quote:
      'Available and can be at the court by 8:30am. Happy to share a brief summary note after the hearing.',
    badges: ['Available Tomorrow', '6 Property Law Tasks'],
    fee: '₦32,000',
    about:
      'Called to bar in 2021. Specializes in commercial litigation, property transactions, and dispute resolution. Prompt, analytical, and highly accessible for court appearances.',
  },
  {
    id: 'CB',
    name: 'Chiamaka Bello',
    initials: 'CB',
    practiceArea: 'Property & Commercial Law',
    experience: '11 years practice',
    location: 'Ikeja, Lagos',
    rating: 5.0,
    tasksCount: 61,
    quote:
      'Senior counsel with extensive land matter experience. Available tomorrow, can also assist with the follow-up filing if needed.',
    badges: ['Available Tomorrow', '29 Property Law Tasks'],
    fee: '₦40,000',
    about:
      'Called to bar in 2015. Highly seasoned advocate with vast expertise in complex real estate acquisitions, landlord-tenant disputes, and corporate representation.',
  },
]

function ReviewProposalsPage() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const [selectedLawyerId, setSelectedLawyerId] = useState<string>('FA')
  const [activeProfileLawyer, setActiveProfileLawyer] = useState<Lawyer | null>(
    null,
  )

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

  const handleFundTask = () => {
    if (!task) return

    navigate({
      to: `/dashboard/fund-task/${task.id}`,
      search: {
        lawyerId: selectedLawyerId,
      },
    })
  }

  if (!task) {
    return (
      <div className="p-8 text-center font-secondary">
        <p className="text-gray-500">Loading task details...</p>
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

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-8 sm:px-12">
      {/* Top Navigation & Header */}
      <div className="flex flex-col gap-3 select-none mb-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-150 hover:text-gray-900 transition duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </Link>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 leading-tight font-primary">
          Review proposals
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-2xl">
          {LAWYERS.length} verified lawyers have applied. Compare their fee,
          experience, and availability before selecting one.
        </p>
      </div>

      {/* Task Summary Card */}
      <div className="w-full bg-white border border-gray-150 rounded-xl p-5 mb-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
            {task.title}
          </h2>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 font-normal">
            <span>{task.court}</span>
            <span className="text-gray-300">•</span>
            <span>{task.deadline}</span>
            <span className="text-gray-300">•</span>
            <span>{task.category}</span>
          </div>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-0.5 sm:text-right shrink-0">
          <span className="text-lg sm:text-xl font-bold text-[#00726d] font-primary">
            {task.budget}
          </span>
          <span className="text-[14px] tracking-wider text-[#595959] font-normal uppercase">
            Proposed Fee
          </span>
        </div>
      </div>

      {/* Lawyers Proposals List */}
      <div className="flex flex-col gap-5 mb-8">
        {LAWYERS.map((lawyer) => {
          const isSelected = selectedLawyerId === lawyer.id
          return (
            <div
              key={lawyer.id}
              className={`w-full bg-white rounded-xl border p-5 transition-all duration-350 flex flex-col md:flex-row justify-between items-start gap-5 ${
                isSelected
                  ? 'border-[#00726d] ring-1 ring-[#00726d]/20 shadow-[0_6px_25px_rgba(0,114,109,0.04)] bg-[#00726d]/0.5'
                  : 'border-gray-150 hover:border-gray-300 hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)]'
              }`}
            >
              {/* Left Side: Avatar & Details */}
              <div className="flex items-start gap-4 flex-1">
                {/* Initials Avatar */}
                <div className="w-11 h-11 rounded-full bg-[#005e5a] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 select-none font-secondary">
                  {lawyer.initials}
                </div>

                {/* Details Column */}
                <div className="flex flex-col items-start">
                  <h3 className="text-base font-bold text-gray-900 leading-tight font-primary">
                    {lawyer.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-normal mt-1 leading-normal">
                    {lawyer.practiceArea} • {lawyer.experience} •{' '}
                    {lawyer.location}
                  </p>

                  {/* Rating Stars Row */}
                  <div className="flex items-center gap-1 mt-2.5 select-none">
                    <span className="text-[#00726d] text-sm flex items-center tracking-wider">
                      ★★★★★
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium ml-1.5">
                      {lawyer.rating} ({lawyer.tasksCount} tasks)
                    </span>
                  </div>

                  {/* Pitch Quote */}
                  <p className="text-xs text-gray-600 font-normal italic leading-relaxed mt-3.5 bg-gray-50/50 p-3 rounded-lg border border-gray-100 max-w-xl">
                    "{lawyer.quote}"
                  </p>

                  {/* Badges Pill Row */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {lawyer.badges.map((badge) => (
                      <span
                        key={badge}
                        className="inline-flex text-[10px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-150/40"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-5 w-full lg:w-fit">
                    <button
                      onClick={() => setActiveProfileLawyer(lawyer)}
                      className="flex-1 inline-flex h-9 items-center justify-center rounded-lg border border-gray-200 px-3 lg:px-4 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                    >
                      View Profile
                    </button>
                    {isSelected ? (
                      <button className="flex-1 inline-flex h-9 items-center justify-center rounded-lg bg-[#00726d] px-3 text-xs font-semibold text-white transition hover:bg-[#005c58] cursor-pointer whitespace-nowrap">
                        Selected
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedLawyerId(lawyer.id)}
                        className="flex-1 inline-flex h-9 items-center justify-center rounded-lg border border-[#00726d] px-3 text-xs font-semibold text-[#00726d] transition hover:bg-[#00726d]/5 cursor-pointer whitespace-nowrap"
                      >
                        Select
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Quote Fee & Actions for larger screens */}
              <div className="hidden md:flex flex-col items-end justify-between self-stretch shrink-0 text-right min-h-35">
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[20px] font-medium text-[#00726D] leading-tight font-primary">
                    {lawyer.fee}
                  </span>
                  <span className="text-[12px] text-black font-normal uppercase tracking-wider font-secondary">
                    Quoted Fee
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Sticky-like Action Footer */}
      <div className="flex justify-end pt-4 border-t border-gray-100 select-none">
        <button
          onClick={handleFundTask}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-semibold text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer shadow-sm"
        >
          Fund This Task
        </button>
      </div>

      {/* Profile Detail Dialog Modal */}
      <Dialog
        open={!!activeProfileLawyer}
        onOpenChange={(open) => {
          if (!open) setActiveProfileLawyer(null)
        }}
      >
        {activeProfileLawyer && (
          <DialogContent
            showCloseButton={false}
            className="sm:max-w-md bg-white rounded-3xl border-0 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-6"
          >
            {/* Header info */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#005e5a] text-white flex items-center justify-center font-bold text-sm shrink-0 select-none font-secondary">
                {activeProfileLawyer.initials}
              </div>
              <div className="flex flex-col items-start text-left">
                <DialogTitle className="text-xl font-bold text-gray-900 leading-tight font-primary">
                  {activeProfileLawyer.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-500 font-normal mt-0.5 leading-normal">
                  {activeProfileLawyer.practiceArea} •{' '}
                  {activeProfileLawyer.experience} •{' '}
                  {activeProfileLawyer.location}
                </DialogDescription>
              </div>
            </div>

            {/* Quick stats grid boxes */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#eef8f8] rounded-xl py-4 px-3 flex flex-col items-center justify-center gap-1 select-none">
                <span className="text-xl sm:text-2xl font-bold text-[#00726d] leading-none font-secondary">
                  {activeProfileLawyer.rating}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#00726d]/80 uppercase tracking-wider font-secondary">
                  Rating
                </span>
              </div>

              <div className="bg-[#eef8f8] rounded-xl py-4 px-3 flex flex-col items-center justify-center gap-1 select-none">
                <span className="text-xl sm:text-2xl font-bold text-[#00726d] leading-none font-secondary">
                  {activeProfileLawyer.tasksCount}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#00726d]/80 uppercase tracking-wider font-secondary">
                  Task Done
                </span>
              </div>

              <div className="bg-[#eef8f8] rounded-xl py-4 px-3 flex flex-col items-center justify-center gap-1 select-none font-secondary">
                <span className="text-xl sm:text-2xl font-bold text-[#00726d] leading-none">
                  {activeProfileLawyer.experience.split(' ')[0]} yrs
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-[#00726d]/80 uppercase tracking-wider">
                  Practice
                </span>
              </div>
            </div>

            {/* About text segment */}
            <div className="flex flex-col items-start gap-2.5 text-left">
              <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase select-none font-secondary">
                About
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed font-normal">
                {activeProfileLawyer.about}
              </p>
            </div>

            {/* Modal footer closing trigger */}
            <div className="flex justify-end mt-2 select-none">
              <button
                onClick={() => setActiveProfileLawyer(null)}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#00726d] px-6 font-secondary text-sm font-semibold text-white transition hover:bg-[#005c58] active:scale-[0.98] cursor-pointer"
              >
                Close
              </button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
