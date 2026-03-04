import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/home-therapy.css';

/* Service card icons (teal square, white icon) */
const IconMobility = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M12 14v6M9 20h6" />
    <path d="M12 18l-2 2M12 18l2 2" />
  </svg>
);

const IconElderly = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 11h6M19 8v6M22 11h-6" />
  </svg>
);

const IconMedicalBag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 2L4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6l-2-4Z" />
    <path d="M4 6h16" />
    <path d="M12 10v4" />
    <path d="M10 12h4" />
  </svg>
);

const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    <path d="M12 9v6M9 12h6" />
  </svg>
);

/* Feature list icons (teal square, white icon) */
const IconClipboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const IconMedicalCross = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2v20M2 12h20" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const IconNetwork = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="5" r="3" />
    <circle cx="5" cy="19" r="3" />
    <circle cx="19" cy="19" r="3" />
    <path d="M8.5 8.5 12 12l3.5-3.5" />
    <path d="M12 12v7" />
    <path d="m8.5 15.5 3.5-3.5 3.5 3.5" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function HomeTherapy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="ht-page">
        {/* Hero */}
        <section className="ht-hero" aria-label={t('homeTherapy.pageTitle')}>
          <div className="ht-hero-inner">
            <div className="ht-hero-content">
              <Link to="/who-we-are" className="ht-back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t('homeTherapy.backToWhoWeAre')}
              </Link>
              <span className="ht-hero-label">{t('homeTherapy.servicesLabel')}</span>
              <h1 className="ht-hero-title">{t('homeTherapy.pageTitle')}</h1>
              <p className="ht-hero-desc">{t('homeTherapy.heroDesc')}</p>
            </div>
            <div className="ht-hero-image">
              <div className="ht-hero-image-card">
                <img src="/home-therapy-hero.png" alt={t('homeTherapy.heroImageAlt')} />
              </div>
            </div>
          </div>
        </section>

        {/* Home Therapy Overview */}
        <section className="ht-section ht-section-white" aria-labelledby="ht-overview-title">
          <div className="ht-container">
            <h2 id="ht-overview-title" className="ht-section-title">{t('homeTherapy.overviewTitle')}</h2>
            <p className="ht-section-desc">{t('homeTherapy.overviewP1')}</p>
            <h3 className="ht-structure-title">{t('homeTherapy.serviceStructureTitle')}</h3>
            <p className="ht-section-desc">{t('homeTherapy.overviewP2')}</p>
          </div>
        </section>

        {/* Home Therapy Service (4 cards) */}
        <section className="ht-section ht-section-grey" aria-labelledby="ht-service-title">
          <div className="ht-service-inner">
            <h2 id="ht-service-title" className="ht-section-title">{t('homeTherapy.serviceSectionTitle')}</h2>
            <p className="ht-service-intro">{t('homeTherapy.serviceSectionIntro')}</p>
            <div className="ht-service-grid">
              <div className="ht-service-card">
                <div className="ht-service-icon"><IconMobility /></div>
                <h3 className="ht-service-card-title">{t('homeTherapy.card1Title')}</h3>
                <p className="ht-service-card-desc">{t('homeTherapy.card1Desc')}</p>
              </div>
              <div className="ht-service-card">
                <div className="ht-service-icon"><IconElderly /></div>
                <h3 className="ht-service-card-title">{t('homeTherapy.card2Title')}</h3>
                <p className="ht-service-card-desc">{t('homeTherapy.card2Desc')}</p>
              </div>
              <div className="ht-service-card">
                <div className="ht-service-icon"><IconMedicalBag /></div>
                <h3 className="ht-service-card-title">{t('homeTherapy.card3Title')}</h3>
                <p className="ht-service-card-desc">{t('homeTherapy.card3Desc')}</p>
              </div>
              <div className="ht-service-card">
                <div className="ht-service-icon"><IconHeart /></div>
                <h3 className="ht-service-card-title">{t('homeTherapy.card4Title')}</h3>
                <p className="ht-service-card-desc">{t('homeTherapy.card4Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* What distinguishes home treatment */}
        <section className="ht-section ht-section-white" aria-labelledby="ht-distinguish-title">
          <div className="ht-distinguish-inner">
            <div className="ht-distinguish-content">
              <h2 id="ht-distinguish-title" className="ht-section-title">{t('homeTherapy.distinguishTitle')}</h2>
              <p className="ht-section-desc">{t('homeTherapy.distinguishP1')}</p>
              <p className="ht-section-desc">{t('homeTherapy.distinguishP2')}</p>
            </div>
            <div className="ht-features-list">
              <div className="ht-feature-item">
                <div className="ht-feature-icon"><IconClipboard /></div>
                <p className="ht-feature-text">{t('homeTherapy.feature1')}</p>
              </div>
              <div className="ht-feature-item">
                <div className="ht-feature-icon"><IconMedicalCross /></div>
                <p className="ht-feature-text">{t('homeTherapy.feature2')}</p>
              </div>
              <div className="ht-feature-item">
                <div className="ht-feature-icon"><IconNetwork /></div>
                <p className="ht-feature-text">{t('homeTherapy.feature3')}</p>
              </div>
              <div className="ht-feature-item">
                <div className="ht-feature-icon"><IconCalendar /></div>
                <p className="ht-feature-text">{t('homeTherapy.feature4')}</p>
              </div>
              <div className="ht-feature-item">
                <div className="ht-feature-icon"><IconShield /></div>
                <p className="ht-feature-text">{t('homeTherapy.feature5')}</p>
              </div>
            </div>
          </div>
        </section>

        <CtaSection variant="dark-cards" labelKey="cta.readyToStart" />
      </main>
      <Footer />
    </div>
  );
}
