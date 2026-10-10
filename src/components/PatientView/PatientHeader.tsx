import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FilePlus2, 
  QrCode, 
  ShieldAlert, 
  PhoneCall, 
  Droplet,
  AlertCircle,
  LogOut
} from 'lucide-react';

export const PatientHeader: React.FC = () => {
  const { 
    activePatient, 
    logoutPatient,
    setIsConsentModalOpen, 
    setIsIceModalOpen, 
    setIsUploadModalOpen 
  } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-6">
      
      {/* Top Row: Identity & Primary Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-100">
        
        {/* Patient Identity */}
        <div className="flex items-center gap-4">
          <img
            src={activePatient.avatar}
            alt={activePatient.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {activePatient.name}
              </h1>
              <span className="bg-slate-100 text-slate-700 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full border border-slate-200">
                ABHA: {activePatient.abhaId}
              </span>
              <span className="bg-rose-50 text-rose-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-rose-600 fill-rose-600" />
                {activePatient.bloodGroup}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
              <span>{activePatient.gender}, {activePatient.age} yrs</span>
              <span>•</span>
              <span>{activePatient.phone}</span>
              <span>•</span>
              <span className="text-slate-400">Emergency:</span>
              <span className="font-medium text-slate-700">{activePatient.emergencyContact.name} ({activePatient.emergencyContact.relationship})</span>
              <a 
                href={`tel:${activePatient.emergencyContact.phone}`} 
                className="text-blue-600 hover:underline flex items-center gap-0.5 font-medium"
              >
                <PhoneCall className="w-3 h-3" />
                {activePatient.emergencyContact.phone}
              </a>
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsConsentModalOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl font-semibold text-xs shadow-sm transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Share Access (PIN/QR)</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl font-semibold text-xs transition-all"
          >
            <FilePlus2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Upload Document</span>
          </button>

          <button
            onClick={() => setIsIceModalOpen(true)}
            className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-2 rounded-xl font-semibold text-xs transition-all"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Emergency ICE</span>
          </button>

          <button
            onClick={logoutPatient}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 hover:border-rose-200 px-3 py-2 rounded-xl font-semibold text-xs transition-all ml-1"
            title="Log out of Patient Portal"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-500 hover:text-rose-600" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Bottom Summary Bar: Clean, neat metrics & safety pills */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Key Vitals (Clean neutral card) */}
        <div className="md:col-span-5 bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex items-center justify-around text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Blood Pressure</span>
            <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">{activePatient.recentVitals.bloodPressure}</span>
          </div>
          <div className="h-7 w-px bg-slate-200"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">HbA1c</span>
            <span className="text-xs font-bold text-amber-700 font-mono mt-0.5 block">{activePatient.recentVitals.hba1c}</span>
          </div>
          <div className="h-7 w-px bg-slate-200"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Fasting Sugar</span>
            <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">{activePatient.recentVitals.fastingBloodSugar}</span>
          </div>
          <div className="h-7 w-px bg-slate-200"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Pulse</span>
            <span className="text-xs font-bold text-slate-800 font-mono mt-0.5 block">{activePatient.recentVitals.pulse}</span>
          </div>
        </div>

        {/* Chronic Conditions & Allergies Tags */}
        <div className="md:col-span-7 flex flex-col justify-center gap-2">
          
          {/* Allergies Pill row */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1 mr-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              Allergies:
            </span>
            {activePatient.allergies.map((allergy, i) => (
              <span key={i} className="bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-lg text-[11px] font-medium">
                {allergy.allergen} ({allergy.reaction})
              </span>
            ))}
          </div>

          {/* Chronic Conditions Pill row */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Conditions:</span>
            {activePatient.chronicConditions.map((c, i) => (
              <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg text-[11px] font-medium">
                {c.condition}
              </span>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
