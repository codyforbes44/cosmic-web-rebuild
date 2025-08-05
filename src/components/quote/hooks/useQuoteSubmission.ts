
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { FormData } from '../types/formSchema';
import { 
  sanitizeInput, 
  isValidEmail, 
  detectInjection, 
  checkRateLimit,
  securityLogger 
} from '@/utils/security';

export const useQuoteSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuote = async (data: FormData, resetForm: () => void) => {
    setIsSubmitting(true);
    
    try {
      // Rate limiting check
      const rateLimitCheck = checkRateLimit('quote_request', 3, 15 * 60 * 1000);
      if (!rateLimitCheck.allowed) {
        securityLogger.logRateLimitViolation('quote_request', 3);
        toast.error("Too many quote requests. Please wait before submitting again.");
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      if (!isValidEmail(data.email)) {
        securityLogger.logEvent({
          type: 'input_validation',
          severity: 'low',
          message: 'Invalid email format in quote submission',
          details: { email: data.email.substring(0, 10) + '...' }
        });
        toast.error("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      // Check for injection attempts
      const fieldsToCheck = [data.fullName, data.companyName, data.projectDescription];
      for (const field of fieldsToCheck) {
        if (field && detectInjection(field)) {
          securityLogger.logInjectionAttempt(field, 'form_input');
          toast.error("Invalid input detected. Please check your submission.");
          setIsSubmitting(false);
          return;
        }
      }

      // Sanitize input data and map to database schema
      const sanitizedData = {
        full_name: sanitizeInput(data.fullName),
        company_name: sanitizeInput(data.companyName),
        project_description: sanitizeInput(data.projectDescription),
        email: sanitizeInput(data.email),
        phone: data.phone ? sanitizeInput(data.phone) : data.phone,
        service_type: data.serviceType,
        budget: data.budget,
        timeline: data.timeline,
        terms_accepted: data.termsAccepted,
      };

      const { error } = await supabase
        .from('quote_requests')
        .insert([sanitizedData]);
      
      if (error) {
        console.error('Error submitting quote request:', error);
        toast.error("There was a problem submitting your request. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      toast.success("Thank you for your request! We'll get back to you with a quote within 1-2 business days.");
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
