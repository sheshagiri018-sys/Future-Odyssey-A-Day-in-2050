import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

export default function FinalScene() {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const quote2Ref = useRef(null)
  const endRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Three.js Setup ────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 2000)
    camera.position.z = 180

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ── Stars ─────────────────────────────────────────────
    const starCount = 8000
    const sPos = new Float32Array(starCount * 3)
    const sCol = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 300 + Math.random() * 700
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      sPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      sPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      sPos[i * 3 + 2] = r * Math.cos(phi)
      const b = 0.5 + Math.random() * 0.5
      sCol[i * 3]     = b
      sCol[i * 3 + 1] = b
      sCol[i * 3 + 2] = b + Math.random() * 0.2
    }
    const starGeom = new THREE.BufferGeometry()
    starGeom.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
    starGeom.setAttribute('color', new THREE.BufferAttribute(sCol, 3))
    const starMat = new THREE.PointsMaterial({ size: 0.6, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
    const stars = new THREE.Points(starGeom, starMat)
    scene.add(stars)

    // ── Earth ─────────────────────────────────────────────
    const earthGeom = new THREE.SphereGeometry(45, 64, 64)

    // Procedural Earth material (no texture needed)
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x1A4A8A,       // Ocean base
      emissive: 0x051525,
      specular: 0x336699,
      shininess: 25,
    })
    const earth = new THREE.Mesh(earthGeom, earthMat)
    scene.add(earth)

    // Continent patches using smaller spheres (procedural land masses)
    const landColors = [0x2D6A2D, 0x3A7A3A, 0x4A8A4A, 0x2A5A2A]
    const landPatches = []
    for (let i = 0; i < 200; i++) {
      const lat = (Math.random() - 0.5) * Math.PI
      const lng = Math.random() * Math.PI * 2
      const r = 45.2
      const x = r * Math.cos(lat) * Math.cos(lng)
      const y = r * Math.sin(lat)
      const z = r * Math.cos(lat) * Math.sin(lng)

      // Skip polar regions
      if (Math.abs(lat) > 1.2) continue

      const patchGeom = new THREE.SphereGeometry(1.2 + Math.random() * 4, 6, 6)
      const patchMat = new THREE.MeshPhongMaterial({
        color: landColors[Math.floor(Math.random() * landColors.length)],
        emissive: 0x0A200A,
        shininess: 2,
      })
      const patch = new THREE.Mesh(patchGeom, patchMat)
      patch.position.set(x, y, z)
      patch.lookAt(0, 0, 0)
      earth.add(patch)
      landPatches.push(patch)
    }

    // ── Atmosphere glow ───────────────────────────────────
    const atmGeom = new THREE.SphereGeometry(49, 32, 32)
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x4488CC,
      transparent: true,
      opacity: 0,
      side: THREE.FrontSide,
    })
    const atmosphere = new THREE.Mesh(atmGeom, atmMat)
    scene.add(atmosphere)

    // Outer glow (BackSide)
    const glowGeom = new THREE.SphereGeometry(52, 32, 32)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x2266AA,
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    })
    const glow = new THREE.Mesh(glowGeom, glowMat)
    scene.add(glow)

    // ── Cloud layer ───────────────────────────────────────
    const cloudGeom = new THREE.SphereGeometry(46, 32, 32)
    const cloudMat = new THREE.MeshBasicMaterial({
      color: 0xEEEEFF,
      transparent: true,
      opacity: 0,
    })
    const clouds = new THREE.Mesh(cloudGeom, cloudMat)
    scene.add(clouds)

    // ── Lighting ──────────────────────────────────────────
    const sunLight = new THREE.DirectionalLight(0xFFF8EE, 2.5)
    sunLight.position.set(-200, 80, 150)
    scene.add(sunLight)

    const ambientLight = new THREE.AmbientLight(0x111133, 0.3)
    scene.add(ambientLight)

    const rimLight = new THREE.DirectionalLight(0x2244AA, 1.2)
    rimLight.position.set(150, -50, -100)
    scene.add(rimLight)

    // ── City lights (night side) ──────────────────────────
    const cityGeom = new THREE.SphereGeometry(45.4, 32, 32)
    const cityMat = new THREE.MeshBasicMaterial({
      color: 0xFFDD88,
      transparent: true,
      opacity: 0,
    })
    const cityLights = new THREE.Mesh(cityGeom, cityMat)
    scene.add(cityLights)

    // ── Scroll-driven reveal ──────────────────────────────
    gsap.set(earth.scale, { x: 0.1, y: 0.1, z: 0.1 })

    gsap.to(starMat, {
      opacity: 0.85,
      duration: 2,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })

    gsap.to(earth.scale, {
      x: 1, y: 1, z: 1,
      duration: 2.5, ease: 'back.out(1.2)',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })

    gsap.to(atmMat, {
      opacity: 0.12,
      duration: 3,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })

    gsap.to(glowMat, {
      opacity: 0.15,
      duration: 3,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })

    gsap.to(cloudMat, {
      opacity: 0.06,
      duration: 3,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
    })

    // Quote animations
    gsap.from(quoteRef.current, {
      opacity: 0, y: 40, duration: 1.5, ease: 'power3.out',
      scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', once: true },
    })

    gsap.from(quote2Ref.current, {
      opacity: 0, y: 30, duration: 1.5, ease: 'power3.out', delay: 0.5,
      scrollTrigger: { trigger: quote2Ref.current, start: 'top 85%', once: true },
    })

    gsap.from(endRef.current, {
      opacity: 0, duration: 2, ease: 'power2.out', delay: 1,
      scrollTrigger: { trigger: endRef.current, start: 'top 90%', once: true },
    })

    // Scroll-driven camera zoom
    gsap.to(camera.position, {
      z: 130,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    })

    // ── Mouse interaction ─────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation Loop ────────────────────────────────────
    let rafId
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      earth.rotation.y = t * 0.05
      clouds.rotation.y = t * 0.06
      atmosphere.rotation.y = t * 0.04
      stars.rotation.y = t * 0.003
      stars.rotation.x = t * 0.001

      camera.position.x += (mouse.x * 10 - camera.position.x) * 0.015
      camera.position.y += (mouse.y * 6 - camera.position.y) * 0.015
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    // Resize
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
      earthGeom.dispose()
      earthMat.dispose()
      atmGeom.dispose()
      atmMat.dispose()
      glowGeom.dispose()
      glowMat.dispose()
    }
  }, [])

  return (
    <section
      id="final"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #000510 50%, #000000 100%)' }}
    >
      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.9) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Chapter label */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className="h-px w-16 bg-stellar/20" />
          <span className="font-mono text-xs tracking-widest text-stellar/30 uppercase">End of Journey</span>
          <span className="h-px w-16 bg-stellar/20" />
        </div>

        {/* Main quote */}
        <div ref={quoteRef}>
          <div className="font-cinzel text-3xl md:text-5xl text-white leading-tight mb-3"
            style={{ textShadow: '0 0 60px rgba(0,184,255,0.2)' }}
          >
            "The future is not a destination.
          </div>
          <div className="font-cinzel text-3xl md:text-5xl text-white leading-tight mb-12"
            style={{ textShadow: '0 0 60px rgba(0,184,255,0.2)' }}
          >
            It is a responsibility."
          </div>
        </div>

        {/* Sub-text */}
        <div ref={quote2Ref} className="mb-16">
          <p className="font-syne text-stellar/40 text-lg leading-relaxed max-w-2xl mx-auto">
            Every technology shown here exists in some form today.
            The gap between now and 2050 is not science — it is will.
            It is choice. It is us.
          </p>
        </div>

        {/* Final end card */}
        <div ref={endRef} className="relative">
          <div
            className="inline-block px-8 py-6 rounded-2xl"
            style={{ background: 'rgba(0,184,255,0.04)', border: '1px solid rgba(0,184,255,0.1)' }}
          >
            <div className="font-bebas text-7xl md:text-9xl text-electric/80 leading-none mb-2"
              style={{ textShadow: '0 0 60px rgba(0,184,255,0.3)' }}
            >
              2050
            </div>
            <div className="font-mono text-xs tracking-[0.5em] text-stellar/30 uppercase">
              The year we chose to get it right
            </div>
          </div>

          {/* Pulse rings around the number */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-2xl border border-electric/10"
              animate={{ scale: [1, 1.4 + i * 0.2], opacity: [0.4, 0] }}
              transition={{ duration: 3, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20">
          <div className="flex items-center justify-center gap-8 mb-6">
            {['Energy', 'Transport', 'Health', 'Education', 'Cities', 'Space'].map((label, i) => (
              <span key={i} className="font-mono text-[10px] tracking-widest text-stellar/15 uppercase hidden md:block">
                {label}
              </span>
            ))}
          </div>
          <div className="font-mono text-xs text-stellar/15 tracking-widest">
            A DAY IN 2050 — A CINEMATIC EXPERIENCE
          </div>
          <div className="font-mono text-xs text-stellar/10 tracking-widest mt-2">
            Built with Three.js · GSAP · Framer Motion · React
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-6 left-6 z-10">
        <div className="font-mono text-[10px] text-stellar/15 tracking-widest">END OF SEQUENCE</div>
      </div>
      <div className="absolute bottom-6 right-6 z-10">
        <div className="font-mono text-[10px] text-stellar/15 tracking-widest">CHAPTER ∞</div>
      </div>
    </section>
  )
}
