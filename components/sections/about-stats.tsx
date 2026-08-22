"use client"
 
import { useEffect, useState, useRef } from "react"
import { ArrowRight, FileCode, FileBarChart } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { useLanguage } from "@/components/layout/language-provider"
import { client } from "@/sanity/lib/client"

const softwareTech = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "Express",
  "PostgreSQL",
  "MySQL",
  "Git"
]

const dataTech = [
  "Python",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "SQL",
  "Data Analysis",
  "Machine Learning",
  "OpenAI",
  "Anthropic",
  "Ollama",
  "PowerBI",
  "Statistics"
]
 
function CountUp({ end, duration = 3500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime: number | null = null
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])
 
  const digitCount = String(end).length
  
  return (
    <span 
      ref={ref} 
      className="inline-block tabular-nums text-right" 
      style={{ minWidth: `${digitCount}ch` }}
    >
      {count}
    </span>
  )
}
 
function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
 
export default function AboutStats() {
  const { t, language } = useLanguage()
  const [projectCount, setProjectCount] = useState(70) // Min 70 projects
  const age = calculateAge(new Date(2004, 10, 17))
 
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const slugs = await client.fetch(`*[_type == "project" && !(_id in path("drafts.**"))].slug.current`)
        if (slugs) {
          const uniqueCount = new Set(slugs.filter(Boolean)).size
          setProjectCount(Math.max(70, uniqueCount))
        }
      } catch (error) {
        console.error("Error fetching project count:", error)
      }
    }
    fetchCount()
  }, [])
  
  return (
    <section id="about" className="w-full bg-background text-foreground border-b border-border/10 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-[30vh] max-w-7xl w-full mx-auto">
        {/* Left Side: Stats */}
        <div className="py-12 md:py-16 md:pr-12 lg:pr-16 md:border-r border-border/10 flex flex-col justify-between max-md:order-last max-md:border-none max-md:pt-6 max-md:pb-12">
          <div className="w-full">
            <h3 className="text-foreground font-bold text-3xl mb-12 scroll-reveal max-md:hidden">{t("about.tag")}</h3>
            
            <div className="grid grid-cols-3 gap-8 scroll-reveal max-md:flex max-md:flex-wrap max-md:justify-start max-md:gap-10 max-md:w-full">
              <div className="mb-6 max-md:text-left">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter whitespace-nowrap max-md:text-5xl">
                  <CountUp end={5} />
                  <span className="text-accent">+</span>
                </h2>
                <p className="text-muted-foreground text-sm font-medium mt-2">
                  {t("about.yearsShort")}
                </p>
              </div>
 
              <div className="mb-6 max-md:text-left">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter whitespace-nowrap max-md:text-5xl">
                  <CountUp end={projectCount} />
                  <span className="text-accent">+</span>
                </h2>
                <p className="text-muted-foreground text-sm font-medium mt-2">
                  {t("about.projectsLabel")}
                </p>
              </div>

              <div className="mb-6 max-md:text-left">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter whitespace-nowrap max-md:text-5xl">
                  <CountUp end={age} />
                </h2>
                <p className="text-muted-foreground text-sm font-medium mt-2">
                  {t("about.ageLabel")}
                </p>
              </div>
            </div>
            
            <div className="relative overflow-hidden mt-8 max-w-md scroll-reveal max-md:hidden flex flex-col gap-12">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
              
              {/* Software Tech Track */}
              <div 
                className="flex w-max animate-scroll-left no-transition hover:[animation-play-state:paused]"
                style={{ animationDuration: "55s" }}
              >
                <div className="flex gap-3 pr-3 flex-shrink-0">
                  {softwareTech.map((tech, index) => (
                    <span
                      key={`sw-1-${index}`}
                      className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium whitespace-nowrap flex-shrink-0 border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pr-3 flex-shrink-0">
                  {softwareTech.map((tech, index) => (
                    <span
                      key={`sw-2-${index}`}
                      className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium whitespace-nowrap flex-shrink-0 border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Data Tech Track */}
              <div 
                className="flex w-max animate-scroll-right no-transition hover:[animation-play-state:paused]"
                style={{ animationDuration: "60s" }}
              >
                <div className="flex gap-3 pr-3 flex-shrink-0">
                  {dataTech.map((tech, index) => (
                    <span
                      key={`dt-1-${index}`}
                      className="text-xs px-3 py-1 rounded-full bg-muted/60 text-muted-foreground font-medium whitespace-nowrap flex-shrink-0 border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pr-3 flex-shrink-0">
                  {dataTech.map((tech, index) => (
                    <span
                      key={`dt-2-${index}`}
                      className="text-xs px-3 py-1 rounded-full bg-muted/60 text-muted-foreground font-medium whitespace-nowrap flex-shrink-0 border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
 
        {/* Right Side: Statement */}
        <div className="py-12 md:py-16 md:pl-12 lg:pl-16 col-span-2 flex flex-col justify-center gap-12 scroll-reveal max-md:order-first max-md:pb-6">
          <div>
            <h2 className="text-[2.2rem] leading-[1.2] font-medium tracking-tight max-w-3xl max-md:text-[1.75rem]">
              {t("about.statement")}
            </h2>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8 max-[400px]:flex-wrap">
            <a href="mailto:tomasnadal04@gmail.com" className="inline-flex w-fit items-center group transition-all hover:scale-[1.02] bg-foreground text-background rounded-full">
              <div className="px-5 md:px-6 h-10 md:h-12 flex items-center justify-center font-bold text-xs md:text-sm whitespace-nowrap">
                {t("about.btn")}
              </div>
              <div className="pr-1.5 md:pr-2 pl-1 h-10 md:h-12 flex items-center justify-center">
                <div className="bg-accent text-white w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={16} className="max-md:w-3 max-md:h-3" />
                </div>
              </div>
            </a>
            
            {/* Social Links */}
            <div className="flex gap-3 md:gap-4">
              <a 
                href="https://github.com/tominadal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:text-accent transition-all duration-500 group shrink-0"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://www.linkedin.com/in/tomasnadal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:text-accent transition-all duration-500 group shrink-0"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={language === "es" ? "/api/cv/cv-general" : "/api/cv/cv-general-en"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:text-accent transition-all duration-500 group shrink-0"
                aria-label="CV General"
                title={t("approach.cvGeneral") || "CV General"}
              >
                <FileCode className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href={language === "es" ? "/api/cv/cv-data" : "/api/cv/cv-data-en"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:text-accent transition-all duration-500 group shrink-0"
                aria-label="CV Data Science"
                title={t("approach.cvData") || "CV Data Science"}
              >
                <FileBarChart className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
