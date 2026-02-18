import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/services.css';

const SERVICE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const SERVICE_IMAGES: Record<number, string> = {
  1: '/service-images/2.png',
  2: '/service-images/1.png',
  3: '/service-images/3.png',
  4: '/service-images/4.png',
  5: '/service-images/5.png',
  6: '/service-images/6.png',
  7: '/service-images/7.png',
  8: '/service-images/8.png',
  9: '/service-images/9.png',
  10: '/service-images/10.png',
  11: '/service-images/11.png',
  12: '/service-images/12.png',
};

export default function Services() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="services-page">
        <section className="services-hero">
          <div className="page-hero-bg" aria-hidden="true" />
          <div className="services-hero-content">
            <p className="services-hero-label">{t('servicesPage.heroLabel')}</p>
            <h1 className="services-hero-title">{t('servicesPage.heroTitle')}</h1>
            <p className="services-hero-desc">{t('servicesPage.heroDesc1')}</p>
            <p className="services-hero-desc">{t('servicesPage.heroDesc2')}</p>
          </div>
        </section>

        <section className="services-grid-section">
          <div className="services-grid-container">
            <div className="services-grid">
              {SERVICE_IDS.map((id) => (
                <article key={id} className="service-card">
                  <div className="service-card-image">
                    <img src={SERVICE_IMAGES[id]} alt={t(`servicesPage.s${id}Title`)} />
                    <h3 className="service-card-title-overlay">{t(`servicesPage.s${id}Title`)}</h3>
                  </div>
                  <div className="service-card-content">
                    <p className="service-card-desc">{t(`servicesPage.s${id}Desc`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaSection variant="services" />
      </main>
      <Footer />
    </div>
  );
}
