import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import SectionValues from '../components/SectionValues';
import SectionServices from '../components/SectionServices';
import SectionAlt from '../components/SectionAlt';
import SectionProcess from '../components/SectionProcess';
import TeamSection from '../components/TeamSection';
import SectionDark from '../components/SectionDark';
import HealthCalculator from '../components/HealthCalculator';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <Hero />
        <Stats />
        <SectionValues />
        <SectionServices />
        <SectionAlt />
        <SectionProcess />
        <TeamSection />
        <SectionDark />
        <section className="calculate-health">
          <div className="calculate-health__container">
            <p className="calculate-health__subheading">
              {t('home.healthCalcIntro')}
            </p>
            <HealthCalculator variant="default" />
          </div>
        </section>
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
}
