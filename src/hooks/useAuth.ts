import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { apiClient } from '../lib/apiClient'
import { useRegistrationStore } from '../store/useRegistrationStore'
import { toast } from 'sonner'

export interface LoginPayload {
  email: string
  password?: string
}

export function useLogin() {
  const navigate = useNavigate()
  const { setToken, setStep1Values, setAccountStatus } = useRegistrationStore()

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await apiClient.post('/auth/login', payload)
      return response.data
    },
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token)
      }

      if (data.data) {
        const user = data.data
        setStep1Values({
          email: user.email,
          fullName: user.fullName || user.firstName,
          firm: user.firm || '',
          phone: user.phone || '',
        })
        if (user.status) {
          setAccountStatus(user.status)
        }

        toast.success(`Welcome back, ${user.firstName || 'Counsel'}!`)

        // Route appropriately based on role and status
        if (user.role === 'ROLE_ADMIN') {
          navigate({ to: '/admin-dashboard' })
        } else if (user.role === 'ROLE_ASSISTING_LAWYER') {
          navigate({ to: '/assisting-dashboard' })
        } else {
          navigate({ to: '/dashboard' })
        }
      } else {
        toast.success('Logged in successfully!')
        navigate({ to: '/dashboard' })
      }
    },
    onError: (error: any) => {
      const errorMsg =
        error.response?.data?.message ||
        'Invalid email or password. Please try again.'
      toast.error(errorMsg)
    },
  })
}
