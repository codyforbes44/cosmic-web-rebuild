
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoadingState: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="space-card p-8 rounded-xl flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white">Loading case study...</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoadingState;
