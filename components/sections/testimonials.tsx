"use client"

import { useLanguage } from "@/components/layout/language-provider"

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section id="testimonials" className="w-full bg-secondary/30 dark:bg-muted/10 px-8 py-24 border-t border-border/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{t("test.title")}</h3>
          <a 
            href="https://github.com/tominadal" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-accent text-sm font-medium hover:underline underline-offset-4 hidden md:block"
          >
            {t("test.explore")}
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <p className="font-medium text-lg leading-snug mb-6">
              {t("test.1.quote")}
            </p>
            <p className="text-muted-foreground text-sm">
              {t("test.1.author")}
            </p>
          </div>
          <div>
            <p className="font-medium text-lg leading-snug mb-6">
              {t("test.2.quote")}
            </p>
            <p className="text-muted-foreground text-sm">
              {t("test.2.author")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
