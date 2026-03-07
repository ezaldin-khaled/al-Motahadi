import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/service-detail.css';

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

/* Condition card icons (teal outline) */
const IconBone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3v18M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM16 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);
const IconHeartbeat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
const IconSwirl = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
const IconCross = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2v20M2 12h20" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconPerson = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="7" r="4" />
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CONDITION_ICONS = [IconBone, IconHeartbeat, IconSwirl, IconCross];
const BENEFIT_ICONS = [IconHeart, IconArrow, IconPerson, IconCheck];

function renderTitleWithAccent(title: string, accentClass: string) {
  if (title.includes(' & ')) {
    const [before, after] = title.split(' & ');
    return (
      <>
        {before} <span className={accentClass}>&</span> {after}
      </>
    );
  }
  return title;
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const serviceId = id ? parseInt(id, 10) : 0;
  const isValid = Number.isInteger(serviceId) && serviceId >= 1 && serviceId <= 12;

  useEffect(() => {
    if (!isValid) {
      navigate('/services', { replace: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [isValid, navigate]);

  if (!isValid) {
    return null;
  }

  const title = t(`servicesPage.s${serviceId}Title`);
  const serviceKeyPrefix = `serviceDetail.s${serviceId}`;
  const tr = (key: string, fallbackKey: string) => t(key, { defaultValue: t(fallbackKey) });

  const desc = tr(`${serviceKeyPrefix}.heroDesc`, `servicesPage.s${serviceId}Desc`);
  const heroImage = SERVICE_IMAGES[serviceId];

  return (
    <div className="page-wrapper">
      <Header />
      <main className="sd-page">
        {/* Hero: two columns - text left, image right */}
        <section className="sd-hero" aria-label={title}>
          <div className="sd-hero-inner">
            <div className="sd-hero-content">
              <Link to="/services" className="sd-back-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t('serviceDetail.backToServices')}
              </Link>
              <span className="sd-hero-label">{t('serviceDetail.heroLabel')}</span>
              <h1 className="sd-hero-title">{renderTitleWithAccent(title, 'sd-title-accent')}</h1>
              <p className="sd-hero-desc">{desc}</p>
            </div>
            <div className="sd-hero-image">
              <div className="sd-hero-image-card">
                <img src={heroImage} alt={t('serviceDetail.heroImageAlt')} />
              </div>
            </div>
          </div>
        </section>

        {/* Restoring Movement, Rebuilding Strength - centered */}
        <section className="sd-section sd-section-white" aria-labelledby="sd-restoring-title">
          <div className="sd-container sd-container-center">
            <h2 id="sd-restoring-title" className="sd-section-title">{tr(`${serviceKeyPrefix}.restoringTitle`, 'serviceDetail.restoringTitle')}</h2>
            <p className="sd-section-desc">{tr(`${serviceKeyPrefix}.restoringP1`, 'serviceDetail.restoringP1')}</p>
            <p className="sd-section-desc">{tr(`${serviceKeyPrefix}.restoringP2`, 'serviceDetail.restoringP2')}</p>
          </div>
        </section>

        {/* Conditions We Treat - 4 cards */}
        <section className="sd-section sd-section-grey" aria-labelledby="sd-conditions-title">
          <div className="sd-conditions-inner">
            <h2 id="sd-conditions-title" className="sd-section-title">{tr(`${serviceKeyPrefix}.conditionsTitle`, 'serviceDetail.conditionsTitle')}</h2>
            <p className="sd-conditions-intro">{tr(`${serviceKeyPrefix}.conditionsIntro`, 'serviceDetail.conditionsIntro')}</p>
            <div className="sd-conditions-grid">
              {[1, 2, 3, 4].map((i) => {
                const IconComponent = CONDITION_ICONS[i - 1];
                return (
                  <div key={i} className="sd-condition-card">
                    <div className="sd-condition-icon" aria-hidden>
                      <IconComponent />
                    </div>
                    <h3 className="sd-condition-title">{tr(`${serviceKeyPrefix}.condition${i}Title`, `serviceDetail.condition${i}Title`)}</h3>
                    <p className="sd-condition-desc">{tr(`${serviceKeyPrefix}.condition${i}Desc`, `serviceDetail.condition${i}Desc`)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Treatment Methodology - two columns */}
        <section className="sd-section sd-section-white" aria-labelledby="sd-methodology-title">
          <div className="sd-methodology-inner">
            <div className="sd-methodology-content">
              <h2 id="sd-methodology-title" className="sd-section-title">{tr(`${serviceKeyPrefix}.methodologyTitle`, 'serviceDetail.methodologyTitle')}</h2>
              <p className="sd-section-desc">{tr(`${serviceKeyPrefix}.methodologyP1`, 'serviceDetail.methodologyP1')}</p>
              <p className="sd-section-desc">{tr(`${serviceKeyPrefix}.methodologyP2`, 'serviceDetail.methodologyP2')}</p>
            </div>
            <ul className="sd-treatments-list" aria-label={tr(`${serviceKeyPrefix}.methodologyTitle`, 'serviceDetail.methodologyTitle')}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <li key={i} className="sd-treatment-item">
                  <span className="sd-treatment-icon" aria-hidden><IconCheck /></span>
                  <span className="sd-treatment-text">{tr(`${serviceKeyPrefix}.treatment${i}`, `serviceDetail.treatment${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Patient Benefits & Why Choose Us - two columns */}
        <section className="sd-section sd-section-grey" aria-labelledby="sd-benefits-title">
          <div className="sd-benefits-inner">
            <div className="sd-benefits-list-wrap">
              <h2 id="sd-benefits-title" className="sd-section-title">{tr(`${serviceKeyPrefix}.benefitsTitle`, 'serviceDetail.benefitsTitle')}</h2>
              <ul className="sd-benefits-list">
                {[1, 2, 3, 4].map((i) => {
                  const IconComponent = BENEFIT_ICONS[i - 1];
                  return (
                    <li key={i} className="sd-benefit-item">
                      <span className="sd-benefit-icon" aria-hidden><IconComponent /></span>
                      <span className="sd-benefit-text">{tr(`${serviceKeyPrefix}.benefit${i}`, `serviceDetail.benefit${i}`)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="sd-why-choose">
              <h2 className="sd-section-title">{tr(`${serviceKeyPrefix}.whyChooseTitle`, 'serviceDetail.whyChooseTitle')}</h2>
              <p className="sd-section-desc">{tr(`${serviceKeyPrefix}.whyChooseP1`, 'serviceDetail.whyChooseP1')}</p>
              <p className="sd-section-desc">{tr(`${serviceKeyPrefix}.whyChooseP2`, 'serviceDetail.whyChooseP2')}</p>
              <p className="sd-section-desc">{tr(`${serviceKeyPrefix}.whyChooseP3`, 'serviceDetail.whyChooseP3')}</p>
            </div>
          </div>
        </section>

        <CtaSection variant="services" />
      </main>
      <Footer />
    </div>
  );
}
