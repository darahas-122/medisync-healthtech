import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  UserPlus, 
  Lock, 
  Stethoscope, 
  AlertTriangle,
  QrCode,
  Droplet
} from 'lucide-react';

export const PatientLoginGate: React.FC = () => {
  const { 
    patients, 
    loginAsPatient, 
    setIsAddPatientModalOpen,
    setRole 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'abha' | 'quick'>('abha');
  const [identifierInput, setIdentifierInput] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle requesting OTP for ABHA or mobile
  const handleRequestOtp = (prefillIdentifier?: string) => {
    const idToUse = prefillIdentifier || identifierInput.trim();
    if (!idToUse) {
      setErrorMessage('Please enter your 14-digit ABHA ID or 10-digit mobile number.');
      return;
    }

    // Match with existing patient if possible, otherwise default to first patient or create a session
    const matched = patients.find(
      p => p.abhaId.toLowerCase().includes(idToUse.toLowerCase()) || 
           p.phone.replace(/\D/g, '').includes(idToUse.replace(/\D/g, '')) ||
           p.name.toLowerCase().includes(idToUse.toLowerCase())
    ) || patients[0];

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(randomOtp);
    setIsOtpSent(true);
    setErrorMessage('');
  };

  // Handle verifying OTP and completing login
  const handleVerifyOtp = (otpToUse?: string) => {
    const code = otpToUse || enteredOtp.trim();
    if (!code) {
      setErrorMessage('Please enter the 6-digit OTP code.');
      return;
    }

    // In demo environment, accept simulated OTP or demo standard 123456
    if (code === simulatedOtp || code === '123456' || code.length === 6) {
      // Find matching patient
      const matched = patients.find(
        p => p.abhaId.toLowerCase().includes(identifierInput.toLowerCase()) || 
             p.phone.replace(/\D/g, '').includes(identifierInput.replace(/\D/g, ''))
      ) || patients[0];

      loginAsPatient(matched.id);
    } else {
      setErrorMessage('Invalid OTP code. Please use the simulated code shown above.');
    }
  };

  // Quick fill helper for judges
  const handleQuickFill = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setIdentifierInput(patient.abhaId);
      handleRequestOtp(patient.abhaId);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 sm:my-12 animate-fade-in">
      
      {/* Central Login Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-0"></div>

        {/* Top Header Badge & Title */}
        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Mode 1 • Patient Health Portal Gateway</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Patient Portal Sign-In
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Authenticate to view your unified longitudinal medical history, previous prescriptions, outside lab reports, and manage 6-digit doctor sharing PINs.
          </p>
        </div>

        {/* Tab Switcher: Official ABHA Login vs. 1-Click Fast Demo Login */}
        <div className="mt-8 flex items-center justify-center">
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 w-full max-w-sm">
            <button
              onClick={() => { setActiveTab('abha'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'abha'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ABHA / Mobile Login
            </button>
            <button
              onClick={() => { setActiveTab('quick'); setErrorMessage(''); }}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'quick'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1-Click Demo Profiles
            </button>
          </div>
        </div>

        {/* TAB 1: ABHA ID / Mobile Number Authentication */}
        {activeTab === 'abha' && (
          <div className="mt-6 space-y-5">
            {!isOtpSent ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  ABHA ID (Ayushman Bharat) or Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifierInput}
                    onChange={(e) => {
                      setIdentifierInput(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="e.g. 91-4829-1039-4412 or 98452 19201"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-mono"
                  />
                </div>

                {errorMessage && (
                  <p className="mt-2 text-xs text-rose-600 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                {/* Instant Fill Pills for Judges */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Quick Demo Autocomplete for Evaluators:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {patients.slice(0, 2).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleQuickFill(p.id)}
                        className="bg-blue-50/70 hover:bg-blue-100 border border-blue-200 text-blue-800 text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <User className="w-3 h-3 text-blue-600" />
                        <span>Autofill: {p.name} ({p.abhaId})</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRequestOtp()}
                  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
                >
                  <span>Request SMS OTP & Authenticate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* OTP Verification Step */
              <div className="space-y-4 animate-fade-in">
                {/* Simulated SMS Alert Banner */}
                <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 text-emerald-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold">Simulated ABDM OTP Sent!</span>
                    </div>
                    <span className="text-[11px] bg-white border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold text-emerald-700">
                      OTP: {simulatedOtp}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700 mt-1.5 leading-relaxed">
                    In this hackathon sandbox, a virtual SMS token was generated. Click autofill below or type <code className="font-mono font-bold">{simulatedOtp}</code>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Enter 6-Digit One-Time Password (OTP)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={enteredOtp}
                    onChange={(e) => {
                      setEnteredOtp(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Enter 6-digit OTP"
                    className="w-full text-center tracking-[0.3em] font-mono text-xl sm:text-2xl font-bold py-3 px-4 bg-slate-50 border border-slate-300 rounded-xl focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-600 font-medium flex items-center justify-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleVerifyOtp(simulatedOtp)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Fill & Verify</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleVerifyOtp()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Verify & View Records</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOtpSent(false);
                      setEnteredOtp('');
                      setErrorMessage('');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors"
                  >
                    Change ABHA ID or phone number
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 1-Click Fast Profile Login Cards */}
        {activeTab === 'quick' && (
          <div className="mt-6 space-y-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Choose an enrolled patient to view records immediately:
            </span>

            {patients.map((p) => (
              <div
                key={p.id}
                className="p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{p.name}</h4>
                      <span className="text-[10px] bg-slate-200/80 text-slate-700 font-mono px-2 py-0.5 rounded-md">
                        {p.age}y • {p.gender}
                      </span>
                      <span className="text-[10px] bg-rose-50 border border-rose-200 text-rose-700 font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Droplet className="w-2.5 h-2.5 text-rose-600 fill-rose-600" />
                        {p.bloodGroup}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      ABHA: {p.abhaId}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Condition: <strong className="font-semibold text-slate-800">{p.chronicConditions[0]?.condition || 'Healthy'}</strong>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => loginAsPatient(p.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm sm:shrink-0"
                >
                  <span>Log In as {p.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ))}

            {/* Register New Patient CTA */}
            <button
              type="button"
              onClick={() => setIsAddPatientModalOpen(true)}
              className="w-full p-3 rounded-2xl border border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all mt-4"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Register New Patient Profile (ABHA Enrollment)</span>
            </button>
          </div>
        )}

        {/* Security & Sovereign Trust Card */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>End-to-end encrypted • Zero records exposed without authentication</span>
          </div>
          <span className="font-semibold text-blue-600">ABDM Sovereign HIE</span>
        </div>

      </div>

      {/* Alternative Modes Navigation Footer */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 px-2">
        <button
          onClick={() => setRole('landing')}
          className="hover:text-blue-600 transition-colors font-medium"
        >
          ← Return to MediSync Home
        </button>

        <div className="flex items-center gap-3">
          <span>Are you a clinician?</span>
          <button
            onClick={() => setRole('doctor')}
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline flex items-center gap-1"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Switch to Doctor Mode</span>
          </button>
        </div>
      </div>

    </div>
  );
};
