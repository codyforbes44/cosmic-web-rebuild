
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { z } from "zod";
import { quoteFormSchema } from "./schema";

type FormValues = z.infer<typeof quoteFormSchema>;

interface ServiceInfoFieldsProps {
  control: Control<FormValues>;
}

const ServiceInfoFields = ({ control }: ServiceInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name="serviceType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Service Type</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-white focus:border-accent">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="strategy">Business Strategy</SelectItem>
                <SelectItem value="software">Custom Software</SelectItem>
                <SelectItem value="ai">AI & Automation</SelectItem>
                <SelectItem value="cloud">Cloud Solutions</SelectItem>
                <SelectItem value="security">Security & Compliance</SelectItem>
                <SelectItem value="support">Managed IT Services</SelectItem>
                <SelectItem value="other">Other Services</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Estimated Budget (Optional)</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-white focus:border-accent">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="<5k">Less than $5,000</SelectItem>
                <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k+">$100,000+</SelectItem>
                <SelectItem value="undecided">Not yet determined</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ServiceInfoFields;
