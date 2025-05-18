
import { Service } from '@/types/services';
import { TrendingUp, BarChart2, PieChart } from 'lucide-react';

export const strategyService: Service = {
  id: 'strategy',
  name: 'Strategic Consulting',
  description: 'Comprehensive technology strategy development and roadmap planning aligned with your business objectives.',
  image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
  color: '#7C3AED',
  deliverables: 'Technology roadmap, Gap analysis, ROI projections',
  duration: '4-8 weeks',
  process: 'Assessment, Analysis, Strategy Development, Implementation Planning',
  key_benefit: 'Align technology investments with business goals to maximize ROI and competitive advantage',
  benefits: [
    'Strategic technology roadmap tailored to your business goals',
    'Comprehensive analysis of current systems and future needs',
    'Clear implementation priorities with ROI projections',
    'Expert guidance from industry veterans'
  ],
  pain_points: [
    'Outdated systems holding back business growth',
    'Unclear technology investment priorities',
    'Difficulty aligning IT with business objectives',
    'Concerns about wasting resources on the wrong solutions'
  ],
  case_study: {
    title: "Tech Transformation Strategy",
    client: "Global Manufacturing Inc.",
    description: "We developed a comprehensive technology strategy for this manufacturing leader, identifying key opportunities for digital transformation and automation.",
    results: [
      { label: "ROI Increase", value: "37%", icon: TrendingUp },
      { label: "Cost Savings", value: "$1.2M", icon: BarChart2 },
      { label: "Efficiency Gain", value: "25%", icon: PieChart }
    ]
  },
  testimonials: [
    {
      name: "Sarah Johnson",
      position: "CTO, Global Manufacturing Inc.",
      quote: "The strategic roadmap developed by the team has transformed how we approach technology investments. We now have clear priorities and measurable outcomes.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Michael Chen",
      position: "CEO, TechInnovate",
      quote: "The ROI projections were spot on. We've already seen a 30% increase in operational efficiency within the first quarter of implementation.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]
};
