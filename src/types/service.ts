/**
 * Service Page Type Definitions
 * Provides type safety for service pages and layouts
 */

import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

// Feature Types
export interface ServiceFeature {
  title: string;
  description: string;
  icon?: string | LucideIcon | ComponentType<{ className?: string }>;
  image?: string;
}

// Case Study Result
export interface CaseStudyResult {
  label: string;
  value: string;
  description?: string;
}

// Case Study
export interface CaseStudy {
  title: string;
  client: string;
  description: string;
  results: CaseStudyResult[];
  image?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

// Service Definition
export interface ServiceDefinition {
  id: string;
  name?: string;
  title?: string;
  description: string;
  color: string;
  image?: string;
  icon?: string | LucideIcon | ComponentType<{ className?: string; style?: React.CSSProperties }>;
  features?: ServiceFeature[];
  case_study: CaseStudy;
  benefits?: string[];
  pricing?: {
    starting: number;
    currency: string;
    period?: 'month' | 'year' | 'project';
  };
}

// Service Page Props
export interface ServicePageProps {
  service: ServiceDefinition;
  showFeatures?: boolean;
  showCaseStudy?: boolean;
  showCTA?: boolean;
}
