
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Calendar, Phone, Mail, Zap, Shield, Clock } from 'lucide-react';

const DemoCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log('Demo request submitted for:', email);
    }
  };

  const features = [
    { icon: Zap, text: 'Instant setup - no technical expertise required' },
    { icon: Shield, text: 'Enterprise-grade security and compliance' },
    { icon: Clock, text: '24/7 support and onboarding assistance' }
  ];

  const packages = [
    {
      name: 'Starter Demo',
      duration: '30 minutes',
      features: ['Core analytics overview', 'Basic reporting demo', 'Q&A session'],
      cta: 'Quick Demo',
      popular: false
    },
    {
      name: 'Business Demo',
      duration: '45 minutes',
      features: ['Full platform walkthrough', 'Custom use case examples', 'ROI calculator', 'Implementation timeline'],
      cta: 'Full Demo',
      popular: true
    },
    {
      name: 'Enterprise Demo',
      duration: '60 minutes',
      features: ['Comprehensive platform tour', 'Custom integration discussion', 'Security & compliance review', 'Pricing & terms discussion'],
      cta: 'Enterprise Demo',
      popular: false
    }
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
    <section className="py-16 px-4 bg-gradient-to-br from-accent/20 to-accent/5">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            See how our analytics platform can drive real results for your organization. 
            Choose the demo that best fits your needs.
          </p>
        </div>

        {/* Demo Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg, index) => (
            <Card key={index} className={`bg-card/20 backdrop-blur-sm border-white/10 hover:bg-card/30 transition-all duration-300 relative ${pkg.popular ? 'ring-2 ring-accent' : ''}`}>
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-white text-xl text-center">{pkg.name}</CardTitle>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{pkg.duration}</div>
                  <div className="text-sm text-gray-400">session</div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${pkg.popular ? 'bg-accent hover:bg-accent/80' : 'bg-white/10 hover:bg-white/20'} text-white`}
                  onClick={() => document.getElementById('demo-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {pkg.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main CTA Form */}
        <div className="max-w-4xl mx-auto">
          <Card id="demo-form" className="bg-card/20 backdrop-blur-sm border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl mb-2">Get Your Personalized Demo</CardTitle>
              <p className="text-gray-300">Enter your email to schedule a demo tailored to your business needs</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
                <Input
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border-white/20 text-white placeholder-gray-400"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-accent hover:bg-accent/80 text-white px-8 whitespace-nowrap"
                >
                  Schedule Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <feature.icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact Options */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-center text-gray-400 mb-4">Prefer to talk directly?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    <Phone className="w-4 h-4 mr-2" />
                    Call: (555) 123-4567
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    <Mail className="w-4 h-4 mr-2" />
                    Email: demo@company.com
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Calendar
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="text-center mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-2">Trusted by 500+ companies worldwide</p>
                <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
                  <span>• No setup fees</span>
                  <span>• 30-day money-back guarantee</span>
                  <span>• Cancel anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoCTA;
