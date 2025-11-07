import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import './Experience.css'

export default function Experience() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5])
  
  const experiences = [
    {
      year: "2024",
      title: "Advanced Rendering",
      description: "Implemented real-time rendering with advanced lighting",
      icon: "🎨"
    },
    {
      year: "2024",
      title: "Interactive Physics",
      description: "Added realistic physics for petal movement",
      icon: "⚡"
    },
    {
      year: "2024",
      title: "Performance Optimization",
      description: "Optimized to achieve 60fps on all devices",
      icon: "🚀"
    }
  ]

  return (
    <section className="experience-section" ref={sectionRef} id="experience">
      <motion.div 
        className="experience-background"
        style={{ y: backgroundY, opacity: 0.1 }}
      />
      <motion.div 
        className="experience-content"
        style={{ opacity }}
      >
        <motion.div 
          className="experience-header"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience
          </motion.span>
          <h2 className="section-title">
            Innovation in
            <br />
            <span className="gradient-text">Every Detail</span>
          </h2>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -100, rotateY: -45 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.25,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{
                scale: 1.02,
                x: 10,
                transition: { duration: 0.3 }
              }}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              <motion.div 
                className="timeline-marker"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.25 + 0.3 }}
              >
                <motion.div 
                  className="marker-dot"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="marker-ring"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              <motion.div 
                className="timeline-content"
                whileHover={{
                  x: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.span 
                  className="timeline-icon"
                  animate={{
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                >
                  {exp.icon}
                </motion.span>
                <span className="timeline-year">{exp.year}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <p className="timeline-description">{exp.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
