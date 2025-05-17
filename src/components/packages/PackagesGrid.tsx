
import React from "react";
import { motion } from "framer-motion";
import PackageCard from "./PackageCard";
import { packages } from "./packageData";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const PackagesGrid: React.FC = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </motion.div>
  );
};

export default PackagesGrid;
