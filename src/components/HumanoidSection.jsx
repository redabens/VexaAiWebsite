import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import "./HumanoidSection.css";

const HumanoidSection = () => {
    const sectionRef = useRef(null);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ticking = useRef(false);
    const { t, isRTL } = useLanguage();

    useEffect(() => {
        const section = sectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (section) {
            observer.observe(section);
        }

        // Get the actual scroll container - #root or window
        const scrollContainer = document.getElementById('root') || window;

        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    if (!sectionRef.current) return;

                    const sectionRect = sectionRef.current.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    const totalScrollDistance = viewportHeight * 2;
                    const isMobile = window.innerWidth <= 768;

                    let progress = 0;
                    
                    if (isMobile) {
                        // On mobile, only start animation when cards are centered in viewport
                        const sectionCenter = sectionRect.top + (sectionRect.height / 2);
                        const viewportCenter = viewportHeight / 2;
                        
                        // Check if section center is near viewport center (within tolerance)
                        if (sectionCenter <= viewportCenter) {
                            // Start progress calculation only after cards are centered
                            const scrolledPastCenter = viewportCenter - sectionCenter;
                            progress = Math.min(1, Math.max(0, scrolledPastCenter / totalScrollDistance));
                        }
                    } else {
                        // Desktop behavior remains the same
                        if (sectionRect.top <= 0) {
                            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
                        }
                    }

                    // Sequential card appearance based on scroll progress
                    if (progress >= 0.5) {
                        setActiveCardIndex(2); // Show all 3 cards
                    } else if (progress >= 0.25) {
                        setActiveCardIndex(1); // Show 2 cards
                    } else {
                        setActiveCardIndex(0); // Show 1 card
                    }

                    ticking.current = false;
                });

                ticking.current = true;
            }
        };

        scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    const isFirstCardVisible = isIntersecting;
    const isSecondCardVisible = activeCardIndex >= 1;
    const isThirdCardVisible = activeCardIndex >= 2;

    return (
        <div ref={sectionRef} className={`humanoid-wrapper ${isRTL ? 'rtl' : ''}`}>
            <section className="humanoid-section" id="why-humanoid">
                <div className="humanoid-container">
                    <div className="humanoid-header">
                        <div className="humanoid-chip-wrapper">
                            <div className="pulse-chip" style={{ animationDelay: "0.1s" }}>
                                <span>{t('humanoid.chip')}
                                </span>
                            </div>
                        </div>

                        <h2 className="section-title">
                            {t('humanoid.title')}
                        </h2>
                    </div>

                    <div className="cards-container">
                        {/* First Card */}
                        <div className={`humanoid-card card-1 ${isFirstCardVisible ? 'visible animate-card-enter' : ''}`}>
                            <div className="card-background card-background-1"></div>

                            <div className="card-badge">
                                <span className="card-badge-text">{t('humanoid.badge1')}</span>
                            </div>

                            <div className="card-content">
                                <div className="card-text-container">
                                    <h3 className="card-heading">
                                        {t('humanoid.card1')}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Second Card */}
                        <div className={`humanoid-card card-2 ${isSecondCardVisible ? 'visible animate-card-enter' : ''} ${activeCardIndex === 1 ? 'active' : ''}`}>
                            <div className="card-background card-background-2"></div>

                            <div className="card-badge">
                                <span className="card-badge-text">{t('humanoid.badge2')}</span>
                            </div>

                            <div className="card-content">
                                <div className="card-text-container">
                                    <h3 className="card-heading">
                                        {t('humanoid.card2')}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Third Card */}
                        <div className={`humanoid-card card-3 ${isThirdCardVisible ? 'visible animate-card-enter' : ''} ${activeCardIndex === 2 ? 'active' : ''}`}>
                            <div className="card-background card-background-3"></div>

                            <div className="card-badge">
                                <span className="card-badge-text">{t('humanoid.badge3')}</span>
                            </div>

                            <div className="card-content">
                                <div className="card-text-container">
                                    <h3 className="card-heading">
                                        {t('humanoid.card3')} <br /><span className="card-accent-text">{t('humanoid.card3Accent')}</span>
                                    </h3>
                                </div>
                                <div className="card-buttons">
                                    <Link to="/services" className="card-button">
                                        {t('humanoid.exploreServices')}
                                    </Link>
                                    <Link to="/about" className="card-button">
                                        {t('humanoid.learnAbout')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HumanoidSection;
