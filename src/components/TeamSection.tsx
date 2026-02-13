import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
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
          <p className="section-label">OUR TEAM</p>
          <h2 className="section-title">Expert Professionals Dedicated to You</h2>
          <p className="section-desc">Our multidisciplinary team brings together specialists in physical therapy, occupational therapy, and rehabilitation to deliver coordinated, compassionate care.</p>
          <a href="#" className="btn btn-primary">Meet Our Team</a>
        </div>
        <div className="team-image-wrap" ref={imageRef}>
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80" alt="Our team" className="team-image" />
        </div>
      </div>
    </section>
  );
}
