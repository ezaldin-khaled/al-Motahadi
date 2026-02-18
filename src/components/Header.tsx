import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { CONTACT_PATH } from '../constants/cta';

export default function Header() {
  const { t, i18n } = useTranslation();
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);
  return (
    <>
      <div className="top-line" ref={lineRef} aria-hidden="true" style={{ transformOrigin: i18n.language === 'ar' ? 'right' : 'left' }} />
      <header className="nav-header">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <span className="nav-logo-icon" aria-hidden="true">
              <img src="/SVG.png" alt="" className="nav-logo-img" />
            </span>
            AL MOTAHADI
          </Link>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>{t('nav.home')}</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>{t('nav.services')}</NavLink>
            <NavLink to="/team" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>{t('nav.ourTeam')}</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>{t('nav.about')}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>{t('nav.contactUs')}</NavLink>
          </nav>
          <div className="nav-right">
            <div className="nav-lang-switcher" role="group" aria-label="Language">
              <button type="button" className={`nav-lang-btn ${i18n.language === 'en' ? 'nav-lang-btn--active' : ''}`} onClick={() => i18n.changeLanguage('en')}>EN</button>
              <span className="nav-lang-sep" aria-hidden>|</span>
              <button type="button" className={`nav-lang-btn ${i18n.language === 'ar' ? 'nav-lang-btn--active' : ''}`} onClick={() => i18n.changeLanguage('ar')}>العربية</button>
            </div>
            <Link to={CONTACT_PATH} className="nav-cta btn btn-primary">{t('nav.bookAppointment')}</Link>
          </div>
        </div>
      </header>
    </>
  );
}
