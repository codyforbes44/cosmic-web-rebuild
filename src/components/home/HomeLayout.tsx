
import React from "react";
import Navbar from "../Navbar";
import SEO from "../SEO";
import Footer from "../Footer";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-space-dark-blue">
      <SEO 
        title="ZepTech - Advanced Technology Solutions"
        description="Cutting-edge technology solutions including AI, machine learning, cloud computing, and digital transformation services."
      />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
