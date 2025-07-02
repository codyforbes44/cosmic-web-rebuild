
import React from 'react';
import { motion } from 'framer-motion';

interface HowItWorksProps {
  serviceColor: string;
}

const HowItWorks = ({ serviceColor }: HowItWorksProps) => {
  const steps = [
    {
      step: "1",
      title: "Discovery",
      description: "We learn about your company, hiring needs, and ideal candidate profile"
    },
    {
      step: "2",
      title: "Campaign Strategy",
      description: "Develop targeted campaigns across multiple channels to reach qualified professionals"
    },
    {
      step: "3",
      title: "Conversion Optimization",
      description: "Build high-converting landing pages and streamlined application processes"
    },
    {
      step: "4",
      title: "Analytics & Refinement",
      description: "Continuously measure results and optimize for better performance"
    }
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How Our Recruitment Marketing Works</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          A data-driven approach to finding and converting the right candidates for your organization
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-space-deep-blue/30 p-6 rounded-xl border border-gray-800"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${serviceColor}20`, color: serviceColor }}
            >
              {item.step}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
