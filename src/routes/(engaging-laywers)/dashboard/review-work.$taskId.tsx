import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import PDF from '../../../assets/icons/pdf.png'
import JPG from '../../../assets/icons/jpg.png'

export const Route = createFileRoute(
  '/(engaging-laywers)/dashboard/review-work/$taskId',
)({
  component: ReviewWorkPage,
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

function ReviewWorkPage() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<Task | null>(null)
  const [activeTab, setActiveTab] = useState<'attendance' | 'documents'>(
    'attendance',
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

  const lawyerName = task?.workers || 'Chiamaka Bello'
  const lawyerFirstName = lawyerName.split(' ')[0]

  const handleApprove = () => {
    if (!task) return
    navigate({
      to: `/dashboard/submit-rating/$taskId`,
      params: { taskId: task.id },
    })
  }

  const handleRequestChanges = () => {
    if (!task) return
    const stored = localStorage.getItem('counsel_tasks')
    if (stored) {
      const tasks: Task[] = JSON.parse(stored)
      const updated = tasks.map((t) => {
        if (t.id === task.id) {
          return { ...t, status: 'In Progress' as const }
        }
        return t
      })
      localStorage.setItem('counsel_tasks', JSON.stringify(updated))
    }
    navigate({ to: '/dashboard' })
  }

  if (!task) {
    return (
      <div className="p-8 text-center font-secondary">
        <p className="text-gray-500">Loading details...</p>
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
      <div className="flex flex-col gap-3 select-none mb-6 text-left">
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:bg-gray-150 hover:text-gray-900 transition duration-205 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-2" />
        </Link>
        <h1 className="text-2xl sm:text-[24px] font-medium text-[#242424] leading-tight font-primary">
          Review the completed work
        </h1>
        <p className="text-xs sm:text-[13px] text-[#242424] font-normal leading-relaxed max-w-2xl font-secondary">
          {lawyerName} has submitted evidence that the task is complete. Review
          it before approving.
        </p>
      </div>

      {/* Dynamic Stepper */}
      <div className="w-full mx-auto max-w-3xl flex items-center justify-between select-none mb-10 mt-2 px-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#00726d] flex items-center justify-center text-white" />
          <span className="text-[11px] sm:text-[14px] font-normal text-black">
            Task Funded
          </span>
        </div>

        <div className="w-9.25 h-0.5 bg-[#AAAAAA80] mx-2" />

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#00726d] flex items-center justify-center text-white" />
          <span className="text-[11px] sm:text-[14px] font-normal text-black">
            Work In Progress
          </span>
        </div>

        <div className="w-9.25  h-0.5 bg-[#AAAAAA80] mx-2" />

        {/* Step 3: Active step */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center p-0.5">
            <div className="w-5 h-5 rounded-full bg-[#00726d]" />
          </div>
          <span className="text-[11px] sm:text-[14px] font-normal text-black">
            Submitted for Review
          </span>
        </div>

        <div className="w-9.25 h-0.5 bg-[#AAAAAA80] mx-2" />

        {/* Step 4 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 rounded-full border-[1.6px] border-[#AAAAAA] bg-white flex items-center justify-center text-white" />
          <span className="text-[11px] sm:text-[14px] font-normal text-black">
            Approved & Rated
          </span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-3 select-none mb-6">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`h-9 px-4 rounded-full text-xs font-semibold transition cursor-pointer ${
            activeTab === 'attendance'
              ? 'bg-[#031625] text-[#E8EBEC] shadow-sm'
              : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Court Attendance
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`h-9 px-4 rounded-full text-xs font-normal transition cursor-pointer font-secondary ${
            activeTab === 'documents'
              ? 'bg-[#041626] text-white shadow-sm border border-[#AAAAAA80]'
              : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          Submitted Documents
        </button>
      </div>

      {/* Tab Contents Card */}
      <div className="w-full bg-white rounded-[10px] border border-[#AAAAAA80] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] text-left mb-8">
        {activeTab === 'attendance' ? (
          /* Attendance tab */
          <div className="flex flex-col gap-4">
            <h3 className="text-[12px] font-normal text-[#595959] tracking-wider uppercase select-none">
              Attendance Confirmation
            </h3>
            <div className="bg-[#E6F1F0]/80 rounded-[10px] p-5 border border-[#00726d]/10 flex flex-col gap-3 text-[#005652] font-secondary">
              <p className="text-xs sm:text-sm text-gray-750 leading-relaxed font-normal">
                "Attended Yaba Magistrate Court for the bail application hearing
                at 9:00am. Application was granted, with conditions attached.
                Full note and receipt shared in Messages."
              </p>
              <span className="text-[11px] text-[#00726d] font-normal">
                Submitted by {lawyerName} • Today, 10:15 AM • Today, 11:32 AM
              </span>
            </div>
          </div>
        ) : (
          /* Documents tab */
          <div className="flex flex-col gap-4">
            <h3 className="text-[12px] font-normal text-[#595959] tracking-wider uppercase select-none">
              Submitted Files
            </h3>

            <div className="flex flex-col divide-y divide-gray-100">
              {/* File 1 */}
              <div className="py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 select-none">
                  <img src={PDF} alt="PDF" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-800 leading-snug">
                    Statement_of_Claim.pdf
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold mt-1">
                    Uploaded by {lawyerFirstName} • Today, 11:30 AM
                  </span>
                </div>
              </div>

              {/* File 2 */}
              <div className="py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 select-none">
                  <img src={JPG} alt="JPG" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-800 leading-snug">
                    Court_Attendance_Slip.jpg
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold mt-1">
                    Uploaded by {lawyerFirstName} • Today, 11:31 AM
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action buttons */}
      <div className="flex items-center gap-3 select-none">
        <button
          onClick={handleRequestChanges}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-red-200 hover:border-red-350 text-red-500 hover:bg-red-50/50 px-5 text-sm font-semibold transition cursor-pointer"
        >
          Request Changes
        </button>
        <button
          onClick={handleApprove}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#00726d] hover:bg-[#005c58] text-white px-5 text-sm font-semibold transition cursor-pointer"
        >
          Approve Completion
        </button>
      </div>
    </div>
  )
}
