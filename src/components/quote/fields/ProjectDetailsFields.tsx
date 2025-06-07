
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { FormData } from "../types/formSchema";

interface ProjectDetailsFieldsProps {
  control: Control<FormData>;
}

const ProjectDetailsFields = ({ control }: ProjectDetailsFieldsProps) => {
  return (
    <>
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
