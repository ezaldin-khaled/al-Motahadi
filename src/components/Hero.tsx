import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
        .from(ctaRef.current?.children || [], { opacity: 0, y: 16, stagger: 0.1 }, '-=0.1')
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
            <a href="#" className="btn btn-secondary">
              <svg className="whatsapp-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
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
