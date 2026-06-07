import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const holoModules = [
  {
    id: 'time',
    title: 'Local Time',
    value: '07:42:18',
    sub: 'AM — Sector 7, Neo-Mumbai',
    icon: '◷',
    color: '#00B8FF',
    position: { top: '8%', left: '2%' },
    size: 'sm',
  },
  {
    id: 'biometrics',
    title: 'Biometric Status',
    value: 'Optimal',
    sub: 'Heart rate 62bpm · REM 98%',
    icon: '◈',
    color: '#00FF88',
    position: { top: '12%', right: '4%' },
    size: 'md',
  },
  {
    id: 'air',
    title: 'Air Quality',
    value: 'AQI 8',
    sub: 'Exceptional · Filtered nanoclean',
    icon: '◉',
    color: '#00FFF7',
    position: { bottom: '22%', left: '3%' },
    size: 'sm',
  },
  {
    id: 'energy',
    title: 'Home Energy',
    value: '100%',
    sub: 'Solar surplus 2.4kWh — sharing to grid',
    icon: '⚡',
    color: '#FFB800',
    position: { bottom: '18%', right: '3%' },
    size: 'md',
  },
  {
    id: 'assistant',
    title: 'AI Companion',
    value: 'Good Morning',
    sub: '"Your 09:00 orbital transit is on time"',
    icon: '◎',
    color: '#7B2FFF',
    position: { top: '42%', left: '-1%' },
    size: 'lg',
  },
  {
    id: 'environment',
    title: 'Room Climate',
    value: '23.4°C',
    sub: 'Humidity 46% · Adaptive to preference',
    icon: '◇',
    color: '#FF6B2B',
    position: { top: '45%', right: '0%' },
    size: 'sm',
  },
]

function HoloPanel({ module, mouseX, mouseY }) {
  const springX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), { stiffness: 120, damping: 20 })
  const springY = useSpring(useTransform(mouseY, [-1, 1], [-5, 5]), { stiffness: 120, damping: 20 })

  const sizeMap = {
    sm: 'w-48',
    md: 'w-56',
    lg: 'w-64',
  }

  return (
    <motion.div
      className={`absolute ${sizeMap[module.size]} rounded-xl p-4 cursor-default`}
      style={{
        ...module.position,
        x: springX,
        y: springY,
        background: `linear-gradient(135deg, ${module.color}08, ${module.color}04)`,
        border: `1px solid ${module.color}30`,
        backdropFilter: 'blur(20px)',
        boxShadow: `0 0 30px ${module.color}15, inset 0 0 15px ${module.color}05`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: Math.random() * 0.4 }}
      whileHover={{ scale: 1.03, boxShadow: `0 0 50px ${module.color}30` }}
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${module.color}06, transparent, ${module.color}03)` }}
      />

      {/* Scan line */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${module.color}08 50%, transparent 100%)`,
          animation: 'scan 4s linear infinite',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] tracking-widest opacity-50" style={{ color: module.color }}>
            {module.title}
          </span>
          <span style={{ color: module.color, fontSize: '0.9rem' }}>{module.icon}</span>
        </div>

        <div
          className="font-bebas text-2xl mb-1"
          style={{ color: module.color, textShadow: `0 0 15px ${module.color}60` }}
        >
          {module.value}
        </div>

        <p className="font-mono text-[10px] text-stellar/40 leading-relaxed">{module.sub}</p>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3" style={{ borderTop: `1px solid ${module.color}40`, borderLeft: `1px solid ${module.color}40` }} />
      <div className="absolute top-2 right-2 w-3 h-3" style={{ borderTop: `1px solid ${module.color}40`, borderRight: `1px solid ${module.color}40` }} />
      <div className="absolute bottom-2 left-2 w-3 h-3" style={{ borderBottom: `1px solid ${module.color}40`, borderLeft: `1px solid ${module.color}40` }} />
      <div className="absolute bottom-2 right-2 w-3 h-3" style={{ borderBottom: `1px solid ${module.color}40`, borderRight: `1px solid ${module.color}40` }} />
    </motion.div>
  )
}

