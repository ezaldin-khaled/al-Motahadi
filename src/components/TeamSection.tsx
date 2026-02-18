import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, x: -30 }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(imageRef.current, { opacity: 0, x: 30 }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section team-section" ref={sectionRef}>
      <div className="content-inner">
        <div className="team-content" ref={contentRef}>
          <p className="section-label">{t('teamSection.label')}</p>
          <h2 className="section-title">{t('teamSection.title')}</h2>
          <p className="section-desc">{t('teamSection.description')}</p>
          <Link to="/team" className="btn btn-primary">{t('teamSection.meetTeam')}</Link>
        </div>
        <div className="team-image-wrap" ref={imageRef}>
          <img src="/team-image.png" alt={t('teamSection.teamImageAlt')} className="team-image" />
        </div>
      </div>
    </section>
  );
}
