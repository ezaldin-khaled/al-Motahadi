import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhatsAppIcon } from './Icons';
import {
  CONTACT_PATH,
  CTA_DESCRIPTION,
  CTA_HEADING,
  CTA_HEADING_ACCENT,
  CTA_SECTION_LABEL,
  PRIMARY_CTA_LABEL_SHORT,
  WHATSAPP_LABEL,
} from '../constants/cta';

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

const cards = [
  {
    icon: <ClockIcon />,
    title: 'Working Hours',
    lines: ['Sunday - Thursday', '8:00 AM - 8:00 PM'],
  },
  {
    icon: <PhoneIcon />,
    title: 'Contact Us',
    lines: ['+971 XX XXX XXXX', 'info@almotahadi.ae'],
  },
  {
    icon: <LocationIcon />,
    title: 'Visit Us',
    lines: ['AL MOTAHADI Medical Center', 'Dubai, United Arab Emirates'],
  },
];

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="cta-section-bg" aria-hidden />
      <div className="cta-section-inner">
        <div className="cta-content" ref={contentRef}>
          <p className="cta-label">
            <span className="cta-label-line" />
            {CTA_SECTION_LABEL}
          </p>
          <h2 className="cta-title">
            {CTA_HEADING} <span className="cta-title-accent">{CTA_HEADING_ACCENT}</span>
          </h2>
          <p className="cta-desc">
            {CTA_DESCRIPTION}
          </p>
          <div className="cta-buttons">
            <a href={CONTACT_PATH} className="btn btn-primary">
              {PRIMARY_CTA_LABEL_SHORT}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#" className="btn btn-secondary btn-whatsapp" aria-label="WhatsApp">
              <WhatsAppIcon className="whatsapp-icon" />
              {WHATSAPP_LABEL}
            </a>
          </div>
        </div>
        <div className="cta-cards" ref={cardsRef}>
          {cards.map((card) => (
            <div key={card.title} className="cta-info-card">
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
