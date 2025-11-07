import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ColorPalette.css'

const colorSchemes = [
  {
    id: 'pink',
    name: 'Sakura',
    colors: ['#ff69b4', '#ff1493', '#ffb6c1', '#ff85c1'],
    primary: '#ff69b4'
  },
  {
    id: 'purple',
    name: 'Lavender',
    colors: ['#9370db', '#8a2be2', '#dda0dd', '#ba55d3'],
    primary: '#9370db'
  },
  {
    id: 'blue',
    name: 'Ocean',
    colors: ['#4169e1', '#1e90ff', '#87ceeb', '#6495ed'],
    primary: '#4169e1'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    colors: ['#ff6b6b', '#ff8e53', '#ffd93d', '#ff4757'],
    primary: '#ff6b6b'
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: ['#2ecc71', '#27ae60', '#6ee7b7', '#10b981'],
    primary: '#2ecc71'
  },
  {
    id: 'neon',
    name: 'Neon',
    colors: ['#00ff88', '#00ffff', '#ff00ff', '#ffff00'],
    primary: '#00ff88'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    colors: ['#6366f1', '#8b5cf6', '#a78bfa', '#c084fc'],
    primary: '#6366f1'
  },
  {
    id: 'rose',
    name: 'Rose Gold',
    colors: ['#f4c2c2', '#d4a5a5', '#ffb6c1', '#ff69b4'],
    primary: '#f4c2c2'
  }
]

export default function ColorPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedScheme, setSelectedScheme] = useState('pink')
  const [hoveredScheme, setHoveredScheme] = useState(null)

  const handleSchemeChange = (schemeId) => {
    setSelectedScheme(schemeId)
    const scheme = colorSchemes.find(s => s.id === schemeId)
    window.dispatchEvent(new CustomEvent('settingsChange', {
      detail: { colorScheme: schemeId }
    }))
    
    // Update cursor color
    document.documentElement.style.setProperty('--cursor-color', scheme.primary)
  }

  const currentScheme = colorSchemes.find(s => s.id === selectedScheme)

  return (
    <div className="color-palette-container">
      <motion.button
        className="palette-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ background: currentScheme.primary }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
          <line x1="12" y1="2" x2="12" y2="4"/>
          <line x1="12" y1="20" x2="12" y2="22"/>
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/>
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/>
        </svg>
        <span className="trigger-label">Colors</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="palette-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="palette-panel"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="palette-header">
                <h3>Color Palette</h3>
                <button 
                  className="palette-close"
                  onClick={() => setIsOpen(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="palette-content">
                <p className="palette-subtitle">Choose your theme</p>
                
                <div className="schemes-grid">
                  {colorSchemes.map((scheme) => (
                    <motion.div
                      key={scheme.id}
                      className={`scheme-card ${selectedScheme === scheme.id ? 'active' : ''}`}
                      onClick={() => handleSchemeChange(scheme.id)}
                      onMouseEnter={() => setHoveredScheme(scheme.id)}
                      onMouseLeave={() => setHoveredScheme(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="scheme-colors">
                        {scheme.colors.map((color, index) => (
                          <motion.div
                            key={index}
                            className="color-swatch"
                            style={{ backgroundColor: color }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          />
                        ))}
                      </div>
                      <div className="scheme-info">
                        <span className="scheme-name">{scheme.name}</span>
                        {selectedScheme === scheme.id && (
                          <motion.div
                            className="active-indicator"
                            layoutId="activeIndicator"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {hoveredScheme && (
                  <motion.div
                    className="scheme-preview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div 
                      className="preview-swatch"
                      style={{
                        background: colorSchemes.find(s => s.id === hoveredScheme)?.primary
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
