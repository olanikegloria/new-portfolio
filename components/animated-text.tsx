"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
}

export default function AnimatedText({ text, className = "", once = false }: AnimatedTextProps) {
  const [replay, setReplay] = useState(false)
  const letters = Array.from(text)

  useEffect(() => {
    if (!once) {
      const interval = setInterval(() => {
        setReplay(!replay)
      }, 8000) // Replay animation every 8 seconds
      return () => clearInterval(interval)
    }
  }, [replay, once])

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.h1
      className={`${className} inline-block`}
      variants={container}
      initial="hidden"
      animate={replay ? "visible" : "visible"}
      key={replay ? "replay" : "initial"}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{
            textShadow: "0 0 8px rgba(157, 78, 221, 0.8)",
            display: letter === " " ? "inline" : "inline-block",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  )
}
