
import React, { useEffect, useState } from 'react';
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import StarBackground from "@/components/StarBackground";
import CalculatorInterface from "@/components/calculator/CalculatorInterface";
import { Toaster } from "@/components/ui/toaster";

const ScientificCalculator = () => {
  const [isEmbedded, setIsEmbedded] = useState(false);
  
  useEffect(() => {
    // Check if the calculator is being embedded
    const urlParams = new URLSearchParams(window.location.search);
    setIsEmbedded(urlParams.get('embed') === 'true');
  }, []);
  
  // If in embedded mode, render just the calculator
  if (isEmbedded) {
    return (
      <div className="min-h-screen bg-space-dark-blue">
        <CalculatorInterface />
        <Toaster />
      </div>
    );
  }
  
  // Regular full page view
  return (
    <>
      <SEO 
        title="Scientific Calculator | Ʒʙɪ Tools" 
        description="Advanced scientific calculator with trigonometric, logarithmic, and statistical functions. Perfect for students, engineers, and professionals." 
        keywords="scientific calculator, math, trigonometry, logarithm, engineering calculator, Ʒʙɪ tools" 
        image="/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png"
        type="website"
      />
      <Navbar />
      <StarBackground />
      
      <main className="min-h-screen py-16 md:py-24 px-4 relative">
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Ʒʙɪ Scientific Calculator</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Advanced mathematical calculator with scientific functions including trigonometry, 
              logarithms, exponents, and more for students and professionals.
            </p>
          </div>

          <div className="flex justify-center">
            <CalculatorInterface />
          </div>
        </div>
      </main>
      
      <Toaster />
    </>
  );
};

export default ScientificCalculator;
