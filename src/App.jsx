import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Chapter1 from './components/Chapter1'
import Chapter2 from './components/Chapter2'
import Chapter3 from './components/Chapter3'
import Chapter4 from './components/Chapter4'
import Chapter5 from './components/Chapter5'
import Chapter6 from './components/Chapter6'
import Chapter7 from './components/Chapter7'
import Chapter8 from './components/Chapter8'
import Chapter9 from './components/Chapter9'
import FinalScene from './components/FinalScene'

export default function App() {
  const cursorOuter = useRef(null)
  const cursorInner = useRef(null)

  useEffect(() => {
    // ── Lenis Smooth Scroll ──────────────────────────────
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // ── Custom Cursor ────────────────────────────────────
    const outerEl = cursorOuter.current
    const innerEl = cursorInner.current

    let mouseX = 0, mouseY = 0
    let outerX = 0, outerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(innerEl, {
        x: mouseX,
        y: mouseY,
        duration: 0.05,
        ease: 'none',
      })
    }

    const animateCursor = () => {
      outerX += (mouseX - outerX) * 0.12
      outerY += (mouseY - outerY) * 0.12
      gsap.set(outerEl, { x: outerX, y: outerY })
      requestAnimationFrame(animateCursor)
    }

    const cursorRaf = requestAnimationFrame(animateCursor)

    const onMouseEnterLink = () => {
      gsap.to(outerEl, { scale: 2.5, opacity: 0.6, duration: 0.3 })
      gsap.to(innerEl, { scale: 0, duration: 0.2 })
    }

    const onMouseLeaveLink = () => {
      gsap.to(outerEl, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(innerEl, { scale: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMouseMove)

    const links = document.querySelectorAll('a, button, [data-cursor]')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      lenis.destroy()
      cancelAnimationFrame(cursorRaf)
      window.removeEventListener('mousemove', onMouseMove)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorOuter} className="cursor-outer" />
      <div ref={cursorInner} className="cursor-inner" />

      <Navigation />
      <ScrollProgress />

      <main>
        <Hero />
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />
        <Chapter4 />
        <Chapter5 />
        <Chapter6 />
        <Chapter7 />
        <Chapter8 />
        <Chapter9 />
        <FinalScene />
      </main>
    </>
  )
}
