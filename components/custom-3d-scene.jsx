"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, useTexture } from "@react-three/drei"
import CanvasLoader from "./loader"
import * as THREE from "three"

// Create a code texture for the monitor with VSCode-like appearance
const CodeScreen = () => {
  const [texture, setTexture] = useState(null)
  
  // Load a pre-rendered code editor texture that matches the screenshot
  const codeTexture = useTexture("/code-screen.png", (loadedTexture) => {
    loadedTexture.minFilter = THREE.LinearFilter
    loadedTexture.magFilter = THREE.LinearFilter
    loadedTexture.needsUpdate = true
    setTexture(loadedTexture)
  })
  
  // If no pre-rendered texture is available, create one dynamically
  useEffect(() => {
    if (!texture) {
      // Create a canvas to draw the code screen
      const canvas = document.createElement("canvas")
      canvas.width = 1024
      canvas.height = 512
      const ctx = canvas.getContext("2d")

      // Fill background - VSCode dark theme
      ctx.fillStyle = "#1e1e1e"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw the VSCode interface elements
      // Explorer sidebar
      ctx.fillStyle = "#252526"
      ctx.fillRect(0, 0, 200, canvas.height)
      
      // Top bar
      ctx.fillStyle = "#333333"
      ctx.fillRect(200, 0, canvas.width-200, 30)

      // Draw code lines with syntax highlighting
      const drawCodeLine = (text, x, y, color) => {
        ctx.font = "14px 'Consolas', monospace"
        ctx.fillStyle = color
        ctx.fillText(text, x, y)
      }

      // Import statements - blue
      drawCodeLine('import React from "react";', 220, 40, "#569cd6")
      drawCodeLine('import { motion } from "framer-motion";', 220, 60, "#569cd6")
      drawCodeLine('import * as THREE from "three";', 220, 80, "#569cd6")
      
      // Empty line
      drawCodeLine("", 220, 100, "#fff")
      
      // Component declaration - yellow
      drawCodeLine("const AnimatedComponent = () => {", 220, 120, "#dcdcaa")
      
      // useState hook - white and blue
      drawCodeLine("  const [isVisible, setIsVisible] = useState(false);", 220, 140, "#fff")
      drawCodeLine("", 220, 160, "#fff")
      
      // useEffect - purple
      drawCodeLine("  useEffect(() => {", 220, 180, "#c586c0")
      drawCodeLine("    setIsVisible(true);", 220, 200, "#fff")
      drawCodeLine("    document.title = 'My Portfolio';", 220, 220, "#fff")
      drawCodeLine("  }, []);", 220, 240, "#fff")
      drawCodeLine("", 220, 260, "#fff")
      
      // Return statement
      drawCodeLine("  return (", 220, 280, "#fff")
      drawCodeLine("    <motion.div", 220, 300, "#9cdcfe")
      drawCodeLine('      className="container"', 220, 320, "#ce9178")
      drawCodeLine("      initial={{ opacity: 0 }}", 220, 340, "#ce9178")
      drawCodeLine("      animate={{ opacity: isVisible ? 1 : 0 }}", 220, 360, "#ce9178")
      drawCodeLine("      transition={{ duration: 0.5 }}", 220, 380, "#ce9178")
      drawCodeLine("    >", 220, 400, "#9cdcfe")
      drawCodeLine("      <h1>Welcome to my portfolio</h1>", 220, 420, "#fff")
      drawCodeLine("    </motion.div>", 220, 440, "#9cdcfe")
      drawCodeLine("  );", 220, 460, "#fff")
      drawCodeLine("};", 220, 480, "#fff")
      
      // Terminal output at bottom
      ctx.fillStyle = "#1e1e3f"
      ctx.fillRect(0, canvas.height - 80, canvas.width, 80)
      ctx.fillStyle = "#cccccc"
      ctx.font = "12px 'Consolas', monospace"
      ctx.fillText("$ npm run dev", 10, canvas.height - 60)
      ctx.fillStyle = "#88ff88"
      ctx.fillText("> portfolio@0.1.0 dev", 10, canvas.height - 40)
      ctx.fillText("> next dev", 10, canvas.height - 20)

      const newTexture = new THREE.CanvasTexture(canvas)
      newTexture.minFilter = THREE.LinearFilter
      newTexture.magFilter = THREE.LinearFilter
      setTexture(newTexture)
    }
  }, [texture])

  if (!texture) return null

  return (
    <mesh position={[0, 0, 0.01]}>
      <planeGeometry args={[3.8, 2.1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

// Create RGB fan component with the purple color scheme from the image
const RGBFan = ({ position, rotation = [0, 0, 0], speed = 0.01, colors = ["#9d4edd", "#c77dff", "#7b2cbf"] }) => {
  const fan = useRef()
  const ring = useRef()

  useFrame((state) => {
    if (fan.current) {
      fan.current.rotation.z += speed
    }

    if (ring.current) {
      // Cycle through colors
      const t = (1 + Math.sin(state.clock.getElapsedTime() * 0.5)) / 2
      const colorIndex = Math.floor((state.clock.getElapsedTime() * 0.2) % colors.length)
      ring.current.material.emissive.set(colors[colorIndex])
      ring.current.material.emissiveIntensity = 2 + Math.sin(state.clock.getElapsedTime() * 2) * 0.5
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Fan ring */}
      <mesh ref={ring}>
        <torusGeometry args={[0.4, 0.05, 16, 32]} />
        <meshStandardMaterial color="#333333" emissive={colors[0]} emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Fan blades */}
      <mesh ref={fan}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color="#222222" />
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, 0, (Math.PI / 2) * i]}>
            <boxGeometry args={[0.35, 0.08, 0.02]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        ))}
      </mesh>
    </group>
  )
}

