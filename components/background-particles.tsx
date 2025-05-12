"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

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
      originalColor: string
      baseSize: number
      angle: number
      spinSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseSize = Math.random() * 2 + 0.5
        this.size = this.baseSize
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.originalColor = `rgba(157, 78, 221, ${Math.random() * 0.3 + 0.1})`
        this.color = this.originalColor
        this.angle = Math.random() * 360
        this.spinSpeed = Math.random() * 0.02 - 0.01
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.spinSpeed

        // Check if particle is near mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          // Repel from mouse
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (100 - distance) / 100

          this.speedX -= forceDirectionX * force * 0.2
          this.speedY -= forceDirectionY * force * 0.2

          // Grow size near mouse
          this.size = this.baseSize * (1 + force)
        } else {
          // Return to base size
          this.size = this.baseSize
        }

        // Limit speed
        if (this.speedX > 2) this.speedX = 2
        else if (this.speedX < -2) this.speedX = -2
        if (this.speedY > 2) this.speedY = 2
        else if (this.speedY < -2) this.speedY = -2

        // Boundary check
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(0, 0, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      setTheme(isDark: boolean) {
        this.color = isDark ? this.originalColor : this.originalColor.replace("157, 78, 221", "77, 124, 254")
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Mouse position
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false
    let mouseTimeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true

      clearTimeout(mouseTimeout)
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false
      }, 3000)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation function
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(mouseX, mouseY)
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
            const isDark = theme === "dark"
            const color = isDark ? `rgba(157, 78, 221, ${opacity * 0.15})` : `rgba(77, 124, 254, ${opacity * 0.15})`
            ctx.strokeStyle = color
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Update particle colors when theme changes
    const updateParticleColors = () => {
      const isDark = theme === "dark"
      particlesArray.forEach((particle) => {
        particle.setTheme(isDark)
      })
    }

    // Start animation
    animate()
    updateParticleColors()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(mouseTimeout)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 opacity-40" />
}
