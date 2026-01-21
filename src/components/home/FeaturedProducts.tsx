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
    <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-wider">FEATURED PRODUCT</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            Smart <span className="text-accent">Applicant Tracking</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Transform your hiring process with a modern ATS that helps you find, track, 
            and hire top talent faster—without the complexity of legacy systems.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Product Card */}
          <Card className="bg-gradient-to-r from-card to-muted/50 border-border mb-6 md:mb-8 overflow-hidden">
            <CardHeader className="pb-4 md:pb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-accent text-accent-foreground font-semibold">
                  NEW LAUNCH
                </Badge>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-accent/50 text-accent hover:bg-accent/10"
                >
                  <a href={featuredProduct.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Site
                  </a>
                </Button>
              </div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                {featuredProduct.title}
              </CardTitle>
              <CardDescription className="text-accent text-base md:text-lg font-medium mb-4">
                {featuredProduct.subtitle}
              </CardDescription>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {featuredProduct.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6 md:space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {featuredProduct.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {featuredProduct.features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg bg-muted/50 border border-border">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm md:text-base mb-1">{feature.title}</h4>
                        <p className="text-muted-foreground text-xs md:text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-4 md:pt-6 border-t border-border">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 md:px-8 w-full sm:w-auto"
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
                  className="border-border text-foreground hover:bg-muted px-6 md:px-8 w-full sm:w-auto"
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
            <p className="text-muted-foreground text-xs md:text-sm">
              Enterprise-grade ATS trusted by growing teams worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
