
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Control } from "react-hook-form";
import { FormData } from "../types/formSchema";

interface TermsAndSubmitFieldsProps {
  control: Control<FormData>;
  isSubmitting: boolean;
}

const TermsAndSubmitFields = ({ control, isSubmitting }: TermsAndSubmitFieldsProps) => {
  return (
    <>
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
            Processing...
          </span>
        ) : 'Submit Request for Quote'}
      </Button>
    </>
  );
};

export default TermsAndSubmitFields;
