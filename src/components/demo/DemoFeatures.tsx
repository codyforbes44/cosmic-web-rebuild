
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PieChart, TrendingUp, Filter, Download, Share, Zap, Shield, Clock } from 'lucide-react';

const DemoFeatures: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive data analysis with machine learning insights and predictive modeling for better decision making.',
      benefits: ['Real-time data processing', 'Custom metrics tracking', 'Automated insights']
    },
    {
      icon: PieChart,
      title: 'Visual Reporting',
      description: 'Create stunning, interactive reports with drag-and-drop functionality and customizable visualizations.',
      benefits: ['50+ chart types', 'Custom branding', 'Interactive dashboards']
    },
    {
      icon: Filter,
      title: 'Smart Filtering',
      description: 'Advanced filtering capabilities with AI-powered suggestions to find exactly what you need.',
      benefits: ['Dynamic filters', 'Saved filter sets', 'Smart recommendations']
    },
    {
      icon: Download,
      title: 'Export Anywhere',
      description: 'Export your reports in multiple formats including PDF, Excel, PowerPoint, and more.',
      benefits: ['10+ export formats', 'Scheduled exports', 'API integrations']
    },
    {
      icon: Share,
      title: 'Collaboration',
      description: 'Share insights with your team through secure links, embedded reports, and real-time collaboration.',
      benefits: ['Team workspaces', 'Comment system', 'Version control']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with role-based access, data encryption, and compliance certifications.',
      benefits: ['SOC 2 certified', 'GDPR compliant', 'SSO integration']
    }
  ];

  const stats = [
    { icon: Clock, label: 'Setup Time', value: '< 5 minutes', description: 'Get started instantly' },
    { icon: Zap, label: 'Query Speed', value: '< 100ms', description: 'Lightning fast results' },
    { icon: TrendingUp, label: 'ROI Increase', value: '340%', description: 'Average client improvement' }
  ];

  return (
    <section className="py-16 px-4 bg-black/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features for Data-Driven Success
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Our comprehensive analytics platform provides everything you need to transform raw data into actionable business insights.
          </p>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20 text-center">
              <CardContent className="p-6">
                <stat.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-accent mb-1">{stat.label}</div>
                <div className="text-sm text-gray-300">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/20 backdrop-blur-sm border-white/10 hover:bg-card/30 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Demo CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to See These Features in Action?
              </h3>
              <p className="text-gray-300 mb-6">
                Experience the full power of our analytics platform with a personalized demo tailored to your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-accent hover:bg-accent/80 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Schedule Live Demo
                </button>
                <button className="border border-white/20 text-white hover:bg-white/5 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Try Free Trial
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoFeatures;
