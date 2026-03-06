import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BOOK_APPOINTMENT_PATH, WHATSAPP_URL } from '../constants/cta';
import '../styles/package-detail.css';

type DetailType =
  | 'individual'
  | 'corporate'
  | 'community-care'
  | 'home-therapy'
  | 'intensive-home-therapy'
  | 'comprehensive-home-rehab';

type PackageItem = {
  title: string;
  subtitle: string;
  description: string;
  meta?: string;
  price?: string;
};

type ReasonItem = {
  title: string;
  text: string;
};

type DetailConfig = {
  heroTitle: string;
  heroDesc: string[];
  label: string;
  mainTitle: string;
  packages: PackageItem[];
  whyTitle: string;
  reasons: ReasonItem[];
  ctaTitle: string;
  ctaText: string;
  additionalTitle?: string;
  additionalItems?: ReasonItem[];
  secondaryWhyTitle?: string;
  secondaryReasons?: ReasonItem[];
};

const DETAIL_CONFIG: Record<DetailType, DetailConfig> = {
  individual: {
    heroTitle: 'Individual Treatment Packages at Al-Mutahaddi',
    heroDesc: [
      'At AL Motahadi Medical Rehabilitation Center, we offer a range of flexible Individual Treatment Packages designed to provide structured, evidence-based rehabilitation tailored to your condition and goals.',
      'Each package is based on a precise treatment plan, not session length, ensuring that every visit adds real value to your recovery journey.',
    ],
    label: 'INDIVIDUAL PROGRAMS',
    mainTitle: 'Our Individual Packages',
    packages: [
      {
        title: 'Tawakkalna',
        subtitle: 'Starter Package',
        description: 'Ideal for patients beginning their rehabilitation journey or needing a focused plan for a specific condition.',
        meta: 'Includes assessment and 5 treatment-based sessions.',
        price: 'Special package pricing available at the center.',
      },
      {
        title: 'Wathiq',
        subtitle: 'Progressive Package',
        description: 'Designed for patients who require a structured plan with continuous follow-up and measurable milestones.',
        meta: 'Includes assessment and 10 treatment-based sessions.',
        price: 'Special package pricing available at the center.',
      },
      {
        title: 'Tasallam',
        subtitle: 'Focused Care',
        description: 'Suitable for cases requiring short-term, targeted rehabilitation with clear functional goals.',
        meta: 'Includes assessment and 15 treatment-based sessions.',
        price: 'Special package pricing available at the center.',
      },
      {
        title: 'Hanit',
        subtitle: 'Extended Program',
        description: 'For patients who need a longer, progressive program with regular reassessment and plan adjustments.',
        meta: 'Includes assessment and 20 treatment-based sessions.',
        price: 'Special package pricing available at the center.',
      },
      {
        title: 'Al-Motahadi',
        subtitle: 'Comprehensive Program',
        description: 'A complete rehabilitation journey with integrated goals, follow-up, and coordination with your medical team.',
        meta: 'Includes assessment and 30 treatment-based sessions.',
        price: 'Exclusive package pricing available at the center.',
      },
    ],
    whyTitle: 'Why Choose Our Individual Packages?',
    reasons: [
      {
        title: 'Treatment-Based Sessions',
        text: 'Every session is guided by a clear treatment plan, not fixed time slots, ensuring depth and quality of care.',
      },
      {
        title: 'Personalized Goals',
        text: 'Packages are designed around your medical condition, lifestyle, and personal objectives.',
      },
      {
        title: 'Integrated Follow-Up',
        text: 'Regular reassessment and progress tracking to keep your rehabilitation on the right path.',
      },
      {
        title: 'Flexible Options',
        text: 'Multiple package levels to suit different needs, stages, and budgets.',
      },
    ],
    ctaTitle: 'Ready to Start Your Rehabilitation Journey?',
    ctaText:
      'Choose the package that best suits your needs and let our team at AL Motahadi Medical Rehabilitation Center guide you through a structured, evidence-based rehabilitation experience.',
  },
  corporate: {
    heroTitle: 'Corporate Rehabilitation Packages at Al-Mutahaddi',
    heroDesc: [
      'AL Motahadi Medical Rehabilitation Center offers tailored Corporate Rehabilitation Packages that help organizations protect workforce health, reduce absenteeism, and support employees returning to work after injury or illness.',
      'Our programs are built on clear medical protocols, transparent reporting, and measurable outcomes.',
    ],
    label: 'CORPORATE SERVICES',
    mainTitle: 'Our Corporate Packages',
    packages: [
      {
        title: 'Tawakkalna Corporate',
        subtitle: 'Focused Support',
        description:
          'Short-term corporate program for employees requiring initial rehabilitation or targeted functional improvement.',
        meta: 'Includes assessment and 5 treatment-based sessions per enrolled employee.',
      },
      {
        title: 'Wathiq Corporate',
        subtitle: 'Enhanced Care',
        description:
          'Ideal for employees needing structured, mid-term rehabilitation plans after injury or medical leave.',
        meta: 'Includes assessment and 10 treatment-based sessions per enrolled employee.',
      },
      {
        title: 'Tasallam Corporate',
        subtitle: 'Extended Recovery',
        description:
          'Supports complex cases that require longer follow-up, functional training, and workplace reintegration.',
        meta: 'Includes assessment and 15 treatment-based sessions per enrolled employee.',
      },
      {
        title: 'Hanit Corporate',
        subtitle: 'Comprehensive Support',
        description:
          'Suitable for organizations that want a long-term, proactive rehabilitation framework for their teams.',
        meta: 'Includes assessment and 20 treatment-based sessions per enrolled employee.',
      },
      {
        title: 'Al-Motahadi Corporate',
        subtitle: 'Strategic Partnership',
        description:
          'A comprehensive, collaborative program for organizations that prioritize workforce health and long-term wellbeing.',
        meta: 'Includes assessment and 30 treatment-based sessions per enrolled employee.',
      },
    ],
    whyTitle: 'Why Choose Our Corporate Packages?',
    reasons: [
      {
        title: 'Improved Workforce Health',
        text: 'Structured rehabilitation reduces complications and speeds up the safe return to work.',
      },
      {
        title: 'Predictable Planning',
        text: 'Clear package structure helps HR and management plan budgets and timelines effectively.',
      },
      {
        title: 'Evidence-Based Care',
        text: 'All programs follow exclusive, research-backed therapeutic protocols.',
      },
      {
        title: 'Partner-Centered Approach',
        text: 'We work closely with your organization to align rehabilitation with workplace demands.',
      },
    ],
    ctaTitle: "Invest in Your Workforce's Health Today",
    ctaText:
      'By investing in employee rehabilitation and wellbeing, your organization benefits from reduced absenteeism, better performance, and a stronger culture of care.',
  },
  'community-care': {
    heroTitle: 'Community Care Program Packages at Al-Mutahaddi',
    heroDesc: [
      'Through the Ehata Community Care Program, AL Motahadi Medical Rehabilitation Center extends specialized support to those most in need of rehabilitation services.',
      'Our community packages are designed for the elderly, women, persons with disabilities, and low-income individuals—ensuring access to quality care with meaningful financial support.',
    ],
    label: 'COMMUNITY CARE',
    mainTitle: 'Our Community Care Program Packages',
    packages: [
      {
        title: 'Al-Ihsan Package',
        subtitle: 'For the Elderly',
        description:
          'Provides dedicated rehabilitation support for older adults, focusing on mobility, balance, and independence.',
        meta: 'Includes 15 treatment-based sessions with a special community discount.',
      },
      {
        title: "Al-Ri'ayah Package",
        subtitle: 'For Women',
        description:
          'Tailored rehabilitation for women with conditions that require sensitive, specialized therapeutic care.',
        meta: 'Includes 10 treatment-based sessions with a special community discount.',
      },
      {
        title: 'Khatwa Package',
        subtitle: 'For Persons with Disabilities',
        description:
          'A flexible rehabilitation framework with a fixed discount, structured according to the initial evaluation and long-term goals.',
        meta: 'Fixed discount on the number of sessions determined by the evaluation.',
      },
      {
        title: 'Al-Amal Package',
        subtitle: 'For Low-Income Individuals',
        description:
          'Designed to remove financial barriers so that those with limited resources can still access essential rehabilitation.',
        meta: 'Discount of up to a defined percentage, subject to social assessment and documentation.',
      },
    ],
    whyTitle: 'Why Choose Our Community Care Programs?',
    reasons: [
      {
        title: 'Human-Centered Approach',
        text: 'Programs are built on dignity, respect, and equitable access to care.',
      },
      {
        title: 'Meaningful Financial Support',
        text: 'Discount structures are designed to make high-quality rehabilitation realistically accessible.',
      },
      {
        title: 'Targeted Packages',
        text: 'Each package addresses the unique needs of a specific community group.',
      },
      {
        title: 'Integrated Follow-Up',
        text: 'Progress is monitored and adjusted to ensure lasting impact for beneficiaries.',
      },
    ],
    additionalTitle: 'Additional Information',
    additionalItems: [
      {
        title: 'Eligibility & Assessment',
        text: 'Eligibility for community care packages is determined through a social and medical assessment to ensure fair and effective allocation of support.',
      },
      {
        title: 'Required Documentation',
        text: 'Beneficiaries may be asked to provide supporting documents related to income, social status, or medical condition as part of the enrollment process.',
      },
      {
        title: 'Program Coordination',
        text: 'Our team coordinates with families, community partners, and relevant institutions to ensure continuity of care for each beneficiary.',
      },
      {
        title: 'Confidential & Respectful',
        text: 'All information is handled with strict confidentiality, and every step of the process is designed to preserve dignity and respect.',
      },
    ],
    ctaTitle: 'Ready to Begin Your Community Care Journey?',
    ctaText:
      'If you or someone you know could benefit from the Ehata Community Care Program, our team is ready to guide you through eligibility, assessment, and enrollment.',
  },
  'home-therapy': {
    heroTitle: 'Home Therapy Packages at Al-Mutahaddi',
    heroDesc: [
      'At AL Motahadi Medical Rehabilitation Center, we believe that home therapy should deliver the same medical quality as in-center care.',
      'Our Home Therapy Packages extend our therapeutic expertise to your home, with carefully structured visits, ongoing supervision, and respect for your privacy and daily life.',
    ],
    label: 'HOME THERAPY',
    mainTitle: 'Our Home Therapy Packages',
    packages: [
      {
        title: 'Home Therapy (5 Sessions)',
        subtitle: 'Short Program',
        description:
          'Suitable for cases requiring limited, focused home visits—such as post-hospital follow-up or mobility training.',
        meta: 'Includes 5 home-based treatment sessions after initial assessment.',
      },
      {
        title: 'Home Therapy (10 Sessions)',
        subtitle: 'Standard Program',
        description:
          'Ideal for patients who need a structured home-based plan over several weeks, with measurable goals.',
        meta: 'Includes 10 home-based treatment sessions with scheduled progress reviews.',
      },
      {
        title: 'Home Therapy (15 Sessions)',
        subtitle: 'Extended Program',
        description:
          'For conditions requiring extended home rehabilitation and closer coordination with caregivers.',
        meta: 'Includes 15 home-based sessions with ongoing adjustment to the treatment plan.',
      },
      {
        title: 'Home Therapy (20 Sessions)',
        subtitle: 'Comprehensive Program',
        description:
          'A complete home-based package for long-term conditions where continuity and consistency are essential.',
        meta: 'Includes 20 home-based sessions as part of a fully planned rehabilitation program.',
      },
      {
        title: 'Customized Home Therapy Plan',
        subtitle: 'Tailored to Your Needs',
        description:
          'For complex cases, a fully customized home therapy plan can be designed based on your evaluation and environment.',
        meta: 'Number of sessions and schedule determined by the medical team.',
      },
    ],
    whyTitle: 'Why Choose Our Home Therapy Packages?',
    reasons: [
      {
        title: 'Same Protocols as the Center',
        text: 'Home sessions follow the same exclusive treatment protocols used inside the center.',
      },
      {
        title: 'Comfort & Privacy',
        text: 'Care is delivered in your own environment, respecting your comfort and daily routine.',
      },
      {
        title: 'Coordinated Care',
        text: 'We coordinate with your medical team and caregivers to ensure continuity.',
      },
      {
        title: 'Flexible Scheduling',
        text: 'Session timing is arranged to fit your personal circumstances as much as possible.',
      },
    ],
    ctaTitle: 'Ready to Begin Your Home Therapy?',
    ctaText:
      'Our team will help you choose the most suitable home therapy package and arrange safe, professional visits to your home.',
  },
  'intensive-home-therapy': {
    heroTitle: 'Intensive Home Therapy Packages at Al-Mutahaddi',
    heroDesc: [
      'For cases that require closer monitoring, faster progress, or complex rehabilitation needs, our Intensive Home Therapy Packages offer structured, high-frequency home visits.',
      'These programs are designed for patients who need intensive support while remaining in their home environment.',
    ],
    label: 'INTENSIVE CARE',
    mainTitle: 'Our Intensive Home Therapy Packages',
    packages: [
      {
        title: 'Intensive Home-Based Functional Program',
        subtitle: 'Daily or High-Frequency Visits',
        description:
          'Focused on restoring essential functional abilities through concentrated, high-frequency home sessions.',
        meta: 'Frequency and duration determined by medical evaluation.',
      },
      {
        title: 'Intensive Home-Based Mobility Program',
        subtitle: 'Mobility & Independence',
        description:
          'Tailored for patients who need intensive gait, balance, and mobility training at home.',
        meta: 'Structured progression plan with clear functional milestones.',
      },
      {
        title: 'Intensive Post-Hospital Home Program',
        subtitle: 'Transition from Hospital to Home',
        description:
          'Supports safe transition from hospital or inpatient care to home, reducing complications and readmissions.',
        meta: 'Close coordination with hospital and treating physicians.',
      },
      {
        title: 'Intensive Neurological Home Program',
        subtitle: 'Neurological Conditions',
        description:
          'Designed for patients with neurological conditions who require intensive, repetitive training in a familiar environment.',
        meta: 'Exercises and interventions adapted to the home setting.',
      },
    ],
    whyTitle: 'Why Choose Our Intensive Home Therapy Packages?',
    reasons: [
      {
        title: 'Higher Treatment Frequency',
        text: 'Intensive schedules support faster functional gains where medically appropriate.',
      },
      {
        title: 'Multidisciplinary Oversight',
        text: 'Programs are supervised by a multidisciplinary team with clear review points.',
      },
      {
        title: 'Structured Protocols',
        text: 'Each intensive package follows a written plan with defined goals and outcome measures.',
      },
      {
        title: 'Family Involvement',
        text: 'Caregivers are guided on how to support and maintain progress between visits.',
      },
    ],
    ctaTitle: 'Start Your Intensive Rehabilitation Journey',
    ctaText:
      'If you or a family member needs an intensive home-based program, our team can design a plan that balances medical needs, safety, and daily life.',
  },
  'comprehensive-home-rehab': {
    heroTitle: 'Comprehensive Home-Based Rehabilitation Program',
    heroDesc: [
      'Our Comprehensive Home-Based Rehabilitation Program is designed for patients who require long-term, fully integrated care at home.',
      'This program combines detailed assessment, structured treatment, monitoring, and coordination with other medical services over an extended period.',
    ],
    label: 'LONG-TERM PROGRAM',
    mainTitle: 'Treatment Approach',
    packages: [
      {
        title: 'Regular Rehabilitation Visits',
        subtitle: 'Planned Home Sessions',
        description:
          'Scheduled home visits following a clear rehabilitation plan with progressive goals and measurable outcomes.',
        meta: 'Frequency adjusted over time according to progress and clinical need.',
      },
      {
        title: 'Intensive Phases',
        subtitle: 'Targeted Boost Periods',
        description:
          'Short, intensive phases built into the overall program to accelerate progress at key stages.',
        meta: 'Designed and approved by the multidisciplinary team.',
      },
    ],
    additionalTitle: 'Program Details',
    additionalItems: [
      {
        title: 'Three-Month Framework',
        text: 'The program is typically structured over three months, with room to adjust based on clinical progress and goals.',
      },
      {
        title: 'Integrated Home-Based Care',
        text: 'Home visits are combined with monitoring, education, and coordination with other healthcare providers.',
      },
      {
        title: 'Flexible Intensity Phases',
        text: 'The plan alternates between regular and intensive phases to match your condition and response to treatment.',
      },
      {
        title: 'Family & Caregiver Involvement',
        text: 'We actively involve family members or caregivers to support daily implementation of the rehabilitation plan.',
      },
    ],
    whyTitle: 'Goals of the Program',
    reasons: [
      {
        title: 'Maintain Function & Independence',
        text: 'Protect current abilities and support gradual improvements in mobility, strength, and daily activities.',
      },
      {
        title: 'Reduce Complications',
        text: 'Lower the risk of hospital readmission, complications, and preventable deterioration.',
      },
      {
        title: 'Support Families & Caregivers',
        text: 'Provide guidance, education, and ongoing support to those caring for the patient.',
      },
      {
        title: 'Align Care With Long-Term Vision',
        text: 'Ensure that rehabilitation, medical care, and family expectations move in the same direction.',
      },
    ],
    secondaryWhyTitle: 'Why Choose Our Comprehensive Rehabilitation Program?',
    secondaryReasons: [
      {
        title: 'Coordinated, Long-Term Plan',
        text: 'One integrated program replaces fragmented care, giving you a clear roadmap for recovery at home.',
      },
      {
        title: 'Evidence-Based Protocols',
        text: 'Every stage of the program follows research-backed protocols developed through our international network.',
      },
      {
        title: 'Personalized Around Your Life',
        text: 'The plan is tailored to your health status, home environment, and family circumstances.',
      },
      {
        title: 'Ongoing Review & Adjustment',
        text: 'Regular reviews ensure that the program stays aligned with your progress and long-term goals.',
      },
    ],
    ctaTitle: 'Start Your Comprehensive Rehabilitation Journey Today',
    ctaText:
      'Our comprehensive home-based program is ideal for patients who need coordinated, long-term rehabilitation under one structured plan. Contact us to discuss whether this program is right for you.',
  },
};

