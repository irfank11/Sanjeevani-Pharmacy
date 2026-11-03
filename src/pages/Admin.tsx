import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, LayoutDashboard, Calendar, CreditCard, Settings, MessageSquare, LogOut, Users, Search, Download, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

type AdminTab = 'dashboard' | 'appointments' | 'payments' | 'slots' | 'content' | 'messages';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const { appointments, settings } = useApp();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const msgs = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    setMessages(msgs);
  }, [activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo auth - in production this would be Supabase auth
    if (email === 'admin@sanjeevani.com' && password === 'admin123') {
      setAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use admin@sanjeevani.com / admin123 for demo.');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4"
        >
          <div className="rounded-2xl p-8" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h1 className="font-serif text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Admin Login</h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Sanjeevani Pharmacy Management</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@sanjeevani.com"
                  className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm transition-colors focus:ring-2 focus:ring-mint-400 outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
              {loginError && <p className="text-sm text-red-500">{loginError}</p>}
              <button type="submit" className="btn-primary w-full">Sign In</button>
            </form>
            <p className="text-xs text-center mt-4" style={{ color: 'var(--text-muted)' }}>
              Demo: admin@sanjeevani.com / admin123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'slots', label: 'Slots & Fees', icon: Clock },
    { id: 'content', label: 'Content', icon: Settings },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === todayStr);
  const upcomingAppointments = appointments.filter(a => a.date >= todayStr && a.status === 'confirmed');
  const totalRevenue = appointments.filter(a => a.status === 'confirmed' || a.status === 'completed').length * settings.fee;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Admin Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Admin Panel</h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sanjeevani Pharmacy</p>
            </div>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 mb-6 pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-mint-100 dark:bg-mint-900/30 text-mint-700 dark:text-mint-300'
                  : 'hover:bg-mint-50 dark:hover:bg-mint-900/10'
              }`}
              style={activeTab !== tab.id ? { color: 'var(--text-secondary)' } : {}}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Today's Appointments", value: todayAppointments.length, icon: Calendar, color: 'text-blue-500' },
                { label: 'Upcoming', value: upcomingAppointments.length, icon: Clock, color: 'text-amber-500' },
                { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: CreditCard, color: 'text-green-500' },
                { label: 'Total Bookings', value: appointments.length, icon: Users, color: 'text-purple-500' },
              ].map(stat => (
                <div key={stat.label} className="p-5 rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Appointments */}
            <div className="rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Recent Appointments</h3>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                {appointments.length === 0 ? (
                  <p className="p-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No appointments yet</p>
                ) : (
                  appointments.slice(-5).reverse().map(apt => (
                    <div key={apt.id} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{apt.patientName}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{apt.code} • {apt.date} at {apt.slot}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        apt.status === 'confirmed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        apt.status === 'cancelled' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  className="px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-mint-400"
                  style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-mint-50 dark:hover:bg-mint-900/20" style={{ color: 'var(--text-secondary)' }}>
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--text-muted)' }}>ID</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--text-muted)' }}>Patient</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--text-muted)' }}>Date</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--text-muted)' }}>Slot</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--text-muted)' }}>Status</th>
                      <th className="text-left p-3 font-medium" style={{ color: 'var(--text-muted)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                    {appointments.length === 0 ? (
                      <tr><td colSpan={6} className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>No appointments</td></tr>
                    ) : (
                      appointments.map(apt => (
                        <tr key={apt.id}>
                          <td className="p-3 font-mono text-xs" style={{ color: 'var(--text-primary)' }}>{apt.code}</td>
                          <td className="p-3" style={{ color: 'var(--text-primary)' }}>{apt.patientName}</td>
                          <td className="p-3" style={{ color: 'var(--text-secondary)' }}>{apt.date}</td>
                          <td className="p-3" style={{ color: 'var(--text-secondary)' }}>{apt.slot}</td>
                          <td className="p-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              apt.status === 'confirmed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                              apt.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                              apt.status === 'cancelled' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                              'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}>{apt.status}</span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              <button className="p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20" title="Mark completed">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              </button>
                              <button className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20" title="Cancel">
                                <XCircle className="w-4 h-4 text-red-500" />
                              </button>
                              <button className="p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20" title="View details">
                                <Eye className="w-4 h-4 text-blue-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Payment History</h3>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-mint-50 dark:hover:bg-mint-900/20" style={{ color: 'var(--text-secondary)' }}>
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
            <div className="rounded-xl p-8 text-center" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
              <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Payment Records</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {appointments.filter(a => a.status === 'confirmed').length} successful payments totaling ₹{appointments.filter(a => a.status === 'confirmed').length * settings.fee}
              </p>
              <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
                Full Razorpay integration will show detailed payment records here.
              </p>
            </div>
          </motion.div>
        )}

        {/* Slots & Fees Tab */}
        {activeTab === 'slots' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Consultation Fee</h3>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>₹{settings.fee}</span>
                  <button className="text-sm px-3 py-1.5 rounded-lg border hover:bg-mint-50 dark:hover:bg-mint-900/20" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    Edit
                  </button>
                </div>
              </div>
              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Slot Duration</h3>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{settings.slotMinutes} min</span>
                  <button className="text-sm px-3 py-1.5 rounded-lg border hover:bg-mint-50 dark:hover:bg-mint-900/20" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    Edit
                  </button>
                </div>
              </div>
              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Working Hours</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Sunday: 10:00 AM – 1:00 PM</p>
                <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>All other days: Closed</p>
              </div>
              <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Holidays & Blocked Slots</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No holidays set</p>
                <button className="mt-3 text-sm px-3 py-1.5 rounded-lg border hover:bg-mint-50 dark:hover:bg-mint-900/20" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  Manage
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <h3 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Site Settings</h3>
              <div className="space-y-4">
                {[
                  { label: 'Doctor Name', value: settings.doctorName },
                  { label: 'Qualification', value: settings.qualification },
                  { label: 'Specialization', value: settings.specialization },
                  { label: 'Experience', value: settings.experience },
                  { label: 'Clinic Name', value: settings.clinicName },
                  { label: 'Address', value: settings.address },
                  { label: 'Timings', value: settings.timingsText },
                  { label: 'Consultation Fee', value: `₹${settings.fee}` },
                  { label: 'Phone', value: settings.phone ? `+91 ${settings.phone}` : '(not set)' },
                  { label: 'WhatsApp', value: settings.whatsapp ? `+91 ${settings.whatsapp}` : '(not set)' },
                ].map(field => (
                  <div key={field.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{field.label}</span>
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{field.value}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 btn-primary text-sm">Edit Settings</button>
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Contact Messages ({messages.length})
                </h3>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border-color)' }}>
                {messages.length === 0 ? (
                  <p className="p-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No messages yet</p>
                ) : (
                  messages.map((msg: any) => (
                    <div key={msg.id} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{msg.name}</span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {new Date(msg.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                      {msg.email && <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{msg.email}</p>}
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
