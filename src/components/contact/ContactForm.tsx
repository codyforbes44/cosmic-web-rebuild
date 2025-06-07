
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from "@/components/ui/form";
import { contactFormSchema, ContactFormData } from './types/formSchema';
import { useContactSubmission } from './hooks/useContactSubmission';
import ContactFormFields from './fields/ContactFormFields';
import ContactSubmitButton from './components/ContactSubmitButton';
import SubmissionLimitWarning from './components/SubmissionLimitWarning';

const ContactForm = () => {
  const { isSubmitting, submissionCount, submitContact } = useContactSubmission();
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    await submitContact(data, () => form.reset());
  };

  // Prevent multiple rapid submissions
  const isFormDisabled = isSubmitting || submissionCount >= 5;

  return (
    <div className="space-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
      
      <SubmissionLimitWarning submissionCount={submissionCount} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ContactFormFields control={form.control} isFormDisabled={isFormDisabled} />
          <ContactSubmitButton 
            isSubmitting={isSubmitting} 
            isFormDisabled={isFormDisabled}
            submissionCount={submissionCount}
          />
        </form>
      </Form>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>Your information is secure and will only be used to respond to your inquiry.</p>
      </div>
    </div>
  );
};

export default ContactForm;
