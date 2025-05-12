"use client"

import { Html, useProgress } from "@react-three/drei"

const CanvasLoader = () => {
  const { progress } = useProgress()

  return (
    <Html as="div" center className="flex flex-col items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-primary animate-spin mb-2"></div>
      <p className="text-sm font-medium text-primary">{progress.toFixed(2)}%</p>
    </Html>
  )
}

export default CanvasLoader
