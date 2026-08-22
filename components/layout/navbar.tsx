"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/layout/language-provider"
import { useTheme } from "next-themes"
import { Moon, Sun, Globe, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es")
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  const isHome = pathname === "/"
  const isLightNav = !scrolled && isHome

  if (!mounted) return null

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: isHome ? 2.2 : 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/10 py-3" : "bg-transparent py-6"
        }`}
    >
      <div className="w-full px-4 md:px-10 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className={`font-medium text-sm tracking-tight hover:text-accent transition-colors ${!isLightNav ? "text-foreground" : "text-white"}`}>
          — Tomás Ignacio Nadal
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 ml-auto mr-40">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-bold transition-all group py-1 ${isActive
                    ? "text-accent"
                    : !isLightNav ? "text-foreground/60 hover:text-accent" : "text-white/60 hover:text-white"
                  }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 transition-colors hover:text-accent ${!isLightNav ? "text-foreground/80" : "text-white/80"}`}
              aria-label="Toggle language"
            >
              <Globe size={16} />
              <span className=" text-xs font-bold">{language}</span>
            </button>

            <button
              onClick={toggleTheme}
              className={`transition-colors hover:text-accent ${!isLightNav ? "text-foreground/80" : "text-white/80"}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <Link
            href="/contact"
            className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all ${!isLightNav
                ? "bg-foreground text-background hover:bg-accent hover:text-white shadow-lg"
                : "bg-white text-black hover:bg-accent hover:text-white shadow-xl"
              }`}
          >
            {t("nav.sendMessage")}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden ml-2 ${!isLightNav ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-2xl font-bold transition-all ${isActive ? "text-accent" : "text-foreground"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    {isActive && <span className="text-accent text-5xl leading-none select-none relative top-[8px]">*</span>}
                    {link.name}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </motion.header>
  )
}
