import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import ServiceCaseStudy from "@/components/ServiceCaseStudy";
import SEO from "@/components/SEO";
import { recruitmentService } from "@/data/services/recruitmentService";
import LiveChat from "@/components/LiveChat/LiveChat";
import RecruitmentHero from "@/components/recruitment/RecruitmentHero";
import IndustryStats from "@/components/recruitment/IndustryStats";
import HowItWorks from "@/components/recruitment/HowItWorks";
import RecruitmentBenefits from "@/components/recruitment/RecruitmentBenefits";
import RecruitmentCTA from "@/components/recruitment/RecruitmentCTA";
import { generateServiceSchema } from "@/utils/seoUtils";

// Service schema for generative AI optimization
const serviceSchema = generateServiceSchema({
  name: "Recruitment Marketing Services",
  description: "Powerful recruitment marketing campaigns for businesses across all industries. Attract, engage and convert qualified candidates while reducing cost-per-hire by up to 40% with targeted multi-channel campaigns.",
  serviceType: "Recruitment Marketing",
  url: "https://3bi.io/recruitment-marketing",
  image: "https://3bi.io/og-images/recruitment-marketing.png"
});

const RecruitmentMarketing: React.FC = () => {
  const service = recruitmentService;
  
  return (
    <>
      <SEO 
        title="Professional Recruitment Marketing Services" 
        description="Powerful recruitment campaigns for businesses across all industries. Attract, engage and convert qualified candidates while reducing cost-per-hire by up to 40%."
        keywords="recruitment marketing, talent acquisition, candidate recruitment, hiring solutions, professional recruiting, recruitment campaigns, talent sourcing, employer branding"
        image="/og-images/recruitment-marketing.png"
        structuredData={serviceSchema}
        breadcrumbs={[
          { name: 'Home', url: 'https://3bi.io/' },
          { name: 'Services', url: 'https://3bi.io/services' },
          { name: 'Recruitment Marketing', url: 'https://3bi.io/recruitment-marketing' }
        ]}
      />
      <Navbar />
      <StarBackground />
      
      <main className="min-h-screen pt-24 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <RecruitmentHero serviceColor={service.color} />
          
          <IndustryStats serviceColor={service.color} />
          
          <HowItWorks serviceColor={service.color} />
          
          <RecruitmentBenefits 
            benefits={service.benefits} 
            serviceColor={service.color} 
          />
          
          <ServiceCaseStudy 
            serviceId={service.id}
            title={service.case_study.title}
            client={service.case_study.client}
            description={service.case_study.description}
            results={service.case_study.results}
            color={service.color}
          />
          
          <RecruitmentCTA serviceColor={service.color} />
        </div>
      </main>
      
      <Footer />
      <LiveChat />
    </>
  );
};

export default RecruitmentMarketing;
