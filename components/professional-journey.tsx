"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, ChevronRight, ChevronLeft, Star, Code } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  type: "work" | "education" | "project"
  color?: string
}

const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Riskgratis Technologies Limited",
    period: "October 2024 – Present",
    description:
      "Developed high-performance mobile and web applications in Odoo, streamlining business operations and improving user engagement.",
    skills: ["Odoo", "Python", "JavaScript", "Web Development", "Mobile Development"],
    type: "work",
    color: "#9d4edd",
  },
  {
    title: "Software Engineer",
    company: "Delight Olga",
    period: "January 2025 – May 2025",
    description:
      "Designed and implemented multiple user-focused web applications, delivering responsive and intuitive interfaces.",
    skills: ["Frontend Development", "API Integration", "Ruby on Rails", "UI/UX"],
    type: "work",
    color: "#c77dff",
  },
  {
    title: "Backend Engineer",
    company: "NIIT Limited",
    period: "July 2022 – June 2024",
    description:
      "Engineered scalable Node.js backend applications, leveraging event-driven architecture for high-traffic, real-time data.",
    skills: ["Node.js", "Backend Development", "DevTools", "Performance Optimization"],
    type: "work",
    color: "#7b2cbf",
  },
  {
    title: "Code Reviewer",
    company: "Microverse",
    period: "Feb 2023 – March 2024",
    description:
      "Developed applications with Next.js, TypeScript, and Ruby on Rails, ensuring seamless user experiences.",
    skills: ["Next.js", "TypeScript", "Ruby on Rails", "Code Review", "Agile"],
    type: "work",
    color: "#5a189a",
  },
]

