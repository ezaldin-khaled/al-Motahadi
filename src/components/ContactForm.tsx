import { useEffect, useRef, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current, { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert('Thank you. Your message has been sent.');
  }

  return (
    <section className="section section-contact-form" ref={sectionRef}>
      <div className="content-inner">
        <p className="section-label">CALCULATOR</p>
        <h2 className="section-title">Calculate Your Health</h2>
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" placeholder="First Name" className="form-input" required />
            <input type="text" placeholder="Last Name" className="form-input" required />
          </div>
          <input type="email" placeholder="Email" className="form-input form-input-full" required />
          <input type="tel" placeholder="Phone Number" className="form-input form-input-full" />
          <textarea placeholder="Your Message" className="form-textarea" rows={4} />
          <button type="submit" className="btn btn-primary btn-block">Send Message</button>
        </form>
      </div>
    </section>
  );
}
