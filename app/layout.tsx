import type React from "react"
import type { Metadata } from "next"
import { Manrope, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { LanguageProvider } from "@/components/layout/language-provider"
import Navbar from "@/components/layout/navbar"
import ScrollReveal from "@/components/ui/scroll-reveal"
import { WhatsAppFloat } from "@/components/layout/whatsapp-float"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { Toaster } from "sonner"
import Script from "next/script"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Tomás Nadal · Full Stack Developer & Data Scientist",
    template: "%s · Tomás Nadal",
  },
  description:
    "Full Stack Developer y Data Scientist radicado en Buenos Aires. Especializado en React, Next.js, Python y soluciones digitales que fusionan código, datos y diseño para hacer de la tecnología una herramienta al servicio del prójimo.",
  keywords: [
    "Tomás Nadal",
    "Full Stack Developer",
    "Data Scientist",
    "Desarrollador Web",
    "React Developer",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Portfolio",
    "Buenos Aires",
    "Argentina",
    "Nexium",
    "Zevetix",
    "Ciencia de Datos",
    "Desarrollo Web Argentina",
    "Web Development",
    "Landing Page",
    "E-commerce",
  ],
  authors: [{ name: "Tomás Nadal", url: "https://tomasnadal.vercel.app" }],
  creator: "Tomás Nadal",
  publisher: "Tomás Nadal",
  metadataBase: new URL("https://tomasnadal.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: "https://tomasnadal.vercel.app",
    title: "Tomás Nadal · Full Stack Developer & Data Scientist",
    description:
      "Full Stack Developer y Data Scientist. Fusiono código y datos para hacer de la tecnología una herramienta al servicio del prójimo.",
    siteName: "Tomás Nadal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tomás Nadal · Full Stack Developer & Data Scientist — Buenos Aires",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomás Nadal · Full Stack Developer & Data Scientist",
    description:
      "Full Stack Developer y Data Scientist. Fusiono código y datos para hacer de la tecnología una herramienta al servicio del prójimo.",
    images: ["/og-image.png"],
    creator: "@tomasnadal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tomás Nadal",
              url: "https://tomasnadal.vercel.app",
              image: "https://tomasnadal.vercel.app/og-image.png",
              jobTitle: "Full Stack Developer & Data Scientist",
              description: "Full Stack Developer y Data Scientist radicado en Buenos Aires. Especializado en React, Next.js, Python y soluciones digitales innovadoras.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Buenos Aires",
                addressCountry: "AR",
              },
              sameAs: [
                "https://github.com/tominadal",
                "https://www.linkedin.com/in/tomasnadal/",
                "https://www.instagram.com/tominadal_/",
              ],
              email: "tomasnadal04@gmail.com",
              worksFor: {
                "@type": "Organization",
                "name": "Zevetix"
              },
              knowsAbout: [
                "React", "Next.js", "Node.js", "TypeScript", "Python",
                "Data Science", "Web Development", "Full Stack Development",
              ],
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${manrope.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CustomCursor />
            <Navbar />
            <ScrollReveal />
            {children}
            <WhatsAppFloat />
          </LanguageProvider>
        </ThemeProvider>
        <Toaster position="bottom-left" theme="system" richColors />
      </body>
    </html>
  )
}
