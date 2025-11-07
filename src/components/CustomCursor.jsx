import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRefs = useRef([])
  const [isPointer, setIsPointer] = useState(false)
  
  useEffect(() => {
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let velocity = 0
    let lastX = 0
    let lastY = 0

    // Create trail elements
    const trails = []
    for (let i = 0; i < 12; i++) {
      const trail = document.createElement('div')
      trail.className = 'cursor-trail'
      trail.style.zIndex = 9999 - i
      document.body.appendChild(trail)
      trails.push({
        element: trail,
        x: 0,
        y: 0,
        scale: 1 - (i * 0.08),
        speed: 0.08 + (i * 0.02)
      })
      trailRefs.current.push(trail)
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Calculate velocity for morphing effect
      const dx = mouseX - lastX
      const dy = mouseY - lastY
      velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.5, 30)
      lastX = mouseX
      lastY = mouseY
      
      // Check if hovering over interactive elements
      const target = e.target
      const isInteractive = target.closest('a, button, input, [role="button"], .btn')
      setIsPointer(!!isInteractive)
    }

    const animate = () => {
      // Main cursor follows mouse
      const speed = 0.2
      cursorX += (mouseX - cursorX) * speed
      cursorY += (mouseY - cursorY) * speed

      if (cursorRef.current) {
        // Morphing effect based on velocity
        const scaleX = 1 + velocity * 0.03
        const scaleY = 1 - velocity * 0.02
        const rotation = velocity * 2
        
        cursorRef.current.style.transform = `
          translate3d(${cursorX}px, ${cursorY}px, 0) 
          scaleX(${scaleX}) 
          scaleY(${scaleY})
          rotate(${rotation}deg)
        `
      }

      // Animate trail particles
      trails.forEach((trail, index) => {
        trail.x += (cursorX - trail.x) * trail.speed
        trail.y += (cursorY - trail.y) * trail.speed
        
        const delay = index * 0.03
        const opacity = 0.6 - (index * 0.05)
        
        trail.element.style.transform = `
          translate3d(${trail.x}px, ${trail.y}px, 0) 
          scale(${trail.scale})
        `
        trail.element.style.opacity = isPointer ? opacity * 1.5 : opacity
      })

      // Decay velocity
      velocity *= 0.9

      requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      trailRefs.current.forEach(trail => trail.remove())
      trailRefs.current = []
    }
  }, [])

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor ${isPointer ? 'is-hovering' : ''}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path 
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
