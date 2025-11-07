import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-section" id="contact">
      <div className="footer-content">
        <motion.div 
          className="footer-main"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="footer-title">
            Let's Create Something
            <br />
            <span className="gradient-text">Beautiful Together</span>
          </h2>
          <button className="footer-cta">Get in Touch</button>
        </motion.div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#home" className="footer-link">Home</a>
            <a href="#about" className="footer-link">About</a>
            <a href="#experience" className="footer-link">Experience</a>
            <a href="https://github.com" className="footer-link">GitHub</a>
            <a href="https://twitter.com" className="footer-link">Twitter</a>
          </div>
          
          <p className="footer-copy">
            © 2024 Floral Experience. Crafted with Three.js & React
          </p>
        </div>
      </div>
    </footer>
  )
}
