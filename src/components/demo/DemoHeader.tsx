
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, BarChart3, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import DemoModal from "./interactive/DemoModal";

const DemoHeader: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30">
              LIVE DEMO ENVIRONMENT
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">ƷBI</span> in Action
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore our comprehensive business intelligence platform with real-time KPIs, 
              advanced analytics, and performance metrics that drive successful business decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
                onClick={() => setIsDemoModalOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Start Interactive Demo
              </Button>
              <Link to="/contact">
                <Button variant="outline" className="border-gray-500 hover:bg-gray-800 text-white px-8 py-3 text-lg">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Demo stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <BarChart3 className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">50+ KPIs</h3>
              <p className="text-gray-400">Real-time business metrics</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">99.9% Uptime</h3>
              <p className="text-gray-400">Enterprise reliability</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <Users className="h-8 w-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">500+ Clients</h3>
              <p className="text-gray-400">Trusted worldwide</p>
            </div>
          </div>
        </div>
      </section>

      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </>
  );
};

export default DemoHeader;
