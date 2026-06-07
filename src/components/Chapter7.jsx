import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const cityStats = [
  { label: 'Carbon Neutral',   value: '100%', note: 'All 250 megacities by 2048',         color: '#39FF14' },
  { label: 'Green Coverage',   value: '62%',  note: 'Of urban surface area forested',       color: '#00FF88' },
  { label: 'Energy Surplus',   value: '+340%',note: 'Exported to global grid annually',    color: '#FFB800' },
  { label: 'Waste Recycled',   value: '99.8%',note: 'Molecular disassembly technology',    color: '#00FFF7' },
]

const cityFeatures = [
  {
    title: 'Vertical Forests',
    desc: 'Buildings wear trees and plants like skin. 800 species per tower. Each skyscraper produces more oxygen than it consumes. The city breathes.',
    icon: '🌿',
    color: '#39FF14',
  },
  {
    title: 'Autonomous Infrastructure',
    desc: 'Roads that repair themselves overnight. Pipes that reroute around blockages. Bridges that report their own stress levels. The city thinks.',
    icon: '⬡',
    color: '#00B8FF',
  },
  {
    title: 'Solar Skin Architecture',
    desc: 'Every surface generates energy — windows, walls, pavements. The city generates 340% more power than it uses and exports the surplus.',
    icon: '◈',
    color: '#FFB800',
  },
  {
    title: 'Living Water Systems',
    desc: 'Atmospheric water harvesting supplies 40% of urban needs. Zero-waste water cycles powered by AI-optimized distribution networks.',
    icon: '◉',
    color: '#00FFF7',
  },
  {
    title: 'Molecular Waste Management',
    desc: 'Nanoscale sorting systems break down all waste at the molecular level. Landfills are museums. Pollution is a historical artifact.',
    icon: '◎',
    color: '#7B2FFF',
  },
  {
    title: 'Biophilic Design',
    desc: 'Nature is not decorative. It is structural. Urban rivers run through towers. Wetlands exist on the 40th floor. Cities and ecosystems are one.',
    icon: '⬟',
    color: '#FF6B2B',
  },
]

function CityskylineSVG() {
  const ref = useRef(null)

  useEffect(() => {
    const buildings = ref.current?.querySelectorAll('.city-building')
    const trees = ref.current?.querySelectorAll('.city-tree')
    const grid = ref.current?.querySelectorAll('.energy-node')

    if (buildings) {
      gsap.from(buildings, {
        scaleY: 0,
        transformOrigin: 'bottom center',
        duration: 1.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      })
    }
    if (trees) {
      gsap.from(trees, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        delay: 0.8,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      })
    }
    if (grid) {
      gsap.to(grid, {
        opacity: 0.8,
        duration: 0.4,
        stagger: 0.05,
        delay: 1.2,
        ease: 'power1.in',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true },
      })
    }
  }, [])

  const buildingData = [
    { x: 30, w: 30, h: 220, windows: 6 },
    { x: 68, w: 44, h: 320, windows: 10 },
    { x: 120, w: 36, h: 270, windows: 8 },
    { x: 165, w: 50, h: 380, windows: 12 },
    { x: 224, w: 38, h: 290, windows: 9 },
    { x: 270, w: 28, h: 200, windows: 6 },
    { x: 306, w: 46, h: 350, windows: 11 },
    { x: 360, w: 32, h: 240, windows: 7 },
    { x: 400, w: 54, h: 420, windows: 14 },
    { x: 463, w: 38, h: 300, windows: 9 },
    { x: 509, w: 26, h: 190, windows: 6 },
    { x: 543, w: 42, h: 340, windows: 10 },
    { x: 593, w: 36, h: 260, windows: 8 },
    { x: 637, w: 28, h: 210, windows: 6 },
    { x: 673, w: 48, h: 370, windows: 12 },
    { x: 729, w: 34, h: 280, windows: 8 },
    { x: 771, w: 22, h: 160, windows: 5 },
  ]

  const H = 450

  return (
    <svg ref={ref} viewBox="0 0 800 450" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010A05" />
          <stop offset="100%" stopColor="#001A05" />
        </linearGradient>
        <linearGradient id="building-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FF88" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#00B8FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#003020" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow-green">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="800" height={H} fill="url(#sky-grad)" />

      {/* Atmospheric glow */}
      <ellipse cx="400" cy={H - 10} rx="500" ry="80" fill="rgba(0,255,136,0.04)" />

      {/* Ground */}
      <rect y={H - 20} width="800" height="20" fill="rgba(0,40,20,0.8)" />

      {/* Buildings */}
      {buildingData.map((b, i) => (
        <g key={i}>
          {/* Building body */}
          <rect
            className="city-building"
            x={b.x}
            y={H - 20 - b.h}
            width={b.w}
            height={b.h}
            fill="url(#building-grad)"
            stroke="rgba(0,255,136,0.2)"
            strokeWidth="0.5"
            rx="2"
          />

          {/* Windows - green glow */}
          {Array.from({ length: Math.min(b.windows, 8) }).map((_, wi) => {
            const col = wi % 2
            const row = Math.floor(wi / 2)
            const wx = b.x + 4 + col * (b.w / 2 - 4)
            const wy = H - 20 - b.h + 15 + row * 25
            const lit = Math.random() > 0.3
            return lit ? (
              <rect
                key={wi}
                x={wx}
                y={wy}
                width={Math.max(5, b.w / 2 - 8)}
                height={8}
                fill="rgba(0,255,136,0.5)"
                rx="1"
                filter="url(#glow-green)"
              />
            ) : null
          })}

          {/* Rooftop tree clusters */}
          {i % 3 === 0 && (
            <g className="city-tree" style={{ transformOrigin: `${b.x + b.w / 2}px ${H - 20 - b.h}px` }}>
              <ellipse
                cx={b.x + b.w / 2}
                cy={H - 20 - b.h - 12}
                rx={b.w * 0.4}
                ry={14}
                fill="rgba(57,255,20,0.5)"
                filter="url(#glow-green)"
              />
              <ellipse
                cx={b.x + b.w / 2 - 8}
                cy={H - 20 - b.h - 8}
                rx={b.w * 0.25}
                ry={9}
                fill="rgba(0,255,136,0.4)"
              />
            </g>
          )}

          {/* Solar panels on top */}
          {i % 2 === 0 && (
            <rect
              x={b.x + 2}
              y={H - 20 - b.h - 3}
              width={b.w - 4}
              height={4}
              fill="rgba(255,184,0,0.6)"
              rx="1"
            />
          )}
        </g>
      ))}

      {/* Energy grid connections */}
      {buildingData.filter((_, i) => i % 4 === 0).map((b, i, arr) => {
        const next = arr[(i + 1) % arr.length]
        return (
          <line
            key={i}
            className="energy-node"
            x1={b.x + b.w / 2}
            y1={H - 20 - b.h + 10}
            x2={next.x + next.w / 2}
            y2={H - 20 - next.h + 10}
            stroke="rgba(255,184,0,0.3)"
            strokeWidth="0.8"
            strokeDasharray="4,6"
            opacity="0"
          />
        )
      })}

      {/* Aerial vehicle trails */}
      {[
        { y: H * 0.25, color: '#00FFF7' },
        { y: H * 0.35, color: '#7B2FFF' },
        { y: H * 0.18, color: '#00B8FF' },
      ].map((trail, i) => (
        <g key={i}>
          <circle
            cx={0}
            cy={trail.y}
            r="3"
            fill={trail.color}
            style={{ filter: `drop-shadow(0 0 6px ${trail.color})` }}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-10 0"
              to="810 0"
              dur={`${10 + i * 3}s`}
              repeatCount="indefinite"
              begin={`${i * 3}s`}
            />
          </circle>
          <line
            x1={0}
            y1={trail.y}
            x2={60}
            y2={trail.y}
            stroke={trail.color}
            strokeWidth="0.5"
            opacity="0.4"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-70 0"
              to="810 0"
              dur={`${10 + i * 3}s`}
              repeatCount="indefinite"
              begin={`${i * 3}s`}
            />
          </line>
        </g>
      ))}
    </svg>
  )
}

