import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { CONTACT_PATH } from '../constants/cta';

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="nav-hamburger-icon" aria-hidden>
      <span className={open ? 'nav-hamburger-line nav-hamburger-line--open' : 'nav-hamburger-line'} />
      <span className={open ? 'nav-hamburger-line nav-hamburger-line--open' : 'nav-hamburger-line'} />
      <span className={open ? 'nav-hamburger-line nav-hamburger-line--open' : 'nav-hamburger-line'} />
    </span>
  );
}

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lineRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('nav-mobile-menu-open');
    } else {
      document.body.classList.remove('nav-mobile-menu-open');
    }
    return () => document.body.classList.remove('nav-mobile-menu-open');
  }, [mobileMenuOpen]);

  const isRtl = i18n.language === 'ar';

  return (
    <>
      <div className="top-line" ref={lineRef} aria-hidden="true" style={{ transformOrigin: isRtl ? 'right' : 'left' }} />
      <header className="nav-header">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)} aria-label="AL MOTAHADI">
            <span className="nav-logo-icon" aria-hidden="true">
              <img src="/logo.png" alt="" className="nav-logo-img" />
            </span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
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
            <button
              type="button"
              className="nav-hamburger"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-expanded={mobileMenuOpen}
              aria-controls="nav-mobile-menu"
              aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              <MenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </div>
        <div
          id="nav-mobile-menu"
          className={`nav-mobile-menu ${mobileMenuOpen ? 'nav-mobile-menu--open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          aria-hidden={!mobileMenuOpen}
        >
          <div className="nav-mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} aria-hidden />
          <div className="nav-mobile-menu-panel" style={isRtl ? { right: 0, left: 'auto' } : { left: 0, right: 'auto' }}>
            <nav className="nav-mobile-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</NavLink>
              <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>{t('nav.services')}</NavLink>
              <NavLink to="/team" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>{t('nav.ourTeam')}</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link nav-link-active' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>{t('nav.contactUs')}</NavLink>
            </nav>
            <div className="nav-mobile-actions">
              <div className="nav-lang-switcher" role="group" aria-label="Language">
                <button type="button" className={`nav-lang-btn ${i18n.language === 'en' ? 'nav-lang-btn--active' : ''}`} onClick={() => i18n.changeLanguage('en')}>EN</button>
                <span className="nav-lang-sep" aria-hidden>|</span>
                <button type="button" className={`nav-lang-btn ${i18n.language === 'ar' ? 'nav-lang-btn--active' : ''}`} onClick={() => i18n.changeLanguage('ar')}>العربية</button>
              </div>
              <Link to={CONTACT_PATH} className="btn btn-primary nav-mobile-cta" onClick={() => setMobileMenuOpen(false)}>{t('nav.bookAppointment')}</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
