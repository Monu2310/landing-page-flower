import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import './About.css'

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [150, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9])

  const features = [
    {
      icon: "🌸",
      title: "3D Rendering",
      description: "Real-time 3D graphics powered by Three.js"
    },
    {
      icon: "✨",
      title: "Particle Effects",
      description: "Dynamic particle systems that respond to interaction"
    },
    {
      icon: "🎨",
      title: "Custom Shaders",
      description: "Beautiful visual effects with GLSL shaders"
    },
    {
      icon: "��",
      title: "Animations",
      description: "Smooth, physics-based animations throughout"
    }
  ]

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <motion.div 
        className="about-content"
        style={{ opacity, scale }}
      >
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About
          </motion.span>
          <h2 className="section-title">
            Where Art Meets
            <br />
            <span className="gradient-text">Technology</span>
          </h2>
          <p className="section-description">
            Experience the perfect blend of natural beauty and digital innovation.
            Our 3D flower visualization pushes the boundaries of what's possible in the browser.
          </p>
        </motion.div>

        <motion.div 
          className="features-grid"
          style={{ y }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 100, rotateX: -45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                perspective: 1000
              }}
            >
              <motion.span 
                className="feature-icon"
                whileHover={{ scale: 1.2, rotateZ: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
