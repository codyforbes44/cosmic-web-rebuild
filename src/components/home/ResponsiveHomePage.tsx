import React, { Suspense, lazy } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import OptimizedHeroSection from "./sections/OptimizedHeroSection";
import { EnhancedLoading } from "../ui/enhanced-loading";

// Lazy load non-critical sections for better performance
const RecruitmentMarketingSection = lazy(() => import("./RecruitmentMarketingSection"));
const FeaturedProducts = lazy(() => import("./FeaturedProducts"));
const AdvancedFeatures = lazy(() => import("./AdvancedFeatures"));
const CTASection = lazy(() => import("../CTASection"));
const NewsletterSection = lazy(() => import("./NewsletterSection"));

const ResponsiveHomePage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      {/* Hero Section - Always loaded immediately */}
      <OptimizedHeroSection />
      
      {/* Lazy loaded sections with loading fallback */}
      <Suspense fallback={<EnhancedLoading variant="section" />}>
        <div className="space-y-0">
          <RecruitmentMarketingSection />
          <FeaturedProducts />
          <AdvancedFeatures />
          <CTASection />
          <NewsletterSection />
        </div>
      </Suspense>
    </div>
  );
};

export default ResponsiveHomePage;