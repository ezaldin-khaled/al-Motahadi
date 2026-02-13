import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { WhatsAppIcon } from './Icons';

export default function Hero() {
  const brandRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl
        .from(brandRef.current, { opacity: 0, y: 20 })
        .from(headlineRef.current, { opacity: 0, y: 24 }, '-=0.2')
        .from(descRef.current, { opacity: 0, y: 20 }, '-=0.15')
        .from(ctaRef.current?.children || [], { y: 16, stagger: 0.1, duration: 0.4 }, '-=0.1')
        .from(imageRef.current, { opacity: 0, x: 48 }, '-=0.8')
        .from(badgeRef.current, { opacity: 0, y: 16 }, '-=0.3');
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero">
      <div className="content-inner">
        <div className="hero-text">
          <p className="brand" ref={brandRef}>AL MOTAHADI REHABILITATION CENTER</p>
          <h1 className="headline" ref={headlineRef}>
            <span className="headline-dark">Restoring Movement.</span>
            <span className="headline-accent">Improving Lives.</span>
          </h1>
          <p className="description" ref={descRef}>
            Your journey toward recovery begins here. A compassionate approach in physical rehabilitation for a transformative return to movement, strength, and independence.
          </p>
          <div className="cta-buttons" ref={ctaRef}>
            <a href="#" className="btn btn-primary">Book an Appointment →</a>
            <a href="#" className="btn btn-secondary btn-whatsapp">
              <WhatsAppIcon className="whatsapp-icon" />
              Whatsapp Us
            </a>
          </div>
        </div>
        <div className="hero-image-wrap" ref={imageRef}>
          <div className="hero-image-container">
            <img src="/hero-image.png" alt="Compassionate rehabilitation care at AL MOTAHADI center — healthcare professional with patient" className="hero-image" />
            <div className="image-badge image-badge-dark" ref={badgeRef}>
              <strong>Trusted Healthcare</strong>
              <span>500+ patients rehabilitated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
