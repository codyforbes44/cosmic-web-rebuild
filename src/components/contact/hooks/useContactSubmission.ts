
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
      // Honeypot check - reject if filled (bots typically fill this)
      if (data.honeypot) {
        console.warn('Honeypot triggered - likely bot submission');
        toast.error("An error occurred. Please try again.");
        setIsSubmitting(false);
        return;
      }

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
        honeypot: data.honeypot || '',
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
      
      // Send email notifications (async, don't block success)
      sendEmailNotifications(sanitizedData).catch(err => 
        console.error('Failed to send email notifications:', err)
      );
      
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

// Helper function to send email notifications
async function sendEmailNotifications(data: { name: string; email: string; subject: string; message: string }) {
  try {
    // Send confirmation email to the submitter
    await supabase.functions.invoke('email-service', {
      body: {
        to: data.email,
        subject: `We received your message: ${data.subject}`,
        template: 'contact',
        variables: {
          name: data.name,
          message: data.message,
        },
      },
    });

    // Send notification to admin
    await supabase.functions.invoke('email-service', {
      body: {
        to: 'support@3bi.io',
        subject: `New Contact Form Submission: ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0A1628; color: #E2E8F0;">
            <h2 style="color: #E85D2A; margin-bottom: 20px;">New Contact Form Submission</h2>
            <div style="background: #1E293B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong style="color: #94A3B8;">Name:</strong> ${data.name}</p>
              <p><strong style="color: #94A3B8;">Email:</strong> <a href="mailto:${data.email}" style="color: #E85D2A;">${data.email}</a></p>
              <p><strong style="color: #94A3B8;">Subject:</strong> ${data.subject}</p>
              <div style="margin-top: 16px;">
                <strong style="color: #94A3B8;">Message:</strong>
                <div style="background: #0F172A; padding: 12px; border-radius: 4px; margin-top: 8px; white-space: pre-wrap;">${data.message}</div>
              </div>
            </div>
            <p style="font-size: 12px; color: #64748B;">
              Received at ${new Date().toLocaleString()} via 3bi.io contact form
            </p>
            <a href="https://3bi.io/admin?tab=overview" style="display: inline-block; background: #E85D2A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 16px;">
              View in Admin Dashboard
            </a>
          </div>
        `,
      },
    });
  } catch (error) {
    console.error('Error sending email notifications:', error);
    // Don't throw - email failures shouldn't affect form submission success
  }
}
