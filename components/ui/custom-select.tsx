"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

interface CustomSelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  options: CustomSelectOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function CustomSelect({ options, value, onChange, className = "" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedLabel = options.find(o => o.value === value)?.label || value

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          flex items-center justify-between w-full
          px-4 py-3.5
          bg-muted/30 border border-border/50 rounded-2xl
          text-sm font-medium text-foreground
          hover:border-accent/50
          focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/15
          cursor-pointer
        `}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 ml-2 text-foreground/40 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`
          absolute z-50 top-full left-0 right-0 mt-2
          bg-background/95 backdrop-blur-xl
          border border-border/40 rounded-2xl
          shadow-[0_8px_30px_rgb(0_0_0/0.12),0_2px_8px_rgb(0_0_0/0.06)]
          dark:shadow-[0_8px_30px_rgb(0_0_0/0.35),0_2px_8px_rgb(0_0_0/0.2)]
          overflow-hidden
          transition-all duration-200 ease-out origin-top
          ${isOpen
            ? "opacity-100 visible scale-100 translate-y-0"
            : "opacity-0 invisible scale-[0.98] -translate-y-2 pointer-events-none"
          }
        `}
      >
        <ul role="listbox" className="p-1.5 max-h-[260px] overflow-y-auto list-none m-0">
          {options.map((option) => {
            const isActive = option.value === value
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`
                  flex items-center justify-between
                  px-3.5 py-2.5 rounded-xl
                  text-[13px] font-medium
                  cursor-pointer
                  transition-colors duration-150
                  ${isActive
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-foreground/70 hover:bg-accent/10 hover:text-accent"
                  }
                `}
              >
                <span>{option.label}</span>
                {isActive && (
                  <Check className="w-3.5 h-3.5 shrink-0 ml-2 text-accent" />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
