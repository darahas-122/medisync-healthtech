import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Stethoscope, 
  Cpu, 
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { MedicalRecord, RecordType } from '../../types';

export const UploadRecordModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, activePatient, addUploadedRecord } = useApp();

  const [selectedPreset, setSelectedPreset] = useState<'rx' | 'lab' | 'custom'>('rx');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<string>('');

  // Form states
  const [title, setTitle] = useState('Ophthalmology Consult & Pressure Check');
  const [provider, setProvider] = useState('Sankara Nethralaya Eye Hospital');
  const [doctor, setDoctor] = useState('Dr. T. S. Ramesh');
  const [specialty, setSpecialty] = useState('Senior Glaucoma Specialist');
  const [recordType, setRecordType] = useState<RecordType>('prescription');
  const [summary, setSummary] = useState('Intraocular pressure evaluated. Advised Timolol 0.5% eye drops. Warned to avoid systemic beta-blocker duplication.');

  if (!isUploadModalOpen) return null;

  const handleSelectPreset = (preset: 'rx' | 'lab') => {
    setSelectedPreset(preset);
    if (preset === 'rx') {
      setTitle('Ophthalmology Consult & Pressure Check');
      setProvider('Sankara Nethralaya Eye Hospital');
      setDoctor('Dr. T. S. Ramesh');
      setSpecialty('Senior Glaucoma Specialist');
      setRecordType('prescription');
      setSummary('Intraocular pressure evaluated. Advised Brimonidine 0.2% eye drops twice daily.');
    } else {
      setTitle('Thyroid Stimulating Hormone (TSH) Screen');
      setProvider('Thyrocare Technologies Ltd.');
      setDoctor('Dr. K. Srinivas');
      setSpecialty('Pathologist');
      setRecordType('lab_report');
      setSummary('Serum TSH 2.45 uIU/mL within euthyroid reference interval (0.4 - 4.2). Normal thyroid function.');
    }
  };

  const handleSimulateAIParse = () => {
    setIsProcessing(true);
    setProcessStep('Preprocessing document image & deskewing...');

    setTimeout(() => {
      setProcessStep('Running Medical OCR & Handwriting Extraction...');
    }, 700);

    setTimeout(() => {
      setProcessStep('Applying Clinical Named Entity Recognition (NER)...');
    }, 1400);

    setTimeout(() => {
      setProcessStep('Verifying cross-provider duplicates & ICD-11 coding...');
    }, 2100);

    setTimeout(() => {
      setIsProcessing(false);
      
      const recordPayload: Omit<MedicalRecord, 'id'> = {
        patientId: activePatient.id,
        date: new Date().toISOString().split('T')[0],
        type: recordType,
        title,
        providerName: provider,
        facilityLocation: 'Chennai Metro',
        doctorName: doctor,
        doctorSpecialty: specialty,
        summary,
        tags: ['AI-Ingested', specialty, provider.split(' ')[0]],
        diagnosis: recordType === 'prescription' ? 'Ocular Hypertension / Glaucoma Screen' : 'Euthyroid State',
        attachments: [
          { name: `Scanned_${provider.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`, size: '920 KB', type: 'pdf' }
        ],
        ...(recordType === 'lab_report' ? {
          labResults: [
            { testName: 'Ultrasensitive TSH', value: '2.45', unit: 'uIU/mL', referenceRange: '0.40 - 4.20', status: 'normal' }
          ]
        } : {
          medications: [
            {
              name: 'Brimonidine Tartrate Ophthalmic',
              dosage: '0.2%',
              frequency: '1 drop in both eyes twice daily (1-0-1)',
              duration: '30 days',
              instructions: 'Press tear duct for 1 minute after instilling drops.'
            }
          ]
        })
      };

      addUploadedRecord(recordPayload);
      setIsUploadModalOpen(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <UploadCloud className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Ingest Paper Rx or Lab PDF</h3>
              <p className="text-xs text-blue-200">
                Bridge paper prescriptions & scattered lab reports into unified timeline
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsUploadModalOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Quick Preset Selector for Demo */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Choose a Demo Document to Ingest
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleSelectPreset('rx')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  selectedPreset === 'rx' 
                    ? 'border-blue-600 bg-blue-50/70 font-semibold' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold block text-slate-900">📄 Paper Rx from Eye Hospital</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Sankara Nethralaya (Dr. Ramesh)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectPreset('lab')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  selectedPreset === 'lab' 
                    ? 'border-blue-600 bg-blue-50/70 font-semibold' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="font-bold block text-slate-900">🧪 Scanned Lab PDF</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Thyrocare Thyroid Profile</span>
              </button>
            </div>
          </div>

          {/* Document Preview Box */}
          <div className="border border-dashed border-blue-300 rounded-2xl bg-blue-50/40 p-4 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-1.5" />
            <p className="font-bold text-xs text-slate-800">{title}</p>
            <p className="text-[11px] text-slate-500">{provider} • {doctor}</p>
            <span className="inline-block mt-2 text-[10px] bg-blue-200/60 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
              Format: 300 DPI Medical Scan
            </span>
          </div>

          {/* Form Inputs (Pre-filled for rapid demo) */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Healthcare Facility / Provider Name</label>
              <input
                type="text"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Doctor Name</label>
                <input
                  type="text"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Doctor Specialty</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Extracted Clinical Summary</label>
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Live AI Processing Indicator */}
          {isProcessing && (
            <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-pulse">
              <Cpu className="w-6 h-6 text-blue-400 shrink-0 animate-spin" />
              <div>
                <p className="text-xs font-bold text-blue-300">AI Medical OCR Engine Active</p>
                <p className="text-xs font-mono text-slate-300 mt-0.5">{processStep}</p>
              </div>
            </div>
          )}

        </div>

        {/* Action Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            onClick={handleSimulateAIParse}
            disabled={isProcessing}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{isProcessing ? 'Processing Document...' : 'Run AI Extraction & Ingest'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
