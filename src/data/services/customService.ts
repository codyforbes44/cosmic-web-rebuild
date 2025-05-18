
import { Service } from '@/types/services';
import { Code, Lock, Clock, Wrench } from 'lucide-react';

export const customService: Service = {
  id: 'custom',
  title: 'Custom Development',
  subtitle: 'Tailor-made software solutions for your unique business needs',
  description: 'We create custom software solutions designed specifically for the logistics and transportation industry. Our team of experienced developers works closely with you to understand your unique requirements and deliver a solution that meets your specific needs.',
  icon: Code,
  color: '#8B5CF6',
  features: [
    {
      title: 'Custom Software Development',
      description: 'Tailored applications built specifically for your business needs',
      icon: Wrench
    },
    {
      title: 'Secure Authentication',
      description: 'Enterprise-grade security for all your custom applications',
      icon: Lock
    },
    {
      title: 'Rapid Development',
      description: 'Quick turnaround times with our agile development process',
      icon: Clock
    }
  ],
  case_study: {
    title: 'Logistics Management System',
    client: 'Continental Freight',
    description: 'We developed a custom logistics management system that helped Continental Freight optimize their delivery routes and improve customer satisfaction.',
    results: [
      {
        label: 'Delivery Time',
        value: '30% Reduction'
      },
      {
        label: 'Customer Satisfaction',
        value: '40% Improvement'
      },
      {
        label: 'Fuel Costs',
        value: '25% Decrease'
      }
    ],
    image: '/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png'
  },
  image: '/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png'
};
