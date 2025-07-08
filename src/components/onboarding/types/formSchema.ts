
import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must be less than 50 characters." }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must be less than 50 characters." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." }),
  phone: z.string()
    .min(10, { message: "Please enter a valid phone number." }),
  companyName: z.string()
    .min(2, { message: "Company name must be at least 2 characters." }),
  industry: z.string()
    .min(1, { message: "Please select an industry." }),
  companySize: z.string()
    .min(1, { message: "Please select company size." }),
  website: z.string().url().optional().or(z.literal('')),
  primaryGoals: z.array(z.string())
    .min(1, { message: "Please select at least one primary goal." }),
  budget: z.string()
    .min(1, { message: "Please select a budget range." }),
  monthlyMarketingBudget: z.string()
    .min(1, { message: "Please enter your monthly marketing budget." }),
  timeline: z.string()
    .min(1, { message: "Please select a timeline." }),
  preferredContact: z.enum(['email', 'phone', 'both']),
  communicationFrequency: z.enum(['daily', 'weekly', 'biweekly', 'monthly']),
  termsAccepted: z.boolean()
    .refine(val => val === true, { message: "You must accept the terms and conditions." }),
});

export type OnboardingFormData = z.infer<typeof formSchema>;
