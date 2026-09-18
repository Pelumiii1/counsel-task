import { createFileRoute } from '@tanstack/react-router'
import { Info, Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '#/lib/apiClient'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export const Route = createFileRoute('/(admin)/admin-dashboard/')({
  component: AdminOverviewPage,
})

interface AdminOverviewData {
  totalLawyers: number
  activeTasks: number
  awaitingApproval: number
  disputedTasks: number
  monthlyRevenue: string
  pendingPayouts: string
  platformFees: string
  completionRate: string
  taskStatusDistribution: Array<{
    name: string
    value: number
    color: string
    textCol: string
  }>
  lawyersCategoryDistribution: Array<{
    name: string
    value: number
    color: string
    textCol: string
  }>
  revenueTrend: Array<{
    month: string
    revenue: number
  }>
  recentTasks: Array<{
    id: string
    title: string
    engagingLawyer: string
    assistingLawyer: string
    status: string
    statusType: 'neutral' | 'warning' | 'success' | string
    created: string
  }>
  recentTransactions: Array<{
    id: string
    lawyer: string
    amount: string
    status: string
    statusType: 'neutral' | 'warning' | 'success' | string
    date: string
  }>
}

function StatNetworkIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#E5F5F3] flex items-center justify-center text-[#00726D] shrink-0">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="18" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M10.2 6.8L6.8 15.2" />
        <path d="M13.8 6.8L17.2 15.2" />
        <path d="M7.5 18h9" />
      </svg>
    </div>
  )
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string
  value: string | number
  description: string
}) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs sm:text-sm font-normal text-[#344054]">
          {title}
        </span>
        <StatNetworkIcon />
      </div>
      <div className="mt-2">
        <p className="text-2xl sm:text-3xl font-semibold text-[#101828] tracking-tight">
          {value}
        </p>
        <div className="mt-2 flex items-start gap-1.5 text-[11px] sm:text-xs text-[#667085]">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>{description}</span>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({
  status,
  type,
}: {
  status: string
  type: 'neutral' | 'warning' | 'success' | string
}) {
  const styles: Record<string, string> = {
    neutral: 'bg-[#F2F4F7] text-[#344054] border border-[#EAECF0]',
    warning: 'bg-[#FFF4F2] text-[#F04438] border border-[#FECDCA]',
    success: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${styles[type] || styles.neutral
        }`}
    >
      {status}
    </span>
  )
}

const renderTaskPieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  name,
}: any) => {
  if (!value || value === 0) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  const isLight = name === 'Active' || name === 'Disputed'

  return (
    <text
      x={x}
      y={y}
      fill={isLight ? '#00726D' : '#FFFFFF'}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${value}%`}
    </text>
  )
}

const renderLawyersPieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  name,
}: any) => {
  if (!value || value === 0) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  const isLight = name === 'Assisting Lawyer'

  return (
    <text
      x={x}
      y={y}
      fill={isLight ? '#00726D' : '#FFFFFF'}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {value}
    </text>
  )
}

