import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  KeyRound,
  Plus,
  Check,
  X,
  Edit2,
  Trash2,
  AlertCircle,
  Loader2,
  Search,
  CheckCircle2,
  Lock,
  UserCheck,
  Sparkles,
  Layers,
  HelpCircle,
  UserPlus,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  useAdminRoles,
  useAdminPermissions,
  useMyRole,
  useAdminStaff,
  useCreateRole,
  useUpdateRole,
  useDeleteRole,
  useAssignStaffRole,
  useCreateStaff,
  useHasPermission,
  type AdminRoleItem,
  type PermissionDefinition,
} from '#/hooks/useAdminRoles'

export const Route = createFileRoute('/(admin)/admin-dashboard/roles')({
  component: AdminRolesPage,
})

type ActiveTab = 'roles' | 'staff' | 'matrix'

export default function AdminRolesPage() {
  const { data: roles = [], isLoading: isLoadingRoles } = useAdminRoles()
  const { data: permissions = [], isLoading: isLoadingPermissions } = useAdminPermissions()
  const { data: myRole, isLoading: isLoadingMyRole } = useMyRole()
  const { data: staffList = [], isLoading: isLoadingStaff } = useAdminStaff()

  const createRoleMutation = useCreateRole()
  const updateRoleMutation = useUpdateRole()
  const deleteRoleMutation = useDeleteRole()
  const assignStaffMutation = useAssignStaffRole()
  const createStaffMutation = useCreateStaff()

  const canManageRoles = useHasPermission('MANAGE_ROLES')

  const [activeTab, setActiveTab] = useState<ActiveTab>('roles')
  const [searchQuery, setSearchQuery] = useState('')
  const [staffSearchQuery, setStaffSearchQuery] = useState('')

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<AdminRoleItem | null>(null)
  const [deletingRole, setDeletingRole] = useState<AdminRoleItem | null>(null)

  // Staff creation modal state
  const [isCreateStaffModalOpen, setIsCreateStaffModalOpen] = useState(false)
  const [staffFirstName, setStaffFirstName] = useState('')
  const [staffLastName, setStaffLastName] = useState('')
  const [staffEmail, setStaffEmail] = useState('')
  const [staffPassword, setStaffPassword] = useState('')
  const [staffRoleId, setStaffRoleId] = useState<number | ''>('')

  // Form states for create/edit
  const [formName, setFormName] = useState('')
  const [formCode, setFormCode] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formPermissions, setFormPermissions] = useState<string[]>([])

  // Group permissions by module
  const permissionsByModule = useMemo(() => {
    const grouped: Record<string, PermissionDefinition[]> = {}
    permissions.forEach((perm) => {
      const mod = perm.module || 'General'
      if (!grouped[mod]) grouped[mod] = []
      grouped[mod].push(perm)
    })
    return grouped
  }, [permissions])

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setFormName('')
    setFormCode('')
    setFormDescription('')
    setFormPermissions(['VIEW_OVERVIEW'])
    setIsCreateModalOpen(true)
  }

  // Open Edit Modal
  const handleOpenEditModal = (role: AdminRoleItem) => {
    setEditingRole(role)
    setFormName(role.name)
    setFormCode(role.code)
    setFormDescription(role.description || '')
    setFormPermissions(role.permissions || [])
  }

  // Toggle permission in form
  const handleTogglePermission = (code: string) => {
    setFormPermissions((prev) =>
      prev.includes(code) ? prev.filter((p) => p !== code) : [...prev, code]
    )
  }

  // Select/Deselect all permissions
  const handleSelectAll = () => {
    setFormPermissions(permissions.map((p) => p.code))
  }

  const handleClearAll = () => {
    setFormPermissions([])
  }

  // Submit Create Role
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) {
      toast.error('Please enter a role name')
      return
    }
    const code = formCode.trim()
      ? formCode.trim().toUpperCase().replace(/\s+/g, '_')
      : formName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '_')

    createRoleMutation.mutate(
      {
        name: formName.trim(),
        code,
        description: formDescription.trim(),
        permissions: formPermissions,
      },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false)
        },
      }
    )
  }

  // Submit Edit Role
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingRole) return
    if (!formName.trim()) {
      toast.error('Please enter a role name')
      return
    }

    updateRoleMutation.mutate(
      {
        id: editingRole.id,
        payload: {
          name: formName.trim(),
          description: formDescription.trim(),
          permissions: formPermissions,
        },
      },
      {
        onSuccess: () => {
          setEditingRole(null)
        },
      }
    )
  }

  // Confirm Delete Role
  const handleDeleteConfirm = () => {
    if (!deletingRole) return
    deleteRoleMutation.mutate(deletingRole.id, {
      onSuccess: () => {
        setDeletingRole(null)
      },
    })
  }

  // Open Add Staff Modal
  const handleOpenCreateStaffModal = () => {
    setStaffFirstName('')
    setStaffLastName('')
    setStaffEmail('')
    setStaffPassword('')
    setStaffRoleId(roles[0]?.id || '')
    setIsCreateStaffModalOpen(true)
  }

  // Submit Add Staff
  const handleCreateStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!staffEmail.trim()) {
      toast.error('Please enter an email address')
      return
    }
    if (!staffRoleId) {
      toast.error('Please select an administrative role')
      return
    }
    createStaffMutation.mutate(
      {
        firstName: staffFirstName.trim() || 'Admin',
        lastName: staffLastName.trim() || 'Staff',
        email: staffEmail.trim(),
        password: staffPassword.trim() || undefined,
        roleId: Number(staffRoleId),
      },
      {
        onSuccess: () => {
          setIsCreateStaffModalOpen(false)
        },
      }
    )
  }

  // Filtered roles
  const filteredRoles = useMemo(() => {
    return roles.filter(
      (r) =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [roles, searchQuery])

  // Filtered staff
  const filteredStaff = useMemo(() => {
    return staffList.filter(
      (s) =>
        s.fullName.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
        s.roleName.toLowerCase().includes(staffSearchQuery.toLowerCase())
    )
  }, [staffList, staffSearchQuery])

  // Quick stats
  const totalStaffCount = staffList.length
  const totalRolesCount = roles.length
  const customRolesCount = roles.filter((r) => !r.isSystem).length

  return (
    <div className="space-y-6 pb-12">
      {/* ── Top Header Banner ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-[26px] font-semibold text-[#101828] tracking-tight">
              Roles & Permissions
            </h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]">
              RBAC v2.0
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#475467]">
            Configure administrative roles, granular permission scopes, and staff member access levels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {canManageRoles && (
            <button
              type="button"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00726D] px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-xs transition hover:bg-[#005c58] active:scale-[0.99] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Role</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Active Admin Role Banner ── */}
      {myRole && (
        <div className="rounded-2xl border border-[#00726D]/20 bg-gradient-to-r from-[#E8F7F5]/80 via-white to-white p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#00726D] text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Your Current Role
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#00726D] text-white">
                  {myRole.name}
                </span>
                {myRole.isSystem && (
                  <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    System Core
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-gray-600">
                {myRole.description || 'Full platform access and management privileges.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-gray-200">
            <KeyRound className="w-3.5 h-3.5 text-[#00726D]" />
            <span>
              Authorized Permissions:{' '}
              <strong className="text-gray-900 font-semibold">
                {myRole.code === 'SUPER_ADMIN' ? 'All (Wildcard *)' : `${myRole.permissions?.length || 0} active`}
              </strong>
            </span>
          </div>
        </div>
      )}

      {/* ── Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Defined Roles</span>
            <div className="p-2 rounded-xl bg-gray-100 text-gray-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#101828]">{totalRolesCount}</p>
          <p className="mt-1 text-xs text-gray-500">
            {roles.filter((r) => r.isSystem).length} System, {customRolesCount} Custom
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Staff Assigned</span>
            <div className="p-2 rounded-xl bg-[#E8F7F5] text-[#00726D]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#101828]">{totalStaffCount}</p>
          <p className="mt-1 text-xs text-gray-500">Active administrators</p>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">System Permissions</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <KeyRound className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#101828]">{permissions.length}</p>
          <p className="mt-1 text-xs text-gray-500">Granular feature capabilities</p>
        </div>

        <div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">Enforcement Status</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-[#101828]">Active</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Backend & UI strictly gated</p>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className="border-b border-gray-200 flex items-center gap-8">
        <button
          type="button"
          onClick={() => setActiveTab('roles')}
          className={`pb-3.5 text-sm font-medium transition cursor-pointer relative ${
            activeTab === 'roles'
              ? 'text-[#00726D] font-semibold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>Roles Management</span>
          {activeTab === 'roles' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00726D] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('staff')}
          className={`pb-3.5 text-sm font-medium transition cursor-pointer relative ${
            activeTab === 'staff'
              ? 'text-[#00726D] font-semibold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>Staff Assignments ({totalStaffCount})</span>
          {activeTab === 'staff' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00726D] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className={`pb-3.5 text-sm font-medium transition cursor-pointer relative ${
            activeTab === 'matrix'
              ? 'text-[#00726D] font-semibold'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>Permission Matrix</span>
          {activeTab === 'matrix' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00726D] rounded-full" />
          )}
        </button>
      </div>

      {/* ════════ TAB 1: ROLES GRID ════════ */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles..."
                className="w-full h-10 pl-9.5 pr-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
              />
            </div>
          </div>

          {isLoadingRoles ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="w-8 h-8 text-[#00726D] animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRoles.map((role) => {
                const isSuperAdmin = role.code === 'SUPER_ADMIN'
                return (
                  <div
                    key={role.id}
                    className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition duration-150"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                          {role.code}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {role.isSystem ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-md">
                              <Lock className="w-2.5 h-2.5" />
                              System
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                              <Sparkles className="w-2.5 h-2.5" />
                              Custom
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="mt-3 text-base font-semibold text-gray-900 tracking-tight">
                        {role.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 line-clamp-2 min-h-[32px]">
                        {role.description || 'No specific description provided.'}
                      </p>

                      {/* Permissions Chips */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                          Access Privileges ({isSuperAdmin ? 'All (*)' : role.permissions.length})
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1.5 min-h-[48px]">
                          {isSuperAdmin ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]">
                              <CheckCircle2 className="w-3 h-3" />
                              All Administrative Capabilities
                            </span>
                          ) : role.permissions.length === 0 ? (
                            <span className="text-xs text-gray-400 italic">No permissions assigned</span>
                          ) : (
                            role.permissions.map((perm) => (
                              <span
                                key={perm}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700 border border-gray-200/60"
                              >
                                {perm}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>
                          <strong className="font-semibold text-gray-900">{role.membersCount}</strong>{' '}
                          staff {role.membersCount === 1 ? 'member' : 'members'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {canManageRoles && (
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(role)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#00726D] hover:bg-gray-100 transition cursor-pointer"
                            title="Edit Permissions"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {!role.isSystem && canManageRoles && (
                          <button
                            type="button"
                            onClick={() => setDeletingRole(role)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Delete Role"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* ════════ TAB 2: STAFF ASSIGNMENTS ════════ */}
      {activeTab === 'staff' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={staffSearchQuery}
                onChange={(e) => setStaffSearchQuery(e.target.value)}
                placeholder="Search staff by name or email..."
                className="w-full h-10 pl-9.5 pr-4 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
              />
            </div>

            {canManageRoles && (
              <button
                type="button"
                onClick={handleOpenCreateStaffModal}
                className="inline-flex items-center gap-2 rounded-xl bg-[#00726D] px-4 py-2.5 text-xs sm:text-sm font-medium text-white shadow-xs transition hover:bg-[#005c58] active:scale-[0.99] cursor-pointer self-start sm:self-auto"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Staff Member</span>
              </button>
            )}
          </div>

          <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-gray-700">
                <thead className="bg-gray-50/75 border-b border-gray-200 text-gray-500 text-[11px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-3.5">Staff Member</th>
                    <th className="px-6 py-3.5">Email</th>
                    <th className="px-6 py-3.5">Assigned Role</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoadingStaff ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#00726D]" />
                        <span className="mt-2 block text-xs">Loading staff members...</span>
                      </td>
                    </tr>
                  ) : filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                        No admin staff found.
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((staff) => (
                      <tr key={staff.userId} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#00726D]/10 text-[#00726D] font-bold text-xs flex items-center justify-center">
                              {staff.fullName
                                ? staff.fullName
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .substring(0, 2)
                                    .toUpperCase()
                                : 'AD'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{staff.fullName}</p>
                              <span className="text-[11px] text-gray-400">Admin User #{staff.userId}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-600 font-mono text-xs">{staff.email}</td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                              staff.roleCode === 'SUPER_ADMIN'
                                ? 'bg-[#E8F7F5] text-[#00726D] border border-[#BBEBE6]'
                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                            }`}
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {staff.roleName}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          {canManageRoles ? (
                            <select
                              value={staff.roleId}
                              onChange={(e) => {
                                const newRoleId = Number(e.target.value)
                                if (newRoleId && newRoleId !== staff.roleId) {
                                  assignStaffMutation.mutate({
                                    userId: staff.userId,
                                    roleId: newRoleId,
                                  })
                                }
                              }}
                              disabled={assignStaffMutation.isPending}
                              className="text-xs font-medium bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 hover:border-[#00726D] focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 cursor-pointer shadow-2xs"
                            >
                              {roles.map((r) => (
                                <option key={r.id} value={r.id}>
                                  {r.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Read-only</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ════════ TAB 3: PERMISSION MATRIX ════════ */}
      {activeTab === 'matrix' && (
        <div className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-2xs">
          <div className="p-4 sm:p-5 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Functional Access Control Matrix
              </h3>
              <p className="text-xs text-gray-500">
                Detailed side-by-side comparison of active permissions across all defined roles.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[11px] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3.5 min-w-[200px]">Permission / Capability</th>
                  <th className="px-4 py-3.5">Module</th>
                  {roles.map((r) => (
                    <th key={r.id} className="px-4 py-3.5 text-center min-w-[120px]">
                      <span className="block font-semibold text-gray-900">{r.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal font-mono">
                        {r.code}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {permissions.map((perm) => (
                  <tr key={perm.code} className="hover:bg-gray-50/50 transition">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-gray-900">{perm.code}</p>
                      <span className="text-[11px] text-gray-500">{perm.description}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600">
                        {perm.module}
                      </span>
                    </td>
                    {roles.map((r) => {
                      const isAllowed =
                        r.code === 'SUPER_ADMIN' ||
                        r.permissions?.includes('*') ||
                        r.permissions?.includes(perm.code)
                      return (
                        <td key={r.id} className="px-4 py-3 text-center">
                          {isAllowed ? (
                            <div className="w-6 h-6 mx-auto rounded-full bg-[#E8F7F5] text-[#00726D] flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 mx-auto rounded-full bg-gray-100 text-gray-300 flex items-center justify-center">
                              <X className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ════════ CREATE ROLE MODAL ════════ */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8F7F5] text-[#00726D] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Create Custom Role</h3>
                  <p className="text-xs text-gray-500">
                    Define a specialized role with custom permission privileges.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Role Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Dispute Lead"
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Role Code (Identifier)
                  </label>
                  <input
                    type="text"
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="e.g. DISPUTE_LEAD"
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-mono text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the responsibilities and scope of this role..."
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
                />
              </div>

              {/* Permissions Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    Assign Permissions ({formPermissions.length} selected)
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="text-[#00726D] hover:underline font-medium cursor-pointer"
                    >
                      Select All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="text-gray-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-200 p-3 divide-y divide-gray-100 bg-gray-50/50">
                  {Object.entries(permissionsByModule).map(([moduleName, perms]) => (
                    <div key={moduleName} className="py-2.5 first:pt-0 last:pb-0">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                        {moduleName}
                      </span>
                      <div className="mt-1.5 space-y-2">
                        {perms.map((p) => {
                          const isChecked = formPermissions.includes(p.code)
                          return (
                            <label
                              key={p.code}
                              className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-white transition cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleTogglePermission(p.code)}
                                className="mt-0.5 rounded border-gray-300 text-[#00726D] focus:ring-[#00726D] cursor-pointer"
                              />
                              <div className="text-xs">
                                <span className="font-semibold text-gray-900">{p.code}</span>
                                <p className="text-gray-500 text-[11px]">{p.description}</p>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createRoleMutation.isPending}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00726D] text-xs font-medium text-white hover:bg-[#005c58] transition cursor-pointer disabled:opacity-50"
                >
                  {createRoleMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Create Role</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════ EDIT ROLE MODAL ════════ */}
      {editingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8F7F5] text-[#00726D] flex items-center justify-center">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Edit Permissions: {editingRole.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono">{editingRole.code}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingRole(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  disabled={editingRole.isSystem && editingRole.code === 'SUPER_ADMIN'}
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
                />
              </div>

              {/* Permissions Checklist */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    Permissions ({formPermissions.length} selected)
                  </label>
                  {!(editingRole.isSystem && editingRole.code === 'SUPER_ADMIN') && (
                    <div className="flex items-center gap-2 text-xs">
                      <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-[#00726D] hover:underline font-medium cursor-pointer"
                      >
                        Select All
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        type="button"
                        onClick={handleClearAll}
                        className="text-gray-500 hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                {editingRole.code === 'SUPER_ADMIN' ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-semibold">Full Super Admin Access</p>
                      <p className="text-[11px] text-emerald-700">
                        The Super Admin role inherently holds all platform permissions via the wildcard scope.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto rounded-xl border border-gray-200 p-3 divide-y divide-gray-100 bg-gray-50/50">
                    {Object.entries(permissionsByModule).map(([moduleName, perms]) => (
                      <div key={moduleName} className="py-2.5 first:pt-0 last:pb-0">
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                          {moduleName}
                        </span>
                        <div className="mt-1.5 space-y-2">
                          {perms.map((p) => {
                            const isChecked = formPermissions.includes(p.code)
                            return (
                              <label
                                key={p.code}
                                className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-white transition cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleTogglePermission(p.code)}
                                  className="mt-0.5 rounded border-gray-300 text-[#00726D] focus:ring-[#00726D] cursor-pointer"
                                />
                                <div className="text-xs">
                                  <span className="font-semibold text-gray-900">{p.code}</span>
                                  <p className="text-gray-500 text-[11px]">{p.description}</p>
                                </div>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingRole(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateRoleMutation.isPending}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00726D] text-xs font-medium text-white hover:bg-[#005c58] transition cursor-pointer disabled:opacity-50"
                >
                  {updateRoleMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ════════ DELETE ROLE CONFIRMATION MODAL ════════ */}
      {deletingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Delete Custom Role</h3>
              <p className="mt-1 text-xs text-gray-500">
                Are you sure you want to delete the role{' '}
                <strong className="text-gray-800">{deletingRole.name}</strong>? Members assigned to
                this role will be automatically reassigned to the default Operations role.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingRole(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleteRoleMutation.isPending}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-xs font-medium text-white hover:bg-red-700 transition cursor-pointer disabled:opacity-50"
              >
                {deleteRoleMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ════════ ADD STAFF MEMBER MODAL ════════ */}
      {isCreateStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden my-8">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8F7F5] text-[#00726D] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Add Staff Member</h3>
                  <p className="text-xs text-gray-500">
                    Provision a new administrative user and assign their access role.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateStaffModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaffSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={staffFirstName}
                    onChange={(e) => setStaffFirstName(e.target.value)}
                    placeholder="e.g. Samuel"
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={staffLastName}
                    onChange={(e) => setStaffLastName(e.target.value)}
                    placeholder="e.g. Adeyemi"
                    className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Staff Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  placeholder="e.g. samuel@counseltask.ng"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Temporary Password
                </label>
                <input
                  type="text"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  placeholder="Default: Staff123! (or set custom)"
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-mono text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  If left empty, will default to <strong className="font-mono text-gray-600">Staff123!</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Assigned Administrative Role <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={staffRoleId}
                  onChange={(e) => setStaffRoleId(Number(e.target.value))}
                  className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00726D]/20 focus:border-[#00726D] transition shadow-2xs cursor-pointer"
                >
                  <option value="" disabled>Select a role...</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateStaffModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createStaffMutation.isPending}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00726D] text-xs font-medium text-white hover:bg-[#005c58] transition cursor-pointer disabled:opacity-50"
                >
                  {createStaffMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>Create Staff Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
