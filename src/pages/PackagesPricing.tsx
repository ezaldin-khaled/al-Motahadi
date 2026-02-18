import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { WhatsAppIcon } from '../components/Icons';
import { CONTACT_PATH } from '../constants/cta';
import '../styles/packages.css';

type PackageCard = {
  id: string;
  title: string;
  sessions: string;
  discount: string;
  discountPercent?: number;
  price: string;
  priceNote?: string;
  buttonLabel: string;
};

function PackageCardItem({ item, currency, priceAfterLabel }: { item: PackageCard; currency: string; priceAfterLabel: (p: number) => string }) {
  return (
    <div className="package-card">
      <span className="package-card-badge">{item.discount}</span>
      <h3 className="package-card-title">{item.title}</h3>
      <p className="package-card-sessions">{item.sessions}</p>
      {item.price && (
        <>
          <p className="package-card-price">{item.price} <span className="package-card-currency">{currency}</span></p>
          {item.discountPercent != null && (
            <p className="package-card-price-after">{priceAfterLabel(item.discountPercent)}</p>
          )}
        </>
      )}
      {item.priceNote && <p className="package-card-price-note">{item.priceNote}</p>}
      <Link to={CONTACT_PATH} className="package-card-btn btn btn-primary">{item.buttonLabel}</Link>
    </div>
  );
}

const WHATSAPP_URL = 'https://wa.me/YOUR_PHONE_NUMBER';

export default function PackagesPricing() {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currency = t('packages.currency');
  const bookNow = t('packages.bookNow');
  const priceAfterLabel = (percent: number) => t('packages.priceAfterDiscount', { percent });

  const individualPackages: PackageCard[] = [
    { id: 'ind-1', title: t('packages.tawakkalna'), sessions: t('packages.tawakkalnaSessions'), discount: t('packages.tawakkalnaDiscount'), discountPercent: 10, price: '103.5', buttonLabel: bookNow },
    { id: 'ind-2', title: t('packages.wathiq'), sessions: t('packages.wathiqSessions'), discount: t('packages.wathiqDiscount'), discountPercent: 15, price: '195.5', buttonLabel: bookNow },
    { id: 'ind-3', title: t('packages.tasallam'), sessions: t('packages.tasallamSessions'), discount: t('packages.tasallamDiscount'), discountPercent: 20, price: '276', buttonLabel: bookNow },
    { id: 'ind-4', title: t('packages.hanit'), sessions: t('packages.hanitSessions'), discount: t('packages.hanitDiscount'), discountPercent: 25, price: '345', buttonLabel: bookNow },
    { id: 'ind-5', title: t('packages.almotahadiPkg'), sessions: t('packages.almotahadiPkgSessions'), discount: t('packages.almotahadiPkgDiscount'), discountPercent: 30, price: '483', buttonLabel: bookNow },
  ];

  const corporatePackages: PackageCard[] = [
    { id: 'corp-1', title: t('packages.tawakkalnaCorp'), sessions: t('packages.tawakkalnaCorpSessions'), discount: t('packages.tawakkalnaCorpDiscount'), discountPercent: 15, price: '97.75', buttonLabel: bookNow },
    { id: 'corp-2', title: t('packages.wathiqCorp'), sessions: t('packages.wathiqCorpSessions'), discount: t('packages.wathiqCorpDiscount'), discountPercent: 20, price: '184', buttonLabel: bookNow },
    { id: 'corp-3', title: t('packages.tasallamCorp'), sessions: t('packages.tasallamCorpSessions'), discount: t('packages.tasallamCorpDiscount'), discountPercent: 25, price: '258.75', buttonLabel: bookNow },
    { id: 'corp-4', title: t('packages.hanitCorp'), sessions: t('packages.hanitCorpSessions'), discount: t('packages.hanitCorpDiscount'), discountPercent: 30, price: '322', buttonLabel: bookNow },
    { id: 'corp-5', title: t('packages.almotahadiCorp'), sessions: t('packages.almotahadiCorpSessions'), discount: t('packages.almotahadiCorpDiscount'), discountPercent: 35, price: '448.5', buttonLabel: bookNow },
  ];

  const ehataPackages: PackageCard[] = [
    { id: 'ehata-1', title: t('packages.alIhsan'), sessions: t('packages.alIhsanSessions'), discount: t('packages.alIhsanDiscount'), discountPercent: 25, price: '258.75', buttonLabel: bookNow },
    { id: 'ehata-2', title: t('packages.alRiayah'), sessions: t('packages.alRiayahSessions'), discount: t('packages.alRiayahDiscount'), discountPercent: 30, price: '161', buttonLabel: bookNow },
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
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-whatsapp" aria-label={t('cta.whatsapp')}>
                <WhatsAppIcon className="whatsapp-icon" />
                {t('cta.whatsapp')}
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
                <PackageCardItem key={pkg.id} item={pkg} currency={currency} priceAfterLabel={priceAfterLabel} />
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
                <PackageCardItem key={pkg.id} item={pkg} currency={currency} priceAfterLabel={priceAfterLabel} />
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
                <PackageCardItem key={pkg.id} item={pkg} currency={currency} priceAfterLabel={priceAfterLabel} />
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
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-whatsapp" aria-label={t('cta.whatsapp')}>
                    <WhatsAppIcon className="whatsapp-icon" />
                    {t('cta.whatsapp')}
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
