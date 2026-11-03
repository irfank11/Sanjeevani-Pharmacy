import { motion } from 'framer-motion';
import { ExternalLink, Award, BookOpen, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BreathingLines from '../components/BreathingLines';

export default function About() {
  const { settings } = useApp();

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              About {settings.doctorName}
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              {settings.qualification}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile card */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
                {/* Doctor visual */}
                <div className="h-64 bg-gradient-to-br from-mint-100 to-mint-200 dark:from-mint-900/30 dark:to-mint-800/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0">
                    <motion.div
                      className="absolute w-40 h-40 rounded-full bg-mint-300/20 animate-morph"
                      style={{ left: '20%', top: '20%' }}
                    />
                    <motion.div
                      className="absolute w-32 h-32 rounded-full bg-lime-300/20 animate-morph"
                      style={{ right: '10%', bottom: '10%' }}
                      transition={{ delay: 2, duration: 8 }}
                    />
                  </div>
                  <div className="relative text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                      Eye Care Specialist
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {settings.doctorName}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>{settings.qualification}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <Award className="w-4 h-4 text-mint-500" />
                      {settings.experience} Experience
                    </div>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <BookOpen className="w-4 h-4 text-mint-500" />
                      {settings.specialization}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              className="lg:col-span-2"
              {...fadeInUp}
            >
              <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Professional Background
              </h2>
              <div className="prose max-w-none" style={{ color: 'var(--text-secondary)' }}>
                <p className="mb-4 leading-relaxed">
                  Dr. Tanveer Alam Khan is a qualified ophthalmologist with an MD in Ophthalmology from the prestigious 
                  All India Institute of Medical Sciences (AIIMS), New Delhi — one of India's premier medical institutions.
                </p>
                <p className="mb-4 leading-relaxed">
                  After completing his senior residency at AIIMS, Dr. Khan has developed specialized expertise in cornea 
                  transplantation, cornea surgery, cataract surgery, and refractive surgery.
                </p>
                <p className="mb-4 leading-relaxed">
                  He currently serves as a Consultant at <strong>Dr. Khunger's Eye Care Centre · Centre For Sight, Ajmer, Rajasthan</strong>, 
                  where surgical procedures including cornea transplantation are performed.
                </p>
                <p className="leading-relaxed">
                  At <strong>Sanjeevani Pharmacy, Parbatsar</strong>, Dr. Khan provides weekly visiting consultations every Sunday 
                  (10:00 AM – 1:00 PM). This clinic serves as a consultation point for eye health assessments, report reviews, 
                  and referrals. Surgical procedures are assessed here and referred to the Centre For Sight in Ajmer.
                </p>
              </div>

              {/* Professional Sources */}
              <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <ExternalLink className="w-4 h-4" />
                  Verified Professional Sources
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://www.centreforsight.net/doctor/dr-tanveer-alam-khan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-mint-600 dark:text-mint-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Centre For Sight — Doctor Profile
                  </a>
                  <a
                    href="https://khungereyecfs.com/doctors/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-mint-600 dark:text-mint-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Dr. Khunger's Eye Care Centre — Doctors
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Editorial Eye Imagery */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeInUp} className="font-serif text-2xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>
            The Art of Eye Care
          </motion.h2>
          
          {/* Hero image */}
          <motion.div
            className="rounded-2xl overflow-hidden mb-8"
            style={{ border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://image.qwenlm.ai/generated-images/17bb0bbd-705d-4158-a33a-d269cb499f97/_result.png"
              alt="Abstract iris macro photography - representing precision in eye care"
              className="w-full h-48 md:h-64 object-cover"
              loading="lazy"
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { gradient: 'from-mint-200 to-blue-200 dark:from-mint-900/30 dark:to-blue-900/30', emoji: '👁️', label: 'Precision' },
              { gradient: 'from-purple-200 to-pink-200 dark:from-purple-900/30 dark:to-pink-900/30', emoji: '🔬', label: 'Research' },
              { gradient: 'from-amber-200 to-orange-200 dark:from-amber-900/30 dark:to-orange-900/30', emoji: '💡', label: 'Innovation' },
              { gradient: 'from-teal-200 to-cyan-200 dark:from-teal-900/30 dark:to-cyan-900/30', emoji: '🩺', label: 'Care' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className={`aspect-square rounded-2xl bg-gradient-to-br ${item.gradient} flex flex-col items-center justify-center p-4`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-4xl mb-2">{item.emoji}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
