import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const possibilities = [
  {
    title: 'Consciousness Upload',
    body: 'By 2075, the distinction between biological and digital mind may cease to exist. What does immortality mean when memory is the self?',
    icon: '◎',
    color: '#FFB800',
    year: '2075',
  },
  {
    title: 'Contact',
    body: 'With detection arrays spanning multiple star systems, humanity may receive its first confirmed signal from non-terrestrial intelligence before 2100.',
    icon: '◈',
    color: '#00B8FF',
    year: '2082',
  },
  {
    title: 'New Senses',
    body: 'Neural interfaces give humans perception beyond the visible spectrum — infrared vision, magnetic field detection, quantum-state awareness.',
    icon: '◉',
    color: '#7B2FFF',
    year: '2061',
  },
  {
    title: 'Galactic Expansion',
    body: 'The first generation ship toward Proxima Centauri launches. It will carry 10,000 people and take 80 years. They will never return to Earth.',
    icon: '★',
    color: '#C8E6FF',
    year: '2094',
  },
]

const humanQualities = [
  { trait: 'Curiosity',   desc: 'The engine of all progress',      value: 100 },
  { trait: 'Empathy',     desc: 'The only universal technology',    value: 95 },
  { trait: 'Creativity',  desc: 'What machines cannot replicate',   value: 90 },
  { trait: 'Resilience',  desc: 'We have survived everything',      value: 98 },
  { trait: 'Connection',  desc: 'The reason we build anything',     value: 88 },
]

function ParticleBurst({ color }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * 360
        const r = 100 + Math.random() * 200
        const delay = Math.random() * 3
        const size = 1 + Math.random() * 3
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: color,
              left: '50%',
              top: '50%',
              boxShadow: `0 0 ${size * 3}px ${color}`,
            }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * r,
              y: Math.sin((angle * Math.PI) / 180) * r,
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}

