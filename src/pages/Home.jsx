import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Values from '../components/Values'
import Process from '../components/Process'
import Impact from '../components/Impact'
import Partners from '../components/Partners'
import { useState, useEffect, lazy, Suspense } from 'react'

const HumanoidSection = lazy(() => import('../components/HumanoidSection'))

function Home() {
  const [svgLoaded, setSvgLoaded] = useState(false)

  useEffect(() => {
    // Set SVG as loaded after a short delay
    const timer = setTimeout(() => {
      setSvgLoaded(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="hero-section-wrapper">
        <Navbar />
        {svgLoaded && (
          <div className="background-svg-container">
            <object
              data="/background.svg"
              type="image/svg+xml"
              aria-label="Background decoration"
            >
              {/* Fallback */}
              <img
                src="/background.svg"
                alt="Background decoration"
              />
            </object>
          </div>
        )}
        <Hero />
      </div>
      <Process />
      {/* <Impact /> */}
      <Suspense fallback={<div style={{ height: '300vh' }} />}>
        <HumanoidSection />
      </Suspense>
      <Partners />
    </>
  )
}

export default Home
