import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/team.css';

function OurTeam() {
  return (
    <div className="page-wrapper">
      <div className="top-line"></div>
      <Header />
      
      {/* Hero Section */}
      <section className="team-hero">
        <div className="content-inner">
          <h1 className="team-hero-title">Medical Team</h1>
          <p className="team-hero-desc">
            At Al Matahdi Rehabilitation Center, our medical team is comprised of highly trained, 
            compassionate professionals dedicated to providing personalized care. Each member brings 
            specialized expertise in addiction medicine, mental health, and holistic recovery approaches. 
            Together, we work collaboratively to create individualized treatment plans that address the 
            physical, emotional, and psychological needs of every patient.
          </p>
          <p className="team-hero-subdesc">
            Our multidisciplinary approach ensures comprehensive support throughout the recovery journey, 
            fostering an environment of trust, empathy, and evidence-based practice.
          </p>
        </div>
      </section>

      {/* Multidisciplinary Team Model */}
      <section className="team-model-section">
        <div className="content-inner">
          <h2 className="section-title-team">Multidisciplinary Team Model</h2>
          <p className="section-desc-team">
            The heart of our work lies in the belief that comprehensive care starts with a well-rounded 
            team. We bring together addiction medicine physicians, psychiatrists, licensed therapists, 
            nurses, case managers, and wellness specialists to ensure every patient receives holistic, 
            evidence-based treatment. This collaborative model allows us to address all facets of 
            recovery—medical, psychological, social, and spiritual—creating a robust foundation for 
            long-term success.
          </p>
          <div className="section-cta">
            <a href="/contact" className="btn btn-primary">Schedule a Consultation →</a>
          </div>
        </div>
      </section>

      {/* What Sets Our Team Apart */}
      <section className="team-features-section">
        <div className="content-inner">
          <h2 className="section-title-team">What Sets Our Team Apart</h2>
          <div className="team-features-grid">
            <div className="team-feature-card">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-card-title">Highly Qualified Professionals</h3>
              <p className="feature-card-desc">
                All team members hold advanced degrees and certifications in their respective fields, 
                ensuring you receive care from the best.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="feature-card-title">Evidence-Based Approaches</h3>
              <p className="feature-card-desc">
                We integrate the latest research in addiction medicine and psychotherapy to deliver 
                treatments proven to work.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="feature-card-title">Compassionate & Empathetic Care</h3>
              <p className="feature-card-desc">
                Beyond credentials, our team leads with empathy, understanding that recovery is a deeply 
                personal journey requiring compassion at every step.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-card-title">Individualized Attention</h3>
              <p className="feature-card-desc">
                We tailor each treatment plan to fit the unique needs, goals, and circumstances of every 
                patient, avoiding one-size-fits-all solutions.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3 className="feature-card-title">Continuous Professional Development</h3>
              <p className="feature-card-desc">
                Our team regularly participates in training and stays current with emerging therapies, 
                maintaining the highest standards in care delivery.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="feature-card-title">Culturally Sensitive & Inclusive</h3>
              <p className="feature-card-desc">
                We respect and honor diverse backgrounds, beliefs, and identities, fostering an environment 
                where all individuals feel safe and valued.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Working Philosophy */}
      <section className="team-philosophy-section">
        <div className="content-inner">
          <h2 className="section-title-team">Our Working Philosophy</h2>
          <p className="section-desc-team">
            Our team operates on the principle that recovery is not a solitary endeavor. By combining 
            medical expertise with genuine human connection, we create a therapeutic alliance that 
            empowers patients to take ownership of their healing process. We believe in treating the 
            whole person—not just the addiction—and ensuring that dignity, respect, and hope guide 
            every interaction. Through collaboration, transparency, and ongoing support, we help 
            individuals rediscover their strengths and build sustainable pathways to wellness.
          </p>
          <p className="section-desc-team philosophy-extra">
            If you or a loved one is seeking expert, compassionate care from a team that truly 
            understands the complexities of addiction and mental health, we invite you to reach out. 
            Together, we can create a plan that honors your unique story and sets you on a path toward 
            lasting recovery.
          </p>
          <div className="section-cta">
            <a href="/contact" className="btn btn-primary">Get in Touch Today →</a>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="team-members-section">
        <div className="content-inner">
          <h2 className="section-title-team">Meet Our Team</h2>
          <div className="team-members-grid">
            <div className="team-member-card">
              <div className="team-member-image">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop" alt="Dr. Ahmed Al-Mutahadi" />
              </div>
              <h3 className="team-member-name">Dr. Ahmed Al-Mutahadi</h3>
              <p className="team-member-title">Medical Director & Addiction Specialist</p>
              <p className="team-member-bio">
                Board-certified in addiction medicine with over 15 years of experience. Dr. Al-Mutahadi 
                leads our clinical team with a focus on evidence-based treatment and patient-centered care.
              </p>
              <a href="/contact" className="btn btn-primary">Book Appointment →</a>
            </div>

            <div className="team-member-card">
              <div className="team-member-image">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop" alt="Dr. Sarah Johnson" />
              </div>
              <h3 className="team-member-name">Dr. Sarah Johnson</h3>
              <p className="team-member-title">Clinical Psychologist</p>
              <p className="team-member-bio">
                Specializing in trauma-informed therapy and cognitive behavioral approaches, Dr. Johnson 
                provides compassionate psychological support tailored to each patient's needs.
              </p>
              <a href="/contact" className="btn btn-primary">Book Appointment →</a>
            </div>

            <div className="team-member-card">
              <div className="team-member-image">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop" alt="Nurse Fatima Hassan" />
              </div>
              <h3 className="team-member-name">Nurse Fatima Hassan</h3>
              <p className="team-member-title">Head Nurse & Care Coordinator</p>
              <p className="team-member-bio">
                With extensive experience in rehabilitation nursing, Fatima ensures seamless coordination 
                of care and provides hands-on support throughout the recovery process.
              </p>
              <a href="/contact" className="btn btn-primary">Book Appointment →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-dark">
        <div className="content-inner">
          <div className="team-cta-content">
            <div className="team-cta-text">
              <span className="section-label section-label-teal">GET STARTED</span>
              <h2 className="section-title section-title-light">Begin Your<br />Recovery Journey</h2>
              <p className="section-desc section-desc-light">
                Take the first step toward healing. Our compassionate team is ready to support you with 
                personalized care and evidence-based treatment approaches.
              </p>
              <div className="cta-buttons">
                <a href="/contact" className="btn btn-primary">Schedule Consultation →</a>
                <a href="tel:+966123456789" className="btn btn-outline-light" aria-label="Call now">Call Now</a>
              </div>
            </div>
            <div className="team-cta-form">
              <h3 className="cta-form-title">Quick Contact</h3>
              <form className="contact-form-compact">
                <input type="text" placeholder="Full Name" className="form-input" />
                <input type="email" placeholder="Email Address" className="form-input" />
                <input type="tel" placeholder="Phone Number" className="form-input" />
                <textarea placeholder="Message (Optional)" className="form-textarea" rows={3}></textarea>
                <button type="submit" className="btn btn-primary btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default OurTeam;
