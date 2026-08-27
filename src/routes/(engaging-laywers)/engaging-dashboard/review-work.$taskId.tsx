import { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { ArrowLeft, FileText, Download, AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react'
import PDF from '../../../assets/icons/pdf.png'
import JPG from '../../../assets/icons/jpg.png'
import { useTaskById, useRequestTaskChanges } from '#/hooks/useTasks'
import { useTaskProposals } from '#/hooks/useProposals'
import { useThreadMessages, useSendMessage } from '#/hooks/useMessages'

export const Route = createFileRoute(
  '/(engaging-laywers)/engaging-dashboard/review-work/$taskId',
)({
  component: ReviewWorkPage,
})

function ReviewWorkPage() {
  const { taskId } = Route.useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'attendance' | 'documents'>('attendance')
  const [isRequestChangesOpen, setIsRequestChangesOpen] = useState(false)
  const [changesNote, setChangesNote] = useState('')

  // Backend queries
  const { data: serverTask, isLoading: isTaskLoading } = useTaskById(taskId)
  const { data: proposals } = useTaskProposals(taskId)
  const selectedProposal = proposals?.find((p) => p.status === 'Selected') || proposals?.[0]

  const { data: threadMessages } = useThreadMessages(
    selectedProposal?.lawyerId ? Number(selectedProposal.lawyerId) : undefined,
    taskId,
    'engaging',
  )

  const { mutate: requestChanges, isPending: isRequestingChanges } = useRequestTaskChanges(taskId)
  const { mutate: sendMessage } = useSendMessage('engaging')

  const lawyerName =
    selectedProposal?.name ||
    serverTask?.workers ||
    'Chiamaka Bello'
  const lawyerFirstName = lawyerName.split(' ')[0]

  // Find completion note message from assisting lawyer if present
  const completionMessage = (threadMessages || [])
    .filter((m) => !m.isMine && (m.content.toLowerCase().includes('completion') || m.content.toLowerCase().includes('attended') || m.content.toLowerCase().includes('completed')))
    .slice(-1)[0]

  const attendanceNote =
    completionMessage?.content?.replace(/^Completion Confirmation Requested:\s*/i, '') ||
    `"Attended ${serverTask?.court || 'Yaba Magistrate Court'} for the hearing. Task completed as instructed. Full documentation and attendance notes shared."`

  const submissionDateFormatted = completionMessage?.createdAt
    ? new Date(completionMessage.createdAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    : 'Today, 11:32 AM'

  // Extract submitted files specifically uploaded by the assisting lawyer
  const submittedFiles = (threadMessages || [])
    .filter((m) => !m.isMine && m.fileName)
    .map((m) => ({
      name: m.fileName!,
      size: m.fileSize || '1.2 MB',
      url: m.attachmentUrl,
      uploader: m.senderName || lawyerName,
      time: m.timeFormatted || 'Uploaded with completion',
    }))

  const handleApprove = () => {
    navigate({
      to: `/engaging-dashboard/submit-rating/$taskId`,
      params: { taskId },
    })
  }

  const handleConfirmRequestChanges = (e: React.FormEvent) => {
    e.preventDefault()
    const noteText = changesNote.trim() || 'Please review the requested changes and submit revised evidence.'

    requestChanges(
      { note: noteText },
      {
        onSuccess: () => {
          if (selectedProposal?.lawyerId) {
            sendMessage({
              recipientId: Number(selectedProposal.lawyerId),
              taskId: Number(taskId),
              content: `Changes Requested: ${noteText}`,
              role: 'engaging',
            })
          }
          setIsRequestChangesOpen(false)
          navigate({ to: '/engaging-dashboard' })
        },
      },
    )
  }

  if (isTaskLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 min-h-[50vh] font-secondary">
        <Loader2 className="w-8 h-8 text-[#00726d] animate-spin mb-3" />
        <p className="text-gray-500 text-sm">Loading task review...</p>
      </div>
    )
  }

  if (!serverTask) {
    return (
      <div className="p-8 text-center font-secondary">
        <p className="text-gray-500">Task details not found.</p>
        <Link
          to="/engaging-dashboard"
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
          to="/engaging-dashboard"
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

        <div className="w-9.25 h-0.5 bg-[#AAAAAA80] mx-2" />

        {/* Step 3: Active step */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center p-0.5 shadow-2xs">
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
          type="button"
          onClick={() => setActiveTab('attendance')}
          className={`h-9 px-4 rounded-full text-xs font-semibold transition cursor-pointer ${activeTab === 'attendance'
              ? 'bg-[#031625] text-[#E8EBEC] shadow-sm'
              : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
            }`}
        >
          Court Attendance
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('documents')}
          className={`h-9 px-4 rounded-full text-xs font-normal transition cursor-pointer font-secondary ${activeTab === 'documents'
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
                {attendanceNote}
              </p>
              <span className="text-[11px] text-[#00726d] font-normal">
                Submitted by {lawyerName} • {submissionDateFormatted}
              </span>
            </div>
          </div>
        ) : (
          /* Documents tab */
          <div className="flex flex-col gap-4">
            <h3 className="text-[12px] font-normal text-[#595959] tracking-wider uppercase select-none">
              Submitted Files
            </h3>

            {submittedFiles.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-xs sm:text-sm font-secondary">
                No documents were attached with this submission.
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-gray-100">
                {submittedFiles.map((file, idx) => {
                  const isPdf = file.name.toLowerCase().endsWith('.pdf')
                  const isJpg =
                    file.name.toLowerCase().endsWith('.jpg') ||
                    file.name.toLowerCase().endsWith('.jpeg') ||
                    file.name.toLowerCase().endsWith('.png')

                  return (
                    <div
                      key={idx}
                      className="py-4 flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-100 select-none">
                          {isPdf ? (
                            <img src={PDF} alt="PDF" className="w-8 h-8 object-contain" />
                          ) : isJpg ? (
                            <img src={JPG} alt="JPG" className="w-8 h-8 object-contain" />
                          ) : (
                            <FileText className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-semibold text-gray-800 leading-snug">
                            {file.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold mt-1">
                            Uploaded by {file.uploader} • {file.time} • {file.size}
                          </span>
                        </div>
                      </div>

                      {file.url && file.url !== '#' && (
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-gray-400 hover:text-[#00726d] rounded-lg hover:bg-gray-100 transition"
                          title="Download file"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action buttons */}
      <div className="flex items-center gap-3 select-none">
        <button
          type="button"
          onClick={() => setIsRequestChangesOpen(true)}
          className="inline-flex h-10 items-center justify-center rounded-lg border border-red-200 hover:border-red-350 text-red-500 hover:bg-red-50/50 px-5 text-sm font-semibold transition cursor-pointer"
        >
          Request Changes
        </button>
        <button
          type="button"
          onClick={handleApprove}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-[#00726d] hover:bg-[#005c58] text-white px-5 text-sm font-semibold transition cursor-pointer"
        >
          Approve Completion
        </button>
      </div>

      {/* Request Changes Modal */}
      {isRequestChangesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setIsRequestChangesOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg flex flex-col gap-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                <h2 className="font-primary text-lg font-bold text-gray-900">
                  Request Changes
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsRequestChangesOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 font-secondary leading-relaxed">
              Describe what changes or additional evidence are required from{' '}
              <span className="font-semibold text-gray-900">{lawyerName}</span>.
              The task status will return to <span className="font-medium text-amber-600">In Progress</span>.
            </p>

            <form onSubmit={handleConfirmRequestChanges} className="flex flex-col gap-4">
              <textarea
                value={changesNote}
                onChange={(e) => setChangesNote(e.target.value)}
                placeholder="e.g. Please attach the certified true copy of the ruling..."
                rows={4}
                required
                className="w-full rounded-xl border border-gray-200 p-3 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 focus:border-[#00726d] resize-none"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRequestChangesOpen(false)}
                  className="h-10 px-4 rounded-xl border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRequestingChanges}
                  className="h-10 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isRequestingChanges && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Send Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

