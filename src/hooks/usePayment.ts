import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '#/lib/apiClient'
import { toast } from 'sonner'

export interface PaystackVerifyPayload {
  reference: string
  taskId: string | number
  proposalId: string | number
  channel?: string
}

export function usePaystackFundTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: PaystackVerifyPayload) => {
      const response = await apiClient.post<{
        success: boolean
        message: string
        data?: any
      }>('/payments/paystack/verify', payload)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['task-proposals'] })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task'] })
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      toast.success(data.message || 'Payment verified! Task funded and lawyer engaged.')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || error.message || 'Payment verification failed.'
      toast.error(msg)
    },
  })
}
