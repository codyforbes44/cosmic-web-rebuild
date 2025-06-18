
import React from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoHeader from "@/components/demo/DemoHeader";
import DemoKPIGrid from "@/components/demo/DemoKPIGrid";
import DemoCharts from "@/components/demo/DemoCharts";
import DemoMetrics from "@/components/demo/DemoMetrics";
import DemoTestimonials from "@/components/demo/DemoTestimonials";
import DemoCTA from "@/components/demo/DemoCTA";

const Demo: React.FC = () => {
  return (
    <>
      <SEO
        title="Live Demo - ƷBI Performance Dashboard"
        description="Experience our comprehensive business intelligence platform with real-time KPIs, analytics, and performance metrics designed for modern enterprises."
        keywords="demo, KPI dashboard, business intelligence, analytics, performance metrics, ƷBI"
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-space-dark-blue to-space-deep-blue">
        <DemoHeader />
        <div className="container mx-auto px-4 py-8 space-y-12">
          <DemoKPIGrid />
          <DemoCharts />
          <DemoMetrics />
          <DemoTestimonials />
          <DemoCTA />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Demo;
