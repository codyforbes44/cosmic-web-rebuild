
import { Service } from '@/types/services';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

export const digitalService: Service = {
  id: 'digital',
  name: 'Digital Transformation',
  description: 'End-to-end digital transformation services to modernize legacy systems and create innovative digital experiences.',
  image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  color: '#2563EB',
  deliverables: 'Transformation blueprint, System architecture, Implementation roadmap',
  duration: '3-12 months',
  process: 'Discovery, Design, Development, Deployment, Support',
  key_benefit: 'Increase operational efficiency while reducing costs through strategic technology adoption',
  benefits: [
    'Modernize legacy systems with minimal disruption',
    'Streamline operations with integrated digital workflows',
    'Enable data-driven decision making across your organization',
    'Improve customer and employee digital experiences'
  ],
  pain_points: [
    'Legacy systems that can't keep up with business needs',
    'Disconnected data silos limiting visibility',
    'Inefficient manual processes wasting time and resources',
    'Competitive pressure from more digitally advanced rivals'
  ],
  case_study: {
    title: "Healthcare Provider Digital Overhaul",
    client: "Regional Medical Center",
    description: "We transformed the client's outdated record systems into a modern digital platform, improving patient care and operational efficiency.",
    results: [
      { label: "Time Saved", value: "65%", icon: TrendingUp },
      { label: "Error Reduction", value: "87%", icon: BarChart2 },
      { label: "Patient Satisfaction", value: "+42%", icon: PieChart }
    ]
  },
  testimonials: [
    {
      name: "Dr. Emily Roberts",
      position: "Chief Medical Officer, Regional Medical Center",
      quote: "The digital transformation has completely changed how we deliver patient care. Our staff can now focus on patients instead of paperwork.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Robert Thompson",
      position: "IT Director, Healthcare Solutions",
      quote: "The seamless integration between our legacy systems and new digital platform exceeded our expectations. The transition was remarkably smooth.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
};
