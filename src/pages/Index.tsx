
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AstronomyFacts from "@/components/AstronomyFacts";
import BusinessCaseStudy from "@/components/BusinessCaseStudy";
import CTASection from "@/components/CTASection";
import Newsletter from "@/components/Newsletter";
import ProductsSection from "@/components/ProductsSection";
import SEO from "@/components/SEO";
import Testimonials from "@/components/Testimonials";
import ClientLogos from "@/components/ClientLogos";
import ValueProposition from "@/components/ValueProposition";

const Index = () => {
  return (
    <>
      <SEO 
        title="Transform Your Business with Technology - ƷBI Solutions" 
        description="Boost efficiency and growth with ƷBI's innovative technology solutions. Custom software, data analytics, and expert consulting tailored for your business needs."
        keywords="business technology, digital transformation, IT consulting, ƷBI, technology solutions, business innovation, custom software development"
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
      />
      <StarBackground />
      <Navbar />
      <main className="relative overflow-x-hidden z-10">
        <HeroSection />
        <ClientLogos />
        <ValueProposition />
        <Testimonials />
        <ProductsSection />
        <BusinessCaseStudy />
        <CTASection />
        <Newsletter />
        <AstronomyFacts />
      </main>
      <Footer />
    </>
  );
};

export default Index;
