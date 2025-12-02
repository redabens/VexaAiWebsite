import Navbar from '../components/Navbar'
import './Contact.css'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'

function Contact() {
  const { t, isRTL } = useLanguage()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    companyName: '',
    website: '',
    meetingPurpose: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const [errors, setErrors] = useState({})

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone) => {
    // Remove spaces and dashes for validation
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    
    // Rule 1: +213 format (Algeria) - must have 5, 6, or 7 after +213, then 8 more digits (total 9 after +213)
    if (cleaned.startsWith('+213')) {
      const afterCode = cleaned.slice(4)
      if (afterCode.length === 9 && /^[567]\d{8}$/.test(afterCode)) {
        return true
      }
      return false
    }
    
    // Rule 2: Other international format (+XX or +XXX) - accept 9 to 11 digits after country code
    if (cleaned.startsWith('+')) {
      // Find where digits start after + and country code (2-3 digits)
      const match = cleaned.match(/^\+(\d{1,3})(\d+)$/)
      if (match) {
        const numberAfterCode = match[2]
        if (numberAfterCode.length >= 9 && numberAfterCode.length <= 11) {
          return true
        }
      }
      return false
    }
    
    // Rule 3: Local format starting with 0 - must have 9 digits after the 0 (total 10 digits)
    if (cleaned.startsWith('0')) {
      if (/^0[567]\d{8}$/.test(cleaned)) {
        return true
      }
      return false
    }
    
    return false
  }

  const validateWebsite = (website) => {
    if (!website) return true // Optional field
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    return urlRegex.test(website)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired')
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired')
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid')
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.errors.phoneRequired')
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('contact.errors.phoneInvalid')
    }
    
    if (!formData.preferredDate) {
      newErrors.preferredDate = t('contact.errors.dateRequired')
    }
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = t('contact.errors.companyRequired')
    }
    
    if (formData.website && !validateWebsite(formData.website)) {
      newErrors.website = t('contact.errors.websiteInvalid')
    }
    
    if (!formData.meetingPurpose.trim()) {
      newErrors.meetingPurpose = t('contact.errors.purposeRequired')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    // Force scroll to top on mount
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          preferredDate: '', 
          companyName: '', 
          website: '', 
          meetingPurpose: '' 
        })
      } else {
        setSubmitStatus('error')
        console.error('Error:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const meetingPoints = t('contact.meetingPoints')

  return (
    <>
      <Navbar />
      <div className={`contact-page ${isRTL ? 'rtl' : ''}`}>
        <div className="contact-container">
          <div className="contact-content">
            {/* Left Column - Meeting Information */}
            <motion.div
              className="meeting-info"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.h1
                className="meeting-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t('contact.meetingTitle')}
              </motion.h1>
              <motion.p
                className="meeting-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('contact.meetingDescription')}
              </motion.p>

              <motion.div
                className="meeting-about"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="about-title">{t('contact.aboutTitle')}</h2>
                <p className="about-subtitle">
                  {t('contact.aboutSubtitle')}
                </p>
                <p className="about-description">
                  {t('contact.aboutDescription')}
                </p>
                <p className="call-duration">
                  {t('contact.callDuration')}
                </p>
                <ul className="meeting-points">
                  {meetingPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      <div>
                        <strong>{point.bold}</strong>{point.text}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              className="form-section"
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <motion.div
                className="form-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3>{t('contact.formHeader')}</h3>
              </motion.div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <motion.div
                  className={`form-group ${errors.name ? 'has-error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.name')}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </motion.div>

                <motion.div
                  className={`form-group ${errors.email ? 'has-error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.email')}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </motion.div>

                <motion.div
                  className={`form-group ${errors.phone ? 'has-error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.phone')}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </motion.div>

                <motion.div
                  className={`form-group ${errors.preferredDate ? 'has-error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.85 }}
                >
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    placeholder={t('contact.placeholders.preferredDate')}
                  />
                  {errors.preferredDate && <span className="error-message">{errors.preferredDate}</span>}
                </motion.div>

                <motion.div
                  className="form-divider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <p>{t('contact.formDivider1')}</p>
                </motion.div>

                <motion.div
                  className={`form-group ${errors.companyName ? 'has-error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.companyName')}
                  />
                  {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                </motion.div>

                <motion.div
                  className={`form-group ${errors.website ? 'has-error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder={t('contact.placeholders.website')}
                  />
                  {errors.website && <span className="error-message">{errors.website}</span>}
                </motion.div>

                <motion.div
                  className="form-divider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <p>{t('contact.formDivider2')}</p>
                </motion.div>

                <motion.div
                  className={`form-group ${errors.meetingPurpose ? 'has-error' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                >
                  <textarea
                    id="meetingPurpose"
                    name="meetingPurpose"
                    value={formData.meetingPurpose}
                    onChange={handleChange}
                    rows="4"
                    placeholder={t('contact.placeholders.meetingPurpose')}
                  />
                  {errors.meetingPurpose && <span className="error-message">{errors.meetingPurpose}</span>}
                </motion.div>

                <motion.button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.submitting') : t('contact.submitButton')}
                </motion.button>
                
                {submitStatus === 'success' && (
                  <motion.div
                    className="submit-message success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t('contact.successMessage')}
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    className="submit-message error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t('contact.errorMessage')}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
