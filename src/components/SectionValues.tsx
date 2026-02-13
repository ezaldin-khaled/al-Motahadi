import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imagesRef.current, { opacity: 0, x: -40 }, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(contentRef.current, { opacity: 0, x: 40 }, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-values" ref={sectionRef}>
      <div className="section-values-inner">
        <div className="about-section">
          <div className="about-images" ref={imagesRef}>
            <img src="/about-main.png" alt="Therapist working with patient at AL MOTAHADI — compassionate rehabilitation care" className="about-img-main" />
            <img src="/about-overlay.png" alt="Modern clinic interior at AL MOTAHADI — bright, spacious rehabilitation facility" className="about-img-inset" />
          </div>
          <div className="about-content" ref={contentRef}>
            <p className="section-label section-label-about">About Our Center</p>
            <h2 className="section-title section-title-about">
              <span className="section-title-dark">Where Expertise</span>
              <span className="section-title-accent">Meets Compassion</span>
            </h2>
            <p className="section-desc">At AL MOTAHADI Medical Rehabilitation Center, we combine advanced therapeutic techniques with genuine compassionate care. Our multidisciplinary team works together to help you regain mobility, strength, and independence.</p>
            <ul className="about-list about-list-features">
              <li>
                <span className="about-feature-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </span>
                <div><strong>Patient-Centered Care</strong><br /><span className="about-feature-desc">Personalized treatment plans designed around your unique needs</span></div>
              </li>
              <li>
                <span className="about-feature-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </span>
                <div><strong>Multidisciplinary Team</strong><br /><span className="about-feature-desc">Experts working together for your complete recovery</span></div>
              </li>
              <li>
                <span className="about-feature-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <div><strong>Trusted Outcomes</strong><br /><span className="about-feature-desc">Proven results with evidence-based rehabilitation</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
