import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SectionValuesContent = {
  label?: string;
  titleDark?: string;
  titleAccent?: string;
  description?: string;
  imageMain?: string;
  imageInset?: string;
  imageMainAlt?: string;
  imageInsetAlt?: string;
  features?: Array<{ title: string; description: string }>;
};

export default function SectionValues({ content }: { content?: SectionValuesContent }) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imagesRef.current, { opacity: 0, x: -40 }, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(contentRef.current, { opacity: 0, x: 40 }, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-values" ref={sectionRef}>
      <div className="section-values-inner">
        <div className="about-section">
          <div className="about-images" ref={imagesRef}>
            <img
              src={content?.imageMain ?? '/about-main.png'}
              alt={content?.imageMainAlt ?? t('sectionValues.aboutImgMainAlt')}
              className="about-img-main"
            />
            <img
              src={content?.imageInset ?? '/about-overlay.png'}
              alt={content?.imageInsetAlt ?? t('sectionValues.aboutImgInsetAlt')}
              className="about-img-inset"
            />
          </div>
          <div className="about-content" ref={contentRef}>
            <p className="section-label section-label-about">{content?.label ?? t('sectionValues.label')}</p>
            <h2 className="section-title section-title-about">
              <span className="section-title-dark">{content?.titleDark ?? t('sectionValues.titleDark')}</span>
              <span className="section-title-accent">{content?.titleAccent ?? t('sectionValues.titleAccent')}</span>
            </h2>
            <p className="section-desc">{content?.description ?? t('sectionValues.description')}</p>
            <ul className="about-list about-list-features">
              {(content?.features ?? [
                { title: t('sectionValues.patientCentered'), description: t('sectionValues.patientCenteredDesc') },
                { title: t('sectionValues.multidisciplinary'), description: t('sectionValues.multidisciplinaryDesc') },
                { title: t('sectionValues.trustedOutcomes'), description: t('sectionValues.trustedOutcomesDesc') },
              ]).map((feature, index) => (
                <li key={`${feature.title}-${index}`}>
                  <span className="about-feature-icon" aria-hidden="true">
                    {index === 0 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                  </span>
                  <div className="about-feature-text">
                    <strong>{feature.title}</strong>
                    <span className="about-feature-desc">{feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
