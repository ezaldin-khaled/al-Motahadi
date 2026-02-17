import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { CONTACT_PATH } from '../constants/cta';
import '../styles/who-we-are.css';

/* Simple line icons matching the design (flask, person, brain, house, car, star) */
const IconFlask = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M10 2v7.31" />
    <path d="M14 9.3V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10a4 4 0 0 0 4-4v-.5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v.5a4 4 0 0 0 4 4Z" />
    <path d="M6 22h12" />
    <path d="M12 22v-6" />
  </svg>
);
const IconPerson = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconBrain = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.74 2.5 2.5 0 0 1-2.96-3.08 2.5 2.5 0 0 1 .34-5.92 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-10A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.74 2.5 2.5 0 0 0 2.96-3.08 2.5 2.5 0 0 0-.34-5.92 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-10A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);
const IconHouse = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconCar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 16H9m10 0h1v-3a2 2 0 0 0-2-2h-1V8a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3H6a2 2 0 0 0-2 2v3h1" />
    <path d="M5 17h14v-4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v4Z" />
  </svg>
);
const IconStar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function WhoWeAre() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="who-we-are-page">
        {/* 1. WHO WE ARE Hero */}
        <section className="wwa-hero" aria-label="Who we are">
          <div className="wwa-hero-inner">
            <div className="wwa-hero-content">
              <span className="wwa-hero-label">ABOUT US</span>
              <h1 className="wwa-hero-title">WHO WE ARE</h1>
              <p className="wwa-hero-subtitle">What Sets Us Apart</p>
              <p className="wwa-hero-desc">
                AL Motahadi Medical Rehabilitation Center is dedicated to providing exceptional rehabilitation care that goes beyond treatment. We focus on restoring movement, confidence, and quality of life through personalized, evidence-based therapy.
              </p>
              <p className="wwa-hero-desc">
                As a leading center in physical therapy and medical rehabilitation, we operate to the highest medical standards and use the latest global treatment protocols, with a commitment to placing the patient at the heart of every step.
              </p>
            </div>
            <div className="wwa-hero-image">
              <div className="wwa-hero-image-card">
                <img
                  src="/rehab-about-hero.png"
                  alt="Healthcare professional with patient in therapy room"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Therapeutic Protocols & Research Network */}
        <section className="wwa-section wwa-section-white" aria-labelledby="protocols-heading">
          <div className="wwa-container">
            <div className="wwa-protocols-grid">
              <div className="wwa-protocols-content">
                <div className="wwa-protocols-header">
                  <div className="wwa-protocols-icon-wrap" aria-hidden>
                    <IconFlask />
                  </div>
                  <h2 id="protocols-heading" className="wwa-section-title">Therapeutic Protocols & Research Network</h2>
                </div>
                <div className="wwa-protocols-body">
                  <p className="wwa-protocols-tagline">Our strength begins with science.</p>
                  <p className="wwa-section-desc">
                    We are the only center in the Sultanate of Oman that bases its treatment plans on exclusive and proprietary therapeutic protocols issued by an international research network that we ourselves established, comprising more than 100 rehabilitation centers across 19 countries worldwide.
                  </p>
                  <p className="wwa-section-desc">
                    Through this network, our patients gain access to the latest advancements in rehabilitation science—without ever leaving the Sultanate.
                  </p>
                  <Link to={CONTACT_PATH} className="btn btn-primary wwa-protocols-cta">
                    Book Your Appointment Now
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
              <div className="wwa-protocols-card">
                <div className="wwa-protocols-card-top">
                  <div className="wwa-protocols-subcard">
                    <span className="wwa-protocols-subcard-value">100+</span>
                    <span className="wwa-protocols-subcard-label">Rehabilitation Centers</span>
                  </div>
                  <div className="wwa-protocols-subcard">
                    <span className="wwa-protocols-subcard-value">19</span>
                    <span className="wwa-protocols-subcard-label">Countries Worldwide</span>
                  </div>
                </div>
                <div className="wwa-protocols-subcard wwa-protocols-subcard-bottom">
                  <span className="wwa-protocols-subcard-label">Exclusive & Proprietary Therapeutic Protocols</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Plan-Based Sessions, Not Time-Based */}
        <section className="wwa-section wwa-section-teal wwa-section-center" aria-labelledby="plan-heading">
          <div className="wwa-container">
            <div className="wwa-section-icon" aria-hidden><IconBrain /></div>
            <h2 id="plan-heading" className="wwa-section-title">Plan-Based Sessions, Not Time-Based</h2>
            <p className="wwa-section-desc wwa-section-desc-center">
              Our sessions are built around your individual treatment plan and goals, not fixed time slots. This approach ensures that each session is focused on meaningful progress and outcomes, making your rehabilitation journey more effective and personally tailored.
            </p>
            <Link to={CONTACT_PATH} className="btn btn-primary">
              Book An Appointment Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>

        {/* 4. Medical Team */}
        <section className="wwa-section wwa-section-teal" aria-labelledby="team-heading">
          <div className="wwa-container">
            <div className="wwa-team-grid">
              <div className="wwa-team-image-wrap">
                <div className="wwa-team-image">
                  <img src="/medical-team.png" alt="AL Motahadi medical team — healthcare professionals" />
                </div>
              </div>
              <div className="wwa-team-content">
                <div className="wwa-section-icon" aria-hidden><IconPerson /></div>
                <h2 id="team-heading" className="wwa-section-title">Medical Team</h2>
                <p className="wwa-section-subtitle">Well-trained specialists, always ready to help</p>
                <p className="wwa-section-desc">
                  AL Motahadi Center brings together an experienced team of specialists in physical therapy and rehabilitation. We work using a multidisciplinary approach to develop comprehensive, integrated treatment plans for each patient.
                </p>
                <p className="wwa-section-desc">
                  Our team does not only deliver treatment—they contribute to research and the continuous improvement of care, placing your recovery and comfort at the center of everything we do.
                </p>
                <div className="wwa-team-actions">
                  <Link to="/services" className="btn btn-primary">
                    Read More Information
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                  <Link to="/team" className="wwa-view-more">View More</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Home Therapy & Transportation Service */}
        <section className="wwa-section wwa-section-teal wwa-two-cols" aria-label="Home therapy and transportation">
          <div className="wwa-container">
            <div className="wwa-cols-grid">
              <div className="wwa-col-block">
                <div className="wwa-section-icon" aria-hidden><IconHouse /></div>
                <h2 className="wwa-section-title">Home Therapy</h2>
                <p className="wwa-section-desc">
                  We offer flexible treatment options tailored to each patient. When visiting the center is difficult, our specialists can provide rehabilitation sessions in the comfort of your home, ensuring continuity of care and convenience.
                </p>
                <p className="wwa-section-desc">
                  Home therapy is designed to match the same quality and standards as our in-center sessions, with personalized plans that fit your environment and goals.
                </p>
                <Link to="/services" className="btn btn-primary">
                  Read More Information
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div className="wwa-col-block">
                <div className="wwa-section-icon" aria-hidden><IconCar /></div>
                <h2 className="wwa-section-title">Transportation Service</h2>
                <p className="wwa-section-desc">
                  To ensure you can access our center without worry, we provide a dedicated transportation service. This removes the barrier of travel and helps maintain regular attendance for your rehabilitation program.
                </p>
                <p className="wwa-section-desc">
                  Our transportation service is part of our commitment to making quality rehabilitation care accessible and stress-free for every patient and their family.
                </p>
                <Link to="/services" className="btn btn-primary">
                  Read More Information
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Exclusive Specializations */}
        <section className="wwa-section wwa-section-white wwa-section-center" aria-labelledby="specializations-heading">
          <div className="wwa-container">
            <div className="wwa-section-icon" aria-hidden><IconStar /></div>
            <h2 id="specializations-heading" className="wwa-section-title">Exclusive Specializations</h2>
            <p className="wwa-section-desc wwa-section-desc-center">
              AL Motahadi Center combines specialized expertise in physical therapy, neurological rehabilitation, pain management, and post-surgical recovery, supported by our international research network and a human-centered approach to every patient journey.
            </p>
          </div>
        </section>

        {/* 7. Begin Your Recovery Journey — reuses global CTA */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
