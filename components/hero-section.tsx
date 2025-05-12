"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"
import CustomComputerCanvas from "./custom-3d-scene"
import HeroFallback from "./hero-fallback"
import ThreeDFallbackMessage from "./3d-fallback-message"
import { motion } from "framer-motion"
import AnimatedText from "./animated-text"

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isPreviewEnv, setIsPreviewEnv] = useState(false)

  useEffect(() => {
    // Check if we're in a preview environment that doesn't support 3D
    const checkEnvironment = () => {
      try {
        // This will throw an error in environments that don't support WebGL
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (!gl) {
          setIsPreviewEnv(true)
          return
        }

        // Additional check for v0 environment
        if (window.location.hostname.includes("v0.dev") || window.location.hostname.includes("vercel-v0")) {
          setIsPreviewEnv(true)
        }
      } catch (e) {
        setIsPreviewEnv(true)
      }
    }

    // Check for mobile device
    const checkMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 500px)")
      setIsMobile(mediaQuery.matches)

      const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches)
      }

      mediaQuery.addEventListener("change", handleMediaQueryChange)
      return () => {
        mediaQuery.removeEventListener("change", handleMediaQueryChange)
      }
    }

    checkEnvironment()
    const cleanup = checkMobile()

    return cleanup
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden tech-pattern">
      <div className="absolute inset-0 z-10">
        {isPreviewEnv ? (
          <>
            <HeroFallback />
            <div className="absolute inset-0 flex items-center justify-center">
              <ThreeDFallbackMessage />
            </div>
          </>
        ) : (
          <div className="w-full h-full">
            <CustomComputerCanvas isMobile={isMobile} />
          </div>
        )}
      </div>
      <div className="container mx-auto px-4 z-20 mt-16 relative">
        <motion.div
          className="max-w-3xl backdrop-blur-sm bg-background/30 p-8 rounded-lg cyber-border"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-2"
          >
            <AnimatedText
              text="I am Olanike"
              className="text-2xl md:text-3xl font-bold gradient-text-animated font-syncopate"
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text font-audiowide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Software Developer
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-foreground/80 font-rajdhani"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            Building innovative solutions with cutting-edge technologies
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="group pulse-animation font-gruppo text-lg">
                <Link href="/projects">
                  View Projects
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg" className="group hover-glow font-gruppo text-lg">
                <a href="/resume.pdf" download>
                  Download Resume
                  <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.4, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="secondary" size="lg" className="hover-glow font-gruppo text-lg">
                <Link href="/contact">Contact Me</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
