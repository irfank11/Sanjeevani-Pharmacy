import { motion } from 'framer-motion';

export default function RefundPolicy() {
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
            Refund & Cancellation Policy
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
            className="space-y-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            <div>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Cancellation by Patient</h2>
              <p className="text-sm leading-relaxed">
                Patients may cancel their appointment by contacting us before the scheduled consultation time. 
                Cancellation requests received at least 2 hours before the scheduled slot will be eligible for a full refund.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Cancellation by Clinic</h2>
              <p className="text-sm leading-relaxed">
                In rare cases where the doctor is unable to attend due to emergency or unavoidable circumstances, 
                the clinic will notify patients at the earliest and provide a full refund or reschedule option.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Refund Process</h2>
              <ul className="text-sm leading-relaxed list-disc pl-5 space-y-2">
                <li>Refunds will be processed to the original payment method within 5-7 business days</li>
                <li>For UPI payments, refunds will be credited back to the linked bank account</li>
                <li>You will receive a confirmation once the refund is initiated</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. No-Show Policy</h2>
              <p className="text-sm leading-relaxed">
                If a patient does not arrive for their scheduled appointment without prior cancellation, 
                the consultation fee will not be refunded. We request patients to inform us if they cannot attend.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Payment Issues</h2>
              <p className="text-sm leading-relaxed">
                If payment was deducted but appointment was not confirmed due to a technical issue, 
                a full refund will be processed automatically. For any payment discrepancies, please contact us 
                with your transaction details.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Contact for Refunds</h2>
              <p className="text-sm leading-relaxed">
                For refund requests, please visit Sanjeevani Pharmacy during consultation hours (Sundays, 10 AM – 1 PM) 
                or use the contact form on our website with your appointment ID and payment details.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
