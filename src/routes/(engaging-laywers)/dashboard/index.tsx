import { useState, useEffect } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight, Search, ListFilter } from 'lucide-react'
import Post from '../../../assets/engaging-lawyers/post-job.png'
import Apply from '../../../assets/engaging-lawyers/apply-job.png'

export const Route = createFileRoute('/(engaging-laywers)/dashboard/')({
  component: DashboardIndex,
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

const DEFAULT_TASKS: Task[] = [
  {
    id: '1',
    title: 'Hold Brief — Land Dispute',
    category: 'Property Law',
    court: 'Ikeja High Court',
    deadline: 'Tomorrow, 9:00am',
    budget: '₦35,000',
    workers: '3 Proposals',
    status: 'Open',
  },
  {
    id: '2',
    title: 'Draft Statement of Defence',
    category: 'Commercial Litigation',
    court: 'Remote',
    deadline: '3 days',
    budget: '₦120,000',
    workers: 'Tunde Okafor',
    status: 'In Progress',
  },
  {
    id: '3',
    title: 'Court Appearance — Bail Application',
    category: 'Criminal Law',
    court: 'Yaba Magistrate Court',
    deadline: 'Friday, 8:30am',
    budget: '₦45,000',
    workers: 'Chiamaka Bello',
    status: 'Awaiting review',
  },
  {
    id: '4',
    title: 'Tenancy Notice — Review',
    category: 'Criminal Law',
    court: 'Yaba Magistrate Court',
    deadline: 'Friday, 8:30am',
    budget: '₦45,000',
    workers: 'Funke Adeyemi',
    status: 'Completed',
  },
]

function DashboardIndex() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Load from localStorage or set defaults
  useEffect(() => {
    const stored = localStorage.getItem('counsel_tasks')
    if (stored) {
      setTasks(JSON.parse(stored))
    } else {
      localStorage.setItem('counsel_tasks', JSON.stringify(DEFAULT_TASKS))
      setTasks(DEFAULT_TASKS)
    }
  }, [])

  // Clear helper for empty state testing
  const handleClearTasks = () => {
    localStorage.setItem('counsel_tasks', JSON.stringify([]))
    setTasks([])
  }

  // Reset helper
  const handleResetTasks = () => {
    localStorage.setItem('counsel_tasks', JSON.stringify(DEFAULT_TASKS))
    setTasks(DEFAULT_TASKS)
  }

  // Filter tasks based on query
  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusStyle = (status: Task['status']) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-50 text-blue-600 border-blue-100'
      case 'In Progress':
        return 'bg-green-50 text-green-600 border-green-100'
      case 'Awaiting review':
        return 'bg-red-50 text-red-600 border-red-100'
      case 'Completed':
        return 'bg-gray-100 text-gray-500 border-gray-200'
      default:
        return 'bg-gray-50 text-gray-600'
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full">
      {/* Welcome Banner Header */}
      <section className="w-full bg-[#f3f4f6]/50 px-6 py-6 sm:px-12 sm:py-8 border-b border-gray-100 flex items-center justify-between gap-4 select-none">
        <div className="flex flex-col gap-1">
          <h1 className="font-secondary text-xl sm:text-2xl font-semibold text-black leading-tight">
            Welcome Oluwarotimi!!
          </h1>
          <p className="font-secondary text-[13px] text-gray-500 font-normal">
            What action are you taking today
          </p>
          {/* Tester controls inline */}
          <div className="mt-2 flex items-center gap-3 text-[11px]">
            <button
              onClick={handleClearTasks}
              className="text-red-600 hover:text-red-800 transition cursor-pointer font-medium"
            >
              Clear Tasks (Test Empty State)
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleResetTasks}
              className="text-[#00726d] hover:text-[#005c58] transition cursor-pointer font-medium"
            >
              Reset Tasks (Test List State)
            </button>
          </div>
        </div>

        {/* New Task CTA Header Button - visible if tasks exist */}
        {tasks.length > 0 && (
          <Link
            to="/dashboard/post-job"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#00726d] px-4 font-secondary text-xs sm:text-sm font-medium text-white transition hover:bg-[#005c58] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#00726d]/20 cursor-pointer shrink-0"
          >
            New Task
          </Link>
        )}
      </section>

      {/* Main Options Area */}
      {tasks.length === 0 ? (
        /* Empty state cards layout */
        <section className="flex-1 w-full px-6 py-12 sm:px-12 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-190 justify-center">
            {/* Card 1: Post a Job */}
            <Link
              to="/dashboard/post-job"
              className="group flex flex-col bg-white rounded-2xl border border-gray-150 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 cursor-pointer text-left"
            >
              <div className="flex items-center justify-center overflow-hidden relative h-40 sm:h-44 bg-[#F7F7F7] rounded-lg">
                <img
                  src={Post}
                  alt="Post a job"
                  className="w-36 h-36 object-contain absolute -bottom-6 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content info */}
              <div className="pt-5 px-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-secondary text-[15px] font-bold text-[#00726D]">
                    Post a Job
                  </h3>
                  <ArrowRight className="w-4.5 h-4.5 text-[#00726D] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <p className="font-secondary text-xs sm:text-[13px] text-gray-500 leading-[1.6]">
                  Post a job and approve or decline job request
                </p>
              </div>
            </Link>

            {/* Card 2: Apply for Job */}
            <div className="group flex flex-col bg-white rounded-2xl border border-gray-150 p-4 sm:p-5 shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 cursor-pointer">
              <div className="flex items-center justify-center overflow-hidden relative h-40 sm:h-44 bg-[#F7F7F7] rounded-lg">
                <img
                  src={Apply}
                  alt="Apply for job"
                  className="w-36 h-36 object-contain absolute -bottom-6 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content info */}
              <div className="pt-5 px-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-secondary text-[15px] font-bold text-[#00726D]">
                    Apply for Job
                  </h3>
                  <ArrowRight className="w-4.5 h-4.5 text-[#00726D] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <p className="font-secondary text-xs sm:text-[13px] text-gray-500 leading-[1.6]">
                  Sign up, Apply for job, deliver your best and get paid
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Active Tasks list view */
        <section className="flex-1 w-full px-6 py-10 sm:px-12 flex flex-col gap-6">
          {/* Header Description block */}
          <div className="flex flex-col gap-1 select-none">
            <h2 className="text-xl sm:text-2xl font-semibold text-black">
              All tasks
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal">
              Every task you've posted, with its current status. Click one to
              pick up where you left off.
            </p>
          </div>

          {/* Search and Filters toolbar row */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
                <Search className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search task"
                className="w-full h-[38px] pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm font-normal text-[#242424] placeholder-gray-400 focus:border-[#00726D]/50 focus:ring-2 focus:ring-[#00726D]/10 focus:outline-none"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer">
                <ListFilter className="w-3.5 h-3.5" />
                <span>Court Location</span>
              </button>
              <button className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer">
                <ListFilter className="w-3.5 h-3.5" />
                <span>Budget</span>
              </button>
              <button className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer">
                <ListFilter className="w-3.5 h-3.5" />
                <span>Status</span>
              </button>
            </div>
          </div>

          {/* Table Container card */}
          <div className="w-full bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-gray-400 select-none">
                    <th className="px-6 py-4 text-left w-12" />
                    <th className="px-6 py-4 text-left">Task</th>
                    <th className="px-6 py-4 text-left">Court</th>
                    <th className="px-6 py-4 text-left">Deadline</th>
                    <th className="px-6 py-4 text-left">Budget</th>
                    <th className="px-6 py-4 text-left">Workers</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="hover:bg-gray-50/50 transition text-sm font-normal text-[#242424] cursor-pointer"
                        onClick={() => {
                          if (task.status === 'Open') {
                            navigate({
                              to: `/dashboard/review-proposals/${task.id}`,
                            })
                          } else if (task.status === 'In Progress') {
                            navigate({
                              to: `/dashboard/messages/$taskId`,
                              params: { taskId: task.id },
                            })
                          } else if (task.status === 'Awaiting review') {
                            navigate({
                              to: `/dashboard/review-work/$taskId`,
                              params: { taskId: task.id },
                            })
                          } else {
                            navigate({
                              to: `/dashboard/your-rating/$taskId`,
                              params: { taskId: task.id },
                            })
                          }
                        }}
                      >
                        {/* Checkbox cell */}
                        <td
                          className="px-6 py-4 text-left"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-[#00726d] focus:ring-[#00726d] cursor-pointer"
                          />
                        </td>

                        {/* Title & Category */}
                        <td className="px-6 py-4 text-left">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-gray-900 leading-tight">
                              {task.title}
                            </span>
                            <span className="text-[11px] text-gray-400 font-normal">
                              {task.category}
                            </span>
                          </div>
                        </td>

                        {/* Court */}
                        <td className="px-6 py-4 text-left text-gray-600">
                          {task.court}
                        </td>

                        {/* Deadline */}
                        <td className="px-6 py-4 text-left text-gray-600">
                          {task.deadline}
                        </td>

                        {/* Budget */}
                        <td className="px-6 py-4 text-left text-gray-900 font-medium">
                          {task.budget}
                        </td>

                        {/* Workers */}
                        <td className="px-6 py-4 text-left text-gray-600">
                          {task.workers}
                        </td>

                        {/* Status tag */}
                        <td className="px-6 py-4 text-left">
                          <span
                            className={`inline-flex px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getStatusStyle(
                              task.status,
                            )}`}
                          >
                            {task.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-8 text-center text-gray-400 font-normal"
                      >
                        No tasks found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Selection and pagination count footer row */}
            <div className="p-4 bg-gray-50/20 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-500 select-none">
              <span>0 of {filteredTasks.length} row(s) selected.</span>
              <div className="flex items-center gap-2">
                <button className="h-8 px-3 rounded border border-gray-200 bg-white text-xs font-medium text-gray-400 cursor-not-allowed select-none">
                  Previous
                </button>
                <button className="h-8 px-3 rounded border border-gray-200 bg-white text-xs font-medium text-gray-400 cursor-not-allowed select-none">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
