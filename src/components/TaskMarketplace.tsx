import { useState } from 'react'

export function TaskMarketplace() {
  const [activeFilter, setActiveFilter] = useState('All Task')

  const filters = [
    'All Task',
    'Practice Area',
    'Court Location',
    'Deadline',
    'Task Type',
    'Budget',
  ]

  const tasks = [
    {
      title: 'Hold Brief — Land Dispute',
      category: 'Property Law',
      court: 'Ikeja High Court',
      deadline: 'Tomorrow, 9:00am',
      budget: '₦35,000',
      status: 'Open',
      statusColor: 'bg-[#E6F2FF] text-[#0056B3]',
    },
    {
      title: 'Draft Statement of Defence',
      category: 'Commercial Litigation',
      court: 'Remote',
      deadline: '3 days',
      budget: '₦120,000',
      status: 'In Progress',
      statusColor: 'bg-[#E6F8F3] text-[#008A5E]',
    },
    {
      title: 'Court Appearance — Bail Application',
      category: 'Criminal Law',
      court: 'Yaba Magistrate Court',
      deadline: 'Friday, 8:30am',
      budget: '₦45,000',
      status: 'Proposal Recieved',
      statusColor: 'bg-[#FFF0EB] text-[#CF6A52]',
    },
  ]

  return (
    <section
      id="marketplace"
      className="w-full bg-[#F4F0E8] py-20 md:py-28 border-t border-gray-200/40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl flex flex-col space-y-5 mb-12">
          {/* Kicker Badge */}
          <div className="flex items-center space-x-3">
            <span className="h-[1.5px] w-8 bg-[#00726D]" />
            <span className="text-[12px] font-roboto font-light tracking-[0.25em] text-[#00726D] uppercase">
              Task Marketplace
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-primary text-3xl sm:text-4xl md:text-[40px] font-medium leading-[1.2] text-[#041626] tracking-tight">
            Every open task, filtered your way.
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-[#242424]/80 leading-relaxed font-secondary font-light max-w-xl">
            Once signed in and verified, browse tasks by practice area, court
            location, deadline, type, and budget.
          </p>
        </div>

        {/* Dashboard Mockup Card */}
        <div className="w-full rounded-2xl border border-gray-200/40 bg-[#EFEBE4]/50 p-5 md:p-6 shadow-sm flex flex-col space-y-6">
          {/* Filters Row */}
          <div className="flex flex-wrap gap-2.5 font-secondary">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#041626] text-white border-[#041626]'
                    : 'bg-white text-[#242424]/80 border-gray-300/60 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="overflow-hidden border border-gray-200/50 rounded-xl bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-xs font-secondary min-w-175">
              <thead className="bg-gray-50 border-b border-gray-150 text-gray-500 uppercase tracking-wider text-[10px] font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">Task</th>
                  <th className="px-6 py-4 text-left">Court</th>
                  <th className="px-6 py-4 text-left">Deadline</th>
                  <th className="px-6 py-4 text-left">Budget</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[#041626] font-medium">
                {tasks.map((task, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/40 transition-colors"
                  >
                    {/* Task Title & Category */}
                    <td className="px-6 py-4.5">
                      <span className="block font-semibold text-sm">
                        {task.title}
                      </span>
                      <span className="text-[10px] text-gray-400 block font-normal mt-0.5">
                        {task.category}
                      </span>
                    </td>
                    {/* Court */}
                    <td className="px-6 py-4.5 text-gray-500 text-sm align-middle">
                      {task.court}
                    </td>
                    {/* Deadline */}
                    <td className="px-6 py-4.5 text-gray-500 text-sm align-middle">
                      {task.deadline}
                    </td>
                    {/* Budget */}
                    <td className="px-6 py-4.5 text-[#041626] text-sm font-bold align-middle">
                      {task.budget}
                    </td>
                    {/* Status Pill */}
                    <td className="px-6 py-4.5 align-middle">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${task.statusColor}`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
