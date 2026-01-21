import React from "react";
import OptimizedHeroSection from "./sections/OptimizedHeroSection";
import { createLazyComponent } from "@/hooks/use-lazy-loading";

// Use createLazyComponent with retry logic for resilient loading
const SocialProofSection = createLazyComponent(
  () => import("./SocialProofSection"),
  { retryCount: 3 }
);
const RecruitmentMarketingSection = createLazyComponent(
  () => import("./RecruitmentMarketingSection"),
  { retryCount: 3 }
);
const FeaturedProducts = createLazyComponent(
  () => import("./FeaturedProducts"),
  { retryCount: 3 }
);
const AdvancedFeatures = createLazyComponent(
  () => import("./AdvancedFeatures"),
  { retryCount: 3 }
);
const CTASection = createLazyComponent(
  () => import("../CTASection"),
  { retryCount: 3 }
);
const NewsletterSection = createLazyComponent(
  () => import("./NewsletterSection"),
  { retryCount: 3 }
);

const ResponsiveHomePage: React.FC = () => {
  return (
    <div className="w-full">
      <OptimizedHeroSection />
      
      {/* Components handle their own Suspense internally */}
      <div className="space-y-0">
        <SocialProofSection />
        <RecruitmentMarketingSection />
        <FeaturedProducts />
        <AdvancedFeatures />
        <CTASection />
        <NewsletterSection />
      </div>
    </div>
  );
};

export default ResponsiveHomePage;