import { useState, useMemo } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Search,
  SlidersHorizontal,
  Eye,
  X,
  Loader2,
} from 'lucide-react'
import { apiClient } from '#/lib/apiClient'

export const Route = createFileRoute('/(admin)/admin-dashboard/tasks/')({
  component: AdminTasksListPage,
})

interface AdminTaskItem {
  id: string
  rawId: number
  title: string
  engagingLawyer: string
  assistingLawyer: string
  budget: string
  status: string
  statusType: string
  created: string
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
  }

  const key = type?.toLowerCase() || 'pending'

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${styles[key] || 'bg-[#F2F4F7] text-[#344054] border border-[#EAECF0]'
        }`}
    >
      {status}
    </span>
  )
}

function AdminTasksListPage() {
  const navigate = useNavigate()

  // Fetch tasks from live backend
  const { data: tasks = [], isFetching } = useQuery<AdminTaskItem[]>({
    queryKey: ['admin', 'tasks'],
    queryFn: async () => {
      const res = await apiClient.get<AdminTaskItem[]>('/admin/tasks')
      return res.data
    },
  })

  const [search, setSearch] = useState('')
  const [taskIdFilter, setTaskIdFilter] = useState('All')
  const [titleFilter, setTitleFilter] = useState('All')
  const [engagingFilter, setEngagingFilter] = useState('All')
  const [assistingFilter, setAssistingFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const taskIds = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.id)))
  }, [tasks])

  const titles = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.title)))
  }, [tasks])

  const engagingLawyers = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.engagingLawyer)))
  }, [tasks])

  const assistingLawyers = useMemo(() => {
    return Array.from(new Set(tasks.map((t) => t.assistingLawyer)))
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.id?.toLowerCase().includes(search.toLowerCase()) ||
        task.engagingLawyer?.toLowerCase().includes(search.toLowerCase()) ||
        task.assistingLawyer?.toLowerCase().includes(search.toLowerCase())

      const matchesTaskId =
        taskIdFilter === 'All' || task.id === taskIdFilter

      const matchesTitle =
        titleFilter === 'All' || task.title === titleFilter

      const matchesEngaging =
        engagingFilter === 'All' || task.engagingLawyer === engagingFilter

      const matchesAssisting =
        assistingFilter === 'All' || task.assistingLawyer === assistingFilter

      const matchesStatus =
        statusFilter === 'All' || task.status === statusFilter

      return (
        matchesSearch &&
        matchesTaskId &&
        matchesTitle &&
        matchesEngaging &&
        matchesAssisting &&
        matchesStatus
      )
    })
  }, [
    tasks,
    search,
    taskIdFilter,
    titleFilter,
    engagingFilter,
    assistingFilter,
    statusFilter,
  ])

  return (
    <div className="space-y-6">
      {/* ── Section Title ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-medium text-[#101828] tracking-tight">
            Task
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#475467]">
            Monitor and manage all legal tasks across the platform.
          </p>
        </div>

        {isFetching && (
          <div className="flex items-center gap-2 text-xs text-[#00726D] bg-[#E8F7F5] px-3 py-1.5 rounded-lg w-fit">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Syncing tasks...</span>
          </div>
        )}
      </div>

      {/* ── Search and Filter Controls ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search task"
            className="w-full h-10 pl-9.5 pr-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Task ID Filter */}
        <div className="relative">
          <select
            value={taskIdFilter}
            onChange={(e) => setTaskIdFilter(e.target.value)}
            className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
          >
            <option value="All">Task ID</option>
            {taskIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>

        {/* Task Title Filter */}
        <div className="relative">
          <select
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
          >
            <option value="All">Task Title</option>
            {titles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>

        {/* Engaging Lawyer Filter */}
        <div className="relative">
          <select
            value={engagingFilter}
            onChange={(e) => setEngagingFilter(e.target.value)}
            className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
          >
            <option value="All">Engaging Lawyer</option>
            {engagingLawyers.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>

        {/* Assisting Lawyer Filter */}
        <div className="relative">
          <select
            value={assistingFilter}
            onChange={(e) => setAssistingFilter(e.target.value)}
            className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
          >
            <option value="All">Assisting Lawyer</option>
            {assistingLawyers.map((al) => (
              <option key={al} value={al}>
                {al}
              </option>
            ))}
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
          >
            <option value="All">Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Awaiting Approval">Awaiting Approval</option>
            <option value="Completed">Completed</option>
            <option value="Disputed">Disputed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* ── Task Table Card ── */}
      <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                <th className="py-4 px-6">Task ID</th>
                <th className="py-4 px-6">Task</th>
                <th className="py-4 px-6">Engaging Lawyer</th>
                <th className="py-4 px-6">Assisting Lawyer</th>
                <th className="py-4 px-6">Budget</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Created</th>
                <th className="py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No tasks found in the database.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() =>
                      navigate({
                        to: '/admin-dashboard/tasks/$taskId',
                        params: { taskId: task.id },
                      })
                    }
                    className="hover:bg-gray-50/70 transition cursor-pointer"
                  >
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {task.id}
                    </td>
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {task.title}
                    </td>
                    <td className="py-4 px-6 text-[#475467]">
                      {task.engagingLawyer}
                    </td>
                    <td className="py-4 px-6 text-[#475467]">
                      {task.assistingLawyer}
                    </td>
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {task.budget}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge
                        status={task.status}
                        type={task.statusType}
                      />
                    </td>
                    <td className="py-4 px-6 text-[#475467]">
                      {task.created}
                    </td>
                    <td
                      className="py-4 px-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to="/admin-dashboard/tasks/$taskId"
                        params={{ taskId: task.id }}
                        className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer shadow-2xs no-underline"
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

        {/* ── Table Pagination & Selected Count Footer ── */}
        <div className="p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 text-xs sm:text-sm text-gray-500">
          <span>0 of {filteredTasks.length} row(s) selected.</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-2xs disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer shadow-2xs disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
