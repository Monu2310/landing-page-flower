import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion'
import Scene3D from './Scene3D'
import './Hero.css'

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { scrollY } = useScroll()

  // Scroll-based parallax - text moves faster than flower
  const textY = useTransform(scrollY, [0, 500], [0, -150])
  const flowerY = useTransform(scrollY, [0, 500], [0, -50])
  const flowerOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0])

  // 30% reduction from original values
  // Title: ±30/20 → ±21/14
  const titleX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-21, 21]), { damping: 25, stiffness: 150 })
  const titleY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-14, 14]), { damping: 25, stiffness: 150 })

  // Subtitle: ±15/10 → ±10.5/7
  const subtitleX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10.5, 10.5]), { damping: 25, stiffness: 150 })
  const subtitleY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-7, 7]), { damping: 25, stiffness: 150 })

  // Buttons: ±10/5 → ±7/3.5
  const buttonX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { damping: 25, stiffness: 150 })
  const buttonY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-3.5, 3.5]), { damping: 25, stiffness: 150 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="hero" id="home">
      <motion.div style={{ opacity: flowerOpacity }}>
        <Scene3D flowerY={flowerY} />
      </motion.div>
      <motion.div className="hero-content" style={{ y: textY }}>
        <motion.h1 
          className="hero-title"
          style={{ x: titleX, y: titleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Blooming in <span className="accent-text">3D</span>
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          style={{ x: subtitleX, y: subtitleY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Experience the beauty of nature through interactive digital art
        </motion.p>
        <motion.div 
          className="hero-buttons"
          style={{ x: buttonX, y: buttonY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a href="#about" className="btn btn-primary">Explore More</a>
          <a href="#experience" className="btn btn-secondary">View Gallery</a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll to explore</p>
      </motion.div>
    </section>
  )
}
