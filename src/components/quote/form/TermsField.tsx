
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { z } from "zod";
import { quoteFormSchema } from "./schema";

type FormValues = z.infer<typeof quoteFormSchema>;

interface TermsFieldProps {
  control: Control<FormValues>;
}

const TermsField = ({ control }: TermsFieldProps) => {
  return (
    <FormField
      control={control}
      name="termsAccepted"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className="data-[state=checked]:bg-accent"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm text-gray-300">
              I agree to the terms of service and privacy policy. I consent to being contacted about my request.
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsField;
