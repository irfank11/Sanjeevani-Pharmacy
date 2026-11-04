import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SeoMetadata from './components/SeoMetadata';
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
      <div className="flex gap-2">
        <a
          href="https://wa.me/919024244193"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold bg-green-500 text-white shadow-lg"
        >
          💬 WhatsApp
        </a>
        <Link
          to="/book"
          className="flex-[1.5] btn-primary flex items-center justify-center gap-2 py-3.5 text-base shadow-lg"
        >
          <Calendar className="w-5 h-5" />
          Book Now
        </Link>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  const location = useLocation();
  if (location.pathname === '/admin') return null;

  return (
    <a
      href="https://wa.me/919024244193"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 hidden sm:flex w-14 h-14 rounded-full bg-green-500 text-white items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all no-print"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.48-1.76-.25-.49-.027-.76.188-.965.193-.182.43-.474.645-.71.215-.237.287-.398.43-.664.143-.267.072-.5-.036-.7-.108-.2-.97-2.34-1.33-3.2-.35-.84-.71-.72-.97-.73-.25-.01-.54-.01-.83-.01-.29 0-.76.11-1.16.55-.4.44-1.52 1.49-1.52 3.63s1.56 4.21 1.78 4.5c.22.3 3.07 4.69 7.44 6.58 1.04.45 1.85.71 2.48.91 1.04.33 1.99.28 2.74.17.84-.13 2.59-1.06 2.96-2.08.36-1.02.36-1.89.25-2.07-.11-.18-.4-.29-.83-.5z" />
      </svg>
    </a>
  );
}

function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <h1 className="font-serif text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Page not found</h1>
      <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>The page you requested could not be found.</p>
      <Link to="/" className="btn-primary">Return to Sanjeevani Pharmacy</Link>
    </section>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileBookBar />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <SeoMetadata />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}
