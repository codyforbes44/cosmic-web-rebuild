
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AstronomyFacts from "@/components/AstronomyFacts";
import BusinessCaseStudy from "@/components/BusinessCaseStudy";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <>
      <SEO 
        title="Professional Technology Solutions" 
        description="ƷBI delivers innovative business technology solutions and expert consulting services to transform your operations and drive growth."
        keywords="business technology, digital transformation, IT consulting, ƷBI, technology solutions, business innovation"
      />
      <Navbar />
      <main className="overflow-x-hidden">
        <StarBackground />
        <HeroSection />
        <Testimonials />
        <AstronomyFacts />
        <BusinessCaseStudy />
        <CTASection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
