/**
 * Form Submissions Hook
 * 
 * Uses the centralized query factory for consistent data fetching.
 * Combines contact, quote, and onboarding submissions into a unified list.
 */

import { useMemo } from "react";
import { useFormSubmissionsQuery } from "@/lib/queries/hooks";

interface FormSubmission {
  id: string;
  created_at: string;
  type: 'contact' | 'quote' | 'onboarding';
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
  const { data: rawData, isLoading, error, refetch } = useFormSubmissionsQuery();

  // Transform the raw data into a combined, sorted list
  const data = useMemo<FormSubmission[] | undefined>(() => {
    if (!rawData) return undefined;

    const combined: FormSubmission[] = [
      ...(rawData.contact || []).map((item: any) => ({
        id: item.id,
        created_at: item.created_at,
        type: 'contact' as const,
        name: item.name,
        subject: item.subject,
        email: item.email,
        message: item.message,
      })),
      ...(rawData.quotes || []).map((item: any) => ({
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
      ...(rawData.onboarding || []).map((item: any) => ({
        id: item.id,
        created_at: item.created_at,
        type: 'onboarding' as const,
        full_name: `${item.first_name} ${item.last_name}`,
        email: item.email,
        phone: item.phone,
        company_name: item.company_name,
        budget: item.budget,
        timeline: item.timeline,
      })),
    ];

    // Sort by date descending
    return combined.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [rawData]);

  return {
    data,
    isLoading,
    error,
    refetch,
    // Expose raw data for components that need separate lists
    rawData,
  };
};

export type { FormSubmission };
