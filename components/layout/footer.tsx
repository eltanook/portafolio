"use client"

import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa"
import { useLanguage } from "@/components/layout/language-provider"
import { motion } from "framer-motion"

// Assuming a custom X icon or similar if needed. For now we use text "X" inside a circle
export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="w-full bg-[#111111] text-white pt-24 pb-0 px-8 rounded-t-[2.5rem] relative z-20 overflow-hidden">
      {/* Background Asterisk Grid */}
      <div
        className="absolute inset-0 opacity-[5%] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Ctext x='100' y='100' font-size='280' text-anchor='middle' dominant-baseline='central' font-family='system-ui%2C-apple-system%2Csans-serif' fill='%23888888'%3E*%3C/text%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 md:gap-12 mb-12 max-md:mb-4">
        
        {/* Col 1 */}
        <div className="space-y-8">
          <div>
            <p className="text-white/50 text-sm mb-4">{t("footer.office")}</p>
            <p className="text-sm leading-relaxed">
              CABA,<br />
              Argentina
            </p>
          </div>
          <div>
            <p className="text-white/50 text-sm mb-4">{t("footer.contact")}</p>
            <p className="text-sm">+54 11 3647-4934</p>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <p className="text-white/50 text-sm mb-4">{t("footer.nav")}</p>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-accent transition-colors">{t("nav.home")}</a></li>
            <li><a href="#approach" className="hover:text-accent transition-colors">{t("nav.approach")}</a></li>
            <li><a href="#works" className="hover:text-accent transition-colors">{t("nav.projects")}</a></li>
            <li><a href="#articles" className="hover:text-accent transition-colors">{t("nav.blog")}</a></li>
            <li><a href="#contact" className="hover:text-accent transition-colors">{t("nav.contact")}</a></li>
          </ul>
        </div>

        {/* Col 3 & 4 (Email and Socials) */}
        <div className="col-span-2 flex flex-col justify-between">
          <div>
            <p className="text-white/50 italic text-sm mb-6">{t("footer.touch")}</p>
            <a href="mailto:tomasnadal04@gmail.com" className="text-2xl md:text-4xl lg:text-5xl font-medium hover:text-accent transition-colors break-all">
              tomasnadal04@gmail.com
            </a>
          </div>
          
          <div className="flex items-center justify-between mt-16 border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm">{t("footer.social")}</p>
            <div className="flex gap-3">
              <a href="https://github.com/tominadal" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="https://www.instagram.com/tominadal_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.linkedin.com/in/tomasnadal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Horizontal Line Divider */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-3 pb-6 scroll-reveal max-md:hidden"></div>

      {/* Massive Text */}
      <div className="w-full relative overflow-hidden flex justify-center items-end pb-[8px]">
        {/* Base text */}
        <h1 className="max-md:text-[clamp(2.8rem,13vw,11rem)] md:text-[clamp(3rem,14vw,11rem)] leading-[0.75] font-bold tracking-tighter text-center max-md:text-white md:text-white/20 whitespace-nowrap pointer-events-none">
          <span className="max-md:text-accent md:text-white/20 align-top mr-2 md:mr-4">&copy;</span>Tomás Nadal
        </h1>
        
        {/* Animated fill text */}
        <motion.h1 
          className="max-md:hidden absolute bottom-[8px] left-1/2 -translate-x-1/2 text-[clamp(3rem,14vw,11rem)] leading-[0.75] font-bold tracking-tighter text-center text-white whitespace-nowrap pointer-events-none"
          initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
          whileInView={{ clipPath: "inset(-20% 0% -20% 0)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <span className="text-accent align-top mr-4">&copy;</span>Tomás Nadal
        </motion.h1>
      </div>
    </footer>
  )
}
