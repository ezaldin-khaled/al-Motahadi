import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/privacy.css';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content privacy-page">
        {/* Hero — light teal gradient */}
        <section className="privacy-hero" aria-label="Privacy Policy">
          <div className="privacy-hero-bg" aria-hidden="true" />
          <div className="privacy-hero-inner">
            <h1 className="privacy-hero-title">{t('privacy.title')}</h1>
            <p className="privacy-hero-desc">
              {t('privacy.heroDesc')}
            </p>
            <p className="privacy-hero-updated">{t('privacy.lastUpdated')}</p>
          </div>
        </section>

        {/* Main content — white background, numbered sections */}
        <section className="privacy-content-section">
          <div className="privacy-content-inner">
            <Link to="/" className="privacy-back">{t('privacy.back')}</Link>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">1. {t('privacy.s1Title')}</h2>
              <p className="privacy-section-text">
                {t('privacy.s1Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">2. {t('privacy.s2Title')}</h2>
              <p className="privacy-section-text">{t('privacy.s2Intro')}</p>
              <ul className="privacy-list">
                <li>{t('privacy.s2Contact')}</li>
                <li>{t('privacy.s2Medical')}</li>
                <li>{t('privacy.s2Demographic')}</li>
                <li>{t('privacy.s2Insurance')}</li>
                <li>{t('privacy.s2Appointment')}</li>
                <li>{t('privacy.s2Website')}</li>
                <li>{t('privacy.s2Communication')}</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">3. {t('privacy.s3Title')}</h2>
              <p className="privacy-section-text">{t('privacy.s3Intro')}</p>
              <ul className="privacy-list">
                <li>{t('privacy.s3Scheduling')}</li>
                <li>{t('privacy.s3Treatments')}</li>
                <li>{t('privacy.s3Communication')}</li>
                <li>{t('privacy.s3Billing')}</li>
                <li>{t('privacy.s3Improving')}</li>
                <li>{t('privacy.s3Legal')}</li>
                <li>{t('privacy.s3Marketing')}</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">4. {t('privacy.s4Title')}</h2>
              <p className="privacy-section-text">{t('privacy.s4Intro')}</p>
              <ul className="privacy-list">
                <li>{t('privacy.s4Treatment')}</li>
                <li>{t('privacy.s4Insurance')}</li>
                <li>{t('privacy.s4Legal')}</li>
                <li>{t('privacy.s4Service')}</li>
                <li>{t('privacy.s4Research')}</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">5. {t('privacy.s5Title')}</h2>
              <p className="privacy-section-text">{t('privacy.s5Intro')}</p>
              <ul className="privacy-list">
                <li>{t('privacy.s5Admin')}</li>
                <li>{t('privacy.s5Physical')}</li>
                <li>{t('privacy.s5Technical')}</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">6. {t('privacy.s6Title')}</h2>
              <p className="privacy-section-text">{t('privacy.s6Intro')}</p>
              <ul className="privacy-list">
                <li>{t('privacy.s6Access')}</li>
                <li>{t('privacy.s6Rectification')}</li>
                <li>{t('privacy.s6Erasure')}</li>
                <li>{t('privacy.s6Restrict')}</li>
                <li>{t('privacy.s6Portability')}</li>
                <li>{t('privacy.s6Object')}</li>
                <li>{t('privacy.s6Withdraw')}</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">7. {t('privacy.s7Title')}</h2>
              <p className="privacy-section-text">{t('privacy.s7Content')}</p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">8. {t('privacy.s8Title')}</h2>
              <p className="privacy-section-text">{t('privacy.s8Content')}</p>
            </div>
          </div>
        </section>

        <CtaSection variant="dark-cards" />
      </main>
      <Footer />
    </div>
  );
}