export default function PackageDetail() {
  const { type } = useParams<{ type: DetailType }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!type || !(type in DETAIL_CONFIG)) {
      navigate('/packages', { replace: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [type, navigate]);

  if (!type || !(type in DETAIL_CONFIG)) {
    return null;
  }

  const config = DETAIL_CONFIG[type];

  return (
    <div className="page-wrapper">
      <Header />
      <main className={`pkg-detail-page pkg-detail-page--${type}`}>
        <section className="pkg-detail-hero">
          <div className="page-hero-bg" aria-hidden="true" />
          <div className="pkg-detail-hero-inner">
            <span className="pkg-detail-hero-label">{config.label}</span>
            <h1 className="pkg-detail-hero-title">{config.heroTitle}</h1>
            {config.heroDesc.map((p, idx) => (
              <p key={idx} className="pkg-detail-hero-desc">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="pkg-detail-section pkg-detail-section-white">
          <div className="pkg-detail-container">
            <p className="pkg-detail-section-label">{config.label}</p>
            <h2 className="pkg-detail-section-title">{config.mainTitle}</h2>
            <div className="pkg-detail-packages-grid">
              {config.packages.map((pkg) => (
                <article key={pkg.title} className="pkg-detail-card">
                  <h3 className="pkg-detail-card-title">{pkg.title}</h3>
                  <p className="pkg-detail-card-subtitle">{pkg.subtitle}</p>
                  <p className="pkg-detail-card-text">{pkg.description}</p>
                  {(pkg.meta || pkg.price) && (
                    <div className="pkg-detail-card-panel">
                      {pkg.meta && <p className="pkg-detail-card-meta">{pkg.meta}</p>}
                      {pkg.price && <p className="pkg-detail-card-price">{pkg.price}</p>}
                    </div>
                  )}
                  <Link to={BOOK_APPOINTMENT_PATH} className="btn btn-primary">
                    {t('packages.bookAppointment')}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {config.additionalTitle && config.additionalItems && (
          <section className="pkg-detail-section pkg-detail-section-white">
            <div className="pkg-detail-container">
              <h2 className="pkg-detail-section-title pkg-detail-additional-title">
                {config.additionalTitle}
              </h2>
              <div className="pkg-detail-additional-grid">
                {config.additionalItems.map((item) => (
                  <div key={item.title} className="pkg-detail-additional-card">
                    <h3 className="pkg-detail-additional-card-title">{item.title}</h3>
                    <p className="pkg-detail-additional-card-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="pkg-detail-section pkg-detail-section-gray">
          <div className="pkg-detail-container">
            <h2 className="pkg-detail-section-title">{config.whyTitle}</h2>
            <div className="pkg-detail-reasons-grid">
              {config.reasons.map((reason) => (
                <div key={reason.title} className="pkg-detail-reason-card">
                  <h3 className="pkg-detail-reason-title">{reason.title}</h3>
                  <p className="pkg-detail-reason-text">{reason.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {config.secondaryWhyTitle && config.secondaryReasons && (
          <section className="pkg-detail-section pkg-detail-section-gray">
            <div className="pkg-detail-container">
              <h2 className="pkg-detail-section-title">{config.secondaryWhyTitle}</h2>
              <div className="pkg-detail-reasons-grid">
                {config.secondaryReasons.map((reason) => (
                  <div key={reason.title} className="pkg-detail-reason-card">
                    <h3 className="pkg-detail-reason-title">{reason.title}</h3>
                    <p className="pkg-detail-reason-text">{reason.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="pkg-detail-section pkg-detail-section-white">
          <div className="pkg-detail-container">
            <div className="pkg-detail-cta">
              <div className="pkg-detail-cta-content">
                <h2 className="pkg-detail-cta-title">{config.ctaTitle}</h2>
                <p className="pkg-detail-cta-text">{config.ctaText}</p>
              </div>
              <div className="pkg-detail-cta-actions">
                <Link to={BOOK_APPOINTMENT_PATH} className="btn btn-primary">
                  {t('packages.bookAppointment')}
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-whatsapp"
                  aria-label={t('cta.whatsapp')}
                >
                  {t('cta.whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

