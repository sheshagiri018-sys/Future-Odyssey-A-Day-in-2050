import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const knowledgeNodes = [
  { id: 'math',     label: 'Mathematics',    x: 50,  y: 30,  size: 48, color: '#FFB800', connections: ['physics', 'ai', 'quantum'] },
  { id: 'ai',       label: 'AI & Ethics',    x: 75,  y: 20,  size: 44, color: '#00B8FF', connections: ['biology', 'philosophy'] },
  { id: 'physics',  label: 'Physics',        x: 25,  y: 20,  size: 40, color: '#7B2FFF', connections: ['quantum', 'space'] },
  { id: 'biology',  label: 'Biology',        x: 80,  y: 55,  size: 38, color: '#00FF88', connections: ['medicine', 'ecology'] },
  { id: 'quantum',  label: 'Quantum',        x: 15,  y: 50,  size: 36, color: '#00FFF7', connections: ['math', 'space'] },
  { id: 'medicine', label: 'Medicine',       x: 60,  y: 65,  size: 34, color: '#FF6B2B', connections: ['biology', 'ai'] },
  { id: 'space',    label: 'Space Science',  x: 35,  y: 68,  size: 32, color: '#C8E6FF', connections: ['physics'] },
  { id: 'ecology',  label: 'Ecology',        x: 88,  y: 78,  size: 30, color: '#39FF14', connections: [] },
  { id: 'philosophy', label: 'Philosophy',   x: 10,  y: 78,  size: 28, color: '#FF3B30', connections: [] },
]

const learningMethods = [
  {
    title: 'Immersive Simulation',
    desc: 'Walk through ancient Rome. Dissect a star. Watch the big bang unfold around you. Experience is the curriculum.',
    icon: '◈',
    color: '#FFB800',
    tag: 'XR Learning',
  },
  {
    title: 'AI Personal Tutor',
    desc: 'An AI companion knows your learning style, pace, and gaps. Every lesson adapts in real time. No student is left behind.',
    icon: '◉',
    color: '#00B8FF',
    tag: 'Adaptive Intelligence',
  },
  {
    title: 'Global Classrooms',
    desc: 'A child in Lagos, a student in Oslo, and a learner in Jakarta share the same holographic classroom simultaneously.',
    icon: '⬡',
    color: '#00FF88',
    tag: 'Borderless Education',
  },
  {
    title: 'Skill Streaming',
    desc: 'Master a new language in 6 weeks through neural pattern reinforcement. Learn to code in 3. Expertise is no longer scarce.',
    icon: '◎',
    color: '#7B2FFF',
    tag: 'Neural Acceleration',
  },
]

