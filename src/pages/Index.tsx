
import SEO from "@/components/SEO";
import HomeLayout from "@/components/home/HomeLayout";
import MainContent from "@/components/home/MainContent";
import WebServicesSection from "@/components/home/WebServicesSection";
import TechShowcase from "@/components/home/TechShowcase";
import RecruitmentMarketingSection from "@/components/home/RecruitmentMarketingSection";
import AdvancedFeatures from "@/components/home/AdvancedFeatures";
import ClientTestimonials from "@/components/home/ClientTestimonials";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <HomeLayout>
      <SEO 
        title="Professional Web Development & AI Solutions | ZBI"
        description="Transform your business with cutting-edge web development, AI solutions, and digital marketing services. Custom websites, recruitment tools, and enterprise solutions."
        keywords="web development, AI solutions, digital marketing, custom websites, business automation, recruitment software"
      />
      <MainContent />
      <WebServicesSection />
      <TechShowcase />
      <RecruitmentMarketingSection />
      <AdvancedFeatures />
      <ClientTestimonials />
      <NewsletterSection />
    </HomeLayout>
  );
};

export default Index;
