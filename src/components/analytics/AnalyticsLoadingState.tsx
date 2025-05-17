
import React from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';

const AnalyticsLoadingState: React.FC = () => {
  return (
    <>
      <SEO 
        title="Analytics Dashboard" 
        description="View website analytics and visitor data."
      />
      <StarBackground />
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24 flex items-center justify-center z-10">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Loading analytics data...</h2>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AnalyticsLoadingState;
