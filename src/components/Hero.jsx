import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import './Hero.css'

const LoadingScreen = lazy(() => import('./LoadingScreen'))

function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { t, isRTL } = useLanguage()
  const images = ['/showcase.png', '/showcase2.png']

  useEffect(() => {
    // Minimum loading time to show one full animation cycle (3 seconds)
    const minLoadingTime = 3000
    const startTime = Date.now()

    // Preload images
    const imagePromises = images.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = resolve
        img.onerror = reject
        // Add timeout for individual images (2.5 seconds each)
        setTimeout(() => reject(new Error('Image load timeout')), 2500)
      })
    })

    // Wait for all images to load AND minimum animation time
    Promise.all(imagePromises)
      .then(() => {
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minLoadingTime - elapsed)

        // Wait for remaining time to complete one full animation cycle
        setTimeout(() => {
          setIsLoading(false)
        }, remainingTime)
      })
      .catch((error) => {
        console.error('Error loading images:', error)
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minLoadingTime - elapsed)

        // Still wait for full animation even if images fail
        setTimeout(() => {
          setIsLoading(false)
        }, remainingTime)
      })

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 2)
    }, 3000) // Change image every 3 seconds

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Suspense fallback={<div />}>
        <LoadingScreen isLoading={isLoading} />
      </Suspense>
      <section className={`hero ${isRTL ? 'rtl' : ''}`}>
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ y: 30, opacity: 0 }}
            animate={!isLoading ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 1,
              ease: [0.6, 0.05, 0.01, 0.9],
              delay: 0.3
            }}
          >
            <h1 className="hero-title">
              {t('hero.title')}<br />
              {t('hero.titleLine2')}
            </h1>
            <p className="hero-subtitle">
              {t('hero.subtitle')}<br />
              {t('hero.subtitleLine2')}
            </p>
          </motion.div>

          <motion.div
            className="hero-image"
            initial={{ y: 30, opacity: 0 }}
            animate={!isLoading ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 1,
              ease: [0.6, 0.05, 0.01, 0.9],
              delay: 0.5
            }}
          >
            <img
              src={images[0]}
              alt="Vexxai Showcase"
              className={currentImage === 0 ? 'active' : 'inactive'}
              loading="eager"
            />
            <img
              src={images[1]}
              alt="Vexxai Showcase"
              className={currentImage === 1 ? 'active' : 'inactive'}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <div className={`hero-buttons ${isRTL ? 'rtl' : ''}`}>
        <Link to="/contact">
          <button className="hero-btn">{t('hero.getStarted')}</button>
        </Link>
        <Link to="/services">
          <button className="hero-btn hero-btn-secondary">{t('hero.areas')}</button>
        </Link>
      </div>

      <section className={`hero-tagline ${isRTL ? 'rtl' : ''}`}>
        <p className="tagline-line1">{t('hero.tagline1')}</p>
        <p className="tagline-line2">{t('hero.tagline2')}</p>
        <p className="tagline-line3">{t('hero.tagline3')}</p>
      </section>
    </>
  )
}

export default Hero
