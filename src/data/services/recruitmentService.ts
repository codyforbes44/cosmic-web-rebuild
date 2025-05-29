import { Service } from '@/types/services';
import { Megaphone, Users, Award, Truck } from 'lucide-react';

export const recruitmentService: Service = {
  id: 'recruitment',
  title: 'Recruitment Marketing',
  subtitle: 'Powerful driver recruitment campaigns that deliver results',
  description: 'Our specialized recruitment marketing services help trucking companies attract, engage, and convert qualified drivers. Using data-driven strategies and multi-channel campaigns, we create compelling recruitment funnels that reduce cost-per-hire and improve retention rates.',
  icon: Users,
  color: '#FF6B35',
  features: [
    {
      title: 'Multi-Channel Campaigns',
      description: 'Targeted advertising across social media, search engines, job boards, and industry websites',
      icon: Megaphone
    },
    {
      title: 'Driver Persona Development',
      description: 'Research-backed driver personas to target the right candidates',
      icon: Users
    },
    {
      title: 'Conversion Optimization',
      description: 'High-converting landing pages and application processes',
      icon: Award
    },
    {
      title: 'Truck Driver Recruiting',
      description: 'Specialized recruiting campaigns for CDL drivers and commercial vehicle operators',
      icon: Truck
    }
  ],
  pain_points: [
    'Struggling to find qualified drivers in competitive markets',
    'High cost-per-hire with traditional recruitment methods',
    'Poor quality applications from generic job boards',
    'Difficulty standing out from other trucking companies',
    'High turnover rates and retention problems'
  ],
  benefits: [
    'Reduced cost-per-hire and improved ROI on recruitment spend',
    'Higher quality driver applications targeted to your specific needs',
    'Enhanced employer brand and company reputation',
    'Data-driven insights to continuously improve recruitment efforts',
    'Improved driver retention through better candidate matching'
  ],
  process: 'Discovery → Driver Persona Development → Campaign Strategy → Creative Development → Launch & Optimization → Reporting',
  deliverables: 'Custom recruitment campaigns, landing pages, ad creative, and performance analytics',
  duration: '3-6 months ongoing campaigns',
  key_benefit: 'Attract qualified drivers while reducing your cost-per-hire by up to 40%',
  case_study: {
    title: 'Driver Recruitment Transformation',
    client: 'Midwest Express Logistics',
    description: 'Facing severe driver shortages, Midwest Express partnered with us to revamp their recruitment strategy. We developed targeted campaigns across multiple channels with compelling driver-focused messaging.',
    results: [
      {
        label: 'Driver Applications',
        value: '250% Increase'
      },
      {
        label: 'Cost Per Hire',
        value: '38% Reduction'
      },
      {
        label: 'Retention Rate',
        value: '25% Improvement'
      }
    ],
    image: '/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png'
  },
  image: '/lovable-uploads/1e9d8177-66c6-4b9f-b830-04c0e28d026e.png'
};
