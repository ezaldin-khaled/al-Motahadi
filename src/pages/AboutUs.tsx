import { useEffect } from 'react';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import HealthCalculator from '../components/HealthCalculator';
import '../styles/about.css';

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="about-page">
        {/* Hero Section - full-bleed gradient background per design */}
        <section className="about-hero" aria-label="About us hero">
          <div className="about-hero-bg" aria-hidden="true" />
          <div className="about-hero-inner">
            <div className="about-hero-content">
              <span className="about-hero-label">ABOUT US</span>
              <h1 className="about-hero-title">
                Together for a <span className="text-accent">Healthier Future</span>
              </h1>
              <p className="about-hero-desc">
                Your journey toward recovery begins here… where pain turns into hope, and treatment 
                becomes a fully integrated human experience that brings together science, precision, and care.
              </p>
            </div>
            <div className="about-hero-image">
              <div className="hero-image-card">
                <img 
                  src="/rehab-about-hero.png"
                  alt="Rehabilitation session with therapist and patient"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="who-we-are">
          <div className="who-we-are-container">
            <h2 className="section-heading">WHO WE ARE</h2>
            <p className="who-we-are-text">
              AL Motahadi Medical Rehabilitation Center is dedicated to providing exceptional rehabilitation care that goes beyond just treatment. Our focus is on restoring a patient&apos;s movement, confidence, and quality of life through personalized and evidence-based therapy. As a leading center in physical therapy and medical rehabilitation, we operate with the highest medical standards, using the latest global treatment protocols. We stand out as the founders of an international research network that spans over 100 centers in 19 countries, allowing us to continuously update our treatment plans based on the most current scientific advancements. We offer flexible treatment options tailored to each patient&apos;s needs, whether at our center or at home, with a dedicated transportation service to ensure continuous care. Our sessions are personalized and focused on individual treatment plans rather than fixed time durations, making the patient experience more effective and impactful. At AL Motahadi, we prioritize the human aspect of rehabilitation, placing the patient&apos;s comfort and needs at the core of every step of their therapeutic journey.
            </p>
            <button type="button" className="btn btn-primary">View detail →</button>
          </div>
        </section>

        {/* Our Vision & Our Mission Section */}
        <section className="info-cards-section">
          <div className="info-cards-container">
            <div className="info-card">
              <div className="info-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="info-card-title">Our Vision</h3>
              <p className="info-card-text">
                To be a leading and reference center in the Sultanate of Oman and the region in the field of medical rehabilitation and physical therapy, by delivering therapeutic and research services of global quality and transforming the rehabilitation journey into a true story of life restoration.
              </p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="info-card-title">Our Mission</h3>
              <p className="info-card-text">
                To provide comprehensive medical rehabilitation services based on advanced scientific treatment protocols, while respecting privacy, personalizing treatment for each patient, and strengthening mutual trust between the patient and the medical team.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="our-values" aria-label="Our values">
          <span className="our-values-subheading">WHAT WE STAND FOR</span>
          <h2 className="our-values-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="value-title">Human First</h3>
              <p className="value-desc">
                We place the patient at the center of every decision and step.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3v5l-4 10h14L15 8V3"></path>
                  <path d="M9 3h6"></path>
                </svg>
              </div>
              <h3 className="value-title">Scientific Excellence</h3>
              <p className="value-desc">
                We innovate and lead through the latest global research-based protocols.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="value-title">Transparency and Trust</h3>
              <p className="value-desc">
                We build our relationship with patients and the community on honesty and clarity.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </div>
              <h3 className="value-title">Professional Confidentiality</h3>
              <p className="value-desc">
                We adhere to the highest standards of patient data protection and privacy.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6"></path>
                  <path d="M10 22h4"></path>
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                  <path d="M12 2v2"></path>
                  <path d="M12 2a4 4 0 0 0-4 4v2"></path>
                  <path d="M12 2a4 4 0 0 1 4 4v2"></path>
                </svg>
              </div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-desc">
                We integrate science, experience, and technology to make a real difference.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="value-title">Responsibility</h3>
              <p className="value-desc">
                Serving the community is a core and firmly rooted part of our identity.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="trust-section" aria-labelledby="our-story-heading">
          <div className="trust-container">
            <div className="trust-content">
              <div className="trust-header">
                <p className="trust-label">OUR STORY</p>
                <h2 id="our-story-heading" className="trust-heading">
                  AL Motahadi Center: From Idea to Opening
                </h2>
              </div>
              <p className="trust-desc trust-desc-justify">
                The concept of AL Motahadi Medical Rehabilitation Center originated from a visionary goal to transform the rehabilitation sector in Oman by introducing a model that blends scientific excellence, human compassion, and community service. The center aimed to bring a fundamental change to the delivery of rehabilitation services, keeping pace with global advancements and focusing on the human aspect of therapy. The trial phase of the center began on September 1, 2024, with the training of medical and administrative teams, development of patient reception systems, and establishment of a culture of professional ethics. The official opening occurred on February 15, 2025, under the patronage of Her Highness Sayyida Hajija bint Jaifer Al Said, attended by dignitaries and health professionals. Since its opening, AL Motahadi has become a leading institution in medical rehabilitation in Oman, committed to maintaining high-quality standards and continuously evolving its treatment protocols through research and evaluation.
              </p>
              <div className="trust-image">
                <img 
                  src="/almotahadi-opening-ceremony.png" 
                  alt="AL Motahadi Center official opening ceremony — ribbon-cutting with dignitaries" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* About the Founder Section */}
        <section className="founder-section" aria-labelledby="founder-heading">
          <div className="founder-container">
            <div className="founder-content">
              <div className="founder-image-wrapper">
                <div className="founder-image">
                  <img 
                    src="/founder-portrait.png" 
                    alt="Dr. Mohammed Reda bin Naji Al-Yazidi — Founder, AL Motahadi Medical Rehabilitation Center" 
                  />
                </div>
              </div>
              <div className="founder-text">
                <p className="founder-label">LEADERSHIP</p>
                <h2 id="founder-heading" className="founder-heading">About the Founder</h2>
                <p className="founder-desc">
                  Behind the establishment of AL Motahadi Medical Rehabilitation Center stands Dr. Mohammed Reda bin Naji Al-Yazidi, a specialist in physical therapy and medical rehabilitation, and a pioneer in developing modern therapeutic models. He did not only establish the center, but also founded the international research network that is today considered one of the most prominent sources of advanced treatment protocols adopted by the center.
                </p>
                <p className="founder-desc">
                  His personal experience as a person with a disability shaped within him a deep human sensitivity and a unique understanding of patient needs; for him, care is not a service... but a human commitment.
                </p>
                <p className="founder-desc">
                  His journey combines clinical practice, scientific research, and academic influence, making AL Motahadi Center a landmark that embodies excellence in both knowledge and spirit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Teams Section */}
        <section className="medical-teams" aria-labelledby="medical-team-heading">
          <div className="medical-teams-container">
            <div className="medical-teams-content">
              <div className="medical-teams-text">
                <p className="medical-teams-label">OUR EXPERTS</p>
                <h2 id="medical-team-heading" className="medical-teams-title">Medical Team</h2>
                <p className="medical-teams-desc">
                  AL Motahadi Center includes an elite group of highly experienced specialists in physical therapy and rehabilitation, working according to the MDT (Multidisciplinary Team) model, which enables the development of a comprehensive and integrated treatment plan tailored to each case and regularly reviewed based on actual progress indicators.
                </p>
                <p className="medical-teams-desc">
                  Our team&apos;s role is not limited to delivering treatment alone; they actively participate in scientific research conducted by the international research network, making them contributors to the creation of medical knowledge—not merely implementers of it.
                </p>
                <p className="medical-teams-desc">
                  They are not just a therapeutic team... but partners in creating impact.
                </p>
                <a href="/team" className="btn btn-primary">Meet the Medical Team →</a>
              </div>
              <div className="medical-teams-image-wrap">
                <div className="medical-teams-image">
                  <img 
                    src="/medical-team.png" 
                    alt="AL Motahadi medical team — healthcare professionals" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Responsibility Section */}
        <section className="social-responsibility" aria-labelledby="responsibility-heading">
          <div className="responsibility-container">
            <p className="responsibility-label">GIVING BACK</p>
            <h2 id="responsibility-heading" className="responsibility-heading">Our Social Responsibility</h2>
            <div className="responsibility-card">
              <div className="responsibility-content">
                <p className="responsibility-text">
                  At AL Motahadi Center, we believe that our mission goes beyond treatment to include serving the community. Through the <strong>Ehata program</strong>, directed toward those most in need of rehabilitation services, we contribute to supporting low-income patients, the elderly, women and persons with disabilities through the <strong>Hope, Charity, Care, and Step packages.</strong>
                </p>
                <p className="responsibility-text">
                  We also offer special discounts for retirees and employees of the Royal Oman Police, and organize educational workshops and awareness courses in partnership with government and private institutions to promote rehabilitation culture and quality of life.
                </p>
              </div>
              <div className="responsibility-cta">
                <a href="#" className="btn btn-primary">Discover Our Community Initiatives →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Calculate Your Health Section — unified with Contact */}
        <section className="calculate-health">
          <div className="calculate-health__container">
            <p className="calculate-health__subheading">
              Use our BMI and BMR calculators to assess your health status and get personalized recommendations.
            </p>
            <HealthCalculator variant="default" />
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
