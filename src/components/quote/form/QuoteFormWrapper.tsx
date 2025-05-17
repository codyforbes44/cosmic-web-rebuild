
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { submitToSupabase, QuoteFormData } from "@/lib/supabase";
import { trackFormSubmission } from '@/lib/tracking';
import { useLocation } from 'react-router-dom';
import { quoteFormSchema, QuoteFormValues } from './schema';

import PersonalInfoFields from './PersonalInfoFields';
import ContactInfoFields from './ContactInfoFields';
import ServiceInfoFields from './ServiceInfoFields';
import ProjectDetailsFields from './ProjectDetailsFields';
import TermsField from './TermsField';
import SubmitButton from './SubmitButton';

const QuoteFormWrapper = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      budget: '',
      serviceType: '',
      projectDescription: '',
      timeline: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare data for submission - map camelCase form fields to snake_case DB fields
      const submissionData: QuoteFormData = {
        full_name: data.fullName,
        company_name: data.companyName,
        email: data.email,
        phone: data.phone,
        budget: data.budget,
        service_type: data.serviceType,
        project_description: data.projectDescription,
        timeline: data.timeline,
        terms_accepted: data.termsAccepted,
        created_at: new Date().toISOString(),
      };
      
      // Submit data using our helper function
      const { success, error } = await submitToSupabase('quote_requests', submissionData);
      
      if (!success) throw error;
      
      // Track form submission
      await trackFormSubmission('quote', data, location.pathname);
      
      // Show success message to user
      toast.success("Thank you for your request! We'll get back to you with a consultation within 1-2 business days.");
      form.reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error?.message || "Failed to submit your consultation request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="space-card p-8 rounded-xl">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold mb-6 text-white">Request Your Consultation</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoFields control={form.control} />
            <ContactInfoFields control={form.control} />
            <ServiceInfoFields control={form.control} />
            <ProjectDetailsFields control={form.control} />
            <TermsField control={form.control} />
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuoteFormWrapper;
