import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/team.css';

type DoctorSlug = 'dr-mohammed-reda-al-yazidi' | 'dr-safaa-mohammed-mahrez' | 'dr-sirine-al-habib-al-qasimi';

type SpecCard = { titleKey: string; descKey: string };
type TestimonialKeys = { textKey: string; nameKey: string };

const DOCTOR_CONFIG: Record<
  DoctorSlug,
  {
    image: string;
    nameKey: string;
    specKey: string;
    taglineKey?: string;
    bioKey?: string;
    experienceKey: string;
    qualificationKeys: string[];
    specializationDescKey: string;
    specCards: SpecCard[];
    achievementKeys: string[];
    testimonialKeys: TestimonialKeys[];
  }
> = {
  'dr-mohammed-reda-al-yazidi': {
    image: '/dr-mohammed-reda-al-yazidi.png',
    nameKey: 'team.drMohammed',
    specKey: 'team.drMohammedSpec',
    taglineKey: 'team.drMohammedTagline',
    bioKey: 'doctorProfile.drMohammedBio',
    experienceKey: 'doctorProfile.experienceYearsMohammed',
    qualificationKeys: ['doctorProfile.drMohammedQual1', 'doctorProfile.drMohammedQual2', 'doctorProfile.drMohammedQual3', 'doctorProfile.drMohammedQual4'],
    specializationDescKey: 'doctorProfile.drMohammedSpecDesc',
    specCards: [
      { titleKey: 'doctorProfile.drMohammedSpec1Title', descKey: 'doctorProfile.drMohammedSpec1Desc' },
      { titleKey: 'doctorProfile.drMohammedSpec2Title', descKey: 'doctorProfile.drMohammedSpec2Desc' },
      { titleKey: 'doctorProfile.drMohammedSpec3Title', descKey: 'doctorProfile.drMohammedSpec3Desc' },
      { titleKey: 'doctorProfile.drMohammedSpec4Title', descKey: 'doctorProfile.drMohammedSpec4Desc' },
    ],
    achievementKeys: ['doctorProfile.drMohammedAchievement1', 'doctorProfile.drMohammedAchievement2', 'doctorProfile.drMohammedAchievement3'],
    testimonialKeys: [
      { textKey: 'doctorProfile.drMohammedTestimonial1', nameKey: 'doctorProfile.drMohammedTestimonial1Name' },
      { textKey: 'doctorProfile.drMohammedTestimonial2', nameKey: 'doctorProfile.drMohammedTestimonial2Name' },
    ],
  },
  'dr-safaa-mohammed-mahrez': {
    image: '/dr-safaa-mohammed-mahrez.png',
    nameKey: 'team.drSafaa',
    specKey: 'team.drSafaaSpec',
    bioKey: 'doctorProfile.drSafaaBio',
    experienceKey: 'doctorProfile.experienceYearsSafaa',
    qualificationKeys: ['doctorProfile.drSafaaQual1', 'doctorProfile.drSafaaQual2', 'doctorProfile.drSafaaQual3', 'doctorProfile.drSafaaQual4'],
    specializationDescKey: 'doctorProfile.drSafaaSpecDesc',
    specCards: [
      { titleKey: 'doctorProfile.drSafaaSpec1Title', descKey: 'doctorProfile.drSafaaSpec1Desc' },
      { titleKey: 'doctorProfile.drSafaaSpec2Title', descKey: 'doctorProfile.drSafaaSpec2Desc' },
      { titleKey: 'doctorProfile.drSafaaSpec3Title', descKey: 'doctorProfile.drSafaaSpec3Desc' },
      { titleKey: 'doctorProfile.drSafaaSpec4Title', descKey: 'doctorProfile.drSafaaSpec4Desc' },
    ],
    achievementKeys: ['doctorProfile.drSafaaAchievement1', 'doctorProfile.drSafaaAchievement2', 'doctorProfile.drSafaaAchievement3'],
    testimonialKeys: [
      { textKey: 'doctorProfile.drSafaaTestimonial1', nameKey: 'doctorProfile.drSafaaTestimonial1Name' },
      { textKey: 'doctorProfile.drSafaaTestimonial2', nameKey: 'doctorProfile.drSafaaTestimonial2Name' },
    ],
  },
  'dr-sirine-al-habib-al-qasimi': {
    image: '/dr-sirine-al-habib-al-qasimi.png',
    nameKey: 'team.drSirine',
    specKey: 'team.drSirineSpec',
    bioKey: 'doctorProfile.drSirineBio',
    experienceKey: 'doctorProfile.experienceYearsSirine',
    qualificationKeys: ['doctorProfile.drSirineQual1', 'doctorProfile.drSirineQual2', 'doctorProfile.drSirineQual3', 'doctorProfile.drSirineQual4'],
    specializationDescKey: 'doctorProfile.drSirineSpecDesc',
    specCards: [
      { titleKey: 'doctorProfile.drSirineSpec1Title', descKey: 'doctorProfile.drSirineSpec1Desc' },
      { titleKey: 'doctorProfile.drSirineSpec2Title', descKey: 'doctorProfile.drSirineSpec2Desc' },
      { titleKey: 'doctorProfile.drSirineSpec3Title', descKey: 'doctorProfile.drSirineSpec3Desc' },
      { titleKey: 'doctorProfile.drSirineSpec4Title', descKey: 'doctorProfile.drSirineSpec4Desc' },
    ],
    achievementKeys: ['doctorProfile.drSirineAchievement1', 'doctorProfile.drSirineAchievement2', 'doctorProfile.drSirineAchievement3'],
    testimonialKeys: [
      { textKey: 'doctorProfile.drSirineTestimonial1', nameKey: 'doctorProfile.drSirineTestimonial1Name' },
      { textKey: 'doctorProfile.drSirineTestimonial2', nameKey: 'doctorProfile.drSirineTestimonial2Name' },
    ],
  },
};

