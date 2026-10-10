import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { PatientDashboard } from './components/PatientView/PatientDashboard';
import { DoctorAccessGate } from './components/DoctorView/DoctorAccessGate';
import { DoctorConsultationWorkspace } from './components/DoctorView/DoctorConsultationWorkspace';
import { EmergencyPortal } from './components/EmergencyView/EmergencyPortal';

// Modals
import { ConsentManagerModal } from './components/Modals/ConsentManagerModal';
import { EmergencyICECardModal } from './components/Modals/EmergencyICECardModal';
import { UploadRecordModal } from './components/Modals/UploadRecordModal';
import { PreviewAttachmentModal } from './components/Modals/PreviewAttachmentModal';
import { AuditLogModal } from './components/Modals/AuditLogModal';
import { AddPatientModal } from './components/Modals/AddPatientModal';

import { Activity, ShieldCheck, HeartPulse, Sparkles, ExternalLink, QrCode } from 'lucide-react';

const AppContent: React.FC = () => {
  const { role, setRole, isDoctorUnlocked, activePatient } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Patient Portal View */}
        {role === 'patient' && <PatientDashboard />}

        {/* Doctor Clinic OPD View */}
        {role === 'doctor' && (
          <div>
            {!isDoctorUnlocked ? (
              <DoctorAccessGate />
            ) : (
              <DoctorConsultationWorkspace />
            )}
          </div>
        )}

        {/* Emergency Triage View */}
        {role === 'er' && <EmergencyPortal />}

      </main>

      {/* Interactive Global Modals */}
      <ConsentManagerModal />
      <EmergencyICECardModal />
      <UploadRecordModal />
      <PreviewAttachmentModal />
      <AuditLogModal />
      <AddPatientModal />

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[11px] font-black">
              M
            </div>
            <span className="font-bold text-slate-800">MediSync</span>
            <span>—</span>
            <span>24-Hour Web Development Hackathon • IIITDM Kancheepuram</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <button 
              onClick={() => setRole('patient')} 
              className={`hover:text-blue-600 transition-colors ${role === 'patient' ? 'font-bold text-blue-600' : ''}`}
            >
              Patient Portal
            </button>
            <span>•</span>
            <button 
              onClick={() => setRole('doctor')} 
              className={`hover:text-indigo-600 transition-colors ${role === 'doctor' ? 'font-bold text-indigo-600' : ''}`}
            >
              Doctor Clinic OPD
            </button>
            <span>•</span>
            <button 
              onClick={() => setRole('er')} 
              className={`hover:text-red-600 transition-colors ${role === 'er' ? 'font-bold text-red-600' : ''}`}
            >
              Emergency ER
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Problem: Lost in Transit (HealthTech Track)
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
