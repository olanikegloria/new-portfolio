"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  link?: string
  skills: string[]
}

const certifications: Certification[] = [
  {
    id: "cert1",
    title: "Full-Stack Web Development",
    issuer: "Microverse",
    date: "March 2024",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://www.credential.net/full-stack-web-development",
    skills: ["JavaScript", "React", "Ruby on Rails", "SQL", "HTML/CSS"],
  },
  {
    id: "cert2",
    title: "Node.js Development",
    issuer: "NIIT Limited",
    date: "June 2024",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://www.credential.net/nodejs-development",
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "Authentication"],
  },
  {
    id: "cert3",
    title: "React Native Mobile Development",
    issuer: "Delight Olga",
    date: "May 2025",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://www.credential.net/react-native",
    skills: ["React Native", "Mobile UI/UX", "Redux", "API Integration", "Mobile Testing"],
  },
  {
    id: "cert4",
    title: "Odoo ERP Development",
    issuer: "Riskgratis Technologies",
    date: "October 2024",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://www.credential.net/odoo-development",
    skills: ["Odoo", "Python", "XML", "Business Process Modeling", "ERP Systems"],
  },
  {
    id: "cert5",
    title: "TypeScript Advanced Concepts",
    issuer: "Microverse",
    date: "January 2024",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://www.credential.net/typescript-advanced",
    skills: ["TypeScript", "Type Systems", "Generics", "Advanced Types", "Design Patterns"],
  },
  {
    id: "cert6",
    title: "Next.js & Modern Web Development",
    issuer: "Delight Olga",
    date: "April 2025",
    image: "/placeholder.svg?height=400&width=400",
    link: "https://www.credential.net/nextjs-development",
    skills: ["Next.js", "SSR", "Static Generation", "API Routes", "Performance Optimization"],
  },
]

export default function CertificationsSection() {
  const [activeCert, setActiveCert] = useState<string | null>(null)

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold gradient-text mb-3 font-raleway">Professional Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-poppins">
            Continuous learning is a core part of my professional journey. Here are some of the certifications I've
            earned to enhance my skills and knowledge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="h-full"
            >
              <Card
                className={`h-full cyber-border overflow-hidden transform transition-all duration-500 ${
                  activeCert === cert.id ? "scale-[1.02]" : ""
                }`}
                onMouseEnter={() => setActiveCert(cert.id)}
                onMouseLeave={() => setActiveCert(null)}
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.8, rotate: -5 }}
                    animate={{
                      scale: activeCert === cert.id ? 1 : 0.8,
                      rotate: activeCert === cert.id ? 0 : -5,
                      y: activeCert === cert.id ? -10 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                      <Award className="w-16 h-16 text-primary" />
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>

                <CardContent className="p-6 relative">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-2 gradient-text font-raleway">{cert.title}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-primary font-medium">{cert.issuer}</p>
                      <p className="text-sm text-muted-foreground">{cert.date}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2 font-poppins">Skills Covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {cert.link && (
                      <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2" /> View Certificate
                        </a>
                      </Button>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
