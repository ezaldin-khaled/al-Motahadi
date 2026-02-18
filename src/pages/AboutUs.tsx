import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import HealthCalculator from '../components/HealthCalculator';
import '../styles/about.css';

export default function AboutUs() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="about-page">
        <section className="about-hero" aria-label="About us hero">
          <div className="about-hero-bg" aria-hidden="true" />
          <div className="about-hero-inner">
            <div className="about-hero-content">
              <span className="about-hero-label">{t('about.heroLabel')}</span>
              <h1 className="about-hero-title">
                {t('about.heroTitle')} <span className="text-accent">{t('about.heroTitleAccent')}</span>
              </h1>
              <p className="about-hero-desc">{t('about.heroDesc')}</p>
            </div>
            <div className="about-hero-image">
              <div className="hero-image-card">
                <img src="/rehab-about-hero.png" alt={t('about.heroImageAlt')} />
              </div>
            </div>
          </div>
        </section>

        <section className="who-we-are">
          <div className="who-we-are-container">
            <h2 className="section-heading">{t('about.whoWeAreHeading')}</h2>
            <p className="who-we-are-text">{t('about.whoWeAreText')}</p>
            <Link to="/who-we-are" className="btn btn-primary">{t('about.learnMore')}</Link>
          </div>
        </section>

        <section className="info-cards-section">
          <div className="info-cards-container">
            <div className="info-card">
              <div className="info-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="info-card-title">{t('about.ourVision')}</h3>
              <p className="info-card-text">{t('about.ourVisionText')}</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="info-card-title">{t('about.ourMission')}</h3>
              <p className="info-card-text">{t('about.ourMissionText')}</p>
            </div>
          </div>
        </section>

        <section className="our-values" aria-label="Our values">
          <span className="our-values-subheading">{t('about.specialistsLabel')}</span>
          <h2 className="our-values-title">{t('about.ourValuesTitle')}</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="value-title">{t('about.humanFirst')}</h3>
              <p className="value-desc">{t('about.humanFirstDesc')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3v5l-4 10h14L15 8V3"></path>
                  <path d="M9 3h6"></path>
                </svg>
              </div>
              <h3 className="value-title">{t('about.scientificExcellence')}</h3>
              <p className="value-desc">{t('about.scientificExcellenceDesc')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="value-title">{t('about.transparencyTrust')}</h3>
              <p className="value-desc">{t('about.transparencyTrustDesc')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </div>
              <h3 className="value-title">{t('about.professionalConfidentiality')}</h3>
              <p className="value-desc">{t('about.professionalConfidentialityDesc')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  <path d="M12 2v2"></path>
                  <path d="M12 2a4 4 0 0 0-4 4v2"></path>
                  <path d="M12 2a4 4 0 0 1 4 4v2"></path>
                </svg>
              </div>
              <h3 className="value-title">{t('about.innovation')}</h3>
              <p className="value-desc">{t('about.innovationDesc')}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="value-title">{t('about.responsibility')}</h3>
              <p className="value-desc">{t('about.responsibilityDesc')}</p>
            </div>
          </div>
        </section>

        <section className="trust-section" aria-labelledby="our-story-heading">
          <div className="trust-container">
            <div className="trust-content">
              <div className="trust-header">
                <p className="trust-label">{t('about.ourStoryLabel')}</p>
                <h2 id="our-story-heading" className="trust-heading">{t('about.ourStoryHeading')}</h2>
              </div>
              <p className="trust-desc trust-desc-justify">{t('about.ourStoryText')}</p>
              <div className="trust-image">
                <img src="/almotahadi-opening-ceremony.png" alt={t('about.ourStoryImageAlt')} />
              </div>
            </div>
          </div>
        </section>

        <section className="founder-section" aria-labelledby="founder-heading">
          <div className="founder-container">
            <div className="founder-content">
              <div className="founder-image-wrapper">
                <div className="founder-image">
                  <img src="/founder-portrait.png" alt={t('about.founderImageAlt')} />
                </div>
              </div>
              <div className="founder-text">
                <p className="founder-label">{t('about.leadershipLabel')}</p>
                <h2 id="founder-heading" className="founder-heading">{t('about.founderHeading')}</h2>
                <p className="founder-desc">{t('about.founderDesc1')}</p>
                <p className="founder-desc">{t('about.founderDesc2')}</p>
                <p className="founder-desc">{t('about.founderDesc3')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="medical-teams" aria-labelledby="medical-team-heading">
          <div className="medical-teams-container">
            <div className="medical-teams-content">
              <div className="medical-teams-text">
                <p className="medical-teams-label">{t('about.ourExpertsLabel')}</p>
                <h2 id="medical-team-heading" className="medical-teams-title">{t('about.medicalTeamHeading')}</h2>
                <p className="medical-teams-desc">{t('about.medicalTeamDesc1')}</p>
                <p className="medical-teams-desc">{t('about.medicalTeamDesc2')}</p>
                <p className="medical-teams-desc">{t('about.medicalTeamDesc3')}</p>
                <Link to="/who-we-are" className="btn btn-primary">{t('about.meetMedicalTeam')}</Link>
              </div>
              <div className="medical-teams-image-wrap">
                <div className="medical-teams-image">
                  <img src="/medical-team.png" alt={t('about.medicalTeamImageAlt')} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="social-responsibility" aria-labelledby="responsibility-heading">
          <div className="responsibility-container">
            <p className="responsibility-label">{t('about.givingBackLabel')}</p>
            <h2 id="responsibility-heading" className="responsibility-heading">{t('about.socialResponsibilityHeading')}</h2>
            <div className="responsibility-card">
              <div className="responsibility-content">
                <p className="responsibility-text">{t('about.socialResponsibilityText1')}</p>
                <p className="responsibility-text">{t('about.socialResponsibilityText2')}</p>
              </div>
              <div className="responsibility-cta">
                <Link to="/who-we-are" className="btn btn-primary">{t('about.discoverCommunityInitiatives')}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Calculate Your Health — Figma: GET STARTED label + Calculate Your Health */}
        <section className="calculate-health">
          <div className="calculate-health__container">
            <HealthCalculator variant="default" />
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
