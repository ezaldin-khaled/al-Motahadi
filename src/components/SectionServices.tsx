import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    img: '/service-left.png',
    title: 'Physical Therapy',
    desc: 'Restore mobility and reduce pain through evidence-based techniques and personalized exercise programs.',
    alt: 'Therapist assisting patient with arm exercises in a comfortable setting',
  },
  {
    img: '/service-middle.png',
    title: 'Neurological & Organic Rehabilitation',
    desc: 'Specialized programs for neurological and organic conditions with comprehensive, evidence-based care.',
    alt: 'Neurological and Organic Rehabilitation Services',
  },
  {
    img: '/service-right.png',
    title: 'Rehabilitation',
    desc: 'Comprehensive programs for post-surgery, injury, and chronic condition management.',
    alt: 'Therapist guiding patient with resistance band exercise in wheelchair',
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
        <div className="section-cta"><a href="#" className="btn btn-primary">View All Services →</a></div>
      </div>
    </section>
  );
}
