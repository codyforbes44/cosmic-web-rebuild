
import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { OnboardingFormData } from '../types/formSchema';

interface PreferencesSectionProps {
  control: Control<OnboardingFormData>;
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({ control }) => {
  const contactMethods = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'both', label: 'Both Email and Phone' }
  ];

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  return (
    <div className="space-y-6">
      {/* Honeypot field - hidden from users, catches bots */}
      <div 
        style={{ 
          position: 'absolute', 
          left: '-9999px',
          top: '-9999px',
          opacity: 0,
          pointerEvents: 'none'
        }} 
        aria-hidden="true"
      >
        <FormField
          control={control}
          name="honeypot"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              placeholder="Leave this field empty"
            />
          )}
        />
      </div>

      <FormField
        control={control}
        name="preferredContact"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-white">Preferred Contact Method</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                {contactMethods.map((method) => (
                  <div key={method.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={method.value} 
                      id={method.value}
                      className="text-accent border-gray-600"
                    />
                    <Label 
                      htmlFor={method.value} 
                      className="text-gray-300 font-normal cursor-pointer"
                    >
                      {method.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="communicationFrequency"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-white">Communication Frequency</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                {frequencies.map((frequency) => (
                  <div key={frequency.value} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={frequency.value} 
                      id={frequency.value}
                      className="text-accent border-gray-600"
                    />
                    <Label 
                      htmlFor={frequency.value} 
                      className="text-gray-300 font-normal cursor-pointer"
                    >
                      {frequency.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-gray-600 data-[state=checked]:bg-accent data-[state=checked]:text-black"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-white">
                I accept the terms and conditions
              </FormLabel>
              <p className="text-xs text-gray-400">
                By checking this box, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PreferencesSection;