export default function Chapter9() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ch9-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch9-label', start: 'top 85%', once: true },
      })
      gsap.from('.ch9-title-word', {
        opacity: 0, y: 60,
        stagger: 0.12, duration: 1, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ch9-title', start: 'top 80%', once: true },
      })
      gsap.from('.ch9-possibility', {
        opacity: 0, y: 50, scale: 0.95,
        stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ch9-possibilities', start: 'top 70%', once: true },
      })
      gsap.from('.ch9-human-bar', {
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: 0.1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.ch9-human-bars', start: 'top 80%', once: true },
      })
      gsap.from('.ch9-manifesto-line', {
        opacity: 0, y: 20,
        stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: '.ch9-manifesto', start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch9"
      ref={sectionRef}
      className="section-base py-32 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #080500 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,184,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Label */}
        <div className="ch9-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-gold/70 uppercase">Chapter 09</span>
          <span className="h-px flex-1 max-w-24 bg-gold/20" />
        </div>

        {/* Title */}
        <div className="ch9-title mb-4">
          <h2 className="section-title"
            style={{ background: 'linear-gradient(135deg, #ffffff, rgba(255,184,0,0.9))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {['Humanity', 'Beyond', '2050'].map((w, i) => (
              <span key={i} className="ch9-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-2xl mb-20 leading-relaxed">
          The questions of 2100 have not been asked yet.
          The tools to answer them are being built today.
          The people who will wield them — are not yet born.
        </p>

        {/* What makes us human - bar chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="font-syne font-700 text-white text-xl mb-8">
              What Remains Irreplaceably Human
            </h3>
            <div className="ch9-human-bars space-y-5">
              {humanQualities.map((q, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-syne font-600 text-white text-sm">{q.trait}</span>
                      <span className="font-mono text-xs text-stellar/30 ml-3">{q.desc}</span>
                    </div>
                    <span className="font-mono text-xs text-gold">{q.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,184,0,0.1)' }}>
                    <div
                      className="ch9-human-bar h-full rounded-full"
                      style={{
                        width: `${q.value}%`,
                        background: `linear-gradient(90deg, #FFB800, #FF6B2B)`,
                        boxShadow: '0 0 10px rgba(255,184,0,0.4)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Human silhouette with particle burst */}
          <div className="relative flex items-center justify-center" style={{ minHeight: '320px' }}>
            <ParticleBurst color="#FFB800" />
            <div className="relative z-10 text-center">
              {/* Abstract human form */}
              <div className="relative inline-block">
                <svg viewBox="0 0 120 200" className="w-32 h-48 opacity-60" style={{ filter: 'drop-shadow(0 0 20px rgba(255,184,0,0.4))' }}>
                  {/* Head */}
                  <circle cx="60" cy="28" r="20" fill="none" stroke="#FFB800" strokeWidth="1.5" />
                  {/* Body */}
                  <line x1="60" y1="48" x2="60" y2="120" stroke="#FFB800" strokeWidth="1.5" />
                  {/* Arms */}
                  <line x1="60" y1="70" x2="20" y2="100" stroke="#FFB800" strokeWidth="1.5" />
                  <line x1="60" y1="70" x2="100" y2="100" stroke="#FFB800" strokeWidth="1.5" />
                  {/* Legs */}
                  <line x1="60" y1="120" x2="35" y2="180" stroke="#FFB800" strokeWidth="1.5" />
                  <line x1="60" y1="120" x2="85" y2="180" stroke="#FFB800" strokeWidth="1.5" />

                  {/* Digital aura */}
                  <circle cx="60" cy="28" r="28" fill="none" stroke="#FFB800" strokeWidth="0.4" strokeDasharray="2,4" opacity="0.4">
                    <animateTransform attributeName="transform" type="rotate" from="0 60 28" to="360 60 28" dur="8s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="60" cy="100" r="50" fill="none" stroke="#7B2FFF" strokeWidth="0.4" strokeDasharray="3,6" opacity="0.3">
                    <animateTransform attributeName="transform" type="rotate" from="360 60 100" to="0 60 100" dur="12s" repeatCount="indefinite" />
                  </circle>
                </svg>

                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-gold/60 tracking-widest"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  HOMO SAPIENS — v3.0
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Future possibilities */}
        <div className="ch9-possibilities grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {possibilities.map((p, i) => (
            <motion.div
              key={i}
              className="ch9-possibility p-6 rounded-2xl relative overflow-hidden group"
              style={{ background: `${p.color}06`, border: `1px solid ${p.color}18` }}
              whileHover={{ scale: 1.01, boxShadow: `0 20px 50px ${p.color}12` }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 font-bebas text-5xl opacity-5 pointer-events-none pr-3 pt-1" style={{ color: p.color }}>
                {p.year}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl" style={{ color: p.color }}>{p.icon}</span>
                  <h3 className="font-syne font-700 text-white text-base">{p.title}</h3>
                  <span
                    className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${p.color}15`, color: p.color }}
                  >
                    ~{p.year}
                  </span>
                </div>
                <p className="font-syne text-stellar/50 text-sm leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Manifesto */}
        <div className="ch9-manifesto max-w-3xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-12" />

          {[
            'We have always built what we imagined.',
            'We have always become what we believed.',
            'The distance between this moment and 2050',
            'is not measured in years.',
            'It is measured in decisions.',
          ].map((line, i) => (
            <motion.p
              key={i}
              className="ch9-manifesto-line font-cinzel mb-3"
              style={{
                fontSize: i < 2 ? '1.5rem' : '1.1rem',
                color: i < 2 ? 'rgba(255,184,0,0.8)' : 'rgba(200,230,255,0.4)',
                lineHeight: '1.5',
              }}
            >
              {line}
            </motion.p>
          ))}

          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-12 mb-8" />

          <div className="font-mono text-xs text-stellar/20 tracking-widest">
            The next chapter begins with you.
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        09
      </div>
    </section>
  )
}
