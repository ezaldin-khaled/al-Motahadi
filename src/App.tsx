import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import OurTeam from './pages/OurTeam';
import DoctorProfile from './pages/DoctorProfile';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import PackagesPricing from './pages/PackagesPricing';
import PackageDetail from './pages/PackageDetail';
import WhoWeAre from './pages/WhoWeAre';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import ResearchProtocols from './pages/ResearchProtocols';
import HomeTherapy from './pages/HomeTherapy';
import Transportation from './pages/Transportation';
import HealthTools from './pages/HealthTools';
import SocialResponsibility from './pages/SocialResponsibility';
import BookAppointment from './pages/BookAppointment';
import Dashboard from './pages/Dashboard';
import DashboardLogin from './pages/DashboardLogin';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RtlSync() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const isRtl = i18n.language === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return null;
}

function App() {
  return (
    <Router>
      <RtlSync />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/team/:slug" element={<DoctorProfile />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/health-tools" element={<HealthTools />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/packages" element={<PackagesPricing />} />
        <Route path="/packages/:type" element={<PackageDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/research-network" element={<ResearchProtocols />} />
        <Route path="/home-therapy" element={<HomeTherapy />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/social-responsibility" element={<SocialResponsibility />} />
        <Route path="/dashboard/login" element={<DashboardLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/blog" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
