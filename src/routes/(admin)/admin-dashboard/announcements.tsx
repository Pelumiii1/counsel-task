import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowLeft,
  Sparkles,
  Loader2,
} from 'lucide-react'
import { RichTextEditor } from '#/components/ui/RichTextEditor'
import { toast } from 'sonner'
import { apiClient } from '#/lib/apiClient'
import { useHasPermission } from '#/hooks/useAdminRoles'

export const Route = createFileRoute('/(admin)/admin-dashboard/announcements')({
  component: AdminAnnouncementsPage,
})

interface AnnouncementItem {
  id: string
  rawId?: number
  title: string
  audience: 'All Users' | 'Engaging Lawyers' | 'Assisting Lawyers' | string
  status: 'Published' | 'Draft' | string
  createdBy: string
  publishedDate: string
  message?: string
}

function AnnouncementStatusBadge({ status }: { status: string }) {
  if (status === 'Published') {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]">
        Published
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#FFF8EC] text-[#D97706] border border-[#FEEFC6]">
      Draft
    </span>
  )
}

function AdminAnnouncementsPage() {
  const queryClient = useQueryClient()
  const canManageAnnouncements = useHasPermission('MANAGE_ANNOUNCEMENTS')
  const [isCreating, setIsCreating] = useState(false)

  // Fetch announcements from backend
  const { data: announcements = [], isFetching } = useQuery<AnnouncementItem[]>({
    queryKey: ['admin', 'announcements'],
    queryFn: async () => {
      const res = await apiClient.get<AnnouncementItem[]>('/admin/announcements')
      return res.data
    },
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (payload: Partial<AnnouncementItem>) => {
      const res = await apiClient.post<AnnouncementItem>('/admin/announcements', payload)
      return res.data
    },
    onSuccess: (data) => {
      toast.success(
        data.status === 'Published'
          ? 'Announcement published successfully!'
          : 'Announcement saved to draft!'
      )
      queryClient.invalidateQueries({ queryKey: ['admin', 'announcements'] })
      resetForm()
      setIsCreating(false)
    },
    onError: (err: any) => {
      if (err?.response?.status === 403) {
        toast.error('Access Denied: You do not have permission to manage announcements.')
      } else {
        toast.error('Failed to create announcement')
      }
    },
  })

  // Filters state
  const [search, setSearch] = useState('')
  const [audienceFilter, setAudienceFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  // Form State
  const [formTitle, setFormTitle] = useState('')
  const [formAudience, setFormAudience] = useState<string>('All Users')
  const [formStatus, setFormStatus] = useState<'Draft' | 'Publish Now'>('Publish Now')
  const [formMessage, setFormMessage] = useState('')

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.audience?.toLowerCase().includes(search.toLowerCase())

      const matchesAudience =
        audienceFilter === 'All' || item.audience === audienceFilter

      const matchesStatus =
        statusFilter === 'All' || item.status === statusFilter

      return matchesSearch && matchesAudience && matchesStatus
    })
  }, [announcements, search, audienceFilter, statusFilter])

  const handleSaveDraft = () => {
    if (!canManageAnnouncements) {
      toast.error('Permission denied: Action requires MANAGE_ANNOUNCEMENTS')
      return
    }
    if (!formTitle.trim()) {
      toast.error('Please enter an announcement title')
      return
    }

    createMutation.mutate({
      title: formTitle.trim(),
      audience: formAudience,
      status: 'Draft',
      createdBy: 'Admin',
      message: formMessage,
    })
  }

  const handlePublish = () => {
    if (!canManageAnnouncements) {
      toast.error('Permission denied: Action requires MANAGE_ANNOUNCEMENTS')
      return
    }
    if (!formTitle.trim()) {
      toast.error('Please enter an announcement title')
      return
    }

    createMutation.mutate({
      title: formTitle.trim(),
      audience: formAudience,
      status: 'Published',
      createdBy: 'Admin',
      message: formMessage,
    })
  }

  const resetForm = () => {
    setFormTitle('')
    setFormAudience('All Users')
    setFormStatus('Publish Now')
    setFormMessage('')
  }

  return (
    <div className="space-y-6">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[26px] font-medium text-[#101828] tracking-tight">
            Announcements
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#475467]">
            Create and broadcast platform-wide updates and notices to lawyers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isFetching && (
            <div className="flex items-center gap-2 text-xs text-[#00726D] bg-[#E8F7F5] px-3 py-1.5 rounded-lg w-fit">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Syncing announcements...</span>
            </div>
          )}

          {!isCreating && (
            <button
              type="button"
              disabled={!canManageAnnouncements}
              title={!canManageAnnouncements ? 'Requires MANAGE_ANNOUNCEMENTS permission' : undefined}
              onClick={() => {
                if (!canManageAnnouncements) {
                  toast.error('Permission denied: Action requires MANAGE_ANNOUNCEMENTS')
                  return
                }
                resetForm()
                setIsCreating(true)
              }}
              className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow-xs transition active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${!canManageAnnouncements ? 'bg-gray-400' : 'bg-[#00726D] hover:bg-[#005c58]'
                }`}
            >
              Create Announcement
            </button>
          )}
        </div>
      </div>

      {/* ── View 1: List Table View ── */}
      {!isCreating ? (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search announcement"
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

            {/* Audience Filter */}
            <div className="relative">
              <select
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
                className="h-10 px-3.5 pr-8 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition cursor-pointer shadow-2xs appearance-none"
              >
                <option value="All">Audience: All</option>
                <option value="All Users">All Users</option>
                <option value="Engaging Lawyers">Engaging Lawyers</option>
                <option value="Assisting Lawyers">Assisting Lawyers</option>
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
                <option value="All">Status: All</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Table Card */}
          <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FFFFFF] text-xs font-semibold text-[#344054]">
                    <th className="py-4 px-6">Announcement ID</th>
                    <th className="py-4 px-6">Title</th>
                    <th className="py-4 px-6">Target Audience</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Created By</th>
                    <th className="py-4 px-6">Published Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#344054]">
                  {filteredAnnouncements.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-400">
                        No announcements found in the database.
                      </td>
                    </tr>
                  ) : (
                    filteredAnnouncements.map((ann) => (
                      <tr
                        key={ann.id}
                        className="hover:bg-gray-50/70 transition"
                      >
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {ann.id}
                        </td>
                        <td className="py-4 px-6 font-normal text-[#101828]">
                          {ann.title}
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {ann.audience}
                        </td>
                        <td className="py-4 px-6">
                          <AnnouncementStatusBadge status={ann.status} />
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {ann.createdBy}
                        </td>
                        <td className="py-4 px-6 text-[#475467]">
                          {ann.publishedDate}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100 text-xs sm:text-sm text-gray-500">
              <span>0 of {filteredAnnouncements.length} row(s) selected.</span>
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
      ) : (
        /* ── View 2: Create Announcement Form ── */
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition text-sm font-medium cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Announcements</span>
          </button>

          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-xs max-w-4xl space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base sm:text-lg font-semibold text-[#101828]">
                Create Announcement
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] mt-1">
                Draft or publish an announcement to inform platform legal practitioners.
              </p>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Title Field */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs sm:text-sm font-medium text-[#344054]">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., Scheduled Platform Maintenance Notice"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm text-[#101828] focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] shadow-2xs transition"
                />
              </div>

              {/* Target Audience Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-medium text-[#344054]">
                  Target Audience
                </label>
                <div className="relative">
                  <select
                    value={formAudience}
                    onChange={(e: any) => setFormAudience(e.target.value)}
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] shadow-2xs transition appearance-none cursor-pointer"
                  >
                    <option value="All Users">All Users</option>
                    <option value="Engaging Lawyers">Engaging Lawyers</option>
                    <option value="Assisting Lawyers">Assisting Lawyers</option>
                  </select>
                  <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-medium text-[#344054]">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={formStatus}
                    onChange={(e: any) => setFormStatus(e.target.value)}
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-gray-200 bg-white text-sm font-normal text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] shadow-2xs transition appearance-none cursor-pointer"
                  >
                    <option value="Publish Now">Publish Now</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Message with Rich Text Toolbar */}
            <div className="space-y-2 pt-2">
              <label className="text-xs sm:text-sm font-medium text-[#344054]">
                Message Content
              </label>

              <RichTextEditor
                value={formMessage}
                onChange={setFormMessage}
                placeholder="Write your announcement content here..."
                minHeight="160px"
                rightExtra={
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 pr-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#00726D]" />
                    <span>Rich text enabled</span>
                  </div>
                }
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={createMutation.isPending}
                onClick={handleSaveDraft}
                className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-2xs transition cursor-pointer disabled:opacity-50"
              >
                Save to draft
              </button>

              <button
                type="button"
                disabled={createMutation.isPending}
                onClick={handlePublish}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00726D] hover:bg-[#005c58] text-white text-xs sm:text-sm font-medium shadow-xs transition cursor-pointer active:scale-[0.99] disabled:opacity-50"
              >
                {createMutation.isPending && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                <span>Publish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
