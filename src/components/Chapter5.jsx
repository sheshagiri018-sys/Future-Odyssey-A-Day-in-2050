import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const innovations = [
  {
    title: 'AI Diagnostics',
    body: 'Trained on 2 billion patient records, diagnostic AI detects cancer at stage 0 with 99.7% accuracy. It reads a retinal scan and predicts cardiovascular risk 10 years out.',
    metric: '99.7%',
    metricLabel: 'diagnostic accuracy',
    icon: '◈',
    color: '#00FF88',
  },
  {
    title: 'Predictive Medicine',
    body: 'Before you feel sick, your digital twin already knows. A constant simulation of your body flags anomalies 18 months before symptoms. Disease becomes preventable, not treatable.',
    metric: '18mo',
    metricLabel: 'early warning window',
    icon: '◉',
    color: '#00FFF7',
  },
  {
    title: 'DNA-Tailored Treatment',
    body: 'No more universal doses. Every treatment is designed for your specific genome. Chemotherapy has been replaced by targeted molecular agents — no side effects, maximum efficacy.',
    metric: '100%',
    metricLabel: 'genomic personalization',
    icon: '⬟',
    color: '#7B2FFF',
  },
  {
    title: 'Nanobot Repair',
    body: 'Swarms of nanoscale robots patrol your bloodstream, patching cellular damage, clearing plaque, and releasing targeted drug payloads. Surgery without incisions.',
    metric: '0.001mm',
    metricLabel: 'nanobot scale',
    icon: '◎',
    color: '#FFB800',
  },
]

function DNAHelix() {
  const svgRef = useRef(null)

  useEffect(() => {
    const strands = svgRef.current.querySelectorAll('.dna-strand')
    const rungs = svgRef.current.querySelectorAll('.dna-rung')

    gsap.to(strands, {
      strokeDashoffset: 0,
      duration: 3,
      ease: 'power2.out',
      stagger: 0.5,
      scrollTrigger: { trigger: svgRef.current, start: 'top 75%', once: true },
    })

    gsap.to(rungs, {
      opacity: 1,
      stagger: 0.05,
      duration: 0.3,
      scrollTrigger: { trigger: svgRef.current, start: 'top 75%', once: true },
    })

    // Infinite rotation effect via gradual opacity shift
    gsap.to('.dna-glow', {
      opacity: 0.3,
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
    })
  }, [])

  // Generate DNA helix points
  const helixPoints = []
  const strandA = []
  const strandB = []
  const height = 500
  const segments = 20
  const amplitude = 30
  const cy = 40

  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const y = t * height
    const angle = t * Math.PI * 6
    const xA = cy + Math.sin(angle) * amplitude
    const xB = cy - Math.sin(angle) * amplitude
    strandA.push([xA, y])
    strandB.push([xB, y])

    if (i < segments) {
      const midY = y + height / segments / 2
      const midAngle = angle + Math.PI * 3 / segments
      const rungX1 = cy + Math.sin(midAngle) * amplitude * 0.7
      const rungX2 = cy - Math.sin(midAngle) * amplitude * 0.7
      helixPoints.push({ x1: rungX1, y1: midY, x2: rungX2, y2: midY })
    }
  }

  const pathA = `M ${strandA[0][0]} ${strandA[0][1]} ` + strandA.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ')
  const pathB = `M ${strandB[0][0]} ${strandB[0][1]} ` + strandB.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ')
  const pathLen = height * 2

  return (
    <svg ref={svgRef} viewBox="0 0 80 500" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 15px rgba(0,255,136,0.3))' }}>
      <defs>
        <linearGradient id="dna-grad-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FF88" />
          <stop offset="50%" stopColor="#00FFF7" />
          <stop offset="100%" stopColor="#7B2FFF" />
        </linearGradient>
        <linearGradient id="dna-grad-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B2FFF" />
          <stop offset="50%" stopColor="#00B8FF" />
          <stop offset="100%" stopColor="#00FF88" />
        </linearGradient>
      </defs>

      {/* Glow background */}
      {helixPoints.map((r, i) => (
        <line
          key={`glow-${i}`}
          className="dna-glow"
          x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke="#00FF88"
          strokeWidth="4"
          opacity="0.05"
        />
      ))}

      {/* Rungs */}
      {helixPoints.map((r, i) => (
        <line
          key={i}
          className="dna-rung"
          x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={i % 4 === 0 ? '#00FF88' : i % 4 === 1 ? '#00FFF7' : i % 4 === 2 ? '#7B2FFF' : '#FFB800'}
          strokeWidth="1.5"
          opacity="0"
        />
      ))}

      {/* Strand A */}
      <path
        className="dna-strand"
        d={pathA}
        fill="none"
        stroke="url(#dna-grad-a)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={pathLen}
        strokeDashoffset={pathLen}
      />

      {/* Strand B */}
      <path
        className="dna-strand"
        d={pathB}
        fill="none"
        stroke="url(#dna-grad-b)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={pathLen}
        strokeDashoffset={pathLen}
      />

      {/* Node dots */}
      {strandA.filter((_, i) => i % 3 === 0).map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#00FF88" opacity="0.8" />
      ))}
      {strandB.filter((_, i) => i % 3 === 0).map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#7B2FFF" opacity="0.8" />
      ))}
    </svg>
  )
}

