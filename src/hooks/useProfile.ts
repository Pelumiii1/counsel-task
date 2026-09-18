import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { toast } from 'sonner'

export interface ProfileData {
  id: number
  fullName: string
  email: string
  phone: string
  firm: string
  officeAddress: string
  callToBarDate: string
  yearsOfPractice?: string
  enrolmentNumber: string
  bankName: string
  accountNumber: string
  accountName: string
  status: string
  bio: string
  practiceAreas: string[]
  role: string
  tasksPostedCount: number
  activeTasksCount: number
}

export interface ProfileUpdatePayload {
  fullName?: string
  phone?: string
  firm?: string
  officeAddress?: string
  bio?: string
  callToBarDate?: string
  yearsOfPractice?: string
  practiceAreas?: string[]
  bankName?: string
  accountNumber?: string
  accountName?: string
  currentPassword?: string
  newPassword?: string
}

export function useEngagingProfile() {
  return useQuery({
    queryKey: ['engaging-profile'],
    queryFn: async () => {
      const response = await apiClient.get<ProfileData>('/engaging-lawyer/profile')
      return response.data
    },
  })
}

export function useUpdateEngagingProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: ProfileUpdatePayload) => {
      const response = await apiClient.put<{ success: boolean; message: string; data?: ProfileData }>(
        '/engaging-lawyer/profile',
        payload,
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['engaging-profile'] })
      toast.success(data.message || 'Profile updated successfully!')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to update profile.'
      toast.error(msg)
    },
  })
}

export function useAssistingProfile() {
  return useQuery({
    queryKey: ['assisting-profile'],
    queryFn: async () => {
      const response = await apiClient.get<ProfileData>('/assisting-lawyer/profile')
      return response.data
    },
  })
}

export function useUpdateAssistingProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: ProfileUpdatePayload) => {
      const response = await apiClient.put<{ success: boolean; message: string; data?: ProfileData }>(
        '/assisting-lawyer/profile',
        payload,
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['assisting-profile'] })
      toast.success(data.message || 'Profile updated successfully!')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to update profile.'
      toast.error(msg)
    },
  })
}
