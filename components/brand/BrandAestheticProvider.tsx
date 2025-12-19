import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrandProfile } from '../types/brand';
import { BrandService } from '../services/data/brands';
import { useBrandTheme } from '../hooks/useBrandTheme';

interface BrandAestheticContextType {
  profile: BrandProfile | null;
  refreshProfile: () => Promise<void>;
}

const BrandAestheticContext = createContext<BrandAestheticContextType | undefined>(undefined);

export const BrandAestheticProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<BrandProfile | null>(null);

  const loadProfile = async () => {
    const data = await BrandService.get();
    setProfile(data);
  };

  useEffect(() => {
    loadProfile();
    window.addEventListener('brandProfileUpdated', loadProfile);
    return () => window.removeEventListener('brandProfileUpdated', loadProfile);
  }, []);

  useBrandTheme(profile);

  return (
    <BrandAestheticContext.Provider value={{ profile, refreshProfile: loadProfile }}>
      {children}
    </BrandAestheticContext.Provider>
  );
};

export const useBrandAesthetic = () => {
  const context = useContext(BrandAestheticContext);
  if (!context) throw new Error("useBrandAesthetic must be used within BrandAestheticProvider");
  return context;
};