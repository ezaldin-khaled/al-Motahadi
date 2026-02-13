import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionDark() {
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
        <p className="section-label section-label-teal">PRICING</p>
        <h2 className="section-title section-title-light">Tailored Packages</h2>
        <p className="section-desc section-desc-light section-desc-center">We offer flexible packages to suit different needs and budgets. Choose the plan that fits your recovery journey.</p>
        <div className="section-cta"><a href="#" className="btn btn-primary">View Packages →</a></div>
      </div>
    </section>
  );
}
