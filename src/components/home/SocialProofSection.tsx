import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, TrendingDown, Building2 } from 'lucide-react';

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "Companies Served",
    description: "Trusted by industry leaders"
  },
  {
    icon: Users,
    value: "2M+",
    label: "Candidates Placed",
    description: "Quality talent matched"
  },
  {
    icon: TrendingDown,
    value: "40%",
    label: "Cost Reduction",
    description: "Average hiring savings"
  },
  {
    icon: Target,
    value: "95%",
    label: "Client Retention",
    description: "Long-term partnerships"
  }
];

const clientLogos = [
  { name: "TechCorp", placeholder: "TC" },
  { name: "InnovateCo", placeholder: "IC" },
  { name: "GlobalTech", placeholder: "GT" },
  { name: "FutureLabs", placeholder: "FL" },
  { name: "DataDrive", placeholder: "DD" },
  { name: "CloudFirst", placeholder: "CF" }
];

const SocialProofSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 md:p-6 rounded-xl bg-card/50 border border-border hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-accent/20 transition-colors">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-medium text-foreground/90 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Logos Section */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 uppercase tracking-wider font-medium"
          >
            Trusted by leading organizations
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8"
          >
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="w-20 h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 rounded-lg bg-card border border-border flex items-center justify-center hover:border-accent/30 hover:bg-card/80 transition-all duration-300 group"
              >
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-muted-foreground group-hover:text-accent transition-colors">
                  {client.placeholder}
                </span>
              </div>
            ))}
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm text-muted-foreground mt-6 md:mt-8"
          >
            Join 500+ companies transforming their recruitment process
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
