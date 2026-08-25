import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import { useRegistrationStore } from '../store/useRegistrationStore'
import { toast } from 'sonner'

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  token?: string
}

export function useInitiateRegistration() {
  const { setServerGeneratedOtp, setShowOtp } = useRegistrationStore()

  return useMutation({
    mutationFn: async (payload: {
      fullName: string
      firm: string
      email: string
      phone: string
      password?: string
      role?: string
    }) => {
      const response = await apiClient.post<ApiResponse>('/auth/register/initiate', payload)
      return response.data
    },
    onSuccess: (data) => {
      if (data.data?.otp) {
        setServerGeneratedOtp(data.data.otp)
        toast.info(`Your verification code is: ${data.data.otp}`, {
          duration: 10000,
        })
      }
      setShowOtp(true)
      toast.success('Verification code sent to your phone/email.')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to initiate registration'
      toast.error(msg)
    },
  })
}

export function useVerifyOtp() {
  const { setToken, setShowOtp, setStep, setAccountStatus } = useRegistrationStore()

  return useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      const response = await apiClient.post<ApiResponse>('/auth/register/verify-otp', payload)
      return response.data
    },
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token)
      }
      setAccountStatus('OTP_VERIFIED')
      setShowOtp(false)
      setStep(2)
      toast.success('Phone verified successfully! Proceed to upload your credentials.')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Invalid or expired OTP code'
      toast.error(msg)
    },
  })
}

export function useSubmitCredentials() {
  const { setStep, setAccountStatus } = useRegistrationStore()

  return useMutation({
    mutationFn: async (payload: {
      email: string
      callToBarDate: string
      enrolmentNumber: string
      practisingFeeReceiptUrl?: string
      governmentIdUrl?: string
      supportingCredentialsUrl?: string
    }) => {
      const response = await apiClient.post<ApiResponse>('/auth/register/credentials', payload)
      return response.data
    },
    onSuccess: () => {
      setAccountStatus('CREDENTIALS_SUBMITTED')
      setStep(3)
      toast.success('Credentials saved! Please provide your settlement account.')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to submit credentials'
      toast.error(msg)
    },
  })
}

export function useSubmitBankDetails() {
  const { setStep, setAccountStatus } = useRegistrationStore()

  return useMutation({
    mutationFn: async (payload: {
      email: string
      bankName: string
      accountNumber: string
      accountName: string
    }) => {
      const response = await apiClient.post<ApiResponse>('/auth/register/bank-details', payload)
      return response.data
    },
    onSuccess: () => {
      setAccountStatus('PENDING_REVIEW')
      setStep(4)
      toast.success('Account setup complete! Verification is now pending.')
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || 'Failed to save bank details'
      toast.error(msg)
    },
  })
}

export function useRegistrationStatus(email?: string) {
  return useQuery({
    queryKey: ['registration-status', email],
    queryFn: async () => {
      if (!email) return null
      const response = await apiClient.get<ApiResponse>(`/auth/register/status?email=${encodeURIComponent(email)}`)
      return response.data
    },
    enabled: !!email,
  })
}
