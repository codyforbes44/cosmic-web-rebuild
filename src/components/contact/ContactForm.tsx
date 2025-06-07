
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { sanitizeInput, isValidEmail, checkRateLimit, detectInjection } from '@/utils/security';

// Enhanced form schema with more robust validation
const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email address is too long." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2000, { message: "Message must be less than 2000 characters." }),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
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
      form.reset();
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

  // Prevent multiple rapid submissions
  const isFormDisabled = isSubmitting || submissionCount >= 5;

  return (
    <div className="space-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
      
      {submissionCount >= 5 && (
        <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-md">
          <p className="text-yellow-200 text-sm">
            You've reached the maximum number of submissions. Please contact us directly if you need immediate assistance.
          </p>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-gray-800 border border-gray-700 text-white focus:border-accent"
                    placeholder="Your full name"
                    disabled={isFormDisabled}
                    maxLength={100}
                    onChange={(e) => {
                      // Real-time sanitization
                      const sanitized = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
                      field.onChange(sanitized);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="bg-gray-800 border border-gray-700 text-white focus:border-accent"
                    placeholder="your.email@example.com"
                    disabled={isFormDisabled}
                    maxLength={254}
                    onChange={(e) => {
                      // Convert to lowercase for consistency
                      field.onChange(e.target.value.toLowerCase());
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Subject</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isFormDisabled}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-800 border border-gray-700 text-white focus:border-accent">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="feedback">Website Feedback</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                    <SelectItem value="services">Business Services</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    className="bg-gray-800 border border-gray-700 text-white focus:border-accent resize-none"
                    placeholder="How can we help you? Please provide as much detail as possible."
                    disabled={isFormDisabled}
                    maxLength={2000}
                  />
                </FormControl>
                <div className="flex justify-between">
                  <FormMessage />
                  <span className="text-xs text-gray-400">
                    {field.value?.length || 0}/2000
                  </span>
                </div>
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/80 text-white py-3"
            disabled={isFormDisabled}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : isFormDisabled && submissionCount >= 5 ? (
              'Maximum submissions reached'
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>Your information is secure and will only be used to respond to your inquiry.</p>
      </div>
    </div>
  );
};

export default ContactForm;
