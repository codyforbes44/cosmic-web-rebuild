
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Monitor, Smartphone, Globe, Shield } from 'lucide-react';

const products = [
  {
    id: 'zbi-core',
    name: 'ƷBI Core Platform',
    category: 'Autonomous Intelligence',
    description: 'The foundational AI system that powers autonomous business operations with real-time decision making.',
    features: [
      'Neural Decision Engine',
      'Predictive Analytics',
      'Process Automation',
      'Risk Assessment'
    ],
    performance: {
      processing: '2.3TB/s',
      accuracy: '99.7%',
      uptime: '99.99%',
      latency: '<5ms'
    },
    image: '/api/placeholder/600/400'
  },
  {
    id: 'zbi-voice',
    name: 'ƷBI Voice Intelligence',
    category: 'Conversational AI',
    description: 'Advanced voice AI that understands context, emotion, and intent for natural business interactions.',
    features: [
      'Natural Language Processing',
      'Emotion Recognition',
      'Multi-language Support',
      'Voice Biometrics'
    ],
    performance: {
      languages: '50+',
      accuracy: '98.5%',
      response: '<100ms',
      concurrent: '10K+'
    },
    image: '/api/placeholder/600/400'
  },
  {
    id: 'zbi-analytics',
    name: 'ƷBI Analytics Engine',
    category: 'Business Intelligence',
    description: 'Real-time analytics platform that transforms data into actionable business insights.',
    features: [
      'Real-time Dashboards',
      'Predictive Modeling',
      'Anomaly Detection',
      'Custom Reports'
    ],
    performance: {
      dataPoints: '1B+/hr',
      models: '500+',
      accuracy: '99.2%',
      speed: 'Real-time'
    },
    image: '/api/placeholder/600/400'
  }
];

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-200 text-sm font-medium mb-6">
            PRODUCT LINEUP
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Autonomous Systems Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive suite of AI-powered systems designed to operate independently 
            and deliver measurable business outcomes.
          </p>
        </motion.div>

        {/* Product Navigation */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product List */}
          <div className="lg:w-1/3 space-y-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeProduct === index
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/50'
                    : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
                }`}
                onClick={() => setActiveProduct(index)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {product.name}
                    </h3>
                  </div>
                  {activeProduct === index && (
                    <motion.div
                      layoutId="active-indicator"
                      className="w-3 h-3 bg-blue-500 rounded-full"
                    />
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Product Details */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Product Demo */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent" />
                  
                  {/* Mock Interface */}
                  <div className="absolute inset-0 p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Monitor className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-semibold">
                          {products[activeProduct].name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm">OPERATIONAL</span>
                      </div>
                    </div>
                    
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {Object.entries(products[activeProduct].performance).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 text-center border border-slate-600/30"
                        >
                          <div className="text-2xl font-bold text-white mb-1">{value}</div>
                          <div className="text-xs text-gray-400 uppercase">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-3">
                      {products[activeProduct].features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <Shield className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                      size="lg"
                    >
                      <Play className="w-6 h-6 text-white" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex-1"
                  >
                    Deploy {products[activeProduct].name}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600 bg-slate-800/50 text-white hover:bg-slate-700/50 flex-1"
                  >
                    Technical Specs
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
