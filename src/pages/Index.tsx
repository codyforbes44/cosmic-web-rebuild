
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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
        
        {/* Feature Showcase Banner */}
        <div className="relative z-10 py-8 bg-gradient-to-r from-space-deep-blue/70 to-blue-900/50 backdrop-blur-sm border-y border-brand-gold/20">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-gold mb-2">
              Discover Advanced Features
            </h2>
            <p className="text-gray-300 mb-4 max-w-2xl mx-auto">
              Explore powerful tools and integrations to enhance your business capabilities
            </p>
            <Button asChild className="bg-brand-gold hover:bg-brand-gold/90 text-black">
              <Link to="/features">
                View All Features <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
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
