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
      // Honeypot check - reject if filled (bots typically fill this)
      if (data.honeypot) {
        console.warn('Honeypot triggered - likely bot submission');
        toast.error("An error occurred. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Rate limiting check
      const rateLimitCheck = checkRateLimit('quote_request', 3, 15 * 60 * 1000);
      if (!rateLimitCheck.allowed) {
        securityLogger.log('rate_limit_violation', { action: 'quote_request', limit: 3 }, 'medium');
        toast.error("Too many quote requests. Please wait before submitting again.");
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      if (!isValidEmail(data.email)) {
        securityLogger.log('input_validation', { 
          type: 'invalid_email', 
          email: data.email.substring(0, 10) + '...' 
        }, 'low');
        toast.error("Please enter a valid email address.");
        setIsSubmitting(false);
        return;
      }

      // Check for injection attempts
      const fieldsToCheck = [data.fullName, data.companyName, data.projectDescription];
      for (const field of fieldsToCheck) {
        if (field && detectInjection(field)) {
          securityLogger.log('injection_attempt', { fieldType: 'form_input' }, 'high');
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
        honeypot: data.honeypot || '',
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
      
      // Send email notifications (async, don't block success)
      sendQuoteEmailNotifications(sanitizedData).catch(err => 
        console.error('Failed to send quote email notifications:', err)
      );
      
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

// Helper function to send email notifications for quote requests
async function sendQuoteEmailNotifications(data: {
  full_name: string;
  company_name: string;
  email: string;
  phone?: string;
  service_type: string;
  budget?: string;
  timeline?: string;
  project_description: string;
}) {
  try {
    // Send confirmation email to the submitter
    await supabase.functions.invoke('email-service', {
      body: {
        to: data.email,
        subject: `Quote Request Received - ${data.service_type}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0A1628; color: #E2E8F0;">
            <h1 style="color: #E85D2A; margin-bottom: 20px;">Thank You for Your Quote Request!</h1>
            <p>Dear ${data.full_name},</p>
            <p>We've received your quote request and our team is reviewing the details. You can expect to hear back from us within 1-2 business days.</p>
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #E85D2A; margin-top: 0;">Request Summary</h3>
              <p><strong style="color: #94A3B8;">Service:</strong> ${data.service_type}</p>
              <p><strong style="color: #94A3B8;">Company:</strong> ${data.company_name}</p>
              ${data.budget ? `<p><strong style="color: #94A3B8;">Budget:</strong> ${data.budget}</p>` : ''}
              ${data.timeline ? `<p><strong style="color: #94A3B8;">Timeline:</strong> ${data.timeline}</p>` : ''}
            </div>
            <p>If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:contact@3bi.io" style="color: #E85D2A;">contact@3bi.io</a></p>
            <p>Best regards,<br>The ƷBI Team</p>
          </div>
        `,
      },
    });

    // Send notification to admin
    await supabase.functions.invoke('email-service', {
      body: {
        to: 'contact@3bi.io',
        subject: `New Quote Request: ${data.service_type} - ${data.company_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0A1628; color: #E2E8F0;">
            <h2 style="color: #E85D2A; margin-bottom: 20px;">🎯 New Quote Request</h2>
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #F8FAFC; margin-top: 0;">Contact Details</h3>
              <p><strong style="color: #94A3B8;">Name:</strong> ${data.full_name}</p>
              <p><strong style="color: #94A3B8;">Company:</strong> ${data.company_name}</p>
              <p><strong style="color: #94A3B8;">Email:</strong> <a href="mailto:${data.email}" style="color: #E85D2A;">${data.email}</a></p>
              ${data.phone ? `<p><strong style="color: #94A3B8;">Phone:</strong> <a href="tel:${data.phone}" style="color: #E85D2A;">${data.phone}</a></p>` : ''}
            </div>
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #F8FAFC; margin-top: 0;">Project Details</h3>
              <p><strong style="color: #94A3B8;">Service Type:</strong> <span style="background: #E85D2A; color: white; padding: 2px 8px; border-radius: 4px;">${data.service_type}</span></p>
              ${data.budget ? `<p><strong style="color: #94A3B8;">Budget:</strong> ${data.budget}</p>` : ''}
              ${data.timeline ? `<p><strong style="color: #94A3B8;">Timeline:</strong> ${data.timeline}</p>` : ''}
              <div style="margin-top: 16px;">
                <strong style="color: #94A3B8;">Project Description:</strong>
                <div style="background: #0F172A; padding: 12px; border-radius: 4px; margin-top: 8px; white-space: pre-wrap;">${data.project_description}</div>
              </div>
            </div>
            <p style="font-size: 12px; color: #64748B;">
              Received at ${new Date().toLocaleString()} via 3bi.io quote request form
            </p>
            <a href="https://3bi.io/admin?tab=overview" style="display: inline-block; background: #E85D2A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 16px;">
              View in Admin Dashboard
            </a>
          </div>
        `,
      },
    });
  } catch (error) {
    console.error('Error sending quote email notifications:', error);
    // Don't throw - email failures shouldn't affect form submission success
  }
}
