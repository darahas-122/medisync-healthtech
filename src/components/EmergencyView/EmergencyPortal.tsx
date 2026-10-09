import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  ShieldAlert, 
  PhoneCall, 
  Droplet, 
  Heart, 
  Activity, 
  Search, 
  CheckCircle2, 
  Flame, 
  Pill,
  Lock,
  ArrowRight
} from 'lucide-react';

export const EmergencyPortal: React.FC = () => {
  const { 
    patients, 
    activePatient, 
    switchPatient, 
    logEmergencyAccess, 
    setIsIceModalOpen 
  } = useApp();

  const [triageParamedic, setTriageParamedic] = useState('Paramedic Officer Rajesh (108 Ambulance Unit 14)');
  const [hasTriggeredOverride, setHasTriggeredOverride] = useState(true);

  const handleSimulateOverride = () => {
    logEmergencyAccess(triageParamedic, 'Trauma Center / Resuscitation Bay 1');
    setHasTriggeredOverride(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Emergency ER Top Warning Strip */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 animate-pulse">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white text-red-700 font-black px-2 py-0.5 rounded tracking-wider uppercase">
                Emergency Trauma Triage Mode
              </span>
              <span className="text-xs text-red-100 font-mono">Bypass Protocol Active</span>
            </div>
            <h2 className="text-xl font-black tracking-tight mt-0.5">
              Rapid Patient Resuscitation & Safety Profile
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsIceModalOpen(true)}
            className="bg-white text-red-700 hover:bg-red-50 text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition-all"
          >
            Open Fullscreen ICE Pass
          </button>
        </div>
      </div>

      {/* Quick Emergency Patient Switcher (if paramedic brings in a different casualty) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold">Triage Patient:</span>
          <span className="font-bold text-slate-900">{activePatient.name} ({activePatient.bloodGroup})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400">Switch Casualty:</span>
          {patients.map(p => (
            <button
              key={p.id}
              onClick={() => switchPatient(p.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                p.id === activePatient.id ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Resuscitation HUD (Heads-Up Display) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Blood Group & Primary Vitals Banner */}
        <div className="md:col-span-4 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-3xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold opacity-80 block">
              Blood Compatibility
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-5xl font-black font-mono tracking-tight">{activePatient.bloodGroup}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                Rh Positive
              </span>
            </div>
            <p className="text-xs text-red-100 mt-2 font-medium">
              Transfuse B+ or O+ red blood cells immediately if hemorrhagic shock presents.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-red-100">Baseline Blood Pressure:</span>
              <span className="font-mono font-bold">{activePatient.recentVitals.bloodPressure}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-100">Baseline Heart Rate:</span>
              <span className="font-mono font-bold">{activePatient.recentVitals.pulse}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-100">Known Diab. Status:</span>
              <span className="font-mono font-bold">HbA1c {activePatient.recentVitals.hba1c}</span>
            </div>
          </div>
        </div>

        {/* Life-Threatening Anaphylaxis Warnings */}
        <div className="md:col-span-8 bg-white rounded-3xl border-2 border-red-300 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-red-100">
              <div className="flex items-center gap-2 text-sm font-black text-red-900">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                <span>LETHAL ALLERGIES & CONTRAINDICATIONS</span>
              </div>
              <span className="text-[10px] bg-red-100 text-red-800 font-black px-2 py-0.5 rounded uppercase">
                DO NOT ADMINISTER
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {activePatient.allergies.map((allergy, i) => (
                <div key={i} className="bg-red-50/80 border border-red-200 rounded-2xl p-4">
                  <div className="flex items-center gap-1.5 text-red-950 font-bold text-sm">
                    <span className="text-red-600 font-black">•</span>
                    <span>{allergy.allergen}</span>
                  </div>
                  <p className="text-xs text-red-800 font-semibold mt-1">
                    Risk: {allergy.reaction}
                  </p>
                  <p className="text-[11px] text-red-700 mt-1">
                    Strictly avoid all penicillin/cephalosporin cross-derivatives or sulfa compounds.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Blood Thinners / Anticoagulant Alert */}
          <div className="mt-4 p-3.5 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Active Blood Thinner on Record:</strong> Clopidogrel 75mg daily. Caution: High bleeding risk during trauma surgery or spinal tap.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Emergency Contact & Triage Call Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Next of Kin Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Emergency Next of Kin
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            {activePatient.emergencyContact.name} ({activePatient.emergencyContact.relationship})
          </h3>
          <p className="text-slate-500 mt-0.5">{activePatient.address}</p>

          <a
            href={`tel:${activePatient.emergencyContact.phone}`}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-red-500/20"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {activePatient.emergencyContact.phone}</span>
          </a>
        </div>

        {/* Chronic Health Burden */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Documented Comorbidities
          </span>
          <ul className="mt-2 space-y-1.5 font-semibold text-slate-800">
            {activePatient.chronicConditions.map((c, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{c.condition}</span>
                <span className="text-[10px] text-slate-400">Since {c.diagnosedYear}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Audit Notice */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm text-xs flex flex-col justify-between">
          <div>
            <span className="text-slate-400 text-[10px] uppercase tracking-wider block">
              Emergency Audit Protocol
            </span>
            <p className="text-slate-300 mt-1 leading-relaxed">
              This triage view was unlocked under the Emergency ICE Exception. The action has been immutably logged into the patient's cryptographic audit trail.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-mono">
            Audit ID: ER-{Date.now().toString().slice(-6)}
          </div>
        </div>

      </div>

    </div>
  );
};
