
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormData } from '../types/formSchema';

export const useQuoteSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuote = async (data: FormData, resetForm: () => void) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('quote_requests')
        .insert([data]);
      
      if (error) {
        console.error('Error submitting quote request:', error);
        toast.error("There was a problem submitting your request. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      toast.success("Thank you for your request! We'll get back to you with a quote within 1-2 business days.");
      console.log("Form submitted:", data);
      resetForm();
    } catch (err) {
      console.error('Exception when submitting quote request:', err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitQuote };
};
