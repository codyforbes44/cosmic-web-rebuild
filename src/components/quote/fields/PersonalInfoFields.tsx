
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormData } from "../types/formSchema";

interface PersonalInfoFieldsProps {
  control: Control<FormData>;
}

const PersonalInfoFields = ({ control }: PersonalInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Full Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-gray-800 border border-gray-700 text-white focus:border-accent"
                placeholder="John Smith"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Company</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-gray-800 border border-gray-700 text-white focus:border-accent"
                placeholder="Your Company Inc."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoFields;
