import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  CTA_DESCRIPTION,
  CTA_HEADING,
  CTA_HEADING_ACCENT,
  CONTACT_PATH,
  PRIMARY_CTA_LABEL,
} from '../constants/cta';
import '../styles/services.css';

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: 1,
      title: 'Physical Therapy',
      description: 'Comprehensive physical rehabilitation programs designed to restore movement, reduce pain, and improve your overall physical function through evidence-based therapeutic techniques.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
      link: '#'
    },
    {
      id: 2,
      title: 'Aquatic Therapy',
      description: 'Specialized water-based rehabilitation exercises that utilize the unique properties of water to enhance recovery, reduce joint stress, and improve mobility in a safe environment.',
      image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f20?w=600&q=80',
      link: '#'
    },
    {
      id: 3,
      title: 'Speech Therapy',
      description: 'Expert speech and language therapy services to address communication disorders, swallowing difficulties, and cognitive-linguistic challenges with personalized treatment plans.',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&q=80',
      link: '#'
    },
    {
      id: 4,
      title: 'Functional Assessment',
      description: 'Comprehensive evaluation of your physical abilities and limitations to develop targeted treatment strategies and measure progress throughout your rehabilitation journey.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
      link: '#'
    },
    {
      id: 5,
      title: 'Cardiac Rehabilitation',
      description: 'Medically supervised programs designed to improve cardiovascular health, enhance physical endurance, and reduce the risk of future heart problems through exercise and education.',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80',
      link: '#'
    },
    {
      id: 6,
      title: 'Nutritional Counseling',
      description: 'Personalized nutrition guidance and meal planning to support your recovery, optimize health outcomes, and establish sustainable healthy eating habits for long-term wellness.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
      link: '#'
    },
    {
      id: 7,
      title: 'Pain Management',
      description: 'Advanced pain relief strategies combining therapeutic modalities, manual therapy, and exercise programs to help you manage chronic pain and improve your quality of life.',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80',
      link: '#'
    },
    {
      id: 8,
      title: 'Post-Surgical Rehabilitation',
      description: 'Specialized recovery programs following surgery to restore strength, flexibility, and function while ensuring safe healing and preventing complications during your recovery.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80',
      link: '#'
    },
    {
      id: 9,
      title: 'Home Health Care',
      description: 'Professional healthcare services delivered in the comfort of your home, providing convenient access to quality rehabilitation care when mobility or transportation is limited.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
      link: '#'
    }
  ];

  return (
    <div className="page-wrapper">
      <Header />
      <main className="services-page">
        {/* Hero Section */}
        <section className="services-hero">
          <div className="services-hero-content">
            <h1 className="services-hero-title">Our Services</h1>
            <p className="services-hero-desc">
              At Al Motahadi, we offer a comprehensive range of rehabilitation services tailored to meet your 
              unique needs. Our expert team is dedicated to helping you achieve optimal health and wellness 
              through personalized care and evidence-based treatment approaches. From physical therapy to 
              specialized rehabilitation programs, we're here to support you every step of your recovery journey.
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="services-grid-section">
          <div className="services-grid-container">
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-card-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="service-card-content">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.description}</p>
                    <a href={service.link} className="service-card-link">
                      Learn More <span className="arrow">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="services-cta-section">
          <div className="services-cta-container">
            <div className="services-cta-content">
              <h2 className="services-cta-title">{CTA_HEADING} <span className="services-cta-title-accent">{CTA_HEADING_ACCENT}</span></h2>
              <p className="services-cta-desc">
                {CTA_DESCRIPTION}
              </p>
              <div className="services-cta-buttons">
                <a href={CONTACT_PATH} className="btn btn-primary">{PRIMARY_CTA_LABEL}</a>
                <a href="tel:+971501234567" className="btn btn-secondary">Call Us Now</a>
              </div>
            </div>
            <div className="services-cta-info">
              <div className="cta-info-card">
                <h4>Contact</h4>
                <p>123 Recovery Street<br />City, Country</p>
                <p>Phone: +123 456 7890</p>
                <p>Email: info@almotahadi.com</p>
              </div>
              <div className="cta-info-card">
                <h4>Hours</h4>
                <p>Monday - Friday<br />8:00 AM - 6:00 PM</p>
                <p>Saturday<br />9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
