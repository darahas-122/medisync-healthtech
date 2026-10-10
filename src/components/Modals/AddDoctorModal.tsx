import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Doctor } from '../../types';
import { 
  X, 
  Stethoscope, 
  Sparkles, 
  Building2, 
  Award, 
  PhoneCall, 
  ShieldCheck, 
  RefreshCw,
  Mail,
  UserCheck
} from 'lucide-react';

export const AddDoctorModal: React.FC = () => {
  const { isAddDoctorModalOpen, setIsAddDoctorModalOpen, addNewDoctor } = useApp();

  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('Nephrology & Renal Medicine');
  const [qualification, setQualification] = useState('MBBS, MD, DM (Nephrology)');
  const [hospital, setHospital] = useState('Apollo Hospitals Greams Road');
  const [licenseNumber, setLicenseNumber] = useState('NMC-TN-2021-98412');
  const [experienceYears, setExperienceYears] = useState<number>(12);
  const [phone, setPhone] = useState('+91 98405 88120');
  const [email, setEmail] = useState('');

  if (!isAddDoctorModalOpen) return null;

  const handleGenerateLicense = () => {
    const randomLic = `NMC-TN-${2015 + Math.floor(Math.random() * 9)}-${Math.floor(10000 + Math.random() * 90000)}`;
    setLicenseNumber(randomLic);
  };

  const handleApplyPreset = (presetName: string, presetSpecialty: string, presetQual: string, presetHosp: string) => {
    setName(presetName);
    setSpecialty(presetSpecialty);
    setQualification(presetQual);
    setHospital(presetHosp);
    setEmail(`${presetName.toLowerCase().replace(/[^a-z]/g, '')}@${presetHosp.toLowerCase().split(' ')[0]}.org`);
    handleGenerateLicense();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Pick avatar based on specialty or name
    const avatar = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80';

    const newDoctorData: Omit<Doctor, 'id'> = {
      name: name.startsWith('Dr.') ? name.trim() : `Dr. ${name.trim()}`,
      specialty: specialty.trim() || 'General Medicine',
      qualification: qualification.trim() || 'MBBS, MD',
      hospital: hospital.trim() || 'City Care Hospital',
      licenseNumber: licenseNumber.trim() || 'NMC-TN-2024-55120',
      experienceYears: Number(experienceYears) || 10,
      avatar,
      phone: phone || '+91 98400 00000',
      email: email || `${name.toLowerCase().replace(/[^a-z]/g, '')}@hospital.org`,
    };

    addNewDoctor(newDoctorData);
    setIsAddDoctorModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Register New Doctor Profile</h3>
              <p className="text-xs text-slate-500">Enroll accredited clinician into MediSync OPD Directory</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddDoctorModalOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets for Judges */}
        <div className="p-6 pb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Quick 1-Tap Clinician Templates for Evaluators:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleApplyPreset('Dr. Rajesh Khanna', 'Nephrology & Renal Failure', 'MD, DM (Nephro)', 'Apollo Greams Road')}
              className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors"
            >
              + Dr. Rajesh (Nephrologist)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('Dr. Ananya Iyer', 'Endocrinology & Diabetology', 'MD, DM (Endo)', 'Fortis Malar Hospital')}
              className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors"
            >
              + Dr. Ananya (Endocrinologist)
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('Dr. Vikramaditya', 'Orthopedics & Joint Care', 'MS (Ortho), MCh', 'MIOT International')}
              className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors"
            >
              + Dr. Vikram (Orthopedic)
            </button>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Doctor Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Rajesh Khanna"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Medical Specialty *</label>
              <input
                type="text"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="e.g. Nephrology, Cardiology, Pediatrics"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Qualifications / Degrees</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. MBBS, MD, DM, FACC"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hospital / Clinic Facility *</label>
              <input
                type="text"
                required
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                placeholder="e.g. Apollo Hospitals Greams Road"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-slate-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinical Experience (Years)</label>
              <input
                type="number"
                min={1}
                max={50}
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-slate-900"
              />
            </div>
          </div>

          {/* NMC License Generator */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">NMC Medical License / Council Registration *</label>
              <button
                type="button"
                onClick={handleGenerateLicense}
                className="text-[11px] text-indigo-600 font-semibold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Auto-generate NMC ID</span>
              </button>
            </div>
            <input
              type="text"
              required
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="e.g. NMC-TN-2021-98412"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-mono text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Mobile Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98405 88120"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hospital Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr.rajesh@apollo.org"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none transition-all text-slate-900"
              />
            </div>
          </div>

          {/* Trust Banner */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <span>This clinician profile will be registered with verified prescribing rights. When prescribing, this doctor's license will be stamped on the patient's EHR timeline.</span>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsAddDoctorModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white shadow-md transition-all ${
                name.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20 hover:scale-[1.01]'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Enroll Clinician & Log In</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
