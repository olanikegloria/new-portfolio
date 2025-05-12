"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Award, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  link?: string
  skills: string[]
}

interface CertificationModalProps {
  certification: Certification | null
  isOpen: boolean
  onClose: () => void
}

export default function CertificationModal({ certification, isOpen, onClose }: CertificationModalProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Add event listener to close modal on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isOpen && certification && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background cyber-border rounded-lg w-full max-w-lg overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-32 bg-gradient-to-r from-primary/20 to-primary/40">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 z-10"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>

                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center">
                  <Award className="h-16 w-16 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="pt-20 px-6 pb-6">
                <h3 className="text-2xl font-bold text-center gradient-text mb-2 font-raleway">
                  {certification.title}
                </h3>
                <div className="flex justify-center items-center gap-2 mb-6">
                  <p className="text-primary font-medium">{certification.issuer}</p>
                  <span className="text-muted-foreground">•</span>
                  <p className="text-sm text-muted-foreground">{certification.date}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2 font-poppins">Skills Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {certification.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {certification.link && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={certification.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> View Certificate
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
