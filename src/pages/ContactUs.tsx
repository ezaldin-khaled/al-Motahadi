import { useEffect, useRef, useState, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const heroRef = useRef<HTMLElement>(null);
  const bookingRef = useRef<HTMLElement>(null);
  const calculatorRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [activeCalculator, setActiveCalculator] = useState<'bmi' | 'bmr'>('bmi');

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

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you! Your appointment request has been submitted.');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/YOUR_PHONE_NUMBER', '_blank');
  };

  const calculateBMI = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const weight = parseFloat(bmiWeight);
    const height = parseFloat(bmiHeight) / 100; // convert cm to m
    
    if (weight && height) {
      const bmi = weight / (height * height);
      setBmiResult(parseFloat(bmi.toFixed(1)));
    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        {/* Hero Section */}
        <section className="contact-hero" ref={heroRef}>
          <div className="contact-hero-content">
            <p className="contact-hero-label">GET STARTED</p>
            <h1 className="contact-hero-title">Book Your Appointment Now</h1>
            <p className="contact-hero-desc">
              Start your treatment journey with us through the online booking form or contact us directly via WhatsApp.
            </p>
          </div>
        </section>

        {/* Booking Section */}
        <section className="booking-section" ref={bookingRef}>
          <div className="booking-container">
            {/* Book Us Form */}
            <div className="booking-card booking-form-card">
              <div className="booking-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h2 className="booking-card-title">Book Us Form</h2>
              <p className="booking-card-desc">Fill out the form below and we'll get back to you shortly</p>
              
              <form className="booking-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    className="form-input-contact"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="form-input-contact"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="form-input-contact"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message (Optional)</label>
                  <textarea 
                    placeholder="Tell us about any conditions or any special requirements" 
                    className="form-textarea-contact"
                    rows={4}
                  />
                </div>

                <button type="submit" className="btn-submit">Submit</button>
              </form>
            </div>

            {/* Book Us WhatsApp */}
            <div className="booking-card booking-whatsapp-card">
              <div className="booking-card-icon whatsapp-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h2 className="booking-card-title">Book Us WhatsApp</h2>
              <p className="booking-card-desc">
                Prefer a quick chat? Reach us directly on WhatsApp for quick responses and easy appointment scheduling.
              </p>

              <div className="whatsapp-info">
                <p className="whatsapp-text">
                  Connect with our team directly through WhatsApp for instant communication and easy appointment reminders.
                </p>
              </div>

              <button 
                type="button" 
                className="btn-whatsapp"
                onClick={handleWhatsAppClick}
              >
                Book on WhatsApp →
              </button>
            </div>
          </div>
        </section>

        {/* Health Calculator Section */}
        <section className="calculator-section" ref={calculatorRef}>
          <div className="calculator-container">
            <p className="section-label">HEALTH TOOLS</p>
            <h2 className="section-title">Calculate Your Health</h2>

            <div className="calculator-tabs">
              <button 
                className={`calculator-tab ${activeCalculator === 'bmi' ? 'active' : ''}`}
                onClick={() => setActiveCalculator('bmi')}
              >
                BMI Calculator
              </button>
              <button 
                className={`calculator-tab ${activeCalculator === 'bmr' ? 'active' : ''}`}
                onClick={() => setActiveCalculator('bmr')}
              >
                BMR Calculator
              </button>
            </div>

            {activeCalculator === 'bmi' && (
              <form className="calculator-form" onSubmit={calculateBMI}>
                <div className="calculator-inputs">
                  <div className="form-group">
                    <label className="form-label">Weight (kg)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 70" 
                      className="form-input-contact"
                      value={bmiWeight}
                      onChange={(e) => setBmiWeight(e.target.value)}
                      step="0.1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Height (cm)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 170" 
                      className="form-input-contact"
                      value={bmiHeight}
                      onChange={(e) => setBmiHeight(e.target.value)}
                      step="0.1"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-calculate">Calculate BMI</button>

                {bmiResult && (
                  <div className="calculator-result">
                    <p className="result-label">Your BMI</p>
                    <p className="result-value">{bmiResult}</p>
                    <p className="result-category">
                      {bmiResult < 18.5 ? 'Underweight' : 
                       bmiResult < 25 ? 'Normal weight' : 
                       bmiResult < 30 ? 'Overweight' : 'Obese'}
                    </p>
                  </div>
                )}
              </form>
            )}

            {activeCalculator === 'bmr' && (
              <div className="calculator-form">
                <p className="calculator-coming-soon">BMR Calculator coming soon...</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="contact-cta-section" ref={ctaRef}>
          <div className="contact-cta-content">
            <p className="section-label-teal">THE RECOVERY STARTS</p>
            <h2 className="contact-cta-title">Begin Your<br /><span className="accent-text">Recovery Journey</span></h2>
            <p className="contact-cta-desc">
              Discover personalized rehabilitation programs designed to help you regain strength, mobility, and quality of life. Our expert team is ready to create a tailored plan that addresses your needs and accelerates your path to wellness.
            </p>
            <div className="contact-cta-buttons">
              <button className="btn btn-primary">Book an Appointment</button>
              <button className="btn-outline-light">WhatsApp Us</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
