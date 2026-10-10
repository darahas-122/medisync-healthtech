import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Patient } from '../../types';
import { 
  X, 
  UserPlus, 
  Sparkles, 
  Heart, 
  AlertOctagon, 
  Droplet, 
  PhoneCall, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';

export const AddPatientModal: React.FC = () => {
  const { isAddPatientModalOpen, setIsAddPatientModalOpen, addNewPatient } = useApp();

  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(45);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('Chennai, Tamil Nadu');
  const [abhaId, setAbhaId] = useState('91-5541-7782-9904');

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState('Anjali Verma');
  const [emergencyRelation, setEmergencyRelation] = useState('Spouse');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98765 11223');

  // Conditions & Allergies
  const [conditionsText, setConditionsText] = useState('Chronic Kidney Disease (Stage 3), Hypertension');
  const [allergiesText, setAllergiesText] = useState('Penicillin (Severe Rash)');

  // Baseline vitals
  const [bp, setBp] = useState('130/85 mmHg');
  const [pulse, setPulse] = useState('74 bpm');
  const [sugar, setSugar] = useState('110 mg/dL');
  const [hba1c, setHba1c] = useState('6.2%');

  if (!isAddPatientModalOpen) return null;

  const handleGenerateAbha = () => {
    const randomAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAbhaId(randomAbha);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Parse chronic conditions
    const parsedConditions = conditionsText
      .split(',')
      .map(c => c.trim())
      .filter(Boolean)
      .map(c => ({
        condition: c,
        diagnosedYear: '2025',
        severity: 'Moderate' as const,
      }));

    // Parse allergies
    const parsedAllergies = allergiesText
      .split(',')
      .map(a => a.trim())
      .filter(Boolean)
      .map(a => ({
        allergen: a.split('(')[0].trim(),
        reaction: a.includes('(') ? a.replace(/.*\((.*)\).*/, '$1') : 'Anaphylaxis / Severe Reaction',
        severity: 'Life-threatening' as const,
      }));

    // Choose avatar based on gender
    const avatar = gender === 'Female'
      ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80';

    const newPatientData: Omit<Patient, 'id'> = {
      name: name.trim(),
      age: Number(age) || 40,
      gender,
      bloodGroup,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      address,
      abhaId,
      avatar,
      emergencyContact: {
        name: emergencyName || 'Relative',
        relationship: emergencyRelation || 'Family',
        phone: emergencyPhone || phone,
      },
      chronicConditions: parsedConditions.length > 0 ? parsedConditions : [
        { condition: 'Healthy Baseline', diagnosedYear: '2026', severity: 'Mild' }
      ],
      allergies: parsedAllergies,
      activeMedications: [],
      recentVitals: {
        bloodPressure: bp,
        fastingBloodSugar: sugar,
        hba1c,
        pulse,
        bmi: '24.2 kg/m²',
        lastUpdated: 'Today (New Enrolment)',
      },
    };

    addNewPatient(newPatientData);
    setIsAddPatientModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Register New Sovereign Patient</h3>
              <p className="text-xs text-blue-200">
                Create a cross-provider health passport with sovereign consent
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsAddPatientModalOpen(false)}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
          
          {/* Personal Info */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              1. Basic Demographics & Identification
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arun Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">ABHA Digital Health ID</label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={abhaId}
                    onChange={(e) => setAbhaId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateAbha}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors"
                    title="Generate Random ABHA"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Age</label>
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-red-700 focus:bg-white"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact & Next of Kin */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              2. Contact & Emergency Next of Kin
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Patient Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">City / Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div>
                <label className="text-[10px] text-slate-500 font-medium block mb-1">Emergency Contact</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-medium block mb-1">Relationship</label>
                <input
                  type="text"
                  placeholder="e.g. Spouse"
                  value={emergencyRelation}
                  onChange={(e) => setEmergencyRelation(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-medium block mb-1">Contact Phone</label>
                <input
                  type="text"
                  placeholder="Phone"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Medical Conditions & Allergies */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              3. Chronic Medical Problems & Known Allergies
            </h4>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Chronic Health Conditions (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Chronic Kidney Disease (Stage 3), Hypertension, Diabetes"
                value={conditionsText}
                onChange={(e) => setConditionsText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Known Drug Allergies (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Penicillin (Severe Rash), Sulfa Drugs"
                value={allergiesText}
                onChange={(e) => setAllergiesText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white font-medium text-rose-800"
              />
            </div>

            {/* Baseline Vitals */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Blood Pressure</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Fasting Sugar</label>
                <input
                  type="text"
                  value={sugar}
                  onChange={(e) => setSugar(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">HbA1c</label>
                <input
                  type="text"
                  value={hba1c}
                  onChange={(e) => setHba1c(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Pulse Rate</label>
                <input
                  type="text"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddPatientModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Enroll Sovereign Patient Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
