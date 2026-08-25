import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Eye, Loader2 } from 'lucide-react'
import { apiClient } from '#/lib/apiClient'
import { toast } from 'sonner'

export const Route = createFileRoute(
  '/(admin)/admin-dashboard/lawyers/$lawyerId',
)({
  component: AdminLawyerDetailPage,
})

interface AdminLawyerDto {
  id: string
  rawId: number
  name: string
  fullName: string
  email: string
  phone: string
  location: string
  firm: string
  role: string
  verification: string
  status: string
  joined: string
  bio: string
  callToBarDate: string
  enrolmentNumber: string
  practiceAreas: string
  practisingFeeReceipt: string
  governmentId: string
  totalTasksCompleted: number
  currentActiveTasks: number
  disputesInvolved: number
  tasksPosted: number
  activeTasks: number
  completedTasks: number
  disputesRaised: number
  recentTasks: Array<{
    id: string
    title: string
    status: string
    statusType: string
    budget: string
    date: string
  }>
  disputes: Array<{
    id: string
    task: string
    status: string
    date: string
  }>
}

function StatusBadge({
  status,
  type,
}: {
  status: string
  type?: string
}) {
  const styles: Record<string, string> = {
    pending: 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    'pending verification': 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    'awaiting approval': 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    inprogress: 'bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]',
    'in progress': 'bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]',
    active: 'bg-[#EFF8FF] text-[#175CD3] border border-[#B2DDFF]',
    completed: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
    success: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
    verified: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
    resolved: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
    open: 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    disputed: 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    suspended: 'bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]',
  }

  const key = status?.toLowerCase() || type?.toLowerCase() || 'pending'

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

function AdminLawyerDetailPage() {
  const { lawyerId } = Route.useParams()
  const queryClient = useQueryClient()

  // Fetch single lawyer details from live backend
  const { data: lawyer, isLoading } = useQuery<AdminLawyerDto>({
    queryKey: ['admin', 'lawyer', lawyerId],
    queryFn: async () => {
      const res = await apiClient.get<AdminLawyerDto>(`/admin/lawyers/${lawyerId}`)
      return res.data
    },
  })

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.patch(`/admin/lawyers/${lawyerId}/toggle-status`)
      return res.data
    },
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Lawyer account status updated')
      queryClient.invalidateQueries({ queryKey: ['admin', 'lawyer', lawyerId] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'lawyers'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'overview'] })
    },
    onError: () => {
      toast.error('Failed to update lawyer status')
    },
  })

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#00726D]" />
        <span className="text-sm">Loading lawyer details from database...</span>
      </div>
    )
  }

  if (!lawyer) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-base text-gray-600">Lawyer not found in the database.</p>
        <Link
          to="/admin-dashboard/lawyers"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00726D] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lawyers</span>
        </Link>
      </div>
    )
  }

  const isSuspended = lawyer.status?.toLowerCase() === 'suspended'
  const lawyerDisplayName = lawyer.fullName || lawyer.name || 'Lawyer Profile'
  const recentTasks = lawyer.recentTasks || []
  const disputes = lawyer.disputes || []

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* ── Back Button & Header ── */}
      <div>
        <Link
          to="/admin-dashboard/lawyers"
          className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition mb-3 cursor-pointer group no-underline"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium">Back to Lawyers</span>
        </Link>

        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-[28px] font-medium text-[#101828] tracking-tight">
            {lawyerDisplayName}
          </h2>
        </div>
        <div className="mt-1.5 flex items-center gap-2.5 text-xs sm:text-sm text-gray-500">
          <span>{lawyer.id}</span>
          <StatusBadge status={lawyer.verification || 'Verified'} />
          <StatusBadge status={lawyer.status || 'Active'} />
        </div>
      </div>

      {/* ── 1. Profile Information Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs">
        <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
          Profile Information
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-sm">
          <div>
            <span className="text-xs text-[#667085] block mb-1">Lawyer ID</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.id}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Full Name</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyerDisplayName}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Email</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base truncate block">
              {lawyer.email}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Phone</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.phone || 'N/A'}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Location</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.location || 'Lagos, Nigeria'}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Joined</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.joined || 'Today'}
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. Professional Information Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs">
        <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
          Professional Information
        </h3>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-sm">
          <div>
            <span className="text-xs text-[#667085] block mb-1">Role</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.role || 'Legal Counsel'}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Verification</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.verification || 'Verified'}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">Account Status</span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.status || 'Active'}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">
              Total Tasks Completed
            </span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.totalTasksCompleted ?? 0}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">
              Current Active Tasks
            </span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.currentActiveTasks ?? 0}
            </span>
          </div>

          <div>
            <span className="text-xs text-[#667085] block mb-1">
              Disputes Involved
            </span>
            <span className="font-medium text-[#101828] text-sm sm:text-base">
              {lawyer.disputesInvolved ?? 0}
            </span>
          </div>
        </div>
      </section>

      {/* ── 3. Recent Task Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
        <div className="p-6 sm:p-7 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
            Recent Task
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                <th className="py-4 px-6">Task ID</th>
                <th className="py-4 px-6">Task</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Budget</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
              {recentTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    No recent tasks associated with this lawyer yet.
                  </td>
                </tr>
              ) : (
                recentTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {task.id}
                    </td>
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {task.title}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge
                        status={task.status}
                        type={task.statusType}
                      />
                    </td>
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {task.budget}
                    </td>
                    <td className="py-4 px-6 text-[#475467]">{task.date}</td>
                    <td className="py-4 px-6">
                      <Link
                        to="/admin-dashboard/tasks/$taskId"
                        params={{ taskId: task.id }}
                        className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer shadow-2xs no-underline"
                      >
                        <span>View</span>
                        <Eye className="w-3.5 h-3.5 text-gray-500" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 4. Dispute History Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
        <div className="p-6 sm:p-7 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
            Dispute History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                <th className="py-4 px-6">Dispute ID</th>
                <th className="py-4 px-6">Task</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
              {disputes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    No disputes on record for this lawyer.
                  </td>
                </tr>
              ) : (
                disputes.map((dsp) => (
                  <tr key={dsp.id} className="hover:bg-gray-50/70 transition">
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {dsp.id}
                    </td>
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {dsp.task}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={dsp.status} />
                    </td>
                    <td className="py-4 px-6 text-[#475467]">{dsp.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. Account Activity Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs">
        <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
          Account Activity
        </h3>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#EAF5F3] border border-[#D5EAE6] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs text-[#00726D] font-medium">
              Tasks Posted
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-[#00726D] mt-3">
              {lawyer.tasksPosted ?? 0}
            </p>
          </div>

          <div className="bg-[#EAF5F3] border border-[#D5EAE6] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs text-[#00726D] font-medium">
              Active Tasks
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-[#00726D] mt-3">
              {lawyer.activeTasks ?? 0}
            </p>
          </div>

          <div className="bg-[#EAF5F3] border border-[#D5EAE6] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs text-[#00726D] font-medium">
              Completed Tasks
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-[#00726D] mt-3">
              {lawyer.completedTasks ?? 0}
            </p>
          </div>

          <div className="bg-[#EAF5F3] border border-[#D5EAE6] rounded-2xl p-5 flex flex-col justify-between">
            <span className="text-xs text-[#00726D] font-medium">
              Disputes Raised
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-[#00726D] mt-3">
              {lawyer.disputesRaised ?? 0}
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. Bottom Action Button ── */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          disabled={toggleStatusMutation.isPending}
          onClick={() => toggleStatusMutation.mutate()}
          className="inline-flex items-center justify-center rounded-xl bg-[#C85A44] hover:bg-[#b34c37] px-7 py-3 text-sm font-medium text-white shadow-xs transition active:scale-[0.99] cursor-pointer disabled:opacity-50"
        >
          {toggleStatusMutation.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isSuspended ? (
            'Reactivate Account'
          ) : (
            'Suspend Account'
          )}
        </button>
      </div>
    </div>
  )
}
