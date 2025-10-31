"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Mail, MapPin } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useState, useEffect } from "react"

export default function ContactPage() {
  const { t, language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    document.title = language === "es" ? "Tomás Nadal - Contacto" : "Tomás Nadal - Contact"
  }, [language])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    try {
      await fetch("https://formsubmit.co/tomasnadal04@gmail.com", {
        method: "POST",
        body: formData,
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error sending form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "tomasnadal04@gmail.com",
      href: "mailto:tomasnadal04@gmail.com",
    },
    {
      icon: FaWhatsapp,
      label: t("contact.phone"),
      value: "+54 11 3647-4934",
      href: "https://api.whatsapp.com/send?phone=+54%209%2011%203647%204934&text=Hola%20Tom%C3%A1s,%20vengo%20de%20tu%20portafolio!",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: "Buenos Aires, Argentina",
      href: null,
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 bg-background">
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 text-balance">
                {t("contact.title")}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-8 max-w-7xl mx-auto mb-8 items-start">
              {/* Contact Form */}
              <Card className="bg-card border-0 shadow-sm">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        {t("contact.name")}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-background dark:bg-[#0a0a0a] border-border focus:border-accent"
                        placeholder={t("contact.namePlaceholder")}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        {t("contact.email")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background dark:bg-[#0a0a0a] border-border focus:border-accent"
                        placeholder={t("contact.emailPlaceholder")}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        {t("contact.message")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-background dark:bg-[#0a0a0a] border-border focus:border-accent min-h-[120px] resize-none"
                        placeholder={t("contact.messagePlaceholder")}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-foreground hover:bg-foreground/90 text-background"
                    >
                      {isSubmitting ? t("contact.sending") : t("contact.send")}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-4 flex flex-col">
                {contactInfo.map((info) => {
                  const IconComponent = info.icon
                  return (
                    <Card
                      key={info.label}
                      className="bg-card border-0 shadow-sm hover:shadow-md transition-all duration-600"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#f5f4f6] dark:bg-[#1a1a1a] flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5 text-accent" />
                          </div>
                          <div className="space-y-0.5">
                            <h3 className="text-sm font-semibold text-foreground">{info.label}</h3>
                            {info.href ? (
                              <a
                                href={info.href}
                                className="text-muted-foreground hover:text-accent transition-colors duration-600 text-sm"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-muted-foreground text-sm">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                <Card className="bg-foreground dark:bg-white border-0 shadow-sm">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-background dark:text-[#0f0f0f] mb-2">
                      {t("contact.availability")}
                    </h3>
                    <p className="text-sm text-background/80 dark:text-[#0f0f0f]/80 leading-relaxed">
                      {t("contact.availabilityText")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-card border-0 shadow-sm hover:shadow-md transition-all overflow-hidden max-w-7xl mx-auto animate-on-scroll">
              <div className="relative h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.50150904932!2d-58.51520919999999!3d-34.6158037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: "none" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale dark:invert dark:hue-rotate-180"
                />
                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-border pointer-events-none">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Buenos Aires, Argentina</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "es" ? "Disponible para proyectos remotos" : "Available for remote projects"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
