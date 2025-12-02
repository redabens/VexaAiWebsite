import Navbar from '../components/Navbar'
import './About.css'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

function About() {
  const { t, isRTL } = useLanguage()

  // Helper function to render text with highlights
  const renderHighlightedText = (text) => {
    if (typeof text !== 'string') return text
    const parts = text.split(/<highlight>|<\/highlight>/)
    return parts.map((part, index) => 
      index % 2 === 1 ? <span key={index} className="highlight">{part}</span> : part
    )
  }

  useEffect(() => {
    // Force scroll to top - multiple methods to ensure it works
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const root = document.getElementById('root')
    if (root) {
      root.scrollTop = 0
    }

    // Disable snap scroll on this page
    document.body.classList.add('no-snap-scroll')
    document.documentElement.classList.add('no-snap-scroll')
    root?.classList.add('no-snap')

    // Additional scroll after a short delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo(0, 0)
      if (root) root.scrollTop = 0
    }, 0)

    return () => {
      // Re-enable snap scroll when leaving this page
      root?.classList.remove('no-snap')
      document.body.classList.remove('no-snap-scroll')
      document.documentElement.classList.remove('no-snap-scroll')
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className={`about-page ${isRTL ? 'rtl' : ''}`}>
        <motion.div
          className="about-hero"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src="/aboutUsPics/whoarewe.png" alt="Who Are We" className="hero-image" loading="eager" />
        </motion.div>

        <div className="about-content">
          <motion.p
            className="intro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {renderHighlightedText(t('about.intro1'))}
          </motion.p>
          <motion.p
            className="intro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {renderHighlightedText(t('about.intro2'))}
          </motion.p>
          <motion.p
            className="intro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {renderHighlightedText(t('about.intro3'))}
          </motion.p>
        </div>

        {/* Mission and Story Section */}
        <div className="mission-story-section">
          <div className="mission-card">
            <motion.img
              src="/aboutUsPics/ourmission.png"
              alt="Our Mission"
              className="section-image"
              loading="lazy"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            />
            <motion.div
              className="section-text"
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p>
                {renderHighlightedText(t('about.mission1'))}
              </p>
              <p>
                {renderHighlightedText(t('about.mission2'))}
              </p>
            </motion.div>
          </div>

          <div className="story-card">
            <motion.div
              className="section-text"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <p>
                {renderHighlightedText(t('about.story1'))}
              </p>
              <p>
                {renderHighlightedText(t('about.story2'))}
              </p>
              <p>
                {renderHighlightedText(t('about.story3'))}
              </p>
            </motion.div>
            <motion.img
              src="/aboutUsPics/ourstory.png"
              alt="Our Story"
              className="section-image"
              loading="lazy"
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cta-heading">{t('about.ctaHeading')}</h2>
          <p className="cta-subtext">{t('about.ctaSubtext')}</p>
          <Link to="/contact" className="cta-button">
            {t('about.ctaButton')}
          </Link>
        </motion.div>
      </div>
    </>
  )
}

export default About
