"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FloatingBookRideButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setIsVisible(window.scrollY > 40)
        }

        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    return (
        <div
            className={cn(
                "fixed bottom-6 right-4 z-50 transition-all duration-300 md:bottom-8 md:right-8",
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
            )}
        >
            <Button
                asChild
                size="lg"
                className="rounded-full px-6 shadow-lg hover:shadow-xl"
            >
                <a href="#booking-form" aria-label="Book a ride and scroll to booking form">
                    Book a ride
                </a>
            </Button>
        </div>
    )
}