export default function ProfessionalJourney() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, threshold: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Auto-play functionality
  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setDirection(1)
        setActiveIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1))
      }, 8000) // Change every 8 seconds
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setActiveIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1))
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  }

  // Generate random positions for floating particles
  const generateParticles = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }))
  }

  const particles = generateParticles(30)

  return (
    <div ref={ref} className="relative py-16 overflow-hidden">
      {/* Animated background with particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `rgba(157, 78, 221, ${Math.random() * 0.5 + 0.1})`,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              opacity: [0.1, 0.5, 0.2, 0.7, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hexagonal background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon
              points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <polygon
              points="24.8,0 37.3,7.3 37.3,21.7 24.8,29 12.3,21.7 12.3,7.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <polygon
              points="0,22 12.5,29.2 12.5,43.7 0,50.9 -12.5,43.7 -12.5,29.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <polygon
              points="49.7,22 62.2,29.2 62.2,43.7 49.7,50.9 37.2,43.7 37.2,29.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <motion.div
        variants={variants}
        initial="hidden"
        animate={controls}
        className="relative z-10 max-w-5xl mx-auto px-4"
      >
        {/* Section title with animated underline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold gradient-text mb-3 font-syncopate">Professional Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-quicksand">
            My career path and professional experience
          </p>
          <motion.div
            className="h-1 w-24 bg-primary mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Interactive timeline navigation */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-3xl h-20 flex items-center">
            {/* Timeline track */}
            <div className="absolute w-full h-1 bg-secondary/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  width: `${((activeIndex + 1) / experiences.length) * 100}%`,
                  background: `linear-gradient(to right, ${experiences[activeIndex].color}, ${
                    experiences[activeIndex].color + "80"
                  })`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Timeline nodes */}
            {experiences.map((_, index) => (
              <motion.button
                key={index}
                className={`absolute transform -translate-y-1/2 w-6 h-6 rounded-full border-2 transition-all duration-300 z-10 ${
                  index <= activeIndex ? "bg-primary border-primary" : "bg-background border-secondary"
                }`}
                style={{
                  left: `${(index / (experiences.length - 1)) * 100}%`,
                  backgroundColor: index <= activeIndex ? experiences[index].color : "transparent",
                  borderColor: experiences[index].color,
                }}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index <= activeIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: experiences[index].color + "30" }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Year labels */}
            {experiences.map((exp, index) => (
              <motion.div
                key={`year-${index}`}
                className="absolute text-xs font-medium"
                style={{
                  left: `${(index / (experiences.length - 1)) * 100}%`,
                  bottom: "-24px",
                  transform: "translateX(-50%)",
                  color: index === activeIndex ? experiences[index].color : "var(--muted-foreground)",
                }}
                animate={{
                  scale: index === activeIndex ? 1.1 : 1,
                  fontWeight: index === activeIndex ? "bold" : "normal",
                }}
              >
                <span className="font-syncopate">{exp.period.split("–")[0].trim()}</span>
              </motion.div>
            ))}

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-primary/20 hover:text-primary"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-primary/20 hover:text-primary"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main experience display */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {experiences.map(
              (exp, index) =>
                index === activeIndex && (
                  <motion.div
                    key={`experience-${index}`}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="grid md:grid-cols-2 gap-8 items-center"
                  >
                    {/* Left side - Experience details */}
                    <div className="order-2 md:order-1">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="cyber-border p-6 rounded-lg bg-secondary/10 backdrop-blur-sm relative overflow-hidden"
                        style={{
                          boxShadow: `0 10px 30px -5px ${exp.color}30`,
                          borderColor: `${exp.color}50`,
                        }}
                      >
                        {/* Animated background gradient */}
                        <motion.div
                          className="absolute inset-0 opacity-10"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, ${exp.color}, transparent 70%)`,
                          }}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.15, 0.1],
                          }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />

                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <motion.h3
                                className="text-2xl font-bold mb-1 font-syncopate"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                style={{ color: exp.color }}
                              >
                                {exp.title}
                              </motion.h3>
                              <motion.div
                                className="flex items-center"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                              >
                                <Briefcase className="h-4 w-4 mr-2" style={{ color: exp.color }} />
                                <p className="font-medium font-quicksand" style={{ color: exp.color }}>
                                  {exp.company}
                                </p>
                              </motion.div>
                            </div>
                            <motion.div
                              className="flex items-center px-3 py-1 rounded-full"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4, duration: 0.5 }}
                              style={{ backgroundColor: `${exp.color}20` }}
                            >
                              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                              <span className="text-sm text-muted-foreground font-quicksand">{exp.period}</span>
                            </motion.div>
                          </div>

                          <motion.p
                            className="text-muted-foreground mb-6 font-quicksand"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          >
                            {exp.description}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                          >
                            <h4 className="text-sm font-medium mb-3 font-syncopate">Skills & Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.skills.map((skill, i) => (
                                <motion.div
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
                                  whileHover={{
                                    scale: 1.1,
                                    boxShadow: `0 0 10px ${exp.color}80`,
                                    backgroundColor: `${exp.color}40`,
                                  }}
                                >
                                  <Badge
                                    variant="secondary"
                                    style={{ backgroundColor: `${exp.color}20`, borderColor: `${exp.color}40` }}
                                    className="border font-quicksand"
                                  >
                                    <Code className="h-3 w-3 mr-1" />
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right side - Visual representation */}
                    <div className="order-1 md:order-2 flex justify-center">
                      <motion.div
                        className="relative w-64 h-64"
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                      >
                        {/* Decorative elements */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* Outer ring */}
                          <motion.div
                            className="absolute w-full h-full rounded-full border-2"
                            style={{ borderColor: exp.color || "#9d4edd" }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />

                          {/* Middle ring */}
                          <motion.div
                            className="absolute w-3/4 h-3/4 rounded-full border-2"
                            style={{ borderColor: exp.color || "#9d4edd" }}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />

                          {/* Inner ring */}
                          <motion.div
                            className="absolute w-1/2 h-1/2 rounded-full border-2"
                            style={{ borderColor: exp.color || "#9d4edd" }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />

                          {/* Center circle with 3D effect */}
                          <motion.div
                            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl relative overflow-hidden"
                            style={{
                              backgroundColor: exp.color || "#9d4edd",
                              boxShadow: `0 0 20px ${exp.color}80, inset 0 0 15px rgba(255,255,255,0.5)`,
                            }}
                            animate={{
                              scale: [1, 1.1, 1],
                              boxShadow: [
                                `0 0 20px ${exp.color}80, inset 0 0 15px rgba(255,255,255,0.5)`,
                                `0 0 30px ${exp.color}90, inset 0 0 20px rgba(255,255,255,0.7)`,
                                `0 0 20px ${exp.color}80, inset 0 0 15px rgba(255,255,255,0.5)`,
                              ],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            {/* Highlight effect */}
                            <motion.div
                              className="absolute inset-0 opacity-70"
                              style={{
                                background: `linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)`,
                              }}
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />

                            {/* Number */}
                            <span className="relative z-10 font-syncopate">{index + 1}</span>
                          </motion.div>

                          {/* Orbital particles */}
                          {Array.from({ length: 8 }).map((_, i) => {
                            const angle = (i / 8) * Math.PI * 2
                            const delay = i * 0.5
                            const size = Math.random() * 3 + 2
                            const distance = 80 + Math.random() * 20
                            const duration = 5 + Math.random() * 5
                            const initialX = Math.cos(angle) * distance
                            const initialY = Math.sin(angle) * distance

                            return (
                              <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                  width: size,
                                  height: size,
                                  backgroundColor: exp.color || "#9d4edd",
                                  boxShadow: `0 0 5px ${exp.color}80, 0 0 10px ${exp.color}40`,
                                  x: initialX,
                                  y: initialY,
                                  left: "50%",
                                  top: "50%",
                                }}
                                animate={{
                                  x: [initialX, -initialY, -initialX, initialY, initialX],
                                  y: [initialY, initialX, -initialY, -initialX, initialY],
                                  scale: [1, 1.5, 1, 1.5, 1],
                                  opacity: [0.7, 1, 0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: duration,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: delay,
                                  ease: "linear",
                                }}
                              />
                            )
                          })}

                          {/* Floating stars */}
                          {Array.from({ length: 5 }).map((_, i) => {
                            const distance = 40 + Math.random() * 60
                            const angle = (i / 5) * Math.PI * 2
                            const x = Math.cos(angle) * distance
                            const y = Math.sin(angle) * distance

                            return (
                              <motion.div
                                key={`star-${i}`}
                                className="absolute"
                                style={{
                                  x,
                                  y,
                                  left: "50%",
                                  top: "50%",
                                }}
                                animate={{
                                  scale: [0.8, 1.2, 0.8],
                                  opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 2 + i,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.3,
                                }}
                              >
                                <Star size={8 + i * 2} className="text-white" fill={exp.color} stroke="none" />
                              </motion.div>
                            )
                          })}
                        </div>

                        {/* Company name in a decorative element - CENTERED under the rings */}
                        <motion.div
                          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-6 py-2 rounded-full border-2 whitespace-nowrap text-center"
                          style={{
                            borderColor: exp.color || "#9d4edd",
                            boxShadow: `0 5px 15px -5px ${exp.color}80`,
                          }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        >
                          <motion.span
                            className="font-medium font-syncopate"
                            style={{ color: exp.color }}
                            animate={{
                              textShadow: [
                                `0 0 5px ${exp.color}40`,
                                `0 0 10px ${exp.color}60`,
                                `0 0 5px ${exp.color}40`,
                              ],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            {exp.company}
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>

        {/* Experience indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {experiences.map((_, index) => (
            <motion.button
              key={`indicator-${index}`}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: index === activeIndex ? experiences[index].color : "var(--secondary)",
                border: index === activeIndex ? `1px solid ${experiences[index].color}` : "1px solid var(--border)",
              }}
              onClick={() => {
                setIsAutoPlaying(false)
                setDirection(index > activeIndex ? 1 : -1)
                setActiveIndex(index)
              }}
              whileHover={{ scale: 1.5 }}
              animate={{
                scale: index === activeIndex ? [1, 1.2, 1] : 1,
                opacity: index === activeIndex ? 1 : 0.5,
              }}
              transition={{
                duration: index === activeIndex ? 2 : 0.3,
                repeat: index === activeIndex ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
