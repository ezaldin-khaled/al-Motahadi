import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { CONTACT_PATH } from '../constants/cta';
import '../styles/who-we-are.css';

/* Simple line icons matching the design (flask, person, brain, house, car, star) */
const IconFlask = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10 2v7.31" />
    <path d="M14 9.3V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10a4 4 0 0 0 4-4v-.5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v.5a4 4 0 0 0 4 4Z" />
    <path d="M6 22h12" />
    <path d="M12 22v-6" />
  </svg>
);
const IconPerson = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
/* Target icon for Plan-Based section (from design asset) */
const IconTarget = () => (
  <img src="/icons/icon-target.png" alt="" width={56} height={56} className="wwa-plan-icon-img" aria-hidden />
);
const IconHouse = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
/* Bus icon for Transportation Service (from design asset) */
const IconBus = () => (
  <img src="/icons/icon-bus.png" alt="" width={28} height={28} className="wwa-col-icon-img" aria-hidden />
);
/* Stethoscope icon for Exclusive Specializations (from design asset) */
const IconStar = () => (
  <img src="/icons/icon-stethoscope.png" alt="" width={28} height={28} className="wwa-section-icon-img" aria-hidden />
);

export default function WhoWeAre() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="who-we-are-page">
        <section className="wwa-hero" aria-label="Who we are">
          <div className="wwa-hero-inner">
            <div className="wwa-hero-content">
              <span className="wwa-hero-label">{t('whoWeAre.heroLabel')}</span>
              <h1 className="wwa-hero-title">{t('whoWeAre.heroTitle')}</h1>
              <p className="wwa-hero-subtitle">{t('whoWeAre.heroSubtitle')}</p>
              <p className="wwa-hero-desc">{t('whoWeAre.heroDesc1')}</p>
              <p className="wwa-hero-desc">{t('whoWeAre.heroDesc2')}</p>
            </div>
            <div className="wwa-hero-image">
              <div className="wwa-hero-image-card">
                <img src="/therapist-patient-rehab.png" alt={t('whoWeAre.heroImageAlt')} />
              </div>
            </div>
          </div>
        </section>

        <section className="wwa-section wwa-section-white" aria-labelledby="protocols-heading">
          <div className="wwa-container">
            <div className="wwa-protocols-grid">
              <div className="wwa-protocols-content">
                <div className="wwa-protocols-header">
                  <div className="wwa-protocols-icon-wrap" aria-hidden>
                    <IconFlask />
                  </div>
                  <h2 id="protocols-heading" className="wwa-section-title">{t('whoWeAre.protocolsTitle')}</h2>
                </div>
                <div className="wwa-protocols-body">
                  <p className="wwa-protocols-tagline">{t('whoWeAre.protocolsTagline')}</p>
                  <p className="wwa-section-desc">{t('whoWeAre.protocolsDesc1')}</p>
                  <p className="wwa-section-desc">{t('whoWeAre.protocolsDesc2')}</p>
                  <Link to={CONTACT_PATH} className="btn btn-primary wwa-protocols-cta">
                    {t('whoWeAre.bookAppointmentNow')}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
              <div className="wwa-protocols-card">
                <div className="wwa-protocols-card-top">
                  <div className="wwa-protocols-subcard">
                    <span className="wwa-protocols-subcard-value">{t('whoWeAre.centersCount')}</span>
                    <span className="wwa-protocols-subcard-label">{t('whoWeAre.centersLabel')}</span>
                  </div>
                  <div className="wwa-protocols-subcard">
                    <span className="wwa-protocols-subcard-value">{t('whoWeAre.countriesCount')}</span>
                    <span className="wwa-protocols-subcard-label">{t('whoWeAre.countriesLabel')}</span>
                  </div>
                </div>
                <div className="wwa-protocols-subcard wwa-protocols-subcard-bottom">
                  <span className="wwa-protocols-subcard-label">{t('whoWeAre.exclusiveProtocols')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wwa-section wwa-section-plan wwa-section-center" aria-labelledby="plan-heading">
          <div className="wwa-container">
            <div className="wwa-plan-icon" aria-hidden><IconTarget /></div>
            <h2 id="plan-heading" className="wwa-section-title wwa-plan-title">{t('whoWeAre.planTitle')}</h2>
            <p className="wwa-plan-subtitle">{t('whoWeAre.planSubtitle')}</p>
            <p className="wwa-section-desc wwa-section-desc-center wwa-plan-desc">{t('whoWeAre.planDesc')}</p>
            <Link to={CONTACT_PATH} className="btn btn-primary wwa-plan-cta">
              {t('whoWeAre.bookAppointmentNow')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>

        <section className="wwa-section wwa-section-white" aria-labelledby="team-heading">
          <div className="wwa-container">
            <div className="wwa-team-grid">
              <div className="wwa-team-image-wrap">
                <div className="wwa-team-image">
                  <img src="/medical-team.png" alt={t('whoWeAre.teamImageAlt')} />
                </div>
              </div>
              <div className="wwa-team-content">
                <div className="wwa-section-icon" aria-hidden><IconPerson /></div>
                <h2 id="team-heading" className="wwa-section-title">{t('whoWeAre.teamTitle')}</h2>
                <p className="wwa-section-subtitle">{t('whoWeAre.teamSubtitle')}</p>
                <p className="wwa-section-desc">{t('whoWeAre.teamDesc1')}</p>
                <p className="wwa-section-desc">{t('whoWeAre.teamDesc2')}</p>
                <div className="wwa-team-actions">
                  <Link to="/team" className="btn btn-primary">
                    {t('whoWeAre.exploreProfessionals')}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                  <Link to="/team" className="wwa-view-more">{t('whoWeAre.viewMoreTeam')}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wwa-section wwa-section-two-cols" aria-label="Home therapy and transportation">
          <div className="wwa-container">
            <div className="wwa-cols-grid">
              <div className="wwa-col-block">
                <div className="wwa-col-icon-wrap" aria-hidden><IconHouse /></div>
                <h2 className="wwa-col-title">{t('whoWeAre.homeTherapyTitle')}</h2>
                <p className="wwa-col-tagline">{t('whoWeAre.homeTherapySubtitle')}</p>
                <p className="wwa-col-desc">{t('whoWeAre.homeTherapyDesc1')}</p>
                <Link to={CONTACT_PATH} className="btn btn-primary wwa-col-cta">
                  {t('whoWeAre.bookAppointmentNow')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div className="wwa-col-block">
                <div className="wwa-col-icon-wrap" aria-hidden><IconBus /></div>
                <h2 className="wwa-col-title">{t('whoWeAre.transportTitle')}</h2>
                <p className="wwa-col-tagline">{t('whoWeAre.transportSubtitle')}</p>
                <p className="wwa-col-desc">{t('whoWeAre.transportDesc1')}</p>
                <Link to={CONTACT_PATH} className="btn btn-primary wwa-col-cta">
                  {t('whoWeAre.bookAppointmentNow')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="wwa-section wwa-section-white wwa-section-center" aria-labelledby="specializations-heading">
          <div className="wwa-container">
            <div className="wwa-section-icon" aria-hidden><IconStar /></div>
            <h2 id="specializations-heading" className="wwa-section-title">{t('whoWeAre.specializationsTitle')}</h2>
            <p className="wwa-section-desc wwa-section-desc-center wwa-section-subtitle">{t('whoWeAre.specializationsSubtitle')}</p>
            <p className="wwa-section-desc wwa-section-desc-center">{t('whoWeAre.specializationsDesc')}</p>
            <Link to="/services" className="btn btn-primary">
              {t('whoWeAre.discoverSpecializations')}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
