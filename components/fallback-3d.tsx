// Create a new component for a fallback 3D scene
"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense, useEffect, useState } from "react"
import CanvasLoader from "./loader"

// Simple 3D scene with basic shapes
const FallbackScene = () => {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#4d9fff" />
      </mesh>
      <mesh position={[-3, 0, -2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[3, 0, -2]} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  )
}

const FallbackCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)")
    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange)
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas frameloop="demand" shadows camera={{ position: [0, 2, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <FallbackScene />
      </Suspense>
    </Canvas>
  )
}

export default FallbackCanvas
