import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { DetectorLogos } from "@/components/detector-logos"
import { UseCases } from "@/components/use-cases"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <DetectorLogos />
      <FeaturesSection />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
