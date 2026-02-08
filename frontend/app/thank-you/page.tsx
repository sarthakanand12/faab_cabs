"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowLeft, MessageCircle, FileText, Phone } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ThankYouPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")

  return (
    <main className="min-h-screen bg-linear-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center border border-border">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t("thank_you")}
        </h1>

        <p className="text-lg text-muted-foreground mb-2">
          {t("request_submitted")}
        </p>

        {bookingId && (
          <div className="bg-primary/10 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
            <p className="text-2xl font-bold text-primary">{bookingId}</p>
          </div>
        )}

        {bookingId && (
          <Link href={`/booking-detail/${bookingId}`} className="inline-block mb-4">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              View Booking Details
            </Button>
          </Link>
        )}

        <div className="flex items-center justify-center gap-2 text-accent mb-4">
          <MessageCircle className="h-5 w-5" />
          <p className="font-medium">
            {t("whatsapp_contact")}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
          <Phone className="h-4 w-4" />
          <p className="text-sm">
            Call <a href="tel:+916203493325" className="text-primary font-medium hover:underline">+91 6203493325</a> for booking details
          </p>
        </div>

        <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full" />

        <Link href="/">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12">
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t("back_to_home")}
          </Button>
        </Link>

        <p className="text-sm text-muted-foreground mt-8">
          FAAB CABS - Your Trusted Car Partner & Rental Service
        </p>
      </div>
    </main>
  )
}
