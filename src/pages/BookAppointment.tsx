import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import { WhatsAppIcon } from '../components/Icons';
import { WHATSAPP_URL } from '../constants/cta';
import { sendContact } from '../lib/api';
import '../styles/book-appointment.css';

gsap.registerPlugin(ScrollTrigger);

/* Step 1: Choose Service — document/paper with lines */
const DocumentStepIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
/* Step 2: Pick Date & Time — calendar */
const CalendarStepIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
/* Step 3: Confirm Details — person */
const PersonStepIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
/* Step 4: Confirmation — checkmark in circle */
const CheckCircleStepIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const PersonInputIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const EmailInputIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const PhoneInputIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const CalendarInputIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const TimeInputIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function BookAppointment() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [specialReqs, setSpecialReqs] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroContent = heroRef.current?.querySelector('.book-hero-content');
      if (heroContent) {
        gsap.fromTo(heroContent, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
      }
      const stepItems = stepsRef.current?.querySelectorAll('.book-step');
      if (stepItems?.length) {
        gsap.fromTo(stepItems, { opacity: 0, y: 20 }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: stepsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
      if (formRef.current) {
        gsap.fromTo(formRef.current, { opacity: 0, y: 24 }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: { trigger: formRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const message = [
        service && t('bookAppointment.formPreferredService') + ': ' + service,
        appointmentType && t('bookAppointment.formAppointmentType') + ': ' + appointmentType,
        preferredDate && t('bookAppointment.formPreferredDate') + ': ' + preferredDate,
        preferredTime && t('bookAppointment.formPreferredTime') + ': ' + preferredTime,
        specialReqs && t('bookAppointment.formSpecialReqs') + ': ' + specialReqs,
      ].filter(Boolean).join('\n');
      const result = await sendContact({
        full_name: fullName,
        email,
        phone: phone || undefined,
        message: message || undefined,
      });
      if (result.success) {
        setFullName('');
        setEmail('');
        setPhone('');
        setService('');
        setAppointmentType('');
        setPreferredDate('');
        setPreferredTime('');
        setSpecialReqs('');
        alert(result.message || t('bookAppointment.successMessage'));
      } else {
        setError(result.error);
      }
    } catch {
      setError(t('bookAppointment.errorSend'));
    } finally {
      setSending(false);
    }
  };

  const handleWhatsApp = () => window.open(WHATSAPP_URL, '_blank');

  const steps = [
    { num: 1, icon: <DocumentStepIcon />, titleKey: 'bookAppointment.step1Title', descKey: 'bookAppointment.step1Desc' },
    { num: 2, icon: <CalendarStepIcon />, titleKey: 'bookAppointment.step2Title', descKey: 'bookAppointment.step2Desc' },
    { num: 3, icon: <PersonStepIcon />, titleKey: 'bookAppointment.step3Title', descKey: 'bookAppointment.step3Desc' },
    { num: 4, icon: <CheckCircleStepIcon />, titleKey: 'bookAppointment.step4Title', descKey: 'bookAppointment.step4Desc' },
  ];

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content book-appointment-page">
        <section className="book-hero" ref={heroRef}>
          <div className="book-hero-bg" aria-hidden="true" />
          <div className="book-hero-content">
            <p className="book-hero-label">{t('bookAppointment.heroLabel')}</p>
            <h1 className="book-hero-title">{t('bookAppointment.heroTitle')}</h1>
            <p className="book-hero-desc">{t('bookAppointment.heroDesc')}</p>
          </div>
        </section>

        <section className="book-steps" ref={stepsRef}>
          <div className="book-steps-inner">
            {steps.map((s) => (
              <div key={s.num} className="book-step">
                <div className="book-step-icon-wrap" aria-hidden>
                  <span className="book-step-badge">{s.num}</span>
                  <div className="book-step-icon">{s.icon}</div>
                </div>
                <h3 className="book-step-title">{t(s.titleKey)}</h3>
                <p className="book-step-desc">{t(s.descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="book-main" ref={formRef}>
          <div className="book-main-inner">
            <div className="book-form-col">
              <h2 className="book-form-title">{t('bookAppointment.formTitle')}</h2>
              <form className="book-form" onSubmit={handleSubmit}>
                {error && <div className="book-form-error" role="alert">{error}</div>}
                <div className="book-form-grid">
                  <div className="book-form-group book-form-group--icon">
                    <label className="book-form-label">{t('bookAppointment.formFullName')} <span className="book-form-required">*</span></label>
                    <span className="book-form-input-wrap">
                      <span className="book-form-input-icon" aria-hidden><PersonInputIcon /></span>
                      <input type="text" placeholder={t('bookAppointment.placeholderFullName')} className="book-form-input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </span>
                  </div>
                  <div className="book-form-group book-form-group--icon">
                    <label className="book-form-label">{t('bookAppointment.formEmail')} <span className="book-form-required">*</span></label>
                    <span className="book-form-input-wrap">
                      <span className="book-form-input-icon" aria-hidden><EmailInputIcon /></span>
                      <input type="email" placeholder={t('bookAppointment.placeholderEmail')} className="book-form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </span>
                  </div>
                  <div className="book-form-group book-form-group--phone">
                    <label className="book-form-label">{t('bookAppointment.formPhone')} <span className="book-form-required">*</span></label>
                    <span className="book-form-input-wrap">
                      <span className="book-form-input-icon" aria-hidden><PhoneInputIcon /></span>
                      <input type="tel" placeholder={t('bookAppointment.placeholderPhone')} className="book-form-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </span>
                  </div>
                  <div className="book-form-group">
                    <label className="book-form-label">{t('bookAppointment.formPreferredService')} <span className="book-form-required">*</span></label>
                    <select className="book-form-input book-form-select" value={service} onChange={(e) => setService(e.target.value)} required>
                      <option value="">{t('bookAppointment.selectService')}</option>
                      <option value="Physiotherapy">{t('bookAppointment.servicePhysiotherapy')}</option>
                      <option value="Occupational Therapy">{t('bookAppointment.serviceOccupational')}</option>
                      <option value="Sports Injury">{t('bookAppointment.serviceSportsInjury')}</option>
                      <option value="Pain Management">{t('bookAppointment.servicePainManagement')}</option>
                      <option value="Neurological Rehab">{t('bookAppointment.serviceNeurological')}</option>
                    </select>
                  </div>
                  <div className="book-form-group">
                    <label className="book-form-label">{t('bookAppointment.formAppointmentType')} <span className="book-form-required">*</span></label>
                    <select className="book-form-input book-form-select" value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)} required>
                      <option value="">{t('bookAppointment.selectType')}</option>
                      <option value="Initial Consultation">{t('bookAppointment.typeConsultation')}</option>
                      <option value="Therapy Session">{t('bookAppointment.typeTherapy')}</option>
                      <option value="Follow-up">{t('bookAppointment.typeFollowUp')}</option>
                    </select>
                  </div>
                  <div className="book-form-group book-form-group--date">
                    <label className="book-form-label">{t('bookAppointment.formPreferredDate')} <span className="book-form-required">*</span></label>
                    <span className="book-form-input-wrap book-form-input-wrap--date">
                      <input type="date" className="book-form-input" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} required />
                      <span className="book-form-input-icon book-form-input-icon--right" aria-hidden><CalendarInputIcon /></span>
                    </span>
                  </div>
                  <div className="book-form-group book-form-group--time">
                    <label className="book-form-label">{t('bookAppointment.formPreferredTime')} <span className="book-form-required">*</span></label>
                    <span className="book-form-input-wrap">
                      <span className="book-form-input-icon" aria-hidden><TimeInputIcon /></span>
                      <input type="time" className="book-form-input" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} required />
                    </span>
                  </div>
                  <div className="book-form-group book-form-group--full">
                    <label className="book-form-label">{t('bookAppointment.formSpecialReqs')} ({t('bookAppointment.optional')})</label>
                    <textarea placeholder={t('bookAppointment.placeholderSpecialReqs')} className="book-form-textarea" rows={4} value={specialReqs} onChange={(e) => setSpecialReqs(e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="book-form-submit btn btn-primary" disabled={sending}>
                  {sending ? t('bookAppointment.sending') : t('bookAppointment.submitBtn')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="book-side-col">
              <div className="book-side-card">
                <h3 className="book-side-card-title">{t('bookAppointment.needHelpTitle')}</h3>
                <p className="book-side-card-desc">{t('bookAppointment.needHelpDesc')}</p>
                <button type="button" className="book-side-whatsapp" onClick={handleWhatsApp}>
                  <WhatsAppIcon className="whatsapp-icon" />
                  {t('bookAppointment.contactWhatsApp')}
                </button>
              </div>
              <div className="book-side-card">
                <h3 className="book-side-card-title">{t('bookAppointment.consultVsTherapyTitle')}</h3>
                <div className="book-side-card-block">
                  <h4 className="book-side-card-subtitle">{t('bookAppointment.initialConsultation')}</h4>
                  <p className="book-side-card-desc">{t('bookAppointment.initialConsultationDesc')}</p>
                </div>
                <div className="book-side-card-block">
                  <h4 className="book-side-card-subtitle">{t('bookAppointment.therapySessions')}</h4>
                  <p className="book-side-card-desc">{t('bookAppointment.therapySessionsDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaSection variant="dark-cards" />
      </main>
      <Footer />
    </div>
  );
}
