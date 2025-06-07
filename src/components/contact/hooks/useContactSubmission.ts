
import { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, isValidEmail, checkRateLimit, detectInjection } from '@/utils/security';
import { ContactFormData } from '../types/formSchema';

export const useContactSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  const submitContact = async (data: ContactFormData, resetForm: () => void) => {
    setIsSubmitting(true);
    
    try {
      // Rate limiting check
      const clientId = `${data.email}_${navigator.userAgent.slice(0, 50)}`;
      const rateLimitCheck = checkRateLimit(`contact_form_${clientId}`, 3, 3600000); // 3 submissions per hour
      
      if (!rateLimitCheck.allowed) {
        const message = rateLimitCheck.blockedUntil 
          ? `Too many submissions. Please try again after ${new Date(rateLimitCheck.blockedUntil).toLocaleTimeString()}`
          : 'Too many submissions. Please wait before submitting again.';
        toast.error(message);
        setIsSubmitting(false);
        return;
      }

      // Enhanced input validation and sanitization
      if (!isValidEmail(data.email)) {
        toast.error("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      // Check for injection attempts
      const inputs = [data.name, data.email, data.subject, data.message];
      const hasInjection = inputs.some(input => detectInjection(input));
      
      if (hasInjection) {
        console.warn('Potential injection attempt detected:', data);
        toast.error("Invalid input detected. Please check your submission.");
        setIsSubmitting(false);
        return;
      }

      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(data.name).trim(),
        email: data.email.toLowerCase().trim(),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message).trim(),
      };

      // Additional validation after sanitization
      if (sanitizedData.name.length < 2 || sanitizedData.message.length < 10) {
        toast.error("Please ensure all fields meet the minimum requirements.");
        setIsSubmitting(false);
        return;
      }

      // Save to Supabase with error handling
      const { error } = await supabase
        .from('contact_submissions')
        .insert([sanitizedData]);
      
      if (error) {
        console.error('Error submitting contact form:', error);
        
        if (error.message.includes('rate limit')) {
          toast.error("Too many submissions. Please wait before trying again.");
        } else if (error.message.includes('violates row-level security')) {
          toast.error("Security error. Please try again or contact support.");
        } else {
          toast.error("There was a problem sending your message. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }
      
      // Success
      toast.success("Thank you for your message! We'll get back to you soon.");
      resetForm();
      setSubmissionCount(prev => prev + 1);
      
      // Clear rate limit on successful submission (allow immediate follow-ups if needed)
      if (rateLimitCheck.remainingAttempts > 1) {
        localStorage.removeItem(`rate_limit_contact_form_${clientId}`);
      }
      
    } catch (err) {
      console.error('Exception when submitting contact form:', err);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submissionCount, submitContact };
};
