import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { storeSessionToken } from '#/lib/authGuard'

export interface RegistrationState {
  step: 1 | 2 | 3 | 4
  showOtp: boolean
  
  // Step 1: Account Details
  fullName: string
  firm: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  
  // Step 1: OTP
  otp: string[]
  serverGeneratedOtp?: string
  
  // Step 2: Professional Credentials
  callToBarDate: string
  enrolmentNumber: string
  practisingFeeReceiptName: string
  governmentIdName: string
  supportingCredentialsName: string
  
  // Step 3: Bank Details
  bank: string
  accountNumber: string
  accountName: string

  // Auth Token & Status
  token: string | null
  accountStatus: string // PENDING_OTP | OTP_VERIFIED | CREDENTIALS_SUBMITTED | PENDING_REVIEW | VERIFIED

  // Actions
  setStep: (step: 1 | 2 | 3 | 4) => void
  setShowOtp: (show: boolean) => void
  setStep1Values: (values: Partial<{
    fullName: string
    firm: string
    email: string
    phone: string
    password: string
    confirmPassword: string
  }>) => void
  setOtp: (otp: string[]) => void
  setServerGeneratedOtp: (code?: string) => void
  setStep2Values: (values: Partial<{
    callToBarDate: string
    enrolmentNumber: string
    practisingFeeReceiptName: string
    governmentIdName: string
    supportingCredentialsName: string
  }>) => void
  setStep3Values: (values: Partial<{
    bank: string
    accountNumber: string
    accountName: string
  }>) => void
  setToken: (token: string | null) => void
  setAccountStatus: (status: string) => void
  resetRegistration: () => void
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      step: 1,
      showOtp: false,

      fullName: '',
      firm: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',

      otp: Array(6).fill(''),
      serverGeneratedOtp: undefined,

      callToBarDate: '',
      enrolmentNumber: '',
      practisingFeeReceiptName: '',
      governmentIdName: '',
      supportingCredentialsName: '',

      bank: '',
      accountNumber: '',
      accountName: '',

      token: null,
      accountStatus: 'PENDING_OTP',

      setStep: (step) => set({ step }),
      setShowOtp: (showOtp) => set({ showOtp }),
      setStep1Values: (values) => set((state) => ({ ...state, ...values })),
      setOtp: (otp) => set({ otp }),
      setServerGeneratedOtp: (serverGeneratedOtp) => set({ serverGeneratedOtp }),
      setStep2Values: (values) => set((state) => ({ ...state, ...values })),
      setStep3Values: (values) => set((state) => ({ ...state, ...values })),
      setToken: (token) => {
        storeSessionToken(token)
        set({ token })
      },
      setAccountStatus: (accountStatus) => set({ accountStatus }),
      resetRegistration: () => {
        storeSessionToken(null)
        set({
          step: 1,
          showOtp: false,
          fullName: '',
          firm: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          otp: Array(6).fill(''),
          serverGeneratedOtp: undefined,
          callToBarDate: '',
          enrolmentNumber: '',
          practisingFeeReceiptName: '',
          governmentIdName: '',
          supportingCredentialsName: '',
          bank: '',
          accountNumber: '',
          accountName: '',
          token: null,
          accountStatus: 'PENDING_OTP',
        })
      },
    }),
    {
      name: 'counsel_registration_store',
    },
  ),
)
