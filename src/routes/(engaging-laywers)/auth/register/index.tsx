import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import logoNew from '../../../../assets/logo-new.png'
import Seal from '../../../../assets/engaging-lawyers/counseltask-verification-seal 3.png'
import { AccountDetailsForm } from '#/components/engaging-lawyers/AccountDetailsForm'
import { OtpConfirmationForm } from '#/components/engaging-lawyers/OtpConfirmationForm'
import { ProfessionalCredentialsForm } from '#/components/engaging-lawyers/ProfessionalCredentialsForm'
import { BankDetailsForm } from '#/components/engaging-lawyers/BankDetailsForm'
import { AccountStatus } from '#/components/engaging-lawyers/AccountStatus'

export const Route = createFileRoute('/(engaging-laywers)/auth/register/')({
  component: AuthRegisterPage,
})

function AuthRegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [showOtp, setShowOtp] = useState(false)

  // Step 1 Form States
  const [step1Values, setStep1Values] = useState({
    fullName: '',
    firm: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  // Step 1 OTP State
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))

  // Step 2 Form States
  const [step2Values, setStep2Values] = useState({
    callToBarDate: '',
    enrolmentNumber: '',
  })

  const [practisingFeeReceipt, setPractisingFeeReceipt] = useState<File | null>(
    null,
  )
  const [governmentId, setGovernmentId] = useState<File | null>(null)
  const [supportingCredentials, setSupportingCredentials] =
    useState<File | null>(null)

  const handleStep1Change = (key: keyof typeof step1Values, val: string) => {
    setStep1Values((prev) => ({ ...prev, [key]: val }))
  }

  const handleStep2Change = (key: keyof typeof step2Values, val: string) => {
    setStep2Values((prev) => ({ ...prev, [key]: val }))
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
              values={step1Values}
              onChange={handleStep1Change}
              onProceed={() => setShowOtp(true)}
            />
          )}

          {step === 1 && showOtp && (
            <OtpConfirmationForm
              otp={otp}
              setOtp={setOtp}
              onVerify={() => {
                setShowOtp(false)
                setStep(2)
              }}
            />
          )}

          {step === 2 && (
            <ProfessionalCredentialsForm
              values={step2Values}
              onChange={handleStep2Change}
              practisingFeeReceipt={practisingFeeReceipt}
              setPractisingFeeReceipt={setPractisingFeeReceipt}
              governmentId={governmentId}
              setGovernmentId={setGovernmentId}
              supportingCredentials={supportingCredentials}
              setSupportingCredentials={setSupportingCredentials}
              onBack={() => setStep(1)}
              onProceed={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <BankDetailsForm
              fullName={step1Values.fullName}
              onBack={() => setStep(2)}
              onProceed={() => setStep(4)}
            />
          )}

          {step === 4 && <AccountStatus />}
        </div>
      </section>
    </main>
  )
}
