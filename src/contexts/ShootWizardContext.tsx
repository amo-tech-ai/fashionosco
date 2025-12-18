
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { ShootWizardState, PRICING } from '../types/wizard';

// Initial state matching the comprehensive ShootWizardState interface from src/types/wizard.ts
const initialState: ShootWizardState = {
  step: 1,
  shootType: null,
  numberOfItems: 10,
  selectedProducts: [],
  estimatedDuration: 'Half Day (4h)',
  location: 'studio',
  date: null,
  timeSlot: '09:00 AM',
  moodBoardImages: [],
  vibe: null,
  referenceBrands: '',
  modelNeeded: false,
  modelSelection: null,
  stylingNeeded: null,
  hairMakeup: false,
  finalImagesCount: 15,
  formats: ['JPG', 'PNG'],
  resolution: 'web',
  turnaround: 'standard',
  retouchingLevel: 'basic',
  videoAddOn: false,
  usageRights: 'editorial',
  totalPrice: 1500,
  deposit: 750,
  // Fix: Added missing initial values for strategic flow
  isAdjustMode: false,
  wizardMode: null,
  shotList: [],
  aiAnalysis: null
};

// Fix: Exported Action type for use in other components and added AI flow actions
export type ShootWizardAction = 
  | { type: 'SET_FIELD'; field: keyof ShootWizardState; value: any }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' }
  | { type: 'CALCULATE_PRICE' }
  | { type: 'SET_MODE'; mode: 'ai' | 'manual' }
  | { type: 'SET_STEP'; step: number | string }
  | { type: 'SET_STRATEGY'; strategy: any }
  | { type: 'TOGGLE_ADJUST' };

function reducer(state: ShootWizardState, action: ShootWizardAction): ShootWizardState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'NEXT_STEP':
      // Fix: check type before incrementing for step resilience
      return { ...state, step: typeof state.step === 'number' ? state.step + 1 : state.step };
    case 'PREV_STEP':
      return { ...state, step: typeof state.step === 'number' ? Math.max(1, state.step - 1) : state.step };
    case 'RESET':
      localStorage.removeItem('wizard_state');
      return initialState;
    // Fix: Added handlers for sub-wizard actions
    case 'SET_MODE':
      return { ...state, wizardMode: action.mode, step: action.mode === 'ai' ? 'signals' : 1 };
    case 'SET_STEP':
      return { ...state, step: action.step };
    case 'SET_STRATEGY':
      return { ...state, step: 'summary' };
    case 'TOGGLE_ADJUST':
      return { ...state, isAdjustMode: !state.isAdjustMode };
    case 'CALCULATE_PRICE': {
      // Pricing Logic based on ShootWizard rules defined in PRICING constant
      let total = state.numberOfItems > 20 ? PRICING.baseRates.fullDay : PRICING.baseRates.halfDay;
      
      if (state.modelNeeded) total += PRICING.addOns.model;
      if (state.stylingNeeded === 'stylist') total += PRICING.addOns.stylist;
      if (state.hairMakeup) total += PRICING.addOns.hairMakeup;
      if (state.videoAddOn) total += PRICING.addOns.videoAddOn;
      
      // Retouching per image calculation
      const retouchRate = PRICING.addOns.retouching[state.retouchingLevel || 'basic'];
      total += (retouchRate * state.finalImagesCount);
      
      // Usage Rights licensing multiplier
      const rightsMultiplier = state.usageRights === 'unlimited' ? 2 : state.usageRights === 'commercial' ? 1.5 : 1;
      total *= rightsMultiplier;
      
      // Turnaround time markup/discount
      const turnaroundMultiplier = PRICING.turnaround[state.turnaround];
      total *= turnaroundMultiplier;
      
      const finalTotal = Math.round(total);
      return { 
        ...state, 
        totalPrice: finalTotal, 
        deposit: Math.round(finalTotal * 0.5),
        estimatedDuration: state.numberOfItems > 20 ? 'Full Day (8h)' : 'Half Day (4h)'
      };
    }
    default:
      return state;
  }
}

// Fix: Expose dispatch to context consumers
const ShootWizardContext = createContext<{
  state: ShootWizardState;
  updateField: (field: keyof ShootWizardState, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetWizard: () => void;
  dispatch: React.Dispatch<ShootWizardAction>;
} | undefined>(undefined);

export const ShootWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    // Persistent state recovery from localStorage for multi-session support
    const saved = localStorage.getItem('wizard_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Date objects need to be reconstructed after JSON parsing
        if (parsed.date) parsed.date = new Date(parsed.date);
        return { ...initial, ...parsed };
      } catch (e) {
        return initial;
      }
    }
    return initial;
  });

  // State Persistence sync
  useEffect(() => {
    localStorage.setItem('wizard_state', JSON.stringify(state));
  }, [state]);

  // Reactive price calculation triggered by parameter changes
  useEffect(() => {
    dispatch({ type: 'CALCULATE_PRICE' });
  }, [
    state.shootType, 
    state.numberOfItems, 
    state.modelNeeded, 
    state.stylingNeeded, 
    state.finalImagesCount, 
    state.usageRights, 
    state.turnaround,
    state.retouchingLevel,
    state.hairMakeup,
    state.videoAddOn
  ]);

  const updateField = useCallback((field: keyof ShootWizardState, value: any) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), []);
  const resetWizard = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    // Fix: Provider now passes dispatch down
    <ShootWizardContext.Provider value={{ state, updateField, nextStep, prevStep, resetWizard, dispatch }}>
      {children}
    </ShootWizardContext.Provider>
  );
};

export const useShootWizard = () => {
  const context = useContext(ShootWizardContext);
  if (!context) throw new Error('useShootWizard must be used within provider');
  return context;
};
