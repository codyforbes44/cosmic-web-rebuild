
import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, StarOff, Loader2 } from 'lucide-react';
import { useFavoriteLocations } from '@/hooks/useFavoriteLocations';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from "@/hooks/use-mobile";

interface AddToFavoritesProps {
  location: string;
  latitude?: number;
  longitude?: number;
  country?: string;
}

const AddToFavorites = ({ location, latitude, longitude, country }: AddToFavoritesProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteLocations();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Check if the current location is already a favorite
  const existingFavorite = favorites.find(fav => fav.location_name === location);
  
  React.useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session?.user);
    };
    
    checkAuth();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleToggleFavorite = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save favorite locations",
        variant: "destructive",
      });
      return;
    }

    if (!location) return;
    
    setIsProcessing(true);
    
    try {
      if (existingFavorite) {
        await removeFavorite(existingFavorite.id);
      } else {
        await addFavorite(location, latitude, longitude, country);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      variant="outline"
      size={isMobile ? "sm" : "default"}
      onClick={handleToggleFavorite}
      disabled={isProcessing || !location}
      className={`
        ${existingFavorite 
          ? 'bg-accent/10 text-accent border-accent/30 hover:bg-accent-hover/20' 
          : 'bg-transparent border-white/20 text-white hover:bg-white/10'
        } 
        transition-all duration-200 focus:ring-2 focus:ring-accent
      `}
    >
      {isProcessing ? (
        <Loader2 className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} animate-spin mr-2`} />
      ) : existingFavorite ? (
        <Star className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-accent fill-accent mr-2`} />
      ) : (
        <Star className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
      )}
      {existingFavorite ? 'Saved' : 'Save Location'}
    </Button>
  );
};

export default AddToFavorites;
