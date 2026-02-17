import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { CONTACT_PATH, PRIMARY_CTA_LABEL } from '../constants/cta';
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
            <Link to={CONTACT_PATH} className="btn btn-primary">{PRIMARY_CTA_LABEL}</Link>
          </div>
        </div>
      </section>

      {/* What Sets Our Team Apart */}
      <section className="team-features-section">
        <div className="content-inner">
          <p className="team-features-section-label">OUR DIFFERENCE</p>
          <h2 className="section-title-team">What Sets Our Team Apart</h2>
          <div className="team-features-grid">
            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="feature-card-title">High Scientific Competence</h3>
              <p className="feature-card-desc">
                All specialists hold internationally recognized qualifications and extensive practical experience.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="feature-card-title">Effective Human Communication</h3>
              <p className="feature-card-desc">
                We view the patient as a partner in treatment, not a passive recipient of care.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="feature-card-title">Multiple Specialties Under One Roof</h3>
              <p className="feature-card-desc">
                We integrate movement, neurological, respiratory, and functional therapy into one comprehensive program.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="feature-card-title">International Research Collaboration</h3>
              <p className="feature-card-desc">
                Our team actively participates in scientific studies conducted by the international research network founded by the center, making them part of the global development of medical knowledge.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="16" />
                </svg>
              </div>
              <h3 className="feature-card-title">Continuous Quality Assessment</h3>
              <p className="feature-card-desc">
                Patient outcomes and treatment protocols are continuously reviewed to ensure therapeutic effectiveness.
              </p>
            </div>

            <div className="team-feature-card">
              <div className="feature-icon-teal">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M6 9v6" />
                  <path d="M18 15V9" />
                  <path d="M6 12h6" />
                  <path d="M18 12h-6" />
                </svg>
              </div>
              <h3 className="feature-card-title">Collaborative Clinical Decision-Making</h3>
              <p className="feature-card-desc">
                Treatment decisions are made through professional discussions among team members to reach the best plan tailored individually to each case.
              </p>
            </div>
          </div>
          <div className="team-features-cta">
            <Link to={CONTACT_PATH} className="btn btn-primary">{PRIMARY_CTA_LABEL}</Link>
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
            <Link to={CONTACT_PATH} className="btn btn-primary">{PRIMARY_CTA_LABEL}</Link>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="team-members-section">
        <div className="content-inner">
          <p className="team-members-section-label">THE SPECIALISTS</p>
          <h2 className="section-title-team">Meet Our Team</h2>
          <div className="team-members-grid">
            <div className="team-member-card">
              <div className="team-member-image">
                <img src="/dr-mohammed-reda-al-yazidi.png" alt="Dr. Mohammed Reda bin Naji Al-Yazidi" />
              </div>
              <div className="team-member-card-content">
                <h3 className="team-member-name">Dr. Mohammed Reda bin Naji Al-Yazidi</h3>
                <p className="team-member-specialization">Physical Therapy and Medical Rehabilitation Specialist - Founder of the Center and the International Research Network.</p>
                <Link to={CONTACT_PATH} className="btn btn-primary team-member-cta">{PRIMARY_CTA_LABEL}</Link>
              </div>
            </div>

            <div className="team-member-card">
              <div className="team-member-image">
                <img src="/dr-safaa-mohammed-mahrez.png" alt="Dr. Safaa Mohammed Mahrez" />
              </div>
              <div className="team-member-card-content">
                <h3 className="team-member-name">Dr. Safaa Mohammed Mahrez</h3>
                <p className="team-member-specialization">Physical Therapy and Rehabilitation Specialist.</p>
                <Link to={CONTACT_PATH} className="btn btn-primary team-member-cta">{PRIMARY_CTA_LABEL}</Link>
              </div>
            </div>

            <div className="team-member-card">
              <div className="team-member-image">
                <img src="/dr-sirine-al-habib-al-qasimi.png" alt="Dr. Sirine Al-Habib Al-Qasimi" />
              </div>
              <div className="team-member-card-content">
                <h3 className="team-member-name">Dr. Sirine Al-Habib Al-Qasimi</h3>
                <p className="team-member-specialization">Physical Therapy and Rehabilitation Specialist.</p>
                <Link to={CONTACT_PATH} className="btn btn-primary team-member-cta">{PRIMARY_CTA_LABEL}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (landing-page default) */}
      <CtaSection />

      <Footer />
    </div>
  );
}

export default OurTeam;
