/**
 * Query Factory - Centralized data fetching with React Query
 * 
 * This module provides a standardized approach to data fetching across the application.
 * All queries use consistent patterns for caching, error handling, and loading states.
 * 
 * Usage:
 * ```tsx
 * import { queryKeys, queries } from '@/lib/queries';
 * import { useQuery } from '@tanstack/react-query';
 * 
 * // Use pre-built query
 * const { data, isLoading, error } = useQuery(queries.profiles.byUserId(userId));
 * 
 * // Or use query keys directly
 * const { data } = useQuery({
 *   queryKey: queryKeys.favorites.all,
 *   queryFn: () => fetchFavorites(),
 * });
 * ```
 */

import { supabase } from '@/integrations/supabase/client';

// ============================================
// Query Key Factory
// Provides consistent, type-safe query keys
// ============================================

export const queryKeys = {
  // User & Auth
  profiles: {
    all: ['profiles'] as const,
    byUserId: (userId: string) => ['profiles', userId] as const,
  },
  
  // Analytics
  analytics: {
    all: ['analytics'] as const,
    visitors: (dateRange?: string) => ['analytics', 'visitors', dateRange] as const,
    formSubmissions: ['analytics', 'form-submissions'] as const,
    edgeFunctions: (timeRange: string) => ['analytics', 'edge-functions', timeRange] as const,
  },
  
  // Favorites
  favorites: {
    all: ['favorites'] as const,
    locations: ['favorites', 'locations'] as const,
  },
  
  // Audio
  audio: {
    all: ['audio'] as const,
    history: ['audio', 'history'] as const,
    byId: (id: string) => ['audio', id] as const,
  },
  
  // Subscriptions
  subscriptions: {
    all: ['subscriptions'] as const,
    packages: ['subscriptions', 'packages'] as const,
  },
  
  // Admin
  admin: {
    users: ['admin', 'users'] as const,
    roles: ['admin', 'roles'] as const,
  },
  
  // Zephel
  zephel: {
    sessions: (userId: string) => ['zephel', 'sessions', userId] as const,
    messages: (sessionId: string) => ['zephel', 'messages', sessionId] as const,
    metrics: (userId: string) => ['zephel', 'metrics', userId] as const,
  },
  
  // Contact/Forms
  forms: {
    contact: ['forms', 'contact'] as const,
    quotes: ['forms', 'quotes'] as const,
    onboarding: ['forms', 'onboarding'] as const,
  },
} as const;

// ============================================
// Query Options Factory
// Pre-configured query options for common queries
// ============================================

