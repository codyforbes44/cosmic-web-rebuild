
import StarBackground from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedPlanets from "@/components/FeaturedPlanets";
import AstronomyFacts from "@/components/AstronomyFacts";
import AstronomyImageOfDay from "@/components/AstronomyImageOfDay";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <StarBackground />
        <HeroSection />
        <FeaturedPlanets />
        <AstronomyFacts />
        <AstronomyImageOfDay />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
