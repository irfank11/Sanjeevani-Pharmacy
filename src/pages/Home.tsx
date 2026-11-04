import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, IndianRupee, Calendar, ArrowRight, Shield, Award, Stethoscope } from 'lucide-react';
import { useApp } from '../context/AppContext';
import HeroAnimation from '../components/HeroAnimation';
import BreathingLines from '../components/BreathingLines';

export default function Home() {
  const { settings } = useApp();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <BreathingLines />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-100 dark:bg-mint-900/30 text-mint-700 dark:text-mint-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-mint-500 rounded-full animate-pulse"></span>
                Visiting Every Sunday
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                {settings.doctorName}
              </h1>
              <p className="text-lg md:text-xl font-medium mb-2" style={{ color: 'var(--accent)' }}>
                {settings.qualification}
              </p>
              <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
                Specialist in {settings.specialization} • {settings.experience} Experience
              </p>
              <p className="text-sm mb-8 max-w-lg" style={{ color: 'var(--text-muted)' }}>
                Consultation for cornea, cataract, and refractive concerns. Surgery assessment and referral to Centre For Sight, Ajmer.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book" className="btn-primary inline-flex items-center gap-2 text-base">
                  <Calendar className="w-5 h-5" />
                  Book a Visit
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:translate-y-[-2px]"
                  style={{ border: '2px solid var(--border-color)', color: 'var(--text-primary)' }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <HeroAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, label: 'Timings', value: settings.timingsText, color: 'text-mint-500' },
              { icon: MapPin, label: 'Location', value: 'Parbatsar, Nagaur', color: 'text-blue-500' },
              { icon: IndianRupee, label: 'Consultation Fee', value: `₹${settings.fee}`, color: 'text-amber-500' },
              { icon: Award, label: 'Experience', value: settings.experience, color: 'text-purple-500' },
            ].map((fact, i) => (
              <motion.div
                key={fact.label}
                className="card-3d p-6 rounded-2xl text-center"
                style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <fact.icon className={`w-8 h-8 mx-auto mb-3 ${fact.color}`} />
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{fact.label}</p>
                <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>{fact.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Consultation Services
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Expert eye care consultation. Surgical procedures are assessed and referred to Centre For Sight, Ajmer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Cornea Consultation', desc: 'Expert assessment for corneal conditions, infections, and dystrophies.', icon: '👁️' },
              { title: 'Transplant Assessment', desc: 'Evaluation for cornea transplantation with referral to Ajmer centre.', icon: '🔬' },
              { title: 'Vision Concerns', desc: 'Comprehensive evaluation of vision changes and eye health.', icon: '✨' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                className="card-3d p-6 rounded-2xl"
                style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>{service.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/services" className="inline-flex items-center gap-2 text-mint-600 dark:text-mint-400 font-semibold hover:underline">
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                Why Consult Here?
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Award, text: 'AIIMS New Delhi trained specialist with MD in Ophthalmology' },
                  { icon: Stethoscope, text: 'Senior residency completed at AIIMS, New Delhi' },
                  { icon: Shield, text: 'Specialized expertise in cornea transplantation' },
                  { icon: MapPin, text: 'Convenient weekly consultation at Parbatsar' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <item.icon className="w-5 h-5 text-mint-500 mt-0.5 shrink-0" />
                    <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-2xl p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--accent), #0f7661)' }}>
                <div className="absolute inset-0 opacity-10">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-white/30"
                      style={{ width: `${100 + i * 80}px`, height: `${100 + i * 80}px`, right: `-${i * 20}px`, top: `-${i * 20}px` }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                    />
                  ))}
                </div>
                <div className="relative text-white">
                  <h3 className="font-serif text-2xl font-bold mb-4">Book Your Consultation</h3>
                  <p className="text-white/80 mb-6">
                    Secure your slot for the next available Sunday. Quick online booking with instant confirmation.
                  </p>
                  <Link to="/book" className="inline-flex items-center gap-2 bg-white text-mint-700 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                    <Calendar className="w-5 h-5" />
                    Book Now — ₹{settings.fee}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Trusted Eye Care
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Backed by AIIMS training and years of specialized experience in cornea care.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: 'AIIMS', label: 'New Delhi Trained', desc: 'Premier medical institute' },
              { number: 'MD', label: 'Ophthalmology', desc: 'Specialized postgraduate degree' },
              { number: '5+', label: 'Years Experience', desc: 'Dedicated eye care practice' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="card-3d text-center p-8 rounded-2xl relative overflow-hidden group"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mint-400/0 to-mint-400/0 group-hover:from-mint-400/5 group-hover:to-lime-400/5 transition-all duration-500" />
                <div className="relative">
                  <div className="text-4xl font-serif font-bold mb-2" style={{ color: 'var(--accent)' }}>{item.number}</div>
                  <div className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.label}</div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 relative" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Visit Us
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>{settings.address}</p>
          </motion.div>
          <motion.div
            className="rounded-2xl overflow-hidden relative"
            style={{ border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps?q=26.8869721,74.7656376&z=17&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sanjeevani Pharmacy Location - Parbatsar, Didwana-Kuchaman, Rajasthan"
            />
          </motion.div>
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.google.com/maps/dir//Sanjeevani+pharmacy,+Parbatsar,+Ghandi+chowk,+harsore+road,+Parvatsar,+Rajasthan+341512/@26.877712,74.757113,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x396b91bd4e3929fd:0xc5aae8074d59a8b7!2m2!1d74.7656376!2d26.8869721?entry=ttu&g_ep=EgoyMDI2MTEwMS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mint-600 dark:text-mint-400 font-semibold hover:underline"
            >
              Open in Google Maps →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
