
import React from 'react';
import { EventWizardProvider } from '../contexts/EventWizardContext';
import { EventWizard } from '../components/wizards/EventWizard';

export const EventWizardPage: React.FC = () => {
  return (
    <EventWizardProvider>
      <EventWizard />
    </EventWizardProvider>
  );
};
