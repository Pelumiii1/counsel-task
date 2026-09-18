import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { requireGuestGuard } from '#/lib/authGuard'
import logoNew from '../../../../assets/logo-new.png'
import Seal from '../../../../assets/engaging-lawyers/counseltask-verification-seal 3.png'
import { AccountDetailsForm } from '#/components/engaging-lawyers/AccountDetailsForm'
import { OtpConfirmationForm } from '#/components/engaging-lawyers/OtpConfirmationForm'
import { ProfessionalCredentialsForm } from '#/components/engaging-lawyers/ProfessionalCredentialsForm'
import { AccountStatus } from '#/components/engaging-lawyers/AccountStatus'
import { useRegistrationStore } from '#/store/useRegistrationStore'
import {
  useInitiateRegistration,
  useVerifyOtp,
  useSubmitCredentials,
} from '#/hooks/useRegistration'

export const Route = createFileRoute('/(engaging-laywers)/auth/register/')({
  beforeLoad: () => {
    requireGuestGuard()
  },
  component: AuthRegisterPage,
})

function AuthRegisterPage() {
  const {
    step,
    showOtp,
    fullName,
    firm,
    email,
    phone,
    password,
    confirmPassword,
    otp,
    serverGeneratedOtp,
    callToBarDate,
    enrolmentNumber,
    setStep,
    setShowOtp,
    setStep1Values,
    setOtp,
    setStep2Values,
  } = useRegistrationStore()

  useEffect(() => {
    setStep(1)
    setShowOtp(false)
  }, [])

  // Local file state for uploads
  const [practisingFeeReceipt, setPractisingFeeReceipt] = useState<File | null>(
    null,
  )
  const [governmentId, setGovernmentId] = useState<File | null>(null)
  const [supportingCredentials, setSupportingCredentials] =
    useState<File | null>(null)

  // TanStack Query Mutations
  const initiateMutation = useInitiateRegistration()
  const verifyOtpMutation = useVerifyOtp()
  const credentialsMutation = useSubmitCredentials()

  // Handle Step 1 Submit (Initiate)
  const handleProceedStep1 = () => {
    initiateMutation.mutate({
      fullName,
      firm,
      email,
      phone,
      password,
      role: 'ENGAGING_LAWYER',
    })
  }

  // Handle Step 1 OTP Verification
  const handleVerifyOtp = () => {
    verifyOtpMutation.mutate({
      email,
      otp: otp.join(''),
    })
  }

  // Handle Resend OTP
  const handleResendOtp = () => {
    initiateMutation.mutate({
      fullName,
      firm,
      email,
      phone,
      password,
      role: 'ENGAGING_LAWYER',
    })
  }

  // Handle Step 2 Submit (Credentials)
  const handleProceedStep2 = () => {
    credentialsMutation.mutate({
      email,
      callToBarDate,
      enrolmentNumber,
      practisingFeeReceiptUrl: practisingFeeReceipt?.name || 'Practising_Fee_Receipt.pdf',
      governmentIdUrl: governmentId?.name || 'NIN_Slip.pdf',
      supportingCredentialsUrl: supportingCredentials?.name,
    })
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] text-[#242424] grid grid-cols-1 lg:grid-cols-2">
      {/* Left side: Premium Verification Seal Panel */}
      <section className="relative hidden lg:flex h-screen items-center justify-center bg-linear-to-b from-[#011422] to-[#042137] overflow-hidden">
        <img src={Seal} alt="Engaging Lawyer seal" />
      </section>

      {/* Right side: Onboarding Form Panel */}
      <section className="flex min-h-screen w-full flex-col bg-white px-6 py-10 sm:px-16 lg:px-20 xl:px-28 justify-between">
        {/* Top Logo Container */}
        <div className="flex justify-end w-full mb-12 lg:mb-0">
          <img
            src={logoNew}
            alt="CounselTask"
            className="h-10 w-auto object-contain sm:h-12"
          />
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-160 mx-auto my-auto rise-in">
          {step === 1 && !showOtp && (
            <AccountDetailsForm
              values={{
                fullName,
                firm,
                email,
                phone,
                password,
                confirmPassword,
              }}
              isLoading={initiateMutation.isPending}
              onChange={(key, val) => setStep1Values({ [key]: val })}
              onProceed={handleProceedStep1}
            />
          )}

          {step === 1 && showOtp && (
            <OtpConfirmationForm
              otp={otp}
              serverOtp={serverGeneratedOtp}
              isLoading={verifyOtpMutation.isPending}
              setOtp={setOtp}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
            />
          )}

          {step === 2 && (
            <ProfessionalCredentialsForm
              values={{
                callToBarDate,
                enrolmentNumber,
              }}
              isLoading={credentialsMutation.isPending}
              onChange={(key, val) => setStep2Values({ [key]: val })}
              practisingFeeReceipt={practisingFeeReceipt}
              setPractisingFeeReceipt={setPractisingFeeReceipt}
              governmentId={governmentId}
              setGovernmentId={setGovernmentId}
              supportingCredentials={supportingCredentials}
              setSupportingCredentials={setSupportingCredentials}
              onBack={() => setStep(1)}
              onProceed={handleProceedStep2}
            />
          )}

          {step === 3 && <AccountStatus />}
        </div>
      </section>
    </main>
  )
}
