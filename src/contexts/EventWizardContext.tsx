
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { EventWizardState, EVENT_TYPES } from '../types/event-wizard';

const initialState: EventWizardState = {
  step: 1,
  eventType: null,
  eventName: "",
  guestCount: 100,
  date: null,
  venueType: null,
  productionLevel: "turnkey",
  budget: 0,
  catering: false,
  security: true,
  avLighting: true,
  livestream: false,
  totalPrice: 0,
  deposit: 0
};

type Action = 
  | { type: 'SET_FIELD'; field: keyof EventWizardState; value: any }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'CALCULATE_TOTAL' }
  | { type: 'RESET' };

const reducer = (state: EventWizardState, action: Action): EventWizardState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 4) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) };
    case 'CALCULATE_TOTAL': {
      const base = EVENT_TYPES.find(e => e.id === state.eventType)?.basePrice || 0;
      let extras = 0;
      if (state.catering) extras += state.guestCount * 50; // $50/head
      if (state.security) extras += 1500;
      if (state.avLighting) extras += 5000;
      if (state.livestream) extras += 3000;
      
      const total = base + extras;
      return { ...state, totalPrice: total, deposit: total * 0.5 };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const EventWizardContext = createContext<{
  state: EventWizardState;
  updateField: (field: keyof EventWizardState, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
} | undefined>(undefined);

export const EventWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTAL' });
  }, [state.eventType, state.guestCount, state.catering, state.security, state.avLighting, state.livestream]);

  return (
    <EventWizardContext.Provider value={{
      state,
      updateField: (f, v) => dispatch({ type: 'SET_FIELD', field: f, value: v }),
      nextStep: () => dispatch({ type: 'NEXT_STEP' }),
      prevStep: () => dispatch({ type: 'PREV_STEP' }),
      reset: () => dispatch({ type: 'RESET' })
    }}>
      {children}
    </EventWizardContext.Provider>
  );
};

export const useEventWizard = () => {
  const context = useContext(EventWizardContext);
  if (!context) throw new Error("useEventWizard must be used within Provider");
  return context;
};
