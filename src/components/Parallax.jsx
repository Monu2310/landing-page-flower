import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Parallax.css'

export default function Parallax() {
  const sectionRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  return (
    <section className="parallax-section" ref={sectionRef}>
      <motion.div 
        className="parallax-content"
        style={{ opacity }}
      >
        <motion.div 
          className="parallax-layer layer-1"
          style={{ y: y1, scale }}
        >
          <div className="floating-shape shape-1">🌺</div>
        </motion.div>
        
        <motion.div 
          className="parallax-layer layer-2"
          style={{ y: y2 }}
        >
          <h2 className="parallax-title">
            Beauty in
            <br />
            <span className="gradient-text">Motion</span>
          </h2>
          <p className="parallax-text">
            Every element responds to your scroll
          </p>
        </motion.div>
        
        <motion.div 
          className="parallax-layer layer-3"
          style={{ y: y3, scale }}
        >
          <div className="floating-shape shape-2">🦋</div>
        </motion.div>
      </motion.div>
    </section>
  )
}