/* Icons matching design: teal, line-art style */
const IconClipboard = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h8" />
  </svg>
);
const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconBandage = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconMobility = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);
const IconJoint = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M4 10v4" />
    <path d="M20 10v4" />
    <path d="M2 18v2" />
    <path d="M22 18v2" />
    <path d="M8 10h8" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
  </svg>
);
const IconSports = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);


function DoctorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const config = slug && slug in DOCTOR_CONFIG ? DOCTOR_CONFIG[slug as DoctorSlug] : null;

  if (!config) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="main-content doctor-profile-page">
          <div className="doctor-profile-not-found content-inner">
            <p>{t('doctorProfile.notFound')}</p>
            <Link to="/team" className="btn btn-primary">{t('doctorProfile.backToTeam')}</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const bioParagraphs = (config.bioKey ? t(config.bioKey) : t('doctorProfile.mockBio')).split('\n\n').filter(Boolean);
  const firstBioPara = bioParagraphs[0] || '';
  const approachParagraphs = bioParagraphs.length > 1 ? bioParagraphs.slice(1) : bioParagraphs;

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content doctor-profile-page">
        {/* Hero: circular photo left, text right — design-accurate */}
        <section className="doctor-profile-hero">
          <div className="page-hero-bg" aria-hidden="true" />
          <div className="content-inner doctor-profile-hero-inner">
            <Link to="/team" className="doctor-profile-back">
              {isRtl ? <>{t('doctorProfile.backToTeam')} →</> : <>← {t('doctorProfile.backToTeam')}</>}
            </Link>
            <div className="doctor-profile-hero-grid">
              <div className="doctor-profile-photo-wrap">
                <img
                  src={config.image}
                  alt={t(config.nameKey)}
                  className="doctor-profile-image"
                />
              </div>
              <div className="doctor-profile-hero-content">
                <p className="doctor-profile-label">
                  {t(config.specKey).toUpperCase()}
                </p>
                <h1 className="doctor-profile-name">{t(config.nameKey)}</h1>
                <p className="doctor-profile-spec">{t(config.specKey)}</p>
                <p className="doctor-profile-experience">{t(config.experienceKey)}</p>
                <p className="doctor-profile-intro">
                  {firstBioPara}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifications (with icon) + Approach & Philosophy (with icon) — two columns */}
        <section className="doctor-profile-main">
          <div className="content-inner doctor-profile-main-inner">
            <div className="doctor-profile-two-cols">
              <div className="doctor-profile-block">
                <h2 className="doctor-profile-block-heading">
                  <span className="doctor-profile-block-icon" aria-hidden><IconClipboard /></span>
                  {t('doctorProfile.qualificationsTitle')}
                </h2>
                <div className="doctor-profile-qual-list">
                  {config.qualificationKeys.map((key) => (
                    <div key={key} className="doctor-profile-qual-item">
                      <span className="doctor-profile-qual-icon" aria-hidden><IconPin /></span>
                      <span>{t(key)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="doctor-profile-block">
                <h2 className="doctor-profile-block-heading">
                  <span className="doctor-profile-block-icon" aria-hidden><IconBook /></span>
                  {t('doctorProfile.approachTitle')}
                </h2>
                <div className="doctor-profile-text">
                  {approachParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* My Specialization — centered heading, 4 cards with teal icons, light grey bg */}
            <section className="doctor-profile-subsection doctor-profile-subsection--center">
              <h2 className="doctor-profile-subheading">{t('doctorProfile.specializationTitle')}</h2>
              <p className="doctor-profile-subdesc">
                {t(config.specializationDescKey)}
              </p>
              <div className="doctor-profile-spec-grid">
                {config.specCards.map((card, idx) => {
                  const icons = [IconBandage, IconMobility, IconJoint, IconSports];
                  const Icon = icons[idx] || IconBandage;
                  return (
                    <div key={idx} className="doctor-profile-spec-card">
                      <div className="doctor-profile-spec-icon" aria-hidden><Icon /></div>
                      <h3 className="doctor-profile-spec-card-title">{t(card.titleKey)}</h3>
                      <p className="doctor-profile-spec-card-desc">{t(card.descKey)}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Key Achievements — centered, single bordered box, teal numbered circles */}
            <section className="doctor-profile-subsection doctor-profile-subsection--center">
              <h2 className="doctor-profile-subheading">{t('doctorProfile.achievementsTitle')}</h2>
              <div className="doctor-profile-achievements-box">
                {config.achievementKeys.map((key, idx) => (
                  <div key={key} className="doctor-profile-achievement-row">
                    <span className="doctor-profile-achievement-num" aria-hidden>{idx + 1}</span>
                    <p className="doctor-profile-achievement-text">{t(key)}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Patient Testimonials — centered, two cards, large teal quote */}
            <section className="doctor-profile-subsection doctor-profile-subsection--center doctor-profile-testimonials">
              <h2 className="doctor-profile-subheading">{t('doctorProfile.testimonialsTitle')}</h2>
              <div className="doctor-profile-testimonials-grid">
                {config.testimonialKeys.map((testimonial, idx) => (
                  <article key={idx} className="doctor-profile-testimonial-card">
                    <span className="doctor-profile-quote-mark" aria-hidden>"</span>
                    <p className="doctor-profile-testimonial-text">
                      {t(testimonial.textKey)}
                    </p>
                    <p className="doctor-profile-testimonial-name">{t(testimonial.nameKey)}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        <CtaSection variant="dark-cards" />
      </main>
      <Footer />
    </div>
  );
}

export default DoctorProfile;
