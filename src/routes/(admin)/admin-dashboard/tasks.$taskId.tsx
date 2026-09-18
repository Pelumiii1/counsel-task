import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, UserRound, X, Loader2 } from 'lucide-react'
import { apiClient } from '#/lib/apiClient'
import { toast } from 'sonner'
import { useHasPermission } from '#/hooks/useAdminRoles'
import { RichTextContent } from '#/components/ui/RichTextContent'

export const Route = createFileRoute(
  '/(admin)/admin-dashboard/tasks/$taskId',
)({
  component: AdminTaskDetailPage,
})

interface AdminTaskDto {
  id: string
  rawId: number
  title: string
  description: string
  category: string
  budget: string
  status: string
  statusType: string
  created: string
  dueDate: string
  engagingLawyer: string
  engagingLawyerEmail: string
  engagingLawyerPhone: string
  engagingInitials: string
  assistingLawyer: string
  assistingLawyerEmail: string
  assistingLawyerPhone: string
  assistingInitials: string
  platformFee: string
  assistingEarnings: string
  paymentStatus: string
  timeline: Array<{
    event: string
    date: string
  }>
  engagingStats: {
    tasksPosted: number
    activeTasks: number
    completedTasks: number
  }
  assistingStats: {
    tasksPosted: number
    activeTasks: number
    completedTasks: number
  }
}

interface LawyerModalData {
  name: string
  role: string
  initials: string
  email: string
  phone: string
  status: string
  joined: string
  tasksPosted: number
  activeTasks: number
  completedTasks: number
}