// Create RGB strip component with enhanced colors
const RGBStrip = ({
  position,
  rotation = [0, 0, 0],
  width = 2,
  segments = 10,
  colors = ["#9d4edd", "#c77dff", "#7b2cbf", "#5a189a"],
}) => {
  const refs = useRef([])

  useFrame((state) => {
    // Animate each segment with a different color
    refs.current.forEach((ref, i) => {
      if (ref) {
        const t = state.clock.getElapsedTime() * 2 + i * 0.2
        const colorIndex = Math.floor((t * 0.5) % colors.length)
        ref.material.emissive.set(colors[colorIndex])
        ref.material.emissiveIntensity = 2 + Math.sin(state.clock.getElapsedTime() + i * 0.2) * 0.5
      }
    })
  })

  return (
    <group position={position} rotation={rotation}>
      {Array.from({ length: segments }).map((_, i) => (
        <mesh
          key={i}
          position={[(i - segments / 2 + 0.5) * (width / segments), 0, 0]}
          ref={(el) => (refs.current[i] = el)}
        >
          <boxGeometry args={[width / segments - 0.05, 0.05, 0.05]} />
          <meshStandardMaterial
            color="#333333"
            emissive={colors[i % colors.length]}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

// Create a gaming PC with RGB components that matches the image
const GamingPC = ({ position }) => {
  const purpleColors = ["#9d4edd", "#c77dff", "#7b2cbf", "#5a189a"]

  return (
    <group position={position}>
      {/* PC Case */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 4, 2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Glass side panel */}
      <mesh position={[1.01, 0, 0]}>
        <planeGeometry args={[2, 4]} />
        <meshPhysicalMaterial color="#000000" transparent={true} opacity={0.3} roughness={0} metalness={0.8} />
      </mesh>

      {/* RGB Fans - matching the image with purple colors */}
      <RGBFan position={[0.6, 1, 1.01]} rotation={[0, 0, 0]} colors={purpleColors} />
      <RGBFan position={[0.6, 0, 1.01]} rotation={[0, 0, 0]} colors={purpleColors} />
      <RGBFan position={[0.6, -1, 1.01]} rotation={[0, 0, 0]} colors={purpleColors} />
    </group>
  )
}

// Create RGB keyboard with improved red and green keys as shown in the image
const RGBKeyboard = ({ position }) => {
  const keyColors = ["#ff0000", "#00ff00", "#0000ff", "#c77dff"] // Red, green, blue, and purple
  const keys = useRef([])

  useFrame((state) => {
    // Create a wave effect across the keyboard
    keys.current.forEach((key, i) => {
      if (key) {
        const t = state.clock.getElapsedTime() * 2
        const wave = Math.sin(t + i * 0.2) * 0.5 + 0.5
        // More dynamic color assignment to match the image
        const colorIndex = i % keyColors.length
        key.material.emissive.set(keyColors[colorIndex])
        key.material.emissiveIntensity = wave * 2
      }
    })
  })

  return (
    <group position={position}>
      {/* Keyboard base */}
      <mesh castShadow>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Keys - create a grid of small cubes with RGB colors */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 15 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[col * 0.18 - 1.35, 0.06, row * 0.15 - 0.4]}
            ref={(el) => {
              if (!keys.current[row * 15 + col]) {
                keys.current[row * 15 + col] = el
              }
            }}
          >
            <boxGeometry args={[0.15, 0.05, 0.12]} />
            <meshStandardMaterial
              color="#222222"
              emissive={keyColors[(row + col) % keyColors.length]} 
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
        )),
      )}
    </group>
  )
}

