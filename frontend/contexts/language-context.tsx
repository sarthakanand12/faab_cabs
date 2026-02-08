"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "hi"

interface Translations {
  [key: string]: {
    en: string
    hi: string
  }
}

export const translations: Translations = {
  // Header
  "outstation_cabs": { en: "Outstation Cabs", hi: "आउटस्टेशन कैब" },
  "local_rentals": { en: "Local Rentals", hi: "लोकल रेंटल" },
  "airport_transfer": { en: "Airport Transfer", hi: "एयरपोर्ट ट्रांसफर" },
  "car_types": { en: "Car Types", hi: "कार प्रकार" },
  "one_way_cabs": { en: "One Way Cabs", hi: "वन वे कैब" },
  "round_trip": { en: "Round Trip", hi: "राउंड ट्रिप" },
  "multi_city": { en: "Multi-City", hi: "मल्टी-सिटी" },
  "sedan": { en: "Sedan", hi: "सेडान" },
  "suv": { en: "SUV", hi: "एसयूवी" },
  "luxury": { en: "Luxury", hi: "लग्जरी" },
  "tempo_traveller": { en: "Tempo Traveller", hi: "टेम्पो ट्रैवलर" },

  // Hero Section
  "hero_title": { en: "Your Trusted", hi: "आपका भरोसेमंद" },
  "hero_highlight": { en: "Inter-City", hi: "इंटर-सिटी" },
  "hero_title_end": { en: "Car Partner", hi: "कार भागीदार" },
  "recognized_by": { en: "Recognized by", hi: "द्वारा मान्यता प्राप्त" },
  "bihar_govt_startup_scheme": { en: "Bihar Government Startup Scheme", hi: "बिहार सरकार स्टार्टअप योजना" },
  "hero_subtitle": { en: "Book cabs across Bihar, Jharkhand, West Bengal and Odisha with transparent pricing, verified drivers & 24/7 support", hi: "पारदर्शी मूल्य, सत्यापित ड्राइवर और 24/7 सहायता के साथ बिहार, झारखंड, पश्चिम बंगाल और ओडिशा में कैब बुक करें" },
  "cities": { en: "Cities", hi: "शहर" },
  "routes": { en: "Routes", hi: "मार्ग" },
  "happy_customers": { en: "Happy Customers", hi: "खुश ग्राहक" },
  "distance_travelled": { en: "Distance Travelled (km)", hi: "दूरी यात्रा (किमी)" },
  "total_trips": { en: "Total Trips", hi: "कुल यात्राएं" },
  "rating": { en: "Rating", hi: "रेटिंग" },
  "outstation": { en: "Outstation", hi: "आउटस्टेशन" },
  "airport": { en: "Airport", hi: "एयरपोर्ट" },
  "one_way": { en: "One Way", hi: "वन वे" },
  "enter_city": { en: "Enter city", hi: "शहर दर्ज करें" },
  "enter_destination_city" : {en: "Enter Destination City", hi: "गंतव्य शहर दर्ज करें"},
  "enter_airport": { en: "Enter airport name", hi: "एयरपोर्ट का नाम दर्ज करें" },
  "pickup": { en: "Pickup", hi: "पिकअप" },
  "drop": { en: "Drop", hi: "ड्रॉप" },
  "phone_number": { en: "Phone Number", hi: "फोन नंबर" },
  "enter_phone": { en: "Enter WhatsApp number", hi: "व्हाट्सएप नंबर दर्ज करें" },
  "select_car": { en: "Select Car Type", hi: "कार प्रकार चुनें" },
  "max_passengers": { en: "Max Passengers", hi: "अधिकतम यात्री" },
  "submit_request": { en: "Submit Request", hi: "अनुरोध जमा करें" },
  "no_hidden_charges": { en: "No hidden charges. All prices inclusive of taxes, tolls & driver allowance", hi: "कोई छुपा शुल्क नहीं। सभी कीमतों में टैक्स, टोल और ड्राइवर भत्ता शामिल है" },
  "select_package": { en: "Select Package", hi: "पैकेज चुनें" },

  // Services Section
  "our_services": { en: "Our Services", hi: "हमारी सेवाएं" },
  "outstation_desc": { en: "One way & round trips to 50+ cities in Bihar, Jharkhand, West Bengal and Odisha", hi: "बिहार, झारखंड, पश्चिम बंगाल और ओडिशा में 50+ शहरों के लिए वन वे और राउंड ट्रिप" },
  "one_way_desc": { en: "Affordable one-way cab services for single direction travel with no return charges", hi: "एक दिशा यात्रा के लिए किफायती वन वे कैब सेवाएं, बिना वापसी शुल्क के" },
  "airport_desc": { en: "Reliable airport pickups and drops at all major airports", hi: "सभी प्रमुख एयरपोर्ट पर विश्वसनीय पिकअप और ड्रॉप" },
  "local_desc": { en: "Hourly rental packages for city tours and local travel", hi: "सिटी टूर और लोकल यात्रा के लिए प्रति घंटा रेंटल पैकेज" },
  "corporate_car_rental": { en: "Corporate Car Rental", hi: "कॉर्पोरेट कार रेंटल" },
  "corporate_desc": { en: "Dedicated fleet management and car rental solutions for businesses with flexible plans", hi: "लचीली योजनाओं के साथ व्यवसायों के लिए समर्पित फ्लीट प्रबंधन और कार रेंटल समाधान" },
  "bulk_wedding_party": { en: "Bulk / Wedding Booking", hi: "बल्क / शादी बुकिंग" },
  "bulk_wedding_desc": { en: "Special packages for weddings, parties, and bulk bookings with multiple vehicles", hi: "शादी, पार्टी और बल्क बुकिंग के लिए विशेष पैकेज, कई वाहनों के साथ" },
  "tempo_desc": { en: "12 to 26 seater tempo travellers for group travel", hi: "ग्रुप यात्रा के लिए 12 से 26 सीटर टेम्पो ट्रैवलर" },
  "luxury_desc": { en: "Premium cars for business travel and special occasions", hi: "व्यापार यात्रा और विशेष अवसरों के लिए प्रीमियम कारें" },
  "safe_travel": { en: "Safe Travel", hi: "सुरक्षित यात्रा" },
  "safe_desc": { en: "Sanitized cabs, verified drivers, and real-time tracking", hi: "सैनिटाइज्ड कैब, सत्यापित ड्राइवर और रियल-टाइम ट्रैकिंग" },

  // Popular Routes
  "popular_routes": { en: "Popular Routes", hi: "लोकप्रिय मार्ग" },
  "starting_from": { en: "Starting from", hi: "शुरुआत" },
  "book_now": { en: "Book Now", hi: "अभी बुक करें" },
  "view_all_routes": { en: "View All Routes", hi: "सभी मार्ग देखें" },
  "popular_cities": { en: "Popular Cities", hi: "लोकप्रिय शहर" },

  // Why Choose Us
  "why_choose_us": { en: "Why Choose Faab Cabs", hi: "Faab Cabs क्यों चुनें" },
  "transparent_pricing": { en: "Transparent Pricing", hi: "पारदर्शी मूल्य" },
  "transparent_desc": { en: "No hidden charges. What you see is what you pay. All taxes and tolls included in the fare.", hi: "कोई छुपा शुल्क नहीं। जो आप देखते हैं वही आप भुगतान करते हैं। सभी टैक्स और टोल किराये में शामिल हैं।" },
  "verified_drivers": { en: "Verified Drivers", hi: "सत्यापित ड्राइवर" },
  "verified_desc": { en: "All our drivers are background verified, trained professionals with years of experience.", hi: "हमारे सभी ड्राइवर बैकग्राउंड वेरिफाइड, प्रशिक्षित पेशेवर हैं जिनके पास वर्षों का अनुभव है।" },
  "support_24_7": { en: "24/7 Support", hi: "24/7 सहायता" },
  "support_desc": { en: "Round the clock customer support via phone, WhatsApp, and email for any assistance.", hi: "किसी भी सहायता के लिए फोन, व्हाट्सएप और ईमेल के माध्यम से चौबीसों घंटे ग्राहक सहायता।" },
  "flexible_booking": { en: "Flexible Booking", hi: "लचीली बुकिंग" },
  "flexible_desc": { en: "Easy cancellation and modification. Book now, pay later with multiple payment options.", hi: "आसान कैंसिलेशन और मॉडिफिकेशन। अभी बुक करें, बाद में कई भुगतान विकल्पों के साथ भुगतान करें।" },
  "trips_completed": { en: "Trips Completed", hi: "यात्राएं पूर्ण" },
  "happy_customers_count": { en: "Happy Customers", hi: "खुश ग्राहक" },
  "cities_covered": { en: "Cities Covered", hi: "शहर कवर" },
  "cities_desc": { en: "50+ cities, 500+ routes", hi: "50+ शहर, 500+ मार्ग" },
  "on_time_guarantee": { en: "On-Time Guarantee", hi: "समय पर गारंटी" },
  "on_time_desc": { en: "Punctual pickups with real-time tracking.", hi: "रियल-टाइम ट्रैकिंग के साथ समय पर पिकअप" },
  "years_experience": { en: "Years Experience", hi: "वर्षों का अनुभव" },

  // Testimonials
  "customer_reviews": { en: "Customer Reviews", hi: "ग्राहक समीक्षाएं" },
  "testimonials_subtitle": { en: "What our customers say about their experience with Faab Cabs", hi: "Faab Cabs के साथ अपने अनुभव के बारे में हमारे ग्राहक क्या कहते हैं" },

  // Contact Section
  "write_to_us": { en: "Write to Us", hi: "हमें लिखें" },
  "contact_subtitle": { en: "Have a query or feedback? We'd love to hear from you! For corporate booking, become a partner driver, or sponsorships, reach out to us.", hi: "कोई प्रश्न या फीडबैक है? हमें आपसे सुनना अच्छा लगेगा! कॉर्पोरेट बुकिंग, पार्टनर ड्राइवर बनने, या प्रायोजन के लिए हमसे संपर्क करें।" },
  "your_name": { en: "Your Name", hi: "आपका नाम" },
  "enter_name": { en: "Enter your name", hi: "अपना नाम दर्ज करें" },
  "your_email": { en: "Your Email", hi: "आपका ईमेल" },
  "enter_email": { en: "Enter your email", hi: "अपना ईमेल दर्ज करें" },
  "your_message": { en: "Your Message", hi: "आपका संदेश" },
  "enter_message": { en: "Write your message here...", hi: "अपना संदेश यहां लिखें..." },
  "submit": { en: "Submit", hi: "जमा करें" },
  "response_submitted": { en: "Your response has been submitted!", hi: "आपका जवाब जमा कर दिया गया है!" },
  "we_will_contact": { en: "We will get back to you soon.", hi: "हम जल्द ही आपसे संपर्क करेंगे।" },
  "close": { en: "Close", hi: "बंद करें" },

  // Footer
  "footer_desc": { en: "Your trusted car partner & rental service. Book inter-city cabs, airport transfers, and local rentals with transparent pricing.", hi: "आपका भरोसेमंद कार भागीदार & रेंटल सेवा। पारदर्शी मूल्य के साथ इंटर-सिटी कैब, एयरपोर्ट ट्रांसफर और लोकल रेंटल बुक करें।" },
  "services": { en: "Services", hi: "सेवाएं" },
  "airport_transfers": { en: "Airport Transfers", hi: "एयरपोर्ट ट्रांसफर" },
  "company": { en: "Company", hi: "कंपनी" },
  "about_us": { en: "About Us", hi: "हमारे बारे में" },
  "contact_us": { en: "Contact Us", hi: "संपर्क करें" },
  "careers": { en: "Careers", hi: "करियर" },
  "blog": { en: "Blog", hi: "ब्लॉग" },
  "contact": { en: "Contact", hi: "संपर्क" },
  "all_rights_reserved": { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },

  // Thank You Page
  "thank_you": { en: "Thank You!", hi: "धन्यवाद!" },
  "request_submitted": { en: "Your request has been submitted", hi: "आपका अनुरोध जमा कर दिया गया है" },
  "whatsapp_contact": { en: "We will get back to you on your WhatsApp number", hi: "हम आपके व्हाट्सएप नंबर पर आपसे संपर्क करेंगे" },
  "back_to_home": { en: "Back to Home", hi: "होम पर वापस जाएं" },

  // Language Selector
  "select_language": { en: "Select Language", hi: "भाषा चुनें" },
  "english": { en: "English", hi: "अंग्रेजी" },
  "hindi": { en: "Hindi", hi: "हिंदी" },
  "continue": { en: "Continue", hi: "जारी रखें" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  hasSelectedLanguage: boolean
  setHasSelectedLanguage: (value: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem("fabcabs-language") as Language
    const hasSelected = localStorage.getItem("fabcabs-language-selected")

    if (savedLang) {
      setLanguage(savedLang)
    }
    if (hasSelected === "true") {
      setHasSelectedLanguage(true)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fabcabs-language", language)
    }
  }, [language, isLoaded])

  useEffect(() => {
    if (isLoaded && hasSelectedLanguage) {
      localStorage.setItem("fabcabs-language-selected", "true")
    }
  }, [hasSelectedLanguage, isLoaded])

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  if (!isLoaded) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, hasSelectedLanguage, setHasSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
