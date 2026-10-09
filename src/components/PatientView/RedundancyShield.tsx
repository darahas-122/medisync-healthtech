import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingDown, Syringe, Clock } from 'lucide-react';

export const RedundancyShield: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        
        {/* Left: Summary */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Redundancy Protection Active
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Prevented Duplicate Diagnostics & Medication Conflicts
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
            Recent tests from outside labs are recognized by new doctors, preventing unnecessary repeat blood draws and cost waste.
          </p>
        </div>

        {/* Right: Metrics */}
        <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 border border-slate-100 p-2.5 sm:p-3 rounded-xl shrink-0">
          <div className="text-center px-2">
            <span className="font-extrabold text-sm sm:text-base text-emerald-600 font-mono block">₹3,750</span>
            <span className="text-[10px] text-slate-500 font-medium">Saved (90d)</span>
          </div>

          <div className="h-7 w-px bg-slate-200"></div>

          <div className="text-center px-2">
            <span className="font-extrabold text-sm sm:text-base text-slate-800 font-mono block">2 Tests</span>
            <span className="text-[10px] text-slate-500 font-medium">Re-Draws Avoided</span>
          </div>

          <div className="h-7 w-px bg-slate-200"></div>

          <div className="text-center px-2">
            <span className="font-extrabold text-sm sm:text-base text-slate-800 font-mono block">4.5 hrs</span>
            <span className="text-[10px] text-slate-500 font-medium">Wait Saved</span>
          </div>
        </div>

      </div>

      {/* Subtle details row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span><strong>Apollo HbA1c (₹850):</strong> Re-used by Dr. Ramanathan, avoiding repeat blood sample.</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span><strong>City Heart 2D Echo (₹2,800):</strong> Verified at Fortis Hospital without re-scanning.</span>
        </div>
      </div>
    </div>
  );
};
