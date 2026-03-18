import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { useCmsPageContent } from '../hooks/useCmsPageContent';
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
  const { getSectionValue } = useCmsPageContent('services');
  const heroContent = getSectionValue('services_hero') as Record<string, unknown> | null;
  const cardsContent = getSectionValue('services_cards') as Record<string, unknown> | null;
  const cardItems = Array.isArray((cardsContent as any)?.items) ? ((cardsContent as any).items as any[]) : null;

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
            <p className="services-hero-label">{typeof heroContent?.label === 'string' ? heroContent.label : t('servicesPage.heroLabel')}</p>
            <h1 className="services-hero-title">{typeof heroContent?.title === 'string' ? heroContent.title : t('servicesPage.heroTitle')}</h1>
            <p className="services-hero-desc">{typeof heroContent?.description1 === 'string' ? heroContent.description1 : t('servicesPage.heroDesc1')}</p>
            <p className="services-hero-desc">{typeof heroContent?.description2 === 'string' ? heroContent.description2 : t('servicesPage.heroDesc2')}</p>
          </div>
        </section>

        <section className="services-grid-section">
          <div className="services-grid-container">
            <div className="services-grid">
              {SERVICE_IDS.map((id) => (
                <article key={id} className="service-card">
                  <div className="service-card-image">
                    {(() => {
                      const cmsItem = cardItems?.find(it => Number(it?.id) === id);
                      const img = typeof cmsItem?.image === 'string' ? cmsItem.image : SERVICE_IMAGES[id];
                      const title = typeof cmsItem?.title === 'string' ? cmsItem.title : t(`servicesPage.s${id}Title`);
                      return (
                        <>
                          <img src={img} alt={title} />
                          <h3 className="service-card-title-overlay">{title}</h3>
                        </>
                      );
                    })()}
                  </div>
                  <div className="service-card-content">
                    {(() => {
                      const cmsItem = cardItems?.find(it => Number(it?.id) === id);
                      const desc = typeof cmsItem?.description === 'string' ? cmsItem.description : (t(`servicesPage.s${id}Desc`) as string);
                      return <p className="service-card-desc">{desc}</p>;
                    })()}
                    <Link to={`/services/${id}`} className="service-card-link">
                      {t('servicesPage.learnMore')}
                      <span className="arrow" aria-hidden>→</span>
                    </Link>
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
