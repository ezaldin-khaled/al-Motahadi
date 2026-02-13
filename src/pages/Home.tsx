import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import SectionValues from '../components/SectionValues';
import SectionServices from '../components/SectionServices';
import SectionAlt from '../components/SectionAlt';
import SectionProcess from '../components/SectionProcess';
import TeamSection from '../components/TeamSection';
import SectionDark from '../components/SectionDark';
import ContactForm from '../components/ContactForm';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function Home() {
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
        <ContactForm />
        <CtaSection />
        <Footer />
      </main>
    </div>
  );
}
