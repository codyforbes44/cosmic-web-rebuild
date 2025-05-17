
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, BarChart3, Clock } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Revenue",
    description: "Our clients see an average 35% revenue growth within the first year of implementation.",
    color: "#10B981" // emerald
  },
  {
    icon: BarChart3,
    title: "Improve Efficiency",
    description: "Automate repetitive tasks and optimize workflows to reduce operational costs by up to 40%.",
    color: "#F97316" // orange
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Our solutions cut implementation time by 60% compared to traditional development approaches.",
    color: "#8B5CF6" // violet
  },
  {
    icon: CheckCircle,
    title: "Enhance Compliance",
    description: "Stay compliant with industry regulations while maintaining optimal operational performance.",
    color: "#0EA5E9" // sky blue
  }
];

const ValueProposition: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-space-dark-blue to-space-deep-blue/70 relative">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png')] bg-cover opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            className="inline-block text-accent mb-2 text-sm font-medium px-3 py-1 bg-accent/10 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            WHY CHOOSE ƷBI
          </motion.span>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Solve Your Business Challenges
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We deliver measurable results through technology solutions specifically designed to address your most pressing business problems.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <motion.div 
                key={index}
                className="bg-space-dark-blue/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-accent/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${benefit.color}20` }}
                >
                  <Icon className="h-6 w-6" style={{ color: benefit.color }} />
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
