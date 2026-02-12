"use client"

import React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, Phone, Mail, MessageSquare, CheckCircle2, X } from "lucide-react"
import { createWriteToUsAction } from "@/lib/actions/write-to-us"
import { useServerAction } from "zsa-react"

export function ContactSection() {
  const { t } = useLanguage()
  const [showPopup, setShowPopup] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  })
  const { execute, isPending } = useServerAction(createWriteToUsAction)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setShowPopup(true)
    setFormData({ name: "", phone: "", email: "", message: "" })

    const [result, error] = await execute({
      customerName: formData.name,
      contactNumber: formData.phone,
      emailId: formData.email,
      message: formData.message,
      source: "website-contact-section",
    })

    if (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.")
      return
    }

    if (result?.success) {
      setShowPopup(true)
      setFormData({ name: "", phone: "", email: "", message: "" })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-accent to-accent/90 rounded-2xl p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-accent-foreground">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {t("write_to_us")}
              </h2>
              <p className="text-accent-foreground/90 mb-6">
                {t("contact_subtitle")}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-foreground/10 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">+91 6203493325</p>
                    <p className="text-sm text-accent-foreground/70">WhatsApp Available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-foreground/10 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">fabcab1651@gmail.com</p>
                    <p className="text-sm text-accent-foreground/70">24/7 Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t("enter_name")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder={t("enter_phone")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={t("enter_email")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 bg-secondary/50 border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <textarea
                    placeholder={t("enter_message")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pt-3 pb-3 pr-3 min-h-[120px] bg-secondary/50 border border-border rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none text-foreground placeholder:text-muted-foreground"
                    required
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-destructive text-center">{submitError}</p>
                )}
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
                      {t("submit")} <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="bg-card rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-border relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {t("response_submitted")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("we_will_contact")}
              </p>
              <Button
                onClick={() => setShowPopup(false)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t("close")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
