
import React from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import SEO from '@/components/SEO';

interface AnalyticsErrorStateProps {
  error: string;
}

const AnalyticsErrorState: React.FC<AnalyticsErrorStateProps> = ({ error }) => {
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
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Analytics</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Retry
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AnalyticsErrorState;
