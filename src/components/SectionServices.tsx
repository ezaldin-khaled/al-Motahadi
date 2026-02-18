import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionServices() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const services = [
    { img: '/service-left.png', title: t('sectionServices.physicalTherapy'), desc: t('sectionServices.physicalTherapyDesc'), alt: t('sectionServices.physicalTherapyAlt') },
    { img: '/service-middle.png', title: t('sectionServices.neurologicalRehab'), desc: t('sectionServices.neurologicalRehabDesc'), alt: t('sectionServices.neurologicalRehabAlt') },
    { img: '/service-right.png', title: t('sectionServices.rehabilitation'), desc: t('sectionServices.rehabilitationDesc'), alt: t('sectionServices.rehabilitationAlt') },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(cardsRef.current.filter(Boolean), { opacity: 0, y: 32 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-services" ref={sectionRef}>
      <div className="content-inner">
        <div ref={headingRef}>
          <p className="section-label">{t('sectionServices.label')}</p>
          <h2 className="section-title">{t('sectionServices.title')}</h2>
          <p className="section-desc section-desc-center">{t('sectionServices.description')}</p>
        </div>
        <div className="cards-three">
          {services.map((s, i) => (
            <div className="card" key={s.title} ref={(el) => { cardsRef.current[i] = el; }}>
              <img src={s.img} alt={s.alt} className="card-img" />
              <h3 className="card-title">{s.title}</h3>
              <p className="card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="section-extra">{t('sectionServices.extra')}</p>
        <div className="section-cta"><Link to="/services" className="btn btn-primary">{t('sectionServices.viewAllServices')}</Link></div>
      </div>
    </section>
  );
}
