import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * useScrollReveal — reveal elements as they enter viewport
 * @param {object} options - GSAP ScrollTrigger + from-animation options
 * @returns {ref} - attach to the container element
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      selector = '[data-reveal]',
      fromVars = { opacity: 0, y: 60 },
      toVars = { opacity: 1, y: 0 },
      stagger = 0.15,
      duration = 0.9,
      ease = 'power3.out',
      start = 'top 80%',
      once = true,
    } = options

    const targets = el.querySelectorAll(selector)
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        ...toVars,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * useParallax — parallax scroll effect on an element
 * @param {number} speed - parallax intensity (default 0.5)
 * @returns {ref} - attach to the element
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [speed])

  return ref
}

/**
 * usePinSection — pin a section while scroll-driven animation plays
 * @param {number} scrubDuration - pin length in viewport heights
 * @returns {{ sectionRef, pinRef }}
 */
export function usePinSection(scrubDuration = 1) {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * scrubDuration}`,
        pin: pin,
        pinSpacing: true,
      })
    }, section)

    return () => ctx.revert()
  }, [scrubDuration])

  return { sectionRef, pinRef }
}

/**
 * useCountUp — animate a number from 0 to target on scroll enter
 * @param {number} target - the end value
 * @param {number} duration - animation duration in seconds
 * @returns {ref} - attach to the element that shows the number
 */
export function useCountUp(target, duration = 2) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          el.textContent = Math.round(obj.val).toLocaleString()
        },
      })
    }, el)

    return () => ctx.revert()
  }, [target, duration])

  return ref
}
