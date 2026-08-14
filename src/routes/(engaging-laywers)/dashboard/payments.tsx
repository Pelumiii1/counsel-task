import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Search, ListFilter } from 'lucide-react'

export const Route = createFileRoute('/(engaging-laywers)/dashboard/payments')({
  component: PaymentsPage,
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

function PaymentsPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('counsel_tasks')
    if (stored) {
      setTasks(JSON.parse(stored))
    }
  }, [])

  // Only display tasks that have been funded (i.e. not Open)
  const fundedTasks = tasks.filter((t) => t.status !== 'Open')

  // Apply search query
  const filteredTasks = fundedTasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredTasks.map((t) => t.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id])
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id))
    }
  }

  const getEscrowStatus = (status: Task['status']) => {
    if (status === 'Completed') {
      return {
        label: 'Released',
        style: 'bg-[#E6F1F0] text-[#00726d] border border-[#B0D3D2]/30',
      }
    }
    return {
      label: 'In Escrow',
      style: 'bg-[#FFF0ED] text-[#F36952] border border-[#FCD2CB]/30',
    }
  }

  return (
    <div className="flex flex-col w-full min-h-full font-secondary bg-[#f9fafb] px-6 py-10 sm:px-12 gap-6 text-left">
      {/* Header Description block */}
      <div className="flex flex-col gap-1 select-none">
        <h1 className="text-2xl sm:text-[28px] font-bold text-black font-primary">
          Payment history
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-normal">
          Every task you've funded, with its escrow status and payout.
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

        {/* Filter button */}
        <button className="inline-flex h-[38px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 font-secondary text-xs font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none cursor-pointer select-none">
          <ListFilter className="w-3.5 h-3.5" />
          <span>Status</span>
        </button>
      </div>

      {/* Table Card container */}
      <div className="w-full bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-gray-400 select-none">
                <th className="px-6 py-4 text-left w-12">
                  <input
                    type="checkbox"
                    checked={
                      filteredTasks.length > 0 &&
                      selectedIds.length === filteredTasks.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-[#00726d] focus:ring-[#00726d] cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-left">Task</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const isChecked = selectedIds.includes(task.id)
                  const escrow = getEscrowStatus(task.status)
                  return (
                    <tr
                      key={task.id}
                      className="hover:bg-gray-50/50 transition text-sm font-normal text-[#242424]"
                    >
                      {/* Checkbox cell */}
                      <td className="px-6 py-4.5 text-left">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            handleSelectRow(task.id, e.target.checked)
                          }
                          className="rounded border-gray-300 text-[#00726d] focus:ring-[#00726d] cursor-pointer"
                        />
                      </td>

                      {/* Task Info cell */}
                      <td className="px-6 py-4.5 text-left">
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-semibold text-gray-900 leading-snug">
                            {task.title}
                          </span>
                          <span className="text-[11px] text-gray-405">
                            {task.category}
                          </span>
                        </div>
                      </td>

                      {/* Amount cell */}
                      <td className="px-6 py-4.5 text-left font-semibold text-gray-900">
                        {task.budget}
                      </td>

                      {/* Date cell */}
                      <td className="px-6 py-4.5 text-left text-gray-500 font-normal">
                        {task.id === '1' || task.id === '4'
                          ? 'Today'
                          : '3 days ago'}
                      </td>

                      {/* Status badge cell */}
                      <td className="px-6 py-4.5 text-left">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded text-xs font-semibold select-none ${escrow.style}`}
                        >
                          {escrow.label}
                        </span>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No funded payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 select-none">
        <span className="text-xs sm:text-sm text-gray-400 font-semibold">
          {selectedIds.length} of {filteredTasks.length} row(s) selected.
        </span>

        <div className="flex items-center gap-2">
          <button className="h-[38px] px-4 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition cursor-pointer select-none">
            Previous
          </button>
          <button className="h-[38px] px-4 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-[0.98] transition cursor-pointer select-none">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
