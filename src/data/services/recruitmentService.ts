
import { Service } from '@/types/services';
import { Megaphone, Users, Award, Building } from 'lucide-react';

export const recruitmentService: Service = {
  id: 'recruitment',
  title: 'Recruitment Marketing',
  subtitle: 'Powerful recruitment campaigns that deliver results across all industries',
  description: 'Our specialized recruitment marketing services help businesses attract, engage, and convert qualified candidates across all sectors. Using data-driven strategies and multi-channel campaigns, we create compelling recruitment funnels that reduce cost-per-hire and improve retention rates.',
  icon: Users,
  color: '#FF6B35',
  features: [
    {
      title: 'Multi-Channel Campaigns',
      description: 'Targeted advertising across social media, search engines, job boards, and industry websites',
      icon: Megaphone
    },
    {
      title: 'Candidate Persona Development',
      description: 'Research-backed candidate personas to target the right professionals',
      icon: Users
    },
    {
      title: 'Conversion Optimization',
      description: 'High-converting landing pages and application processes',
      icon: Award
    },
    {
      title: 'Professional Recruiting',
      description: 'Specialized recruiting campaigns for skilled professionals across all industries',
      icon: Building
    }
  ],
  pain_points: [
    'Struggling to find qualified candidates in competitive markets',
    'High cost-per-hire with traditional recruitment methods',
    'Poor quality applications from generic job boards',
    'Difficulty standing out from other employers in your industry',
    'High turnover rates and retention problems'
  ],
  benefits: [
    'Reduced cost-per-hire and improved ROI on recruitment spend',
    'Higher quality candidate applications targeted to your specific needs',
    'Enhanced employer brand and company reputation',
    'Data-driven insights to continuously improve recruitment efforts',
    'Improved employee retention through better candidate matching'
  ],
  process: 'Discovery → Candidate Persona Development → Campaign Strategy → Creative Development → Launch & Optimization → Reporting',
  deliverables: 'Custom recruitment campaigns, landing pages, ad creative, and performance analytics',
  duration: '3-6 months ongoing campaigns',
  key_benefit: 'Attract qualified professionals while reducing your cost-per-hire by up to 40%',
  case_study: {
    title: 'Professional Recruitment Transformation',
    client: 'TechStart Solutions',
    description: 'Facing severe talent shortages, TechStart partnered with us to revamp their recruitment strategy. We developed targeted campaigns across multiple channels with compelling candidate-focused messaging.',
    results: [
      {
        label: 'Candidate Applications',
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
