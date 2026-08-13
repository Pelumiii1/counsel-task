import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../../components/landing-page/Navbar'
import { Hero } from '../../components/landing-page/Hero'
import { Problem } from '../../components/landing-page/Problem'
import { Verification } from '../../components/landing-page/Verification'
import { HowItWorks } from '../../components/landing-page/HowItWorks'
import { TwoWaysIn } from '../../components/landing-page/TwoWaysIn'
import { TaskMarketplace } from '../../components/landing-page/TaskMarketplace'
import { UserDashboard } from '../../components/landing-page/UserDashboard'
import { Pricing } from '../../components/landing-page/Pricing'
import { HelpSupport } from '../../components/landing-page/HelpSupport'
import { CallToAction } from '../../components/landing-page/CallToAction'
import { Footer } from '../../components/landing-page/Footer'

export const Route = createFileRoute('/(landingpage)/')({ component: Home })

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Verification />
      <HowItWorks />
      <TwoWaysIn />
      <TaskMarketplace />
      <UserDashboard />
      <Pricing />
      <HelpSupport />
      <CallToAction />
      <Footer />
    </>
  )
}
