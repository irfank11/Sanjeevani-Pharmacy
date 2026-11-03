import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div>
      <section className="py-16 md:py-20" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Privacy Policy
          </motion.h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose max-w-none"
            style={{ color: 'var(--text-secondary)' }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Information We Collect</h2>
                <p className="text-sm leading-relaxed">
                  When you book an appointment, we collect your name, mobile number, and optionally a reason for visit. 
                  This information is necessary to manage your consultation appointment with Dr. Tanveer Alam Khan at 
                  Sanjeevani Pharmacy, Parbatsar.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. How We Use Your Information</h2>
                <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
                  <li>To schedule and manage your appointment</li>
                  <li>To send appointment confirmations and reminders</li>
                  <li>To communicate regarding your consultation</li>
                  <li>To maintain records as required by medical practice regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Data Sharing</h2>
                <p className="text-sm leading-relaxed">
                  We do not sell or share your personal information with third parties except as required for payment 
                  processing (via Razorpay) or as required by law. Your health information shared during consultation 
                  is kept confidential as per medical ethics.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Data Security</h2>
                <p className="text-sm leading-relaxed">
                  We implement appropriate security measures to protect your personal information. Payment data is 
                  processed securely through Razorpay's PCI-compliant infrastructure. We do not store card or bank details.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Your Rights</h2>
                <p className="text-sm leading-relaxed">
                  You may request access to, correction of, or deletion of your personal data by contacting us. 
                  You may also opt out of any non-essential communications at any time.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Contact</h2>
                <p className="text-sm leading-relaxed">
                  For any privacy-related queries, please visit us at Sanjeevani Pharmacy, Gandhi Chowk, Harsour Road, 
                  Parbatsar, Nagaur, Rajasthan 341512 during consultation hours (Sundays, 10 AM – 1 PM) or use the 
                  contact form on our website.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
