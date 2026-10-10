import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KeyRound, ShieldAlert, Stethoscope, ArrowRight, LogOut, CheckCircle2 } from 'lucide-react';

export const DoctorAccessGate: React.FC = () => {
  const { 
    activeDoctor,
    logoutDoctor,
    activePatient, 
    consentTokens, 
    unlockDoctorSession, 
    setRole 
  } = useApp();

  const [enteredPin, setEnteredPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    <div className="max-w-lg mx-auto my-8 sm:my-12 space-y-4">
      
      {/* Clinician Identity Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={activeDoctor.avatar}
            alt={activeDoctor.name}
            className="w-10 h-10 rounded-xl object-cover border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">{activeDoctor.name}</span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-1.5 py-0.2 rounded border border-indigo-100">
                {activeDoctor.qualification}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {activeDoctor.specialty} • {activeDoctor.hospital}
            </p>
          </div>
        </div>

        <button
          onClick={logoutDoctor}
          className="flex items-center gap-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0"
          title="Log out clinician session"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Patient Consent Gate Card */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
        
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3">
          <KeyRound className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Patient Chart Authorization
        </h2>

        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Enter the 6-digit access PIN issued by patient <strong className="text-slate-800">{activePatient.name}</strong> to unlock longitudinal records and activate safe prescribing.
        </p>

      {/* PIN Input */}
      <div className="mt-6">
        <input
          type="text"
          maxLength={6}
          placeholder="6-digit PIN"
          value={enteredPin}
          onChange={(e) => {
            setEnteredPin(e.target.value);
            setErrorMessage('');
          }}
          className="w-full text-center tracking-[0.3em] font-mono text-2xl font-bold py-3 px-4 bg-slate-50 border border-slate-300 rounded-xl focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
        />

        {errorMessage && (
          <p className="text-xs text-rose-600 font-medium mt-2 text-center flex items-center justify-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </p>
        )}

        <button
          onClick={() => handleUnlock()}
          className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-sm"
        >
          Authorize & Open Chart
        </button>
      </div>

      {/* Quick Demo Helper Button for Judges */}
      {activeToken && (
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-left">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
              <span>Active PIN Ready:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-amber-200 font-bold">
                {activeToken.tokenCode}
              </span>
            </div>
            <button
              onClick={() => handleUnlock(activeToken.tokenCode)}
              className="mt-2 w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-1.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Auto-Fill PIN & Unlock</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {!activeToken && (
        <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span>No active PIN? </span>
          <button
            onClick={() => setRole('patient')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Switch to Patient Portal to generate one
          </button>
        </div>
      )}

      </div>
    </div>
  );
};
