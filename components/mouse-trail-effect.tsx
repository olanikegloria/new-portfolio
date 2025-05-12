"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function MouseTrailEffect() {
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

    // Mouse trail particles
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      life: number
      maxLife: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = theme === "dark" ? "#9d4edd" : "#7b2cbf"
        this.life = 0
        this.maxLife = Math.random() * 30 + 10
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++

        if (this.size > 0.2) this.size -= 0.1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.globalAlpha = 1 - this.life / this.maxLife
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }

      isDead() {
        return this.life >= this.maxLife || this.size <= 0.2
      }
    }

    const particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true

      // Calculate speed
      const dx = mouseX - lastX
      const dy = mouseY - lastY
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Add particles based on speed
      const particleCount = Math.min(5, Math.floor(speed / 5))
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(mouseX, mouseY))
      }

      lastX = mouseX
      lastY = mouseY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
        isMouseMoving = true

        // Calculate speed
        const dx = mouseX - lastX
        const dy = mouseY - lastY
        const speed = Math.sqrt(dx * dx + dy * dy)

        // Add particles based on speed
        const particleCount = Math.min(3, Math.floor(speed / 10))
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(mouseX, mouseY))
        }

        lastX = mouseX
        lastY = mouseY
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    // Animation function
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update()
        particles[i].draw()

        if (particles[i].isDead()) {
          particles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}
