
export interface NavLink {
  name: string;
  path: string;
  disabled?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' }
];

export const serviceCategories = [
  { 
    title: 'Dynamic Advertising', 
    href: '/services?service=dynamic', 
    color: '#7C3AED',
    description: 'Targeted advertising solutions that adapt to your audience'
  },
  { 
    title: 'Social Media Advertising', 
    href: '/services?service=social', 
    color: '#2563EB',
    description: 'Engage your audience across all major social platforms'
  },
  { 
    title: 'Recruitment Marketing', 
    href: '/services?service=recruitment', 
    color: '#E11D48',
    description: 'Attract top talent with specialized recruitment campaigns'
  },
  { 
    title: 'Business Insights Reporting', 
    href: '/services?service=insights', 
    color: '#059669',
    description: 'Data-driven insights to inform strategic business decisions'
  },
  { 
    title: 'Web Development', 
    href: '/services?service=web', 
    color: '#F59E0B',
    description: 'Custom websites designed for performance and user experience'
  },
  { 
    title: 'Custom Software', 
    href: '/services?service=custom', 
    color: '#8B5CF6',
    description: 'Tailor-made software solutions for your unique business needs'
  },
  { 
    title: 'Workflow Automation', 
    href: '/services?service=workflow', 
    color: '#14B8A6',
    description: 'Streamline your business processes with intelligent automation'
  },
  { 
    title: 'AI Integrations', 
    href: '/services?service=ai', 
    color: '#6366F1',
    description: 'Leverage AI to enhance your products and services'
  }
];

export const productCategories = [
  {
    title: '3BI Connect',
    href: '/products/3bi-connect',
    color: '#2563EB',
    description: 'The complete platform for trucking companies to manage drivers, improve retention, and streamline operations.',
    image: '/lovable-uploads/7f21da0a-fd77-43ea-a7af-3b11648397c0.png'
  },
  {
    title: 'Carrier Partner Network',
    href: '/products/carrier-partner-network',
    color: '#059669',
    description: 'A comprehensive platform connecting trucking companies and drivers, streamlining the employment transition process.',
    image: '/lovable-uploads/1e9d8177-66c6-4b9f-b830-04c0e28d026e.png'
  },
  {
    title: 'TruckOnboard',
    href: '/products/truck-onboard',
    color: '#0EA5E9',
    description: 'Streamline your truck driver orientation process with digital documents, interactive training modules, and automated workflows.',
    image: '/lovable-uploads/091052a6-ec42-4606-a053-375fcee0c98f.png'
  }
];
