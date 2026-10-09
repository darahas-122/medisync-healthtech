import React from 'react';
import { PatientHeader } from './PatientHeader';
import { RedundancyShield } from './RedundancyShield';
import { ActiveMedicationsPanel } from './ActiveMedicationsPanel';
import { LongitudinalTimeline } from './LongitudinalTimeline';

export const PatientDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <PatientHeader />
      <RedundancyShield />
      <ActiveMedicationsPanel />
      <LongitudinalTimeline />
    </div>
  );
};
