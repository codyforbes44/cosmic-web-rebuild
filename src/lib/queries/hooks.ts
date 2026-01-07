/**
 * React Query Hooks
 * 
 * Pre-built hooks that wrap the query factory for common use cases.
 * These provide a cleaner API and handle common patterns like
 * authentication checks and error handling.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queries, mutations, queryKeys } from './index';
import { useToast } from '@/hooks/use-toast';

// ============================================
// Favorites Hooks
// ============================================

export const useFavoriteLocationsQuery = () => {
  return useQuery(queries.favorites.locations());
};

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: mutations.favorites.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
      toast({
        title: 'Location saved',
        description: 'Added to your favorites',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save location',
        variant: 'destructive',
      });
    },
  });
};

export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: mutations.favorites.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all });
      toast({
        title: 'Location removed',
        description: 'Removed from your favorites',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to remove location',
        variant: 'destructive',
      });
    },
  });
};

// ============================================
// Audio Hooks
// ============================================

export const useAudioHistoryQuery = () => {
  return useQuery(queries.audio.history());
};

export const useDeleteAudioMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, storagePath }: { id: string; storagePath: string }) => 
      mutations.audio.delete(id, storagePath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.audio.all });
      toast({
        title: 'Audio deleted',
        description: 'File has been removed',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete audio',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateAudioNotesMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      mutations.audio.updateNotes(id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.audio.all });
    },
  });
};

// ============================================
// Subscription Hooks
// ============================================

export const useSubscriptionPackagesQuery = () => {
  return useQuery(queries.subscriptions.packages());
};

// ============================================
// Admin Hooks
// ============================================

export const useAdminUsersQuery = () => {
  return useQuery(queries.admin.users());
};

// ============================================
// Analytics Hooks
// ============================================

export const useFormSubmissionsQuery = () => {
  return useQuery(queries.analytics.formSubmissions());
};

export const useVisitorAnalyticsQuery = (dateRange?: { start: Date; end: Date }) => {
  return useQuery(queries.analytics.visitors(dateRange));
};

// ============================================
// Zephel Hooks
// ============================================

export const useZephelSessionsQuery = (userId: string | undefined) => {
  return useQuery({
    ...queries.zephel.sessions(userId || ''),
    enabled: !!userId,
  });
};

export const useZephelMessagesQuery = (sessionId: string | undefined) => {
  return useQuery({
    ...queries.zephel.messages(sessionId || ''),
    enabled: !!sessionId,
  });
};

export const useCreateZephelSessionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, sessionName }: { userId: string; sessionName?: string }) =>
      mutations.zephel.createSession(userId, sessionName),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zephel.sessions(variables.userId) });
    },
  });
};

export const useDeleteZephelSessionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mutations.zephel.deleteSession,
  });
};

export const useAddZephelMessageMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mutations.zephel.addMessage,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.zephel.messages(variables.session_id) });
    },
  });
};

// ============================================
// Profile Hooks
// ============================================

export const useProfileQuery = (userId: string | undefined) => {
  return useQuery({
    ...queries.profiles.byUserId(userId || ''),
    enabled: !!userId,
  });
};
