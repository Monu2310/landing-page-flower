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
