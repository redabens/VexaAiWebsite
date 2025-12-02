import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import './Impact.css'

function Impact() {
  const areas = [
    {
      title: 'Education & Training',
      problem: 'Repetitive administrative work such as registrations, follow-ups, and tracking student progress manually.',
      image: '/values pics/human.jpg'
    },
    {
      title: 'Hotels & Travel Agencies',
      problem: 'Manual handling of bookings, confirmations, guest communication, and post-stay reviews.',
      image: '/values pics/trust.jpg'
    },
    {
      title: 'eCommerce & Online Stores',
      problem: 'Time-consuming product updates, stock management, and repetitive customer support tasks.',
      image: '/values pics/innovation.jpg'
    },
    {
      title: 'Marketing Agencies & Service Providers',
      problem: 'Inefficient lead tracking, manual CRM updates, and lack of automated performance reporting.',
      image: '/values pics/simplicity.jpg'
    }
  ]

  return (
    <section className="impact">
      <div className="impact-container">
        <div className="impact-header">
          <div className="impact-header-content">
            <motion.h2
              className="impact-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Areas of Impact
            </motion.h2>
            <motion.p
              className="impact-subtitle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              From real estate to automotive, we bring automation that scales and intelligence that adapts.
            </motion.p>
          </div>
          <Link to="/services">
            <motion.button
              className="impact-learn-more"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Learn more
            </motion.button>
          </Link>
        </div>

        <div className="impact-grid">
          {areas.map((area, index) => (
            <motion.div
              key={area.title}
              className="impact-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="impact-card-image">
                <img src={area.image} alt={area.title} loading="lazy" />
              </div>
              <div className="impact-card-content">
                <h3 className="impact-card-title">{area.title}</h3>
                <p className="impact-card-problem">
                  <strong>Problem:</strong> {area.problem}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Impact
