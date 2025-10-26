"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Menu, X, Moon, Sun, Languages } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Navigation() {
  const { t, language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "py-1.5" : "py-3"
      } flex justify-center`}
    >
      <div
        className={`${
          scrolled
            ? "md:backdrop-blur-md md:bg-black/40 md:rounded-xl md:shadow-md"
            : "bg-background/80 backdrop-blur-lg"
        } w-full ${
          scrolled ? "max-w-[46rem]" : "max-w-7xl"
        } flex items-center justify-between gap-1 px-2 sm:px-3 transition-all duration-500 ease-in-out`}
      >
        <Link
          href="/"
          className={`flex items-center ${
            scrolled ? "py-2" : ""
          } transition-transform duration-500 ease-in-out hover:scale-110`}
        >
          <div className={`${scrolled ? "w-9 h-9 mx-3" : "w-10 h-10"} relative`}>
            <Image
              src="/logo.png"
              alt="Tomás Nadal Logo"
              fill
              className="object-contain"
              style={{ filter: theme === "dark" ? "invert(1)" : "invert(0)" }}
            />
          </div>
        </Link>

        <div
          className={`hidden md:flex items-center ${
            scrolled ? "bg-black rounded-lg mx-1 my-2 py-1.5 px-6" : "space-x-8"
          } transition-all duration-500 ease-in-out`}
        >
          <nav className={`flex items-center ${scrolled ? "space-x-5" : "space-x-8"}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1 text-sm font-medium transition-colors duration-500 relative ${
                  scrolled
                    ? pathname === item.href
                      ? "text-white font-medium"
                      : "text-gray-300 hover:text-white"
                    : pathname === item.href
                      ? "text-foreground font-medium"
                      : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${scrolled ? "bg-white" : "bg-foreground"}`}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 ${
                scrolled ? "text-white" : "text-foreground"
              } hover:opacity-80 transition-all duration-500`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className={`p-2 ${
                scrolled ? "text-white" : "text-foreground"
              } hover:opacity-80 transition-all duration-500`}
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button
            asChild
            className={`${
              scrolled
                ? "bg-white text-black hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90 px-3 py-3 h-auto"
                : "bg-foreground text-background hover:bg-foreground/90 dark:bg-[#232323] dark:text-white dark:hover:bg-[#353535] px-6 py-2"
            } rounded-md transition-all duration-500 ease-in-out font-medium whitespace-nowrap`}
          >
            <Link href="/contact">{t("nav.sendMessage")}</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <div
            className={`${
              scrolled ? "bg-black dark:bg-white" : "bg-black dark:bg-white"
            } rounded-lg p-1 transition-all duration-500 ease-in-out`}
          >
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 ${
                scrolled ? "text-white dark:text-black" : "text-white dark:text-black"
              } focus:outline-none transition-colors duration-500`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div
            className={`${
              scrolled ? "bg-black dark:bg-white" : "bg-black dark:bg-white"
            } rounded-lg p-1 transition-all duration-500 ease-in-out`}
          >
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className={`p-2 ${
                scrolled ? "text-white dark:text-black" : "text-white dark:text-black"
              } focus:outline-none transition-colors duration-500`}
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5" />
            </button>
          </div>

          <div
            className={`${
              scrolled ? "bg-black dark:bg-white" : "bg-black dark:bg-white"
            } rounded-lg p-1 transition-all duration-500 ease-in-out`}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${
                scrolled ? "text-white dark:text-black" : "text-white dark:text-black"
              } focus:outline-none`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-[72px] left-1/2 -translate-x-1/2 w-[90vw] bg-black rounded-lg shadow-lg transition-all duration-500 md:hidden ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`px-6 py-3 text-base font-medium text-white transition-colors duration-500 relative ${
                pathname === item.href ? "bg-white/10" : "hover:bg-white/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 py-3">
            <Button asChild className="w-full bg-white text-black hover:bg-white/90 font-medium">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                {t("nav.sendMessage")}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
