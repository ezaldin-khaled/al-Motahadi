import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhatsAppIcon } from './Icons';
import { Link } from 'react-router-dom';
import { CONTACT_PATH } from '../constants/cta';

gsap.registerPlugin(ScrollTrigger);

const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const QualityCareIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

type CtaSectionProps = { variant?: 'dark-cards' | 'packages' | 'services' };

export default function CtaSection({ variant }: CtaSectionProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const cards = [
    { icon: <ClockIcon />, title: t('cta.workingHours'), lines: [t('cta.hoursDefault'), t('cta.hoursTimeDefault')] },
    { icon: <PhoneIcon />, title: t('cta.contactUs'), lines: [t('cta.phonePlaceholder'), t('cta.email')] },
    { icon: <LocationIcon />, title: t('cta.visitUsTitle'), lines: [t('cta.locationLine1'), t('cta.locationLine2')] },
  ];

  const cardsServices = [
    { icon: <ClockIcon />, title: t('cta.workingHours'), lines: [t('cta.hoursDefault'), t('cta.hoursTimeServices')] },
    { icon: <PhoneIcon />, title: t('cta.contactUs'), lines: [t('cta.phoneServices'), t('cta.email')] },
    { icon: <LocationIcon />, title: t('cta.visitUsTitle'), lines: [t('cta.locationLine1Services'), t('cta.locationLine2')] },
  ];

  const cardsPackages = [
    { icon: <QualityCareIcon />, title: t('cta.qualityCare'), lines: [t('cta.qualityCareDesc')] },
    { icon: <QualityCareIcon />, title: t('cta.experiencedTeam'), lines: [t('cta.experiencedTeamDesc')] },
    { icon: <QualityCareIcon />, title: t('cta.personalizedApproach'), lines: [t('cta.personalizedApproachDesc')] },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, x: -24 }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(cardsRef.current, { opacity: 0, x: 24 }, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const isPackages = variant === 'packages';
  const isServices = variant === 'services';
  const displayCards = isPackages ? cardsPackages : isServices ? cardsServices : cards;

  const ctaDescription = isServices ? t('cta.descriptionServices') : t('cta.description');

  return (
    <section className={`cta-section ${variant === 'dark-cards' || isServices ? 'cta-section-dark-cards' : ''} ${isPackages ? 'cta-section-packages' : ''}`} ref={sectionRef}>
      <div className="cta-section-bg" aria-hidden />
      <div className="cta-section-inner">
        <div className="cta-content" ref={contentRef}>
          <p className="cta-label">
            <span className="cta-label-line" />
            {isServices ? t('cta.dontHesitate') : t('cta.getStarted')}
          </p>
          <h2 className="cta-title">
            {t('cta.heading')} <span className="cta-title-accent">{t('cta.headingAccent')}</span>
          </h2>
          <p className="cta-desc">
            {ctaDescription}
          </p>
          <div className="cta-buttons">
            {isPackages ? (
              <>
                <Link to="/services" className="btn btn-primary">
                  {t('cta.exploreServices')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to={CONTACT_PATH} className="btn btn-outline-light">{t('cta.bookSession')}</Link>
              </>
            ) : isServices ? (
              <>
                <Link to={CONTACT_PATH} className="btn btn-primary">
                  {t('cta.bookAppointment')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to={CONTACT_PATH} className="btn btn-secondary" aria-label={t('cta.visitUs')}>
                  <LocationIcon />
                  {t('cta.visitUs')}
                </Link>
              </>
            ) : (
              <>
                <Link to={CONTACT_PATH} className="btn btn-primary">
                  {t('cta.bookAppointment')}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href="#" className="btn btn-secondary btn-whatsapp" aria-label="WhatsApp">
                  <WhatsAppIcon className="whatsapp-icon" />
                  {t('cta.whatsapp')}
                </a>
              </>
            )}
          </div>
        </div>
        <div className="cta-cards" ref={cardsRef}>
          {displayCards.map((card) => (
            <div key={card.title} className={`cta-info-card ${isPackages ? 'cta-info-card-packages' : ''}`}>
              <div className="cta-info-card-icon" aria-hidden>
                {card.icon}
              </div>
              <div className="cta-info-card-body">
                <h3 className="cta-info-card-title">{card.title}</h3>
                {card.lines.map((line) => (
                  <p key={line} className="cta-info-card-line">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
