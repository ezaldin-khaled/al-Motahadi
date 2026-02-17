import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import OurTeam from './pages/OurTeam';
import Services from './pages/Services';
import PackagesPricing from './pages/PackagesPricing';
import WhoWeAre from './pages/WhoWeAre';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<PackagesPricing />} />
      </Routes>
    </Router>
  );
}

export default App;
