
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FavoriteLocation {
  id: string;
  location_name: string;
  latitude?: number;
  longitude?: number;
  country?: string;
}

export const useFavoriteLocations = () => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFavorites = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('favorite_locations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
        if (error.message.includes('violates row-level security')) {
          toast({
            title: "Authentication Required",
            description: "Please log in to view your favorite locations",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to load favorite locations",
            variant: "destructive",
          });
        }
        throw error;
      }
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (locationName: string, latitude?: number, longitude?: number, country?: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save favorite locations",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('favorite_locations')
        .insert({
          user_id: session.session.user.id,
          location_name: locationName,
          latitude,
          longitude,
          country,
        });

      if (error) {
        console.error('Error adding favorite:', error);
        if (error.code === '23505') {
          toast({
            title: "Already Favorited",
            description: "This location is already in your favorites",
            variant: "destructive",
          });
        } else if (error.message.includes('violates row-level security')) {
          toast({
            title: "Permission Denied",
            description: "You do not have permission to add this location",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to add location to favorites",
            variant: "destructive",
          });
        }
        throw error;
      }

      toast({
        title: "Success",
        description: "Location added to favorites",
      });

      fetchFavorites();
      return true;
    } catch (error: any) {
      console.error('Error adding favorite:', error);
      return false;
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorite_locations')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing favorite:', error);
        if (error.message.includes('violates row-level security')) {
          toast({
            title: "Permission Denied",
            description: "You do not have permission to remove this location",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to remove location from favorites",
            variant: "destructive",
          });
        }
        throw error;
      }

      toast({
        title: "Success",
        description: "Location removed from favorites",
      });

      fetchFavorites();
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    refetch: fetchFavorites,
  };
};
