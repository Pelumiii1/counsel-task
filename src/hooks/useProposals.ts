import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { toast } from 'sonner'

export interface ProposalItem {
  id: string | number
  taskId: string | number
  taskTitle?: string
  lawyerId?: string | number
  name: string
  initials: string
  practiceArea: string
  experience: string
  location: string
  rating: number
  tasksCount: number
  quote: string
  badges: string[]
  fee: string
  about: string
  status: 'Awaiting response' | 'Selected' | 'Declined' | string
  createdAt?: string
  clientName?: string
  taskStatus?: string
  rawAmount?: number
}

export interface CreateProposalPayload {
  quotedFee: string
  experienceText: string
  practiceArea?: string
  location?: string
  experience?: string
  about?: string
  isAvailable?: boolean
}

// Engaging lawyer views proposals for their task
export function useTaskProposals(taskId: string | number | undefined) {
  return useQuery({
    queryKey: ['task-proposals', taskId],
    queryFn: async () => {
      if (!taskId) return []
      const response = await apiClient.get<ProposalItem[]>(`/engaging-lawyer/tasks/${taskId}/proposals`)
      return response.data
    },
    enabled: !!taskId,
  })
}

// Assisting lawyer views their submitted proposals
export function useMyProposals() {
  return useQuery({
    queryKey: ['my-proposals'],
    queryFn: async () => {
      const response = await apiClient.get<ProposalItem[]>('/assisting-lawyer/proposals/my')
      return response.data
    },
  })
}

// Assisting lawyer submits a proposal for a task
export function useCreateProposal(taskId: string | number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateProposalPayload) => {
      const response = await apiClient.post<{ success: boolean; message: string; data?: ProposalItem }>(
        `/assisting-lawyer/tasks/${taskId}/proposals`,
        payload,
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task-proposals', taskId] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['my-proposals'] })
      toast.success(data.message || 'Proposal submitted successfully!')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to submit proposal.'
      toast.error(msg)
    },
  })
}

// Engaging lawyer selects a proposal
export function useSelectProposal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (proposalId: string | number) => {
      const response = await apiClient.post<{ success: boolean; message: string; data?: ProposalItem }>(
        `/engaging-lawyer/proposals/${proposalId}/select`,
      )
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task-proposals'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task'] })
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      toast.success(data.message || 'Task funded and proposal selected!')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to select proposal.'
      toast.error(msg)
    },
  })
}
