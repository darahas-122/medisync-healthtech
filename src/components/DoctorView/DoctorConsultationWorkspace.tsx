import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { checkClinicalSafety, checkTestRedundancy, ClinicalSafetyReport, RedundancyWarning } from '../../utils/interactionChecker';
import { 
  Stethoscope, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Pill, 
  PlusCircle, 
  Clock, 
  Activity, 
  FileText, 
  Search, 
  Sparkles,
  Layers,
  Microscope,
  Info,
  Check
} from 'lucide-react';

export const DoctorConsultationWorkspace: React.FC = () => {
  const { 
    activePatient, 
    activePatientRecords, 
    activeDoctorToken, 
    lockDoctorSession, 
    addPrescriptionRecord,
    setPreviewAttachment
  } = useApp();

  const [activeTab, setActiveTab] = useState<'prescribe' | 'diagnostics' | 'history'>('prescribe');

  // Prescribing Form State
  const [candidateDrug, setCandidateDrug] = useState('');
  const [dosage, setDosage] = useState('500 mg');
  const [frequency, setFrequency] = useState('Twice daily after meals (BD)');
  const [duration, setDuration] = useState('7 days');
  const [instructions, setInstructions] = useState('Take with full glass of water.');
  const [diagnosis, setDiagnosis] = useState('Acute Exertional Angina Prophylaxis & Pain Relief');
  const [consultNotes, setConsultNotes] = useState('Routine review of ischemic symptoms. Blood pressure well controlled on Telmisartan.');

  // Lab Order State
  const [selectedLabTest, setSelectedLabTest] = useState('');
  const [redundancyWarning, setRedundancyWarning] = useState<RedundancyWarning | null>(null);

  // Real-time Clinical Safety Analysis
  const safetyReport: ClinicalSafetyReport = checkClinicalSafety(activePatient, candidateDrug);

  // Quick candidate drugs for hackathon demoing
  const demoDrugs = [
    { name: 'Ibuprofen', hint: 'Clashes with Clopidogrel (GI Bleed Risk)' },
    { name: 'Amoxicillin', hint: 'Triggers Penicillin Allergy' },
    { name: 'Spironolactone', hint: 'Clashes with Telmisartan (Hyperkalemia)' },
    { name: 'Paracetamol', hint: 'Safe Analgesic Alternative' },
    { name: 'Metoprolol Succinate', hint: 'Safe Beta-Blocker' },
  ];

  // Quick tests for redundancy demoing
  const demoTests = [
    { name: 'HbA1c (Glycated Hemoglobin)', reason: 'Done 14 days ago at Apollo' },
    { name: 'Transthoracic 2D Echo', reason: 'Done 2.5 months ago at City Heart' },
    { name: 'Lipid Profile', reason: 'Done 14 days ago at Apollo' },
    { name: 'Complete Blood Count (CBC)', reason: 'New test needed' },
  ];

  const handleTestSelect = (testName: string) => {
    setSelectedLabTest(testName);
    const warning = checkTestRedundancy(activePatientRecords, testName);
    setRedundancyWarning(warning);
  };

  const handleSignPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateDrug.trim()) return;

    addPrescriptionRecord(
      'Dr. Priya Sharma',
      'Chief Interventional Cardiologist',
      'Fortis Malar Hospital OPD',
      diagnosis,
      consultNotes,
      [
        {
          name: candidateDrug,
          dosage,
          frequency,
          duration,
          instructions,
        }
      ]
    );

    // Reset drug form
    setCandidateDrug('');
    setInstructions('Take with full glass of water.');
  };

  return (
    <div className="space-y-6">
      
      {/* Clinician Session Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">
                  Consultation Workspace — Dr. Priya Sharma
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Authorized OPD Session
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Patient: <strong className="text-white">{activePatient.name}</strong> ({activePatient.age}y, {activePatient.gender}, {activePatient.bloodGroup}) • ABHA: {activePatient.abhaId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Scope Granted</span>
              <span className="text-xs font-bold text-indigo-300 font-mono">
                {activeDoctorToken?.scope.toUpperCase() || 'FULL RECORD'}
              </span>
            </div>

            <button
              onClick={lockDoctorSession}
              className="flex items-center gap-1.5 bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-md shadow-rose-600/20"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>End & Lock Consultation</span>
            </button>
          </div>
        </div>

        {/* Real-time Patient Clinical Alerts (High-Risk Banner) */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Allergies Alert */}
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3">
            <span className="text-rose-400 font-bold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              Documented Allergies
            </span>
            <ul className="text-rose-200 text-xs font-semibold space-y-0.5">
              {activePatient.allergies.map((a, i) => (
                <li key={i}>• {a.allergen} ({a.reaction})</li>
              ))}
            </ul>
          </div>

          {/* Active Baseline Regimen */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
            <span className="text-blue-300 font-bold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
              <Pill className="w-3.5 h-3.5" />
              Current Baseline Regimen
            </span>
            <p className="text-blue-100 text-xs">
              {activePatient.activeMedications.map(m => m.name).join(', ')}
            </p>
          </div>

          {/* Diagnostic Context */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
            <span className="text-amber-300 font-bold flex items-center gap-1.5 mb-1 text-[11px] uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              Latest Lab Context (Apollo)
            </span>
            <p className="text-amber-100 text-xs">
              HbA1c: <strong>{activePatient.recentVitals.hba1c}</strong> • BP: <strong>{activePatient.recentVitals.bloodPressure}</strong> • Creatinine: 1.05 mg/dL
            </p>
          </div>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 border gap-2 shadow-sm">
        <button
          onClick={() => setActiveTab('prescribe')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'prescribe'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Smart Prescribing Pad & Safety Radar</span>
        </button>

        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'diagnostics'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Microscope className="w-4 h-4" />
          <span>Order Diagnostic & Redundancy Check</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Cross-Hospital Timeline ({activePatientRecords.length})</span>
        </button>
      </div>

      {/* TAB 1: SMART PRESCRIBING PAD */}
      {activeTab === 'prescribe' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Prescribing Input Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Write Clinical Prescription</h3>
                <p className="text-xs text-slate-500">Live safety validation against patient allergies and active medications</p>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-lg">
                Provider: Fortis Malar
              </span>
            </div>

            {/* Quick Demo Pill Selector */}
            <div className="mt-4">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Click a Demo Drug to Test Real-time Clinical Radar:
              </label>
              <div className="flex flex-wrap gap-2">
                {demoDrugs.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setCandidateDrug(d.name);
                      if (d.name === 'Ibuprofen') {
                        setDosage('400 mg');
                        setInstructions('Take after food for joint pain.');
                      } else if (d.name === 'Amoxicillin') {
                        setDosage('500 mg');
                        setInstructions('Take TDS for 5 days.');
                      } else if (d.name === 'Paracetamol') {
                        setDosage('650 mg');
                        setInstructions('Take SOS for pain or pyrexia.');
                      } else if (d.name === 'Spironolactone') {
                        setDosage('25 mg');
                        setInstructions('Once daily morning.');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                      candidateDrug.toLowerCase() === d.name.toLowerCase()
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{d.name}</span>
                    <span className="text-[10px] opacity-75 block font-normal">{d.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignPrescription} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Medication Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Ibuprofen, Amoxicillin, Paracetamol..."
                    value={candidateDrug}
                    onChange={(e) => setCandidateDrug(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-semibold text-slate-900"
                  />
                  {candidateDrug && (
                    <span className="absolute right-3 top-3 text-[11px] text-slate-400">
                      Analyzing safety...
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Dosage</label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Frequency</label>
                  <input
                    type="text"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Doctor's Instructions to Patient</label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Clinical Indication / Diagnosis</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {safetyReport.isSafe ? '✅ Safe to sign and dispatch' : '⚠️ Review contraindications before signing'}
                </span>
                <button
                  type="submit"
                  disabled={!candidateDrug.trim() || !safetyReport.isSafe}
                  className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all ${
                    safetyReport.isSafe && candidateDrug.trim()
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 hover:scale-[1.02]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Digitally Sign & Sync to Patient Timeline</span>
                </button>
              </div>
            </form>
          </div>

          {/* Real-time Safety Radar Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-indigo-600" />
                  <span>Real-time Clinical Safety Radar</span>
                </h4>
                <span className="text-[10px] font-mono uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                  Autonomous Verification
                </span>
              </div>

              {!candidateDrug ? (
                <div className="py-12 text-center text-slate-400">
                  <Pill className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  <p className="text-xs font-medium">Type or select a medication to analyze safety.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  
                  {/* Allergy Warnings */}
                  {safetyReport.allergyConflicts.length > 0 && (
                    <div className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-950">
                      <div className="flex items-center gap-2 text-xs font-black text-rose-900 mb-1">
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>FATAL ANAPHYLAXIS CONTRAINDICATION</span>
                      </div>
                      {safetyReport.allergyConflicts.map((conf, i) => (
                        <div key={i} className="text-xs space-y-1">
                          <p className="font-bold text-rose-900">
                            Patient has severe allergy to {conf.allergen}!
                          </p>
                          <p className="text-[11px] text-rose-800 leading-relaxed">
                            {conf.reaction}
                          </p>
                          <div className="bg-white/80 p-2 rounded-lg border border-rose-200 text-[11px] font-medium text-rose-900 mt-2">
                            Recommendation: <strong>Do NOT administer.</strong> Use Macrolide (Azithromycin) or non-beta-lactam alternative.
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Drug-Drug Interactions */}
                  {safetyReport.drugInteractions.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950">
                      <div className="flex items-center gap-2 text-xs font-black text-amber-900 mb-1">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>CRITICAL DRUG-DRUG INTERACTION DETECTED</span>
                      </div>
                      {safetyReport.drugInteractions.map((ddi, i) => (
                        <div key={i} className="text-xs space-y-1.5 mt-2">
                          <p className="font-bold text-amber-950">
                            Clash between {candidateDrug} ↔ {ddi.interactingDrug}
                          </p>
                          <p className="text-[11px] text-amber-900 leading-tight">
                            <strong>Mechanism:</strong> {ddi.mechanism}
                          </p>
                          <p className="text-[11px] text-rose-900 font-semibold">
                            <strong>Clinical Risk:</strong> {ddi.clinicalImpact}
                          </p>
                          <div className="bg-white/80 p-2 rounded-lg border border-amber-200 text-[11px] font-medium text-amber-900">
                            <strong>Safe Alternative:</strong> {ddi.recommendation}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Clean Bill of Health if Safe */}
                  {safetyReport.isSafe && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950">
                      <div className="flex items-center gap-2 text-xs font-black text-emerald-900 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>CLINICALLY SAFE TO PRESCRIBE</span>
                      </div>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        No contraindications found against documented allergies ({activePatient.allergies.map(a => a.allergen).join(', ')}) or active medications ({activePatient.activeMedications.map(m => m.name).join(', ')}).
                      </p>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Reference info */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block mb-1">Why this wins hackathons:</span>
              In standard clinics, doctors lack the patient's full regimen from outside providers and prescribe interacting drugs. MediSync's sovereign timeline eliminates this blind spot entirely.
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: DIAGNOSTICS & REDUNDANCY PREVENTION */}
      {activeTab === 'diagnostics' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Microscope className="w-5 h-5 text-indigo-600" />
              <span>Diagnostic Requisition & Redundancy Prevention Radar</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Before re-ordering expensive blood tests or imaging scans, MediSync verifies recent cross-provider results.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Select a Test to Order:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {demoTests.map((t, i) => (
                <button
                  key={i}
                  onClick={() => handleTestSelect(t.name)}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                    selectedLabTest === t.name
                      ? 'border-indigo-600 bg-indigo-50/70 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-bold block text-slate-900">{t.name}</span>
                  <span className="text-[11px] text-slate-500 mt-1 block font-normal">{t.reason}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Redundancy Radar Result */}
          {redundancyWarning ? (
            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950">
              <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                <div className="flex items-center gap-2 text-sm font-black text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>DIAGNOSTIC REDUNDANCY DETECTED — RE-TEST UNNECESSARY</span>
                </div>
                <span className="text-xs font-mono font-bold bg-white text-emerald-800 px-2.5 py-1 rounded-lg border border-amber-200">
                  Savings: ₹{redundancyWarning.estimatedCostSaved}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <p>
                    <strong className="text-slate-700">Previous Test:</strong> {redundancyWarning.testName}
                  </p>
                  <p>
                    <strong className="text-slate-700">Conducted By:</strong> {redundancyWarning.facility} ({redundancyWarning.daysAgo} days ago on {redundancyWarning.previousDate})
                  </p>
                  <p>
                    <strong className="text-slate-700">Previous Finding:</strong> <span className="font-mono font-bold text-slate-900">{redundancyWarning.previousResult}</span>
                  </p>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-amber-200 text-amber-900 leading-relaxed">
                  <span className="font-bold block text-[11px] uppercase tracking-wider text-amber-800 mb-1">
                    Clinical Practice Guideline:
                  </span>
                  {redundancyWarning.clinicalGuideline}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200 flex items-center justify-between">
                <span className="text-xs text-amber-800">
                  Recognizing the prior result saves the patient ₹{redundancyWarning.estimatedCostSaved} and avoids another needle stick.
                </span>
                <button
                  onClick={() => setPreviewAttachment({ name: 'Apollo_CMP_HbA1c_Sept2026.pdf', recordTitle: redundancyWarning.testName })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all"
                >
                  Inspect Existing Diagnostic PDF
                </button>
              </div>
            </div>
          ) : selectedLabTest ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No recent test found for <strong>{selectedLabTest}</strong> within clinical validity window. Ordering is appropriate.</span>
              </div>
              <button className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs">
                Submit Lab Requisition
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* TAB 3: COMPLETE PATIENT HISTORY INSPECTION */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Longitudinal Patient Chart</h3>
              <p className="text-xs text-slate-500">Full authenticated read access granted under patient consent</p>
            </div>
            <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded-lg text-slate-600">
              {activePatientRecords.length} Cross-Hospital Records
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {activePatientRecords.map((rec) => (
              <div key={rec.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white text-xs transition-all">
                <div className="flex items-center justify-between pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{rec.title}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded uppercase font-semibold">
                      {rec.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="font-mono text-slate-400">{rec.date}</span>
                </div>

                <p className="text-slate-600 mt-1">{rec.summary}</p>
                <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-2">
                  <span>{rec.providerName}</span>
                  <span>•</span>
                  <span>{rec.doctorName} ({rec.doctorSpecialty})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
