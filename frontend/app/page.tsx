"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { PopularRoutes } from "@/components/popular-routes"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { LanguageSelector } from "@/components/language-selector"
import { FloatingBookRideButton } from "@/components/floating-book-ride-button"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <LanguageSelector />
      <Header />
      <HeroSection />
      <ServicesSection />
      <PopularRoutes />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
      <Footer />
      <FloatingBookRideButton />
    </main>
  )
}
