import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { CONTACT_PATH } from '../constants/cta';
import '../styles/packages.css';

type PackageCard = {
  id: string;
  title: string;
  sessions: string;
  discount: string;
  price: string;
  priceNote?: string;
  buttonLabel: string;
};

function PackageCardItem({ item, currency }: { item: PackageCard; currency: string }) {
  return (
    <div className="package-card">
      <span className="package-card-badge">{item.discount}</span>
      <h3 className="package-card-title">{item.title}</h3>
      <p className="package-card-sessions">{item.sessions}</p>
      {item.price && (
        <p className="package-card-price">{item.price} <span className="package-card-currency">{currency}</span></p>
      )}
      {item.priceNote && <p className="package-card-price-note">{item.priceNote}</p>}
      <Link to={CONTACT_PATH} className="package-card-btn btn btn-primary">{item.buttonLabel}</Link>
    </div>
  );
}

const whatsappSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function PackagesPricing() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currency = t('packages.currency');
  const bookNow = t('packages.bookNow');

  const individualPackages: PackageCard[] = [
    { id: 'ind-1', title: t('packages.tawakkalna'), sessions: t('packages.tawakkalnaSessions'), discount: t('packages.tawakkalnaDiscount'), price: '103.5', buttonLabel: bookNow },
    { id: 'ind-2', title: t('packages.wathiq'), sessions: t('packages.wathiqSessions'), discount: t('packages.wathiqDiscount'), price: '195.5', buttonLabel: bookNow },
    { id: 'ind-3', title: t('packages.tasallam'), sessions: t('packages.tasallamSessions'), discount: t('packages.tasallamDiscount'), price: '276', buttonLabel: bookNow },
    { id: 'ind-4', title: t('packages.hanit'), sessions: t('packages.hanitSessions'), discount: t('packages.hanitDiscount'), price: '345', buttonLabel: bookNow },
    { id: 'ind-5', title: t('packages.almotahadiPkg'), sessions: t('packages.almotahadiPkgSessions'), discount: t('packages.almotahadiPkgDiscount'), price: '483', buttonLabel: bookNow },
  ];

  const corporatePackages: PackageCard[] = [
    { id: 'corp-1', title: t('packages.tawakkalnaCorp'), sessions: t('packages.tawakkalnaCorpSessions'), discount: t('packages.tawakkalnaCorpDiscount'), price: '97.75', buttonLabel: bookNow },
    { id: 'corp-2', title: t('packages.wathiqCorp'), sessions: t('packages.wathiqCorpSessions'), discount: t('packages.wathiqCorpDiscount'), price: '184', buttonLabel: bookNow },
    { id: 'corp-3', title: t('packages.tasallamCorp'), sessions: t('packages.tasallamCorpSessions'), discount: t('packages.tasallamCorpDiscount'), price: '258.75', buttonLabel: bookNow },
    { id: 'corp-4', title: t('packages.hanitCorp'), sessions: t('packages.hanitCorpSessions'), discount: t('packages.hanitCorpDiscount'), price: '322', buttonLabel: bookNow },
    { id: 'corp-5', title: t('packages.almotahadiCorp'), sessions: t('packages.almotahadiCorpSessions'), discount: t('packages.almotahadiCorpDiscount'), price: '448.5', buttonLabel: bookNow },
  ];

  const ehataPackages: PackageCard[] = [
    { id: 'ehata-1', title: t('packages.alIhsan'), sessions: t('packages.alIhsanSessions'), discount: t('packages.alIhsanDiscount'), price: '258.75', buttonLabel: bookNow },
    { id: 'ehata-2', title: t('packages.alRiayah'), sessions: t('packages.alRiayahSessions'), discount: t('packages.alRiayahDiscount'), price: '161', buttonLabel: bookNow },
    { id: 'ehata-3', title: t('packages.khatwa'), sessions: t('packages.khatwaSessions'), discount: t('packages.khatwaDiscount'), price: '', priceNote: t('packages.khatwaPriceNote'), buttonLabel: bookNow },
    { id: 'ehata-4', title: t('packages.alAmal'), sessions: t('packages.alAmalSessions'), discount: t('packages.alAmalDiscount'), price: '', priceNote: t('packages.alAmalPriceNote'), buttonLabel: bookNow },
  ];

  return (
    <div className="page-wrapper">
      <Header />
      <main className="packages-page">
        <section className="packages-hero">
          <div className="page-hero-bg" aria-hidden="true" />
          <div className="packages-hero-inner">
            <h1 className="packages-hero-title">{t('packages.heroTitle')}</h1>
            <p className="packages-hero-desc">{t('packages.heroDesc')}</p>
            <p className="packages-hero-desc packages-hero-desc-secondary">{t('packages.heroDescSecondary')}</p>
            <div className="packages-hero-buttons cta-buttons">
              <Link to={CONTACT_PATH} className="btn btn-primary">{t('packages.bookAppointment')}</Link>
              <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer" className="btn btn-secondary packages-btn-outline">
                {whatsappSvg}
                {t('packages.whatsappUs')}
              </a>
            </div>
          </div>
        </section>

        <section className="packages-section packages-section-white" id="individual">
          <div className="packages-section-inner">
            <p className="packages-section-label">{t('packages.forIndividuals')}</p>
            <h2 className="packages-section-title">{t('packages.individualPackages')}</h2>
            <div className="packages-grid packages-grid-5">
              {individualPackages.map((pkg) => (
                <PackageCardItem key={pkg.id} item={pkg} currency={currency} />
              ))}
            </div>
          </div>
        </section>

        <section className="packages-section packages-section-gray" id="corporate">
          <div className="packages-section-inner">
            <p className="packages-section-label">{t('packages.forOrganizations')}</p>
            <h2 className="packages-section-title">{t('packages.corporatePackages')}</h2>
            <div className="packages-grid packages-grid-5">
              {corporatePackages.map((pkg) => (
                <PackageCardItem key={pkg.id} item={pkg} currency={currency} />
              ))}
            </div>
          </div>
        </section>

        <section className="packages-section packages-section-white">
          <div className="packages-section-inner">
            <p className="packages-section-label">{t('packages.communityCare')}</p>
            <h2 className="packages-section-title">{t('packages.ehataPackages')}</h2>
            <div className="packages-grid packages-grid-4">
              {ehataPackages.map((pkg) => (
                <PackageCardItem key={pkg.id} item={pkg} currency={currency} />
              ))}
            </div>
          </div>
        </section>

        <section className="packages-section packages-section-gray packages-section-single">
          <div className="packages-section-inner">
            <div className="packages-single-wrap">
              <div className="package-card package-card-single">
                <h3 className="package-card-title">{t('packages.singleSessionTitle')}</h3>
                <p className="package-card-price">{t('packages.singleSessionPrice')} <span className="package-card-currency">{currency}</span></p>
                <div className="package-card-actions">
                  <Link to={CONTACT_PATH} className="package-card-btn btn btn-primary">{t('packages.bookAppointment')}</Link>
                  <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer" className="btn btn-secondary packages-btn-outline">
                    {whatsappSvg}
                    {t('packages.whatsappUs')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaSection variant="dark-cards" />
      </main>
      <Footer />
    </div>
  );
}
