
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface RecruitmentBenefitsProps {
  benefits: string[];
  serviceColor: string;
}

const RecruitmentBenefits = ({ benefits, serviceColor }: RecruitmentBenefitsProps) => {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Benefits of Our Recruitment Marketing</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Targeted strategies that deliver real results for your hiring needs across all industries
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex items-start p-6 bg-space-deep-blue/30 rounded-xl border border-gray-800"
          >
            <CheckCircle 
              className="mr-4 mt-1 flex-shrink-0" 
              size={24} 
              style={{ color: serviceColor }} 
            />
            <div>
              <p className="text-lg">{benefit}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecruitmentBenefits;
