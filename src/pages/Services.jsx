import Navbar from '../components/Navbar'
import Values from '../components/Values'
import './Services.css'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

function Services() {
  const { t, isRTL } = useLanguage()
  
  const serviceCards = t('services.cards')
  
  const iconColors = ['blue', 'orange', 'green', 'orange-dark', 'blue-dark', 'pink']
  
  const icons = [
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeWidth="2" />
      <path d="M3 9h18" stroke="white" strokeWidth="2" />
      <circle cx="7" cy="13" r="1" fill="white" />
    </svg>,
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" />
      <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" />
    </svg>,
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" />
    </svg>,
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="white" strokeWidth="2" />
      <line x1="8" y1="21" x2="16" y2="21" stroke="white" strokeWidth="2" />
      <line x1="12" y1="17" x2="12" y2="21" stroke="white" strokeWidth="2" />
    </svg>,
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="5" r="3" stroke="white" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="white" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="white" strokeWidth="2" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="white" strokeWidth="2" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="white" strokeWidth="2" />
    </svg>
  ]

  useEffect(() => {
    // Force scroll to top
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

    setTimeout(() => {
      window.scrollTo(0, 0)
      if (root) root.scrollTop = 0
    }, 0)

    return () => {
      root?.classList.remove('no-snap')
      document.body.classList.remove('no-snap-scroll')
      document.documentElement.classList.remove('no-snap-scroll')
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className={`services-page ${isRTL ? 'rtl' : ''}`}>

        <div className="services-content">
          <motion.div
            className="services-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="services-main-title">{t('services.mainTitle')}</h2>
            <p className="services-main-subtitle">
              {t('services.mainSubtitle')}
            </p>
          </motion.div>

          <div className="services-grid">
            {serviceCards.map((card, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`service-icon ${iconColors[index]}`}>
                  {icons[index]}
                </div>
                <h3 className="service-card-title">{card.title}</h3>
                <p className="service-card-description">
                  {card.description}
                </p>
                <ul className="service-features">
                  {card.features.map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <Values />

        {/* Call to Action Section */}
        <motion.div
          className="services-cta-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="services-cta-content">
            <h2 className="services-cta-heading">{t('services.ctaHeading')}</h2>
            <p className="services-cta-subtext">{t('services.ctaSubtext')}</p>
            <div className="services-cta-buttons">
              <Link to="/about" className="services-cta-button">
                {t('services.aboutUs')}
              </Link>
              <Link to="/contact" className="services-cta-button services-cta-button-secondary">
                {t('services.contactUs')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Services
