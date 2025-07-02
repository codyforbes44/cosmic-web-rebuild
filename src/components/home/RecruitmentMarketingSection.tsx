
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, TrendingUp, CheckCircle, Building, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DemoRequestModal from '../products/DemoRequestModal';

const RecruitmentMarketingSection = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Qualified Candidates",
      description: "Target experienced professionals with relevant skills and clean backgrounds",
      color: "#FF6B35"
    },
    {
      icon: Target,
      title: "Multi-Channel Campaigns",
      description: "Reach candidates across job boards, social media, and industry-specific platforms",
      color: "#10B981"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Reduce cost-per-hire by up to 40% while improving candidate quality and retention",
      color: "#3B82F6"
    }
  ];

  const benefits = [
    "250% increase in qualified candidate applications",
    "38% reduction in cost-per-hire",
    "25% improvement in employee retention rates",
    "Data-driven targeting for optimal ROI",
    "Industry-specific recruitment expertise"
  ];

  return (
    <section className="py-16 md:py-24 bg-space-deep-blue/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-brand-gold font-medium text-sm uppercase tracking-wider">RECRUITMENT MARKETING</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-white">
            Find Top Talent <span className="text-brand-gold">Faster</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Revolutionary recruitment marketing that attracts quality candidates and reduces hiring costs through targeted digital campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-space-dark-blue border-gray-800 hover:bg-space-dark-blue/80 transition-all duration-300 group h-full shadow-lg hover:border-brand-gold/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold/30 transition-colors group-hover:scale-110">
                      <IconComponent className="w-8 h-8 text-brand-gold" />
                    </div>
                    <CardTitle className="text-white text-xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-space-dark-blue rounded-2xl p-8 mb-12 border border-gray-800 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Proven Results</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-brand-gold mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <Building className="h-24 w-24 text-brand-gold mx-auto mb-6" />
              <p className="text-gray-300 text-lg mb-6">
                Join hundreds of companies who have transformed their recruitment process
              </p>
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <p className="text-sm text-gray-400">Rated 5/5 by our clients</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setDemoModalOpen(true)}
              size="lg" 
              className="bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold px-8"
            >
              Request Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-gray-600 text-white hover:bg-white/10 px-8"
            >
              <Link to="/recruitment-marketing">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <DemoRequestModal 
        isOpen={demoModalOpen} 
        onOpenChange={setDemoModalOpen} 
        productTitle="Recruitment Marketing Solutions"
      />
    </section>
  );
};

export default RecruitmentMarketingSection;
