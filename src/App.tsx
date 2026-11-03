import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import BookAppointment from './pages/BookAppointment';
import CheckAppointment from './pages/CheckAppointment';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import RefundPolicy from './pages/RefundPolicy';
import Admin from './pages/Admin';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MobileBookBar() {
  const location = useLocation();
  if (location.pathname === '/book' || location.pathname === '/admin') return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 no-print sm:hidden" style={{ background: 'linear-gradient(to top, var(--bg-primary) 80%, transparent)' }}>
      <Link
        to="/book"
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-base shadow-lg"
      >
        <Calendar className="w-5 h-5" />
        Book Appointment
      </Link>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <main className="flex-grow pb-20 sm:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/check" element={<CheckAppointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<RefundPolicy />} />
        </Routes>
      </main>
      <Footer />
      <MobileBookBar />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
