
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState, validatePassword, isValidEmail, checkRateLimit } from '@/utils/security';
import type { ProfileUpdates } from '@/types/auth';

export const useAuthOperations = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      // Input validation
      if (!isValidEmail(email)) {
        return { error: { message: 'Please enter a valid email address.' } };
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return { error: { message: passwordValidation.errors[0] } };
      }

      // Rate limiting
      const rateLimitCheck = checkRateLimit(`signup_${email}`, 3, 60000);
      if (!rateLimitCheck.allowed) {
        const message = rateLimitCheck.blockedUntil 
          ? `Too many signup attempts. Please try again after ${new Date(rateLimitCheck.blockedUntil).toLocaleTimeString()}`
          : 'Too many signup attempts. Please wait before trying again.';
        return { error: { message } };
      }

      // Clean up any existing auth state
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: fullName ? { full_name: fullName.trim() } : undefined
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        // Return more user-friendly error messages
        if (error.message.includes('User already registered')) {
          return { error: { message: 'An account with this email already exists. Please sign in instead.' } };
        }
        if (error.message.includes('Password should be at least')) {
          return { error: { message: 'Password does not meet security requirements.' } };
        }
        if (error.message.includes('Invalid email')) {
          return { error: { message: 'Please enter a valid email address.' } };
        }
        if (error.message.includes('rate limit')) {
          return { error: { message: 'Too many requests. Please wait before trying again.' } };
        }
      }
      
      return { error };
    } catch (err) {
      console.error('Unexpected sign up error:', err);
      return { error: { message: 'An unexpected error occurred. Please try again.' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Input validation
      if (!isValidEmail(email)) {
        return { error: { message: 'Please enter a valid email address.' } };
      }

      if (!password || password.length < 6) {
        return { error: { message: 'Password is required and must be at least 6 characters.' } };
      }

      // Rate limiting
      const rateLimitCheck = checkRateLimit(`signin_${email}`, 5, 900000);
      if (!rateLimitCheck.allowed) {
        const message = rateLimitCheck.blockedUntil 
          ? `Too many sign-in attempts. Account temporarily locked until ${new Date(rateLimitCheck.blockedUntil).toLocaleTimeString()}`
          : 'Too many sign-in attempts. Please wait before trying again.';
        return { error: { message } };
      }

      // Clean up any existing auth state before signing in
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.warn('Global signout failed:', err);
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        // Return more user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: { message: 'Please check your email and click the confirmation link before signing in.' } };
        }
        if (error.message.includes('Too many requests')) {
          return { error: { message: 'Too many sign-in attempts. Please wait a moment before trying again.' } };
        }
        if (error.message.includes('rate limit')) {
          return { error: { message: 'Rate limit exceeded. Please wait before trying again.' } };
        }
      } else {
        // Clear rate limit on successful login
        localStorage.removeItem(`rate_limit_signin_${email}`);
        localStorage.removeItem(`rate_limit_signin_${email}_blocked`);
      }
      
      return { error };
    } catch (err) {
      console.error('Unexpected sign in error:', err);
      return { error: { message: 'An unexpected error occurred. Please try again.' } };
    }
  };

  const signOut = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error('Sign out error:', error);
      }
      
      // Force page reload to clear any cached state
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (err) {
      console.error('Unexpected sign out error:', err);
      // Still redirect to clear state
      window.location.href = '/';
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    loading
  };
};
