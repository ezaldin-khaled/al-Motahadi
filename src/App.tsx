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
import PackagesPricing from './pages/PackagesPricing';
import WhoWeAre from './pages/WhoWeAre';
import Blog from './pages/Blog';
import HealthTools from './pages/HealthTools';
import Dashboard from './pages/Dashboard';
import DashboardLogin from './pages/DashboardLogin';
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
        <Route path="/health-tools" element={<HealthTools />} />
        <Route path="/packages" element={<PackagesPricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard/login" element={<DashboardLogin />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/blog" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
