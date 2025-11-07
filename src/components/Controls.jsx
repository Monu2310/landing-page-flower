import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Controls.css'

export default function Controls() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    bloomIntensity: 0.5,
    rotationSpeed: 1,
    particlesEnabled: true,
    autoRotate: true,
    colorScheme: 'pink'
  })

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    window.dispatchEvent(new CustomEvent('settingsChange', { 
      detail: { ...settings, [key]: value } 
    }))
  }

  return (
    <div className="controls-container">
      <motion.button
        className="controls-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="controls-icon">⚙️</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="controls-panel"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <h3 className="controls-title">Scene Controls</h3>
            
            <div className="control-group">
              <label>Bloom Intensity</label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={settings.bloomIntensity}
                onChange={(e) => handleChange('bloomIntensity', parseFloat(e.target.value))}
              />
              <span className="control-value">{settings.bloomIntensity.toFixed(1)}</span>
            </div>

            <div className="control-group">
              <label>Rotation Speed</label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={settings.rotationSpeed}
                onChange={(e) => handleChange('rotationSpeed', parseFloat(e.target.value))}
              />
              <span className="control-value">{settings.rotationSpeed.toFixed(1)}</span>
            </div>

            <div className="control-group">
              <label>Particles</label>
              <button
                className={`toggle-btn ${settings.particlesEnabled ? 'active' : ''}`}
                onClick={() => handleChange('particlesEnabled', !settings.particlesEnabled)}
              >
                {settings.particlesEnabled ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="control-group">
              <label>Auto Rotate</label>
              <button
                className={`toggle-btn ${settings.autoRotate ? 'active' : ''}`}
                onClick={() => handleChange('autoRotate', !settings.autoRotate)}
              >
                {settings.autoRotate ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="control-group">
              <label>Color Scheme</label>
              <div className="color-options">
                {['pink', 'purple', 'blue', 'rainbow'].map(color => (
                  <button
                    key={color}
                    className={`color-btn ${settings.colorScheme === color ? 'active' : ''}`}
                    onClick={() => handleChange('colorScheme', color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
