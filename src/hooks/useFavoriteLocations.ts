/**
 * Favorite Locations Hook
 * 
 * Uses the centralized query factory for consistent data fetching.
 * Provides backwards-compatible API for existing consumers.
 */

import { useQueryClient } from '@tanstack/react-query';
import {
  useFavoriteLocationsQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '@/lib/queries/hooks';
import { queryKeys } from '@/lib/queries';

interface FavoriteLocation {
  id: string;
  location_name: string;
  latitude?: number;
  longitude?: number;
  country?: string;
}

export const useFavoriteLocations = () => {
  const queryClient = useQueryClient();
  
  // Use the centralized query
  const { 
    data: favorites = [], 
    isLoading: loading,
    refetch,
  } = useFavoriteLocationsQuery();
  
  // Use centralized mutations
  const addMutation = useAddFavoriteMutation();
  const removeMutation = useRemoveFavoriteMutation();

  // Backwards-compatible add function
  const addFavorite = async (
    locationName: string, 
    latitude?: number, 
    longitude?: number, 
    country?: string
  ): Promise<boolean> => {
    try {
      await addMutation.mutateAsync({
        location_name: locationName,
        latitude,
        longitude,
        country,
      });
      return true;
    } catch {
      return false;
    }
  };

  // Backwards-compatible remove function
  const removeFavorite = async (id: string): Promise<boolean> => {
    try {
      await removeMutation.mutateAsync(id);
      return true;
    } catch {
      return false;
    }
  };

  return {
    favorites: favorites as FavoriteLocation[],
    loading,
    addFavorite,
    removeFavorite,
    refetch,
    // Expose mutation states for advanced usage
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
};
