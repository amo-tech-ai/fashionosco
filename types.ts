import React from 'react';

// Defined in subgraph Types: NavItem.ts
export interface NavItem {
  label: string;
  href: string; // Using 'href' as strictly requested
  icon?: React.ComponentType<{ className?: string }>;
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DANGER = 'danger',
  GHOST = 'ghost'
}