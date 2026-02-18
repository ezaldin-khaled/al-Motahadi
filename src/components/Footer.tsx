import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Footer() {
  const { t } = useTranslation();
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
          <span className="footer-logo">{t('footer.brand')}</span>
          <p className="footer-desc">
            {t('footer.description')}
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label={t('footer.instagram')}><InstagramIcon /></a>
            <a href="#" className="footer-social-link" aria-label={t('footer.facebook')}><FacebookIcon /></a>
            <a href="#" className="footer-social-link" aria-label={t('footer.twitter')}><TwitterIcon /></a>
            <a href="#" className="footer-social-link" aria-label={t('footer.linkedin')}><LinkedInIcon /></a>
          </div>
        </div>
        <div className="footer-links">
          <h4 className="footer-heading">{t('footer.servicesHeading')}</h4>
          <Link to="/services">{t('footer.physiotherapy')}</Link>
          <Link to="/services">{t('footer.neuroRehab')}</Link>
          <Link to="/services">{t('footer.sportsInjury')}</Link>
          <Link to="/services">{t('footer.painManagement')}</Link>
        </div>
        <div className="footer-links">
          <h4 className="footer-heading">{t('footer.companyHeading')}</h4>
          <Link to="/about">{t('footer.aboutUs')}</Link>
          <Link to="/who-we-are">{t('footer.whoWeAre')}</Link>
          <Link to="/packages">{t('footer.packagesPricing')}</Link>
          <Link to="/about">{t('footer.ourProcess')}</Link>
          <Link to="/contact">{t('footer.contact')}</Link>
        </div>
        <div className="footer-links footer-links-empty" aria-hidden />
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">{t('footer.copyright')}</p>
        <div className="footer-legal">
          <a href="#">{t('footer.privacyPolicy')}</a>
          <a href="#">{t('footer.termsOfService')}</a>
        </div>
        <p className="footer-developed">{t('footer.developedBy')}</p>
      </div>
    </footer>
  );
}
