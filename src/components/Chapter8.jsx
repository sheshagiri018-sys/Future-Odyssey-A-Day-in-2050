import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

const colonies = [
  {
    name: 'Lunar Gateway',
    population: '12,400',
    status: 'Operational',
    founded: '2037',
    desc: 'The first permanent human settlement beyond Earth. A transit hub for deep space and a research station studying lunar resources.',
    color: '#C8E6FF',
    distance: '384,400 km',
  },
  {
    name: 'Olympus Base, Mars',
    population: '3,800',
    status: 'Expanding',
    founded: '2041',
    desc: 'Built into the slopes of Olympus Mons. Underground habitats shield colonists from radiation while surface modules harvest solar energy.',
    color: '#FF6B2B',
    distance: '78M km avg.',
  },
  {
    name: 'Orbital Ring Station',
    population: '28,000',
    status: 'Full Operation',
    founded: '2044',
    desc: 'A 2km-diameter rotating habitat generating artificial gravity. The first city in space, home to researchers, engineers, and families.',
    color: '#7B2FFF',
    distance: '400 km',
  },
  {
    name: 'Titan Research Station',
    population: '640',
    status: 'Initial Phase',
    founded: '2048',
    desc: 'Humanity's farthest permanent outpost. Studying Titan's methane lakes offers clues about pre-biotic chemistry and planetary formation.',
    color: '#FFB800',
    distance: '1.2B km',
  },
]

function SpaceScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, canvas.offsetWidth / canvas.offsetHeight, 0.1, 2000)
    camera.position.set(0, 30, 130)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ── Starfield ──────────────────────────────────────────
    const starCount = 6000
    const starPositions = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 400 + Math.random() * 600
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPositions[i * 3 + 2] = r * Math.cos(phi)
      const b = 0.6 + Math.random() * 0.4
      starColors[i * 3]     = b
      starColors[i * 3 + 1] = b
      starColors[i * 3 + 2] = b + 0.1
    }
    const starGeom = new THREE.BufferGeometry()
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeom.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const starMat = new THREE.PointsMaterial({ size: 0.5, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending })
    scene.add(new THREE.Points(starGeom, starMat))

    // ── Planet (Mars-like) ─────────────────────────────────
    const planetGeom = new THREE.SphereGeometry(28, 64, 64)
    const planetMat = new THREE.MeshPhongMaterial({
      color: 0x8B3A1A,
      emissive: 0x1A0800,
      shininess: 10,
    })
    const planet = new THREE.Mesh(planetGeom, planetMat)
    planet.position.set(25, -5, 0)
    scene.add(planet)

    // Planet surface detail (pole caps)
    const capGeom = new THREE.SphereGeometry(28.1, 32, 8, 0, Math.PI * 2, 0, 0.3)
    const capMat = new THREE.MeshBasicMaterial({ color: 0xDDEEFF, transparent: true, opacity: 0.5 })
    const cap = new THREE.Mesh(capGeom, capMat)
    cap.position.copy(planet.position)
    scene.add(cap)

    // Planet atmosphere glow
    const atmGeom = new THREE.SphereGeometry(31, 32, 32)
    const atmMat = new THREE.MeshBasicMaterial({ color: 0xFF5500, transparent: true, opacity: 0.06, side: THREE.BackSide })
    const atm = new THREE.Mesh(atmGeom, atmMat)
    atm.position.copy(planet.position)
    scene.add(atm)

    // ── Orbital Ring Station ────────────────────────────────
    const ringGeom = new THREE.TorusGeometry(18, 0.8, 12, 80)
    const ringMat = new THREE.MeshPhongMaterial({ color: 0x334466, emissive: 0x111133, shininess: 60 })
    const ring = new THREE.Mesh(ringGeom, ringMat)
    ring.position.set(-20, 10, 10)
    ring.rotation.x = Math.PI / 3
    scene.add(ring)

    // Ring glow
    const ringGlowGeom = new THREE.TorusGeometry(18.5, 0.3, 8, 80)
    const ringGlowMat = new THREE.MeshBasicMaterial({ color: 0x7B2FFF, transparent: true, opacity: 0.4 })
    const ringGlow = new THREE.Mesh(ringGlowGeom, ringGlowMat)
    ringGlow.position.copy(ring.position)
    ringGlow.rotation.copy(ring.rotation)
    scene.add(ringGlow)

    // ── Moon ───────────────────────────────────────────────
    const moonGeom = new THREE.SphereGeometry(6, 32, 32)
    const moonMat = new THREE.MeshPhongMaterial({ color: 0xAAAAAA, emissive: 0x111111, shininess: 5 })
    const moon = new THREE.Mesh(moonGeom, moonMat)
    scene.add(moon)

    // Moon orbit pivot
    const moonPivot = new THREE.Object3D()
    moonPivot.position.set(25, -5, 0)
    moonPivot.add(moon)
    moon.position.set(55, 20, 0)
    scene.add(moonPivot)

    // ── Asteroids/Debris ────────────────────────────────────
    const debrisGroup = new THREE.Group()
    for (let i = 0; i < 40; i++) {
      const s = 0.2 + Math.random() * 0.8
      const dGeom = new THREE.IcosahedronGeometry(s, 0)
      const dMat = new THREE.MeshPhongMaterial({ color: 0x445566, shininess: 20 })
      const d = new THREE.Mesh(dGeom, dMat)
      const angle = Math.random() * Math.PI * 2
      const r = 45 + Math.random() * 20
      d.position.set(25 + Math.cos(angle) * r, (Math.random() - 0.5) * 10, Math.sin(angle) * r)
      d.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      debrisGroup.add(d)
    }
    scene.add(debrisGroup)

    // ── Lighting ────────────────────────────────────────────
    const sun = new THREE.DirectionalLight(0xFFF5CC, 2.5)
    sun.position.set(-150, 60, 100)
    scene.add(sun)

    const ambientLight = new THREE.AmbientLight(0x112244, 0.4)
    scene.add(ambientLight)

    const rimLight = new THREE.DirectionalLight(0x2244AA, 0.8)
    rimLight.position.set(100, -30, -80)
    scene.add(rimLight)

    // ── Satellites ─────────────────────────────────────────
    const satGroup = new THREE.Group()
    for (let i = 0; i < 6; i++) {
      const satGeom = new THREE.BoxGeometry(1.2, 0.3, 1.2)
      const satMat = new THREE.MeshPhongMaterial({ color: 0x88AACC, shininess: 80 })
      const sat = new THREE.Mesh(satGeom, satMat)
      const angle = (i / 6) * Math.PI * 2
      const r = 38
      sat.position.set(25 + Math.cos(angle) * r, (Math.random() - 0.5) * 15, Math.sin(angle) * r)
      satGroup.add(sat)
    }
    scene.add(satGroup)

    // ── Mouse interaction ───────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation ───────────────────────────────────────────
    let rafId
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      planet.rotation.y = t * 0.05
      ring.rotation.z = t * 0.08
      ringGlow.rotation.z = ring.rotation.z
      moonPivot.rotation.y = t * 0.12
      debrisGroup.rotation.y = t * 0.02
      satGroup.rotation.y = t * 0.15

      camera.position.x += (mouse.x * 15 - camera.position.x) * 0.02
      camera.position.y += (mouse.y * 8 - (camera.position.y - 30)) * 0.02
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export default function Chapter8() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ch8-label', {
        opacity: 0, x: -30, duration: 0.8,
        scrollTrigger: { trigger: '.ch8-label', start: 'top 85%', once: true },
      })
      gsap.from('.ch8-title-word', {
        opacity: 0, y: 50,
        stagger: 0.1, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.ch8-title', start: 'top 80%', once: true },
      })
      gsap.from('.ch8-colony', {
        opacity: 0, x: 60,
        stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.ch8-colonies', start: 'top 70%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="ch8"
      ref={sectionRef}
      className="section-base py-32 px-6 md:px-16"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #000508 50%, #000000 100%)' }}
    >
      <div className="grid-lines" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 60% 30%, rgba(123,47,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="ch8-label flex items-center gap-4 mb-8">
          <span className="font-mono text-xs tracking-widest text-stellar/40 uppercase">Chapter 08</span>
          <span className="h-px flex-1 max-w-24 bg-stellar/10" />
        </div>

        <div className="ch8-title mb-4">
          <h2 className="section-title">
            {['Space', 'Civilization'].map((w, i) => (
              <span key={i} className="ch8-title-word inline-block mr-4">{w}</span>
            ))}
          </h2>
        </div>

        <p className="font-syne text-stellar/50 text-lg max-w-xl mb-12 leading-relaxed">
          Humanity is no longer Earthbound. We are an interplanetary species now,
          44,800 humans living among the stars.
        </p>

        {/* Space Scene */}
        <div
          className="relative rounded-2xl overflow-hidden mb-12"
          style={{ height: '500px', background: '#000000', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <SpaceScene />
          <div className="absolute top-4 left-4 font-mono text-xs text-stellar/30 tracking-widest">
            SOLAR SYSTEM VIEW — INTERACTIVE
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-xs text-stellar/20 tracking-widest">
            MOVE CURSOR TO NAVIGATE
          </div>

          {/* Overlay labels */}
          <div className="absolute top-1/4 right-[35%] font-mono text-xs text-[#FF6B2B]/60 tracking-widest pointer-events-none">
            MARS ↗
          </div>
          <div className="absolute top-1/3 left-[10%] font-mono text-xs text-[#7B2FFF]/60 tracking-widest pointer-events-none">
            ORBITAL RING ↗
          </div>
        </div>

        {/* Colonies */}
        <div className="ch8-colonies grid grid-cols-1 md:grid-cols-2 gap-5">
          {colonies.map((c, i) => (
            <motion.div
              key={i}
              className="ch8-colony p-6 rounded-xl"
              style={{ background: `${c.color}06`, border: `1px solid ${c.color}15` }}
              whileHover={{ y: -4, boxShadow: `0 20px 40px ${c.color}10` }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-syne font-700 text-white text-base mb-1">{c.name}</h3>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${c.color}20`, color: c.color }}
                    >
                      {c.status}
                    </span>
                    <span className="font-mono text-xs text-stellar/30">Est. {c.founded}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bebas text-2xl" style={{ color: c.color }}>{c.population}</div>
                  <div className="font-mono text-[10px] text-stellar/30">inhabitants</div>
                </div>
              </div>
              <p className="font-syne text-stellar/45 text-sm leading-relaxed mb-3">{c.desc}</p>
              <div className="font-mono text-xs text-stellar/25">
                Distance from Earth: <span style={{ color: c.color }}>{c.distance}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Space quote */}
        <div className="mt-20 text-center">
          <blockquote className="font-cinzel text-xl md:text-2xl text-stellar/50 max-w-3xl mx-auto leading-relaxed">
            "The universe is not a void to be feared. It is a territory to be understood."
          </blockquote>
          <div className="font-mono text-xs text-stellar/20 mt-4 tracking-widest">
            — ISCA Mission Statement, 2039
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 font-bebas text-[30vw] leading-none text-white/[0.02] pointer-events-none select-none">
        08
      </div>
    </section>
  )
}
