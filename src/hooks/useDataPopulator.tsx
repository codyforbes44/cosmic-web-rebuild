
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useDataPopulator = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset analytics data - no demo data generation
  const populateData = async () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessedCount(0);
    setError(null);
    
    try {
      // Clear existing data
      toast({
        title: "Clearing analytics data",
        description: "Removing all existing analytics data...",
        variant: "default"
      });
      
      await supabase.from('visitor_tracking').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      setProgress(33);
      
      await supabase.from('form_submissions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      setProgress(66);
      
      await supabase.from('chat_interactions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      setProgress(100);
      
      toast({
        title: "Data reset complete",
        description: "Successfully reset analytics data. The dashboard will now show only new activity.",
        variant: "default"
      });
    } catch (err: any) {
      console.error('Error resetting data:', err);
      setError(err.message || "Failed to reset analytics data");
      toast({
        title: "Error resetting data",
        description: err.message || "Failed to reset analytics data",
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
    error,
    populateData
  };
};
