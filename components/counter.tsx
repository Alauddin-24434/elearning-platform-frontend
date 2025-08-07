"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface CounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
}

export function Counter({ from, to, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 }) // Trigger when 50% in view

  useEffect(() => {
    if (!isInView) return

    let start: number | null = null
    const animate = (currentTime: number) => {
      if (!start) start = currentTime
      const progress = (currentTime - start) / duration
      const currentCount = Math.min(to, from + (to - from) * progress)
      setCount(Math.floor(currentCount))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(to) // Ensure it ends exactly at 'to'
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, from, to, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
