import { useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import './Process.css'

function Process() {
  const [lineComplete, setLineComplete] = useState(false)
  const { t, isRTL } = useLanguage()
  
  const steps = t('process.steps')

  return (
    <section className={`process ${isRTL ? 'rtl' : ''}`}>
      <div className="process-container">
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="process-tagline">{t('process.tagline')}</p>
          <h2 className="process-title">{t('process.title')}</h2>
        </motion.div>

        <div className="process-content">
          <motion.div
            className="process-svg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <svg 
              width="204" 
              height="194" 
              viewBox="0 0 204 194" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Process flow illustration"
            >
              <motion.path
                d="M1 132C12.6667 128 50.2 129.6 107 168C178 216 1 -63.9999 93 25.0001C185 114 233 240 179 173C125 106 73 -45 126 16C168.4 64.8 170.333 81.6667 166 84"
                stroke="url(#paint0_linear_30_367)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3
                }}
                onAnimationComplete={() => setLineComplete(true)}
              />
              <defs>
                <linearGradient 
                  id="paint0_linear_30_367" 
                  x1="101.33" 
                  y1="1.78674" 
                  x2="101.33" 
                  y2="191.885" 
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#FF301A" />
                  <stop offset="1" stopColor="#991D10" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <div className="process-steps">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="process-step"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={lineComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-subtitle">{step.subtitle}</p>
                  <p className="step-description">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="process-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">{t('process.ctaTitle')}</h2>
          <Link to="/contact">
            <button className="cta-button">{t('process.ctaButton')}</button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Process
