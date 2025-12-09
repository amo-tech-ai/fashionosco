
import React from 'react';
import { ShootWizardProvider } from '../contexts/ShootWizardContext';
import { ShootWizard } from '../components/wizards/ShootWizard';

export const ShootWizardPage: React.FC = () => {
  return (
    <ShootWizardProvider>
      <ShootWizard />
    </ShootWizardProvider>
  );
};
