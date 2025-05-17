
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);
  
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-16">
      {/* Circuit board background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.7,
        }}
      />
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-space-dark-blue/60 to-space-deep-blue/70"
      />

      <div className={`container mx-auto px-4 py-20 z-10 text-center md:text-left max-w-6xl transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-accent mb-4 text-lg tracking-wider font-medium px-4 py-1 bg-accent/10 rounded-full">TRUSTED BY INDUSTRY LEADERS</span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Transform Your Business With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">ƷBI</span>
            </h1>
            
            <p className="text-gray-300 mb-6 text-lg">
              Elevate your organization with our cutting-edge technology solutions and expert consulting services that deliver measurable results.
            </p>
            
            <ul className="mb-8 space-y-2">
              {[
                "Custom software development tailored to your needs",
                "Data-driven insights to optimize your operations",
                "Strategic consulting from industry experts",
                "Ongoing support and maintenance"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-200">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/get-quote">
                <Button className="bg-accent hover:bg-accent/80 text-white px-8 py-6 rounded-md w-full sm:w-auto">
                  Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" className="border-gray-500 hover:bg-gray-800 text-white px-8 py-6 w-full sm:w-auto">
                  View Our Packages
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-accent/30 rounded-lg blur-xl"></div>
              <div className="bg-space-dark-blue/80 backdrop-blur-sm rounded-lg p-8 border border-gray-700 relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Start Your Project Today</h3>
                  <span className="text-accent font-medium">Limited Time</span>
                </div>
                <ul className="space-y-4 mb-6">
                  {[
                    "Free initial consultation",
                    "Project assessment & roadmap",
                    "Custom quote within 48 hours",
                    "No commitment required"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-accent mr-2" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/get-quote" className="block">
                  <Button className="w-full bg-accent hover:bg-accent/90 py-5 text-white">
                    Schedule Your Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
