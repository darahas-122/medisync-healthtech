import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  AlertOctagon, 
  FilePlus2, 
  QrCode, 
  ShieldAlert, 
  PhoneCall, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  Droplet
} from 'lucide-react';

export const PatientHeader: React.FC = () => {
  const { 
    activePatient, 
    setIsConsentModalOpen, 
    setIsIceModalOpen, 
    setIsUploadModalOpen 
  } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        
        {/* Patient Identity */}
        <div className="flex items-start sm:items-center gap-4">
          <img
            src={activePatient.avatar}
            alt={activePatient.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-500/30 shadow-md"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {activePatient.name}
              </h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                ABHA ID: {activePatient.abhaId}
              </span>
              <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-red-200">
                <Droplet className="w-3 h-3 text-red-600 fill-red-600" />
                {activePatient.bloodGroup}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{activePatient.gender}, {activePatient.age} Years</span>
              <span>•</span>
              <span>{activePatient.phone}</span>
              <span>•</span>
              <span className="truncate max-w-xs">{activePatient.address}</span>
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-600 mt-2">
              <span className="text-slate-400">Emergency Contact:</span>
              <span className="font-semibold text-slate-800">{activePatient.emergencyContact.name} ({activePatient.emergencyContact.relationship})</span>
              <a 
                href={`tel:${activePatient.emergencyContact.phone}`} 
                className="text-blue-600 hover:underline flex items-center gap-0.5 font-medium ml-1"
              >
                <PhoneCall className="w-3 h-3" />
                {activePatient.emergencyContact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Quick Action CTA Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
          <button
            onClick={() => setIsConsentModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
          >
            <QrCode className="w-4 h-4" />
            <span>Generate Doctor Access (PIN/QR)</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2.5 rounded-xl font-semibold text-xs border border-slate-300/80 transition-all"
          >
            <FilePlus2 className="w-4 h-4 text-slate-600" />
            <span>Upload Paper Rx / Lab</span>
          </button>

          <button
            onClick={() => setIsIceModalOpen(true)}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Emergency ICE Pass</span>
          </button>
        </div>
      </div>

      {/* Medical Safety Banners (Chronic Conditions & Critical Allergies) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        
        {/* Documented Allergies */}
        <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200">
          <div className="flex items-center justify-between text-xs font-bold text-rose-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              Documented Allergies
            </span>
            <span className="text-[10px] bg-rose-200 text-rose-900 px-1.5 py-0.5 rounded-md uppercase font-black">
              Critical
            </span>
          </div>
          <div className="space-y-1">
            {activePatient.allergies.map((allergy, i) => (
              <div key={i} className="text-xs text-rose-800 flex items-start gap-1">
                <span className="text-rose-500 font-bold">•</span>
                <span>
                  <strong className="font-semibold text-rose-950">{allergy.allergen}</strong>
                  <span className="text-[11px] text-rose-700 block">{allergy.reaction}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-amber-600" />
              Chronic Conditions
            </span>
            <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded-md font-bold">
              {activePatient.chronicConditions.length} Active
            </span>
          </div>
          <div className="space-y-1">
            {activePatient.chronicConditions.map((cond, i) => (
              <div key={i} className="text-xs text-amber-800 flex items-center justify-between">
                <span className="font-medium text-amber-950">{cond.condition}</span>
                <span className="text-[10px] text-amber-700">Since {cond.diagnosedYear}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Key Vitals */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
            <span>Recent Clinical Vitals</span>
            <span className="text-[10px] text-slate-500 font-normal">
              {activePatient.recentVitals.lastUpdated}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
              <span className="font-bold text-slate-800 font-mono">{activePatient.recentVitals.bloodPressure}</span>
            </div>
            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">HbA1c Level</span>
              <span className="font-bold text-amber-700 font-mono">{activePatient.recentVitals.hba1c}</span>
            </div>
            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Fasting Glucose</span>
              <span className="font-bold text-slate-800 font-mono">{activePatient.recentVitals.fastingBloodSugar}</span>
            </div>
            <div className="bg-white p-1.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Pulse Rate</span>
              <span className="font-bold text-slate-800 font-mono">{activePatient.recentVitals.pulse}</span>
            </div>
          </div>
        </div>

        {/* Longitudinal Sync Integrity */}
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Cross-Provider Sync
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-md font-bold">
                100% Up-to-Date
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 mt-1">
              Consolidated from Apollo Labs, MedPlus, Fortis Malar, and SRL Diagnostics without data loss.
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-700">
            <span>Sovereign Storage</span>
            <span className="font-semibold">Patient-Owned</span>
          </div>
        </div>

      </div>
    </div>
  );
};
