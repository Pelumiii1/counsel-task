import { useState, useMemo } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Search,
  SlidersHorizontal,
  CircleUserRound,
  Eye,
  X,
  Loader2,
} from 'lucide-react'
import { apiClient } from '#/lib/apiClient'

export const Route = createFileRoute('/(admin)/admin-dashboard/lawyers/')({
  component: AdminLawyersListPage,
})

interface AdminLawyerItem {
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
}

function StatusBadge({
  status,
  type,
}: {
  status: string
  type: 'verified' | 'pending' | 'active' | 'suspended' | string
}) {
  const styles: Record<string, string> = {
    verified: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
    pending: 'bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]',
    active: 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]',
    suspended: 'bg-[#FEF3F2] text-[#F04438] border border-[#FECDCA]',
  }

  const key = type.toLowerCase()

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

function AdminLawyersListPage() {
  const navigate = useNavigate()

  // Fetch lawyers from live backend
  const { data: lawyers = [], isFetching } = useQuery<AdminLawyerItem[]>({
    queryKey: ['admin', 'lawyers'],
    queryFn: async () => {
      const res = await apiClient.get<AdminLawyerItem[]>('/admin/lawyers')
      return res.data
    },
  })

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'All' | 'Engaging' | 'Assisting'>('All')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended'>('All')
  const [verifFilter, setVerifFilter] = useState<'All' | 'Verified' | 'Pending'>('All')

  const filteredLawyers = useMemo(() => {
    return lawyers.filter((l) => {
      const matchesSearch =
        l.name?.toLowerCase().includes(search.toLowerCase()) ||
        l.id?.toLowerCase().includes(search.toLowerCase()) ||
        l.email?.toLowerCase().includes(search.toLowerCase())

      const matchesRole =
        roleFilter === 'All' ||
        (roleFilter === 'Engaging' && l.role?.toLowerCase().includes('engaging')) ||
        (roleFilter === 'Assisting' && l.role?.toLowerCase().includes('assisting'))

      const matchesStatus =
        statusFilter === 'All' ||
        l.status?.toLowerCase() === statusFilter.toLowerCase()

      const matchesVerif =
        verifFilter === 'All' ||
        (verifFilter === 'Verified' && l.verification === 'Verified') ||
        (verifFilter === 'Pending' && l.verification?.includes('Pending'))

      return matchesSearch && matchesRole && matchesStatus && matchesVerif
    })
  }, [lawyers, search, roleFilter, statusFilter, verifFilter])

  return (
    <div className="space-y-6">
      {/* ── Section Title ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-medium text-[#101828] tracking-tight">
            Lawyers
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#475467]">
            View and manage all registered legal practitioners.
          </p>
        </div>

        {isFetching && (
          <div className="flex items-center gap-2 text-xs text-[#00726D] bg-[#E8F7F5] px-3 py-1.5 rounded-lg w-fit">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Syncing lawyers...</span>
          </div>
        )}
      </div>

      {/* ── Search and Filter Bar ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or ID"
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

        {/* Role Filter */}
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e: any) => setRoleFilter(e.target.value)}
            className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
          >
            <option value="All">Role: All</option>
            <option value="Engaging">Role: Engaging Lawyer</option>
            <option value="Assisting">Role: Assisting Lawyer</option>
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
          >
            <option value="All">Status: All</option>
            <option value="Active">Status: Active</option>
            <option value="Suspended">Status: Suspended</option>
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>

        {/* Verification Filter */}
        <div className="relative">
          <select
            value={verifFilter}
            onChange={(e: any) => setVerifFilter(e.target.value)}
            className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
          >
            <option value="All">Verification: All</option>
            <option value="Verified">Verification: Verified</option>
            <option value="Pending">Verification: Pending</option>
          </select>
          <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* ── Lawyers Table Card ── */}
      <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                <th className="py-4 px-6">Lawyer ID</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Verification</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Joined</th>
                <th className="py-4 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
              {filteredLawyers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No lawyers found in the database.
                  </td>
                </tr>
              ) : (
                filteredLawyers.map((lawyer) => (
                  <tr
                    key={lawyer.id}
                    onClick={() =>
                      navigate({
                        to: '/admin-dashboard/lawyers/$lawyerId',
                        params: { lawyerId: lawyer.id },
                      })
                    }
                    className="hover:bg-gray-50/70 transition cursor-pointer"
                  >
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      {lawyer.id}
                    </td>
                    <td className="py-4 px-6 font-normal text-[#101828]">
                      <div className="flex items-center gap-2.5">
                        <CircleUserRound className="w-4.5 h-4.5 text-gray-400 shrink-0" />
                        <span>{lawyer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge
                        status={lawyer.verification}
                        type={
                          lawyer.verification === 'Verified'
                            ? 'verified'
                            : 'pending'
                        }
                      />
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge
                        status={lawyer.status}
                        type={
                          lawyer.status === 'Active' ? 'active' : 'suspended'
                        }
                      />
                    </td>
                    <td className="py-4 px-6 text-[#475467]">
                      {lawyer.joined}
                    </td>
                    <td
                      className="py-4 px-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to="/admin-dashboard/lawyers/$lawyerId"
                        params={{ lawyerId: lawyer.id }}
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
          <span>0 of {filteredLawyers.length} row(s) selected.</span>
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
