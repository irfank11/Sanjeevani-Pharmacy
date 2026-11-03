import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { settings } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (honeypot) return;
    if (name.trim().length < 2) errs.name = 'Name is required';
    if (message.trim().length < 5) errs.message = 'Message must be at least 5 characters';
    
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Save to localStorage (simulating database)
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      read: false,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('contact_messages', JSON.stringify(messages));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Message Sent!
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Thank you for reaching out. We'll get back to you soon.
          </p>
          <button
            onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }}
            className="mt-6 btn-primary"
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 md:py-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Contact Us
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Have questions? Reach out to us or visit during consultation hours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                    Email / Phone (optional)
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email or phone number"
                    className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                    Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Your message..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none resize-none"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} />
                </div>
                <button type="submit" className="btn-primary inline-flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Visit Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <MapPin className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Address</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <Clock className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Consultation Hours</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{settings.timingsText}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Walk-in or pre-booked appointments</p>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d74.0!3d26.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDM2JzAwLjAiTiA3NMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Clinic Location"
                  />
                </div>

                {/* WhatsApp - only if configured */}
                {settings.whatsapp && (
                  <a
                    href={`https://wa.me/91${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                  >
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-medium text-sm text-green-700 dark:text-green-300">Chat on WhatsApp</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Quick response during consultation hours</p>
                    </div>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
