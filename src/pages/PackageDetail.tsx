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
  subtitle?: string;
  /** Shown in teal, e.g. "5 Sessions" */
  sessions?: string;
  description: string;
  meta?: string;
  price?: string;
  /** When set with totalPrice, shows two-row pricing: Session Price (dark) + Total Price (teal) */
  sessionPrice?: string;
  totalPrice?: string;
  /** Paragraph below the pricing box, above the button */
  secondaryDescription?: string;
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
      'At Al-Mutahaddi Medical Rehabilitation Center, we offer a range of Individual Treatment Packages designed to provide personalized care and rehabilitation to suit each patient\'s unique needs.',
      'These packages are specifically crafted for individuals who require consistent in-center treatment under the direct supervision of our skilled medical team. The treatments are designed to ensure gradual progress with constant monitoring based on your response to therapy, building long-term health and well-being with focused, step-by-step care.',
    ],
    label: 'INDIVIDUAL PROGRAMS',
    mainTitle: 'Our Individual Packages',
    packages: [
      {
        title: 'Tawakkalna',
        subtitle: 'Starter Package',
        sessions: '5 Sessions',
        description:
          'For individuals looking for short-term rehabilitation or specialized treatment, the Tawakkalna Package offers 5 focused sessions with ongoing progress monitoring.',
        meta: 'Session Price: OMR 20,700',
        sessionPrice: '20,700',
        totalPrice: '103,500',
        secondaryDescription:
          'The Tawakkalna Package is designed for patients needing specific care with a limited number of sessions. It is perfect for patients who want a targeted, concise treatment plan.',
      },
      {
        title: 'Wathiq',
        subtitle: 'Progressive Package',
        sessions: '10 Sessions',
        description:
          'The Wathiq Package offers 10 sessions, ideal for individuals looking for a comprehensive approach to rehabilitation with one additional session for added value.',
        meta: 'Session Price: OMR 19,550',
        sessionPrice: '19,550',
        totalPrice: '195,500',
        secondaryDescription:
          'This package allows for continued progress with a focus on achieving significant improvement over a series of sessions, ensuring comprehensive care and guidance from our team.',
      },
      {
        title: 'Taslim',
        subtitle: 'Focused Care',
        sessions: '15 Sessions',
        description:
          'The Taslim Package is a mid-range plan offering 15 sessions to patients who require more consistent treatment for optimal recovery.',
        meta: 'Session Price: OMR 18,400',
        sessionPrice: '18,400',
        totalPrice: '276,000',
        secondaryDescription:
          'This plan provides additional flexibility and treatment duration, ideal for patients seeking long-term benefits and thorough recovery through detailed rehabilitation strategies.',
      },
      {
        title: 'Hant',
        subtitle: 'Extended Program',
        sessions: '20 Sessions',
        description:
          'The Hant Package is designed for those requiring more intensive rehabilitation, offering 20 sessions with extra value to ensure consistent progress over a longer treatment period.',
        meta: 'Session Price: OMR 17,250',
        sessionPrice: '17,250',
        totalPrice: '345,000',
        secondaryDescription:
          'This package is suited for patients who need continuous monitoring and personalized care for recovery from more complex or long-standing conditions. The added free sessions help ensure extended progress and optimal treatment results.',
      },
      {
        title: 'Al-Mutahaddi',
        subtitle: 'Comprehensive Program',
        sessions: '30 Sessions',
        description:
          'The Al-Mutahaddi Package is our most comprehensive and extended treatment plan, offering 30 sessions designed for patients requiring intensive and continuous rehabilitation support.',
        meta: 'Session Price: OMR 16,100',
        sessionPrice: '16,100',
        totalPrice: '483,000',
        secondaryDescription:
          'This package is tailored for patients who require significant and ongoing rehabilitation, with the added benefit of extra free sessions to further enhance recovery. With 30 sessions, this plan ensures thorough and complete treatment for long-term health improvement.',
      },
    ],
    whyTitle: 'Why Choose Our Individual Packages?',
    reasons: [
      {
        title: 'Personalized Care',
        text: 'Each package is designed based on the individual needs of the patient, with continuous monitoring to ensure progress.',
      },
      {
        title: 'Direct Supervision',
        text: 'All treatments are carried out under the direct supervision of our skilled medical team, ensuring high-quality care.',
      },
      {
        title: 'Comprehensive Programs',
        text: 'Our packages are structured to offer gradual improvement, with added free sessions in higher packages to enhance recovery.',
      },
      {
        title: 'Flexible & Scalable',
        text: "Whether you're seeking short-term relief or long-term rehabilitation, we offer packages that scale based on your needs.",
      },
    ],
    ctaTitle: 'Ready to Start Your Rehabilitation Journey?',
    ctaText:
      'Choose the package that best suits your needs and start your path to recovery with Al-Mutahaddi Medical Rehabilitation Center. Our team of professionals is here to provide you with personalized, expert care every step of the way.',
  },
  corporate: {
    heroTitle: 'Corporate Rehabilitation Packages at Al-Mutahaddi',
    heroDesc: [
      'At Al-Mutahaddi Medical Rehabilitation Center, we offer specialized Corporate Packages designed to help organizations support the health and well-being of their employees.',
      'Our tailored rehabilitation and occupational therapy programs are crafted to reduce sick leave, improve physical fitness, and ensure sustainable professional performance within a structured contractual framework.',
    ],
    label: 'CORPORATE SERVICES',
    mainTitle: 'Our Corporate Packages',
    packages: [
      {
        title: 'Tawakkalna Corporate',
        sessions: '5 Sessions',
        description:
          'The Tawakkalna Corporate Package is ideal for organizations seeking a short-term rehabilitation plan for their employees, with focused treatment over 5 sessions.',
        meta: 'Session Price: OMR 19,550',
        sessionPrice: '19,550',
        totalPrice: '97,750',
        secondaryDescription:
          'This plan offers an efficient approach for addressing specific health concerns or recovery needs.',
      },
      {
        title: 'Wathiq Corporate',
        sessions: '10 Sessions',
        description:
          'The Wathiq Corporate Package offers 10 sessions, perfect for companies looking to provide a more comprehensive rehabilitation plan for their employees, with the added benefit of one free session.',
        meta: 'Session Price: OMR 18,400',
        sessionPrice: '18,400',
        totalPrice: '184,000',
        secondaryDescription:
          'This plan is ideal for long-term health improvements, promoting both physical fitness and recovery while improving employee well-being and productivity.',
      },
      {
        title: 'Tasallam Corporate',
        sessions: '15 Sessions',
        description:
          'For companies seeking a more extensive rehabilitation program, the Taslim Corporate Package offers 15 sessions, allowing for a more thorough treatment plan.',
        meta: 'Session Price: OMR 17,250',
        sessionPrice: '17,250',
        totalPrice: '258,750',
        secondaryDescription:
          'This package supports employees in achieving better physical health, reducing workplace injuries, and maintaining productivity throughout their working hours.',
      },
      {
        title: 'Hanit Corporate',
        sessions: '20 Sessions',
        description:
          'The Hant Corporate Package is ideal for companies with a higher volume of employees who require long-term rehabilitation and occupational therapy.',
        meta: 'Session Price: OMR 16,100',
        sessionPrice: '16,100',
        totalPrice: '322,000',
        secondaryDescription:
          'With 20 sessions and two free sessions added for further value, this package promotes wellness, reduces employee absenteeism, and supports sustained professional performance.',
      },
      {
        title: 'Al-Motahadi Corporate',
        sessions: '30 Sessions',
        description:
          'The Al-Mutahaddi Corporate Package is our most comprehensive offering, providing 30 sessions for businesses looking to offer extensive rehabilitation services to their employees.',
        meta: 'Session Price: OMR 14,950',
        sessionPrice: '14,950',
        totalPrice: '448,500',
        secondaryDescription:
          'This package is designed for organizations committed to long-term employee health and performance, supporting workforce sustainability by reducing work-related injuries and sick leave.',
      },
    ],
    whyTitle: 'Why Choose Our Corporate Packages?',
    reasons: [
      {
        title: 'Employee Health & Wellness',
        text: "Improve your employees' physical fitness and overall well-being, promoting a healthy, productive work environment.",
      },
      {
        title: 'Reduced Sick Leave',
        text: 'With regular therapy and rehabilitation, employees are less likely to experience work-related injuries or health issues that lead to absenteeism.',
      },
      {
        title: 'Sustained Performance',
        text: 'Our tailored packages ensure that employees remain fit, active, and capable of delivering their best performance at work.',
      },
      {
        title: 'Personalized Care',
        text: "Each session is delivered under the direct supervision of our skilled rehabilitation team, ensuring each employee's progress is monitored and managed.",
      },
    ],
    ctaTitle: "Invest in Your Workforce's Health Today",
    ctaText:
      'By investing in your employees\' rehabilitation and wellness, you are investing in the success and productivity of your business. Our Corporate Packages provide a structured, long-term approach to employee care, ensuring sustained performance and a healthier workforce.',
  },
  'community-care': {
    heroTitle: 'Community Care Program Packages at Al-Mutahaddi',
    heroDesc: [
      'At Al-Mutahaddi Medical Rehabilitation Center, we are deeply committed to providing inclusive and accessible rehabilitation services for specific groups within the community.',
      'Our Community Care Program Packages are designed to support individuals from various walks of life, ensuring they receive the care they need based on their health, social, and financial considerations, while fully maintaining the quality of care and professional standards adopted at the center.',
    ],
    label: 'COMMUNITY CARE',
    mainTitle: 'Our Community Care Program Packages',
    packages: [
      {
        title: 'Al-Ihsan – For Seniors',
        sessions: '15 Sessions',
        description:
          'The Al-Ihsan Program is specifically designed for seniors, offering a comprehensive rehabilitation plan that focuses on improving mobility, balance, and daily independence.',
        meta: 'Session Price: OMR 17,250',
        sessionPrice: '17,250',
        totalPrice: '258,750',
        secondaryDescription:
          'This program is dedicated to supporting elderly individuals in maintaining a high quality of life through specialized rehabilitation strategies and continuous care.',
      },
      {
        title: 'Al-Raya – Specialized Women\'s Rehabilitation Program',
        sessions: '10 Sessions',
        description:
          'The Al-Raya Program offers a targeted rehabilitation plan for women, focusing on prenatal and postnatal recovery, pelvic floor disorders, and pelvic and lower back pain associated with hormonal changes.',
        meta: 'Session Price: OMR 16,100',
        sessionPrice: '16,100',
        totalPrice: '161,000',
        secondaryDescription:
          'This program is dedicated to providing specialized care for women, promoting physical wellness during and after pregnancy, as well as supporting the treatment of pelvic conditions.',
      },
      {
        title: 'Khatwa – For People with Disabilities',
        sessions: 'As per evaluation',
        description:
          'The Khatwa Program offers specialized rehabilitation services for people with disabilities, ensuring they continue to receive high-quality therapy without the financial burden of pre-defined packages.',
        meta: 'Original Session Price: OMR 23 | Discounted Session Price (40% off): OMR 13,800',
        secondaryDescription:
          'This program is focused on offering continuous rehabilitation at an affordable cost, ensuring that individuals with disabilities receive the care and attention they need to enhance their quality of life.',
      },
      {
        title: 'Hope – For Those with Limited Income',
        sessions: 'As per assessment',
        description:
          'The Hope Program is designed for individuals facing difficult financial circumstances. By providing up to 70% off the regular price after a social assessment and case study, this program ensures that financial barriers do not prevent individuals from receiving the rehabilitation care they need.',
        sessionPrice: '—',
        totalPrice: 'Subject to assessment',
        secondaryDescription:
          'Discount of up to 70% is provided based on social assessment and supporting documents, ensuring support reaches those who need it most.',
      },
    ],
    whyTitle: 'Why Choose Our Community Care Programs?',
    reasons: [
      {
        title: 'Inclusive Rehabilitation',
        text: 'Designed for those who need specialized care based on their health or financial situation.',
      },
      {
        title: 'Affordable & Flexible',
        text: 'We offer reduced prices and tailored packages to ensure that rehabilitation is accessible for everyone.',
      },
      {
        title: 'Professional Standards',
        text: 'Despite the focus on community support, all programs maintain the highest standards of rehabilitation care provided by our experienced medical team.',
      },
      {
        title: 'Social Responsibility',
        text: 'Our programs are committed to supporting vulnerable groups in the community, helping them improve their physical health, quality of life, and well-being.',
      },
    ],
    additionalTitle: 'Additional Information',
    additionalItems: [
      {
        title: 'VAT',
        text: 'All prices mentioned above exclude VAT. A 5% VAT will be added to the final price of each package.',
      },
      {
        title: 'Tailored Care',
        text: 'Each package is designed to ensure that every individual receives the care and attention they need, with flexibility to cater to personal health circumstances.',
      },
      {
        title: 'Ongoing Support',
        text: 'Our team will provide continuous monitoring and support to ensure progress, regardless of financial, physical, or social challenges.',
      },
      {
        title: 'Program Commitment',
        text: 'We view social responsibility as an integral part of our identity and continuously develop these programs to serve the community better.',
      },
    ],
    ctaTitle: 'Ready to Begin Your Community Care Journey?',
    ctaText:
      'At Al-Mutahaddi, we are here to ensure that every individual, regardless of their circumstances, has access to the rehabilitation care they need. Contact us today to learn more about our community-focused programs or to schedule a consultation.',
  },
  'home-therapy': {
    heroTitle: 'Home Therapy Packages at Al-Mutahaddi',
    heroDesc: [
      'At Al-Mutahaddi Medical Rehabilitation Center, we understand that some patients may find it difficult to attend in-center sessions regularly due to mobility issues, distance, or other reasons.',
      'That’s why we offer our Home Therapy Packages - a convenient and flexible solution for patients who need professional rehabilitation services at home, with the same high-quality treatment as in our center.',
    ],
    label: 'HOME THERAPY',
    mainTitle: 'Our Home Therapy Packages',
    packages: [
      {
        title: 'Home Therapy (5 Sessions)',
        sessions: '5 Sessions',
        description:
          'For individuals looking for a short-term treatment solution, the Home Therapy (5 Sessions) package provides focused care over 5 in-home sessions.',
        meta: 'Session Price: OMR 30,700',
        sessionPrice: '30,700',
        totalPrice: '153,500',
        secondaryDescription:
          'This package is ideal for patients who need specific rehabilitation or support over a short period of time and prefer the convenience of home therapy.',
      },
      {
        title: 'Home Therapy (10 Sessions)',
        sessions: '10 Sessions',
        description:
          'The Home Therapy (10 Sessions) package offers a more comprehensive in-home rehabilitation program with 10 sessions to ensure significant progress and recovery.',
        meta: 'Session Price: OMR 28,550',
        sessionPrice: '28,550',
        totalPrice: '285,500',
        secondaryDescription:
          'This package allows for a longer treatment duration, making it suitable for patients who require more consistent care to improve their recovery process.',
      },
      {
        title: 'Home Therapy (15 Sessions)',
        sessions: '15 Sessions',
        description:
          'For those requiring more intensive home rehabilitation, the Home Therapy (15 Sessions) package provides 15 sessions of personalized treatment.',
        meta: 'Session Price: OMR 26,400',
        sessionPrice: '26,400',
        totalPrice: '396,000',
        secondaryDescription:
          'This option is perfect for individuals needing ongoing support for more complex recovery, with continued monitoring and personalized care.',
      },
      {
        title: 'Home Therapy (20 Sessions)',
        sessions: '20 Sessions',
        description:
          'The Home Therapy (20 Sessions) package offers 20 sessions, providing thorough rehabilitation care over an extended period with consistent progress tracking.',
        meta: 'Session Price: OMR 24,250',
        sessionPrice: '24,250',
        totalPrice: '485,000',
        secondaryDescription:
          'Ideal for individuals who require long-term care, this plan ensures continuous rehabilitation and recovery support at home.',
      },
      {
        title: 'Home Therapy (30 Sessions)',
        sessions: '30 Sessions',
        description:
          'The Home Therapy (30 Sessions) package is the most comprehensive in-home therapy option, offering 30 sessions to support long-term rehabilitation.',
        meta: 'Session Price: OMR 22,100',
        sessionPrice: '22,100',
        totalPrice: '663,000',
        secondaryDescription:
          'With this extended program, patients receive intensive, ongoing therapy to address complex health needs, with the benefit of regular therapy in the comfort of their home.',
      },
    ],
    whyTitle: 'Why Choose Our Home Therapy Packages?',
    reasons: [
      {
        title: 'Convenience',
        text: 'Get professional rehabilitation treatment without the need to leave your home, ideal for individuals with mobility issues or busy schedules.',
      },
      {
        title: 'Personalized Care',
        text: 'Each package is tailored to your unique rehabilitation needs, with one-on-one sessions from our trained therapists.',
      },
      {
        title: 'Professional Equipment',
        text: 'We bring portable, high-quality therapeutic equipment to your home, ensuring you receive the best possible care.',
      },
      {
        title: 'Ongoing Monitoring',
        text: 'Our team tracks your progress closely and adapts your therapy plan based on your individual response to treatment.',
      },
    ],
    ctaTitle: 'Ready to Begin Your Home Therapy?',
    ctaText:
      'At Al-Mutahaddi, we are committed to helping you recover and regain your independence. Choose the package that best suits your needs and let our expert team guide you through every step of your rehabilitation journey.',
  },
  'intensive-home-therapy': {
    heroTitle: 'Intensive Home Therapy Packages at Al-Mutahaddi',
    heroDesc: [
      'At Al-Mutahaddi Medical Rehabilitation Center, we understand that certain conditions, such as severe injuries, post-surgical recovery, or neurological disorders, require more focused and extended rehabilitation.',
      'Our Intensive Home Therapy Packages are designed to provide a higher level of therapeutic care, delivered in the comfort of your home, with longer and more intense therapy sessions tailored to advanced recovery needs.',
    ],
    label: 'INTENSIVE CARE',
    mainTitle: 'Our Intensive Home Therapy Packages',
    packages: [
      {
        title: 'Intensive Home-Based Tawakkalna Program',
        sessions: '5 Sessions',
        description:
          'The Tawakkalna Program is a short-term but intensive treatment option for advanced cases that require concentrated rehabilitation. With 5 sessions of focused therapy, this program is ideal for those who need immediate intervention for recovery.',
        sessionPrice: '51,400',
        totalPrice: '257,000',
        secondaryDescription:
          'This package is designed to offer rapid recovery for individuals with serious conditions, ensuring intensive therapeutic care in a short timeframe.',
      },
      {
        title: 'Intensive Home-Based Wathiq Program',
        sessions: '10 Sessions',
        description:
          'For individuals who require a more comprehensive and extended rehabilitation program, the Wathiq Program offers 10 intensive home therapy sessions aimed at improving functionality and speeding up recovery.',
        sessionPrice: '48,100',
        totalPrice: '481,000',
        secondaryDescription:
          'This package is ideal for patients needing consistent and focused rehabilitation care over a longer period to ensure a gradual but steady recovery.',
      },
      {
        title: 'Intensive Home-Based Taslim Program',
        sessions: '15 Sessions',
        description:
          'The Taslim Program is a robust treatment option for those requiring ongoing, intensive therapy. With 15 sessions, this package ensures continuous care and long-term improvement, suitable for post-operative recovery, severe injuries, and neurological rehabilitation.',
        sessionPrice: '44,800',
        totalPrice: '672,000',
        secondaryDescription:
          'This program is designed for individuals who need significant, ongoing support to regain mobility and independence after severe conditions or surgeries.',
      },
      {
        title: 'Intensive Home-Based Hunt Program',
        sessions: '20 Sessions',
        description:
          'The Hunt Program offers 20 sessions, providing a thorough rehabilitation plan for individuals requiring extended care and monitoring. This program is ideal for patients recovering from extensive surgeries or severe neurological conditions.',
        sessionPrice: '41,500',
        totalPrice: '830,000',
        secondaryDescription:
          'This package is designed to provide intensive therapy and focused rehabilitation with regular monitoring for significant recovery and functional restoration.',
      },
      {
        title: 'Intensive Home-Based Challenger Program',
        sessions: '30 Sessions',
        description:
          'Our most comprehensive program, the Challenger Program, offers 30 intensive home therapy sessions for individuals needing long-term, consistent rehabilitation.',
        sessionPrice: '38,200',
        totalPrice: '1,146,000',
        secondaryDescription:
          'This extended package ensures thorough, high-quality care over a longer period, helping individuals regain full mobility, strength, and quality of life after advanced medical conditions or surgeries.',
      },
    ],
    whyTitle: 'Why Choose Our Intensive Home Therapy Packages?',
    reasons: [
      {
        title: 'Advanced Rehabilitation',
        text: 'Designed for patients with severe conditions, offering a higher level of care and therapy intensity.',
      },
      {
        title: 'In-Home Convenience',
        text: 'Receive professional rehabilitation treatment in the comfort of your own home, ideal for those with mobility issues or limited access to in-center care.',
      },
      {
        title: 'Comprehensive Care',
        text: 'Our programs ensure long-term rehabilitation with personalized therapy plans, utilizing advanced techniques for faster recovery.',
      },
      {
        title: 'Ongoing Monitoring',
        text: 'Each patient’s progress is regularly monitored by our skilled therapists, ensuring the treatment plan adapts based on individual recovery.',
      },
    ],
    ctaTitle: 'Start Your Intensive Rehabilitation Journey',
    ctaText:
      'Our Intensive Home Therapy Packages are designed to offer the highest level of care for individuals who require specialized treatment. Contact us today to discuss which package is best suited for your needs or to schedule a consultation with our rehabilitation team.',
  },
  'comprehensive-home-rehab': {
    heroTitle: 'Comprehensive Home-Based Rehabilitation Program for Three Months',
    heroDesc: [
      'Thank you for contacting and trusting Al-Mutahaddi Medical Rehabilitation Center. Our comprehensive home-based rehabilitation program is designed to provide you with consistent care and the highest standard of treatment, all from the comfort of your own home.',
      'Given the nature of conditions such as Parkinson\'s disease with significant motor impairment, we provide structured rehabilitation options over three months to improve mobility, manage symptoms, and enhance quality of life.',
    ],
    label: 'LONG-TERM PROGRAM',
    mainTitle: 'Treatment Approach',
    packages: [
      {
        title: 'Option 1: Regular Regulatory System',
        sessions: 'Approx. 20 sessions per month',
        description:
          'The Regular Regulatory System is ideal for individuals who require consistent, moderate rehabilitation, with ample rest days to prevent physical and mental exhaustion. This system provides a balanced approach that ensures steady progress and adequate recovery time.',
        meta: 'Pattern: Two consecutive treatment days followed by one rest day. One 90-minute session per treatment day.',
        secondaryDescription:
          'Focus areas include improving balance and coordination, gait training, reducing muscle stiffness, and enhancing movement speed and functional capacity. Monthly cost: 1,150 OMR (Total for three months: 3,450 OMR).',
      },
      {
        title: 'Option 2: Intensive System',
        sessions: 'Approx. 40 therapy units per month',
        description:
          'The Intensive System is recommended for individuals who need more frequent, intense therapy, especially in the early stages of rehabilitation. This option includes both morning and evening sessions to accelerate neurological stimulation and motor response.',
        meta: 'Pattern: Two consecutive treatment days followed by one rest day. One 90-minute morning session and one 60-minute evening session per treatment day.',
        secondaryDescription:
          'Focus areas include higher neurological stimulation through repeated motor training, accelerating response to therapy, and improving functional performance. Monthly cost: 1,450 OMR (Total for three months: 4,350 OMR).',
      },
    ],
    additionalTitle: 'Program Details',
    additionalItems: [
      {
        title: 'Duration & Structure',
        text: 'The program runs for three months with a dedicated specialist assigned to each case. Home-based rehabilitation sessions are delivered using portable therapeutic equipment.',
      },
      {
        title: 'Comprehensive Evaluation',
        text: 'A clinical evaluation is performed at the start of the program to assess intensity level, tolerance, and motor response, helping us tailor the treatment regimen to your needs.',
      },
      {
        title: 'Financial Terms',
        text: 'A deposit of 1,500 OMR is required upon acceptance of the program. This amount is credited toward the total program cost, with the remaining balance distributed in monthly installments.',
      },
      {
        title: 'Flexible Transition',
        text: 'In advanced cases, starting with the Intensive System may be preferred for the initial period, with the option to transition to the Regular Regulatory System based on your progress and tolerance.',
      },
    ],
    whyTitle: 'Goals of the Program',
    reasons: [
      {
        title: 'Improve Mobility',
        text: 'Through consistent and targeted therapy, we aim to enhance your movement and reduce stiffness.',
      },
      {
        title: 'Reduce Disease Progression',
        text: 'By following a structured rehabilitation plan, we work to minimize the progression of neurological conditions and improve overall functional independence.',
      },
      {
        title: 'Promote Functional Independence',
        text: 'We focus on increasing your ability to perform daily activities and restoring as much independence as possible during this phase of your rehabilitation.',
      },
      {
        title: 'Support Families & Caregivers',
        text: 'We guide family members and caregivers so they can support the rehabilitation process safely and effectively.',
      },
    ],
    secondaryWhyTitle: 'Why Choose Our Comprehensive Rehabilitation Program?',
    secondaryReasons: [
      {
        title: 'Personalized Care',
        text: 'Tailored rehabilitation sessions are designed specifically around your health status, home environment, and goals.',
      },
      {
        title: 'Home-Based Convenience',
        text: 'Receive high-quality therapy from the comfort of your home, making it easier to adhere to the program.',
      },
      {
        title: 'Expert Team',
        text: 'Dedicated, experienced therapists specializing in neurological and complex rehabilitation guide you every step of the way.',
      },
      {
        title: 'Continuous Monitoring',
        text: 'Regular assessments and progress checks ensure that your treatment plan adapts as needed for optimal results.',
      },
    ],
    ctaTitle: 'Start Your Comprehensive Rehabilitation Journey Today',
    ctaText:
      'We are committed to helping you improve your mobility and overall quality of life. To learn more about our Comprehensive Home-Based Rehabilitation Program or to start your rehabilitation plan, contact us today.',
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
                  {(pkg.sessions ?? pkg.subtitle) && (
                    <p className="pkg-detail-card-sessions">{pkg.sessions ?? pkg.subtitle}</p>
                  )}
                  <p className="pkg-detail-card-text">{pkg.description}</p>
                  {(pkg.sessionPrice != null && pkg.totalPrice != null) ? (
                    <div className="pkg-detail-card-panel">
                      <div className="pkg-detail-card-panel-row">
                        <span className="pkg-detail-card-panel-label">{t('packages.sessionPriceLabel')}</span>
                        <span className="pkg-detail-card-panel-value pkg-detail-card-panel-value--dark">
                          {pkg.sessionPrice} {t('packages.currency')}
                        </span>
                      </div>
                      <div className="pkg-detail-card-panel-row pkg-detail-card-panel-row--total">
                        <span className="pkg-detail-card-panel-label">{t('packages.totalPriceLabel')}</span>
                        <span className="pkg-detail-card-panel-value">{pkg.totalPrice} {t('packages.currency')}</span>
                      </div>
                    </div>
                  ) : (pkg.meta || pkg.price) ? (
                    <div className="pkg-detail-card-panel">
                      {pkg.meta && (
                        <div className="pkg-detail-card-panel-row">
                          <span className="pkg-detail-card-panel-label">{pkg.meta}</span>
                        </div>
                      )}
                      {pkg.price && (
                        <div className="pkg-detail-card-panel-row pkg-detail-card-panel-row--total">
                          <span className="pkg-detail-card-panel-label">{t('packages.totalPriceLabel')}</span>
                          <span className="pkg-detail-card-panel-value">{pkg.price}</span>
                        </div>
                      )}
                    </div>
                  ) : null}
                  {pkg.secondaryDescription && (
                    <p className="pkg-detail-card-text pkg-detail-card-text--secondary">{pkg.secondaryDescription}</p>
                  )}
                  <Link to={BOOK_APPOINTMENT_PATH} className="pkg-detail-card-btn btn btn-primary">
                    {t('packages.bookNow')}
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

