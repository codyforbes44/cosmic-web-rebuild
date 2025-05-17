import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, BarChart3, Package, TrendingUp } from 'lucide-react';
import ScheduleButton from '@/components/calendly/ScheduleButton';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-space-dark-blue z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-space-dark-blue via-space-deep-blue/80 to-space-dark-blue z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-2xl z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="text-[#F97316] font-medium inline-block mb-3 bg-[#F97316]/10 px-3 py-1 rounded-full text-xs md:text-sm">3BI CONNECT</span>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Complete Platform for Trucking Operations</h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              3BI Connect simplifies driver management, boosts retention, and streamlines your trucking operations with powerful analytics and automation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="mb-5">
                <div className="h-12 w-12 bg-[#F97316]/20 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-[#F97316]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Real-time Analytics</h3>
                <p className="text-gray-300 mb-4">Get actionable insights on driver performance, retention risks, and operational efficiency.</p>
                <ul className="space-y-2 mb-5">
                  {["Driver retention analysis", "Performance metrics", "Cost optimization insights"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#F97316] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <Link to="/products#3biConnect" className="w-full">
                  <Button variant="outline" className="w-full border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-[#F97316]/10 backdrop-blur-sm border border-[#F97316]/30 rounded-xl p-6 flex flex-col"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="mb-5">
                <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">All-in-One Solution</h3>
                <p className="text-gray-300 mb-4">Manage your entire trucking operation with a single integrated platform.</p>
                <ul className="space-y-2 mb-5">
                  {["Driver onboarding & management", "Communication tools", "Document management", "Compliance tracking"].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#F97316] mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-200 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <Link to="/packages?product=3biConnect" className="w-full">
                  <Button className="w-full bg-[#F97316] hover:bg-[#F97316]/80 text-white">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-[#F97316]/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[#F97316]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Ready to boost driver retention?</h3>
                  <p className="text-gray-300">Schedule a demo and see 3BI Connect in action.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700 w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
                <ScheduleButton className="bg-[#F97316] hover:bg-[#F97316]/80 text-white w-full sm:w-auto">
                  Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
                </ScheduleButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
