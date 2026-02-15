import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { CONTACT_PATH, PRIMARY_CTA_LABEL } from '../constants/cta';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: 'Scientifically Precise Protocols',
    desc: 'Exclusive, evidence-based treatment protocols tailored for optimal outcomes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'Treatment-Based Sessions',
    desc: 'Sessions based on treatment plans, not time duration — ensuring thoroughness.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Home Therapy Services',
    desc: 'Home therapy services respecting patient privacy and comfort.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: 'Safe Transportation',
    desc: 'Safe and fully equipped transportation services for patient convenience.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Qualified Medical Team',
    desc: 'A highly qualified medical team combining expertise with compassion.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Comfortable Environment',
    desc: 'A comfortable, welcoming therapeutic environment for healing.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function SectionAlt() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current.filter(Boolean), { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-alt" ref={sectionRef}>
      <div className="content-inner section-alt-inner">
        <p className="section-label section-alt-label">WHY CHOOSE US</p>
        <h2 className="section-title section-alt-title">Why AL MOTAHADI?</h2>
        <p className="section-desc section-desc-center section-alt-desc">
          We are committed to providing the highest quality rehabilitation care through innovation expertise, and genuine compassion.
        </p>
        <div className="cards-six section-alt-cards">
          {items.map((item, i) => (
            <div className="card-why" key={item.title} ref={(el) => { cardsRef.current[i] = el; }}>
              <div className="card-why-icon-box">
                <span className="card-why-icon" aria-hidden="true">{item.icon}</span>
              </div>
              <h3 className="card-why-title">{item.title}</h3>
              <p className="card-why-desc">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="section-cta section-alt-cta">
          <Link to={CONTACT_PATH} className="btn btn-primary">{PRIMARY_CTA_LABEL}</Link>
        </div>
      </div>
    </section>
  );
}
