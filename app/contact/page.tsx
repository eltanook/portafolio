import type { Metadata } from "next"
import ContactPageClient from "./contact-client"

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponte en contacto conmigo para discutir tu próximo proyecto.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
