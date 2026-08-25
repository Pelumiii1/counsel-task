import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { toast } from 'sonner'

export interface NotificationItem {
  id: number | string
  title: string
  content: string
  type: 'proposal' | 'verification' | 'fee' | 'payment' | 'message' | string
  taskId?: number
  proposalId?: number
  link?: string
  isRead: boolean
  createdAt: string
  timeFormatted: string
}

// Fetch notification list for user
export function useNotifications(role?: 'engaging' | 'assisting') {
  return useQuery({
    queryKey: ['notifications', role],
    queryFn: async () => {
      const response = await apiClient.get<NotificationItem[]>('/notifications', {
        params: { role },
      })
      return response.data
    },
    refetchInterval: 4000,
  })
}

// Fetch unread notifications count
export function useUnreadNotificationsCount(role?: 'engaging' | 'assisting') {
  return useQuery({
    queryKey: ['notifications-unread-count', role],
    queryFn: async () => {
      const response = await apiClient.get<{ unreadCount: number }>('/notifications/unread-count', {
        params: { role },
      })
      return response.data.unreadCount
    },
    refetchInterval: 4000,
  })
}

// Mark single notification as read
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number | string) => {
      const response = await apiClient.put<{ success: boolean; message: string }>(
        `/notifications/${id}/read`,
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] })
    },
  })
}

// Mark all notifications as read
export function useMarkAllNotificationsAsRead(role?: 'engaging' | 'assisting') {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.put<{ success: boolean; message: string }>(
        '/notifications/mark-all-read',
        {},
        { params: { role } },
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] })
      toast.success('All notifications marked as read')
    },
  })
}
