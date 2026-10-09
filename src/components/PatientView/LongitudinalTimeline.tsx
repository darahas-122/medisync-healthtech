import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MedicalRecord, RecordType } from '../../types';
import { 
  FileText, 
  Pill, 
  Microscope, 
  Scan, 
  Building2, 
  Stethoscope, 
  Calendar, 
  Search, 
  Download, 
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export const LongitudinalTimeline: React.FC = () => {
  const { activePatientRecords, setPreviewAttachment } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Records', count: activePatientRecords.length },
    { 
      id: 'prescription', 
      label: 'Prescriptions', 
      count: activePatientRecords.filter(r => r.type === 'prescription').length,
      icon: Pill 
    },
    { 
      id: 'lab_report', 
      label: 'Lab Reports', 
      count: activePatientRecords.filter(r => r.type === 'lab_report').length,
      icon: Microscope 
    },
    { 
      id: 'imaging', 
      label: 'Imaging & Echo', 
      count: activePatientRecords.filter(r => r.type === 'imaging').length,
      icon: Scan 
    },
    { 
      id: 'discharge_summary', 
      label: 'Hospital Discharges', 
      count: activePatientRecords.filter(r => r.type === 'discharge_summary').length,
      icon: Building2 
    },
    { 
      id: 'consultation', 
      label: 'Consultations', 
      count: activePatientRecords.filter(r => r.type === 'consultation').length,
      icon: Stethoscope 
    },
  ];

  const filteredRecords = activePatientRecords.filter(record => {
    const matchesCategory = selectedFilter === 'all' || record.type === selectedFilter;
    const matchesSearch = 
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.medications && record.medications.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (record.labResults && record.labResults.some(l => l.testName.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const getRecordTheme = (type: RecordType) => {
    switch (type) {
      case 'prescription':
        return {
          icon: Pill,
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          nodeBg: 'bg-blue-600',
          tag: 'Prescription',
        };
      case 'lab_report':
        return {
          icon: Microscope,
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-700',
          nodeBg: 'bg-emerald-600',
          tag: 'Lab Diagnostic',
        };
      case 'imaging':
        return {
          icon: Scan,
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-700',
          nodeBg: 'bg-purple-600',
          tag: 'Imaging / Echo',
        };
      case 'discharge_summary':
        return {
          icon: Building2,
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          nodeBg: 'bg-amber-600',
          tag: 'Discharge Summary',
        };
      case 'consultation':
        return {
          icon: Stethoscope,
          bg: 'bg-sky-50',
          border: 'border-sky-200',
          text: 'text-sky-700',
          nodeBg: 'bg-sky-600',
          tag: 'Clinical Note',
        };
      default:
        return {
          icon: FileText,
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          text: 'text-slate-700',
          nodeBg: 'bg-slate-600',
          tag: 'Record',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
      
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Longitudinal Health Timeline</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
              Cross-Provider
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Chronological records aggregated across clinics, diagnostics labs, and inpatient stays.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search records, medications, tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar border-b border-slate-100">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100/70 hover:bg-slate-150 text-slate-600 hover:text-slate-900'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline Stream */}
      <div className="mt-6 relative">
        {/* Continuous Timeline vertical line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-200 -z-0 hidden sm:block"></div>

        {filteredRecords.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium">No records match your search or filter.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the filter or search query.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRecords.map((record) => {
              const theme = getRecordTheme(record.type);
              const ThemeIcon = theme.icon;

              return (
                <div key={record.id} className="relative sm:pl-14 group">
                  
                  {/* Timeline Node Icon (Desktop) */}
                  <div className={`hidden sm:flex absolute left-4 -translate-x-1/2 top-4 w-8 h-8 rounded-full ${theme.nodeBg} text-white items-center justify-center shadow-md ring-4 ring-white z-10 transition-transform group-hover:scale-110`}>
                    <ThemeIcon className="w-4 h-4" />
                  </div>

                  {/* Record Content Box */}
                  <div className="bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-5 shadow-sm transition-all duration-200 hover:shadow-md">
                    
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-200/60">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${theme.bg} ${theme.text} ${theme.border}`}>
                            {theme.tag}
                          </span>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                            {record.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1.5">
                          <span className="font-semibold text-slate-700 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            {record.providerName}
                          </span>
                          <span>•</span>
                          <span>{record.facilityLocation}</span>
                          <span>•</span>
                          <span className="text-indigo-700 font-medium flex items-center gap-1">
                            <Stethoscope className="w-3.5 h-3.5" />
                            {record.doctorName} ({record.doctorSpecialty})
                          </span>
                        </div>
                      </div>

                      {/* Date Badge */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-lg self-start">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-mono font-medium">{record.date}</span>
                      </div>
                    </div>

                    {/* Summary / Notes */}
                    <div className="mt-3 text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                      <p className="font-medium text-slate-800 mb-0.5">Clinical Impression & Findings:</p>
                      <p>{record.summary}</p>
                      {record.diagnosis && (
                        <p className="mt-1.5 text-blue-900 font-semibold bg-blue-50/70 px-2 py-1 rounded">
                          Diagnosis: {record.diagnosis}
                        </p>
                      )}
                    </div>

                    {/* Structured Lab Results (if applicable) */}
                    {record.labResults && record.labResults.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Lab Parameters & Biomarkers
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {record.labResults.map((lr, idx) => (
                            <div 
                              key={idx}
                              className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between ${
                                lr.status === 'high' 
                                  ? 'bg-rose-50/60 border-rose-200 text-rose-950' 
                                  : lr.status === 'low'
                                  ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                                  : 'bg-white border-slate-200 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-[11px] truncate">{lr.testName}</span>
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                                  lr.status === 'high' ? 'bg-rose-200 text-rose-800' : lr.status === 'low' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {lr.status}
                                </span>
                              </div>
                              <div className="mt-1 flex items-baseline justify-between">
                                <span className="font-mono font-bold text-sm">
                                  {lr.value} <span className="text-[10px] font-normal text-slate-500">{lr.unit}</span>
                                </span>
                                <span className="text-[10px] text-slate-400 truncate max-w-[100px]">
                                  Ref: {lr.referenceRange}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Structured Medications (if applicable) */}
                    {record.medications && record.medications.length > 0 && (
                      <div className="mt-3">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Prescribed Regimen
                        </p>
                        <div className="space-y-1.5">
                          {record.medications.map((med, idx) => (
                            <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <span className="font-bold text-slate-900">{med.name}</span>
                                <span className="text-slate-500 ml-2 font-mono">({med.dosage})</span>
                                <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded ml-2 font-medium">
                                  {med.frequency}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 italic">
                                {med.instructions} • Duration: {med.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attachments / Download Section */}
                    {record.attachments && record.attachments.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 font-medium">Attached Proof:</span>
                          {record.attachments.map((att, idx) => (
                            <button
                              key={idx}
                              onClick={() => setPreviewAttachment({ name: att.name, recordTitle: record.title })}
                              className="inline-flex items-center gap-1.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5 text-blue-600" />
                              <span>{att.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">({att.size})</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </button>
                          ))}
                        </div>

                        {/* Verified Provider Stamp */}
                        <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Digitally Verified by {record.providerName}</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
