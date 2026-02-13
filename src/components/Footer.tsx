import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(mainRef.current, { opacity: 0, y: 20 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: { trigger: footerRef.current, start: 'top 95%', toggleActions: 'play none none none' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-divider" />
      <div className="footer-main" ref={mainRef}>
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/SVG.png" alt="" className="footer-logo-img" />
          </div>
          <span className="footer-logo">AL MOTAHADI</span>
          <p className="footer-desc">Committed to restoring movement and improving lives through expert rehabilitation care.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
          </div>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#">Appointments</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <a href="#">Physical Therapy</a>
          <a href="#">Occupational Therapy</a>
          <a href="#">Speech Therapy</a>
          <a href="#">Pain Management</a>
          <a href="#">Post-Surgical Rehab</a>
        </div>
        <div className="footer-links">
          <h4>Contact</h4>
          <p>123 Recovery Street, City, Country</p>
          <p>Phone: +123 456 7890</p>
          <p>Email: info@almotahadi.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 AL MOTAHADI. All rights reserved.</p>
      </div>
    </footer>
  );
}
