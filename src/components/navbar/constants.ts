
import { Menu, Files, Home, BarChartHorizontalBig, BookOpen, HelpCircle } from 'lucide-react';

export type NavLink = {
  name: string;
  path: string;
  icon?: any;
  disabled?: boolean;
};

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Portfolio', path: '/portfolio', icon: Files },
  { name: 'News', path: '/news', icon: Menu },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq', icon: HelpCircle },
  { name: 'Contact', path: '/contact' },
  { name: 'Analytics', path: '/analytics', icon: BarChartHorizontalBig, disabled: true },
];

export const serviceCategories = [
  {
    title: 'Dynamic Advertising',
    href: '/services#dynamic-advertising',
    color: '#06B6D4', // teal
  },
  {
    title: 'Social Media Advertising',
    href: '/services#social-media-advertising',
    color: '#F59E0B', // amber
  },
  {
    title: 'Recruitment Marketing',
    href: '/services#recruitment-marketing',
    color: '#8B5CF6', // violet
  },
  {
    title: 'Business Intelligence Reporting',
    href: '/services#business-intelligence',
    color: '#EC4899', // pink
  },
  {
    title: 'Web Development',
    href: '/services#web-development',
    color: '#10B981', // emerald
  },
  {
    title: 'Custom Software',
    href: '/services#custom-software',
    color: '#E11D48', // red
  },
  {
    title: 'Workflow Automation',
    href: '/services#workflow-automation',
    color: '#6366F1', // indigo
  },
  {
    title: 'AI Integrations',
    href: '/services#ai-integrations',
    color: '#8B5CF6', // violet
  },
  {
    title: 'Web3 Services',
    href: '/services#web3-services',
    color: '#EF4444', // red
  },
];
