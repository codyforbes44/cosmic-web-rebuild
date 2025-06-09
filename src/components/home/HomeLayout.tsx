
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
          title="ƷBI - Business Technology Solutions"
          description="ƷBI delivers innovative business technology solutions and expert consulting services to transform your operations and drive growth."
        />
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
