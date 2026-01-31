"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

// Floating geometric shapes that respond to mouse
function FloatingGeometry({
  position,
  color,
  scale = 1,
  speed = 1,
  rotationIntensity = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
  rotationIntensity?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime * speed
    meshRef.current.rotation.x = Math.sin(time * 0.3) * rotationIntensity
    meshRef.current.rotation.y = Math.cos(time * 0.2) * rotationIntensity
  })

  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial color={color} speed={2} distort={0.3} roughness={0.4} metalness={0.8} />
      </mesh>
    </Float>
  )
}

// Animated particles system
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 500

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const primaryColor = new THREE.Color("#3399ff")
    const accentColor = new THREE.Color("#ff6b1a")

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Spread particles in a spherical volume
      const radius = 15 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Mix between primary and accent colors
      const mixFactor = Math.random()
      const color = primaryColor.clone().lerp(accentColor, mixFactor)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Animated wireframe torus
function WireframeTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })

  return (
    <mesh ref={meshRef} position={[6, 2, -8]}>
      <torusGeometry args={[2, 0.5, 16, 50]} />
      <meshBasicMaterial color="#3399ff" wireframe opacity={0.3} transparent />
    </mesh>
  )
}

// Animated wireframe octahedron
function WireframeOctahedron() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
  })

  return (
    <mesh ref={meshRef} position={[-7, -2, -10]}>
      <octahedronGeometry args={[2.5]} />
      <meshBasicMaterial color="#ff6b1a" wireframe opacity={0.25} transparent />
    </mesh>
  )
}

// Glowing sphere in center
function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <MeshDistortMaterial color="#3399ff" speed={3} distort={0.4} roughness={0.2} metalness={0.9} emissive="#3399ff" emissiveIntensity={0.2} />
    </mesh>
  )
}

// Mouse-following light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!lightRef.current) return
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      lightRef.current.position.x = x * viewport.width * 0.5
      lightRef.current.position.y = y * viewport.height * 0.5
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [viewport])

  return <pointLight ref={lightRef} color="#3399ff" intensity={0.5} distance={20} position={[0, 0, 5]} />
}

// Camera controller for subtle mouse parallax
function CameraController() {
  const { camera } = useThree()
  const targetPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      targetPosition.current = { x: x * 0.5, y: y * 0.3 }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame(() => {
    camera.position.x += (targetPosition.current.x - camera.position.x) * 0.02
    camera.position.y += (targetPosition.current.y - camera.position.y) * 0.02
    camera.lookAt(0, 0, -5)
  })

  return null
}

// Main scene content
function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} color="#ffffff" />

      {/* Mouse-following light */}
      <MouseLight />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />

      {/* Particle field */}
      <ParticleField />

      {/* Central glowing sphere */}
      <CentralSphere />

      {/* Floating geometric shapes */}
      <FloatingGeometry position={[-4, 3, -8]} color="#3399ff" scale={0.8} speed={1.2} rotationIntensity={0.8} />
      <FloatingGeometry position={[5, -2, -10]} color="#ff6b1a" scale={0.6} speed={0.8} rotationIntensity={1.2} />
      <FloatingGeometry position={[-6, -3, -12]} color="#3399ff" scale={0.5} speed={1.5} rotationIntensity={0.6} />
      <FloatingGeometry position={[3, 4, -15]} color="#ff6b1a" scale={0.4} speed={1} rotationIntensity={1} />

      {/* Wireframe shapes */}
      <WireframeTorus />
      <WireframeOctahedron />

      {/* Camera parallax controller */}
      <CameraController />
    </>
  )
}

// Check if device can handle 3D
function useCanRender3D() {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    // Check for WebGL support and device capabilities
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        if (!gl) return false

        // Check for mobile/low-end devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false

        // Disable on mobile for performance
        if (isMobile) return false

        // Check for reduced motion preference
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false

        return true
      } catch {
        return false
      }
    }

    setCanRender(checkWebGL())
  }, [])

  return canRender
}

// Fallback gradient background for mobile/low-end devices
function FallbackBackground() {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(51, 153, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(255, 107, 26, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(51, 153, 255, 0.05) 0%, transparent 70%),
            hsl(240 10% 4%)
          `,
        }}
      />
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3399ff]/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ff6b1a]/10 rounded-full blur-3xl animate-pulse-slow delay-500" />
    </div>
  )
}

// Main export component
export default function HeroScene() {
  const canRender3D = useCanRender3D()

  if (!canRender3D) {
    return <FallbackBackground />
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        style={{ background: "#0a0a0f" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
