import { useState } from 'react'
import { motion } from 'motion/react'
import './FoldingCards.css'

function FoldingCards() {
  const [activeCard, setActiveCard] = useState(null)

  const cards = [
    {
      id: 1,
      title: 'AI Assistants',
      description: 'Intelligent chatbots that understand and respond naturally',
      icon: '🤖'
    },
    {
      id: 2,
      title: 'Workflow Automation',
      description: 'Streamline repetitive tasks and boost productivity',
      icon: '⚡'
    },
    {
      id: 3,
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights',
      icon: '📊'
    },
    {
      id: 4,
      title: 'Custom Solutions',
      description: 'Tailored AI solutions for your unique needs',
      icon: '🎯'
    }
  ]

  return (
    <section className="folding-cards">
      <div className="folding-cards-container">
        <motion.h2 
          className="folding-cards-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        
        <div className="cards-grid">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`card ${activeCard === card.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FoldingCards
