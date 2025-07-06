
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Brain, Globe, Database, Lock } from 'lucide-react';

const capabilities = [
  {
    icon: Brain,
    title: "Autonomous Decision Making",
    description: "Advanced AI algorithms that learn, adapt, and make critical business decisions without human intervention.",
    specs: ["Neural Networks", "Reinforcement Learning", "Predictive Analytics"],
    performance: "99.7% accuracy"
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Process millions of data points simultaneously with sub-millisecond response times.",
    specs: ["Edge Computing", "Distributed Systems", "Stream Processing"],
    performance: "<5ms latency"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Military-grade encryption and zero-trust architecture protect your critical business data.",
    specs: ["AES-256 Encryption", "Zero-Trust Network", "SOC 2 Compliant"],
    performance: "100% secure"
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Distributed cloud architecture ensures availability and performance worldwide.",
    specs: ["Multi-Region", "Auto-Scaling", "Load Balancing"],
    performance: "99.99% uptime"
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Seamlessly connect and analyze data from any source, format, or platform.",
    specs: ["API Integrations", "ETL Pipelines", "Real-time Sync"],
    performance: "1000+ connectors"
  },
  {
    icon: Lock,
    title: "Compliance Ready",
    description: "Built-in compliance frameworks for GDPR, HIPAA, SOX, and industry standards.",
    specs: ["GDPR", "HIPAA", "SOX", "ISO 27001"],
    performance: "Audit ready"
  }
];

const TechnicalCapabilities = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-200 text-sm font-medium mb-6">
            TECHNICAL SPECIFICATIONS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Engineering Excellence
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Purpose-built for mission-critical applications with uncompromising performance, 
            security, and reliability standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-2xl hover:border-blue-500/50 transition-all duration-300">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <capability.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {capability.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Technical Specs */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {capability.specs.map((spec, specIndex) => (
                        <span
                          key={specIndex}
                          className="px-3 py-1 bg-slate-600/50 text-gray-200 text-sm rounded-full border border-slate-500/30"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-600/30">
                      <span className="text-gray-400 text-sm font-medium">
                        Performance
                      </span>
                      <span className="text-green-400 font-bold">
                        {capability.performance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer">
            <Shield className="w-5 h-5" />
            <span>Request Technical Specifications</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalCapabilities;
