import { Patient, MedicalRecord, DrugInteraction, AllergyConflict } from '../types';
import { KNOWN_DRUG_INTERACTIONS, ALLERGY_KNOWLEDGE_BASE } from '../data/mockData';

export interface ClinicalSafetyReport {
  isSafe: boolean;
  allergyConflicts: AllergyConflict[];
  drugInteractions: DrugInteraction[];
  cautionNotes: string[];
}

export interface RedundancyWarning {
  isRedundant: boolean;
  testName: string;
  previousDate: string;
  facility: string;
  previousResult: string;
  daysAgo: number;
  estimatedCostSaved: number;
  clinicalGuideline: string;
}

export function checkClinicalSafety(patient: Patient, candidateDrug: string): ClinicalSafetyReport {
  const normalizedCandidate = candidateDrug.trim().toLowerCase();
  const allergyConflicts: AllergyConflict[] = [];
  const drugInteractions: DrugInteraction[] = [];
  const cautionNotes: string[] = [];

  if (!normalizedCandidate) {
    return { isSafe: true, allergyConflicts, drugInteractions, cautionNotes };
  }

  // 1. Check Allergy Conflicts
  for (const patientAllergy of patient.allergies) {
    const allergenLower = patientAllergy.allergen.toLowerCase();
    
    for (const rule of ALLERGY_KNOWLEDGE_BASE) {
      if (allergenLower.includes(rule.allergenKeyword)) {
        // Direct contraindication match
        const isContraindicated = rule.contraindicatedDrugs.some(drug => 
          normalizedCandidate.includes(drug) || drug.includes(normalizedCandidate)
        );

        if (isContraindicated) {
          allergyConflicts.push({
            allergen: patientAllergy.allergen,
            medication: candidateDrug,
            severity: 'critical',
            reaction: `${patientAllergy.reaction} (${rule.riskDescription})`,
          });
        }

        // Cross-sensitivity caution
        const isCaution = rule.cautionDrugs.some(drug =>
          normalizedCandidate.includes(drug) || drug.includes(normalizedCandidate)
        );

        if (isCaution) {
          cautionNotes.push(
            `Possible cross-sensitivity with documented ${patientAllergy.allergen} allergy. Monitor closely for signs of cutaneous reaction.`
          );
        }
      }
    }
  }

  // 2. Check Drug-Drug Interactions with Active Medications
  for (const activeMed of patient.activeMedications) {
    const activeLower = activeMed.name.toLowerCase();

    for (const ddi of KNOWN_DRUG_INTERACTIONS) {
      const d1 = ddi.drug1.toLowerCase();
      const d2 = ddi.drug2.toLowerCase();

      const match1 = (activeLower.includes(d1) && normalizedCandidate.includes(d2)) ||
                     (activeLower.includes(d2) && normalizedCandidate.includes(d1));

      if (match1) {
        drugInteractions.push({
          interactingDrug: activeMed.name,
          severity: ddi.severity,
          mechanism: ddi.mechanism,
          clinicalImpact: ddi.clinicalImpact,
          recommendation: ddi.recommendation,
        });
      }
    }
  }

  const isSafe = allergyConflicts.length === 0 && drugInteractions.filter(i => i.severity === 'critical').length === 0;

  return {
    isSafe,
    allergyConflicts,
    drugInteractions,
    cautionNotes,
  };
}

// Redundancy checker rules based on standard medical guidelines
const TEST_VALIDITY_DAYS: Record<string, { days: number; cost: number; guideline: string }> = {
  'hba1c': { days: 90, cost: 850, guideline: 'ADA Guidelines state HbA1c reflects 3-month erythrocyte turnover. Re-testing before 90 days yields no clinical utility.' },
  'glycated hemoglobin': { days: 90, cost: 850, guideline: 'Reflects 90-day glycemic control; redundant if reordered prematurely.' },
  'lipid profile': { days: 90, cost: 950, guideline: 'AHA/ACC guidelines recommend lipid re-evaluation at 3 to 12 month intervals.' },
  'cholesterol': { days: 90, cost: 950, guideline: 'Lipid alterations require at least 8-12 weeks of therapeutic stabilization.' },
  '2d echo': { days: 180, cost: 2800, guideline: 'Echocardiograms for stable CAD are guideline-indicated at 6 to 12 month intervals.' },
  'echocardiogram': { days: 180, cost: 2800, guideline: 'Cardiology guidelines indicate re-echo only if new acute symptoms emerge.' },
  'creatinine': { days: 60, cost: 450, guideline: 'Stable baseline renal markers do not require monthly re-sampling without acute insult.' },
  'lft': { days: 60, cost: 750, guideline: 'Hepatic panels remain valid for 60-90 days during stable statin therapy.' },
};

export function checkTestRedundancy(records: MedicalRecord[], testName: string): RedundancyWarning | null {
  const normalizedTest = testName.toLowerCase().trim();

  let matchedRule: { days: number; cost: number; guideline: string } | null = null;
  for (const [key, rule] of Object.entries(TEST_VALIDITY_DAYS)) {
    if (normalizedTest.includes(key)) {
      matchedRule = rule;
      break;
    }
  }

  if (!matchedRule) return null;

  const now = new Date();

  // Search recent records
  for (const record of records) {
    if (record.type === 'lab_report' || record.type === 'imaging') {
      const recordDate = new Date(record.date);
      const diffTime = Math.abs(now.getTime() - recordDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= matchedRule.days) {
        // Find if this record contains the test
        let foundResult = '';
        if (record.labResults) {
          const matchedItem = record.labResults.find(lr => 
            lr.testName.toLowerCase().includes(normalizedTest) || normalizedTest.includes(lr.testName.toLowerCase())
          );
          if (matchedItem) {
            foundResult = `${matchedItem.value} ${matchedItem.unit} (${matchedItem.status.toUpperCase()})`;
          }
        }

        if (!foundResult && (record.title.toLowerCase().includes(normalizedTest) || record.tags.some(t => t.toLowerCase().includes(normalizedTest)))) {
          foundResult = record.summary.slice(0, 80) + '...';
        }

        if (foundResult) {
          return {
            isRedundant: true,
            testName,
            previousDate: record.date,
            facility: record.providerName,
            previousResult: foundResult,
            daysAgo: diffDays,
            estimatedCostSaved: matchedRule.cost,
            clinicalGuideline: matchedRule.guideline,
          };
        }
      }
    }
  }

  return null;
}
