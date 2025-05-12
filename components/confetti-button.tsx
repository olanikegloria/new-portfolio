"use client"

import { useState } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ConfettiButtonProps extends ButtonProps {
  confettiColors?: string[]
}

export default function ConfettiButton({
  children,
  confettiColors = ["#9d4edd", "#c77dff", "#e0aaff", "#7b2cbf", "#5a189a"],
  className,
  ...props
}: ConfettiButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e) => {
    setIsAnimating(true)

    // Call the original onClick if provided
    if (props.onClick) {
      props.onClick(e)
    }

    setTimeout(() => setIsAnimating(false), 1000)
  }

  return (
    <Button
      className={cn("relative overflow-hidden group", isAnimating ? "animate-pulse" : "", className)}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-gradient-to-r from-primary/60 to-purple-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </Button>
  )
}
