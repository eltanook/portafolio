"use client"

import { useState } from "react"
import { useLanguage } from "@/components/layout/language-provider"
import { Mail, MapPin, Send } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import Footer from "@/components/layout/footer"
import { toast } from "sonner"

export default function ContactPage() {
  const { t, language } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const validateForm = (): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.name.trim().length < 2) {
      return language === "es" ? "El nombre debe tener al menos 2 caracteres." : "Name must be at least 2 characters."
    }
    if (!emailRegex.test(formData.email)) {
      return language === "es" ? "El email no es válido." : "Please enter a valid email."
    }
    if (formData.message.trim().length < 10) {
      return language === "es" ? "El mensaje debe tener al menos 10 caracteres." : "Message must be at least 10 characters."
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      toast.error(validationError)
      return
    }

    setIsSubmitting(true)

    const form = e.target as HTMLFormElement
    const data = new FormData(form)

    const submitPromise = fetch("https://formsubmit.co/ajax/tomasnadal04@gmail.com", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Error submitting form")
      }
      setFormData({ name: "", email: "", message: "" })
      return response.json()
    })

    toast.promise(submitPromise, {
      loading: language === "es" ? "Enviando mensaje..." : "Sending message...",
      success: language === "es" ? "Mensaje enviado correctamente." : "Message sent successfully.",
      error: language === "es" ? "Hubo un error al enviar el mensaje." : "There was an error sending the message.",
    })

    try {
      await submitPromise
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

  return (
    <main className="min-h-screen bg-background pt-32">
      <div className="max-w-7xl mx-auto px-8 pb-12 md:pb-24">
        
        {/* Full-width Header */}
        <header className="mb-16 scroll-reveal">
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] leading-tight font-medium tracking-tight mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mt-4 font-medium tracking-tight leading-relaxed">
            {t("contact.subtitle")}
          </p>
        </header>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 mb-20 items-start">
          {/* Left: Form */}
          <div className="scroll-reveal">
            <form onSubmit={handleSubmit} className="bg-card p-8 md:p-12 rounded-[3rem] border border-border/10">
              <div className="space-y-8">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full bg-background/50 border border-border/50 rounded-2xl px-6 pt-8 pb-3 text-base focus:outline-none focus:border-accent peer transition-colors placeholder:text-transparent focus:placeholder:text-muted-foreground/40"
                    placeholder={t("contact.namePlaceholder")}
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute text-sm font-bold tracking-widest text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-accent cursor-text pointer-events-none uppercase"
                  >
                    {t("contact.name")}
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full bg-background/50 border border-border/50 rounded-2xl px-6 pt-8 pb-3 text-base focus:outline-none focus:border-accent peer transition-colors placeholder:text-transparent focus:placeholder:text-muted-foreground/40"
                    placeholder={t("contact.emailPlaceholder")}
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute text-sm font-bold tracking-widest text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-accent cursor-text pointer-events-none uppercase"
                  >
                    {t("contact.email")}
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full bg-background/50 border border-border/50 rounded-2xl px-6 pt-8 pb-3 text-base focus:outline-none focus:border-accent peer transition-colors resize-none placeholder:text-transparent focus:placeholder:text-muted-foreground/40"
                    placeholder={t("contact.messagePlaceholder")}
                  />
                  <label 
                    htmlFor="message" 
                    className="absolute text-sm font-bold tracking-widest text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-accent cursor-text pointer-events-none uppercase"
                  >
                    {t("contact.message")}
                  </label>
                </div>
                <div className="pt-4">
                  <div className={`relative group flex w-max ${(!formData.name || !formData.email || !formData.message) ? "cursor-not-allowed" : ""}`}>
                    {/* Warning overlay that shows on hover if fields are empty */}
                    {(!formData.name || !formData.email || !formData.message) && (
                      <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-accent text-accent flex items-center justify-center font-bold text-sm px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 bg-background/80 backdrop-blur-sm whitespace-nowrap">
                        {language === "es" ? "Faltan campos" : "Missing fields"}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || (!formData.name || !formData.email || !formData.message)}
                      className={`inline-flex items-center transition-opacity duration-300 ${
                        (!formData.name || !formData.email || !formData.message)
                          ? "group-hover:opacity-0 pointer-events-none"
                          : "hover:scale-[1.02] cursor-pointer"
                      } ${isSubmitting ? "opacity-50" : ""}`}
                    >
                    <div className="bg-foreground text-background px-10 h-16 flex items-center justify-center rounded-l-full font-bold text-base whitespace-nowrap">
                      {isSubmitting ? t("contact.sending") : t("contact.send")}
                    </div>
                    <div className="bg-foreground pr-3 pl-1 h-16 rounded-r-full flex items-center justify-center">
                      <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                        <Send size={18} />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              </div>
            </form>
          </div>

          {/* Right: Info Cards */}
          <div className="space-y-6 flex flex-col scroll-reveal" style={{ transitionDelay: "200ms" }}>
            
            <div className="bg-card p-6 rounded-[2rem] border border-border/10 hover:border-accent/20 transition-all hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                  <Mail className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold  tracking-widest text-muted-foreground mb-2">Email</p>
                  <a href="mailto:tomasnadal04@gmail.com" className="text-sm font-medium hover:text-accent transition-colors">
                    tomasnadal04@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-[2rem] border border-border/10 hover:border-accent/20 transition-all hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                  <FaWhatsapp className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold  tracking-widest text-muted-foreground mb-2">WhatsApp</p>
                  <a 
                    href="https://api.whatsapp.com/send?phone=+54%209%2011%203647%204934&text=Hola%20Tom%C3%A1s,%20vengo%20de%20tu%20portafolio!" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-accent transition-colors"
                  >
                    +54 11 3647-4934
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-[2rem] border border-border/10 hover:border-accent/20 transition-all hover:-translate-y-1 hover:shadow-xl group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                  <MapPin className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold  tracking-widest text-muted-foreground mb-2">{t("contact.location")}</p>
                  <p className="text-sm font-medium">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>

            <div className="bg-foreground text-background p-8 rounded-[2rem] shadow-xl mt-4 flex flex-col justify-between">
              <div className="mb-6">
                <h3 className="text-xs font-bold tracking-widest mb-4 opacity-80 uppercase">
                  {language === "es" ? "Disponibilidad" : "Availability"}
                </h3>
                <p className="text-sm leading-relaxed font-medium">
                  {language === "es" 
                    ? "Disponible para nuevos proyectos."
                    : "Available for new projects."}
                </p>
              </div>
              <a 
                href="https://api.whatsapp.com/send?phone=+54%209%2011%203647%204934&text=Hola%20Tom%C3%A1s,%20vi%20tu%20disponibilidad%20en%20el%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20un%20proyecto!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold text-sm rounded-2xl hover:bg-white/90 transition-colors shadow-lg cursor-pointer text-center"
              >
                <FaWhatsapp size={18} />
                {language === "es" ? "Hablemos por WhatsApp" : "Let's talk on WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative h-[500px] w-full md:max-w-7xl md:mx-auto md:px-8 md:pb-24 scroll-reveal max-md:-mb-8">
        <div className="relative w-full h-full md:rounded-[3rem] overflow-hidden md:border md:border-border/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.50150904932!2d-58.51520919999999!3d-34.6158037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 grayscale dark:invert dark:hue-rotate-180 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
          />
          <div className="absolute bottom-20 left-8 md:bottom-12 md:left-12 bg-background/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-border/50 shadow-2xl pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">Buenos Aires, Argentina</p>
                <p className="text-xs text-muted-foreground  tracking-widest font-bold mt-1">
                  Trabajo Remoto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
