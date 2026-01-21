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
      // Honeypot check - reject if filled (bots typically fill this)
      if (data.honeypot) {
        console.warn('Honeypot triggered - likely bot submission');
        toast({
          title: "Submission Failed",
          description: "An error occurred. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Prepare sanitized data for database
      const sanitizedData = {
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
        timeline: data.timeline,
        preferred_contact: data.preferredContact,
        communication_frequency: data.communicationFrequency,
        terms_accepted: data.termsAccepted,
        honeypot: data.honeypot || '',
      };

      const { error } = await supabase
        .from('onboarding_submissions')
        .insert(sanitizedData);

      if (error) throw error;

      // Send email notifications (async, don't block success)
      sendOnboardingEmailNotifications(sanitizedData).catch(err => 
        console.error('Failed to send onboarding email notifications:', err)
      );

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

// Helper function to send email notifications using unified template system
async function sendOnboardingEmailNotifications(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  industry: string;
  company_size: string;
  website?: string | null;
  primary_goals: string[];
  budget: string;
  timeline: string;
  preferred_contact: string;
  communication_frequency: string;
}) {
  try {
    // Send confirmation email to the submitter
    await supabase.functions.invoke('email-service', {
      body: {
        to: data.email,
        subject: 'Welcome to ƷBI - Onboarding Confirmed',
        template: 'onboarding-confirmation',
        variables: {
          first_name: data.first_name,
          company_name: data.company_name,
          industry: data.industry,
          timeline: data.timeline,
          primary_goals: data.primary_goals,
          preferred_contact: data.preferred_contact,
        },
      },
    });

    // Send notification to admin
    await supabase.functions.invoke('email-service', {
      body: {
        to: 'support@3bi.io',
        subject: `🎉 New Client Onboarding: ${data.company_name}`,
        template: 'onboarding-admin',
        variables: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          company_name: data.company_name,
          industry: data.industry,
          company_size: data.company_size,
          website: data.website,
          primary_goals: data.primary_goals,
          budget: data.budget,
          timeline: data.timeline,
          preferred_contact: data.preferred_contact,
          communication_frequency: data.communication_frequency,
        },
      },
    });
  } catch (error) {
    console.error('Error sending onboarding email notifications:', error);
    // Don't throw - email failures shouldn't affect form submission success
  }
}
