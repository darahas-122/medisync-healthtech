export type RecordType = 'prescription' | 'lab_report' | 'imaging' | 'consultation' | 'discharge_summary';

export interface MedicationItem {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  category?: string;
}

export interface LabTestItem {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  type: RecordType;
  title: string;
  providerName: string;
  facilityLocation: string;
  doctorName: string;
  doctorSpecialty: string;
  summary: string;
  tags: string[];
  medications?: MedicationItem[];
  labResults?: LabTestItem[];
  diagnosis?: string;
  vitals?: {
    bp?: string;
    pulse?: string;
    weight?: string;
    sugar?: string;
    spO2?: string;
  };
  attachments?: {
    name: string;
    size: string;
    type: 'pdf' | 'img';
  }[];
}

export interface ActiveMedication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedDate: string;
  prescribedBy: string;
  facility: string;
  indication: string;
  refillsRemaining: number;
}

export interface Patient {
  id: string;
  abhaId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  chronicConditions: {
    condition: string;
    diagnosedYear: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
  }[];
  allergies: {
    allergen: string;
    reaction: string;
    severity: 'Life-threatening' | 'Moderate' | 'Mild';
  }[];
  activeMedications: ActiveMedication[];
  recentVitals: {
    bloodPressure: string;
    fastingBloodSugar: string;
    hba1c: string;
    pulse: string;
    bmi: string;
    lastUpdated: string;
  };
}

export interface DrugInteraction {
  interactingDrug: string;
  severity: 'critical' | 'moderate' | 'mild';
  mechanism: string;
  clinicalImpact: string;
  recommendation: string;
}

export interface AllergyConflict {
  allergen: string;
  medication: string;
  severity: 'critical' | 'severe';
  reaction: string;
}

export interface ConsentToken {
  id: string;
  patientId: string;
  tokenCode: string; // 6-digit PIN e.g. "849201"
  doctorName: string;
  facilityName: string;
  scope: 'full' | 'cardiology' | 'labs_only' | 'emergency';
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'revoked' | 'expired';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: 'Patient' | 'Doctor' | 'ER Paramedic' | 'Lab';
  facility: string;
  action: string;
  details: string;
  status: 'Authorized' | 'Emergency-Bypass' | 'Revoked';
}
