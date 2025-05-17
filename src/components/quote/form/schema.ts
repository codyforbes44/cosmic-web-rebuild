
import { z } from "zod";

// Define form schema with validation
export const quoteFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  budget: z.string().optional(),
  serviceType: z.string().min(1, { message: "Please select a service type." }),
  projectDescription: z.string().min(20, { message: "Please provide at least 20 characters describing your needs." }),
  timeline: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
