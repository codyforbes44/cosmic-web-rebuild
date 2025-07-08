
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { OnboardingFormData } from '../types/formSchema';
import { generateOnboardingPDF } from '@/utils/onboardingPdfGenerator';

export const useOnboardingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitOnboarding = async (data: OnboardingFormData, onSuccess: () => void) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('onboarding_submissions')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          company_name: data.companyName,
          industry: data.industry,
          company_size: data.companySize,
          website: data.website || null,
          primary_goals: data.primaryGoals,
          budget: data.budget,
          monthly_marketing_budget: data.monthlyMarketingBudget,
          timeline: data.timeline,
          preferred_contact: data.preferredContact,
          communication_frequency: data.communicationFrequency,
          terms_accepted: data.termsAccepted,
        });

      if (error) throw error;

      // Generate and download PDF
      generateOnboardingPDF(data);

      toast({
        title: "Welcome to ƷBI!",
        description: "Your onboarding form has been submitted successfully and a PDF copy has been downloaded. We'll be in touch within 24 hours.",
      });

      onSuccess();
    } catch (error) {
      console.error('Error submitting onboarding form:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitOnboarding,
  };
};
