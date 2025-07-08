
import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OnboardingFormData } from '../types/formSchema';

interface PersonalInfoSectionProps {
  control: Control<OnboardingFormData>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">First Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="John" 
                  {...field} 
                  className="bg-space-deep-blue border-gray-600 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Last Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Doe" 
                  {...field} 
                  className="bg-space-deep-blue border-gray-600 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Email Address</FormLabel>
            <FormControl>
              <Input 
                placeholder="john.doe@company.com" 
                type="email"
                {...field} 
                className="bg-space-deep-blue border-gray-600 text-white"
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
                placeholder="+1 (555) 123-4567" 
                type="tel"
                {...field} 
                className="bg-space-deep-blue border-gray-600 text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoSection;
