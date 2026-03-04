import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/privacy.css';

export default function CookiePolicy() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content privacy-page">
        <section className="privacy-hero" aria-label="Cookie Policy">
          <div className="privacy-hero-bg" aria-hidden="true" />
          <div className="privacy-hero-inner">
            <h1 className="privacy-hero-title">{t('cookies.title')}</h1>
            <p className="privacy-hero-desc">
              {t('cookies.heroDesc')}
            </p>
            <p className="privacy-hero-updated">{t('cookies.lastUpdated')}</p>
          </div>
        </section>

        <section className="privacy-content-section">
          <div className="privacy-content-inner">
            <Link to="/" className="privacy-back">{t('cookies.back')}</Link>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">1. {t('cookies.s1Title')}</h2>
              <p className="privacy-section-text">
                {t('cookies.s1Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">2. {t('cookies.s2Title')}</h2>
              <p className="privacy-section-text">
                {t('cookies.s2Intro')}
              </p>
              <ul className="privacy-list">
                <li>{t('cookies.s2Necessary')}</li>
                <li>{t('cookies.s2Performance')}</li>
                <li>{t('cookies.s2Functional')}</li>
                <li>{t('cookies.s2Marketing')}</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">3. {t('cookies.s3Title')}</h2>
              <p className="privacy-section-text">
                {t('cookies.s3Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">4. {t('cookies.s4Title')}</h2>
              <p className="privacy-section-text">
                {t('cookies.s4Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">5. {t('cookies.s5Title')}</h2>
              <p className="privacy-section-text">
                {t('cookies.s5Intro')}
              </p>
            </div>

            <div className="privacy-section">
              <h2 className="privacy-section-heading">6. {t('cookies.s6Title')}</h2>
              <p className="privacy-section-text">
                {t('cookies.s6Content')}
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

