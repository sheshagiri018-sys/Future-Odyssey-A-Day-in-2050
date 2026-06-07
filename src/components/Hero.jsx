import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default function Hero() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const yearRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const W = window.innerWidth
    const H = window.innerHeight

    // ── Three.js Setup ───────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1500)
    camera.position.z = 120

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ── Galaxy Particle System ────────────────────────────
    const TOTAL_PARTICLES = 12000
    const BRANCHES = 4
    const SPIN = 1.8
    const RANDOMNESS = 0.35
    const RANDOMNESS_POWER = 3
    const INNER_COLOR = new THREE.Color('#00B8FF')
    const OUTER_COLOR = new THREE.Color('#7B2FFF')

    const positions = new Float32Array(TOTAL_PARTICLES * 3)
    const colors = new Float32Array(TOTAL_PARTICLES * 3)
    const scales = new Float32Array(TOTAL_PARTICLES)

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const i3 = i * 3
      const radius = Math.random() * 220
      const spinAngle = radius * SPIN
      const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2

      const rx = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius
      const ry = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius * 0.3
      const rz = Math.pow(Math.random(), RANDOMNESS_POWER) * (Math.random() < 0.5 ? 1 : -1) * RANDOMNESS * radius

      positions[i3]     = Math.cos(branchAngle + spinAngle) * radius + rx
      positions[i3 + 1] = ry
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz

      const mixedColor = INNER_COLOR.clone()
      mixedColor.lerp(OUTER_COLOR, radius / 220)

      // Slight hue variation
      const hsl = {}
      mixedColor.getHSL(hsl)
      mixedColor.setHSL(hsl.h + (Math.random() - 0.5) * 0.08, hsl.s, hsl.l + (Math.random() - 0.5) * 0.1)

      colors[i3]     = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      scales[i] = Math.random()
    }

    // Additional background stars
    const STARS = 3000
    const starPositions = new Float32Array(STARS * 3)
    const starColors = new Float32Array(STARS * 3)
    for (let i = 0; i < STARS; i++) {
      const i3 = i * 3
      starPositions[i3]     = (Math.random() - 0.5) * 1200
      starPositions[i3 + 1] = (Math.random() - 0.5) * 600
      starPositions[i3 + 2] = (Math.random() - 0.5) * 600 - 200
      const brightness = 0.6 + Math.random() * 0.4
      starColors[i3] = brightness
      starColors[i3 + 1] = brightness
      starColors[i3 + 2] = brightness + 0.2
    }

    const starGeom = new THREE.BufferGeometry()
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    starGeom.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.25,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0,
    })
    const stars = new THREE.Points(starGeom, starMat)
    scene.add(stars)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    const material = new THREE.PointsMaterial({
      size: 0.45,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      opacity: 0,
    })

    const galaxy = new THREE.Points(geometry, material)
    scene.add(galaxy)

    // Nebula glow spheres
    const nebulaGeometry = new THREE.SphereGeometry(30, 16, 16)
    const nebulaMaterial = new THREE.MeshBasicMaterial({
      color: '#00B8FF',
      transparent: true,
      opacity: 0,
    })
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial)
    nebula.position.set(40, 10, -60)
    scene.add(nebula)

    const nebula2 = nebula.clone()
    nebula2.material = nebulaMaterial.clone()
    nebula2.material.color.set('#7B2FFF')
    nebula2.position.set(-60, -20, -80)
    scene.add(nebula2)

    // ── Mouse Tracking ─────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize Handler ──────────────────────────────────────
    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', onResize)

    // ── Render Loop ─────────────────────────────────────────
    let rafId
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      galaxy.rotation.y = elapsed * 0.04
      stars.rotation.y = elapsed * 0.005
      stars.rotation.x = elapsed * 0.002

      camera.position.x += (mouse.x * 8 - camera.position.x) * 0.025
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.025
      camera.lookAt(scene.position)

      // Subtle galaxy tilt
      galaxy.rotation.x = Math.sin(elapsed * 0.08) * 0.05

      renderer.render(scene, camera)
    }
    animate()

    // ── Intro GSAP Timeline ─────────────────────────────────
    const letters = titleRef.current.querySelectorAll('.letter')
    const yearLetters = yearRef.current.querySelectorAll('.letter')

    gsap.set([letters, yearLetters], { opacity: 0, y: 80, rotationX: -45 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 20 })
    gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 10 })
    gsap.set(taglineRef.current, { opacity: 0, x: -20 })

    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(starMat, { opacity: 0.8, duration: 2.5, ease: 'power2.out' })
      .to(material, { opacity: 0.9, duration: 2.5, ease: 'power2.out' }, '-=2')
      .to(nebulaMaterial, { opacity: 0.02, duration: 3, ease: 'power2.out' }, '-=1.5')
      .to(nebula2.material, { opacity: 0.025, duration: 3, ease: 'power2.out' }, '-=2.5')
      .to(taglineRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=1')
      .to(yearLetters, {
        opacity: 1, y: 0, rotationX: 0,
        duration: 0.7, stagger: 0.08, ease: 'back.out(1.4)',
      }, '-=0.4')
      .to(letters, {
        opacity: 1, y: 0, rotationX: 0,
        duration: 0.9, stagger: 0.06, ease: 'back.out(1.2)',
      }, '-=0.3')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.3')
      .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')

    // ── Scroll-out animation ─────────────────────────────────
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
      y: -120,
      opacity: 0.3,
    })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      starGeom.dispose()
      starMat.dispose()
      nebulaGeometry.dispose()
      nebulaMaterial.dispose()
    }
  }, [])

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="letter inline-block" style={{ perspective: '400px' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-void">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        {/* Tagline above */}
        <div ref={taglineRef} className="flex items-center gap-3 mb-8">
          <span className="h-px w-12 bg-electric/50" />
          <span className="font-mono text-xs tracking-[0.4em] text-electric uppercase">
            A Cinematic Journey
          </span>
          <span className="h-px w-12 bg-electric/50" />
        </div>

        {/* Year */}
        <div
          ref={yearRef}
          className="font-mono text-sm tracking-[0.6em] text-electric/70 mb-2"
          style={{ perspective: '600px' }}
        >
          {splitText('2050')}
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-bebas text-white leading-none mb-6"
          style={{
            fontSize: 'clamp(5rem, 17vw, 16rem)',
            letterSpacing: '-0.02em',
            perspective: '600px',
            textShadow: '0 0 60px rgba(0,184,255,0.15)',
          }}
        >
          {splitText('A DAY IN THE FUTURE')}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-syne text-stellar/60 text-lg md:text-xl max-w-lg leading-relaxed"
        >
          The world you know ends here.
          <br />
          Scroll to witness tomorrow.
        </p>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-xs tracking-widest text-stellar/40 uppercase">Scroll</span>
          <div className="relative w-px h-16 bg-stellar/10 overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-electric"
              style={{
                height: '40%',
                animation: 'scan 2s ease-in-out infinite',
                boxShadow: '0 0 8px rgba(0,184,255,0.8)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 z-10">
        <div className="font-mono text-xs text-electric/40 tracking-widest">LOC: 23.5937° N, 58.5922° E</div>
        <div className="font-mono text-xs text-stellar/20 tracking-widest mt-1">SYS: ENGAGED — FUTURE_PROTOCOL_v2050</div>
      </div>

      <div className="absolute top-6 right-16 z-10 text-right">
        <div className="font-mono text-xs text-stellar/20 tracking-widest">⬡ CHAPTER SEQUENCE: INITIALIZED</div>
      </div>
    </section>
  )
}
