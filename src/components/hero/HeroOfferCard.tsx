
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopOfferCard from "./DesktopOfferCard";
import MobileOfferCard from "./MobileOfferCard";

interface HeroOfferCardProps {
  onRequestDemo: () => void;
}

const HeroOfferCard: React.FC<HeroOfferCardProps> = ({ onRequestDemo }) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {!isMobile ? (
        <DesktopOfferCard onRequestDemo={onRequestDemo} />
      ) : (
        <MobileOfferCard onRequestDemo={onRequestDemo} />
      )}
    </>
  );
};

export default HeroOfferCard;
