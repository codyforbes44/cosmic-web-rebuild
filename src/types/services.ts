
import { ReactNode } from 'react';

export interface ServiceTestimonial {
  name: string;
  position: string;
  quote: string;
  avatar: string;
}

export interface ServiceResult {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface ServiceCaseStudyData {
  title: string;
  client: string;
  description: string;
  results: ServiceResult[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  deliverables: string;
  duration: string;
  process: string;
  key_benefit: string;
  benefits: string[];
  pain_points: string[];
  case_study: ServiceCaseStudyData;
  testimonials: ServiceTestimonial[];
}
