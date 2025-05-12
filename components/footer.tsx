"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Twitter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="text-2xl font-bold gradient-text inline-block mb-4">
                Olanike<span className="text-primary">Portfolio</span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                A passionate software developer with over 3 years of experience building innovative solutions with
                cutting-edge technologies.
              </p>
              <div className="flex space-x-4">
                <motion.div whileHover={{ y: -5, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link
                    href="https://github.com/olanikegloria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -5, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link
                    href="mailto:olanikegloria2020@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" size="sm" className="p-0 h-auto flex items-center gap-2" asChild>
                  <a href="/resume.pdf" download className="text-muted-foreground hover:text-primary transition-colors">
                    <Download className="h-4 w-4" /> Resume
                  </a>
                </Button>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Olanike Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed & Built with <span className="text-red-500">♥</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
