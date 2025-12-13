
import { useState, useEffect } from 'react';
import { UserProfile } from '../types/user';

const DEFAULT_PROFILE: UserProfile = {
  firstName: 'Creative',
  lastName: 'Director',
  email: 'director@fashionos.co',
  role: 'Studio Admin',
  companyName: 'FashionOS Studio'
};

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse user profile", e);
      }
    }
  }, []);

  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('user_profile', JSON.stringify(newProfile));
    
    // Dispatch a custom event so other components (like Sidebar) update immediately
    window.dispatchEvent(new Event('profileUpdated'));
  };

  return { profile, saveProfile };
};
