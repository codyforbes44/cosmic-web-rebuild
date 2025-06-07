
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ContactFormData } from "../types/formSchema";

interface ContactFormFieldsProps {
  control: Control<ContactFormData>;
  isFormDisabled: boolean;
}

const ContactFormFields = ({ control, isFormDisabled }: ContactFormFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
};

export default ContactFormFields;
