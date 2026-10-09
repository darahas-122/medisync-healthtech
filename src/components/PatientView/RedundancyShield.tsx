import React from 'react';
import { ShieldCheck, IndianRupee, Syringe, Clock, CheckCircle2, TrendingDown } from 'lucide-react';

export const RedundancyShield: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-2xl p-6 shadow-md mb-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Diagnostic Redundancy Shield Active
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">| Zero Duplicate Healthcare Waste</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Preventing Repeated Diagnostic Tests & Conflicting Prescriptions
          </h3>
          <p className="text-xs text-blue-200/90 mt-1 max-w-2xl leading-relaxed">
            Because your health records travel with you, doctors see recent results instantly. 
            No repeated venipunctures, zero duplicate CT/Echo scans, and complete protection against accidental drug clashes.
          </p>
        </div>

        {/* Quantified impact badges for the hackathon judges! */}
        <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shrink-0">
          <div className="text-center px-2">
            <span className="flex items-center justify-center text-emerald-400 mb-0.5">
              <TrendingDown className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-base sm:text-lg text-white font-mono block">₹3,750</span>
            <span className="text-[10px] text-slate-300 font-medium">Saved in 90 Days</span>
          </div>

          <div className="text-center px-2 border-x border-white/10">
            <span className="flex items-center justify-center text-sky-400 mb-0.5">
              <Syringe className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-base sm:text-lg text-white font-mono block">2 Tests</span>
            <span className="text-[10px] text-slate-300 font-medium">Blooddrafts Avoided</span>
          </div>

          <div className="text-center px-2">
            <span className="flex items-center justify-center text-amber-400 mb-0.5">
              <Clock className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-base sm:text-lg text-white font-mono block">4.5 hrs</span>
            <span className="text-[10px] text-slate-300 font-medium">Wait Time Saved</span>
          </div>
        </div>
      </div>

      {/* Concrete Avoided Duplication Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10 text-xs text-slate-300 relative z-10">
        <div className="flex items-start gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">HbA1c & Fasting Glucose (₹850):</span> Shared from Apollo Diagnostics directly to Dr. Ramanathan. Duplicate blood collection bypassed.
          </div>
        </div>
        <div className="flex items-start gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Transthoracic 2D Echo (₹2,800):</span> Report & images from City Heart Diagnostics recognized at Fortis Malar Hospital without repeat echocardiography.
          </div>
        </div>
      </div>
    </div>
  );
};
