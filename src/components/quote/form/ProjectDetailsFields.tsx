
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { z } from "zod";
import { quoteFormSchema } from "./schema";

type FormValues = z.infer<typeof quoteFormSchema>;

interface ProjectDetailsFieldsProps {
  control: Control<FormValues>;
}

const ProjectDetailsFields = ({ control }: ProjectDetailsFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="projectDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Project Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={5}
                className="bg-gray-800 border border-gray-700 text-white focus:border-accent"
                placeholder="Please describe your project, specific needs, and any desired outcomes..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="timeline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Timeline (Optional)</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-white focus:border-accent">
                  <SelectValue placeholder="Select preferred timeline" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="immediate">Immediate (ASAP)</SelectItem>
                <SelectItem value="1month">Within 1 month</SelectItem>
                <SelectItem value="1-3months">1-3 months</SelectItem>
                <SelectItem value="3-6months">3-6 months</SelectItem>
                <SelectItem value="6-12months">6-12 months</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default ProjectDetailsFields;
