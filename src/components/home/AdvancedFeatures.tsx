
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Shield, Globe, Cpu, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AdvancedFeatures = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Intelligent assistance powered by cutting-edge language models with contextual understanding.",
      badge: "Premium",
      highlights: ["GPT-4o Integration", "Custom Prompts", "Smart Suggestions"]
    },
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Advanced data visualization and insights with customizable dashboards and reporting.",
      badge: "Pro",
      highlights: ["Live Metrics", "Custom Reports", "Data Export"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with two-factor authentication and compliance reporting.",
      badge: "Enterprise",
      highlights: ["2FA", "Audit Logs", "Compliance"]
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Lightning-fast performance worldwide with our distributed content delivery network.",
      badge: "Pro",
      highlights: ["99.9% Uptime", "Edge Locations", "Auto-scaling"]
    },
    {
      icon: Cpu,
      title: "Custom API Access",
      description: "Seamless integrations with secure endpoints and comprehensive documentation.",
      badge: "Premium",
      highlights: ["REST APIs", "Webhooks", "Rate Limiting"]
    },
    {
      icon: Sparkles,
      title: "Smart Automation",
      description: "Intelligent workflows that learn from your patterns and optimize processes.",
      badge: "Enterprise",
      highlights: ["Auto-workflows", "Pattern Learning", "Process Optimization"]
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Premium':
        return 'bg-brand-gold text-black';
      case 'Pro':
        return 'bg-blue-600 text-white';
      case 'Enterprise':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-space-deep-blue via-space-blue to-space-deep-blue relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Advanced <span className="text-brand-gold">Features</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock powerful capabilities designed for modern businesses. From AI assistance to enterprise security, 
            our advanced features help you work smarter and scale faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-white/5 border-gray-700 hover:bg-white/10 transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-lg bg-brand-gold/20 flex items-center justify-center group-hover:bg-brand-gold/30 transition-colors">
                      <IconComponent className="w-6 h-6 text-brand-gold" />
                    </div>
                    <Badge className={getBadgeColor(feature.badge)}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold px-8"
            >
              <Link to="/features">
                Explore All Features
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-gray-600 text-white hover:bg-white/10 px-8"
            >
              <Link to="/quote">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;
