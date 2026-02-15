import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { CONTACT_PATH, PRIMARY_CTA_LABEL } from '../constants/cta';

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
              <img src="/SVG.png" alt="" className="nav-logo-img" />
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
          <Link to={CONTACT_PATH} className="nav-cta btn btn-primary">{PRIMARY_CTA_LABEL}</Link>
        </div>
      </header>
    </>
  );
}
