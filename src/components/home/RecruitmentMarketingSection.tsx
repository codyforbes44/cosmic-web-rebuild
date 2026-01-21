
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, TrendingUp, CheckCircle, Building, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DemoRequestModal from '../products/DemoRequestModal';

const RecruitmentMarketingSection = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Qualified Candidates",
      description: "Target experienced professionals with relevant skills and clean backgrounds",
      color: "#FF6B35"
    },
    {
      icon: Target,
      title: "Multi-Channel Campaigns",
      description: "Reach candidates across job boards, social media, and industry-specific platforms",
      color: "#10B981"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Reduce cost-per-hire by up to 40% while improving candidate quality and retention",
      color: "#3B82F6"
    }
  ];

  const benefits = [
    "250% increase in qualified candidate applications",
    "38% reduction in cost-per-hire",
    "25% improvement in employee retention rates",
    "Data-driven targeting for optimal ROI",
    "Industry-specific recruitment expertise"
  ];

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-wider">RECRUITMENT MARKETING</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4 text-foreground">
            Find Top Talent <span className="text-accent">Faster</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Revolutionary recruitment marketing that attracts quality candidates and reduces hiring costs through targeted digital campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border hover:bg-card/80 transition-all duration-300 group h-full shadow-lg hover:border-accent/50">
                  <CardHeader className="text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors group-hover:scale-110">
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                    </div>
                    <CardTitle className="text-foreground text-lg md:text-xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-card rounded-xl md:rounded-2xl p-6 md:p-8 mb-10 md:mb-12 border border-border shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 md:mb-6">Proven Results</h3>
              <div className="space-y-3 md:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-accent mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm md:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <Building className="h-20 w-20 md:h-24 md:w-24 text-accent mx-auto mb-4 md:mb-6" />
              <p className="text-muted-foreground text-base md:text-lg mb-4 md:mb-6">
                Join hundreds of companies who have transformed their recruitment process
              </p>
              <div className="flex justify-center space-x-1 mb-4 md:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 md:h-6 md:w-6 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Rated 5/5 by our clients</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Button 
              onClick={() => setDemoModalOpen(true)}
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 md:px-8 w-full sm:w-auto"
            >
              Request Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="border-border text-foreground hover:bg-muted px-6 md:px-8 w-full sm:w-auto"
            >
              <Link to="/recruitment-marketing">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <DemoRequestModal 
        isOpen={demoModalOpen} 
        onOpenChange={setDemoModalOpen} 
        productTitle="Recruitment Marketing Solutions"
      />
    </section>
  );
};

export default RecruitmentMarketingSection;
