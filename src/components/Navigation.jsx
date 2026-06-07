import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const chapters = [
  { id: 'hero', label: 'Origin' },
  { id: 'ch1', label: 'Today' },
  { id: 'ch2', label: 'Transition' },
  { id: 'ch3', label: 'Morning' },
  { id: 'ch4', label: 'Transit' },
  { id: 'ch5', label: 'Health' },
  { id: 'ch6', label: 'Learn' },
  { id: 'ch7', label: 'Cities' },
  { id: 'ch8', label: 'Space' },
  { id: 'ch9', label: 'Beyond' },
  { id: 'final', label: 'End' },
]

export default function Navigation() {
  const navRef = useRef(null)
  const [active, setActive] = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show nav after hero intro
    const timer = setTimeout(() => {
      gsap.to(navRef.current, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
      setVisible(true)
    }, 3500)

    // Track active section via IntersectionObserver
    const sections = chapters.map((c) => document.getElementById(c.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => observer.observe(s))

    return () => {
      clearTimeout(timer)
      sections.forEach((s) => observer.unobserve(s))
    }
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      ref={navRef}
      style={{ opacity: 0, transform: 'translateX(20px)' }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[8000] flex flex-col items-end gap-2"
    >
      {/* Logo */}
      <div className="mb-4 font-bebas text-xs tracking-widest text-electric opacity-70">
        2050
      </div>

      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => scrollTo(chapter.id)}
          data-cursor
          className="group flex items-center gap-3 text-right"
          aria-label={`Navigate to ${chapter.label}`}
        >
          <span
            className={`font-mono text-xs tracking-widest transition-all duration-300 ${
              active === chapter.id
                ? 'text-electric opacity-100'
                : 'text-stellar opacity-0 group-hover:opacity-60'
            }`}
          >
            {chapter.label}
          </span>
          <span
            className={`block h-px transition-all duration-300 ${
              active === chapter.id
                ? 'w-8 bg-electric shadow-[0_0_8px_rgba(0,184,255,0.8)]'
                : 'w-3 bg-stellar/30 group-hover:w-5 group-hover:bg-stellar/60'
            }`}
          />
        </button>
      ))}
    </nav>
  )
}
