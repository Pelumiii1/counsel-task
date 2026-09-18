import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { toast } from 'sonner'

export interface AdminRoleItem {
  id: number
  code: string
  name: string
  description: string
  isSystem: boolean
  permissions: string[]
  membersCount: number
  createdAt?: string
}

export interface PermissionDefinition {
  code: string
  module: string
  description: string
}

export interface StaffItem {
  userId: number
  email: string
  fullName: string
  roleId: number
  roleCode: string
  roleName: string
}

interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

// Fetch all roles
export function useAdminRoles() {
  return useQuery({
    queryKey: ['admin-roles'],
    queryFn: async () => {
      const res = await apiClient.get<AdminRoleItem[]>('/admin/roles')
      return res.data
    },
  })
}

// Fetch all system permissions definitions
export function useAdminPermissions() {
  return useQuery({
    queryKey: ['admin-permissions'],
    queryFn: async () => {
      const res = await apiClient.get<PermissionDefinition[]>('/admin/roles/permissions')
      return res.data
    },
    staleTime: Infinity,
  })
}

// Fetch active role & permissions of currently logged in admin
export function useMyRole() {
  return useQuery({
    queryKey: ['admin-my-role'],
    queryFn: async () => {
      const res = await apiClient.get<AdminRoleItem>('/admin/roles/me')
      return res.data
    },
  })
}

// Fetch admin staff list
export function useAdminStaff() {
  return useQuery({
    queryKey: ['admin-staff'],
    queryFn: async () => {
      const res = await apiClient.get<StaffItem[]>('/admin/roles/staff')
      return res.data
    },
  })
}

// Create new role mutation
export function useCreateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      name: string
      code?: string
      description?: string
      permissions: string[]
    }) => {
      const res = await apiClient.post<AdminRoleItem>('/admin/roles', payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] })
      queryClient.invalidateQueries({ queryKey: ['admin-my-role'] })
      toast.success('Admin role created successfully')
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to create role'
      toast.error(msg)
    },
  })
}

// Update role mutation
export function useUpdateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number
      payload: {
        name?: string
        description?: string
        permissions: string[]
      }
    }) => {
      const res = await apiClient.put<AdminRoleItem>(`/admin/roles/${id}`, payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] })
      queryClient.invalidateQueries({ queryKey: ['admin-my-role'] })
      toast.success('Role permissions updated successfully')
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to update role'
      toast.error(msg)
    },
  })
}

// Delete role mutation
export function useDeleteRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiClient.delete<ApiResponse>(`/admin/roles/${id}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] })
      queryClient.invalidateQueries({ queryKey: ['admin-staff'] })
      queryClient.invalidateQueries({ queryKey: ['admin-my-role'] })
      toast.success('Role deleted successfully')
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to delete role'
      toast.error(msg)
    },
  })
}

// Assign role to staff member mutation
export function useAssignStaffRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ userId, roleId }: { userId: number; roleId: number }) => {
      const res = await apiClient.patch<ApiResponse>(`/admin/roles/staff/${userId}`, {
        roleId,
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-staff'] })
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] })
      queryClient.invalidateQueries({ queryKey: ['admin-my-role'] })
      toast.success('Staff role assigned successfully')
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to assign role'
      toast.error(msg)
    },
  })
}

// Create new staff member mutation
export interface CreateStaffPayload {
  firstName: string
  lastName: string
  email: string
  password?: string
  roleId: number
}

export function useCreateStaff() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CreateStaffPayload) => {
      const res = await apiClient.post<StaffItem>('/admin/roles/staff', payload)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-staff'] })
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] })
      toast.success('New staff member added successfully')
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || 'Failed to add staff member'
      toast.error(msg)
    },
  })
}

// Helper hook to check permission
export function useHasPermission(permissionCode: string): boolean {
  const { data: myRole } = useMyRole()
  if (!myRole) return true // Default optimistic until loaded
  if (myRole.code === 'SUPER_ADMIN') return true
  if (!myRole.permissions) return false
  return (
    myRole.permissions.includes('*') ||
    myRole.permissions.includes(permissionCode)
  )
}
