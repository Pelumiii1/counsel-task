import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { toast } from 'sonner'

export interface SharedFileItem {
  name: string
  size: string
  url?: string
}

export interface ConversationItem {
  id: string
  otherUserId: number
  name: string
  initials: string
  role: string
  online: boolean
  lastSnippet: string
  lastMessageTime: string
  unreadCount: number
  taskId?: number
  taskTitle?: string
  sharedFiles?: SharedFileItem[]
}

export interface MessageItem {
  id: number
  senderId: number
  senderName: string
  senderRole: string
  recipientId: number
  recipientName: string
  taskId?: number
  taskTitle?: string
  content: string
  attachmentUrl?: string
  fileName?: string
  fileSize?: string
  isRead: boolean
  createdAt: string
  isMine: boolean
  timeFormatted: string
}

export interface SendMessagePayload {
  recipientId?: number
  recipientEmail?: string
  taskId?: number
  content: string
  attachmentUrl?: string
  fileName?: string
  fileSize?: string
  role?: 'engaging' | 'assisting'
}

// Fetch conversation list
export function useConversations(role?: 'engaging' | 'assisting') {
  return useQuery({
    queryKey: ['conversations', role],
    queryFn: async () => {
      const response = await apiClient.get<ConversationItem[]>('/messages/conversations', {
        params: { role },
      })
      return response.data
    },
    refetchInterval: 4000,
  })
}

// Fetch thread messages
export function useThreadMessages(
  otherUserId?: number,
  taskId?: string | number,
  role?: 'engaging' | 'assisting',
) {
  return useQuery({
    queryKey: ['messages', otherUserId, taskId, role],
    queryFn: async () => {
      const response = await apiClient.get<MessageItem[]>('/messages/thread', {
        params: {
          otherUserId,
          taskId,
          role,
        },
      })
      return response.data
    },
    enabled: Boolean(otherUserId !== undefined || taskId !== undefined),
    refetchInterval: 3000,
  })
}

// Send message mutation
export function useSendMessage(role?: 'engaging' | 'assisting') {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: SendMessagePayload) => {
      const response = await apiClient.post(
        '/messages/send',
        {
          ...payload,
          role: payload.role || role,
        },
        {
          params: { role: payload.role || role },
        },
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to send message'
      toast.error(msg)
    },
  })
}
