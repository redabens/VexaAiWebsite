import Navbar from '../components/Navbar'
import './Contact.css'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'

function Contact() {
  const { t, isRTL } = useLanguage()

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

    // Load Cal.com embed script asynchronously
    ;(function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let c = C.document;
      C.Cal = C.Cal || function () {
        let o = C.Cal;
        let ar = arguments;
        if (!o.q) {
          o.q = [];
        }
        p(o, ar);
      };
      C.Cal.data = C.Cal.data || {};
      C.Cal.ns = C.Cal.ns || {};
      if (!c.querySelector('script[src="' + L + '"]')) {
        let s = c.createElement("script");
        s.src = L;
        s.async = true;
        c.head.appendChild(s);
      }
    })(window, {}, "https://app.cal.com/embed/embed.js");

    const initCal = () => {
      if (window.Cal) {
        const container = document.getElementById("cal-booking-widget");
        if (container && container.querySelector("iframe")) {
          return;
        }
        window.Cal("init", { origin: "https://cal.com" });
        window.Cal("inline", {
          elementOrSelector: "#cal-booking-widget",
          calLink: "https://cal.com/vexaai/15min",
          config: { 
            layout: "month_view",
            theme: "light"
          }
        });
        window.Cal("ui", {
          styles: {
            branding: {
              brandColor: "#FF301A"
            }
          }
        });
      }
    };

    // If script already loaded, init immediately, else wait for it
    if (window.Cal) {
      initCal();
    } else {
      const script = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (script) {
        script.addEventListener('load', initCal);
      } else {
        const checkInterval = setInterval(() => {
          if (window.Cal) {
            clearInterval(checkInterval);
            initCal();
          }
        }, 100);
        return () => {
          clearInterval(checkInterval);
          // Re-enable snap scroll when leaving this page
          root?.classList.remove('no-snap')
          document.body.classList.remove('no-snap-scroll')
          document.documentElement.classList.remove('no-snap-scroll')
        };
      }
    }

    return () => {
      // Re-enable snap scroll when leaving this page
      root?.classList.remove('no-snap')
      document.body.classList.remove('no-snap-scroll')
      document.documentElement.classList.remove('no-snap-scroll')
    }
  }, [])

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

            {/* Right Column - Cal.com Calendar Widget */}
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

              <motion.div
                id="cal-booking-widget"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ 
                  width: '100%', 
                  minHeight: '650px',
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