function AdminOverviewPage() {
  const { data, isFetching } = useQuery<AdminOverviewData>({
    queryKey: ['admin', 'overview'],
    queryFn: async () => {
      const res = await apiClient.get<AdminOverviewData>('/admin/overview')
      return res.data
    },
  })

  const totalLawyers = data?.totalLawyers ?? 0
  const activeTasks = data?.activeTasks ?? 0
  const awaitingApproval = data?.awaitingApproval ?? 0
  const disputedTasks = data?.disputedTasks ?? 0
  const monthlyRevenue = data?.monthlyRevenue ?? '₦0'
  const pendingPayouts = data?.pendingPayouts ?? '₦0'
  const platformFees = data?.platformFees ?? '₦0'
  const completionRate = data?.completionRate ?? '0%'

  const taskStatusPie = data?.taskStatusDistribution ?? [
    { name: 'Completed', value: 0, color: '#004B45', textCol: '#FFFFFF' },
    { name: 'Active', value: 0, color: '#E0EFEA', textCol: '#00726D' },
    { name: 'Awaiting Approval', value: 0, color: '#00726D', textCol: '#FFFFFF' },
    { name: 'Cancelled', value: 0, color: '#008C84', textCol: '#FFFFFF' },
    { name: 'Disputed', value: 0, color: '#93CAC3', textCol: '#004B45' },
  ]

  const lawyersCategoryPie = data?.lawyersCategoryDistribution ?? [
    { name: 'Engaging Lawyer', value: 0, color: '#00726D', textCol: '#FFFFFF' },
    { name: 'Assisting Lawyer', value: 0, color: '#E0EFEA', textCol: '#00726D' },
  ]

  const revenueTrend = data?.revenueTrend ?? [
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 0 },
    { month: 'Apr', revenue: 0 },
    { month: 'May', revenue: 0 },
    { month: 'Jun', revenue: 0 },
    { month: 'Jul', revenue: 0 },
    { month: 'Aug', revenue: 0 },
    { month: 'Sep', revenue: 0 },
    { month: 'Oct', revenue: 0 },
    { month: 'Nov', revenue: 0 },
    { month: 'Dec', revenue: 0 },
  ]

  const recentTasks = data?.recentTasks ?? []
  const recentTransactions = data?.recentTransactions ?? []

  const statCardsRow1 = [
    {
      title: 'Total Lawyers',
      value: totalLawyers,
      description: 'Registered lawyers using the platform.',
    },
    {
      title: 'Active Tasks',
      value: activeTasks,
      description: 'Tasks currently in progress',
    },
    {
      title: 'Awaiting Approval',
      value: awaitingApproval,
      description: 'Submitted by assisting lawyer, waiting for engaging lawyer',
    },
  ]

  const statCardsRow2 = [
    {
      title: 'Disputed Tasks',
      value: disputedTasks,
      description: 'Tasks currently under dispute',
    },
    {
      title: 'Revenue (This Month)',
      value: monthlyRevenue,
      description: 'Total platform revenue',
    },
    {
      title: 'Pending Payouts',
      value: pendingPayouts,
      description: 'Money waiting to be paid to assisting lawyers',
    },
  ]

  const statCardsRow3 = [
    {
      title: 'Platform Fees',
      value: platformFees,
      description: 'Platform earnings this month',
    },
    {
      title: 'Completion Rate',
      value: completionRate,
      description: 'Percentage of completed tasks',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Loading Indicator Pill if fetching in background */}
      {isFetching && (
        <div className="flex items-center gap-2 text-xs text-[#00726D] bg-[#E8F7F5] px-3 py-1.5 rounded-lg w-fit">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Syncing real-time admin metrics...</span>
        </div>
      )}

      {/* ── Metric Cards ── */}
      <div className="space-y-4">
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {statCardsRow1.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* Row 2: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {statCardsRow2.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        {/* Row 3: 2 cards spanning equal width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {statCardsRow3.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      {/* ── Charts Row: Task Status & Lawyers Category ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Task Status Chart */}
        <div className="lg:col-span-7 rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#101828]">
              Task Status Chart
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#475467]">
              Monitor the distribution of tasks across each stage of the workflow.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Donut / Pie */}
            <div className="w-50 h-50 sm:w-55 sm:h-55 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusPie}
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    dataKey="value"
                    labelLine={false}
                    label={renderTaskPieLabel}
                    stroke="#ffffff"
                    strokeWidth={2}
                  >
                    {taskStatusPie.map((entry, idx) => (
                      <Cell key={`task-cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend List */}
            <div className="w-full sm:w-auto flex-1 space-y-3 pl-0 sm:pl-6 text-sm">
              {taskStatusPie.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-xs sm:text-sm"
                >
                  <span className="text-[#344054] font-normal">
                    {item.name}
                  </span>
                  <span className="text-[#101828] font-medium ml-4">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Revenue Trend Card ── */}
      <section className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-7 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#101828]">
            Revenue Trend
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#475467]">
            Displays monthly revenue generated from completed legal tasks over the selected reporting period.
          </p>
        </div>

        <div className="mt-6 w-full h-70 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueTrend}
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E4E7EC"
              />
              <XAxis
                dataKey="month"
                axisLine={{ stroke: '#E4E7EC' }}
                tickLine={false}
                tick={{ fill: '#667085', fontSize: 12 }}
                dy={5}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#667085', fontSize: 12 }}
                tickFormatter={(val) => `${val}k`}
              />
              <Bar
                dataKey="revenue"
                fill="#00726D"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ── Tables Row: Recent Tasks & Recent Transactions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Tasks Table */}
        <div className="lg:col-span-7 rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-[#101828]">
              Recent Tasks
            </h2>
            <span className="text-xs text-[#00726D] font-medium hover:underline cursor-pointer">
              View all
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                  <th className="py-3.5 px-5">Task ID</th>
                  <th className="py-3.5 px-5">Task</th>
                  <th className="py-3.5 px-5">Engaging Lawyer</th>
                  <th className="py-3.5 px-5">Assisting Lawyer</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
                {recentTasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No tasks found in the database.
                    </td>
                  </tr>
                ) : (
                  recentTasks.map((task, idx) => (
                    <tr
                      key={`${task.id}-${idx}`}
                      className="hover:bg-gray-50/70 transition"
                    >
                      <td className="py-3.5 px-5 font-normal text-[#101828]">
                        {task.id}
                      </td>
                      <td className="py-3.5 px-5 font-normal text-[#101828]">
                        {task.title}
                      </td>
                      <td className="py-3.5 px-5 text-[#475467]">
                        {task.engagingLawyer}
                      </td>
                      <td className="py-3.5 px-5 text-[#475467]">
                        {task.assistingLawyer}
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge
                          status={task.status}
                          type={task.statusType}
                        />
                      </td>
                      <td className="py-3.5 px-5 text-[#475467]">
                        {task.created}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="lg:col-span-5 rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-[#101828]">
              Recent Transactions
            </h2>
            <span className="text-xs text-[#00726D] font-medium hover:underline cursor-pointer">
              View all
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                  <th className="py-3.5 px-5">Transaction ID</th>
                  <th className="py-3.5 px-5">Lawyer</th>
                  <th className="py-3.5 px-5">Amount</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
                {recentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      No transactions recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentTransactions.map((trx, idx) => (
                    <tr
                      key={`${trx.id}-${idx}`}
                      className="hover:bg-gray-50/70 transition"
                    >
                      <td className="py-3.5 px-5 font-normal text-[#101828]">
                        {trx.id}
                      </td>
                      <td className="py-3.5 px-5 text-[#475467]">
                        {trx.lawyer}
                      </td>
                      <td className="py-3.5 px-5 font-normal text-[#101828]">
                        {trx.amount}
                      </td>
                      <td className="py-3.5 px-5">
                        <StatusBadge
                          status={trx.status}
                          type={trx.statusType}
                        />
                      </td>
                      <td className="py-3.5 px-5 text-[#475467]">
                        {trx.date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
