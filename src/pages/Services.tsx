import { useEffect } from 'react';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/services.css';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'Musculoskeletal and Joint Therapy',
    description:
      'Focuses on precision medicine for pain relief, mobility, and strength, covering various conditions.',
    image: '/service-images/2.png',
    link: '#',
  },
  {
    id: 2,
    title: 'Sports Rehabilitation',
    description:
      'Addresses injuries and post-surgical recovery, aiming for functional movement, strength, and endurance.',
    image: '/service-images/1.png',
    link: '#',
  },
  {
    id: 3,
    title: 'Cardiac Pulmonary & Stroke Rehabilitation',
    description:
      'Improves functional capacity for patients post-stroke or with chronic conditions.',
    image: '/service-images/3.png',
    link: '#',
  },
  {
    id: 4,
    title: 'Head & Balance Disorders',
    description:
      'Treatments for dizziness, vertigo, unsteadiness, and imbalance, with personalized programs.',
    image: '/service-images/4.png',
    link: '#',
  },
  {
    id: 5,
    title: 'Geriatric Rehabilitation',
    description:
      'Tailored programs for elderly individuals to maintain independence, addressing conditions like osteoporosis and dementia.',
    image: '/service-images/5.png',
    link: '#',
  },
  {
    id: 6,
    title: 'Neurological Rehabilitation',
    description:
      'High-precision, long-term care for neurological conditions like Parkinson\'s disease, muscular dystrophy, and Down syndrome.',
    image: '/service-images/6.png',
    link: '#',
  },
  {
    id: 7,
    title: "Women's Health",
    description:
      "Comprehensive care for women's health needs throughout various life stages, ensuring high standards.",
    image: '/service-images/7.png',
    link: '#',
  },
  {
    id: 8,
    title: 'Oncology Rehabilitation',
    description:
      'Integrated rehabilitation programs for cancer patients to help with physical and psychological therapy at different stages.',
    image: '/service-images/8.png',
    link: '#',
  },
  {
    id: 9,
    title: 'Lymphedema Therapy',
    description:
      'Focuses on reducing swelling and improving mobility for patients post-cancer treatment or other conditions.',
    image: '/service-images/9.png',
    link: '#',
  },
  {
    id: 10,
    title: 'Weight Loss & Management',
    description:
      'Customized programs using advanced techniques for weight reduction and improved fitness.',
    image: '/service-images/10.png',
    link: '#',
  },
  {
    id: 11,
    title: 'Speech Therapy',
    description:
      'Addresses speech and language difficulties in children and adults, using evidence-based programs.',
    image: '/service-images/11.png',
    link: '#',
  },
  {
    id: 12,
    title: 'Post-Amputational Rehabilitation',
    description:
      'Specialized programs for amputees to restore movement, mobility, and support for daily life.',
    image: '/service-images/12.png',
    link: '#',
  },
];

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="services-page">
        {/* Hero Section — design: WHAT WE OFFER, Our Services, two paragraphs */}
        <section className="services-hero">
          <div className="services-hero-content">
            <p className="services-hero-label">WHAT WE OFFER</p>
            <h1 className="services-hero-title">Our Services</h1>
            <p className="services-hero-desc">
              At AL Motahadi Medical Rehabilitation Center, we do not offer ordinary therapy solutions… we design a fully integrated treatment journey for each case.
            </p>
            <p className="services-hero-desc">
              Here, treatment is not a general protocol applied to everyone, but a precise plan tailored specifically for each patient, based on a comprehensive assessment and implemented using the latest technologies and advanced rehabilitation methods—by a specialist that places the human being at the heart of every therapeutic decision.
            </p>
          </div>
        </section>

        {/* Services Grid — title overlaid on image, then description, Learn About the Service → */}
        <section className="services-grid-section">
          <div className="services-grid-container">
            <div className="services-grid">
              {SERVICES_DATA.map((service) => (
                <article key={service.id} className="service-card">
                  <div className="service-card-image">
                    <img src={service.image} alt={service.title} />
                    <h3 className="service-card-title-overlay">{service.title}</h3>
                  </div>
                  <div className="service-card-content">
                    <p className="service-card-desc">{service.description}</p>
                    <a href={service.link} className="service-card-link">
                      Learn About the Service <span className="arrow">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaSection variant="services" />
      </main>
      <Footer />
    </div>
  );
}
