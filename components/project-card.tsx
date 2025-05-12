"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  animate?: boolean
  projectType?: "personal" | "client"
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  tags,
  animate = false,
  projectType,
}: ProjectCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
      className="h-full"
      layout={animate}
      initial={animate ? { opacity: 0, scale: 0.8 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : false}
      exit={animate ? { opacity: 0, scale: 0.8 } : false}
      transition={{ duration: 0.3 }}
    >
      <Card className="cyber-border overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(157,78,221,0.3)] group h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

          {/* Project type badge */}
          {projectType && (
            <div className="absolute top-2 right-2 z-10">
              <Badge variant={projectType === "personal" ? "secondary" : "default"} className="text-xs">
                {projectType === "personal" ? "Personal" : "Client"}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-5 flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Link
            href={`/projects/${id}`}
            className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium group/link"
          >
            View Project <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
