import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Parallax from './components/Parallax'
import Controls from './components/Controls'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import './App.css'

function App() {
  const lenisRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial load with minimum duration
    const minLoadTime = 4500 // Ensure users see the loader
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, minLoadTime)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Initialize Lenis smooth scroll after loading
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      })

      lenisRef.current = lenis

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
      }
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader />}
      <div className="app" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s' }}>
        <CustomCursor />
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Parallax />
        <Controls />
        <Footer />
      </div>
    </>
  )
}

export default App
