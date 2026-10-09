import React from 'react';
import { useApp } from '../../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  PhoneCall, 
  Droplet, 
  Heart, 
  FileCheck, 
  Printer, 
  Download,
  AlertOctagon
} from 'lucide-react';

export const EmergencyICECardModal: React.FC = () => {
  const { isIceModalOpen, setIsIceModalOpen, activePatient, logEmergencyAccess } = useApp();

  if (!isIceModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">Universal Emergency ICE Medical Pass</h3>
              <p className="text-[11px] text-red-100 font-mono">In Case of Emergency • Instant ER Triage Card</p>
            </div>
          </div>
          <button 
            onClick={() => setIsIceModalOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ICE Card Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Main Visual ICE Card */}
          <div className="border-2 border-red-500 rounded-2xl bg-gradient-to-b from-red-50/50 to-white p-5 shadow-sm relative">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-red-200">
              <div>
                <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded tracking-wider uppercase">
                  Paramedic Quick Triage
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">{activePatient.name}</h2>
                <p className="text-xs text-slate-500 font-mono">ABHA: {activePatient.abhaId}</p>
              </div>

              {/* Blood Group Flag */}
              <div className="bg-red-600 text-white p-2.5 rounded-xl text-center shadow-md shadow-red-500/20 shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-wider block opacity-90">Blood</span>
                <span className="text-2xl font-black leading-none block mt-0.5">{activePatient.bloodGroup}</span>
              </div>
            </div>

            {/* Critical Life-Threatening Warnings Banner */}
            <div className="mt-3 bg-red-100/90 border border-red-300 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs font-black text-red-900">
                <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
                <span>SEVERE ANAPHYLACTIC ALLERGIES</span>
              </div>
              <ul className="mt-1 space-y-0.5 text-xs font-bold text-red-800">
                {activePatient.allergies.map((a, i) => (
                  <li key={i}>• {a.allergen} ({a.reaction})</li>
                ))}
              </ul>
            </div>

            {/* High-Risk Active Medications (Anticoagulants / Blood Thinners) */}
            <div className="mt-3 bg-amber-50 border border-amber-300 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>ACTIVE BLOOD THINNERS & CARDIAC MEDICATIONS</span>
              </div>
              <p className="text-xs text-amber-900 mt-1 font-medium">
                Active Regimen: <strong className="font-bold">Clopidogrel 75mg</strong> (Antiplatelet), Telmisartan 40mg, Atorvastatin 20mg.
                <span className="text-[11px] text-amber-700 block mt-0.5">High bleeding liability during emergency surgery.</span>
              </p>
            </div>

            {/* Emergency Contacts */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Primary Next of Kin</span>
                <span className="font-bold text-slate-800">{activePatient.emergencyContact.name}</span>
                <span className="text-slate-500 block text-[11px]">({activePatient.emergencyContact.relationship})</span>
                <a 
                  href={`tel:${activePatient.emergencyContact.phone}`}
                  className="mt-1.5 inline-flex items-center gap-1 text-red-600 font-bold hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {activePatient.emergencyContact.phone}
                </a>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                <QRCodeSVG 
                  value={`medisync://ice?patient=${activePatient.id}&name=${encodeURIComponent(activePatient.name)}&blood=${activePatient.bloodGroup}`} 
                  size={64} 
                />
                <span className="text-[9px] text-slate-400 mt-1 font-mono">Scan for Instant Paramedic Bypass</span>
              </div>
            </div>

          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-700 block mb-0.5">Paramedic Emergency Protocol:</span>
            Scanning this card or entering ABHA in ER mode triggers zero-friction triage override while preserving full cryptographic audit trails.
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-2 rounded-xl"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Emergency Card</span>
          </button>

          <button
            onClick={() => {
              logEmergencyAccess('Paramedic Triage (108 Ambulance)', 'Emergency Unit 4');
              setIsIceModalOpen(false);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl shadow-md shadow-red-500/20"
          >
            <FileCheck className="w-4 h-4" />
            <span>Simulate Paramedic Scan</span>
          </button>
        </div>

      </div>
    </div>
  );
};
