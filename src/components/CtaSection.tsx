import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, x: -24 }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(cardsRef.current, { opacity: 0, x: 24 }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-dark cta-section" ref={sectionRef}>
      <div className="cta-section-inner">
        <div className="cta-content" ref={contentRef}>
          <p className="section-label section-label-teal">JOIN US</p>
          <h2 className="section-title section-title-light">Begin Your Recovery Journey</h2>
          <p className="section-desc section-desc-light">Take the first step today. Our team is ready to support you with personalized care and a clear path to recovery.</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">Get Started</a>
            <a href="#" className="btn btn-outline-light">Sign Up Now</a>
          </div>
        </div>
        <div className="cta-image-wrap" ref={cardsRef}>
          <div className="cta-image-bg" />
          <div className="cta-overlay-cards">
            <a href="#" className="cta-overlay-card">Physical Therapy</a>
            <a href="#" className="cta-overlay-card">Occupational Therapy</a>
            <a href="#" className="cta-overlay-card">Speech Therapy</a>
          </div>
        </div>
      </div>
    </section>
  );
}
