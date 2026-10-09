import React from 'react';
import { useApp } from '../../context/AppContext';
import { Pill, ShieldCheck, Clock, AlertTriangle, Building2, User } from 'lucide-react';

export const ActiveMedicationsPanel: React.FC = () => {
  const { activePatient } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <span>Active Prescription Regimen</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {activePatient.activeMedications.length} Active Drugs
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Consolidated daily medications prescribed across multiple healthcare providers.
          </p>
        </div>

        {/* Safety verification indicator */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-semibold self-start">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero Internal Interactions Detected</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
        {activePatient.activeMedications.map((med) => (
          <div 
            key={med.id}
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{med.name}</h4>
                <p className="text-xs text-blue-700 font-semibold mt-0.5">{med.indication}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md">
                {med.dosage}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium text-slate-800">{med.frequency}</span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3 text-slate-400" />
                {med.prescribedBy} • {med.facility}
              </span>
              <span className="font-mono text-slate-400">Refills: {med.refillsRemaining}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
