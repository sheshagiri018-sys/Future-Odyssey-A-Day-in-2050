import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollProgress() {
  const barRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
      },
    })

    const dotTween = gsap.to(dotRef.current, {
      left: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
      },
    })

    return () => {
      tween.kill()
      dotTween.kill()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[8500] h-px">
      {/* Track */}
      <div className="absolute inset-0 bg-white/5" />
      {/* Bar */}
      <div
        ref={barRef}
        className="absolute inset-0 origin-left"
        style={{
          background: 'linear-gradient(90deg, #00B8FF, #7B2FFF, #00FFF7)',
          scaleX: 0,
          boxShadow: '0 0 10px rgba(0,184,255,0.6)',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-electric"
        style={{
          left: '0%',
          boxShadow: '0 0 8px rgba(0,184,255,1)',
        }}
      />
    </div>
  )
}
