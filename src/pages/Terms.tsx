import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/privacy.css';

export default function Terms() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content privacy-page">
        <section className="privacy-hero" aria-label="Terms & Conditions">
          <div className="privacy-hero-bg" aria-hidden="true" />
          <div className="privacy-hero-inner">
            <h1 className="privacy-hero-title">{t('terms.title')}</h1>
            <p className="privacy-hero-desc">
              {t('terms.heroDesc')}
            </p>
            <p className="privacy-hero-updated">{t('terms.lastUpdated')}</p>
          </div>
        </section>

        <section className="privacy-content-section">
          <div className="privacy-content-inner">
            <Link to="/" className="privacy-back">{t('terms.back')}</Link>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">1. {t('terms.s1Title')}</h2>
              <p className="privacy-section-text">
                {t('terms.s1Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">2. {t('terms.s2Title')}</h2>
              <p className="privacy-section-text">
                {t('terms.s2Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">3. {t('terms.s3Title')}</h2>
              <p className="privacy-section-text">
                {t('terms.s3Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">4. {t('terms.s4Title')}</h2>
              <p className="privacy-section-text">
                {t('terms.s4Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">5. {t('terms.s5Title')}</h2>
              <p className="privacy-section-text">
                {t('terms.s5Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">6. {t('terms.s6Title')}</h2>
              <p className="privacy-section-text">
                {t('terms.s6Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">7. {t('terms.s7Title')}</h2>
              <p className="privacy-section-text">
                {t('terms.s7Content')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">8. {t('terms.s8Title')}</h2>
              <p className="privacy-section-text">
                {t('terms.s8Content')}
              </p>
            </div>
          </div>
        </section>

        <CtaSection variant="dark-cards" />
      </main>
      <Footer />
    </div>
  );
}

