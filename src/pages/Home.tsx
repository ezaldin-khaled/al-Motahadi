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
import { useCmsPageContent } from '../hooks/useCmsPageContent';

export default function Home() {
  const { t } = useTranslation();
  const { getSectionValue } = useCmsPageContent('home');
  const heroContent = getSectionValue('home_hero') as Record<string, unknown> | null;
  const valuesContent = getSectionValue('home_values') as Record<string, unknown> | null;
  const servicesContent = getSectionValue('home_services') as Record<string, unknown> | null;
  const healthToolsContent = getSectionValue('home_health_tools') as Record<string, unknown> | null;

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <Hero
          content={
            heroContent
              ? {
                  brand: typeof heroContent.brand === 'string' ? heroContent.brand : undefined,
                  headlineDark: typeof heroContent.headlineDark === 'string' ? heroContent.headlineDark : undefined,
                  headlineAccent: typeof heroContent.headlineAccent === 'string' ? heroContent.headlineAccent : undefined,
                  description: typeof heroContent.description === 'string' ? heroContent.description : undefined,
                  whatsappLabel: typeof heroContent.whatsappLabel === 'string' ? heroContent.whatsappLabel : undefined,
                  trustedLabel: typeof heroContent.trustedLabel === 'string' ? heroContent.trustedLabel : undefined,
                  trustedValue: typeof heroContent.trustedValue === 'string' ? heroContent.trustedValue : undefined,
                  image: typeof heroContent.image === 'string' ? heroContent.image : undefined,
                  imageAlt: typeof heroContent.imageAlt === 'string' ? heroContent.imageAlt : undefined,
                }
              : undefined
          }
        />
        <Stats />
        <SectionValues
          content={
            valuesContent
              ? {
                  label: typeof valuesContent.label === 'string' ? valuesContent.label : undefined,
                  titleDark: typeof valuesContent.titleDark === 'string' ? valuesContent.titleDark : undefined,
                  titleAccent: typeof valuesContent.titleAccent === 'string' ? valuesContent.titleAccent : undefined,
                  description: typeof valuesContent.description === 'string' ? valuesContent.description : undefined,
                  imageMain: typeof valuesContent.imageMain === 'string' ? valuesContent.imageMain : undefined,
                  imageInset: typeof valuesContent.imageInset === 'string' ? valuesContent.imageInset : undefined,
                  imageMainAlt: typeof valuesContent.imageMainAlt === 'string' ? valuesContent.imageMainAlt : undefined,
                  imageInsetAlt: typeof valuesContent.imageInsetAlt === 'string' ? valuesContent.imageInsetAlt : undefined,
                  features: Array.isArray(valuesContent.features)
                    ? (valuesContent.features as any).map((f: any) => ({
                        title: String(f?.title ?? ''),
                        description: String(f?.description ?? ''),
                      }))
                    : undefined,
                }
              : undefined
          }
        />
        <SectionServices
          content={
            servicesContent
              ? {
                  label: typeof servicesContent.label === 'string' ? servicesContent.label : undefined,
                  title: typeof servicesContent.title === 'string' ? servicesContent.title : undefined,
                  description: typeof servicesContent.description === 'string' ? servicesContent.description : undefined,
                  extra: typeof servicesContent.extra === 'string' ? servicesContent.extra : undefined,
                  ctaLabel: typeof servicesContent.ctaLabel === 'string' ? servicesContent.ctaLabel : undefined,
                  items: Array.isArray(servicesContent.items)
                    ? (servicesContent.items as any).map((it: any) => ({
                        img: String(it?.img ?? ''),
                        title: String(it?.title ?? ''),
                        desc: String(it?.desc ?? ''),
                        alt: it?.alt ? String(it.alt) : undefined,
                      }))
                    : undefined,
                }
              : undefined
          }
        />
        <SectionAlt />
        <SectionProcess />
        <TeamSection />
        <SectionDark />
        <section className="calculate-health calculate-health--teaser">
          <div className="calculate-health__container">
            <p className="calculate-health__label">{typeof (healthToolsContent as any)?.label === 'string' ? (healthToolsContent as any).label : t('home.healthToolsLabel')}</p>
            <h2 className="calculate-health__title">{typeof (healthToolsContent as any)?.title === 'string' ? (healthToolsContent as any).title : t('home.healthToolsTitle')}</h2>
            <p className="calculate-health__subheading">
              {typeof (healthToolsContent as any)?.description === 'string' ? (healthToolsContent as any).description : t('home.healthToolsDesc')}
            </p>
            <Link to="/health-tools" className="calculate-health__cta">
              {typeof (healthToolsContent as any)?.ctaLabel === 'string' ? (healthToolsContent as any).ctaLabel : t('home.healthToolsCta')}
            </Link>
          </div>
        </section>
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
}
