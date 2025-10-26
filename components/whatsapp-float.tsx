"use client"

import { FaWhatsapp } from "react-icons/fa"
import { useLanguage } from "@/components/language-provider"

export function WhatsAppFloat() {
  const { language } = useLanguage()

  const message =
    language === "es" ? "Hola Tomás, vengo de tu portafolio!" : "Hi Tomás, I'm coming from your portfolio!"

  const whatsappLink = `https://api.whatsapp.com/send?phone=+5491136474934&text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1a1a1a] dark:bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
      aria-label="Contact via WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
    </a>
  )
}
