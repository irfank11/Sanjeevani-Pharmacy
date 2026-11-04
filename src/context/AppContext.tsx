import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface Appointment {
  id: string;
  code: string;
  patientName: string;
  phone: string;
  reason: string;
  date: string; // YYYY-MM-DD
  slot: string;
  status: string;
  createdAt: string;
}

export interface AppSettings {
  clinicName: string;
  doctorName: string;
  qualification: string;
  specialization: string;
  experience: string;
  address: string;
  timingsText: string;
  fee: number;
  slotMinutes: number;
  phone: string;
  whatsapp: string;
}

const defaultSettings: AppSettings = {
  clinicName: 'Sanjeevani Pharmacy',
  doctorName: 'Dr Tanveer Alam Khan',
  qualification: 'M.S. (Ophthalmology)',
  specialization: 'Eye Care & Cataract Surgery',
  experience: '10+ years',
  address: 'Harsaur Road, Gandhi Chowk, Parbatsar, Rajasthan 341512',
  timingsText: 'Open all days, 9:00 AM – 8:00 PM',
  fee: 200,
  slotMinutes: 15,
  phone: '7947149526',
  whatsapp: '7947149526',
};

interface AppContextValue {
  settings: AppSettings;
  appointments: Appointment[];
  addAppointment: (data: Omit<Appointment, 'id' | 'code' | 'createdAt'>) => Appointment;
  getAppointment: (code: string, phone: string) => Appointment | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY_APPOINTMENTS = 'sanjeevani_appointments';
const STORAGE_KEY_SETTINGS = 'sanjeevani_settings';

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SP-${code}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_APPOINTMENTS) || '[]');
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      return { ...defaultSettings, ...JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS) || '{}') };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const addAppointment = useCallback(
    (data: Omit<Appointment, 'id' | 'code' | 'createdAt'>): Appointment => {
      const appointment: Appointment = {
        ...data,
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        code: generateCode(),
        createdAt: new Date().toISOString(),
      };
      setAppointments(prev => [appointment, ...prev]);
      return appointment;
    },
    [],
  );

  const getAppointment = useCallback(
    (code: string, phone: string) => {
      const normalizedPhone = phone.replace(/\D/g, '').slice(-10);
      return appointments.find(
        apt =>
          apt.code.toUpperCase() === code.toUpperCase() &&
          apt.phone.replace(/\D/g, '').slice(-10) === normalizedPhone,
      );
    },
    [appointments],
  );

  const value = useMemo(
    () => ({ settings, appointments, addAppointment, getAppointment }),
    [settings, appointments, addAppointment, getAppointment],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
