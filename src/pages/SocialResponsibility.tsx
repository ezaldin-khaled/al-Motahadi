import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/social-responsibility.css';

export default function SocialResponsibility() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    { nameKey: 'socialResponsibility.packageIhsaamName', descKey: 'socialResponsibility.packageIhsaamDesc' },
    { nameKey: 'socialResponsibility.packageCareName', descKey: 'socialResponsibility.packageCareDesc' },
    { nameKey: 'socialResponsibility.packageHopeName', descKey: 'socialResponsibility.packageHopeDesc' },
    { nameKey: 'socialResponsibility.packageStepName', descKey: 'socialResponsibility.packageStepDesc' },
  ];

  const initiatives = [
    'socialResponsibility.initiative1',
    'socialResponsibility.initiative2',
    'socialResponsibility.initiative3',
  ];

  return (
    <div className="page-wrapper">
      <Header />
      <main className="social-responsibility-page">
        <section className="sr-hero" aria-label="Our Social Responsibility">
          <div className="sr-hero-bg" aria-hidden="true" />
          <div className="sr-hero-inner">
            <span className="sr-hero-label">{t('socialResponsibility.heroLabel')}</span>
            <h1 className="sr-hero-title">{t('socialResponsibility.heroTitle')}</h1>
            <p className="sr-hero-desc">{t('socialResponsibility.heroDesc')}</p>
          </div>
        </section>

        <section className="sr-ihata" aria-labelledby="ihata-heading">
          <div className="sr-ihata-container">
            <h2 id="ihata-heading" className="sr-ihata-heading">{t('socialResponsibility.ihataHeading')}</h2>
            <p className="sr-ihata-text">{t('socialResponsibility.ihataText1')}</p>
            <p className="sr-ihata-text">{t('socialResponsibility.ihataText2')}</p>
          </div>
        </section>

        <section className="sr-packages" aria-labelledby="packages-heading">
          <div className="sr-packages-container">
            <h2 id="packages-heading" className="sr-packages-heading">{t('socialResponsibility.packagesHeading')}</h2>
            <p className="sr-packages-sub">{t('socialResponsibility.packagesSub')}</p>
            <div className="sr-packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.nameKey} className="sr-package-card">
                  <h3 className="sr-package-name">{t(pkg.nameKey)}</h3>
                  <p className="sr-package-desc">{t(pkg.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sr-initiatives" aria-labelledby="initiatives-heading">
          <div className="sr-initiatives-container">
            <h2 id="initiatives-heading" className="sr-initiatives-heading">{t('socialResponsibility.initiativesHeading')}</h2>
            <p className="sr-initiatives-sub">{t('socialResponsibility.initiativesSub')}</p>
            <div className="sr-initiatives-list">
              {initiatives.map((key, index) => (
                <div key={key} className="sr-initiative-card">
                  <span className="sr-initiative-num" aria-hidden="true">{index + 1}</span>
                  <p className="sr-initiative-text">{t(key)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
