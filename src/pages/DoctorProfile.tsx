import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/team.css';

type DoctorSlug = 'dr-mohammed-reda-al-yazidi' | 'dr-safaa-mohammed-mahrez' | 'dr-sirine-al-habib-al-qasimi';

const DOCTOR_CONFIG: Record<
  DoctorSlug,
  { image: string; nameKey: string; specKey: string; taglineKey?: string; bioKey?: string }
> = {
  'dr-mohammed-reda-al-yazidi': {
    image: '/dr-mohammed-reda-al-yazidi.png',
    nameKey: 'team.drMohammed',
    specKey: 'team.drMohammedSpec',
    taglineKey: 'team.drMohammedTagline',
    bioKey: 'doctorProfile.drMohammedBio',
  },
  'dr-safaa-mohammed-mahrez': {
    image: '/dr-safaa-mohammed-mahrez.png',
    nameKey: 'team.drSafaa',
    specKey: 'team.drSafaaSpec',
    bioKey: 'doctorProfile.drSafaaBio',
  },
  'dr-sirine-al-habib-al-qasimi': {
    image: '/dr-sirine-al-habib-al-qasimi.png',
    nameKey: 'team.drSirine',
    specKey: 'team.drSirineSpec',
    bioKey: 'doctorProfile.drSirineBio',
  },
};

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

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content doctor-profile-page">
        <section className="doctor-profile-section">
          <div className="content-inner doctor-profile-inner">
            <Link to="/team" className="doctor-profile-back">{isRtl ? <>{t('doctorProfile.backToTeam')} →</> : <>← {t('doctorProfile.backToTeam')}</>}</Link>
            <div className="doctor-profile-grid">
              <div className="doctor-profile-image-wrap">
                <img
                  src={config.image}
                  alt={t(config.nameKey)}
                  className="doctor-profile-image"
                />
              </div>
              <div className="doctor-profile-content">
                <h1 className="doctor-profile-name">{t(config.nameKey)}</h1>
                <p className="doctor-profile-spec">{t(config.specKey)}</p>
                {config.taglineKey && (
                  <p className="doctor-profile-tagline">{t(config.taglineKey)}</p>
                )}
                <div className="doctor-profile-block">
                  <h2 className="doctor-profile-heading">{t('doctorProfile.aboutHeading')}</h2>
                  <div className="doctor-profile-text">
                    {(config.bioKey ? t(config.bioKey) : t('doctorProfile.mockBio'))
                      .split('\n\n')
                      .map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default DoctorProfile;
