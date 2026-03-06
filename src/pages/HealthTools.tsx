import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CtaSection from '../components/CtaSection';
import HealthCalculator from '../components/HealthCalculator';
import '../styles/health-calculator.css';

export default function HealthTools() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'bmi' | 'bmr'>('bmi');

  const benefitsBmi = [
    { title: t('healthToolsPage.benefitsBmi1Title'), desc: t('healthToolsPage.benefitsBmi1Desc') },
    { title: t('healthToolsPage.benefitsBmi2Title'), desc: t('healthToolsPage.benefitsBmi2Desc') },
    { title: t('healthToolsPage.benefitsBmi3Title'), desc: t('healthToolsPage.benefitsBmi3Desc') },
    { title: t('healthToolsPage.benefitsBmi4Title'), desc: t('healthToolsPage.benefitsBmi4Desc') },
    { title: t('healthToolsPage.benefitsBmi5Title'), desc: t('healthToolsPage.benefitsBmi5Desc') },
    { title: t('healthToolsPage.benefitsBmi6Title'), desc: t('healthToolsPage.benefitsBmi6Desc') },
  ];
  const benefitsBmr = [
    { title: t('healthToolsPage.benefitsBmr1Title'), desc: t('healthToolsPage.benefitsBmr1Desc') },
    { title: t('healthToolsPage.benefitsBmr2Title'), desc: t('healthToolsPage.benefitsBmr2Desc') },
    { title: t('healthToolsPage.benefitsBmr3Title'), desc: t('healthToolsPage.benefitsBmr3Desc') },
    { title: t('healthToolsPage.benefitsBmr4Title'), desc: t('healthToolsPage.benefitsBmr4Desc') },
    { title: t('healthToolsPage.benefitsBmr5Title'), desc: t('healthToolsPage.benefitsBmr5Desc') },
    { title: t('healthToolsPage.benefitsBmr6Title'), desc: t('healthToolsPage.benefitsBmr6Desc') },
  ];
  const benefits = activeTab === 'bmi' ? benefitsBmi : benefitsBmr;

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content health-tools-page">
        {/* Hero — gradient, label, title, description */}
        <section className="ht-hero">
          <div className="ht-hero-bg" aria-hidden="true" />
          <div className="ht-hero-content">
            <p className="ht-hero-label">{t('healthToolsPage.heroLabel')}</p>
            <h1 className="ht-hero-title">{t('healthToolsPage.heroTitle')}</h1>
            <p className="ht-hero-desc">{t('healthToolsPage.heroDesc')}</p>
          </div>
        </section>

        {/* Tabs: BMI Calculator | BMR Calculator */}
        <section className="ht-tabs-wrap">
          <div className="ht-tabs-inner">
            <button
              type="button"
              className={`ht-tab ${activeTab === 'bmi' ? 'ht-tab--active' : ''}`}
              onClick={() => setActiveTab('bmi')}
            >
              {t('healthCalculator.bmiTab')}
            </button>
            <button
              type="button"
              className={`ht-tab ${activeTab === 'bmr' ? 'ht-tab--active' : ''}`}
              onClick={() => setActiveTab('bmr')}
            >
              {t('healthCalculator.bmrTab')}
            </button>
          </div>
        </section>

        {/* What is BMI? / What is BMR? */}
        <section className="ht-what-section">
          <div className="ht-what-inner">
            <h2 className="ht-what-title">
              {activeTab === 'bmi' ? t('healthToolsPage.whatIsBmiTitle') : t('healthToolsPage.whatIsBmrTitle')}
            </h2>
            <p className="ht-what-p1">
              {activeTab === 'bmi' ? t('healthToolsPage.whatIsBmiP1') : t('healthToolsPage.whatIsBmrP1')}
            </p>
            <p className="ht-what-p2">
              {activeTab === 'bmi' ? t('healthToolsPage.whatIsBmiP2') : t('healthToolsPage.whatIsBmrP2')}
            </p>
          </div>
        </section>

        {/* Calculator card */}
        <section className="ht-calc-section">
          <div className="ht-calc-inner">
            <HealthCalculator
              variant="page"
              activeCalculator={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </section>

        {/* Benefits grid */}
        <section className="ht-benefits-section">
          <div className="ht-benefits-inner">
            <h2 className="ht-benefits-title">
              {activeTab === 'bmi' ? t('healthToolsPage.benefitsBmiTitle') : t('healthToolsPage.benefitsBmrTitle')}
            </h2>
            <p className="ht-benefits-subtitle">
              {activeTab === 'bmi' ? t('healthToolsPage.benefitsBmiSubtitle') : t('healthToolsPage.benefitsBmrSubtitle')}
            </p>
            <div className="ht-benefits-grid">
              {benefits.map((item, i) => (
                <div key={i} className="ht-benefit-card">
                  <h3 className="ht-benefit-title">{item.title}</h3>
                  <p className="ht-benefit-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaSection variant="dark-cards" />
      </main>
      <Footer />
    </div>
  );
}
