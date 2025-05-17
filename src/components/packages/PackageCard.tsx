
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants for the cards
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

interface PackageCardProps {
  pkg: {
    id: string;
    name: string;
    description: string;
    price: string;
    period: string;
    features: string[];
    cta: string;
    color: string;
    popular: boolean;
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className={`relative ${pkg.popular ? 'lg:scale-[1.05]' : ''}`}
    >
      {pkg.popular && (
        <div 
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
          style={{ backgroundColor: pkg.color, color: 'white' }}
        >
          Most Popular
        </div>
      )}
      <Card className="h-full space-card overflow-hidden border-opacity-30 relative">
        <CardHeader className="pb-0">
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: pkg.color }}
          />
          <div 
            className="text-xl font-bold mb-2" 
            style={{ color: pkg.color }}
          >
            {pkg.name}
          </div>
          <CardDescription className="text-gray-400">
            {pkg.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-6">
            <span className="text-3xl font-bold text-white">{pkg.price}</span>
            <span className="text-gray-400 ml-2">{pkg.period}</span>
          </div>
          <ul className="space-y-3">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 mr-2 shrink-0 text-brand-gold" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-6">
          <Button 
            className="w-full text-white transition-all duration-300"
            style={{ 
              backgroundColor: pkg.color,
              boxShadow: `0 4px 14px 0 ${pkg.color}40`
            }}
            onClick={() => pkg.id === "enterprise" ? 
              window.location.href="/contact" : 
              window.location.href="/get-quote?plan=" + pkg.id
            }
          >
            {pkg.cta}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PackageCard;
