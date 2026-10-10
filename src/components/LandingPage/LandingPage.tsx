import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  User, 
  Stethoscope, 
  AlertTriangle, 
  ShieldCheck, 
  KeyRound, 
  Clock, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Layers, 
  CheckCircle2, 
  UserPlus,
  LogIn
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    setRole, 
    patients, 
    loginAsPatient, 
    setIsAddPatientModalOpen,
    setIsAuditModalOpen
  } = useApp();

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      
      {/* Hero Section */}
      <div className="relative text-center max-w-3xl mx-auto pt-6 sm:pt-10">
        
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 shadow-sm">
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span>HealthTech Track • IIITDM Kancheepuram Hackathon</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Personal Medical Record & <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
            Secure Care Continuity
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          No more lost paper files or duplicate blood draws. MediSync unites scattered records across clinics, 
          lets patients share history securely via 6-digit PINs, and equips doctors with real-time prescribing safety.
        </p>

      </div>

      {/* Mode Selection Cards (The 2 Core Modes) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* MODE 1: PATIENT MODE */}
        <div className="bg-white rounded-3xl border-2 border-blue-100 hover:border-blue-300 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-0 pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-sm">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                    Mode 1 • Personal Records
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">Patient Portal</h2>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              Log in to view your complete personal health timeline. Inspect previous prescriptions, lab reports, and active medicines. Generate a secure 6-digit PIN to share with your doctor or upload paper documents.
            </p>

            {/* Login as Patient Options */}
            <div className="mt-5 space-y-3">
              <button
                onClick={() => setRole('patient')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
              >
                <span>Enter Patient Portal (Sign-In)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Or 1-Click Demo Sign-In:
                </span>

                <div className="space-y-2">
                  {patients.map(p => (
                    <button
                      key={p.id}
                      onClick={() => loginAsPatient(p.id)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50/70 hover:bg-blue-50/50 flex items-center justify-between transition-all text-left group/btn"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{p.name} ({p.age}y)</h4>
                          <p className="text-[10px] text-slate-500 font-mono">ABHA: {p.abhaId}</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover/btn:translate-x-0.5 transition-transform">
                        <span>Log In</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}

                  {/* Register New Patient */}
                  <button
                    onClick={() => setIsAddPatientModalOpen(true)}
                    className="w-full p-2.5 rounded-xl border border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50 text-blue-700 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Register New Patient Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Features: Timeline • Medications • Sharing PIN</span>
            <span className="font-semibold text-blue-600">Patient-Sovereign</span>
          </div>
        </div>

        {/* MODE 2: DOCTOR MODE */}
        <div className="bg-white rounded-3xl border-2 border-indigo-100 hover:border-indigo-300 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -z-0 pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md">
                    Mode 2 • Clinical Workspace
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">Doctor Clinic (OPD)</h2>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              Log in as the consulting physician. Enter the patient's 6-digit consent PIN to view all older records across clinics, prevent duplicate diagnostics, and safely write and sign new prescriptions.
            </p>

            {/* Doctor Clinician Card */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  PS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Dr. Priya Sharma, MD, DM</h4>
                  <p className="text-[11px] text-slate-500">Chief Interventional Cardiologist • Fortis Malar OPD</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-900 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>View older historical labs & hospital discharge summaries</span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-900 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Add new records & prescriptions with Drug-Drug Safety Radar</span>
                </div>
              </div>

              <button
                onClick={() => setRole('doctor')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.01]"
              >
                <span>Enter Doctor Clinic Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Protected by Patient 6-Digit PIN</span>
            <span className="font-semibold text-indigo-600">Zero-Trust HIE</span>
          </div>
        </div>

      </div>

      {/* Emergency Mode Banner (Quick Triage) */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Need Immediate Emergency Triage?</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Paramedics & trauma doctors can bypass logins using the Emergency ICE Protocol to view blood group, lethal allergies, and anticoagulants.
            </p>
          </div>
        </div>

        <button
          onClick={() => setRole('er')}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-sm"
        >
          <span>Open Emergency (ER) Mode</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Problem vs. Solution Pillars (Directly addressing Hackathon criteria) */}
      <div className="max-w-5xl mx-auto pt-6 border-t border-slate-200">
        <div className="text-center mb-8">
          <h3 className="text-lg font-bold text-slate-900">How MediSync Solves the Hackathon Problem</h3>
          <p className="text-xs text-slate-500 mt-1">Lost in Transit: Fragmented Medical Records and Repeated Care Across Providers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Unified Timeline</h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Aggregates paper Rx, Apollo blood reports, and Fortis discharge notes into one chronological stream.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Zero Repeat Tests</h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Recognizes outside lab diagnostics, saving ₹3,750 and preventing unnecessary needle sticks.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5">
              <KeyRound className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Scoped Consent PIN</h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Patient grants 15-minute access to doctors with 1-click immediate revocation control.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2.5">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Safe Prescribing</h4>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Autonomous radar alerts doctors to fatal penicillin allergies and dangerous drug-drug interactions.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
