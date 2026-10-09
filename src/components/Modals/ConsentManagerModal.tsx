import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  KeyRound, 
  QrCode, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  Trash2, 
  Check, 
  Copy,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

export const ConsentManagerModal: React.FC = () => {
  const { 
    isConsentModalOpen, 
    setIsConsentModalOpen, 
    activePatient,
    consentTokens, 
    generateConsentToken, 
    revokeConsentToken 
  } = useApp();

  const [selectedScope, setSelectedScope] = useState<'full' | 'cardiology' | 'labs_only'>('full');
  const [selectedDuration, setSelectedDuration] = useState<number>(30); // 30 minutes default
  const [activeTab, setActiveTab] = useState<'generate' | 'active'>('generate');
  const [copiedPin, setCopiedPin] = useState(false);

  if (!isConsentModalOpen) return null;

  const patientTokens = consentTokens.filter(t => t.patientId === activePatient.id);
  const activeTokens = patientTokens.filter(t => t.status === 'active');
  const latestToken = activeTokens[0];

  const handleGenerate = () => {
    generateConsentToken(selectedScope, selectedDuration);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Sovereign Doctor Consent Gateway</h3>
              <p className="text-xs text-blue-200">
                Grant granular, time-limited read access to your medical history
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsConsentModalOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold px-5 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('generate')}
            className={`pb-3 flex items-center gap-1.5 transition-all border-b-2 ${
              activeTab === 'generate'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Generate Doctor Access Pass</span>
          </button>

          <button
            onClick={() => setActiveTab('active')}
            className={`pb-3 flex items-center gap-1.5 transition-all border-b-2 ${
              activeTab === 'active'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Active Sessions ({activeTokens.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
          
          {activeTab === 'generate' && (
            <div className="space-y-5">
              
              {/* If an active token exists, show it prominently */}
              {latestToken ? (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-200 rounded-2xl p-5 text-center shadow-inner">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-800 mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>ACTIVE ACCESS PASS READY FOR DOCTOR SCAN</span>
                  </div>

                  {/* QR Code */}
                  <div className="bg-white p-3 rounded-xl inline-block shadow-md border border-blue-100 my-2">
                    <QRCodeSVG 
                      value={`medisync://auth?patient=${activePatient.id}&pin=${latestToken.tokenCode}&scope=${latestToken.scope}`}
                      size={140}
                      level="H"
                      includeMargin={false}
                    />
                  </div>

                  {/* 6-Digit PIN Display */}
                  <div className="mt-2">
                    <span className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold block">
                      Doctor 6-Digit Access PIN
                    </span>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="font-mono text-3xl font-extrabold tracking-widest text-blue-900 bg-white px-4 py-1.5 rounded-xl border border-blue-200 shadow-sm">
                        {latestToken.tokenCode}
                      </span>
                      <button
                        onClick={() => copyToClipboard(latestToken.tokenCode)}
                        className="bg-white hover:bg-slate-100 text-slate-700 p-2 rounded-xl border border-slate-200 shadow-sm transition-all"
                        title="Copy PIN"
                      >
                        {copiedPin ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      Scope: {latestToken.scope.toUpperCase()}
                    </span>
                    <span>•</span>
                    <span className="text-slate-500">
                      Auto-terminates when consultation ends
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-blue-200/60 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Need to stop access right now?</span>
                    <button
                      onClick={() => revokeConsentToken(latestToken.id)}
                      className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Revoke Immediately
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Configure New Pass */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    1. Select Granular Access Scope
                  </h4>
                  <span className="text-[11px] text-slate-400">Zero-Trust Model</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setSelectedScope('full')}
                    className={`p-3 rounded-xl border text-left transition-all text-xs ${
                      selectedScope === 'full'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-slate-900 block">Full Record</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                      All prescriptions, labs, scans & hospital discharges.
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedScope('cardiology')}
                    className={`p-3 rounded-xl border text-left transition-all text-xs ${
                      selectedScope === 'cardiology'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-slate-900 block">Cardiology Only</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                      Echo 2D, ECG, blood pressure & cardiac meds only.
                    </span>
                  </button>

                  <button
                    onClick={() => setSelectedScope('labs_only')}
                    className={`p-3 rounded-xl border text-left transition-all text-xs ${
                      selectedScope === 'labs_only'
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold text-slate-900 block">Diagnostics Only</span>
                    <span className="text-[11px] text-slate-500 mt-0.5 block leading-tight">
                      Blood tests, HbA1c, and metabolic panels only.
                    </span>
                  </button>
                </div>

                {/* Duration Picker */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                    2. Select Expiry Duration
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 60, 1440].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setSelectedDuration(mins)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          selectedDuration === mins
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {mins === 15 ? '15 Minutes (OPD Quick)' : mins === 60 ? '1 Hour (Full Consult)' : '24 Hours (Day Care)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01]"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Generate New Encrypted Pass</span>
                </button>
              </div>

            </div>
          )}

          {activeTab === 'active' && (
            <div className="space-y-3">
              {activeTokens.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Lock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-600 text-sm">No active external doctor sessions</p>
                  <p className="text-xs text-slate-400 mt-1">Your medical records are fully locked and sovereign.</p>
                </div>
              ) : (
                activeTokens.map((token) => (
                  <div 
                    key={token.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                          PIN: {token.tokenCode}
                        </span>
                        <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 mt-1">{token.doctorName}</p>
                      <p className="text-[11px] text-slate-500">{token.facilityName} • Scope: {token.scope.toUpperCase()}</p>
                    </div>

                    <button
                      onClick={() => revokeConsentToken(token.id)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Revoke</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-500">
          Consent is cryptographically verified under patient sovereign control. No hospital retains permanent records without ongoing consent.
        </div>
      </div>
    </div>
  );
};
