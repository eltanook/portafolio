"use client"

import Image from "next/image"
import { ArrowRight, Moon, Sun, Globe } from "lucide-react"
import { useLanguage, Language } from "@/components/layout/language-provider"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Hero() {
  const { t, language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [faceComplete, setFaceComplete] = useState(false)
  const [backgroundComplete, setBackgroundComplete] = useState(false)

  // Block scroll until background animation is complete
  useEffect(() => {
    if (!backgroundComplete) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      // Scroll to top to ensure they don't get stuck midway if reloading
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [backgroundComplete])

  // Mouse parallax setup
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // High stiffness and lower damping for near real-time tracking
  const springConfig = { stiffness: 250, damping: 25, mass: 0.5 }
  const bgX = useSpring(mouseX, springConfig)
  const bgY = useSpring(mouseY, springConfig)

  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState<string>("")
  const [isHidden, setIsHidden] = useState<boolean>(false)

  useEffect(() => {
    if (!mounted) return

    const adjustFontSize = () => {
      const text = textRef.current
      const content = contentRef.current
      if (!text || !content) return

      const isMobileView = window.innerWidth < 768

      if (isMobileView) {
        // Safe base size for mobile: clamp(5rem, 22vw, 16.1rem)
        // 5rem = 80px, 16.1rem = 257.6px
        let baseSize = Math.min(Math.max(window.innerWidth * 0.22, 80), 257.6)
        
        // Measure unconstrained length
        text.style.fontSize = `${baseSize}px`
        const textLength = text.scrollWidth
        
        // Mobile vertical height constraint: 82% of viewport height
        const maxAvailableHeight = window.innerHeight * 0.82
        
        if (textLength > maxAvailableHeight && textLength > 0) {
          const ratio = maxAvailableHeight / textLength
          baseSize = baseSize * ratio
        }
        text.style.fontSize = ""
        setFontSize(`${baseSize}px`)
      } else {
        // Safe base size for desktop: clamp(5.5rem, 24vw, 16.1rem)
        // 5.5rem = 88px, 16.1rem = 257.6px
        let baseSize = Math.min(Math.max(window.innerWidth * 0.24, 88), 257.6)
        
        // Measure unconstrained length
        text.style.fontSize = `${baseSize}px`
        const textWidth = text.scrollWidth
        
        // Desktop width constraint: screen width minus padding (extra buffer for asterisk)
        const maxAvailableWidth = window.innerWidth - 200
        
        if (textWidth > maxAvailableWidth && textWidth > 0) {
          const ratio = maxAvailableWidth / textWidth
          baseSize = baseSize * ratio
        }
        text.style.fontSize = ""
        setFontSize(`${baseSize}px`)
      }

      // Check overlap/collision
      const contentRect = content.getBoundingClientRect()
      const textRect = text.getBoundingClientRect()
      
      const overlap = (
        textRect.width > 0 &&
        contentRect.width > 0 &&
        textRect.left - 20 < contentRect.right &&
        textRect.right + 20 > contentRect.left &&
        textRect.top - 20 < contentRect.bottom &&
        textRect.bottom + 20 > contentRect.top
      )
      setIsHidden(overlap)
    }

    adjustFontSize()
    window.addEventListener("resize", adjustFontSize)
    
    const resizeObserver = new ResizeObserver(() => {
      adjustFontSize()
    })
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener("resize", adjustFontSize)
      resizeObserver.disconnect()
    }
  }, [mounted, loadingComplete])

  // Avoid hydration mismatch and check if animation played
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const animated = sessionStorage.getItem('heroAnimated')
    if (animated) {
      setHasAnimated(true)
      setLoadingComplete(true)
      setBackgroundComplete(true)
      setFaceComplete(true)
    } else {
      sessionStorage.setItem('heroAnimated', 'true')
    }
    setMounted(true)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== "undefined") {
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 2
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 2
      
      // Move background opposite to cursor, up to 15px (smaller range)
      mouseX.set(xOffset * -15)
      mouseY.set(yOffset * -15)
    }
  }

  if (!mounted) return null

  return (
    <section 
      className="relative w-full h-screen bg-black flex flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ clipPath: "inset(0)" }}
    >
      {/* Background Image - Fixed to viewport for scroll, but clips to section bounds */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="relative w-full h-full">
          <motion.div 
            className="absolute -inset-[50px] !transition-none"
            style={{ 
              x: bgX,
              y: bgY
            }}
            initial={hasAnimated ? false : { opacity: 0 }}
            animate={{ opacity: loadingComplete ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (loadingComplete) {
                setBackgroundComplete(true)
              }
            }}
          >
            <Image
              src="/images/setup/IMG_8311.jpg"
              alt="Background setup workspace"
              fill
              priority
              quality={100}
              unoptimized={true}
              className="object-cover object-center pointer-events-none"
              sizes="100vw"
            />
            {/* Subtle Overlay - Darker for white text contrast */}
            <div className="absolute inset-0 bg-black/50 z-10 !transition-none"></div>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Positioned Top Left */}
      <motion.div 
        className="relative flex-1 w-full flex flex-col justify-start px-8 z-20 pt-20 md:pt-24"
        initial={hasAnimated ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: loadingComplete ? 1 : 0, y: loadingComplete ? 0 : 20 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div ref={contentRef} className="max-w-2xl scroll-reveal max-md:w-[65%]">
          <h1 className="text-[clamp(2.1rem,6vw,3.45rem)] font-medium leading-tight text-white mb-10 tracking-tight">
            {t("hero.description.start")}
            <motion.span 
              className="bg-no-repeat"
              style={{ 
                backgroundImage: 'linear-gradient(transparent calc(100% - 5px), #ff620a 5px)',
                display: 'inline'
              }}
              initial={hasAnimated ? false : { backgroundSize: isMobile ? "100% 100%" : "0% 100%" }}
              animate={{ backgroundSize: (isMobile || loadingComplete) ? "100% 100%" : "0% 100%" }}
              transition={isMobile ? { duration: 0 } : { delay: 1.5, duration: 1.2, ease: "easeInOut" }}
            >
              {t("hero.description.highlight")}
            </motion.span>
            <span>. </span>
            <span className="inline-block w-2 max-md:hidden"></span>
            <motion.span
              className="inline-flex text-white font-bold origin-center max-md:hidden"
              initial={hasAnimated ? false : { rotate: 0, y: 0 }}
              animate={{ rotate: loadingComplete ? 90 : 0, y: loadingComplete ? 8 : 0 }}
              transition={{ delay: 3.2, duration: 0.6, type: "spring", bounce: 0.4 }}
              onAnimationComplete={() => {
                if (loadingComplete) {
                  setFaceComplete(true)
                }
              }}
            >
              <motion.span initial={hasAnimated ? false : { opacity: 0 }} animate={{ opacity: loadingComplete ? 1 : 0 }} transition={{ delay: 2.7 }}>:</motion.span>
              <motion.span initial={hasAnimated ? false : { opacity: 0 }} animate={{ opacity: loadingComplete ? 1 : 0 }} transition={{ delay: 2.8 }}>&nbsp;</motion.span>
              <motion.span initial={hasAnimated ? false : { opacity: 0 }} animate={{ opacity: loadingComplete ? 1 : 0 }} transition={{ delay: 2.9 }}>)</motion.span>
            </motion.span>
          </h1>
          <a href="mailto:tomasnadal04@gmail.com" className="inline-flex w-fit items-center group shadow-lg shadow-black/10 dark:shadow-black/20 rounded-full transition-all hover:scale-[1.02] bg-[#484848] text-white">
            <div className="px-8 h-14 flex items-center justify-center font-bold text-base whitespace-nowrap">
              {t("hero.btn")}
            </div>
            <div className="pr-2 pl-1 h-14 flex items-center justify-center">
              <div className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </div>
            </div>
          </a>
        </div>
      </motion.div>

      <div 
        ref={containerRef}
        style={{
          fontSize: fontSize ? fontSize : undefined,
          opacity: isHidden ? 0 : 1,
          visibility: isHidden ? "hidden" : "visible",
          transition: "opacity 0.25s ease, visibility 0.25s ease"
        }}
        className="absolute max-md:top-1/2 max-md:-translate-y-1/2 max-md:right-0 max-md:[writing-mode:vertical-rl] max-md:[text-orientation:sideways] max-md:rotate-180 md:bottom-[45px] md:left-0 md:w-full md:flex md:items-end md:justify-start md:px-8 pointer-events-none z-20"
      >
        <div className="relative inline-block max-md:whitespace-nowrap">
          {/* Base text (low opacity) */}
          <h2 
            ref={textRef}
            style={{
              ...(fontSize ? { fontSize } : {}),
              opacity: loadingComplete ? 0 : 1,
              transition: "opacity 0.5s ease"
            }}
            className="max-md:text-[clamp(5rem,22vw,16.1rem)] md:text-[clamp(5.5rem,24vw,16.1rem)] leading-none font-bold text-white/20 tracking-tighter select-none whitespace-nowrap"
          >
            Tomás Nadal
          </h2>
          {/* Asterisk base - absolute so it doesn't affect scrollWidth measurement */}
          <span
            className="absolute top-0 left-full ml-2 text-white/20 leading-none font-bold select-none text-[1.25em]"
            style={fontSize ? { fontSize: `calc(${fontSize} * 1.25)` } : undefined}
          >*</span>
          
          {/* Animated fill text */}
          <motion.h2 
            style={fontSize ? { fontSize } : undefined}
            className="absolute top-0 left-0 max-md:text-[clamp(5rem,22vw,16.1rem)] md:text-[clamp(5.5rem,24vw,16.1rem)] leading-none font-bold text-white tracking-tighter select-none whitespace-nowrap"
            initial={hasAnimated ? false : { clipPath: isMobile ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            onAnimationComplete={() => setLoadingComplete(true)}
          >
            Tomás Nadal
          </motion.h2>
          {/* Asterisk animated - synced with the text fill animation */}
          <motion.span
            className="absolute top-0 left-full ml-2 text-accent leading-none font-bold select-none text-[1.25em]"
            style={fontSize ? { fontSize: `calc(${fontSize} * 1.25)` } : undefined}
            initial={hasAnimated ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          >*</motion.span>
        </div>
      </div>

      {/* Small bottom status */}
      <motion.div 
        className="absolute bottom-8 left-8 text-white/90 text-sm font-medium z-30 flex items-center gap-6"
        initial={hasAnimated ? false : { opacity: 0 }}
        animate={{ opacity: loadingComplete ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 max-md:hidden">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff620a] animate-pulse"></div>
          <span>{language === "es" ? "Disponible para nuevos desafíos." : "Available for new challenges."}</span>
        </div>
        <span>* {t("hero.rights")}</span>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 right-8 text-white/70 text-xs z-30 animate-bounce max-md:hidden"
        initial={hasAnimated ? false : { opacity: 0 }}
        animate={{ opacity: backgroundComplete ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {t("hero.scroll")} &darr;
      </motion.div>
    </section>
  )
}
