import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const vehicles = [
  { id: 'v1', x: '-10%', y: '30%', delay: 0, speed: 14 },
  { id: 'v2', x: '-10%', y: '45%', delay: 3, speed: 18 },
  { id: 'v3', x: '-10%', y: '22%', delay: 6, speed: 12 },
  { id: 'v4', x: '-10%', y: '55%', delay: 1.5, speed: 16 },
]

const stats = [
  { label: 'Max Speed', value: '1,200', unit: 'km/h', note: 'Hyperloop transit', color: '#7B2FFF' },
  { label: 'Accidents / Year', value: '0.001%', unit: 'rate', note: 'AI navigation — near zero', color: '#00FF88' },
  { label: 'Emissions', value: '0', unit: 'gCO₂/km', note: 'Fully electric grid', color: '#00FFF7' },
  { label: 'Travel Time', value: '94%', unit: 'reduced', note: 'Vs. 2024 urban commute', color: '#FFB800' },
]

const transportModes = [
  {
    name: 'Aerial Pod',
    desc: 'Autonomous electric aircraft navigate 3D airspace corridors at 200m altitude. No congestion exists when you move in three dimensions.',
    icon: '◈',
    color: '#7B2FFF',
    altitude: '200m',
  },
  {
    name: 'Hyperloop',
    desc: 'Vacuum tube transit between megacities at 1,200 km/h. Mumbai to Shanghai in 90 minutes. The morning meeting is never too far.',
    icon: '▶▶',
    color: '#00B8FF',
    altitude: 'Underground',
  },
  {
    name: 'Vertical VTOL',
    desc: 'Electric vertical take-off from any rooftop. Door-to-door air service. A taxi that also flies.',
    icon: '⬡',
    color: '#00FFF7',
    altitude: '80m',
  },
]

