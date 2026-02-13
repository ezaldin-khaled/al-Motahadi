import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Header() {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);
  return (
    <>
      <div className="top-line" ref={lineRef} aria-hidden="true" style={{ transformOrigin: 'left' }} />
      <header className="nav-header">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
            AL MOTAHADI
          </Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/team">Our Team</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact Us</Link>
          </nav>
          <Link to="/contact" className="nav-cta">Book an Appointment →</Link>
        </div>
      </header>
    </>
  );
}
