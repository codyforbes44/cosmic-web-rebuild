import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
const testimonials = [{
  id: 1,
  name: "Sarah Johnson",
  position: "CTO, TechForward Inc.",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
  content: "ƷBI transformed our outdated systems into a modern digital platform that increased our operational efficiency by 40%. Their team's expertise and dedication to our success exceeded our expectations.",
  metric: "40% efficiency increase",
  rating: 5
}, {
  id: 2,
  name: "Michael Chen",
  position: "CEO, InnovateNow",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
  content: "Working with ƷBI was a game-changer for our business. Their strategic insights and custom software solutions helped us capture new market opportunities and increase revenue by 35% in just six months.",
  metric: "35% revenue growth",
  rating: 5
}, {
  id: 3,
  name: "Priya Patel",
  position: "COO, Global Logistics Partners",
  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
  content: "ƷBI's data analytics solutions gave us unprecedented visibility into our operations. Their team worked closely with us to implement solutions that reduced costs and improved service delivery across our global network.",
  metric: "28% cost reduction",
  rating: 5
}];
const Testimonials: React.FC = () => {
  return <section className="py-16 md:py-24 bg-space-deep-blue/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span className="text-accent font-medium text-sm uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            SUCCESS STORIES
          </motion.span>
          
          <motion.h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }}>
            Real Results for Real Businesses
          </motion.h2>
          
          <motion.p className="text-gray-300 max-w-2xl mx-auto text-lg" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            See how our technology solutions have transformed businesses like yours
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <motion.div key={testimonial.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }}>
              <Card className="h-full bg-space-dark-blue border-gray-800 overflow-hidden shadow-lg hover:border-accent/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />)}
                  </div>
                  
                  <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded mb-3">
                    {testimonial.metric}
                  </div>
                  
                  <p className="text-gray-200 italic mb-6">"{testimonial.content}"</p>
                </CardContent>
                <CardFooter className="flex items-center border-t border-gray-800 pt-4">
                  <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full mr-4 object-cover" />
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>)}
        </div>
        
        <motion.div className="mt-10 text-center" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }}>
          <Link to="/portfolio">
            
          </Link>
        </motion.div>
      </div>
    </section>;
};
export default Testimonials;