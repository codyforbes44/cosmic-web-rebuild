
import { useState } from "react";
import DemoRequestModal from "./products/DemoRequestModal";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";
import HeroContainer from "./hero/HeroContainer";
import HeroOfferCard from "./hero/HeroOfferCard";
import { useSparksAnimation } from "@/hooks/useSparksAnimation";

const HeroSection = () => {
  const [visible, setVisible] = useState(true);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { showSparks } = useSparksAnimation();
  
  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center justify-center pt-16">
      <HeroBackground showSparks={showSparks} />

      <DemoRequestModal 
        isOpen={demoModalOpen} 
        onOpenChange={setDemoModalOpen} 
        productTitle="ƷBI Solutions"
      />

      <HeroContainer visible={visible}>
        <HeroContent onRequestDemo={() => setDemoModalOpen(true)} />
        <HeroOfferCard onRequestDemo={() => setDemoModalOpen(true)} />
      </HeroContainer>
    </section>
  );
};

export default HeroSection;
