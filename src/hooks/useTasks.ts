import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { toast } from 'sonner'

export interface TaskItem {
  id: string | number
  title: string
  description?: string
  practiceArea?: string
  category: string
  courtLocation?: string
  court: string
  deadline: string
  budget: string
  confidentiality?: string
  attachmentUrl?: string
  workers?: string
  proposalsCount?: number
  postedBy?: string
  postedByEmail?: string
  createdById?: number
  status: 'Open' | 'In Progress' | 'Awaiting review' | 'Completed' | string
  createdAt?: string
  updatedAt?: string
  paidAt?: string
}

export interface CreateTaskPayload {
  title: string
  description: string
  practiceArea: string
  courtLocation: string
  deadline: string
  proposedFee: string
  confidentiality?: 'standard' | 'restricted'
  attachmentUrl?: string
}

// Fetch all available tasks (market / assisting view)
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await apiClient.get<TaskItem[]>('/assisting-lawyer/tasks')
      return response.data
    },
  })
}

// Fetch tasks posted by current engaging lawyer
export function useMyTasks() {
  return useQuery({
    queryKey: ['my-tasks'],
    queryFn: async () => {
      const response = await apiClient.get<TaskItem[]>('/engaging-lawyer/tasks')
      return response.data
    },
  })
}

// Fetch single task details
export function useTaskById(id: string | number) {
  return useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      const response = await apiClient.get<TaskItem>(`/engaging-lawyer/tasks/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

// Post a new task (engaging lawyer)
export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateTaskPayload) => {
      const response = await apiClient.post<{ success: boolean; message: string; data?: TaskItem }>(
        '/engaging-lawyer/tasks',
        payload,
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      toast.success(data.message || 'Task posted successfully!')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to post task. Please check details.'
      toast.error(msg)
    },
  })
}

// Assisting lawyer requests completion confirmation
export function useRequestTaskCompletion(taskId: string | number | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload?: { note?: string; attachmentUrl?: string }) => {
      const response = await apiClient.post<{ success: boolean; message: string; data?: TaskItem }>(
        `/assisting-lawyer/tasks/${taskId}/request-completion`,
        payload || {},
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] })
    },
  })
}

// Engaging lawyer approves completion
export function useApproveTaskCompletion(taskId: string | number | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<{ success: boolean; message: string; data?: TaskItem }>(
        `/engaging-lawyer/tasks/${taskId}/approve`,
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data.message || 'Task approved successfully!')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to approve task completion.'
      toast.error(msg)
    },
  })
}

// Engaging lawyer requests changes
export function useRequestTaskChanges(taskId: string | number | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload?: { note?: string }) => {
      const response = await apiClient.post<{ success: boolean; message: string; data?: TaskItem }>(
        `/engaging-lawyer/tasks/${taskId}/request-changes`,
        payload || {},
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', taskId] })
      toast.success(data.message || 'Changes requested successfully.')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to request changes.'
      toast.error(msg)
    },
  })
}

