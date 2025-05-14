"use client"

import { useState, useEffect } from "react"
import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Filter } from "lucide-react"

// Projects data with real projects
const projects = [
  // Client Projects
  {
    id: "programs-portal",
    title: "Programs Portal",
    description: "Administrative portal for managing programs and applications with user authentication and dashboard.",
    image: "/program.png",
    tags: ["React", "Next.js", "TypeScript", "SQL", "CSS"],
    type: "client",
    link: "https://programsportal.jjrsf.org/admin/login",
  },
  {
    id: "riskgratis-landing",
    title: "RiskGratis Landing",
    description: "Corporate landing page for RiskGratis with modern design and responsive layout.",
    image: "/riskgratis.png",
    tags: ["Python", "JavaScript", "HTML", "CSS"],
    type: "client",
    link: "https://landing.riskgratis.xyz/",
  },
  {
    id: "cla-jjrsf",
    title: "CLA JJRSF",
    description: "Platform for managing and showcasing community leadership activities and initiatives.",
    image: "/jjrsf.png",
    tags: ["React", "Next.js", "JavaScript", "CSS"],
    type: "client",
    link: "https://cla.jjrsf.org/",
  },
  {
    id: "starlink-solutions",
    title: "Starlink Solutions Portal",
    description: "User portal for Starlink Solutions with authentication and service management features.",
    image: "/starlink.png",
    tags: ["React", "TypeScript", "SQL", "CSS"],
    type: "client",
    link: "https://portal.starlinksolutions.ng/login",
  },
  {
    id: "academic-connect",
    title: "Academic Connect",
    description: "Platform connecting students and educators with resources and collaborative tools.",
    image: "/academic.png",
    tags: ["React", "Next.js", "TypeScript", "CSS"],
    type: "client",
    link: "https://academic-connect.vercel.app/",
  },
  {
    id: "jjrsf-event-manager",
    title: "JJRSF Event Manager",
    description: "Event management system for scheduling, registration, and attendee tracking.",
    image: "/event.png",
    tags: ["React", "JavaScript", "HTML", "CSS"],
    type: "client",
    link: "https://jjrsf-event-manager-guest.vercel.app/",
  },
  {
    id: "creative-builders",
    title: "Creative Builders",
    description: "Corporate website for a construction company with portfolio and service showcase.",
    image: "/creative.png",
    tags: ["React", "Next.js", "JavaScript", "CSS"],
    type: "client",
    link: "https://www.creativebuilders.com.ng/",
  },
  {
    id: "learning-platform",
    title: "Learning Platform",
    description: "Educational platform with course management, progress tracking, and interactive content.",
    image: "/blessing.png",
    tags: ["React", "Next.js", "TypeScript", "CSS"],
    type: "client",
    link: "https://learning-platform-ashy.vercel.app/",
  },

  // Personal Projects
  {
    id: "bucket-list",
    title: "Bucket List App",
    description: "App for creating and sharing bucket lists with friends to make and track memories together.",
    image: "/bestie.png",
    tags: ["React", "Next.js", "JavaScript", "CSS"],
    type: "personal",
    link: "https://bucket-list-ebon.vercel.app",
  },
  {
    id: "volume-booster",
    title: "Volume Booster Extension",
    description:
      "Browser extension that boosts audio volume and implements noise cancellation for better sound quality.",
    image: "/vol.png",
    tags: ["JavaScript", "HTML", "CSS"],
    type: "personal",
    link: "https://github.com/olanikegloria/volume-booster-extension",
  },
  {
    id: "apple-catcher-game",
    title: "Apple Catcher Game",
    description: "Interactive game built with Phaser.js where players catch falling apples for points.",
    image: "/apple.png",
    tags: ["JavaScript", "Phaser.js", "HTML", "CSS"],
    type: "personal",
    link: "https://js-game-e8rl.onrender.com/",
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "Web application that creates shortened URLs for easier sharing and tracking.",
    image: "/url.png",
    tags: ["JavaScript", "Node.js", "HTML", "CSS"],
    type: "personal",
    link: "https://github.com/olanikegloria/urlshortener",
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [searchQuery, setSearchQuery] = useState("")
  const [animateCards, setAnimateCards] = useState(false)

  // Filter projects based on type and search query
  useEffect(() => {
    let result = projects

    // Filter by type
    if (filter !== "all") {
      result = result.filter((project) => project.type === filter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    setFilteredProjects(result)

    // Trigger animation when filter changes
    setAnimateCards(true)
    const timer = setTimeout(() => setAnimateCards(false), 500)

    return () => clearTimeout(timer)
  }, [filter, searchQuery])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="pt-20">
      {/* Projects Hero */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </motion.h1>
          <motion.p
            className="text-lg max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore my portfolio of client and personal projects showcasing my skills in web development, mobile
            applications, and interactive experiences.
          </motion.p>
        </div>
      </section>

      {/* Filter and Search */}
      <motion.section
        className="py-8 bg-background border-b border-border/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Filter className="h-5 w-5 text-primary" />
              <span className="font-medium">Filter:</span>
              <div className="flex gap-2">
                {["all", "personal", "client"].map((type, index) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <Button
                      variant={filter === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilter(type)}
                      className="min-w-[80px]"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full md:w-64 px-4 py-2 rounded-md bg-secondary/20 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                className="text-center py-20"
                key="no-results"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="cyber-border p-8 inline-block">
                  <h3 className="text-xl font-bold mb-2">No projects found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setFilter("all")
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                animate="show"
                key="results"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <ProjectCard {...project} animate={animateCards} projectType={project.type} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
