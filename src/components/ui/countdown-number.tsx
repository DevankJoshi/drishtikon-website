"use client"

import React, { useEffect, useState } from "react"
import NumberFlow from "@number-flow/react"
import { motion } from "framer-motion"

const MotionNumberFlow = motion.create(NumberFlow)

interface CountdownProps {
  endDate: Date
  startDate?: Date
  className?: string
  onCountdownEnd?: () => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isEnded: boolean
}

export default function AnimatedNumberCountdown({
  endDate,
  startDate,
  className,
  onCountdownEnd,
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = startDate ? new Date(startDate) : new Date()
      const end = new Date(endDate)
      const difference = end.getTime() - start.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({ days, hours, minutes, seconds, isEnded: false })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true })
        if (onCountdownEnd) {
          onCountdownEnd()
        }
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate, startDate, onCountdownEnd])

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.days}
          className="text-4xl md:text-5xl font-semibold tracking-tighter text-brand-orange"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-xs md:text-sm text-gray-400">Days</span>
      </div>
      <div className="text-2xl font-bold text-gray-400">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.hours}
          className="text-4xl md:text-5xl font-semibold tracking-tighter text-brand-orange"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-xs md:text-sm text-gray-400">Hours</span>
      </div>
      <div className="text-2xl font-bold text-gray-400">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.minutes}
          className="text-4xl md:text-5xl font-semibold tracking-tighter text-brand-orange"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-xs md:text-sm text-gray-400">Minutes</span>
      </div>
      <div className="text-2xl font-bold text-gray-400">:</div>
      <div className="flex flex-col items-center">
        <MotionNumberFlow
          value={timeLeft.seconds}
          className="text-4xl md:text-5xl font-semibold tracking-tighter text-brand-orange"
          format={{ minimumIntegerDigits: 2 }}
        />
        <span className="text-xs md:text-sm text-gray-400">Seconds</span>
      </div>
    </div>
  )
}
