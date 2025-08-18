
import React from "react";
import SEO from "@/components/SEO";
import OptimizedHomeLayout from "@/components/home/OptimizedHomeLayout";
import ResponsiveHomePage from "@/components/home/ResponsiveHomePage";

const Index: React.FC = () => {
  return (
    <OptimizedHomeLayout>
      <SEO 
        title="Professional Recruitment Marketing Services | ZBI"
        description="Specialized recruitment marketing services that help you find qualified candidates faster and more cost-effectively. Reduce cost-per-hire by up to 40% with targeted campaigns."
        keywords="recruitment marketing, talent acquisition, hiring solutions, cost-per-hire reduction, employer branding, job advertising"
        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop&crop=center"
      />
      <ResponsiveHomePage />
    </OptimizedHomeLayout>
  );
};

export default Index;
