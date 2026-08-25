import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  RotateCcw,
  RotateCw,
  Hourglass,
} from 'lucide-react'
import { useTaskById } from '#/hooks/useTasks'
import { useCreateProposal } from '#/hooks/useProposals'
import { useAssistingProfile } from '#/hooks/useProfile'
import { useRegistrationStore } from '#/store/useRegistrationStore'
import { formatCurrency } from '#/lib/formatters'

export const Route = createFileRoute(
  '/(assisting-lawyers)/assisting-dashboard/apply/$taskId',
)({
  component: SubmitProposalPage,
})

function SubmitProposalPage() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const { data: serverTask } = useTaskById(taskId)
  const { mutate: createProposal } = useCreateProposal(taskId)
  const { data: profile } = useAssistingProfile()
  const regFullName = useRegistrationStore((state) => state.fullName)
  const regCallToBar = useRegistrationStore((state) => state.callToBarDate)

  const lawyerFullName = profile?.fullName?.trim() || regFullName?.trim() || 'Funke Akindele'
  const lawyerFirstName = lawyerFullName.split(' ')[0] || 'Counsel'

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'FA'
  }
  const initials = getInitials(lawyerFullName)

  const calculateYearsOfPractice = (callToBar?: string) => {
    if (!callToBar) return '8'
    const match = callToBar.match(/\b(19\d\d|20\d\d)\b/)
    if (match) {
      const year = parseInt(match[1], 10)
      const currentYear = new Date().getFullYear()
      const diff = currentYear - year
      return diff > 0 ? `${diff}` : '1'
    }
    return '8'
  }

  const yearsOfPractice = calculateYearsOfPractice(profile?.callToBarDate || regCallToBar)
  const practiceAreaLabel =
    profile?.practiceAreas && profile.practiceAreas.length > 0
      ? profile.practiceAreas.slice(0, 2).join(', ')
      : serverTask?.practiceArea || serverTask?.category || 'Property Law'
  const locationLabel =
    profile?.officeAddress?.trim() ||
    (serverTask?.court ? `${serverTask.court.replace(' High Court', '').replace(' Magistrate Court', '')}, Lagos` : 'Ikeja, Lagos')

  const rawFee = serverTask?.budget || '₦35,000'
  const formattedFee = formatCurrency(rawFee)

  const task = {
    id: serverTask?.id?.toString() || taskId,
    title: serverTask?.title || 'Hold Brief - Land Dispute',
    postedBy: serverTask?.postedBy || 'Onasanya Habeeb',
    posterFirstName: serverTask?.postedBy ? serverTask.postedBy.split(' ')[0] : 'Onasanya',
    practiceArea: serverTask?.practiceArea || serverTask?.category || 'Property Law',
    court: serverTask?.court || serverTask?.courtLocation || 'Ikeja High Court',
    deadline: serverTask?.deadline || 'Tomorrow, 9:00am',
    proposedFee: formattedFee,
    description:
      serverTask?.description ||
      'Need someone to hold brief for a land dispute hearing at Ikeja High Court. Case file and background will be shared with the selected lawyer.',
    availabilityLabel: `Available ${serverTask?.deadline || 'Tomorrow, 9:00am'}`,
  }

  const [quotedFee, setQuotedFee] = useState(
    formattedFee ? formattedFee.replace('₦', '') : '35,000',
  )
  const [isAvailableSelected, setIsAvailableSelected] = useState(true)
  const [experienceText, setExperienceText] = useState(
    "I'm based five minutes from Ikeja High Court and available all morning tomorrow. I've handled 14 land dispute matters this year.",
  )
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createProposal(
      {
        quotedFee: quotedFee.startsWith('₦') ? quotedFee : `₦${quotedFee}`,
        experienceText,
        isAvailable: isAvailableSelected,
      },
      {
        onSuccess: () => {
          setIsSubmittedModalOpen(true)
        },
      },
    )
  }

  return (
    <div className="flex flex-col w-full min-h-full pb-20 font-secondary">
      {/* Top Welcome Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex flex-col gap-1 select-none">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
          Welcome {lawyerFirstName}!
        </h1>
        <p className="text-xs sm:text-[13px] text-gray-500 font-normal">
          What action are you taking today
        </p>
      </section>

      {/* Main Submit Proposal Form Section */}
      <section className="flex-1 w-full px-6 py-8 sm:px-12 flex flex-col gap-6">
        {/* Back Link & Title Header */}
        <div className="flex flex-col gap-2">
          <Link
            to="/assisting-dashboard/task/$taskId"
            params={{ taskId: task.id }}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition text-sm cursor-pointer w-fit p-1 -ml-1 select-none"
            aria-label="Back to task"
          >
            <ArrowLeft className="w-5 h-5 stroke-[1.8]" />
          </Link>

          <div className="flex flex-col">
            <h2 className="text-2xl sm:text-[28px] font-medium text-gray-900 leading-tight font-primary">
              Submit your proposal
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal mt-1 max-w-3xl">
              Quote your fee and confirm your availability. The engaging lawyer will compare your proposal with others before selecting one.
            </p>
          </div>
        </div>

        {/* Task Summary Banner Card */}
        <div className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-[0_2px_15px_rgba(0,0,0,0.015)] w-full flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 leading-tight font-primary">
              {task.title}
            </h3>
            <div className="text-xs sm:text-[13px] text-gray-500 font-normal mt-1 flex items-center gap-1.5 flex-wrap">
              <span>{task.court}</span>
              <span>•</span>
              <span>{task.deadline}</span>
              <span>•</span>
              <span className="font-semibold text-[#00726D] font-primary">
                Proposed Fee: {task.proposedFee}
              </span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-4xl">
          {/* Section 1: Quoted Fee */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.015)] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm font-bold text-gray-900">
                Quoted Fee <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500">
                You can accept the proposed fee or quote what works for you.
              </p>
            </div>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                required
                value={quotedFee}
                onChange={(e) => setQuotedFee(e.target.value)}
                placeholder="35,000"
                className="w-full h-11 pl-8 pr-4 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-900 focus:border-[#00726D] focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none transition shadow-2xs font-primary font-medium"
              />
              <span className="absolute left-3.5 top-3 text-gray-500 font-normal text-sm font-primary">
                ₦
              </span>
            </div>
          </div>

          {/* Section 2: Confirm Availability */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.015)] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm font-bold text-gray-900">
                Confirm your availability <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500">
                Let the engaging lawyer know you can be there.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setIsAvailableSelected(!isAvailableSelected)}
                className={`h-10 px-5 rounded-full text-xs font-medium transition cursor-pointer select-none ${
                  isAvailableSelected
                    ? 'bg-[#041626] text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {task.availabilityLabel}
              </button>
            </div>
          </div>

          {/* Section 3: Experience & Approach */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-8 shadow-[0_2px_15px_rgba(0,0,0,0.015)] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-sm font-bold text-gray-900">
                Why are you a good fit? (Optional)
              </label>
              <p className="text-xs text-gray-500">
                A brief note on your experience with this court or type of matter helps your proposal stand out.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-2xs focus-within:border-[#00726D] focus-within:ring-2 focus-within:ring-[#00726D]/10 transition">
              {/* Toolbar */}
              <div className="bg-[#f9fafb] border-b border-gray-200 p-2 flex items-center gap-1">
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                  title="Bold"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                  title="Italic"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <span className="w-[1px] h-4 bg-gray-200 mx-1" />
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <span className="w-[1px] h-4 bg-gray-200 mx-1" />
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                  title="Insert Link"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <span className="w-[1px] h-4 bg-gray-200 mx-1" />
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                  title="Undo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded text-gray-700 transition cursor-pointer"
                  title="Redo"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Textarea */}
              <textarea
                rows={4}
                value={experienceText}
                onChange={(e) => setExperienceText(e.target.value)}
                className="w-full p-4 text-xs sm:text-sm text-gray-700 font-normal leading-relaxed focus:outline-none resize-none bg-white"
                placeholder="State your experience with this matter or location..."
              />
            </div>
          </div>

          {/* Section 4: Profile Preview Card */}
          <div className="bg-[#EBF5F4] border border-[#D5EBE8] rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
            <span className="text-[11px] font-bold text-[#00726D] tracking-widest uppercase">
              Your Profile Preview
            </span>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00726D] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0 select-none font-secondary">
                {initials}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-gray-900 leading-tight">
                  {lawyerFullName}
                </span>
                <span className="text-xs text-gray-600 mt-0.5">
                  {practiceAreaLabel} • {yearsOfPractice} years practice • {locationLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="pt-2 flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={() => navigate({ to: '/assisting-dashboard/task/$taskId', params: { taskId: task.id } })}
              className="h-11 px-6 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs sm:text-sm font-semibold transition cursor-pointer shadow-2xs select-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 px-7 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-[0.99] select-none"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </section>

      {/* Proposal Submitted Confirmation Modal */}
      {isSubmittedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl p-8 border border-gray-150 animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#D5EBE8] text-[#00726D] flex items-center justify-center mb-4 select-none">
              <Hourglass className="w-6 h-6 stroke-[1.8]" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2 font-primary">
              Proposal submitted
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed mb-6">
              Your proposal has been sent to {task.posterFirstName}. You will receive a notification once they review it.
            </p>

            <button
              type="button"
              onClick={() => navigate({ to: '/assisting-dashboard/proposals' })}
              className="w-full h-11 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs active:scale-[0.99] select-none"
            >
              View all proposals
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
