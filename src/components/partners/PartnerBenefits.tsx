
import React from "react";
import { motion } from "framer-motion";
import { UsersRound, Share, Network, Briefcase } from "lucide-react";

const benefits = [
  {
    icon: <UsersRound className="h-10 w-10 text-accent" />,
    title: "Collaborative Innovation",
    description: "Work together to develop cutting-edge solutions that address complex business challenges."
  },
  {
    icon: <Share className="h-10 w-10 text-accent" />,
    title: "Knowledge Exchange",
    description: "Share expertise, insights, and best practices to enhance service delivery capabilities."
  },
  {
    icon: <Network className="h-10 w-10 text-accent" />,
    title: "Extended Network",
    description: "Access a broader network of clients, resources, and market opportunities through partnership."
  },
  {
    icon: <Briefcase className="h-10 w-10 text-accent" />,
    title: "Business Growth",
    description: "Drive mutual business growth and expansion through collaborative projects and initiatives."
  }
];

const PartnerBenefits: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-space-deep-blue/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Partnership Benefits</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Join our partner ecosystem to unlock a range of benefits and collaborative opportunities that drive mutual success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-space-dark-blue border border-gray-800 rounded-xl p-6 text-center h-full hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBenefits;
