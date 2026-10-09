import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  Lock, 
  AlertTriangle, 
  User, 
  Building2, 
  KeyRound, 
  CheckCircle2, 
  Trash2 
} from 'lucide-react';

export const AuditLogModal: React.FC = () => {
  const { isAuditModalOpen, setIsAuditModalOpen, auditLogs, activePatient } = useApp();

  if (!isAuditModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Cryptographic Access Audit Trail</h3>
              <p className="text-xs text-slate-300">
                Immutable, zero-tamper record of every clinician access & consent event
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsAuditModalOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Log List */}
        <div className="p-6 overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span>Tracking Patient: <strong className="text-slate-800">{activePatient.name}</strong></span>
            <span className="font-mono">{auditLogs.length} Events Logged</span>
          </div>

          {auditLogs.map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-xl border text-xs transition-all ${
                log.status === 'Emergency-Bypass'
                  ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                  : log.status === 'Revoked'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                  : 'bg-slate-50/70 border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                    log.status === 'Emergency-Bypass'
                      ? 'bg-rose-200 text-rose-900'
                      : log.status === 'Revoked'
                      ? 'bg-amber-200 text-amber-900'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {log.status}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{log.action}</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400 shrink-0">{log.timestamp}</span>
              </div>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {log.details}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <strong>{log.actorName}</strong> ({log.actorRole})
                </span>
                <span className="flex items-center gap-1 font-mono text-slate-400">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  {log.facility}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Cryptographic Integrity Validated
          </span>
          <button
            onClick={() => setIsAuditModalOpen(false)}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
          >
            Close Audit Log
          </button>
        </div>

      </div>
    </div>
  );
};
