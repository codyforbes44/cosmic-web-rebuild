
import { TablesInsert } from "@/integrations/supabase/types";

export interface VisitorMetadata extends Omit<TablesInsert<'visitor_metadata'>, 'id' | 'visit_timestamp'> {
  // All fields are optional as we might not be able to collect all data
}

export interface URLParameters {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}
