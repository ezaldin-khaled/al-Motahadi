import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { WhatsAppIcon } from '../components/Icons';
import { WHATSAPP_URL, GOOGLE_MAPS_EMBED_SRC } from '../constants/cta';
import { sendContact } from '../lib/api';
import { useCmsPageContent } from '../hooks/useCmsPageContent';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const bookingRef = useRef<HTMLElement>(null);
  const findUsRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLElement>(null);

  const [bookingFullName, setBookingFullName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSending, setBookingSending] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const { getSectionValue } = useCmsPageContent('contact');
  const heroContent = getSectionValue('contact_hero') as Record<string, unknown> | null;
  const reachoutContent = getSectionValue('contact_reachout') as Record<string, unknown> | null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroContent = heroRef.current?.querySelector('.contact-hero-content');
      if (heroContent) {
        gsap.fromTo(heroContent, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        );
      }

      // Booking section animation
      const bookingCards = bookingRef.current?.querySelectorAll('.booking-card');
      if (bookingCards && bookingCards.length > 0) {
        gsap.fromTo(bookingCards,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: bookingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Find Us section animation
      if (findUsRef.current) {
        gsap.fromTo(findUsRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: findUsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Calculator animation
      if (calculatorRef.current) {
        gsap.fromTo(calculatorRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: calculatorRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingError('');
    setBookingSending(true);
    try {
      const result = await sendContact({
        full_name: bookingFullName,
        email: bookingEmail,
        phone: bookingPhone || undefined,
        message: bookingMessage || undefined,
      });
      if (result.success) {
        setBookingFullName('');
        setBookingEmail('');
        setBookingPhone('');
        setBookingMessage('');
        alert(result.message || t('contact.successMessage'));
      } else {
        setBookingError(result.error);
      }
    } catch {
      setBookingError(t('contact.errorSend'));
    } finally {
      setBookingSending(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_URL, '_blank');
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <section className="contact-hero" ref={heroRef}>
          <div className="page-hero-bg" aria-hidden="true" />
          <div className="contact-hero-content">
            <p className="contact-hero-label">{typeof heroContent?.label === 'string' ? heroContent.label : t('contact.heroLabel')}</p>
            <h1 className="contact-hero-title">{typeof heroContent?.title === 'string' ? heroContent.title : t('contact.heroTitle')}</h1>
            <p className="contact-hero-desc">{typeof heroContent?.description === 'string' ? heroContent.description : t('contact.heroDesc')}</p>
          </div>
        </section>

        <section className="booking-section" ref={bookingRef}>
          <div className="booking-container">
            <div className="booking-card booking-form-card">
              <div className="booking-card-header">
                <div className="booking-card-icon booking-card-icon--form" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <h2 className="booking-card-title">{t('contact.bookViaForm')}</h2>
                  <p className="booking-card-desc">{t('contact.bookViaFormDesc')}</p>
                </div>
              </div>
              <form className="booking-form" onSubmit={handleFormSubmit}>
                {bookingError && (
                  <div className="form-error" role="alert">{bookingError}</div>
                )}
                <div className="form-group">
                  <label className="form-label">{t('contact.fullName')}</label>
                  <input
                    type="text"
                    placeholder={t('contact.placeholderName')}
                    className="form-input-contact"
                    value={bookingFullName}
                    onChange={(e) => setBookingFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('contact.email')}</label>
                  <input
                    type="email"
                    placeholder={t('contact.placeholderEmail')}
                    className="form-input-contact"
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('contact.phone')}</label>
                  <input
                    type="tel"
                    dir="ltr"
                    placeholder={t('contact.placeholderPhone')}
                    className="form-input-contact"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('contact.message')}</label>
                  <textarea
                    placeholder={t('contact.placeholderMessage')}
                    className="form-textarea-contact"
                    rows={4}
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block booking-submit-btn" disabled={bookingSending}>
                  {bookingSending ? t('contact.sending') : t('contact.submit')}
                </button>
              </form>
            </div>

            <div className="booking-right-column">
              <div className="booking-card booking-whatsapp-card">
                <div className="booking-card-header">
                  <div className="booking-card-icon booking-card-icon--whatsapp" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="booking-card-title">{t('contact.bookViaWhatsApp')}</h2>
                    <p className="booking-card-desc">{t('contact.bookViaWhatsAppDesc')}</p>
                  </div>
                </div>
                <p className="whatsapp-extra">{t('contact.whatsappExtra')}</p>
                <button type="button" className="btn btn-whatsapp-green" onClick={handleWhatsAppClick}>
                  <WhatsAppIcon className="whatsapp-icon" />
                  {t('contact.bookViaWhatsApp')}
                </button>
              </div>

              <div className="booking-reachout">
                <h2 className="booking-reachout-title">{typeof reachoutContent?.title === 'string' ? reachoutContent.title : t('contact.reachOutTitle')}</h2>
                <ul className="booking-reachout-list">
                  <li>
                    <span className="booking-reachout-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.6 2.5a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 4 4l1.57-1.16a2 2 0 0 1 2.11-.45c.8.28 1.64.48 2.5.6A2 2 0 0 1 22 16.92Z"/></svg>
                    </span>
                    <div>
                      <strong>{typeof reachoutContent?.phoneLabel === 'string' ? reachoutContent.phoneLabel : t('contact.phoneLabel')}</strong>
                      <span dir="ltr">{t('contact.phoneValue')}</span>
                    </div>
                  </li>
                  <li>
                    <span className="booking-reachout-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M4 8l8 5 8-5"/><path d="M4 8v12h16V8"/></svg>
                    </span>
                    <div>
                      <strong>{typeof reachoutContent?.emailLabel === 'string' ? reachoutContent.emailLabel : t('contact.emailLabel')}</strong>
                      <span>{t('contact.emailValue')}</span>
                    </div>
                  </li>
                  <li>
                    <span className="booking-reachout-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <div>
                      <strong>{typeof reachoutContent?.addressLabel === 'string' ? reachoutContent.addressLabel : t('contact.addressLabel')}</strong>
                      <span>{t('contact.addressValue')}</span>
                    </div>
                  </li>
                  <li>
                    <span className="booking-reachout-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                    </span>
                    <div>
                      <strong>{typeof reachoutContent?.hoursLabel === 'string' ? reachoutContent.hoursLabel : t('contact.hoursLabel')}</strong>
                      <span>{t('contact.hoursValue')}</span>
                    </div>
                  </li>
                </ul>
                <p className="booking-follow-label">{t('contact.followUs')}</p>
                <div className="booking-follow-icons" aria-label={t('contact.followUs')}>
                  <a className="booking-follow-icon" href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="6"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
                  <a className="booking-follow-icon" href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.2-1.5 1.5-1.5h1.7V5c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.7V11H7v3h2.5v8h4Z"/></svg></a>
                  <a className="booking-follow-icon" href="#" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.6l-5.2-6.8L5.6 22H2.5l7.3-8.4L.8 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.7L8.1 3.9H6.3L17.7 20Z"/></svg></a>
                  <a className="booking-follow-icon" href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 6.7a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM5.3 21.3V9h3.2v12.3H5.3Zm5.3 0V9h3.1v1.7h.1c.4-.8 1.6-1.9 3.4-1.9 3.6 0 4.3 2.3 4.3 5.3v7.2h-3.2v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.6h-3.2Z"/></svg></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Find Us — map section */}
        <section className="find-us-section" ref={findUsRef}>
          <div className="find-us-container">
            <h2 className="find-us-title">{t('contact.findUs')}</h2>
            <div className="find-us-map-wrapper">
              <iframe
                className="find-us-map"
                src={GOOGLE_MAPS_EMBED_SRC}
                title={t('contact.findUs')}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* Health Tools teaser (links to full tools page) */}
        <section className="calculate-health calculate-health--teaser" ref={calculatorRef}>
          <div className="calculate-health__container">
            <p className="calculate-health__label">{t('home.healthToolsLabel')}</p>
            <h2 className="calculate-health__title">{t('home.healthToolsTitle')}</h2>
            <p className="calculate-health__subheading">
              {t('home.healthToolsDesc')}
            </p>
            <a href="/health-tools" className="calculate-health__cta">
              {t('home.healthToolsCta')}
            </a>
          </div>
        </section>

        {/* CTA Section (landing-page default) */}
        <CtaSection variant="dark-cards" />
      </main>
      <Footer />
    </div>
  );
}
