import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '15+', label: 'YEARS EXPERIENCE' },
  { value: '5k+', label: 'SUCCESS STORIES' },
  { value: '30+', label: 'SPECIALISTS' },
  { value: '24/7', label: 'AVAILABILITY' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="content-inner">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item"
              ref={(el) => { itemsRef.current[i] = el; }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
