import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../../components/Navbar'
import { Hero } from '../../components/Hero'
import { Problem } from '../../components/Problem'
import { Verification } from '../../components/Verification'
import { HowItWorks } from '../../components/HowItWorks'
import { TwoWaysIn } from '../../components/TwoWaysIn'
import { TaskMarketplace } from '../../components/TaskMarketplace'
import { UserDashboard } from '../../components/UserDashboard'
import { Pricing } from '../../components/Pricing'
import { HelpSupport } from '../../components/HelpSupport'
import { CallToAction } from '../../components/CallToAction'
import { Footer } from '../../components/Footer'

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
