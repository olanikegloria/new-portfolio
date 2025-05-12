"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Server, Globe } from "lucide-react"

// Skills data
const skills = [
  {
    name: "JavaScript",
    icon: <Code className="h-6 w-6" />,
    color: "#f7df1e",
    description: "Expert in modern JavaScript, ES6+ features, and asynchronous programming",
  },
  {
    name: "React",
    icon: <Code className="h-6 w-6" />,
    color: "#61dafb",
    description: "Building responsive and performant user interfaces with React and its ecosystem",
  },
  {
    name: "Node.js",
    icon: <Server className="h-6 w-6" />,
    color: "#68a063",
    description: "Creating scalable backend services and RESTful APIs with Node.js",
  },
  {
    name: "TypeScript",
    icon: <Code className="h-6 w-6" />,
    color: "#3178c6",
    description: "Leveraging TypeScript for type-safe code and improved developer experience",
  },
  {
    name: "Next.js",
    icon: <Globe className="h-6 w-6" />,
    color: "#000000",
    description: "Building SEO-friendly, performant web applications with Next.js",
  },
  {
    name: "Databases",
    icon: <Database className="h-6 w-6" />,
    color: "#336791",
    description: "Working with SQL and NoSQL databases like PostgreSQL and MongoDB",
  },
]

export default function SkillsCubeCanvas() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-rotate through skills
  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % skills.length)
      }, 3000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering])

  return (
    <div className="w-full h-[500px] relative cyber-border p-6 bg-secondary/10 rounded-lg overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 tech-pattern opacity-20"></div>

      {/* 3D rotating cube effect */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="w-64 h-64 relative perspective-[1000px] transform-style-3d"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {skills.map((skill, index) => {
            const isActive = index === activeIndex

            return (
              <motion.div
                key={skill.name}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 0.8, rotateY: index * 60 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.8,
                  rotateY: isActive ? 0 : index * 60,
                  z: isActive ? 50 : 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                onClick={() => setActiveIndex(index)}
              >
                <Card className="w-full h-full cyber-border overflow-hidden">
                  <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${skill.color}30` }}
                      animate={{
                        rotate: isActive ? [0, 360] : 0,
                        scale: isActive ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                    >
                      <div className="text-primary">{skill.icon}</div>
                    </motion.div>

                    <h3 className="text-xl font-bold mb-2 font-orbitron">{skill.name}</h3>
                    <p className="text-sm text-center text-muted-foreground">{skill.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Skill selector dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {skills.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-primary scale-125" : "bg-secondary"
            }`}
            onClick={() => {
              setActiveIndex(index)
              setIsHovering(true)
              setTimeout(() => setIsHovering(false), 5000)
            }}
          />
        ))}
      </div>
    </div>
  )
}
