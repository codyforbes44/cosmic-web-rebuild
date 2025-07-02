
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface RecruitmentHeroProps {
  serviceColor: string;
}

const RecruitmentHero = ({ serviceColor }: RecruitmentHeroProps) => {
  return (
    <section className="mb-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: serviceColor }}>
            Professional Recruitment Marketing
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Attract qualified candidates, reduce your cost-per-hire, and build a strong workforce with our specialized recruitment marketing services across all industries.
          </p>
          
          <div className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800 mb-8 inline-block">
            <p className="text-2xl font-bold mb-2" style={{ color: serviceColor }}>
              Reduce cost-per-hire by up to 40%
            </p>
            <p className="text-gray-300">
              Based on client performance data
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/get-quote">
              <Button 
                size="lg"
                style={{ backgroundColor: serviceColor }}
                className="text-white hover:opacity-90"
              >
                Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RecruitmentHero;
