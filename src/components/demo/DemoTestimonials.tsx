
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const DemoTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "CTO",
      company: "TechVision Inc.",
      rating: 5,
      quote: "ƷBI transformed our decision-making process. The real-time insights and intuitive dashboard helped us increase efficiency by 40% in just 3 months.",
      avatar: "/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png",
      metrics: "40% efficiency increase"
    },
    {
      name: "Michael Rodriguez",
      title: "VP of Operations",
      company: "Global Dynamics",
      rating: 5,
      quote: "The comprehensive KPI tracking and predictive analytics have been game-changers. We can now anticipate market trends and respond proactively.",
      avatar: "/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png",
      metrics: "25% revenue growth"
    },
    {
      name: "Emily Watson",
      title: "Data Director",
      company: "InnovateCorp",
      rating: 5,
      quote: "Outstanding platform! The seamless integration and powerful visualization tools make complex data analysis simple and actionable.",
      avatar: "/lovable-uploads/934f1150-c3bd-4fb4-9445-ec288ccb6c47.png",
      metrics: "60% faster reporting"
    }
  ];

  const results = [
    {
      metric: "Average ROI Increase",
      value: "320%",
      timeframe: "Within 6 months"
    },
    {
      metric: "Decision Speed",
      value: "5x Faster",
      timeframe: "Real-time insights"
    },
    {
      metric: "Cost Reduction",
      value: "45%",
      timeframe: "Operational efficiency"
    },
    {
      metric: "Customer Satisfaction",
      value: "98.5%",
      timeframe: "Ongoing support"
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Client Success Stories</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          See how leading organizations are achieving remarkable results with ƷBI
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {results.map((result, index) => (
          <Card key={index} className="bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm border-orange-500/20 text-center">
            <CardContent className="p-6">
              <h3 className="text-3xl font-bold text-orange-400 mb-2">{result.value}</h3>
              <p className="text-white font-medium mb-1">{result.metric}</p>
              <p className="text-gray-400 text-sm">{result.timeframe}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-orange-500/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-orange-500 mr-3" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-gray-300 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full bg-gray-600"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.title}</p>
                    <p className="text-orange-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {testimonial.metrics}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Industry Recognition */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-white mb-6">Trusted by Industry Leaders</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-gray-400 font-semibold text-lg">Fortune 500</div>
          <div className="text-gray-400 font-semibold text-lg">StartupCorp</div>
          <div className="text-gray-400 font-semibold text-lg">TechGiant</div>
          <div className="text-gray-400 font-semibold text-lg">InnovateNow</div>
          <div className="text-gray-400 font-semibold text-lg">DataDriven Co.</div>
        </div>
      </div>
    </section>
  );
};

export default DemoTestimonials;
