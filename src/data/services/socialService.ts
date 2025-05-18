
import { Service } from '@/types/services';
import { Share2, Users, TrendingUp, BarChart } from 'lucide-react';

export const socialService: Service = {
  id: 'social',
  title: 'Social Media Marketing',
  subtitle: 'Strategic social media solutions for trucking and logistics',
  description: 'Our social media marketing services help trucking companies build brand awareness, engage with drivers, and create communities that support recruitment and retention efforts. We develop targeted campaigns that showcase your company culture and connect with qualified candidates.',
  icon: Share2,
  color: '#E91E63',
  features: [
    {
      title: 'Community Building',
      description: 'Create engaged driver communities around your brand',
      icon: Users
    },
    {
      title: 'Growth Strategy',
      description: 'Strategic content planning for consistent growth',
      icon: TrendingUp
    },
    {
      title: 'Performance Analytics',
      description: 'Comprehensive social media performance reporting',
      icon: BarChart
    }
  ],
  case_study: {
    title: 'Driver Community Campaign',
    client: 'Interstate Logistics',
    description: 'We developed a community-focused social media strategy that helped Interstate Logistics build a thriving online community of drivers, leading to significant improvements in recruitment and retention.',
    results: [
      {
        label: 'Driver Applications',
        value: '125% Increase',
        icon: TrendingUp
      },
      {
        label: 'Driver Retention',
        value: '35% Improvement',
        icon: Users
      },
      {
        label: 'Brand Engagement',
        value: '300% Growth',
        icon: BarChart
      }
    ],
    image: '/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png'
  },
  image: '/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png',
  
  // Additional properties for existing components
  name: 'Social Media Marketing',
  deliverables: 'Content strategy, Community management, Campaign creation, Analytics reporting',
  duration: '3-6 months (ongoing retainers available)',
  process: 'Audit, Strategy Development, Content Creation, Community Building, Optimization',
  key_benefit: 'Build authentic driver communities that improve recruitment and retention',
  benefits: [
    'Showcase your company culture to attract qualified drivers',
    'Create engaged communities that support driver retention',
    'Increase brand visibility within the trucking industry',
    'Generate qualified driver leads through targeted campaigns'
  ],
  pain_points: [
    'Difficulty attracting qualified drivers through traditional methods',
    'High driver turnover and recruitment costs',
    'Limited brand recognition in a competitive market',
    'Ineffective use of social platforms for recruitment'
  ],
  testimonials: [
    {
      name: "Robert Johnson",
      position: "Recruitment Director, Interstate Logistics",
      quote: "The social media strategy completely transformed our driver recruitment process. We're now attracting higher quality candidates at a lower cost per hire.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Maria Rodriguez",
      position: "Marketing Manager, Regional Transport",
      quote: "Our driver community has become one of our most valuable assets. The engagement and sense of belonging has dramatically improved our retention rates.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
};
