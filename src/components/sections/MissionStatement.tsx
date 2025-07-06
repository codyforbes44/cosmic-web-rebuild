
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Zap, Globe2 } from 'lucide-react';

const principles = [
  {
    icon: Target,
    title: "Precision",
    description: "Every decision, every process, executed with mathematical precision and zero tolerance for error."
  },
  {
    icon: Shield,
    title: "Security",
    description: "Uncompromising security standards protect your most critical business assets and data."
  },
  {
    icon: Zap,
    title: "Speed",
    description: "Autonomous systems that operate at the speed of thought, not the speed of human decision-making."
  },
  {
    icon: Globe2,
    title: "Scale",
    description: "Built for global operations with the infrastructure to support unlimited growth."
  }
];

const MissionStatement = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-200 text-sm font-medium mb-8">
              MISSION CRITICAL
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Autonomous systems that
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                never fail
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              In a world where decisions happen in microseconds and failure isn't an option, 
              ƷBI delivers autonomous intelligence systems that operate with the precision 
              and reliability of military-grade technology.
            </p>
          </motion.div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="mb-6">
                  <div className="inline-flex p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl group-hover:border-blue-500/50 transition-all duration-300">
                    <principle.icon className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {principle.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  99.99%
                </div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">
                  System Reliability
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-4" />
              </div>
              
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  &lt;5ms
                </div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">
                  Decision Latency
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-4" />
              </div>
              
              <div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  24/7
                </div>
                <div className="text-gray-400 uppercase tracking-wider text-sm">
                  Autonomous Operation
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
