
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface FeatureStatusBadgeProps {
  isPremium: boolean;
  isComingSoon: boolean;
  className?: string;
}

const FeatureStatusBadge: React.FC<FeatureStatusBadgeProps> = ({ isPremium, isComingSoon, className = "" }) => {
  if (isPremium) {
    return <Badge className={`bg-brand-gold text-black ${className}`}>Premium</Badge>;
  }
  
  if (isComingSoon) {
    return <Badge className={`bg-amber-700 ${className}`}>Coming Soon</Badge>;
  }
  
  return <Badge className={className}>Available Now</Badge>;
};

export default FeatureStatusBadge;
