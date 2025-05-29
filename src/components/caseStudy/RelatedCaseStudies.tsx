
import React from 'react';
import { Button } from '@/components/ui/button';

const RelatedCaseStudies: React.FC = () => {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-white mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-card overflow-hidden rounded-xl hover:scale-[1.02] transition-all duration-300">
          <div className="h-48 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Healthcare Patient Management Platform" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <span className="text-xs font-medium text-accent">Healthcare</span>
            <h3 className="text-xl font-bold my-2 text-white">Healthcare Patient Management Platform</h3>
            <p className="text-gray-400 text-sm mb-4">Client: Regional Medical Center</p>
            <Button variant="outline" className="w-full">View Case Study</Button>
          </div>
        </div>
        
        <div className="space-card overflow-hidden rounded-xl hover:scale-[1.02] transition-all duration-300">
          <div className="h-48 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Retail E-commerce Platform" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <span className="text-xs font-medium text-accent">Retail</span>
            <h3 className="text-xl font-bold my-2 text-white">Retail E-commerce Platform</h3>
            <p className="text-gray-400 text-sm mb-4">Client: Fashion Retailer</p>
            <Button variant="outline" className="w-full">View Case Study</Button>
          </div>
        </div>
        
        <div className="space-card overflow-hidden rounded-xl hover:scale-[1.02] transition-all duration-300">
          <div className="h-48 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Financial Analytics Dashboard" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <span className="text-xs font-medium text-accent">Finance</span>
            <h3 className="text-xl font-bold my-2 text-white">Financial Analytics Dashboard</h3>
            <p className="text-gray-400 text-sm mb-4">Client: Investment Firm</p>
            <Button variant="outline" className="w-full">View Case Study</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedCaseStudies;
