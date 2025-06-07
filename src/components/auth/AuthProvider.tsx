
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { cleanupAuthState, validatePassword, isValidEmail, checkRateLimit } from '@/utils/security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { username?: string; full_name?: string; avatar_url?: string }) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        if (event === 'SIGNED_OUT') {
          cleanupAuthState();
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        cleanupAuthState();
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
      const rateLimitCheck = checkRateLimit(`signup_${email}`, 3, 60000); // 3 attempts per minute
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
      const rateLimitCheck = checkRateLimit(`signin_${email}`, 5, 900000); // 5 attempts per 15 minutes
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
        // Continue even if global signout fails
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

  const updateProfile = async (updates: { username?: string; full_name?: string; avatar_url?: string }) => {
    if (!user) {
      return { error: { message: 'No user logged in' } };
    }

    try {
      // Rate limiting for profile updates
      const rateLimitCheck = checkRateLimit(`profile_update_${user.id}`, 10, 600000); // 10 updates per 10 minutes
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

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
