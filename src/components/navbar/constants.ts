
export interface NavLink {
  name: string;
  path: string;
  disabled?: boolean;
}

export const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'News', path: '/news' },
  { name: 'Packages', path: '/packages' },
  { name: 'Contact', path: '/contact' }
];

export const serviceCategories = [
  { 
    title: 'Strategic Consulting', 
    href: '/services?service=strategy', 
    color: '#7C3AED',
    description: 'Expert guidance to align your technology with business goals'
  },
  { 
    title: 'Digital Transformation', 
    href: '/services?service=digital', 
    color: '#2563EB',
    description: 'Modernize operations and drive innovation with digital solutions'
  },
  { 
    title: 'Custom Software', 
    href: '/services?service=custom', 
    color: '#E11D48',
    description: 'Tailor-made software solutions designed for your unique needs'
  },
  { 
    title: 'Web & Mobile Apps', 
    href: '/services?service=web', 
    color: '#F59E0B',
    description: 'Responsive applications that deliver exceptional user experiences'
  },
  { 
    title: 'Data Analytics', 
    href: '/services?service=analytics', 
    color: '#059669',
    description: 'Transform data into actionable business intelligence'
  },
  { 
    title: 'AI & Machine Learning', 
    href: '/services?service=ai', 
    color: '#8B5CF6',
    description: 'Advanced AI solutions to automate processes and gain insights'
  },
];
