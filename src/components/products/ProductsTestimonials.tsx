
import React from 'react';
import { motion } from "framer-motion";
import { Star } from 'lucide-react';

// Customer testimonials for social proof
const testimonials = [
  {
    quote: "3BI Connect revolutionized how we manage our drivers and fleet. The ROI was immediately apparent in our operations.",
    name: "Jason Miller",
    position: "Operations Director, National Transport",
    stars: 5
  },
  {
    quote: "TruckOnboard reduced our onboarding time by 65% and improved driver retention by establishing clear processes from day one.",
    name: "Lisa Rodriguez",
    position: "HR Manager, Coastal Logistics",
    stars: 5
  }
];

const ProductsTestimonials = () => {
  return (
    <section className="container mx-auto px-4 py-16 relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Client Success Stories</h2>
        <p className="text-gray-300">Hear from businesses that transformed their operations with our products</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            className="bg-space-deep-blue/50 p-6 rounded-xl border border-gray-700"
          >
            <div className="flex mb-4">
              {[...Array(testimonial.stars)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
              ))}
            </div>
            <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
            <div>
              <p className="font-medium text-white">{testimonial.name}</p>
              <p className="text-sm text-gray-400">{testimonial.position}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductsTestimonials;
