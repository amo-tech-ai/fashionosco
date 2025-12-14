
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShootWizardState, PRICING, SHOOT_TYPES } from '../types/wizard';

// Initial State
const initialState: ShootWizardState = {
  step: 1,
  shootType: null,
  numberOfItems: 10,
  estimatedDuration: "Half Day",
  location: "studio",
  date: null,
  timeSlot: null,
  moodBoardImages: [],
  vibe: null,
  referenceBrands: "",
  modelNeeded: false,
  modelSelection: null,
  stylingNeeded: null,
  hairMakeup: false,
  finalImagesCount: 10,
  formats: ["JPEG"],
  resolution: "web",
  turnaround: "standard",
  retouchingLevel: "basic",
  videoAddOn: false,
  usageRights: "editorial",
  totalPrice: 0,
  deposit: 0,
  shotList: [],
  aiAnalysis: null
};

// Actions
type Action = 
  | { type: 'SET_FIELD'; field: keyof ShootWizardState; value: any }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_TOTAL'; price: number; deposit: number }
  | { type: 'RESET_WIZARD' }
  | { type: 'LOAD_PRESET'; payload: Partial<ShootWizardState> };

// Reducer
const reducer = (state: ShootWizardState, action: Action): ShootWizardState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 7) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) };
    case 'SET_TOTAL':
      return { ...state, totalPrice: action.price, deposit: action.deposit };
    case 'RESET_WIZARD':
      return initialState;
    case 'LOAD_PRESET':
      return { ...state, ...action.payload, step: 2 }; // Jump to step 2 after preset load
    default:
      return state;
  }
};

// Pricing Logic
const calculatePrice = (state: ShootWizardState) => {
  let total = 0;

  // 1. Base Rate (based on items/duration estimate)
  // Simplified logic: < 20 items = Half Day, > 20 = Full Day
  const isFullDay = state.numberOfItems > 20;
  total += isFullDay ? PRICING.baseRates.fullDay : PRICING.baseRates.halfDay;

  // 2. Shoot Type Base Adjustment
  const typeConfig = SHOOT_TYPES.find(t => t.id === state.shootType);
  if (typeConfig) {
      // Just an example adjustment
      if (state.shootType === 'video') total += 500;
  }

  // 3. Add-ons
  if (state.modelNeeded) total += PRICING.addOns.model;
  if (state.stylingNeeded === 'stylist') total += PRICING.addOns.stylist;
  if (state.hairMakeup) total += PRICING.addOns.hairMakeup;
  if (state.videoAddOn) total += PRICING.addOns.videoAddOn;

  // 4. Per-Image Costs (Retouching)
  let retouchingCost = 0;
  if (state.retouchingLevel === 'advanced') retouchingCost = state.finalImagesCount * PRICING.addOns.retouching.advanced;
  if (state.retouchingLevel === 'high-end') retouchingCost = state.finalImagesCount * PRICING.addOns.retouching.highEnd;
  total += retouchingCost;

  // 5. Multipliers (Turnaround)
  if (state.turnaround === 'rush') total *= PRICING.turnaround.rush;
  if (state.turnaround === 'extended') total *= PRICING.turnaround.extended;

  // 6. Usage Rights (Multiplier Example)
  if (state.usageRights === 'commercial') total *= 1.5;
  if (state.usageRights === 'unlimited') total *= 2.0;

  return Math.round(total);
};

// Helper: Load state from localStorage
const loadState = (): ShootWizardState => {
  try {
    const saved = localStorage.getItem('wizard_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Restore Date objects if they were stringified
      if (parsed.date) parsed.date = new Date(parsed.date);
      // Reset File objects (moodBoardImages) as they cannot be persisted in localStorage
      parsed.moodBoardImages = [];
      return { ...initialState, ...parsed };
    }
  } catch(e) {
    console.warn("Failed to load wizard state", e);
  }
  return initialState;
};

// Context Creation
const ShootWizardContext = createContext<{
  state: ShootWizardState;
  dispatch: React.Dispatch<Action>;
  updateField: (field: keyof ShootWizardState, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetWizard: () => void;
} | undefined>(undefined);

export const ShootWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with loadState to check for persisted data
  const [state, dispatch] = useReducer(reducer, initialState, loadState);
  const location = useLocation();

  // Handle incoming presets from Marketplace
  useEffect(() => {
    if (location.state && location.state.prefill) {
        dispatch({ type: 'LOAD_PRESET', payload: location.state.prefill });
        // Clear history state to avoid reload issues
        window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Persistence Effect
  useEffect(() => {
    // Separate out fields that shouldn't or can't be persisted (like File objects)
    const { moodBoardImages, ...persistableState } = state;
    localStorage.setItem('wizard_state', JSON.stringify(persistableState));
  }, [state]);

  // Auto-recalculate price on state change
  useEffect(() => {
    // If a preset loaded a fixed price, we might want to respect it, but generally wizards are dynamic.
    // For now, we allow recalculation to ensure consistency.
    const price = calculatePrice(state);
    const deposit = Math.round(price * 0.5); // 50% deposit
    if (price !== state.totalPrice) {
        dispatch({ type: 'SET_TOTAL', price, deposit });
    }
  }, [
    state.shootType, 
    state.numberOfItems, 
    state.modelNeeded, 
    state.stylingNeeded, 
    state.hairMakeup, 
    state.videoAddOn, 
    state.retouchingLevel, 
    state.finalImagesCount, 
    state.turnaround,
    state.usageRights
  ]);

  const updateField = (field: keyof ShootWizardState, value: any) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const nextStep = () => dispatch({ type: 'NEXT_STEP' });
  const prevStep = () => dispatch({ type: 'PREV_STEP' });
  
  const resetWizard = () => {
    localStorage.removeItem('wizard_state');
    dispatch({ type: 'RESET_WIZARD' });
  };

  return (
    <ShootWizardContext.Provider value={{ state, dispatch, updateField, nextStep, prevStep, resetWizard }}>
      {children}
    </ShootWizardContext.Provider>
  );
};

export const useShootWizard = () => {
  const context = useContext(ShootWizardContext);
  if (!context) {
    throw new Error("useShootWizard must be used within a ShootWizardProvider");
  }
  return context;
};
