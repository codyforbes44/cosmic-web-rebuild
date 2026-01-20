import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Kanban, Brain, BarChart3, Plug } from "lucide-react";

const FeaturedProducts = () => {
  const featuredProduct = {
    title: "ATS.ME",
    subtitle: "Modern Applicant Tracking System",
    description: "Streamline your hiring workflow with an intuitive ATS built for growing teams. Manage candidates, track applications, and make data-driven hiring decisions—all in one powerful platform.",
    features: [
      {
        icon: Kanban,
        title: "Smart Candidate Tracking",
        description: "Centralized dashboard to track candidates through every stage of your hiring pipeline"
      },
      {
        icon: Brain,
        title: "Intelligent Matching",
        description: "AI-powered resume parsing and candidate-job matching for faster shortlisting"
      },
      {
        icon: Plug,
        title: "Seamless Integrations",
        description: "Connect with job boards, HR systems, and communication tools effortlessly"
      },
      {
        icon: BarChart3,
        title: "Analytics & Reporting",
        description: "Real-time hiring metrics, time-to-fill tracking, and cost-per-hire insights"
      }
    ],
    stats: [
      { value: "60%", label: "Faster Time-to-Hire" },
      { value: "40%", label: "Cost Reduction" },
      { value: "10K+", label: "Candidates Managed" },
      { value: "99.9%", label: "Uptime Reliability" }
    ],
    url: "https://ats.me"
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-space-deep-blue/30 to-space-dark-blue/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-brand-gold font-medium text-sm uppercase tracking-wider">FEATURED PRODUCT</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-white">
            Smart <span className="text-brand-gold">Applicant Tracking</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Transform your hiring process with a modern ATS that helps you find, track, 
            and hire top talent faster—without the complexity of legacy systems.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Product Card */}
          <Card className="bg-gradient-to-r from-space-dark-blue to-space-deep-blue border-gray-800 mb-8 overflow-hidden">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-brand-gold text-black font-semibold">
                  NEW LAUNCH
                </Badge>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10"
                >
                  <a href={featuredProduct.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Site
                  </a>
                </Button>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                {featuredProduct.title}
              </CardTitle>
              <CardDescription className="text-brand-gold text-lg font-medium mb-4">
                {featuredProduct.subtitle}
              </CardDescription>
              <p className="text-gray-300 text-lg leading-relaxed">
                {featuredProduct.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {featuredProduct.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-brand-gold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProduct.features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-space-deep-blue/50 border border-gray-800">
                      <div className="w-10 h-10 rounded-lg bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-gray-800">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold px-8"
                >
                  <a href={featuredProduct.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Try ATS.ME
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="border-gray-600 text-white hover:bg-white/10 px-8"
                >
                  <a href="/contact">
                    Learn More
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Enterprise-grade ATS trusted by growing teams worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
