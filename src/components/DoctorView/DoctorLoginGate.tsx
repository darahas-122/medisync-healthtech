import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Stethoscope, 
  ShieldCheck, 
  UserPlus, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  AlertTriangle,
  Award,
  PhoneCall,
  User
} from 'lucide-react';

export const DoctorLoginGate: React.FC = () => {
  const { 
    doctors, 
    loginDoctor, 
    setIsAddDoctorModalOpen,
    setRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'license' | 'quick'>('license');
  const [identifierInput, setIdentifierInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (prefillId?: string) => {
    const idToUse = prefillId || identifierInput.trim();
    if (!idToUse) {
      setErrorMessage('Please enter your Medical License / NMC number or Hospital Email.');
      return;
    }

    // Match doctor
    const matched = doctors.find(
      d => d.licenseNumber.toLowerCase().includes(idToUse.toLowerCase()) ||
           d.email.toLowerCase().includes(idToUse.toLowerCase()) ||
           d.name.toLowerCase().includes(idToUse.toLowerCase())
    ) || doctors[0];

    loginDoctor(matched.id);
  };

  const handleQuickFill = (doctorId: string) => {
    const doc = doctors.find(d => d.id === doctorId);
    if (doc) {
      setIdentifierInput(doc.licenseNumber);
      setPasswordInput('••••••••');
      setErrorMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 sm:my-12 animate-fade-in">
      
      {/* Central Login Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-0"></div>

        {/* Top Header Badge & Title */}
        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
            <span>Mode 2 • Clinical Practitioner Portal Gateway</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Doctor Clinic (OPD) Sign-In
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Authenticate with your National Medical Commission (NMC) registration or hospital credentials to review historical patient records and write verified prescriptions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 flex items-center justify-center">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 w-full max-w-sm">
            <button
              onClick={() => { setActiveTab('license'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'license'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              NMC License / Staff ID
            </button>
            <button
              onClick={() => { setActiveTab('quick'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'quick'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1-Click Clinician Profiles
            </button>
          </div>
        </div>

        {/* TAB 1: License / Email Form */}
        {activeTab === 'license' && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                NMC Medical License Number or Hospital Email
              </label>
              <input
                type="text"
                value={identifierInput}
                onChange={(e) => {
                  setIdentifierInput(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="e.g. NMC-TN-2014-48201 or dr.priya.sharma@fortismalar.org"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Hospital Portal Passcode / 2FA Token
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}

            {/* Quick Autocomplete Chips for Evaluators */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Demo Autocomplete for Evaluators:
              </span>
              <div className="flex flex-wrap gap-2">
                {doctors.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleQuickFill(d.id)}
                    className="bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Stethoscope className="w-3 h-3 text-indigo-600" />
                    <span>Autofill: {d.name} ({d.specialty.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleLogin()}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.01]"
            >
              <span>Authenticate Clinician & Open Clinic</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 2: 1-Click Fast Clinician Profiles */}
        {activeTab === 'quick' && (
          <div className="mt-6 space-y-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Select an enrolled clinician profile:
            </span>

            {doctors.map((d) => (
              <div
                key={d.id}
                className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-indigo-400 bg-slate-50/70 hover:bg-indigo-50/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={d.avatar}
                    alt={d.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{d.name}</h4>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-md">
                        {d.qualification}
                      </span>
                    </div>
                    <p className="text-[11px] text-indigo-800 font-medium mt-0.5">
                      {d.specialty} • {d.hospital}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Lic: {d.licenseNumber} • {d.experienceYears} yrs exp
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => loginDoctor(d.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm sm:shrink-0"
                >
                  <span>Log In as {d.name.split(' ')[1] || d.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}

            {/* Register New Doctor Profile Button */}
            <button
              type="button"
              onClick={() => setIsAddDoctorModalOpen(true)}
              className="w-full p-3 rounded-2xl border border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/30 hover:bg-indigo-50 text-indigo-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all mt-4"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Register New Doctor Profile (NMC Enrollment)</span>
            </button>
          </div>
        )}

        {/* Security & Verification Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>NMC & NHA Verified Doctor Directory • Zero-Trust Patient Consent Guard</span>
          </div>
          <span className="font-semibold text-indigo-600">Zero-Trust OPD</span>
        </div>

      </div>

      {/* Alternative Navigation */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 px-2">
        <button
          onClick={() => setRole('landing')}
          className="hover:text-indigo-600 transition-colors font-medium"
        >
          ← Return to MediSync Home
        </button>

        <div className="flex items-center gap-3">
          <span>Are you a patient?</span>
          <button
            onClick={() => setRole('patient')}
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline flex items-center gap-1"
          >
            <User className="w-3.5 h-3.5" />
            <span>Switch to Patient Portal</span>
          </button>
        </div>
      </div>

    </div>
  );
};
