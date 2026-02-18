import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { CONTACT_PATH } from '../constants/cta';
import '../styles/team.css';

function OurTeam() {
  const { t } = useTranslation();
  return (
    <div className="page-wrapper">
      <div className="top-line"></div>
      <Header />

      <section className="team-hero">
        <div className="page-hero-bg" aria-hidden="true" />
        <div className="content-inner team-hero-inner">
          <p className="team-hero-label">{t('team.heroLabel')}</p>
          <h1 className="team-hero-title">{t('team.heroTitle')}</h1>
          <p className="team-hero-desc">{t('team.heroDesc')}</p>
          <p className="team-hero-subdesc">{t('team.heroSubdesc')}</p>
        </div>
      </section>

      <section className="team-model-section">
        <div className="content-inner">
          <h2 className="section-title-team">{t('team.modelTitle')}</h2>
          <p className="section-desc-team">{t('team.modelDesc')}</p>
          <div className="section-cta">
            <Link to={CONTACT_PATH} className="btn btn-primary">{t('nav.bookAppointment')}</Link>
          </div>
        </div>
      </section>

      <section className="team-features-section">
        <div className="content-inner">
          <h2 className="section-title-team">{t('team.featuresTitle')}</h2>
          <div className="team-features-grid">
            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="feature-card-title">{t('team.seamlessCare')}</h3>
              <p className="feature-card-desc">{t('team.seamlessCareDesc')}</p>
            </div>
            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="feature-card-title">{t('team.patientCommunication')}</h3>
              <p className="feature-card-desc">{t('team.patientCommunicationDesc')}</p>
            </div>
            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3 className="feature-card-title">{t('team.holisticApproach')}</h3>
              <p className="feature-card-desc">{t('team.holisticApproachDesc')}</p>
            </div>
            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="M8 7h8" />
                  <path d="M8 11h8" />
                </svg>
              </div>
              <h3 className="feature-card-title">{t('team.continuousDevelopment')}</h3>
              <p className="feature-card-desc">{t('team.continuousDevelopmentDesc')}</p>
            </div>
            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="feature-card-title">{t('team.qualityProfessionalism')}</h3>
              <p className="feature-card-desc">{t('team.qualityProfessionalismDesc')}</p>
            </div>
            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-card-title">{t('team.collaborativeTeamwork')}</h3>
              <p className="feature-card-desc">{t('team.collaborativeTeamworkDesc')}</p>
            </div>
          </div>
          <div className="team-features-cta">
            <Link to={CONTACT_PATH} className="btn btn-primary">{t('nav.bookAppointment')}</Link>
          </div>
        </div>
      </section>

      <section className="team-philosophy-section">
        <div className="content-inner">
          <p className="team-features-section-label">{t('team.missionLabel')}</p>
          <h2 className="section-title-team">{t('team.philosophyTitle')}</h2>
          <p className="section-desc-team">{t('team.philosophyDesc1')}</p>
          <p className="section-desc-team philosophy-extra">{t('team.philosophyDesc2')}</p>
          <div className="section-cta">
            <Link to={CONTACT_PATH} className="btn btn-primary">{t('nav.bookAppointment')}</Link>
          </div>
        </div>
      </section>

      <section className="team-members-section">
        <div className="content-inner">
          <p className="team-members-section-label">{t('team.membersLabel')}</p>
          <h2 className="section-title-team">{t('team.meetTeamTitle')}</h2>
          <div className="team-members-grid">
            <div className="team-member-card">
              <div className="team-member-image">
                <img src="/dr-mohammed-reda-al-yazidi.png" alt={t('team.drMohammed')} />
              </div>
              <div className="team-member-card-content">
                <h3 className="team-member-name">{t('team.drMohammed')}</h3>
                <p className="team-member-specialization">{t('team.drMohammedSpec')}</p>
                <p className="team-member-tagline">{t('team.drMohammedTagline')}</p>
                <Link to="/about" className="btn btn-primary team-member-cta">{t('team.viewProfile')}</Link>
              </div>
            </div>
            <div className="team-member-card">
              <div className="team-member-image">
                <img src="/dr-safaa-mohammed-mahrez.png" alt={t('team.drSafaa')} />
              </div>
              <div className="team-member-card-content">
                <h3 className="team-member-name">{t('team.drSafaa')}</h3>
                <p className="team-member-specialization">{t('team.drSafaaSpec')}</p>
                <Link to="/about" className="btn btn-primary team-member-cta">{t('team.viewProfile')}</Link>
              </div>
            </div>
            <div className="team-member-card">
              <div className="team-member-image">
                <img src="/dr-sirine-al-habib-al-qasimi.png" alt={t('team.drSirine')} />
              </div>
              <div className="team-member-card-content">
                <h3 className="team-member-name">{t('team.drSirine')}</h3>
                <p className="team-member-specialization">{t('team.drSirineSpec')}</p>
                <Link to="/about" className="btn btn-primary team-member-cta">{t('team.viewProfile')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />

      <Footer />
    </div>
  );
}

export default OurTeam;
