import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionDark() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(innerRef.current, { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-dark" ref={sectionRef}>
      <div className="content-inner" ref={innerRef}>
        <p className="section-label section-label-teal">{t('sectionDark.label')}</p>
        <h2 className="section-title section-title-light">{t('sectionDark.title')}</h2>
        <p className="section-desc section-desc-light section-desc-center">{t('sectionDark.description')}</p>
        <div className="section-cta"><Link to="/packages" className="btn btn-primary">{t('sectionDark.viewPackages')}</Link></div>
      </div>
    </section>
  );
}
