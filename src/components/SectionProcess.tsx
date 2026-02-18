import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionProcess() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    { num: 1, title: t('sectionProcess.consultation'), desc: t('sectionProcess.consultationDesc') },
    { num: 2, title: t('sectionProcess.assessment'), desc: t('sectionProcess.assessmentDesc') },
    { num: 3, title: t('sectionProcess.treatmentPlan'), desc: t('sectionProcess.treatmentPlanDesc') },
    { num: 4, title: t('sectionProcess.recovery'), desc: t('sectionProcess.recoveryDesc') },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current.filter(Boolean), { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-process" ref={sectionRef}>
      <div className="content-inner">
        <p className="section-label">{t('sectionProcess.label')}</p>
        <h2 className="section-title">{t('sectionProcess.title')}</h2>
        <p className="section-desc section-desc-center">{t('sectionProcess.description')}</p>
        <div className="cards-steps">
          {steps.map((step, i) => (
            <div className="card-step" key={step.num} ref={(el) => { cardsRef.current[i] = el; }}>
              <div className="step-num">{step.num}</div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
