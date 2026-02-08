"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface BookingFormData {
  fromCity?: string
  toCity?: string
  tripType?: "oneway" | "roundtrip"
}

interface BookingFormContextType {
  prefilledData: BookingFormData | null
  setPrefilledData: (data: BookingFormData | null) => void
  clearPrefilledData: () => void
}

const BookingFormContext = createContext<BookingFormContextType | undefined>(undefined)

export function BookingFormProvider({ children }: { children: ReactNode }) {
  const [prefilledData, setPrefilledData] = useState<BookingFormData | null>(null)

  const clearPrefilledData = () => {
    setPrefilledData(null)
  }

  return (
    <BookingFormContext.Provider
      value={{
        prefilledData,
        setPrefilledData,
        clearPrefilledData,
      }}
    >
      {children}
    </BookingFormContext.Provider>
  )
}

export function useBookingForm() {
  const context = useContext(BookingFormContext)
  if (context === undefined) {
    throw new Error("useBookingForm must be used within a BookingFormProvider")
  }
  return context
}