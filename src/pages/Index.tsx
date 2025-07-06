
import SEO from "@/components/SEO";
import HomeLayout from "@/components/home/HomeLayout";
import EnhancedHeroSection from "@/components/hero/EnhancedHeroSection";
import TechnicalCapabilities from "@/components/sections/TechnicalCapabilities";
import ProductShowcase from "@/components/sections/ProductShowcase";
import MissionStatement from "@/components/sections/MissionStatement";
import AdvancedFeatures from "@/components/home/AdvancedFeatures";
import NewsletterSection from "@/components/home/NewsletterSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <HomeLayout>
      <SEO 
        title="ƷBI - Autonomous Business Intelligence Systems"
        description="Military-grade autonomous AI systems that transform business operations with uncompromising precision, security, and reliability. Built for mission-critical applications."
        keywords="autonomous AI, business intelligence, military-grade technology, enterprise automation, real-time analytics, decision systems"
        image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&crop=center"
      />
      <EnhancedHeroSection />
      <TechnicalCapabilities />
      <ProductShowcase />
      <MissionStatement />
      <AdvancedFeatures />
      <CTASection />
      <NewsletterSection />
    </HomeLayout>
  );
};

export default Index;
