import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import BreathingLines from '../components/BreathingLines';

const services = [
  {
    title: 'Cornea Consultation',
    description: 'Comprehensive evaluation of corneal conditions including keratoconus, corneal scarring, infections, and dystrophies. Expert assessment by an AIIMS-trained specialist.',
    icon: '👁️',
    note: 'Surgical treatment referred to Centre For Sight, Ajmer.',
  },
  {
    title: 'Cornea Transplantation Consultation',
    description: 'Assessment for cornea transplant suitability. Evaluation of existing reports, discussion of procedure options (PK, DALK, DSEK/DMEK), and referral planning.',
    icon: '🔬',
    note: 'Transplant surgery performed at Centre For Sight, Ajmer — not at this location.',
  },
  {
    title: 'Eye Health Consultation',
    description: 'General eye health evaluation, including screening for common conditions like dry eye, allergies, and early signs of eye disease.',
    icon: '🩺',
    note: 'Consultation and advice only.',
  },
  {
    title: 'Vision Concerns',
    description: 'Evaluation of blurred vision, difficulty seeing at night, halos around lights, and other visual symptoms. Assessment and guidance on next steps.',
    icon: '✨',
    note: 'Diagnostic consultation; treatment as advised.',
  },
  {
    title: 'Review of Existing Reports',
    description: 'Expert review of previous eye examination reports, test results, and treatment records. Second opinion and guidance on further management.',
    icon: '📋',
    note: 'Bring all previous reports and prescriptions.',
  },
  {
    title: 'Follow-up Consultation',
    description: 'Follow-up visits for ongoing eye conditions, post-operative review (for surgeries done at Ajmer centre), and medication adjustment.',
    icon: '🔄',
    note: 'Carry your previous prescription and reports.',
  },
];

export default function Services() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <BreathingLines />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Consultation Services
            </h1>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: 'var(--text-secondary)' }}>
              Expert eye care consultation every Sunday. All surgical procedures are assessed and referred to Centre For Sight, Ajmer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important notice */}
      <section className="py-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-amber-800 dark:text-amber-200">Important Notice</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Sanjeevani Pharmacy is a <strong>consultation-only visiting clinic</strong>. Cornea transplantation and other surgeries 
                are assessed here and referred to Dr. Khunger's Eye Care Centre · Centre For Sight, Ajmer. No surgical procedures 
                are performed at this location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                className="card-3d p-6 rounded-2xl flex flex-col"
                style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                  {service.title}
                </h3>
                <p className="text-sm flex-grow mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-mint-50 dark:bg-mint-900/20">
                  <AlertCircle className="w-4 h-4 text-mint-600 dark:text-mint-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-mint-700 dark:text-mint-300">{service.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Ready to Book?
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              Consultation every Sunday, 10:00 AM – 1:00 PM at Sanjeevani Pharmacy, Parbatsar.
            </p>
            <Link to="/book" className="btn-primary inline-flex items-center gap-2 text-lg">
              Book Your Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
