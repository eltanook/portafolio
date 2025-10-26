import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { LanguageProvider } from "@/components/language-provider"
import { WhatsAppFloat } from "@/components/whatsapp-float"
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
    default: "Tomás Nadal - Full Stack Developer",
    template: "Tomás Nadal - %s",
  },
  description:
    "Portfolio profesional de Tomás Nadal - Full Stack Developer especializado en React, Next.js, Node.js y soluciones digitales innovadoras. Desarrollo web, análisis de datos y liderazgo de proyectos.",
  keywords: [
    "Tomás Nadal",
    "Full Stack Developer",
    "Desarrollador Web",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Buenos Aires",
    "Argentina",
    "Nexium",
    "Zevetix",
    "Data Science",
    "Web Development",
  ],
  authors: [{ name: "Tomás Nadal", url: "https://tomasnadal.com" }],
  creator: "Tomás Nadal",
  publisher: "Tomás Nadal",
  metadataBase: new URL("https://tomasnadal.com"),
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
    url: "https://tomasnadal.com",
    title: "Tomás Nadal - Full Stack Developer",
    description:
      "Portfolio profesional de Tomás Nadal - Full Stack Developer especializado en React, Next.js y soluciones digitales innovadoras.",
    siteName: "Tomás Nadal Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Tomás Nadal - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomás Nadal - Full Stack Developer",
    description:
      "Portfolio profesional de Tomás Nadal - Full Stack Developer especializado en React, Next.js y soluciones digitales innovadoras.",
    images: ["/logo.png"],
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
  icons: {
    icon: [
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/logo.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${manrope.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <LanguageProvider>
            <CustomCursor />
            {children}
            <WhatsAppFloat />
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