export const queries = {
  profiles: {
    byUserId: (userId: string) => ({
      queryKey: queryKeys.profiles.byUserId(userId),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (error) throw error;
        return data;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
  },
  
  favorites: {
    locations: () => ({
      queryKey: queryKeys.favorites.locations,
      queryFn: async () => {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session?.user) {
          return [];
        }
        
        const { data, error } = await supabase
          .from('favorite_locations')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data || [];
      },
      staleTime: 1000 * 60 * 2, // 2 minutes
    }),
  },
  
  audio: {
    history: () => ({
      queryKey: queryKeys.audio.history,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('audio_files')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data || [];
      },
      staleTime: 1000 * 60 * 1, // 1 minute
    }),
  },
  
  subscriptions: {
    packages: () => ({
      queryKey: queryKeys.subscriptions.packages,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('subscription_packages')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        
        if (error) throw error;
        return data || [];
      },
      staleTime: 1000 * 60 * 10, // 10 minutes - packages don't change often
    }),
  },
  
  admin: {
    users: () => ({
      queryKey: queryKeys.admin.users,
      queryFn: async () => {
        const { data, error } = await supabase.functions.invoke('admin-users', {
          method: 'GET',
        });
        
        if (error) throw new Error(error.message || 'Failed to fetch users');
        return data.users || [];
      },
      staleTime: 1000 * 60 * 1, // 1 minute
    }),
  },
  
  analytics: {
    formSubmissions: () => ({
      queryKey: queryKeys.analytics.formSubmissions,
      queryFn: async () => {
        // Fetch contact submissions
        const { data: contactData, error: contactError } = await supabase
          .from('contact_submissions')
          .select('id, created_at, name, subject, email, message')
          .order('created_at', { ascending: false });

        if (contactError) throw contactError;

        // Fetch quote requests
        const { data: quoteData, error: quoteError } = await supabase
          .from('quote_requests')
          .select('id, created_at, full_name, service_type, email, phone, company_name, project_description, budget, timeline, terms_accepted')
          .order('created_at', { ascending: false });

        if (quoteError) throw quoteError;

        // Fetch onboarding submissions
        const { data: onboardingData, error: onboardingError } = await supabase
          .from('onboarding_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (onboardingError) throw onboardingError;

        return {
          contact: contactData || [],
          quotes: quoteData || [],
          onboarding: onboardingData || [],
        };
      },
      staleTime: 1000 * 60 * 2, // 2 minutes
    }),
    
    visitors: (dateRange?: { start: Date; end: Date }) => ({
      queryKey: queryKeys.analytics.visitors(dateRange ? `${dateRange.start.toISOString()}-${dateRange.end.toISOString()}` : 'all'),
      queryFn: async () => {
        let query = supabase
          .from('visitor_metadata')
          .select('*')
          .order('visit_timestamp', { ascending: false });
        
        if (dateRange) {
          query = query
            .gte('visit_timestamp', dateRange.start.toISOString())
            .lte('visit_timestamp', dateRange.end.toISOString());
        }
        
        const { data, error } = await query.limit(1000);
        
        if (error) throw error;
        return data || [];
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    }),
  },
  
  zephel: {
    sessions: (userId: string) => ({
      queryKey: queryKeys.zephel.sessions(userId),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('zephel_sessions')
          .select('*')
          .eq('user_id', userId)
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        return data || [];
      },
      staleTime: 1000 * 60 * 1, // 1 minute
    }),
    
    messages: (sessionId: string) => ({
      queryKey: queryKeys.zephel.messages(sessionId),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('zephel_messages')
          .select('*')
          .eq('session_id', sessionId)
          .order('timestamp', { ascending: true });
        
        if (error) throw error;
        return data || [];
      },
      staleTime: 1000 * 60 * 1, // 1 minute
    }),
  },
};

// ============================================
// Mutation Helpers
// Standardized mutation functions
// ============================================

export const mutations = {
  favorites: {
    add: async (location: {
      location_name: string;
      latitude?: number;
      longitude?: number;
      country?: string;
    }) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) {
        throw new Error('Authentication required');
      }
      
      const { data, error } = await supabase
        .from('favorite_locations')
        .insert({
          user_id: session.session.user.id,
          ...location,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    remove: async (id: string) => {
      const { error } = await supabase
        .from('favorite_locations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
  },
  
  audio: {
    delete: async (id: string, storagePath: string) => {
      // Delete from storage first
      const { error: storageError } = await supabase.storage
        .from('audio-files')
        .remove([storagePath]);
      
      if (storageError) {
        console.error('Storage deletion error:', storageError);
      }
      
      // Delete from database
      const { error } = await supabase
        .from('audio_files')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    
    updateNotes: async (id: string, notes: string) => {
      const { data, error } = await supabase
        .from('audio_files')
        .update({ review_notes: notes })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
  },
  
  zephel: {
    createSession: async (userId: string, sessionName?: string) => {
      const { data, error } = await supabase
        .from('zephel_sessions')
        .insert({
          user_id: userId,
          session_name: sessionName || `Session ${new Date().toLocaleDateString()}`,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    
    deleteSession: async (sessionId: string) => {
      const { error } = await supabase
        .from('zephel_sessions')
        .delete()
        .eq('id', sessionId);
      
      if (error) throw error;
    },
    
    addMessage: async (message: {
      session_id: string;
      role: string;
      content: string;
      metadata?: Record<string, unknown>;
    }) => {
      const { data, error } = await supabase
        .from('zephel_messages')
        .insert(message)
        .select()
        .single();
      
      if (error) throw error;
      
      // Update session timestamp
      await supabase
        .from('zephel_sessions')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', message.session_id);
      
      return data;
    },
  },
};

// ============================================
// Invalidation Helpers
// Helper functions for cache invalidation
// ============================================

export const invalidateQueries = {
  favorites: () => queryKeys.favorites.all,
  audio: () => queryKeys.audio.all,
  analytics: () => queryKeys.analytics.all,
  zephel: (userId: string) => queryKeys.zephel.sessions(userId),
  admin: () => queryKeys.admin.users,
};
