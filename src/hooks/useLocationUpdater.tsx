
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getLocationData } from '@/utils/ipGeolocation';
import { useToast } from '@/components/ui/use-toast';

export const useLocationUpdater = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [totalToProcess, setTotalToProcess] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const updateVisitorLocations = async () => {
    try {
      setError(null);
      setIsProcessing(true);
      setProgress(0);
      setProcessedCount(0);
      
      // Get visitors with missing location data
      const { data: visitors, error: fetchError } = await supabase
        .from('visitor_tracking')
        .select('id, ip_address')
        .or('country_code.is.null,city.is.null')
        .order('created_at', { ascending: false })
        .limit(100); // Process in batches of 100 to prevent timeout
      
      if (fetchError) throw fetchError;
      
      if (!visitors || visitors.length === 0) {
        toast({
          title: "No data to update",
          description: "All visitor records already have location data",
          variant: "default"
        });
        setIsProcessing(false);
        return;
      }
      
      setTotalToProcess(visitors.length);
      
      // Process each visitor
      let updatedCount = 0;
      for (const [index, visitor] of visitors.entries()) {
        if (!visitor.ip_address) {
          setProcessedCount(index + 1);
          setProgress(Math.round(((index + 1) / visitors.length) * 100));
          continue;
        }
        
        try {
          const locationData = await getLocationData(visitor.ip_address);
          
          if (locationData) {
            const { error: updateError } = await supabase
              .from('visitor_tracking')
              .update({
                country_code: locationData.country_code,
                city: locationData.city,
                state: locationData.region
              })
              .eq('id', visitor.id);
              
            if (!updateError) updatedCount++;
          }
        } catch (locationError) {
          console.error(`Error getting location for IP ${visitor.ip_address}:`, locationError);
        }
        
        setProcessedCount(index + 1);
        setProgress(Math.round(((index + 1) / visitors.length) * 100));
      }
      
      toast({
        title: "Location data updated",
        description: `Updated location data for ${updatedCount} visitor records`,
        variant: "default"
      });
    } catch (err: any) {
      console.error('Error updating visitor locations:', err);
      setError(err.message || 'Failed to update location data');
      toast({
        title: "Error updating locations",
        description: err.message || "There was a problem updating the location data",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    isProcessing,
    progress,
    processedCount,
    totalToProcess,
    error,
    updateVisitorLocations
  };
};
