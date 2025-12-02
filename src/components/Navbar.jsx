import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { memo, useState } from 'react'
import AnimatedLogo from './AnimatedLogo'
import { useLanguage, languages } from '../i18n/LanguageContext'

const Navbar = memo(function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { language, setLanguage, t, isRTL } = useLanguage()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleLangDropdown = () => {
    setIsLangOpen(!isLangOpen)
  }

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setIsLangOpen(false)
  }

  const currentLang = languages.find(l => l.code === language)

  return (
    <nav className={`navbar ${isRTL ? 'rtl' : ''}`}>
      <div 
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      ></div>
      
      <div className="navbar-container">
        {/* Left side: Language Selector + Logo */}
        <div className="navbar-left">
          <div className="language-selector-top">
            <button 
              className="language-toggle"
              onClick={toggleLangDropdown}
              aria-label="Select language"
            >
              <span className="lang-flag">{currentLang?.flag}</span>
              <span className="lang-code">{language.toUpperCase()}</span>
              <svg className={`lang-arrow ${isLangOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <ul className={`language-dropdown ${isLangOpen ? 'active' : ''}`}>
              {languages.map((lang) => (
                <li 
                  key={lang.code}
                  className={language === lang.code ? 'selected' : ''}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span className="lang-name">{lang.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-logo">
            <Link to="/">
              <AnimatedLogo />
            </Link>
          </div>
        </div>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/" onClick={closeMenu}>
              <span className="nav-dot">•</span>
              {t('nav.home')}
            </Link>
          </li>
          <li className={location.pathname === '/about' ? 'active' : ''}>
            <Link to="/about" onClick={closeMenu}>
              <span className="nav-dot">•</span>
              {t('nav.about')}
            </Link>
          </li>
          <li className={location.pathname === '/services' ? 'active' : ''}>
            <Link to="/services" onClick={closeMenu}>
              <span className="nav-dot">•</span>
              {t('nav.services')}
            </Link>
          </li>
          <li className={location.pathname === '/contact' ? 'active' : ''}>
            <Link to="/contact" onClick={closeMenu}>
              <span className="nav-dot">•</span>
              {t('nav.contact')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
})

export default Navbar
