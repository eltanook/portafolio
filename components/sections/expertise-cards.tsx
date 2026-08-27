"use client"

import { Cpu, Palette, Zap, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/layout/language-provider"

export default function ExpertiseCards() {
  const { t, language } = useLanguage()

  const cards = [
    {
      icon: <Cpu size={24} className="text-foreground" />,
      iconBg: "bg-muted",
      title: t("exp.1.title"),
      description: t("exp.1.desc"),
      cardBg: "bg-card"
    },
    {
      icon: <Zap size={24} className="text-white" />,
      iconBg: "bg-accent",
      title: t("exp.2.title"),
      description: t("exp.2.desc"),
      cardBg: "bg-accent/5 dark:bg-accent/10 border-accent/20" 
    },
    {
      icon: <Palette size={24} className="text-foreground" />,
      iconBg: "bg-muted",
      title: t("exp.3.title"),
      description: t("exp.3.desc"),
      cardBg: "bg-card"
    }
  ]

  return (
    <section id="expertise" className="w-full bg-background px-6 md:px-12 lg:px-20 pt-8 md:pt-24 pb-24 border-b border-border/10 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full mx-auto">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className={`rounded-[2.5rem] p-8 md:p-10 flex flex-col border border-border/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-accent/20 ${card.cardBg}`}
          >
            <div className="flex items-center gap-6 mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                {card.icon}
              </div>
              <h3 className="font-bold text-2xl tracking-tight leading-tight">{card.title}</h3>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
