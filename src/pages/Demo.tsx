
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DemoHeader from '@/components/demo/DemoHeader';
import InteractiveDashboard from '@/components/demo/InteractiveDashboard';
import DemoFeatures from '@/components/demo/DemoFeatures';
import DemoTestimonials from '@/components/demo/DemoTestimonials';
import DemoCTA from '@/components/demo/DemoCTA';
import SEO from '@/components/SEO';

const Demo: React.FC = () => {
  return (
    <>
      <SEO 
        title="Interactive Demo - Advanced Analytics Platform"
        description="Experience our powerful analytics and reporting platform with real-time data visualization, customizable dashboards, and comprehensive business intelligence tools."
        keywords="analytics demo, business intelligence, data visualization, reporting tools, dashboard demo"
        image="/og-images/demo.png"
      />
      <div className="min-h-screen bg-gradient-to-br from-space-dark-blue via-space-deep-blue to-space-dark-blue">
        <Navbar />
        <main className="pt-20">
          <DemoHeader />
          <InteractiveDashboard />
          <DemoFeatures />
          <DemoTestimonials />
          <DemoCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Demo;
