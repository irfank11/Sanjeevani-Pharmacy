import { Link } from 'react-router-dom';
import { Eye, Heart, MapPin, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { settings } = useApp();

  return (
    <footer className="no-print mt-auto" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      {/* Emergency disclaimer */}
      <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <p className="text-sm text-red-700 dark:text-red-300 font-medium">
            ⚠️ Sudden vision loss or eye injury? Seek urgent in-person care immediately.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Sanjeevani Pharmacy</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Weekly visiting eye consultation clinic. Dr. Tanveer Alam Khan, MD (Ophthalmology), AIIMS New Delhi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm hover:text-mint-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>About Doctor</Link>
              <Link to="/services" className="block text-sm hover:text-mint-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>Services</Link>
              <Link to="/book" className="block text-sm hover:text-mint-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>Book Appointment</Link>
              <Link to="/check" className="block text-sm hover:text-mint-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>Check Status</Link>
            </div>
          </div>

          {/* Clinic Info */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Clinic</h4>
            <div className="space-y-2">
              <p className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-mint-500" />
                {settings.address}
              </p>
              <p className="text-sm flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <Clock className="w-4 h-4 shrink-0 text-mint-500" />
                {settings.timingsText}
              </p>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Legal</h4>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-sm hover:text-mint-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link>
              <Link to="/refund" className="block text-sm hover:text-mint-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>Refund & Cancellation</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Sanjeevani Pharmacy. Consultation-only visiting clinic.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            Made with <Heart className="w-3 h-3 text-red-400" /> for better eye care
          </p>
        </div>
      </div>
    </footer>
  );
}
