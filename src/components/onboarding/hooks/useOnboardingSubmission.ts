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

// Helper function to send email notifications for onboarding submissions
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
    const fullName = `${data.first_name} ${data.last_name}`;
    
    // Send confirmation email to the submitter
    await supabase.functions.invoke('email-service', {
      body: {
        to: data.email,
        subject: 'Welcome to ƷBI - Onboarding Confirmed',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0A1628; color: #E2E8F0;">
            <h1 style="color: #E85D2A; margin-bottom: 20px;">Welcome to ƷBI, ${data.first_name}!</h1>
            <p>Thank you for completing your onboarding form. We're excited to have ${data.company_name} join us!</p>
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #E85D2A; margin-top: 0;">What's Next?</h3>
              <ul style="color: #94A3B8; padding-left: 20px;">
                <li>Our team will review your information within 24 hours</li>
                <li>We'll reach out via your preferred contact method (${data.preferred_contact})</li>
                <li>We'll discuss your goals and create a tailored plan</li>
              </ul>
            </div>
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #E85D2A; margin-top: 0;">Your Submission Summary</h3>
              <p><strong style="color: #94A3B8;">Company:</strong> ${data.company_name}</p>
              <p><strong style="color: #94A3B8;">Industry:</strong> ${data.industry}</p>
              <p><strong style="color: #94A3B8;">Timeline:</strong> ${data.timeline}</p>
              <p><strong style="color: #94A3B8;">Goals:</strong> ${data.primary_goals.join(', ')}</p>
            </div>
            <p>If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:support@3bi.io" style="color: #E85D2A;">support@3bi.io</a></p>
            <p>Best regards,<br>The ƷBI Team</p>
          </div>
        `,
      },
    });

    // Send notification to admin
    await supabase.functions.invoke('email-service', {
      body: {
        to: 'support@3bi.io',
        subject: `🎉 New Client Onboarding: ${data.company_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0A1628; color: #E2E8F0;">
            <h2 style="color: #E85D2A; margin-bottom: 20px;">🎉 New Client Onboarding Submission</h2>
            
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #F8FAFC; margin-top: 0;">Contact Information</h3>
              <p><strong style="color: #94A3B8;">Name:</strong> ${fullName}</p>
              <p><strong style="color: #94A3B8;">Email:</strong> <a href="mailto:${data.email}" style="color: #E85D2A;">${data.email}</a></p>
              <p><strong style="color: #94A3B8;">Phone:</strong> <a href="tel:${data.phone}" style="color: #E85D2A;">${data.phone}</a></p>
              <p><strong style="color: #94A3B8;">Preferred Contact:</strong> ${data.preferred_contact}</p>
              <p><strong style="color: #94A3B8;">Communication Frequency:</strong> ${data.communication_frequency}</p>
            </div>
            
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #F8FAFC; margin-top: 0;">Company Details</h3>
              <p><strong style="color: #94A3B8;">Company:</strong> ${data.company_name}</p>
              <p><strong style="color: #94A3B8;">Industry:</strong> <span style="background: #E85D2A; color: white; padding: 2px 8px; border-radius: 4px;">${data.industry}</span></p>
              <p><strong style="color: #94A3B8;">Company Size:</strong> ${data.company_size}</p>
              ${data.website ? `<p><strong style="color: #94A3B8;">Website:</strong> <a href="${data.website}" style="color: #E85D2A;">${data.website}</a></p>` : ''}
            </div>
            
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #F8FAFC; margin-top: 0;">Project Requirements</h3>
              <p><strong style="color: #94A3B8;">Budget:</strong> <span style="background: #10B981; color: white; padding: 2px 8px; border-radius: 4px;">${data.budget}</span></p>
              <p><strong style="color: #94A3B8;">Timeline:</strong> ${data.timeline}</p>
              <div style="margin-top: 12px;">
                <strong style="color: #94A3B8;">Primary Goals:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                  ${data.primary_goals.map(goal => `<li style="color: #E2E8F0;">${goal}</li>`).join('')}
                </ul>
              </div>
            </div>
            
            <p style="font-size: 12px; color: #64748B;">
              Received at ${new Date().toLocaleString()} via 3bi.io onboarding form
            </p>
            <a href="https://3bi.io/admin?tab=overview" style="display: inline-block; background: #E85D2A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 16px;">
              View in Admin Dashboard
            </a>
          </div>
        `,
      },
    });
  } catch (error) {
    console.error('Error sending onboarding email notifications:', error);
    // Don't throw - email failures shouldn't affect form submission success
  }
}
