
import { LucideIcon } from 'lucide-react';

export interface ServiceTestimonial {
  name: string;
  position: string;
  quote: string;
  avatar: string;
}

export interface ServiceResult {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export interface ServiceCaseStudyData {
  title: string;
  client: string;
  description: string;
  results: ServiceResult[];
  image: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  case_study: ServiceCaseStudyData;
  image: string;
  
  // Adding back properties needed by components
  name?: string; // For backward compatibility
  deliverables?: string;
  duration?: string;
  process?: string;
  key_benefit?: string;
  benefits?: string[];
  pain_points?: string[];
  testimonials?: ServiceTestimonial[];
}
