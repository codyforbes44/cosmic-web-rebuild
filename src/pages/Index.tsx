
import SEO from "@/components/SEO";
import HomeLayout from "@/components/home/HomeLayout";
import MainContent from "@/components/home/MainContent";
import WebServicesSection from "@/components/home/WebServicesSection";
import AdvancedFeatures from "@/components/home/AdvancedFeatures";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <HomeLayout>
      <SEO 
        title="Professional Web Development & AI Solutions | ZBI"
        description="Transform your business with cutting-edge web development, AI solutions, and digital marketing services. Custom websites, recruitment tools, and enterprise solutions."
        keywords="web development, AI solutions, digital marketing, custom websites, business automation, recruitment software"
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&crop=center"
      />
      <MainContent />
      <WebServicesSection />
      <AdvancedFeatures />
      <NewsletterSection />
    </HomeLayout>
  );
};

export default Index;
