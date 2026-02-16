import { useEffect, useRef, useState, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sendContact } from '../lib/api';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current, { opacity: 0, y: 28 }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const result = await sendContact({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || undefined,
        message: message || undefined,
      });
      if (result.success) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
        alert(result.message || 'Thank you. Your message has been sent.');
      } else {
        setError(result.error);
      }
    } catch {
      setError('Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="section section-contact-form" ref={sectionRef}>
      <div className="content-inner">
        <p className="section-label">CALCULATOR</p>
        <h2 className="section-title">Calculate Your Health</h2>
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          {error && <div className="form-error" role="alert">{error}</div>}
          <div className="form-row">
            <input type="text" placeholder="First Name" className="form-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last Name" className="form-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <input type="email" placeholder="Email" className="form-input form-input-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="tel" placeholder="Phone Number" className="form-input form-input-full" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <textarea placeholder="Your Message" className="form-textarea" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit" className="btn btn-primary btn-block" disabled={sending}>{sending ? 'Sending…' : 'Send Message'}</button>
        </form>
      </div>
    </section>
  );
}
