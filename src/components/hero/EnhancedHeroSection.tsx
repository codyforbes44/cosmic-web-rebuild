
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Zap, Globe, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const capabilities = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Military-grade encryption and compliance standards"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Sub-millisecond response times with 99.9% uptime"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Distributed infrastructure across 50+ regions"
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description: "Advanced machine learning and neural networks"
  }
];

const EnhancedHeroSection = () => {
  const [currentCapability, setCurrentCapability] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCapability((prev) => (prev + 1) % capabilities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-200 text-sm font-medium"
              >
                <Shield className="w-4 h-4 mr-2" />
                AUTONOMOUS BUSINESS SYSTEMS
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              >
                The Future of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Business Intelligence
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 max-w-2xl leading-relaxed"
              >
                Autonomous AI systems that transform how businesses operate, 
                make decisions, and scale operations with unprecedented precision and intelligence.
              </motion.p>
            </div>

            {/* Rotating Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="h-24"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCapability}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    {React.createElement(capabilities[currentCapability].icon, {
                      className: "w-6 h-6 text-white"
                    })}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {capabilities[currentCapability].title}
                    </h3>
                    <p className="text-gray-400">
                      {capabilities[currentCapability].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/demo">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Deploy System <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsVideoPlaying(true)}
                className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Technical Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">&lt;10ms</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Autonomous</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {/* Simulated Interface */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
              
              {/* Mock Terminal/Dashboard */}
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">ƷBI Command Center</span>
                </div>
                
                <div className="flex-1 space-y-3 font-mono text-sm">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-green-400"
                  >
                    $ zbi system status
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-gray-300"
                  >
                    ✓ Neural networks: ONLINE
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="text-gray-300"
                  >
                    ✓ Data processing: 2.3TB/s
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-gray-300"
                  >
                    ✓ Decision engine: AUTONOMOUS
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    className="text-blue-400 flex items-center"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                    Optimizing business processes...
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-4 right-4 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-2"
              >
                <Cpu className="w-6 h-6 text-blue-400" />
              </motion.div>
            </div>

            {/* Capability Indicators */}
            <div className="absolute -bottom-4 -left-4 grid grid-cols-2 gap-2">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2 }}
                  className={`p-2 rounded-lg border transition-all duration-300 ${
                    index === currentCapability
                      ? 'bg-blue-500/20 border-blue-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  {React.createElement(cap.icon, {
                    className: `w-4 h-4 ${
                      index === currentCapability ? 'text-blue-400' : 'text-gray-400'
                    }`
                  })}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHeroSection;
