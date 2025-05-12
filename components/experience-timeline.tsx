"use client"

import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase } from "lucide-react"

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

export default function ExperienceTimeline() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative" ref={ref}>
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/80 to-primary/20 rounded-full"></div>

      <motion.div variants={containerVariants} initial="hidden" animate={controls} className="relative z-10">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`mb-16 flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg"></div>

            {/* Content */}
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
              <Card className="cyber-border overflow-hidden hover-card-effect">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold gradient-text">{exp.title}</h3>
                      <div className="flex items-center mt-1">
                        <Briefcase className="h-4 w-4 text-primary mr-2" />
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center bg-secondary/30 px-3 py-1 rounded-full">
                      <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm text-muted-foreground">{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/10">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
