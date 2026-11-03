import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, CreditCard, CheckCircle, AlertCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BreathingLines from '../components/BreathingLines';

function getNextSundays(count: number): Date[] {
  const sundays: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let d = new Date(today);
  // Find next Sunday
  const dayOfWeek = d.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  d.setDate(d.getDate() + daysUntilSunday);
  
  while (sundays.length < count) {
    if (d >= today || (d.toDateString() === today.toDateString() && today.getHours() < 13)) {
      sundays.push(new Date(d));
    }
    d.setDate(d.getDate() + 7);
    if (sundays.length >= count) break;
  }
  return sundays;
}

function generateSlots(date: Date, slotMinutes: number, bookedSlots: string[]): string[] {
  const slots: string[] = [];
  const startHour = 10;
  const endHour = 13;
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += slotMinutes) {
      if (h === endHour - 1 && m >= 40) continue; // Last slot at 12:40
      const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      
      // Disable past slots for today
      if (isToday) {
        const slotTime = new Date(date);
        slotTime.setHours(h, m, 0, 0);
        if (slotTime.getTime() < now.getTime() - 15 * 60 * 1000) continue;
      }
      
      // Disable booked slots
      if (bookedSlots.includes(timeStr)) continue;
      
      slots.push(timeStr);
    }
  }
  return slots;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export default function BookAppointment() {
  const { settings, addAppointment, appointments } = useApp();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedApt, setConfirmedApt] = useState<any>(null);
  const [countdown, setCountdown] = useState(300); // 5 min hold
  const [holdActive, setHoldActive] = useState(false);

  const sundays = useMemo(() => getNextSundays(14), []);

  // Get booked slots for selected date
  const bookedSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toISOString().split('T')[0];
    return appointments
      .filter(a => a.date === dateStr && a.status !== 'cancelled' && a.status !== 'expired')
      .map(a => a.slot);
  }, [selectedDate, appointments]);

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    return generateSlots(selectedDate, settings.slotMinutes, bookedSlots);
  }, [selectedDate, settings.slotMinutes, bookedSlots]);

  // Countdown timer for hold
  useEffect(() => {
    if (!holdActive || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          setHoldActive(false);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [holdActive, countdown]);

  // Poll for availability every 30 seconds
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const validateStep1 = () => {
    if (!selectedDate || !selectedSlot) {
      setErrors({ slot: 'Please select a date and time slot' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = useCallback(() => {
    const errs: Record<string, string> = {};
    if (honeypot) return false; // Bot detected
    if (patientName.trim().length < 2 || patientName.trim().length > 80) {
      errs.name = 'Name must be 2-80 characters';
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    if (reason.length > 300) {
      errs.reason = 'Reason must be under 300 characters';
    }
    if (!consent) {
      errs.consent = 'Please accept the privacy policy';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [patientName, phone, reason, consent, honeypot]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) return;
    setIsProcessing(true);
    
    // Simulate payment processing (test mode)
    setTimeout(() => {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const apt = addAppointment({
        patientName: patientName.trim(),
        phone,
        reason: reason.trim(),
        date: dateStr,
        slot: selectedSlot,
        status: 'confirmed',
      });
      setConfirmedApt(apt);
      setIsProcessing(false);
      setStep(4);
    }, 2000);
  };

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  if (confirmedApt) {
    return (
      <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Appointment Confirmed!
            </h2>
            <div className="my-6 p-4 rounded-xl bg-mint-50 dark:bg-mint-900/20">
              <p className="text-2xl font-bold font-mono text-mint-700 dark:text-mint-300">{confirmedApt.code}</p>
            </div>
            <div className="space-y-3 text-left mb-6">
              <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Patient</span>
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{confirmedApt.patientName}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Doctor</span>
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{settings.doctorName}</span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Date</span>
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                  {new Date(confirmedApt.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Time</span>
                <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{formatTime(confirmedApt.slot)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Location</span>
                <span className="font-medium text-sm text-right max-w-[200px]" style={{ color: 'var(--text-primary)' }}>{settings.clinicName}, {settings.address}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-colors hover:bg-mint-50 dark:hover:bg-mint-900/20"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                Print / Download
              </button>
              <a
                href="/check"
                className="flex-1 py-3 rounded-xl font-semibold text-sm btn-primary text-center"
              >
                Track Status
              </a>
            </div>
            <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              Your appointment ID has been noted. Please arrive 10 minutes early.
            </p>
          </motion.div>

          {/* Print-only version */}
          <div className="print-only">
            <h1>Appointment Confirmation</h1>
            <p>ID: {confirmedApt.code}</p>
            <p>Patient: {confirmedApt.patientName}</p>
            <p>Doctor: {settings.doctorName}</p>
            <p>Date: {new Date(confirmedApt.date).toLocaleDateString('en-IN')}</p>
            <p>Time: {formatTime(confirmedApt.slot)}</p>
            <p>Location: {settings.clinicName}, {settings.address}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative py-12 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <BreathingLines />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl md:text-4xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Book Your Consultation
          </motion.h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {settings.timingsText} • ₹{settings.fee} consultation fee
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            {['Date & Time', 'Your Details', 'Payment'].map((label, i) => (
              <div key={label} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  step > i + 1 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                  step === i + 1 ? 'bg-mint-100 dark:bg-mint-900/30 text-mint-700 dark:text-mint-300' :
                  'text-gray-400'
                }`}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{
                    backgroundColor: step > i + 1 ? '#10b981' : step === i + 1 ? 'var(--accent)' : 'var(--border-color)',
                    color: step >= i + 1 ? 'white' : 'var(--text-muted)',
                  }}>
                    {step > i + 1 ? '✓' : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < 2 && <ChevronRight className="w-4 h-4 mx-1" style={{ color: 'var(--text-muted)' }} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Date & Slot */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Calendar className="w-5 h-5 text-mint-500" />
                    Select Date & Time
                  </h2>

                  {/* Date selection */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-3 block" style={{ color: 'var(--text-secondary)' }}>Available Sundays</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                      {sundays.map((d) => {
                        const dateStr = d.toISOString().split('T')[0];
                        const isSelected = selectedDate?.toDateString() === d.toDateString();
                        return (
                          <button
                            key={dateStr}
                            onClick={() => { setSelectedDate(d); setSelectedSlot(''); }}
                            className={`p-3 rounded-xl text-center transition-all ${
                              isSelected
                                ? 'bg-mint-500 text-white shadow-md'
                                : 'hover:bg-mint-50 dark:hover:bg-mint-900/20'
                            }`}
                            style={!isSelected ? { border: '1px solid var(--border-color)' } : {}}
                          >
                            <div className="text-xs font-medium">{d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                            <div className="text-lg font-bold">{d.getDate()}</div>
                            <div className="text-xs">{d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Slot selection */}
                  {selectedDate && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <label className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                        <Clock className="w-4 h-4" />
                        Available Slots ({formatDate(selectedDate)})
                      </label>
                      {availableSlots.length === 0 ? (
                        <p className="text-sm py-4 text-center" style={{ color: 'var(--text-muted)' }}>
                          No slots available for this date. Please choose another Sunday.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                          {availableSlots.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedSlot(slot)}
                              className={`slot-btn text-sm ${selectedSlot === slot ? 'selected' : ''}`}
                            >
                              {formatTime(slot)}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {errors.slot && (
                    <p className="mt-4 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.slot}
                    </p>
                  )}

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => validateStep1() && setStep(2)}
                      className="btn-primary inline-flex items-center gap-2"
                      disabled={!selectedDate || !selectedSlot}
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Patient Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <User className="w-5 h-5 text-mint-500" />
                    Patient Details
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none"
                        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                        maxLength={80}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                        Mobile Number *
                      </label>
                      <div className="flex">
                        <span className="px-3 py-3 rounded-l-xl text-sm font-medium" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRight: 'none', color: 'var(--text-muted)' }}>+91</span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="10-digit mobile number"
                          className="flex-1 px-4 py-3 rounded-r-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none"
                          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                        Reason for Visit (optional)
                      </label>
                      <textarea
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Briefly describe your concern..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none resize-none"
                        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                        maxLength={300}
                      />
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{reason.length}/300</p>
                      {errors.reason && <p className="mt-1 text-xs text-red-500">{errors.reason}</p>}
                    </div>

                    {/* Honeypot */}
                    <div className="hidden" aria-hidden="true">
                      <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={consent}
                        onChange={e => setConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded accent-mint-500"
                      />
                      <label htmlFor="consent" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        I agree to the <a href="/privacy" className="text-mint-600 dark:text-mint-400 underline">privacy policy</a> and consent to my data being used for appointment management.
                      </label>
                    </div>
                    {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-mint-50 dark:hover:bg-mint-900/20"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={() => {
                        if (validateStep2()) {
                          setHoldActive(true);
                          setCountdown(300);
                          setStep(3);
                        }
                      }}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      Proceed to Payment <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <CreditCard className="w-5 h-5 text-mint-500" />
                    Payment
                  </h2>

                  {/* Hold countdown */}
                  {holdActive && countdown > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                          Slot held for you
                        </span>
                        <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                          {formatCountdown(countdown)}
                        </span>
                      </div>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Complete payment before timer expires to confirm your slot.
                      </p>
                    </div>
                  )}

                  {countdown === 0 && holdActive === false && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Hold expired. Please go back and select a new slot.
                      </p>
                    </div>
                  )}

                  {/* Summary */}
                  <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <h3 className="font-medium text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--text-muted)' }}>Date</span>
                        <span style={{ color: 'var(--text-primary)' }}>{selectedDate && formatDate(selectedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--text-muted)' }}>Time</span>
                        <span style={{ color: 'var(--text-primary)' }}>{selectedSlot && formatTime(selectedSlot)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--text-muted)' }}>Patient</span>
                        <span style={{ color: 'var(--text-primary)' }}>{patientName}</span>
                      </div>
                      <div className="flex justify-between pt-2 mt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Total</span>
                        <span className="font-bold text-lg" style={{ color: 'var(--accent)' }}>₹{settings.fee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Test payment button (simulating Razorpay) */}
                  <div className="p-4 rounded-xl border-2 border-dashed mb-4" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                        💳 UPI Payment (Test Mode)
                      </p>
                      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                        Razorpay integration will be activated when keys are configured. Currently in test mode.
                      </p>
                      <button
                        onClick={handleConfirm}
                        disabled={isProcessing || countdown === 0}
                        className="btn-primary w-full inline-flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Complete Test Payment — ₹{settings.fee}
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-mint-50 dark:hover:bg-mint-900/20"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
