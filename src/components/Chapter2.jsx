import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const technologies = [
  {
    year: '2024',
    tech: 'Large Language Models',
    desc: 'AI learns to reason, create, and collaborate. The first systems that think in language.',
    icon: '◈',
    color: '#00B8FF',
  },
  {
    year: '2027',
    tech: 'Autonomous Everything',
    desc: 'Vehicles, factories, and infrastructure begin operating without human input.',
    icon: '⬡',
    color: '#7B2FFF',
  },
  {
    year: '2030',
    tech: 'Quantum Advantage',
    desc: 'Quantum computers solve problems that would take classical machines millions of years.',
    icon: '◉',
    color: '#00FFF7',
  },
  {
    year: '2035',
    tech: 'Neural Interfaces',
    desc: 'The first commercial brain-computer interfaces give humans digital senses.',
    icon: '◎',
    color: '#FFB800',
  },
  {
    year: '2040',
    tech: 'Fusion Energy',
    desc: 'Limitless clean energy. The technology that mirrors the sun becomes commercially viable.',
    icon: '☀',
    color: '#FF6B2B',
  },
  {
    year: '2045',
    tech: 'Molecular Medicine',
    desc: 'Nanobots patrol bloodstreams. Cancer becomes a manageable chronic condition.',
    icon: '⬟',
    color: '#00FF88',
  },
  {
    year: '2050',
    tech: 'The Convergence',
    desc: 'AI, biotech, energy, and space reach critical mass simultaneously. Nothing is the same.',
    icon: '★',
    color: '#FFFFFF',
    highlight: true,
  },
]

export default function Chapter2() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label entrance
      gsap.from('.ch2-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch2-label', start: 'top 85%', once: true },
      })

      // Title
      gsap.from('.ch2-title-word', {
        opacity: 0, y: 60, rotationX: -40,
        stagger: 0.08, duration: 0.9, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.ch2-title', start: 'top 80%', once: true },
      })

      // Timeline line draw
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: lineRef.current, start: 'top 75%', once: true },
      })

      // Timeline nodes
      gsap.from('.timeline-node', {
        opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50, scale: 0.9,
        stagger: 0.2, duration: 0.8, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.timeline-container', start: 'top 70%', once: true },
      })

      // Stats counter
      gsap.from('.ch2-stat', {
        opacity: 0, y: 30,
        stagger: 0.1, duration: 0.8,
        scrollTrigger: { trigger: '.ch2-stats', start: 'top 80%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch2"
      ref={sectionRef}
      className="section-base py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #000A1A 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 80% 30%, rgba(0,184,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Label */}
        <div className="ch2-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-electric/70 uppercase">Chapter 02</span>
          <span className="h-px flex-1 max-w-24 bg-electric/20" />
        </div>

        {/* Title */}
        <div className="ch2-title mb-4">
          <h2 className="section-title">
            {['The', 'Great', 'Transition'].map((w, i) => (
              <span key={i} className="ch2-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-20 leading-relaxed">
          Between now and 2050, seven technological forces will reshape civilization.
          Not gradually. All at once.
        </p>

        {/* Timeline */}
        <div className="timeline-container relative grid md:grid-cols-2 gap-0 max-w-5xl mx-auto">
          {/* Center line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent 0%, #00B8FF 20%, #7B2FFF 80%, transparent 100%)' }}
          />

          {technologies.map((t, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={t.year}
                className={`timeline-node relative flex ${isLeft ? 'md:pr-16 md:text-right md:justify-end' : 'md:col-start-2 md:pl-16'} mb-10`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Content card */}
                <div
                  className={`relative max-w-xs p-6 rounded-xl ${t.highlight ? 'ring-1 ring-white/20' : ''}`}
                  style={{
                    background: t.highlight
                      ? 'rgba(255,255,255,0.05)'
                      : `${t.color}08`,
                    border: `1px solid ${t.color}20`,
                  }}
                >
                  {/* Year badge */}
                  <div
                    className="inline-block font-mono text-xs tracking-widest px-3 py-1 rounded-full mb-4"
                    style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}
                  >
                    {t.year}
                  </div>

                  {/* Icon */}
                  <div
                    className="text-2xl mb-3"
                    style={{ color: t.color, textShadow: `0 0 20px ${t.color}` }}
                  >
                    {t.icon}
                  </div>

                  {/* Tech name */}
                  <h3
                    className="font-syne font-800 text-base mb-2"
                    style={{ color: t.highlight ? '#FFFFFF' : t.color }}
                  >
                    {t.tech}
                  </h3>

                  {/* Description */}
                  <p className="font-syne text-stellar/50 text-sm leading-relaxed">{t.desc}</p>

                  {/* Corner accent */}
                  <div
                    className="absolute bottom-0 right-0 w-6 h-6 opacity-30"
                    style={{
                      borderBottom: `2px solid ${t.color}`,
                      borderRight: `2px solid ${t.color}`,
                    }}
                  />
                </div>

                {/* Connector dot (desktop) */}
                <div
                  className="hidden md:flex absolute top-6 items-center justify-center"
                  style={{
                    [isLeft ? 'right' : 'left']: '-2.5rem',
                    width: '1.25rem',
                    height: '1.25rem',
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-black"
                    style={{
                      background: t.color,
                      ringColor: t.color,
                      boxShadow: `0 0 15px ${t.color}`,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom stats */}
        <div className="ch2-stats grid grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto">
          {[
            { num: '26', unit: 'years', label: 'Until the convergence' },
            { num: '7', unit: 'forces', label: 'Reshaping everything' },
            { num: '∞', unit: 'potential', label: 'Of what comes after' },
          ].map((s, i) => (
            <div
              key={i}
              className="ch2-stat text-center p-6 rounded-xl"
              style={{ background: 'rgba(0,184,255,0.03)', border: '1px solid rgba(0,184,255,0.1)' }}
            >
              <div className="font-bebas text-5xl text-electric mb-1">{s.num}</div>
              <div className="font-mono text-xs text-electric/50 tracking-widest mb-2">{s.unit}</div>
              <div className="font-syne text-xs text-stellar/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Background number */}
      <div className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        02
      </div>
    </section>
  )
}
