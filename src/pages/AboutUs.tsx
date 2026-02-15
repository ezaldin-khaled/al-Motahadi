import { useEffect } from 'react';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
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

        {/* Almotahadi Leisure Trust Section */}
        <section className="trust-section">
          <div className="trust-container">
            <div className="trust-content">
              <div className="trust-text">
                <h2 className="trust-heading">
                  At Almotahadi Leisure Trust <span className="text-accent">We Aim To</span> Opening
                </h2>
                <p className="trust-desc">
                  Almotahadi Leisure Trust is a pioneering healthcare institution dedicated to providing 
                  exceptional medical services. We combine modern facilities with experienced medical staff 
                  to ensure the highest quality of care for our patients.
                </p>
                <p className="trust-desc">
                  Our center is equipped with state-of-the-art medical technology and staffed by a team of 
                  highly qualified healthcare professionals. We offer a wide range of medical services, from 
                  preventive care to specialized treatments, all delivered with compassion and excellence.
                </p>
                <p className="trust-desc">
                  We believe in treating the whole person, not just the illness. Our holistic approach to 
                  healthcare ensures that each patient receives personalized care tailored to their unique needs.
                </p>
              </div>
              <div className="trust-image">
                <img 
                  src="https://images.unsplash.com/photo-1519167758481-83f29da8c79a?w=800&q=80" 
                  alt="Medical facility setup" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* About the Founder Section */}
        <section className="founder-section">
          <div className="founder-container">
            <div className="founder-content">
              <div className="founder-image-wrapper">
                <div className="founder-image">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80" 
                    alt="Founder portrait" 
                  />
                </div>
              </div>
              <div className="founder-text">
                <h2 className="founder-heading">About the Founder</h2>
                <p className="founder-desc">
                  Dr. Sarah Al-Motahadi founded our healthcare center with a vision to transform medical 
                  care in the region. With over 20 years of experience in healthcare management and medical 
                  practice, she has dedicated her career to improving patient outcomes and advancing medical 
                  excellence.
                </p>
                <p className="founder-desc">
                  Her passion for healthcare innovation and patient-centered care has been the driving force 
                  behind our institution's success. Under her leadership, we have grown to become a trusted 
                  name in healthcare, known for our commitment to quality, compassion, and clinical excellence.
                </p>
                <p className="founder-desc">
                  Dr. Al-Motahadi believes that every patient deserves access to world-class medical care 
                  delivered with empathy and respect. This philosophy continues to guide our mission and 
                  shapes every aspect of our services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Teams Section */}
        <section className="medical-teams">
          <div className="content-container">
            <h2 className="section-heading">Medical Teams</h2>
            <p className="section-subheading">
              Our team of dedicated healthcare professionals is committed to providing you with the highest 
              quality care. Each member brings expertise, compassion, and dedication to their work.
            </p>
            <div className="team-grid">
              <div className="team-member">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&q=80" 
                  alt="Medical team member" 
                />
              </div>
              <div className="team-member">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80" 
                  alt="Medical team member" 
                />
              </div>
              <div className="team-member">
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&q=80" 
                  alt="Medical team member" 
                />
              </div>
            </div>
            <button type="button" className="btn btn-primary">READ MORE</button>
          </div>
        </section>

        {/* Social Responsibility Section */}
        <section className="social-responsibility">
          <div className="responsibility-container">
            <div className="responsibility-card">
              <h2 className="responsibility-heading">Our Social Responsibility</h2>
              <div className="responsibility-content">
                <p className="responsibility-text">
                  At Almotahadi Leisure Trust, we believe in giving back to our community. Our social 
                  responsibility programs focus on improving public health awareness, providing free health 
                  screenings, and supporting underserved populations.
                </p>
                <p className="responsibility-text">
                  We regularly organize health education seminars, wellness workshops, and community outreach 
                  programs. We also partner with local organizations to ensure that quality healthcare is 
                  accessible to all members of our community, regardless of their financial circumstances.
                </p>
                <p className="responsibility-text">
                  Our commitment to social responsibility extends beyond our walls. We actively participate in 
                  public health initiatives, medical research, and educational programs that contribute to the 
                  advancement of healthcare in our region.
                </p>
              </div>
              <button type="button" className="btn btn-primary">READ MORE</button>
            </div>
          </div>
        </section>

        {/* Calculate Your Health Section */}
        <section className="calculate-health">
          <div className="content-container">
            <h2 className="section-heading-white">Calculate Your Health</h2>
            <p className="calculate-subheading">
              Use our BMI calculator to assess your health status and get personalized recommendations.
            </p>
            <div className="calculator-form">
              <div className="calculator-inputs">
                <div className="input-group">
                  <label htmlFor="age">Age</label>
                  <input type="number" id="age" placeholder="" />
                </div>
                <div className="input-group">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="weight">Weight</label>
                  <input type="number" id="weight" placeholder="" />
                </div>
                <div className="input-group">
                  <label htmlFor="height">Height</label>
                  <input type="number" id="height" placeholder="" />
                </div>
              </div>
              <button type="button" className="btn btn-primary">CALCULATE</button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
