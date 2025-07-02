
import React from 'react';
import { motion } from 'framer-motion';

interface IndustryStatsProps {
  serviceColor: string;
}

const IndustryStats = ({ serviceColor }: IndustryStatsProps) => {
  const stats = [
    {
      value: "70%",
      description: "Of companies struggle to find qualified candidates"
    },
    {
      value: "$5,000+",
      description: "Average cost-per-hire for skilled professionals"
    },
    {
      value: "3+ months",
      description: "Average time to fill professional positions"
    }
  ];

  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <div key={index} className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-800">
            <h3 className="text-2xl font-bold mb-2" style={{ color: serviceColor }}>
              {stat.value}
            </h3>
            <p className="text-gray-300">{stat.description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default IndustryStats;