export default function Chapter3() {
  const sectionRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [time, setTime] = useState('07:42:18')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      setTime(`${h}:${m}:${s}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ch3-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch3-label', start: 'top 85%', once: true },
      })
      gsap.from('.ch3-title-word', {
        opacity: 0, y: 50,
        stagger: 0.1, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ch3-title', start: 'top 80%', once: true },
      })
      gsap.from('.ch3-scene', {
        opacity: 0, scale: 0.97,
        duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.ch3-scene', start: 'top 75%', once: true },
      })
      gsap.from('.ch3-routine-item', {
        opacity: 0, x: 40,
        stagger: 0.12, duration: 0.7,
        scrollTrigger: { trigger: '.ch3-routine', start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch3"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="section-base py-32 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #020D14 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 40%, rgba(0,255,247,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Label */}
        <div className="ch3-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-plasma/70 uppercase">Chapter 03</span>
          <span className="h-px flex-1 max-w-24 bg-plasma/20" />
        </div>

        {/* Title */}
        <div className="ch3-title mb-4">
          <h2 className="section-title"
            style={{ background: 'linear-gradient(135deg, #ffffff, rgba(0,255,247,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {['Morning', 'in', '2050'].map((w, i) => (
              <span key={i} className="ch3-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-16 leading-relaxed">
          You wake to a world that knows you. Not through surveillance — through care.
        </p>

        {/* Main Scene */}
        <div className="ch3-scene relative h-[70vh] rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #020D14 0%, #030F1A 100%)', border: '1px solid rgba(0,255,247,0.1)' }}
        >
          {/* Room environment */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Floor perspective lines */}
            <svg className="absolute bottom-0 left-0 right-0 opacity-10" viewBox="0 0 800 200" fill="none">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <line key={i}
                  x1={400} y1={0}
                  x2={i * 100} y2={200}
                  stroke="#00FFF7"
                  strokeWidth="0.5"
                />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <line key={i}
                  x1={0} y1={i * 50 + 50}
                  x2={800} y2={i * 50 + 50}
                  stroke="#00FFF7"
                  strokeWidth="0.3"
                />
              ))}
            </svg>

            {/* Central room silhouette */}
            <div className="relative flex flex-col items-center">
              {/* Window */}
              <div
                className="w-64 h-48 rounded-lg mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,184,255,0.15) 0%, rgba(0,255,247,0.05) 100%)',
                  border: '1px solid rgba(0,255,247,0.2)',
                  boxShadow: '0 0 60px rgba(0,255,247,0.1)',
                }}
              >
                <div className="text-center">
                  <div className="font-bebas text-4xl text-electric mb-1">{time}</div>
                  <div className="font-mono text-xs text-stellar/40 tracking-widest">NEO-MUMBAI · 2050</div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-electric/60 text-sm">↑ 28°C</span>
                    <span className="font-mono text-xs text-stellar/30">·</span>
                    <span className="font-mono text-xs text-stellar/40">Clear · AQI 8</span>
                  </div>
                </div>
              </div>

              {/* Greeting text */}
              <motion.div
                className="text-center px-6 py-3 rounded-xl"
                style={{ background: 'rgba(0,255,247,0.04)', border: '1px solid rgba(0,255,247,0.15)' }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="font-syne text-sm text-plasma/80">
                  ✦ Good morning. Your neural refresh score: <span className="text-plasma font-bold">94%</span>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Holographic panels */}
          {holoModules.map((m) => (
            <HoloPanel key={m.id} module={m} mouseX={mouseX} mouseY={mouseY} />
          ))}

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-stellar/20 tracking-widest">
            SYS_STATUS: ALL NOMINAL
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-stellar/20 tracking-widest">
            ENV_CONTROL: ACTIVE
          </div>

          {/* Scan lines */}
          <div className="absolute inset-0 pointer-events-none scanlines rounded-3xl" />
        </div>

        {/* Daily Routine */}
        <div className="ch3-routine mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              time: '07:00',
              event: 'Biometric Briefing',
              detail: 'Your AI companion analyzes overnight health data and adjusts your nutrition plan.',
              color: '#00B8FF',
            },
            {
              time: '07:20',
              event: 'Holographic Workspace',
              detail: 'Your desk projects 12 virtual screens. Your office exists wherever you are.',
              color: '#7B2FFF',
            },
            {
              time: '08:00',
              event: 'Orbital Commute',
              detail: 'A silent autonomous pod arrives. The route recalculates 200 times per second.',
              color: '#00FFF7',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="ch3-routine-item p-6 rounded-xl"
              style={{ background: `${item.color}06`, border: `1px solid ${item.color}20` }}
              whileHover={{ y: -4, boxShadow: `0 20px 40px ${item.color}15` }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-bebas text-3xl mb-2" style={{ color: item.color }}>{item.time}</div>
              <h4 className="font-syne font-700 text-white text-sm mb-2">{item.event}</h4>
              <p className="font-syne text-stellar/40 text-xs leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background number */}
      <div className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        03
      </div>
    </section>
  )
}
