import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
    title: 'Physical Therapy',
    desc: 'Restore mobility and reduce pain through evidence-based techniques and personalized exercise programs.',
    alt: 'Physical Therapy',
  },
  {
    img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80',
    title: 'Occupational Therapy',
    desc: 'Regain independence in daily activities with targeted interventions and adaptive strategies.',
    alt: 'Occupational Therapy',
  },
  {
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80',
    title: 'Rehabilitation',
    desc: 'Comprehensive programs for post-surgery, injury, and chronic condition management.',
    alt: 'Rehabilitation',
  },
];

export default function SectionServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          <p className="section-label">OUR SERVICES</p>
          <h2 className="section-title">Comprehensive Care Solution</h2>
          <p className="section-desc section-desc-center">From assessment to recovery, we offer a full range of rehabilitation services designed to meet your unique needs.</p>
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
        <p className="section-extra">Our integrated approach ensures you receive coordinated care from initial consultation through to full recovery. We work closely with physicians and families to achieve the best outcomes.</p>
        <div className="section-cta"><a href="#" className="btn btn-primary">View All Services</a></div>
      </div>
    </section>
  );
}
