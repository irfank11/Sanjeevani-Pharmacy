import { useState } from 'react';
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
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <BreathingLines />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-100 dark:bg-mint-900/30 text-mint-700 dark:text-mint-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-mint-500 rounded-full animate-pulse"></span>
                Pharmacy in Parbatsar, Rajasthan
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
                Trusted local eye consultation and pharmacy support in Parbatsar. Visit Sanjeevani Pharmacy near Gandhi Chowk for eye health checks and specialist consultation guidance.
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

      <section className="py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, label: 'Timings', value: settings.timingsText, color: 'text-mint-500' },
              { icon: MapPin, label: 'Location', value: 'Parbatsar, Didwana-Kuchaman', color: 'text-blue-500' },
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

      <section className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Eye Consultation Services in Parbatsar
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Explore eye care consultation services at Sanjeevani Pharmacy, with specialist guidance and appropriate referral pathways for treatment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">...
