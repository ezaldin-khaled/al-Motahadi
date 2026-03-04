import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/research-network.css';

/* Icons for protocol cards (teal, circular bg) */
const IconAssessment = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const IconGoals = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
    <path d="M16 16l-4-4-4 4" />
  </svg>
);

const IconReview = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M16 21h5v-5" />
  </svg>
);

const IconCollaboration = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconMedical = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 2v20M2 12h20" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

export default function ResearchProtocols() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="rn-page">
        {/* 1. Hero */}
        <section className="rn-hero" aria-label={t('researchNetwork.heroTitle')}>
          <div className="rn-hero-inner">
            <div className="rn-hero-content">
              <span className="rn-hero-label">{t('researchNetwork.heroLabel')}</span>
              <h1 className="rn-hero-title">{t('researchNetwork.heroTitle')}</h1>
              <p className="rn-hero-desc">{t('researchNetwork.heroDesc')}</p>
            </div>
            <div className="rn-hero-image">
              <div className="rn-hero-image-card">
                <img src="/research-network-hero.png" alt={t('researchNetwork.heroImageAlt')} />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Foundation of Our Vision */}
        <section className="rn-section rn-section-white" aria-labelledby="rn-foundation-title">
          <div className="rn-container">
            <h2 id="rn-foundation-title" className="rn-section-title">{t('researchNetwork.foundationTitle')}</h2>
            <p className="rn-section-intro">{t('researchNetwork.foundationIntro')}</p>
            <p className="rn-section-desc">{t('researchNetwork.foundationP1')}</p>
            <p className="rn-section-desc">{t('researchNetwork.foundationP2')}</p>
          </div>
        </section>

        {/* 3. A Dynamic, Practical System */}
        <section className="rn-section rn-section-teal" aria-labelledby="rn-dynamic-title">
          <div className="rn-dynamic-inner">
            <div className="rn-dynamic-content">
              <h2 id="rn-dynamic-title" className="rn-section-title">{t('researchNetwork.dynamicTitle')}</h2>
              <p className="rn-dynamic-desc">{t('researchNetwork.dynamicDesc')}</p>
            </div>
            <div className="rn-stat-cards">
              <div className="rn-stat-card">
                <div className="rn-stat-value">{t('researchNetwork.stat1Value')}</div>
                <div className="rn-stat-label">{t('researchNetwork.stat1Label')}</div>
                <p className="rn-stat-sub">{t('researchNetwork.stat1Sub')}</p>
              </div>
              <div className="rn-stat-card">
                <div className="rn-stat-value">{t('researchNetwork.stat2Value')}</div>
                <div className="rn-stat-label">{t('researchNetwork.stat2Label')}</div>
                <p className="rn-stat-sub">{t('researchNetwork.stat2Sub')}</p>
              </div>
              <div className="rn-stat-card">
                <div className="rn-stat-value">{t('researchNetwork.stat3Value')}</div>
                <div className="rn-stat-label">{t('researchNetwork.stat3Label')}</div>
                <p className="rn-stat-sub">{t('researchNetwork.stat3Sub')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How Does the Research Network Translate */}
        <section className="rn-section rn-section-white" aria-labelledby="rn-translate-title">
          <div className="rn-container">
            <h2 id="rn-translate-title" className="rn-section-title">{t('researchNetwork.translateTitle')}</h2>
            <p className="rn-section-intro">{t('researchNetwork.translateIntro')}</p>
            <div className="rn-translate-wrap">
            <div className="rn-translate-grid">
              <div className="rn-translate-block">
                <h3 className="rn-translate-block-title">{t('researchNetwork.translate1Title')}</h3>
                <p className="rn-translate-block-desc">{t('researchNetwork.translate1Desc')}</p>
              </div>
              <div className="rn-translate-block">
                <h3 className="rn-translate-block-title">{t('researchNetwork.translate2Title')}</h3>
                <p className="rn-translate-block-desc">{t('researchNetwork.translate2Desc')}</p>
              </div>
              <div className="rn-translate-block">
                <h3 className="rn-translate-block-title">{t('researchNetwork.translate3Title')}</h3>
                <p className="rn-translate-block-desc">{t('researchNetwork.translate3Desc')}</p>
              </div>
              <div className="rn-translate-block">
                <h3 className="rn-translate-block-title">{t('researchNetwork.translate4Title')}</h3>
                <p className="rn-translate-block-desc">{t('researchNetwork.translate4Desc')}</p>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* 5. Dynamic Treatment Protocols... Not Rigid */}
        <section className="rn-section rn-section-teal" aria-labelledby="rn-protocols-title">
          <div className="rn-container">
            <h2 id="rn-protocols-title" className="rn-section-title">{t('researchNetwork.protocolsTitle')}</h2>
            <p className="rn-section-intro">{t('researchNetwork.protocolsIntro')}</p>
          </div>
          <div className="rn-protocols-grid">
            <div className="rn-protocol-card">
              <div className="rn-protocol-icon"><IconAssessment /></div>
              <h3 className="rn-protocol-title">{t('researchNetwork.protocol1Title')}</h3>
              <p className="rn-protocol-desc">{t('researchNetwork.protocol1Desc')}</p>
            </div>
            <div className="rn-protocol-card">
              <div className="rn-protocol-icon"><IconGoals /></div>
              <h3 className="rn-protocol-title">{t('researchNetwork.protocol2Title')}</h3>
              <p className="rn-protocol-desc">{t('researchNetwork.protocol2Desc')}</p>
            </div>
            <div className="rn-protocol-card">
              <div className="rn-protocol-icon"><IconReview /></div>
              <h3 className="rn-protocol-title">{t('researchNetwork.protocol3Title')}</h3>
              <p className="rn-protocol-desc">{t('researchNetwork.protocol3Desc')}</p>
            </div>
            <div className="rn-protocol-card">
              <div className="rn-protocol-icon"><IconCollaboration /></div>
              <h3 className="rn-protocol-title">{t('researchNetwork.protocol4Title')}</h3>
              <p className="rn-protocol-desc">{t('researchNetwork.protocol4Desc')}</p>
            </div>
          </div>
        </section>

        {/* 6. The Medical Team's Role in Research & Development */}
        <section className="rn-section rn-section-white" aria-labelledby="rn-team-role-title">
          <div className="rn-team-inner">
            <div className="rn-team-content">
              <h2 id="rn-team-role-title" className="rn-section-title">{t('researchNetwork.teamRoleTitle')}</h2>
              <p className="rn-section-desc">{t('researchNetwork.teamRoleP1')}</p>
              <p className="rn-section-desc">{t('researchNetwork.teamRoleP2')}</p>
            </div>
            <div className="rn-team-blocks">
              <div>
                <h3 className="rn-team-block-title">{t('researchNetwork.teamRole1Title')}</h3>
                <p className="rn-team-block-desc">{t('researchNetwork.teamRole1Desc')}</p>
              </div>
              <div>
                <h3 className="rn-team-block-title">{t('researchNetwork.teamRole2Title')}</h3>
                <p className="rn-team-block-desc">{t('researchNetwork.teamRole2Desc')}</p>
              </div>
              <div>
                <h3 className="rn-team-block-title">{t('researchNetwork.teamRole3Title')}</h3>
                <p className="rn-team-block-desc">{t('researchNetwork.teamRole3Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Why Does This Make a Real Difference for the Patient */}
        <section className="rn-section rn-section-white" aria-labelledby="rn-patient-title">
          <div className="rn-container">
            <h2 id="rn-patient-title" className="rn-section-title">{t('researchNetwork.patientTitle')}</h2>
            <p className="rn-section-intro">{t('researchNetwork.patientIntro')}</p>
          </div>
          <div className="rn-patient-grid">
            <div className="rn-patient-block">
              <span className="rn-patient-icon" aria-hidden><IconMedical /></span>
              <h3 className="rn-patient-title">{t('researchNetwork.patient1Title')}</h3>
              <p className="rn-patient-desc">{t('researchNetwork.patient1Desc')}</p>
            </div>
            <div className="rn-patient-block">
              <span className="rn-patient-icon" aria-hidden><IconMedical /></span>
              <h3 className="rn-patient-title">{t('researchNetwork.patient2Title')}</h3>
              <p className="rn-patient-desc">{t('researchNetwork.patient2Desc')}</p>
            </div>
            <div className="rn-patient-block">
              <span className="rn-patient-icon" aria-hidden><IconMedical /></span>
              <h3 className="rn-patient-title">{t('researchNetwork.patient3Title')}</h3>
              <p className="rn-patient-desc">{t('researchNetwork.patient3Desc')}</p>
            </div>
            <div className="rn-patient-block">
              <span className="rn-patient-icon" aria-hidden><IconMedical /></span>
              <h3 className="rn-patient-title">{t('researchNetwork.patient4Title')}</h3>
              <p className="rn-patient-desc">{t('researchNetwork.patient4Desc')}</p>
            </div>
          </div>
        </section>

        {/* 8. CTA — Begin Your Recovery Journey (dark, contact cards) */}
        <CtaSection variant="dark-cards" labelKey="cta.readyToStart" />
      </main>
      <Footer />
    </div>
  );
}
