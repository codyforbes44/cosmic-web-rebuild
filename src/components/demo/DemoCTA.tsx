
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Shield, Clock, Users } from 'lucide-react';
import DemoRequestModal from '@/components/products/DemoRequestModal';

const DemoCTA: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleScheduleDemo = () => {
    setIsCalendlyOpen(true);
  };

  const benefits = [
    { icon: Shield, text: 'Enterprise-grade security', color: 'text-green-400' },
    { icon: Clock, text: '24/7 expert support included', color: 'text-blue-400' },
    { icon: Users, text: 'Unlimited team collaboration', color: 'text-purple-400' }
  ];

  const stats = [
    { value: '500+', label: 'Companies Trust Us' },
    { value: '99.9%', label: 'Uptime Guarantee' },
    { value: '< 2hrs', label: 'Average Response Time' }
  ];

  if (isSubmitted) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-accent/20 to-accent/5">
        <div className="container mx-auto text-center">
          <Card className="max-w-2xl mx-auto bg-card/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Demo Request Submitted!</h2>
              <p className="text-gray-300 mb-6">
                Thank you for your interest! Our team will contact you within 24 hours to schedule your personalized demo.
              </p>
              <div className="bg-black/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  <strong className="text-accent">What's next?</strong><br />
                  1. We'll send you a calendar link to choose your preferred time<br />
                  2. Our solutions expert will prepare a custom demo<br />
                  3. You'll see exactly how our platform can benefit your business
                </p>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)} 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5"
              >
                Request Another Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-br from-accent/10 to-transparent">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Analytics?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join hundreds of companies already using our platform to make better data-driven decisions.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center max-w-6xl mx-auto">
            {/* Schedule Demo Card - Centered */}
            <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20 hover:from-accent/30 hover:to-accent/10 transition-all duration-300 max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-xl flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Book Personal Demo
                  </CardTitle>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    Most Popular
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Get a personalized walkthrough tailored to your specific business needs and use cases.
                </p>
                
                <Button 
                  onClick={handleScheduleDemo}
                  className="w-full bg-white text-space-dark-blue hover:bg-gray-100 font-semibold"
                >
                  Schedule 30-Min Demo
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>

                <div className="mt-6 space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <benefit.icon className={`h-4 w-4 ${benefit.color}`} />
                      <span className="text-gray-300">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Shield className="h-4 w-4" />
              <span>SOC 2 Certified</span>
              <span>•</span>
              <span>GDPR Compliant</span>
              <span>•</span>
              <span>No Credit Card Required</span>
            </div>
          </div>
        </div>
      </section>

      <DemoRequestModal 
        isOpen={isCalendlyOpen}
        onOpenChange={setIsCalendlyOpen}
        productTitle="Analytics Platform Demo"
      />
    </>
  );
};

export default DemoCTA;
