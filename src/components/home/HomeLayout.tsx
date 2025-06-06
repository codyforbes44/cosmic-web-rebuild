
import React from "react";
import Navbar from "../Navbar";
import SEO from "../SEO";
import Footer from "../Footer";
import StarBackground from "../StarBackground";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <StarBackground />
      <div className="min-h-screen relative z-10">
        <SEO 
          title="ZepTech - Advanced Technology Solutions"
          description="Cutting-edge technology solutions including AI, machine learning, cloud computing, and digital transformation services."
        />
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
