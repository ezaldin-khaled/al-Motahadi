import { useEffect } from 'react';
import Header from '../components/Header';
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
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-hero-title">
              Together for a<br />
              <span className="text-accent">Healthier Future</span>
            </h1>
            <p className="about-hero-desc">
              We provide personalized care through expert teams and advanced facilities, 
              committed to a comprehensive journey from diagnosis to recovery.
            </p>
          </div>
          <div className="about-hero-image">
            <div className="hero-image-card">
              <img 
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80" 
                alt="Medical professionals in consultation" 
              />
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="who-we-are">
          <div className="who-we-are-container">
            <h2 className="section-heading">WHO WE ARE</h2>
            <p className="who-we-are-text">
              At Almotahadi Leisure Trust, we stand as a symbol of sustainable healthcare in our community. 
              We are dedicated to providing comprehensive medical care in a professional environment that 
              focuses on the patient and the individual. We believe that health is not just about treating 
              illness, but about enhancing the quality of life and promoting overall well-being. Our team 
              comprises a select group of experienced medical professionals committed to delivering 
              personalized care that meets the needs of each patient. We strive for innovation and excellence 
              in all aspects of our services.
            </p>
            <button className="read-more-btn">READ MORE</button>
          </div>
        </section>

        {/* Two Info Cards Section */}
        <section className="info-cards-section">
          <div className="info-cards-container">
            <div className="info-card">
              <div className="info-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                </svg>
              </div>
              <h3 className="info-card-title">Our Mission</h3>
              <p className="info-card-text">
                To provide exceptional healthcare services that improve the quality of life for our patients 
                through compassionate care, medical excellence, and innovative treatment approaches.
              </p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="info-card-title">Our Vision</h3>
              <p className="info-card-text">
                To be the leading healthcare provider recognized for excellence in patient care, 
                medical innovation, and community health advancement in the region.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="our-values">
          <h2 className="section-heading">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="value-title">Care and Compassion</h3>
              <p className="value-desc">
                We treat every patient with the care and respect they deserve.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="value-title">Professionalism</h3>
              <p className="value-desc">
                We maintain the highest standards in medical practice.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-desc">
                Utilizing the latest medical technologies and treatments.
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
            <button className="read-more-btn">READ MORE</button>
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
              <button className="read-more-btn">READ MORE</button>
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
              <button className="calculate-btn">CALCULATE</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
