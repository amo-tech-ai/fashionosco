import { useEffect } from 'react';
import { BrandProfile } from '../types/brand';

export const useBrandTheme = (profile: BrandProfile | null) => {
  useEffect(() => {
    if (!profile?.auditResult?.brand_profile?.palette) return;

    const palette = profile.auditResult.brand_profile.palette;
    const root = document.documentElement;

    // Map AI palette to system variables
    if (palette[0]) root.style.setProperty('--brand-primary', palette[0]);
    if (palette[1]) root.style.setProperty('--brand-secondary', palette[1]);
    if (palette[2]) root.style.setProperty('--brand-accent', palette[2]);
    
    // Create a subtle background tint based on the brand's primary color
    root.style.setProperty('--brand-bg-soft', `${palette[0]}10`); // 10% opacity
    
    return () => {
      root.style.removeProperty('--brand-primary');
      root.style.removeProperty('--brand-secondary');
      root.style.removeProperty('--brand-accent');
      root.style.removeProperty('--brand-bg-soft');
    };
  }, [profile]);
};