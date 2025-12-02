import { motion } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { memo } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import vexxaiLogo from '../assets/vexxai.svg'
import './Footer.css'

const Footer = memo(function Footer() {
  const location = useLocation()
  const { t, isRTL } = useLanguage()
  
  const allPages = [
    { path: '/', label: t('footer.home') },
    { path: '/services', label: t('footer.services') },
    { path: '/about', label: t('footer.about') },
    { path: '/contact', label: t('footer.contact') }
  ]
  
  const visiblePages = allPages.filter(page => page.path !== location.pathname)
  
  return (
    <footer className={`footer ${isRTL ? 'rtl' : ''}`}>
      <div className="footer-lines">
        <svg width="480" height="432" viewBox="0 0 480 432" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 449V162L479.5 1.5M31.5 479V192L509.5 31.5M51.5 499V212L529.5 51.5M61.5 509V222L540.5 61.5M71.5 519V232L549.5 71.5M81.5 529V242L559.5 81.5M141.5 589V302L619.5 141.5M151.5 599V312L629.5 151.5M231.5 679V392L709.5 231.5M311.5 759V472L789.5 311.5M301.5 749V462L779.5 301.5M291.5 739V452L769.5 291.5M281.5 729V442L759.5 281.5M271.5 719V432L749.5 271.5M261.5 709V422L739.5 261.5M251.5 699V412L729.5 251.5M241.5 689V402L719.5 241.5M221.5 670V383L699.5 222.5M211.5 659V372L689.5 211.5M201.5 649V362L679.5 201.5M191.5 639V352L669.5 191.5M181.5 629V342L659.5 181.5M171.5 619V332L649.5 171.5M161.5 609V322L639.5 161.5M131.5 579V292L609.5 131.5M121.5 569V282L599.5 121.5M111.5 559V272L589.5 111.5M101.5 549V262L579.5 101.5M91.5 539V252L569.5 91.5M41.5 489V202L519.5 41.5M21.5 469V182L499.5 21.5M11.5 459V172L489.5 11.5" stroke="white" strokeOpacity="0.4" strokeWidth="3"/>
        </svg>
      </div>

      <div className="footer-container">
        <motion.div
          className="footer-logo"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <img src={vexxaiLogo} alt="Vexxai Logo" className="logo-icon" />
          </Link>
        </motion.div>

        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {visiblePages.map((page) => (
            <Link key={page.path} to={page.path} className="footer-link">
              {page.label}
            </Link>
          ))}
        </motion.div>

        <motion.div
          className="footer-social"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2"/>
              <circle cx="18" cy="6" r="1" fill="white"/>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="2" y="9" width="4" height="12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="4" cy="4" r="2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>

      <motion.div
        className="footer-tagline"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2>{t('footer.tagline')}</h2>
      </motion.div>
    </footer>
  )
})

export default Footer
