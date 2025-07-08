
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Users, Zap, Shield, Headphones } from 'lucide-react';

const OnboardingBenefits = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Personalized Strategy',
      description: 'Get a customized roadmap tailored to your business goals and industry.'
    },
    {
      icon: Clock,
      title: 'Fast Implementation',
      description: 'Quick project kickoff with clear timelines and milestones.'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'Work with experienced professionals committed to your success.'
    },
    {
      icon: Zap,
      title: 'Cutting-Edge Technology',
      description: 'Access to the latest tools and technologies in the market.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and reliable service delivery.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock support to ensure your success.'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="space-card">
        <CardHeader>
          <CardTitle className="text-white text-xl">Why Choose ƷBI?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <benefit.icon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-white font-semibold text-sm">{benefit.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="space-card">
        <CardHeader>
          <CardTitle className="text-white text-lg">What Happens Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-accent text-black rounded-full flex items-center justify-center text-xs font-bold">
              1
            </div>
            <p className="text-gray-300 text-sm">We review your requirements</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-accent text-black rounded-full flex items-center justify-center text-xs font-bold">
              2
            </div>
            <p className="text-gray-300 text-sm">Schedule a discovery call</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-accent text-black rounded-full flex items-center justify-center text-xs font-bold">
              3
            </div>
            <p className="text-gray-300 text-sm">Receive a detailed proposal</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-accent text-black rounded-full flex items-center justify-center text-xs font-bold">
              4
            </div>
            <p className="text-gray-300 text-sm">Start your project</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingBenefits;
