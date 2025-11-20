
import React from "react";
import SEO from "@/components/SEO";
import OptimizedHomeLayout from "@/components/home/OptimizedHomeLayout";
import ResponsiveHomePage from "@/components/home/ResponsiveHomePage";
import CelebrationExplosion from "@/components/celebration/CelebrationExplosion";
import { useCelebrationEffect } from "@/hooks/useCelebrationEffect";

const Index: React.FC = () => {
  const { showCelebration, celebrationComplete } = useCelebrationEffect();

  return (
    <>
      <CelebrationExplosion isActive={showCelebration} />
      
      {celebrationComplete && (
        <OptimizedHomeLayout>
      <SEO 
        title="Professional Recruitment Marketing Services | ZBI"
        description="Specialized recruitment marketing services that help you find qualified candidates faster and more cost-effectively. Reduce cost-per-hire by up to 40% with targeted campaigns."
        keywords="recruitment marketing, talent acquisition, hiring solutions, cost-per-hire reduction, employer branding, job advertising"
        image="/og-images/homepage.png"
      />
          <ResponsiveHomePage />
        </OptimizedHomeLayout>
      )}
    </>
  );
};

export default Index;
