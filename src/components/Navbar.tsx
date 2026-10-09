import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  User, 
  Stethoscope, 
  AlertTriangle, 
  ShieldCheck, 
  KeyRound, 
  FileText, 
  Bell,
  ChevronDown,
  Sparkles,
  Lock
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    patients, 
    activePatient, 
    switchPatient, 
    consentTokens,
    isDoctorUnlocked,
    setIsConsentModalOpen,
    setIsIceModalOpen,
    setIsAuditModalOpen,
    notification
  } = useApp();

  const activeTokensCount = consentTokens.filter(
    t => t.status === 'active' && t.patientId === activePatient.id
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Top Banner for Hackathon Context */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white text-xs px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider font-semibold uppercase">
            HealthTech Track
          </span>
          <span className="hidden sm:inline">24-Hour Web Dev Hackathon • IIITDM Kancheepuram</span>
          <span className="text-blue-200 hidden md:inline">| Sovereign Health Records & Safe Care Continuity</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAuditModalOpen(true)}
            className="flex items-center gap-1 text-blue-100 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded text-[11px]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Audit Trail</span>
          </button>
          <span className="text-blue-300 text-[11px] font-mono">Status: Live Demo</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Activity className="w-6 h-6 animate-pulse-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  MediSync
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
                  Sovereign Health
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5">
                Zero-Loss Cross-Provider Patient Health Passport
              </p>
            </div>
          </div>

          {/* Center: Role Switcher (Crucial for Demoing) */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setRole('patient')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'patient'
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Patient Portal</span>
            </button>

            <button
              onClick={() => setRole('doctor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                role === 'doctor'
                  ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
              <span>Doctor Clinic (OPD)</span>
              {isDoctorUnlocked && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 ring-2 ring-white"></span>
              )}
            </button>

            <button
              onClick={() => setRole('er')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'er'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-red-700 hover:bg-red-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Emergency (ER)</span>
            </button>
          </div>

          {/* Right Action Tools: Patient Picker & Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Patient Switcher */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg px-2.5 py-1.5 cursor-pointer text-xs">
                <img
                  src={activePatient.avatar}
                  alt={activePatient.name}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200"
                />
                <div className="text-left hidden lg:block">
                  <p className="font-semibold text-slate-800 leading-tight">{activePatient.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{activePatient.bloodGroup} • {activePatient.age}y</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Demo Patient
                </div>
                {patients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => switchPatient(p.id)}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 text-xs transition-colors ${
                      p.id === activePatient.id ? 'bg-blue-50/70 font-semibold text-blue-700' : 'text-slate-700'
                    }`}
                  >
                    <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span>{p.name}</span>
                        {p.id === activePatient.id && (
                          <span className="text-[9px] bg-blue-100 text-blue-700 px-1 rounded">Active</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {p.chronicConditions[0]?.condition}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Consent Share Button */}
            <button
              onClick={() => setIsConsentModalOpen(true)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-semibold shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02]"
              title="Generate Scoped 6-Digit Doctor Access PIN"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share with Doctor</span>
              {activeTokensCount > 0 && (
                <span className="bg-blue-400/30 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {activeTokensCount}
                </span>
              )}
            </button>

            {/* Emergency ICE Button */}
            <button
              onClick={() => setIsIceModalOpen(true)}
              className="flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-800 border border-red-200 px-2.5 py-2 rounded-lg text-xs font-bold transition-all"
              title="Open Emergency ICE Medical Pass"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden md:inline">ICE Card</span>
            </button>
          </div>

        </div>
      </div>

      {/* Floating System Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium ${
            notification.type === 'success' 
              ? 'bg-emerald-900 text-white border-emerald-700' 
              : notification.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            {notification.type === 'success' && <Sparkles className="w-4 h-4 text-emerald-400" />}
            {notification.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
            {notification.type === 'info' && <Bell className="w-4 h-4 text-blue-400" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </header>
  );
};
