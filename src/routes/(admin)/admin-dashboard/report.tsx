import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Info, Loader2 } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { apiClient } from '#/lib/apiClient'

export const Route = createFileRoute('/(admin)/admin-dashboard/report')({
  component: AdminReportsPage,
})

type ReportTab = 'users' | 'revenue' | 'task'

interface AdminReportsDto {
  totalUsers: number
  engagingLawyers: number
  assistingLawyers: number
  verifiedLawyers: number
  userGrowth: Array<{ month: string; users: number }>
  lawyersDistribution: Array<{ name: string; value: number; color: string; textCol?: string }>
  usersMonthlyTable: Array<{
    month: string
    newUsers: number
    engagingLawyer: number
    assistingLawyer: number
    totalUsers: number
  }>

  totalRevenue: string
  platformEarnings: string
  totalPayouts: string
  pendingPayouts: string
  revenueTrend: Array<{ month: string; revenue: number; display: string }>
  revenueBreakdown: Array<{ name: string; value: number; color: string; textCol?: string }>
  monthlyRevenueTable: Array<{
    month: string
    totalRevenue: string
    platformEarnings: string
    totalPayouts: string
    pendingPayouts: string
  }>

  totalTasks: number
  completedTasks: number
  activeTasks: number
  disputedTasks: number
  taskCreationTrend: Array<{ month: string; created: number; completed: number }>
  taskCategoryDistribution: Array<{ name: string; value: number; color: string; textCol?: string }>
  monthlyTasksTable: Array<{
    month: string
    created: number
    completed: number
    active: number
    cancelled: number
    disputed: number
  }>
}

function ReportStatCard({
  title,
  value,
  description,
}: {
  title: string
  value: string | number
  description: string
}) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-gray-300 transition-colors">
      <span className="text-xs sm:text-sm font-normal text-[#344054]">
        {title}
      </span>
      <div className="mt-2">
        <p className="text-2xl sm:text-3xl font-semibold text-[#101828] tracking-tight">
          {value}
        </p>
        <div className="mt-2 flex items-start gap-1.5 text-[11px] sm:text-xs text-[#667085]">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span className="line-clamp-1 text-ellipsis">{description}</span>
        </div>
      </div>
    </div>
  )
}

const renderPieWithLabels = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  name,
}: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.58
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (value === 0) return null

  return (
    <text
      x={x}
      y={y}
      fill="#FFFFFF"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold pointer-events-none drop-shadow-xs"
    >
      {value}
    </text>
  )
}

