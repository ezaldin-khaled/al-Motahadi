import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: 'Expert Medical Professionals', desc: 'Licensed therapists with years of experience in rehabilitation.' },
  { title: 'State-of-the-Art Facilities', desc: 'Modern equipment and comfortable spaces for your recovery.' },
  { title: 'Personalized Care Plans', desc: 'Treatment designed around your goals and lifestyle.' },
  { title: 'Proven Outcomes', desc: 'Track record of helping patients return to full function.' },
  { title: 'Continuous Support', desc: 'Guidance from first visit through long-term follow-up.' },
  { title: 'Family Involvement', desc: 'We include your loved ones in the recovery journey.' },
];

export default function SectionAlt() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current.filter(Boolean), { opacity: 0, scale: 0.95 }, {
        opacity: 1,
        scale: 1,
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
      <div className="content-inner">
        <p className="section-label">ABOUT US</p>
        <h2 className="section-title">Why AL MOTAHADI?</h2>
        <p className="section-desc section-desc-center">We stand out through our commitment to quality, innovation, and every patient's wellbeing.</p>
        <div className="cards-six">
          {items.map((item, i) => (
            <div className="card-icon" key={item.title} ref={(el) => { cardsRef.current[i] = el; }}>
              <div className="card-icon-circle"><span className="card-icon-symbol">◆</span></div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="section-cta"><a href="#" className="btn btn-primary">Learn More</a></div>
      </div>
    </section>
  );
}
