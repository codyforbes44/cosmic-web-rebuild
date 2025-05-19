
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import DemoRequestModal from "./products/DemoRequestModal";

const HeroSection = () => {
  const [visible, setVisible] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [showSparks, setShowSparks] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setVisible(true);
    
    // Check if user has seen the spark animation in this session
    const hasSeenSparks = sessionStorage.getItem('hasSeenSparks');
    if (!hasSeenSparks) {
      // Add small delay before showing sparks for better user experience
      const sparkTimer = setTimeout(() => {
        setShowSparks(true);
        sessionStorage.setItem('hasSeenSparks', 'true');
      }, 600);
      
      // Auto-hide sparks after animation completes
      const hideTimer = setTimeout(() => {
        setShowSparks(false);
      }, 7500); // Extended to accommodate all animations
      
      return () => {
        clearTimeout(sparkTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);
  
  return (
    <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-center justify-center pt-16">
      {/* Circuit board background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4,
        }}
      />
      
      {/* Sparks animation overlay */}
      {showSparks && (
        <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
          <div className="spark spark-1" aria-hidden="true"></div>
          <div className="spark spark-2" aria-hidden="true"></div>
          <div className="spark spark-3" aria-hidden="true"></div>
          <div className="spark spark-4" aria-hidden="true"></div>
          <div className="spark spark-5" aria-hidden="true"></div>
          <div className="spark spark-6" aria-hidden="true"></div>
          <div className="spark spark-7" aria-hidden="true"></div>
          <div className="node node-1" aria-hidden="true"></div>
          <div className="node node-2" aria-hidden="true"></div>
          <div className="node node-3" aria-hidden="true"></div>
        </div>
      )}
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-space-dark-blue/60 to-space-deep-blue/70"
      />

      {/* CSS for spark animations */}
      <style>
        {`
          /* Base spark styling */
          .spark {
            position: absolute;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: #8B5CF6;
            box-shadow: 0 0 8px 2px rgba(139, 92, 246, 0.7),
                        0 0 16px 5px rgba(139, 92, 246, 0.3);
            opacity: 0;
            z-index: 5;
            will-change: transform, opacity;
          }
          
          /* Trailing effect for sparks */
          .spark::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 70px;
            height: 1px;
            background: linear-gradient(to right, rgba(139, 92, 246, 0.9), rgba(139, 92, 246, 0));
            transform: translateX(-100%) translateY(-50%) rotateZ(0deg);
            transform-origin: right center;
            will-change: transform;
          }
          
          /* Node points where sparks connect */
          .node {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: rgba(139, 92, 246, 0.2);
            box-shadow: 0 0 10px 2px rgba(139, 92, 246, 0.3);
            z-index: 4;
            opacity: 0;
            will-change: opacity, transform;
          }
          
          .node-1 {
            top: 35%;
            left: 25%;
            animation: nodePulse 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 1.5s;
          }
          
          .node-2 {
            top: 65%;
            left: 60%;
            animation: nodePulse 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 2s;
          }
          
          .node-3 {
            top: 25%;
            left: 75%;
            animation: nodePulse 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 3s;
          }
          
          .spark-1 {
            top: 20%;
            left: -10px;
            animation: sparkMove1 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          }
          
          .spark-2 {
            top: 50%;
            left: -10px;
            animation: sparkMove2 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 0.5s;
          }
          
          .spark-3 {
            top: 70%;
            left: -10px;
            animation: sparkMove3 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 1s;
          }
          
          .spark-4 {
            top: 35%;
            left: -10px;
            animation: sparkMove4 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 1.7s;
          }
          
          .spark-5 {
            top: 85%;
            left: -10px;
            animation: sparkMove5 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 0.8s;
          }
          
          .spark-6 {
            top: 15%;
            left: -10px;
            animation: sparkMove6 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 2.2s;
          }
          
          .spark-7 {
            top: 60%;
            left: -10px;
            animation: sparkMove7 6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            animation-delay: 2.8s;
          }
          
          @keyframes nodePulse {
            0%, 10% { transform: scale(0); opacity: 0; }
            20% { transform: scale(1.5); opacity: 0.8; }
            30%, 90% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(0); opacity: 0; }
          }
          
          @keyframes sparkMove1 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            5% { opacity: 1; }
            20%, 40% { transform: translateX(calc(25vw + 5px)) translateY(calc(15vh)); opacity: 1; }
            60%, 80% { transform: translateX(calc(75vw)) translateY(calc(5vh)); opacity: 0.8; }
            95% { opacity: 0.6; }
            100% { transform: translateX(calc(105vw)) translateY(calc(10vh)); opacity: 0; }
          }
          
          @keyframes sparkMove2 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            8% { opacity: 1; }
            25%, 45% { transform: translateX(calc(60vw)) translateY(calc(15vh)); opacity: 0.9; }
            65%, 85% { transform: translateX(calc(80vw)) translateY(calc(-10vh)); opacity: 0.7; }
            95% { opacity: 0.5; }
            100% { transform: translateX(calc(105vw)) translateY(calc(-15vh)); opacity: 0; }
          }
          
          @keyframes sparkMove3 {
            0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; transform: translateX(calc(10vw)) translateY(calc(-5vh)) rotate(2deg); }
            40% { transform: translateX(calc(45vw)) translateY(calc(-5vh)) rotate(-2deg); opacity: 1; }
            70% { transform: translateX(calc(70vw)) translateY(calc(10vh)) rotate(1deg); opacity: 0.8; }
            95% { opacity: 0.6; }
            100% { transform: translateX(calc(105vw)) translateY(calc(15vh)) rotate(-1deg); opacity: 0; }
          }
          
          @keyframes sparkMove4 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            10% { opacity: 1; }
            20%, 30% { transform: translateX(calc(25vw)) translateY(0); opacity: 1; }
            50%, 70% { transform: translateX(calc(60vw)) translateY(calc(20vh)); opacity: 0.8; }
            95% { opacity: 0.5; }
            100% { transform: translateX(calc(105vw)) translateY(calc(-10vh)); opacity: 0; }
          }
          
          @keyframes sparkMove5 {
            0% { transform: translateX(0) translateY(0) rotate(0deg); opacity: 0; }
            8% { opacity: 1; transform: translateX(calc(10vw)) translateY(calc(-8vh)) rotate(-2deg); }
            30%, 50% { transform: translateX(calc(50vw)) translateY(calc(-15vh)) rotate(3deg); opacity: 1; }
            70%, 90% { transform: translateX(calc(80vw)) translateY(calc(-20vh)) rotate(-1deg); opacity: 0.7; }
            95% { opacity: 0.4; }
            100% { transform: translateX(calc(105vw)) translateY(calc(-25vh)) rotate(2deg); opacity: 0; }
          }
          
          @keyframes sparkMove6 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            10% { opacity: 1; }
            30%, 50% { transform: translateX(calc(40vw)) translateY(calc(25vh)) rotateZ(-5deg); opacity: 0.9; }
            70%, 80% { transform: translateX(calc(75vw)) translateY(calc(-5vh)) rotateZ(5deg); opacity: 0.7; }
            95% { opacity: 0.5; }
            100% { transform: translateX(calc(105vw)) translateY(calc(5vh)); opacity: 0; }
          }
          
          @keyframes sparkMove7 {
            0% { transform: translateX(0) translateY(0); opacity: 0; }
            10% { opacity: 1; }
            20%, 40% { transform: translateX(calc(30vw)) translateY(calc(5vh)); opacity: 0.9; }
            60%, 80% { transform: translateX(calc(65vw)) translateY(calc(15vh)); opacity: 0.8; }
            95% { opacity: 0.6; }
            100% { transform: translateX(calc(105vw)) translateY(calc(8vh)); opacity: 0; }
          }
        `}
      </style>

      <DemoRequestModal 
        isOpen={demoModalOpen} 
        onOpenChange={setDemoModalOpen} 
        productTitle="ƷBI Solutions"
      />

      <div className="container max-w-6xl mx-auto px-4 py-12 md:py-20 z-10 text-center md:text-left transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <span className="inline-block text-accent mb-4 text-sm md:text-lg tracking-wider font-medium px-3 py-1 bg-accent/10 rounded-full">INNOVATIVE SOLUTIONS</span>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white">
              Transform Your Business With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">ƷBI</span>
            </h1>
            
            <p className="text-gray-300 mb-4 md:mb-6 text-base md:text-lg">
              Elevate your organization with our cutting-edge technology solutions and expert consulting.
            </p>
            
            <ul className="mb-6 md:mb-8 space-y-2 max-w-md mx-auto md:mx-0">
              {[
                "Custom software development tailored to your needs",
                "Data-driven insights to optimize your operations",
                "Strategic consulting from industry experts",
                "Ongoing support and maintenance"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-200 text-left text-sm md:text-base">{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to="/get-quote" className="w-full sm:w-auto">
                <Button className="bg-accent hover:bg-accent/80 text-white px-6 py-5 rounded-md w-full text-base">
                  Get Your Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services" className="w-full sm:w-auto">
                <Button variant="outline" className="border-gray-500 hover:bg-gray-800 text-white px-6 py-5 w-full text-base">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
          
          {!isMobile && (
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
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 py-5 text-white"
                    onClick={() => setDemoModalOpen(true)}
                  >
                    Schedule Your Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {isMobile && (
            <div className="mt-6 w-full py-6 px-5 bg-space-dark-blue/60 border border-gray-700 rounded-lg backdrop-blur-sm">
              <div className="text-center">
                <span className="inline-block mb-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">LIMITED OFFER</span>
                <h3 className="text-lg font-bold mb-3 text-white">Free Consultation</h3>
                <p className="text-sm text-gray-300 mb-4">Get expert advice and a custom quote within 48 hours.</p>
                <Button 
                  className="w-full bg-accent hover:bg-accent/90 py-4 text-white"
                  onClick={() => setDemoModalOpen(true)}
                >
                  Get Started Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
