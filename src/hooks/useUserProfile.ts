
import { useState, useEffect } from 'react';
import { UserProfile } from '../types/user';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const DEFAULT_PROFILE: UserProfile = {
  firstName: 'Creative',
  lastName: 'Director',
  email: 'director@fashionos.co',
  role: 'Studio Admin',
  companyName: 'FashionOS Studio'
};

export const useUserProfile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSyncProfile = async () => {
      if (!authUser) {
        // Fallback to local storage or default if not logged in
        const saved = localStorage.getItem('user_profile');
        if (saved) {
           setProfile(JSON.parse(saved));
        }
        setLoading(false);
        return;
      }

      try {
        // 1. Try to fetch existing profile from DB
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (data) {
          // Profile exists, use it
          const mappedProfile: UserProfile = {
            firstName: data.full_name ? data.full_name.split(' ')[0] : 'User',
            lastName: data.full_name && data.full_name.split(' ').length > 1 ? data.full_name.split(' ').slice(1).join(' ') : '',
            email: data.email || authUser.email || '',
            role: 'Producer',
            avatarUrl: data.avatar_url,
            companyName: data.company_name
          };
          setProfile(mappedProfile);
          localStorage.setItem('user_profile', JSON.stringify(mappedProfile));
        } else {
          // 2. Profile missing (First-time Google Login) -> SYNC FROM AUTH METADATA
          console.log('Profile missing, syncing from Auth Metadata...');
          
          const metadata = authUser.user_metadata;
          const fullName = metadata.full_name || 'New User';
          const avatarUrl = metadata.avatar_url;
          
          const newProfile = {
            id: authUser.id,
            email: authUser.email,
            full_name: fullName,
            avatar_url: avatarUrl,
            company_name: 'My Studio',
            updated_at: new Date().toISOString()
          };

          // Upsert to DB
          const { error: upsertError } = await supabase
            .from('profiles')
            .upsert(newProfile);

          if (!upsertError) {
            // Update local state immediately
            const mappedProfile: UserProfile = {
              firstName: fullName.split(' ')[0],
              lastName: fullName.split(' ').slice(1).join(' ') || '',
              email: authUser.email || '',
              role: 'Producer',
              avatarUrl: avatarUrl,
              companyName: 'My Studio'
            };
            setProfile(mappedProfile);
            localStorage.setItem('user_profile', JSON.stringify(mappedProfile));
            // Trigger global update
            window.dispatchEvent(new Event('profileUpdated'));
          }
        }
      } catch (error) {
        console.error('Error fetching/syncing profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSyncProfile();
  }, [authUser]);

  // Save to Supabase (Manual updates from Settings page)
  const saveProfile = async (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('user_profile', JSON.stringify(newProfile));
    
    // Dispatch local event
    window.dispatchEvent(new Event('profileUpdated'));

    if (authUser) {
      try {
        const fullName = `${newProfile.firstName} ${newProfile.lastName}`.trim();
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: authUser.id,
            email: newProfile.email,
            full_name: fullName,
            avatar_url: newProfile.avatarUrl,
            company_name: newProfile.companyName,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
      } catch (error) {
        console.error("Failed to save profile to DB:", error);
        throw error;
      }
    }
  };

  return { profile, saveProfile, loading };
};
