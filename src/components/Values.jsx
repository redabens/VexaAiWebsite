import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import './Values.css'

function Values() {
  const [selectedValue, setSelectedValue] = useState(0)
  const sectionRef = useRef(null)
  const isScrollingRef = useRef(false)
  const isLockedRef = useRef(false)
  const { t, isRTL } = useLanguage()

  const valuesData = t('values.items')
  
  const gradients = [
    'radial-gradient(circle at 30% 50%, #FF6B6B, #4ECDC4, #45B7D1)',
    'radial-gradient(circle at 70% 50%, #A8E6CF, #FFD93D, #FF6B9D)',
    'radial-gradient(circle at 50% 30%, #C56CF0, #FF6348, #FFBE76)',
    'radial-gradient(circle at 40% 60%, #3498DB, #9B59B6, #E74C3C)',
    'radial-gradient(circle at 60% 40%, #F39C12, #E67E22, #D35400)',
    'radial-gradient(circle at 50% 50%, #2ECC71, #3498DB, #9B59B6)'
  ]

  const values = valuesData.map((item, index) => ({
    id: index + 1,
    title: item.title,
    problem: item.problem,
    solution: item.solution,
    gradient: gradients[index]
  }))

  // Handle scroll hijacking for the section
  useEffect(() => {
    if (!sectionRef.current) return

    const handleWheel = (e) => {
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const windowHeight = window.innerHeight
      
      // Check if section is roughly centered in viewport (with tolerance)
      const isSectionInView = sectionTop <= 100 && sectionBottom >= windowHeight - 100

      // If we're scrolling down and approaching the section
      if (e.deltaY > 0 && sectionTop > 0 && sectionTop < windowHeight * 0.5 && !isLockedRef.current) {
        // Snap to section
        e.preventDefault()
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        isLockedRef.current = true
        setSelectedValue(0)
        return
      }

      // If section is in view and locked
      if (isSectionInView || isLockedRef.current) {
        // Debounce to prevent rapid scrolling
        if (isScrollingRef.current) {
          e.preventDefault()
          return
        }

        // Scroll down - next value
        if (e.deltaY > 0) {
          if (selectedValue < values.length - 1) {
            e.preventDefault()
            isScrollingRef.current = true
            setSelectedValue(prev => prev + 1)
            
            setTimeout(() => {
              isScrollingRef.current = false
            }, 500)
          } else {
            // At last item, unlock and allow normal scroll
            isLockedRef.current = false
          }
        }
        // Scroll up - previous value
        else if (e.deltaY < 0) {
          if (selectedValue > 0) {
            e.preventDefault()
            isScrollingRef.current = true
            setSelectedValue(prev => prev - 1)
            
            setTimeout(() => {
              isScrollingRef.current = false
            }, 500)
          } else {
            // At first item, unlock and allow normal scroll
            isLockedRef.current = false
          }
        }
      }
    }

    // Handle touch events for mobile
    let touchStartY = 0
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    
    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionBottom = rect.bottom
      const windowHeight = window.innerHeight
      
      const isSectionInView = sectionTop <= 100 && sectionBottom >= windowHeight - 100

      if (isSectionInView || isLockedRef.current) {
        if (isScrollingRef.current) {
          e.preventDefault()
          return
        }

        // Swipe up (scroll down)
        if (deltaY > 50) {
          if (selectedValue < values.length - 1) {
            e.preventDefault()
            isScrollingRef.current = true
            setSelectedValue(prev => prev + 1)
            touchStartY = touchY
            
            setTimeout(() => {
              isScrollingRef.current = false
            }, 500)
          } else {
            isLockedRef.current = false
          }
        }
        // Swipe down (scroll up)
        else if (deltaY < -50) {
          if (selectedValue > 0) {
            e.preventDefault()
            isScrollingRef.current = true
            setSelectedValue(prev => prev - 1)
            touchStartY = touchY
            
            setTimeout(() => {
              isScrollingRef.current = false
            }, 500)
          } else {
            isLockedRef.current = false
          }
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [selectedValue, values.length])

  // Reset lock when scrolling away from section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // If section is completely out of view, reset
      if (rect.bottom < 0 || rect.top > windowHeight) {
        isLockedRef.current = false
        setSelectedValue(0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cleanup
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <section className={`values ${isRTL ? 'rtl' : ''}`} ref={sectionRef}>
      <div className="values-container">
        <motion.div
          className="values-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="values-title">{t('values.title')}</h2>
        </motion.div>

        <div className="values-layout">
          {/* Left side - Values list */}
          <motion.div
            className="values-list"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                className={`value-item ${selectedValue === index ? 'active' : ''}`}
                onClick={() => setSelectedValue(index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {selectedValue === index && (
                  <div
                    className="value-item-background"
                    style={{ background: value.gradient }}
                  />
                )}
                <div className="value-item-overlay"></div>
                <h3 className="value-item-title">{value.title}</h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Description */}
          <motion.div
            className="values-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="values-content-wrapper">
              <motion.div
                key={selectedValue}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="value-description-box"
              >
                <div>
                  <h3 className="value-description-title">
                    {values[selectedValue].title}
                  </h3>
                  <p className="value-problem">
                    <span className="problem-label">{t('values.problemLabel')}</span> {values[selectedValue].problem}
                  </p>
                  <p className="value-solution">
                    <span className="solution-label">{t('values.solutionLabel')}</span> {values[selectedValue].solution}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="values-cta"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="values-cta-text">{t('values.ctaText')}</p>
                <a href="/contact" className="values-cta-button">{t('values.ctaButton')}</a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Values
