"use client"

import { useEffect } from "react"
import Image from "next/image"
import SectionHeading from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Download, GraduationCap } from "lucide-react"
import ConfettiButton from "@/components/confetti-button"
import { motion } from "framer-motion"
import SkillsShowcase from "@/components/skills-showcase"
import ProfessionalJourney from "@/components/professional-journey"

// Education data
const education = [
  {
    degree: "Computer Software Engineering",
    institution: "Microverse",
    period: "",
    description:
      "Focused on Data Structures & Algorithms, Objects & Design, Computer Organization & Programming, Object-Oriented Programming, Databases & Storage, Testing & Deployment, Version control, Error Handling.",
  },
  {
    degree: "BENG in Electrical/Electronics Engineering",
    institution: "Bells University of Technology",
    period: "",
    description:
      "GPA: 4.82/5.00, Dean's List. Focused on Microprocessor Architecture and Programming, Machine Learning, Computer Logics, Microsoft Server, Object-Oriented Programming, Signals & Systems Analysis, Control systems, Operations Research.",
  },
]

export default function AboutPage() {
  // Force a re-render when the component mounts to fix blank page issue
  useEffect(() => {
    // Force a re-render by updating a state or using forceUpdate
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pt-20">
      {/* About Hero */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl font-bold mb-6 gradient-text font-raleway">About Me</h1>
              <p className="text-lg mb-6 text-muted-foreground font-poppins">
                I'm a passionate software developer with over 3 years of experience building web applications and
                digital experiences that solve real-world problems.
              </p>
              <p className="text-lg mb-6 text-muted-foreground font-poppins">
                My journey in tech began with a curiosity about how things work on the web, which led me to pursue
                formal education in computer science and continuously expand my skills through hands-on projects and
                professional work.
              </p>
              <p className="text-lg text-muted-foreground font-poppins">
                I believe in writing clean, maintainable code and creating intuitive user experiences. When I'm not
                coding, you can find me exploring new technologies, contributing to open-source projects, or sharing
                knowledge with the developer community.
              </p>
              <motion.div className="mt-6" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ConfettiButton>
                  <a href="/resume.pdf" download className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Download My Resume
                  </a>
                </ConfettiButton>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="cyber-border p-1 rounded-lg">
                <Image
                  src="/about.png"
                  alt="Developer Portrait"
                  width={600}
                  height={600}
                  className="rounded-lg"
                />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-background p-4 rounded-lg cyber-border"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.8 }}
              >
                <p className="text-lg font-bold font-raleway">3+ Years Experience</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Showcase Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Technical Skills"
            subtitle="A comprehensive overview of my technical expertise and proficiency levels"
            align="center"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <SkillsShowcase />
          </motion.div>
        </div>
      </section>

      {/* Professional Journey Timeline */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Professional Journey"
            subtitle="My career path and professional experience"
            align="center"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <ProfessionalJourney />
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading title="Education" subtitle="My academic background and continuous learning journey." />

          <div className="space-y-8 mt-12">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="cyber-border overflow-hidden hover-card-effect">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold font-raleway">{edu.degree}</h3>
                        <p className="text-primary font-medium">{edu.institution}</p>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <GraduationCap className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">{edu.period}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-poppins">{edu.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
