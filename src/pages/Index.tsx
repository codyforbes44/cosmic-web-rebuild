
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
        description="Transform your business with ƷBI's innovative technology solutions. Expert consulting, custom software development, and data analytics to drive growth and efficiency."
        keywords="business technology, digital transformation, IT consulting, ƷBI, technology solutions, business innovation, custom software development"
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
