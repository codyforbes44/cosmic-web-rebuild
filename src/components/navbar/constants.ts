
import { Menu, Files, Home, BarChartHorizontalBig, BookOpen, HelpCircle, Mail, Info, Newspaper, Package } from 'lucide-react';

export type NavLink = {
  name: string;
  path: string;
  icon?: any;
  disabled?: boolean;
  adminOnly?: boolean;
};

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Services', path: '/services', icon: Menu },
  { name: 'News', path: '/news', icon: Newspaper },
  { name: 'FAQ', path: '/faq', icon: HelpCircle },
  { name: 'Contact', path: '/contact', icon: Mail },
  { name: 'Analytics', path: '/analytics', icon: BarChartHorizontalBig, adminOnly: true },
];

export const serviceCategories = [
  {
    title: 'AI Integrations',
    href: '/services#ai-integrations',
    color: '#8B5CF6', // violet
  },
  {
    title: 'Business Intelligence Reporting',
    href: '/services#business-intelligence',
    color: '#EC4899', // pink
  },
  {
    title: 'Custom Software',
    href: '/services#custom-software',
    color: '#E11D48', // red
  },
  {
    title: 'Dynamic Advertising',
    href: '/services#dynamic-advertising',
    color: '#06B6D4', // teal
  },
  {
    title: 'Recruitment Marketing',
    href: '/services#recruitment-marketing',
    color: '#8B5CF6', // violet
  },
  {
    title: 'Social Media Advertising',
    href: '/services#social-media-advertising',
    color: '#F59E0B', // amber
  },
  {
    title: 'Web Development',
    href: '/services#web-development',
    color: '#10B981', // emerald
  },
  {
    title: 'Web3 Services',
    href: '/services#web3-services',
    color: '#EF4444', // red
  },
  {
    title: 'Workflow Automation',
    href: '/services#workflow-automation',
    color: '#6366F1', // indigo
  },
];

export const productCategories = [
  {
    title: '3BI Connect',
    href: '/products#3biConnect',
    color: '#F97316', // orange
    description: 'Complete platform for trucking companies',
  },
  {
    title: 'Carrier Partner Network',
    href: '/products#cpn',
    color: '#8B5CF6', // violet
    description: 'Simplifying driver transitions',
  },
  {
    title: 'TruckOnboard',
    href: '/products#truckOnboard',
    color: '#0EA5E9', // sky blue
    description: 'Remote driver onboarding made simple',
  },
];

