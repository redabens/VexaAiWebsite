import { motion } from 'motion/react'
import { memo } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import './Partners.css'

const Partners = memo(function Partners() {
  const { t, isRTL } = useLanguage()
  
  const partners = [
    {
      id: 1,
      title: t('partners.partner1.title'),
      description: t('partners.partner1.description'),
      company: t('partners.partner1.company'),
      subtitle: t('partners.partner1.subtitle'),
      logo: '/trusted Logos/crypto.jfif'
    },
    {
      id: 2,
      title: t('partners.partner2.title'),
      description: t('partners.partner2.description'),
      company: t('partners.partner2.company'),
      subtitle: t('partners.partner2.subtitle'),
      logo: '/trusted Logos/nextCar.png'
    }
  ]

  return (
    <section className={`partners ${isRTL ? 'rtl' : ''}`}>
      <div className="partners-container">
        <motion.div
          className="partners-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="partners-title">{t('partners.title')}</h2>
        </motion.div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="partner-card"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.3,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <h3 className="partner-card-title">{partner.title}</h3>
              <p className="partner-card-description">{partner.description}</p>
              
              <div className="partner-info">
                <img 
                  src={partner.logo} 
                  alt={partner.company}
                  className="partner-logo"
                  loading="lazy"
                />
                <div className="partner-details">
                  <h4 className="partner-company">{partner.company}</h4>
                  <p className="partner-subtitle">{partner.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Partners
