import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../../components/landing-page/Navbar'
import { Footer } from '../../components/landing-page/Footer'
import { ComplaintsPolicyView } from '../../components/landing-page/ComplaintsPolicyView'

export const Route = createFileRoute('/(landingpage)/complaints-policy')({
  component: ComplaintsPolicyPage,
})

function ComplaintsPolicyPage() {
  return (
    <>
      <Navbar />
      <ComplaintsPolicyView />
      <Footer />
    </>
  )
}
