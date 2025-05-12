"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface Skill {
  name: string
  level: number // 1-5
  category: string
  color?: string
}

const skills: Skill[] = [
  // Programming Languages
  { name: "JavaScript", level: 5, category: "Languages", color: "#f7df1e" },
  { name: "TypeScript", level: 4, category: "Languages", color: "#3178c6" },
  { name: "Ruby", level: 4, category: "Languages", color: "#cc342d" },
  { name: "Python", level: 4, category: "Languages", color: "#3776ab" },
  { name: "HTML/CSS", level: 5, category: "Languages" },
  { name: "SQL", level: 4, category: "Languages" },

  // Frameworks & Libraries
  { name: "React.js", level: 5, category: "Frameworks", color: "#61dafb" },
  { name: "Next.js", level: 4, category: "Frameworks", color: "#000000" },
  { name: "Node.js", level: 4, category: "Frameworks", color: "#68a063" },
  { name: "Express", level: 4, category: "Frameworks" },
  { name: "React Native", level: 4, category: "Frameworks", color: "#61dafb" },
  { name: "Ruby on Rails", level: 4, category: "Frameworks", color: "#cc0000" },

  // Databases
  { name: "MongoDB", level: 4, category: "Databases", color: "#47a248" },
  { name: "PostgreSQL", level: 3, category: "Databases", color: "#336791" },

  // Tools
  { name: "Git", level: 4, category: "Tools", color: "#f05032" },
  { name: "Jest", level: 3, category: "Tools", color: "#c21325" },
  { name: "Odoo", level: 4, category: "Tools" },
  { name: "VS Code", level: 5, category: "Tools", color: "#007acc" },
]

const categories = ["Languages", "Frameworks", "Databases", "Tools"]

export default function AnimatedSkillBars() {
  const [selectedCategory, setSelectedCategory] = useState("Languages")
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const filteredSkills = skills.filter((skill) => skill.category === selectedCategory)

  return (
    <div ref={ref} className="w-full">
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

      <div className="space-y-6">
        {filteredSkills.map((skill, index) => (
          <div key={skill.name} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm text-muted-foreground">{skill.level * 20}%</span>
            </div>
            <div className="h-4 w-full bg-secondary/30 rounded-full overflow-hidden cyber-border">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  backgroundColor: skill.color || "#9d4edd",
                  width: `${skill.level * 20}%`,
                }}
                initial="hidden"
                animate={controls}
                variants={{
                  visible: {
                    width: `${skill.level * 20}%`,
                    transition: { duration: 1, delay: index * 0.1 },
                  },
                  hidden: { width: "0%" },
                }}
              >
                <motion.div
                  className="absolute top-0 right-0 bottom-0 w-20 bg-white/20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "linear",
                    delay: index * 0.2,
                  }}
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
