
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { generateVisitorData, generateFormData, generateChatData } from '@/utils/dataGenerators';

export const useDataPopulator = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Populate the database with sample data
  const populateData = async () => {
    setIsProcessing(true);
    setProgress(0);
    setProcessedCount(0);
    setError(null);
    
    try {
      // Step 1: Clear existing data
      toast({
        title: "Clearing existing data",
        description: "Removing all existing analytics data...",
        variant: "default"
      });
      
      await supabase.from('visitor_tracking').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('form_submissions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('chat_interactions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      setProgress(20);
      
      // Step 2: Generate and insert visitor data (100 records)
      toast({
        title: "Adding visitor data",
        description: "Generating 100 visitor records...",
        variant: "default"
      });
      
      const visitorData = generateVisitorData(100);
      
      for (let i = 0; i < visitorData.length; i += 10) {
        const batch = visitorData.slice(i, i + 10);
        await supabase.from('visitor_tracking').insert(batch);
        setProgress(20 + Math.floor((i / visitorData.length) * 30));
        setProcessedCount(i + batch.length);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to avoid rate limits
      }
      
      setProgress(50);
      
      // Step 3: Generate and insert form submission data (30 records)
      toast({
        title: "Adding form submission data",
        description: "Generating 30 form submission records...",
        variant: "default"
      });
      
      const formData = generateFormData(30);
      
      for (let i = 0; i < formData.length; i += 5) {
        const batch = formData.slice(i, i + 5);
        await supabase.from('form_submissions').insert(batch);
        setProgress(50 + Math.floor((i / formData.length) * 25));
        setProcessedCount(100 + i + batch.length);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to avoid rate limits
      }
      
      setProgress(75);
      
      // Step 4: Generate and insert chat interaction data (50 records)
      toast({
        title: "Adding chat interaction data",
        description: "Generating 50 chat interaction records...",
        variant: "default"
      });
      
      const chatData = generateChatData(50);
      
      for (let i = 0; i < chatData.length; i += 5) {
        const batch = chatData.slice(i, i + 5);
        await supabase.from('chat_interactions').insert(batch);
        setProgress(75 + Math.floor((i / chatData.length) * 25));
        setProcessedCount(130 + i + batch.length);
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay to avoid rate limits
      }
      
      setProgress(100);
      
      toast({
        title: "Data population complete",
        description: "Successfully added sample analytics data.",
        variant: "default"
      });
    } catch (err: any) {
      console.error('Error populating data:', err);
      setError(err.message || "Failed to populate analytics data");
      toast({
        title: "Error populating data",
        description: err.message || "Failed to populate analytics data",
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
