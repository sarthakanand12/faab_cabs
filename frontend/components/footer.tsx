"use client"

import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="bg-stone-50 rounded-lg p-2 inline-block mb-4">
              <Image
                src="/company_logo.png"
                alt="Fab Cabs Logo"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <p className="text-background/70 text-sm mb-4">
              {t("footer_desc")}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/your-page"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/fabcab1651/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:fabcab1651@gmail.com"
                aria-label="Email"
                className="h-9 w-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("services")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-primary transition-colors">{t("outstation_cabs")}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t("local_rentals")}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t("airport_transfers")}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t("one_way_cabs")}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t("tempo_traveller")}</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="font-semibold mb-4">{t("popular_cities")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-primary transition-colors">Patna</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Gaya</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Muzaffarpur</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Bhagalpur</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Darbhanga</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link href="#" className="hover:text-primary transition-colors">{t("about_us")}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t("careers")}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t("blog")}</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Partner With Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">{t("contact_us")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("contact")}</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+916203493325" className="hover:text-primary transition-colors">+91 6203493325</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:fabcab1651@gmail.com" className="hover:text-primary transition-colors">fabcab1651@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span>Jamui, Bihar, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              © 2026 Faab Cabs India LLP. {t("all_rights_reserved")}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-background/60">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-primary transition-colors">Refund Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">FAQs</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
