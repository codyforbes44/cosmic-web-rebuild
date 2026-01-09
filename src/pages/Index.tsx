import React from "react";
import SEO from "@/components/SEO";
import OptimizedHomeLayout from "@/components/home/OptimizedHomeLayout";
import ResponsiveHomePage from "@/components/home/ResponsiveHomePage";
import CelebrationExplosion from "@/components/celebration/CelebrationExplosion";
import { useCelebrationEffect } from "@/hooks/useCelebrationEffect";
import { generateWebsiteSchema, generateOrganizationSchema } from "@/utils/seoUtils";

// WebSite schema for search engines - helps AI understand site structure
const websiteSchema = generateWebsiteSchema("ƷBI - Business Technology Solutions", "https://3bi.io");

// Organization schema with comprehensive details for generative AI
const organizationSchema = generateOrganizationSchema({
  name: "ƷBI - Business Technology Solutions",
  url: "https://3bi.io",
  logo: "https://3bi.io/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png",
  description: "Leading provider of AI-powered business technology solutions, recruitment marketing, digital marketing, web development, and strategic consulting services.",
  foundingDate: "2020",
  founders: ["ƷBI Team"],
  contactPoint: {
    telephone: "+1-817-757-2828",
    contactType: "customer service",
    email: "support@3bi.io"
  },
  sameAs: [
    "https://www.linkedin.com/company/3bi-io",
    "https://twitter.com/3bi_io"
  ]
});

const Index: React.FC = () => {
  const { showCelebration, celebrationComplete } = useCelebrationEffect();

  return (
    <>
      <CelebrationExplosion isActive={showCelebration} />
      
      {celebrationComplete && (
        <OptimizedHomeLayout>
          <SEO 
            title="AI-Powered Business Technology Solutions | ƷBI"
            description="ƷBI delivers innovative AI solutions, recruitment marketing, digital transformation, and technology consulting. Reduce costs by up to 40% with our data-driven strategies."
            keywords="AI solutions, recruitment marketing, digital transformation, business technology, web development, chatbots, analytics, strategic consulting"
            image="/og-images/homepage.png"
            structuredData={[websiteSchema, organizationSchema]}
          />
          <ResponsiveHomePage />
        </OptimizedHomeLayout>
      )}
    </>
  );
};

export default Index;
