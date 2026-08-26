"use client"

import { X, Download, Link as LinkIcon, Check } from "lucide-react"
import { FaWhatsapp, FaEnvelope } from "react-icons/fa"
import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/components/layout/language-provider"

interface CvModalProps {
  isOpen: boolean
  onClose: () => void
  /** CV slug, e.g. "cv", "cv-en", "cv-data", "cv-general" */
  cvSlug: string
  title?: string
}

export default function CvModal({ isOpen, onClose, cvSlug, title }: CvModalProps) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const cvUrl = `/api/cv/${cvSlug}`

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.origin + cvUrl : ""
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /** Trigger print inside the iframe so the CV gets saved as PDF */
  const handlePrint = () => {
    const iframe = iframeRef.current
    if (iframe?.contentWindow) {
      const originalTitle = document.title
      let pdfTitle = title ? `Tomás Ignacio Nadal — ${title}` : "Tomás Ignacio Nadal — CV"
      
      try {
        if (iframe.contentDocument?.title) {
          pdfTitle = iframe.contentDocument.title
        }
      } catch (e) {
        // Ignore errors
      }

      document.title = pdfTitle
      iframe.contentWindow.print()
      
      setTimeout(() => {
        document.title = originalTitle
      }, 1000)
    } else {
      // Fallback: open in new tab
      window.open(cvUrl, "_blank")
    }
  }

  const shareText = title || "CV Tomás Nadal"
  const shareUrl =
    typeof window !== "undefined" ? window.location.origin + cvUrl : ""

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-16 md:pt-20 p-4 sm:p-6 md:px-12 md:pb-12">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-background border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/30">
          <h3 className="font-bold text-lg">{title || t("approach.cv") || "Mi CV / My Resume"}</h3>
          <div className="flex items-center gap-2">

            {/* Action Buttons — desktop */}
            <div className="hidden sm:flex items-center gap-2 mr-4">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 text-sm bg-accent text-white px-3 py-1.5 rounded-md hover:bg-accent/90 transition-colors"
                title={t("approach.downloadCv") || "Descargar"}
              >
                <Download size={16} />
                {t("approach.downloadCv") || "Descargar"}
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted-foreground hover:text-[#25D366] hover:bg-muted rounded-md transition-colors"
                title={t("approach.shareWhatsapp") || "Compartir por WhatsApp"}
              >
                <FaWhatsapp size={18} />
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(
                  "Puedes ver mi CV aquí: " + shareUrl
                )}`}
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                title="Enviar por Email"
              >
                <FaEnvelope size={18} />
              </a>

              <button
                onClick={handleCopyLink}
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                title={t("approach.copyLink") || "Copiar enlace"}
              >
                {copied ? (
                  <Check size={18} className="text-green-500" />
                ) : (
                  <LinkIcon size={18} />
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 bg-muted/50 hover:bg-muted rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex sm:hidden items-center justify-center gap-4 p-3 border-b border-border/50 bg-muted/10">
          <button onClick={handlePrint} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md">
            <Download size={20} />
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-[#25D366] hover:bg-muted rounded-md"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(
              "Puedes ver mi CV aquí: " + shareUrl
            )}`}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
          >
            <FaEnvelope size={20} />
          </a>
          <button
            onClick={handleCopyLink}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
          >
            {copied ? (
              <Check size={20} className="text-green-500" />
            ) : (
              <LinkIcon size={20} />
            )}
          </button>
        </div>

        {/* CV Viewer — iframe apunta a la API route */}
        <div
          className="flex-1 w-full h-full bg-neutral-100/50 dark:bg-neutral-900/50 overflow-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <iframe
            ref={iframeRef}
            src={`${cvUrl}#view=FitH`}
            className="w-full h-full border-none min-h-[75vh] sm:min-h-full"
            title={title || "CV"}
          />
        </div>
      </div>
    </div>
  )
}
