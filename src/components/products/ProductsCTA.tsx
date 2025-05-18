
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ProductsCTA = () => {
  return (
    <section className="container mx-auto px-4 relative z-10 mb-16">
      <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-gray-800 rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your operations?</h2>
          <p className="text-gray-300 mb-8">
            Our team of experts is ready to help you implement the perfect solution for your business. 
            Schedule a personalized demo to see our products in action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-quote">
              <Button className="bg-accent hover:bg-accent/80 text-white px-8 py-6 text-lg">
                Request a Demo
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsCTA;
