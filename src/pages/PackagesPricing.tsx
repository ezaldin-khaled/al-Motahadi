import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';
import '../styles/packages.css';

type PackageCard = {
  id: string;
  title: string;
  description: string;
  price: string;
  buttonLabel: string;
};

const individualPackages: PackageCard[] = [
  { id: 'ind-1', title: 'Package 1', description: 'Essential rehabilitation sessions to get you started on your recovery journey with expert guidance.', price: '132.0', buttonLabel: 'Add to Cart' },
  { id: 'ind-2', title: 'Day To Day', description: 'Flexible daily support tailored to your schedule and progress goals.', price: '193', buttonLabel: 'Add to Cart' },
  { id: 'ind-3', title: 'Week To Week', description: 'Structured weekly sessions for consistent progress and follow-up care.', price: '245', buttonLabel: 'Add to Cart' },
  { id: 'ind-4', title: 'Monthly Plan', description: 'Comprehensive monthly package with extended session options and priority scheduling.', price: '720.00', buttonLabel: 'Add to Cart' },
  { id: 'ind-5', title: 'Yearly Package', description: 'Full access to all therapies and specialists with dedicated care coordination.', price: '999.00', buttonLabel: 'Add to Cart' },
];

const corporatePackages: PackageCard[] = [
  { id: 'corp-1', title: 'Consultation and Follow-Up', description: 'Initial assessment and ongoing follow-up sessions for your team\'s wellness program.', price: '87.70', buttonLabel: 'Inquire Now' },
  { id: 'corp-2', title: 'Starter Corporate', description: 'Ideal for small teams with essential rehabilitation and wellness support.', price: '154', buttonLabel: 'Inquire Now' },
  { id: 'corp-3', title: 'Business Package', description: 'Expanded sessions for growing organizations and comprehensive care.', price: '206.70', buttonLabel: 'Inquire Now' },
  { id: 'corp-4', title: 'Enterprise Package', description: 'Full-scale programs for large organizations with dedicated support.', price: '323', buttonLabel: 'Inquire Now' },
  { id: 'corp-5', title: 'Premium Corporate', description: 'Top-tier corporate care with priority access and custom programs.', price: '448.0', buttonLabel: 'Inquire Now' },
];

const ehataPackages: PackageCard[] = [
  { id: 'ehata-1', title: 'Volunteering Program', description: 'Join our community care program and contribute to supporting those in need.', price: '258.75', buttonLabel: 'Join Our Program' },
  { id: 'ehata-2', title: 'Sponsoring Package', description: 'Sponsor rehabilitation sessions for community members who need support.', price: '185', buttonLabel: 'Join Our Program' },
  { id: 'ehata-3', title: 'Donation Package', description: 'Make a meaningful donation to fund community care and outreach programs.', price: '199', buttonLabel: 'Join Our Program' },
  { id: 'ehata-4', title: 'CSR Package', description: 'Corporate social responsibility program with tailored community initiatives.', price: '258.70', buttonLabel: 'Join Our Program' },
];

function PackageCardItem({ item }: { item: PackageCard }) {
  return (
    <div className="package-card">
      <h3 className="package-card-title">{item.title}</h3>
      <p className="package-card-desc">{item.description}</p>
      <p className="package-card-price">{item.price} <span className="package-card-currency">OMR</span></p>
      <button type="button" className="package-card-btn btn btn-primary">{item.buttonLabel}</button>
    </div>
  );
}

export default function PackagesPricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="packages-page">
        {/* Hero Section */}
        <section className="packages-hero">
          <div className="page-hero-bg" aria-hidden="true" />
          <div className="packages-hero-inner">
            <h1 className="packages-hero-title">Packages & Pricing</h1>
            <p className="packages-hero-desc">
              Take advantage of our packages and pricing options designed to provide you with the best experience possible. We offer flexible plans for individuals, corporations, and community care programs.
            </p>
            <p className="packages-hero-desc packages-hero-desc-secondary">
              Choose the option that fits your needs and begin your recovery journey with expert support every step of the way.
            </p>
            <div className="packages-hero-buttons cta-buttons">
              <Link to="/contact" className="btn btn-primary">Inquire Now</Link>
              <Link to="/services" className="btn btn-secondary packages-btn-outline">View All</Link>
            </div>
          </div>
        </section>

        {/* Individual Packages */}
        <section className="packages-section packages-section-white" id="individual">
          <div className="packages-section-inner">
            <p className="packages-section-label">VIEW MORE</p>
            <h2 className="packages-section-title">Individual Packages</h2>
            <div className="packages-grid packages-grid-5">
              {individualPackages.map((pkg) => (
                <PackageCardItem key={pkg.id} item={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* Corporate Packages */}
        <section className="packages-section packages-section-gray" id="corporate">
          <div className="packages-section-inner">
            <p className="packages-section-label">VIEW MORE</p>
            <h2 className="packages-section-title">Corporate Packages</h2>
            <div className="packages-grid packages-grid-5">
              {corporatePackages.map((pkg) => (
                <PackageCardItem key={pkg.id} item={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* Ehata Community Care Program Packages */}
        <section className="packages-section packages-section-white">
          <div className="packages-section-inner">
            <p className="packages-section-label">VIEW MORE</p>
            <h2 className="packages-section-title">Ehata Community Care Program Packages</h2>
            <div className="packages-grid packages-grid-4">
              {ehataPackages.map((pkg) => (
                <PackageCardItem key={pkg.id} item={pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* Single Therapy Session */}
        <section className="packages-section packages-section-gray packages-section-single">
          <div className="packages-section-inner">
            <div className="packages-single-wrap">
              <div className="package-card package-card-single">
                <h3 className="package-card-title">Single Therapy Session</h3>
                <p className="package-card-price">23 <span className="package-card-currency">OMR</span></p>
                <div className="package-card-actions">
                  <button type="button" className="package-card-btn btn btn-primary">Inquire Now</button>
                  <Link to="/services" className="package-card-link">View details</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
