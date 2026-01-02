/**
 * Unified Service Type Definitions
 * 
 * @description Provides type safety for service pages, layouts, and data
 * Consolidated from service.ts and services.ts for maintainability
 */

import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';

/**
 * Icon type that supports various icon formats
 */
export type ServiceIcon = string | LucideIcon | ComponentType<{ className?: string; style?: React.CSSProperties }>;

/**
 * Testimonial for a service
 */
export interface ServiceTestimonial {
  name: string;
  position: string;
  quote: string;
  avatar: string;
}

/**
 * Result metric for case studies
 */
export interface ServiceResult {
  label: string;
  value: string;
  icon?: LucideIcon;
  description?: string;
}

/**
 * Case study data for a service
 */
export interface ServiceCaseStudyData {
  title: string;
  client: string;
  description: string;
  results: ServiceResult[];
  image?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

/**
 * Feature within a service
 */
export interface ServiceFeature {
  title: string;
  description: string;
  icon?: ServiceIcon;
  image?: string;
}

/**
 * Main service definition interface
 * Used across the application for service data
 */
export interface Service {
  /** Unique identifier */
  id: string;
  /** Display title */
  title: string;
  /** Short subtitle */
  subtitle: string;
  /** Full description */
  description: string;
  /** Icon component or string */
  icon: ServiceIcon;
  /** Brand/theme color */
  color: string;
  /** Service features */
  features: ServiceFeature[];
  /** Case study data */
  case_study: ServiceCaseStudyData;
  /** Hero/banner image */
  image: string;
  
  // Optional properties for extended functionality
  /** Alternative name (for backward compatibility) */
  name?: string;
  /** List of deliverables */
  deliverables?: string;
  /** Typical duration */
  duration?: string;
  /** Process description */
  process?: string;
  /** Main benefit highlight */
  key_benefit?: string;
  /** List of benefits */
  benefits?: string[];
  /** Pain points addressed */
  pain_points?: string[];
  /** Client testimonials */
  testimonials?: ServiceTestimonial[];
  /** Pricing information */
  pricing?: {
    starting: number;
    currency: string;
    period?: 'month' | 'year' | 'project';
  };
}

/**
 * Alias for Service to support ServiceDefinition imports
 * @deprecated Use Service instead
 */
export type ServiceDefinition = Service;

/**
 * Alias for ServiceCaseStudyData
 * @deprecated Use ServiceCaseStudyData instead
 */
export type CaseStudy = ServiceCaseStudyData;

/**
 * Alias for ServiceResult
 * @deprecated Use ServiceResult instead
 */
export type CaseStudyResult = ServiceResult;

/**
 * Props for service page components
 */
export interface ServicePageProps {
  service: Service;
  showFeatures?: boolean;
  showCaseStudy?: boolean;
  showCTA?: boolean;
}
