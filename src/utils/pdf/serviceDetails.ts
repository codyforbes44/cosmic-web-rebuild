
export const getServiceDetails = (serviceName: string): string[] => {
  const details: { [key: string]: string[] } = {
    'Digital Marketing': [
      'Comprehensive digital strategy development',
      'Search engine optimization (SEO)',
      'Pay-per-click (PPC) advertising management',
      'Social media marketing campaigns',
      'Content marketing strategy',
      'Analytics and performance reporting',
      'Monthly strategy consultations'
    ],
    'Web Development': [
      'Custom website design and development',
      'Responsive mobile-first design',
      'Content management system (CMS)',
      'E-commerce functionality (if applicable)',
      'Search engine optimization',
      'Security implementation',
      '3 months of maintenance and support'
    ],
    'AI Solutions': [
      'AI strategy consultation and planning',
      'Custom AI model development',
      'Machine learning implementation',
      'Data analysis and insights',
      'AI integration with existing systems',
      'Training and documentation',
      'Ongoing support and optimization'
    ],
    'Strategy Consulting': [
      'Business strategy assessment',
      'Market analysis and research',
      'Competitive landscape evaluation',
      'Strategic planning and roadmap',
      'Implementation guidance',
      'Monthly progress reviews',
      'Strategic recommendations report'
    ],
    'Social Media Management': [
      'Social media strategy development',
      'Content creation and curation',
      'Daily posting and engagement',
      'Community management',
      'Social media advertising',
      'Analytics and reporting',
      'Monthly performance reviews'
    ],
    'Recruitment Marketing': [
      'Recruitment strategy development',
      'Employer branding initiatives',
      'Job posting optimization',
      'Candidate sourcing campaigns',
      'Recruitment funnel optimization',
      'Performance tracking and analytics',
      'Monthly recruitment reports'
    ]
  };
  
  return details[serviceName] || [
    'Customized service delivery',
    'Professional consultation',
    'Regular progress updates',
    'Dedicated account management'
  ];
};
