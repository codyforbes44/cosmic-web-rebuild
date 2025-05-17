
export interface PackageType {
  id: string;
  name: string;
  description: string;
  price: string;
  color: string;
  features: string[];
  forProducts?: string[]; // Product IDs this package is for
  popular?: boolean;
}

export const packageData: PackageType[] = [
  {
    id: '3bi-complete',
    name: '3BI Complete',
    description: 'Full-featured platform for operations',
    price: '$499',
    color: '#F97316',
    forProducts: ['3biConnect'],
    popular: true,
    features: [
      'Unlimited carriers and drivers',
      'AI-powered driver retention analysis',
      'Complete operations dashboard',
      'Custom reporting and metrics',
      'Premium support with SLA',
      'Full API access',
      'Unlimited storage',
      'Training and onboarding services'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for small teams and startups',
    price: '$99',
    color: '#0EA5E9',
    forProducts: ['truckOnboard'],
    features: [
      'Up to 5 users',
      'Digital document management',
      'Basic onboarding workflow',
      'Email support',
      'Secure document storage',
      '2GB storage per account'
    ]
  },
  {
    id: 'carrier-advanced',
    name: 'Carrier Advanced',
    description: 'Enhanced carrier network capabilities',
    price: '$299',
    color: '#8B5CF6',
    forProducts: ['cpn', '3biConnect'],
    features: [
      'Up to 50 carriers',
      'Advanced driver matching algorithm',
      'Automated background checks',
      'Real-time notifications',
      'Credential verification',
      'Enhanced analytics dashboard',
      '20GB storage'
    ]
  },
  {
    id: 'carrier-basic',
    name: 'Carrier Basic',
    description: 'Essential tools for carrier partner network',
    price: '$149',
    color: '#0EA5E9',
    forProducts: ['cpn'],
    features: [
      'Up to 10 carriers',
      'Basic driver matching',
      'Document exchange platform',
      'Email notifications',
      'Basic analytics',
      '5GB storage'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for large logistics operations',
    price: '$399',
    color: '#F97316',
    forProducts: ['truckOnboard', 'cpn', '3biConnect'],
    features: [
      'Unlimited users',
      'Custom workflow design',
      'Advanced analytics',
      'Dedicated account manager',
      'Phone and email support',
      'Custom integrations',
      'White-label options',
      'Unlimited storage'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Advanced features for growing trucking companies',
    price: '$199',
    color: '#8B5CF6',
    popular: true,
    forProducts: ['truckOnboard', 'cpn'],
    features: [
      'Up to 20 users',
      'Advanced workflow automation',
      'Interactive training modules',
      'Priority email support',
      'Document versioning',
      'API access',
      '10GB storage per account'
    ]
  }
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
