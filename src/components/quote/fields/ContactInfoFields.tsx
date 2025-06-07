
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormData } from "../types/formSchema";

interface ContactInfoFieldsProps {
  control: Control<FormData>;
}

const ContactInfoFields = ({ control }: ContactInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="john@example.com"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Phone Number</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-gray-800 border border-gray-700 text-white focus:border-accent"
                placeholder="+1 (555) 123-4567"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactInfoFields;
