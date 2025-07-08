
import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OnboardingFormData } from '../types/formSchema';

interface ProjectInfoSectionProps {
  control: Control<OnboardingFormData>;
}

const ProjectInfoSection: React.FC<ProjectInfoSectionProps> = ({ control }) => {
  const goals = [
    'Web Development',
    'Digital Marketing',
    'AI Solutions',
    'Strategy Consulting',
    'Social Media Management',
    'Recruitment Marketing',
    'Business Process Automation',
    'Data Analytics',
    'Cloud Migration',
    'Cybersecurity'
  ];

  const budgetRanges = [
    'Less than $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    'More than $100,000'
  ];

  const timelines = [
    'ASAP (Rush)',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Ongoing partnership'
  ];

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="primaryGoals"
        render={() => (
          <FormItem>
            <FormLabel className="text-white">Primary Goals (Select all that apply)</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {goals.map((goal) => (
                <FormField
                  key={goal}
                  control={control}
                  name="primaryGoals"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={goal}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(goal)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, goal])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== goal
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-gray-300">
                          {goal}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Budget Range</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-space-deep-blue border-gray-600 text-white">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {budgetRanges.map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {budget}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Timeline</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-space-deep-blue border-gray-600 text-white">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline}>
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProjectInfoSection;
