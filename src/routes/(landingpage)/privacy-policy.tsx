import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../../components/landing-page/Navbar'
import { Footer } from '../../components/landing-page/Footer'
import { PrivacyPolicyView } from '../../components/landing-page/PrivacyPolicyView'

export const Route = createFileRoute('/(landingpage)/privacy-policy')({
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <PrivacyPolicyView />
      <Footer />
    </>
  )
}
