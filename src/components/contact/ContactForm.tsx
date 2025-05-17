
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
import { submitToSupabase, ContactFormData } from "@/lib/supabase";
import { useTracking } from '@/hooks/use-tracking';
import { Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { trackFormSubmission } = useTracking();
  
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
      // Prepare data for submission
      const submissionData: ContactFormData = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        created_at: new Date().toISOString(),
      };
      
      // Submit data using our helper function
      const { success, error } = await submitToSupabase('contact_submissions', submissionData);
      
      if (!success) throw error;
      
      // Track form submission
      await trackFormSubmission('contact', data);
      
      // Show success message to user
      toast.success("Thank you for your message! We'll get back to you soon.");
      setIsSuccess(true);
      
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error?.message || "Failed to submit the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="space-card p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
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
                    className="bg-gray-800 border border-gray-700 text-white focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="Your name"
                    disabled={isSubmitting || isSuccess}
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
                    className="bg-gray-800 border border-gray-700 text-white focus:border-accent focus:ring-1 focus:ring-accent"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting || isSuccess}
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
                  disabled={isSubmitting || isSuccess}
                >
                  <FormControl>
                    <SelectTrigger className="bg-gray-800 border border-gray-700 text-white focus:border-accent focus:ring-1 focus:ring-accent">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-800 border border-gray-700 text-white">
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="feedback">Website Feedback</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                    <SelectItem value="services">Business Services</SelectItem>
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
                    className="bg-gray-800 border border-gray-700 text-white focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                    placeholder="How can we help you?"
                    disabled={isSubmitting || isSuccess}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className={`w-full py-3 h-auto transition-all duration-200 ${
              isSuccess
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-accent hover:bg-accent/80'
            } text-white`}
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Sending...
              </span>
            ) : isSuccess ? (
              <span className="flex items-center justify-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Message Sent!
              </span>
            ) : 'Send Message'}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactForm;
