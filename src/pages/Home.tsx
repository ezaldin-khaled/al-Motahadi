import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import SectionValues from '../components/SectionValues';
import SectionServices from '../components/SectionServices';
import SectionAlt from '../components/SectionAlt';
import SectionProcess from '../components/SectionProcess';
import TeamSection from '../components/TeamSection';
import SectionDark from '../components/SectionDark';
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
        <section className="calculate-health calculate-health--teaser">
          <div className="calculate-health__container">
            <p className="calculate-health__label">{t('home.healthToolsLabel')}</p>
            <h2 className="calculate-health__title">{t('home.healthToolsTitle')}</h2>
            <p className="calculate-health__subheading">
              {t('home.healthToolsDesc')}
            </p>
            <Link to="/health-tools" className="calculate-health__cta">
              {t('home.healthToolsCta')}
            </Link>
          </div>
        </section>
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
}
