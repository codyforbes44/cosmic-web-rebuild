
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CTO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    content: "ƷBI transformed our outdated systems into a modern digital platform that increased our operational efficiency by 40%. Their team's expertise and dedication to our success exceeded our expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO, InnovateNow",
    image: "https://id-preview--2b064041-b594-40d8-9e86-f104f5c81b6c.lovable.app/lovable-uploads/782b1ad6-c071-49e4-abbd-f8022130bdc2.png",
    content: "Working with ƷBI was a game-changer for our business. Their strategic insights and custom software solutions helped us capture new market opportunities and increase revenue by 35% in just six months.",
    rating: 5
  },
  {
    id: 3,
    name: "Priya Patel",
    position: "COO, Global Logistics Partners",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    content: "ƷBI's data analytics solutions gave us unprecedented visibility into our operations. Their team worked closely with us to implement solutions that reduced costs and improved service delivery across our global network.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-space-deep-blue/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Client Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            See what our clients say about our business technology solutions and consulting services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-space-dark-blue border-gray-800 overflow-hidden shadow-lg hover:border-accent/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-gray-200 italic mb-6">"{testimonial.content}"</p>
                </CardContent>
                <CardFooter className="flex items-center border-t border-gray-800 pt-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
