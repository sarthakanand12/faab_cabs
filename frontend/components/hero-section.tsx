"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { Car, Plane, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { OutstationForm } from "./outstation-form"
import { LocalForm } from "./local-form"
import { AirportForm } from "./airport-form"

type TripType = "outstation" | "local" | "airport"

export function HeroSection() {
  const { t } = useLanguage()
  const [tripType, setTripType] = useState<TripType>("outstation")

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Form submitted with values:", values)
  }

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero_section_2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient Overlay - fades to black on right, with overall transparency */}
      <div className="absolute inset-0 z-0 bg-linear-to-r from-background/80 via-background/60 to-black/90" />

      {/* Additional overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-background/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground font-bold text-xl md:text-2xl px-3 py-1 rounded">
                  FAAB CABS
                </div>
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              {t("hero_title")} <span className="text-accent">{t("hero_highlight")}</span> {t("hero_title_end")}
            </h1>
            <div className="flex max-sm:flex-col items-center justify-center lg:justify-start gap-2 mb-4">
              <Image
                src="/bihar_govt.png"
                alt="Bihar Government Logo"
                width={64}
                height={64}
                className="object-contain"
              />
              <p className="text-muted-foreground text-sm md:text-base">
                {t("recognized_by")}{" "}
                <span className="font-semibold text-foreground bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">
                  {t("bihar_govt_startup_scheme")}
                </span>
              </p>
            </div>
            <p className="text-muted-foreground text-lg md:text-xl mb-6">
              {t("hero_subtitle")}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">28+</span>
                </div>
                <span className="text-muted-foreground">{t("cities")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">100+</span>
                </div>
                <span className="text-muted-foreground">{t("routes")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold">2.5K+</span>
                </div>
                <span className="text-muted-foreground">{t("happy_customers")}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div id="booking-form" className="bg-card rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-border relative">
            {/* Discount Badge - Starburst */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20 flex flex-col items-center">
              {/* Grouped Star Container */}
              <div className="relative -mt-2">
                {/* Outer stroke layer */}
                <div
                  className="sm:w-29 h-15 w-15 sm:sm:h-29 bg-red-700 absolute top-0 left-1/2 -translate-x-1/2"
                  style={{
                    clipPath:
                      'polygon(50% 0%, 60% 10%, 75% 5%, 80% 20%, 95% 25%, 85% 40%, 100% 50%, 85% 60%, 95% 75%, 80% 80%, 75% 95%, 60% 90%, 50% 100%, 40% 90%, 25% 95%, 20% 80%, 5% 75%, 15% 60%, 0% 50%, 15% 40%, 5% 25%, 20% 20%, 25% 5%, 40% 10%)',
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))'
                  }}
                />
                {/* Inner fill layer */}
                <div
                  className="h-14 w-14 sm:w-28 sm:h-28 bg-red-500 flex items-center justify-center text-white relative"
                  style={{
                    clipPath:
                      'polygon(50% 0%, 60% 10%, 75% 5%, 80% 20%, 95% 25%, 85% 40%, 100% 50%, 85% 60%, 95% 75%, 80% 80%, 75% 95%, 60% 90%, 50% 100%, 40% 90%, 25% 95%, 20% 80%, 5% 75%, 15% 60%, 0% 50%, 15% 40%, 5% 25%, 20% 20%, 25% 5%, 40% 10%)',
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))'
                  }}
                >
                  <div className="text-center font-extrabold">
                    <div className="text-xs sm:text-xs">upto</div>
                    <div className="text-sm sm:text-xl">50%</div>
                    <div className="text-xs sm:text-xs">OFF</div>
                  </div>
                </div>
              </div>

              {/* Text box below star */}
              <div className="mt-2 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-md z-30">
                First Booking
              </div>
            </div>

            <div>
              {/* Trip Type Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
                <button
                  type="button"
                  onClick={() => setTripType("outstation")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap",
                    tripType === "outstation"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  <Car className="h-4 w-4" />
                  {t("outstation")}
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("local")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap",
                    tripType === "local"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  <Clock className="h-4 w-4" />
                  {t("local_rentals")}
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("airport")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap",
                    tripType === "airport"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  <Plane className="h-4 w-4" />
                  {t("airport")}
                </button>
              </div>

              {/* Form Fields */}
              {tripType === "outstation" && <OutstationForm onSubmit={handleSubmit} />}
              {tripType === "local" && <LocalForm onSubmit={handleSubmit} />}
              {tripType === "airport" && <AirportForm onSubmit={handleSubmit} />}
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              {t("no_hidden_charges")}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
    </section>
  )
}