function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('users')

  const { data: reportData, isFetching } = useQuery<AdminReportsDto>({
    queryKey: ['admin', 'reports'],
    queryFn: async () => {
      const res = await apiClient.get<AdminReportsDto>('/admin/reports')
      return res.data
    },
  })

  // Fallback structures if loading
  const totalUsers = reportData?.totalUsers ?? 3
  const engagingLawyers = reportData?.engagingLawyers ?? 2
  const assistingLawyers = reportData?.assistingLawyers ?? 1
  const verifiedLawyers = reportData?.verifiedLawyers ?? 2
  const userGrowth = reportData?.userGrowth || []
  const lawyersDistribution = reportData?.lawyersDistribution || [
    { name: 'Engaging Lawyer', value: 2, color: '#00726D' },
    { name: 'Assisting Lawyer', value: 1, color: '#E0EFEA' },
  ]
  const usersMonthlyTable = reportData?.usersMonthlyTable || []

  const totalRevenue = reportData?.totalRevenue || '₦200,000'
  const platformEarnings = reportData?.platformEarnings || '₦20,000'
  const totalPayouts = reportData?.totalPayouts || '₦180,000'
  const pendingPayouts = reportData?.pendingPayouts || '₦225,000'
  const revenueTrend = reportData?.revenueTrend || []
  const revenueBreakdown = reportData?.revenueBreakdown || [
    { name: 'Platform Earnings', value: 20000, color: '#00726D' },
    { name: 'Lawyer Payouts', value: 180000, color: '#E0EFEA' },
  ]
  const monthlyRevenueTable = reportData?.monthlyRevenueTable || []

  const totalTasks = reportData?.totalTasks ?? 3
  const completedTasks = reportData?.completedTasks ?? 0
  const activeTasks = reportData?.activeTasks ?? 2
  const disputedTasks = reportData?.disputedTasks ?? 0
  const taskCreationTrend = reportData?.taskCreationTrend || []
  const taskCategoryDistribution = reportData?.taskCategoryDistribution || [
    { name: 'Property Law', value: 40, color: '#004B45' },
    { name: 'Corporate Law', value: 30, color: '#00726D' },
    { name: 'Litigation', value: 20, color: '#93CAC3' },
    { name: 'General Practice', value: 10, color: '#E0EFEA' },
  ]
  const monthlyTasksTable = reportData?.monthlyTasksTable || []

  return (
    <div className="space-y-6">
      {/* ── Section Title ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-medium text-[#101828] tracking-tight">
            Reports
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#475467]">
            Analytics, user metrics, and operational performance insights.
          </p>
        </div>

        {isFetching && (
          <div className="flex items-center gap-2 text-xs text-[#00726D] bg-[#E8F7F5] px-3 py-1.5 rounded-lg w-fit">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Syncing report analytics...</span>
          </div>
        )}
      </div>

      {/* ── Segmented Navigation Pills ── */}
      <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`h-11 px-8 rounded-full text-xs sm:text-sm font-medium transition duration-150 cursor-pointer ${
            activeTab === 'users'
              ? 'bg-[#031625] text-white shadow-xs'
              : 'bg-[#E8ECEF] text-gray-700 hover:bg-[#dfe4e8]'
          }`}
        >
          Users
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('revenue')}
          className={`h-11 px-8 rounded-full text-xs sm:text-sm font-medium transition duration-150 cursor-pointer ${
            activeTab === 'revenue'
              ? 'bg-[#031625] text-white shadow-xs'
              : 'bg-[#E8ECEF] text-gray-700 hover:bg-[#dfe4e8]'
          }`}
        >
          Revenue
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('task')}
          className={`h-11 px-8 rounded-full text-xs sm:text-sm font-medium transition duration-150 cursor-pointer ${
            activeTab === 'task'
              ? 'bg-[#031625] text-white shadow-xs'
              : 'bg-[#E8ECEF] text-gray-700 hover:bg-[#dfe4e8]'
          }`}
        >
          Task
        </button>
      </div>

      {/* ── 1. USERS SUB-TAB ── */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* 4 Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <ReportStatCard
              title="Total Users"
              value={totalUsers}
              description="Platform total verified legal accounts"
            />
            <ReportStatCard
              title="Engaging Lawyers"
              value={engagingLawyers}
              description="Lawyers creating task briefs"
            />
            <ReportStatCard
              title="Assisting Lawyers"
              value={assistingLawyers}
              description="Lawyers assisting and submitting proposals"
            />
            <ReportStatCard
              title="Verified Practitioners"
              value={verifiedLawyers}
              description="Practitioners with verified credentials"
            />
          </div>

          {/* 2 Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Bar Chart */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#101828]">
                  Monthly User Registrations
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Platform signup growth across the last 12 months
                </p>
              </div>

              <div className="h-64 w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userGrowth} barSize={22}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F2F4F7"
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#667085' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#667085' }}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(0, 114, 109, 0.04)' }}
                      contentStyle={{
                        backgroundColor: '#101828',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="users" fill="#00726D" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Lawyers Distribution Solid Pie Chart */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#101828]">
                  Lawyers Category Distribution
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Engaging Counsel vs. Assisting Counsel ratio
                </p>
              </div>

              <div className="h-64 w-full mt-6 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={lawyersDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={95}
                      paddingAngle={1}
                      dataKey="value"
                      labelLine={false}
                      label={renderPieWithLabels}
                    >
                      {lawyersDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(val) => (
                        <span className="text-xs text-[#344054] font-medium ml-1">
                          {val}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monthly Table Card */}
          <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
            <div className="p-5 sm:px-6 border-b border-gray-100">
              <h3 className="text-base font-semibold text-[#101828]">
                Monthly Users Summary
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                    <th className="py-4 px-6">Month</th>
                    <th className="py-4 px-6">New Users</th>
                    <th className="py-4 px-6">Engaging Lawyer</th>
                    <th className="py-4 px-6">Assisting Lawyer</th>
                    <th className="py-4 px-6">Total Cumulative Users</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
                  {usersMonthlyTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/70 transition">
                      <td className="py-4 px-6 font-medium text-[#101828]">
                        {row.month}
                      </td>
                      <td className="py-4 px-6 text-[#475467]">
                        {row.newUsers}
                      </td>
                      <td className="py-4 px-6 text-[#475467]">
                        {row.engagingLawyer}
                      </td>
                      <td className="py-4 px-6 text-[#475467]">
                        {row.assistingLawyer}
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#101828]">
                        {row.totalUsers}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. REVENUE SUB-TAB ── */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          {/* 4 Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <ReportStatCard
              title="Total Revenue"
              value={totalRevenue}
              description="Gross platform transactional volume"
            />
            <ReportStatCard
              title="Platform Commission (10%)"
              value={platformEarnings}
              description="Net revenue earned by Counsel Task"
            />
            <ReportStatCard
              title="Total Lawyer Payouts"
              value={totalPayouts}
              description="Total disbursed to assisting practitioners"
            />
            <ReportStatCard
              title="Pending Escrow / Payouts"
              value={pendingPayouts}
              description="In-progress work awaiting milestone release"
            />
          </div>

          {/* 2 Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue Trend */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#101828]">
                  Monthly Platform Revenue Trend
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Monthly platform volume progression
                </p>
              </div>

              <div className="h-64 w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueTrend} barSize={26}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F2F4F7"
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#667085' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `₦${val / 1000}k`}
                      tick={{ fontSize: 11, fill: '#667085' }}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(0, 114, 109, 0.04)' }}
                      formatter={(val: any) => [`₦${Number(val).toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: '#101828',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#00726D"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Breakdown Solid Pie Chart */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#101828]">
                  Revenue & Payout Distribution
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Platform Fee Share vs. Lawyer Earnings Share
                </p>
              </div>

              <div className="h-64 w-full mt-6 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={95}
                      paddingAngle={1}
                      dataKey="value"
                      labelLine={false}
                      label={renderPieWithLabels}
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(val) => (
                        <span className="text-xs text-[#344054] font-medium ml-1">
                          {val}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Table */}
          <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
            <div className="p-5 sm:px-6 border-b border-gray-100">
              <h3 className="text-base font-semibold text-[#101828]">
                Monthly Financial Breakdown
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                    <th className="py-4 px-6">Month</th>
                    <th className="py-4 px-6">Total Gross Volume</th>
                    <th className="py-4 px-6">Platform Commission</th>
                    <th className="py-4 px-6">Total Disbursed</th>
                    <th className="py-4 px-6">Pending Escrow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
                  {monthlyRevenueTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/70 transition">
                      <td className="py-4 px-6 font-medium text-[#101828]">
                        {row.month}
                      </td>
                      <td className="py-4 px-6 font-semibold text-[#101828]">
                        {row.totalRevenue}
                      </td>
                      <td className="py-4 px-6 text-[#00726D] font-medium">
                        {row.platformEarnings}
                      </td>
                      <td className="py-4 px-6 text-[#475467]">
                        {row.totalPayouts}
                      </td>
                      <td className="py-4 px-6 text-[#D97706] font-medium">
                        {row.pendingPayouts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. TASK SUB-TAB ── */}
      {activeTab === 'task' && (
        <div className="space-y-6">
          {/* 4 Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <ReportStatCard
              title="Total Tasks"
              value={totalTasks}
              description="All legal briefs posted across platform"
            />
            <ReportStatCard
              title="Completed Tasks"
              value={completedTasks}
              description="Successfully fulfilled and verified tasks"
            />
            <ReportStatCard
              title="Active / In Progress"
              value={activeTasks}
              description="Currently assigned briefs in progress"
            />
            <ReportStatCard
              title="Disputed Tasks"
              value={disputedTasks}
              description="Briefs currently under admin arbitration"
            />
          </div>

          {/* 2 Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task Creation vs Completion Trend */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#101828]">
                  Task Activity Progression
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Created vs. Completed tasks comparison
                </p>
              </div>

              <div className="h-64 w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskCreationTrend} barSize={14}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F2F4F7"
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#667085' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: '#667085' }}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(0, 114, 109, 0.04)' }}
                      contentStyle={{
                        backgroundColor: '#101828',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      height={32}
                      iconType="circle"
                      formatter={(val) => (
                        <span className="text-xs text-[#344054] font-medium ml-1">
                          {val}
                        </span>
                      )}
                    />
                    <Bar
                      name="Created"
                      dataKey="created"
                      fill="#00726D"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      name="Completed"
                      dataKey="completed"
                      fill="#93CAC3"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Task Category Distribution Solid Pie Chart */}
            <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#101828]">
                  Task Practice Area Distribution
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Distribution of legal tasks across practice disciplines
                </p>
              </div>

              <div className="h-64 w-full mt-6 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskCategoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={95}
                      paddingAngle={1}
                      dataKey="value"
                      labelLine={false}
                      label={renderPieWithLabels}
                    >
                      {taskCategoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      formatter={(val) => (
                        <span className="text-xs text-[#344054] font-medium ml-1">
                          {val}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monthly Task Summary Table */}
          <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
            <div className="p-5 sm:px-6 border-b border-gray-100">
              <h3 className="text-base font-semibold text-[#101828]">
                Monthly Tasks Summary
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                    <th className="py-4 px-6">Month</th>
                    <th className="py-4 px-6">Created</th>
                    <th className="py-4 px-6">Completed</th>
                    <th className="py-4 px-6">Active</th>
                    <th className="py-4 px-6">Cancelled</th>
                    <th className="py-4 px-6">Disputed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
                  {monthlyTasksTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/70 transition">
                      <td className="py-4 px-6 font-medium text-[#101828]">
                        {row.month}
                      </td>
                      <td className="py-4 px-6 text-[#475467]">
                        {row.created}
                      </td>
                      <td className="py-4 px-6 text-[#00726D] font-medium">
                        {row.completed}
                      </td>
                      <td className="py-4 px-6 text-[#175CD3]">
                        {row.active}
                      </td>
                      <td className="py-4 px-6 text-[#F04438]">
                        {row.cancelled}
                      </td>
                      <td className="py-4 px-6 text-[#D97706]">
                        {row.disputed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