export default function Chapter4() {
  const sectionRef = useRef(null)
  const skylineRef = useRef(null)
  const cityRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ch4-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch4-label', start: 'top 85%', once: true },
      })

      gsap.from('.ch4-title-word', {
        opacity: 0, y: 60,
        stagger: 0.1, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ch4-title', start: 'top 80%', once: true },
      })

      // Parallax city layers
      gsap.to('.city-layer-1', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -80,
      })

      gsap.to('.city-layer-2', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -140,
      })

      gsap.to('.city-layer-3', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
        y: -200,
      })

      // Stats cards
      gsap.from('.ch4-stat', {
        opacity: 0, y: 30, scale: 0.95,
        stagger: 0.1, duration: 0.8,
        scrollTrigger: { trigger: '.ch4-stats', start: 'top 80%', once: true },
      })

      // Mode cards
      gsap.from('.ch4-mode', {
        opacity: 0, x: 60,
        stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ch4-modes', start: 'top 75%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch4"
      ref={sectionRef}
      className="section-base py-32 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #080010 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(123,47,255,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Parallax City Scene */}
      <div
        ref={cityRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ top: '30%' }}
      >
        {/* Far buildings - layer 1 */}
        <div className="city-layer-1 absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 opacity-15">
          {[60, 80, 100, 70, 90, 110, 75, 65, 85, 95, 55, 105, 72, 88].map((h, i) => (
            <div
              key={i}
              className="rounded-t-sm"
              style={{
                width: `${24 + Math.random() * 20}px`,
                height: `${h}px`,
                background: `linear-gradient(180deg, rgba(123,47,255,0.6) 0%, rgba(0,0,0,0) 100%)`,
                boxShadow: i % 3 === 0 ? '0 0 20px rgba(123,47,255,0.3)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Mid buildings - layer 2 */}
        <div className="city-layer-2 absolute bottom-0 left-0 right-0 flex items-end justify-center gap-3 opacity-25">
          {[100, 140, 180, 120, 160, 200, 130, 110, 150, 170, 125, 190].map((h, i) => (
            <div
              key={i}
              className="rounded-t"
              style={{
                width: `${32 + i % 4 * 8}px`,
                height: `${h}px`,
                background: `linear-gradient(180deg, rgba(0,184,255,0.5) 0%, rgba(0,0,0,0) 100%)`,
                boxShadow: i % 2 === 0 ? '0 0 30px rgba(0,184,255,0.2)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Near buildings - layer 3 */}
        <div className="city-layer-3 absolute bottom-0 left-0 right-0 flex items-end justify-center gap-4 opacity-40">
          {[200, 260, 320, 240, 280, 350, 220, 300, 270].map((h, i) => (
            <div
              key={i}
              style={{
                width: `${48 + i % 3 * 12}px`,
                height: `${h}px`,
                background: `linear-gradient(180deg, rgba(0,255,247,0.4) 0%, rgba(123,47,255,0.2) 60%, rgba(0,0,0,0) 100%)`,
                borderRadius: '4px 4px 0 0',
              }}
            >
              {/* Building windows */}
              <div className="grid grid-cols-3 gap-1 p-2">
                {Array.from({ length: 12 }).map((_, wi) => (
                  <div
                    key={wi}
                    className="aspect-square rounded-sm"
                    style={{
                      background: Math.random() > 0.4 ? 'rgba(0,184,255,0.6)' : 'transparent',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Animated vehicle trails */}
        {vehicles.map((v) => (
          <motion.div
            key={v.id}
            className="absolute"
            style={{ top: v.y }}
            animate={{ left: [v.x, '110%'] }}
            transition={{
              duration: v.speed,
              delay: v.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="relative flex items-center">
              {/* Vehicle body */}
              <div
                className="w-8 h-3 rounded-full"
                style={{ background: 'rgba(0,255,247,0.9)', boxShadow: '0 0 20px rgba(0,255,247,0.8)' }}
              />
              {/* Trail */}
              <div
                className="absolute right-7 top-1/2 -translate-y-1/2 h-px"
                style={{
                  width: '60px',
                  background: 'linear-gradient(90deg, transparent, rgba(0,255,247,0.6))',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Label */}
        <div className="ch4-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-aurora/70 uppercase">Chapter 04</span>
          <span className="h-px flex-1 max-w-24 bg-aurora/20" />
        </div>

        {/* Title */}
        <div className="ch4-title mb-4">
          <h2 className="section-title"
            style={{ background: 'linear-gradient(135deg, #ffffff, rgba(123,47,255,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {['The', 'Transportation', 'Revolution'].map((w, i) => (
              <span key={i} className="ch4-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-16 leading-relaxed">
          In 2050, the question is not "How do I get there?" It is "Which dimension do I travel through?"
        </p>

        {/* Stats */}
        <div className="ch4-stats grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <div
              key={i}
              className="ch4-stat p-5 rounded-xl"
              style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
            >
              <div className="font-bebas text-3xl mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="font-mono text-xs text-stellar/30 mb-1">{s.unit}</div>
              <div className="font-syne text-xs text-stellar/50">{s.label}</div>
              <div className="font-mono text-[10px] text-stellar/25 mt-1">{s.note}</div>
            </div>
          ))}
        </div>

        {/* Transport Modes */}
        <div className="ch4-modes grid grid-cols-1 md:grid-cols-3 gap-6">
          {transportModes.map((m, i) => (
            <motion.div
              key={i}
              className="ch4-mode p-6 rounded-2xl"
              style={{ background: `${m.color}07`, border: `1px solid ${m.color}20` }}
              whileHover={{ y: -6, boxShadow: `0 30px 60px ${m.color}15` }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-xl"
                  style={{ color: m.color, textShadow: `0 0 15px ${m.color}` }}
                >
                  {m.icon}
                </span>
                <span
                  className="font-mono text-xs px-2 py-1 rounded-full"
                  style={{ background: `${m.color}15`, color: m.color }}
                >
                  {m.altitude}
                </span>
              </div>
              <h3 className="font-syne font-700 text-white text-lg mb-3">{m.name}</h3>
              <p className="font-syne text-stellar/50 text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-20 text-center">
          <blockquote className="font-cinzel text-xl md:text-2xl text-stellar/60 max-w-2xl mx-auto leading-relaxed">
            "In 2050, traffic is a word you need to explain to your children."
          </blockquote>
        </div>
      </div>

      {/* Background number */}
      <div className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        04
      </div>
    </section>
  )
}
