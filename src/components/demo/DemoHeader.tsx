
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

const DemoHeader: React.FC = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('interactive-demo');
    demoSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-accent/20 rounded-full">
            <BarChart3 className="w-12 h-12 text-accent" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Experience Our
          <span className="text-accent block">Analytics Platform</span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          See how our advanced analytics and reporting capabilities can transform your business intelligence. 
          Interact with real-time dashboards, customize reports, and discover actionable insights.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 text-gray-300">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span>Real-time Analytics</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Target className="w-5 h-5 text-accent" />
            <span>Custom Dashboards</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Zap className="w-5 h-5 text-accent" />
            <span>Instant Insights</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToDemo}
            className="bg-accent hover:bg-accent/80 text-white px-8 py-3 text-lg"
          >
            Start Interactive Demo
          </Button>
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/5 px-8 py-3 text-lg"
          >
            Schedule Live Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DemoHeader;
