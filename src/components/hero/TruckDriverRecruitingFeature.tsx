
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Users, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const TruckDriverRecruitingFeature = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-space-deep-blue/50 to-space-dark-blue/80 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Truck className="text-orange-500 mr-3" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Truck Driver Recruiting Solutions
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Solve your driver shortage with our specialized recruiting campaigns designed for trucking companies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-space-deep-blue/40 p-6 rounded-xl border border-orange-500/20"
          >
            <Users className="text-orange-500 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-3 text-white">Qualified CDL Drivers</h3>
            <p className="text-gray-300">
              Target experienced commercial drivers with valid CDLs and clean driving records
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-space-deep-blue/40 p-6 rounded-xl border border-orange-500/20"
          >
            <Target className="text-orange-500 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-3 text-white">Targeted Campaigns</h3>
            <p className="text-gray-300">
              Multi-channel recruitment strategies across job boards, social media, and industry platforms
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-space-deep-blue/40 p-6 rounded-xl border border-orange-500/20"
          >
            <TrendingUp className="text-orange-500 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-3 text-white">Proven Results</h3>
            <p className="text-gray-300">
              Reduce cost-per-hire by up to 40% while improving driver quality and retention
            </p>
          </motion.div>
        </div>

        <div className="text-center">
          <Link to="/recruitment-marketing">
            <Button 
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
            >
              Learn More About Driver Recruiting
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TruckDriverRecruitingFeature;