export default function Chapter7() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ch7-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch7-label', start: 'top 85%', once: true },
      })
      gsap.from('.ch7-title-word', {
        opacity: 0, y: 50,
        stagger: 0.1, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ch7-title', start: 'top 80%', once: true },
      })
      gsap.from('.ch7-stat', {
        opacity: 0, y: 30, scale: 0.9,
        stagger: 0.1, duration: 0.7,
        scrollTrigger: { trigger: '.ch7-stats', start: 'top 80%', once: true },
      })
      gsap.from('.ch7-feature', {
        opacity: 0, y: 40,
        stagger: 0.1, duration: 0.8,
        scrollTrigger: { trigger: '.ch7-features', start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch7"
      ref={sectionRef}
      className="section-base py-32 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #010D00 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(57,255,20,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="ch7-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-[#39FF14]/70 uppercase">Chapter 07</span>
          <span className="h-px flex-1 max-w-24" style={{ background: 'rgba(57,255,20,0.2)' }} />
        </div>

        <div className="ch7-title mb-4">
          <h2 className="section-title"
            style={{ background: 'linear-gradient(135deg, #ffffff, rgba(57,255,20,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {['Sustainable', 'Megacities'].map((w, i) => (
              <span key={i} className="ch7-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-12 leading-relaxed">
          The city of 2050 is alive. It grows. It heals. It adapts.
          It is the most complex ecosystem humanity has ever designed.
        </p>

        {/* Stats */}
        <div className="ch7-stats grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {cityStats.map((s, i) => (
            <div
              key={i}
              className="ch7-stat p-5 rounded-xl text-center"
              style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
            >
              <div className="font-bebas text-3xl mb-1" style={{ color: s.color, textShadow: `0 0 20px ${s.color}50` }}>
                {s.value}
              </div>
              <div className="font-syne font-600 text-xs text-white mb-1">{s.label}</div>
              <div className="font-mono text-[10px] text-stellar/30">{s.note}</div>
            </div>
          ))}
        </div>

        {/* Cityscape SVG */}
        <div
          className="relative rounded-2xl overflow-hidden mb-12"
          style={{ height: '380px', background: '#010D00', border: '1px solid rgba(57,255,20,0.1)' }}
        >
          <CityskylineSVG />
          <div className="absolute top-4 left-4 font-mono text-xs text-[#39FF14]/30 tracking-widest">
            NEO-CITY 07 — FULLY AUTONOMOUS
          </div>
        </div>

        {/* Features */}
        <div className="ch7-features grid grid-cols-1 md:grid-cols-3 gap-5">
          {cityFeatures.map((f, i) => (
            <motion.div
              key={i}
              className="ch7-feature p-5 rounded-xl group"
              style={{ background: `${f.color}06`, border: `1px solid ${f.color}15` }}
              whileHover={{ y: -4, boxShadow: `0 20px 40px ${f.color}15` }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xl mb-3">{f.icon}</div>
              <h3 className="font-syne font-700 text-white text-sm mb-2">{f.title}</h3>
              <p className="font-syne text-stellar/40 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        07
      </div>
    </section>
  )
}
