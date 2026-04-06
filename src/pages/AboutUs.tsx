import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { useCmsPageContent } from '../hooks/useCmsPageContent';
import '../styles/about.css';
import storySlide1 from '../../assets/our story slider/WhatsApp Image 2026-03-25 at 07.26.21.jpeg';
import storySlide2 from '../../assets/our story slider/WhatsApp Image 2026-03-25 at 07.26.21(1).jpeg';
import storySlide3 from '../../assets/our story slider/WhatsApp Image 2026-03-25 at 07.26.21(2).jpeg';
import storySlide4 from '../../assets/our story slider/WhatsApp Image 2026-03-25 at 07.26.22.jpeg';

export default function AboutUs() {
  const { t } = useTranslation();
  const { getSectionValue } = useCmsPageContent('about');
  const heroContent = getSectionValue('about_hero') as Record<string, unknown> | null;
  const introContent = getSectionValue('about_intro') as Record<string, unknown> | null;
  const founderContent = getSectionValue('about_founder') as Record<string, unknown> | null;
  const teamContent = getSectionValue('about_team') as Record<string, unknown> | null;
  const responsibilityContent = getSectionValue('about_responsibility') as Record<string, unknown> | null;
  const storySlides = useMemo(() => [storySlide1, storySlide2, storySlide3, storySlide4], []);
  const [storySlideIndex, setStorySlideIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setStorySlideIndex((current) => (current + 1) % storySlides.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [storySlides.length]);

  const storyImageAlt = t('about.ourStoryImageAlt');

  return (
    <div className="page-wrapper">
      <Header />
      <main className="about-page">
        <section className="about-hero" aria-label="About us hero">
          <div className="about-hero-bg" aria-hidden="true" />
          <div className="about-hero-inner">
            <div className="about-hero-content">
              <span className="about-hero-label">{typeof heroContent?.label === 'string' ? heroContent.label : t('about.heroLabel')}</span>
              <h1 className="about-hero-title">
                {typeof heroContent?.title === 'string' ? heroContent.title : t('about.heroTitle')}{' '}
                <span className="text-accent">{typeof heroContent?.titleAccent === 'string' ? heroContent.titleAccent : t('about.heroTitleAccent')}</span>
              </h1>
              <p className="about-hero-desc">{typeof heroContent?.description === 'string' ? heroContent.description : t('about.heroDesc')}</p>
            </div>
            <div className="about-hero-image">
              <div className="hero-image-card">
                <img
                  src={typeof heroContent?.image === 'string' ? heroContent.image : '/rehab-about-hero.png'}
                  alt={typeof heroContent?.imageAlt === 'string' ? heroContent.imageAlt : t('about.heroImageAlt')}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="who-we-are">
          <div className="who-we-are-container">
            <h2 className="section-heading">{typeof introContent?.heading === 'string' ? introContent.heading : t('about.whoWeAreHeading')}</h2>
            <p className="who-we-are-text">{typeof introContent?.body === 'string' ? introContent.body : t('about.whoWeAreText')}</p>
            <Link to="/who-we-are" className="btn btn-primary">{typeof introContent?.ctaLabel === 'string' ? introContent.ctaLabel : t('about.learnMore')}</Link>
          </div>
        </section>

        <section className="info-cards-section">
          <div className="info-cards-container">
            <div className="info-card">
              <div className="info-card-icon">
                <img src="/vision-icon.png" alt="" width={56} height={56} className="info-card-icon-img" aria-hidden />
              </div>
              <h3 className="info-card-title">{t('about.ourVision')}</h3>
              <p className="info-card-text">{t('about.ourVisionText')}</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <img src="/mission-icon.png" alt="" width={56} height={56} className="info-card-icon-img" aria-hidden />
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
                <div className="trust-slider" aria-roledescription="carousel" aria-label={t('about.ourStoryHeading')}>
                  <img key={storySlideIndex} src={storySlides[storySlideIndex]} alt={storyImageAlt} loading="lazy" />
                  <div className="trust-slider__dots" role="tablist" aria-label={t('about.ourStoryHeading')}>
                    {storySlides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`trust-slider__dot ${idx === storySlideIndex ? 'is-active' : ''}`}
                        onClick={() => setStorySlideIndex(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        aria-current={idx === storySlideIndex ? 'true' : undefined}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="founder-section" aria-labelledby="founder-heading">
          <div className="founder-container">
            <div className="founder-content">
              <div className="founder-image-wrapper">
                <div className="founder-image">
                  <img
                    src={typeof founderContent?.image === 'string' ? founderContent.image : '/dr-mohammed-reda-al-yazidi.png'}
                    alt={typeof founderContent?.imageAlt === 'string' ? founderContent.imageAlt : t('about.founderImageAlt')}
                  />
                </div>
              </div>
              <div className="founder-text">
                <p className="founder-label">{typeof founderContent?.label === 'string' ? founderContent.label : t('about.leadershipLabel')}</p>
                <h2 id="founder-heading" className="founder-heading">{typeof founderContent?.heading === 'string' ? founderContent.heading : t('about.founderHeading')}</h2>
                <p className="founder-desc">{typeof founderContent?.body1 === 'string' ? founderContent.body1 : t('about.founderDesc1')}</p>
                <p className="founder-desc">{typeof founderContent?.body2 === 'string' ? founderContent.body2 : t('about.founderDesc2')}</p>
                <p className="founder-desc">{typeof founderContent?.body3 === 'string' ? founderContent.body3 : t('about.founderDesc3')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="medical-teams" aria-labelledby="medical-team-heading">
          <div className="medical-teams-container">
            <div className="medical-teams-content">
              <div className="medical-teams-text">
                <p className="medical-teams-label">{typeof teamContent?.label === 'string' ? teamContent.label : t('about.ourExpertsLabel')}</p>
                <h2 id="medical-team-heading" className="medical-teams-title">{typeof teamContent?.heading === 'string' ? teamContent.heading : t('about.medicalTeamHeading')}</h2>
                <p className="medical-teams-desc">{typeof teamContent?.body1 === 'string' ? teamContent.body1 : t('about.medicalTeamDesc1')}</p>
                <p className="medical-teams-desc">{typeof teamContent?.body2 === 'string' ? teamContent.body2 : t('about.medicalTeamDesc2')}</p>
                <p className="medical-teams-desc">{typeof teamContent?.body3 === 'string' ? teamContent.body3 : t('about.medicalTeamDesc3')}</p>
                <Link to="/team" className="btn btn-primary">{typeof teamContent?.ctaLabel === 'string' ? teamContent.ctaLabel : t('about.meetMedicalTeam')}</Link>
              </div>
              <div className="medical-teams-image-wrap">
                <div className="medical-teams-image">
                  <img
                    src={typeof teamContent?.image === 'string' ? teamContent.image : '/team-image.png'}
                    alt={typeof teamContent?.imageAlt === 'string' ? teamContent.imageAlt : t('about.medicalTeamImageAlt')}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="social-responsibility" aria-labelledby="responsibility-heading">
          <div className="responsibility-container">
            <p className="responsibility-label">{typeof responsibilityContent?.label === 'string' ? responsibilityContent.label : t('about.givingBackLabel')}</p>
            <h2 id="responsibility-heading" className="responsibility-heading">{typeof responsibilityContent?.heading === 'string' ? responsibilityContent.heading : t('about.socialResponsibilityHeading')}</h2>
            <div className="responsibility-card">
              <div className="responsibility-content">
                <p className="responsibility-text">{typeof responsibilityContent?.body1 === 'string' ? responsibilityContent.body1 : t('about.socialResponsibilityText1')}</p>
                <p className="responsibility-text">{typeof responsibilityContent?.body2 === 'string' ? responsibilityContent.body2 : t('about.socialResponsibilityText2')}</p>
              </div>
              <div className="responsibility-cta">
                <Link to="/who-we-are" className="btn btn-primary">{typeof responsibilityContent?.ctaLabel === 'string' ? responsibilityContent.ctaLabel : t('about.discoverCommunityInitiatives')}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Health Tools teaser (links to full tools page) */}
        <section className="calculate-health calculate-health--teaser">
          <div className="calculate-health__container">
            <p className="calculate-health__label">{t('home.healthToolsLabel')}</p>
            <h2 className="calculate-health__title">{t('home.healthToolsTitle')}</h2>
            <p className="calculate-health__subheading">
              {t('home.healthToolsDesc')}
            </p>
            <Link to="/health-tools" className="calculate-health__cta">
              {t('home.healthToolsCta')}
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
