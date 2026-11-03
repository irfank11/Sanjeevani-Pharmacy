import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, XCircle, Calendar, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CheckAppointment() {
  const { getAppointment, settings } = useApp();
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!code.trim() || !phone.trim()) {
      setError('Please enter both appointment ID and mobile number');
      return;
    }

    const apt = getAppointment(code.trim().toUpperCase(), phone.trim());
    if (apt) {
      setResult(apt);
    } else {
      setError('No appointment found with these details. Please check your ID and mobile number.');
    }
    setSearched(true);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: any }> = {
      confirmed: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: CheckCircle },
      completed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', icon: CheckCircle },
      cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: XCircle },
      held: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', icon: Clock },
      expired: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', icon: XCircle },
      no_show: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', icon: XCircle },
    };
    const s = styles[status] || styles.confirmed;
    const Icon = s.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${s.bg} ${s.text}`}>
        <Icon className="w-4 h-4" />
        {status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
      </span>
    );
  };

  return (
    <div>
      <section className="py-16 md:py-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Check Appointment Status
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Enter your appointment ID and registered mobile number to check status.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-lg mx-auto px-4">
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                  Appointment ID
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="APT-DDMM-XXXX"
                  className="w-full px-4 py-3 rounded-xl text-sm font-mono transition-colors focus:ring-2 focus:ring-mint-400 outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                  Registered Mobile Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit number"
                  className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <XCircle className="w-4 h-4" /> {error}
                </p>
              )}
              <button type="submit" className="btn-primary w-full inline-flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                Check Status
              </button>
            </div>
          </motion.form>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl p-6"
              style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Appointment Details</h3>
                {getStatusBadge(result.status)}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>ID</span>
                  <span className="font-mono font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{result.code}</span>
                </div>
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><Calendar className="w-3 h-3" /> Date</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {new Date(result.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Time</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{result.slot}</span>
                </div>
                <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Doctor</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{settings.doctorName}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><MapPin className="w-3 h-3" /> Location</span>
                  <span className="text-sm text-right" style={{ color: 'var(--text-primary)' }}>{settings.clinicName}</span>
                </div>
              </div>
            </motion.div>
          )}

          {!searched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                💡 Your appointment ID is in the format <strong>APT-DDMM-XXXX</strong> and was shown after booking.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
