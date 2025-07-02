import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, TrendingUp, Users, Target, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PackageFeature {
  text: string;
  included: boolean;
}

interface Package {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PackageFeature[];
  isPopular?: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

const packages: Package[] = [
  {
    name: "Starter Growth",
    price: "$325",
    period: "/month",
    description: "Perfect for small businesses ready to establish their digital presence",
    icon: Target,
    color: "#10B981",
    features: [
      { text: "Social Media Management (3 platforms)", included: true },
      { text: "Content Creation (12 posts/month)", included: true },
      { text: "Basic Digital Ad Campaigns", included: true },
      { text: "Monthly Performance Reports", included: true },
      { text: "Community Management", included: true },
      { text: "Email Marketing Setup", included: true },
      { text: "SEO Optimization", included: false },
      { text: "Advanced Analytics", included: false },
      { text: "Dedicated Account Manager", included: false }
    ]
  },
  {
    name: "Professional Scale",
    price: "$625",
    period: "/month",
    description: "Comprehensive digital marketing for growing businesses",
    icon: TrendingUp,
    color: "#3B82F6",
    isPopular: true,
    features: [
      { text: "Social Media Management (5 platforms)", included: true },
      { text: "Content Creation (24 posts/month)", included: true },
      { text: "Advanced Digital Ad Campaigns", included: true },
      { text: "Weekly Performance Reports", included: true },
      { text: "Community Management", included: true },
      { text: "Email Marketing Campaigns", included: true },
      { text: "SEO Optimization", included: true },
      { text: "Advanced Analytics Dashboard", included: true },
      { text: "Dedicated Account Manager", included: true }
    ]
  },
  {
    name: "Enterprise Domination",
    price: "$1,250",
    period: "/month",
    description: "Full-service digital marketing for industry leaders",
    icon: Users,
    color: "#8B5CF6",
    features: [
      { text: "Social Media Management (All platforms)", included: true },
      { text: "Content Creation (50+ posts/month)", included: true },
      { text: "Multi-Channel Ad Campaigns", included: true },
      { text: "Real-time Performance Monitoring", included: true },
      { text: "24/7 Community Management", included: true },
      { text: "Advanced Email Marketing", included: true },
      { text: "Technical SEO & Content Strategy", included: true },
      { text: "Custom Analytics & BI Dashboards", included: true },
      { text: "Dedicated Marketing Team", included: true }
    ]
  }
];

const DigitalMarketingPackages: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Digital Marketing & Social Media Packages
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Comprehensive solutions that combine digital marketing expertise with social media management to drive real business growth
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-space-deep-blue/40 border rounded-2xl p-8 ${
                pkg.isPopular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-800'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: `${pkg.color}20` }}>
                  <pkg.icon className="w-8 h-8" style={{ color: pkg.color }} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-300 mb-4">{pkg.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold" style={{ color: pkg.color }}>{pkg.price}</span>
                  <span className="text-gray-400 ml-1">{pkg.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className={`mr-3 p-1 rounded-full mt-0.5 ${
                      feature.included ? 'bg-green-500/20' : 'bg-gray-500/20'
                    }`}>
                      <Check className={`h-4 w-4 ${
                        feature.included ? 'text-green-500' : 'text-gray-500'
                      }`} />
                    </div>
                    <span className={feature.included ? 'text-gray-200' : 'text-gray-500'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to="/get-quote" className="block">
                <Button 
                  className="w-full text-white hover:opacity-90 transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: pkg.color }}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-4">
            Need a custom solution? We'll create a package tailored to your specific needs.
          </p>
          <Link to="/contact">
            <Button variant="outline" className="border-white/20 hover:bg-white/5">
              Request Custom Package
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalMarketingPackages;
