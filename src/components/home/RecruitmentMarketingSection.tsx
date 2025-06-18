
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
    <section className="py-24 bg-gradient-to-br from-space-deep-blue/20 to-space-dark-blue/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <DemoRequestModal 
        isOpen={demoModalOpen} 
        onOpenChange={setDemoModalOpen} 
        productTitle="Recruitment Marketing Services"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-orange-500 mb-4 text-sm md:text-base tracking-wider font-medium px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
              INDUSTRY LEADING RECRUITMENT SOLUTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Streamlined <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Recruitment Marketing</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg mb-8">
              Solve your talent shortage with our specialized recruitment campaigns designed for businesses across all industries. 
              <span className="text-orange-400 block mt-2">Get more qualified candidates while reducing your hiring costs.</span>
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-space-deep-blue/50 border-gray-800 hover:border-orange-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <feature.icon className="h-8 w-8 mr-3" style={{ color: feature.color }} />
                    <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
              Why Choose Our Recruitment Marketing?
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-space-deep-blue/60 p-8 rounded-xl border border-orange-500/20"
          >
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8 text-orange-500 mr-3" />
              <h4 className="text-xl font-bold text-white">Case Study Highlight</h4>
            </div>
            <h5 className="text-lg font-semibold text-orange-400 mb-2">TechStart Solutions</h5>
            <p className="text-gray-300 mb-4">
              Facing critical talent shortages, we helped them transform their recruitment strategy with targeted campaigns and compelling messaging across multiple channels.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-500">250%</div>
                <div className="text-sm text-gray-400">More Applications</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">38%</div>
                <div className="text-sm text-gray-400">Cost Reduction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">25%</div>
                <div className="text-sm text-gray-400">Better Retention</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-2xl p-8 md:p-12"
        >
          <Building className="h-12 w-12 text-orange-500 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Ready to Solve Your Talent Shortage?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join successful businesses across all industries who have transformed their recruitment with our proven marketing strategies. 
            Get more qualified candidates and reduce your hiring costs starting today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/recruitment-marketing">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg w-full sm:w-auto"
              >
                Learn More About Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/5 px-8 py-6 text-lg"
              onClick={() => setDemoModalOpen(true)}
            >
              Request Free Consultation
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-orange-500 mr-2" />
              Industry leading expertise
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Proven track record
            </div>
            <div className="flex items-center">
              <Target className="w-4 h-4 text-blue-500 mr-2" />
              Data-driven results
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruitmentMarketingSection;
