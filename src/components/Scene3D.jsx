import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import './Scene3D.css'

function Petal({ position, rotation, color, scale = 1 }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 0.6, 0, Math.PI]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Flower({ colorScheme, mouseX, mouseY, scrollY }) {
  const groupRef = useRef()
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(1)

  useEffect(() => {
    const handleSettings = (e) => {
      if (e.detail.autoRotate !== undefined) setAutoRotate(e.detail.autoRotate)
      if (e.detail.rotationSpeed !== undefined) setRotationSpeed(e.detail.rotationSpeed)
    }
    window.addEventListener('settingsChange', handleSettings)
    return () => window.removeEventListener('settingsChange', handleSettings)
  }, [])

  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005 * rotationSpeed
    }
    
    // Gentle floating animation + scroll parallax
    if (groupRef.current) {
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      const scrollOffset = (scrollY || 0) * 0.01 // Convert CSS pixels to 3D units
      groupRef.current.position.y = floatY + scrollOffset
      
      // Increased parallax effect based on mouse position (0.21 → 0.3)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY * 0.3,
        0.05
      )
      if (!autoRotate) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mouseX * 0.3,
          0.05
        )
      }
    }
  })

  const getColor = () => {
    switch (colorScheme) {
      case 'pink': return '#ff69b4'
      case 'purple': return '#9370db'
      case 'blue': return '#4169e1'
      case 'sunset': return '#ff6b6b'
      case 'forest': return '#2ecc71'
      case 'neon': return '#00ff88'
      case 'midnight': return '#6366f1'
      case 'rose': return '#f4c2c2'
      case 'rainbow': return '#ff1493'
      default: return '#ff69b4'
    }
  }

  const petalColor = getColor()
  const petals = []
  const numPetals = 8

  // Outer layer petals - properly rotated
  for (let i = 0; i < numPetals; i++) {
    const angle = (i / numPetals) * Math.PI * 2
    const x = Math.cos(angle) * 0.65
    const y = Math.sin(angle) * 0.65
    const z = 0
    
    petals.push(
      <Petal
        key={`outer-${i}`}
        position={[x, y, z]}
        rotation={[Math.PI / 2, 0, angle + Math.PI / 2]}
        color={petalColor}
        scale={1}
      />
    )
  }

  return (
    <group ref={groupRef}>
      {petals}
      
      {/* Middle layer petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 8
        const x = Math.cos(angle) * 0.4
        const y = Math.sin(angle) * 0.4
        return (
          <Petal
            key={`middle-${i}`}
            position={[x, y, 0.1]}
            rotation={[Math.PI / 2, 0, angle + Math.PI / 2]}
            color={petalColor}
            scale={0.7}
          />
        )
      })}
      
      {/* Center of flower */}
      <mesh position={[0, 0, 0.15]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color="#ffd700" 
          emissive="#ffeb3b" 
          emissiveIntensity={0.8}
          roughness={0.4}
        />
      </mesh>
      
      {/* Center stamens */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const x = Math.cos(angle) * 0.08
        const y = Math.sin(angle) * 0.08
        return (
          <mesh
            key={`stamen-${i}`}
            position={[x, y, 0.2]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial 
              color="#ff6b35" 
              emissive="#ff6b35"
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function Particles({ enabled, mouseX, mouseY, color }) {
  const particlesRef = useRef()
  const count = 2000

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [])

  const velocities = useMemo(() => {
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    return velocities
  }, [])

  useFrame(() => {
    if (particlesRef.current && enabled) {
      particlesRef.current.rotation.y += 0.0003
      
      // Increased parallax effect on particles (0.07 → 0.1)
      particlesRef.current.rotation.x = THREE.MathUtils.lerp(
        particlesRef.current.rotation.x,
        mouseY * 0.1,
        0.02
      )
      particlesRef.current.rotation.y += mouseX * 0.0001
      
      const positions = particlesRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]
        
        // Wrap around boundaries
        if (Math.abs(positions[i3]) > 15) velocities[i3] *= -1
        if (Math.abs(positions[i3 + 1]) > 15) velocities[i3 + 1] *= -1
        if (Math.abs(positions[i3 + 2]) > 15) velocities[i3 + 2] *= -1
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  if (!enabled) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        color={color || "#ffffff"} 
        transparent 
        opacity={0.7}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Butterfly({ mouseX, mouseY, color }) {
  const butterflyRef = useRef()
  
  useFrame((state) => {
    if (butterflyRef.current) {
      const t = state.clock.elapsedTime
      // Increased butterfly parallax (1.4 → 2.0)
      butterflyRef.current.position.x = Math.sin(t * 0.5) * 3 + mouseX * 2.0
      butterflyRef.current.position.y = Math.sin(t * 0.7) * 2 + 1 + mouseY * 2.0
      butterflyRef.current.position.z = Math.cos(t * 0.5) * 3
      butterflyRef.current.rotation.y = Math.sin(t * 0.5) * Math.PI
    }
  })
  
  return (
    <group ref={butterflyRef}>
      {/* Left wing */}
      <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.sin(Date.now() * 0.01) * 0.3]}>
        <sphereGeometry args={[0.1, 16, 16, 0, Math.PI]} />
        <meshStandardMaterial 
          color={color || "#ff69b4"} 
          emissive={color || "#ff1493"}
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Right wing */}
      <mesh position={[0.15, 0, 0]} rotation={[0, Math.PI, Math.sin(Date.now() * 0.01) * 0.3]}>
        <sphereGeometry args={[0.1, 16, 16, 0, Math.PI]} />
        <meshStandardMaterial 
          color={color || "#ff69b4"} 
          emissive={color || "#ff1493"}
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.2]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  )
}

function CameraController({ mouseX, mouseY }) {
  const { camera } = useThree()
  
  useFrame(() => {
    // Smooth camera parallax with increased intensity (0.35 → 0.5)
    const targetX = mouseX * 0.5
    const targetY = mouseY * 0.5
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

function Scene({ settings, scrollY }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to -1 to 1
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Get primary color - always pink
  const primaryColor = '#ff69b4'

  return (
    <>
      <CameraController mouseX={mousePosition.x} mouseY={mousePosition.y} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color={primaryColor} />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color={primaryColor} />
      <pointLight position={[0, 5, -5]} intensity={1} color={primaryColor} />
      <spotLight position={[0, 10, 5]} intensity={0.8} angle={0.3} penumbra={1} color="#ffffff" />
      
      <Flower 
        colorScheme={settings.colorScheme} 
        mouseX={mousePosition.x}
        mouseY={mousePosition.y}
        scrollY={scrollY}
      />
      <Particles 
        enabled={settings.particlesEnabled}
        mouseX={mousePosition.x}
        mouseY={mousePosition.y}
        color="#ffffff"
      />
      <Butterfly 
        mouseX={mousePosition.x}
        mouseY={mousePosition.y}
        color={primaryColor}
      />
      
      <EffectComposer>
        <Bloom 
          intensity={settings.bloomIntensity} 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default function Scene3D({ flowerY }) {
  const [settings, setSettings] = useState({
    bloomIntensity: 0.5,
    particlesEnabled: true,
    colorScheme: 'pink'
  })

  useEffect(() => {
    const handleSettings = (e) => {
      setSettings(prev => ({ ...prev, ...e.detail }))
    }
    window.addEventListener('settingsChange', handleSettings)
    return () => window.removeEventListener('settingsChange', handleSettings)
  }, [])

  return (
    <div className="scene-container">
      <Canvas 
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 7], fov: 75 }}
      >
        <Scene settings={settings} scrollY={flowerY?.get?.()} />
      </Canvas>
    </div>
  )
}
