import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/transportation.css';

/* Feature card icons (teal square, white icon) */
const IconShieldCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconClipboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconPerson = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconCar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.2-4.4c-.4-.8-1.2-1.3-2.1-1.3H8.3c-.9 0-1.7.5-2.1 1.3L4 10l-2.5.1C.7 10.3 0 11.1 0 12v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function Transportation() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="tr-page">
        {/* Hero */}
        <section className="tr-hero" aria-label={t('transportation.pageTitle')}>
          <div className="tr-hero-inner">
            <div className="tr-hero-content">
              <Link to="/who-we-are" className="tr-back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t('transportation.backToWhoWeAre')}
              </Link>
              <span className="tr-hero-label">{t('transportation.servicesLabel')}</span>
              <h1 className="tr-hero-title">{t('transportation.pageTitle')}</h1>
              <p className="tr-hero-desc">{t('transportation.heroDesc')}</p>
            </div>
            <div className="tr-hero-image">
              <div className="tr-hero-image-card">
                <img src="/transportation-hero.png" alt={t('transportation.heroImageAlt')} />
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="tr-section tr-section-white" aria-labelledby="tr-overview-title">
          <div className="tr-container">
            <h2 id="tr-overview-title" className="tr-section-title">{t('transportation.overviewTitle')}</h2>
            <p className="tr-section-desc">{t('transportation.overviewDesc')}</p>
            <div className="tr-note-box">
              <p className="tr-note-label">{t('transportation.importantNoteLabel')}</p>
              <p className="tr-note-text">{t('transportation.importantNoteText')}</p>
            </div>
          </div>
        </section>

        {/* What distinguishes (6 feature cards in 2x3 grid) */}
        <section className="tr-section tr-section-grey" aria-labelledby="tr-distinguish-title">
          <div className="tr-distinguish-inner">
            <h2 id="tr-distinguish-title" className="tr-section-title">{t('transportation.distinguishTitle')}</h2>
            <p className="tr-distinguish-tagline">{t('transportation.distinguishTagline')}</p>
            <div className="tr-features-grid">
              <div className="tr-feature-card">
                <div className="tr-feature-icon"><IconShieldCheck /></div>
                <h3 className="tr-feature-title">{t('transportation.feature1Title')}</h3>
                <p className="tr-feature-desc">{t('transportation.feature1Desc')}</p>
              </div>
              <div className="tr-feature-card">
                <div className="tr-feature-icon"><IconClipboard /></div>
                <h3 className="tr-feature-title">{t('transportation.feature2Title')}</h3>
                <p className="tr-feature-desc">{t('transportation.feature2Desc')}</p>
              </div>
              <div className="tr-feature-card">
                <div className="tr-feature-icon"><IconLock /></div>
                <h3 className="tr-feature-title">{t('transportation.feature3Title')}</h3>
                <p className="tr-feature-desc">{t('transportation.feature3Desc')}</p>
              </div>
              <div className="tr-feature-card">
                <div className="tr-feature-icon"><IconPerson /></div>
                <h3 className="tr-feature-title">{t('transportation.feature4Title')}</h3>
                <p className="tr-feature-desc">{t('transportation.feature4Desc')}</p>
              </div>
              <div className="tr-feature-card">
                <div className="tr-feature-icon"><IconCar /></div>
                <h3 className="tr-feature-title">{t('transportation.feature5Title')}</h3>
                <p className="tr-feature-desc">{t('transportation.feature5Desc')}</p>
              </div>
              <div className="tr-feature-card">
                <div className="tr-feature-icon"><IconClock /></div>
                <h3 className="tr-feature-title">{t('transportation.feature6Title')}</h3>
                <p className="tr-feature-desc">{t('transportation.feature6Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Information */}
        <section className="tr-section tr-section-white" aria-labelledby="tr-booking-title">
          <div className="tr-booking-inner">
            <h2 id="tr-booking-title" className="tr-section-title">{t('transportation.bookingTitle')}</h2>
            <p className="tr-booking-intro">{t('transportation.bookingIntro')}</p>
            <ul className="tr-booking-list">
              <li className="tr-booking-item">
                <span className="tr-booking-icon" aria-hidden><IconCheck /></span>
                <span>{t('transportation.booking1')}</span>
              </li>
              <li className="tr-booking-item">
                <span className="tr-booking-icon" aria-hidden><IconCheck /></span>
                <span>{t('transportation.booking2')}</span>
              </li>
            </ul>
          </div>
        </section>

        <CtaSection variant="dark-cards" labelKey="cta.readyToStart" />
      </main>
      <Footer />
    </div>
  );
}
