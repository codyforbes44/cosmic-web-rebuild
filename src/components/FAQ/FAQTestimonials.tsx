
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

// Success stories for social proof
export const successStories = [
  {
    quote: "The BI reporting tools from Ʒʙɪ transformed how we understand our customer data, leading to a 40% increase in marketing ROI.",
    author: "Sarah Johnson",
    position: "CMO, TechForward Inc.",
    stars: 5
  },
  {
    quote: "Implementing Ʒʙɪ's AI integration strategy helped us automate customer segmentation and personalization, increasing our conversion rate by 35%.",
    author: "Michael Chen",
    position: "Digital Director, InnovateNow",
    stars: 5
  }
];

const FAQTestimonials: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-16 mb-12"
    >
      <h2 className="text-2xl font-bold text-white mb-8 text-center">What Our Clients Say</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {successStories.map((story, index) => (
          <Card key={index} className="bg-space-deep-blue/60 border-gray-700 shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex mb-4">
                {[...Array(story.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">"{story.quote}"</p>
              <div>
                <p className="font-medium text-white">{story.author}</p>
                <p className="text-sm text-gray-400">{story.position}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQTestimonials;
