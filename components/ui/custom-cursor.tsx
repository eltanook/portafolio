'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Touch devices: don't initialize
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = -200
    let mouseY = -200
    let raf: number
    let rafCount = 0
    const REFRESH_INTERVAL = 60

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY - 5
    }

    const onMouseDown = () => dotRef.current?.classList.add('cursor-click')
    const onMouseUp   = () => dotRef.current?.classList.remove('cursor-click')

    const onEnterLink = () => dotRef.current?.classList.add('cursor-hover')
    const onLeaveLink = () => dotRef.current?.classList.remove('cursor-hover')

    // Hide cursor over iframes (CV viewer)
    const onEnterIframe = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
    }
    const onLeaveIframe = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
    }

    const boundElements = new WeakSet<Element>()

    const attachListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, label, select').forEach((el) => {
        if (boundElements.has(el)) return
        boundElements.add(el)
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
      document.querySelectorAll('iframe').forEach((el) => {
        if (boundElements.has(el)) return
        boundElements.add(el)
        el.addEventListener('mouseenter', onEnterIframe)
        el.addEventListener('mouseleave', onLeaveIframe)
      })
    }

    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      rafCount++
      if (rafCount % REFRESH_INTERVAL === 0) attachListeners()
      raf = requestAnimationFrame(tick)
    }

    // Hide cursor when mouse leaves the browser window or tab loses focus
    const onMouseLeaveDoc = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0'
    }
    const onMouseEnterDoc = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1'
    }
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (cursorRef.current) cursorRef.current.style.opacity = '0'
      } else {
        if (cursorRef.current) cursorRef.current.style.opacity = '1'
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup',   onMouseUp,   { passive: true })
    document.addEventListener('mouseleave', onMouseLeaveDoc)
    document.addEventListener('mouseenter', onMouseEnterDoc)
    document.addEventListener('visibilitychange', onVisibilityChange)

    attachListeners()
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup',   onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeaveDoc)
      document.removeEventListener('mouseenter', onMouseEnterDoc)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <style>{`
        /* Hide native cursor on fine-pointer (mouse) devices */
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }

        /* Hide on touch */
        @media (pointer: coarse) {
          .tn-cursor-wrapper { display: none !important; }
        }

        .tn-cursor-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          mix-blend-mode: difference;
          transition: opacity 0.2s ease;
        }

        .tn-cursor-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #ff620a;
          border: 1.2px solid #ff620a;
          will-change: width, height, transform, background-color, opacity, border-color;
          transition:
            width 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            height 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.3s ease,
            transform 0.15s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.2s ease;
        }

        /* Dark mode: #ff620a inverted against black bg = #ff620a (Orange) */
        :global(.dark) .tn-cursor-dot {
          background: #ff620a;
          border-color: #ff620a;
        }

        .tn-cursor-dot.cursor-hover {
          width: 58px;
          height: 58px;
        }

        .tn-cursor-dot.cursor-click {
          transform: translate(-50%, -50%) scale(0.65);
        }
      `}</style>

      <div
        ref={cursorRef}
        className="tn-cursor-wrapper"
        aria-hidden="true"
      >
        <div ref={dotRef} className="tn-cursor-dot" />
      </div>
    </>
  )
}
