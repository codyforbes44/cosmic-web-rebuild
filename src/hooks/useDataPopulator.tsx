
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useDataPopulator = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset analytics data across all tables
  const populateData = async () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessedCount(0);
    setError(null);
    
    try {
      const totalSteps = 6; // Number of tables to clear
      let currentStep = 0;
      
      toast({
        title: "Clearing analytics data",
        description: "Removing analytics data from all Supabase tables...",
        variant: "default"
      });
      
      // Clear visitor tracking data
      await supabase.from('visitor_tracking').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      currentStep++;
      setProgress(Math.round((currentStep / totalSteps) * 100));
      
      // Clear form submissions
      await supabase.from('form_submissions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      currentStep++;
      setProgress(Math.round((currentStep / totalSteps) * 100));
      
      // Clear chat interactions
      await supabase.from('chat_interactions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      currentStep++;
      setProgress(Math.round((currentStep / totalSteps) * 100));
      
      // Clear contact submissions
      await supabase.from('contact_submissions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      currentStep++;
      setProgress(Math.round((currentStep / totalSteps) * 100));
      
      // Clear newsletter subscribers
      await supabase.from('newsletter_subscribers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      currentStep++;
      setProgress(Math.round((currentStep / totalSteps) * 100));
      
      // Clear quote submissions
      await supabase.from('quote_submissions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      currentStep++;
      setProgress(Math.round((currentStep / totalSteps) * 100));
      
      toast({
        title: "Data reset complete",
        description: "Successfully reset all analytics data across all tables. The dashboard will now show only new activity.",
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
