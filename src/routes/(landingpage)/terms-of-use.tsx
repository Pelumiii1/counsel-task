import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../../components/landing-page/Navbar'
import { Footer } from '../../components/landing-page/Footer'
import { TermsOfUseView } from '../../components/landing-page/TermsOfUseView'

export const Route = createFileRoute('/(landingpage)/terms-of-use')({
  component: TermsOfUsePage,
})

function TermsOfUsePage() {
  return (
    <>
      <Navbar />
      <TermsOfUseView />
      <Footer />
    </>
  )
}
