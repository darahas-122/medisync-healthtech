import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  User, 
  Stethoscope, 
  AlertTriangle, 
  ShieldCheck, 
  KeyRound, 
  ChevronDown,
  Sparkles,
  Bell
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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  MediSync
                </span>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md hidden sm:inline">
                  Care Continuity
                </span>
              </div>
            </div>
          </div>

          {/* Clean Segmented Navigation (Role Switcher) */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setRole('patient')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'patient'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Patient</span>
            </button>

            <button
              onClick={() => setRole('doctor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                role === 'doctor'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
              <span>Doctor OPD</span>
              {isDoctorUnlocked && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 ring-2 ring-white"></span>
              )}
            </button>

            <button
              onClick={() => setRole('er')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'er'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-red-700 hover:bg-red-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Emergency (ER)</span>
            </button>
          </div>

          {/* Right Tools: Patient Switcher & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Patient Switcher */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1.5 cursor-pointer text-xs transition-colors">
                <img
                  src={activePatient.avatar}
                  alt={activePatient.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-semibold text-slate-800 hidden md:inline">{activePatient.name}</span>
                <span className="text-[10px] text-slate-500 hidden lg:inline font-mono">({activePatient.bloodGroup})</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-lg py-1 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Patient
                </div>
                {patients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => switchPatient(p.id)}
                    className={`w-full px-3 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 text-xs transition-colors ${
                      p.id === activePatient.id ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700'
                    }`}
                  >
                    <img src={p.avatar} alt={p.name} className="w-6 h-6 rounded-full object-cover" />
                    <div>
                      <span>{p.name}</span>
                      <span className="text-[10px] text-slate-400 block">{p.age}y • {p.bloodGroup}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Share with Doctor PIN */}
            <button
              onClick={() => setIsConsentModalOpen(true)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
              title="Generate Scoped 6-Digit Doctor Access PIN"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share Records</span>
              {activeTokensCount > 0 && (
                <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {activeTokensCount}
                </span>
              )}
            </button>

            {/* Emergency ICE Button */}
            <button
              onClick={() => setIsIceModalOpen(true)}
              className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all"
              title="Open Emergency ICE Pass"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden md:inline">ICE Pass</span>
            </button>

            {/* Audit Trail Button */}
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="text-slate-500 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 transition-colors"
              title="View Cryptographic Access Audit Trail"
            >
              <ShieldCheck className="w-4 h-4 text-slate-600" />
            </button>

          </div>

        </div>
      </div>

      {/* Floating System Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-lg border text-xs font-semibold ${
            notification.type === 'success' 
              ? 'bg-slate-900 text-white border-slate-800' 
              : notification.type === 'error'
              ? 'bg-rose-900 text-white border-rose-800'
              : 'bg-slate-900 text-white border-slate-800'
          }`}>
            {notification.type === 'success' && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
            {notification.type === 'error' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
            {notification.type === 'info' && <Bell className="w-3.5 h-3.5 text-blue-400" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </header>
  );
};
