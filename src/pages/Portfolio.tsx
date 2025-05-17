
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import SEO from "@/components/SEO";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import PortfolioHeader from "@/components/portfolio/PortfolioHeader";
import { projects, categories } from "@/components/portfolio/projectsData";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
      <SEO 
        title="Our Portfolio" 
        description="Explore our successful projects and see how we've helped businesses transform and grow."
      />
      <StarBackground />
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24 z-10">
        <div className="container mx-auto px-4">
          <PortfolioHeader />
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          <ProjectGrid 
            projects={projects} 
            activeCategory={activeCategory} 
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
