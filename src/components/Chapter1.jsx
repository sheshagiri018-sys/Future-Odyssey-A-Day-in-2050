import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const problems = [
  {
    id: 'energy',
    label: '01 / Energy',
    title: 'A Planet Running on Fumes',
    stat: '84%',
    statLabel: 'of global energy from fossil fuels',
    body: 'We burn 100 million barrels of oil every single day. The atmosphere absorbs the consequence. The ocean remembers.',
    detail: '1.6°C above pre-industrial baseline — and accelerating.',
    color: '#FF6B2B',
    accentBg: 'rgba(255,107,43,0.05)',
    borderColor: 'rgba(255,107,43,0.2)',
  },
  {
    id: 'transport',
    label: '02 / Transportation',
    title: 'We're Still Moving Like It's 1900',
    stat: '3.2B',
    statLabel: 'hours lost in traffic daily — globally',
    body: 'The combustion engine turned 130 this year. We gave it a software upgrade and called it innovation.',
    detail: '24% of all CO₂ emissions come from transport.',
    color: '#FF3B30',
    accentBg: 'rgba(255,59,48,0.05)',
    borderColor: 'rgba(255,59,48,0.2)',
  },
  {
    id: 'healthcare',
    label: '03 / Healthcare',
    title: 'Diagnosis by Proximity to Wealth',
    stat: '4.5B',
    statLabel: 'people lack access to essential health services',
    body: 'Where you are born still determines if you live. Not what medicine can do — where you had the luck to arrive.',
    detail: 'A child born in Niger is 100× more likely to die before 5 than one in Japan.',
    color: '#FF453A',
    accentBg: 'rgba(255,69,58,0.05)',
    borderColor: 'rgba(255,69,58,0.2)',
  },
  {
    id: 'environment',
    label: '04 / Environment',
    title: 'A Silent Ledger of Loss',
    stat: '1M',
    statLabel: 'species facing extinction this century',
    body: 'In the last 50 years, wildlife populations have declined by 69%. We are witnessing the sixth mass extinction — and we are its cause.',
    detail: 'The last time Earth lost this many species, an asteroid was involved.',
    color: '#FFB800',
    accentBg: 'rgba(255,184,0,0.05)',
    borderColor: 'rgba(255,184,0,0.2)',
  },
]

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''))
    const prefix = target.match(/^[^0-9]*/)?.[0] || ''
    const unit = target.replace(/[0-9.]/g, '').replace(prefix, '')

    const ctx = gsap.context(() => {
      gsap.from({ val: 0 }, {
        val: numericTarget,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: function () {
          el.textContent = prefix + this.targets()[0].val.toFixed(
            numericTarget % 1 !== 0 ? 1 : 0
          ) + unit + suffix
        },
      })
    }, el)

    return () => ctx.revert()
  }, [target, suffix])

  return <span ref={ref}>{target}</span>
}

export default function Chapter1() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Chapter label entrance
      gsap.from('.ch1-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch1-label', start: 'top 85%', once: true },
      })

      // Main title word by word
      gsap.from('.ch1-title-word', {
        opacity: 0, y: 50, rotationX: -30,
        stagger: 0.1, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ch1-title', start: 'top 80%', once: true },
      })

      // Cards staggered
      gsap.from('.problem-card', {
        opacity: 0, y: 60, scale: 0.97,
        stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.problem-grid', start: 'top 75%', once: true },
      })

      // Quote entrance
      gsap.from('.ch1-quote', {
        opacity: 0, y: 30, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.ch1-quote', start: 'top 85%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch1"
      ref={sectionRef}
      className="section-base py-32 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #0A0503 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />

      {/* Noise/glitch overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(255,107,43,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Chapter Label */}
        <div className="ch1-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-nova/70 uppercase">Chapter 01</span>
          <span className="h-px flex-1 max-w-24 bg-nova/20" />
        </div>

        {/* Title */}
        <div className="ch1-title mb-6" style={{ perspective: '800px' }}>
          <h2
            className="section-title"
            style={{ background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,107,43,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {['The', 'World', 'Today'].map((w, i) => (
              <span key={i} className="ch1-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-20 leading-relaxed">
          Before we can dream of 2050, we must be honest about right now.
          These are not statistics. These are choices.
        </p>

        {/* Problem Grid */}
        <div className="problem-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p) => (
            <motion.div
              key={p.id}
              className="problem-card group relative overflow-hidden rounded-2xl p-8 cursor-default"
              style={{
                background: p.accentBg,
                border: `1px solid ${p.borderColor}`,
              }}
              whileHover={{ scale: 1.01, borderColor: p.color + '50' }}
              transition={{ duration: 0.3 }}
            >
              {/* Card glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 60% at 50% 0%, ${p.color}10, transparent)`,
                }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-xs tracking-widest opacity-50" style={{ color: p.color }}>
                  {p.label}
                </span>
                <div
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ backgroundColor: p.color, boxShadow: `0 0 12px ${p.color}` }}
                />
              </div>

              {/* Stat */}
              <div className="mb-4">
                <div
                  className="font-bebas leading-none mb-1"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: p.color, textShadow: `0 0 30px ${p.color}50` }}
                >
                  <AnimatedCounter target={p.stat} />
                </div>
                <div className="font-mono text-xs tracking-wide text-stellar/40">{p.statLabel}</div>
              </div>

              {/* Title */}
              <h3 className="font-syne font-700 text-xl text-white mb-3">{p.title}</h3>

              {/* Body */}
              <p className="font-syne text-stellar/55 text-sm leading-relaxed mb-4">{p.body}</p>

              {/* Detail tag */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{ background: `${p.color}15`, border: `1px solid ${p.color}25` }}
              >
                <span className="w-1 h-1 rounded-full" style={{ background: p.color }} />
                <span className="font-mono text-xs" style={{ color: p.color }}>{p.detail}</span>
              </div>

              {/* Bottom border line animate */}
              <div
                className="absolute bottom-0 left-0 h-px"
                style={{
                  background: `linear-gradient(90deg, ${p.color}, transparent)`,
                  animation: 'dataLine 4s ease-in-out infinite',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Closing Quote */}
        <div className="ch1-quote mt-24 text-center max-w-3xl mx-auto">
          <div className="font-cinzel text-2xl md:text-3xl text-stellar/70 leading-relaxed mb-4">
            "The gap between what humanity is capable of
            <br />and what humanity is doing — is the crisis."
          </div>
          <div className="font-mono text-xs text-stellar/30 tracking-widest">
            — Bridging that gap is what 2050 is about
          </div>
        </div>
      </div>

      {/* Large background number */}
      <div
        className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none"
      >
        01
      </div>
    </section>
  )
}
