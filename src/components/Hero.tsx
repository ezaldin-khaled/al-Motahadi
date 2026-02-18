import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { WhatsAppIcon } from './Icons';
import { CONTACT_PATH } from '../constants/cta';

export default function Hero() {
  const { t } = useTranslation();
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
          <p className="brand" ref={brandRef}>{t('hero.brand')}</p>
          <h1 className="headline" ref={headlineRef}>
            <span className="headline-dark">{t('hero.headlineDark')}</span>
            <span className="headline-accent">{t('hero.headlineAccent')}</span>
          </h1>
          <p className="description" ref={descRef}>
            {t('hero.description')}
          </p>
          <div className="cta-buttons" ref={ctaRef}>
            <Link to={CONTACT_PATH} className="btn btn-primary">{t('nav.bookAppointment')}</Link>
            <a href="#" className="btn btn-secondary btn-whatsapp">
              <WhatsAppIcon className="whatsapp-icon" />
              {t('hero.whatsapp')}
            </a>
          </div>
        </div>
        <div className="hero-image-wrap" ref={imageRef}>
          <div className="hero-image-container">
            <img src="/hero-image.png" alt={t('hero.heroImageAlt')} className="hero-image" />
            <div className="image-badge image-badge-dark" ref={badgeRef}>
              <strong>{t('hero.trustedHealthcare')}</strong>
              <span>{t('hero.patientsRehabilitated')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
