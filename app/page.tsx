import Hero from "@/components/sections/hero"
import AboutStats from "@/components/sections/about-stats"
import ExpertiseCards from "@/components/sections/expertise-cards"
import WorksCarousel from "@/components/sections/works-carousel"
import dynamic from "next/dynamic"

const ApproachAccordion = dynamic(() => import("@/components/sections/approach-accordion"), { ssr: true })
const Certifications = dynamic(() => import("@/components/sections/certifications"), { ssr: true })
const ZevetixSection = dynamic(() => import("@/components/sections/zevetix-section"), { ssr: true })
const LatestArticles = dynamic(() => import("@/components/sections/latest-articles"), { ssr: true })
const CTATestimonials = dynamic(() => import("@/components/sections/cta-testimonials"), { ssr: true })
const Footer = dynamic(() => import("@/components/layout/footer"), { ssr: true })

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <AboutStats />
      <ExpertiseCards />
      <WorksCarousel />
      <ApproachAccordion />
      <ZevetixSection />
      <CTATestimonials />
      <LatestArticles />
      <Certifications />
      <Footer />
    </main>
  )
}
