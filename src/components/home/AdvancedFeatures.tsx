import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  BarChart3, 
  Shield, 
  Workflow, 
  Users, 
  Calendar,
  type LucideIcon
} from "lucide-react";
import { Link } from "react-router-dom";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: 'Core' | 'Pro' | 'Enterprise';
  highlights: string[];
}

/**
 * AdvancedFeatures - Recruitment-focused feature showcase
 * Updated to align with recruitment marketing use case
 */
const AdvancedFeatures = memo(() => {
  const features: Feature[] = [
    {
      icon: Brain,
      title: "AI-Powered Screening",
      description: "Intelligent candidate screening that analyzes resumes, skills, and cultural fit using advanced AI models.",
      badge: "Core",
      highlights: ["Resume Parsing", "Skills Matching", "Cultural Fit Analysis"]
    },
    {
      icon: BarChart3,
      title: "Talent Pipeline Analytics",
      description: "Real-time insights into your recruitment funnel with customizable dashboards and predictive metrics.",
      badge: "Pro",
      highlights: ["Funnel Metrics", "Time-to-Hire Tracking", "Source Attribution"]
    },
    {
      icon: Workflow,
      title: "ATS Integration Hub",
      description: "Seamless connections to popular applicant tracking systems including ATS.ME, Greenhouse, and Lever.",
      badge: "Core",
      highlights: ["ATS.ME Native", "Two-Way Sync", "Custom Workflows"]
    },
    {
      icon: Users,
      title: "Candidate Relationship Management",
      description: "Build and nurture talent pools with automated engagement campaigns and personalized outreach.",
      badge: "Pro",
      highlights: ["Talent Pools", "Drip Campaigns", "Engagement Scoring"]
    },
    {
      icon: Shield,
      title: "Compliance & EEOC Tracking",
      description: "Stay compliant with automated EEOC reporting, diversity analytics, and audit-ready documentation.",
      badge: "Enterprise",
      highlights: ["EEOC Reports", "Diversity Metrics", "Audit Trails"]
    },
    {
      icon: Calendar,
      title: "Smart Interview Scheduling",
      description: "Automated interview coordination with calendar sync, time zone detection, and candidate self-scheduling.",
      badge: "Core",
      highlights: ["Calendar Sync", "Self-Scheduling", "Automated Reminders"]
    }
  ];

  const getBadgeStyles = (badge: Feature['badge']) => {
    switch (badge) {
      case 'Core':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'Pro':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'Enterprise':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-wider">
            RECRUITMENT TECHNOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-3 md:mb-4 text-foreground">
            Powerful <span className="text-accent">Hiring Tools</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Transform your recruitment process with AI-driven tools designed to find, engage, 
            and hire top talent faster than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 md:mb-14">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-card/80 border-border hover:border-accent/50 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-medium ${getBadgeStyles(feature.badge)}`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-foreground text-lg sm:text-xl">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 sm:px-8 py-5 sm:py-6"
            >
              <Link to="/features">
                Explore All Features
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-border hover:bg-muted px-6 sm:px-8 py-5 sm:py-6"
            >
              <Link to="/get-quote">
                Request Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

AdvancedFeatures.displayName = 'AdvancedFeatures';

export default AdvancedFeatures;
