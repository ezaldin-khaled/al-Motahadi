import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: 1, title: 'Consultation', desc: 'We listen to your history, goals, and concerns to understand your needs.' },
  { num: 2, title: 'Assessment', desc: 'A thorough evaluation to create a baseline and identify priorities.' },
  { num: 3, title: 'Treatment Plan', desc: 'A customized plan with clear milestones and ongoing adjustments.' },
  { num: 4, title: 'Recovery', desc: 'Dedicated sessions and support until you achieve your goals.' },
];

export default function SectionProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
        <p className="section-label">PROCESS</p>
        <h2 className="section-title">Your Path to Recovery</h2>
        <p className="section-desc section-desc-center">A clear, structured approach from first contact to lasting recovery.</p>
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
