
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSolutions from "@/components/ServicesSolutions";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ProductOfferings from "@/components/ProductOfferings";
import TruckDriverRecruitingFeature from "@/components/hero/TruckDriverRecruitingFeature";

const Index = () => {
  return (
    <>
      <SEO 
        title="Professional Technology Solutions" 
        description="Transform your business with ƷBI's innovative technology solutions. Expert consulting, custom software development, and data analytics to drive growth and efficiency."
        keywords="business technology, digital transformation, IT consulting, ƷBI, technology solutions, business innovation, custom software development"
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
      />
      <Navbar />
      <main className="overflow-x-hidden">
        <StarBackground />
        <HeroSection />
        <TruckDriverRecruitingFeature />
        <Testimonials />
        <ServicesSolutions />
        <ProductOfferings />
        <CTASection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
