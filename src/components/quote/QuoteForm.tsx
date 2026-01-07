
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { formSchema, FormData } from './types/formSchema';
import { useQuoteSubmission } from './hooks/useQuoteSubmission';
import PersonalInfoFields from './fields/PersonalInfoFields';
import ContactInfoFields from './fields/ContactInfoFields';
import ProjectDetailsFields from './fields/ProjectDetailsFields';
import TermsAndSubmitFields from './fields/TermsAndSubmitFields';

const QuoteForm = () => {
  const { isSubmitting, submitQuote } = useQuoteSubmission();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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
      honeypot: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await submitQuote(data, () => form.reset());
  };

  return (
    <Card className="space-card p-8 rounded-xl">
      <CardContent className="p-0">
        <h2 className="text-2xl font-bold mb-6 text-white">Request Your Quote</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoFields control={form.control} />
            <ContactInfoFields control={form.control} />
            <ProjectDetailsFields control={form.control} />
            <TermsAndSubmitFields control={form.control} isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;
