
import { Service } from '@/types/services';
import { BarChart, Target, TrendingUp } from 'lucide-react';

export const digitalService: Service = {
  id: 'digital',
  title: 'Digital Marketing',
  subtitle: 'Strategic digital marketing solutions for trucking companies',
  description: 'Our digital marketing services help trucking companies attract and retain drivers through targeted campaigns across multiple platforms. We focus on delivering measurable results that directly impact your driver recruitment and retention efforts.',
  icon: Target,
  color: '#2563EB',
  features: [
    {
      title: 'Driver Recruitment Campaigns',
      description: 'Targeted advertising to attract qualified drivers to your company',
      icon: Target
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed reporting on campaign performance and ROI',
      icon: BarChart
    },
    {
      title: 'Conversion Optimization',
      description: 'Continuous improvement to maximize application conversions',
      icon: TrendingUp
    }
  ],
  case_study: {
    title: 'Driver Recruitment Campaign',
    client: 'Midwest Trucking Inc.',
    description: 'We helped Midwest Trucking increase their driver applications by 200% through a targeted digital marketing campaign.',
    results: [
      '200% increase in driver applications',
      '40% reduction in cost per hire',
      '60% improvement in application quality'
    ],
    image: '/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png'
  },
  image: '/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png'
};
