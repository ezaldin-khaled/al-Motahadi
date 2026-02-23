import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HealthCalculator from '../components/HealthCalculator';
import '../styles/health-calculator.css';

export default function HealthTools() {
  const { t } = useTranslation();

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content health-tools-page">
        <section className="calculate-health">
          <div className="calculate-health__container">
            <p className="calculate-health__subheading">
              {t('home.healthCalcIntro')}
            </p>
            <HealthCalculator variant="default" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
