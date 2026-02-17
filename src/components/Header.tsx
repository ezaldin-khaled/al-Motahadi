import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Services</NavLink>
            <NavLink to="/packages" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Packages & Pricing</NavLink>
            <NavLink to="/team" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Our Team</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>About</NavLink>
            <NavLink to="/who-we-are" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Who We Are</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>Contact Us</NavLink>
          </nav>
          <Link to={CONTACT_PATH} className="nav-cta btn btn-primary">{PRIMARY_CTA_LABEL}</Link>
        </div>
      </header>
    </>
  );
}
