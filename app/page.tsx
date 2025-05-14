"use client"

import { useRef } from "react"
import SectionHeading from "@/components/section-heading"
import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Code, Database, Download, Layout, Server } from "lucide-react"
import HeroSection from "@/components/hero-section"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

// Sample projects data
const featuredProjects = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with payment processing and inventory management.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot Assistant",
    description: "An intelligent chatbot powered by machine learning to provide customer support.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "TensorFlow", "NLP", "API"],
  },
  {
    id: "data-visualization",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with real-time updates.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["D3.js", "React", "GraphQL", "AWS"],
  },
]

export default function Home() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <AnimatePresence mode="wait">
      <motion.div className="flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* Hero Section with 3D Computer */}
        <HeroSection />

        {/* About Section */}
        <motion.section id="about" className="py-20 bg-background" ref={targetRef} style={{ opacity, y }}>
          <div className="container mx-auto px-4">
            <SectionHeading
              title="About Me"
              subtitle="With over 3 years of experience in software development, I specialize in creating robust and scalable applications."
              align="center"
            />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
              >
                <Image
                  src="/home.png"
                  alt="Developer Portrait"
                  width={600}
                  height={600}
                  className="rounded-lg cyber-border shadow-lg shadow-primary/20"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">My Journey</h3>
                <p className="mb-6 text-muted-foreground">
                  I'm a passionate software developer with a strong foundation in both frontend and backend
                  technologies. My journey began with a deep curiosity about how digital products work, which led me to
                  pursue a career in software development.
                </p>
                <p className="mb-6 text-muted-foreground">
                  Over the past 3+ years, I've had the opportunity to work on diverse projects ranging from e-commerce
                  platforms to data visualization tools, honing my skills in modern frameworks and best practices.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: <Code className="h-5 w-5 text-primary mr-2" />, text: "Frontend Development" },
                    { icon: <Server className="h-5 w-5 text-primary mr-2" />, text: "Backend Systems" },
                    { icon: <Database className="h-5 w-5 text-primary mr-2" />, text: "Database Design" },
                                    ].map((skill, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill.icon}
                      <span>{skill.text}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild>
                      <Link href="/about">Learn More About Me</Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild variant="outline">
                      <a href="/resume.pdf" download>
                        <Download className="mr-2 h-4 w-4" /> Resume
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Featured Projects Section
        <motion.section className="py-20 bg-secondary/20" style={{ scale }}>
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of my recent work showcasing my skills and expertise."
              align="center"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg" className="shadow-lg shadow-primary/10">
                <Link href="/projects">View All Projects</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section> */}

        {/* Skills Section */}
        <motion.section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Technical Expertise"
              subtitle="My professional skill set and technical proficiency"
              align="center"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Frontend",
                  skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Three.js & WebGL"],
                },
                {
                  title: "Backend",
                  skills: ["Node.js & Express", "Python & Django", "RESTful APIs", "GraphQL"],
                },
                {
                  title: "Database",
                  skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis"],
                },
                {
                  title: "DevOps",
                  skills: ["Docker & Kubernetes", "CI/CD Pipelines", "AWS & Vercel", "Git & GitHub"],
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  className="cyber-border p-6 bg-secondary/10 hover:bg-secondary/20 transition-colors rounded-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(157, 78, 221, 0.3)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-3 gradient-text">{category.title}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skillIndex}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <SectionHeading
              title="Client Testimonials"
              subtitle="What people say about working with me"
              align="center"
            />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  text: "Working with this developer was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and exceeded all our expectations with their attention to detail.",
                  name: "Tajul Afreen",
                  role: "CEO, Afolawebsolutions",
                },
                {
                  text: "Their technical expertise and problem-solving skills are outstanding. They quickly understood complex requirements and delivered a robust solution that perfectly met needs.",
                  name: "Okoli Tochi",
                  role: "collegue at microverse",
                },
                {
                  text: "Not only did they build an amazing application for us, but they also took the time to explain their process and ensure we could maintain it going forward. Truly a professional developer.",
                  name: "Mr. Dele",
                  role: "project Manage, Oasis LTD",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="cyber-border p-6 rounded-lg bg-background/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(157, 78, 221, 0.3)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.svg
                        key={star}
                        className="w-5 h-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + star * 0.1 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.text}</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 bg-background"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              className="max-w-2xl mx-auto cyber-border p-8 bg-secondary/10 shadow-lg shadow-primary/10"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 0 30px rgba(157, 78, 221, 0.4)",
              }}
            >
              <motion.h2
                className="text-3xl font-bold mb-4 gradient-text"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Ready to Work Together?
              </motion.h2>
              <motion.p
                className="text-muted-foreground mb-8"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                I'm currently available for freelance work and open to full-time opportunities.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Button asChild variant="outline" size="lg">
                    <a href="/resume.pdf" download>
                      <Download className="mr-2 h-4 w-4" /> Download Resume
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>
    </AnimatePresence>
  )
}
