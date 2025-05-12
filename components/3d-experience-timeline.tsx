"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  type: "work" | "education" | "project"
}

const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "Riskgratis Technologies Limited",
    period: "October 2024 – Present",
    description:
      "Developed high-performance mobile and web applications in Odoo, streamlining business operations and improving user engagement at RiskGratis. Utilized Odoo's robust framework to create scalable, maintainable solutions, ensuring efficient integration and optimal system performance.",
    skills: ["Odoo", "Python", "JavaScript", "Web Development", "Mobile Development"],
    type: "work",
  },
  {
    title: "Software Engineer",
    company: "Delight Olga",
    period: "January 2025 – May 2025",
    description:
      "Designed and implemented multiple user-focused web applications, delivering responsive and intuitive interfaces. Led frontend development and seamlessly integrated APIs with a Ruby on rails backend to ensure smooth data flow.",
    skills: ["Frontend Development", "API Integration", "Ruby on Rails", "UI/UX"],
    type: "work",
  },
  {
    title: "Backend Engineer",
    company: "NIIT Limited",
    period: "July 2022 – June 2024",
    description:
      "Engineered scalable Node.js backend applications, leveraging event-driven architecture for high-traffic, real-time data. Developed modular, maintainable codebases, ensuring seamless integration and contributing to company success.",
    skills: ["Node.js", "Backend Development", "DevTools", "Performance Optimization"],
    type: "work",
  },
  {
    title: "Code Reviewer",
    company: "Microverse",
    period: "Feb 2023 – March 2024",
    description:
      "Developed applications with Next.js, TypeScript, and Ruby on Rails, ensuring seamless user experiences. Conducted pair programming and code reviews, collaborated in Agile sprints to deliver scalable, maintainable code.",
    skills: ["Next.js", "TypeScript", "Ruby on Rails", "Code Review", "Agile"],
    type: "work",
  },
]

export default function ExperienceTimelineCanvas() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setDirection(1)
        setActiveIndex((prev) => (prev + 1) % experiences.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoPlay])

  const handlePrev = () => {
    setAutoPlay(false)
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length)
  }

  const handleNext = () => {
    setAutoPlay(false)
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % experiences.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="w-full h-[600px] relative cyber-border p-6 bg-secondary/10 rounded-lg overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 tech-pattern opacity-20"></div>

      {/* Timeline dots */}
      <div className="absolute top-4 left-0 right-0 flex justify-center space-x-4">
        {experiences.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-primary scale-125" : "bg-secondary"
            }`}
            onClick={() => {
              setAutoPlay(false)
              setActiveIndex(index)
            }}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Experience cards */}
      <div className="w-full h-full flex items-center justify-center pt-10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-3xl"
          >
            <Card className="cyber-border overflow-hidden shadow-lg shadow-primary/10">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text mb-2 font-orbitron">
                      {experiences[activeIndex].title}
                    </h3>
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-primary mr-2" />
                      <p className="text-primary font-medium">{experiences[activeIndex].company}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center bg-secondary/30 px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{experiences[activeIndex].period}</span>
                  </div>
                </div>

                <div className="mb-6 text-lg leading-relaxed">
                  <p>{experiences[activeIndex].description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" /> Skills & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experiences[activeIndex].skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/10 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* 3D effect elements */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Timeline progress */}
      <div className="absolute bottom-4 left-0 right-0 px-8">
        <div className="h-1 w-full bg-secondary/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: `${(activeIndex / (experiences.length - 1)) * 100}%` }}
            animate={{ width: `${(activeIndex / (experiences.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  )
}
