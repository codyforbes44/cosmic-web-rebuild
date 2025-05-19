
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DemoRequestModal from "./products/DemoRequestModal";
import CircuitBackground from "./hero/CircuitBackground";
import SparkAnimation from "./hero/SparkAnimation";
import HeroContent from "./hero/HeroContent";
import DesktopOfferCard from "./hero/DesktopOfferCard";
import MobileOfferCard from "./hero/MobileOfferCard";
import { useSparksAnimation } from "@/hooks/useSparksAnimation";

const HeroSection = () => {
  const [visible, setVisible] = useState(true);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { showSparks } = useSparksAnimation();
  const isMobile = useIsMobile();
  
  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center justify-center pt-16">
      <CircuitBackground />
      <SparkAnimation showSparks={showSparks} />

      <DemoRequestModal 
        isOpen={demoModalOpen} 
        onOpenChange={setDemoModalOpen} 
        productTitle="ƷBI Solutions"
      />

      <div className={`container max-w-6xl mx-auto px-4 py-12 md:py-20 z-10 text-center md:text-left transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <HeroContent />
          
          {!isMobile ? (
            <DesktopOfferCard onRequestDemo={() => setDemoModalOpen(true)} />
          ) : (
            <MobileOfferCard onRequestDemo={() => setDemoModalOpen(true)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
