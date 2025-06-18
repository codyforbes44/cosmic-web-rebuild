
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const DemoCTA: React.FC = () => {
  return (
    <section className="py-16">
      <Card className="bg-gradient-to-r from-orange-500/10 to-red-600/10 backdrop-blur-sm border-orange-500/20">
        <CardContent className="p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business Intelligence?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join hundreds of organizations already using ƷBI to make data-driven decisions, 
            improve efficiency, and accelerate growth.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-lg border border-white/10">
              <Calendar className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Free Consultation</h3>
              <p className="text-gray-400 text-sm">30-minute strategy session</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-lg border border-white/10">
              <Users className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Expert Onboarding</h3>
              <p className="text-gray-400 text-sm">Dedicated implementation team</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-lg border border-white/10">
              <Zap className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Quick Setup</h3>
              <p className="text-gray-400 text-sm">Live in 48 hours or less</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/get-quote">
              <Button variant="outline" className="border-gray-500 hover:bg-gray-800 text-white px-8 py-4 text-lg">
                Get Custom Quote
              </Button>
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm mt-6">
            No credit card required • 30-day money-back guarantee • Enterprise-grade security
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default DemoCTA;
