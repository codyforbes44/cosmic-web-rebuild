
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FormSubmission {
  id: string;
  created_at: string;
  type: 'contact' | 'quote';
  name?: string;
  full_name?: string;
  subject?: string;
  service_type?: string;
  email?: string;
  phone?: string;
  company_name?: string;
  message?: string;
  project_description?: string;
  budget?: string;
  timeline?: string;
  terms_accepted?: boolean;
}

export const useFormSubmissions = () => {
  return useQuery({
    queryKey: ['form-submissions'],
    queryFn: async () => {
      // Fetch contact submissions
      const { data: contactData, error: contactError } = await supabase
        .from('contact_submissions')
        .select('id, created_at, name, subject, email, message')
        .order('created_at', { ascending: false });

      if (contactError) throw contactError;

      // Fetch quote requests
      const { data: quoteData, error: quoteError } = await supabase
        .from('quote_requests')
        .select('id, created_at, full_name, service_type, email, phone, company_name, project_description, budget, timeline, terms_accepted')
        .order('created_at', { ascending: false });

      if (quoteError) throw quoteError;

      // Combine and format submissions
      const combined: FormSubmission[] = [
        ...(contactData || []).map(item => ({
          id: item.id,
          created_at: item.created_at,
          type: 'contact' as const,
          name: item.name,
          subject: item.subject,
          email: item.email,
          message: item.message,
        })),
        ...(quoteData || []).map(item => ({
          id: item.id,
          created_at: item.created_at,
          type: 'quote' as const,
          full_name: item.full_name,
          service_type: item.service_type,
          email: item.email,
          phone: item.phone,
          company_name: item.company_name,
          project_description: item.project_description,
          budget: item.budget,
          timeline: item.timeline,
          terms_accepted: item.terms_accepted,
        })),
      ];

      // Sort by date and return all real submissions
      return combined.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
  });
};

export type { FormSubmission };
