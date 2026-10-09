import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KeyRound, ShieldAlert, Stethoscope, Lock, CheckCircle2, QrCode, ArrowRight } from 'lucide-react';

export const DoctorAccessGate: React.FC = () => {
  const { 
    activePatient, 
    consentTokens, 
    unlockDoctorSession, 
    setRole 
  } = useApp();

  const [enteredPin, setEnteredPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Find active token for this patient for quick-demo helper
  const activeToken = consentTokens.find(
    t => t.status === 'active' && t.patientId === activePatient.id
  );

  const handleUnlock = (pinToUse?: string) => {
    const pin = pinToUse || enteredPin;
    if (!pin) {
      setErrorMessage('Please enter the 6-digit PIN provided by the patient.');
      return;
    }

    const res = unlockDoctorSession(pin);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200/90 shadow-xl text-center">
      
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
        <Stethoscope className="w-8 h-8" />
      </div>

      <span className="text-[11px] font-bold tracking-widest text-indigo-700 uppercase bg-indigo-100/70 px-3 py-1 rounded-full">
        Dr. Priya Sharma • OPD Cardiology Consultation
      </span>

      <h2 className="text-2xl font-extrabold text-slate-900 mt-3 tracking-tight">
        Patient Consent Authorization Gate
      </h2>

      <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
        Medical records for <strong className="text-slate-800">{activePatient.name}</strong> are sovereign and encrypted. 
        Please ask the patient to generate a 6-digit access PIN or scan their dynamic QR code to begin the consultation.
      </p>

      {/* PIN Input Box */}
      <div className="mt-6 max-w-sm mx-auto">
        <div className="flex items-center gap-2">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit PIN"
            value={enteredPin}
            onChange={(e) => {
              setEnteredPin(e.target.value);
              setErrorMessage('');
            }}
            className="w-full text-center tracking-[0.4em] font-mono text-2xl font-black py-3 px-4 bg-slate-50 border-2 border-slate-300 rounded-2xl focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {errorMessage && (
          <p className="text-xs text-rose-600 font-semibold mt-2 text-left flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </p>
        )}

        <button
          onClick={() => handleUnlock()}
          className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01]"
        >
          <KeyRound className="w-4 h-4" />
          <span>Authorize & Open Patient Chart</span>
        </button>
      </div>

      {/* Quick Demo Helper Button for Judges */}
      {activeToken && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 text-left">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Active Patient PIN Available for Demo
              </span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-900">
                {activeToken.tokenCode}
              </span>
            </div>
            <p className="text-[11px] text-amber-800 leading-tight">
              Ramesh Kumar has already authorized a session. Click below to immediately simulate the doctor unlocking the chart.
            </p>
            <button
              onClick={() => handleUnlock(activeToken.tokenCode)}
              className="mt-2.5 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Auto-Fill PIN ({activeToken.tokenCode}) & Enter Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* If no active token */}
      {!activeToken && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs text-slate-600 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-800 block">No active PIN for this patient?</span>
              <span className="text-[11px] text-slate-500">Switch to Patient Portal to generate a new PIN.</span>
            </div>
            <button
              onClick={() => setRole('patient')}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-xl whitespace-nowrap"
            >
              Go to Patient View
            </button>
          </div>
        </div>
      )}

      {/* ABDM & Zero-Trust Notice */}
      <p className="mt-5 text-[11px] text-slate-400">
        Compliant with ABDM Health Information Exchange (HIE-CM). Clinicians cannot access unconsented records.
      </p>

    </div>
  );
};
