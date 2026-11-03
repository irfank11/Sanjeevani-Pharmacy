import React, { createContext, useContext, useState } from 'react';

export interface Appointment {
  id: string;
  code: string;
  patientName: string;
  phone: string;
  reason: string;
  date: string;
  slot: string;
  status: 'held' | 'confirmed' | 'completed' | 'cancelled' | 'no_show' | 'expired';
  createdAt: string;
}

interface AppContextType {
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, 'id' | 'code' | 'createdAt'>) => Appointment;
  getAppointment: (code: string, phone: string) => Appointment | null;
  settings: SiteSettings;
}

interface SiteSettings {
  doctorName: string;
  qualification: string;
  specialization: string;
  experience: string;
  clinicName: string;
  address: string;
  timingsText: string;
  fee: number;
  slotMinutes: number;
  phone: string;
  whatsapp: string;
  mapUrl: string;
}

const defaultSettings: SiteSettings = {
  doctorName: 'Dr. Tanveer Alam Khan',
  qualification: 'MD (Ophthalmology), AIIMS New Delhi',
  specialization: 'Cornea Transplantation',
  experience: '5 years',
  clinicName: 'Sanjeevani Pharmacy',
  address: 'Gandhi Chowk, Harsour Road, Parbatsar, Nagaur, Rajasthan 341512',
  timingsText: 'Every Sunday, 10:00 AM – 1:00 PM',
  fee: 500,
  slotMinutes: 20,
  phone: '',
  whatsapp: '',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d74.0!3d26.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDM2JzAwLjAiTiA3NMKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1',
};

const AppContext = createContext<AppContextType>({
  appointments: [],
  addAppointment: () => ({ id: '', code: '', patientName: '', phone: '', reason: '', date: '', slot: '', status: 'confirmed', createdAt: '' }),
  getAppointment: () => null,
  settings: defaultSettings,
});

function generateCode(date: string): string {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `APT-${dd}${mm}-${rand}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const addAppointment = (apt: Omit<Appointment, 'id' | 'code' | 'createdAt'>) => {
    const code = generateCode(apt.date);
    const newApt: Appointment = {
      ...apt,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      code,
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => {
      const updated = [...prev, newApt];
      localStorage.setItem('appointments', JSON.stringify(updated));
      return updated;
    });
    return newApt;
  };

  const getAppointment = (code: string, phone: string) => {
    return appointments.find(a => a.code === code && a.phone === phone) || null;
  };

  return (
    <AppContext.Provider value={{ appointments, addAppointment, getAppointment, settings: defaultSettings }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
