"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, Database, Server, Layout, Globe, Terminal, Award } from "lucide-react"
import CertificationModal from "./certification-modal"

// Certification data
const certifications = [
  {
    id: "cert1",
    title: "Full-Stack Web Development",
    issuer: "Microverse",
    date: "March 2024",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://drive.google.com/file/d/1Xl8z6N33gxbd-SVCt_2hITPUEx99g0E0/view?usp=drive_link",
    skills: ["JavaScript", "React", "Ruby on Rails", "SQL", "HTML/CSS"],
    relatedSkills: ["JavaScript", "React.js", "Ruby on Rails", "SQL", "HTML/CSS"],
  },
  {
    id: "cert2",
    title: "javascript certificate",
    issuer: "NIIT Limited",
    date: "June 2024",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://drive.google.com/file/d/1NK0JfR1HszZa7D_joDCKyBDbEwVe7itx/view?usp=drive_link",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
    relatedSkills: ["Node.js", "Express", "MongoDB"],
  },
  {
    id: "cert3",
    title: "React",
    issuer: "Delight Olga",
    date: "May 2025",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://drive.google.com/file/d/1qguytHdb3eKGSqjm_pnYGVRMp8Z0xu3M/view?usp=drive_link",
    skills: ["React Native", "Mobile UI/UX", "Redux", "API Integration", "Mobile Testing"],
    relatedSkills: ["React Native"],
  },
  {
    id: "cert4",
    title: "ruby",
    issuer: "Riskgratis Technologies",
    date: "October 2024",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://drive.google.com/file/d/14KOT4H8DxlqH2geEwkStwGr6SxiCzZDT/view?usp=drive_link",
    skills: ["Odoo", "Python", "XML", "Business Process Modeling", "ERP Systems"],
    relatedSkills: ["Python", "Odoo"],
  },
  {
    id: "cert5",
    title: "rails",
    issuer: "Microverse",
    date: "January 2024",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://drive.google.com/file/d/1ApeqbcML_E8EQmlPJ32AqITKFX1yIu-p/view?usp=drive_link",
    skills: ["TypeScript", "Type Systems", "Generics", "Advanced Types", "Design Patterns"],
    relatedSkills: ["TypeScript"],
  },
  {
    id: "cert6",
    title: "database",
    issuer: "Delight Olga",
    date: "April 2025",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://drive.google.com/file/d/1ApeqbcML_E8EQmlPJ32AqITKFX1yIu-p/view?usp=drive_link",
    skills: ["Next.js", "SSR", "Static Generation", "API Routes", "Performance Optimization"],
    relatedSkills: ["Next.js"],
  },
]

interface Skill {
  name: string
  level: number // 1-5
  category: string
  icon?: React.ReactNode
  color?: string
  hasCertification?: boolean
  certificationId?: string
}

const skills: Skill[] = [
  // Programming Languages
  {
    name: "JavaScript",
    level: 5,
    category: "Languages",
    icon: <Code />,
    color: "#f7df1e",
    hasCertification: true,
    certificationId: "cert2",
  },
  {
    name: "TypeScript",
    level: 4,
    category: "Languages",
    icon: <Code />,
    color: "#3178c6",
  },
  { name: "Ruby", level: 4, category: "Languages", icon: <Code />,  hasCertification: true, certificationId: "cert4", color: "#cc342d" },
  {
    name: "Python",
    level: 4,
    category: "Languages",
    icon: <Code />,
    color: "#3776ab",

  },
  {
    name: "HTML/CSS",
    level: 5,
    category: "Languages",
    icon: <Layout />,
    color: "#e34c26",
    hasCertification: true,
    certificationId: "cert1",
  },
  {
    name: "SQL",
    level: 4,
    category: "Languages",
    icon: <Database />,
    color: "#336791",
    hasCertification: true,
    certificationId: "cert6",
  },

  // Frameworks & Libraries
  {
    name: "React.js",
    level: 5,
    category: "Frameworks",
    icon: <Code />,
    color: "#61dafb",
    hasCertification: true,
    certificationId: "cert3",
  },
  {
    name: "Next.js",
    level: 4,
    category: "Frameworks",
    icon: <Globe />,
    color: "#000000",
   
  },
  {
    name: "Node.js",
    level: 4,
    category: "Frameworks",
    icon: <Server />,
    color: "#68a063",
    hasCertification: true,
    certificationId: "cert2",
  },
  {
    name: "Express",
    level: 4,
    category: "Frameworks",
    icon: <Server />,
    hasCertification: true,
    certificationId: "cert2",
  },
  {
    name: "React Native",
    level: 4,
    category: "Frameworks",
    icon: <Code />,
    color: "#61dafb",
  },
  {
    name: "Ruby on Rails",
    level: 4,
    category: "Frameworks",
    icon: <Code />,
    color: "#cc0000",
    hasCertification: true,
    certificationId: "cert5",
  },

  // Databases
  {
    name: "MongoDB",
    level: 4,
    category: "Databases",
    icon: <Database />,
    color: "#47a248",
  },
  { name: "PostgreSQL", level: 3, category: "Databases", icon: <Database />, color: "#336791" },

  // Tools
  { name: "Git", level: 4, category: "Tools", icon: <Terminal />, color: "#f05032" },
  { name: "Jest", level: 3, category: "Tools", icon: <Terminal />, color: "#c21325" },
  { name: "Odoo", level: 4, category: "Tools", icon: <Globe />, hasCertification: true, certificationId: "cert4" },
  { name: "VS Code", level: 5, category: "Tools", icon: <Terminal />, color: "#007acc" },
]

const categories = ["Languages", "Frameworks", "Databases", "Tools"]

export default function SkillsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("Languages")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCertification, setSelectedCertification] = useState<(typeof certifications)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredSkills = skills.filter((skill) => skill.category === selectedCategory)

  const handleViewCertification = (certificationId: string) => {
    const certification = certifications.find((cert) => cert.id === certificationId)
    if (certification) {
      setSelectedCertification(certification)
      setIsModalOpen(true)
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cyber-border ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="h-full"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <Card
              className={`h-full cyber-border overflow-hidden transition-all duration-300 ${
                hoveredSkill === skill.name ? "transform scale-105" : ""
              }`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color || "#9d4edd"}, ${
                      skill.color ? skill.color + "80" : "#c77dff"
                    })`,
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: hoveredSkill === skill.name ? 360 : 0,
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-white"
                  >
                    {skill.icon || <Code />}
                  </motion.div>
                </div>

                <h3 className="text-lg font-bold mb-2 font-raleway">{skill.name}</h3>

                <div className="flex space-x-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-2 w-6 rounded-full ${i < skill.level ? "bg-primary" : "bg-secondary/50"}`}
                      initial={{ width: 0 }}
                      animate={{ width: "1.5rem" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  ))}
                </div>

                <motion.div
                  className="mt-4 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {skill.level === 5
                    ? "Expert"
                    : skill.level === 4
                      ? "Advanced"
                      : skill.level === 3
                        ? "Intermediate"
                        : "Beginner"}
                </motion.div>

                {skill.hasCertification && skill.certificationId && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      y: hoveredSkill === skill.name ? 0 : 10,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mt-3"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1"
                      asChild
                    >
                      <a 
                        href={certifications.find(cert => cert.id === skill.certificationId)?.link || "#"}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Award className="h-3 w-3" /> View Certification
                      </a>
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <CertificationModal
        certification={selectedCertification}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
