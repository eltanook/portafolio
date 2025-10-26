"use client"

import { useLanguage } from "@/components/language-provider"
import { Github, Linkedin, Mail, Instagram, MapPin, Phone } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const { t } = useLanguage()

  const socialLinks = [
    { icon: Github, href: "https://github.com/eltanook", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/tomasnadal/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/tominadal_/", label: "Instagram" },
    {
      icon: FaWhatsapp,
      href: "https://api.whatsapp.com/send?phone=+54%209%2011%203647%204934&text=Hola%20Tom%C3%A1s,%20vengo%20de%20tu%20portafolio!",
      label: "WhatsApp",
    },
  ]

  const footerLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-8">
      <footer className="bg-[#0f0f0f] text-white rounded-2xl shadow-sm">
        <div className="px-6 sm:px-8 lg:px-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <Link href="/" className="inline-block hover:opacity-80 transition-opacity duration-500">
                <div className="w-10 h-10 relative">
                  <Image
                    src="/logo.png"
                    alt="Tomás Nadal Logo"
                    fill
                    className="object-contain"
                    style={{ filter: "invert(1)" }}
                  />
                </div>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                {t("footer.description")}
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{t("footer.links")}</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-accent transition-colors duration-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{t("footer.contact")}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-400">+54 11 3647-4934</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-400">Buenos Aires, Argentina</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <a
                    href="mailto:tomasnadal@gmail.com"
                    className="text-sm text-gray-400 hover:text-accent transition-colors duration-500"
                  >
                    tomasnadal@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">{t("footer.social")}</h3>
              <div className="flex flex-col gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-accent transition-colors duration-500 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="text-sm">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar - Centered copyright */}
          <div className="pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500 text-center">
              © <span className="text-accent">Tomás Nadal</span> {new Date().getFullYear()}. {t("footer.rights")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