export default function Chapter5() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ch5-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch5-label', start: 'top 85%', once: true },
      })
      gsap.from('.ch5-title-word', {
        opacity: 0, y: 50,
        stagger: 0.1, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ch5-title', start: 'top 80%', once: true },
      })
      gsap.from('.ch5-card', {
        opacity: 0, y: 60,
        stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ch5-cards', start: 'top 75%', once: true },
      })
      gsap.from('.ch5-big-stat', {
        opacity: 0, scale: 0.8,
        stagger: 0.1, duration: 1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '.ch5-big-stats', start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch5"
      ref={sectionRef}
      className="section-base py-32 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #001A0A 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 80% 40%, rgba(0,255,136,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Heartbeat scan line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'rgba(0,255,136,0.3)', animation: 'heartbeat 2s ease-in-out infinite' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Label */}
        <div className="ch5-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-success/70 uppercase">Chapter 05</span>
          <span className="h-px flex-1 max-w-24 bg-success/20" />
        </div>

        {/* Title */}
        <div className="ch5-title mb-4">
          <h2 className="section-title"
            style={{ background: 'linear-gradient(135deg, #ffffff, rgba(0,255,136,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {['The', 'Healthcare', 'Revolution'].map((w, i) => (
              <span key={i} className="ch5-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-16 leading-relaxed">
          The doctor of 2050 is 1,000 AIs working in concert.
          The patient of 2050 is someone who was warned years ago.
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          {/* DNA Visualization */}
          <div className="flex justify-center">
            <div
              className="relative w-32 h-96 md:w-48 md:h-[500px]"
              style={{ filter: 'drop-shadow(0 0 30px rgba(0,255,136,0.2))' }}
            >
              <DNAHelix />

              {/* Pulse rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-green-400/10"
                  animate={{ scale: [1, 1.3, 1.6], opacity: [0.4, 0.2, 0] }}
                  transition={{ duration: 3, delay: i * 1, repeat: Infinity }}
                />
              ))}
            </div>
          </div>

          {/* Innovations */}
          <div className="ch5-cards space-y-4">
            {innovations.map((item, i) => (
              <motion.div
                key={i}
                className="ch5-card p-5 rounded-xl group"
                style={{ background: `${item.color}06`, border: `1px solid ${item.color}20` }}
                whileHover={{ x: 8, boxShadow: `0 0 30px ${item.color}15` }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-xl" style={{ color: item.color }}>{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-syne font-700 text-white text-base">{item.title}</h3>
                      <div className="text-right">
                        <div className="font-bebas text-lg" style={{ color: item.color }}>{item.metric}</div>
                        <div className="font-mono text-[10px] text-stellar/30">{item.metricLabel}</div>
                      </div>
                    </div>
                    <p className="font-syne text-stellar/45 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Big stats */}
        <div className="ch5-big-stats grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/5">
          {[
            { val: '150', unit: 'years', label: 'Avg. life expectancy by 2080', color: '#00FF88' },
            { val: '12', unit: 'cancers', label: 'Cured through gene therapy', color: '#00FFF7' },
            { val: '0', unit: 'pandemics', label: 'Since global AI health grid', color: '#7B2FFF' },
            { val: '1hr', unit: 'to diagnose', label: 'Any known disease globally', color: '#FFB800' },
          ].map((s, i) => (
            <div key={i} className="ch5-big-stat text-center">
              <div className="font-bebas text-4xl mb-1" style={{ color: s.color, textShadow: `0 0 20px ${s.color}50` }}>{s.val}</div>
              <div className="font-mono text-xs text-stellar/40 mb-2">{s.unit}</div>
              <div className="font-syne text-xs text-stellar/30">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Background number */}
      <div className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        05
      </div>
    </section>
  )
}
