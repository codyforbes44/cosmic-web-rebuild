
import { z } from 'zod';

// Enhanced form schema with more robust validation
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must be less than 100 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters." }),
  email: z.string()
    .email({ message: "Please enter a valid email address." })
    .max(254, { message: "Email address is too long." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2000, { message: "Message must be less than 2000 characters." }),
  honeypot: z.string().optional().default(''),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
