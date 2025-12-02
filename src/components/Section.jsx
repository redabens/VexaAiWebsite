import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './Section.css'

function Section() {
  const carouselData = [
    { image: '/carasoul images/1.jpg', value: 'Innovation First', textColor: '#000' },
    { image: '/carasoul images/2.jpg', value: 'Simplicity in Complexity', textColor: '#fff' },
    { image: '/carasoul images/3.jpg', value: 'Human-Centered Automation', textColor: '#fff' },
    { image: '/carasoul images/4.jpg', value: 'Transparency & Trust', textColor: '#000' },
    { image: '/carasoul images/5.jpg', value: 'Continuous Improvement', textColor: '#fff' },
    { image: '/carasoul images/6.jpg', value: 'Impact Over Hype', textColor: '#000' }
  ]

  const [backgroundImage, setBackgroundImage] = useState('/carasoul images/1.jpg')
  const [displayedValue, setDisplayedValue] = useState('Innovation First')

  const handleImageClick = (image, value) => {
    setBackgroundImage(image)
    setDisplayedValue(value)
  }

  return (
    <section className="section">
      <AnimatePresence initial={false}>
        <motion.div
          key={backgroundImage}
          className="section-background"
          style={{
            backgroundImage: `url("${backgroundImage}")`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <motion.div 
        className="section-value-display"
        key={displayedValue}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {displayedValue}
      </motion.div>
      <div className="carousel-container">
        {carouselData.map((item, index) => (
          <div 
            key={index} 
            className={`carousel-item ${backgroundImage === item.image ? 'active' : ''}`}
            onClick={() => handleImageClick(item.image, item.value)}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.image} alt={`Carousel ${index + 1}`} />
            <div className="carousel-label">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Section
