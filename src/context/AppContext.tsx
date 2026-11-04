import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Eye, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, motion: motionPref, toggleMotion } = useTheme();
  const { settings } = useApp();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/book', label: 'Book Appointment' },
    { to: '/check', label: 'Check Status' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <div className="no-print bg-gradient-to-r from-mint-600 to-mint-700 text-white text-center py-1.5 text-sm font-medium">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 bg-lime-300 rounded-full animate-pulse"></span>
            {settings.timingsText} — {settings.clinicName}, Parbatsar
          </span>
          {settings.phone && (
            <span className="hidden sm:inline-flex items-center gap-1 ml-2">
              <span className="opacity-60">|</span>
              📞 +91 {settings.phone}
            </span>
          )}
        </span>
      </div>

      <header className="no-print sticky top-0 z-50 backdrop-blur-md" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group" aria-label="Sanjeevani Pharmacy home page">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-serif font-bold text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>Sanjeevani Pharmacy</div>
                <div className="text-xs leading-tight" style={{ color: 'var(--text-muted)' }}>Eye Care Consultation</div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-mint-600 dark:text-mint-400 bg-mint-50 dark:bg-mint-900/20'
                      : 'hover:text-mint-600 dark:hover:text-mint-400'
                  }`}
                  style={{ color: location.pathname === link.to ? undefined : 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMotion}
                className="p-2 rounded-lg transition-colors hover:bg-mint-50 dark:hover:bg-mint-900/20"
                title={motionPref === 'full' ? 'Reduce motion' : 'Enable motion'}
                aria-label="Toggle animations"
              >
                <Zap className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors hover:bg-mint-50 dark:hover:bg-mint-900/20"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" style={{ color: 'var(--text-muted)' }} /> : <Sun className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />}
              </button>
              <Link
                to="/book"
                className="hidden sm:inline-flex btn-primary text-sm"
              >
                Book Now
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-lg"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
              style={{ borderTop: '1px solid var(--border-color)' }}
            >
              <nav className="px-4 py-3 space-y-1" aria-label="Mobile navigation">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'text-mint-600 dark:text-mint-400 bg-mint-50 dark:bg-mint-900/20'
                        : ''
                    }`}
                    style={{ color: location.pathname === link.to ? undefined : 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
