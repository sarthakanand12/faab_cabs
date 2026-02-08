"use client"

import React, { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { MapPin, Calendar, Clock, Phone, Car, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useServerAction } from "zsa-react"
import { createBookingAction } from "@/lib/actions/bookings"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const carTypes = [
  { id: "sedan", name: "Sedan", nameHi: "सेडान", maxPassengers: 4 },
  { id: "suv", name: "SUV", nameHi: "एसयूवी", maxPassengers: 6 },
  { id: "innova_crysta", name: "Innova Crysta", nameHi: "इनोवा क्रिस्टा", maxPassengers: 7 },
  { id: "tempo", name: "Tempo Traveller", nameHi: "टेम्पो ट्रैवलर", maxPassengers: 12 },
]

const LOCAL_PACKAGES = ["4 hrs / 40 km", "8 hrs / 80 km", "12 hrs / 120 km"] as const

interface LocalFormProps {
  onSubmit?: (values: Record<string, unknown>) => void
}

export function LocalForm({ onSubmit }: LocalFormProps) {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { execute, isPending } = useServerAction(createBookingAction)
  const [fromCity, setFromCity] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("10:00")
  const [localPackage, setLocalPackage] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedCar, setSelectedCar] = useState("")
  const [showCarDropdown, setShowCarDropdown] = useState(false)

  const selectedCarData = carTypes.find(car => car.id === selectedCar)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const carDisplay = selectedCarData ? (language === "hi" ? selectedCarData.nameHi : selectedCarData.name) : ""
    
    const [result, error] = await execute({
      rentalType: "LOCAL",
      pickupCity: fromCity,
      destinationCity: fromCity, // For local rentals, pickup and destination are the same city
      pickupDate: date,
      pickupTime: time,
      packageType: localPackage,
      phoneNumber: phone,
      carType: carDisplay || selectedCar,
    })
    
    if (error) {
      toast.error("Failed to create booking", {
        description: error.message,
      })
      console.error(error)
      return
    }

    if (result?.success) {
      router.push(`/thank-you?bookingId=${result.bookingId}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
          <Input
            placeholder={t("enter_city")}
            className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="date"
              className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="time"
              className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">{t("select_package")}</p>
          <div className="grid grid-cols-3 gap-2">
            {LOCAL_PACKAGES.map((pkg) => (
              <button
                type="button"
                key={pkg}
                onClick={() => setLocalPackage(pkg)}
                className={cn(
                  "text-xs md:text-sm py-2 px-3 rounded-lg border transition-colors",
                  localPackage === pkg
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary hover:bg-primary/5"
                )}
              >
                {pkg}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="tel"
            placeholder={t("enter_phone")}
            className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <button
            type="button"
            onClick={() => setShowCarDropdown(!showCarDropdown)}
            className="w-full pl-10 pr-10 h-12 bg-secondary/50 border border-border rounded-md text-left flex items-center justify-between focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <span className={selectedCar ? "text-foreground" : "text-muted-foreground"}>
              {selectedCarData
                ? `${language === "hi" ? selectedCarData.nameHi : selectedCarData.name} (${t("max_passengers")}: ${selectedCarData.maxPassengers})`
                : t("select_car")
              }
            </span>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </button>

          {showCarDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
              {carTypes.map((car) => (
                <button
                  type="button"
                  key={car.id}
                  onClick={() => {
                    setSelectedCar(car.id)
                    setShowCarDropdown(false)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-secondary/50 flex justify-between items-center border-b border-border last:border-b-0"
                >
                  <span className="font-medium">{language === "hi" ? car.nameHi : car.name}</span>
                  <span className="text-sm text-muted-foreground">{t("max_passengers")}: {car.maxPassengers}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg disabled:opacity-70"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Sending…
            </span>
          ) : (
            <>
              {t("submit_request")} <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
