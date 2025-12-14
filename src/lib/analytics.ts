/**
 * Vercel Web Analytics
 * This module initializes Vercel Web Analytics for the application.
 * Analytics tracking happens on the client-side only.
 */

import { inject } from '@vercel/analytics';

/**
 * Initialize Vercel Web Analytics
 * This function should be called early in the application lifecycle
 * to ensure proper tracking of page views and user interactions.
 */
export const initializeAnalytics = (): void => {
  try {
    inject();
  } catch (error) {
    // Gracefully handle any initialization errors
    console.warn('Failed to initialize Vercel Web Analytics:', error);
  }
};
