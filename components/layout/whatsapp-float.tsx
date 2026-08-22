"use client"

import { useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { useLanguage } from "@/components/layout/language-provider"

export function WhatsAppFloat() {
  const { language } = useLanguage()
  const [showTooltip, setShowTooltip] = useState(false)

  const message =
    language === "es" ? "Hola Tomás, vengo de tu portafolio!" : "Hi Tomás, I'm coming from your portfolio!"

  const whatsappLink = `https://api.whatsapp.com/send?phone=+5491136474934&text=${encodeURIComponent(message)}`

  const tooltipText =
    language === "es" ? "¡Contáctame por WhatsApp!" : "Contact me via WhatsApp!"

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`bg-[#484848] text-white text-sm px-4 py-2 rounded-xl shadow-lg whitespace-nowrap transition-all duration-300 ${showTooltip ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          }`}
      >
        {tooltipText}
        {/* Arrow */}
        <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#484848] rotate-45" />
      </div>

      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#1a1a1a] dark:bg-[#1a1a1a] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#333333] transition-all duration-300 group"
        aria-label="Contact via WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <FaWhatsapp className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
      </a>
    </div>
  )
}