// Create RGB speakers with enhanced purple lighting
const RGBSpeaker = ({ position, scale = 1, colors = ["#9d4edd", "#c77dff", "#7b2cbf", "#5a189a"] }) => {
  const ring = useRef()

  useFrame((state) => {
    if (ring.current) {
      const colorIndex = Math.floor((state.clock.getElapsedTime() * 0.2) % colors.length)
      ring.current.material.emissive.set(colors[colorIndex])
      ring.current.material.emissiveIntensity = 2 + Math.sin(state.clock.getElapsedTime()) * 0.5
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Speaker body */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Speaker cone */}
      <mesh position={[0, 0, 0.41]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* RGB ring around speaker */}
      <mesh ref={ring} position={[0, 0, 0.41]}>
        <torusGeometry args={[0.3, 0.03, 16, 32]} />
        <meshStandardMaterial color="#333333" emissive={colors[0]} emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  )
}

// Create the complete gaming setup
const GamingSetup = ({ isMobile }) => {
  const group = useRef()

  // Gentle floating animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05 - 0.2
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05 - 2.5
    }
  })

  // Adjust scale based on mobile or desktop
  const scale = isMobile ? 0.35 : 0.5

  return (
    <group ref={group} scale={scale} position={[1, -1, 0]}>
      {/* Desk */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 5]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* RGB Strip on desk edge - matching the image */}
      <RGBStrip
        position={[0, -0.6, 2.45]}
        rotation={[0.1, 0, 0]}
        width={9}
        segments={20}
        colors={["#9d4edd", "#c77dff", "#7b2cbf", "#5a189a"]}
      />

      {/* Ultrawide Monitor - matching the image */}
      <group position={[0, 1, 0]}>
        {/* Monitor Frame */}
        <mesh castShadow>
          <boxGeometry args={[4, 2.2, 0.1]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* Monitor Screen */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.9, 2.1, 0.01]} />
          <meshBasicMaterial color="#1e1e1e" />
        </mesh>

        {/* Code on screen */}
        <Suspense fallback={null}>
          <CodeScreen />
        </Suspense>

        {/* Monitor Stand */}
        <mesh position={[0, -1.2, 0.5]} castShadow>
          <boxGeometry args={[0.6, 0.6, 1]} />
          <meshStandardMaterial color="#111111" />
        </mesh>

        {/* Monitor Base */}
        <mesh position={[0, -1.5, 0.8]} castShadow>
          <boxGeometry args={[1.5, 0.1, 1.5]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>

      {/* RGB Keyboard with red and green keys as in the image */}
      <RGBKeyboard position={[0, -0.3, 1.5]} />

      {/* RGB Speakers with purple lighting */}
      <RGBSpeaker position={[-1.8, -0.1, 0.5]} />
      <RGBSpeaker position={[1.8, -0.1, 0.5]} />

      {/* Gaming PC with RGB fans */}
      <GamingPC position={[4, 0.5, 0]} />
    </group>
  )
}

const CustomComputerCanvas = ({ isMobile }) => {
  return (
    <Canvas 
      frameloop="demand" 
      shadows 
      camera={{ position: [0, 0, 15], fov: 25 }} 
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      dpr={[1, 2]} // Improve rendering quality
    >
      <color attach="background" args={["#050510"]} />

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />

        {/* Enhanced lighting to match the purple ambient glow in the image */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[-5, 5, 5]} intensity={0.4} castShadow shadow-mapSize={1024} />
        <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={0.6} castShadow shadow-mapSize={1024} />
        
        {/* Purple accent lights to create the purple glow effect */}
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#9d4edd" distance={15} decay={2} />
        <pointLight position={[4, 2, 0]} intensity={1.2} color="#c77dff" distance={10} decay={2} />
        <pointLight position={[-4, 2, 0]} intensity={1.2} color="#7b2cbf" distance={10} decay={2} />
        
        {/* Additional spotlights for better illumination of the setup */}
        <spotLight 
          position={[-2, 3, 5]} 
          angle={0.5} 
          penumbra={0.8} 
          intensity={0.8} 
          color="#a594f9" 
          castShadow 
          shadow-mapSize={1024} 
        />

        {/* Gaming Setup */}
        <GamingSetup isMobile={isMobile} />

        {/* Environment to add reflections to the scene */}
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}

export default CustomComputerCanvas
