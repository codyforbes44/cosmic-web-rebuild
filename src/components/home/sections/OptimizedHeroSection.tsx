import { useState, memo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DemoRequestModal from "../../products/DemoRequestModal";
import ResponsiveHeroBackground from "../responsive/ResponsiveHeroBackground";
import ResponsiveHeroContent from "../responsive/ResponsiveHeroContent";
import ResponsiveHeroContainer from "../responsive/ResponsiveHeroContainer";
import ResponsiveHeroOfferCard from "../responsive/ResponsiveHeroOfferCard";
import { useSparksAnimation } from "@/hooks/useSparksAnimation";

const OptimizedHeroSection = memo(() => {
  const [visible, setVisible] = useState(true);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const { showSparks } = useSparksAnimation();
  const isMobile = useIsMobile();
  
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] md:min-h-screen overflow-hidden flex items-center justify-center pt-12 sm:pt-14 md:pt-16">
      <ResponsiveHeroBackground showSparks={showSparks} isMobile={isMobile} />

      <DemoRequestModal 
        isOpen={demoModalOpen} 
        onOpenChange={setDemoModalOpen} 
        productTitle="Recruitment Marketing Solutions"
      />

      <ResponsiveHeroContainer visible={visible} isMobile={isMobile}>
        <ResponsiveHeroContent isMobile={isMobile} />
        <ResponsiveHeroOfferCard 
          onRequestDemo={() => setDemoModalOpen(true)} 
          isMobile={isMobile}
        />
      </ResponsiveHeroContainer>
    </section>
  );
});

OptimizedHeroSection.displayName = 'OptimizedHeroSection';

export default OptimizedHeroSection;