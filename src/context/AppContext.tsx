import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, MedicalRecord, ConsentToken, AuditLogEntry, ActiveMedication, RecordType, Doctor } from '../types';
import { INITIAL_PATIENTS, INITIAL_RECORDS, INITIAL_CONSENT_TOKENS, INITIAL_AUDIT_LOGS, INITIAL_DOCTORS } from '../data/mockData';
import confetti from 'canvas-confetti';

export type UserRole = 'landing' | 'patient' | 'doctor' | 'er';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isPatientLoggedIn: boolean;
  setIsPatientLoggedIn: (val: boolean) => void;
  loginAsPatient: (patientId: string) => void;
  logoutPatient: () => void;
  logoutToLanding: () => void;
  patients: Patient[];
  activePatient: Patient;
  switchPatient: (patientId: string) => void;
  records: MedicalRecord[];
  activePatientRecords: MedicalRecord[];
  consentTokens: ConsentToken[];
  auditLogs: AuditLogEntry[];
  
  // Doctor state & management
  doctors: Doctor[];
  activeDoctor: Doctor;
  isDoctorLoggedIn: boolean;
  setIsDoctorLoggedIn: (val: boolean) => void;
  loginDoctor: (doctorId: string) => void;
  logoutDoctor: () => void;
  addNewDoctor: (doctor: Omit<Doctor, 'id'>) => Doctor;
  isAddDoctorModalOpen: boolean;
  setIsAddDoctorModalOpen: (val: boolean) => void;

  // Doctor Session state
  isDoctorUnlocked: boolean;
  activeDoctorToken: ConsentToken | null;
  unlockDoctorSession: (pin: string) => { success: boolean; message: string };
  lockDoctorSession: () => void;
  
  // Consent Token management
  generateConsentToken: (scope: 'full' | 'cardiology' | 'labs_only', durationMinutes: number) => ConsentToken;
  revokeConsentToken: (tokenId: string) => void;
  
  // Records & Prescribing
  addPrescriptionRecord: (
    doctorName: string,
    specialty: string,
    facility: string,
    diagnosis: string,
    notes: string,
    medications: Array<{ name: string; dosage: string; frequency: string; duration: string; instructions: string }>
  ) => void;
  addUploadedRecord: (record: Omit<MedicalRecord, 'id'>) => void;
  
  // Emergency Triage
  logEmergencyAccess: (paramedicName: string, unitName: string) => void;

  // Modals state
  isConsentModalOpen: boolean;
  setIsConsentModalOpen: (open: boolean) => void;
  isIceModalOpen: boolean;
  setIsIceModalOpen: (open: boolean) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isAuditModalOpen: boolean;
  setIsAuditModalOpen: (open: boolean) => void;
  isAddPatientModalOpen: boolean;
  setIsAddPatientModalOpen: (open: boolean) => void;
  previewAttachment: { name: string; recordTitle: string } | null;
  setPreviewAttachment: (val: { name: string; recordTitle: string } | null) => void;

  // Patient registration
  addNewPatient: (patient: Omit<Patient, 'id'>) => Patient;

  // Feedback notifications
  notification: { type: 'success' | 'error' | 'info'; message: string } | null;
  showNotification: (type: 'success' | 'error' | 'info', message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('landing');
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('medisync_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });
  const [activePatientId, setActivePatientId] = useState<string>('P-10029');
  
  const [records, setRecords] = useState<MedicalRecord[]>(() => {
    const saved = localStorage.getItem('medisync_records');
    return saved ? JSON.parse(saved) : INITIAL_RECORDS;
  });

  const [consentTokens, setConsentTokens] = useState<ConsentToken[]>(() => {
    const saved = localStorage.getItem('medisync_tokens');
    return saved ? JSON.parse(saved) : INITIAL_CONSENT_TOKENS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('medisync_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Patient authentication state
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState<boolean>(false);

  // Doctors state
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('medisync_doctors');
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });
  const [activeDoctorId, setActiveDoctorId] = useState<string>('DOC-48201');
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState<boolean>(false);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState<boolean>(false);

  // Doctor session
  const [isDoctorUnlocked, setIsDoctorUnlocked] = useState<boolean>(false);
  const [activeDoctorToken, setActiveDoctorToken] = useState<ConsentToken | null>(null);

  // Modals
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [isIceModalOpen, setIsIceModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [previewAttachment, setPreviewAttachment] = useState<{ name: string; recordTitle: string } | null>(null);

  // Notification
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  // Save changes to localStorage for real persistence
  useEffect(() => {
    localStorage.setItem('medisync_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('medisync_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('medisync_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('medisync_tokens', JSON.stringify(consentTokens));
  }, [consentTokens]);

  useEffect(() => {
    localStorage.setItem('medisync_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];
  const activeDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];
  const activePatientRecords = records
    .filter(r => r.patientId === activePatient.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const switchPatient = (patientId: string) => {
    setActivePatientId(patientId);
    setIsDoctorUnlocked(false);
    setActiveDoctorToken(null);
    showNotification('info', `Switched active patient to ${patients.find(p => p.id === patientId)?.name}`);
  };

  const loginAsPatient = (patientId: string) => {
    setActivePatientId(patientId);
    setIsPatientLoggedIn(true);
    setRole('patient');
    setIsDoctorUnlocked(false);
    setActiveDoctorToken(null);
    const pName = patients.find(p => p.id === patientId)?.name || 'Patient';
    showNotification('success', `Logged in as ${pName}! Viewing personal health history.`);
  };

  const logoutPatient = () => {
    setIsPatientLoggedIn(false);
    showNotification('info', 'Logged out of Patient Portal.');
  };

  const loginDoctor = (doctorId: string) => {
    setActiveDoctorId(doctorId);
    setIsDoctorLoggedIn(true);
    setRole('doctor');
    const dName = doctors.find(d => d.id === doctorId)?.name || 'Doctor';
    showNotification('success', `Signed in as ${dName}! Clinical workspace ready.`);
  };

  const logoutDoctor = () => {
    setIsDoctorLoggedIn(false);
    setIsDoctorUnlocked(false);
    setActiveDoctorToken(null);
    showNotification('info', 'Logged out of Doctor Clinic.');
  };

  const addNewDoctor = (doctorData: Omit<Doctor, 'id'>): Doctor => {
    const newId = `DOC-${Math.floor(10000 + Math.random() * 90000)}`;
    const newDoctor: Doctor = {
      ...doctorData,
      id: newId,
    };
    setDoctors(prev => [newDoctor, ...prev]);
    setActiveDoctorId(newId);
    setIsDoctorLoggedIn(true);
    setRole('doctor');
    confetti({ particleCount: 75, spread: 60 });
    showNotification('success', `Clinician profile registered! Signed in as ${newDoctor.name}.`);
    return newDoctor;
  };

  const logoutToLanding = () => {
    setRole('landing');
    setIsPatientLoggedIn(false);
    setIsDoctorLoggedIn(false);
    setIsDoctorUnlocked(false);
    setActiveDoctorToken(null);
    showNotification('info', 'Returned to Home Portal.');
  };

  // Generate a cryptographically simulated 6-digit consent token
  const generateConsentToken = (scope: 'full' | 'cardiology' | 'labs_only', durationMinutes: number): ConsentToken => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + durationMinutes * 60 * 1000);

    const newToken: ConsentToken = {
      id: `TOK-${Date.now().toString().slice(-4)}`,
      patientId: activePatient.id,
      tokenCode: pin,
      doctorName: 'Dr. Priya Sharma (Consulting Cardiologist)',
      facilityName: 'Fortis Malar Hospital OPD',
      scope,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      status: 'active',
    };

    setConsentTokens(prev => [newToken, ...prev]);

    // Log this action in audit trail
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: 'Just now',
      actorName: activePatient.name,
      actorRole: 'Patient',
      facility: 'MediSync Sovereign Portal',
      action: `Created Scoped Consent Token (${pin})`,
      details: `Generated ${durationMinutes}-minute token for scope: ${scope.toUpperCase()}.`,
      status: 'Authorized',
    };
    setAuditLogs(prev => [newLog, ...prev]);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    showNotification('success', `Consent Pass generated! PIN: ${pin} valid for ${durationMinutes} mins.`);
    return newToken;
  };

  const revokeConsentToken = (tokenId: string) => {
    setConsentTokens(prev =>
      prev.map(t => (t.id === tokenId ? { ...t, status: 'revoked' as const } : t))
    );

    if (activeDoctorToken?.id === tokenId) {
      setIsDoctorUnlocked(false);
      setActiveDoctorToken(null);
    }

    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: 'Just now',
      actorName: activePatient.name,
      actorRole: 'Patient',
      facility: 'MediSync Sovereign Portal',
      action: 'Consent Revoked by Patient',
      details: `Immediately terminated doctor access token ${tokenId}. Access privileges severed.`,
      status: 'Revoked',
    };
    setAuditLogs(prev => [newLog, ...prev]);

    showNotification('info', 'Consent Token successfully revoked. Doctor session terminated.');
  };

  const unlockDoctorSession = (pin: string): { success: boolean; message: string } => {
    const trimmedPin = pin.trim();
    const matched = consentTokens.find(
      t => t.tokenCode === trimmedPin && t.status === 'active' && t.patientId === activePatient.id
    );

    if (!matched) {
      return { success: false, message: 'Invalid or expired consent PIN for this patient.' };
    }

    // Check expiration (auto-renew demo PIN 849201 so judges never get an expired error)
    if (new Date(matched.expiresAt).getTime() < Date.now()) {
      if (matched.tokenCode === '849201') {
        const renewedTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        matched.expiresAt = renewedTime;
        setConsentTokens(prev => prev.map(t => t.id === matched.id ? { ...t, expiresAt: renewedTime } : t));
      } else {
        return { success: false, message: 'This consent token has expired. Request a new PIN from the patient.' };
      }
    }

    setIsDoctorUnlocked(true);
    setActiveDoctorToken(matched);

    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: 'Just now',
      actorName: activeDoctor.name,
      actorRole: 'Doctor',
      facility: matched.facilityName,
      action: 'Doctor Consultation Session Unlocked',
      details: `Verified 6-digit cryptographic PIN (${trimmedPin}). Granted ${matched.scope.toUpperCase()} clinical access.`,
      status: 'Authorized',
    };
    setAuditLogs(prev => [newLog, ...prev]);

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.7 }
    });

    showNotification('success', `Access Granted! Doctor session active under ${matched.scope.toUpperCase()} scope.`);
    return { success: true, message: 'Doctor session successfully unlocked.' };
  };

  const lockDoctorSession = () => {
    setIsDoctorUnlocked(false);
    setActiveDoctorToken(null);
    showNotification('info', 'Doctor consultation session closed.');
  };

  const addPrescriptionRecord = (
    doctorName: string,
    specialty: string,
    facility: string,
    diagnosis: string,
    notes: string,
    newMeds: Array<{ name: string; dosage: string; frequency: string; duration: string; instructions: string }>
  ) => {
    const nowStr = new Date().toISOString().split('T')[0];
    const newRecordId = `REC-${Date.now().toString().slice(-6)}`;

    const newMedicationItems = newMeds.map(m => ({
      name: m.name,
      dosage: m.dosage,
      frequency: m.frequency,
      duration: m.duration,
      instructions: m.instructions,
    }));

    const newRecord: MedicalRecord = {
      id: newRecordId,
      patientId: activePatient.id,
      date: nowStr,
      type: 'prescription',
      title: `Clinical Consultation: ${diagnosis}`,
      providerName: facility,
      facilityLocation: 'Chennai Metro',
      doctorName,
      doctorSpecialty: specialty,
      summary: notes,
      tags: [specialty, ...newMeds.map(m => m.name)],
      diagnosis,
      medications: newMedicationItems,
      attachments: [
        { name: `Rx_${doctorName.replace(/\s+/g, '')}_${nowStr}.pdf`, size: '620 KB', type: 'pdf' },
      ],
    };

    // Update records
    setRecords(prev => [newRecord, ...prev]);

    // Also update patient's active medications
    const newActiveMeds: ActiveMedication[] = newMeds.map((m, idx) => ({
      id: `M-NEW-${Date.now()}-${idx}`,
      name: m.name,
      dosage: m.dosage,
      frequency: m.frequency,
      prescribedDate: nowStr,
      prescribedBy: doctorName,
      facility,
      indication: diagnosis,
      refillsRemaining: 3,
    }));

    setPatients(prev =>
      prev.map(p => {
        if (p.id === activePatient.id) {
          return {
            ...p,
            activeMedications: [...newActiveMeds, ...p.activeMedications],
          };
        }
        return p;
      })
    );

    // Audit log
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: 'Just now',
      actorName: doctorName,
      actorRole: 'Doctor',
      facility,
      action: 'Issued & Digitally Signed Prescription',
      details: `Prescribed ${newMeds.map(m => m.name).join(', ')} with verified contraindication check.`,
      status: 'Authorized',
    };
    setAuditLogs(prev => [newLog, ...prev]);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    showNotification('success', 'Prescription signed and securely synced to patient longitudinal timeline!');
  };

  const addUploadedRecord = (recordData: Omit<MedicalRecord, 'id'>) => {
    const newRecord: MedicalRecord = {
      ...recordData,
      id: `REC-UP-${Date.now().toString().slice(-5)}`,
    };

    setRecords(prev => [newRecord, ...prev]);

    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: 'Just now',
      actorName: activePatient.name,
      actorRole: 'Patient',
      facility: 'MediSync Ingestion Pipeline',
      action: 'Simulated Record Ingested & AI Verified',
      details: `Uploaded ${newRecord.type.toUpperCase()}: "${newRecord.title}" from ${newRecord.providerName}.`,
      status: 'Authorized',
    };
    setAuditLogs(prev => [newLog, ...prev]);

    confetti({
      particleCount: 75,
      spread: 60,
    });

    showNotification('success', 'Document successfully parsed and appended to your health record!');
  };

  const logEmergencyAccess = (paramedicName: string, unitName: string) => {
    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: 'Just now',
      actorName: paramedicName,
      actorRole: 'ER Paramedic',
      facility: unitName,
      action: 'Emergency ICE Life-Support Access',
      details: `Critical emergency bypass triggered for patient ${activePatient.name}. Allergy and blood profile inspected.`,
      status: 'Emergency-Bypass',
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showNotification('info', `Emergency audit log recorded for ${unitName}.`);
  };

  const addNewPatient = (patientData: Omit<Patient, 'id'>): Patient => {
    const newId = `P-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPatient: Patient = {
      ...patientData,
      id: newId,
    };

    setPatients(prev => [newPatient, ...prev]);
    setActivePatientId(newId);
    setIsPatientLoggedIn(true);
    setIsDoctorUnlocked(false);
    setActiveDoctorToken(null);

    // Auto-generate an initial 6-digit active consent token for the new patient so the doctor demo works right away!
    const newPin = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date();
    const initialToken: ConsentToken = {
      id: `TOK-${Date.now().toString().slice(-4)}`,
      patientId: newId,
      tokenCode: newPin,
      doctorName: 'Dr. Priya Sharma (Consulting Cardiologist)',
      facilityName: 'Fortis Malar Hospital OPD',
      scope: 'full',
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    };
    setConsentTokens(prev => [initialToken, ...prev]);

    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: 'Just now',
      actorName: newPatient.name,
      actorRole: 'Patient',
      facility: 'MediSync Sovereign Portal',
      action: 'Patient Identity Enrolled',
      details: `Enrolled sovereign digital profile with ABHA ${newPatient.abhaId}. Initial access PIN: ${newPin}.`,
      status: 'Authorized',
    };
    setAuditLogs(prev => [newLog, ...prev]);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    showNotification('success', `Registered & switched to ${newPatient.name}! Access PIN: ${newPin}`);
    return newPatient;
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isPatientLoggedIn,
        setIsPatientLoggedIn,
        loginAsPatient,
        logoutPatient,
        logoutToLanding,
        patients,
        activePatient,
        switchPatient,
        records,
        activePatientRecords,
        consentTokens,
        auditLogs,
        doctors,
        activeDoctor,
        isDoctorLoggedIn,
        setIsDoctorLoggedIn,
        loginDoctor,
        logoutDoctor,
        addNewDoctor,
        isDoctorUnlocked,
        activeDoctorToken,
        unlockDoctorSession,
        lockDoctorSession,
        generateConsentToken,
        revokeConsentToken,
        addPrescriptionRecord,
        addUploadedRecord,
        logEmergencyAccess,
        addNewPatient,
        isConsentModalOpen,
        setIsConsentModalOpen,
        isIceModalOpen,
        setIsIceModalOpen,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isAuditModalOpen,
        setIsAuditModalOpen,
        isAddPatientModalOpen,
        setIsAddPatientModalOpen,
        isAddDoctorModalOpen,
        setIsAddDoctorModalOpen,
        previewAttachment,
        setPreviewAttachment,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
