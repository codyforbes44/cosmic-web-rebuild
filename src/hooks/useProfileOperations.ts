
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { checkRateLimit } from '@/utils/security';
import type { ProfileUpdates } from '@/types/auth';

export const useProfileOperations = (user: User | null) => {
  const updateProfile = async (updates: ProfileUpdates) => {
    if (!user) {
      return { error: { message: 'No user logged in' } };
    }

    try {
      // Rate limiting for profile updates
      const rateLimitCheck = checkRateLimit(`profile_update_${user.id}`, 10, 600000);
      if (!rateLimitCheck.allowed) {
        return { error: { message: 'Too many profile updates. Please wait before trying again.' } };
      }

      // Validate and sanitize inputs
      const sanitizedUpdates: any = {};
      
      if (updates.username) {
        sanitizedUpdates.username = updates.username.trim().toLowerCase();
        if (sanitizedUpdates.username.length < 3 || sanitizedUpdates.username.length > 30) {
          return { error: { message: 'Username must be between 3 and 30 characters.' } };
        }
        if (!/^[a-zA-Z0-9_-]+$/.test(sanitizedUpdates.username)) {
          return { error: { message: 'Username can only contain letters, numbers, hyphens, and underscores.' } };
        }
      }
      
      if (updates.full_name) {
        sanitizedUpdates.full_name = updates.full_name.trim();
        if (sanitizedUpdates.full_name.length > 100) {
          return { error: { message: 'Full name must be less than 100 characters.' } };
        }
        if (!/^[a-zA-Z\s'-]+$/.test(sanitizedUpdates.full_name)) {
          return { error: { message: 'Full name contains invalid characters.' } };
        }
      }
      
      if (updates.avatar_url) {
        try {
          const url = new URL(updates.avatar_url);
          if (!['http:', 'https:'].includes(url.protocol)) {
            return { error: { message: 'Avatar URL must use HTTP or HTTPS protocol.' } };
          }
          sanitizedUpdates.avatar_url = updates.avatar_url;
        } catch {
          return { error: { message: 'Avatar URL must be a valid URL.' } };
        }
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...sanitizedUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        // Return more user-friendly error messages
        if (error.message.includes('duplicate key value')) {
          return { error: { message: 'This username is already taken. Please choose a different one.' } };
        }
        if (error.message.includes('violates row-level security')) {
          return { error: { message: 'You do not have permission to update this profile.' } };
        }
        if (error.message.includes('rate limit')) {
          return { error: { message: 'Too many requests. Please wait before trying again.' } };
        }
      }

      return { error };
    } catch (err) {
      console.error('Unexpected profile update error:', err);
      return { error: { message: 'An unexpected error occurred while updating your profile.' } };
    }
  };

  return { updateProfile };
};
