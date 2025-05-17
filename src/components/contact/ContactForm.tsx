
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
import { supabase, ContactFormData, isSupabaseConfigured } from "@/lib/supabase";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured) {
        console.log('Form submission data:', data);
        toast.success("Demo mode: Your message has been received! In a real app, this would be saved to Supabase.");
        form.reset();
        return;
      }
      
      // Prepare data for Supabase - Explicitly define all required properties
      const submissionData: ContactFormData = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        createdAt: new Date().toISOString(),
      };
      
      // Insert data into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);
      
      if (error) throw error;
      
      toast.success("Thank you for your message! We'll get back to you soon.");
      form.reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || "Failed to submit the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-white">Send us a message</h2>
      {!isSupabaseConfigured && (
        <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-md">
          <p className="text-yellow-300 text-sm">
            <strong>Demo Mode:</strong> This form is running without a backend connection. 
            Your submissions won't be stored permanently.
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
                    placeholder="Your name"
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
                    className="bg-gray-800 border border-gray-700 text-white focus:border-accent"
                    placeholder="How can we help you?"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/80 text-white py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : 'Send Message'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
