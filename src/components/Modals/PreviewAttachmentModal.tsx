import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, Download, Printer, ShieldCheck, CheckCircle } from 'lucide-react';

export const PreviewAttachmentModal: React.FC = () => {
  const { previewAttachment, setPreviewAttachment, activePatient } = useApp();

  if (!previewAttachment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="font-bold text-sm text-white">{previewAttachment.name}</h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {previewAttachment.recordTitle} • Verified Document
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setPreviewAttachment(null)}
              className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Simulated High-Res Document Body */}
        <div className="p-8 overflow-y-auto bg-slate-100 flex items-center justify-center min-h-[360px]">
          <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg border border-slate-300 text-slate-800 font-serif">
            {/* Simulated Medical Letterhead */}
            <div className="border-b-2 border-slate-800 pb-3 flex items-start justify-between">
              <div>
                <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-900">
                  Certified Clinical Record
                </h2>
                <p className="text-[11px] text-slate-600 font-sans">
                  ABHA Compliant Healthcare Provider Network
                </p>
              </div>
              <div className="text-right font-sans text-[10px] text-slate-500">
                <p>Doc ID: DOC-{Date.now().toString().slice(-6)}</p>
                <p>Tamper-Evident SHA-256 Verified</p>
              </div>
            </div>

            {/* Patient Header */}
            <div className="my-3 py-2 border-b border-slate-200 text-xs font-sans grid grid-cols-2 gap-2 text-slate-700">
              <div>
                <span className="text-slate-400 text-[10px] block">Patient Name</span>
                <strong>{activePatient.name}</strong> ({activePatient.gender}, {activePatient.age}y)
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">ABHA Identifier</span>
                <span className="font-mono">{activePatient.abhaId}</span>
              </div>
            </div>

            {/* Document Content */}
            <div className="my-4 font-sans text-xs space-y-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">{previewAttachment.recordTitle}</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Official clinical documentation archived within the patient's sovereign digital record. 
                  Digital signature verified with SHA-256 cryptographic certificate. All parameters reconciled with historical patient records.
                </p>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Zero discrepancies detected. Provider identity authenticated.</span>
              </div>
            </div>

            {/* Stamp */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between font-sans text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Verified Cross-Provider Continuity Record</span>
              </div>
              <div className="text-right text-slate-400 text-[10px]">
                Page 1 of 1
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">Status: Authenticated Read-Only</span>
          <button
            onClick={() => setPreviewAttachment(null)}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
};