function KnowledgeGraph() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.offsetWidth
    let h = canvas.offsetHeight
    canvas.width = w
    canvas.height = h

    let frameId
    let time = 0
    const nodeMap = {}
    knowledgeNodes.forEach(n => { nodeMap[n.id] = n })

    const draw = () => {
      frameId = requestAnimationFrame(draw)
      time += 0.008
      ctx.clearRect(0, 0, w, h)

      // Draw connections
      knowledgeNodes.forEach(node => {
        const nx = (node.x / 100) * w
        const ny = (node.y / 100) * h

        node.connections.forEach(connId => {
          const conn = nodeMap[connId]
          if (!conn) return
          const cx = (conn.x / 100) * w
          const cy = (conn.y / 100) * h

          // Animated dash
          ctx.beginPath()
          ctx.setLineDash([4, 8])
          ctx.lineDashOffset = -time * 20
          ctx.moveTo(nx, ny)
          ctx.lineTo(cx, cy)
          const grad = ctx.createLinearGradient(nx, ny, cx, cy)
          grad.addColorStop(0, node.color + '60')
          grad.addColorStop(1, conn.color + '60')
          ctx.strokeStyle = grad
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.setLineDash([])

          // Traveling particle
          const t2 = (time * 0.3 + node.connections.indexOf(connId) * 0.3) % 1
          const px = nx + (cx - nx) * t2
          const py = ny + (cy - ny) * t2
          ctx.beginPath()
          ctx.arc(px, py, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = node.color
          ctx.shadowBlur = 10
          ctx.shadowColor = node.color
          ctx.fill()
          ctx.shadowBlur = 0
        })
      })

      // Draw nodes
      knowledgeNodes.forEach(node => {
        const nx = (node.x / 100) * w
        const ny = (node.y / 100) * h + Math.sin(time + node.size) * 3
        const r = node.size / 2 * (0.9 + 0.1 * Math.sin(time * 1.5 + node.size))

        // Glow
        const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 2.5)
        glow.addColorStop(0, node.color + '30')
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(nx, ny, r * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Node circle
        ctx.beginPath()
        ctx.arc(nx, ny, r, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(nx - r * 0.3, ny - r * 0.3, 0, nx, ny, r)
        grad.addColorStop(0, node.color + 'CC')
        grad.addColorStop(1, node.color + '40')
        ctx.fillStyle = grad
        ctx.fill()
        ctx.strokeStyle = node.color + '80'
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Label
        ctx.fillStyle = 'rgba(200,230,255,0.8)'
        ctx.font = `${Math.max(9, r * 0.45)}px Syne, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.label, nx, ny)
      })
    }
    draw()

    const onResize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export default function Chapter6() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ch6-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch6-label', start: 'top 85%', once: true },
      })
      gsap.from('.ch6-title-word', {
        opacity: 0, y: 50,
        stagger: 0.1, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ch6-title', start: 'top 80%', once: true },
      })
      gsap.from('.ch6-graph', {
        opacity: 0, scale: 0.95,
        duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.ch6-graph', start: 'top 70%', once: true },
      })
      gsap.from('.ch6-method', {
        opacity: 0, y: 40,
        stagger: 0.12, duration: 0.8,
        scrollTrigger: { trigger: '.ch6-methods', start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch6"
      ref={sectionRef}
      className="section-base py-32 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #0A0800 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(255,184,0,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="ch6-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-gold/70 uppercase">Chapter 06</span>
          <span className="h-px flex-1 max-w-24 bg-gold/20" />
        </div>

        <div className="ch6-title mb-4">
          <h2 className="section-title"
            style={{ background: 'linear-gradient(135deg, #ffffff, rgba(255,184,0,0.8))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {['Education', 'Reimagined'].map((w, i) => (
              <span key={i} className="ch6-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-16 leading-relaxed">
          In 2050, the classroom is every place on Earth — and beyond.
          Every child has the best teacher that has ever existed.
        </p>

        {/* Knowledge Graph */}
        <div
          className="ch6-graph relative rounded-3xl overflow-hidden mb-16"
          style={{
            height: '500px',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,184,0,0.1)',
          }}
        >
          <KnowledgeGraph />
          <div className="absolute top-4 left-4 font-mono text-xs text-gold/40 tracking-widest">
            KNOWLEDGE NETWORK — INTERCONNECTED
          </div>
          <div className="absolute top-4 right-4 font-mono text-xs text-stellar/20 tracking-widest">
            {knowledgeNodes.length} DOMAINS ACTIVE
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="font-mono text-xs text-stellar/20 tracking-widest">
              Nodes pulse with real-time global learning activity
            </span>
          </div>
        </div>

        {/* Learning Methods */}
        <div className="ch6-methods grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningMethods.map((m, i) => (
            <motion.div
              key={i}
              className="ch6-method p-6 rounded-2xl group"
              style={{ background: `${m.color}07`, border: `1px solid ${m.color}20` }}
              whileHover={{ y: -5, boxShadow: `0 25px 50px ${m.color}15` }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${m.color}15`, color: m.color, border: `1px solid ${m.color}25` }}
                >
                  {m.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-syne font-700 text-white text-base">{m.title}</h3>
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${m.color}20`, color: m.color }}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <p className="font-syne text-stellar/50 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <blockquote className="font-cinzel text-xl md:text-2xl text-stellar/60 leading-relaxed mb-4">
            "Curiosity is the one thing AI cannot provide —
            and it is the one thing education must protect."
          </blockquote>
          <div className="font-mono text-xs text-stellar/25 tracking-widest">
            — 2050 Global Education Charter, Article 1
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        06
      </div>
    </section>
  )
}
