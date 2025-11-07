#!/bin/bash

# Navbar
cat > src/components/Navbar.jsx << 'EOF'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Navbar.css'

export default function Navbar() {
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 20, 0)', 'rgba(10, 10, 20, 0.95)']
  )

  return (
    <motion.nav 
      className="navbar"
      style={{ backgroundColor }}
    >
      <motion.div 
        className="nav-content"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="nav-logo">
          <span className="logo-text">Floral</span>
        </div>
        
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        
        <button className="nav-cta">Get Started</button>
      </motion.div>
    </motion.nav>
  )
}
EOF

# Hero
cat > src/components/Hero.jsx << 'EOF'
import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <Scene3D />
      
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Immersive 3D
          <br />
          <span className="gradient-text">Floral Experience</span>
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Explore the beauty of nature through cutting-edge web technology
        </motion.p>
        
        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <button className="primary-btn">Explore Now</button>
          <button className="secondary-btn">Learn More</button>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="scroll-line"></div>
          <span>Scroll to discover</span>
        </motion.div>
      </div>
    </section>
  )
}
EOF

echo "Components created successfully!"
