
import { Service } from '@/types/services';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

export const customService: Service = {
  id: 'custom',
  name: 'Custom Software',
  description: 'Tailored software solutions designed and developed to address your unique business challenges.',
  image: 'https://images.unsplash.com/photo-1573495612937-f02b76716e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  color: '#E11D48',
  deliverables: 'Custom applications, API integrations, User documentation',
  duration: '2-9 months',
  process: 'Requirements, Design, Development, Testing, Deployment',
  key_benefit: 'Purpose-built software that perfectly addresses your specific business requirements',
  benefits: [
    'Precisely tailored solutions for your unique business needs',
    'Seamless integration with your existing technology ecosystem',
    'Scalable architecture designed to grow with your business',
    'Full ownership of your custom software assets'
  ],
  pain_points: [
    'Off-the-shelf software that doesn't fit your processes',
    'Unique business challenges requiring specialized solutions',
    'Integration issues between multiple software systems',
    'Need for competitive advantage through proprietary tools'
  ],
  case_study: {
    title: "Logistics Management Platform",
    client: "Interstate Transport Co.",
    description: "We built a custom logistics management platform that integrated route optimization, driver management, and customer communications.",
    results: [
      { label: "Fuel Savings", value: "22%", icon: TrendingUp },
      { label: "Delivery Time", value: "-35%", icon: BarChart2 },
      { label: "Customer Retention", value: "+18%", icon: PieChart }
    ]
  },
  testimonials: [
    {
      name: "Thomas Rivera",
      position: "Operations Director, Interstate Transport",
      quote: "This custom platform solved problems we've struggled with for years. The ROI was evident within the first three months of implementation.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Amanda Lewis",
      position: "Fleet Manager, Logistics Pro",
      quote: "The route optimization alone has saved us thousands in fuel costs. The drivers love the intuitive mobile interface too.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
};
