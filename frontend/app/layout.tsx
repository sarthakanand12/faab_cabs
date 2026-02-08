import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { LanguageProvider } from '@/contexts/language-context'
import { BookingFormProvider } from '@/contexts/booking-form-context'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: 'Faab Cabs - Bihar\'s Trusted Car Rental Service',
  description: 'Book inter-city cabs, airport transfers, and local rentals across Bihar. Transparent pricing, verified drivers, and 24/7 support.',
  generator: 'v0.app',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          <BookingFormProvider>
            {children}
          </BookingFormProvider>
        </LanguageProvider>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  )
}
