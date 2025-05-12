"use client"

import { useEffect, useRef } from "react"

// A fallback component that creates a cool animated background
// when 3D models can't be displayed
export default function HeroFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `rgba(157, 78, 221, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Draw wavy lines in the background
    const drawWavyLines = () => {
      if (!ctx) return

      ctx.strokeStyle = "rgba(157, 78, 221, 0.05)"
      ctx.lineWidth = 2

      // Horizontal wavy lines
      for (let y = 0; y < canvas.height; y += 100) {
        ctx.beginPath()
        ctx.moveTo(0, y)

        for (let x = 0; x < canvas.width; x += 10) {
          const wave = Math.sin(x * 0.01 + Date.now() * 0.001) * 20
          ctx.lineTo(x, y + wave)
        }

        ctx.stroke()
      }

      // Vertical wavy lines
      for (let x = 0; x < canvas.width; x += 100) {
        ctx.beginPath()
        ctx.moveTo(x, 0)

        for (let y = 0; y < canvas.height; y += 10) {
          const wave = Math.sin(y * 0.01 + Date.now() * 0.001) * 20
          ctx.lineTo(x + wave, y)
        }

        ctx.stroke()
      }
    }

    // Animation function
    const animate = () => {
      if (!ctx) return
      ctx.fillStyle = "rgba(5, 5, 16, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw wavy background
      drawWavyLines()

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Connect particles with lines
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    const connectParticles = () => {
      if (!ctx) return
      const maxDistance = 150

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(157, 78, 221, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
