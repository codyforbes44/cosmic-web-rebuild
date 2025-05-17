
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Users } from "lucide-react";

// Static testimonials data - would ideally come from a database
const testimonials = {
  "dynamic-advertising": [
    {
      name: "Sarah Johnson",
      company: "Urban Outfitters",
      text: "The dynamic advertising solution completely transformed our digital marketing strategy. We saw a 45% increase in engagement within the first month.",
      rating: 5
    }
  ],
  "social-media-advertising": [
    {
      name: "Michael Tran",
      company: "NextGen Fitness",
      text: "Their social media team helped us reach a completely new audience. Our follower count has doubled and conversions are up 30%.",
      rating: 5
    }
  ],
  "recruitment-marketing": [
    {
      name: "Jessica Lee",
      company: "Insight Tech Solutions",
      text: "We struggled with hiring technical talent until we implemented their recruitment marketing strategy. Now we're attracting top candidates consistently.",
      rating: 5
    }
  ],
  "business-intelligence": [
    {
      name: "Robert Martinez",
      company: "Global Logistics Inc.",
      text: "The dashboard they built gives us real-time visibility into our operations that we never had before. Decision-making is faster and more accurate.",
      rating: 5
    }
  ],
  "web-development": [
    {
      name: "Emma Wilson",
      company: "Modern Home Designs",
      text: "Our new website is beautiful, fast, and has improved our conversion rate significantly. The team was professional and delivered on time.",
      rating: 5
    }
  ],
  "custom-software": [
    {
      name: "David Chen",
      company: "HealthTech Solutions",
      text: "The custom software they developed has automated our most time-consuming processes. It's paid for itself many times over already.",
      rating: 5
    }
  ],
  "workflow-automation": [
    {
      name: "Olivia Peterson",
      company: "Creative Studio 7",
      text: "Our team saves over 20 hours per week thanks to the workflow automation solution. It's been a game-changer for productivity.",
      rating: 5
    }
  ],
  "ai-integrations": [
    {
      name: "James Rodriguez",
      company: "Financial Analytics Partners",
      text: "Implementing AI into our analytics process has given us insights we would never have discovered otherwise. Highly recommend their expertise.",
      rating: 5
    }
  ],
  "web3-services": [
    {
      name: "Sophia Kim",
      company: "BlockChain Ventures",
      text: "Their Web3 team truly understands the space and delivered a solution that positioned us at the forefront of our industry's digital transformation.",
      rating: 5
    }
  ]
};

interface ServiceSocialProofProps {
  serviceId: string;
}

const ServiceSocialProof = ({ serviceId }: ServiceSocialProofProps) => {
  const [serviceTestimonials, setServiceTestimonials] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const relevantTestimonials = testimonials[serviceId as keyof typeof testimonials] || [];
    setServiceTestimonials(relevantTestimonials);
  }, [serviceId]);

  if (serviceTestimonials.length === 0) {
    return null; // Don't render anything if no testimonials
  }

  return (
    <div className="my-12">
      <div className="flex items-center justify-center mb-8">
        <Award className="text-accent mr-2 h-6 w-6" />
        <h3 className="text-2xl font-bold text-white">Client Success Stories</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {serviceTestimonials.map((testimonial, index) => (
          <Card key={index} className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/60">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} fill="#F59E0B" color="#F59E0B" className="h-4 w-4" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-200 italic mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{testimonial.name}</span>
                    <span className="text-gray-400 text-sm">{testimonial.company}</span>
                  </div>
                </div>
                
                <div className="hidden md:block flex-shrink-0">
                  <div className="bg-accent/10 rounded-lg p-4 text-center">
                    <p className="text-sm text-accent mb-1">Client Success</p>
                    <div className="text-white font-bold text-2xl">95%</div>
                    <p className="text-xs text-gray-400">Satisfaction</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceSocialProof;