function StatusBadge({
  status,
  type,
}: {
  status: string
  type: string
}) {
  const styles: Record<string, string> = {
    pending: 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    inprogress: 'bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]',
    success: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
    disputed: 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    cancelled: 'bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]',
    escrowed: 'bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]',
  }

  const key = type?.toLowerCase() || 'pending'

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
        styles[key] || 'bg-[#F2F4F7] text-[#344054] border border-[#EAECF0]'
      }`}
    >
      {status}
    </span>
  )
}

function AdminTaskDetailPage() {
  const { taskId } = Route.useParams()
  const queryClient = useQueryClient()
  const canManageTasks = useHasPermission('MANAGE_TASKS')

  // Fetch task detail from backend
  const { data: task, isLoading } = useQuery<AdminTaskDto>({
    queryKey: ['admin', 'task', taskId],
    queryFn: async () => {
      const res = await apiClient.get<AdminTaskDto>(`/admin/tasks/${taskId}`)
      return res.data
    },
  })

  // Status mutation
  const statusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      const res = await apiClient.patch(`/admin/tasks/${taskId}/status`, {
        status: newStatus,
      })
      return res.data
    },
    onSuccess: (data: any, newStatus: string) => {
      toast.success(data?.message || `Task status updated to ${newStatus}`)
      queryClient.invalidateQueries({ queryKey: ['admin', 'task', taskId] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'tasks'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'overview'] })
    },
    onError: (err: any) => {
      if (err?.response?.status === 403) {
        toast.error('Access Denied: You do not have permission to manage tasks.')
      } else {
        toast.error('Failed to update task status')
      }
    },
  })

  const [selectedLawyerModal, setSelectedLawyerModal] =
    useState<LawyerModalData | null>(null)

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#00726D]" />
        <span className="text-sm">Loading task details from database...</span>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-base text-gray-600">Task not found in the database.</p>
        <Link
          to="/admin-dashboard/tasks"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00726D] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tasks</span>
        </Link>
      </div>
    )
  }

  const isCancelled = task.status?.toLowerCase() === 'cancelled'

  const openEngagingLawyerModal = () => {
    setSelectedLawyerModal({
      name: task.engagingLawyer,
      role: 'Engaging Lawyer',
      initials: task.engagingInitials || 'EL',
      email: task.engagingLawyerEmail || 'client@counseltask.ng',
      phone: task.engagingLawyerPhone || '090 123 456 78',
      status: 'ACTIVE',
      joined: '15 Jan 2026',
      tasksPosted: Number(task.engagingStats?.tasksPosted ?? 1),
      activeTasks: Number(task.engagingStats?.activeTasks ?? 1),
      completedTasks: Number(task.engagingStats?.completedTasks ?? 0),
    })
  }

  const openAssistingLawyerModal = () => {
    setSelectedLawyerModal({
      name: task.assistingLawyer,
      role: 'Assisting Lawyer',
      initials: task.assistingInitials || 'AL',
      email: task.assistingLawyerEmail || 'lawyer@counseltask.ng',
      phone: task.assistingLawyerPhone || '090 56276 222 22',
      status: 'ACTIVE',
      joined: '10 Feb 2026',
      tasksPosted: Number(task.assistingStats?.tasksPosted ?? 0),
      activeTasks: Number(task.assistingStats?.activeTasks ?? 1),
      completedTasks: Number(task.assistingStats?.completedTasks ?? 0),
    })
  }

  return (
    <div className="space-y-6">
      {/* ── Back Button & Header ── */}
      <div>
        <Link
          to="/admin-dashboard/tasks"
          className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition mb-3 cursor-pointer group no-underline"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back to Tasks</span>
        </Link>

        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-[28px] font-medium text-[#101828] tracking-tight">
            {task.title}
          </h2>
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs sm:text-sm text-gray-500">
          <span>{task.id}</span>
          <StatusBadge status={task.status} type={task.statusType} />
        </div>
      </div>

      {/* ── 1. Task Information Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs">
        <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
          Task Information
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-xs text-[#667085] block mb-1">Task ID</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.id}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Title</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.title}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Budget</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.budget}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Created</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.created}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Due Date</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.dueDate}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Category</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.category}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <span className="text-xs text-[#667085] block mb-1.5">
            Task Description
          </span>
          <div className="text-xs sm:text-sm text-[#344054] leading-relaxed">
            <RichTextContent content={task.description} />
          </div>
        </div>
      </section>

      {/* ── 2. Lawyers Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs">
        <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
          Lawyers
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Engaging Lawyer Card */}
          <div className="rounded-xl border border-gray-100 bg-[#FAFAFA] p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#00726D]/15 text-[#00726D] flex items-center justify-center font-bold text-base shrink-0">
                <UserRound className="w-6 h-6 text-[#00726D]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-sm sm:text-base text-[#101828] truncate">
                    {task.engagingLawyer}
                  </h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#00726D] text-white">
                    Engaging Lawyer
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#667085] mt-1.5 truncate">
                  Email: {task.engagingLawyerEmail}
                </p>
                <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
                  Phone: {task.engagingLawyerPhone}
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={openEngagingLawyerModal}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-2xs"
              >
                View Lawyer
              </button>
            </div>
          </div>

          {/* Assisting Lawyer Card */}
          <div className="rounded-xl border border-gray-100 bg-[#FAFAFA] p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#C85A44]/15 text-[#C85A44] flex items-center justify-center font-bold text-base shrink-0">
                <UserRound className="w-6 h-6 text-[#C85A44]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-sm sm:text-base text-[#101828] truncate">
                    {task.assistingLawyer}
                  </h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#C85A44] text-white">
                    Assisting Lawyer
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#667085] mt-1.5 truncate">
                  Email: {task.assistingLawyerEmail}
                </p>
                <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
                  Phone: {task.assistingLawyerPhone}
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={openAssistingLawyerModal}
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-2xs"
              >
                View Lawyer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Payment Summary Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs">
        <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
          Payment Summary
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-xs text-[#667085] block mb-1">Budget</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.budget}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">
              Platform Fee (10%)
            </span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.platformFee}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">
              Assisting Lawyer Earnings
            </span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {task.assistingEarnings}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <span className="text-xs text-[#667085] block mb-1.5">
            Payment Status
          </span>
          <StatusBadge status={task.paymentStatus} type="escrowed" />
        </div>
      </section>

      {/* ── 4. Activity Timeline Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs">
        <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
          Activity Timeline
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {task.timeline?.map((item, idx) => (
            <div key={idx}>
              <span className="font-medium text-[#101828] text-sm sm:text-base block mb-1">
                {item.event}
              </span>
              <span className="text-xs text-[#667085] block">{item.date}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-gray-100">
          <span className="text-xs text-[#667085] block mb-1.5">
            Task Status
          </span>
          <StatusBadge status={task.status} type={task.statusType} />
        </div>
      </section>

      {/* ── 5. Action Buttons ── */}
      <div className="flex items-center justify-end gap-3 pt-2 pb-6">
        <button
          type="button"
          disabled={statusMutation.isPending || !canManageTasks}
          title={!canManageTasks ? 'Requires MANAGE_TASKS permission' : undefined}
          onClick={() => {
            if (!canManageTasks) {
              toast.error('Permission denied: Action requires MANAGE_TASKS')
              return
            }
            statusMutation.mutate('Disputed')
          }}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-[#344054] shadow-2xs transition hover:bg-gray-50 active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Resolve Dispute
        </button>

        <button
          type="button"
          disabled={statusMutation.isPending || !canManageTasks}
          title={!canManageTasks ? 'Requires MANAGE_TASKS permission' : undefined}
          onClick={() => {
            if (!canManageTasks) {
              toast.error('Permission denied: Action requires MANAGE_TASKS')
              return
            }
            statusMutation.mutate(isCancelled ? 'In Progress' : 'Cancelled')
          }}
          className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-xs transition active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
            !canManageTasks ? 'bg-gray-400' : 'bg-[#00726D] hover:bg-[#005c58]'
          }`}
        >
          {statusMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isCancelled ? (
            'Reactivate Task'
          ) : (
            'Cancel Task'
          )}
        </button>
      </div>

      {/* ── 6. View Lawyer Modal ── */}
      {selectedLawyerModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-8 max-w-xl w-full shadow-2xl border border-gray-100/80 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Top Lawyer Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#00726D] text-white flex items-center justify-center text-lg font-semibold tracking-wide shrink-0 shadow-xs">
                  {selectedLawyerModal.initials}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#101828] tracking-tight">
                    {selectedLawyerModal.name}
                  </h3>
                  <p className="text-sm text-[#475467] font-normal mt-0.5">
                    {selectedLawyerModal.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLawyerModal(null)}
                className="text-gray-400 hover:text-gray-600 transition p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2x2 Information Grid */}
            <div className="mt-8 grid grid-cols-2 gap-y-6 gap-x-8 text-sm">
              <div>
                <span className="text-xs text-[#667085] block mb-1">Email</span>
                <span className="text-sm font-normal text-[#101828] block truncate">
                  {selectedLawyerModal.email}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">
                  Phone Number
                </span>
                <span className="text-sm font-normal text-[#101828] block">
                  {selectedLawyerModal.phone}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Status</span>
                <span className="text-xs font-bold text-[#00726D] tracking-wide uppercase block">
                  {selectedLawyerModal.status}
                </span>
              </div>

              <div>
                <span className="text-xs text-[#667085] block mb-1">Joined</span>
                <span className="text-sm font-normal text-[#101828] block">
                  {selectedLawyerModal.joined}
                </span>
              </div>
            </div>

            {/* 3 Pastel Stats Blocks */}
            <div className="mt-8 grid grid-cols-3 gap-3.5">
              <div className="bg-[#EAF5F3] rounded-2xl p-4 text-center flex flex-col justify-center items-center">
                <span className="text-2xl font-bold text-[#00726D]">
                  {selectedLawyerModal.tasksPosted}
                </span>
                <span className="text-xs text-[#00726D] font-medium mt-1">
                  Task Posted
                </span>
              </div>

              <div className="bg-[#EAF5F3] rounded-2xl p-4 text-center flex flex-col justify-center items-center">
                <span className="text-2xl font-bold text-[#00726D]">
                  {selectedLawyerModal.activeTasks}
                </span>
                <span className="text-xs text-[#00726D] font-medium mt-1">
                  Active Task
                </span>
              </div>

              <div className="bg-[#EAF5F3] rounded-2xl p-4 text-center flex flex-col justify-center items-center">
                <span className="text-2xl font-bold text-[#00726D]">
                  {selectedLawyerModal.completedTasks}
                </span>
                <span className="text-xs text-[#00726D] font-medium mt-1">
                  Completed Task
                </span>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedLawyerModal(null)}
                className="inline-flex items-center justify-center rounded-xl bg-[#00726D] px-8 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-[#005c58] active:scale-[0.99] cursor-pointer"
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
