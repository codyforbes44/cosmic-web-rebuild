
import React from "react";
import SEO from "@/components/SEO";
import HomeLayout from "@/components/home/HomeLayout";
import HomePage from "@/components/home/HomePage";

const Index: React.FC = () => {
  return (
    <HomeLayout>
      <SEO 
        title="Professional Web Development & AI Solutions | ZBI"
        description="Transform your business with cutting-edge web development, AI solutions, and digital marketing services. Custom websites, recruitment tools, and enterprise solutions."
        keywords="web development, AI solutions, digital marketing, custom websites, business automation, recruitment software"
        image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop&crop=center"
      />
      <HomePage />
    </HomeLayout>
  );
};

export default Index;
